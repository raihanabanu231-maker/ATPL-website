/**
 * ATPL GROUP - REALISTIC INDUSTRIAL AI ROBOT GUIDE ("ATPL BOT")
 * Features glossy white and ATPL corporate blue chassis, articulated pointer arms, and speech narration.
 */

class ATPLRobotGuide {
  constructor(factoryScene) {
    this.factoryScene = factoryScene;
    this.robotMesh = null;
    this.visor = null;
    this.leftArm = null;
    this.rightArm = null;
    this.thrusterGlow = null;

    // Movement state
    this.targetPos = new THREE.Vector3(-26, 6, 20);
    this.currentPos = new THREE.Vector3(-26, 6, 20);
    this.targetRotationY = 0;
    this.floatOffset = 0;

    // Speech & Narration
    this.speechSynth = window.speechSynthesis || null;
    this.isMuted = false;
    this.isSpeaking = false;
    this.typingTimer = null;

    // UI Elements
    this.dialoguePanel = document.querySelector('.robot-dialogue-panel');
    this.messageElement = document.querySelector('.robot-message-text');
    this.audioWave = document.querySelector('.audio-wave-anim');

    this.initRobotMesh();
  }

  createAtplChestTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Background circle
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

    // Crosshair circle
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(0, 113, 186, 0.25)';
    ctx.beginPath();
    ctx.arc(256, 256, 175, 0, Math.PI * 2);
    ctx.stroke();

    // Draw ATPL Logo
    ctx.save();
    ctx.translate(136, 115);
    ctx.scale(2.5, 2.5);

    // 1. Top Blue Facet
    ctx.fillStyle = '#29A2E1';
    ctx.beginPath();
    ctx.moveTo(22, 10.5);
    ctx.lineTo(38, 43);
    ctx.lineTo(0, 58);
    ctx.closePath();
    ctx.fill();

