import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ATPL_STATIONS, STATION_KEYS } from '../../data/stations';
import { Hotspot } from './Hotspot';

/* =========================================================================
   1. CAMERA CONTROLLER (Interior Perspective & Smooth Station Focus)
   ========================================================================= */
export const CameraController = ({ selectedStation, isOverview }) => {
  const { camera, size } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    const aspect = size.width / Math.max(1, size.height);
    const isNarrow = aspect < 1.15;
    const distanceMult = isNarrow ? Math.min(1.35, 1.15 / Math.max(0.5, aspect)) : 1;

    if (isOverview || !selectedStation) {
      // First-person perspective looking down the central warehouse corridor
      gsap.to(camera.position, {
        x: -1.2 * distanceMult,
        y: 5.6 * distanceMult,
        z: 27.5 * distanceMult,
        duration: 1.6,
        ease: 'power3.inOut',
        onUpdate: () => camera.updateProjectionMatrix()
      });

      if (controlsRef.current) {
        gsap.to(controlsRef.current.target, {
          x: 0.5,
          y: 2.8,
          z: -4.0,
          duration: 1.6,
          ease: 'power3.inOut'
        });
      }
    } else {
      const node = ATPL_STATIONS[selectedStation];
      if (node) {
        const camPos = node.cameraPosition || [node.position[0] + 4, 4.5, node.position[2] + 6];
        const targetPos = node.targetLookAt || [node.position[0], 2.0, node.position[2]];

        gsap.to(camera.position, {
          x: camPos[0] * distanceMult,
          y: camPos[1] * distanceMult,
          z: camPos[2] * distanceMult,
          duration: 1.5,
          ease: 'power2.inOut',
          onUpdate: () => camera.updateProjectionMatrix()
        });

        if (controlsRef.current) {
          gsap.to(controlsRef.current.target, {
            x: targetPos[0],
            y: targetPos[1],
            z: targetPos[2],
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
      maxPolarAngle={Math.PI / 2.02}
      minPolarAngle={Math.PI / 12}
      minDistance={4}
      maxDistance={85}
      target={[0.5, 2.8, -4.0]}
    />
  );
};

/* =========================================================================
   2. 3D MODELS MATCHING USER REFERENCE INTERIOR PERSPECTIVE
   ========================================================================= */

// 01. PERFECT TRACE (Central Cybernetic Hologram Disc on Floor)
const ModelPerfectTrace = ({ isSelected }) => {
  const ringRef = useRef();
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group position={[4.2, 0, 12]}>
      {/* Outer Dark Plinth */}
      <mesh position={[0, 0.15, 0]} receiveShadow>
        <cylinderGeometry args={[2.8, 3.2, 0.3, 48]} />
        <meshStandardMaterial color="#02101C" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Cybernetic Beveled Hazard Ring */}
      <mesh position={[0, 0.31, 0]}>
        <cylinderGeometry args={[2.5, 2.7, 0.08, 48]} />
        <meshStandardMaterial color="#FFC93C" metalness={0.7} />
      </mesh>

      {/* Rotating Cybernetic Hologram Ring */}
      <group position={[0, 0.36, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh ref={ringRef}>
          <ringGeometry args={[1.2, 2.4, 48]} />
          <meshBasicMaterial color="#18E0FF" transparent opacity={0.75} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Vertical Holographic Particle Light Column */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 3.2, 32, 1, true]} />
        <meshBasicMaterial color="#18E0FF" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 3.4, 16, 1, true]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.45} side={THREE.DoubleSide} />
      </mesh>

      <pointLight color="#18E0FF" intensity={isSelected ? 3.5 : 2.2} distance={8} position={[0, 1.8, 0]} />
    </group>
  );
};

