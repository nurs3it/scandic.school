'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrthographicCamera, Stars, Instances, Instance } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const BRAND_GREEN = '#2d6a2d';
const BRAND_GREEN_DARK = '#1a4a24';
const BRAND_YELLOW = '#ffb400';
const BRAND_ORANGE = '#f97316';

function ProceduralRocket() {
  const groupRef = useRef<THREE.Group>(null);
  const targetPos = useRef(new THREE.Vector3());
  const currentVel = useRef(new THREE.Vector3());
  const tmpQuat = useMemo(() => new THREE.Quaternion(), []);
  const idleQuat = useMemo(() => new THREE.Quaternion(), []);
  const upVec = useMemo(() => new THREE.Vector3(0, 1, 0), []);
  const { viewport, pointer } = useThree();

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;

    const halfW = viewport.width / 2;
    const halfH = viewport.height / 2;
    const anchorX = halfW * 0.55;
    targetPos.current.set(
      anchorX + pointer.x * halfW * 0.25,
      pointer.y * halfH * 0.35,
      0,
    );

    const diff = targetPos.current.clone().sub(g.position);
    currentVel.current.lerp(diff, Math.min(delta * 2.5, 1));
    g.position.add(currentVel.current.clone().multiplyScalar(delta * 2));

    const speed = currentVel.current.length();
    if (speed > 0.05) {
      const dir = currentVel.current.clone().normalize();
      tmpQuat.setFromUnitVectors(upVec, dir);
      g.quaternion.slerp(tmpQuat, 0.08);
    } else {
      g.quaternion.slerp(idleQuat, 0.04);
    }
  });

  return (
    <group ref={groupRef} scale={0.55}>
      {/* Main body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 1.8, 24]} />
        <meshStandardMaterial color="#e5e7eb" metalness={0.4} roughness={0.45} />
      </mesh>

      {/* Nose cone */}
      <mesh position={[0, 1.3, 0]}>
        <coneGeometry args={[0.35, 0.9, 24]} />
        <meshStandardMaterial color="#d1d5db" metalness={0.55} roughness={0.35} />
      </mesh>

      {/* Brand stripe */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 0.14, 24]} />
        <meshStandardMaterial color={BRAND_YELLOW} emissive={BRAND_YELLOW} emissiveIntensity={0.25} />
      </mesh>

      {/* Window */}
      <mesh position={[0, 0.55, 0.32]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.16, 24]} />
        <meshStandardMaterial color={BRAND_GREEN} emissive={BRAND_GREEN} emissiveIntensity={0.7} />
      </mesh>
      <mesh position={[0, 0.55, 0.325]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.16, 0.2, 24]} />
        <meshStandardMaterial color={BRAND_GREEN_DARK} />
      </mesh>

      {/* Fins (4) */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((rot, i) => (
        <mesh key={i} position={[0, -0.75, 0]} rotation={[0, rot, 0]}>
          <boxGeometry args={[0.04, 0.55, 0.55]} />
          <meshStandardMaterial color={BRAND_GREEN_DARK} />
        </mesh>
      ))}

      {/* Nozzle */}
      <mesh position={[0, -0.98, 0]}>
        <cylinderGeometry args={[0.28, 0.22, 0.25, 24]} />
        <meshStandardMaterial color="#6b7280" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Exhaust glow (small, focused) */}
      <mesh position={[0, -1.2, 0]}>
        <coneGeometry args={[0.12, 0.35, 16, 1, true]} />
        <meshBasicMaterial color={BRAND_YELLOW} transparent opacity={0.35} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <pointLight position={[0, -1.2, 0]} intensity={0.35} distance={1.8} color={BRAND_ORANGE} />

      <ExhaustParticles />
    </group>
  );
}

const PARTICLE_COUNT = 60;

function ExhaustParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { positions, velocities, ages, lifetimes } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const ages = new Float32Array(PARTICLE_COUNT);
    const lifetimes = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 0.12;
      positions[i * 3 + 1] = -1.1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.12;
      velocities[i * 3 + 0] = (Math.random() - 0.5) * 0.2;
      velocities[i * 3 + 1] = -0.6 - Math.random() * 0.5;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
      lifetimes[i] = 0.4 + Math.random() * 0.5;
      ages[i] = Math.random() * lifetimes[i];
    }
    return { positions, velocities, ages, lifetimes };
  }, []);

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('aAge', new THREE.BufferAttribute(ages, 1));
    g.setAttribute('aLifetime', new THREE.BufferAttribute(lifetimes, 1));
    return g;
  }, [positions, ages, lifetimes]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uColor: { value: new THREE.Color(BRAND_YELLOW) },
          uSize: { value: 4 },
        },
        vertexShader: `
          attribute float aAge;
          attribute float aLifetime;
          uniform float uSize;
          varying float vAlpha;
          void main() {
            float t = clamp(aAge / aLifetime, 0.0, 1.0);
            vAlpha = 1.0 - t;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = uSize * (1.0 - t);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          varying float vAlpha;
          void main() {
            vec2 c = gl_PointCoord - 0.5;
            float d = length(c);
            if (d > 0.5) discard;
            float falloff = smoothstep(0.5, 0.0, d);
            gl_FragColor = vec4(uColor, vAlpha * falloff * 0.7);
          }
        `,
      }),
    [],
  );

  useFrame((_, delta) => {
    const posAttr = geom.getAttribute('position') as THREE.BufferAttribute;
    const ageAttr = geom.getAttribute('aAge') as THREE.BufferAttribute;
    const dt = Math.min(delta, 0.05);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      ages[i] += dt;
      if (ages[i] >= lifetimes[i]) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 0.25;
        positions[i * 3 + 1] = -1.2;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 0.25;
        velocities[i * 3 + 0] = (Math.random() - 0.5) * 0.3;
        velocities[i * 3 + 1] = -0.8 - Math.random() * 0.8;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
        ages[i] = 0;
        lifetimes[i] = 0.6 + Math.random() * 0.8;
      } else {
        positions[i * 3 + 0] += velocities[i * 3 + 0] * dt;
        positions[i * 3 + 1] += velocities[i * 3 + 1] * dt;
        positions[i * 3 + 2] += velocities[i * 3 + 2] * dt;
      }
      ageAttr.array[i] = ages[i];
    }
    posAttr.needsUpdate = true;
    ageAttr.needsUpdate = true;
  });

  return <points ref={pointsRef} geometry={geom} material={material} />;
}

const PLANET_COUNT = 18;
const planetPalette = [
  '#2d6a2d',
  '#1a4a24',
  '#ffb400',
  '#f97316',
  '#4ade80',
  '#166534',
];

function PlanetField() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const planets = useMemo(() => {
    const arr: Array<{ pos: [number, number, number]; scale: number; color: string }> = [];
    const halfW = Math.max(viewport.width / 2, 10);
    const halfH = Math.max(viewport.height / 2, 10);
    for (let i = 0; i < PLANET_COUNT; i++) {
      arr.push({
        pos: [
          (Math.random() - 0.5) * halfW * 2.2,
          (Math.random() - 0.5) * halfH * 2.2,
          -8 - Math.random() * 12,
        ],
        scale: 0.08 + Math.random() * 0.28,
        color: planetPalette[Math.floor(Math.random() * planetPalette.length)],
      });
    }
    return arr;
  }, [viewport.width, viewport.height]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 0.015;
    }
  });

  return (
    <group ref={groupRef}>
      <Instances limit={PLANET_COUNT}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial roughness={0.7} metalness={0.1} />
        {planets.map((p, i) => (
          <Instance key={i} position={p.pos} scale={p.scale} color={p.color} />
        ))}
      </Instances>
    </group>
  );
}

export function AchievementsScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <OrthographicCamera makeDefault position={[0, 0, 12]} zoom={60} near={0.1} far={100} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[-10, 20, 10]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[8, -5, 5]} intensity={0.35} color={BRAND_GREEN} />

      <Stars radius={30} depth={40} count={2500} factor={3} saturation={0.2} fade speed={0.6} />
      <PlanetField />
      <ProceduralRocket />
    </Canvas>
  );
}
