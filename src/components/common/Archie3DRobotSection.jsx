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
  // Centered within safe 43%-57% horizontal corridor: NEVER CLIPS OR OVERFLOWS!
  // =========================================================================
  const atplPills = [
    {
      id: 'p0',
      label: 'Live Real-Time Sync',
      bg: '#ffffff',
      color: '#0f172a',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      top: '10%',
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
      top: '20%',
      left: '46%',
      rot: -3,
      floatY: [-5, 5, -5],
      floatX: [-2, 2, -2],
      dur: 3.8,
      delay: 0.15
    },
    {
      id: 'p2',
      label: '<4-Hr Emergency SLA',
      bg: '#0071ba', // royal electric blue
      color: '#ffffff',
      border: '1px solid rgba(0, 113, 186, 0.3)',
      top: '30%',
      left: '54%',
      rot: 3,
      floatY: [-5, 5, -5],
      floatX: [2, -2, 2],
      dur: 4.2,
      delay: 0.3
    },
    {
      id: 'p3',
      label: '100% In-House WMS',
      bg: '#111827', // dark slate
      color: '#ffffff',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      top: '40%',
      left: '45%',
      rot: -2,
      floatY: [-6, 4, -6],
      floatX: [2, -2, 2],
      dur: 4.5,
      delay: 0.25
    },
    {
      id: 'p4',
      label: 'Zero Scanner Tax',
      bg: '#ffffff', // clean white
      color: '#0f172a',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      top: '50%',
      left: '55%',
      rot: 3,
      floatY: [-4, 5, -4],
      floatX: [-2, 2, -2],
      dur: 3.5,
      delay: 0.45
    },
    {
      id: 'p5',
      label: 'Resident Engineers',
      bg: '#0284c7', // vibrant cyan/sky blue
      color: '#ffffff',
      border: '1px solid rgba(2, 132, 199, 0.3)',
      top: '60%',
      left: '46%',
      rot: -3,
      floatY: [-4, 5, -4],
      floatX: [-2, 2, -2],
      dur: 3.6,
      delay: 0.4
    },
    {
      id: 'p6',
      label: 'IP67 Harsh Grade',
      bg: '#0f172a', // dark slate
      color: '#ffffff',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      top: '70%',
      left: '54%',
      rot: 3,
      floatY: [-5, 5, -5],
      floatX: [-2, 2, -2],
      dur: 3.9,
      delay: 0.35
    },
    {
      id: 'p7',
      label: 'Lab Golden-Staged',
      bg: '#ffffff', // clean white
      color: '#0f172a',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      top: '80%',
      left: '46%',
      rot: -2,
      floatY: [-4, 4, -4],
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
      top: '90%',
      left: '52%',
      rot: 2,
      floatY: [-5, 4, -5],
      floatX: [2, -2, 2],
      dur: 4.3,
      delay: 0.2
    }
  ];

  // =========================================================================
  // Without ATPL - Continuous Heavy Rain of Problem Boxes (Top to Bottom)
  // Safely constrained between 26% and 66% so no box ever clips against edges!
  // =========================================================================
  const rainingPills = [
    { id: 'r0', label: 'Delayed Reports', bg: '#e2e8f0', color: '#1e293b', border: '1px solid #cbd5e1', left: '26%', rot: -7, dur: 3.4, delay: 0.0, depth: 1 },
    { id: 'r1', label: 'Random Firmware', bg: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0', left: '50%', rot: 8, dur: 4.1, delay: 0.25, depth: 0 },
    { id: 'r2', label: 'Unorganized IT', bg: '#e2e8f0', color: '#1e293b', border: '1px solid #cbd5e1', left: '36%', rot: -6, dur: 3.5, delay: 0.5, depth: 1 },
    { id: 'r3', label: 'Overwhelming Bugs', bg: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0', left: '64%', rot: 5, dur: 4.2, delay: 0.75, depth: 0 },
    { id: 'r4', label: 'Vendor Spam', bg: '#e2e8f0', color: '#1e293b', border: '1px solid #cbd5e1', left: '24%', rot: -9, dur: 3.6, delay: 1.0, depth: 1 },
    { id: 'r5', label: '3 to 7 Days Delay', bg: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', left: '58%', rot: 7, dur: 3.9, delay: 1.25, depth: 1 },
    { id: 'r6', label: 'Broken CSV Drops', bg: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0', left: '40%', rot: -11, dur: 4.4, delay: 1.5, depth: 0 },
    { id: 'r7', label: 'Costly Lock-In', bg: '#e2e8f0', color: '#1e293b', border: '1px solid #cbd5e1', left: '66%', rot: -4, dur: 3.7, delay: 1.75, depth: 1 },
    { id: 'r8', label: 'Hardware Burnout', bg: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', left: '30%', rot: 6, dur: 4.0, delay: 2.0, depth: 0 },
    { id: 'r9', label: 'Line Standstills', bg: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', left: '54%', rot: 4, dur: 3.5, delay: 2.25, depth: 1 },
    { id: 'r10', label: 'Drop-Ship Boxes', bg: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0', left: '34%', rot: -8, dur: 4.3, delay: 2.5, depth: 0 },
    { id: 'r11', label: 'Zero SLA Support', bg: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', left: '62%', rot: 6, dur: 3.8, delay: 2.75, depth: 1 },
    { id: 'r12', label: 'Manual Scans', bg: '#e2e8f0', color: '#1e293b', border: '1px solid #cbd5e1', left: '26%', rot: -5, dur: 4.1, delay: 3.0, depth: 1 },
    { id: 'r13', label: 'Uncertified Cables', bg: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0', left: '46%', rot: 10, dur: 3.6, delay: 3.25, depth: 0 },
    { id: 'r14', label: 'Inventory Drift', bg: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', left: '65%', rot: -6, dur: 4.2, delay: 3.5, depth: 1 },
    { id: 'r15', label: 'Disjointed Middleware', bg: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0', left: '38%', rot: 5, dur: 3.7, delay: 3.75, depth: 0 }
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
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x0f172a, 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0x00f0ff, 1.5);
    keyLight.position.set(-3, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.6);
    rimLight.position.set(4, 2, -3);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0x0071ba, 2.2, 8);
    fillLight.position.set(0, -0.8, 3.5);
    scene.add(fillLight);

    // =========================================================================
    // Authentic ATPL Archery Chest Arc Reactor Canvas Texture
    // =========================================================================
    const arcCanvas = document.createElement('canvas');
    arcCanvas.width = 512;
    arcCanvas.height = 512;
    const arcCtx = arcCanvas.getContext('2d');

    // Outer dark titanium base
    arcCtx.fillStyle = '#0a0f1d';
    arcCtx.beginPath();
    arcCtx.arc(256, 256, 250, 0, Math.PI * 2);
    arcCtx.fill();

    // Glowing Cyan Core Ring
    arcCtx.lineWidth = 26;
    arcCtx.strokeStyle = '#00f0ff';
    arcCtx.shadowColor = '#00f0ff';
    arcCtx.shadowBlur = 32;
    arcCtx.beginPath();
    arcCtx.arc(256, 256, 205, 0, Math.PI * 2);
    arcCtx.stroke();

    // Segmented Power Cell notches around ring
    arcCtx.shadowBlur = 0;
    arcCtx.fillStyle = '#060a14';
    for (let i = 0; i < 16; i++) {
      const angle = (i * Math.PI * 2) / 16;
      arcCtx.save();
      arcCtx.translate(256, 256);
      arcCtx.rotate(angle);
      arcCtx.fillRect(185, -6, 44, 12);
      arcCtx.restore();
    }

    // Inner Luminous White/Cyan Disc
    arcCtx.shadowBlur = 24;
    arcCtx.shadowColor = '#00f0ff';
    arcCtx.fillStyle = '#ffffff';
    arcCtx.beginPath();
    arcCtx.arc(256, 256, 160, 0, Math.PI * 2);
    arcCtx.fill();

    // Official ATPL Archery Logo Arrowhead + Bow Emblem
    arcCtx.shadowBlur = 0;
    // Cyan Arrowhead
    arcCtx.fillStyle = '#0071ba';
    arcCtx.beginPath();
    arcCtx.moveTo(256, 145);
    arcCtx.lineTo(306, 238);
    arcCtx.lineTo(265, 230);
    arcCtx.lineTo(256, 355);
    arcCtx.lineTo(247, 230);
    arcCtx.lineTo(206, 238);
    arcCtx.closePath();
    arcCtx.fill();

    // Red Bow Curve
    arcCtx.lineWidth = 14;
    arcCtx.strokeStyle = '#e11d48';
    arcCtx.beginPath();
    arcCtx.arc(256, 260, 78, -Math.PI * 0.78, Math.PI * 0.08);
    arcCtx.stroke();

    const arcTexture = new THREE.CanvasTexture(arcCanvas);
    arcTexture.colorSpace = THREE.SRGBColorSpace;

    // =========================================================================
    // Screen Canvas for Face (Iconic Archie Glowing Circular Cyan Eyes)
    // =========================================================================
    const faceCanvas = document.createElement('canvas');
    faceCanvas.width = 512;
    faceCanvas.height = 512;
    const faceCtx = faceCanvas.getContext('2d');
    const faceTexture = new THREE.CanvasTexture(faceCanvas);
    faceTexture.colorSpace = THREE.SRGBColorSpace;

    // Materials matching official ATPL Archie mascot
    const pearlWhiteMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.18,
      metalness: 0.05,
      clearcoat: 0.95,
      clearcoatRoughness: 0.1
    });

    const darkVisorMat = new THREE.MeshPhysicalMaterial({
      color: 0x05070e,
      roughness: 0.08,
      metalness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      emissive: 0xffffff,
      emissiveMap: faceTexture,
      emissiveIntensity: 1.85
    });

    const cyberJointMat = new THREE.MeshStandardMaterial({
      color: 0x181c26,
      roughness: 0.45,
      metalness: 0.75
    });

    const cyanGlowMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 3.2,
      roughness: 0.2
    });

    const arcMat = new THREE.MeshStandardMaterial({
      map: arcTexture,
      emissive: 0xffffff,
      emissiveMap: arcTexture,
      emissiveIntensity: 0.85,
      roughness: 0.3
    });

    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x0b1324,
      roughness: 0.8,
      metalness: 0.2
    });

    // =========================================================================
    // Assemble Official Archie Mascot Robot Hierarchy
    // =========================================================================
    const robotRoot = new THREE.Group();
    scene.add(robotRoot);

    const bodyGroup = new THREE.Group();
    robotRoot.add(bodyGroup);

    // Torso (Smooth Aerodynamic Egg Body)
    const torsoMesh = new THREE.Mesh(new THREE.SphereGeometry(1.18, 48, 36), pearlWhiteMat);
    torsoMesh.scale.set(1.06, 1.25, 0.95);
    torsoMesh.position.set(0, -0.72, 0);
    torsoMesh.castShadow = true;
    torsoMesh.receiveShadow = true;
    bodyGroup.add(torsoMesh);

    // Chest Arc Reactor Bezel (Titanium Ring)
    const arcBezel = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.44, 0.06, 36), cyberJointMat);
    arcBezel.rotation.x = Math.PI / 2 + 0.12;
    arcBezel.position.set(0, -0.58, 0.92);
    bodyGroup.add(arcBezel);

    // Chest Arc Reactor Center Disc
    const arcMedallion = new THREE.Mesh(new THREE.CylinderGeometry(0.40, 0.40, 0.08, 36), arcMat);
    arcMedallion.rotation.x = Math.PI / 2 + 0.12;
    arcMedallion.position.set(0, -0.58, 0.95);
    bodyGroup.add(arcMedallion);

    // Arc Reactor Light (Casting glowing cyan reflection onto body and arms)
    const arcLight = new THREE.PointLight(0x00f0ff, 1.2, 3.5);
    arcLight.position.set(0, -0.58, 1.15);
    bodyGroup.add(arcLight);

    // Lower Waist Cyber-Joint
    const waistJoint = new THREE.Mesh(new THREE.SphereGeometry(0.72, 24, 24), cyberJointMat);
    waistJoint.scale.set(1.0, 0.4, 1.0);
    waistJoint.position.set(0, -1.35, 0);
    bodyGroup.add(waistJoint);

    // Neck Cyber-Joint
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.28, 32), cyberJointMat);
    neck.position.set(0, 0.06, 0);
    bodyGroup.add(neck);

    // Head Pivot & Head Group
    const headPivot = new THREE.Group();
    headPivot.position.set(0, 0.22, 0);
    bodyGroup.add(headPivot);

    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.72, 0);
    headPivot.add(headGroup);

    // Helmet Shell (Sleek Glossy Pearl White Curved Helmet)
    const helmet = new THREE.Mesh(new THREE.SphereGeometry(1.22, 48, 36), pearlWhiteMat);
    helmet.scale.set(1.22, 0.96, 0.94);
    helmet.castShadow = true;
    helmet.receiveShadow = true;
    headGroup.add(helmet);

    // Front Inset Dark Glass Visor Screen
    const visor = new THREE.Mesh(new THREE.SphereGeometry(1.02, 40, 28), darkVisorMat);
    visor.scale.set(1.10, 0.78, 0.44);
    visor.position.set(0, 0, 0.62);
    headGroup.add(visor);

    // Side Ear Pods with Glowing Cyan LED Rings
    [-1.22, 1.22].forEach(xSide => {
      const earBase = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.10, 32), cyberJointMat);
      earBase.rotation.z = Math.PI / 2;
      earBase.position.set(xSide, 0, 0);
      headGroup.add(earBase);

      const earRing = new THREE.Mesh(new THREE.TorusGeometry(0.20, 0.035, 16, 32), cyanGlowMat);
      earRing.rotation.y = Math.PI / 2;
      earRing.position.set(xSide + (xSide > 0 ? 0.06 : -0.06), 0, 0);
      headGroup.add(earRing);
    });

    // Articulated Arms (Matching Archie Mascot)
    const armSegments = [];
    [-1, 1].forEach(side => {
      const armRoot = new THREE.Group();
      armRoot.position.set(side * 0.94, -0.42, 0);
      bodyGroup.add(armRoot);

      // White shoulder bell cap
      const shoulderCap = new THREE.Mesh(new THREE.SphereGeometry(0.26, 24, 24), pearlWhiteMat);
      shoulderCap.position.set(0, 0.04, 0);
      armRoot.add(shoulderCap);

      // Cyber shoulder ball joint
      const shoulderJoint = new THREE.Mesh(new THREE.SphereGeometry(0.16, 20, 20), cyberJointMat);
      armRoot.add(shoulderJoint);
      armRoot.rotation.z = side * 0.18;

      // Upper arm pod
      const upperArm = new THREE.Mesh(new RoundedBoxGeometry(0.24, 0.46, 0.24, 3, 0.08), pearlWhiteMat);
      upperArm.position.set(0, -0.28, 0);
      armRoot.add(upperArm);

      // Elbow joint
      const elbow = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 16), cyberJointMat);
      elbow.position.set(0, -0.56, 0);
      armRoot.add(elbow);

      // Forearm group
      const forearmGroup = new THREE.Group();
      forearmGroup.position.set(0, -0.56, 0);
      forearmGroup.rotation.x = -0.32;
      armRoot.add(forearmGroup);

      const forearm = new THREE.Mesh(new RoundedBoxGeometry(0.22, 0.42, 0.22, 3, 0.07), pearlWhiteMat);
      forearm.position.set(0, -0.24, 0);
      forearmGroup.add(forearm);

      // Dark mechanical articulated hands with curled fingers
      const handBase = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), cyberJointMat);
      handBase.position.set(0, -0.48, 0);
      forearmGroup.add(handBase);

      // 3 Articulated robotic finger nodes
      [-0.05, 0, 0.05].forEach((fX, idx) => {
        const finger = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.02, 0.14, 12), cyberJointMat);
        finger.position.set(fX, -0.56, 0.04);
        finger.rotation.x = 0.4;
        forearmGroup.add(finger);
      });

      armSegments.push({ side, armRoot, forearmGroup });
    });

    // High-Tech Cyber Pedestal with Glowing Concentric Circuit Rings
    const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(1.65, 1.8, 1.4, 48), pedestalMat);
    pedestal.position.set(0, -2.55, 0);
    pedestal.receiveShadow = true;
    robotRoot.add(pedestal);

    // Glowing Cyan Concentric Rings on Pedestal Top
    const glowRing1 = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.035, 16, 48), cyanGlowMat);
    glowRing1.rotation.x = Math.PI / 2;
    glowRing1.position.set(0, -1.82, 0);
    robotRoot.add(glowRing1);

    const glowRing2 = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.025, 16, 48), cyanGlowMat);
    glowRing2.rotation.x = Math.PI / 2;
    glowRing2.position.set(0, -1.82, 0);
    robotRoot.add(glowRing2);

    // Initial Body & Head Stance
    bodyGroup.rotation.y = -0.15;
    headPivot.rotation.set(0.08, -0.22, 0.05);

    // Face rendering state
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

      faceCtx.fillStyle = '#05070e';
      faceCtx.fillRect(0, 0, 512, 512);

      let vScale = 1.0;
      if (isBlinking) {
        vScale = 1.0 - 0.92 * Math.sin(blinkProgress * Math.PI);
      }

      // Smooth eye gaze tracking with cursor
      const eyeOffsetX = curX * 28;
      const eyeOffsetY = -curY * 18;

      faceCtx.save();
      faceCtx.shadowColor = '#00f0ff';
      faceCtx.shadowBlur = 24;
      faceCtx.fillStyle = '#00f0ff';

      if (faceMode === 'HAPPY') {
        // Happy crescent smile eyes ^ ^
        faceCtx.lineWidth = 16;
        faceCtx.strokeStyle = '#00f0ff';
        faceCtx.beginPath();
        faceCtx.arc(180 + eyeOffsetX, 260 + eyeOffsetY, 36, Math.PI * 1.15, Math.PI * 1.85);
        faceCtx.stroke();
        faceCtx.beginPath();
        faceCtx.arc(332 + eyeOffsetX, 260 + eyeOffsetY, 36, Math.PI * 1.15, Math.PI * 1.85);
        faceCtx.stroke();
      } else if (faceMode === 'QUOTE') {
        // Futuristic quote / shopfloor stats
        faceCtx.fillStyle = '#00f0ff';
        faceCtx.font = '700 32px "Courier New", monospace';
        faceCtx.textAlign = 'center';
        faceCtx.fillText('ATPL 24/7', 256, 230);
        faceCtx.font = '600 24px sans-serif';
        faceCtx.fillStyle = '#ffffff';
        faceCtx.fillText('ZERO LINE DOWNTIME', 256, 275);
      } else {
        // Standard Archie Glowing Circular/Capsule Cyan Eyes (Matching official logo robot)
        faceCtx.beginPath();
        faceCtx.ellipse(182 + eyeOffsetX, 256 + eyeOffsetY, 40, Math.max(3, 40 * vScale), 0, 0, Math.PI * 2);
        faceCtx.fill();

        faceCtx.beginPath();
        faceCtx.ellipse(330 + eyeOffsetX, 256 + eyeOffsetY, 40, Math.max(3, 40 * vScale), 0, 0, Math.PI * 2);
        faceCtx.fill();

        // Inner glowing core highlight
        faceCtx.fillStyle = '#ffffff';
        faceCtx.beginPath();
        faceCtx.ellipse(182 + eyeOffsetX, 256 + eyeOffsetY, 20, Math.max(2, 20 * vScale), 0, 0, Math.PI * 2);
        faceCtx.fill();
        faceCtx.beginPath();
        faceCtx.ellipse(330 + eyeOffsetX, 256 + eyeOffsetY, 20, Math.max(2, 20 * vScale), 0, 0, Math.PI * 2);
        faceCtx.fill();
      }

      faceCtx.restore();
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

      // Idle hovering bob
      const bob = Math.sin(1.8 * t) * 0.04;
      bodyGroup.position.y = -0.05 + bob;
      bodyGroup.rotation.y = -0.15 + curX * 0.22;

      // Head cursor tracking
      headPivot.rotation.y = -0.2 + curX * 0.45;
      headPivot.rotation.x = 0.08 - curY * 0.28 + Math.sin(0.9 * t) * 0.02;
      headPivot.rotation.z = 0.04 + Math.sin(0.7 * t) * 0.015;

      armSegments.forEach(({ side, armRoot, forearmGroup }) => {
        armRoot.rotation.x = Math.sin(1.8 * t + side * 0.5) * 0.04;
        forearmGroup.rotation.x = -0.32 + Math.sin(1.8 * t) * 0.04;
      });

      // Arc reactor gentle pulse
      if (arcMat) {
        arcMat.emissiveIntensity = 0.8 + Math.sin(3.0 * t) * 0.2;
      }

      // Camera smoothly tracks to keep Archie centered
      camera.position.x = curX * 0.22;
      camera.position.y = -0.8 - curY * 0.15;
      camera.position.z = 9.2;
      camera.lookAt(0, -0.8, 0);

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
              grid-template-columns: 1.35fr 0.65fr;
              gap: 2.2rem;
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
            
            {/* Top Badge & Header */}
            <div style={{ marginBottom: '0.65rem' }}>
              <ShineBadge variant="cyan">
                ENTERPRISE COMPARISON • 250+ LIVE FACTORIES
              </ShineBadge>
            </div>

            <h2 style={{
              fontSize: 'clamp(1.75rem, 2.7vw, 2.35rem)',
              fontWeight: 800,
              lineHeight: 1.18,
              letterSpacing: '-0.03em',
              color: '#0f172a',
              marginBottom: '0.45rem',
              fontFamily: 'var(--font-display, Inter, sans-serif)'
            }}>
              Why ATPL for <span style={{ color: '#0071ba' }}>Factory Automation</span>
            </h2>

            <p style={{
              fontSize: 'clamp(0.86rem, 1.05vw, 0.96rem)',
              color: '#64748b',
              lineHeight: 1.45,
              marginBottom: '1.25rem'
            }}>
              A targeted engineering strategy using in-house software, guaranteed &lt;4-hr SLAs, and direct SAP/Oracle sync.
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
                  <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Non-Stop Issues • Raining Delays
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
                  backgroundColor: '#0071ba',
                  color: '#ffffff',
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
                  transition: 'all 0.15s ease'
                }}
              >
                <span>Schedule Feasibility Audit</span>
                <ArrowRight size={15} />
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
              <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />

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
                color: '#00f0ff',
                fontFamily: 'var(--font-mono, monospace)',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                zIndex: 2
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#00f0ff', boxShadow: '0 0 6px #00f0ff' }}></span>
                <Bot size={12} color="#00f0ff" />
                <span>ARCHIE AI • ATPL MASCOT</span>
              </div>

              {/* Face Mode Switcher Button */}
              <button
                type="button"
                onClick={() => {
                  setFaceMode(m => m === 'EYES' ? 'HAPPY' : m === 'HAPPY' ? 'QUOTE' : 'EYES');
                  playChime(659.25);
                }}
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  backgroundColor: 'rgba(6, 11, 20, 0.88)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(0, 240, 255, 0.3)',
                  padding: '0.28rem 0.72rem',
                  borderRadius: '999px',
                  fontSize: '0.72rem',
                  color: '#00f0ff',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  zIndex: 2,
                  transition: 'all 0.15s ease'
                }}
                title="Toggle robot face between blinking eyes, happy smile, and ATPL HUD"
              >
                Face: {faceMode === 'EYES' ? 'Eyes ••' : faceMode === 'HAPPY' ? 'Happy ^^' : 'HUD 24/7'}
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
                color: '#94a3b8',
                fontFamily: 'var(--font-mono, monospace)',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                whiteSpace: 'nowrap',
                zIndex: 2
              }}>
                <Sparkles size={12} color="#00f0ff" />
                <span>Tracking Cursor • Archie</span>
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
