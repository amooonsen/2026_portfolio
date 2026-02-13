"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Points, PointMaterial, Float } from "@react-three/drei"
import * as THREE from "three"
import { gsap } from "@/lib/gsap"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useSceneColors } from "@/hooks/use-theme-colors"

import type { SceneColors } from "@/hooks/use-theme-colors"

/* ─── 별 필드 ─── */

function StarField({ count = 600, isMobile = false, color }: { count?: number; isMobile?: boolean; color: string }) {
  const ref = useRef<THREE.Points>(null)

  const positionsRef = useRef<Float32Array | null>(null)
  if (!positionsRef.current || positionsRef.current.length !== count * 3) {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 50 + Math.random() * 150
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    positionsRef.current = pos
  }
  const positions = positionsRef.current

  useFrame((_, delta) => {
    if (ref.current && !isMobile) {
      ref.current.rotation.y += delta * 0.008
      ref.current.rotation.x += delta * 0.003
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.25}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

/* ─── 네뷸라 파티클 ─── */

function NebulaParticles({ count = 150, isMobile = false, nebulaColors: colorHexes }: { count?: number; isMobile?: boolean; nebulaColors: readonly string[] }) {
  const ref = useRef<THREE.Points>(null)

  const dataRef = useRef<[Float32Array, Float32Array] | null>(null)
  if (!dataRef.current || dataRef.current[0].length !== count * 3) {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    const nebulaColors = colorHexes.map((c) => new THREE.Color(c))

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
    dataRef.current = [pos, col]
  }
  const [positions, colors] = dataRef.current

  useFrame((_, delta) => {
    if (ref.current && !isMobile) {
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

function CameraRig({ isMobile = false }: { isMobile?: boolean }) {
  const { camera } = useThree()
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    function handlePointerMove(e: PointerEvent) {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    return () => window.removeEventListener("pointermove", handlePointerMove)
  }, [])

  useFrame(() => {
    if (isMobile) return

    const targetX = mouseRef.current.x * 1.5
    const targetY = -mouseRef.current.y * 1

    camera.position.x += (targetX - camera.position.x) * 0.015
    camera.position.y += (targetY - camera.position.y) * 0.015
    camera.lookAt(0, 0, 0)
  })

  return null
}

/* ─── 메인 씬 내부 ─── */

function CosmicSceneInner({ isMobile = false, colors }: { isMobile?: boolean; colors: SceneColors }) {
  const starCount = isMobile ? 150 : 300
  const nebulaCount = isMobile ? 38 : 75

  return (
    <>
      <color attach="background" args={[colors.background]} />
      <fog attach="fog" args={[colors.fog, 60, 220]} />

      <ambientLight intensity={0.08} />

      <CameraRig isMobile={isMobile} />
      <StarField count={starCount} isMobile={isMobile} color={colors.star} />
      <NebulaParticles count={nebulaCount} isMobile={isMobile} nebulaColors={colors.nebula} />

      <GlowOrb position={[-15, 5, -20]} color={colors.orb[0]} scale={isMobile ? 2 : 3} />
      {!isMobile && <GlowOrb position={[20, -8, -15]} color={colors.orb[2]} scale={2.5} />}
      <GlowOrb position={[0, 10, -30]} color={colors.orb[1]} scale={isMobile ? 3 : 4} />
    </>
  )
}

/* ─── 정적 fallback (reduced motion) ─── */

function StaticBackground({ colors }: { colors: SceneColors }) {
  return (
    <div className="fixed inset-0 bg-scene-bg">
      <div className={`absolute -top-1/2 -left-1/4 h-[600px] w-[600px] rounded-full ${colors.staticOrbs[0].color} ${colors.staticOrbs[0].blur}`} />
      <div className={`absolute -top-1/4 -right-1/4 h-[500px] w-[500px] rounded-full ${colors.staticOrbs[1].color} ${colors.staticOrbs[1].blur}`} />
      <div className={`absolute -bottom-1/4 left-1/3 h-[550px] w-[550px] rounded-full ${colors.staticOrbs[2].color} ${colors.staticOrbs[2].blur}`} />
    </div>
  )
}

/* ─── 퍼블릭 API ─── */

interface CosmicSceneProps {
  className?: string
  /** 로딩 완료 콜백 */
  onCreated?: () => void
  /**
   * true가 되면 캔버스를 페이드인으로 노출한다.
   * template.tsx의 transform/filter가 position: fixed의 containing block을
   * 변경하여 파티클 리사이즈를 유발하므로, 모든 전환이 끝난 뒤에 노출해야 한다.
   */
  visible?: boolean
}

/**
 * 우주 테마 3D 배경 씬.
 * React Three Fiber를 사용하여 별, 네뷸라 파티클, 빛 구체를 렌더링한다.
 * fixed 포지션으로 전체 페이지 뒤에 패럴랙스 배경으로 동작한다.
 * reduced-motion 시 CSS 정적 배경으로 대체된다.
 * 모바일에서 파티클 수와 애니메이션을 최적화하여 성능을 개선한다.
 * @param props.className - 추가 CSS 클래스
 * @param props.onCreated - Canvas 생성 완료 시 콜백
 * @param props.visible - true가 되면 캔버스 페이드인 (기본 true)
 */
export function CosmicScene({ className, onCreated, visible = true }: CosmicSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasRevealedRef = useRef(false)
  const reducedMotion = useReducedMotion()
  const isMobile = useMediaQuery("(max-width: 767px)")
  const colors = useSceneColors()

  // visible이 true가 되면 캔버스 컨테이너를 페이드인.
  // 0.5s 딜레이로 template.tsx 애니메이션(~0.6s) 완료 후 노출하여
  // containing block 변경에 의한 파티클 리사이즈 시프트를 방지한다.
  useEffect(() => {
    if (!visible || hasRevealedRef.current || !containerRef.current) return
    hasRevealedRef.current = true

    if (reducedMotion) {
      gsap.set(containerRef.current, { opacity: 1 })
      return
    }

    gsap.to(containerRef.current, {
      opacity: 1,
      duration: 1,
      delay: 0.5,
      ease: "power2.out",
    })
  }, [visible, reducedMotion])

  if (reducedMotion) {
    return <StaticBackground colors={colors} />
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "fixed", inset: 0, zIndex: 0, opacity: 0 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 25], fov: 60, near: 0.1, far: 300 }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        onCreated={onCreated}
      >
        <CosmicSceneInner isMobile={isMobile} colors={colors} />
      </Canvas>
    </div>
  )
}
