var points = [];
var colors = [];

var modelView;
let projection;

var mvMatrix, pMatrix;
const canvas = document.querySelector("canvas");

const gl = initWebGl(canvas);
if (!gl) {
  alert("WebGL isn't available");
}

colorCube();

gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(1.0, 1.0, 1.0, 1.0);

gl.enable(gl.DEPTH_TEST);

//
//  Load shaders and initialize attribute buffers
//
const program = await initShaders(
  gl,
  "./cute-vertex.glsl",
  "./cute-fragment.glsl"
);
gl.useProgram(program);

var cBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

var vColor = gl.getAttribLocation(program, "vColor");

gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(vColor);

var vBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);

gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

var vPosition = gl.getAttribLocation(program, "vPosition");
gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(vPosition);

modelView = gl.getUniformLocation(program, "modelView");
projection = gl.getUniformLocation(program, "projection");

//event listeners for buttons
pMatrix = perspective(90, 1, 0.3, 3);
render();

function colorCube() {
  quad(1, 0, 3, 2);
  quad(2, 3, 7, 6);
  quad(3, 0, 4, 7);
  quad(6, 5, 1, 2);
  quad(4, 5, 6, 7);
  quad(5, 4, 0, 1);
}

function quad(a, b, c, d) {
  var vertices = [
    vec4(-0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, 0.5, 0.5, 1.0),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, -0.5, -0.5, 1.0),
    vec4(-0.5, 0.5, -0.5, 1.0),
    vec4(0.5, 0.5, -0.5, 1.0),
    vec4(0.5, -0.5, -0.5, 1.0),
  ];

  var vertexColors = [
    [0.0, 0.0, 0.0, 1.0], // black
    [1.0, 0.0, 0.0, 1.0], // red
    [1.0, 1.0, 0.0, 1.0], // yellow
    [0.0, 1.0, 0.0, 1.0], // green
    [0.0, 0.0, 1.0, 1.0], // blue
    [1.0, 0.0, 1.0, 1.0], // magenta
    [0.0, 1.0, 1.0, 1.0], // cyan
    [1.0, 1.0, 1.0, 1.0], // white
  ];

  // We need to parition the quad into two triangles in order for
  // WebGL to be able to render it.  In this case, we create two
  // triangles from the quad indices

  //vertex color assigned by the index of the vertex
  // 6 个点表示一个面
  var indices = [a, b, c, a, c, d];

  for (var i = 0; i < indices.length; ++i) {
    points.push(vertices[indices[i]]);
    //colors.push( vertexColors[indices[i]] );

    // for solid colored faces use
    colors.push(vertexColors[a]);
  }
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  mvMatrix = lookAt(vec3(1.0, 1.0, 1.0), vec3(0, 0, 0), vec3(0, 1, 0));
  gl.uniformMatrix4fv(modelView, false, flatten(mvMatrix));
  gl.uniformMatrix4fv(projection, false, flatten(pMatrix));

  gl.drawArrays(gl.TRIANGLES, 0, points.length);

  requestAnimationFrame(render);
}
