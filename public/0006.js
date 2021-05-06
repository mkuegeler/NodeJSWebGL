main();

//
// Start here
//
function main() {
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl');

  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  gl.viewport( 0, 0, canvas.width, canvas.height );
  // Setze clear color auf schwarz, vollständig sichtbar
  gl.clearColor(0.5, 0.0, 0.1, 1.0);
  // Lösche den color buffer mit definierter clear color
  gl.clear(gl.COLOR_BUFFER_BIT);
  
}

