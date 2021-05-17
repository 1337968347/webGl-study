async function initShaders(gl, vertexPath, fragmentPath) {

    // vertex shader init 
    const vShader = gl.createShader(gl.VERTEX_SHADER)
    const vSource = await (await fetch(vertexPath)).text()
    gl.shaderSource(vShader, vSource)
    gl.compileShader(vShader)

    if (!gl.getShaderParameter(vShader, gl.COMPILE_STATUS)) {
        console.error(`compileShader err : ${gl.getShaderInfoLog(vShader)} `)
        return false
    }

    // fragment shader init 
    const fShader = gl.createShader(gl.FRAGMENT_SHADER)
    const fSource = await (await fetch(fragmentPath)).text()

    gl.shaderSource(fShader, fSource)
    gl.compileShader(fShader)

    if (!gl.getShaderParameter(fShader, gl.COMPILE_STATUS)) {
        console.error(`compileShader err : ${gl.getShaderInfoLog(fShader)} `)
        return false
    }

    const program = gl.createProgram()
    gl.attachShader(program, vShader)
    gl.attachShader(program, fShader)
    gl.linkProgram(program)
    return program

}