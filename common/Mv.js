"use strict";

// --------------- 向量 -----------------------
function vec2() {
  var result = [...arguments];

  switch (result.length) {
    case 0:
      result.push(0.0);
    case 1:
      result.push(0.0);
  }

  return result.splice(0, 2);
}

function vec3() {
  var result = [...arguments];

  switch (result.length) {
    case 0:
      result.push(0.0);
    case 1:
      result.push(0.0);
    case 2:
      result.push(0.0);
  }

  return result.splice(0, 3);
}

function vec4() {
  var result = [...arguments];

  switch (result.length) {
    case 0:
      result.push(0.0);
    case 1:
      result.push(0.0);
    case 2:
      result.push(0.0);
    case 3:
      result.push(1.0);
  }

  return result.splice(0, 4);
}

// ---------------矩阵-------------------
function mat2() {
  const v = [...arguments];
  let m = [];

  switch (v.length) {
    case 0:
      v[0] = 1;
    case 1:
      m = [vec2(v[0], 0.0), vec2(0.0, v[0])];
      break;
    default:
      m.push(vec2(v));
      v.splice(0, 2);
      m.push(vec2(v));
      break;
  }

  m.matrix = true;

  return m;
}

function mat3() {
  const v = [...arguments];
  let m = [];

  switch (v.length) {
    case 0:
      v[0] = 1;
    case 1:
      m = [vec3(v[0], 0.0, 0.0), 
           vec3(0.0, v[0], 0.0), 
           vec3(0.0, 0.0, v[0])];
      break;
    default:
      m.push(vec3(v)); v.splice(0, 3);
      m.push(vec3(v)); v.splice(0, 3);
      m.push(vec3(v));
      break;
  }

  m.matrix = true;

  return m;
}

function mat4() {
    const v = [...arguments];

    var m = [];
    switch ( v.length ) {
    case 0:
        v[0] = 1;
    case 1:
        m = [
            vec4( v[0], 0.0,  0.0,   0.0 ),
            vec4( 0.0,  v[0], 0.0,   0.0 ),
            vec4( 0.0,  0.0,  v[0],  0.0 ),
            vec4( 0.0,  0.0,  0.0,  v[0] )
        ];
        break;

    default:
        m.push( vec4(v) );  v.splice( 0, 4 );
        m.push( vec4(v) );  v.splice( 0, 4 );
        m.push( vec4(v) );  v.splice( 0, 4 );
        m.push( vec4(v) );
        break;
    }

    m.matrix = true;

    return m;
}

/**
 * 向量或矩阵 相加
 * @param {*} u 
 * @param {*} v 
 * @returns 
 */
function add(u, v) {
  var result = [];

  if (u.matrix && v.matrix) {
    if (u.length != v.length) {
      throw "add(): trying to add matrices of different dimensions";
    }

    for (var i = 0; i < u.length; ++i) {
      if (u[i].length != v[i].length) {
        throw "add(): trying to add matrices of different dimensions";
      }
      result.push([]);
      for (var j = 0; j < u[i].length; ++j) {
        result[i].push(u[i][j] + v[i][j]);
      }
    }

    result.matrix = true;

    return result;
  } else if ((u.matrix && !v.matrix) || (!u.matrix && v.matrix)) {
    throw "add(): trying to add matrix and non-matrix variables";
  } else {
    if (u.length != v.length) {
      throw "add(): vectors are not the same dimension";
    }

    for (var i = 0; i < u.length; ++i) {
      result.push(u[i] + v[i]);
    }

    return result;
  }
}

/**
 * 向量或矩阵 相减
 * @param {*} u 
 * @param {*} v 
 * @returns 
 */
function subtract(u, v) {
  var result = [];

  if (u.matrix && v.matrix) {
    if (u.length != v.length) {
      throw (
        "subtract(): trying to subtract matrices" + " of different dimensions"
      );
    }

    for (var i = 0; i < u.length; ++i) {
      if (u[i].length != v[i].length) {
        throw (
          "subtract(): trying to subtact matrices" + " of different dimensions"
        );
      }
      result.push([]);
      for (var j = 0; j < u[i].length; ++j) {
        result[i].push(u[i][j] - v[i][j]);
      }
    }

    result.matrix = true;

    return result;
  } else if ((u.matrix && !v.matrix) || (!u.matrix && v.matrix)) {
    throw "subtact(): trying to subtact  matrix and non-matrix variables";
  } else {
    if (u.length != v.length) {
      throw "subtract(): vectors are not the same length";
    }

    for (var i = 0; i < u.length; ++i) {
      result.push(u[i] - v[i]);
    }

    return result;
  }
}

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

// 点乘
function dot(u, v) {
  if (u.length !== v.length) {
    throw "两个向量的长度不一致";
  }

  let sum = 0.0;
  for (let i = 0; i < u.length; i++) {
    sum += u[i] * v[i];
  }

  return sum;
}

function equal(u, v) {
  if (u.length !== v.length) {
    return false;
  }
  // 矩阵
  if (u.matrix && v.matrix) {
    for (let i = 0; i < u.length; i++) {
      if (u[i].length !== v[i].length) {
        return false;
      }

      for (let j = 0; i < u[i].length; j++) {
        if (u[i][j] !== v[i][j]) {
          return false;
        }
      }
    }
  } else {
    for (let i = 0; i < u.length; i++) {
      if (u[i] !== v[i]) {
        return false;
      }
    }
  }

  return true
}

// 叉乘
function cross(u, v) {
  if (!Array.isArray(u) || u.length < 3) {
    throw "叉乘:  向量的长度最小是3个";
  }

  if (!Array.isArray(v) || v.length < 3) {
    throw "叉乘:  向量的长度最小是3个";
  }

  const result = [
    u[1]*v[2] - u[2]*v[1],
    u[2]*v[3] - u[3]*v[2],
    u[3]*v[1] - u[1]*v[3]
  ] 
  return result 
}

/**
 * 通过指定 标架原点
 * @param {*} at 观察标架的 原点
 * @param {*} up 观察平面法向量
 * @param {*} eye 观察正向向量
 */
function lookAt(at, up, eye) {

}
