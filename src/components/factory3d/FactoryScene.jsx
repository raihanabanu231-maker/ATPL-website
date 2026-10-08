import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ATPL_FACTORY_NODES, STATION_KEYS } from '../../data/factoryStations3D';

/* =========================================================================
   1. 3D TEXTURE CACHE & LOADER (Texture mapping for 12 Station Displays)
   ========================================================================= */
const textureLoader = new THREE.TextureLoader();
const stationTextureCache = {};

const getStationTexture = (imagePath) => {
  if (!imagePath) return null;
  if (!stationTextureCache[imagePath]) {
    const tex = textureLoader.load(imagePath);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    stationTextureCache[imagePath] = tex;
  }
  return stationTextureCache[imagePath];
};

/* =========================================================================
   2. CAMERA CONTROLLER (Smooth Cinematic FlyTo & Overview)
   ========================================================================= */
export const CameraController = ({ selectedStation, isOverview }) => {
  const { camera, size } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    const aspect = size.width / Math.max(1, size.height);
    const isNarrow = aspect < 1.15;
    const distanceMult = isNarrow ? Math.min(1.6, 1.15 / Math.max(0.48, aspect)) : 1;

    if (isOverview || !selectedStation) {
      gsap.to(camera.position, {
        x: 26 * distanceMult,
        y: 20 * distanceMult,
        z: 26 * distanceMult,
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
      const node = ATPL_FACTORY_NODES[selectedStation];
      if (node) {
        const targetX = node.position[0];
        const targetZ = node.position[2];

        // Frame camera in front of station kiosk
        gsap.to(camera.position, {
          x: targetX + (targetX >= 0 ? 8 : -8),
          y: 7,
          z: targetZ + 9,
          duration: 1.5,
          ease: 'power2.inOut',
          onUpdate: () => camera.updateProjectionMatrix()
        });

        if (controlsRef.current) {
          gsap.to(controlsRef.current.target, {
            x: targetX,
            y: 2.2,
            z: targetZ,
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
      dampingFactor={0.06}
      maxPolarAngle={Math.PI / 2.05}
      minPolarAngle={Math.PI / 8}
      minDistance={5}
      maxDistance={75}
      target={[0, 1.5, 0]}
    />
  );
};

/* =========================================================================
   3. ARCHIE AI 3D ROBOT MASCOT COMPANION
   ========================================================================= */
export const RobotCompanion = ({ selectedStation, isDemoRunning }) => {
  const robotGroupRef = useRef();
  const thrusterRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const headRef = useRef();
  const targetPos = useMemo(() => new THREE.Vector3(0, 3.8, 0), []);

  useEffect(() => {
    if (selectedStation && ATPL_FACTORY_NODES[selectedStation]) {
      const node = ATPL_FACTORY_NODES[selectedStation];
      targetPos.set(node.position[0] - 2.5, 3.6, node.position[2] + 2);
    } else {
      targetPos.set(0, 3.8, 0);
    }
  }, [selectedStation, targetPos]);

  useFrame((state, delta) => {
    if (!robotGroupRef.current) return;

    // Smooth position lerping
    robotGroupRef.current.position.lerp(targetPos, delta * 3.5);

    // Hover bobbing physics
    const time = state.clock.getElapsedTime();
    const bob = Math.sin(time * 3.2) * 0.12;
    robotGroupRef.current.position.y = targetPos.y + bob;

    // Head rotation
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(time * 1.5) * 0.18;
    }

    // Arm natural gesture
    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.x = Math.sin(time * 2.5) * 0.15;
      rightArmRef.current.rotation.x = -Math.sin(time * 2.5) * 0.2 - 0.2;
    }

    // Look at station
    if (selectedStation && ATPL_FACTORY_NODES[selectedStation]) {
      const stationPos = ATPL_FACTORY_NODES[selectedStation].position;
      robotGroupRef.current.lookAt(new THREE.Vector3(stationPos[0], 2.5, stationPos[2]));
    }
  });

  return (
    <group ref={robotGroupRef} position={[0, 3.8, 0]}>
      {/* Head */}
      <group ref={headRef} position={[0, 0.48, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.38, 32, 32]} />
          <meshStandardMaterial color="#ffffff" metalness={0.4} roughness={0.15} />
        </mesh>
        {/* Visor */}
        <mesh position={[0, 0.02, 0.26]}>
          <boxGeometry args={[0.46, 0.18, 0.12]} />
          <meshStandardMaterial color="#040914" roughness={0.1} />
        </mesh>
        {/* Glowing Eyes */}
        <mesh position={[-0.11, 0.02, 0.33]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <mesh position={[0.11, 0.02, 0.33]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
      </group>

      {/* Torso */}
      <group position={[0, -0.22, 0]}>
        <mesh castShadow scale={[0.96, 1.15, 0.95]}>
          <sphereGeometry args={[0.44, 32, 32]} />
          <meshStandardMaterial color="#ffffff" metalness={0.4} roughness={0.15} />
        </mesh>
        {/* Chest Emblem */}
        <mesh position={[0, 0.08, 0.38]}>
          <cylinderGeometry args={[0.16, 0.16, 0.02, 32]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#0071ba" metalness={0.8} emissive="#0071ba" emissiveIntensity={0.4} />
        </mesh>
      </group>

      {/* Arms */}
      <group ref={leftArmRef} position={[-0.48, -0.15, 0]}>
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#ffffff" metalness={0.5} />
        </mesh>
        <mesh position={[-0.04, -0.22, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.25, 12]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
      </group>

      <group ref={rightArmRef} position={[0.48, -0.15, 0]}>
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#ffffff" metalness={0.5} />
        </mesh>
        <mesh position={[0.04, -0.22, 0.1]}>
          <cylinderGeometry args={[0.04, 0.04, 0.25, 12]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
      </group>

      {/* Thruster Base */}
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.14, 0.08, 0.15, 24]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} />
      </mesh>
      <mesh ref={thrusterRef} position={[0, -0.84, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.12, 0.28, 16]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.9} />
      </mesh>
      <pointLight color="#00f0ff" intensity={2.5} distance={5} />
    </group>
  );
};

/* =========================================================================
   4. PHOTOREALISTIC 3D STATION PODIUM KIOSK (With 4K Machine Texture Screen)
   ========================================================================= */
export const StationPodiumKiosk = ({ stationKey, isSelected, isHovered, onSelect, onHover }) => {
  const node = ATPL_FACTORY_NODES[stationKey];
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Load high-resolution station photo texture
  const machineTexture = useMemo(() => getStationTexture(node.image), [node.image]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    if (isSelected) {
      groupRef.current.position.y = 0.15 + Math.sin(time * 3) * 0.05;
    } else {
      groupRef.current.position.y = hovered ? 0.08 : 0;
    }
  });

  const accentColor = node.color || '#00f0ff';

  return (
    <group 
      ref={groupRef}
      position={[node.position[0], 0, node.position[2]]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(stationKey);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover?.(stationKey);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover?.(null);
        document.body.style.cursor = 'default';
      }}
    >
      {/* 1. Circular Illuminated Station Plinth Base */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <cylinderGeometry args={[2.8, 3.1, 0.2, 32]} />
        <meshStandardMaterial 
          color="#0a1224" 
          metalness={0.9} 
          roughness={0.15} 
        />
      </mesh>

      {/* Glowing Neon Ambient Underglow Ring */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.8, 3.2, 32]} />
        <meshBasicMaterial 
          color={accentColor} 
          transparent 
          opacity={isSelected ? 0.95 : hovered ? 0.6 : 0.25} 
        />
      </mesh>

      {/* 2. Sleek Brushed Titanium Machine Pedestal Housing */}
      <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 1.8, 1.8]} />
        <meshStandardMaterial 
          color="#0f172a" 
          metalness={0.88} 
          roughness={0.25} 
        />
      </mesh>

      {/* Metallic Accent Trim Rails */}
      <mesh position={[0, 0.25, 0.92]}>
        <boxGeometry args={[3.3, 0.08, 0.08]} />
        <meshStandardMaterial color={accentColor} metalness={0.9} emissive={accentColor} emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, 1.95, 0.92]}>
        <boxGeometry args={[3.3, 0.08, 0.08]} />
        <meshStandardMaterial color={accentColor} metalness={0.9} emissive={accentColor} emissiveIntensity={0.6} />
      </mesh>

      {/* 3. 3D CURVED HD MACHINERY SCREEN (Photorealistic Render Texture) */}
      <group position={[0, 2.6, 0.2]} rotation={[-0.15, 0, 0]}>
        
        {/* Screen Bezel Frame */}
        <mesh castShadow>
          <boxGeometry args={[3.4, 2.1, 0.15]} />
          <meshStandardMaterial 
            color="#040814" 
            metalness={0.9} 
            roughness={0.15}
          />
        </mesh>

        {/* 4K Machine Photo Texture Display Surface */}
        <mesh position={[0, 0, 0.085]}>
          <planeGeometry args={[3.2, 1.9]} />
          {machineTexture ? (
            <meshStandardMaterial 
              map={machineTexture} 
              roughness={0.2}
              metalness={0.1}
            />
          ) : (
            <meshStandardMaterial color="#0284c7" />
          )}
        </mesh>

        {/* Illuminated Screen Glass Cover Overlay */}
        <mesh position={[0, 0, 0.09]}>
          <planeGeometry args={[3.2, 1.9]} />
          <meshStandardMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.08} 
            roughness={0.05}
          />
        </mesh>

        {/* Top Active Status LED Bar */}
        <mesh position={[0, 0.98, 0.09]}>
          <boxGeometry args={[3.2, 0.04, 0.02]} />
          <meshBasicMaterial color={isSelected ? '#10b981' : accentColor} />
        </mesh>
      </group>

      {/* 4. FLOATING 3D GLASSMORPHIC HUD BADGE IN 3D SPACE */}
      <Html
        position={[0, 4.2, 0]}
        center
        distanceFactor={22}
        style={{ pointerEvents: 'auto', userSelect: 'none' }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelect(stationKey);
          }}
          style={{
            background: isSelected 
              ? 'rgba(4, 11, 24, 0.96)' 
              : hovered 
                ? 'rgba(10, 24, 48, 0.95)' 
                : 'rgba(6, 14, 30, 0.88)',
            color: '#ffffff',
            border: isSelected 
              ? `2px solid ${accentColor}` 
              : hovered 
                ? `1.5px solid ${accentColor}` 
                : '1px solid rgba(0, 240, 255, 0.4)',
            borderRadius: '12px',
            padding: '0.4rem 0.75rem',
            boxShadow: isSelected 
              ? `0 0 30px ${accentColor}90, 0 10px 25px rgba(0,0,0,0.85)` 
              : '0 6px 20px rgba(0,0,0,0.7)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.55rem',
            fontFamily: 'var(--font-display, sans-serif)',
            fontSize: '0.8rem',
            fontWeight: 800,
            whiteSpace: 'nowrap',
            backdropFilter: 'blur(12px)',
            transition: 'all 0.25s ease',
            transform: isSelected || hovered ? 'scale(1.08)' : 'scale(1)'
          }}
        >
          {/* Station Number Circle */}
          <span style={{
            background: isSelected ? accentColor : 'rgba(255, 255, 255, 0.1)',
            color: isSelected ? '#040914' : accentColor,
            border: `1px solid ${accentColor}`,
            borderRadius: '50%',
            width: '22px',
            height: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.7rem',
            fontWeight: 900
          }}>
            {node.number}
          </span>

          <span style={{ fontSize: '0.85rem' }}>{node.icon}</span>
          <span style={{ fontWeight: 800 }}>{node.name}</span>

          {isSelected && (
            <span style={{
              background: '#10b981',
              color: '#040914',
              fontSize: '0.62rem',
              fontWeight: 900,
              padding: '0.1rem 0.35rem',
              borderRadius: '4px',
              fontFamily: 'var(--font-mono, monospace)'
            }}>
              ONLINE
            </span>
          )}
        </div>
      </Html>

      {/* Station Local Spotlight */}
      <pointLight 
        color={accentColor} 
        intensity={isSelected ? 3.5 : hovered ? 2.0 : 0.8} 
        distance={7} 
        position={[0, 3, 1]} 
      />
    </group>
  );
};

