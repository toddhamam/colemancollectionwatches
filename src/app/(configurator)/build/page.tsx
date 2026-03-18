import type { Metadata } from 'next'
import { WatchConfigurator } from '@/components/configurator/WatchConfigurator'

export const metadata: Metadata = {
  title: 'Build Your Timepiece | Coleman Collection',
  description:
    'Design your custom Coleman Collection watch. Choose your model, movement, dial, and strap to create a timepiece that is uniquely yours.',
}

export default function BuildPage() {
  return <WatchConfigurator />
}
