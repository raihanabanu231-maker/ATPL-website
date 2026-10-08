import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Html, 
  Line
} from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ATPL_FACTORY_NODES, STATION_KEYS } from '../../data/factoryStations3D';

/* =========================================================================
   1. CAMERA CONTROLLER (Responsive FlyTo & Smooth Overview)
   ========================================================================= */
export const CameraController = ({ selectedStation, cameraMode, isOverview, quality }) => {
  const { camera, size } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    // Responsive camera distance based on screen aspect ratio (320px mobile to 2550px ultra-wide)
    const aspect = size.width / Math.max(1, size.height);
    const isNarrow = aspect < 1.15;
    const distanceMult = isNarrow ? Math.min(1.7, 1.15 / Math.max(0.48, aspect)) : 1;

    if (isOverview || !selectedStation) {
      // Overview Isometric Angle with responsive distance
      gsap.to(camera.position, {
        x: 28 * distanceMult,
        y: 22 * distanceMult,
        z: 28 * distanceMult,
        duration: 1.8,
        ease: 'power3.inOut',
        onUpdate: () => camera.updateProjectionMatrix()
      });

      if (controlsRef.current) {
        gsap.to(controlsRef.current.target, {
          x: 0,
          y: 1.5,
          z: 0,
          duration: 1.8,
          ease: 'power3.inOut'
        });
      }
    } else {
      // FlyTo specific station
      const node = ATPL_FACTORY_NODES[selectedStation];
      if (node) {
        const stationDistMult = isNarrow ? 1.25 : 1;
        gsap.to(camera.position, {
          x: node.cameraPosition[0] * stationDistMult,
          y: node.cameraPosition[1] * stationDistMult,
          z: node.cameraPosition[2] * stationDistMult,
          duration: 1.5,
          ease: 'power2.inOut',
          onUpdate: () => camera.updateProjectionMatrix()
        });

        if (controlsRef.current) {
          gsap.to(controlsRef.current.target, {
            x: node.targetLookAt[0],
            y: node.targetLookAt[1],
            z: node.targetLookAt[2],
            duration: 1.5,
            ease: 'power2.inOut'
          });
        }
      }
    }
  }, [selectedStation, isOverview, camera, size]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      maxPolarAngle={Math.PI / 2.05}
      minPolarAngle={Math.PI / 8}
      minDistance={5}
      maxDistance={70}
      target={[0, 1.5, 0]}
    />
  );
};

/* =========================================================================
   2. AI ROBOT MASCOT COMPANION (Official ATPL Archie AI with Chest Logo)
   ========================================================================= */
