'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Group } from 'three'
import { type WatchMaterials } from '@/lib/configurator'

interface ConfigurableWatchProps {
  materials: WatchMaterials
  autoRotate?: boolean
  scale?: number
}

export default function ConfigurableWatch({
  materials,
  autoRotate = true,
  scale = 1,
}: ConfigurableWatchProps) {
  const groupRef = useRef<Group>(null)

  useFrame((_state, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08
    }
  })

  const hourMarkers = useMemo(() => {
    const markers: {
      key: number
      position: [number, number, number]
      size: [number, number, number]
      rotation: [number, number, number]
      isMajor: boolean
    }[] = []

    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 - Math.PI / 2
      const isMajor = i % 3 === 0
      const length = isMajor ? 0.22 : 0.12
      const width = isMajor ? 0.035 : 0.02
      const radius = 1.32
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius

      markers.push({
        key: i,
        position: [x, y, 0.16],
        size: [width, length, 0.015],
        rotation: [0, 0, angle + Math.PI / 2],
        isMajor,
      })
    }

    return markers
  }, [])

  // Minute markers (60 ticks)
  const minuteMarkers = useMemo(() => {
    const markers: {
      key: number
      position: [number, number, number]
      size: [number, number, number]
      rotation: [number, number, number]
    }[] = []

    for (let i = 0; i < 60; i++) {
      if (i % 5 === 0) continue // skip hour positions
      const angle = (i / 60) * Math.PI * 2 - Math.PI / 2
      const radius = 1.38
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius

      markers.push({
        key: i,
        position: [x, y, 0.16],
        size: [0.008, 0.06, 0.01],
        rotation: [0, 0, angle + Math.PI / 2],
      })
    }

    return markers
  }, [])

  // Roman numeral positions for XII, III, VI, IX
  const romanNumerals = useMemo(() => {
    const positions: {
      key: string
      position: [number, number, number]
      rotation: [number, number, number]
      scale: [number, number, number]
    }[] = [
      // XII (top)
      { key: 'XII', position: [0, 1.1, 0.16], rotation: [0, 0, 0], scale: [0.12, 0.18, 0.015] },
      // III (right) - small
      { key: 'III', position: [1.1, 0, 0.16], rotation: [0, 0, 0], scale: [0.1, 0.14, 0.015] },
      // VI - skip, open heart is there
      // IX (left)
      { key: 'IX', position: [-1.1, 0, 0.16], rotation: [0, 0, 0], scale: [0.1, 0.14, 0.015] },
    ]
    return positions
  }, [])

  return (
    <group ref={groupRef} scale={scale} position={[0, 0, 0]}>
      {/* ===== CASE BODY ===== */}
      {/* Main case — slightly tapered */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.05]}>
        <cylinderGeometry args={[1.68, 1.72, 0.28, 64]} />
        <meshStandardMaterial
          color={materials.caseColor}
          metalness={materials.caseMetal}
          roughness={materials.caseRough}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Case mid-band — polished ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.05]}>
        <cylinderGeometry args={[1.73, 1.73, 0.12, 64]} />
        <meshStandardMaterial
          color={materials.bezelColor}
          metalness={0.98}
          roughness={0.08}
          envMapIntensity={2}
        />
      </mesh>

      {/* ===== BEZEL ===== */}
      <mesh>
        <torusGeometry args={[1.72, 0.1, 32, 100]} />
        <meshStandardMaterial
          color={materials.bezelColor}
          metalness={0.97}
          roughness={0.1}
          envMapIntensity={2}
        />
      </mesh>

      {/* Inner bezel ring — thin accent */}
      <mesh position={[0, 0, 0.07]}>
        <torusGeometry args={[1.6, 0.02, 16, 100]} />
        <meshStandardMaterial
          color={materials.bezelColor}
          metalness={0.95}
          roughness={0.15}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* ===== DIAL ===== */}
      <mesh position={[0, 0, 0.1]}>
        <circleGeometry args={[1.58, 64]} />
        <meshStandardMaterial
          color={materials.dialColor}
          metalness={0.15}
          roughness={0.6}
          envMapIntensity={0.4}
        />
      </mesh>

      {/* Dial sunburst texture — subtle radial lines */}
      {Array.from({ length: 36 }, (_, i) => {
        const angle = (i / 36) * Math.PI * 2
        const x1 = Math.cos(angle) * 0.3
        const y1 = Math.sin(angle) * 0.3
        const x2 = Math.cos(angle) * 1.55
        const y2 = Math.sin(angle) * 1.55
        const midX = (x1 + x2) / 2
        const midY = (y1 + y2) / 2
        const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
        return (
          <mesh
            key={`sunburst-${i}`}
            position={[midX, midY, 0.105]}
            rotation={[0, 0, angle + Math.PI / 2]}
          >
            <boxGeometry args={[0.003, len, 0.001]} />
            <meshStandardMaterial
              color={materials.dialColor}
              metalness={0.4}
              roughness={0.3}
              transparent
              opacity={0.15}
            />
          </mesh>
        )
      })}

      {/* ===== HOUR MARKERS ===== */}
      {hourMarkers.map((marker) => (
        <mesh
          key={marker.key}
          position={marker.position}
          rotation={marker.rotation}
        >
          <boxGeometry args={marker.size} />
          <meshStandardMaterial
            color={materials.markerColor}
            metalness={0.95}
            roughness={0.1}
            envMapIntensity={2}
          />
        </mesh>
      ))}

      {/* Minute markers */}
      {minuteMarkers.map((marker) => (
        <mesh
          key={marker.key}
          position={marker.position}
          rotation={marker.rotation}
        >
          <boxGeometry args={marker.size} />
          <meshStandardMaterial
            color={materials.markerColor}
            metalness={0.9}
            roughness={0.2}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}

      {/* ===== BRAND TEXT PLACEHOLDER ===== */}
      {/* CC monogram — simplified as two arcs */}
      {romanNumerals.map((rn) => (
        <mesh key={rn.key} position={rn.position} rotation={rn.rotation}>
          <boxGeometry args={rn.scale} />
          <meshStandardMaterial
            color={materials.markerColor}
            metalness={0.9}
            roughness={0.15}
            envMapIntensity={1.5}
          />
        </mesh>
      ))}

      {/* ===== HANDS ===== */}
      {/* Hour hand — tapered */}
      <group position={[0, 0, 0.18]} rotation={[0, 0, Math.PI / 3]}>
        <mesh position={[0, 0.32, 0]}>
          <boxGeometry args={[0.05, 0.64, 0.018]} />
          <meshStandardMaterial
            color={materials.handColor}
            metalness={0.95}
            roughness={0.1}
            envMapIntensity={2}
          />
        </mesh>
        {/* Lume dot */}
        <mesh position={[0, 0.58, 0.01]}>
          <circleGeometry args={[0.02, 8]} />
          <meshStandardMaterial
            color="#E8E4D4"
            emissive="#E8E4D4"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      {/* Minute hand — longer and thinner */}
      <group position={[0, 0, 0.2]} rotation={[0, 0, -Math.PI / 4]}>
        <mesh position={[0, 0.48, 0]}>
          <boxGeometry args={[0.035, 0.96, 0.015]} />
          <meshStandardMaterial
            color={materials.handColor}
            metalness={0.95}
            roughness={0.1}
            envMapIntensity={2}
          />
        </mesh>
        {/* Lume dot */}
        <mesh position={[0, 0.9, 0.01]}>
          <circleGeometry args={[0.015, 8]} />
          <meshStandardMaterial
            color="#E8E4D4"
            emissive="#E8E4D4"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      {/* Second hand — very thin, gold accent */}
      <group position={[0, 0, 0.22]} rotation={[0, 0, (4 * Math.PI) / 3]}>
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[0.008, 1.1, 0.008]} />
          <meshStandardMaterial
            color="#C9A96E"
            metalness={0.9}
            roughness={0.15}
            envMapIntensity={1.5}
          />
        </mesh>
        {/* Counterweight */}
        <mesh position={[0, -0.12, 0]}>
          <boxGeometry args={[0.025, 0.2, 0.008]} />
          <meshStandardMaterial
            color="#C9A96E"
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
      </group>

      {/* Center pin — polished */}
      <mesh position={[0, 0, 0.24]}>
        <cylinderGeometry args={[0.05, 0.05, 0.04, 16]} />
        <meshStandardMaterial
          color={materials.bezelColor}
          metalness={0.98}
          roughness={0.05}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* ===== OPEN HEART at 6 o'clock ===== */}
      {/* Aperture ring */}
      <mesh position={[0, -0.7, 0.12]}>
        <torusGeometry args={[0.28, 0.025, 16, 32]} />
        <meshStandardMaterial
          color={materials.bezelColor}
          metalness={0.95}
          roughness={0.1}
          envMapIntensity={2}
        />
      </mesh>

      {/* Visible movement — rotating wheels */}
      <group position={[0, -0.7, 0.1]}>
        {/* Balance wheel simulation */}
        <BalanceWheel color={materials.markerColor} />
        {/* Movement plate */}
        <mesh position={[0, 0, -0.01]}>
          <circleGeometry args={[0.26, 32]} />
          <meshStandardMaterial
            color="#B8953F"
            metalness={0.85}
            roughness={0.3}
            envMapIntensity={1.2}
          />
        </mesh>
      </group>

      {/* ===== SAPPHIRE CRYSTAL ===== */}
      <mesh position={[0, 0, 0.14]}>
        <circleGeometry args={[1.65, 64]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          metalness={0}
          roughness={0}
          transmission={0.96}
          thickness={0.5}
          ior={1.77}
          transparent
          opacity={0.08}
          envMapIntensity={0.5}
        />
      </mesh>

      {/* Crystal edge — thin rim */}
      <mesh position={[0, 0, 0.14]}>
        <torusGeometry args={[1.66, 0.03, 8, 64]} />
        <meshStandardMaterial
          color="#FFFFFF"
          metalness={0.1}
          roughness={0.05}
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* ===== CROWN ===== */}
      {/* Crown body */}
      <mesh position={[1.95, 0, -0.02]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.12, 0.28, 16]} />
        <meshStandardMaterial
          color={materials.bezelColor}
          metalness={0.95}
          roughness={0.2}
          envMapIntensity={2}
        />
      </mesh>
      {/* Crown ridges */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2
        return (
          <mesh
            key={`crown-ridge-${i}`}
            position={[
              1.95 + Math.cos(angle) * 0.11,
              Math.sin(angle) * 0.11,
              -0.02,
            ]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.008, 0.008, 0.26, 4]} />
            <meshStandardMaterial
              color={materials.bezelColor}
              metalness={0.9}
              roughness={0.3}
            />
          </mesh>
        )
      })}
      {/* Crown tip */}
      <mesh position={[2.12, 0, -0.02]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.1, 0.06, 16]} />
        <meshStandardMaterial
          color={materials.bezelColor}
          metalness={0.97}
          roughness={0.1}
          envMapIntensity={2}
        />
      </mesh>

      {/* ===== LUGS ===== */}
      {/* Curved lugs — top pair */}
      <Lug position={[-0.55, 1.7, -0.06]} mirror={false} color={materials.caseColor} metal={materials.caseMetal} rough={materials.caseRough} />
      <Lug position={[0.55, 1.7, -0.06]} mirror={true} color={materials.caseColor} metal={materials.caseMetal} rough={materials.caseRough} />
      {/* Curved lugs — bottom pair */}
      <Lug position={[-0.55, -1.7, -0.06]} mirror={false} color={materials.caseColor} metal={materials.caseMetal} rough={materials.caseRough} flip />
      <Lug position={[0.55, -1.7, -0.06]} mirror={true} color={materials.caseColor} metal={materials.caseMetal} rough={materials.caseRough} flip />

      {/* ===== STRAP ===== */}
      {/* Top strap */}
      <group position={[0, 2.6, -0.06]}>
        <mesh>
          <boxGeometry args={[0.68, 1.9, 0.12]} />
          <meshStandardMaterial
            color={materials.strapColor}
            metalness={materials.strapMetal}
            roughness={materials.strapRough}
            envMapIntensity={materials.strapMetal > 0.5 ? 1.5 : 0.3}
          />
        </mesh>
        {/* Stitching lines */}
        {materials.strapMetal < 0.5 && (
          <>
            <mesh position={[-0.28, 0, 0.065]}>
              <boxGeometry args={[0.012, 1.85, 0.005]} />
              <meshStandardMaterial color={materials.strapColor} metalness={0} roughness={1} />
            </mesh>
            <mesh position={[0.28, 0, 0.065]}>
              <boxGeometry args={[0.012, 1.85, 0.005]} />
              <meshStandardMaterial color={materials.strapColor} metalness={0} roughness={1} />
            </mesh>
          </>
        )}
      </group>

      {/* Bottom strap — with taper */}
      <group position={[0, -2.6, -0.06]}>
        <mesh>
          <boxGeometry args={[0.68, 1.9, 0.12]} />
          <meshStandardMaterial
            color={materials.strapColor}
            metalness={materials.strapMetal}
            roughness={materials.strapRough}
            envMapIntensity={materials.strapMetal > 0.5 ? 1.5 : 0.3}
          />
        </mesh>
        {/* Stitching lines */}
        {materials.strapMetal < 0.5 && (
          <>
            <mesh position={[-0.28, 0, 0.065]}>
              <boxGeometry args={[0.012, 1.85, 0.005]} />
              <meshStandardMaterial color={materials.strapColor} metalness={0} roughness={1} />
            </mesh>
            <mesh position={[0.28, 0, 0.065]}>
              <boxGeometry args={[0.012, 1.85, 0.005]} />
              <meshStandardMaterial color={materials.strapColor} metalness={0} roughness={1} />
            </mesh>
          </>
        )}
      </group>

      {/* Buckle */}
      <mesh position={[0, -3.65, -0.02]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.18, 0.03, 8, 16, Math.PI]} />
        <meshStandardMaterial
          color={materials.bezelColor}
          metalness={0.95}
          roughness={0.15}
          envMapIntensity={2}
        />
      </mesh>
      {/* Buckle pin */}
      <mesh position={[0, -3.47, 0.0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.36, 8]} />
        <meshStandardMaterial
          color={materials.bezelColor}
          metalness={0.95}
          roughness={0.15}
        />
      </mesh>
    </group>
  )
}

