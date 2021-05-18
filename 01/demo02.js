const NumTimesToSubdivide = 3
const canvasEl = document.querySelector("canvas");

const vertices = [
  [0.0, 0.0, -1.0],
  [0.0, 0.9428, 0.3333],
  [-0.8165, -0.4714, 0.3333],
  [0.8165, -0.4714, 0.3333],
];

const colors = []
const points = []
divideTetra(
  vertices[0],
  vertices[1],
  vertices[2],
  vertices[3],
  NumTimesToSubdivide
);

const gl = initWebGl(canvasEl);

gl.viewport(0, 0, canvasEl.width, canvasEl.height);
gl.clearColor(1.0, 1.0, 1.0, 1.0);

const program = await initShaders(
  gl,
  "./shaders/vertex.glsl",
  "./shaders/fragment.glsl"
);
gl.useProgram(program);




// vetex sendData T0 Gpu
const vetexBufferId = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vetexBufferId);
gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

var vPosition = gl.getAttribLocation(program, "vPosition");
gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(vPosition);

gl.enable(gl.DEPTH_TEST);

// fragment send Data to Gpu
const fragmentBufferId = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, fragmentBufferId);
gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

var vPosition = gl.getAttribLocation(program, "vColor");
gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(vPosition);

// render
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, points.length);

function triangle(a, b, c, color) {
  // add colors and vertices for one triangle

  var baseColors = [
    [1.0, 0.0, 0.0],
    [0.0, 1.0, 0.0],
    [0.0, 0.0, 1.0],
    [0.0, 0.0, 0.0],
  ];

  colors.push(baseColors[color]);
  points.push(a);
  colors.push(baseColors[color]);
  points.push(b);
  colors.push(baseColors[color]);
  points.push(c);
}

function tetra(a, b, c, d) {
  // tetrahedron with each side using
  // a different color

  triangle(a, c, b, 0);
  triangle(a, c, d, 1);
  triangle(a, b, d, 2);
  triangle(b, c, d, 3);
}

function divideTetra(a, b, c, d, count) {
  // check for end of recursion

  if (count === 0) {
    tetra(a, b, c, d);
  }

  // find midpoints of sides
  // divide four smaller tetrahedra
  else {
    var ab = mix(a, b, 0.5);
    var ac = mix(a, c, 0.5);
    var ad = mix(a, d, 0.5);
    var bc = mix(b, c, 0.5);
    var bd = mix(b, d, 0.5);
    var cd = mix(c, d, 0.5);

    --count;

    divideTetra(a, ab, ac, ad, count);
    divideTetra(ab, b, bc, bd, count);
    divideTetra(ac, bc, c, cd, count);
    divideTetra(ad, bd, cd, d, count);
  }
}
