import { HeroSection } from '@/components/sections/HeroSection'
import { PhilosophySection } from '@/components/sections/PhilosophySection'
import { LifestyleSection } from '@/components/sections/LifestyleSection'
import { CollectionPreview } from '@/components/sections/CollectionPreview'
import { CraftsmanshipSection } from '@/components/sections/CraftsmanshipSection'
import { TestimonialSection } from '@/components/sections/TestimonialSection'
import { CTASection } from '@/components/sections/CTASection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PhilosophySection />
      <LifestyleSection />
      <CollectionPreview />
      <CraftsmanshipSection />
      <TestimonialSection />
      <CTASection />
    </main>
  )
}
