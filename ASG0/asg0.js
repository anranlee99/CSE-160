// made by Aaron Lee, 2024
// for CSE-160 at UCSC
// github: @anranlee99 
// alee208@ucsc.edu
function main() {
    let canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = '0';
    ctx.fillRect(0, 0, 400, 400);
    /**@type {Vector3} */
    let v1 = new Vector3([2.25, 2.25, 0]);
    drawVector(v1, 'red');
}
main();

/** 
* @param {Vector3} v1
* @param {Vector3} v2
* @returns {void} 
*/
function angleBetween(v1, v2) {
    let dot = Vector3.dot(v1, v2);
    let mag1 = v1.magnitude();
    let mag2 = v2.magnitude();
    let angle = Math.acos(dot / (mag1 * mag2)) * 180 / Math.PI;
    console.log(`Angle: ${angle}`);
}
/**
* @param {Vector3} v1
* @param {Vector3} v2
* @returns {void}
*/
function areaTriangle(v1, v2) {
    let cross = Vector3.cross(v1, v2);
    let area = cross.magnitude() / 2;
    console.log(`Area of the triangle: ${area}`);
}
function drawVector(vector, color) {
    let canvas = document.getElementById('example');
    let ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.strokeStyle = color;
    // - y to flip the y axis
    ctx.lineTo(200 + vector.elements[0] * 20, 200 - vector.elements[1] * 20);
    ctx.stroke();
}
function handleDrawEvent() {
    let x1 = parseFloat(document.getElementById('v1_input_x').value);
    let y1 = parseFloat(document.getElementById('v1_input_y').value);
    let x2 = parseFloat(document.getElementById('v2_input_x').value);
    let y2 = parseFloat(document.getElementById('v2_input_y').value);
    let canvas = document.getElementById('example');
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = '0';
    ctx.fillRect(0, 0, 400, 400);
    let v1 = new Vector3([x1, y1, 0]);
    let v2 = new Vector3([x2, y2, 0]);
    drawVector(v1, 'red');
    drawVector(v2, 'blue');
}
function handleOperationEvent() {
    let canvas = document.getElementById('example');
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = '0';
    ctx.fillRect(0, 0, 400, 400);
    let operation = document.getElementById('Operation').value;
    let x1 = parseFloat(document.getElementById('v1_input_x').value);
    let y1 = parseFloat(document.getElementById('v1_input_y').value);
    let x2 = parseFloat(document.getElementById('v2_input_x').value);
    let y2 = parseFloat(document.getElementById('v2_input_y').value);
    let v1 = new Vector3([x1, y1, 0]);
    let v2 = new Vector3([x2, y2, 0]);
    let v3 = new Vector3([0, 0, 0]);
    let v4 = new Vector3([0, 0, 0]);
    let scalar = parseFloat(document.getElementById('v2_input_y').value);
    switch (operation) {
        case 'add':
            v3 = new Vector3(v1.elements);
            v3 = v3.add(v2);
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
        case 'mul':
            drawVector(v1, 'red');
            drawVector(v2, 'blue');
            v3 = new Vector3(v1.elements);
            v4 = new Vector3(v2.elements);
            v3.mul(scalar);
            drawVector(v3, 'green');
            v4.mul(scalar);
            drawVector(v4, 'green');
            break;
        case 'div':
            v3 = new Vector3(v1.elements);
            v3.div(scalar);
            drawVector(v1, 'red');
            drawVector(v3, 'green');
            break;
        case 'mag':
            let mag = v1.mag();
            document.getElementById('scalar').innerHTML = mag;
            drawVector(v1, 'red');
            break;
        case 'norm':
            v3 = new Vector3(v1.elements);
            v3.normalize();
            drawVector(v1, 'red');
            drawVector(v3, 'green');
            break;
        case 'ang':
            angleBetween(v1, v2);
            drawVector(v1, 'red');
            drawVector(v2, 'blue');
            break;
        case 'area':
            areaTriangle(v1, v2);
            drawVector(v1, 'red');
            drawVector(v2, 'blue');
            break;
    }
}
