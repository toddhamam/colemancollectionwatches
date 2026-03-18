'use client'

import { useState } from 'react'
import type { JournalFAQ } from '@/types/journal'

function FAQItem({ faq, index }: { faq: JournalFAQ; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-cc-graphite last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left cursor-pointer group"
        aria-expanded={isOpen}
      >
        <span className="text-base md:text-lg font-serif text-cc-white group-hover:text-cc-gold transition-colors">
          {faq.question}
        </span>
        <span
          className={`text-cc-gold text-xl leading-none mt-1 shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-5' : 'max-h-0'
        }`}
      >
        <p className="text-sm md:text-base text-cc-cream/80 font-sans font-light leading-relaxed pr-8">
          {faq.answer}
        </p>
      </div>
    </div>
  )
}

export function ArticleFAQ({ faqs }: { faqs: JournalFAQ[] }) {
  if (faqs.length === 0) return null

  return (
    <section className="mt-16 pt-12 border-t border-cc-graphite">
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-cc-white mb-8">
        Frequently Asked Questions
      </h2>
      <div className="border-t border-cc-graphite">
        {faqs.map((faq, index) => (
          <FAQItem key={index} faq={faq} index={index} />
        ))}
      </div>
    </section>
  )
}
