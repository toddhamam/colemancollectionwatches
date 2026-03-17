'use client'

export default function StudioLighting() {
  return (
    <>
      {/* Key light - warm, from upper right */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        color="#FFF5E0"
      />
      {/* Fill light - softer, from left */}
      <directionalLight
        position={[-3, 3, 2]}
        intensity={0.7}
        color="#E8DCC8"
      />
      {/* Rim light - from behind for edge highlights */}
      <directionalLight
        position={[0, 2, -5]}
        intensity={1}
        color="#FFFFFF"
      />
      {/* Subtle gold ambient */}
      <ambientLight intensity={0.3} color="#C9A96E" />
    </>
  )
}
