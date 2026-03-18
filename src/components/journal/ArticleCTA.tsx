import Link from 'next/link'

export function ArticleCTA() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="max-w-3xl mx-auto text-center">
        <div className="w-12 h-px bg-cc-gold/40 mx-auto mb-8" />
        <p className="text-xs uppercase tracking-[0.2em] text-cc-gold font-sans mb-4">
          Your Timepiece Awaits
        </p>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-cc-white mb-4">
          Build Your Timepiece
        </h2>
        <p className="text-sm text-cc-cream/70 font-sans font-light mb-8 max-w-lg mx-auto leading-relaxed">
          Configure every detail — from movement to strap — and create a watch
          that is uniquely yours.
        </p>
        <Link
          href="/build"
          className="inline-block font-sans text-xs uppercase tracking-[0.2em] px-8 py-3 bg-cc-gold text-cc-black hover:bg-cc-gold-light transition-all duration-300"
        >
          Start Configuring
        </Link>
      </div>
    </section>
  )
}