    // 2. Middle Teal Accent
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
  }

  initRobotMesh() {
    this.robotMesh = new THREE.Group();

    // High-finish Industrial Materials
    const chassisWhite = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.12,
      metalness: 0.4
    });
    const darkSlate = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.3,
      metalness: 0.85
    });
    const coralTrim = new THREE.MeshStandardMaterial({
      color: 0xE85874,
      emissive: 0xE85874,
      emissiveIntensity: 0.6
    });

    // 1. Head Group
    this.headGroup = new THREE.Group();
    this.headGroup.position.set(0, 0.9, 0);

    const headGeo = new THREE.SphereGeometry(0.85, 32, 28);
    headGeo.scale(1.08, 0.95, 1.02);
    const headMesh = new THREE.Mesh(headGeo, chassisWhite);
    headMesh.castShadow = true;
    this.headGroup.add(headMesh);

    // Dark Curved Visor Screen
    const visorGeo = new THREE.SphereGeometry(0.78, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.45);
    const visorMat = new THREE.MeshStandardMaterial({ color: 0x050a14, roughness: 0.1, metalness: 0.9 });
    this.visor = new THREE.Mesh(visorGeo, visorMat);
    this.visor.position.set(0, 0.04, 0.44);
    this.headGroup.add(this.visor);

    // Glowing Cyan Pill Eyes
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const eye1 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.14, 16), eyeMat);
    eye1.rotation.z = Math.PI / 2;
    eye1.position.set(-0.26, 0.1, 0.76);
    this.headGroup.add(eye1);

    const eye2 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.14, 16), eyeMat);
    eye2.rotation.z = Math.PI / 2;
    eye2.position.set(0.26, 0.1, 0.76);
    this.headGroup.add(eye2);

    // Ear Pods with Coral Accents
    const ear1 = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.1, 24), darkSlate);
    ear1.rotation.z = Math.PI / 2;
    ear1.position.set(-0.88, 0.04, 0);
    this.headGroup.add(ear1);
    const earRing1 = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.03, 8, 24), coralTrim);
    earRing1.rotation.y = Math.PI / 2;
    earRing1.position.set(-0.92, 0.04, 0);
    this.headGroup.add(earRing1);

    const ear2 = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.1, 24), darkSlate);
    ear2.rotation.z = Math.PI / 2;
    ear2.position.set(0.88, 0.04, 0);
    this.headGroup.add(ear2);
    const earRing2 = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.03, 8, 24), coralTrim);
    earRing2.rotation.y = Math.PI / 2;
    earRing2.position.set(0.92, 0.04, 0);
    this.headGroup.add(earRing2);

    this.robotMesh.add(this.headGroup);

    // Neck Collar
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.4, 0.2, 24), darkSlate);
    neck.position.set(0, 0.16, 0);
    this.robotMesh.add(neck);

    // 2. Torso Body (Glossy White Capsule)
    const torsoGeo = new THREE.SphereGeometry(0.92, 32, 28);
    torsoGeo.scale(0.96, 1.15, 0.95);
    const body = new THREE.Mesh(torsoGeo, chassisWhite);
    body.position.set(0, -0.45, 0);
    body.castShadow = true;
    this.robotMesh.add(body);

    // 3. ATPL ARCHERY LOGO IN CENTER OF CHEST
    const logoTexture = this.createAtplChestTexture();
    const chestGroup = new THREE.Group();
    chestGroup.position.set(0, -0.28, 0.82);

    const bezelRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.4, 0.035, 16, 32),
      new THREE.MeshStandardMaterial({ color: 0x0071ba, metalness: 0.8, emissive: 0x0071ba, emissiveIntensity: 0.3 })
    );
    bezelRing.rotation.x = 0.14;
    chestGroup.add(bezelRing);

    const logoDisc = new THREE.Mesh(
      new THREE.CylinderGeometry(0.39, 0.39, 0.03, 32),
      new THREE.MeshStandardMaterial({ map: logoTexture, roughness: 0.15, metalness: 0.5 })
    );
    logoDisc.rotation.x = Math.PI / 2 + 0.14;
    chestGroup.add(logoDisc);

    this.robotMesh.add(chestGroup);

    // 4. Articulated Arms
    this.leftArm = new THREE.Group();
    this.leftArm.position.set(-1.05, -0.3, 0);
    const shoulder1 = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), chassisWhite);
    this.leftArm.add(shoulder1);
    const bicep1 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.45, 12), darkSlate);
    bicep1.position.set(-0.08, -0.32, 0);
    this.leftArm.add(bicep1);
    const forearm1 = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.09, 0.4, 12), chassisWhite);
    forearm1.position.set(-0.08, -0.75, 0.05);
    this.leftArm.add(forearm1);
    const hand1 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.16, 0.1), darkSlate);
    hand1.position.set(-0.08, -1.02, 0.08);
    this.leftArm.add(hand1);
    this.robotMesh.add(this.leftArm);

    this.rightArm = new THREE.Group();
    this.rightArm.position.set(1.05, -0.3, 0);
    const shoulder2 = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), chassisWhite);
    this.rightArm.add(shoulder2);
    const bicep2 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.45, 12), darkSlate);
    bicep2.position.set(0.08, -0.32, 0.1);
    this.rightArm.add(bicep2);
    const forearm2 = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.09, 0.4, 12), chassisWhite);
    forearm2.position.set(0.08, -0.75, 0.35);
    this.rightArm.add(forearm2);
    const hand2 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.16, 0.1), darkSlate);
    hand2.position.set(0.08, -1.02, 0.52);
    this.rightArm.add(hand2);
    this.robotMesh.add(this.rightArm);

    // 5. Hover Thruster Base & Flame
    const thrusterRing = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.16, 0.3, 24), darkSlate);
    thrusterRing.position.set(0, -1.4, 0);
    this.robotMesh.add(thrusterRing);

    const flameGeo = new THREE.ConeGeometry(0.26, 0.7, 16);
    this.thrusterGlow = new THREE.Mesh(
      flameGeo,
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.88 })
    );
    this.thrusterGlow.rotation.x = Math.PI;
    this.thrusterGlow.position.set(0, -1.75, 0);
    this.robotMesh.add(this.thrusterGlow);

    // Initial position
    this.robotMesh.position.copy(this.currentPos);
    this.factoryScene.scene.add(this.robotMesh);
  }

  moveToStation(stationIndex) {
    if (!window.ATPL_STATIONS_DATA || !window.ATPL_STATIONS_DATA[stationIndex]) return;
    const data = window.ATPL_STATIONS_DATA[stationIndex];

    this.targetPos.set(data.robotPosition.x, data.robotPosition.y, data.robotPosition.z);

    // Point towards machine center
    const dx = data.stationCoordinates.x - data.robotPosition.x;
    const dz = data.stationCoordinates.z - data.robotPosition.z;
    this.targetRotationY = Math.atan2(dx, dz);

    // Speak station narrative
    this.narrate(data.robotGreeting);
  }

  narrate(text) {
    if (this.messageElement) {
      this.typeMessage(text);
    }

    if (!this.isMuted && this.speechSynth) {
      try {
        this.speechSynth.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.05;
        utterance.pitch = 1.1;

        const voices = this.speechSynth.getVoices();
        const enVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('David') || v.name.includes('Samantha')));
        if (enVoice) utterance.voice = enVoice;

        utterance.onstart = () => {
          this.isSpeaking = true;
          if (this.audioWave) this.audioWave.classList.remove('paused');
        };

        utterance.onend = () => {
          this.isSpeaking = false;
          if (this.audioWave) this.audioWave.classList.add('paused');
        };

        utterance.onerror = () => {
          this.isSpeaking = false;
          if (this.audioWave) this.audioWave.classList.add('paused');
        };

        this.speechSynth.speak(utterance);
      } catch (err) {
        console.warn('Speech error:', err);
      }
    }
  }

  typeMessage(fullText) {
    let currentIdx = 0;
    this.messageElement.textContent = '';
    clearInterval(this.typingTimer);

    this.typingTimer = setInterval(() => {
      if (currentIdx < fullText.length) {
        this.messageElement.textContent += fullText.charAt(currentIdx);
        currentIdx++;
      } else {
        clearInterval(this.typingTimer);
      }
    }, 16);
  }

  toggleAudio() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.speechSynth) {
      this.speechSynth.cancel();
      this.isSpeaking = false;
      if (this.audioWave) this.audioWave.classList.add('paused');
    }
    return !this.isMuted;
  }

  update(delta, elapsedTime) {
    if (!this.robotMesh) return;

    // Hover bobbing motion
    this.floatOffset = Math.sin(elapsedTime * 2.8) * 0.25;
    const targetYWithBob = this.targetPos.y + this.floatOffset;

    // Smooth movement
    this.robotMesh.position.x += (this.targetPos.x - this.robotMesh.position.x) * 0.05;
    this.robotMesh.position.y += (targetYWithBob - this.robotMesh.position.y) * 0.05;
    this.robotMesh.position.z += (this.targetPos.z - this.robotMesh.position.z) * 0.05;

    // Smooth rotation
    this.robotMesh.rotation.y += (this.targetRotationY - this.robotMesh.rotation.y) * 0.06;

    // Pointing / gesturing animation
    if (this.leftArm && this.rightArm) {
      if (this.isSpeaking) {
        this.rightArm.rotation.x = -Math.PI / 3 + Math.sin(elapsedTime * 4) * 0.2; // Point at machine
        this.leftArm.rotation.x = Math.sin(elapsedTime * 5) * 0.2;
      } else {
        this.rightArm.rotation.x = Math.sin(elapsedTime * 2) * 0.08;
        this.leftArm.rotation.x = Math.cos(elapsedTime * 2) * 0.08;
      }
    }

    // Flame flicker
    if (this.thrusterGlow) {
      this.thrusterGlow.scale.set(
        0.9 + Math.sin(elapsedTime * 12) * 0.15,
        0.9 + Math.cos(elapsedTime * 15) * 0.25,
        0.9 + Math.sin(elapsedTime * 12) * 0.15
      );
    }
  }
}

window.ATPLRobotGuide = ATPLRobotGuide;
