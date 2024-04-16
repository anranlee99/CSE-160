class Point {
   constructor() {
      this.shape = 0;
      this.position = [0.0, 0.0];
      this.color = [1.0, 1.0, 1.0, 1.0];
      this.size = 5.0;
      this.outline = 0; // 0 for filled, 1 for outlined
   }

   draw() {
      switch (this.shape) {
         case 0:
            this.drawPoint();
            break;
         case 1:
            this.drawCircle();
            break;
         case 2:
            this.drawTriangle();
            break;
         default:
            console.log("Invalid shape type");
      }
   }

   drawPoint() {
      this.setupDrawing();
      const d = size / 20.0;
      draw_primitive_triangle([
         this.position[0] - d / 2, this.position[1] - d / 2,
         this.position[0] - d / 2, this.position[1] + d / 2,
         this.position[0] + d / 2, this.position[1] + d / 2
     ], this.outline);
     draw_primitive_triangle([
         this.position[0] - d / 2, this.position[1] - d / 2,
         this.position[0] + d / 2, this.position[1] - d / 2,
         this.position[0] + d / 2, this.position[1] + d / 2
     ], this.outline);
   }

   drawCircle() {
      this.setupDrawing();
      // Additional circle drawing logic here (for now, using triangles)
   }

   drawTriangle() {
      this.setupDrawing();
      const d = this.size / 20.0;
      draw_primitive_triangle([
         this.position[0] - d / 2, this.position[1] - d / 2,
         this.position[0] + d / 2, this.position[1] - d / 2,
         this.position[0], this.position[1] + d / 2
      ], this.outline);
   }

   setupDrawing() {
      gl.vertexAttrib3f(a_Position, this.position[0], this.position[1], 0.0);
      gl.uniform4f(u_FragColor, ...this.color);
      gl.uniform1f(u_Size, this.size);
   }
}

function draw_primitive_triangle(vertices, outline) {
   const n = 3; // Number of vertices
   const vertexBuffer = gl.createBuffer();
   if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
   }

   gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
   gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
   gl.enableVertexAttribArray(a_Position);

   if (outline === 0) {
      gl.drawArrays(gl.TRIANGLES, 0, n);
   } else if (outline === 1) {
      gl.drawArrays(gl.LINE_LOOP, 0, n);
   }
}
