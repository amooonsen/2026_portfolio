"use client";

import {useRef, useEffect} from "react";
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import * as THREE from "three";

/** 폭죽 한 발당 파티클 수 */
const SPARKS_PER_BURST = 80;

/** 동시 발사되는 폭죽 수 */
const BURST_COUNT = 4;

/** 전체 파티클 수 */
const PARTICLE_COUNT = SPARKS_PER_BURST * BURST_COUNT;

/** 중력 */
const GRAVITY = -3;

/** 파티클 수명 */
const LIFETIME = 4;

/** 폭죽 색상 팔레트 — 각 폭죽마다 하나의 테마 색상 */
const BURST_PALETTES = [
  [new THREE.Color("#818cf8"), new THREE.Color("#a78bfa"), new THREE.Color("#c4b5fd")], // 보라
  [new THREE.Color("#f472b6"), new THREE.Color("#ec4899"), new THREE.Color("#f9a8d4")], // 핑크
  [new THREE.Color("#fbbf24"), new THREE.Color("#f59e0b"), new THREE.Color("#fde68a")], // 금색
  [new THREE.Color("#34d399"), new THREE.Color("#10b981"), new THREE.Color("#6ee7b7")], // 에메랄드
  [new THREE.Color("#60a5fa"), new THREE.Color("#3b82f6"), new THREE.Color("#93c5fd")], // 파랑
];

interface BurstData {
  /** 폭발 중심점 */
  center: THREE.Vector3;
  /** 각 파티클 방향 벡터 */
  directions: Float32Array;
  /** 각 파티클 속도 */
  speeds: Float32Array;
  /** 색상 팔레트 인덱스 */
  paletteIdx: number;
  /** 발사 지연 시간 */
  delay: number;
}

function createBursts(): BurstData[] {
  const bursts: BurstData[] = [];

  for (let b = 0; b < BURST_COUNT; b++) {
    const cx = (Math.random() - 0.5) * 12;
    const cy = 2 + Math.random() * 6;
    const cz = (Math.random() - 0.5) * 4;

    const directions = new Float32Array(SPARKS_PER_BURST * 3);
    const speeds = new Float32Array(SPARKS_PER_BURST);

    for (let i = 0; i < SPARKS_PER_BURST; i++) {
      // 구면 균일 분포
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      directions[i * 3] = Math.sin(phi) * Math.cos(theta);
      directions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta);
      directions[i * 3 + 2] = Math.cos(phi);
      speeds[i] = 3 + Math.random() * 4;
    }

    bursts.push({
      center: new THREE.Vector3(cx, cy, cz),
      directions,
      speeds,
      paletteIdx: b % BURST_PALETTES.length,
      delay: b * 0.4 + Math.random() * 0.3,
    });
  }

  return bursts;
}

/**
 * InstancedMesh 기반 폭죽 파티클.
 * 여러 폭발 지점에서 구형으로 퍼지는 불꽃을 시뮬레이션한다.
 */
