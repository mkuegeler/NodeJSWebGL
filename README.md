# WebGL Experiments
A collection of simplified WebGL examples

## Model template
*Reference:* 

https://github.com/mdn/webgl-examples/blob/gh-pages/tutorial/sample2/webgl-demo.js

### Run main function
```javascript
 main();
```
### Function: main: start
The main function

```javascript

 function main() {

```

#### Get Context

```javascript

  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl');

  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

```
#### Vertex shader

```javascript

// Vertex shader program

  const vsSource = `
    attribute vec4 aVertexPosition;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
  `;
  
   
```

#### Fragment shader

```javascript

// Fragment shader program

  const fsSource = `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `; 
   
```

#### Initialize a shader program

```javascript

// Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
   
```

#### Collect all the info needed to use the shader program

```javascript

// Collect all the info needed to use the shader program.
  // Look up which attribute our shader program is using
  // for aVertexPosition and look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };
   
```

#### Build all objects

```javascript

// Here's where we call the routine that builds all the
  // objects we'll be drawing.
  const buffers = initBuffers(gl);
   
```

#### Draw the scene

```javascript

// Draw the scene
  drawScene(gl, programInfo, buffers);

   
```

### Function: main: end

```javascript
}

```

### Function: initBuffers: start
Initialize the buffers we'll need. For this demo, we just
have one object -- a simple two-dimensional square.

Argument: gl

#### 
```javascript

function initBuffers(gl) {

```

#### Create a buffer
```javascript
// Create a buffer for the square's positions.

  const positionBuffer = gl.createBuffer(); 

```

#### Select the positionBuffer
```javascript
// Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
 

```

#### Array of positions for the square
```javascript
// Now create an array of positions for the square.

  const positions = [
     1.0,  1.0,
    -1.0,  1.0,
     1.0, -1.0,
    -1.0, -1.0,
  ];

```

#### Pass the list of positions into WebGL
```javascript
// Now pass the list of positions into WebGL to build the
// shape. We do this by creating a Float32Array from the
// JavaScript array, then use it to fill the current buffer.

  gl.bufferData(gl.ARRAY_BUFFER,
                new Float32Array(positions),
                gl.STATIC_DRAW);

```

#### Return position
```javascript
return {
    position: positionBuffer,
  }; 

```

### Function: initBuffers: end
```javascript
}

```

### Function: drawScene: start
Draw the scene

Arguments: gl, programInfo, buffers

#### 
```javascript
drawScene(gl, programInfo, buffers) {

```

#### Initial clearing and setup
```javascript
gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
gl.clearDepth(1.0);                 // Clear everything
gl.enable(gl.DEPTH_TEST);           // Enable depth testing
gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

```

#### Clear the canvas
```javascript
// Clear the canvas before we start drawing on it.
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

```

#### Set values for perspective matrix
```javascript
// Create a perspective matrix, a special matrix that is
// used to simulate the distortion of perspective in a camera.
// Our field of view is 45 degrees, with a width/height
// ratio that matches the display size of the canvas
// and we only want to see objects between 0.1 units
// and 100 units away from the camera.

const fieldOfView = 45 * Math.PI / 180;   // in radians
const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
const zNear = 0.1;
const zFar = 100.0;
const projectionMatrix = mat4.create();

```

#### Create a perspective matrix
```javascript
// note: glmatrix.js always has the first argument
// as the destination to receive the result.
mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

```

#### Set the drawing position
```javascript
// Set the drawing position to the "identity" point, which is
// the center of the scene.
const modelViewMatrix = mat4.create();

```

#### Move the drawing position
```javascript
// Now move the drawing position a bit to where we want to
// start drawing the square.

mat4.translate(modelViewMatrix,     // destination matrix
               modelViewMatrix,     // matrix to translate
              [-0.0, 0.0, -6.0]);  // amount to translate
```

#### Tell WebGL how to pull out the positions
```javascript
// Tell WebGL how to pull out the positions from the position
// buffer into the vertexPosition attribute.
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

```

#### Tell WebGL to use our program when drawing
```javascript
// Tell WebGL to use our program when drawing

  gl.useProgram(programInfo.program);

```

#### Set the shader uniforms
```javascript
// Set the shader uniforms

  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);

  {
    const offset = 0;
    const vertexCount = 4;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
  }

```

### Function: drawScene: end
```javascript
}

```

### Function: initShaderProgram: start
Initialize a shader program, so WebGL knows how to draw our data

Arguments: gl, vsSource, fsSource

```javascript

 function initShaderProgram(gl, vsSource, fsSource) {

```

#### Create vertexShader
```javascript
// Create vertexShader with loadShader function
const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
```

#### Create fragmentShader
```javascript
// Create fragmentShader with loadShader function
const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
```

#### Create the shader program
```javascript
// Create the shader program
const shaderProgram = gl.createProgram();

gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);

gl.linkProgram(shaderProgram);

```

#### If creating the shader program failed, alert
```javascript
// If creating the shader program failed, alert
if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

```

#### Return value of shaderProgram
```javascript
// 
return shaderProgram;
```

### Function: initShaderProgram: end
```javascript
}

```

### Function: loadShader: start
Creates a shader of the given type, uploads the source and
compiles it.

Arguments: gl, type, source

```javascript
function loadShader(gl, type, source) {

```

#### 
```javascript
const shader = gl.createShader(type);
```

#### 
```javascript
// Send the source to the shader object
gl.shaderSource(shader, source);

```

#### Compile the shader program
```javascript
// Compile the shader program
gl.compileShader(shader);

```

#### See if it compiled successfully
```javascript
// See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

```
#### Return shader
```javascript
return shader;

```

### Function: loadShader: end
```javascript
}

```


