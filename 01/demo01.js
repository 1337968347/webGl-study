const NumPoints = 10000;

const canvasEl = document.querySelector("canvas");

const vertices = [
  [-1.0, -1.0],
  [0.0, 1.0],
  [1.0, -1.0],
];

const u = add(vertices[0], vertices[1]);
const v = add(vertices[0], vertices[2]);
let p = scale(0.5, add(u, v));

const points = [p];

for (var i = 0; points.length < NumPoints; ++i) {
  var j = Math.floor(Math.random() * 3);
  p = add(points[i], vertices[j]);
  p = scale(0.5, p);
  points.push(p);
}
const gl = initWebGl(canvasEl);

gl.viewport(0, 0, canvasEl.width, canvasEl.height);
gl.clearColor(1.0, 1.0, 1.0, 1.0);

const program = await initShaders(
  gl,
  "./shaders/vertex.glsl",
  "./shaders/fragment.glsl"
);
gl.useProgram(program);

const bufferId = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

var vPosition = gl.getAttribLocation(program, "vPosition");
gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(vPosition);

gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.POINTS, 0, points.length);
