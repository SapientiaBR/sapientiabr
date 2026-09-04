uniform float uOpacity;

varying vec3  vColor;
varying float vFade;

void main() {
  // Ponto quadrado vira disco com borda suave.
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float alpha = smoothstep(0.5, 0.12, d);

  gl_FragColor = vec4(vColor, alpha * uOpacity * vFade);
}
