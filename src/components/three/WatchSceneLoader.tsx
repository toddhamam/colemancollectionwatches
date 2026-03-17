'use client'

import dynamic from 'next/dynamic'

const WatchScene = dynamic(() => import('./WatchScene'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-12 h-12 rounded-full border border-[#C9A96E]/30 border-t-[#C9A96E] animate-spin" />
    </div>
  ),
})

interface WatchSceneLoaderProps {
  className?: string
  style?: React.CSSProperties
  enableZoom?: boolean
  autoRotate?: boolean
}

export default function WatchSceneLoader(props: WatchSceneLoaderProps) {
  return <WatchScene {...props} />
}
