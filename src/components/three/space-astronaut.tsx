"use client";

import {useRef, useEffect} from "react";
import {Canvas, useFrame} from "@react-three/fiber";
import {Float} from "@react-three/drei";
import * as THREE from "three";
import {useTheme} from "next-themes";
import {signalAstronautReady} from "@/lib/astronaut-ready";

const DRAG_SENSITIVITY = 0.005;
const DRAG_THRESHOLD = 3;
const FRICTION = 0.96;
const CLICK_IMPULSE = 0.25;

interface RobotPalette {
  body: string;
  accent: string;
  secondary: string;
  panel: string;
  glow: string;
  ambientIntensity: number;
  mainLightIntensity: number;
}

const darkPalette: RobotPalette = {
  body: "#f0f4ff",
  accent: "#a5b4fc",
  secondary: "#c7d2fe",
  panel: "#6366f1",
  glow: "#818cf8",
  ambientIntensity: 0.6,
  mainLightIntensity: 1.2,
};

const lightPalette: RobotPalette = {
  body: "#8b95a8",
  accent: "#6366f1",
  secondary: "#818cf8",
  panel: "#4f46e5",
  glow: "#6366f1",
  ambientIntensity: 0.5,
  mainLightIntensity: 1.0,
};

interface InteractionState {
  isHovered: boolean;
  rotation: number;
  momentum: number;
  isDragging: boolean;
  dragPrevX: number;
  dragStartX: number;
  hasDragged: boolean;
  smoothVelocity: number;
}

/* ─── 로봇 헤드 ─── */

