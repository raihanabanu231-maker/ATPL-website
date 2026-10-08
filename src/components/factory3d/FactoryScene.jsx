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
   2. CAMERA CONTROLLER (Expansive 3D View - Never Over-Zoomed)
   ========================================================================= */
export const CameraController = ({ selectedStation, isOverview }) => {
  const { camera, size } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    const aspect = size.width / Math.max(1, size.height);
    const isNarrow = aspect < 1.15;
    const distanceMult = isNarrow ? Math.min(1.4, 1.15 / Math.max(0.48, aspect)) : 1;

    if (isOverview || !selectedStation) {
      // Spacious Overview 3D Angle
      gsap.to(camera.position, {
        x: 36 * distanceMult,
        y: 28 * distanceMult,
        z: 36 * distanceMult,
        duration: 1.6,
        ease: 'power3.inOut',
        onUpdate: () => camera.updateProjectionMatrix()
      });

      if (controlsRef.current) {
        gsap.to(controlsRef.current.target, {
          x: 0,
          y: 1.5,
          z: 0,
          duration: 1.6,
          ease: 'power3.inOut'
        });
      }
    } else {
      const node = ATPL_FACTORY_NODES[selectedStation];
      if (node) {
        const targetX = node.position[0];
        const targetZ = node.position[2];

        // Spacious framing - Shows the 3D station in context with surrounding factory
        const offsetX = targetX >= 0 ? 12.5 : -12.5;
        gsap.to(camera.position, {
          x: (targetX + offsetX) * distanceMult,
          y: 9.5 * distanceMult,
          z: (targetZ + 14.5) * distanceMult,
          duration: 1.5,
          ease: 'power2.inOut',
          onUpdate: () => camera.updateProjectionMatrix()
        });

        if (controlsRef.current) {
          gsap.to(controlsRef.current.target, {
            x: targetX,
            y: 1.8,
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
      minDistance={6}
      maxDistance={95}
      target={[0, 1.5, 0]}
    />
  );
};

/* =========================================================================
   3. ARCHIE AI 3D ROBOT COMPANION (No Giant Overlays)
   ========================================================================= */
export const RobotCompanion = ({ selectedStation, isDemoRunning }) => {
  const robotGroupRef = useRef();
  const thrusterRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const headRef = useRef();
  const targetPos = useMemo(() => new THREE.Vector3(0, 3.5, 0), []);

  useEffect(() => {
    if (selectedStation && ATPL_FACTORY_NODES[selectedStation]) {
      const node = ATPL_FACTORY_NODES[selectedStation];
      targetPos.set(node.position[0] - 2.8, 2.8, node.position[2] + 1.8);
    } else {
      targetPos.set(0, 3.5, 0);
    }
  }, [selectedStation, targetPos]);

  useFrame((state, delta) => {
    if (!robotGroupRef.current) return;

    const currentPos = robotGroupRef.current.position;
    const velocityX = (targetPos.x - currentPos.x) * delta * 2.5;
    const velocityZ = (targetPos.z - currentPos.z) * delta * 2.5;

    currentPos.lerp(targetPos, delta * 3.2);

    const time = state.clock.getElapsedTime();
    const bob = Math.sin(time * 3.5) * 0.12;
    currentPos.y = targetPos.y + bob;

    robotGroupRef.current.rotation.z = -velocityX * 0.35;
    robotGroupRef.current.rotation.x = velocityZ * 0.25;

    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(time * 1.8) * 0.22;
    }

    if (rightArmRef.current) {
      rightArmRef.current.rotation.x = -1.1 + Math.sin(time * 4.5) * 0.25;
      rightArmRef.current.rotation.z = -0.3 + Math.cos(time * 4.5) * 0.2;
    }
    if (leftArmRef.current) {
      leftArmRef.current.rotation.x = Math.sin(time * 2.0) * 0.12;
    }

    if (thrusterRef.current) {
      const flame = 1.0 + Math.sin(time * 15.0) * 0.2;
      thrusterRef.current.scale.set(flame, flame * 1.2, flame);
    }

    if (selectedStation && ATPL_FACTORY_NODES[selectedStation]) {
      const node = ATPL_FACTORY_NODES[selectedStation];
      robotGroupRef.current.lookAt(new THREE.Vector3(node.position[0] + 6.0, 2.8, node.position[2] + 8.0));
    }
  });

  return (
    <group ref={robotGroupRef} position={[0, 3.5, 0]}>
      {/* Head */}
      <group ref={headRef} position={[0, 0.42, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.32, 32, 32]} />
          <meshStandardMaterial color="#ffffff" metalness={0.4} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0.02, 0.22]}>
          <boxGeometry args={[0.38, 0.15, 0.1]} />
          <meshStandardMaterial color="#040914" roughness={0.1} />
        </mesh>
        <mesh position={[-0.09, 0.02, 0.28]}>
          <sphereGeometry args={[0.032, 16, 16]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <mesh position={[0.09, 0.02, 0.28]}>
          <sphereGeometry args={[0.032, 16, 16]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
      </group>

      {/* Torso */}
      <group position={[0, -0.18, 0]}>
        <mesh castShadow scale={[0.96, 1.15, 0.95]}>
          <sphereGeometry args={[0.36, 32, 32]} />
          <meshStandardMaterial color="#ffffff" metalness={0.4} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0.06, 0.32]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.02, 32]} />
          <meshStandardMaterial color="#0071ba" metalness={0.8} emissive="#0071ba" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* Arms */}
      <group ref={leftArmRef} position={[-0.4, -0.12, 0]}>
        <mesh>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshStandardMaterial color="#ffffff" metalness={0.5} />
        </mesh>
        <mesh position={[-0.03, -0.16, 0]}>
          <cylinderGeometry args={[0.032, 0.032, 0.2, 12]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
      </group>

      <group ref={rightArmRef} position={[0.4, -0.12, 0]}>
        <mesh>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshStandardMaterial color="#ffffff" metalness={0.5} />
        </mesh>
        <mesh position={[0.03, -0.16, 0.06]}>
          <cylinderGeometry args={[0.032, 0.032, 0.2, 12]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
      </group>

      {/* Thruster */}
      <mesh position={[0, -0.58, 0]}>
        <cylinderGeometry args={[0.11, 0.06, 0.11, 24]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} />
      </mesh>
      <mesh ref={thrusterRef} position={[0, -0.72, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.11, 0.28, 16]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.92} />
      </mesh>
      <pointLight color="#00f0ff" intensity={2.2} distance={5} position={[0, -0.6, 0]} />
    </group>
  );
};

/* =========================================================================
   4. COMPACT 3D STATION KIOSK & 3D FLOATING PIN (No Giant 2D Pills)
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
      groupRef.current.position.y = 0.1 + Math.sin(time * 3) * 0.03;
    } else {
      groupRef.current.position.y = hovered ? 0.05 : 0;
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
      {/* 1. Base Plinth */}
      <mesh position={[0, 0.08, 0]} receiveShadow>
        <cylinderGeometry args={[2.8, 3.1, 0.16, 32]} />
        <meshStandardMaterial 
          color="#080f1e" 
          metalness={0.92} 
          roughness={0.15} 
        />
      </mesh>

      {/* Smooth Underglow Ring */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.8, 3.2, 32]} />
        <meshBasicMaterial 
          color={accentColor} 
          transparent 
          opacity={isSelected ? 0.95 : hovered ? 0.65 : 0.25} 
        />
      </mesh>

      {/* 2. Titanium Pedestal Base */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.8, 1.2, 1.6]} />
        <meshStandardMaterial 
          color="#0d1829" 
          metalness={0.88} 
          roughness={0.25} 
        />
      </mesh>

      {/* 3. 3D DISPLAY SCREEN (4.0m x 2.4m) */}
      <group position={[0, 2.3, 0.15]} rotation={[-0.1, 0, 0]}>
        
        {/* Bezel */}
        <mesh castShadow>
          <boxGeometry args={[4.2, 2.6, 0.12]} />
          <meshStandardMaterial 
            color="#040814" 
            metalness={0.92} 
            roughness={0.15}
          />
        </mesh>

        {/* 4K Machine Texture */}
        <mesh position={[0, 0, 0.07]}>
          <planeGeometry args={[4.0, 2.4]} />
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

        {/* Top Status LED */}
        <mesh position={[0, 1.26, 0.07]}>
          <boxGeometry args={[4.0, 0.03, 0.02]} />
          <meshBasicMaterial color={isSelected ? '#10b981' : accentColor} />
        </mesh>
      </group>

      {/* 4. CLEAN 3D PERSPECTIVE PIN (Only rendered for selected or hovered station) */}
      {(isSelected || hovered) && (
        <Html
          position={[0, 3.8, 0]}
          center
          distanceFactor={32}
          style={{ pointerEvents: 'auto', userSelect: 'none' }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelect(stationKey);
            }}
            style={{
              background: isSelected 
                ? 'rgba(4, 11, 24, 0.95)' 
                : 'rgba(0, 240, 255, 0.95)',
              color: isSelected ? '#ffffff' : '#040814',
              border: `1.5px solid ${accentColor}`,
              borderRadius: '20px',
              padding: '0.22rem 0.65rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.74rem',
              fontWeight: 800,
              fontFamily: 'var(--font-display, sans-serif)',
              boxShadow: isSelected ? `0 0 20px ${accentColor}90` : '0 4px 15px rgba(0,0,0,0.8)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              backdropFilter: 'blur(12px)',
              transform: 'scale(1)',
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
            <span style={{
              background: accentColor,
              color: '#040914',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.64rem',
              fontWeight: 900
            }}>
              {node.number}
            </span>
            <span>{node.name}</span>
            {isSelected && (
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span>
            )}
          </div>
        </Html>
      )}

      {/* Local Spotlight */}
      <pointLight 
        color={accentColor} 
        intensity={isSelected ? 3.0 : hovered ? 1.8 : 0.6} 
        distance={7} 
        position={[0, 3.0, 1.2]} 
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
      {/* 1. Deep Reflective Epoxy Showroom Floor */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[72, 0.1, 72]} />
        <meshStandardMaterial
          color="#060b18"
          metalness={0.88}
          roughness={0.12}
        />
      </mesh>

      {/* 2. Boundary Curbs */}
      <mesh position={[0, 0.15, -36]}>
        <boxGeometry args={[72, 0.3, 0.4]} />
        <meshStandardMaterial color="#00f0ff" metalness={0.9} emissive="#00f0ff" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0.15, 36]}>
        <boxGeometry args={[72, 0.3, 0.4]} />
        <meshStandardMaterial color="#00f0ff" metalness={0.9} emissive="#00f0ff" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-36, 0.15, 0]}>
        <boxGeometry args={[0.4, 0.3, 72]} />
        <meshStandardMaterial color="#00f0ff" metalness={0.9} emissive="#00f0ff" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[36, 0.15, 0]}>
        <boxGeometry args={[0.4, 0.3, 72]} />
        <meshStandardMaterial color="#00f0ff" metalness={0.9} emissive="#00f0ff" emissiveIntensity={0.3} />
      </mesh>

      {/* 3. Glowing Floor Light Conduits */}
      {[-16, 0, 16].map((x, i) => (
        <mesh key={`conduit-x-${i}`} position={[x, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.16, 56]} />
          <meshBasicMaterial color="#0071ba" transparent opacity={0.4} />
        </mesh>
      ))}

      {[-14, 0, 14].map((z, i) => (
        <mesh key={`conduit-z-${i}`} position={[0, 0.01, z]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[0.16, 60]} />
          <meshBasicMaterial color="#0071ba" transparent opacity={0.4} />
        </mesh>
      ))}

      {/* 4. Center Conveyor Bridge */}
      <group position={[0, 0.35, 0]}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[44, 0.15, 1.2]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.09, 0.6]}>
          <boxGeometry args={[44, 0.04, 0.03]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <mesh position={[0, 0.09, -0.6]}>
          <boxGeometry args={[44, 0.04, 0.03]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
      </group>

      {/* 5. Overhead Trusses */}
      {[-20, 0, 20].map((z) => (
        <group key={`truss-${z}`} position={[0, 14, z]}>
          <mesh>
            <boxGeometry args={[70, 0.6, 0.6]} />
            <meshStandardMaterial color="#1e293b" metalness={0.9} />
          </mesh>
          {[-18, 0, 18].map((x) => (
            <group key={`light-${x}`} position={[x, -0.6, 0]}>
              <mesh>
                <cylinderGeometry args={[0.5, 0.8, 0.3, 16]} />
                <meshStandardMaterial color="#0f172a" metalness={0.8} />
              </mesh>
              <pointLight color="#e0f2fe" intensity={1.6} distance={26} position={[0, -0.6, 0]} />
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