// 03. PERFECT STORE / WAREHOUSE (Left Wall Multi-Tier Blue High-Bay Racking with Pallets)
const ModelWarehouse = ({ isSelected }) => {
  return (
    <group position={[-14, 0, -8]}>
      {[-16, -8, 0, 8, 16].map((zOffset, rIdx) => (
        <group key={rIdx} position={[0, 0, zOffset]}>
          {/* Blue Vertical Steel Uprights */}
          {[-2.0, 2.0].map((x, i) => (
            <mesh key={i} position={[x, 5.0, 0]} castShadow>
              <boxGeometry args={[0.2, 10.0, 0.2]} />
              <meshStandardMaterial color="#0070C0" metalness={0.8} roughness={0.3} />
            </mesh>
          ))}

          {/* Orange/Yellow Cross Beams & Loaded Inventory Boxes */}
          {[1.8, 4.2, 6.8, 9.2].map((h, lvl) => (
            <group key={lvl} position={[0, h, 0]}>
              <mesh position={[0, 0, 0.9]}>
                <boxGeometry args={[4.2, 0.12, 0.12]} />
                <meshStandardMaterial color="#FFC93C" metalness={0.8} />
              </mesh>
              <mesh position={[0, 0, -0.9]}>
                <boxGeometry args={[4.2, 0.12, 0.12]} />
                <meshStandardMaterial color="#FFC93C" metalness={0.8} />
              </mesh>

              {/* Wooden Pallet & Blue/Yellow Inventory Cartons */}
              {[-1.0, 1.0].map((px, pIdx) => (
                <group key={pIdx} position={[px, 0.45, 0]}>
                  <mesh position={[0, -0.35, 0]}>
                    <boxGeometry args={[1.6, 0.14, 1.4]} />
                    <meshStandardMaterial color="#78350F" roughness={0.8} />
                  </mesh>
                  <mesh castShadow position={[0, 0, 0]}>
                    <boxGeometry args={[1.5, 0.7, 1.3]} />
                    <meshStandardMaterial 
                      color={(lvl + pIdx + rIdx) % 2 === 0 ? '#0070C0' : '#FFC93C'} 
                      roughness={0.4}
                    />
                  </mesh>
                </group>
              ))}
            </group>
          ))}
        </group>
      ))}
    </group>
  );
};

