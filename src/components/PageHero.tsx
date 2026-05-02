export function PageHero({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <section className="bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-accent/15 blur-3xl pointer-events-none" />
      <div className="container-tight py-20 md:py-28 relative">
        {eyebrow && (
          <div className="flex items-center gap-3 mb-6 text-xs uppercase tracking-[0.2em] text-accent font-semibold">
            <span className="accent-rule" />
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-balance leading-[1] tracking-tight font-extrabold text-[clamp(2.25rem,5vw,4rem)] max-w-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/75 leading-relaxed">{description}</p>
        )}
      </div>
    </section>
  );
}
