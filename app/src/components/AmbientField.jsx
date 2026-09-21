import { useEffect, useRef, useState } from "react";

const NODE_COLORS = [
  [59, 154, 250],
  [124, 122, 255],
  [42, 212, 224],
  [255, 107, 168],
];

function AmbientField() {
  const canvasRef = useRef(null);
  const [off, setOff] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOff(true);
      return;
    }

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0, on: false };
    const dprCap = 1.75;

    const nodes = [];
    const bubbles = [];
    const chain = [];
    const sparks = [];

    function sizeFor() {
      const area = width * height;
      if (area < 500000) return { n: 22, b: 10, c: 8 };
      if (area < 1200000) return { n: 38, b: 14, c: 10 };
      return { n: 56, b: 18, c: 12 };
    }

    function spawnNode() {
      const [r, g, b] = NODE_COLORS[(Math.random() * NODE_COLORS.length) | 0];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: 1.4 + Math.random() * 2.4,
        rgb: [r, g, b],
        pulse: Math.random() * Math.PI * 2,
      };
    }

    function spawnBubble() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: 10 + Math.random() * 28,
        vy: 0.18 + Math.random() * 0.42,
        vx: (Math.random() - 0.5) * 0.16,
        a: 0.06 + Math.random() * 0.08,
      };
    }

    function rebuild() {
      const counts = sizeFor();
      nodes.length = 0;
      bubbles.length = 0;
      chain.length = 0;
      sparks.length = 0;
      for (let i = 0; i < counts.n; i += 1) nodes.push(spawnNode());
      for (let i = 0; i < counts.b; i += 1) bubbles.push(spawnBubble());
      for (let i = 0; i < counts.c; i += 1) {
        chain.push({
          x: width * 0.38,
          y: height * 0.4,
          r: 7.4 - i * 0.36,
        });
      }
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!nodes.length) rebuild();
    }

    function onPointer(e) {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
      mouse.on = true;
    }

    function onLeave() {
      mouse.on = false;
    }

    function wrap(p, pad) {
      if (p.x < -pad) p.x = width + pad;
      if (p.x > width + pad) p.x = -pad;
      if (p.y < -pad) p.y = height + pad;
      if (p.y > height + pad) p.y = -pad;
    }

    function tick(now) {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      const t = now / 1000;

      if (!mouse.on) {
        mouse.tx = width * 0.4 + Math.cos(t * 0.35) * Math.min(140, width * 0.14);
        mouse.ty = height * 0.38 + Math.sin(t * 0.28) * Math.min(70, height * 0.1);
      }
      mouse.x += (mouse.tx - mouse.x) * 0.14;
      mouse.y += (mouse.ty - mouse.y) * 0.14;

      ctx.clearRect(0, 0, width, height);

      const halo = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 260);
      halo.addColorStop(0, "rgba(124,122,255,0.22)");
      halo.addColorStop(0.32, "rgba(59,154,250,0.12)");
      halo.addColorStop(1, "rgba(59,154,250,0)");
      ctx.fillStyle = halo;
      ctx.fillRect(mouse.x - 220, mouse.y - 220, 440, 440);

      bubbles.forEach((b) => {
        b.y -= b.vy;
        b.x += b.vx + Math.sin(t + b.x * 0.01) * 0.12;
        if (b.y + b.r < -10) {
          b.y = height + b.r;
          b.x = Math.random() * width;
        }
        const g = ctx.createRadialGradient(b.x, b.y, 1, b.x, b.y, b.r);
        g.addColorStop(0, `rgba(255,255,255,${b.a + 0.08})`);
        g.addColorStop(0.45, `rgba(59,154,250,${b.a})`);
        g.addColorStop(1, "rgba(124,122,255,0)");
        ctx.beginPath();
        ctx.fillStyle = g;
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      const linkDist = Math.min(150, width * 0.14);
      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > linkDist * linkDist) continue;
          const d = Math.sqrt(d2);
          const alpha = (1 - d / linkDist) * 0.32;
          ctx.strokeStyle = `rgba(59,154,250,${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      nodes.forEach((n) => {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < 220) {
          n.vx += (dx / dist) * 0.012;
          n.vy += (dy / dist) * 0.012;
        }
        n.vx *= 0.992;
        n.vy *= 0.992;
        n.x += n.vx;
        n.y += n.vy;
        wrap(n, 20);
        n.pulse += 0.03;
        const glow = 0.55 + Math.sin(n.pulse) * 0.25;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${n.rgb[0]},${n.rgb[1]},${n.rgb[2]},${0.32 + glow * 0.22})`;
        ctx.arc(n.x, n.y, n.r * 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = `rgba(${n.rgb[0]},${n.rgb[1]},${n.rgb[2]},${0.7 + glow * 0.25})`;
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      chain.forEach((c, i) => {
        const target = i === 0 ? mouse : chain[i - 1];
        const ease = i === 0 ? 0.22 : 0.18 - Math.min(i, 8) * 0.008;
        c.x += (target.x - c.x) * ease;
        c.y += (target.y - c.y) * ease;
      });

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (let i = 1; i < chain.length; i += 1) {
        const a = chain[i - 1];
        const b = chain[i];
        const midX = (a.x + b.x) / 2;
        const midY = (a.y + b.y) / 2;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(124,122,255,${0.72 - i * 0.04})`;
        ctx.lineWidth = Math.max(1.6, 5.6 - i * 0.3);
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(a.x + (b.y - a.y) * 0.12, a.y - (b.x - a.x) * 0.12, b.x, b.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = `rgba(42,212,224,${0.22 - i * 0.012})`;
        ctx.lineWidth = 1.2;
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(midX, midY);
        ctx.stroke();
      }

      chain.forEach((c, i) => {
        const rgb = NODE_COLORS[i % NODE_COLORS.length];
        ctx.beginPath();
        ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.18)`;
        ctx.arc(c.x, c.y, c.r * 2.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.95)`;
        ctx.arc(c.x, c.y, Math.max(2.2, c.r), 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.arc(c.x - 1, c.y - 1, Math.max(1, c.r * 0.32), 0, Math.PI * 2);
        ctx.fill();
      });

      if (sparks.length < 10 && Math.random() < 0.08 && chain.length > 2) {
        const i = 1 + ((Math.random() * (chain.length - 2)) | 0);
        sparks.push({ i, p: 0, speed: 0.018 + Math.random() * 0.02 });
      }
      for (let s = sparks.length - 1; s >= 0; s -= 1) {
        const spark = sparks[s];
        spark.p += spark.speed;
        if (spark.p >= 1 || !chain[spark.i] || !chain[spark.i - 1]) {
          sparks.splice(s, 1);
          continue;
        }
        const a = chain[spark.i - 1];
        const b = chain[spark.i];
        const x = a.x + (b.x - a.x) * spark.p;
        const y = a.y + (b.y - a.y) * spark.p;
        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function onVisibility() {
      running = document.visibilityState !== "hidden";
      if (running) raf = requestAnimationFrame(tick);
      else cancelAnimationFrame(raf);
    }

    resize();
    mouse.x = mouse.tx = width * 0.4;
    mouse.y = mouse.ty = height * 0.38;
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  if (off) return null;

  return (
    <div className="ambient" aria-hidden="true">
      <canvas ref={canvasRef} className="ambient-canvas" />
      <div className="ambient-bubbles">
        {Array.from({ length: 12 }, (_, i) => <span key={i} />)}
      </div>
    </div>
  );
}

export default AmbientField;
