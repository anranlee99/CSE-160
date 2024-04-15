// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform float u_Size;
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
function setupWebGL() {
  // Retrieve <canvas> element
  globalThis.canvas = document.getElementById('webgl');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return;
  }
  // Get the rendering context for WebGL
  globalThis.gl = getWebGLContext(canvas);

  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }


  globalThis.g_points = [];  // The array for the position of a mouse press
  globalThis.g_colors = [];  // The array to store the color of a point
}
function connectVariablesToGLSL() {
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // // Get the storage location of a_Position
  globalThis.a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor
  globalThis.u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  globalThis.u_Size = gl.getUniformLocation(gl.program, 'u_Size');
  if (!u_Size) {
    console.log('Failed to get the storage location of u_Size');
    return;
  }
}
/**
 * 
 * @param {Event} ev 
 * @param {WebGL2RenderingContext} gl 
 * @param {*} canvas 
 * @param {*} a_Position 
 * @param {*} u_FragColor 
 */
function click(ev) {
  let x = ev.clientX; // x coordinate of a mouse pointer
  let y = ev.clientY; // y coordinate of a mouse pointer
  const rect = ev.target.getBoundingClientRect();

  // x is the x-coordinate of the mouse pointer
  x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
  // y is the y-coordinate of the mouse pointer
  y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

  // Store the coordinates to g_points array
  g_points.push([x, y]);
  //use the colors from the sliders
  g_colors.push([redSlider.value / 100 , greenSlider.value / 100, blueSlider.value / 100, 1.0]);



  
  draw();
}

function draw(){
  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  const len = g_points.length;
  for (let i = 0; i < len; i++) {
    const xy = g_points[i];
    const rgba = g_colors[i];

    // Pass the position of a point to a_Position variable
    gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    // Draw
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}
function UI(){
  const brushSizeSlider = document.getElementById("brushSizeSlider");
  const brushShape = document.getElementById("brushShape");
  u_Size = gl.getUniformLocation(gl.program, 'u_Size');

  brushSizeSlider.oninput = function () {
    gl.uniform1f(u_Size, parseFloat(this.value));
  }

  brushShape.onchange = function () {
    if (this.value === "circle") {
      //
      gl.uniform1f(u_Size, 1.0);
    }
    else if (this.value === "square") {
      gl.uniform1f(u_Size, 2.0);
    }
    else if (this.value === "triangle") {
      gl.uniform1f(u_Size, 3.0);
    }
  }
}




function main() {
  setupWebGL();
  connectVariablesToGLSL();
  UI();
  globalThis.dragging = false;

  canvas.onmousedown = function (ev) {
    click(ev);
    dragging = true;
  };
  canvas.onmouseup = function () {
    dragging = false;
  };

  canvas.onmousemove = function (ev) {
    if (dragging) {
      click(ev);
    }
  };

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
}
main();