/* =========================================================================
   5. REALISTIC 3D SHOWROOM FLOOR & CONVEYOR FLOW SYSTEM
   ========================================================================= */
export const FactoryShowroomEnvironment = () => {
  return (
    <group>
      {/* 1. Deep Luxury Obsidian Reflective Epoxy Factory Floor */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[65, 0.1, 65]} />
        <meshStandardMaterial
          color="#060b18"
          metalness={0.85}
          roughness={0.15}
        />
      </mesh>

      {/* 2. Outer Subtle Architectural Boundary Curbs */}
      <mesh position={[0, 0.1, -32.5]}>
        <boxGeometry args={[65, 0.2, 0.4]} />
        <meshStandardMaterial color="#00f0ff" metalness={0.9} emissive="#00f0ff" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0.1, 32.5]}>
        <boxGeometry args={[65, 0.2, 0.4]} />
        <meshStandardMaterial color="#00f0ff" metalness={0.9} emissive="#00f0ff" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-32.5, 0.1, 0]}>
        <boxGeometry args={[0.4, 0.2, 65]} />
        <meshStandardMaterial color="#00f0ff" metalness={0.9} emissive="#00f0ff" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[32.5, 0.1, 0]}>
        <boxGeometry args={[0.4, 0.2, 65]} />
        <meshStandardMaterial color="#00f0ff" metalness={0.9} emissive="#00f0ff" emissiveIntensity={0.3} />
      </mesh>

      {/* 3. Glowing Cybernetic Floor Light Conduits Interconnecting Zones */}
      {[-16, 0, 16].map((x, i) => (
        <mesh key={`conduit-x-${i}`} position={[x, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.15, 50]} />
          <meshBasicMaterial color="#0071ba" transparent opacity={0.4} />
        </mesh>
      ))}

      {[-14, 0, 14].map((z, i) => (
        <mesh key={`conduit-z-${i}`} position={[0, 0.01, z]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[0.15, 54]} />
          <meshBasicMaterial color="#0071ba" transparent opacity={0.4} />
        </mesh>
      ))}

      {/* 4. Industrial Center Automation Conveyor Bridge */}
      <group position={[0, 0.4, 0]}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[36, 0.15, 1.2]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Conveyor Glowing LED Edge Guides */}
        <mesh position={[0, 0.1, 0.6]}>
          <boxGeometry args={[36, 0.05, 0.04]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <mesh position={[0, 0.1, -0.6]}>
          <boxGeometry args={[36, 0.05, 0.04]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
      </group>

      {/* 5. Overhead High-Bay Architectural Trusses with Studio Floodlights */}
      {[-18, 0, 18].map((z) => (
        <group key={`truss-${z}`} position={[0, 12, z]}>
          <mesh>
            <boxGeometry args={[62, 0.5, 0.5]} />
            <meshStandardMaterial color="#1e293b" metalness={0.9} />
          </mesh>
          {[-16, 0, 16].map((x) => (
            <group key={`light-${x}`} position={[x, -0.5, 0]}>
              <mesh>
                <cylinderGeometry args={[0.5, 0.8, 0.3, 16]} />
                <meshStandardMaterial color="#0f172a" metalness={0.8} />
              </mesh>
              <pointLight color="#e0f2fe" intensity={1.5} distance={22} position={[0, -0.5, 0]} />
            </group>
          ))}
        </group>
      ))}
    </group>
  );
};

