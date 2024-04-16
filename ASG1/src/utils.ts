const VSHADER_SOURCE = `
uniform float u_Size;
attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = u_Size;
  }
`;

// Fragment shader program
const FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }
`;

export function createProgram(gl: WebGLRenderingContext): WebGLProgram {
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  const program = gl.createProgram();

  if (!vertexShader || !fragmentShader || !program) {
    throw new Error('Failed to create shader or program');
  }

  gl.shaderSource(vertexShader, VSHADER_SOURCE);
  gl.shaderSource(fragmentShader, FSHADER_SOURCE);

  gl.compileShader(vertexShader);

  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    throw new Error('Failed to compile vertex shader');
  }
  
  gl.compileShader(fragmentShader);

  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    throw new Error('Failed to compile fragment shader');
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  gl.useProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error('Failed to link program');
  }

  return program;
}