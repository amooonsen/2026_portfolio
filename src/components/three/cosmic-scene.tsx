"use client"

import { useRef, useMemo, useCallback, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Points, PointMaterial, Float } from "@react-three/drei"
import * as THREE from "three"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

/* ─── 별 필드 ─── */

function StarField({ count = 600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 50 + Math.random() * 150
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [count])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.008
      ref.current.rotation.x += delta * 0.003
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a78bfa"
        size={0.25}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

/* ─── 네뷸라 파티클 ─── */

function NebulaParticles({ count = 150 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    const nebulaColors = [
      new THREE.Color("#7c3aed"),
      new THREE.Color("#6366f1"),
      new THREE.Color("#ec4899"),
      new THREE.Color("#3b82f6"),
      new THREE.Color("#8b5cf6"),
    ]

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 8
      const radius = 5 + (i / count) * 30
      const spread = 10

      pos[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * spread
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 2
      pos[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * spread

      const color = nebulaColors[Math.floor(Math.random() * nebulaColors.length)]
      col[i * 3] = color.r
      col[i * 3 + 1] = color.g
      col[i * 3 + 2] = color.b
    }
    return [pos, col]
  }, [count])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02
    }
  })

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.8}
        sizeAttenuation
        depthWrite={false}
        opacity={0.25}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

/* ─── 떠다니는 빛 구체 ─── */

function GlowOrb({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  return (
    <Float speed={1.5} rotationIntensity={0} floatIntensity={2}>
      <mesh position={position}>
        <sphereGeometry args={[scale, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} />
      </mesh>
      <pointLight position={position} color={color} intensity={1.5} distance={30} />
    </Float>
  )
}

/* ─── 마우스 반응형 카메라 ─── */

function CameraRig() {
  const { camera } = useThree()
  const mouseRef = useRef({ x: 0, y: 0 })

  const handlePointerMove = useCallback((e: PointerEvent) => {
    mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
    mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
  }, [])

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    return () => window.removeEventListener("pointermove", handlePointerMove)
  }, [handlePointerMove])

  useFrame(() => {
    const targetX = mouseRef.current.x * 1.5
    const targetY = -mouseRef.current.y * 1

    camera.position.x += (targetX - camera.position.x) * 0.015
    camera.position.y += (targetY - camera.position.y) * 0.015
    camera.lookAt(0, 0, 0)
  })

  return null
}

/* ─── 메인 씬 내부 ─── */

function CosmicSceneInner() {
  return (
    <>
      <color attach="background" args={["#030014"]} />
      <fog attach="fog" args={["#030014", 60, 220]} />

      <ambientLight intensity={0.08} />

      <CameraRig />
      <StarField />
      <NebulaParticles />

      <GlowOrb position={[-15, 5, -20]} color="#7c3aed" scale={3} />
      <GlowOrb position={[20, -8, -15]} color="#ec4899" scale={2.5} />
      <GlowOrb position={[0, 10, -30]} color="#6366f1" scale={4} />
    </>
  )
}

/* ─── 정적 fallback (reduced motion) ─── */

function StaticBackground() {
  return (
    <div className="fixed inset-0 bg-[#030014]">
      <div className="absolute -top-1/2 -left-1/4 h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-[120px]" />
      <div className="absolute -top-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />
      <div className="absolute -bottom-1/4 left-1/3 h-[550px] w-[550px] rounded-full bg-pink-500/10 blur-[120px]" />
    </div>
  )
}

/* ─── 퍼블릭 API ─── */

interface CosmicSceneProps {
  className?: string
  /** 로딩 완료 콜백 */
  onCreated?: () => void
}

/**
 * 우주 테마 3D 배경 씬.
 * React Three Fiber를 사용하여 별, 네뷸라 파티클, 빛 구체를 렌더링한다.
 * fixed 포지션으로 전체 페이지 뒤에 패럴랙스 배경으로 동작한다.
 * reduced-motion 시 CSS 정적 배경으로 대체된다.
 * @param props.className - 추가 CSS 클래스
 * @param props.onCreated - Canvas 생성 완료 시 콜백
 */
export function CosmicScene({ className, onCreated }: CosmicSceneProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <StaticBackground />
  }

  return (
    <div
      className={className}
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 25], fov: 60, near: 0.1, far: 300 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        onCreated={onCreated}
      >
        <CosmicSceneInner />
      </Canvas>
    </div>
  )
}
