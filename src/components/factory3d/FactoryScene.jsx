import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Html, 
  Line, 
  Sphere, 
  Box, 
  Cylinder, 
  Torus, 
  Float, 
  useGLTF 
} from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ATPL_FACTORY_NODES, STATION_KEYS } from '../../data/factoryStations3D';

/* =========================================================================
   1. CAMERA CONTROLLER (Smooth FlyTo & Overview)
   ========================================================================= */
export const CameraController = ({ selectedStation, cameraMode, isOverview, quality }) => {
  const { camera } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    if (isOverview || !selectedStation) {
      // Overview Isometric Angle
      gsap.to(camera.position, {
        x: 28,
        y: 22,
        z: 28,
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
        gsap.to(camera.position, {
          x: node.cameraPosition[0],
          y: node.cameraPosition[1],
          z: node.cameraPosition[2],
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
  }, [selectedStation, isOverview, camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      maxPolarAngle={Math.PI / 2.05} // Prevent camera flipping below floor
      minPolarAngle={Math.PI / 8}
      minDistance={6}
      maxDistance={65}
      target={[0, 1.5, 0]}
    />
  );
};

/* =========================================================================
   2. AI ROBOT MASCOT COMPANION (Official ATPL Robot with Chest Logo)
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

    // Draw ATPL Bow & Arrow Logo inside (scaled to center)
    ctx.save();
    ctx.translate(136, 115);
    ctx.scale(2.5, 2.5);

    // 1. Top Blue Triangle Facet
    ctx.fillStyle = '#29A2E1';
    ctx.beginPath();
    ctx.moveTo(22, 10.5);
    ctx.lineTo(38, 43);
    ctx.lineTo(0, 58);
    ctx.closePath();
    ctx.fill();

    // 2. Middle Teal Accent Strip
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.moveTo(23, 54);
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
      targetPos.set(0, 4.0, 0);
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

    // Thruster pulse
    if (thrusterRef.current) {
      const scale = 0.85 + Math.sin(time * 14) * 0.25;
      thrusterRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={robotGroupRef} position={[0, 4, 0]}>
      {/* ================= HEAD GROUP ================= */}
      <group ref={headRef} position={[0, 0.45, 0]}>
        {/* Glossy White Spherical Dome Head */}
        <mesh castShadow>
          <sphereGeometry args={[0.42, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.4}
            roughness={0.12}
            emissive="#e0f2fe"
            emissiveIntensity={0.06}
          />
        </mesh>

        {/* Dark Curved Visor Face Screen */}
        <mesh position={[0, 0.02, 0.22]}>
          <sphereGeometry args={[0.38, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
          <meshStandardMaterial
            color="#050a14"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Glowing Cyan Pill/Oval Eyes */}
        <mesh position={[-0.13, 0.05, 0.38]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.042, 0.065, 8, 16]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <mesh position={[0.13, 0.05, 0.38]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.042, 0.065, 8, 16]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>

        {/* Ear Pods with ATPL Coral Accent Trim */}
        <mesh position={[-0.43, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.11, 0.11, 0.05, 24]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
        <mesh position={[-0.45, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.09, 0.015, 8, 24]} />
          <meshStandardMaterial color="#E85874" emissive="#E85874" emissiveIntensity={0.6} />
        </mesh>

        <mesh position={[0.43, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.11, 0.11, 0.05, 24]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
        <mesh position={[0.45, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.09, 0.015, 8, 24]} />
          <meshStandardMaterial color="#E85874" emissive="#E85874" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* Dark Neck Collar */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.16, 0.2, 0.1, 24]} />
        <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* ================= TORSO & CHEST LOGO ================= */}
      <group position={[0, -0.22, 0]}>
        {/* Glossy White Egg Torso Body */}
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
          {/* Bezel Ring */}
          <mesh rotation={[Math.PI / 2 + 0.12, 0, 0]}>
            <torusGeometry args={[0.2, 0.018, 16, 32]} />
            <meshStandardMaterial color="#0071ba" metalness={0.8} roughness={0.2} emissive="#0071ba" emissiveIntensity={0.3} />
          </mesh>

          {/* Logo Disc Face with Crisp Vector Texture */}
          <mesh rotation={[Math.PI / 2 + 0.12, 0, 0]} position={[0, 0, 0.005]}>
            <cylinderGeometry args={[0.195, 0.195, 0.015, 32]} />
            <meshStandardMaterial
              map={atplChestTexture}
              roughness={0.15}
              metalness={0.5}
            />
          </mesh>
        </group>

        {/* Side Torso Mechanical Vents */}
        <mesh position={[-0.42, -0.05, 0]}>
          <boxGeometry args={[0.05, 0.18, 0.2]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} />
        </mesh>
        <mesh position={[0.42, -0.05, 0]}>
          <boxGeometry args={[0.05, 0.18, 0.2]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} />
        </mesh>
      </group>

      {/* ================= ARTICULATED ARMS ================= */}
      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.52, -0.15, 0]}>
        {/* Shoulder Joint */}
        <mesh>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.2} />
        </mesh>
        {/* Upper Arm Bar */}
        <mesh position={[-0.04, -0.16, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.22, 12]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        {/* Elbow Joint */}
        <mesh position={[-0.04, -0.28, 0]}>
          <sphereGeometry args={[0.065, 12, 12]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        {/* Forearm Guard */}
        <mesh position={[-0.04, -0.42, 0.02]}>
          <cylinderGeometry args={[0.055, 0.045, 0.2, 12]} />
          <meshStandardMaterial color="#ffffff" metalness={0.4} />
        </mesh>
        {/* Robot Cybernetic Hand */}
        <mesh position={[-0.04, -0.55, 0.04]}>
          <boxGeometry args={[0.07, 0.08, 0.05]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} />
        </mesh>
      </group>

      {/* Right Arm (Gesture Pointing) */}
      <group ref={rightArmRef} position={[0.52, -0.15, 0]}>
        {/* Shoulder Joint */}
        <mesh>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.2} />
        </mesh>
        {/* Upper Arm Bar */}
        <mesh position={[0.04, -0.16, 0.05]}>
          <cylinderGeometry args={[0.04, 0.04, 0.22, 12]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        {/* Elbow Joint */}
        <mesh position={[0.04, -0.28, 0.1]}>
          <sphereGeometry args={[0.065, 12, 12]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        {/* Forearm Guard */}
        <mesh position={[0.04, -0.42, 0.18]}>
          <cylinderGeometry args={[0.055, 0.045, 0.2, 12]} />
          <meshStandardMaterial color="#ffffff" metalness={0.4} />
        </mesh>
        {/* Robot Cybernetic Hand */}
        <mesh position={[0.04, -0.55, 0.26]}>
          <boxGeometry args={[0.07, 0.08, 0.05]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} />
        </mesh>
      </group>

      {/* ================= HOVER THRUSTER BASE ================= */}
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.15, 0.08, 0.15, 24]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} />
      </mesh>

      {/* Glowing Dual Thruster Flame (Cyan + Coral Accent) */}
      <mesh ref={thrusterRef} position={[0, -0.84, 0]}>
        <coneGeometry args={[0.13, 0.3, 16]} rotation={[Math.PI, 0, 0]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.88} />
      </mesh>

      {/* Point Light emitted from robot */}
      <pointLight color="#00f0ff" intensity={2.2} distance={6} />
      <pointLight position={[0, -0.2, 0.5]} color="#E85874" intensity={0.8} distance={2.5} />
    </group>
  );
};

