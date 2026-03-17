'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'

interface CanvasWrapperProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function CanvasWrapper({
  children,
  className,
  style,
}: CanvasWrapperProps) {
  return (
    <div className={className} style={style}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        flat
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  )
}
