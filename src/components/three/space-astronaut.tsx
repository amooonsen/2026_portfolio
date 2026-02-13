"use client";

import {useRef, useEffect} from "react";
import {Canvas, useFrame} from "@react-three/fiber";
import {Float} from "@react-three/drei";
import * as THREE from "three";
import {signalAstronautReady} from "@/lib/astronaut-ready";

/* ─── 로봇 헤드 ─── */

function RobotHead({mouseRef}: {mouseRef: React.RefObject<{x: number; y: number}>}) {
  const groupRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const antennaRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current || !mouseRef.current) return;

    // 마우스 방향으로 부드럽게 회전
    const targetY = mouseRef.current.x * 0.25;
    const targetX = -mouseRef.current.y * 0.15;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.04;

    // 눈 밝기 펄스 (숨쉬는 효과)
    const t = state.clock.elapsedTime;
    const eyePulse = 2 + Math.sin(t * 2.5) * 0.5;
    if (leftEyeRef.current) {
      (leftEyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = eyePulse;
    }
    if (rightEyeRef.current) {
      (rightEyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = eyePulse;
    }

    // 안테나 깜빡임
    if (antennaRef.current) {
      (antennaRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        Math.sin(t * 3) > 0.7 ? 2 : 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 헬멧 셸 */}
      <mesh>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial color="#e4e7ed" metalness={0.2} roughness={0.35} />
      </mesh>

      {/* 왼쪽 눈 */}
      <mesh ref={leftEyeRef} position={[-0.28, 0.12, 0.9]}>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshStandardMaterial
          color="#818cf8"
          emissive="#818cf8"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* 오른쪽 눈 */}
      <mesh ref={rightEyeRef} position={[0.28, 0.12, 0.9]}>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshStandardMaterial
          color="#818cf8"
          emissive="#818cf8"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* 바이저 스트립 — 눈을 잇는 빛줄 */}
      <mesh position={[0, 0.12, 0.96]}>
        <boxGeometry args={[0.75, 0.015, 0.008]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>

      {/* 헤드밴드 링 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.01, 0.02, 8, 48]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.25} />
      </mesh>

      {/* 좌측 이어피스 */}
      <mesh position={[-1.02, 0, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* 우측 이어피스 */}
      <mesh position={[1.02, 0, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* 안테나 */}
      <group position={[0, 1.05, 0]}>
        <mesh>
          <cylinderGeometry args={[0.012, 0.018, 0.35, 8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh ref={antennaRef} position={[0, 0.22, 0]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={1} />
        </mesh>
      </group>
    </group>
  );
}

/* ─── 로봇 바디 ─── */

function RobotBody() {
  return (
    <group position={[0, -1.55, 0]}>
      {/* 목 연결부 */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.12, 0.18, 0.2, 12]} />
        <meshStandardMaterial color="#b0b5c0" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* 메인 몸통 */}
      <mesh>
        <capsuleGeometry args={[0.45, 0.45, 12, 24]} />
        <meshStandardMaterial color="#e4e7ed" metalness={0.2} roughness={0.35} />
      </mesh>

      {/* 가슴 패널 */}
      <mesh position={[0, 0.1, 0.4]}>
        <boxGeometry args={[0.32, 0.22, 0.05]} />
        <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* 상태 표시등 */}
      <mesh position={[-0.06, 0.15, 0.43]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial
          color="#22c55e"
          emissive="#22c55e"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0.06, 0.15, 0.43]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ─── 플로팅 팔 ─── */

function FloatingArms() {
  const leftRef = useRef<THREE.Mesh>(null);
  const rightRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (leftRef.current) {
      leftRef.current.position.y = -1.3 + Math.sin(t * 1.2) * 0.08;
      leftRef.current.position.x = -0.85 + Math.cos(t * 0.8) * 0.03;
    }
    if (rightRef.current) {
      rightRef.current.position.y = -1.3 + Math.sin(t * 1.2 + 1) * 0.08;
      rightRef.current.position.x = 0.85 + Math.cos(t * 0.8 + 1.5) * 0.03;
    }
  });

  return (
    <>
      <mesh ref={leftRef} position={[-0.85, -1.3, 0]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color="#e4e7ed" metalness={0.2} roughness={0.35} />
      </mesh>
      <mesh ref={rightRef} position={[0.85, -1.3, 0]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color="#e4e7ed" metalness={0.2} roughness={0.35} />
      </mesh>
    </>
  );
}

/* ─── 궤도 장식 (로봇 근접 범위만) ─── */

function OrbitDecoration() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ringRef.current) ringRef.current.rotation.z += delta * 0.3;
  });

  return (
    <mesh ref={ringRef} position={[0, -0.8, 0]} rotation={[Math.PI / 2.5, 0, 0]}>
      <torusGeometry args={[1.6, 0.008, 8, 64]} />
      <meshBasicMaterial color="#818cf8" transparent opacity={0.2} />
    </mesh>
  );
}

/* ─── 하단 호버 글로우 ─── */

function BottomGlow() {
  return (
    <mesh position={[0, -2.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[0.5, 32]} />
      <meshBasicMaterial color="#6366f1" transparent opacity={0.06} />
    </mesh>
  );
}

/* ─── 로봇 씬 내부 ─── */

function RobotSceneInner() {
  const mouseRef = useRef({x: 0, y: 0});

  useEffect(() => {
    function handlePointerMove(e: PointerEvent) {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener("pointermove", handlePointerMove, {passive: true});
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <>
      {/* 조명 셋업 */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={0.9} color="#f0f4ff" />
      <directionalLight position={[-3, 2, -3]} intensity={0.3} color="#a78bfa" />
      <pointLight position={[0, 0.12, 2]} intensity={0.5} color="#818cf8" distance={4} />
      <pointLight position={[0, -3, 0]} intensity={0.2} color="#6366f1" distance={6} />

      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.6} floatingRange={[-0.15, 0.15]}>
        <group scale={0.85}>
          <RobotHead mouseRef={mouseRef} />
          <RobotBody />
          <FloatingArms />
        </group>
      </Float>

      <OrbitDecoration />
      <BottomGlow />
    </>
  );
}

/* ─── 퍼블릭 API ─── */

interface SpaceAstronautProps {
  className?: string;
}

/**
 * 우주 테마 3D 로봇 캐릭터.
 * 히어로 섹션 우측에 배치되며 마우스 위치를 추적하여 시선이 따라간다.
 * Float 애니메이션으로 떠다니는 효과를 제공한다.
 * Canvas onCreated에서 signalAstronautReady를 호출하여 인트로 로더와 연동된다.
 * 데스크톱 전용 (조건부 렌더링).
 */
export function SpaceAstronaut({className}: SpaceAstronautProps) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{position: [0, -0.5, 5.5], fov: 45}}
        dpr={[1, 1.5]}
        gl={{antialias: true, alpha: true, powerPreference: "high-performance"}}
        style={{background: "transparent"}}
        onCreated={() => signalAstronautReady()}
      >
        <RobotSceneInner />
      </Canvas>
    </div>
  );
}