/* =========================================================================
   3. DATA NETWORK (Glowing Cyber Lines & Traveling Data Particles)
   ========================================================================= */
export const DataNetwork = ({ selectedStation }) => {
  const particlesRef = useRef();

  // Create network paths between key stations
  const networkLines = useMemo(() => {
    const lines = [];
    const keys = STATION_KEYS;

    // Ring topology connecting adjacent stations
    for (let i = 0; i < keys.length; i++) {
      const from = ATPL_FACTORY_NODES[keys[i]].position;
      const to = ATPL_FACTORY_NODES[keys[(i + 1) % keys.length]].position;
      lines.push({
        from: [from[0], 0.08, from[2]],
        to: [to[0], 0.08, to[2]],
        isHighlighted: selectedStation === keys[i] || selectedStation === keys[(i + 1) % keys.length]
      });
    }

    // Central hub spokes to center
    keys.forEach(k => {
      const pos = ATPL_FACTORY_NODES[k].position;
      lines.push({
        from: [0, 0.08, 0],
        to: [pos[0], 0.08, pos[2]],
        isHighlighted: selectedStation === k
      });
    });

    return lines;
  }, [selectedStation]);

  // Particle stream along lines
  useFrame((state) => {
    if (!particlesRef.current) return;
    const time = state.clock.getElapsedTime();
    particlesRef.current.children.forEach((child, i) => {
      const speed = selectedStation ? 2.5 : 1.2;
      const progress = ((time * speed * 0.2 + i * 0.15) % 1);
      const line = networkLines[i % networkLines.length];
      if (line) {
        child.position.x = line.from[0] + (line.to[0] - line.from[0]) * progress;
        child.position.y = 0.15;
        child.position.z = line.from[2] + (line.to[2] - line.from[2]) * progress;
      }
    });
  });

  return (
    <group>
      {/* Network Lines */}
      {networkLines.map((line, idx) => (
        <Line
          key={idx}
          points={[line.from, line.to]}
          color={line.isHighlighted ? '#00f0ff' : '#0e3a5f'}
          lineWidth={line.isHighlighted ? 2.5 : 1.2}
          transparent
          opacity={line.isHighlighted ? 0.9 : 0.35}
        />
      ))}

      {/* Moving Data Particles */}
      <group ref={particlesRef}>
        {networkLines.slice(0, 16).map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        ))}
      </group>
    </group>
  );
};