/* ===== SUB-COMPONENTS ===== */

function BalanceWheel({ color }: { color: string }) {
  const ref = useRef<Group>(null)

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 3
    }
  })

  return (
    <group ref={ref}>
      {/* Wheel rim */}
      <mesh>
        <torusGeometry args={[0.18, 0.015, 8, 24]} />
        <meshStandardMaterial
          color={color}
          metalness={0.95}
          roughness={0.1}
          envMapIntensity={2}
        />
      </mesh>
      {/* Spokes */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
        <mesh key={i} rotation={[0, 0, angle]}>
          <boxGeometry args={[0.01, 0.36, 0.01]} />
          <meshStandardMaterial
            color={color}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
      ))}
      {/* Center jewel */}
      <mesh>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial
          color="#8B1A1A"
          metalness={0.3}
          roughness={0.2}
          emissive="#8B1A1A"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  )
}

function Lug({
  position,
  mirror,
  color,
  metal,
  rough,
  flip,
}: {
  position: [number, number, number]
  mirror: boolean
  color: string
  metal: number
  rough: number
  flip?: boolean
}) {
  const scaleX = mirror ? -1 : 1
  const scaleY = flip ? -1 : 1

  return (
    <group position={position} scale={[scaleX, scaleY, 1]}>
      <mesh rotation={[0, 0, -0.15]}>
        <boxGeometry args={[0.12, 0.35, 0.14]} />
        <meshStandardMaterial
          color={color}
          metalness={metal}
          roughness={rough}
          envMapIntensity={1.5}
        />
      </mesh>
      {/* Spring bar */}
      <mesh position={[0.15, 0.15, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.12, 8]} />
        <meshStandardMaterial
          color={color}
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>
    </group>
  )
}
