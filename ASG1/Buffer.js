class Buffer{
    constructor () {
        this.arr = [];
        this.arr.push(new Float32Array(2048)); // Start with one array
        this.count = 0;  // Tracks the current index in the current Float32Array
        this.offset = 8; // Each point takes 8 slots in the array
        this.poolIndex = 0; // Which Float32Array in arr we are using
        this.numPoints = 0; // Total points stored in the Buffer
    }

    addPoint(x, y, r, g, b, a, size, shape){
        console.log(this.arr)
        //we need to extend the array
        if(this.count && this.count % 2040 == 0){
            this.poolIndex++;
            this.arr.push(new Float32Array(2048));
            this.count = 0;
        }
        this.arr[this.poolIndex][this.count] = x;
        this.arr[this.poolIndex][this.count+1] = y;
        this.arr[this.poolIndex][this.count+2] = r;
        this.arr[this.poolIndex][this.count+3] = g;
        this.arr[this.poolIndex][this.count+4] = b;
        this.arr[this.poolIndex][this.count+5] = a;
        this.arr[this.poolIndex][this.count+6] = size;
        this.arr[this.poolIndex][this.count+7] = shape;

        this.count += this.offset;
        this.numPoints++;
    }

    clear(){
        this.arr = [new Float32Array(2048)]; // Reset the array holding the points
        this.count = 0;
        this.poolIndex = 0;
        this.numPoints = 0;
    }

    // Add an iterator
    [Symbol.iterator]() {
        let index = 0;
        let poolIndex = 0;
        let numPointsIterated = 0;
        let offset = this.offset;
        let arr = this.arr;
        let numPoints = this.numPoints;

        return {
            next: () => {
                if (numPointsIterated >= numPoints) {
                    return { done: true };
                }

                if (index >= 2040) {
                    poolIndex++;
                    index = 0;
                }

                const baseIndex = index * offset;
                // let value = [
                //     arr[poolIndex][baseIndex],     // x
                //     arr[poolIndex][baseIndex + 1], // y
                //     arr[poolIndex][baseIndex + 2], // r
                //     arr[poolIndex][baseIndex + 3], // g
                //     arr[poolIndex][baseIndex + 4], // b
                //     arr[poolIndex][baseIndex + 5], // a
                //     arr[poolIndex][baseIndex + 6], // size
                //     arr[poolIndex][baseIndex + 7]  // shape
                // ];
                let value = {
                    x: arr[poolIndex][baseIndex],
                    y: arr[poolIndex][baseIndex + 1],
                    r: arr[poolIndex][baseIndex + 2],
                    g: arr[poolIndex][baseIndex + 3],
                    b: arr[poolIndex][baseIndex + 4],
                    a: arr[poolIndex][baseIndex + 5],
                    size: arr[poolIndex][baseIndex + 6],
                    shape: arr[poolIndex][baseIndex + 7]
                }
                index++;
                numPointsIterated++;

                return { value, done: false };
            }
        };
    }
}