/* =========================================================================
   4. 3D PRODUCT HOTSPOTS (Floating Interactive Markers)
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
        <torusGeometry args={[0.52, isSelected ? 0.065 : 0.035, 16, 32]} />
        <meshBasicMaterial
          color={isSelected ? '#00f0ff' : isHovered ? '#38bdf8' : '#0284c7'}
          transparent
          opacity={isSelected ? 1 : 0.85}
        />
      </mesh>

      {/* Vertical Connection Stems down to machine */}
      <Line
        points={[[0, 0, 0], [0, -2.5, 0]]}
        color={isSelected ? '#00f0ff' : '#0284c7'}
        lineWidth={isSelected ? 2 : 1}
        transparent
        opacity={0.6}
      />

      {/* HTML Hotspot Pill */}
      <Html
        position={[0, 0, 0]}
        center
        distanceFactor={24}
        style={{ pointerEvents: 'auto', userSelect: 'none' }}
      >
        <div
          onClick={() => onSelect(stationKey)}
          style={{
            background: isSelected 
              ? 'rgba(0, 240, 255, 0.95)' 
              : isHovered 
                ? 'rgba(14, 38, 70, 0.95)' 
                : 'rgba(6, 14, 30, 0.85)',
            color: isSelected ? '#040914' : '#ffffff',
            border: isSelected ? '2px solid #ffffff' : '1px solid rgba(0, 240, 255, 0.45)',
            borderRadius: '20px',
            padding: isSelected || isHovered ? '0.35rem 0.85rem' : '0.25rem 0.55rem',
            boxShadow: isSelected 
              ? '0 0 25px #00f0ff, 0 0 40px rgba(0,240,255,0.4)' 
              : '0 4px 15px rgba(0,0,0,0.6)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontFamily: 'var(--font-display, sans-serif)',
            fontSize: '0.78rem',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isHovered ? 'scale(1.12)' : 'scale(1)'
          }}
        >
          <span style={{
            background: isSelected ? '#040914' : '#00f0ff',
            color: isSelected ? '#00f0ff' : '#040914',
            borderRadius: '50%',
            width: '18px',
            height: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.65rem',
            fontWeight: 900
          }}>
            {node.number}
          </span>
          <span>{node.name}</span>
        </div>
      </Html>
    </group>
  );
};

/* =========================================================================
   5. PROCEDURAL 3D SMART FACTORY MACHINERY & INFRASTRUCTURE
   ========================================================================= */
