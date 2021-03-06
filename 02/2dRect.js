var gl;

var theta = 0.0;
var thetaLoc;

const canvas = document.querySelector("canvas");

gl = initWebGl(canvas);
if (!gl) {
  alert("WebGL isn't available");
}

//
//  Configure WebGL
//
gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(1.0, 1.0, 1.0, 1.0);


const program = await initShaders(
  gl,
  "./shaders/vertex.glsl",
  "./shaders/fragment.glsl"
);
gl.useProgram(program);

var vertices = [[0, 1], [-1, 0], [1, 0], [0, -1]];

var bufferId = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

// Associate out shader variables with our data buffer
var vPosition = gl.getAttribLocation(program, "vPosition");
gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(vPosition);

thetaLoc = gl.getUniformLocation(program, "theta");

render();

function render() {

  theta += 0.01;
  gl.uniform1f(thetaLoc, theta);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices.length);

  requestAnimationFrame(render);
}
