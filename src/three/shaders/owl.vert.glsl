uniform float uTime;
uniform vec2  uMouse;         // posição do cursor no espaço da cena
uniform float uMouseRadius;
uniform float uMouseStrength;
uniform float uProgress;      // 0 = logo formada, 1 = dissolvida
uniform float uSize;
uniform float uPixelRatio;
uniform float uScale;

attribute vec3 aColor;
attribute vec4 aSeed;

varying vec3  vColor;
varying float vFade;

void main() {
  vec3 pos = position * uScale;

  // Respiração: cada partícula oscila na sua própria fase e frequência, senão
  // a nuvem inteira pulsaria junto e pareceria uma imagem sendo escalada.
  float phase = aSeed.x * 6.2831853;
  float speed = 0.35 + aSeed.y * 0.5;
  pos.x += sin(uTime * speed + phase) * 0.012 * uScale;
  pos.y += cos(uTime * speed * 0.9 + phase) * 0.012 * uScale;
  pos.z += sin(uTime * speed * 0.7 + phase) * 0.03 * uScale;

  // Repulsão do cursor: empurra radialmente, com queda suave até o raio.
  vec2  toMouse = pos.xy - uMouse;
  float dist    = length(toMouse);
  float force   = smoothstep(uMouseRadius, 0.0, dist) * uMouseStrength;
  pos.xy += normalize(toMouse + 1e-6) * force;

  // Dissolução no scroll: cada partícula sai numa direção própria, as de fora
  // partindo antes das de dentro — a logo se desfaz de fora para dentro.
  float radial   = length(position);
  float stagger  = clamp(uProgress * 1.6 - radial * 0.5 - aSeed.z * 0.3, 0.0, 1.0);
  vec3  drift    = normalize(vec3(position.xy + 1e-6, aSeed.w - 0.5));
  pos += drift * stagger * stagger * 2.4 * uScale;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;

  // Perspectiva: o que está longe desenha menor.
  gl_PointSize = uSize * uPixelRatio * (1.0 / max(0.001, -mv.z));

  vColor = aColor;
  vFade  = 1.0 - stagger;
}
