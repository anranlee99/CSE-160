import { initUI, initWebGL } from './setup';
import { createProgram } from './utils';

const canvas = document.getElementById('webgl') as HTMLCanvasElement;
if (!canvas) {
  throw new Error('Failed to get canvas element');
}
const gl = initWebGL(canvas);

const config = initUI();

const program = createProgram(gl);



let isDrawing = false;




enum Shape {
  SQUARE = 1,
  CIRCLE = 2,
  TRIANGLE = 3
};
interface Point {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
  a: number;
  size: number;
  shape: Shape;
}


class Paint {
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  points: Float32Array = new Float32Array(1000);
  numPoints: number = 0;

  a_Position: number;
  u_FragColor: WebGLUniformLocation;
  u_Size: WebGLUniformLocation;
  offset: number;

  constructor(gl: WebGLRenderingContext, program: WebGLProgram) {
    this.gl = gl;
    this.program = program;

    this.a_Position = this.gl.getAttribLocation(this.program, 'a_Position');
    if (this.a_Position < 0) throw new Error('Failed to get attribute location');

    const color = this.gl.getUniformLocation(this.program, 'u_FragColor');
    if (!color) throw new Error('Failed to get color uniform');
    this.u_FragColor = color;
    const size = this.gl.getUniformLocation(this.program, 'u_Size');
    if (!size) throw new Error('Failed to get size uniform');
    this.u_Size = size;

    console.log(this.u_FragColor);
    console.log(this.u_Size);
    console.log(this.a_Position);
    gl.clearColor(1,1,1, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    this.offset = 8;


  }

  addPoint(point: Point) {
    const { x, y, r, g, b, a, size, shape } = point;
    this.points[this.numPoints * this.offset] = x;
    this.points[this.numPoints * this.offset + 1] = y;
    this.points[this.numPoints * this.offset + 2] = r;
    this.points[this.numPoints * this.offset + 3] = g;
    this.points[this.numPoints * this.offset + 4] = b;
    this.points[this.numPoints * this.offset + 5] = a;
    this.points[this.numPoints * this.offset + 6] = size;
    this.points[this.numPoints * this.offset + 7] = shape;
    this.numPoints++;


    console.log(this.points.slice(0, this.numPoints * this.offset));
  }

  reset() {
    this.points.fill(0, 0, 1000 * 10);
    this.numPoints = 0;
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.points, this.gl.DYNAMIC_DRAW);
  }

  draw() {
    this.gl.clearColor(1,1,1,1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    for (let i = 0; i < this.numPoints; i++) {
      this.drawPoint({
        x: this.points[i * this.offset],
        y: this.points[i * this.offset + 1],
        r: this.points[i * this.offset + 2],
        g: this.points[i * this.offset + 3],
        b: this.points[i * this.offset + 4],
        a: this.points[i * this.offset + 5],
        size: this.points[i * this.offset + 6],
        shape: this.points[i * this.offset + 7]
      });
    }
  }
  drawSquare(point: Point) {
    const { x, y, r, g, b, a, size, shape} = point;
    console.log({ x, y, r, g, b, a, size, shape});

    this.gl.vertexAttrib3f(this.a_Position, x, y, 0.0);
    this.gl.uniform4f(this.u_FragColor, r, g, b, a);
    this.gl.uniform1f(this.u_Size, size);


    const buff = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buff);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
      x, y, 0.0,
      x + size, y, 0.0,
      x, y + size, 0.0,
      x + size, y, 0.0,
      x, y + size, 0.0,
      x + size, y + size, 0.0
    ]), this.gl.DYNAMIC_DRAW);
    this.gl.vertexAttribPointer(this.a_Position, 2, this.gl.FLOAT, false, 0, 0);

    this.gl.enableVertexAttribArray(this.a_Position);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
  }
  drawCircle(point: Point) {
    const { x, y, r, g, b, a, size, shape} = point;
    console.log({ x, y, r, g, b, a, size, shape});

    this.gl.vertexAttrib3f(this.a_Position, x, y, 0.0);
    this.gl.uniform4f(this.u_FragColor, r, g, b, a);
    this.gl.uniform1f(this.u_Size, size);

    const buff = this.gl.createBuffer();
    if(!buff) throw new Error('Failed to create buffer');
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buff);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
      x, y, 0.0,
      x + size / 2, y, 0.0,
      x, y + size / 2, 0.0,
    ]), this.gl.DYNAMIC_DRAW);

    this.gl.vertexAttribPointer(this.a_Position, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.a_Position);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
  }
  drawPoint(point: Point) {
    switch (point.shape) {
      case Shape.SQUARE:
        this.drawSquare(point);
        break;
      case Shape.CIRCLE:
        this.drawCircle(point);
        break;
    }
  }
}


//drawing logic

const paint = new Paint(gl, program);

canvas.addEventListener('mousedown', function (event) {
  isDrawing = true;
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const point = {
    x,
    y,
    r: parseFloat(config.color[0].value) / 100,
    g: parseFloat(config.color[1].value) / 100,
    b: parseFloat(config.color[2].value) / 100,
    a: parseFloat(config.color[3].value) / 100,
    size: parseFloat(config.size.value) / 100,
    shape: parseFloat(config.shape.value) as Shape
  };
  paint.addPoint(point);
  paint.draw();
});

canvas.addEventListener('mousemove', function (event) {
  if (isDrawing) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const point = {
      x,
      y,
      r: parseFloat(config.color[0].value) / 100,
      g: parseFloat(config.color[1].value) / 100,
      b: parseFloat(config.color[2].value) / 100,
      a: parseFloat(config.color[3].value) / 100,
      size: parseFloat(config.size.value) ,
      shape: parseInt(config.shape.value) as Shape
    };
    paint.addPoint(point);
    paint.draw();
  }
});

canvas.addEventListener('mouseup', function () {
  isDrawing = false;
});

config.clear.addEventListener('click', function () {
  paint.numPoints = 0;
  paint.draw();
});
