//use this to import the types because the html uses cjs 
import { Vector3 } from './lib/cuon-matrix-cse160.types';
function main() {
    const canvas = document.getElementById('example') as HTMLCanvasElement;
    if(!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.fillStyle = '0';
    ctx.fillRect(0, 0, 400, 400);

    const v1 = new Vector3([2.25, 2.25, 0]);
    drawVector(v1, 'red');
}

function drawVector(vector: Vector3, color: string){
    const canvas = document.getElementById('example') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.beginPath();
    ctx.moveTo(200, 200);
    console.log(vector.elements[0]);
    ctx.strokeStyle = color;
    // - y to flip the y axis
    ctx.lineTo(200 + vector.elements[0] * 20, 200 - vector.elements[1] * 20);
    ctx.stroke();
}

function handleDrawEvent() {
    const x1 = parseFloat((document.getElementById('v1_input_x') as HTMLInputElement).value);
    const y1 = parseFloat((document.getElementById('v1_input_y') as HTMLInputElement).value);
    const x2 = parseFloat((document.getElementById('v2_input_x') as HTMLInputElement).value);
    const y2 = parseFloat((document.getElementById('v2_input_y') as HTMLInputElement).value);

    const canvas = document.getElementById('example') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.fillStyle = '0';
    ctx.fillRect(0, 0, 400, 400);
    const v1 = new Vector3([x1, y1, 0]);
    const v2 = new Vector3([x2, y2, 0]);
    drawVector(v1, 'red');
    drawVector(v2, 'blue');
}

function handleOperationEvent() {
    const canvas = document.getElementById('example') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.fillStyle = '0';
    ctx.fillRect(0, 0, 400, 400); 

    const operation = (document.getElementById('operation') as HTMLSelectElement).value;
    const x1 = parseFloat((document.getElementById('v1_input_x') as HTMLInputElement).value);
    const y1 = parseFloat((document.getElementById('v1_input_y') as HTMLInputElement).value);
    const x2 = parseFloat((document.getElementById('v2_input_x') as HTMLInputElement).value);
    const y2 = parseFloat((document.getElementById('v2_input_y') as HTMLInputElement).value);
    const v1 = new Vector3([x1, y1, 0]);
    const v2 = new Vector3([x2, y2, 0]);
    let v3 = new Vector3([0, 0, 0]);
    let v4 = new Vector3([0, 0, 0]);
    const scalar = parseFloat((document.getElementById('v2_input_y') as HTMLInputElement).value);
    switch(operation) {
        case 'add':
            v3 = new Vector3(v1.elements);
            v3.add(v2); 
            drawVector(v1, 'red');
            drawVector(v2, 'blue');
            drawVector(v3, 'green');
            break;
        case 'sub':
            v3 = new Vector3(v1.elements);
            v3.sub(v2);
            drawVector(v1, 'red');
            drawVector(v2, 'blue');
            drawVector(v3, 'green');
            break;
    }

}