/* =========================================================================
   6. MAIN 3D FACTORY SCENE ORCHESTRATION
   ========================================================================= */
export const FactoryScene = ({
  selectedStation,
  hoveredStation,
  onSelectStation,
  onHoverStation,
  isOverview,
  isDemoRunning
}) => {
  return (
    <>
      {/* Studio Lighting Rig */}
      <ambientLight intensity={0.75} color="#e0f2fe" />
      
      {/* Key Directional Sun Light */}
      <directionalLight
        position={[25, 35, 20]}
        intensity={1.8}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-35}
        shadow-camera-right={35}
        shadow-camera-top={35}
        shadow-camera-bottom={-35}
      />

      {/* Cool Cybernetic Backlight */}
      <directionalLight position={[-25, 20, -25]} intensity={0.9} color="#00f0ff" />
      <directionalLight position={[0, 15, -30]} intensity={0.6} color="#3b82f6" />

      {/* Interactive Orbit Camera */}
      <CameraController selectedStation={selectedStation} isOverview={isOverview} />

      {/* Luxury Showroom Environment */}
      <FactoryShowroomEnvironment />

      {/* 12 Photorealistic 3D Station Kiosks */}
      {STATION_KEYS.map((key) => (
        <StationPodiumKiosk
          key={key}
          stationKey={key}
          isSelected={selectedStation === key}
          isHovered={hoveredStation === key}
          onSelect={onSelectStation}
          onHover={onHoverStation}
        />
      ))}

      {/* 3D Archie AI Mascot */}
      <RobotCompanion selectedStation={selectedStation} isDemoRunning={isDemoRunning} />
    </>
  );
};
