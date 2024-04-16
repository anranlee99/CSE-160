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

// Constants

const BUFFER = new Buffer();
const POINT = 0;
const CIRCLE = 1;
const TRIANGLE = 2;
// Global letiables
let gl;
let canvas;
let a_Position;
let u_FragColor;
let u_Size;

// Array

const config = {
   r: 0.5,
   g: 0.5,
   b: 0.5,
   a: 1.0,
   size: 5,
   shape: 0,
}
let g_shapesList = [];

const g_selectedColor = [0.5, 0.5, 0.5, 1.0];

let dragging = false;


// HTML ============================================================
function addActionsForHtmlUI() {
   // Button Events
   document.getElementById('clearButton').onclick = function () { 
      g_shapesList = []; 
      BUFFER.clear();
      drawShapes(); 
   };
   

   // Color Slider Events

   const redSlider = document.getElementById('redSlider');

   redSlider.addEventListener('change', function () {
      config.r = this.value * 0.1;
   });
   const greenSlider = document.getElementById('greenSlider');
   greenSlider.addEventListener('change', function () {
      config.g = this.value * 0.1;
   });
   const blueSlider = document.getElementById('blueSlider');
   blueSlider.addEventListener('change', function () {
      config.b = this.value * 0.1;
   });
   const alphaSlider = document.getElementById('alphaSlider');
   alphaSlider.addEventListener('change', function () {
      config.a = this.value * 0.1;
   });
   const brushSize = document.getElementById('brushSize'); 
   config.size = brushSize.value;
   brushSize.addEventListener('change', function () {
      config.size = this.value;
   });
   const brushType = document.getElementById('brushType');
   brushType.addEventListener('change', function () {
      config.shape = this.value;
   });


}

// Get Canvas and GL Context ======================================
function setupWebGL() {
   // Retrieve <canvas> element
   canvas = document.getElementById('webgl');
   if (!canvas) {
      console.log('Failed to retrieve the <canvas> element');
      return;
   }

   // Rendering context for WebGL
   gl = getWebGLContext(canvas);
   if (!gl) {
      console.log('Failed to get the rendering context for WebGL');
      return;
   }
}

// Compile Shader Programs and connect js to GLSL =================
function connectletiablesToGLSL() {
   // Initialize shaders ==========================================
   if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      console.log('Failed to intialize shaders.');
      return;
   }

   // Get the storage location of attribute letiable ==============
   a_Position = gl.getAttribLocation(gl.program, 'a_Position');
   console.log(a_Position)
   if (a_Position < 0) {
      console.log('Failed to get the storage location of a_Position');
      return;
   }

   // Get the storage location of attribute letiable ==============
   u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
   console.log(u_FragColor)
   if (!u_FragColor) {
      console.log('Failed to get u_FragColor');
      return;
   }

   u_Size = gl.getUniformLocation(gl.program, 'u_Size');
   console.log(u_Size)
   if (!u_Size) {
      console.log('Failed to get u_Size');
      return;
   }

}

// Main ===========================================================
function main() {
   setupWebGL();
   connectletiablesToGLSL();
   addActionsForHtmlUI();

   // Register function (event handler) to be called on a mouse press
   canvas.onmousedown = function (ev) {
      click(ev);
      dragging  = true;
   };
   canvas.onmouseup = function (ev) {
      dragging  = false;
   };
   canvas.onmouseleave = function (ev) {
      dragging  = false;
   };
   canvas.onmousemove = function (ev) {
      if (dragging ) {
         click(ev);
      }
   };

   // Specify the color for clearing <canvas>
   gl.clearColor(0.0, 0.0, 0.0, 1.0);
   // Clear <canvas>
   gl.clear(gl.COLOR_BUFFER_BIT);
} 
main();

function convertCoordinatesEventToGL(ev) {
   let x = ev.clientX; // x coordinate of a mouse pointer
   let y = ev.clientY; // y coordinate of a mouse pointer
   const rect = ev.target.getBoundingClientRect();

   // set coordinates based on origin
   x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
   y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);


   return [x, y];
}

function click(ev) {
   const [x, y] = convertCoordinatesEventToGL(ev);
   // let point;
   // if (g_selectedType == shape.POINT) {
   //    point = new Point();
   // } 


   // point.position = [x, y];
   // point.color = g_selectedColor.slice();
   // point.size = g_selectedSize;
   // point.outline = g_outline;
   // g_shapesList.push(point);
   // BUFFER.addPoint(x, y, g_selectedColor[0], g_selectedColor[1], g_selectedColor[2], g_selectedColor[3], g_selectedSize, g_selectedType);
   
   BUFFER.addPoint(x, y, config.r, config.g, config.b, config.a, config.size, config.shape);

   // Draw every shape that is suppose to be in the canvas
   drawShapes();
}
const paint = new Point();
// renderAllShapes =================================================
function drawShapes() {
   // Clear <canvas>
   gl.clear(gl.COLOR_BUFFER_BIT);

   // for (let i = 0; i < g_shapesList.length; i += 1) {
   //    g_shapesList[i].render();
   //    console.log(g_shapesList[i]);
   // }

   for (const point of BUFFER) {
      paint.position = [point.x, point.y];
      paint.color = [point.r, point.g, point.b, point.a];
      paint.size = point.size;
      paint.shape = point.shape;
      console.log(point);
      paint.draw();
   }

}
