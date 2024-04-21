import { createProgram, initWebGL, getGLColor} from './utils';
import { Matrix4 } from './lib/cuon';
const VSHADER_SOURCE = `
  attribute vec2 aPosition;
  uniform mat4 uModelMatrix;
  void main() {
    gl_Position = uModelMatrix * vec4(aPosition, 0.0, 1.0);
  }
  `;

// Fragment shader program
const FSHADER_SOURCE = `
  #ifdef GL_ES
  precision mediump float;
  #endif
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }
  `;
const canvas = document.getElementById('webgl') as HTMLCanvasElement;
if (!canvas) {
  throw new Error('Failed to get canvas element');
}
const gl = initWebGL(canvas);
const program = createProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE);

gl.clearColor(0.2, 0.2, 0.2, 1.0);

gl.clear(gl.COLOR_BUFFER_BIT);

const vertices = new Float32Array([-0.5, -0.5, 0.5, -0.5, -0.5, 0.5]);

const vertexBuffer = gl.createBuffer();
if (!vertexBuffer) {
  console.log("Failed to create the buffer object");
}

gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const aPosPtr = gl.getAttribLocation(program, "aPosition");

if (aPosPtr < 0) {
  console.error("Could not find aPosition ptr");
}

gl.vertexAttribPointer(aPosPtr, 2, gl.FLOAT, false, 0, 0);

gl.enableVertexAttribArray(aPosPtr);

function drawSpaceship(gl: WebGLRenderingContext, program: WebGLProgram, source: Matrix4) {
  const uModelMatrixPtr = gl.getUniformLocation(program, "uModelMatrix");
  const aColorPtr = gl.getUniformLocation(program, "u_FragColor");

  let M1 = new Matrix4(source);

  //head

  M1.translate(0, 0.5, 0);
  M1.rotate(225, 0, 0, 1);

  // M1.translate(0, 0.25,0)
  M1.scale(Math.SQRT1_2, Math.SQRT1_2, 1)
  let color = getGLColor(254, 112, 99, 1);
  gl.uniform4f(aColorPtr, color[0], color[1], color[2], color[3]);
  gl.uniformMatrix4fv(uModelMatrixPtr, false, M1.elements);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  
  //body left
  M1 = new Matrix4(source);
  M1.rotate(180, 0, 0, 1);

  color = getGLColor(254, 165, 93, 1);
  gl.uniform4f(aColorPtr, color[0], color[1], color[2], color[3]);
  gl.uniformMatrix4fv(uModelMatrixPtr, false, M1.elements);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  
  //body right
  M1 = new Matrix4(source);

  color = getGLColor(0, 215, 173, 1);
  gl.uniform4f(aColorPtr, color[0], color[1], color[2], color[3]);
  gl.uniformMatrix4fv(uModelMatrixPtr, false, M1.elements);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  
  
  //exhaust pipe thing
  M1 = new Matrix4(source);

  M1.scale(0.5, 0.5, 1);
  M1.translate(0, -1.5, 0);
  color = getGLColor(249, 238, 63, 1);
  
  gl.uniform4f(aColorPtr, color[0], color[1], color[2], color[3]);
  gl.uniformMatrix4fv(uModelMatrixPtr, false, M1.elements);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  
  M1.rotate(180, 0, 0, 1);
  gl.uniform4f(aColorPtr, color[0], color[1], color[2], color[3]);
  gl.uniformMatrix4fv(uModelMatrixPtr, false, M1.elements);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  
  
  //wings
  M1.rotate(180, 0, 0, 1); 
  M1.translate(-0.5, -0.5, 0);
  M1.translate(0, 1-Math.SQRT1_2, 0);
  M1.rotate(-45, 0, 0, 1); 


  color = getGLColor(164, 72, 212, 1);
  gl.uniform4f(aColorPtr, color[0], color[1], color[2], color[3]);
  gl.uniformMatrix4fv(uModelMatrixPtr, false, M1.elements);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  
  
  M1.translate(1/2, -1/2,0);
  M1.rotate(180, 0, 0, 1);
  M1.translate(1/2,1/2,0);

  color = getGLColor(168, 110, 107, 1);
  gl.uniform4f(aColorPtr, color[0], color[1], color[2], color[3]);
  gl.uniformMatrix4fv(uModelMatrixPtr, false, M1.elements);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  

  M1.translate(1/2, -1/2,0);
  M1.rotate(180, 0, 0, 1);
  M1.translate(1/2,1/2,0);

  M1.translate(Math.SQRT1_2,Math.SQRT1_2,0);
  M1.rotate(180, 0, 0, 1);


  color = getGLColor(0, 106, 170, 1);
  gl.uniform4f(aColorPtr, color[0], color[1], color[2], color[3]);
  gl.uniformMatrix4fv(uModelMatrixPtr, false, M1.elements);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  
  M1.translate(-1/2, 1/2,0);
  M1.rotate(180, 0, 0, 1);
  M1.translate(1/2,1/2,0);
  color = getGLColor(0, 106, 170, 1);
  gl.uniform4f(aColorPtr, color[0], color[1], color[2], color[3]);
  gl.uniformMatrix4fv(uModelMatrixPtr, false, M1.elements);
  gl.drawArrays(gl.TRIANGLES, 0, 3);



}

const M = new Matrix4();

M.scale(0.2, 0.2, 1);
M.translate(-2, -2, 0);
M.rotate(-18, 0, 0, 1);

drawSpaceship(gl, program, M);

const M2 = new Matrix4();
M2.scale(0.35, 0.35, 1);
M2.translate(-.25, 1.5, 0);
M2.rotate(-10, 0, 0, 1);
drawSpaceship(gl, program, M2);

const M3 = new Matrix4();
M3.scale(0.25, 0.25, 1);
M3.translate(2, -.5, 0);
drawSpaceship(gl, program, M3);




