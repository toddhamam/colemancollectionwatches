'use client'

import CanvasWrapper from './CanvasWrapper'
import StudioLighting from './StudioLighting'
import PlaceholderWatch from './PlaceholderWatch'
import WatchControls from './WatchControls'

interface WatchSceneProps {
  className?: string
  style?: React.CSSProperties
  enableZoom?: boolean
  autoRotate?: boolean
}

export default function WatchScene({
  className,
  style,
  enableZoom = false,
  autoRotate = true,
}: WatchSceneProps) {
  return (
    <CanvasWrapper className={className} style={style}>
      <StudioLighting />
      <PlaceholderWatch autoRotate={autoRotate} />
      <WatchControls enableZoom={enableZoom} />
    </CanvasWrapper>
  )
}
