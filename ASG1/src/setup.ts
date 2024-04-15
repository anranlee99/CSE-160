export function initWebGL(canvas: HTMLCanvasElement): WebGL2RenderingContext {
  const gl = canvas.getContext('webgl2');
  
  if (!gl) {
    throw new Error('WebGL not supported')
  }

  return gl;
}

interface Config{
    color: HTMLInputElement[];
    shape: HTMLSelectElement;
    clear: HTMLButtonElement;
    size: HTMLInputElement;
    
}
export function initUI(){

    const redSlider = document.createElement('input');
    redSlider.type = 'range';
    redSlider.min = '0';
    redSlider.max = '100';
    redSlider.value = '50';

    const greenSlider = document.createElement('input');
    greenSlider.type = 'range';
    greenSlider.min = '0';
    greenSlider.max = '100';
    greenSlider.value = '50';

    const blueSlider = document.createElement('input');
    blueSlider.type = 'range';
    blueSlider.min = '0';
    blueSlider.max = '100';
    blueSlider.value = '50';

    const brushSize = document.createElement('input');
    brushSize.type = 'range';
    brushSize.min = '1';
    brushSize.max = '100';
    brushSize.value = '10';

    const brushType = document.createElement('select');
    const option1 = document.createElement('option');
    option1.value = '1';
    option1.text = 'Square';
    brushType.add(option1);

    const option2 = document.createElement('option');
    option2.value = '2';
    option2.text = 'Circle';
    brushType.add(option2);

    const option3 = document.createElement('option');
    option3.value = '3';
    option3.text = 'Triangle';
    brushType.add(option3);

    const clearButton = document.createElement('button');
    clearButton.innerHTML = 'Clear';
    
    const config: Config = {
        color: [redSlider, greenSlider, blueSlider],
        shape: brushType,
        clear: clearButton,
        size: brushSize
    }
    const app = document.getElementById('app');
    if(app){
        app.appendChild(redSlider);
        app.appendChild(greenSlider);
        app.appendChild(blueSlider);
        app.appendChild(brushSize);
        app.appendChild(brushType);
        app.appendChild(clearButton);
    }

    return config;

}