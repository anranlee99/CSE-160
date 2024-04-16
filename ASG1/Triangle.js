class Triangle{
   constructor(){
      this.type='triangle';
      this.position = [0.0, 0.0, 0.0];
      this.color = [1.0, 1.0, 1.0, 1.0];
      this.size = 5.0;
      this.outline = 0;
   }

   render(){
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