export const RobotCompanion = ({ selectedStation, isDemoRunning }) => {
  const robotGroupRef = useRef();
  const thrusterRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const headRef = useRef();
  const targetPos = useMemo(() => new THREE.Vector3(0, 3.5, 0), []);

  // Generate dynamic crisp ATPL Brand Logo Texture for Robot Chest Emblem
  const atplChestTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Background circle - Brushed metal white
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(256, 256, 250, 0, Math.PI * 2);
    ctx.fill();

    // Outer cyan bezel border
    ctx.lineWidth = 18;
    ctx.strokeStyle = '#0071ba';
    ctx.beginPath();
    ctx.arc(256, 256, 238, 0, Math.PI * 2);
    ctx.stroke();

    // Target crosshair guide ring
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(0, 113, 186, 0.25)';
    ctx.beginPath();
    ctx.arc(256, 256, 175, 0, Math.PI * 2);
    ctx.stroke();

    // Draw Vector Logo Wings
    ctx.save();
    ctx.translate(136, 136);
    ctx.scale(2.4, 2.4);

    // 1. Top Cyan Wing
    ctx.fillStyle = '#00f0ff';
    ctx.beginPath();
    ctx.moveTo(42, 0.5);
    ctx.lineTo(60, 23);
    ctx.lineTo(44, 46);
    ctx.closePath();
    ctx.fill();

    // 2. Middle Primary Blue Wing (#0071ba)
    ctx.fillStyle = '#0071ba';
    ctx.beginPath();
    ctx.moveTo(44, 46);
    ctx.lineTo(60, 23);
    ctx.lineTo(75, 34);
    ctx.lineTo(44, 53);
    ctx.lineTo(29, 73);
    ctx.closePath();
    ctx.fill();

    // 3. Bottom Blue Wing
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.moveTo(29, 73);
    ctx.lineTo(65, 99.5);
    ctx.lineTo(38, 62);
    ctx.closePath();
    ctx.fill();

    // 4. Dark Arrow Main Shaft
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.moveTo(0, 85);
    ctx.lineTo(38, 51);
    ctx.lineTo(83, 22);
    ctx.lineTo(75, 34);
    ctx.closePath();
    ctx.fill();

    // 5. Dark Arrow Tip Diamond
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(83, 22);
    ctx.lineTo(100, 10.5);
    ctx.lineTo(89, 22.5);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.moveTo(89, 22.5);
    ctx.lineTo(100, 10.5);
    ctx.lineTo(91.5, 27.5);
    ctx.closePath();
    ctx.fill();

    // 6. Signature Brand Coral Bow Arc (#E85874)
    ctx.fillStyle = '#E85874';
    ctx.beginPath();
    ctx.moveTo(42, 0.5);
    ctx.bezierCurveTo(55, 3, 67, 11, 75.5, 22.5);
    ctx.bezierCurveTo(84.5, 35, 88, 50, 85, 65.5);
    ctx.bezierCurveTo(82, 80, 72.5, 92, 65, 99.5);
    ctx.bezierCurveTo(67, 92, 72.5, 78.5, 74.5, 65);
    ctx.bezierCurveTo(76.5, 51.5, 73, 38, 65, 27);
    ctx.bezierCurveTo(57, 16, 47, 9, 42, 0.5);
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  useEffect(() => {
    if (selectedStation && ATPL_FACTORY_NODES[selectedStation]) {
      const node = ATPL_FACTORY_NODES[selectedStation];
      targetPos.set(node.robotPosition[0], node.robotPosition[1], node.robotPosition[2]);
    } else {
      targetPos.set(0, 3.8, 0);
    }
  }, [selectedStation, targetPos]);

  useFrame((state, delta) => {
    if (!robotGroupRef.current) return;

    // Smooth position interpolation toward target station
    robotGroupRef.current.position.lerp(targetPos, delta * 3.5);

    // Hover bobbing physics
    const time = state.clock.getElapsedTime();
    const bob = Math.sin(time * 3.2) * 0.14;
    robotGroupRef.current.position.y = targetPos.y + bob;

    // Head subtle autonomous looking
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(time * 1.5) * 0.18;
      headRef.current.rotation.x = Math.sin(time * 2.2) * 0.06;
    }

    // Arm natural sway & pointing
    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.x = Math.sin(time * 2.5) * 0.12;
      rightArmRef.current.rotation.x = -Math.sin(time * 2.5) * 0.15 - 0.2;
      rightArmRef.current.rotation.z = -0.3 + Math.sin(time * 1.8) * 0.08;
    }

    // Smoothly rotate body toward station or camera
    if (selectedStation && ATPL_FACTORY_NODES[selectedStation]) {
      const stationPos = ATPL_FACTORY_NODES[selectedStation].position;
      const lookTarget = new THREE.Vector3(stationPos[0], stationPos[1] + 1, stationPos[2]);
      robotGroupRef.current.lookAt(lookTarget);
    } else {
      robotGroupRef.current.rotation.y = Math.sin(time * 0.8) * 0.4;
    }
  });

  return (
    <group ref={robotGroupRef} position={[0, 3.8, 0]}>
      {/* ================= ROBOT HEAD ================= */}
      <group ref={headRef} position={[0, 0.48, 0]}>
        {/* Glossy White Helmet Dome */}
        <mesh castShadow>
          <sphereGeometry args={[0.38, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.4}
            roughness={0.15}
          />
        </mesh>

        {/* Curved Glossy Black OLED Face Visor */}
        <mesh position={[0, 0.02, 0.2]}>
          <sphereGeometry args={[0.32, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2.2]} />
          <meshStandardMaterial
            color="#040810"
            metalness={0.9}
            roughness={0.05}
          />
        </mesh>

        {/* High-Tech Glowing Cyan OLED Robot Eyes */}
        <group position={[0, 0.04, 0.35]}>
          <mesh position={[-0.11, 0, 0]}>
            <capsuleGeometry args={[0.035, 0.08, 12, 16]} rotation={[0, 0, 0.2]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
          <mesh position={[0.11, 0, 0]}>
            <capsuleGeometry args={[0.035, 0.08, 12, 16]} rotation={[0, 0, -0.2]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
          <pointLight color="#00f0ff" intensity={1.5} distance={1.8} />
        </group>

        {/* Head Side Sensor Pods */}
        <mesh position={[-0.43, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.11, 0.11, 0.05, 24]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
        <mesh position={[0.43, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.11, 0.11, 0.05, 24]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
      </group>

      {/* Dark Neck Collar */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.16, 0.2, 0.1, 24]} />
        <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* ================= TORSO & CHEST LOGO ================= */}
      <group position={[0, -0.22, 0]}>
        <mesh castShadow scale={[0.96, 1.15, 0.95]}>
          <sphereGeometry args={[0.46, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.4}
            roughness={0.15}
          />
        </mesh>

        {/* ATPL ARCHERY LOGO ON CENTER OF CHEST */}
        <group position={[0, 0.08, 0.4]}>
          <mesh rotation={[Math.PI / 2 + 0.12, 0, 0]}>
            <torusGeometry args={[0.2, 0.018, 16, 32]} />
            <meshStandardMaterial color="#0071ba" metalness={0.8} roughness={0.2} emissive="#0071ba" emissiveIntensity={0.3} />
          </mesh>

          <mesh rotation={[Math.PI / 2 + 0.12, 0, 0]} position={[0, 0, 0.005]}>
            <cylinderGeometry args={[0.195, 0.195, 0.015, 32]} />
            <meshStandardMaterial
              map={atplChestTexture}
              roughness={0.15}
              metalness={0.5}
            />
          </mesh>
        </group>
      </group>

      {/* ================= ARTICULATED ARMS ================= */}
      <group ref={leftArmRef} position={[-0.52, -0.15, 0]}>
        <mesh>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.2} />
        </mesh>
        <mesh position={[-0.04, -0.16, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.22, 12]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        <mesh position={[-0.04, -0.42, 0.02]}>
          <cylinderGeometry args={[0.055, 0.045, 0.2, 12]} />
          <meshStandardMaterial color="#ffffff" metalness={0.4} />
        </mesh>
      </group>

      <group ref={rightArmRef} position={[0.52, -0.15, 0]}>
        <mesh>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.2} />
        </mesh>
        <mesh position={[0.04, -0.16, 0.05]}>
          <cylinderGeometry args={[0.04, 0.04, 0.22, 12]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        <mesh position={[0.04, -0.42, 0.18]}>
          <cylinderGeometry args={[0.055, 0.045, 0.2, 12]} />
          <meshStandardMaterial color="#ffffff" metalness={0.4} />
        </mesh>
      </group>

      {/* ================= HOVER THRUSTER BASE ================= */}
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.15, 0.08, 0.15, 24]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} />
      </mesh>

      <mesh ref={thrusterRef} position={[0, -0.84, 0]}>
        <coneGeometry args={[0.13, 0.3, 16]} rotation={[Math.PI, 0, 0]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.88} />
      </mesh>

      <pointLight color="#00f0ff" intensity={2.2} distance={6} />
      <pointLight position={[0, -0.2, 0.5]} color="#E85874" intensity={0.8} distance={2.5} />
    </group>
  );
};

/* =========================================================================
   3. DATA NETWORK (Glowing Spline Paths & Data Particles)
   ========================================================================= */
export const DataNetwork = ({ selectedStation }) => {
  const particlesRef = useRef();

  const networkLines = useMemo(() => {
    const lines = [];
    const keys = STATION_KEYS;
    for (let i = 0; i < keys.length; i++) {
      const nextIdx = (i + 1) % keys.length;
      const n1 = ATPL_FACTORY_NODES[keys[i]];
      const n2 = ATPL_FACTORY_NODES[keys[nextIdx]];
      lines.push({
        points: [
          [n1.position[0], 0.4, n1.position[2]],
          [(n1.position[0] + n2.position[0]) / 2, 1.2, (n1.position[2] + n2.position[2]) / 2],
          [n2.position[0], 0.4, n2.position[2]]
        ],
        isHighlighted: selectedStation === keys[i] || selectedStation === keys[nextIdx]
      });
    }
    return lines;
  }, [selectedStation]);

  useFrame((state) => {
    if (!particlesRef.current) return;
    const time = state.clock.getElapsedTime();
    particlesRef.current.children.forEach((mesh, idx) => {
      mesh.position.y = 0.5 + Math.sin(time * 3 + idx) * 0.4;
    });
  });

  return (
    <group>
      {networkLines.map((line, idx) => (
        <Line
          key={idx}
          points={line.points}
          color={line.isHighlighted ? '#00f0ff' : '#0284c7'}
          lineWidth={line.isHighlighted ? 2.5 : 1.2}
          transparent
          opacity={line.isHighlighted ? 0.9 : 0.35}
        />
      ))}
    </group>
  );
};

/* =========================================================================
   4. 3D PRODUCT HOTSPOTS & FLOATING HOLOGRAPHIC BILLBOARDS
   ========================================================================= */
export const HotspotMarker = ({ stationKey, isSelected, isHovered, onSelect, onHover }) => {
  const node = ATPL_FACTORY_NODES[stationKey];
  const ringRef = useRef();

  useFrame((state) => {
    if (!ringRef.current) return;
    const time = state.clock.getElapsedTime();
    ringRef.current.rotation.y = time * 0.8;
    const pulse = 1 + Math.sin(time * 3.5) * 0.08;
    ringRef.current.scale.set(pulse, pulse, pulse);
  });

  return (
    <group position={[node.position[0], 2.8, node.position[2]]}>
      
      {/* Floating Glowing Ring */}
      <mesh
        ref={ringRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(stationKey);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(stationKey);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          onHover(null);
          document.body.style.cursor = 'default';
        }}
      >
        <torusGeometry args={[0.55, isSelected ? 0.065 : 0.035, 16, 32]} />
        <meshBasicMaterial
          color={isSelected ? '#00f0ff' : isHovered ? '#38bdf8' : '#0284c7'}
          transparent
          opacity={isSelected ? 1 : 0.85}
        />
      </mesh>

      {/* Stem down to machine */}
      <Line
        points={[[0, 0, 0], [0, -2.5, 0]]}
        color={isSelected ? '#00f0ff' : '#0284c7'}
        lineWidth={isSelected ? 2 : 1}
        transparent
        opacity={0.6}
      />

      {/* HTML Hotspot Pill & Holographic 3D Image Billboard */}
      <Html
        position={[0, 0.4, 0]}
        center
        distanceFactor={22}
        style={{ pointerEvents: 'auto', userSelect: 'none' }}
      >
        <div
          onClick={() => onSelect(stationKey)}
          style={{
            background: isSelected 
              ? 'rgba(4, 11, 24, 0.95)' 
              : isHovered 
                ? 'rgba(10, 24, 48, 0.95)' 
                : 'rgba(6, 14, 30, 0.9)',
            color: '#ffffff',
            border: isSelected ? '2px solid #00f0ff' : isHovered ? '1.5px solid #00f0ff' : '1px solid rgba(0, 240, 255, 0.45)',
            borderRadius: isSelected || isHovered ? '12px' : '20px',
            padding: isSelected || isHovered ? '0.45rem 0.65rem' : '0.25rem 0.6rem',
            boxShadow: isSelected 
              ? '0 0 30px rgba(0, 240, 255, 0.8), 0 10px 25px rgba(0,0,0,0.85)' 
              : isHovered 
                ? '0 0 20px rgba(0, 240, 255, 0.5), 0 8px 20px rgba(0,0,0,0.75)' 
                : '0 4px 15px rgba(0,0,0,0.6)',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
            fontFamily: 'var(--font-display, sans-serif)',
            fontSize: '0.78rem',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isHovered || isSelected ? 'scale(1.08)' : 'scale(1)',
            backdropFilter: 'blur(12px)',
            maxWidth: isSelected || isHovered ? '170px' : 'auto'
          }}
        >
          {/* Header Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <span style={{
              background: isSelected ? '#00f0ff' : node.color || '#00f0ff',
              color: '#040914',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.68rem',
              fontWeight: 900,
              flexShrink: 0
            }}>
              {node.number}
            </span>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.8rem', fontWeight: 800 }}>{node.name}</span>
          </div>

          {/* Holographic 3D Station Image Preview */}
          {(isSelected || isHovered) && node.image && (
            <div style={{
              width: '100%',
              height: '85px',
              borderRadius: '6px',
              overflow: 'hidden',
              border: `1px solid ${node.color || '#00f0ff'}80`,
              position: 'relative'
            }}>
              <img
                src={node.image}
                alt={node.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 2,
                left: 4,
                right: 4,
                background: 'rgba(0,0,0,0.8)',
                padding: '0.12rem 0.35rem',
                borderRadius: '3px',
                fontSize: '0.62rem',
                fontFamily: 'var(--font-mono, monospace)',
                color: '#00f0ff',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span>TELEMETRY</span>
                <span style={{ color: '#10b981', fontWeight: 800 }}>ONLINE</span>
              </div>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};

/* =========================================================================
   5. REALISTIC INDUSTRY 4.0 FACTORY MACHINERY & ARCHITECTURE
   ========================================================================= */
export const FactoryMachinery = ({ selectedStation, isDemoRunning }) => {
  const conveyorPayloadsRef = useRef();

  // Animate cartons moving down the conveyor
  useFrame((state, delta) => {
    if (!conveyorPayloadsRef.current) return;
    conveyorPayloadsRef.current.children.forEach((child) => {
      child.position.x += delta * 2.5;
      if (child.position.x > 18) child.position.x = -18;
    });
  });

  return (
    <group>
      {/* ================= FACTORY FLOOR & STRUCTURAL ARCHITECTURE ================= */}
      {/* High-Gloss Reflective Industrial Concrete Floor */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[54, 0.2, 54]} />
        <meshStandardMaterial
          color="#080f1e"
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* Cybernetic Grid Floor Pattern */}
      <gridHelper args={[54, 54, '#00f0ff', '#0d223f']} position={[0, 0.01, 0]} />

      {/* Yellow Safety Boundary Strips around Machine Zones */}
      {[-16, 0, 16].map(x => (
        [-14, 0, 14].map(z => (
          <group key={`${x}-${z}`} position={[x, 0.02, z]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[4.2, 4.35, 32]} />
              <meshBasicMaterial color="#eab308" opacity={0.65} transparent />
            </mesh>
          </group>
        ))
      ))}

      {/* Structural Steel Columns & Pillars */}
      {[-24, 0, 24].map(x => (
        [-24, 24].map(z => (
          <group key={`col-${x}-${z}`} position={[x, 5, z]}>
            {/* Main I-Beam Column */}
            <mesh castShadow>
              <boxGeometry args={[0.8, 10, 0.8]} />
              <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.3} />
            </mesh>
            {/* Safety Yellow Pillar Base */}
            <mesh position={[0, -4.2, 0]}>
              <boxGeometry args={[1.2, 1.6, 1.2]} />
              <meshStandardMaterial color="#eab308" metalness={0.5} />
            </mesh>
          </group>
        ))
      ))}

      {/* Overhead High-Bay Roof Trusses */}
      {[-18, 0, 18].map(z => (
        <group key={`truss-${z}`} position={[0, 9.5, z]}>
          <mesh>
            <boxGeometry args={[52, 0.4, 0.4]} />
            <meshStandardMaterial color="#334155" metalness={0.9} />
          </mesh>
          {/* Hanging Industrial LED High-Bay Floodlights */}
          {[-16, 0, 16].map(x => (
            <group key={`light-${x}`} position={[x, -0.4, 0]}>
              <mesh>
                <cylinderGeometry args={[0.5, 0.8, 0.4, 16]} />
                <meshStandardMaterial color="#0f172a" metalness={0.8} />
              </mesh>
              <pointLight color="#e0f2fe" intensity={1.2} distance={16} position={[0, -0.5, 0]} />
            </group>
          ))}
        </group>
      ))}

      {/* ================= 1. PERFECT TRACE (STATION 1) - PACKAGING & SERIALIZATION ================= */}
      <group position={[14, 0, 12]}>
        {/* Serialization Machine Housing */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <boxGeometry args={[3.2, 2.4, 1.8]} />
          <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Stainless Steel Conveyor Bridge Through Machine */}
        <mesh position={[0, 0.9, 0]}>
          <boxGeometry args={[3.4, 0.2, 1.2]} />
          <meshStandardMaterial color="#64748b" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Overhead Camera & Laser Grading Tower */}
        <mesh position={[0, 2.8, 0]}>
          <boxGeometry args={[0.8, 0.6, 0.8]} />
          <meshStandardMaterial color="#0071ba" metalness={0.9} />
        </mesh>
        {/* Cyan Verification Laser Fan */}
        <mesh position={[0, 1.8, 0]} rotation={[0, 0, 0]}>
          <coneGeometry args={[0.6, 1.4, 16]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.35} />
        </mesh>
        {/* Touchscreen Operator Terminal */}
        <mesh position={[1.8, 1.6, 0.8]} rotation={[0, -0.4, 0]}>
          <boxGeometry args={[0.6, 0.4, 0.08]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
      </group>

      {/* ================= 2. PERFECT AUDIT (STATION 2) - QA BENCH ================= */}
      <group position={[-14, 0, 10]}>
        {/* Stainless Steel QA Inspection Table */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[3.5, 1.6, 2.0]} />
          <meshStandardMaterial color="#1e293b" metalness={0.85} />
        </mesh>
        {/* Overhead LED Ring Light Arm */}
        <mesh position={[0, 2.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.6, 0.05, 16, 32]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
        {/* Tablet Stand with Digital Checklist */}
        <mesh position={[0.5, 1.8, 0.4]} rotation={[-0.3, 0, 0]}>
          <boxGeometry args={[0.5, 0.35, 0.05]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
      </group>

      {/* ================= 3. PERFECT WAREHOUSE (STATION 3) - 3D RACKING & AGV ================= */}
      <group position={[16, 0, -14]}>
        {[0, 1, 2].map(r => (
          <group key={r} position={[0, 0, r * 2.8]}>
            {/* Upright Steel Beams */}
            <mesh position={[-2.5, 2.5, 0]} castShadow>
              <boxGeometry args={[0.15, 5, 0.15]} />
              <meshStandardMaterial color="#0284c7" metalness={0.8} />
            </mesh>
            <mesh position={[2.5, 2.5, 0]} castShadow>
              <boxGeometry args={[0.15, 5, 0.15]} />
              <meshStandardMaterial color="#0284c7" metalness={0.8} />
            </mesh>
            {/* Orange Crossbeams */}
            {[1, 2.5, 4].map(h => (
              <mesh key={h} position={[0, h, 0]}>
                <boxGeometry args={[5.2, 0.1, 1.2]} />
                <meshStandardMaterial color="#f59e0b" metalness={0.7} />
              </mesh>
            ))}
            {/* Loaded Pallets & Heatmap Cartons */}
            {[1.25, 2.75, 4.25].map(h => (
              <group key={h} position={[0, h, 0]}>
                <mesh position={[-1.5, 0.3, 0]}>
                  <boxGeometry args={[1.0, 0.5, 0.9]} />
                  <meshStandardMaterial color="#3b82f6" roughness={0.3} />
                </mesh>
                <mesh position={[0, 0.3, 0]}>
                  <boxGeometry args={[1.0, 0.5, 0.9]} />
                  <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.25} />
                </mesh>
                <mesh position={[1.5, 0.3, 0]}>
                  <boxGeometry args={[1.0, 0.5, 0.9]} />
                  <meshStandardMaterial color="#10b981" roughness={0.3} />
                </mesh>
              </group>
            ))}
          </group>
        ))}

        {/* Autonomous AGV Robot with Lidar */}
        <group position={[-3.5, 0.3, 2]}>
          <mesh castShadow>
            <boxGeometry args={[1.4, 0.5, 1.0]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} />
          </mesh>
          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
            <meshBasicMaterial color="#f59e0b" />
          </mesh>
        </group>
      </group>

      {/* ================= 4. RFID PORTAL (STATION 4) ================= */}
      <group position={[-4, 0, 18]}>
        <mesh position={[-2, 2, 0]}>
          <boxGeometry args={[0.35, 4, 0.5]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.8} />
        </mesh>
        <mesh position={[2, 2, 0]}>
          <boxGeometry args={[0.35, 4, 0.5]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.8} />
        </mesh>
        <mesh position={[0, 3.8, 0]}>
          <boxGeometry args={[4.35, 0.35, 0.5]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.8} />
        </mesh>
        {/* Planar Antennas */}
        <mesh position={[-1.8, 2.2, 0]}>
          <boxGeometry args={[0.1, 1.4, 0.9]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <mesh position={[1.8, 2.2, 0]}>
          <boxGeometry args={[0.1, 1.4, 0.9]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        {/* Andon Light Tower */}
        <mesh position={[2.2, 4.3, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.6, 12]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
      </group>

      {/* ================= 5. INDUSTRIAL 6-AXIS ROBOT (STATION 5) ================= */}
      <group position={[18, 0, 0]}>
        {/* Yellow Safety Fence */}
        <mesh position={[0, 0.9, 3]}>
          <boxGeometry args={[6, 1.8, 0.1]} />
          <meshStandardMaterial color="#eab308" wireframe />
        </mesh>
        <mesh position={[0, 0.9, -3]}>
          <boxGeometry args={[6, 1.8, 0.1]} />
          <meshStandardMaterial color="#eab308" wireframe />
        </mesh>
        {/* Heavy Cast Iron Base */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[1.0, 1.2, 0.8, 24]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} />
        </mesh>
        {/* Robot Arm Segments (Orange KUKA Style) */}
        <mesh position={[0, 1.5, 0]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.45, 1.8, 0.45]} />
          <meshStandardMaterial color="#ea580c" metalness={0.8} />
        </mesh>
        <mesh position={[0.6, 2.6, 0]} rotation={[0, 0, -0.6]}>
          <boxGeometry args={[0.35, 1.6, 0.35]} />
          <meshStandardMaterial color="#ea580c" metalness={0.8} />
        </mesh>
        {/* Tool End Effector */}
        <mesh position={[1.3, 2.0, 0]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* ================= 6. VISION AI (STATION 6) ================= */}
      <group position={[6, 0, 6]}>
        {/* Aluminum Profile Camera Gantry */}
        <mesh position={[0, 1.9, 0]}>
          <torusGeometry args={[1.6, 0.12, 16, 32, Math.PI]} rotation={[0, Math.PI / 2, 0]} />
          <meshStandardMaterial color="#8b5cf6" metalness={0.9} emissive="#8b5cf6" emissiveIntensity={0.4} />
        </mesh>
        {/* Camera Enclosure */}
        <mesh position={[0, 2.7, 0]}>
          <boxGeometry args={[0.6, 0.45, 0.45]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        {/* Laser Inspection Fan Beam */}
        <mesh position={[0, 1.6, 0]}>
          <coneGeometry args={[0.7, 1.8, 16]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* ================= 7. ERP & SERVER BANK (STATION 7) ================= */}
      <group position={[-18, 0, -6]}>
        {[-2.4, 0, 2.4].map((x, i) => (
          <group key={i} position={[x, 0, 0]}>
            <mesh position={[0, 2.1, 0]} castShadow>
              <boxGeometry args={[1.6, 4.2, 1.3]} />
              <meshStandardMaterial color="#030712" metalness={0.9} roughness={0.15} />
            </mesh>
            {/* LED Status Blinkers */}
            {[0.8, 1.6, 2.4, 3.2].map(h => (
              <mesh key={h} position={[0, h, 0.66]}>
                <boxGeometry args={[1.3, 0.08, 0.02]} />
                <meshBasicMaterial color={i % 2 === 0 ? '#00f0ff' : '#10b981'} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* ================= 8. INSPECTION DRONE (STATION 8) ================= */}
      <group position={[20, 3.2, -8]}>
        <mesh>
          <boxGeometry args={[0.8, 0.2, 0.8]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
        {/* Rotors */}
        {[-0.45, 0.45].map(x => (
          [-0.45, 0.45].map(z => (
            <mesh key={`${x}-${z}`} position={[x, 0.15, z]}>
              <cylinderGeometry args={[0.3, 0.3, 0.02, 16]} />
              <meshBasicMaterial color="#38bdf8" transparent opacity={0.65} />
            </mesh>
          ))
        ))}
        <pointLight color="#38bdf8" intensity={2} distance={6} />
      </group>

      {/* ================= 9. SCANNERS PODIUM (STATION 9) ================= */}
      <group position={[8, 0, -8]}>
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.6, 0.7, 1.6, 24]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
        <mesh position={[0, 1.7, 0]}>
          <boxGeometry args={[0.4, 0.3, 0.3]} />
          <meshStandardMaterial color="#eab308" metalness={0.9} />
        </mesh>
      </group>

      {/* ================= 10. INDUSTRIAL PRINTER (STATION 10) ================= */}
      <group position={[-4, 0, -14]}>
        <mesh position={[0, 0.9, 0]}>
          <boxGeometry args={[1.4, 1.8, 1.2]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} />
        </mesh>
        <mesh position={[0, 1.9, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.4, 24]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* ================= 11. SOFTWARE LAB (STATION 11) ================= */}
      <group position={[-16, 0, 14]}>
        <mesh position={[0, 0.75, 0]}>
          <boxGeometry args={[3.2, 1.5, 1.8]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
        {/* Multi-Monitor Command Screens */}
        {[-0.9, 0, 0.9].map((mx, idx) => (
          <mesh key={idx} position={[mx, 1.8, -0.3]} rotation={[0, (idx - 1) * -0.25, 0]}>
            <boxGeometry args={[0.8, 0.5, 0.04]} />
            <meshBasicMaterial color="#6366f1" />
          </mesh>
        ))}
      </group>

      {/* ================= 12. PRODUCTION PMS (STATION 12) ================= */}
      <group position={[2, 0, 16]}>
        {/* Pedestal Console */}
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.3, 0.4, 1.8, 24]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} />
        </mesh>
        {/* HMI Screen with OEE Dashboard */}
        <mesh position={[0, 1.9, 0]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[1.2, 0.8, 0.08]} />
          <meshBasicMaterial color="#f43f5e" />
        </mesh>
      </group>

      {/* ================= MAIN SMART CONVEYOR LINE ================= */}
      <group position={[0, 0, 0]}>
        {/* Conveyor Steel Frame */}
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[36, 0.3, 1.4]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} />
        </mesh>
        {/* Moving Product Packages */}
        <group ref={conveyorPayloadsRef}>
          {[-14, -10, -6, -2, 2, 6, 10, 14].map((px, i) => (
            <mesh key={i} position={[px, 0.8, 0]} castShadow>
              <boxGeometry args={[1.1, 0.6, 0.8]} />
              <meshStandardMaterial color={i % 2 === 0 ? '#0284c7' : '#eab308'} roughness={0.3} />
            </mesh>
          ))}
        </group>
      </group>

    </group>
  );
};

/* =========================================================================
   6. MAIN FACTORY 3D SCENE ROOT
   ========================================================================= */
export const FactoryScene = ({
  selectedStation,
  hoveredStation,
  onSelectStation,
  onHoverStation,
  cameraMode,
  isOverview,
  isDemoRunning,
  quality = 'HIGH'
}) => {
  return (
    <>
      {/* High-End Industrial Lighting */}
      <ambientLight intensity={0.7} color="#0d1b33" />
      <directionalLight
        position={[25, 35, 20]}
        intensity={2.0}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={quality === 'HIGH' ? 2048 : 1024}
        shadow-mapSize-height={quality === 'HIGH' ? 2048 : 1024}
      />
      <directionalLight position={[-20, 25, -20]} intensity={0.8} color="#00f0ff" />
      
      {/* Central Core Ambient Glow */}
      <pointLight position={[0, 4, 0]} intensity={2.5} distance={22} color="#00f0ff" />

      {/* Camera Controller */}
      <CameraController
        selectedStation={selectedStation}
        cameraMode={cameraMode}
        isOverview={isOverview}
        quality={quality}
      />

      {/* AI Robot Mascot Companion */}
      <RobotCompanion
        selectedStation={selectedStation}
        isDemoRunning={isDemoRunning}
      />

      {/* Factory Floor & Infrastructure Machinery */}
      <FactoryMachinery
        selectedStation={selectedStation}
        isDemoRunning={isDemoRunning}
      />

      {/* Data Network Spline Lines & Particle Streams */}
      <DataNetwork selectedStation={selectedStation} />

      {/* 12 Interactive 3D Product Hotspots & Holographic Billboards */}
      {STATION_KEYS.map((key) => (
        <HotspotMarker
          key={key}
          stationKey={key}
          isSelected={selectedStation === key}
          isHovered={hoveredStation === key}
          onSelect={onSelectStation}
          onHover={onHoverStation}
        />
      ))}
    </>
  );
};
