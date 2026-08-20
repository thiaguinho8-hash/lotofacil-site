// Poeira dourada bem discreta flutuando no fundo do site inteiro — decorativo,
// puro CSS (sem canvas/JS por frame). Valores fixos (não randômicos) pra não
// gerar mismatch de hidratação entre servidor e cliente.
const PARTICULAS = [
  { left: "3%", size: 3, duration: 26, delay: -4, drift: 24, opacity: 0.35 },
  { left: "9%", size: 2, duration: 21, delay: -14, drift: -18, opacity: 0.3 },
  { left: "16%", size: 4, duration: 30, delay: -8, drift: 16, opacity: 0.4 },
  { left: "24%", size: 2, duration: 19, delay: -2, drift: -22, opacity: 0.3 },
  { left: "32%", size: 3, duration: 27, delay: -19, drift: 20, opacity: 0.35 },
  { left: "40%", size: 2, duration: 23, delay: -11, drift: -14, opacity: 0.3 },
  { left: "48%", size: 4, duration: 32, delay: -6, drift: 26, opacity: 0.4 },
  { left: "55%", size: 2, duration: 20, delay: -17, drift: -20, opacity: 0.3 },
  { left: "62%", size: 3, duration: 28, delay: -1, drift: 18, opacity: 0.35 },
  { left: "70%", size: 2, duration: 22, delay: -13, drift: -16, opacity: 0.3 },
  { left: "77%", size: 4, duration: 31, delay: -9, drift: 22, opacity: 0.4 },
  { left: "84%", size: 2, duration: 18, delay: -5, drift: -24, opacity: 0.3 },
  { left: "91%", size: 3, duration: 25, delay: -21, drift: 20, opacity: 0.35 },
  { left: "97%", size: 2, duration: 24, delay: -16, drift: -18, opacity: 0.3 },
];

export default function GoldParticles() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {PARTICULAS.map((p, i) => (
        <span
          key={i}
          className="particle-gold"
          style={
            {
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--particle-drift": `${p.drift}px`,
              "--particle-opacity": p.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
