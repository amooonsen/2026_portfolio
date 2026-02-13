"use client";

import {useRef, useEffect} from "react";
import {Canvas, useFrame} from "@react-three/fiber";
import * as THREE from "three";

/** 생성할 파티클의 총 개수 */
const PARTICLE_COUNT = 120;

/** 중력 가속도 (m/s²) */
const GRAVITY = -6;

/** 파티클 폭발 시 초기 힘의 크기 */
const BURST_FORCE = 8;

/** 파티클이 퍼지는 범위 */
const SPREAD = 5;

/** 파티클의 기본 수명 (초) */
const LIFETIME = 10;

/** 컨페티에 사용될 색상 팔레트 */
const COLORS = [
  new THREE.Color("#818cf8"), // indigo
  new THREE.Color("#a78bfa"), // violet
  new THREE.Color("#c084fc"), // purple
  new THREE.Color("#f472b6"), // pink
  new THREE.Color("#fbbf24"), // amber
  new THREE.Color("#34d399"), // emerald
  new THREE.Color("#60a5fa"), // blue
];

/**
 * 파티클 데이터 구조
 * @property {Float32Array} positions - 파티클의 초기 위치 배열 (x, y, z)
 * @property {Float32Array} velocities - 파티클의 초기 속도 벡터 배열
 * @property {THREE.Color[]} colors - 각 파티클의 색상
 * @property {Float32Array} sizes - 각 파티클의 크기
 * @property {Float32Array} lifetimes - 각 파티클의 수명 (초)
 * @property {Float32Array} rotations - 각 파티클의 회전 속도
 */
interface ParticleData {
  positions: Float32Array;
  velocities: Float32Array;
  colors: THREE.Color[];
  sizes: Float32Array;
  lifetimes: Float32Array;
  rotations: Float32Array;
}

/**
 * 파티클 데이터를 생성하고 초기화합니다.
 * 각 파티클은 랜덤한 위치, 속도, 색상, 크기, 수명, 회전값을 가집니다.
 *
 * @returns {ParticleData} 초기화된 파티클 데이터
 */
function createParticles(): ParticleData {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const velocities = new Float32Array(PARTICLE_COUNT * 3);
  const colors: THREE.Color[] = [];
  const sizes = new Float32Array(PARTICLE_COUNT);
  const lifetimes = new Float32Array(PARTICLE_COUNT);
  const rotations = new Float32Array(PARTICLE_COUNT);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // 초기 위치: 원점 근처에서 랜덤하게 분포
    positions[i * 3] = (Math.random() - 0.5) * 1.5;
    positions[i * 3 + 1] = -3.5 + Math.random() * 0.5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 1.5;

    // 초기 속도: 방사형으로 퍼지며 위로 향하는 벡터 (더 자연스러운 분산)
    const angle = Math.random() * Math.PI * 2;
    const force = BURST_FORCE * (0.6 + Math.random() * 0.4);
    const spreadFactor = 0.3 + Math.random() * 0.7; // 파티클마다 다른 퍼짐 정도
    velocities[i * 3] = Math.cos(angle) * SPREAD * spreadFactor * (Math.random() - 0.5);
    velocities[i * 3 + 1] = force * (0.7 + Math.random() * 0.3);
    velocities[i * 3 + 2] = Math.sin(angle) * SPREAD * spreadFactor * (Math.random() - 0.5);

    // 색상: 팔레트에서 랜덤 선택
    colors.push(COLORS[Math.floor(Math.random() * COLORS.length)].clone());

    // 크기 더 작게 조정 (0.04 ~ 0.10)
    sizes[i] = 0.04 + Math.random() * 0.06;
    lifetimes[i] = LIFETIME + Math.random() * 0.8;
    rotations[i] = (Math.random() - 0.5) * 6; // 회전 속도 감소
  }

  return {positions, velocities, colors, sizes, lifetimes, rotations};
}

/**
 * InstancedMesh 기반 컨페티 파티클 컴포넌트.
 * 물리 법칙(중력, 초기 속도)을 적용하여 파티클이 폭발 후 떨어지는 애니메이션을 구현합니다.
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {boolean} props.active - 파티클 애니메이션 활성화 여부
 */
function ConfettiParticles({active}: {active: boolean}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dataRef = useRef<ParticleData | null>(null);
  const elapsedRef = useRef(0);
  const prevActiveRef = useRef(false);
  const dummy = useRef(new THREE.Object3D());

  // active가 true로 변경될 때 파티클 데이터를 새로 생성
  useEffect(() => {
    if (active && !prevActiveRef.current) {
      dataRef.current = createParticles();
      elapsedRef.current = 0;

      // 인스턴스별 색상 설정
      if (meshRef.current) {
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          meshRef.current.setColorAt(i, dataRef.current.colors[i]);
        }
        if (meshRef.current.instanceColor) {
          meshRef.current.instanceColor.needsUpdate = true;
        }
      }
    }
    prevActiveRef.current = active;
  }, [active]);

  // 매 프레임마다 파티클의 위치, 회전, 크기를 업데이트
  useFrame((_, delta) => {
    if (!meshRef.current || !dataRef.current || !active) return;

    const d = dataRef.current;
    elapsedRef.current += delta;
    const t = elapsedRef.current;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const life = d.lifetimes[i];
      const progress = Math.min(t / life, 1);

      // 물리 시뮬레이션: 위치 = 초기위치 + 속도*시간 + 0.5*중력*시간²
      const px = d.positions[i * 3] + d.velocities[i * 3] * t;
      const py = d.positions[i * 3 + 1] + d.velocities[i * 3 + 1] * t + 0.5 * GRAVITY * t * t;
      const pz = d.positions[i * 3 + 2] + d.velocities[i * 3 + 2] * t;

      // 수명 70% 이후 페이드 아웃 효과
      const fadeOut = progress > 0.7 ? 1 - (progress - 0.7) / 0.3 : 1;
      const scale = d.sizes[i] * fadeOut;

      // 더미 객체를 사용하여 인스턴스 매트릭스 업데이트
      dummy.current.position.set(px, py, pz);
      dummy.current.rotation.set(
        d.rotations[i] * t,
        d.rotations[i] * t * 0.7,
        d.rotations[i] * t * 0.3,
      );
      dummy.current.scale.setScalar(scale);
      dummy.current.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.current.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, PARTICLE_COUNT]}
      frustumCulled={false}
      visible={active}
    >
      <boxGeometry args={[1, 1, 0.1]} />
      <meshBasicMaterial transparent opacity={0.75} side={THREE.DoubleSide} />
    </instancedMesh>
  );
}

