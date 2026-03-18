'use client'

import { Environment } from '@react-three/drei'

export default function StudioLighting() {
  return (
    <>
      {/* Bright HDRI environment — studio preset for even, clean lighting */}
      <Environment preset="studio" environmentIntensity={1.2} />

      {/* Key light — bright warm light from upper right */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={4}
        color="#FFF8EC"
      />

      {/* Fill light — strong from left to eliminate dark shadows */}
      <directionalLight
        position={[-5, 5, 4]}
        intensity={3}
        color="#FFF5E0"
      />

      {/* Front fill — directly in front, ensures dial is always lit */}
      <directionalLight
        position={[0, 2, 8]}
        intensity={2.5}
        color="#FFFFFF"
      />

      {/* Rim light — from behind for edge definition */}
      <directionalLight
        position={[0, 4, -6]}
        intensity={2}
        color="#FFFFFF"
      />

      {/* Bottom fill — lifts shadows on underside of case and strap */}
      <directionalLight
        position={[0, -4, 3]}
        intensity={1.5}
        color="#E8DCC8"
      />

      {/* Strong ambient — guarantees nothing goes pure black */}
      <ambientLight intensity={0.6} color="#FFFFFF" />
    </>
  )
}
