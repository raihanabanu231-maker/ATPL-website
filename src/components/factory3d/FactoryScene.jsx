import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ATPL_FACTORY_NODES, STATION_KEYS } from '../../data/factoryStations3D';

/* =========================================================================
   1. 3D TEXTURE CACHE & LOADER
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
   2. CAMERA CONTROLLER (Grand Framing & Smooth Orbit)
   ========================================================================= */
export const CameraController = ({ selectedStation, isOverview }) => {
  const { camera, size } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    const aspect = size.width / Math.max(1, size.height);
    const isNarrow = aspect < 1.15;
    const distanceMult = isNarrow ? Math.min(1.5, 1.15 / Math.max(0.48, aspect)) : 1;

    if (isOverview || !selectedStation) {
      // Cinematic Overview
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
          y: 2.0,
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

        // Frame grandly in front of the 3D machine screen
        const offsetX = targetX >= 0 ? 5.2 : -5.2;
        gsap.to(camera.position, {
          x: targetX + offsetX * distanceMult,
          y: 4.6 * distanceMult,
          z: targetZ + 7.8 * distanceMult,
          duration: 1.5,
          ease: 'power2.inOut',
          onUpdate: () => camera.updateProjectionMatrix()
        });

        if (controlsRef.current) {
          gsap.to(controlsRef.current.target, {
            x: targetX,
            y: 3.2,
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
      minDistance={4}
      maxDistance={80}
      target={[0, 2.0, 0]}
    />
  );
};

/* =========================================================================
   3. ARCHIE AI 3D ROBOT COMPANION (Prominent, Dynamic Flight & Waving)
   ========================================================================= */
export const RobotCompanion = ({ selectedStation, isDemoRunning }) => {
  const robotGroupRef = useRef();
  const thrusterRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const headRef = useRef();
  const prevPos = useRef(new THREE.Vector3(0, 4.0, 0));
  const targetPos = useMemo(() => new THREE.Vector3(0, 4.0, 0), []);

  useEffect(() => {
    if (selectedStation && ATPL_FACTORY_NODES[selectedStation]) {
      const node = ATPL_FACTORY_NODES[selectedStation];
      // Position Archie clearly in front-left of the camera view
      targetPos.set(node.position[0] - 4.5, 3.4, node.position[2] + 3.8);
    } else {
      targetPos.set(0, 4.2, 0);
    }
  }, [selectedStation, targetPos]);

  useFrame((state, delta) => {
    if (!robotGroupRef.current) return;

    // Velocity calculation for dynamic flight tilt
    const currentPos = robotGroupRef.current.position;
    const velocityX = (targetPos.x - currentPos.x) * delta * 2.5;
    const velocityZ = (targetPos.z - currentPos.z) * delta * 2.5;

    // Smooth position interpolation
    currentPos.lerp(targetPos, delta * 3.2);

    const time = state.clock.getElapsedTime();
    const bob = Math.sin(time * 3.5) * 0.16;
    currentPos.y = targetPos.y + bob;

    // Dynamic flight tilt
    robotGroupRef.current.rotation.z = -velocityX * 0.4;
    robotGroupRef.current.rotation.x = velocityZ * 0.3;

    // Head looking towards camera & station
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(time * 1.8) * 0.25;
      headRef.current.rotation.x = Math.sin(time * 2.2) * 0.08;
    }

    // Friendly waving arm animation
    if (rightArmRef.current) {
      rightArmRef.current.rotation.x = -1.2 + Math.sin(time * 6.0) * 0.35;
      rightArmRef.current.rotation.z = -0.4 + Math.cos(time * 6.0) * 0.25;
    }
    if (leftArmRef.current) {
      leftArmRef.current.rotation.x = Math.sin(time * 2.0) * 0.15;
    }

    // Thruster flame dynamic flicker
    if (thrusterRef.current) {
      const flame = 1.0 + Math.sin(time * 15.0) * 0.25;
      thrusterRef.current.scale.set(flame, flame * 1.2, flame);
    }

    // Body faces slightly toward the camera
    if (selectedStation && ATPL_FACTORY_NODES[selectedStation]) {
      const node = ATPL_FACTORY_NODES[selectedStation];
      robotGroupRef.current.lookAt(new THREE.Vector3(node.position[0] + 5.0, 3.4, node.position[2] + 9.0));
    }
  });

  return (
    <group ref={robotGroupRef} position={[0, 4.0, 0]} scale={[1.35, 1.35, 1.35]}>
      
      {/* 3D Floating Archie AI Name Tag */}
      <Html position={[0, 1.3, 0]} center distanceFactor={26} style={{ pointerEvents: 'none', userSelect: 'none' }}>
        <div style={{
          background: 'rgba(0, 113, 186, 0.95)',
          color: '#ffffff',
          border: '1.5px solid #00f0ff',
          borderRadius: '20px',
          padding: '0.2rem 0.6rem',
          fontSize: '0.68rem',
          fontWeight: 800,
          fontFamily: 'var(--font-display, sans-serif)',
          whiteSpace: 'nowrap',
          boxShadow: '0 0 16px rgba(0, 240, 255, 0.8)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem'
        }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#00f0ff', boxShadow: '0 0 8px #00f0ff' }}></span>
          <span>Archie AI Guide</span>
        </div>
      </Html>

      {/* Head */}
      <group ref={headRef} position={[0, 0.52, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.42, 32, 32]} />
          <meshStandardMaterial color="#ffffff" metalness={0.4} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0.02, 0.28]}>
          <boxGeometry args={[0.5, 0.2, 0.14]} />
          <meshStandardMaterial color="#040914" roughness={0.1} />
        </mesh>
        {/* Glowing Visor Eyes */}
        <mesh position={[-0.12, 0.02, 0.36]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <mesh position={[0.12, 0.02, 0.36]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
      </group>

      {/* Torso & Official ATPL Brand Logo */}
      <group position={[0, -0.25, 0]}>
        <mesh castShadow scale={[0.96, 1.15, 0.95]}>
          <sphereGeometry args={[0.48, 32, 32]} />
          <meshStandardMaterial color="#ffffff" metalness={0.4} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0.08, 0.42]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.025, 32]} />
          <meshStandardMaterial color="#0071ba" metalness={0.8} emissive="#0071ba" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* Articulated Arms */}
      <group ref={leftArmRef} position={[-0.54, -0.18, 0]}>
        <mesh>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#ffffff" metalness={0.5} />
        </mesh>
        <mesh position={[-0.04, -0.24, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.28, 12]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
      </group>

      <group ref={rightArmRef} position={[0.54, -0.18, 0]}>
        <mesh>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#ffffff" metalness={0.5} />
        </mesh>
        <mesh position={[0.04, -0.24, 0.1]}>
          <cylinderGeometry args={[0.045, 0.045, 0.28, 12]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
      </group>

      {/* Ion Thruster & Particle Light */}
      <mesh position={[0, -0.78, 0]}>
        <cylinderGeometry args={[0.16, 0.09, 0.16, 24]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} />
      </mesh>
      <mesh ref={thrusterRef} position={[0, -0.96, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.16, 0.4, 16]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.92} />
      </mesh>
      <pointLight color="#00f0ff" intensity={3.5} distance={8} position={[0, -0.8, 0]} />
    </group>
  );
};

/* =========================================================================
   4. GRAND PHOTOREALISTIC 3D STATION KIOSK (Large Screen & Clean Markers)
   ========================================================================= */
export const StationPodiumKiosk = ({ stationKey, isSelected, isHovered, onSelect, onHover }) => {
  const node = ATPL_FACTORY_NODES[stationKey];
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

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
      {/* 1. Large Circular Illuminated Station Plinth Base */}
      <mesh position={[0, 0.12, 0]} receiveShadow>
        <cylinderGeometry args={[4.4, 4.8, 0.25, 48]} />
        <meshStandardMaterial 
          color="#080f1e" 
          metalness={0.92} 
          roughness={0.15} 
        />
      </mesh>

      {/* Smooth Ambient Neon Underglow Ring */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.4, 5.0, 48]} />
        <meshBasicMaterial 
          color={accentColor} 
          transparent 
          opacity={isSelected ? 0.95 : hovered ? 0.65 : 0.3} 
        />
      </mesh>

      {/* 2. Brushed Dark Titanium Machine Housing Pedestal */}
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.6, 2.0, 2.4]} />
        <meshStandardMaterial 
          color="#0d1829" 
          metalness={0.88} 
          roughness={0.25} 
        />
      </mesh>

      {/* Metallic LED Accent Trim Rails */}
      <mesh position={[0, 0.3, 1.22]}>
        <boxGeometry args={[5.8, 0.08, 0.08]} />
        <meshStandardMaterial color={accentColor} metalness={0.9} emissive={accentColor} emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, 2.1, 1.22]}>
        <boxGeometry args={[5.8, 0.08, 0.08]} />
        <meshStandardMaterial color={accentColor} metalness={0.9} emissive={accentColor} emissiveIntensity={0.6} />
      </mesh>

      {/* 3. GRAND 3D CINEMA SCREEN (Large, Majestic 4K Machinery Photo) */}
      <group position={[0, 3.8, 0.25]} rotation={[-0.12, 0, 0]}>
        
        {/* Bezel Frame */}
        <mesh castShadow>
          <boxGeometry args={[6.8, 4.2, 0.18]} />
          <meshStandardMaterial 
            color="#040814" 
            metalness={0.92} 
            roughness={0.15}
          />
        </mesh>

        {/* 4K Machine Photo Surface */}
        <mesh position={[0, 0, 0.1]}>
          <planeGeometry args={[6.5, 3.9]} />
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

        {/* Illuminated Glass Layer */}
        <mesh position={[0, 0, 0.11]}>
          <planeGeometry args={[6.5, 3.9]} />
          <meshStandardMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.06} 
            roughness={0.04}
          />
        </mesh>

        {/* Top Status LED Strip */}
        <mesh position={[0, 2.02, 0.1]}>
          <boxGeometry args={[6.5, 0.06, 0.03]} />
          <meshBasicMaterial color={isSelected ? '#10b981' : accentColor} />
        </mesh>
      </group>

      {/* 4. CLEAN 3D FLOATING MARKER (Non-Overlapping) */}
      <Html
        position={[0, 6.2, 0]}
        center
        distanceFactor={28}
        style={{ pointerEvents: 'auto', userSelect: 'none' }}
      >
        {isSelected ? (
          /* Selected Station: Prominent Clean Badge */
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'rgba(4, 11, 24, 0.96)',
              color: '#ffffff',
              border: `2px solid ${accentColor}`,
              borderRadius: '12px',
              padding: '0.45rem 0.9rem',
              boxShadow: `0 0 30px ${accentColor}80, 0 10px 25px rgba(0,0,0,0.85)`,
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontFamily: 'var(--font-display, sans-serif)',
              fontSize: '0.86rem',
              fontWeight: 800,
              whiteSpace: 'nowrap',
              backdropFilter: 'blur(16px)',
              cursor: 'pointer'
            }}
          >
            <span style={{
              background: accentColor,
              color: '#040914',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.72rem',
              fontWeight: 900
            }}>
              {node.number}
            </span>
            <span>{node.name}</span>
            <span style={{
              background: '#10b981',
              color: '#040914',
              fontSize: '0.62rem',
              fontWeight: 900,
              padding: '0.12rem 0.4rem',
              borderRadius: '4px',
              fontFamily: 'var(--font-mono, monospace)'
            }}>
              ACTIVE
            </span>
          </div>
        ) : (
          /* Unselected Station: Sleek Compact Pin (No Overlap) */
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelect(stationKey);
            }}
            style={{
              background: hovered ? 'rgba(0, 240, 255, 0.95)' : 'rgba(5, 12, 26, 0.88)',
              color: hovered ? '#040814' : '#ffffff',
              border: `1.5px solid ${accentColor}`,
              borderRadius: '50px',
              padding: '0.25rem 0.55rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.72rem',
              fontWeight: 800,
              fontFamily: 'var(--font-display, sans-serif)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.7)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease',
              transform: hovered ? 'scale(1.12)' : 'scale(1)'
            }}
          >
            <span style={{
              background: accentColor,
              color: '#040814',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.62rem',
              fontWeight: 900
            }}>
              {node.number}
            </span>
            <span>{node.name}</span>
          </div>
        )}
      </Html>

      {/* Local Spotlight */}
      <pointLight 
        color={accentColor} 
        intensity={isSelected ? 4.5 : hovered ? 2.5 : 1.0} 
        distance={10} 
        position={[0, 4.5, 2]} 
      />
    </group>
  );
};