function FireworkParticles({active}: {active: boolean}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const burstsRef = useRef<BurstData[] | null>(null);
  const elapsedRef = useRef(0);
  const prevActiveRef = useRef(false);
  const dummy = useRef(new THREE.Object3D());

  useEffect(() => {
    if (active && !prevActiveRef.current) {
      burstsRef.current = createBursts();
      elapsedRef.current = 0;

      if (meshRef.current) {
        const bursts = burstsRef.current;
        for (let b = 0; b < BURST_COUNT; b++) {
          const palette = BURST_PALETTES[bursts[b].paletteIdx];
          for (let i = 0; i < SPARKS_PER_BURST; i++) {
            const idx = b * SPARKS_PER_BURST + i;
            const color = palette[Math.floor(Math.random() * palette.length)];
            meshRef.current.setColorAt(idx, color);
          }
        }
        if (meshRef.current.instanceColor) {
          meshRef.current.instanceColor.needsUpdate = true;
        }
      }
    }
    prevActiveRef.current = active;
  }, [active]);

  useFrame((_, delta) => {
    if (!meshRef.current || !burstsRef.current || !active) return;

    elapsedRef.current += delta;
    const globalT = elapsedRef.current;

    for (let b = 0; b < BURST_COUNT; b++) {
      const burst = burstsRef.current[b];
      const t = globalT - burst.delay;

      for (let i = 0; i < SPARKS_PER_BURST; i++) {
        const idx = b * SPARKS_PER_BURST + i;

        if (t < 0) {
          // 아직 발사 전 → 숨김
          dummy.current.scale.setScalar(0);
          dummy.current.updateMatrix();
          meshRef.current.setMatrixAt(idx, dummy.current.matrix);
          continue;
        }

        const life = LIFETIME + (burst.speeds[i] / 7) * 1.5;
        const progress = Math.min(t / life, 1);

        // 위치 = 중심 + 방향 * 속도 * (1 - e^(-kt)) / k
        // 적분 기반이므로 항상 바깥으로 퍼짐 (되돌아오지 않음)
        const k = 0.8;
        const spread = (burst.speeds[i] * (1 - Math.exp(-k * t))) / k;

        const dx = burst.directions[i * 3];
        const dy = burst.directions[i * 3 + 1];
        const dz = burst.directions[i * 3 + 2];

        const px = burst.center.x + dx * spread;
        const py = burst.center.y + dy * spread + 0.5 * GRAVITY * t * t;
        const pz = burst.center.z + dz * spread;

        // 페이드 아웃: 수명 50% 이후 서서히 축소하며 퍼짐
        const fadeOut = progress > 0.5 ? 1 - (progress - 0.5) / 0.5 : 1;
        // 깜빡임 효과
        const flicker = 0.7 + 0.3 * Math.sin(t * 15 + i * 2);
        const scale = 0.03 * fadeOut * flicker;

        dummy.current.position.set(px, py, pz);
        dummy.current.scale.setScalar(scale);
        dummy.current.updateMatrix();
        meshRef.current.setMatrixAt(idx, dummy.current.matrix);
      }
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
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial transparent opacity={0.9} side={THREE.DoubleSide} />
    </instancedMesh>
  );
}

/**
 * 폭죽 꼬리 (상승 궤적) + 잔광 파티클.
 * Additive 블렌딩으로 빛나는 불꽃 효과를 생성한다.
 */
function SparkTrails({active}: {active: boolean}) {
  const ref = useRef<THREE.Points>(null);
  const elapsedRef = useRef(0);
  const prevActiveRef = useRef(false);

  const count = 60;
  const positionsRef = useRef(new Float32Array(count * 3));
  const velocitiesRef = useRef(new Float32Array(count * 3));
  const colorsArr = useRef(new Float32Array(count * 3));
  const delaysRef = useRef(new Float32Array(count));

  useEffect(() => {
    if (active && !prevActiveRef.current) {
      elapsedRef.current = 0;
      for (let i = 0; i < count; i++) {
        // 여러 폭발 지점에서 발생
        const cx = (Math.random() - 0.5) * 12;
        const cy = 3 + Math.random() * 5;

        positionsRef.current[i * 3] = cx + (Math.random() - 0.5) * 0.5;
        positionsRef.current[i * 3 + 1] = cy;
        positionsRef.current[i * 3 + 2] = (Math.random() - 0.5) * 3;

        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 2;
        velocitiesRef.current[i * 3] = Math.cos(angle) * speed;
        velocitiesRef.current[i * 3 + 1] = Math.random() * 2;
        velocitiesRef.current[i * 3 + 2] = Math.sin(angle) * speed;

        delaysRef.current[i] = Math.random() * 1.5;

        const palette = BURST_PALETTES[Math.floor(Math.random() * BURST_PALETTES.length)];
        const color = palette[0];
        colorsArr.current[i * 3] = color.r;
        colorsArr.current[i * 3 + 1] = color.g;
        colorsArr.current[i * 3 + 2] = color.b;
      }

      if (ref.current) {
        const colorAttr = ref.current.geometry.getAttribute("color");
        if (colorAttr) colorAttr.needsUpdate = true;
      }
    }
    prevActiveRef.current = active;
  }, [active]);

  useFrame((_, delta) => {
    if (!ref.current || !active) return;
    elapsedRef.current += delta;
    const globalT = elapsedRef.current;

    const posAttr = ref.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    if (!posAttr) return;

    for (let i = 0; i < count; i++) {
      const t = globalT - delaysRef.current[i];
      if (t < 0) {
        posAttr.setXYZ(i, 0, -100, 0);
        continue;
      }

      const trailK = 1.2;
      const trailSpread = (1 - Math.exp(-trailK * t)) / trailK;
      const px = positionsRef.current[i * 3] + velocitiesRef.current[i * 3] * trailSpread;
      const py =
        positionsRef.current[i * 3 + 1] +
        velocitiesRef.current[i * 3 + 1] * trailSpread +
        0.5 * GRAVITY * 0.4 * t * t;
      const pz = positionsRef.current[i * 3 + 2] + velocitiesRef.current[i * 3 + 2] * trailSpread;

      posAttr.setXYZ(i, px, py, pz);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={ref} visible={active} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positionsRef.current, 3]} />
        <bufferAttribute attach="attributes-color" args={[colorsArr.current, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        transparent
        size={0.4}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ─── Canvas 프레임루프 제어 ─── */

function FrameloopController({ paused }: { paused: boolean }) {
  const set = useThree((s) => s.set)
  const invalidate = useThree((s) => s.invalidate)

  useEffect(() => {
    set({ frameloop: paused ? 'never' : 'always' })
    if (!paused) invalidate()
  }, [paused, set, invalidate])

  return null
}

function CelebrationInner({active}: {active: boolean}) {
  return (
    <>
      <FrameloopController paused={!active} />
      <FireworkParticles active={active} />
      <SparkTrails active={active} />
    </>
  );
}

interface CelebrationSceneProps {
  active: boolean;
  className?: string;
}

/**
 * 3D 폭죽 축하 애니메이션 씬.
 * 여러 지점에서 구형으로 폭발하는 폭죽 파티클과 잔광을 렌더링한다.
 */
export function CelebrationScene({active, className}: CelebrationSceneProps) {
  return (
    <div
      className={className}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        overflow: "hidden",
        opacity: active ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{position: [0, 4, 18], fov: 50}}
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