function RobotHead({
  mouseRef,
  interaction,
  palette,
}: {
  mouseRef: React.RefObject<{x: number; y: number}>;
  interaction: React.RefObject<InteractionState>;
  palette: RobotPalette;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const antennaRef = useRef<THREE.Mesh>(null);
  const smileRef = useRef<THREE.Mesh>(null);
  const eyeSquint = useRef(1);
  const eyeWiden = useRef(1);
  const smileProgress = useRef(0);

  useFrame((state) => {
    if (!groupRef.current || !mouseRef.current || !interaction.current) return;
    const hovered = interaction.current.isHovered;
    const t = state.clock.elapsedTime;

    // 마우스 방향으로 부드럽게 회전
    const targetY = mouseRef.current.x * 0.25;
    const targetX = -mouseRef.current.y * 0.15;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.04;

    // 눈 표정 — 호버 시 싱긋 웃는 초승달 눈
    const targetSquint = hovered ? 0.15 : 1;
    const targetWiden = hovered ? 1.4 : 1;
    eyeSquint.current += (targetSquint - eyeSquint.current) * 0.1;
    eyeWiden.current += (targetWiden - eyeWiden.current) * 0.1;
    const eyePulse = hovered ? 4 : 2 + Math.sin(t * 2.5) * 0.5;

    if (leftEyeRef.current) {
      (leftEyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = eyePulse;
      leftEyeRef.current.scale.set(eyeWiden.current, eyeSquint.current, 1);
      leftEyeRef.current.position.y = 0.12 + (1 - eyeSquint.current) * 0.08;
    }
    if (rightEyeRef.current) {
      (rightEyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = eyePulse;
      rightEyeRef.current.scale.set(eyeWiden.current, eyeSquint.current, 1);
      rightEyeRef.current.position.y = 0.12 + (1 - eyeSquint.current) * 0.08;
    }

    // 웃는 입 — 호버 시 나타남
    const targetSmile = hovered ? 1 : 0;
    smileProgress.current += (targetSmile - smileProgress.current) * 0.1;
    if (smileRef.current) {
      smileRef.current.scale.setScalar(smileProgress.current);
      (smileRef.current.material as THREE.MeshStandardMaterial).opacity = smileProgress.current;
      (smileRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        smileProgress.current * 1.5;
    }

    // 안테나 깜빡임 — 호버 시 더 밝게
    if (antennaRef.current) {
      (antennaRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = hovered
        ? 3
        : Math.sin(t * 3) > 0.7
          ? 2
          : 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 헬멧 셸 */}
      <mesh>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial color={palette.body} metalness={0.15} roughness={0.3} />
      </mesh>

      {/* 왼쪽 눈 */}
      <mesh ref={leftEyeRef} position={[-0.28, 0.12, 0.9]}>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshStandardMaterial
          color={palette.glow}
          emissive={palette.glow}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* 오른쪽 눈 */}
      <mesh ref={rightEyeRef} position={[0.28, 0.12, 0.9]}>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshStandardMaterial
          color={palette.glow}
          emissive={palette.glow}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* 바이저 스트립 — 눈을 잇는 빛줄 */}
      <mesh position={[0, 0.12, 0.96]}>
        <boxGeometry args={[0.75, 0.015, 0.008]} />
        <meshStandardMaterial
          color={palette.panel}
          emissive={palette.panel}
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>

      {/* 웃는 입 (호버 시 나타남) */}
      <mesh ref={smileRef} position={[0, -0.18, 0.95]} rotation={[0, 0, Math.PI]} scale={0}>
        <torusGeometry args={[0.18, 0.022, 8, 16, Math.PI]} />
        <meshStandardMaterial
          color={palette.glow}
          emissive={palette.glow}
          emissiveIntensity={0}
          transparent
          opacity={0}
          toneMapped={false}
        />
      </mesh>

      {/* 헤드밴드 링 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.01, 0.02, 8, 48]} />
        <meshStandardMaterial color={palette.accent} metalness={0.5} roughness={0.25} />
      </mesh>

      {/* 좌측 이어피스 */}
      <mesh position={[-1.02, 0, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color={palette.accent} metalness={0.4} roughness={0.3} />
      </mesh>

      {/* 우측 이어피스 */}
      <mesh position={[1.02, 0, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color={palette.accent} metalness={0.4} roughness={0.3} />
      </mesh>

      {/* 안테나 */}
      <group position={[0, 1.05, 0]}>
        <mesh>
          <cylinderGeometry args={[0.012, 0.018, 0.35, 8]} />
          <meshStandardMaterial color={palette.secondary} metalness={0.4} roughness={0.3} />
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

function RobotBody({palette}: {palette: RobotPalette}) {
  return (
    <group position={[0, -1.55, 0]}>
      {/* 목 연결부 */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.12, 0.18, 0.2, 12]} />
        <meshStandardMaterial color={palette.secondary} metalness={0.25} roughness={0.35} />
      </mesh>

      {/* 메인 몸통 */}
      <mesh>
        <capsuleGeometry args={[0.45, 0.45, 12, 24]} />
        <meshStandardMaterial color={palette.body} metalness={0.15} roughness={0.3} />
      </mesh>

      {/* 가슴 패널 */}
      <mesh position={[0, 0.1, 0.4]}>
        <boxGeometry args={[0.32, 0.22, 0.05]} />
        <meshStandardMaterial color={palette.panel} metalness={0.4} roughness={0.3} />
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

function FloatingArms({interaction, palette}: {interaction: React.RefObject<InteractionState>; palette: RobotPalette}) {
  const leftRef = useRef<THREE.Mesh>(null);
  const rightRef = useRef<THREE.Mesh>(null);
  const waveProgress = useRef(0);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const hovered = interaction.current?.isHovered ?? false;

    // 왼쪽 팔 — 기본 idle
    if (leftRef.current) {
      leftRef.current.position.y = -1.3 + Math.sin(t * 1.2) * 0.08;
      leftRef.current.position.x = -0.85 + Math.cos(t * 0.8) * 0.03;
    }

    // 오른쪽 팔 — 호버 시 손 흔들기
    const targetWave = hovered ? 1 : 0;
    waveProgress.current += (targetWave - waveProgress.current) * 0.08;
    const w = waveProgress.current;

    if (rightRef.current) {
      const idleY = -1.3 + Math.sin(t * 1.2 + 1) * 0.08;
      const idleX = 0.85 + Math.cos(t * 0.8 + 1.5) * 0.03;

      // wave 위치: 위로 올라가서 좌우로 흔듦
      const waveY = -0.3 + Math.sin(t * 8) * 0.1;
      const waveX = 1.15 + Math.sin(t * 6) * 0.15;

      rightRef.current.position.y = idleY + (waveY - idleY) * w;
      rightRef.current.position.x = idleX + (waveX - idleX) * w;
      rightRef.current.position.z = 0.3 * w;
    }
  });

  return (
    <>
      <mesh ref={leftRef} position={[-0.85, -1.3, 0]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color={palette.body} metalness={0.15} roughness={0.3} />
      </mesh>
      <mesh ref={rightRef} position={[0.85, -1.3, 0]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color={palette.body} metalness={0.15} roughness={0.3} />
      </mesh>
    </>
  );
}

/* ─── 하단 호버 글로우 ─── */

function BottomGlow({palette}: {palette: RobotPalette}) {
  return (
    <mesh position={[0, -2.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[0.5, 32]} />
      <meshBasicMaterial color={palette.glow} transparent opacity={0.1} />
    </mesh>
  );
}

/* ─── 로봇 씬 내부 ─── */

function RobotSceneInner({palette}: {palette: RobotPalette}) {
  const mouseRef = useRef({x: 0, y: 0});
  const interaction = useRef<InteractionState>({
    isHovered: false,
    rotation: 0,
    momentum: 0,
    isDragging: false,
    dragPrevX: 0,
    dragStartX: 0,
    hasDragged: false,
    smoothVelocity: 0,
  });
  const robotGroupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    function handlePointerMove(e: PointerEvent) {
      // 마우스 트래킹 (머리 추적용)
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;

      // 드래그 회전
      const s = interaction.current;
      if (s.isDragging) {
        const deltaX = e.clientX - s.dragPrevX;
        s.rotation += deltaX * DRAG_SENSITIVITY;
        s.smoothVelocity = s.smoothVelocity * 0.5 + deltaX * DRAG_SENSITIVITY * 0.5;
        s.dragPrevX = e.clientX;
        if (Math.abs(e.clientX - s.dragStartX) > DRAG_THRESHOLD) {
          s.hasDragged = true;
        }
      }
    }

    function handlePointerUp() {
      const s = interaction.current;
      if (s.isDragging) {
        s.isDragging = false;
        if (s.hasDragged) {
          s.momentum = s.smoothVelocity;
        } else {
          // 클릭: 360도 스핀 임펄스
          s.momentum = CLICK_IMPULSE;
        }
        document.body.style.cursor = s.isHovered ? "grab" : "auto";
      }
    }

    window.addEventListener("pointermove", handlePointerMove, {passive: true});
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      document.body.style.cursor = "auto";
    };
  }, []);

  // 회전 + 모멘텀 애니메이션
  useFrame(() => {
    if (!robotGroupRef.current || !interaction.current) return;
    const s = interaction.current;

    if (!s.isDragging && Math.abs(s.momentum) > 0.0001) {
      s.rotation += s.momentum;
      s.momentum *= FRICTION;
    }

    // 드래그 중 velocity 감쇠 (마우스 멈춤 대응)
    if (s.isDragging) {
      s.smoothVelocity *= 0.85;
    }

    robotGroupRef.current.rotation.y = s.rotation;
  });

  return (
    <>
      {/* 조명 셋업 */}
      <ambientLight intensity={palette.ambientIntensity} />
      <directionalLight position={[5, 5, 5]} intensity={palette.mainLightIntensity} color="#f0f4ff" />
      <directionalLight position={[-3, 2, -3]} intensity={0.5} color="#a78bfa" />
      <pointLight position={[0, 0.12, 2]} intensity={0.8} color={palette.glow} distance={4} />
      <pointLight position={[0, -3, 0]} intensity={0.3} color={palette.panel} distance={6} />

      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.6} floatingRange={[-0.15, 0.15]}>
        <group ref={robotGroupRef} scale={0.85}>
          {/* 인터랙션 히트 영역 (투명) */}
          <mesh
            position={[0, -0.6, 0]}
            onPointerOver={() => {
              interaction.current.isHovered = true;
              if (!interaction.current.isDragging) {
                document.body.style.cursor = "grab";
              }
            }}
            onPointerOut={() => {
              interaction.current.isHovered = false;
              if (!interaction.current.isDragging) {
                document.body.style.cursor = "auto";
              }
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              const s = interaction.current;
              s.isDragging = true;
              s.dragPrevX = e.nativeEvent.clientX;
              s.dragStartX = e.nativeEvent.clientX;
              s.hasDragged = false;
              s.momentum = 0;
              s.smoothVelocity = 0;
              document.body.style.cursor = "grabbing";
            }}
          >
            <capsuleGeometry args={[1.2, 1.5, 8, 16]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>

          <RobotHead mouseRef={mouseRef} interaction={interaction} palette={palette} />
          <RobotBody palette={palette} />
          <FloatingArms interaction={interaction} palette={palette} />
        </group>
      </Float>

      <BottomGlow palette={palette} />
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
 * 호버 시 싱긋 웃으며 손을 흔들고, 클릭 시 360도 회전한다.
 * 드래그로 자유 회전 가능하며, 릴리즈 시 모멘텀으로 관성 회전한다.
 * Canvas onCreated에서 signalAstronautReady를 호출하여 인트로 로더와 연동된다.
 * 테마에 따라 다크(밝은 블루화이트)/라이트(슬레이트) 색상이 전환된다.
 * 데스크톱 전용 (조건부 렌더링).
 */
export function SpaceAstronaut({className}: SpaceAstronautProps) {
  const {resolvedTheme} = useTheme();
  const palette = resolvedTheme === "dark" ? darkPalette : lightPalette;

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{position: [0, -0.5, 5.5], fov: 45}}
        dpr={[1, 1.5]}
        gl={{antialias: true, alpha: true, powerPreference: "high-performance"}}
        style={{background: "transparent"}}
        onCreated={() => signalAstronautReady()}
      >
        <RobotSceneInner palette={palette} />
      </Canvas>
    </div>
  );
}
