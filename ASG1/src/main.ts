import { initUI, initWebGL } from './setup';
import { createProgram } from './utils';

const canvas = document.getElementById('webgl2') as HTMLCanvasElement
const gl = initWebGL(canvas);
const config = initUI();
const program = createProgram(gl);




enum Shape {
  SQUARE = 1,
  CIRCLE = 2,
  TRIANGLE = 3
};


class Paint {
  gl: WebGL2RenderingContext;
  program: WebGLProgram;
  buffer: WebGLBuffer;
  color: Float32Array;
  size: number;
  shape: Shape;
  constructor(gl: WebGL2RenderingContext, program: WebGLProgram) {
    this.gl = gl;
    this.program = program;
    const buff = gl.createBuffer();
    if (!buff) {
      throw new Error('Failed to create buffer');
    }
    this.buffer = buff;
    this.color = new Float32Array([0, 0, 0, 1.0]);
    this.size = 10;
    this.shape = 1;

  }


}

class Circle extends Paint {
  radius: number;

  constructor(gl: WebGL2RenderingContext, program: WebGLProgram, radius: number) {
    super(gl, program);
    this.radius = radius;
    this.shape = Shape.CIRCLE;
  }

}



