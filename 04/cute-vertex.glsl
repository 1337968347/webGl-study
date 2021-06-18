attribute vec4 vPosition;
attribute vec4 vColor;
varying vec4 fColor;

uniform mat4 modelView;
uniform mat4 projection;

void main() {
   mat4 tra = mat4(  1.0, 0.0, 0.0, 0.0, 
                     0.0, 1.0, 0.0, 0.0,
                     0.0, 0.0, 1.0, 0.0,
                     0.0, 0.0, 0.0, 1.0);
   gl_Position = projection * modelView * tra * vPosition;
   fColor = vColor;
}