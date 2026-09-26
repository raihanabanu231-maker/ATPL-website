/**
 * ATPL GROUP - REALISTIC 3D SMART FACTORY BUILDING
 * Built with Three.js (WebGL)
 * Features physical machinery, concrete floors, warehouse racks, robotic cells, CNCs, and control rooms.
 */

class ATPLFactoryScene {
  constructor(canvasContainerId) {
    this.container = document.getElementById(canvasContainerId);
    if (!this.container) {
      console.error('Factory Canvas container not found:', canvasContainerId);
      return;
    }

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.clock = new THREE.Clock();

    // Scene animation objects
    this.animatedRobots = [];
    this.conveyorItems = [];
    this.agvVehicle = null;
    this.agvPathProgress = 0;
    this.stationHotspots3D = [];
    this.gantryCrane = null;

    // Camera state
    this.cameraMode = 'guided'; // 'guided' | 'orbit' | 'fps' | 'top'
    this.targetCameraPos = new THREE.Vector3(-32, 18, 38);
    this.targetLookAt = new THREE.Vector3(-25, 4, 15);
    this.currentLookAt = new THREE.Vector3(-25, 4, 15);

    // Callbacks
    this.onStationClick = null;

    this.init();
  }

  init() {
    // 1. Create Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xd6e4f0); // Bright industrial daylight ambient
    this.scene.fog = new THREE.FogExp2(0xd6e4f0, 0.006);

    // 2. Setup Camera
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(48, width / height, 0.5, 1000);
    this.camera.position.set(-32, 18, 38);
    this.targetLookAt.set(-25, 4, 15);
    this.currentLookAt.copy(this.targetLookAt);

    // 3. Setup WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.container.appendChild(this.renderer.domElement);

    // 4. Setup Controls
    if (window.THREE.OrbitControls) {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.06;
      this.controls.maxPolarAngle = Math.PI / 2 - 0.02;
      this.controls.minDistance = 6;
      this.controls.maxDistance = 160;
      this.controls.target.copy(this.currentLookAt);
    }

    // 5. Build Realistic Factory Architecture
    this.setupRealisticLighting();
    this.buildFactoryBuilding();
    this.buildWarehouseLoadingBay();
    this.buildRoboticAssemblyCell();
    this.buildCNCMachineCenter();
    this.buildQualityVisionTunnel();
    this.buildPackagingSerializationLine();
    this.buildElevatedControlRoom();
    this.buildElectricForklift();
    this.buildAGVTransport();
    this.setupStationMarkers();

    // 6. Events & Resize
    window.addEventListener('resize', () => this.onWindowResize());
    this.setupRaycasting();

    // 7. Start Loop
    this.animate();
  }

  setupRealisticLighting() {
    // Hemisphere light simulating bright sky and factory floor bounce
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d99ae, 1.3);
    hemiLight.position.set(0, 50, 0);
    this.scene.add(hemiLight);

    // Main Sunlight through factory skylights
    const sunLight = new THREE.DirectionalLight(0xfffaed, 2.2);
    sunLight.position.set(45, 65, 30);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 180;
    sunLight.shadow.camera.left = -70;
    sunLight.shadow.camera.right = 70;
    sunLight.shadow.camera.top = 70;
    sunLight.shadow.camera.bottom = -70;
    sunLight.shadow.bias = -0.0004;
    this.scene.add(sunLight);

    // High-Bay Industrial LED Lighting fixtures across factory roof
    const bayLightPositions = [
      { x: -30, y: 22, z: 20 },
      { x: 0, y: 22, z: 0 },
      { x: 25, y: 22, z: 0 },
      { x: 25, y: 22, z: -20 },
      { x: -20, y: 22, z: -20 }
    ];

