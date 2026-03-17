'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

interface PlaceholderWatchProps {
  autoRotate?: boolean
  scale?: number
}

const GOLD = '#C9A96E'
const DARK_DIAL = '#0A0A0A'
const ROSE_GOLD = '#B76E79'

export default function PlaceholderWatch({
  autoRotate = true,
  scale = 1,
}: PlaceholderWatchProps) {
  const groupRef = useRef<Group>(null)

  useFrame((_state, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15
    }
  })

  const hourMarkers = useMemo(() => {
    const markers: {
      key: number
      position: [number, number, number]
      size: [number, number, number]
      rotation: [number, number, number]
    }[] = []

    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 - Math.PI / 2
      const isMajor = i % 3 === 0
      const length = isMajor ? 0.25 : 0.15
      const radius = 1.4
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius

      markers.push({
        key: i,
        position: [x, y, 0.16] as [number, number, number],
        size: [0.04, length, 0.02] as [number, number, number],
        rotation: [0, 0, angle + Math.PI / 2] as [number, number, number],
      })
    }

    return markers
  }, [])

  return (
    <group ref={groupRef} scale={scale}>
      {/* Watch case body (cylinder behind bezel) */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.05]}>
        <cylinderGeometry args={[1.75, 1.75, 0.3, 64]} />
        <meshStandardMaterial
          color="#B8953F"
          metalness={0.9}
          roughness={0.25}
        />
      </mesh>

      {/* Bezel (torus ring) */}
      <mesh>
        <torusGeometry args={[1.8, 0.15, 32, 100]} />
        <meshStandardMaterial
          color={GOLD}
          metalness={0.95}
          roughness={0.15}
        />
      </mesh>

      {/* Watch dial / face */}
      <mesh position={[0, 0, 0.1]}>
        <circleGeometry args={[1.65, 64]} />
        <meshStandardMaterial
          color={DARK_DIAL}
          metalness={0.3}
          roughness={0.8}
        />
      </mesh>

      {/* Hour markers */}
      {hourMarkers.map((marker) => (
        <mesh
          key={marker.key}
          position={marker.position}
          rotation={marker.rotation}
        >
          <boxGeometry args={marker.size} />
          <meshStandardMaterial
            color={GOLD}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Hour hand - pointing to ~10 o'clock */}
      <group position={[0, 0, 0.18]} rotation={[0, 0, Math.PI / 3]}>
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[0.04, 0.7, 0.02]} />
          <meshStandardMaterial
            color={GOLD}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Minute hand - pointing to ~2 o'clock */}
      <group position={[0, 0, 0.2]} rotation={[0, 0, -Math.PI / 3]}>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.03, 1.0, 0.02]} />
          <meshStandardMaterial
            color={GOLD}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Second hand - pointing to ~8 o'clock */}
      <group
        position={[0, 0, 0.22]}
        rotation={[0, 0, (4 * Math.PI) / 3]}
      >
        <mesh position={[0, 0.55, 0]}>
          <boxGeometry args={[0.01, 1.1, 0.01]} />
          <meshStandardMaterial
            color={ROSE_GOLD}
            metalness={0.85}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Center pin */}
      <mesh position={[0, 0, 0.24]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color={GOLD}
          metalness={0.95}
          roughness={0.15}
        />
      </mesh>

      {/* Crown (at 3 o'clock position) */}
      <mesh
        position={[2.05, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} />
        <meshStandardMaterial
          color={GOLD}
          metalness={0.85}
          roughness={0.4}
        />
      </mesh>

      {/* Sub-dial decoration at 6 o'clock */}
      <mesh position={[0, -0.8, 0.12]}>
        <torusGeometry args={[0.3, 0.02, 16, 32]} />
        <meshStandardMaterial
          color={GOLD}
          metalness={0.8}
          roughness={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  )
}
