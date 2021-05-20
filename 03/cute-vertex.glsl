attribute vec4 vPosition;
attribute vec4 vColor;
varying vec4 fColor;

uniform vec3 theta;
vec3 angles = radians(theta);

// quaternion multiplier

vec4 multq(vec4 a, vec4 b)
{
   return(vec4(a.x*b.x - dot(a.yzw, b.yzw), a.x*b.yzw+b.x*a.yzw+cross(b.yzw, a.yzw)));
}

// inverse quaternion

vec4 invq(vec4 a)
{
   return(vec4(a.x, -a.yzw)/dot(a,a));
}

void main(){
    vec4 r;
    vec4 p;
    vec4 rx, ry, rz;
    vec3 c =  cos(angles/2.0);
    vec3 s =  sin(angles/2.0);
    rx = vec4(c.x, s.x, 0.0, 0.0); // x rotation quaternion
    ry = vec4(c.y, 0.0, s.y, 0.0); // y rotation quaternion
    rz = vec4(c.z, 0.0, 0.0, s.z); // z rotation quaternion
    r = multq(rx, multq(ry, rz)); // rotation quaternion
    p = vec4(0.0, vPosition.xyz);  // input point quaternion
    p = multq(r, multq(p, invq(r))); // rotated point quaternion
    gl_Position = vec4( p.yzw, 1.0); // convert back to homogeneous coordinates
    fColor = vColor;
}