    bayLightPositions.forEach(pos => {
      const spot = new THREE.SpotLight(0xf0f7ff, 1.8, 45, Math.PI / 3, 0.5, 1.2);
      spot.position.set(pos.x, pos.y, pos.z);
      spot.target.position.set(pos.x, 0, pos.z);
      this.scene.add(spot);
      this.scene.add(spot.target);

      // Visible Lamp Housing fixture
      const fixture = new THREE.Mesh(
        new THREE.CylinderGeometry(1.2, 0.4, 0.8, 16),
        new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 })
      );
      fixture.position.set(pos.x, pos.y, pos.z);
      this.scene.add(fixture);
    });
  }

  buildFactoryBuilding() {
    // 1. Polished Concrete Industrial Floor with Epoxy sheen
    const floorGeo = new THREE.PlaneGeometry(150, 130);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8, // Light industrial concrete grey
      roughness: 0.25,
      metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);

    // 2. Yellow Safety Boundary Lines & Forklift Aisles
    const safetyLineMat = new THREE.MeshBasicMaterial({ color: 0xfacc15, side: THREE.DoubleSide }); // Safety Yellow
    const pedestrianMat = new THREE.MeshBasicMaterial({ color: 0x1e3a8a, side: THREE.DoubleSide }); // Blue walkway

    // Main Central Pedestrian Walkway
    const mainAisle = new THREE.Mesh(new THREE.PlaneGeometry(6, 110), pedestrianMat);
    mainAisle.rotation.x = -Math.PI / 2;
    mainAisle.position.set(8, 0.02, 0);
    this.scene.add(mainAisle);

    // Yellow borders along aisle
    const border1 = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 110), safetyLineMat);
    border1.rotation.x = -Math.PI / 2;
    border1.position.set(5, 0.03, 0);
    this.scene.add(border1);

    const border2 = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 110), safetyLineMat);
    border2.rotation.x = -Math.PI / 2;
    border2.position.set(11, 0.03, 0);
    this.scene.add(border2);

    // Hazard Hatch Zones (Robotics & Loading Dock perimeter)
    const hatchMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, side: THREE.DoubleSide });
    const dockHatch = new THREE.Mesh(new THREE.PlaneGeometry(28, 14), hatchMat);
    dockHatch.rotation.x = -Math.PI / 2;
    dockHatch.position.set(-30, 0.02, 38);
    this.scene.add(dockHatch);

    // 3. Realistic Factory Walls
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.8 }); // Insulated white/grey panels
    const trimMat = new THREE.MeshStandardMaterial({ color: 0x002248, roughness: 0.5 }); // ATPL Navy base trim

    // Back Wall (Z = -55)
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(150, 26, 1.5), wallMat);
    backWall.position.set(0, 13, -55);
    backWall.receiveShadow = true;
    this.scene.add(backWall);

    const backTrim = new THREE.Mesh(new THREE.BoxGeometry(150, 1.8, 1.8), trimMat);
    backTrim.position.set(0, 0.9, -54.8);
    this.scene.add(backTrim);

    // Left Wall (X = -65) with high factory windows
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(1.5, 26, 130), wallMat);
    leftWall.position.set(-65, 13, 0);
    leftWall.receiveShadow = true;
    this.scene.add(leftWall);

    // Factory Windows on Left Wall
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xbae6fd,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      transmission: 0.9
    });
    for (let wz = -40; wz <= 40; wz += 20) {
      const windowFrame = new THREE.Mesh(new THREE.BoxGeometry(1.8, 8, 12), glassMat);
      windowFrame.position.set(-64.8, 17, wz);
      this.scene.add(windowFrame);
    }

    // Roll-up Loading Shutter Doors at Back Wall
    const shutterMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8, roughness: 0.3 });
    for (let dx = -40; dx <= -20; dx += 20) {
      const shutter = new THREE.Mesh(new THREE.BoxGeometry(12, 14, 0.6), shutterMat);
      shutter.position.set(dx, 7, -54);
      this.scene.add(shutter);
    }

    // 4. Structural Steel Columns (I-Beams)
    const steelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.2 });
    for (let cx = -50; cx <= 50; cx += 25) {
      for (let cz = -40; cz <= 40; cz += 40) {
        const col = new THREE.Mesh(new THREE.BoxGeometry(1.4, 26, 1.4), steelMat);
        col.position.set(cx, 13, cz);
        col.castShadow = true;
        this.scene.add(col);
      }
    }

    // 5. Overhead Yellow Gantry Crane on Steel Rails
    const craneGroup = new THREE.Group();
    const craneYellow = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.6, roughness: 0.3 });

    // Dual Main Crane Girders
    const girder1 = new THREE.Mesh(new THREE.BoxGeometry(120, 2.5, 1.5), craneYellow);
    girder1.position.set(0, 23.5, -5);
    craneGroup.add(girder1);

    const girder2 = new THREE.Mesh(new THREE.BoxGeometry(120, 2.5, 1.5), craneYellow);
    girder2.position.set(0, 23.5, 5);
    craneGroup.add(girder2);

    // Crane Hoist Trolley
    const trolley = new THREE.Mesh(new THREE.BoxGeometry(6, 2, 8), steelMat);
    trolley.position.set(-10, 24.5, 0);
    craneGroup.add(trolley);

    // Cable and Hook
    const hookCable = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 10), steelMat);
    hookCable.position.set(-10, 18.5, 0);
    craneGroup.add(hookCable);

    this.scene.add(craneGroup);
    this.gantryCrane = craneGroup;
  }

  buildWarehouseLoadingBay() {
    // Station 1: Realistic High-Bay Industrial Pallet Racking (-30, 0, 20)
    const warehouseGroup = new THREE.Group();
    warehouseGroup.position.set(-30, 0, 20);

    const rackBlue = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.7, roughness: 0.3 }); // Uprights Blue
    const beamOrange = new THREE.MeshStandardMaterial({ color: 0xea580c, metalness: 0.6, roughness: 0.3 }); // Beams Orange
    const woodMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.9 }); // Euro Wood Pallets
    const cartonMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.8 }); // Cardboard Box

    // 3 Rows of High Pallet Racks
    for (let r = 0; r < 3; r++) {
      const zOff = (r - 1) * 8;

      // Uprights
      for (let u = 0; u < 5; u++) {
        const xOff = (u - 2) * 5.5;
        const post1 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 18, 0.35), rackBlue);
        post1.position.set(xOff, 9, zOff - 1.4);
        post1.castShadow = true;
        warehouseGroup.add(post1);

        const post2 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 18, 0.35), rackBlue);
        post2.position.set(xOff, 9, zOff + 1.4);
        post2.castShadow = true;
        warehouseGroup.add(post2);
      }

      // Horizontal Shelf Levels
      for (let lvl = 1; lvl <= 4; lvl++) {
        const yLvl = lvl * 3.8;
        const shelf = new THREE.Mesh(new THREE.BoxGeometry(23, 0.35, 2.8), beamOrange);
        shelf.position.set(0, yLvl, zOff);
        shelf.castShadow = true;
        warehouseGroup.add(shelf);

        // Pallets & Cartons with shipping labels
        for (let p = 0; p < 6; p++) {
          const px = (p - 2.5) * 3.6;

          // Wooden Euro-Pallet
          const pallet = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.3, 2.2), woodMat);
          pallet.position.set(px, yLvl + 0.3, zOff);
          pallet.castShadow = true;
          warehouseGroup.add(pallet);

          // Cardboard Cartons
          const box = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.8, 2.0), cartonMat);
          box.position.set(px, yLvl + 1.35, zOff);
          box.castShadow = true;
          warehouseGroup.add(box);

          // Shipping Barcode Label on Box
          const label = new THREE.Mesh(
            new THREE.PlaneGeometry(0.8, 0.5),
            new THREE.MeshBasicMaterial({ color: 0xffffff })
          );
          label.position.set(px, yLvl + 1.5, zOff + 1.01);
          warehouseGroup.add(label);
        }
      }
    }

    // UHF RFID Portal Arch at Bay Door (-16, 0, 20)
    const rfidPortal = new THREE.Group();
    rfidPortal.position.set(15, 0, 0);

    const rfidPillarMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8 });
    const p1 = new THREE.Mesh(new THREE.BoxGeometry(0.6, 9, 1.2), rfidPillarMat);
    p1.position.set(0, 4.5, -3.5);
    p1.castShadow = true;
    rfidPortal.add(p1);

    const p2 = new THREE.Mesh(new THREE.BoxGeometry(0.6, 9, 1.2), rfidPillarMat);
    p2.position.set(0, 4.5, 3.5);
    p2.castShadow = true;
    rfidPortal.add(p2);

    const header = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 8.2), rfidPillarMat);
    header.position.set(0, 8.8, 0);
    rfidPortal.add(header);

    // ATPL UHF Flat Panel Antennas on Portal
    for (let ant = 0; ant < 4; ant++) {
      const panel = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 1.2, 1.2),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 })
      );
      panel.position.set(0.35, 2.5 + ant * 1.8, ant % 2 === 0 ? -3.4 : 3.4);
      rfidPortal.add(panel);
    }

    warehouseGroup.add(rfidPortal);
    this.scene.add(warehouseGroup);
  }

  buildRoboticAssemblyCell() {
    // Station 2: 6-Axis Industrial Robotic Cell inside Safety Perimeter (0, 0, 0)
    const cellGroup = new THREE.Group();
    cellGroup.position.set(0, 0, -4);

    // Protective Safety Perimeter Fencing (Yellow frame with dark mesh)
    const fenceFrameMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.5 });
    const meshMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, wireframe: true });

    // Fencing Walls around cell (16m x 12m)
    const f1 = new THREE.Mesh(new THREE.BoxGeometry(16, 5, 0.1), meshMat);
    f1.position.set(0, 2.5, -6);
    cellGroup.add(f1);

    const f2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 5, 12), meshMat);
    f2.position.set(-8, 2.5, 0);
    cellGroup.add(f2);

    const f3 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 5, 12), meshMat);
    f3.position.set(8, 2.5, 0);
    cellGroup.add(f3);

    // Safety Interlock Door with Warning Sign
    const sign = new THREE.Mesh(
      new THREE.PlaneGeometry(1.2, 0.8),
      new THREE.MeshBasicMaterial({ color: 0xef4444 })
    );
    sign.position.set(0, 3.5, 5.95);
    cellGroup.add(sign);

    // 6-Axis Robotic Arm on Steel Pedestal
    const robotBaseMat = new THREE.MeshStandardMaterial({ color: 0xf97316, metalness: 0.6, roughness: 0.3 }); // Industrial Orange
    const jointDarkMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.2 });
    const armWhiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.5, roughness: 0.3 });

    // Heavy Cast Iron Base
    const base = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 2.0, 1.4, 24), jointDarkMat);
    base.position.y = 0.7;
    base.castShadow = true;
    cellGroup.add(base);

    // Rotating Turret J1
    const turret = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, 1.2, 24), robotBaseMat);
    turret.position.y = 1.9;
    turret.castShadow = true;
    cellGroup.add(turret);

    // Shoulder Joint J2 & Lower Arm
    const shoulder = new THREE.Mesh(new THREE.SphereGeometry(1.0, 16, 16), jointDarkMat);
    shoulder.position.set(0, 2.9, 0);
    cellGroup.add(shoulder);

    const lowerArm = new THREE.Mesh(new THREE.BoxGeometry(0.9, 5.2, 1.1), armWhiteMat);
    lowerArm.position.set(0, 5.3, 0);
    lowerArm.castShadow = true;
    cellGroup.add(lowerArm);

    // Elbow Joint J3 & Upper Arm
    const elbow = new THREE.Mesh(new THREE.SphereGeometry(0.85, 16, 16), jointDarkMat);
    elbow.position.set(0, 8.0, 0);
    cellGroup.add(elbow);

    const upperArm = new THREE.Mesh(new THREE.BoxGeometry(0.7, 4.4, 0.8), robotBaseMat);
    upperArm.position.set(1.4, 9.4, 0);
    upperArm.rotation.z = -Math.PI / 3.2;
    upperArm.castShadow = true;
    cellGroup.add(upperArm);

    // Wrist Joint J4/J5/J6 & Direct Part Marking Laser Tool Head
    const wrist = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.45, 1.2, 16), jointDarkMat);
    wrist.position.set(3.2, 8.4, 0);
    wrist.rotation.z = Math.PI / 2;
    cellGroup.add(wrist);

    // Laser Spark Light
    const sparkLight = new THREE.PointLight(0x00f0ff, 2.5, 6);
    sparkLight.position.set(3.8, 8.4, 0);
    cellGroup.add(sparkLight);

    // Machine Stack Light Indicator (Green/Amber/Red tower)
    const stackLight = new THREE.Group();
    stackLight.position.set(-6, 0, 5);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 6), jointDarkMat);
    pole.position.y = 3;
    stackLight.add(pole);

    const greenLed = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.5), new THREE.MeshBasicMaterial({ color: 0x10b981 }));
    greenLed.position.y = 5.8;
    stackLight.add(greenLed);
    cellGroup.add(stackLight);

    this.scene.add(cellGroup);
    this.animatedRobots.push({
      group: cellGroup,
      turret: turret,
      spark: sparkLight,
      angle: 0
    });
  }

  buildCNCMachineCenter() {
    // CNC Vertical Machining Center next to Robotic Cell
    const cncGroup = new THREE.Group();
    cncGroup.position.set(12, 0, -6);

    const cncBodyMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7, roughness: 0.3 });
    const cncDoorMat = new THREE.MeshPhysicalMaterial({ color: 0x0284c7, transparent: true, opacity: 0.4 });

    // Machine Enclosure
    const body = new THREE.Mesh(new THREE.BoxGeometry(6, 7.5, 5), cncBodyMat);
    body.position.y = 3.75;
    body.castShadow = true;
    cncGroup.add(body);

    // Front Sliding Inspection Window
    const windowDoor = new THREE.Mesh(new THREE.BoxGeometry(3.5, 4, 0.2), cncDoorMat);
    windowDoor.position.set(0, 4.2, 2.52);
    cncGroup.add(windowDoor);

    // Control Touch Panel Display on CNC
    const panelArm = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 1.2, 0.3),
      new THREE.MeshBasicMaterial({ color: 0x0284c7 })
    );
    panelArm.position.set(3.5, 4.5, 1.5);
    cncGroup.add(panelArm);

    this.scene.add(cncGroup);
  }

  buildQualityVisionTunnel() {
    // Station 3: Industrial Machine Vision & Quality Inspection Tunnel (22, 0, 0)
    const visionGroup = new THREE.Group();
    visionGroup.position.set(22, 0, 0);

    const steelSheetMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.85, roughness: 0.25 }); // Stainless Steel
    const darkFrame = new THREE.MeshStandardMaterial({ color: 0x0f172a });

    // Stainless Steel Inspection Hood Arch
    const hood = new THREE.Mesh(new THREE.BoxGeometry(5.5, 5.5, 4.5), steelSheetMat);
    hood.position.y = 4.8;
    hood.castShadow = true;
    visionGroup.add(hood);

    // Overhead High-Resolution Line Scan Cameras
    for (let c = -1.2; c <= 1.2; c += 2.4) {
      const cam = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.2, 0.8), darkFrame);
      cam.position.set(c, 7.8, 0);
      visionGroup.add(cam);

      // Lens Ring
      const lens = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.3, 0.4),
        new THREE.MeshBasicMaterial({ color: 0x00f0ff })
      );
      lens.position.set(c, 7.1, 0);
      visionGroup.add(lens);
    }

    // Green PASS / Red FAIL Quality Grade Display Screen
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(1.8, 1.2),
      new THREE.MeshBasicMaterial({ color: 0x10b981 }) // Grade A Green
    );
    screen.position.set(-2.8, 5.2, 0);
    screen.rotation.y = -Math.PI / 2;
    visionGroup.add(screen);

    // Pneumatic Reject Diverter Arm
    const rejectPiston = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 2.5), steelSheetMat);
    rejectPiston.position.set(3.2, 3.2, 1.2);
    rejectPiston.rotation.z = Math.PI / 2;
    visionGroup.add(rejectPiston);

    this.scene.add(visionGroup);
  }

  buildPackagingSerializationLine() {
    // Station 4: Automated Packaging & Print-and-Apply Line (25, 0, -18)
    const packGroup = new THREE.Group();
    packGroup.position.set(25, 0, -18);

    const metalDark = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8 });
    const blueMachine = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.6 });

    // Motorized Roller Conveyor
    const conveyorBody = new THREE.Mesh(new THREE.BoxGeometry(22, 1.2, 2.8), metalDark);
    conveyorBody.position.set(0, 2.2, 0);
    conveyorBody.castShadow = true;
    packGroup.add(conveyorBody);

    // Rollers
    for (let rx = -10; rx <= 10; rx += 1.2) {
      const roller = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 2.6, 12), blueMachine);
      roller.rotation.x = Math.PI / 2;
      roller.position.set(rx, 2.85, 0);
      packGroup.add(roller);
    }

    // Industrial Print & Apply Thermal Labeler Tower
    const labelerTower = new THREE.Mesh(new THREE.BoxGeometry(2.4, 7, 1.8), blueMachine);
    labelerTower.position.set(4, 5.5, -2.2);
    labelerTower.castShadow = true;
    packGroup.add(labelerTower);

    // Label Ribbon Roll
    const ribbonRoll = new THREE.Mesh(
      new THREE.CylinderGeometry(0.8, 0.8, 0.4),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    ribbonRoll.position.set(4, 7.5, -1.2);
    ribbonRoll.rotation.x = Math.PI / 2;
    packGroup.add(ribbonRoll);

    // Automated Carton Taping / Sealing Unit
    const sealer = new THREE.Mesh(new THREE.BoxGeometry(4, 4.5, 3.2), metalDark);
    sealer.position.set(-6, 4.5, 0);
    packGroup.add(sealer);

    this.scene.add(packGroup);

    // Animated Packages traveling on conveyor
    const cartonMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.8 });
    for (let i = 0; i < 6; i++) {
      const box = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.2, 1.6), cartonMat);
      box.position.set(-10 + i * 4.5, 3.5, 0);
      box.castShadow = true;
      packGroup.add(box);
      this.conveyorItems.push({
        mesh: box,
        startX: -10,
        endX: 10,
        speed: 0.06
      });
    }
  }

  buildElevatedControlRoom() {
    // Station 5: Glass-Walled Mezzanine Control Room (-20, 0, -28)
    const controlGroup = new THREE.Group();
    controlGroup.position.set(-20, 0, -28);

    const steelFrame = new THREE.MeshStandardMaterial({ color: 0x002248, metalness: 0.85 }); // ATPL Navy
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xbae6fd,
      transparent: true,
      opacity: 0.5,
      roughness: 0.1,
      transmission: 0.85
    });

    // Elevated Mezzanine Deck Pillars (4.5m high)
    for (let px = -7; px <= 7; px += 14) {
      for (let pz = -6; pz <= 6; pz += 12) {
        const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.8, 9, 0.8), steelFrame);
        pillar.position.set(px, 4.5, pz);
        pillar.castShadow = true;
        controlGroup.add(pillar);
      }
    }

    // Mezzanine Floor Base
    const mezzFloor = new THREE.Mesh(new THREE.BoxGeometry(16, 0.6, 14), steelFrame);
    mezzFloor.position.set(0, 9, 0);
    controlGroup.add(mezzFloor);

    // Glass Office Enclosure
    const glassRoom = new THREE.Mesh(new THREE.BoxGeometry(15.6, 6, 13.6), glassMat);
    glassRoom.position.set(0, 12, 0);
    controlGroup.add(glassRoom);

    // Multi-Screen Digital Twin Operator Wall Displays inside room
    for (let s = -4; s <= 4; s += 4) {
      const monitor = new THREE.Mesh(
        new THREE.PlaneGeometry(3.2, 2.0),
        new THREE.MeshBasicMaterial({ color: 0x0284c7 }) // Blue dashboard glow
      );
      monitor.position.set(s, 12.5, 6.7);
      controlGroup.add(monitor);
    }

    // Metal Access Staircase
    const stairRail = new THREE.Mesh(new THREE.BoxGeometry(1.2, 9, 8), steelFrame);
    stairRail.position.set(9, 4.5, 0);
    stairRail.rotation.x = Math.PI / 5;
    controlGroup.add(stairRail);

    this.scene.add(controlGroup);
  }

  buildElectricForklift() {
    // Realistic Electric Forklift Truck near warehouse
    const forklift = new THREE.Group();
    forklift.position.set(-18, 0, 32);
    forklift.rotation.y = -Math.PI / 4;

    const yellowMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.6 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x111827 });

    // Chassis & Counterweight
    const body = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.8, 4.5), yellowMat);
    body.position.y = 1.2;
    body.castShadow = true;
    forklift.add(body);

    // Overhead Protective Cage (ROPS)
    const cage = new THREE.Mesh(new THREE.BoxGeometry(2.8, 3.5, 3.0), darkMat);
    cage.position.set(0, 3.2, -0.4);
    forklift.add(cage);

    // Front Vertical Mast & Lifting Forks
    const mast = new THREE.Mesh(new THREE.BoxGeometry(2.2, 6, 0.4), darkMat);
    mast.position.set(0, 3.2, 2.4);
    forklift.add(mast);

    const fork1 = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.1, 2.8), darkMat);
    fork1.position.set(-0.6, 0.3, 3.6);
    forklift.add(fork1);

    const fork2 = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.1, 2.8), darkMat);
    fork2.position.set(0.6, 0.3, 3.6);
    forklift.add(fork2);

    // Wheels
    for (let wx = -1.5; wx <= 1.5; wx += 3.0) {
      for (let wz = -1.4; wz <= 1.4; wz += 2.8) {
        const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.4, 16), darkMat);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(wx, 0.5, wz);
        forklift.add(wheel);
      }
    }

    this.scene.add(forklift);
  }

  buildAGVTransport() {
    // Autonomous Guided Vehicle (AGV) roaming factory aisles
    this.agvVehicle = new THREE.Group();

    const agvMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.7, roughness: 0.3 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });

    const body = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.0, 2.4), agvMat);
    body.position.y = 0.7;
    body.castShadow = true;
    this.agvVehicle.add(body);

    // Payload Pallet on AGV
    const pallet = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 1.6, 2.0),
      new THREE.MeshStandardMaterial({ color: 0xd97706 })
    );
    pallet.position.set(0, 1.8, 0);
    pallet.castShadow = true;
    this.agvVehicle.add(pallet);

    // Flashing Amber Warning Beacon
    const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), new THREE.MeshBasicMaterial({ color: 0xf59e0b }));
    beacon.position.set(1.4, 1.4, 0.8);
    this.agvVehicle.add(beacon);

    this.scene.add(this.agvVehicle);
  }

  setupStationMarkers() {
    if (!window.ATPL_STATIONS_DATA) return;

    window.ATPL_STATIONS_DATA.forEach((station, index) => {
      const markerGroup = new THREE.Group();
      markerGroup.position.set(station.stationCoordinates.x, 0.1, station.stationCoordinates.z);

      // Yellow/Navy Industrial Floor Waypoint Ring
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(2.5, 3.2, 32),
        new THREE.MeshBasicMaterial({ color: 0x0284c7, side: THREE.DoubleSide })
      );
      ring.rotation.x = -Math.PI / 2;
      markerGroup.add(ring);

      // Interactive Click Target Box (invisible large hitbox)
      const hitBox = new THREE.Mesh(
        new THREE.BoxGeometry(10, 14, 10),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      hitBox.position.y = 7;
      hitBox.userData = { stationId: station.id, index: index };
      markerGroup.add(hitBox);

      this.scene.add(markerGroup);
      this.stationHotspots3D.push(hitBox);
    });
  }

  setupRaycasting() {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    this.renderer.domElement.addEventListener('click', (event) => {
      const rect = this.renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, this.camera);
      const intersects = raycaster.intersectObjects(this.stationHotspots3D);

      if (intersects.length > 0) {
        const targetData = intersects[0].object.userData;
        if (this.onStationClick && targetData) {
          this.onStationClick(targetData.index, targetData.stationId);
        }
      }
    });
  }

  flyToStation(stationIndex) {
    if (!window.ATPL_STATIONS_DATA || !window.ATPL_STATIONS_DATA[stationIndex]) return;
    const data = window.ATPL_STATIONS_DATA[stationIndex];

    this.targetCameraPos.set(data.cameraPosition.x, data.cameraPosition.y, data.cameraPosition.z);
    this.targetLookAt.set(data.cameraTarget.x, data.cameraTarget.y, data.cameraTarget.z);
  }

  setCameraMode(mode) {
    this.cameraMode = mode;
    if (mode === 'top') {
      this.targetCameraPos.set(0, 95, 0.1);
      this.targetLookAt.set(0, 0, 0);
    } else if (mode === 'fps') {
      this.targetCameraPos.set(8, 2.5, 25);
      this.targetLookAt.set(8, 2.5, -25);
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // 1. Smooth Camera Damping in Guided Mode
    if (this.cameraMode === 'guided' || this.cameraMode === 'top' || this.cameraMode === 'fps') {
      this.camera.position.lerp(this.targetCameraPos, 0.035);
      this.currentLookAt.lerp(this.targetLookAt, 0.04);
      this.camera.lookAt(this.currentLookAt);
      if (this.controls) {
        this.controls.target.copy(this.currentLookAt);
      }
    } else if (this.controls) {
      this.controls.update();
    }

    // 2. Animate Conveyor Packages
    this.conveyorItems.forEach(item => {
      item.mesh.position.x += item.speed;
      if (item.mesh.position.x > item.endX) {
        item.mesh.position.x = item.startX;
      }
    });

    // 3. Animate 6-Axis Robotic Arm
    this.animatedRobots.forEach((robot) => {
      robot.angle += 0.02;
      robot.turret.rotation.y = Math.sin(robot.angle) * 0.65;
      if (robot.spark) {
        robot.spark.intensity = Math.random() > 0.4 ? 3.0 : 0.5;
      }
    });

    // 4. Animate AGV Vehicle along factory aisles
    if (this.agvVehicle) {
      this.agvPathProgress = (this.agvPathProgress + 0.0018) % 1;
      const t = this.agvPathProgress * Math.PI * 2;
      const agvX = Math.sin(t) * 32;
      const agvZ = Math.cos(t) * 22;
      this.agvVehicle.position.set(agvX, 0, agvZ);
      this.agvVehicle.rotation.y = t + Math.PI / 2;
    }

    // 5. Subtle Gantry Crane Motion
    if (this.gantryCrane) {
      this.gantryCrane.position.z = Math.sin(elapsedTime * 0.2) * 15;
    }

    // Render Scene
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    if (!this.container || !this.camera || !this.renderer) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}

window.ATPLFactoryScene = ATPLFactoryScene;
