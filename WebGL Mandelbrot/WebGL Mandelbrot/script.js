"use strict";

function compileShader(gl, shaderSource, shaderType) {
  // Create the shader object
  var shader = gl.createShader(shaderType);
 
  // Set the shader source code.
  gl.shaderSource(shader, shaderSource);
 
  // Compile the shader
  gl.compileShader(shader);
 
  // Check if it compiled
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!success) {
    // Something went wrong during compilation; get the error
    throw "could not compile shader:" + gl.getShaderInfoLog(shader);
  }
 
  return shader;
};//code from https://webglfundamentals.org/webgl/lessons/webgl-boilerplate.html

function createProgram(gl, vertexShader, fragmentShader) {
  // create a program.
  var program = gl.createProgram();
 
  // attach the shaders.
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
 
  // link the program.
  gl.linkProgram(program);
 
  // Check if it linked.
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!success) {
      // something went wrong with the link
      throw ("program failed to link:" + gl.getProgramInfoLog (program));
  }
 
  return program;
};//code from https://webglfundamentals.org/webgl/lessons/webgl-boilerplate.html

var vertShader = compileShader(gl, document.getElementById("vertexShader").text, gl.VERTEX_SHADER);
var fragShader = compileShader(gl, document.getElementById("fragmentShader").text, gl.FRAGMENT_SHADER);
var program = createProgram(gl, vertShader, fragShader);

var positionAttributeLocation = gl.getAttribLocation(program, "position");
var positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

var positions = [
  -1, -1,
  -1, 1,
  1, -1,
  1, 1,
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

gl.useProgram(program);

gl.enableVertexAttribArray(positionAttributeLocation);

gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0,0);

var resolutionUniformLocation = gl.getUniformLocation(program, "resolution");
var viewPositionUniformLocation = gl.getUniformLocation(program, "offset");
var zoomUniformLocation = gl.getUniformLocation(program, "zoom");

function update() {
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.drawArrays(gl.TRIANGLES, 1, 3);
};

windowSizeUpdate = ()=> {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
    update();
};

viewportUpdate = ()=> {
    gl.uniform2f(viewPositionUniformLocation, viewPosition[0], viewPosition[1]);
    gl.uniform1f(zoomUniformLocation, zoom);
    update();
}

windowSizeUpdate();
viewportUpdate();