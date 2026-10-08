# ATPL 3D Project Showcase & Digital Twin Factory Tour

Welcome to the **ATPL Smart Connected Factory 3D Digital Twin** built for **Archery Technocrats Private Limited (ATPL Group, "Target Perfection")**.

---

## 🚀 How to Run Locally

1. **Start the Vite development server**:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:5180/#factory-3d
   ```
3. Or click **"3D Digital Twin"** in the main navigation bar.

---

## 🏗️ Architecture & File Structure

```
src/
├── data/
│   └── stations.ts                # Single typed source of truth for all 12 stations & pitch deck data
├── components/
│   └── factory3d/
│       ├── Factory3DView.jsx      # Top-level coordinator with Canvas, ESC/arrow keys, and state
│       ├── FactoryScene.jsx       # 3D WebGL scene (conveyor, robots, warehouse racks, lighting)
│       ├── Hotspot.jsx            # Floating glassmorphic cyan hotspots with gold highlight
│       ├── StationPanel.jsx       # Slide-in left detail panel with gold border & photo/diagram toggle
│       ├── TourControls.jsx       # Top-left telemetry card, top-right controls, and bottom 01-12 dock
│       ├── AboutOverlay.jsx       # Full-screen pitch deck modal with animated Recharts traction chart
│       ├── ArchieChat.jsx         # Bottom-right floating Archie AI chatbot ("Hey buddy, need any help? 👋")
│       └── StationVisuals.jsx     # High-resolution hardware imagery & SVG diagram fallbacks
```

---

## 🎮 Key Features & Interactions

- **12 Connected Product Nodes**:
  1. `01 Perfect Trace` (Serialization & GS1 Aggregation)
  2. `02 Perfect Audit` (SaaS ISO Digital Audits & Paperless CAPA)
  3. `03 Perfect Store` (Autonomous WMS & 3D Bin Heatmap Slotting)
  4. `04 RFID Portals` (Fixed UHF Dock Gate Automation)
  5. `05 PLC / HMI / SPM Integration` (Robotics & Testing Machine Automation)
  6. `06 Perfect AI Vision System` (Deep Learning Defect Detection with PASS/FAIL Output Table)
  7. `07 ERP Sync` (IIoT Edge Middleware for SAP S/4HANA & Oracle)
  8. `08 Inspection Drones` (High-Bay Aerial Stocktaking SLAM Drones)
  9. `09 Scanners & DPM Marking` (Fixed & Handheld 2D/DPM Imagers)
  10. `10 Perfect Labeler` (Cloud-Native Labeling & Print Orchestration)
  11. `11 Perfect Edge MDM` (Enterprise Mobile Device Management for Rugged Handhelds)
  12. `12 PerfectSolvEdge / Archie AI` (In-House Generative AI Technical Support Assistant)

- **Controls**:
  - **Click Hotspot or Bottom Tab (01–12)**: Smooth camera fly-to + zoom into machinery with gold highlight.
  - **Auto Tour Mode**: Automatically cycles through all 12 stations every 6 seconds with play/pause.
  - **Quality Toggle**: Switch between `Q: HIGH` (full shadows, antialiasing, 2x DPR) and `Q: LOW` for 60fps performance on lower-power devices.
  - **Keyboard Navigation**: `ESC` to close panel, `ArrowLeft` / `ArrowRight` to step between stations.
  - **Corporate Pitch Deck Overlay**: Click **"About ATPL"** in the top bar to inspect Vision, Mission, ISO Certifications, Financial Traction Chart, Clients, and OEM Partners.
  - **Archie AI Chat**: Click the floating robot bubble in the bottom right for instant AI answers about any station.

---

## 🛠️ How to Customize

### 1. How to Add or Edit a Station
Open [`src/data/stations.ts`](file:///c:/Users/user/Downloads/ATPL%20WEBSITE/src/data/stations.ts) and modify or add any station object:
```ts
myNewStation: {
  id: 'myNewStation',
  number: '13',
  name: 'My New Station',
  title: 'PERFECT ROBOTICS™',
  category: 'AUTONOMOUS MOBILE ROBOTS',
  position: [10, 0, -10],
  cameraPosition: [14, 5, -4],
  targetLookAt: [10, 2, -10],
  ...
}
```

### 2. How to Swap in GLB 3D Models
Drop your `.glb` files into `/public/models/` (e.g. `/public/models/robot_arm.glb`), and in `src/components/factory3d/FactoryScene.jsx` use Drei's `useGLTF`:
```jsx
import { useGLTF } from '@react-three/drei';

function ModelRobotArm() {
  const { scene } = useGLTF('/models/robot_arm.glb');
  return <primitive object={scene} position={[-1.8, 0, 0]} scale={[1, 1, 1]} />;
}
```

### 3. How to Change Hotspot Positions
In `src/data/stations.ts`, adjust the `position: [x, y, z]` vector for each station to move the hotspot and camera target in 3D space.

---

## 📦 Assets You Can Provide (Optional Upgrades)
- **High-res photos / diagrams**: Drop into `/public/assets/images/stations/`
- **Custom GLB 3D machinery models**: Drop into `/public/models/`
- **Client company SVG/PNG logos**: Drop into `/public/clients/`
