export function PageHero({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <section className="bg-primary text-primary-foreground relative overflow-hidden">
      <div className="hero-installateur-bg absolute inset-0" />
      <div className="premium-grid absolute inset-0 opacity-65 pointer-events-none" />
      <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-accent/[0.22] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-44 left-1/3 h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="container-tight py-20 md:py-28 relative">
        {eyebrow && (
          <div className="inline-flex items-center gap-3 mb-6 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/[0.88] font-bold backdrop-blur">
            <span className="accent-rule" />
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-balance leading-[0.98] tracking-tight font-extrabold text-[clamp(2.25rem,5vw,4.25rem)] max-w-3xl drop-shadow-[0_10px_28px_rgba(0,0,0,0.22)]">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/[0.78] leading-relaxed">{description}</p>
        )}
      </div>
    </section>
  );
}