export const FactoryMachinery = ({ selectedStation, isDemoRunning }) => {
  const conveyorPayloadsRef = useRef();

  // Animate conveyor payloads
  useFrame((state, delta) => {
    if (!conveyorPayloadsRef.current) return;
    conveyorPayloadsRef.current.children.forEach((child, i) => {
      child.position.x += delta * 2.2;
      if (child.position.x > 18) child.position.x = -18;
    });
  });

  return (
    <group>
      {/* Base Factory Floor Plate */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[48, 0.2, 48]} />
        <meshStandardMaterial
          color="#060c18"
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>

      {/* Cyber Grid Floor Overlay */}
      <gridHelper args={[48, 48, '#00f0ff', '#0d223f']} position={[0, 0.01, 0]} />

      {/* Outer Boundary Security Barrier */}
      <mesh position={[0, 0.3, 24]}>
        <boxGeometry args={[48, 0.6, 0.3]} />
        <meshStandardMaterial color="#0f2648" metalness={0.9} />
      </mesh>
      <mesh position={[0, 0.3, -24]}>
        <boxGeometry args={[48, 0.6, 0.3]} />
        <meshStandardMaterial color="#0f2648" metalness={0.9} />
      </mesh>
      <mesh position={[24, 0.3, 0]}>
        <boxGeometry args={[0.3, 0.6, 48]} />
        <meshStandardMaterial color="#0f2648" metalness={0.9} />
      </mesh>
      <mesh position={[-24, 0.3, 0]}>
        <boxGeometry args={[0.3, 0.6, 48]} />
        <meshStandardMaterial color="#0f2648" metalness={0.9} />
      </mesh>

      {/* Central Command Core Podium */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[2.8, 3.2, 0.5, 32]} />
          <meshStandardMaterial color="#0a1932" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.52, 0]}>
          <torusGeometry args={[2.5, 0.06, 16, 64]} rotation={[Math.PI / 2, 0, 0]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[1.5, 1.8, 0.2, 32]} />
          <meshStandardMaterial color="#030814" metalness={0.9} />
        </mesh>
      </group>

      {/* 1. Automated Warehouse Racks (Perfect Warehouse Node) */}
      <group position={[16, 0, -14]}>
        {[0, 1, 2].map(r => (
          <group key={r} position={[0, 0, r * 2.8]}>
            {/* Upright Rack Steel Beams */}
            <mesh position={[-2.5, 2.5, 0]} castShadow>
              <boxGeometry args={[0.15, 5, 0.15]} />
              <meshStandardMaterial color="#334155" metalness={0.8} />
            </mesh>
            <mesh position={[2.5, 2.5, 0]} castShadow>
              <boxGeometry args={[0.15, 5, 0.15]} />
              <meshStandardMaterial color="#334155" metalness={0.8} />
            </mesh>
            {/* Shelves */}
            {[1, 2.5, 4].map(h => (
              <mesh key={h} position={[0, h, 0]}>
                <boxGeometry args={[5.2, 0.08, 1.2]} />
                <meshStandardMaterial color="#f59e0b" metalness={0.7} />
              </mesh>
            ))}
            {/* Pallets & Cartons */}
            {[1.2, 2.7, 4.2].map(h => (
              <group key={h} position={[0, h, 0]}>
                <mesh position={[-1.5, 0.3, 0]}>
                  <boxGeometry args={[0.9, 0.5, 0.8]} />
                  <meshStandardMaterial color="#3b82f6" metalness={0.4} />
                </mesh>
                <mesh position={[0, 0.3, 0]}>
                  <boxGeometry args={[0.9, 0.5, 0.8]} />
                  <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.2} />
                </mesh>
                <mesh position={[1.5, 0.3, 0]}>
                  <boxGeometry args={[0.9, 0.5, 0.8]} />
                  <meshStandardMaterial color="#10b981" metalness={0.4} />
                </mesh>
              </group>
            ))}
          </group>
        ))}
      </group>

      {/* 2. Main High-Speed Conveyor Belt Loop */}
      <group position={[0, 0.6, 6]}>
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[36, 0.4, 1.4]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[36, 0.04, 1.1]} />
          <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.8} />
        </mesh>

        {/* Moving Packages on Conveyor */}
        <group ref={conveyorPayloadsRef}>
          {[-16, -11, -6, -1, 4, 9, 14].map((x, idx) => (
            <mesh key={idx} position={[x, 0.55, 0]} castShadow>
              <boxGeometry args={[1.0, 0.65, 0.75]} />
              <meshStandardMaterial 
                color={idx % 2 === 0 ? '#38bdf8' : '#f8fafc'} 
                metalness={0.5}
                emissive="#00f0ff"
                emissiveIntensity={0.08}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* 3. Industrial 6-Axis Robot Cell (Industrial Robots Node) */}
      <group position={[18, 0, 0]}>
        {/* Yellow Safety Fence */}
        <mesh position={[0, 0.8, 3]}>
          <boxGeometry args={[6, 1.6, 0.1]} />
          <meshStandardMaterial color="#eab308" wireframe />
        </mesh>
        {/* Robot Base */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.9, 1.1, 0.8, 24]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} />
        </mesh>
        {/* Articulated Arm Segments */}
        <mesh position={[0, 1.5, 0]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.4, 1.8, 0.4]} />
          <meshStandardMaterial color="#ec4899" metalness={0.8} />
        </mesh>
        <mesh position={[0.6, 2.6, 0]} rotation={[0, 0, -0.6]}>
          <boxGeometry args={[0.3, 1.6, 0.3]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.8} />
        </mesh>
        {/* End Effector Gripper */}
        <mesh position={[1.2, 2.0, 0]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* 4. Optical AI Vision Inspection Station (Vision AI Node) */}
      <group position={[6, 0, 6]}>
        {/* Vision Inspection Arch */}
        <mesh position={[0, 1.8, 0]}>
          <torusGeometry args={[1.5, 0.15, 16, 32, Math.PI]} rotation={[0, Math.PI / 2, 0]} />
          <meshStandardMaterial color="#8b5cf6" metalness={0.9} emissive="#8b5cf6" emissiveIntensity={0.4} />
        </mesh>
        {/* Camera Sensors */}
        <mesh position={[0, 2.6, 0]}>
          <boxGeometry args={[0.5, 0.4, 0.4]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        {/* Strobe Lighting */}
        <pointLight color="#8b5cf6" intensity={2} distance={4} position={[0, 2.2, 0]} />
      </group>

      {/* 5. Fixed UHF RFID Gate Portals (RFID Portals Node) */}
      <group position={[-4, 0, 18]}>
        <mesh position={[-2, 2, 0]}>
          <boxGeometry args={[0.3, 4, 0.5]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.8} />
        </mesh>
        <mesh position={[2, 2, 0]}>
          <boxGeometry args={[0.3, 4, 0.5]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.8} />
        </mesh>
        <mesh position={[0, 3.8, 0]}>
          <boxGeometry args={[4.2, 0.3, 0.5]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.8} />
        </mesh>
        {/* RFID Planar Antennas */}
        <mesh position={[-1.8, 2.2, 0]}>
          <boxGeometry args={[0.1, 1.2, 0.8]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <mesh position={[1.8, 2.2, 0]}>
          <boxGeometry args={[0.1, 1.2, 0.8]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
      </group>

      {/* 6. Enterprise Cloud Server Bank (ERP Sync Node) */}
      <group position={[-18, 0, -6]}>
        {[-2.2, 0, 2.2].map((x, i) => (
          <group key={i} position={[x, 0, 0]}>
            <mesh position={[0, 2, 0]} castShadow>
              <boxGeometry args={[1.5, 4, 1.2]} />
              <meshStandardMaterial color="#030712" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* LED Status Blinkers */}
            {[0.8, 1.6, 2.4, 3.2].map(h => (
              <mesh key={h} position={[0, h, 0.61]}>
                <boxGeometry args={[1.2, 0.08, 0.02]} />
                <meshBasicMaterial color={i % 2 === 0 ? '#00f0ff' : '#10b981'} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* 7. Autonomous High-Bay Drone (Inspection Drones Node) */}
      <group position={[20, 2.5, -8]}>
        <mesh>
          <boxGeometry args={[0.7, 0.2, 0.7]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
        {/* Rotor Arms */}
        {[-0.4, 0.4].map(x => (
          [-0.4, 0.4].map(z => (
            <mesh key={`${x}-${z}`} position={[x, 0.15, z]}>
              <cylinderGeometry args={[0.25, 0.25, 0.02, 16]} />
              <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
            </mesh>
          ))
        ))}
        <pointLight color="#38bdf8" intensity={1.5} distance={5} />
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
      <ambientLight intensity={0.65} color="#0d1b33" />
      <directionalLight
        position={[25, 35, 20]}
        intensity={1.8}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={quality === 'HIGH' ? 2048 : 1024}
        shadow-mapSize-height={quality === 'HIGH' ? 2048 : 1024}
      />
      <directionalLight position={[-20, 25, -20]} intensity={0.7} color="#00f0ff" />
      
      {/* Central Core Ambient Glow */}
      <pointLight position={[0, 4, 0]} intensity={2.5} distance={20} color="#00f0ff" />

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

      {/* 12 Interactive 3D Product Hotspots */}
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
