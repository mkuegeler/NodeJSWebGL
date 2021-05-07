# WebGL Experiments
A collection of WebGL examples

## Model template

### Function: main: start

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

### Function: initShaderProgram
### Function: initBuffers
### Function: drawScene