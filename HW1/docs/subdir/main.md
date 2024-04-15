
# CSE 160 HW 1 -- FileAnalyzer

## Readings
1. Define OpenGL, OpenGL ES and WebGL. Describe their relationship.

- OpenGL is a graphics API that is free to use. Its primary use is for 3D graphics. A version called OpenGL ES was created in 2003-2004 with a major update in 2007 with a focus on making OpenGL portable to various embedded systems such as mobile devices and gaming consoles. WebGL is a web implementation of OpenGL ES that allows for 3D graphics to be displayed in a web browser. WebGL is a subset of OpenGL ES.

2. Describe the software architecture of a webpage and a webpage using WebGL.
- A webpage is composed of HTML, CSS, and Javascript. The HTML is the structure of the webpage, the CSS is the styling of the webpage, and the Javascript is the behavior of the webpage. When WebGL is used, the HTML will include a `<canvas>` tag that is used to create a 2D or 3D rendering context. The Javascript will include the WebGL API that is used to draw images on the `<canvas>` tag. 

3. In HTML, what is the `<canvas>` tag?
- The `<canvas>` tag is used in HTML to create a 2D or 3D rendering context. The `<canvas>` tag is used to draw images on the webpage.

4. In Javascript, what line of code one writes to retrieve a 2D rendering context?
- The following line of code is used to retrieve a 2D rendering context in Javascript:
```javascript
var ctx = canvas.getContext('2d');
```


## Evaluate ChatGPT or other LLM

With the math problems, ChatGPT had no issue. I believe that these problems were trivial enough that there were probably explicit matches in its data set. 

For the openGL reading questions, ChatGPT actually gave me two options to choose from. I found them to be a bit more verbose than I would expect, but it achieved the task just fine. 

## Design a new HW problem 

Original problem: Define OpenGL, OpenGL ES and WebGL. Describe their relationship.

New problem:
I asked chatGPT to find what versions of webGL are compatible with the android browser as of April 10, 2024. 

ChatGPT response:
As of April 2024, the versions of WebGL that are compatible with the Android browser are:

- **WebGL 1.0** is supported on Android devices using the Android browser from Chrome version 25 onwards.
- **WebGL 2.0** is supported on Android devices from Chrome version 114 onwards.

These versions of WebGL are compatible with the corresponding versions of the Chrome browser because the Android browser uses Chrome as its engine. It's important to note that the availability of these WebGL versions can also depend on the device's hardware, particularly the graphics processing unit (GPU) support.

Comments:
These are simply not accurate, even according to the sources it gave. WebGL is supposed on the android browser for Chrome and the native chromium browser up till version 123 and not compatible for the native browsers on Android 2.1-4.4.4


## Practice Problems