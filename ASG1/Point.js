class Point {
   constructor() {
      this.shape = 0;
      this.position = [0.0, 0.0, 0.0];
      this.color = [1.0, 1.0, 1.0, 1.0];
      this.size = 5.0;
      this.outline = 0;
   }

   render() {
      const xy = this.position;
      const rgba = this.color;
      const size = this.size;
      // Pass the color of a point to a_Position variable
      gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
      // Pass the color of a point to u_FragColor variable
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

      // Pass the size tp u_Size
      gl.uniform1f(u_Size, size);

      const d = size / 20.0;
      draw_primitive_triangle([xy[0] - d / 2, xy[1] - d / 2, xy[0] - d / 2, xy[1] + d / 2, xy[0] + d / 2, xy[1] + d / 2], this.outline);
      draw_primitive_triangle([xy[0] - d / 2, xy[1] - d / 2, xy[0] + d / 2, xy[1] - d / 2, xy[0] + d / 2, xy[1] + d / 2], this.outline);

   }
   draw() {
      console.log(this.shape);
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
      }

   }
   drawPoint() {
      const xy = this.position;
      const rgba = this.color;
      const size = this.size;
      // Pass the color of a point to a_Position variable
      gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
      // Pass the color of a point to u_FragColor variable
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

      // Pass the size tp u_Size
      gl.uniform1f(u_Size, size);

      const d = size / 20.0;
      draw_primitive_triangle([xy[0] - d / 2, xy[1] - d / 2, xy[0] - d / 2, xy[1] + d / 2, xy[0] + d / 2, xy[1] + d / 2]);
      draw_primitive_triangle([xy[0] - d / 2, xy[1] - d / 2, xy[0] + d / 2, xy[1] - d / 2, xy[0] + d / 2, xy[1] + d / 2]);
   }

   drawCircle() {
      const xy = this.position;
      const rgba = this.color;
      const size = this.size;
      // Pass the color of a point to a_Position variable
      gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
      // Pass the color of a point to u_FragColor variable
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

      // Pass the size tp u_Size
      gl.uniform1f(u_Size, size);

      const d = size / 20.0;
      draw_primitive_triangle([xy[0] - d / 2, xy[1] - d / 2, xy[0] - d / 2, xy[1] + d / 2, xy[0] + d / 2, xy[1] + d / 2]);
      draw_primitive_triangle([xy[0] - d / 2, xy[1] - d / 2, xy[0] + d / 2, xy[1] - d / 2, xy[0] + d / 2, xy[1] + d / 2]); 
   }

   drawTriangle(){
      var xy = this.position;
      var rgba = this.color;
      var size = this.size;

      // Pass color to u_FragColor
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

      // Pass the size tp u_Size
      gl.uniform1f(u_Size, size);

      var d = size/20.0;
      draw_primitive_triangle([xy[0]-d/2, xy[1]-d/2, xy[0]+d/2, xy[1]-d/2, xy[0], xy[1]+d/2], this.outline);

   }
}

function draw_primitive_triangle(vertices) {
   var n = 3;
   var vertexBuffer = gl.createBuffer();
   if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
   }

   // Bind the buffer object to target
   gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
   // Write date into the buffer object
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

   // Assign the buffer object to a_Position variable
   gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

   // Enable the assignment to a_Position variable
   gl.enableVertexAttribArray(a_Position);

   gl.drawArrays(gl.TRIANGLES, 0, n);
   // if (outline == 0) {
   // } else if (outline == 1) {
   //    gl.drawArrays(gl.LINE_LOOP, 0, n);
   // }
}
