'use client'

import { OrbitControls } from '@react-three/drei'

interface WatchControlsProps {
  enableZoom?: boolean
  autoRotate?: boolean
  autoRotateSpeed?: number
}

export default function WatchControls({
  enableZoom = false,
  autoRotate = false,
  autoRotateSpeed = 0.5,
}: WatchControlsProps) {
  return (
    <OrbitControls
      enableZoom={enableZoom}
      enablePan={false}
      autoRotate={autoRotate}
      autoRotateSpeed={autoRotateSpeed}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 1.5}
      dampingFactor={0.05}
      enableDamping
    />
  )
}
