import Image from 'next/image'
import Link from 'next/link'
import type { MDXComponents } from 'mdx/types'

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="text-2xl md:text-3xl font-serif font-bold text-cc-white mt-16 mb-6 scroll-mt-24"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="text-xl md:text-2xl font-serif font-bold text-cc-white mt-12 mb-4 scroll-mt-24"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="text-base md:text-lg text-cc-cream/80 font-sans font-light leading-relaxed mb-6"
      {...props}
    />
  ),
  a: ({ href, children, ...props }) => {
    const isInternal = href?.startsWith('/')
    if (isInternal) {
      return (
        <Link
          href={href!}
          className="text-cc-gold hover:text-cc-gold-light underline underline-offset-4 decoration-cc-gold/30 hover:decoration-cc-gold transition-colors"
          {...props}
        >
          {children}
        </Link>
      )
    }
    return (
      <a
        href={href}
        className="text-cc-gold hover:text-cc-gold-light underline underline-offset-4 decoration-cc-gold/30 hover:decoration-cc-gold transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    )
  },
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-cc-gold pl-6 my-8 italic font-serif text-lg text-cc-cream/80 leading-relaxed"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="list-disc list-outside pl-6 mb-6 space-y-2 text-base md:text-lg text-cc-cream/80 font-sans font-light leading-relaxed marker:text-cc-gold/60"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="list-decimal list-outside pl-6 mb-6 space-y-2 text-base md:text-lg text-cc-cream/80 font-sans font-light leading-relaxed marker:text-cc-gold/60"
      {...props}
    />
  ),
  li: (props) => <li className="pl-1" {...props} />,
  strong: (props) => (
    <strong className="font-medium text-cc-cream" {...props} />
  ),
  em: (props) => <em className="italic" {...props} />,
  hr: () => (
    <div className="my-12 flex justify-center">
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-cc-gold/40 to-transparent" />
    </div>
  ),
  table: (props) => (
    <div className="my-8 overflow-x-auto rounded-sm border border-cc-graphite">
      <table className="w-full text-sm font-sans" {...props} />
    </div>
  ),
  thead: (props) => (
    <thead className="bg-cc-charcoal" {...props} />
  ),
  th: (props) => (
    <th
      className="px-4 py-3 text-left text-[11px] uppercase tracking-[0.1em] text-cc-gold font-sans font-medium border-b border-cc-graphite"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="px-4 py-3 text-cc-cream/80 border-b border-cc-graphite/50"
      {...props}
    />
  ),
  tr: (props) => (
    <tr className="even:bg-cc-graphite/20" {...props} />
  ),
  code: (props) => (
    <code
      className="font-mono text-sm bg-cc-graphite/60 text-cc-gold-light px-1.5 py-0.5 rounded-sm"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="my-8 p-4 bg-cc-charcoal border border-cc-graphite rounded-sm overflow-x-auto font-mono text-sm text-cc-cream/80 leading-relaxed"
      {...props}
    />
  ),
  img: ({ src, alt, ...props }) => (
    <figure className="my-10">
      <div className="relative aspect-[16/9] overflow-hidden rounded-sm border border-cc-graphite">
        <Image
          src={src ?? ''}
          alt={alt ?? ''}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          {...props}
        />
      </div>
      {alt && (
        <figcaption className="mt-3 text-center text-xs text-cc-cream/60 font-sans italic">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
}
