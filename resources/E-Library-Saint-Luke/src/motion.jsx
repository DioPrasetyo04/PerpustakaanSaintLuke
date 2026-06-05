// motion.jsx — Subtle motion primitives (no framer-motion dependency)
const { useEffect, useRef, useState, useMemo, useCallback } = React;

/* useReveal — IntersectionObserver-based scroll reveal */
function useReveal(opts = {}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (shown) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } });
      },
      { threshold: opts.threshold ?? 0.12, rootMargin: opts.rootMargin ?? '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);
  return [ref, shown];
}

/* Reveal — applies .reveal / .reveal.in to children */
function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, shown] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* Stagger — wraps children, each in their own Reveal with delay */
function Stagger({ step = 70, initial = 0, className = '', children }) {
  const arr = React.Children.toArray(children);
  return (
    <div className={className}>
      {arr.map((c, i) => (
        <Reveal key={i} delay={initial + i * step}>{c}</Reveal>
      ))}
    </div>
  );
}

/* Counter — animates from 0 to value when in view */
function Counter({ value, duration = 1400, className = '', format = (v) => v.toLocaleString('id-ID') }) {
  const [ref, shown] = useReveal();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!shown) return;
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, value, duration]);
  return <span ref={ref} className={`tabnum ${className}`}>{format(n)}</span>;
}

/* PageTransition — fades in on mount and on key change */
function PageTransition({ pageKey, children }) {
  const [stage, setStage] = useState('out');
  useEffect(() => {
    setStage('out');
    const t = setTimeout(() => setStage('in'), 16);
    return () => clearTimeout(t);
  }, [pageKey]);
  return (
    <div className={`page-enter ${stage === 'in' ? 'in' : ''}`}>
      {children}
    </div>
  );
}

Object.assign(window, { useReveal, Reveal, Stagger, Counter, PageTransition });
