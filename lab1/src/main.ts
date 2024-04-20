import { createProgram, initUI, initWebGL } from './utils';
enum Shape {
  SQUARE = 1,
  TRIANGLE = 2,
  CIRCLE = 3,
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

interface Vertex3 {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
}



class Buffer {
  arr: Float32Array[];
  bytesPerPool: number;
  count: number;
  offset: number;
  poolIndex: number;
  length: number;
  /**
   * 
   * @param element_size The number of floats per element
   */
  constructor(element_size: number ) {
    this.bytesPerPool = 4 * element_size ; // 256
    this.arr = [];
    // 2048 log 8
    this.arr.push(new Float32Array()); // Start with one array
    this.count = 0;  // Tracks the current index in the current Float32Array
    this.offset = element_size; // Each point takes 8 slots in the array
    this.poolIndex = 0; // Which Float32Array in arr we are using
    this.length = 0; // Total points stored in the Buffer
  }

  addPoint(element: number[]) {
    //we need to extend the array
    if(element.length != this.offset) {
      throw new Error('Invalid number of elements');
    }
    if (this.count && this.count % 2040 == 0) {
      this.poolIndex++;
      this.arr.push(new Float32Array(2048));
      this.count = 0;
    }
    this.arr[this.poolIndex][this.count] = x;
    this.arr[this.poolIndex][this.count + 1] = y;
    this.arr[this.poolIndex][this.count + 2] = r;
    this.arr[this.poolIndex][this.count + 3] = g;
    this.arr[this.poolIndex][this.count + 4] = b;
    this.arr[this.poolIndex][this.count + 5] = a;
    this.arr[this.poolIndex][this.count + 6] = size;
    this.arr[this.poolIndex][this.count + 7] = shape;

    this.count += this.offset;
    this.length++;
  }

  getLastPoint() {
    if (this.count === 0) {
      return null;
    }

    const baseIndex = this.count - this.offset;
    return {
      x: this.arr[this.poolIndex][baseIndex],
      y: this.arr[this.poolIndex][baseIndex + 1],
      r: this.arr[this.poolIndex][baseIndex + 2],
      g: this.arr[this.poolIndex][baseIndex + 3],
      b: this.arr[this.poolIndex][baseIndex + 4],
      a: this.arr[this.poolIndex][baseIndex + 5],
      size: this.arr[this.poolIndex][baseIndex + 6],
      shape: this.arr[this.poolIndex][baseIndex + 7]
    };
  }

  removeLastPoint() {
    if (this.count === 0) {
      return;
    }
    this.count -= this.offset;
    this.length--;
  }

  clear() {
    this.arr = [new Float32Array(2048)]; // Reset the array holding the points
    this.count = 0;
    this.poolIndex = 0;
    this.length = 0;
  }

  // Add an iterator
  [Symbol.iterator]() {
    let index = 0;
    let poolIndex = 0;
    let numPointsIterated = 0;

    return {
      next: () => {
        if (numPointsIterated >= this.length) {
          return { done: true };
        }

        if (index === 256) {  // When we reach the end of the current array
          poolIndex++;
          index = 0;
        }

        const baseIndex = index * this.offset;
        let value: Point = {
          x: this.arr[poolIndex][baseIndex],
          y: this.arr[poolIndex][baseIndex + 1],
          r: this.arr[poolIndex][baseIndex + 2],
          g: this.arr[poolIndex][baseIndex + 3],
          b: this.arr[poolIndex][baseIndex + 4],
          a: this.arr[poolIndex][baseIndex + 5],
          size: this.arr[poolIndex][baseIndex + 6],
          shape: this.arr[poolIndex][baseIndex + 7]
        };

        index++;
        numPointsIterated++;

        return { value, done: false };
      }
    };
  }

}

const canvas = document.getElementById('webgl') as HTMLCanvasElement;
if (!canvas) {
  throw new Error('Failed to get canvas element');
}
const gl = initWebGL(canvas);
const program = createProgram(gl);


class Paint {
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  points: Float32Array = new Float32Array(1000);

  a_Position: number;
  buff: Buffer = new Buffer();
  redoBuff: Buffer = new Buffer();

  constructor(gl: WebGLRenderingContext, program: WebGLProgram) {
    this.gl = gl;
    this.program = program;

    this.a_Position = this.gl.getAttribLocation(this.program, 'aPosition');
    if (this.a_Position < 0) throw new Error('Failed to get attribute location');

    gl.clearColor(0,0,0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  addPoint(point: Vertex3) {
    this.buff.addPoint(point.x, point.y, point.r, point.g, point.b, point.a, point.size, point.shape);
  }

  draw() {
    if (this.buff.length > 0) {
      // Only draw the most recent point
      const lastPoint = this.buff.getLastPoint();
      this.drawPoint(lastPoint as Point);
    }
  }

  drawTriangle(point: Point) {

  }

  drawPoint(point: Point) {
    switch (point.shape) {
      case Shape.TRIANGLE:
        this.drawTriangle(point);
        break;
    }
  }

}




const paint = new Paint(gl, program);
const pointArr = [];
pointArr.push({ x: 0.0, y: 0.0, r: 1.0, g: 0.0, b: 0.0, a: 1.0, size: 0.1, shape: Shape.TRIANGLE });

for (const point of pointArr) {
  paint.addPoint(point);
  paint.draw();
}