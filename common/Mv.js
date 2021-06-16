"use strict";

function _argumentsToArray(args) {
  return [].concat.apply([], Array.prototype.slice.apply(args));
}
// --------------- 向量 -----------------------
function vec2() {
  var result = _argumentsToArray(arguments);

  switch (result.length) {
    case 0:
      result.push(0.0);
    case 1:
      result.push(0.0);
  }

  return result.splice(0, 2);
}

function vec3() {
  var result = _argumentsToArray(arguments);

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
  var result = _argumentsToArray(arguments);

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
  const v = _argumentsToArray(arguments);
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
  const v = _argumentsToArray(arguments);
  let m = [];

  switch (v.length) {
    case 0:
      v[0] = 1;
    case 1:
      m = [vec3(v[0], 0.0, 0.0), vec3(0.0, v[0], 0.0), vec3(0.0, 0.0, v[0])];
      break;
    default:
      m.push(vec3(v));
      v.splice(0, 3);
      m.push(vec3(v));
      v.splice(0, 3);
      m.push(vec3(v));
      break;
  }

  m.matrix = true;

  return m;
}

function mat4() {
  const v = _argumentsToArray(arguments);

  var m = [];
  switch (v.length) {
    case 0:
      v[0] = 1;
    case 1:
      m = [
        vec4(v[0], 0.0, 0.0, 0.0),
        vec4(0.0, v[0], 0.0, 0.0),
        vec4(0.0, 0.0, v[0], 0.0),
        vec4(0.0, 0.0, 0.0, v[0]),
      ];
      break;

    default:
      m.push(vec4(v));
      v.splice(0, 4);
      m.push(vec4(v));
      v.splice(0, 4);
      m.push(vec4(v));
      v.splice(0, 4);
      m.push(vec4(v));
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

/**
 * 转置
 * @param {*} m 矩阵
 * @returns
 */
function transpose(m) {
  if (!m.matrix) {
    return "不是一个矩阵";
  }

  var result = [];
  for (var i = 0; i < m.length; ++i) {
    result.push([]);
    for (var j = 0; j < m[i].length; ++j) {
      result[i].push(m[j][i]);
    }
  }

  result.matrix = true;

  return result;
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

  return true;
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
    u[1] * v[2] - u[2] * v[1],
    u[2] * v[0] - u[0] * v[2],
    u[0] * v[1] - u[1] * v[0],
  ];
  return result;
}

/**
 * 向量的模
 * @param {*} u
 */
function Length(u) {
  return Math.sqrt(dot(u, u));
}

/**
 * 求归一化向量
 */
function normalize(u) {
  // 向量的模长
  const len = Length(u);
  if (!isFinite(len)) {
    throw "vector 长度错误";
  }

  for (let i = 0; i < u.length; i++) {
    u[i] /= len;
  }

  return u;
}

/**
 * 通过指定 标架原点
 * @param {*} eye 看向的点
 * @param {*} at 在这个点上
 * @param {*} up 观察平面法向量
 * @returns 相机标架
 */
function lookAt(eye, at, up) {
  if (!Array.isArray(at) || at.length !== 3) {
    throw "lookAt 第一个参数必须是 vec3";
  }
  if (!Array.isArray(up) || up.length !== 3) {
    throw "lookAt 第二个参数必须是 vec3";
  }
  if (!Array.isArray(eye) || eye.length !== 3) {
    throw "lookAt 第三个参数必须是 vec3";
  }

  if (equal(up, eye)) {
    // 平面法向量 跟 观察正向向量 线性相关
    return mat4();
  }

  const n = normalize(subtract(eye, at)); // x
  const v = normalize(cross(n, up)); // y
  const p = normalize(cross(n, v)); // z

  return mat4(
    // -dot(n, eye))
    // a*b = |a| |b| cosO
    // |a| = 1  ;
    // 所以  a * b = b * cosO
    // a * b是eye 在新标架上的投影 。
    // 表示原先标架 到 新标架的需要在三个坐标轴减去这些差值
    vec4(n, -dot(n, eye)),
    vec4(v, -dot(v, eye)),
    vec4(p, -dot(p, eye)),
    vec4()
  );
}

/**
 * 矩阵相乘
 * @param {*} u 
 * @param {*} v 
 * @returns 
 */
function mult(u, v) {
  var result = [];

  if (u.matrix && v.matrix) {
    if (u.length != v.length) {
      throw "矩阵行数不同";
    }

    for (var i = 0; i < u.length; ++i) {
      if (u[i].length != v[i].length) {
        throw "矩阵列数不同";
      }
    }

    for (var i = 0; i < u.length; ++i) {
      result.push([]);

      for (var j = 0; j < v.length; ++j) {
        var sum = 0.0;
        for (var k = 0; k < u.length; ++k) {
          sum += u[i][k] * v[k][j];
        }
        result[i].push(sum);
      }
    }

    result.matrix = true;

    return result;
  } else {
    if (u.length != v.length) {
      throw "向量维度不同";
    }

    for (var i = 0; i < u.length; ++i) {
      result.push(u[i] * v[i]);
    }

    return result;
  }
}

/**
 * 规范化平行投影矩阵
 * 将点变成[-1, 1]可视体内的点
 * @param {*} left 
 * @param {*} right
 * @param {*} bottom
 * @param {*} top
 * @param {*} near
 * @param {*} far
 */
function ortho(left, right, bottom, top, near, far) {
  const w = right - left;
  const h = top - bottom;
  const d = far - near;
  return mat4(2.0 / w, 0.0, 0.0, -1* (right+ left)/w,
              0.0, 2.0 / h, 0.0, -1* (top + bottom)/h,
              0.0, 0.0, -2.0 / d, -1* (far+ near)/d,
              0.0, 0.0, 0.0, 1.0);
}
