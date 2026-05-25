export default function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        background: "oklch(0.06 0.02 260)",
      }}
    >
      {/* Base layer */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 40%, oklch(0.35 0.22 210 / 0.45) 0%, transparent 70%), radial-gradient(ellipse 70% 50% at 80% 70%, oklch(0.35 0.25 320 / 0.40) 0%, transparent 70%)",
          animation: "aurora-drift 14s ease-in-out infinite",
        }}
      />
      {/* Mid layer — offset phase */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 60% 20%, oklch(0.30 0.18 140 / 0.35) 0%, transparent 65%), radial-gradient(ellipse 50% 60% at 30% 80%, oklch(0.30 0.20 270 / 0.35) 0%, transparent 65%)",
          animation: "aurora-drift 18s ease-in-out infinite reverse",
        }}
      />
      {/* Top shimmer */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 30% at 50% 10%, oklch(0.55 0.22 60 / 0.20) 0%, transparent 60%)",
          animation: "aurora-drift 10s ease-in-out infinite 4s",
        }}
      />
      {/* Noise overlay for depth */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />
    </div>
  );
}