/**
 * Points 기반 빛나는 구체 파티클 컴포넌트.
 * Additive 블렌딩을 사용하여 빛나는 효과를 생성합니다.
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {boolean} props.active - 파티클 애니메이션 활성화 여부
 */
function GlowBursts({active}: {active: boolean}) {
  const ref = useRef<THREE.Points>(null);
  const elapsedRef = useRef(0);
  const prevActiveRef = useRef(false);

  const count = 40;
  const positionsRef = useRef(new Float32Array(count * 3));
  const velocitiesRef = useRef(new Float32Array(count * 3));
  const colorsArr = useRef(new Float32Array(count * 3));

  // active가 true로 변경될 때 파티클 초기화
  useEffect(() => {
    if (active && !prevActiveRef.current) {
      elapsedRef.current = 0;
      for (let i = 0; i < count; i++) {
        // 초기 위치 설정 (더 집중된 시작점)
        positionsRef.current[i * 3] = (Math.random() - 0.5) * 0.8;
        positionsRef.current[i * 3 + 1] = -3 + Math.random() * 0.3;
        positionsRef.current[i * 3 + 2] = (Math.random() - 0.5) * 0.8;

        // 초기 속도 벡터 계산 (더 부드러운 폭발)
        const angle = Math.random() * Math.PI * 2;
        const force = 5 + Math.random() * 4;
        const spread = 1 + Math.random() * 2;
        velocitiesRef.current[i * 3] = Math.cos(angle) * spread;
        velocitiesRef.current[i * 3 + 1] = force;
        velocitiesRef.current[i * 3 + 2] = Math.sin(angle) * spread;

        // 색상 설정
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        colorsArr.current[i * 3] = color.r;
        colorsArr.current[i * 3 + 1] = color.g;
        colorsArr.current[i * 3 + 2] = color.b;
      }

      // 색상 attribute 갱신
      if (ref.current) {
        const colorAttr = ref.current.geometry.getAttribute("color");
        if (colorAttr) colorAttr.needsUpdate = true;
      }
    }
    prevActiveRef.current = active;
  }, [active]);

  // 매 프레임마다 파티클 위치 업데이트
  useFrame((_, delta) => {
    if (!ref.current || !active) return;
    elapsedRef.current += delta;
    const t = elapsedRef.current;

    const posAttr = ref.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    if (!posAttr) return;

    for (let i = 0; i < count; i++) {
      // 물리 시뮬레이션 (중력 50% 적용 - 더 부드러운 낙하)
      const px = positionsRef.current[i * 3] + velocitiesRef.current[i * 3] * t;
      const py =
        positionsRef.current[i * 3 + 1] +
        velocitiesRef.current[i * 3 + 1] * t +
        0.5 * GRAVITY * 0.5 * t * t;
      const pz = positionsRef.current[i * 3 + 2] + velocitiesRef.current[i * 3 + 2] * t;

      posAttr.setXYZ(i, px, py, pz);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={ref} visible={active} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[new Float32Array(count * 3), 3]} />
        <bufferAttribute attach="attributes-color" args={[colorsArr.current, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        transparent
        size={0.3}
        sizeAttenuation
        depthWrite={false}
        opacity={0.65}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/**
 * 3D 축하 씬의 내부 콘텐츠.
 * 컨페티 파티클과 빛나는 구체 파티클을 포함합니다.
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {boolean} props.active - 애니메이션 활성화 여부
 */
function CelebrationInner({active}: {active: boolean}) {
  return (
    <>
      <ConfettiParticles active={active} />
      <GlowBursts active={active} />
    </>
  );
}

/**
 * CelebrationScene 컴포넌트의 Props
 */
interface CelebrationSceneProps {
  /** 축하 애니메이션 활성화 여부 */
  active: boolean;
  /** 추가 CSS 클래스명 */
  className?: string;
}

/**
 * 3D 컨페티 축하 애니메이션 씬 컴포넌트.
 *
 * React Three Fiber를 사용하여 물리 법칙이 적용된 파티클 애니메이션을 렌더링합니다.
 * - InstancedMesh 기반 컨페티 파티클: 200개의 직육면체 파티클
 * - Points 기반 빛나는 구체: 60개의 발광 파티클
 *
 * @example
 * ```tsx
 * <CelebrationScene active={showCelebration} />
 * ```
 *
 * @param {CelebrationSceneProps} props - 컴포넌트 속성
 * @param {boolean} props.active - true일 때 파티클이 폭발하며 올라갑니다
 * @param {string} [props.className] - 컨테이너 div에 적용할 추가 CSS 클래스
 */
export function CelebrationScene({active, className}: CelebrationSceneProps) {
  return (
    <div
      className={className}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        pointerEvents: "none",
        opacity: active ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{position: [0, 2, 15], fov: 50}}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{background: "transparent"}}
      >
        <CelebrationInner active={active} />
      </Canvas>
    </div>
  );
}
