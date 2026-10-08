import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ATPL_FACTORY_NODES, STATION_KEYS } from '../../data/factoryStations3D';

/* =========================================================================
   1. CAMERA CONTROLLER (Cinematic Isometric View & Smooth Station Focus)
   ========================================================================= */
export const CameraController = ({ selectedStation, isOverview }) => {
  const { camera, size } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    const aspect = size.width / Math.max(1, size.height);
    const isNarrow = aspect < 1.15;
    const distanceMult = isNarrow ? Math.min(1.4, 1.15 / Math.max(0.48, aspect)) : 1;

    if (isOverview || !selectedStation) {
      // Overview Isometric Perspective matching the Reference Image
      gsap.to(camera.position, {
        x: 32 * distanceMult,
        y: 28 * distanceMult,
        z: 36 * distanceMult,
        duration: 1.6,
        ease: 'power3.inOut',
        onUpdate: () => camera.updateProjectionMatrix()
      });

      if (controlsRef.current) {
        gsap.to(controlsRef.current.target, {
          x: 0,
          y: 2.0,
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

        // Smooth focus on the selected 3D station
        const offsetX = targetX >= 0 ? 10 : -10;
        gsap.to(camera.position, {
          x: (targetX + offsetX) * distanceMult,
          y: 10 * distanceMult,
          z: (targetZ + 14) * distanceMult,
          duration: 1.5,
          ease: 'power2.inOut',
          onUpdate: () => camera.updateProjectionMatrix()
        });

        if (controlsRef.current) {
          gsap.to(controlsRef.current.target, {
            x: targetX,
            y: 2.5,
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
      minDistance={8}
      maxDistance={110}
      target={[0, 2.0, 0]}
    />
  );
};

/* =========================================================================
   2. REFERENCE-STYLE CALLOUT BADGE (Sleek Glassmorphic Tag)
   ========================================================================= */
const StationCalloutTag = ({ node, isSelected, isHovered, onSelect }) => {
  return (
    <Html
      position={[0, 4.2, 0]}
      center
      distanceFactor={38}
      style={{ pointerEvents: 'auto', userSelect: 'none' }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node.id);
        }}
        style={{
          background: isSelected 
            ? 'rgba(4, 14, 34, 0.96)' 
            : isHovered 
              ? 'rgba(6, 20, 46, 0.95)' 
              : 'rgba(5, 12, 28, 0.88)',
          border: isSelected 
            ? `2px solid #00f0ff` 
            : isHovered 
              ? `1.5px solid #00f0ff` 
              : '1px solid rgba(0, 240, 255, 0.45)',
          borderRadius: '8px',
          padding: '0.35rem 0.65rem',
          boxShadow: isSelected 
            ? '0 0 25px rgba(0, 240, 255, 0.8), 0 8px 24px rgba(0,0,0,0.85)' 
            : '0 4px 16px rgba(0,0,0,0.7)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.15rem',
          backdropFilter: 'blur(12px)',
          transition: 'all 0.2s ease',
          transform: isSelected || isHovered ? 'scale(1.08)' : 'scale(1)',
          whiteSpace: 'nowrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <span style={{
            background: isSelected ? '#00f0ff' : 'rgba(0, 240, 255, 0.2)',
            color: isSelected ? '#040814' : '#00f0ff',
            border: '1px solid #00f0ff',
            borderRadius: '4px',
            padding: '0.05rem 0.3rem',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.66rem',
            fontWeight: 900
          }}>
            {node.number}
          </span>
          <span style={{
            fontFamily: 'var(--font-display, sans-serif)',
            fontWeight: 800,
            fontSize: '0.78rem',
            color: '#ffffff',
            letterSpacing: '0.02em'
          }}>
            {node.name.toUpperCase()}
          </span>
        </div>
        <div style={{
          fontFamily: 'sans-serif',
          fontSize: '0.62rem',
          color: '#94a3b8',
          paddingLeft: '0.1rem'
        }}>
          {node.tagline?.slice(0, 32)}...
        </div>
      </div>
    </Html>
  );
};

/* =========================================================================
   3. 3D MODELS MATCHING USER REFERENCE IMAGE
   ========================================================================= */

// 01. PERFECT TRACE (Central Cybernetic Hologram Hub with Vertical Beams)
const ModelPerfectTrace = ({ isSelected }) => {
  const ringRef = useRef();
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Dark Plinth */}
      <mesh position={[0, 0.15, 0]} receiveShadow>
        <cylinderGeometry args={[4.2, 4.6, 0.3, 48]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Cybernetic Beveled Yellow/Black Hazard Ring */}
      <mesh position={[0, 0.31, 0]}>
        <cylinderGeometry args={[3.8, 4.0, 0.08, 48]} />
        <meshStandardMaterial color="#eab308" metalness={0.7} />
      </mesh>

      {/* Rotating Cybernetic Hologram Ring */}
      <group position={[0, 0.36, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh ref={ringRef}>
          <ringGeometry args={[1.8, 3.6, 48]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.65} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Vertical Holographic Particle Light Column */}
      <mesh position={[0, 2.2, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 4.0, 32, 1, true]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 2.2, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 4.2, 16, 1, true]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.45} side={THREE.DoubleSide} />
      </mesh>

      <pointLight color="#00f0ff" intensity={isSelected ? 3.5 : 2.0} distance={10} position={[0, 2, 0]} />
    </group>
  );
};

// 03. PERFECT WAREHOUSE (Heavy-Duty 3-Tier Blue High-Bay Racking with Pallets)
const ModelWarehouse = ({ isSelected }) => {
  return (
    <group position={[18, 0, -16]}>
      {[0, 1].map((row) => (
        <group key={row} position={[0, 0, row * 3.2]}>
          {/* Blue Vertical Steel Upright Pillars */}
          {[-3.6, -1.2, 1.2, 3.6].map((x, i) => (
            <group key={i} position={[x, 3.5, 0]}>
              <mesh castShadow>
                <boxGeometry args={[0.18, 7.0, 0.18]} />
                <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.3} />
              </mesh>
            </group>
          ))}

          {/* Orange/Yellow Cross Beams */}
          {[1.4, 3.6, 5.8].map((h, lvl) => (
            <group key={lvl} position={[0, h, 0]}>
              <mesh position={[0, 0, 0.7]}>
                <boxGeometry args={[7.4, 0.12, 0.12]} />
                <meshStandardMaterial color="#f59e0b" metalness={0.8} />
              </mesh>
              <mesh position={[0, 0, -0.7]}>
                <boxGeometry args={[7.4, 0.12, 0.12]} />
                <meshStandardMaterial color="#f59e0b" metalness={0.8} />
              </mesh>

              {/* Loaded Storage Pallets with Heatmap Colors (Blue & Yellow) */}
              {[-2.4, 0, 2.4].map((px, pIdx) => (
                <group key={pIdx} position={[px, 0.5, 0]}>
                  {/* Wooden Pallet */}
                  <mesh position={[0, -0.4, 0]}>
                    <boxGeometry args={[1.8, 0.15, 1.3]} />
                    <meshStandardMaterial color="#78350f" roughness={0.8} />
                  </mesh>
                  {/* Stacked Blue / Yellow Inventory Boxes */}
                  <mesh castShadow position={[0, 0, 0]}>
                    <boxGeometry args={[1.7, 0.75, 1.2]} />
                    <meshStandardMaterial 
                      color={(lvl + pIdx) % 2 === 0 ? '#0284c7' : '#f59e0b'} 
                      roughness={0.4}
                      emissive={(lvl + pIdx) % 2 === 0 ? '#0284c7' : '#f59e0b'}
                      emissiveIntensity={0.15}
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

// 04. RFID PORTALS (Yellow Industrial Gate Portal over Conveyor)
const ModelRfidPortals = () => {
  return (
    <group position={[-18, 0, 16]}>
      {/* Yellow Arch Frame */}
      <mesh position={[-2.2, 2.5, 0]} castShadow>
        <boxGeometry args={[0.5, 5.0, 0.6]} />
        <meshStandardMaterial color="#eab308" metalness={0.7} />
      </mesh>
      <mesh position={[2.2, 2.5, 0]} castShadow>
        <boxGeometry args={[0.5, 5.0, 0.6]} />
        <meshStandardMaterial color="#eab308" metalness={0.7} />
      </mesh>
      <mesh position={[0, 4.8, 0]}>
        <boxGeometry args={[4.9, 0.5, 0.6]} />
        <meshStandardMaterial color="#eab308" metalness={0.7} />
      </mesh>

      {/* Planar RFID Antenna Panels */}
      <mesh position={[-1.9, 2.6, 0]}>
        <boxGeometry args={[0.12, 1.8, 1.0]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} />
      </mesh>
      <mesh position={[1.9, 2.6, 0]}>
        <boxGeometry args={[0.12, 1.8, 1.0]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} />
      </mesh>

      {/* Holographic Scan Beam Curtain */}
      <mesh position={[0, 2.4, 0]}>
        <planeGeometry args={[3.8, 4.2]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[3.6, 0.15, 1.4]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} />
      </mesh>
    </group>
  );
};

// 05. INDUSTRIAL ROBOTS (3 Yellow Articulated 6-Axis Arms along Conveyor)
const ModelRobots = () => {
  const arm1Ref = useRef();
  const arm2Ref = useRef();
  const arm3Ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (arm1Ref.current) arm1Ref.current.rotation.y = Math.sin(t * 1.5) * 0.4;
    if (arm2Ref.current) arm2Ref.current.rotation.y = Math.sin(t * 1.5 + 1) * 0.4;
    if (arm3Ref.current) arm3Ref.current.rotation.y = Math.sin(t * 1.5 + 2) * 0.4;
  });

  return (
    <group position={[6, 0, -6]}>
      {[-4.0, 0, 4.0].map((x, i) => {
        const ref = i === 0 ? arm1Ref : i === 1 ? arm2Ref : arm3Ref;
        return (
          <group key={i} ref={ref} position={[x, 0, 0]}>
            {/* Cast Base */}
            <mesh position={[0, 0.3, 0]} castShadow>
              <cylinderGeometry args={[0.8, 1.0, 0.6, 24]} />
              <meshStandardMaterial color="#1e293b" metalness={0.9} />
            </mesh>
            {/* Articulated Lower Arm (Yellow) */}
            <mesh position={[0, 1.4, 0.2]} rotation={[0.4, 0, 0]} castShadow>
              <boxGeometry args={[0.4, 1.8, 0.4]} />
              <meshStandardMaterial color="#eab308" metalness={0.7} />
            </mesh>
            {/* Upper Arm Segment */}
            <mesh position={[0, 2.6, 0.7]} rotation={[-0.8, 0, 0]} castShadow>
              <boxGeometry args={[0.3, 1.6, 0.3]} />
              <meshStandardMaterial color="#eab308" metalness={0.7} />
            </mesh>
            {/* Tool Gripper */}
            <mesh position={[0, 2.1, 1.4]}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.6} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// 06. VISION AI (Camera Inspection Towers with Holographic Target HUD)
const ModelVisionAi = () => {
  return (
    <group position={[18, 0, 6]}>
      {[-1.8, 1.8].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          {/* Vertical Camera Pillar Column */}
          <mesh position={[0, 2.5, 0]} castShadow>
            <cylinderGeometry args={[0.25, 0.35, 5.0, 24]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} />
          </mesh>
          {/* Top Optical Sensor Head */}
          <mesh position={[0, 5.2, 0]}>
            <boxGeometry args={[0.7, 0.5, 0.9]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} />
          </mesh>
          {/* Lens Ring */}
          <mesh position={[0, 5.2, 0.46]}>
            <cylinderGeometry args={[0.2, 0.2, 0.1, 24]} rotation={[Math.PI / 2, 0, 0]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        </group>
      ))}

      {/* Floating Holographic Target HUD Reticle */}
      <mesh position={[0, 3.2, 1.0]}>
        <planeGeometry args={[2.8, 2.0]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

// 07. ERP SYNC (High-Density Server Bank with 3D Cloud Icon)
const ModelErpSync = () => {
  return (
    <group position={[-18, 0, -16]}>
      {[-2.2, 0, 2.2].map((x, i) => (
        <mesh key={i} position={[x, 2.2, 0]} castShadow>
          <boxGeometry args={[1.8, 4.4, 1.4]} />
          <meshStandardMaterial color="#09101f" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Server Status Blinking LEDs Grid */}
      {[-2.2, 0, 2.2].map((x, i) => (
        <mesh key={`led-${i}`} position={[x, 2.2, 0.72]}>
          <planeGeometry args={[1.5, 3.8]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.7} />
        </mesh>
      ))}

      {/* Floating 3D Glowing Cloud Emblem */}
      <group position={[0, 5.2, 0]}>
        <mesh>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <mesh position={[-0.4, -0.1, 0]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <mesh position={[0.4, -0.1, 0]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
      </group>
    </group>
  );
};

// 08. INSPECTION DRONES (Hovering Quadcopters with Scan Spotlights)
const ModelDrones = () => {
  const droneGroupRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (droneGroupRef.current) {
      droneGroupRef.current.position.y = 5.5 + Math.sin(t * 2) * 0.35;
      droneGroupRef.current.rotation.y = Math.sin(t * 0.8) * 0.2;
    }
  });

  return (
    <group ref={droneGroupRef} position={[6, 5.5, 16]}>
      {[-2.5, 2.5].map((dx, i) => (
        <group key={i} position={[dx, 0, 0]}>
          {/* Drone Body */}
          <mesh castShadow>
            <boxGeometry args={[0.8, 0.2, 0.8]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} />
          </mesh>
          {/* Quad Arms & Rotors */}
          {[-0.6, 0.6].map((rx) => (
            [-0.6, 0.6].map((rz) => (
              <group key={`${rx}-${rz}`} position={[rx, 0.1, rz]}>
                <mesh>
                  <cylinderGeometry args={[0.35, 0.35, 0.02, 16]} />
                  <meshBasicMaterial color="#00f0ff" transparent opacity={0.6} />
                </mesh>
              </group>
            ))
          ))}
          {/* Downward Scan Laser Cone */}
          <mesh position={[0, -2.5, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[1.2, 5.0, 16, 1, true]} />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.18} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// 09. SCANNERS (Industrial 2D DPM Laser Imager Station)
const ModelScanners = () => {
  return (
    <group position={[-18, 0, 0]}>
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[3.2, 2.4, 2.0]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} />
      </mesh>
      {/* Handheld Imager Stand & Target Box */}
      <mesh position={[0, 2.8, 0]}>
        <boxGeometry args={[0.8, 1.2, 0.6]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} />
      </mesh>
      {/* Scanning Fan Laser */}
      <mesh position={[0, 1.8, 0.8]} rotation={[-0.4, 0, 0]}>
        <coneGeometry args={[0.9, 1.6, 16, 1, true]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

// 10. PRINTERS (Row of Industrial Barcode Printers with Label Feeds)
const ModelPrinters = () => {
  return (
    <group position={[-6, 0, -16]}>
      {[-3.0, -1.0, 1.0, 3.0].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          {/* All-Metal Industrial Printer Body */}
          <mesh position={[0, 1.0, 0]} castShadow>
            <boxGeometry args={[1.6, 2.0, 1.5]} />
            <meshStandardMaterial color="#334155" metalness={0.85} roughness={0.25} />
          </mesh>
          {/* Front Dispenser Screen */}
          <mesh position={[0, 1.4, 0.77]}>
            <planeGeometry args={[1.1, 0.7]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
          {/* Printed Label Output Strip */}
          <mesh position={[0, 0.7, 0.85]} rotation={[0.3, 0, 0]}>
            <planeGeometry args={[0.8, 0.6]} />
            <meshStandardMaterial color="#ffffff" roughness={0.5} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// 11. SOFTWARE & CONTROL CENTER (Command Center Desk & Server)
const ModelSoftware = () => {
  return (
    <group position={[6, 0, 16]}>
      {/* Command Center Console Desk */}
      <mesh position={[0, 1.0, 0]} castShadow>
        <boxGeometry args={[4.4, 2.0, 1.8]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} />
      </mesh>
      {/* 3 Telemetry Monitors on Desk */}
      {[-1.4, 0, 1.4].map((x, i) => (
        <group key={i} position={[x, 2.4, 0.2]}>
          <mesh>
            <boxGeometry args={[1.2, 0.8, 0.1]} />
            <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.6} />
          </mesh>
        </group>
      ))}
      {/* Server Rack beside desk */}
      <mesh position={[3.2, 2.0, 0]} castShadow>
        <boxGeometry args={[1.6, 4.0, 1.5]} />
        <meshStandardMaterial color="#0a1224" metalness={0.9} />
      </mesh>
    </group>
  );
};

// 12. PMS & OEE (Shopfloor Production Monitoring Terminal)
const ModelPms = () => {
  return (
    <group position={[-6, 0, 0]}>
      {/* Industrial Machine Terminal Base */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[3.4, 2.4, 1.8]} />
        <meshStandardMaterial color="#1e293b" metalness={0.85} />
      </mesh>
      {/* Dual Touch Monitors */}
      <mesh position={[-0.8, 2.8, 0.3]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[1.4, 0.9, 0.1]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>
      <mesh position={[0.8, 2.8, 0.3]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[1.4, 0.9, 0.1]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>
    </group>
  );
};

// 02. PERFECT AUDIT (QA Compliance Inspector Console)
const ModelAudit = () => {
  return (
    <group position={[6, 0, 0]}>
      <mesh position={[0, 1.0, 0]} castShadow>
        <boxGeometry args={[3.8, 2.0, 1.8]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} />
      </mesh>
      {/* Triple QC Dashboards */}
      {[-1.2, 0, 1.2].map((x, i) => (
        <group key={i} position={[x, 2.4, 0.2]}>
          <mesh>
            <boxGeometry args={[1.0, 0.7, 0.08]} />
            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

/* =========================================================================
   4. CENTRAL CONVEYOR & MOVING PACKAGING CARTONS
   ========================================================================= */
const CentralConveyorFlow = () => {
  const cartonsGroupRef = useRef();

  useFrame((state, delta) => {
    if (!cartonsGroupRef.current) return;
    cartonsGroupRef.current.children.forEach((child) => {
      child.position.x += delta * 3.2;
      if (child.position.x > 26) {
        child.position.x = -26;
      }
    });
  });

  return (
    <group position={[0, 0.6, -6]}>
      {/* Stainless Steel Conveyor Bed with Yellow Safety Rails */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[52, 0.2, 1.6]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.15, 0.82]}>
        <boxGeometry args={[52, 0.1, 0.05]} />
        <meshStandardMaterial color="#eab308" metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.15, -0.82]}>
        <boxGeometry args={[52, 0.1, 0.05]} />
        <meshStandardMaterial color="#eab308" metalness={0.7} />
      </mesh>

      {/* Moving Cardboard Cartons along Conveyor */}
      <group ref={cartonsGroupRef}>
        {[-24, -18, -12, -6, 0, 6, 12, 18, 24].map((initX, i) => (
          <mesh key={i} position={[initX, 0.45, 0]} castShadow>
            <boxGeometry args={[1.2, 0.7, 0.9]} />
            <meshStandardMaterial color="#b45309" roughness={0.7} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

/* =========================================================================
   5. GLOWING CYAN CIRCUIT DATA BUS (Interconnecting All Stations to Hub)
   ========================================================================= */
const ConnectedCircuitGrid = () => {
  return (
    <group position={[0, 0.02, 0]}>
      {/* Radiating Lines from Center Perfect Trace (0,0) */}
      {[
        [18, -16], [-18, 16], [6, -6], [18, 6], [-18, -16], [6, 16],
        [-18, 0], [-6, -16], [6, 0], [-6, 0], [18, 0]
      ].map(([tx, tz], i) => (
        <group key={i}>
          {/* Main Direct Circuit Strip */}
          <mesh position={[tx / 2, 0, tz / 2]} rotation={[-Math.PI / 2, 0, Math.atan2(tz, tx)]}>
            <planeGeometry args={[0.2, Math.sqrt(tx * tx + tz * tz)]} />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.45} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

/* =========================================================================
   6. LUXURY FACTORY ENVIRONMENT (Dark Satin Floor & Trusses)
   ========================================================================= */
const FactoryEnvironment = () => {
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[80, 0.1, 80]} />
        <meshStandardMaterial
          color="#060c18"
          metalness={0.3}
          roughness={0.55}
        />
      </mesh>

      {/* Outer Boundary Frame */}
      <mesh position={[0, 0.15, -40]}>
        <boxGeometry args={[80, 0.3, 0.4]} />
        <meshStandardMaterial color="#00f0ff" metalness={0.9} emissive="#00f0ff" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0.15, 40]}>
        <boxGeometry args={[80, 0.3, 0.4]} />
        <meshStandardMaterial color="#00f0ff" metalness={0.9} emissive="#00f0ff" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-40, 0.15, 0]}>
        <boxGeometry args={[0.4, 0.3, 80]} />
        <meshStandardMaterial color="#00f0ff" metalness={0.9} emissive="#00f0ff" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[40, 0.15, 0]}>
        <boxGeometry args={[0.4, 0.3, 80]} />
        <meshStandardMaterial color="#00f0ff" metalness={0.9} emissive="#00f0ff" emissiveIntensity={0.3} />
      </mesh>

      {/* Overhead High-Bay Roof Trusses */}
      {[-24, -8, 8, 24].map((z) => (
        <group key={`truss-${z}`} position={[0, 16, z]}>
          <mesh>
            <boxGeometry args={[78, 0.6, 0.6]} />
            <meshStandardMaterial color="#1e293b" metalness={0.9} />
          </mesh>
          {[-20, 0, 20].map((x) => (
            <mesh key={`light-${x}`} position={[x, -0.4, 0]}>
              <cylinderGeometry args={[0.4, 0.7, 0.3, 16]} />
              <meshStandardMaterial color="#0f172a" metalness={0.8} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
};

/* =========================================================================
   7. MAIN 3D FACTORY SCENE (Complete Connected Twin Overview)
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
      <ambientLight intensity={1.3} color="#f0f9ff" />
      <directionalLight
        position={[25, 40, 30]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-25, 30, -25]} intensity={0.7} color="#38bdf8" />
      <directionalLight position={[0, 35, 0]} intensity={0.5} color="#e0f2fe" />

      {/* Camera Controller */}
      <CameraController selectedStation={selectedStation} isOverview={isOverview} />

      {/* Factory Floor & Overhead Trusses */}
      <FactoryEnvironment />

      {/* Connected Glowing Circuit Grid */}
      <ConnectedCircuitGrid />

      {/* Central Moving Conveyor */}
      <CentralConveyorFlow />

      {/* 12 Detailed 3D Stations from Reference */}
      <ModelPerfectTrace isSelected={selectedStation === 'perfectTrace'} />
      <ModelWarehouse isSelected={selectedStation === 'perfectWarehouse'} />
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

      {/* 12 Interactive Callout Badges */}
      {STATION_KEYS.map((key) => {
        const node = ATPL_FACTORY_NODES[key];
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
            <StationCalloutTag
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