// 04. RFID PORTALS (Yellow Arch Portal Gate Straddling the Conveyor)
const ModelRfidPortals = () => {
  return (
    <group position={[-3.5, 0, 14]}>
      {/* Yellow Arch Frame */}
      <mesh position={[-1.6, 2.5, 0]} castShadow>
        <boxGeometry args={[0.4, 5.0, 0.5]} />
        <meshStandardMaterial color="#FFC93C" metalness={0.7} />
      </mesh>
      <mesh position={[1.6, 2.5, 0]} castShadow>
        <boxGeometry args={[0.4, 5.0, 0.5]} />
        <meshStandardMaterial color="#FFC93C" metalness={0.7} />
      </mesh>
      <mesh position={[0, 4.8, 0]}>
        <boxGeometry args={[3.6, 0.4, 0.5]} />
        <meshStandardMaterial color="#FFC93C" metalness={0.7} />
      </mesh>

      {/* Planar RFID Antenna Panels */}
      <mesh position={[-1.35, 2.6, 0]}>
        <boxGeometry args={[0.1, 1.6, 0.8]} />
        <meshStandardMaterial color="#02101C" metalness={0.9} />
      </mesh>
      <mesh position={[1.35, 2.6, 0]}>
        <boxGeometry args={[0.1, 1.6, 0.8]} />
        <meshStandardMaterial color="#02101C" metalness={0.9} />
      </mesh>

      {/* Holographic Scan Beam Curtain */}
      <mesh position={[0, 2.4, 0]}>
        <planeGeometry args={[2.8, 4.2]} />
        <meshBasicMaterial color="#18E0FF" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

// 05. PLC / HMI / SPM INTEGRATION & ROBOTS (Yellow 6-Axis Robotic Arms Along Conveyor)
const ModelRobots = () => {
  const arm1Ref = useRef();
  const arm2Ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (arm1Ref.current) {
      arm1Ref.current.rotation.y = Math.sin(t * 1.5) * 0.45;
    }
    if (arm2Ref.current) {
      arm2Ref.current.rotation.y = Math.sin(t * 1.5 + Math.PI) * 0.45;
    }
  });

  return (
    <>
      {/* Robot 1 */}
      <group position={[-1.8, 0, 0]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <cylinderGeometry args={[0.65, 0.75, 0.8, 24]} />
          <meshStandardMaterial color="#02101C" metalness={0.8} />
        </mesh>
        <group ref={arm1Ref} position={[0, 0.8, 0]}>
          <mesh position={[0, 0.35, 0]} castShadow>
            <cylinderGeometry args={[0.5, 0.5, 0.7, 24]} />
            <meshStandardMaterial color="#FFC93C" metalness={0.8} />
          </mesh>
          <mesh position={[0, 1.2, 0.4]} rotation={[0.4, 0, 0]} castShadow>
            <boxGeometry args={[0.3, 1.6, 0.3]} />
            <meshStandardMaterial color="#FFC93C" metalness={0.8} />
          </mesh>
          <mesh position={[0, 2.2, 0.8]} rotation={[-0.7, 0, 0]} castShadow>
            <boxGeometry args={[0.25, 1.2, 0.25]} />
            <meshStandardMaterial color="#02101C" metalness={0.8} />
          </mesh>
        </group>
      </group>

      {/* Robot 2 */}
      <group position={[-1.8, 0, -10]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <cylinderGeometry args={[0.65, 0.75, 0.8, 24]} />
          <meshStandardMaterial color="#02101C" metalness={0.8} />
        </mesh>
        <group ref={arm2Ref} position={[0, 0.8, 0]}>
          <mesh position={[0, 0.35, 0]} castShadow>
            <cylinderGeometry args={[0.5, 0.5, 0.7, 24]} />
            <meshStandardMaterial color="#FFC93C" metalness={0.8} />
          </mesh>
          <mesh position={[0, 1.2, 0.4]} rotation={[0.4, 0, 0]} castShadow>
            <boxGeometry args={[0.3, 1.6, 0.3]} />
            <meshStandardMaterial color="#FFC93C" metalness={0.8} />
          </mesh>
          <mesh position={[0, 2.2, 0.8]} rotation={[-0.7, 0, 0]} castShadow>
            <boxGeometry args={[0.25, 1.2, 0.25]} />
            <meshStandardMaterial color="#02101C" metalness={0.8} />
          </mesh>
        </group>
      </group>
    </>
  );
};

// 06. PERFECT AI VISION SYSTEM (Tall Camera Mast with Floating Cyan Hologram Screen)
const ModelVisionAi = () => {
  return (
    <group position={[6.5, 0, 2]}>
      {/* Tall Dark Camera Mast Pole */}
      <mesh position={[0, 2.8, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.2, 5.6, 24]} />
        <meshStandardMaterial color="#02101C" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Camera Head Unit */}
      <mesh position={[0, 5.5, 0]} castShadow>
        <boxGeometry args={[0.6, 0.5, 0.8]} />
        <meshStandardMaterial color="#FFFFFF" metalness={0.8} />
      </mesh>
      {/* Optical Lens */}
      <mesh position={[0, 5.5, -0.45]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.2, 24]} />
        <meshStandardMaterial color="#18E0FF" emissive="#18E0FF" emissiveIntensity={0.8} />
      </mesh>

      {/* Floating Holographic Blue AI Screen Panel */}
      <mesh position={[-1.2, 4.0, 0]} rotation={[0, -0.3, 0]}>
        <planeGeometry args={[2.8, 1.8]} />
        <meshBasicMaterial color="#18E0FF" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-1.2, 4.0, 0]} rotation={[0, -0.3, 0]}>
        <ringGeometry args={[0.3, 0.45, 32]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

// 07. ERP SYNC (Server Bank Behind Scanners)
const ModelErpSync = () => {
  return (
    <group position={[-8.5, 0, -4]}>
      {[-1.2, 0, 1.2].map((x, i) => (
        <mesh key={i} position={[x, 2.2, 0]} castShadow>
          <boxGeometry args={[0.9, 4.4, 1.2]} />
          <meshStandardMaterial color="#02101C" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
      <mesh position={[0, 3.2, 0.62]}>
        <planeGeometry args={[3.2, 1.4]} />
        <meshBasicMaterial color="#0070C0" emissive="#18E0FF" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

// 08. INSPECTION DRONES (Aerial Quadcopters Hovering Below Ceiling)
const ModelDrones = () => {
  const drone1Ref = useRef();
  const drone2Ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (drone1Ref.current) {
      drone1Ref.current.position.y = 6.8 + Math.sin(t * 2) * 0.25;
      drone1Ref.current.rotation.y = t * 0.3;
    }
    if (drone2Ref.current) {
      drone2Ref.current.position.y = 7.4 + Math.sin(t * 2 + 1) * 0.25;
      drone2Ref.current.rotation.y = -t * 0.3;
    }
  });

  return (
    <>
      <group ref={drone1Ref} position={[0, 6.8, 6]}>
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.2, 0.7]} />
          <meshStandardMaterial color="#02101C" metalness={0.9} />
        </mesh>
        <mesh position={[0, -0.15, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color="#18E0FF" />
        </mesh>
        {[-0.45, 0.45].map((x) =>
          [-0.45, 0.45].map((z) => (
            <group key={`${x}-${z}`} position={[x, 0.05, z]}>
              <mesh>
                <cylinderGeometry args={[0.25, 0.25, 0.02, 16]} />
                <meshBasicMaterial color="#38BDF8" transparent opacity={0.5} />
              </mesh>
            </group>
          ))
        )}
      </group>

      <group ref={drone2Ref} position={[-2.5, 7.4, -6]}>
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.2, 0.7]} />
          <meshStandardMaterial color="#02101C" metalness={0.9} />
        </mesh>
        <mesh position={[0, -0.15, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color="#18E0FF" />
        </mesh>
      </group>
    </>
  );
};

// 09. SCANNERS & DPM (Barcode & DPM Marking Reader Station)
const ModelScanners = () => {
  return (
    <group position={[-8.5, 0, 6]}>
      <mesh position={[0, 1.6, 0]} castShadow>
        <boxGeometry args={[1.4, 3.2, 1.2]} />
        <meshStandardMaterial color="#1E293B" metalness={0.8} />
      </mesh>
      <mesh position={[0, 2.2, 0.65]}>
        <planeGeometry args={[1.0, 0.8]} />
        <meshBasicMaterial color="#FFC93C" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

// 10. PERFECT LABELER (Grey Heavy Packaging Printer Unit)
const ModelPrinters = () => {
  return (
    <group position={[-11, 0, 15]}>
      <mesh position={[0, 1.8, 0]} castShadow>
        <boxGeometry args={[2.2, 3.6, 2.0]} />
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 2.6, 1.02]}>
        <planeGeometry args={[0.8, 0.5]} />
        <meshBasicMaterial color="#18E0FF" />
      </mesh>
    </group>
  );
};

// 11. PERFECT EDGE MDM (Control Desk Console Terminal)
const ModelSoftware = () => {
  return (
    <group position={[8.5, 0, 15]}>
      <mesh position={[0, 1.4, 0]} castShadow>
        <boxGeometry args={[1.2, 2.8, 1.0]} />
        <meshStandardMaterial color="#02101C" metalness={0.9} />
      </mesh>
      <mesh position={[0, 2.6, 0.2]} rotation={[-0.4, 0, 0]}>
        <boxGeometry args={[1.0, 0.7, 0.08]} />
        <meshStandardMaterial color="#18E0FF" emissive="#0070C0" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
};

// 12. PERFECT SOLVEDGE / PMS (Modern Glass-Enclosed Control Room Office)
const ModelPms = () => {
  return (
    <group position={[14, 0, 0]}>
      <mesh position={[0, 4.0, 0]}>
        <boxGeometry args={[0.1, 8.0, 32]} />
        <meshStandardMaterial color="#38BDF8" transparent opacity={0.25} metalness={0.9} roughness={0.1} />
      </mesh>
      {[-12, -4, 4, 12].map((z, i) => (
        <mesh key={i} position={[0, 4.0, z]}>
          <boxGeometry args={[0.2, 8.0, 0.15]} />
          <meshStandardMaterial color="#02101C" metalness={0.9} />
        </mesh>
      ))}

      {[-6, 2].map((z, i) => (
        <group key={i} position={[-2.5, 0, z]}>
          <mesh position={[0, 1.2, 0]} castShadow>
            <boxGeometry args={[1.8, 0.1, 3.2]} />
            <meshStandardMaterial color="#E2E8F0" roughness={0.4} />
          </mesh>
          <mesh position={[0.4, 1.8, -0.6]} rotation={[0, -0.3, 0]}>
            <boxGeometry args={[0.08, 0.7, 1.1]} />
            <meshStandardMaterial color="#0070C0" emissive="#18E0FF" emissiveIntensity={0.7} />
          </mesh>
          <mesh position={[0.4, 1.8, 0.6]} rotation={[0, 0.3, 0]}>
            <boxGeometry args={[0.08, 0.7, 1.1]} />
            <meshStandardMaterial color="#0070C0" emissive="#18E0FF" emissiveIntensity={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// 02. PERFECT AUDIT (Quality Testing & Inspection Console)
const ModelAudit = () => {
  return (
    <group position={[12, 0, 8]}>
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[1.6, 2.4, 1.2]} />
        <meshStandardMaterial color="#1E293B" metalness={0.8} />
      </mesh>
      <mesh position={[0, 2.1, 0.62]}>
        <planeGeometry args={[1.1, 0.7]} />
        <meshBasicMaterial color="#10B981" />
      </mesh>
    </group>
  );
};

/* =========================================================================
   3. CENTRAL CONVEYOR WITH MOVING CARTONS (Down Z-Axis)
   ========================================================================= */
const CentralConveyorFlow = () => {
  const cartonsGroupRef = useRef();

  useFrame((state, delta) => {
    if (!cartonsGroupRef.current) return;
    cartonsGroupRef.current.children.forEach((carton) => {
      carton.position.z -= delta * 3.5;
      if (carton.position.z < -40) {
        carton.position.z = 24;
      }
    });
  });

  return (
    <group position={[-3.5, 0.6, 0]}>
      <mesh position={[0, 0, -8]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.2, 68]} />
        <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.92, 0.15, -8]}>
        <boxGeometry args={[0.05, 0.1, 68]} />
        <meshStandardMaterial color="#FFC93C" metalness={0.7} />
      </mesh>
      <mesh position={[-0.92, 0.15, -8]}>
        <boxGeometry args={[0.05, 0.1, 68]} />
        <meshStandardMaterial color="#FFC93C" metalness={0.7} />
      </mesh>

      <group ref={cartonsGroupRef}>
        {[20, 14, 8, 2, -4, -10, -16, -22, -28, -34, -40].map((initZ, i) => (
          <mesh key={i} position={[0, 0.45, initZ]} castShadow>
            <boxGeometry args={[1.1, 0.65, 1.2]} />
            <meshStandardMaterial color="#B45309" roughness={0.7} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

/* =========================================================================
   4. FACTORY ENVIRONMENT (Teal/Cyan Grid Floor, Roof Trusses & LED Lights)
   ========================================================================= */
const FactoryEnvironment = () => {
  return (
    <group>
      {/* Teal/Cyan Industrial Grid Floor */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[90, 0.1, 90]} />
        <meshStandardMaterial
          color="#02101C"
          metalness={0.4}
          roughness={0.45}
        />
      </mesh>

      {/* Overhead Steel Roof Trusses */}
      {[-30, -18, -6, 6, 18, 30].map((z) => (
        <group key={`truss-${z}`} position={[0, 14, z]}>
          <mesh>
            <boxGeometry args={[80, 0.5, 0.5]} />
            <meshStandardMaterial color="#1E293B" metalness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Rows of Linear White LED Light Bars Running Down Ceiling Corridor */}
      {[-6, 6].map((x) => (
        <group key={`lights-${x}`} position={[x, 13.6, -8]}>
          <mesh>
            <boxGeometry args={[0.25, 0.1, 68]} />
            <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={1.2} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

/* =========================================================================
   5. MAIN 3D FACTORY SCENE
   ========================================================================= */
export const FactoryScene = ({
  selectedStation,
  hoveredStation,
  onSelectStation,
  onHoverStation,
  isOverview
}) => {
  return (
    <>
      {/* Studio Lighting */}
      <ambientLight intensity={1.4} color="#F0F9FF" />
      <directionalLight
        position={[-15, 35, 25]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[20, 30, -20]} intensity={0.8} color="#18E0FF" />
      <directionalLight position={[0, 30, 0]} intensity={0.6} color="#FFFFFF" />

      {/* Camera Controller */}
      <CameraController selectedStation={selectedStation} isOverview={isOverview} />

      {/* Factory Floor, Ceiling & LED Lights */}
      <FactoryEnvironment />

      {/* Central Moving Conveyor */}
      <CentralConveyorFlow />

      {/* 12 Detailed 3D Stations matching Reference Layout */}
      <ModelPerfectTrace isSelected={selectedStation === 'perfectTrace'} />
      <ModelWarehouse isSelected={selectedStation === 'perfectStore'} />
      <ModelRfidPortals />
      <ModelRobots />
      <ModelVisionAi />
      <ModelErpSync />
      <ModelDrones />
      <ModelScanners />
      <ModelPrinters />
      <ModelSoftware />
      <ModelPms />
      <ModelAudit />

      {/* 12 Interactive Hotspots with Gold Highlights */}
      {STATION_KEYS.map((key) => {
        const node = ATPL_STATIONS[key];
        const isSelected = selectedStation === key;
        const isHovered = hoveredStation === key;
        return (
          <group 
            key={key} 
            position={[node.position[0], 0, node.position[2]]}
            onPointerOver={(e) => {
              e.stopPropagation();
              onHoverStation(key);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              onHoverStation(null);
              document.body.style.cursor = 'default';
            }}
          >
            <Hotspot
              node={node}
              isSelected={isSelected}
              isHovered={isHovered}
              onSelect={onSelectStation}
            />
          </group>
        );
      })}
    </>
  );
};