/* =========================================================================
   5. LUXURY 3D SHOWROOM FLOOR & CONVEYOR SYSTEM
   ========================================================================= */
export const FactoryShowroomEnvironment = () => {
  return (
    <group>
      {/* 1. Deep Luxury Obsidian Reflective Epoxy Factory Floor */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[70, 0.1, 70]} />
        <meshStandardMaterial
          color="#060b18"
          metalness={0.88}
          roughness={0.12}
        />
      </mesh>

      {/* 2. Outer Architectural Boundary Curbs */}
      <mesh position={[0, 0.15, -35]}>
        <boxGeometry args={[70, 0.3, 0.4]} />
        <meshStandardMaterial color="#00f0ff" metalness={0.9} emissive="#00f0ff" emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[0, 0.15, 35]}>
        <boxGeometry args={[70, 0.3, 0.4]} />
        <meshStandardMaterial color="#00f0ff" metalness={0.9} emissive="#00f0ff" emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[-35, 0.15, 0]}>
        <boxGeometry args={[0.4, 0.3, 70]} />
        <meshStandardMaterial color="#00f0ff" metalness={0.9} emissive="#00f0ff" emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[35, 0.15, 0]}>
        <boxGeometry args={[0.4, 0.3, 70]} />
        <meshStandardMaterial color="#00f0ff" metalness={0.9} emissive="#00f0ff" emissiveIntensity={0.35} />
      </mesh>

      {/* 3. Glowing Floor Light Conduits Interconnecting Zones */}
      {[-16, 0, 16].map((x, i) => (
        <mesh key={`conduit-x-${i}`} position={[x, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.2, 54]} />
          <meshBasicMaterial color="#0071ba" transparent opacity={0.45} />
        </mesh>
      ))}

      {[-14, 0, 14].map((z, i) => (
        <mesh key={`conduit-z-${i}`} position={[0, 0.01, z]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[0.2, 58]} />
          <meshBasicMaterial color="#0071ba" transparent opacity={0.45} />
        </mesh>
      ))}

      {/* 4. Industrial Center Conveyor Bridge */}
      <group position={[0, 0.5, 0]}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[42, 0.18, 1.4]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.12, 0.7]}>
          <boxGeometry args={[42, 0.06, 0.04]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <mesh position={[0, 0.12, -0.7]}>
          <boxGeometry args={[42, 0.06, 0.04]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
      </group>

      {/* 5. Overhead High-Bay Trusses & Floodlights */}
      {[-20, 0, 20].map((z) => (
        <group key={`truss-${z}`} position={[0, 14, z]}>
          <mesh>
            <boxGeometry args={[68, 0.6, 0.6]} />
            <meshStandardMaterial color="#1e293b" metalness={0.9} />
          </mesh>
          {[-18, 0, 18].map((x) => (
            <group key={`light-${x}`} position={[x, -0.6, 0]}>
              <mesh>
                <cylinderGeometry args={[0.6, 0.9, 0.35, 16]} />
                <meshStandardMaterial color="#0f172a" metalness={0.8} />
              </mesh>
              <pointLight color="#e0f2fe" intensity={1.8} distance={26} position={[0, -0.6, 0]} />
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
      <ambientLight intensity={0.85} color="#e0f2fe" />
      
      <directionalLight
        position={[28, 40, 24]}
        intensity={2.0}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      <directionalLight position={[-28, 24, -28]} intensity={1.0} color="#00f0ff" />
      <directionalLight position={[0, 18, -32]} intensity={0.7} color="#3b82f6" />

      <CameraController selectedStation={selectedStation} isOverview={isOverview} />

      <FactoryShowroomEnvironment />

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

      <RobotCompanion selectedStation={selectedStation} isDemoRunning={isDemoRunning} />
    </>
  );
};
