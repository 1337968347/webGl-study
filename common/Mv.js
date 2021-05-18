const add = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return -1;
  }

  const result = [];

  for (let i = 0; i < arr1.length; i++) {
    result.push(arr1[i] + arr2[i]);
  }

  return result;
};

const scale = (s, arr) => {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i] * s);
  }

  return result;
};

const flatten = (v) => {
  if (v.matrix === true) {
    v = transpose(v);
  }

  var n = v.length;
  var elemsAreArrays = false;

  if (Array.isArray(v[0])) {
    elemsAreArrays = true;
    n *= v[0].length;
  }

  var floats = new Float32Array(n);

  if (elemsAreArrays) {
    var idx = 0;
    for (var i = 0; i < v.length; ++i) {
      for (var j = 0; j < v[i].length; ++j) {
        floats[idx++] = v[i][j];
      }
    }
  } else {
    for (var i = 0; i < v.length; ++i) {
      floats[i] = v[i];
    }
  }

  return floats;
};

const mix = (u, v, s) => {
  if (typeof s !== "number") {
    throw "mix: the last paramter " + s + " must be a number";
  }

  if (u.length != v.length) {
    throw "vector dimension mismatch";
  }

  var result = [];
  for (var i = 0; i < u.length; ++i) {
    result.push((1.0 - s) * u[i] + s * v[i]);
  }

  return result;
};
