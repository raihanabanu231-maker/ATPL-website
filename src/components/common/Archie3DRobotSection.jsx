import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight, 
  PhoneCall, 
  CheckCircle2, 
  Bot, 
  ExternalLink,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw
} from 'lucide-react';
import { ShineBadge } from '../ui/shine-badge';
import { MagneticButton } from '../ui/magnetic-button';

export const Archie3DRobotSection = () => {
  const { openDemoModal } = useApp();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [faceMode, setFaceMode] = useState('EYES'); // 'EYES' | 'QUOTE'
  const [hoveredPill, setHoveredPill] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(18); // 0 to 100% video scrubber progress

  // Video Scrubber Timeline Animation Loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : Number((prev + 0.4).toFixed(1))));
    }, 80);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Tactile sound effect for interactive controls & pill drag/hover
  const playChime = (freq = 587.33) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.28);
    } catch {
      // AudioContext muted/unsupported
    }
  };

  // =========================================================================
  // The ATPL Way - Vertically Staggered Interlocking Stack (Dribbble 25966614)
  // Each pill has its own row + alternating left/right anchor: NEVER collides!
  // =========================================================================
  const atplPills = [
    {
      id: 'p0',
      label: 'Live Real-Time Sync',
      bg: '#ffffff',
      color: '#0f172a',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      top: '11%',
      left: '50%',
      rot: 0,
      floatY: [-4, 4, -4],
      floatX: [-2, 2, -2],
      dur: 3.4,
      delay: 0.05
    },
    {
      id: 'p1',
      label: 'Native SAP & Oracle',
      bg: '#0f172a', // dark slate
      color: '#ffffff',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      top: '21%',
      left: '34%',
      rot: -3,
      floatY: [-5, 5, -5],
      floatX: [-3, 3, -3],
      dur: 3.8,
      delay: 0.15
    },
    {
      id: 'p2',
      label: '<4-Hr Emergency SLA',
      bg: '#0071ba', // royal electric blue
      color: '#ffffff',
      border: '1px solid rgba(0, 113, 186, 0.3)',
      top: '31%',
      left: '66%',
      rot: 4,
      floatY: [-6, 5, -6],
      floatX: [3, -2, 3],
      dur: 4.2,
      delay: 0.3
    },
    {
      id: 'p3',
      label: '100% In-House WMS',
      bg: '#111827', // dark slate
      color: '#ffffff',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      top: '41%',
      left: '35%',
      rot: -2,
      floatY: [-7, 4, -7],
      floatX: [2, -3, 2],
      dur: 4.5,
      delay: 0.25
    },
    {
      id: 'p4',
      label: 'Zero Scanner Tax',
      bg: '#ffffff', // clean white
      color: '#0f172a',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      top: '51%',
      left: '68%',
      rot: 3,
      floatY: [-4, 6, -4],
      floatX: [-2, 3, -2],
      dur: 3.5,
      delay: 0.45
    },
    {
      id: 'p5',
      label: 'Resident Engineers',
      bg: '#0284c7', // vibrant cyan/sky blue
      color: '#ffffff',
      border: '1px solid rgba(2, 132, 199, 0.3)',
      top: '61%',
      left: '33%',
      rot: -3,
      floatY: [-4, 5, -4],
      floatX: [-3, 2, -3],
      dur: 3.6,
      delay: 0.4
    },
    {
      id: 'p6',
      label: 'IP67 Harsh Grade',
      bg: '#0f172a', // dark slate
      color: '#ffffff',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      top: '71%',
      left: '67%',
      rot: 4,
      floatY: [-5, 5, -5],
      floatX: [-2, 3, -2],
      dur: 3.9,
      delay: 0.35
    },
    {
      id: 'p7',
      label: 'Lab Golden-Staged',
      bg: '#ffffff', // clean white
      color: '#0f172a',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      top: '81%',
      left: '36%',
      rot: -2,
      floatY: [-5, 5, -5],
      floatX: [2, -2, 2],
      dur: 4.0,
      delay: 0.5
    },
    {
      id: 'p8',
      label: 'Zero Line Standstills',
      bg: '#0071ba', // royal electric blue
      color: '#ffffff',
      border: '1px solid rgba(0, 113, 186, 0.3)',
      top: '91%',
      left: '52%',
      rot: 2,
      floatY: [-6, 4, -6],
      floatX: [2, -3, 2],
      dur: 4.3,
      delay: 0.2
    }
  ];

  // =========================================================================
  // Without ATPL - Continuous Heavy Rain of Chaotic Problem Boxes (Top to Bottom)
  // 16 staggered particles cascading down like an endless waterfall video!
  // =========================================================================
  const rainingPills = [
    { id: 'r0', label: 'Delayed Reports', bg: '#e2e8f0', color: '#1e293b', border: '1px solid #cbd5e1', left: '22%', rot: -7, dur: 3.4, delay: 0.0, depth: 1 },
    { id: 'r1', label: 'Random Firmware', bg: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0', left: '56%', rot: 8, dur: 4.1, delay: 0.25, depth: 0 },
    { id: 'r2', label: 'Unorganized IT', bg: '#e2e8f0', color: '#1e293b', border: '1px solid #cbd5e1', left: '38%', rot: -6, dur: 3.5, delay: 0.5, depth: 1 },
    { id: 'r3', label: 'Overwhelming Bugs', bg: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0', left: '76%', rot: 5, dur: 4.2, delay: 0.75, depth: 0 },
    { id: 'r4', label: 'Vendor Spam', bg: '#e2e8f0', color: '#1e293b', border: '1px solid #cbd5e1', left: '18%', rot: -9, dur: 3.6, delay: 1.0, depth: 1 },
    { id: 'r5', label: '3 to 7 Days Delay', bg: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', left: '68%', rot: 7, dur: 3.9, delay: 1.25, depth: 1 },
    { id: 'r6', label: 'Broken CSV Drops', bg: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0', left: '44%', rot: -11, dur: 4.4, delay: 1.5, depth: 0 },
    { id: 'r7', label: 'Costly Lock-In', bg: '#e2e8f0', color: '#1e293b', border: '1px solid #cbd5e1', left: '82%', rot: -4, dur: 3.7, delay: 1.75, depth: 1 },
    { id: 'r8', label: 'Hardware Burnout', bg: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', left: '26%', rot: 6, dur: 4.0, delay: 2.0, depth: 0 },
    { id: 'r9', label: 'Line Standstills', bg: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', left: '62%', rot: 4, dur: 3.5, delay: 2.25, depth: 1 },
    { id: 'r10', label: 'Drop-Ship Boxes', bg: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0', left: '32%', rot: -8, dur: 4.3, delay: 2.5, depth: 0 },
    { id: 'r11', label: 'Zero SLA Support', bg: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', left: '74%', rot: 6, dur: 3.8, delay: 2.75, depth: 1 },
    { id: 'r12', label: 'Manual Scans', bg: '#e2e8f0', color: '#1e293b', border: '1px solid #cbd5e1', left: '20%', rot: -5, dur: 4.1, delay: 3.0, depth: 1 },
    { id: 'r13', label: 'Uncertified Cables', bg: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0', left: '50%', rot: 10, dur: 3.6, delay: 3.25, depth: 0 },
    { id: 'r14', label: 'Inventory Drift', bg: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', left: '80%', rot: -6, dur: 4.2, delay: 3.5, depth: 1 },
    { id: 'r15', label: 'Disjointed Middleware', bg: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0', left: '35%', rot: 5, dur: 3.7, delay: 3.75, depth: 0 }
  ];

  // =========================================================================
  // Three.js 3D Robot Scene (Archie Shopfloor Agent)
  // =========================================================================
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let width = container.clientWidth || 380;
    let height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    
    // Field of view 34 deg: framed to show the whole robot + pedestal with comfortable margin
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, -0.9, 9.8);
    camera.lookAt(0, -0.9, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // PMREM Room Environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    const envMap = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    scene.environment = envMap;
    scene.environmentIntensity = 0.95;

    // Lights
    const hemiLight = new THREE.HemisphereLight(0xfff6ee, 0xd9d2c8, 0.75);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff3e6, 1.7);
    keyLight.position.set(-3, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.radius = 6;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xfff0e6, 1.25);
    rimLight.position.set(4, 2, -4);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xff9a6a, 2.2, 7);
    fillLight.position.set(-3.2, 1.2, 0.6);
    scene.add(fillLight);

    // Conic Gradient Ring Texture for face frame
    const ringCanvas = document.createElement('canvas');
    ringCanvas.width = 512;
    ringCanvas.height = 512;
    const ringCtx = ringCanvas.getContext('2d');
    const conic = ringCtx.createConicGradient(Math.PI * (200 / 180), 256, 256);
    conic.addColorStop(0, '#ffb347');
    conic.addColorStop(0.18, '#ff8a3d');
    conic.addColorStop(0.34, '#ff5a5f');
    conic.addColorStop(0.50, '#ff3d8b');
    conic.addColorStop(0.66, '#ff5a5f');
    conic.addColorStop(0.82, '#ff8a3d');
    conic.addColorStop(1, '#ffb347');
    ringCtx.fillStyle = conic;
    ringCtx.fillRect(0, 0, 512, 512);

    const ringTexture = new THREE.CanvasTexture(ringCanvas);
    ringTexture.colorSpace = THREE.SRGBColorSpace;

    // Screen Canvas for Face (Eyes / Quote)
    const faceCanvas = document.createElement('canvas');
    faceCanvas.width = 512;
    faceCanvas.height = 512;
    const faceCtx = faceCanvas.getContext('2d');
    const faceTexture = new THREE.CanvasTexture(faceCanvas);
    faceTexture.colorSpace = THREE.SRGBColorSpace;

    // Materials
    const shellMat = new THREE.MeshPhysicalMaterial({
      color: 0xeeebe6,
      roughness: 0.38,
      metalness: 0.0,
      clearcoat: 0.45,
      clearcoatRoughness: 0.3
    });

    const shellLightMat = new THREE.MeshPhysicalMaterial({
      color: 0xf8f6f2,
      roughness: 0.34,
      metalness: 0.0,
      clearcoat: 0.45,
      clearcoatRoughness: 0.3
    });

    const darkJointMat = new THREE.MeshStandardMaterial({
      color: 0x1b1b1f,
      roughness: 0.55,
      metalness: 0.3
    });

    const deepDarkMat = new THREE.MeshBasicMaterial({ color: 0x0f0f12 });

    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x222226,
      roughness: 0.9,
      metalness: 0.1
    });

    const ringMat = new THREE.MeshStandardMaterial({
      map: ringTexture,
      emissive: 0xffffff,
      emissiveMap: ringTexture,
      emissiveIntensity: 0.25,
      roughness: 0.5,
      metalness: 0.0
    });

    const screenMat = new THREE.MeshPhysicalMaterial({
      color: 0x050508,
      roughness: 0.1,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      emissive: 0xffffff,
      emissiveMap: faceTexture,
      emissiveIntensity: 1.6
    });

    // Assemble Robot Hierarchy
    const robotRoot = new THREE.Group();
    scene.add(robotRoot);

    const bodyGroup = new THREE.Group();
    robotRoot.add(bodyGroup);

    // Torso
    const torsoMesh = new THREE.Mesh(new RoundedBoxGeometry(1.22, 1.12, 0.92, 4, 0.24), shellMat);
    torsoMesh.position.set(0, -0.6, 0);
    torsoMesh.castShadow = true;
    torsoMesh.receiveShadow = true;
    bodyGroup.add(torsoMesh);

    // Chest slab
    const chestSlab = new THREE.Mesh(new RoundedBoxGeometry(0.98, 0.36, 0.16, 3, 0.08), shellLightMat);
    chestSlab.position.set(0, -0.32, 0.44);
    chestSlab.castShadow = true;
    bodyGroup.add(chestSlab);

    // 3 LEDs
    const ledColors = [0xff8a3d, 0xff5a5f, 0xff3d8b];
    const ledGeom = new THREE.SphereGeometry(0.032, 16, 16);
    ledColors.forEach((col, i) => {
      const ledMat = new THREE.MeshStandardMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: 2.2,
        roughness: 0.2
      });
      const led = new THREE.Mesh(ledGeom, ledMat);
      led.position.set(-0.16 + i * 0.16, -0.32, 0.53);
      bodyGroup.add(led);
    });

    // Vertical Slots & Lips
    const slotGeom = new THREE.BoxGeometry(0.045, 0.22, 0.05);
    const lipGeom = new THREE.TorusGeometry(0.038, 0.015, 8, 16, Math.PI);
    lipGeom.rotateZ(Math.PI);
    [-0.18, 0.18].forEach(xPos => {
      const slot = new THREE.Mesh(slotGeom, deepDarkMat);
      slot.position.set(xPos, -0.68, 0.47);
      bodyGroup.add(slot);

      const lip = new THREE.Mesh(lipGeom, deepDarkMat);
      lip.position.set(xPos, -0.56, 0.48);
      bodyGroup.add(lip);
    });

    // Pelvis
    const pelvis = new THREE.Mesh(new RoundedBoxGeometry(0.85, 0.28, 0.72, 3, 0.1), darkJointMat);
    pelvis.position.set(0, -1.22, 0);
    bodyGroup.add(pelvis);

    // Neck
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.28, 24), darkJointMat);
    neck.position.set(0, 0.08, 0);
    bodyGroup.add(neck);

    // Head Pivot & Head
    const headPivot = new THREE.Group();
    headPivot.position.set(0, 0.22, 0);
    bodyGroup.add(headPivot);

    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.78, 0);
    headPivot.add(headGroup);

    // Skull
    const skull = new THREE.Mesh(new RoundedBoxGeometry(1.5, 1.42, 1.3, 5, 0.2), shellMat);
    skull.castShadow = true;
    skull.receiveShadow = true;
    headGroup.add(skull);

    // Dark Back Block
    const darkBack = new THREE.Mesh(new RoundedBoxGeometry(1.28, 1.14, 0.9, 4, 0.12), deepDarkMat);
    darkBack.position.set(0, 0, -0.32);
    headGroup.add(darkBack);

    // Circuit bars on back
    const barGeom = new THREE.BoxGeometry(0.12, 0.025, 0.04);
    for (let b = 0; b < 24; b++) {
      const bar = new THREE.Mesh(barGeom, darkJointMat);
      if (b < 14) {
        const row = Math.floor(b / 3);
        const col = b % 3;
        bar.position.set(-0.35 + col * 0.35, -0.35 + row * 0.18, -0.78);
      } else {
        const topIdx = b - 14;
        bar.rotation.x = Math.PI / 2;
        bar.position.set(-0.3 + (topIdx % 3) * 0.3, 0.58, -0.15 - Math.floor(topIdx / 3) * 0.16);
      }
      headGroup.add(bar);
    }

    // Extruded Face Ring
    const shape = new THREE.Shape();
    const w = 1.5, h = 1.44, r = 0.3;
    shape.moveTo(-w / 2 + r, -h / 2);
    shape.lineTo(w / 2 - r, -h / 2);
    shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    shape.lineTo(w / 2, h / 2 - r);
    shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
    shape.lineTo(-w / 2 + r, h / 2);
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
    shape.lineTo(-w / 2, -h / 2 + r);
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);

    const hole = new THREE.Path();
    const iw = 1.08, ih = 1.02, ir = 0.2;
    hole.moveTo(-iw / 2 + ir, -ih / 2);
    hole.lineTo(iw / 2 - ir, -ih / 2);
    hole.quadraticCurveTo(iw / 2, -ih / 2, iw / 2, -ih / 2 + ir);
    hole.lineTo(iw / 2, ih / 2 - ir);
    hole.quadraticCurveTo(iw / 2, ih / 2, iw / 2 - ir, ih / 2);
    hole.lineTo(-iw / 2 + ir, ih / 2);
    hole.quadraticCurveTo(-iw / 2, ih / 2, -iw / 2, ih / 2 - ir);
    hole.lineTo(-iw / 2, -ih / 2 + ir);
    hole.quadraticCurveTo(-iw / 2, -ih / 2, -iw / 2 + ir, -ih / 2);
    shape.holes.push(hole);

    const ringGeom = new THREE.ExtrudeGeometry(shape, {
      depth: 0.1,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03
    });

    const pos = ringGeom.attributes.position;
    const uvs = [];
    for (let i = 0; i < pos.count; i++) {
      const px = pos.getX(i);
      const py = pos.getY(i);
      uvs.push((px + 0.8) / 1.6, (py + 0.8) / 1.6);
    }
    ringGeom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

    const ringMesh = new THREE.Mesh(ringGeom, ringMat);
    ringMesh.position.set(0, 0, 0.6);
    ringMesh.castShadow = true;
    headGroup.add(ringMesh);

    // Bezel
    const bezelMesh = new THREE.Mesh(new RoundedBoxGeometry(1.06, 1.00, 0.06, 3, 0.16), shellLightMat);
    bezelMesh.position.set(0, 0, 0.62);
    headGroup.add(bezelMesh);

    // Screen
    const screenMesh = new THREE.Mesh(new RoundedBoxGeometry(0.92, 0.86, 0.04, 3, 0.12), screenMat);
    screenMesh.position.set(0, 0, 0.66);
    headGroup.add(screenMesh);

    // Ears
    [-0.82, 0.82].forEach((xSide) => {
      const earBase = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.12, 24), darkJointMat);
      earBase.rotation.z = Math.PI / 2;
      earBase.position.set(xSide, 0, -0.05);
      headGroup.add(earBase);

      const earRing = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.06, 16, 32), shellLightMat);
      earRing.rotation.y = Math.PI / 2;
      earRing.position.set(xSide + (xSide > 0 ? 0.08 : -0.08), 0, -0.05);
      headGroup.add(earRing);

      if (xSide > 0) {
        const cableGeom = new THREE.TorusGeometry(0.38, 0.03, 12, 32, Math.PI * 0.95);
        cableGeom.rotateZ(Math.PI * 0.95);
        const cable = new THREE.Mesh(cableGeom, deepDarkMat);
        cable.position.set(xSide + 0.04, -0.15, 0);
        headGroup.add(cable);
      }
    });

    // Arms
    const shoulderBallGeom = new THREE.SphereGeometry(0.16, 20, 20);
    const elbowBallGeom = new THREE.SphereGeometry(0.12, 16, 16);
    const armSegments = [];

    [-1, 1].forEach(side => {
      const armRoot = new THREE.Group();
      armRoot.position.set(side * 0.72, -0.28, 0);
      bodyGroup.add(armRoot);

      const shoulder = new THREE.Mesh(shoulderBallGeom, darkJointMat);
      armRoot.add(shoulder);
      armRoot.rotation.z = side * 0.16;

      const upperArm = new THREE.Mesh(new RoundedBoxGeometry(0.22, 0.44, 0.22, 3, 0.06), shellMat);
      upperArm.position.set(0, -0.26, 0);
      armRoot.add(upperArm);

      const elbow = new THREE.Mesh(elbowBallGeom, darkJointMat);
      elbow.position.set(0, -0.52, 0);
      armRoot.add(elbow);

      const forearmGroup = new THREE.Group();
      forearmGroup.position.set(0, -0.52, 0);
      forearmGroup.rotation.x = -0.35;
      armRoot.add(forearmGroup);

      const forearm = new THREE.Mesh(new RoundedBoxGeometry(0.20, 0.40, 0.20, 3, 0.05), shellMat);
      forearm.position.set(0, -0.22, 0);
      forearmGroup.add(forearm);

      const hand = new THREE.Mesh(new RoundedBoxGeometry(0.18, 0.18, 0.18, 3, 0.04), shellLightMat);
      hand.position.set(0, -0.46, 0);
      forearmGroup.add(hand);

      armSegments.push({ side, armRoot, forearmGroup });
    });

    // Legs
    const hipBallGeom = new THREE.SphereGeometry(0.14, 16, 16);
    const legBlockGeom = new RoundedBoxGeometry(0.32, 0.62, 0.36, 3, 0.08);
    const footGeom = new RoundedBoxGeometry(0.36, 0.20, 0.56, 3, 0.06);

    [-0.32, 0.32].forEach(side => {
      const hip = new THREE.Mesh(hipBallGeom, darkJointMat);
      hip.position.set(side, -1.34, 0);
      bodyGroup.add(hip);

      const leg = new THREE.Mesh(legBlockGeom, shellMat);
      leg.position.set(side, -1.72, 0);
      leg.castShadow = true;
      bodyGroup.add(leg);

      const ankle = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.12, 16), darkJointMat);
      ankle.position.set(side, -2.06, 0);
      bodyGroup.add(ankle);

      const foot = new THREE.Mesh(footGeom, shellLightMat);
      foot.position.set(side, -2.18, 0.08);
      foot.castShadow = true;
      bodyGroup.add(foot);
    });

    // Pedestal
    const pedestal = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.6, 1.7), pedestalMat);
    pedestal.position.set(0, -3.02, 0);
    pedestal.receiveShadow = true;
    robotRoot.add(pedestal);

    // Initial Body & Head Stance
    bodyGroup.rotation.y = -0.25;
    headPivot.rotation.set(0.12, -0.35, 0.14);

    // Face rendering state
    let quoteAlpha = 0.0;
    let nextBlinkTime = 2.0;
    let blinkProgress = 0.0;
    let isBlinking = false;

    function renderFace(delta, time) {
      if (faceMode === 'EYES') {
        if (!isBlinking && time >= nextBlinkTime) {
          isBlinking = true;
          blinkProgress = 0;
        }
        if (isBlinking) {
          blinkProgress += delta / 0.18;
          if (blinkProgress >= 1.0) {
            isBlinking = false;
            blinkProgress = 0;
            nextBlinkTime = time + 2.5 + Math.random() * 2.5;
          }
        }
      }

      const targetAlpha = faceMode === 'QUOTE' ? 1.0 : 0.0;
      if (quoteAlpha < targetAlpha) {
        quoteAlpha = Math.min(targetAlpha, quoteAlpha + 0.08);
      } else if (quoteAlpha > targetAlpha) {
        quoteAlpha = Math.max(targetAlpha, quoteAlpha - 0.08);
      }

      faceCtx.fillStyle = '#000000';
      faceCtx.fillRect(0, 0, 512, 512);

      if (quoteAlpha < 1.0) {
        faceCtx.save();
        faceCtx.globalAlpha = 1.0 - quoteAlpha;
        faceCtx.shadowColor = '#ffffff';
        faceCtx.shadowBlur = 18;
        faceCtx.fillStyle = '#ffffff';

        let vScale = 1.0;
        if (isBlinking) {
          vScale = 1.0 - 0.9 * Math.sin(blinkProgress * Math.PI);
        }

        faceCtx.beginPath();
        faceCtx.ellipse(196, 262, 30, Math.max(3, 38 * vScale), 0, 0, Math.PI * 2);
        faceCtx.fill();

        faceCtx.beginPath();
        faceCtx.ellipse(316, 252, 30, Math.max(3, 38 * vScale), 0, 0, Math.PI * 2);
        faceCtx.fill();
        faceCtx.restore();
      }

      if (quoteAlpha > 0.0) {
        faceCtx.save();
        faceCtx.globalAlpha = quoteAlpha;
        faceCtx.shadowColor = '#ffffff';
        faceCtx.shadowBlur = 18;
        faceCtx.fillStyle = '#ffffff';
        faceCtx.font = '900 560px "Arial Black", sans-serif';
        faceCtx.textAlign = 'center';
        faceCtx.textBaseline = 'middle';
        faceCtx.fillText('“', 256, 360);
        faceCtx.restore();
      }

      faceTexture.needsUpdate = true;
    }

    // Pointer Tracking
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetX = Math.max(-1, Math.min(1, nx));
      targetY = Math.max(-1, Math.min(1, ny));
    };

    window.addEventListener('pointermove', onPointerMove);

    // Resize Observer
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 380;
      height = container.clientHeight || 450;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    const clock = new THREE.Clock();
    let animId = null;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const t = clock.getElapsedTime();

      // Smooth cursor lerp
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;

      renderFace(delta, t);

      // Idle subtle breathing
      const bob = Math.sin(1.4 * t) * 0.02;
      bodyGroup.position.y = bob;
      bodyGroup.rotation.y = -0.25 + curX * 0.22;

      headPivot.rotation.y = -0.35 + curX * 0.45;
      headPivot.rotation.x = 0.12 - curY * 0.22 + Math.sin(0.9 * t) * 0.02;
      headPivot.rotation.z = 0.14 + Math.sin(0.7 * t) * 0.015;

      armSegments.forEach(({ side, armRoot, forearmGroup }) => {
        armRoot.rotation.x = Math.sin(1.4 * t + side * 0.5) * 0.04;
        forearmGroup.rotation.x = -0.35 + Math.sin(1.4 * t) * 0.05;
      });

      // Camera stays positioned to show the entire robot + pedestal perfectly centered!
      camera.position.x = curX * 0.28;
      camera.position.y = -0.9 - curY * 0.18;
      camera.position.z = 9.8;
      camera.lookAt(0, -0.9, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      pmremGenerator.dispose();
      scene.clear();
    };
  }, [faceMode]);

  return (
    <section 
      id="archie-3d-robot"
      style={{
        position: 'relative',
        backgroundColor: '#fbfcfe',
        backgroundImage: `
          linear-gradient(to right, rgba(15, 23, 42, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(15, 23, 42, 0.04) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
        color: '#0f172a',
        padding: 'clamp(2.75rem, 5vh, 4rem) 1.25rem',
        overflow: 'hidden',
        borderTop: '1px solid rgba(0, 0, 0, 0.06)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
      }}
    >
      <div className="container" style={{ maxWidth: '1320px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* =========================================================================
            SPLIT MASTER LAYOUT:
            SIDE 1: Animated Dribbble Comparison Video Canvas (Cards 1 & 2 + CTAs)
            SIDE 2: Archie 3D Autonomous Robot on Pedestal
           ========================================================================= */}
        {/* Embedded responsive grid stylesheet */}
        <style>{`
          .archie-master-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            align-items: center;
          }
          @media (min-width: 1024px) {
            .archie-master-grid {
              grid-template-columns: 1.25fr 0.75fr;
              gap: 2.5rem;
            }
          }
          .archie-dual-cards {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          @media (min-width: 580px) {
            .archie-dual-cards {
              grid-template-columns: 1fr 1fr;
              gap: 1.15rem;
            }
          }
        `}</style>

        {/* =========================================================================
            SPLIT MASTER LAYOUT:
            SIDE 1: Animated Dribbble Comparison Video Canvas (Cards 1 & 2 + CTAs)
            SIDE 2: Archie 3D Autonomous Robot on Pedestal
           ========================================================================= */}
        <div className="archie-master-grid">

          {/* =======================================================================
              SIDE 1: THE ANIMATED COMPARISON (The ATPL Way vs Without ATPL)
             ======================================================================= */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            {/* Operational Accreditation Subhead */}
            <div style={{ marginBottom: '0.45rem', fontSize: '0.82rem', color: 'var(--color-brand-blue, #0071ba)', fontWeight: 600 }}>
              Operational benchmark verified across 250+ connected manufacturing plants
            </div>

            <h2 style={{
              fontSize: 'clamp(1.75rem, 2.7vw, 2.35rem)',
              fontWeight: 800,
              lineHeight: 1.18,
              letterSpacing: '-0.03em',
              color: 'var(--color-slate-900, #0f172a)',
              marginBottom: '0.45rem',
              fontFamily: 'var(--font-display, Inter, sans-serif)'
            }}>
              Why ATPL for <span style={{ color: 'var(--color-brand-blue, #0071ba)' }}>Factory Automation</span>
            </h2>

            <p style={{
              fontSize: 'clamp(0.86rem, 1.05vw, 0.96rem)',
              color: 'var(--color-slate-600, #475569)',
              lineHeight: 1.45,
              marginBottom: '1.25rem'
            }}>
              Direct engineering integration with in-house software, guaranteed &lt;4-hr SLAs, and native SAP/Oracle synchronization.
            </p>

            {/* The Dual Animated Video Cards Side-by-Side (Dribbble 25966614) */}
            <div className="archie-dual-cards">
              
              {/* Card 1: "The ATPL way" (Soft Pastel Sky-Blue with Floating Zero-Gravity Pills) */}
              <div style={{
                height: '410px',
                backgroundColor: '#ebf3fe',
                borderRadius: '24px',
                border: '1.5px solid rgba(0, 113, 186, 0.22)',
                boxShadow: '0 16px 36px rgba(0, 113, 186, 0.09)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {/* Centered Top Pill Header */}
                <div style={{
                  paddingTop: '0.95rem',
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 25
                }}>
                  <div style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(0, 113, 186, 0.15)',
                    boxShadow: '0 4px 12px rgba(0, 113, 186, 0.12)',
                    borderRadius: '999px',
                    padding: '0.32rem 1.05rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.80rem',
                    fontWeight: 800,
                    color: '#0f172a'
                  }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#0071ba' }}></span>
                    <span>The</span>
                    <span style={{ color: '#0071ba' }}>ATPL</span>
                    <span>way</span>
                  </div>
                </div>

                {/* Zero-Gravity Floating Pills Canvas - Staggered Interlocking Stack */}
                <div style={{
                  position: 'relative',
                  flex: 1,
                  width: '100%',
                  overflow: 'hidden'
                }}>
                  {atplPills.map((pill) => {
                    const isHovered = hoveredPill === pill.id;
                    return (
                      <motion.div
                        key={pill.id}
                        drag
                        dragConstraints={{ left: -30, right: 30, top: -25, bottom: 25 }}
                        dragElastic={0.25}
                        whileDrag={{ scale: 1.12, cursor: 'grabbing', zIndex: 45 }}
                        onHoverStart={() => {
                          setHoveredPill(pill.id);
                          if (!isMuted) playChime(587.33);
                        }}
                        onHoverEnd={() => setHoveredPill(null)}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        animate={isPlaying ? {
                          y: pill.floatY,
                          x: pill.floatX,
                          rotate: [pill.rot, pill.rot + 2, pill.rot - 2, pill.rot]
                        } : {
                          y: 0,
                          x: 0,
                          rotate: pill.rot
                        }}
                        transition={{
                          y: { duration: pill.dur, repeat: Infinity, ease: 'easeInOut', delay: pill.delay },
                          x: { duration: pill.dur * 1.15, repeat: Infinity, ease: 'easeInOut', delay: pill.delay },
                          rotate: { duration: pill.dur * 1.3, repeat: Infinity, ease: 'easeInOut', delay: pill.delay },
                          opacity: { duration: 0.3 }
                        }}
                        whileHover={{
                          scale: 1.08,
                          zIndex: 40,
                          boxShadow: '0 12px 28px rgba(0, 113, 186, 0.35)'
                        }}
                        style={{
                          position: 'absolute',
                          top: pill.top,
                          left: pill.left,
                          transform: 'translate(-50%, -50%)',
                          backgroundColor: pill.bg,
                          color: pill.color,
                          border: pill.border,
                          borderRadius: '999px',
                          padding: '0.38rem 0.86rem',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          letterSpacing: '-0.01em',
                          lineHeight: 1,
                          whiteSpace: 'nowrap',
                          boxShadow: isHovered 
                            ? '0 12px 28px rgba(0, 113, 186, 0.35)' 
                            : '0 4px 14px rgba(0, 113, 186, 0.1)',
                          cursor: 'grab',
                          userSelect: 'none',
                          zIndex: isHovered ? 35 : 10,
                          transformOrigin: 'center center'
                        }}
                      >
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                          <span style={{ 
                            width: '6px', 
                            height: '6px', 
                            borderRadius: '50%', 
                            backgroundColor: pill.color === '#ffffff' ? '#38bdf8' : '#0071ba',
                            boxShadow: `0 0 6px ${pill.color === '#ffffff' ? '#38bdf8' : '#0071ba'}`
                          }}></span>
                          <span>{pill.label}</span>
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Card 2: "Without ATPL" (CONTINUOUS WATERFALL RAIN OF PROBLEM BOXES) */}
              <div style={{
                height: '410px',
                backgroundColor: '#f8fafc',
                borderRadius: '24px',
                border: '1.5px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 12px 28px rgba(0, 0, 0, 0.04)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {/* Centered Top Pill Header */}
                <div style={{
                  paddingTop: '0.95rem',
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 25
                }}>
                  <div style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.04)',
                    borderRadius: '999px',
                    padding: '0.32rem 1.05rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.80rem',
                    fontWeight: 700,
                    color: '#64748b'
                  }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#ef4444' }}></span>
                    <span>Without ATPL</span>
                  </div>
                </div>

                {/* Faint Background Watermark */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  pointerEvents: 'none',
                  opacity: 0.22,
                  zIndex: 1
                }}>
                  <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#94a3b8' }}>
                    Non-Stop Issues, Production Delays
                  </div>
                </div>

                {/* CONTINUOUS FALLING RAIN OF BOXES CANVAS (Endless Waterfall) */}
                <div style={{
                  position: 'relative',
                  flex: 1,
                  width: '100%',
                  overflow: 'hidden',
                  zIndex: 2
                }}>
                  {rainingPills.map((pill) => (
                    <motion.div
                      key={pill.id}
                      animate={isPlaying ? {
                        y: [-80, 440],
                        rotate: [pill.rot - 6, pill.rot + 8],
                        opacity: [0, pill.depth === 1 ? 0.95 : 0.65, pill.depth === 1 ? 0.95 : 0.65, 0]
                      } : {
                        y: 180,
                        opacity: 0.8
                      }}
                      transition={{
                        y: { 
                          duration: pill.dur, 
                          repeat: Infinity, 
                          ease: 'linear', 
                          delay: pill.delay 
                        },
                        rotate: { 
                          duration: pill.dur, 
                          repeat: Infinity, 
                          ease: 'easeInOut', 
                          delay: pill.delay 
                        },
                        opacity: { 
                          duration: pill.dur, 
                          repeat: Infinity, 
                          times: [0, 0.1, 0.9, 1], 
                          delay: pill.delay 
                        }
                      }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: pill.left,
                        transform: 'translateX(-50%)',
                        backgroundColor: pill.bg,
                        color: pill.color,
                        border: pill.border,
                        borderRadius: '999px',
                        padding: '0.34rem 0.76rem',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        lineHeight: 1,
                        whiteSpace: 'nowrap',
                        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.05)',
                        userSelect: 'none',
                        pointerEvents: 'none',
                        willChange: 'transform, opacity',
                        filter: pill.depth === 0 ? 'blur(0.2px)' : 'none',
                        zIndex: pill.depth === 1 ? 5 : 2
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <span style={{ fontSize: '0.68rem', opacity: 0.65 }}>✕</span>
                        <span>{pill.label}</span>
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>

            {/* Dribbble Style Interactive Video Timeline & Player Controls */}
            <div style={{
              marginTop: '0.85rem',
              marginBottom: '1.35rem',
              padding: '0.55rem 0.95rem',
              backgroundColor: '#ffffff',
              borderRadius: '999px',
              border: '1.5px solid rgba(0, 113, 186, 0.16)',
              boxShadow: '0 8px 24px rgba(0, 113, 186, 0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              {/* Play / Pause Toggle Button */}
              <button
                type="button"
                onClick={() => {
                  setIsPlaying(!isPlaying);
                  if (!isMuted) playChime(isPlaying ? 440 : 659.25);
                }}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: isPlaying ? '#0071ba' : '#0f172a',
                  color: '#ffffff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0, 113, 186, 0.3)',
                  transition: 'all 0.15s ease',
                  flexShrink: 0
                }}
                title={isPlaying ? 'Pause simulation animation' : 'Resume simulation animation'}
              >
                {isPlaying ? <Pause size={13} /> : <Play size={13} style={{ marginLeft: '1px' }} />}
              </button>

              {/* Sound Chime Toggle Button */}
              <button
                type="button"
                onClick={() => {
                  setIsMuted(!isMuted);
                  if (isMuted) playChime(659.25);
                }}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: isMuted ? '#f1f5f9' : '#e0f2fe',
                  color: isMuted ? '#94a3b8' : '#0071ba',
                  border: '1px solid rgba(0, 113, 186, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  flexShrink: 0
                }}
                title={isMuted ? 'Turn Sound ON' : 'Turn Sound OFF'}
              >
                {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
              </button>

              {/* Interactive Scrubber Track Bar */}
              <div 
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newProgress = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
                  setProgress(Number(newProgress.toFixed(1)));
                  if (!isMuted) playChime(523.25 + (newProgress * 3));
                }}
                style={{
                  flex: 1,
                  height: '8px',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '999px',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                  border: '1px solid rgba(0, 0, 0, 0.05)'
                }}
                title="Click or scrub along the simulation timeline"
              >
                <div 
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #0071ba 0%, #00f0ff 60%, #ec4899 100%)',
                    borderRadius: '999px',
                    transition: isPlaying ? 'width 0.1s linear' : 'none'
                  }}
                />
              </div>

              {/* Live Timecode & Rewind */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono, monospace)',
                fontWeight: 700,
                color: '#64748b',
                flexShrink: 0
              }}>
                <span>{`00:${String(Math.floor((progress / 100) * 20)).padStart(2, '0')}`} / 00:20</span>
                <button
                  type="button"
                  onClick={() => {
                    setProgress(0);
                    if (!isMuted) playChime(523.25);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    padding: '2px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title="Rewind to 00:00"
                >
                  <RotateCcw size={11} />
                </button>
              </div>
            </div>

            {/* Conversion CTA Row & Trust Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <MagneticButton
                onClick={() => openDemoModal({ mode: 'engineer', solution: 'Vendor Feasibility & Architecture Audit', notes: 'Initiated from Comparison Section' })}
                style={{
                  backgroundColor: 'var(--color-brand-blue, #0071ba)',
                  color: 'var(--color-white, #ffffff)',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '0.75rem 1.8rem',
                  fontSize: '0.90rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  boxShadow: '0 6px 18px rgba(0, 113, 186, 0.35)',
                  transition: 'background-color 0.15s ease, transform 0.15s ease'
                }}
              >
                <span>Schedule Feasibility Audit</span>
              </MagneticButton>

              <MagneticButton
                onClick={() => window.location.href = 'tel:04435537618'}
                style={{
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  border: '1.5px solid rgba(0, 0, 0, 0.12)',
                  borderRadius: '999px',
                  padding: '0.75rem 1.35rem',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}
              >
                <PhoneCall size={14} color="#0071ba" />
                <span>Call: 044 3553 7618</span>
              </MagneticButton>
            </div>

            {/* Inline Proof Chips */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.15rem',
              flexWrap: 'wrap',
              fontSize: '0.78rem',
              color: '#64748b'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#334155', fontWeight: 600 }}>
                <CheckCircle2 size={13} color="#0071ba" /> 250+ Plants
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#334155', fontWeight: 600 }}>
                <CheckCircle2 size={13} color="#0071ba" /> &lt;4-Hr Emergency SLA
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#334155', fontWeight: 600 }}>
                <CheckCircle2 size={13} color="#0071ba" /> ISO 9001:2015
              </span>
            </div>

          </div>

          {/* =======================================================================
              SIDE 2: ARCHIE 3D AUTONOMOUS ROBOT (On The Other Side!)
             ======================================================================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              height: '460px',
              borderRadius: '24px',
              overflow: 'hidden',
              backgroundColor: '#0a1324',
              background: 'radial-gradient(circle at 50% 40%, #0d1e38 0%, #060c18 100%)',
              border: '1.5px solid rgba(0, 240, 255, 0.3)',
              boxShadow: '0 20px 48px rgba(0, 0, 0, 0.28), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* 3D Canvas Box */}
            <div 
              ref={containerRef}
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                cursor: 'grab'
              }}
            >
              <canvas 
                ref={canvasRef} 
                aria-label="Interactive 3D Shopfloor Agent model" 
                role="img" 
                style={{ width: '100%', height: '100%', display: 'block' }} 
              />

              {/* Status Header Badge */}
              <div style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                backgroundColor: 'rgba(6, 11, 20, 0.88)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(0, 240, 255, 0.35)',
                padding: '0.28rem 0.72rem',
                borderRadius: '999px',
                fontSize: '0.72rem',
                color: 'var(--color-brand-cyan, #00f0ff)',
                fontFamily: 'var(--font-mono, monospace)',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                zIndex: 2
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-brand-cyan, #00f0ff)', boxShadow: '0 0 6px #00f0ff' }}></span>
                <Bot size={12} color="#00f0ff" />
                <span>Archie 3D Shopfloor Agent</span>
              </div>

              {/* Face Mode Switcher Button */}
              <button
                type="button"
                onClick={() => setFaceMode(m => m === 'EYES' ? 'QUOTE' : 'EYES')}
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  backgroundColor: 'rgba(6, 11, 20, 0.88)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.22)',
                  padding: '0.28rem 0.72rem',
                  borderRadius: '999px',
                  fontSize: '0.72rem',
                  color: 'var(--color-slate-200, #e2e8f0)',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  zIndex: 2,
                  transition: 'background-color 0.15s ease, border-color 0.15s ease'
                }}
                title="Toggle robot face between blinking eyes and quote mark"
              >
                Face: {faceMode === 'EYES' ? 'Eyes ••' : 'Quote “'}
              </button>

              {/* Bottom Interactive Tracker Pill */}
              <div style={{
                position: 'absolute',
                bottom: '14px',
                left: '14px',
                backgroundColor: 'rgba(6, 11, 20, 0.88)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                padding: '0.28rem 0.72rem',
                borderRadius: '999px',
                fontSize: '0.70rem',
                color: 'var(--color-slate-400, #94a3b8)',
                fontFamily: 'var(--font-mono, monospace)',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                whiteSpace: 'nowrap',
                zIndex: 2
              }}>
                <Sparkles size={12} color="#00f0ff" />
                <span>Tracking Cursor</span>
              </div>

              {/* Fullscreen Nova Landing Page Shortcut */}
              <a
                href="/nova-agent.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  position: 'absolute',
                  bottom: '14px',
                  right: '14px',
                  backgroundColor: 'rgba(6, 11, 20, 0.88)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(0, 240, 255, 0.35)',
                  padding: '0.28rem 0.72rem',
                  borderRadius: '999px',
                  fontSize: '0.70rem',
                  color: '#00f0ff',
                  fontFamily: 'var(--font-mono, monospace)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontWeight: 700,
                  zIndex: 2,
                  transition: 'all 0.15s ease'
                }}
                title="View full standalone 3D experience"
              >
                <span>Console</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
