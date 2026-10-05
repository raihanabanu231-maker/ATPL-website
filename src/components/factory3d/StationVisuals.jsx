import React from 'react';

/**
 * High-Tech Interactive Visual Previews for 12 Smart Factory 3D Stations
 */

export const StationVisualPreview = ({ stationId, color = '#00f0ff', height = 110 }) => {
  switch (stationId) {
    case 'perfectTrace':
      return (
        <svg viewBox="0 0 400 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: `${height}px`, borderRadius: '8px', background: 'linear-gradient(135deg, #07152d 0%, #030a16 100%)', border: '1px solid rgba(0, 240, 255, 0.3)' }}>
          {/* Grid background */}
          <pattern id="grid-trace" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="1"/>
          </pattern>
          <rect width="400" height="130" fill="url(#grid-trace)" />
          
          {/* Serialization Hierarchy Flow: Item -> Bundle -> Case -> Pallet */}
          <g transform="translate(20, 25)">
            {/* 1. Item */}
            <rect x="0" y="20" width="45" height="45" rx="6" fill="rgba(0, 240, 255, 0.15)" stroke="#00f0ff" strokeWidth="2" />
            <rect x="8" y="28" width="12" height="12" fill="#00f0ff" />
            <rect x="25" y="28" width="12" height="4" fill="#00f0ff" />
            <rect x="25" y="36" width="12" height="4" fill="#00f0ff" />
            <text x="22" y="78" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">UNIT</text>

            {/* Arrow 1 */}
            <path d="M 55 42 L 80 42" stroke="#00f0ff" strokeWidth="2" strokeDasharray="3 3" />
            <polygon points="80,39 86,42 80,45" fill="#00f0ff" />

            {/* 2. Bundle */}
            <rect x="95" y="15" width="55" height="55" rx="6" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="2" />
            <rect x="105" y="25" width="35" height="6" fill="#10b981" />
            <rect x="105" y="35" width="35" height="6" fill="#10b981" />
            <rect x="105" y="45" width="35" height="6" fill="#10b981" />
            <text x="122" y="82" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">BUNDLE</text>

            {/* Arrow 2 */}
            <path d="M 160 42 L 185 42" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
            <polygon points="185,39 191,42 185,45" fill="#10b981" />

            {/* 3. Case */}
            <rect x="200" y="10" width="65" height="65" rx="6" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" strokeWidth="2" />
            <rect x="210" y="20" width="45" height="45" rx="4" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 2" />
            <text x="232" y="86" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">SHIPPER</text>

            {/* Arrow 3 */}
            <path d="M 275 42 L 300 42" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
            <polygon points="300,39 306,42 300,45" fill="#38bdf8" />

            {/* 4. Pallet */}
            <rect x="315" y="5" width="60" height="75" rx="6" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="2" />
            <line x1="315" y1="65" x2="375" y2="65" stroke="#f59e0b" strokeWidth="3" />
            <text x="345" y="92" fill="#f59e0b" fontSize="10" textAnchor="middle" fontWeight="bold">PALLET</text>
          </g>

          <text x="20" y="118" fill="#00f0ff" fontSize="10" fontFamily="monospace" fontWeight="bold">GS1 CRYPTOGRAPHIC 4-TIER AGGREGATION • 450 PACKS/MIN</text>
        </svg>
      );

    case 'perfectWarehouse':
      return (
        <svg viewBox="0 0 400 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: `${height}px`, borderRadius: '8px', background: 'linear-gradient(135deg, #07152d 0%, #030a16 100%)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
          {/* Isometric 3D Racking & Forklift Simulation */}
          <g transform="translate(30, 15)">
            {/* Racks */}
            {[0, 1, 2, 3, 4].map(col => (
              <g key={col} transform={`translate(${col * 65}, 0)`}>
                <rect x="0" y="5" width="55" height="22" rx="3" fill="rgba(59, 130, 246, 0.25)" stroke="#3b82f6" strokeWidth="1.5" />
                <rect x="0" y="32" width="55" height="22" rx="3" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" strokeWidth="1.5" />
                <rect x="0" y="59" width="55" height="22" rx="3" fill="rgba(245, 158, 11, 0.25)" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="27" y="20" fill="#93c5fd" fontSize="9" textAnchor="middle" fontFamily="monospace">BIN A-{col+1}</text>
                <text x="27" y="47" fill="#86efac" fontSize="9" textAnchor="middle" fontFamily="monospace">BIN B-{col+1}</text>
                <text x="27" y="74" fill="#fde68a" fontSize="9" textAnchor="middle" fontFamily="monospace">BIN C-{col+1}</text>
              </g>
            ))}
          </g>
          <text x="20" y="118" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">DYNAMIC 3D HEATMAP BIN SLOTTING • SAP / ORACLE BAPI SYNC</text>
        </svg>
      );

    case 'visionAi':
      return (
        <svg viewBox="0 0 400 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: `${height}px`, borderRadius: '8px', background: 'linear-gradient(135deg, #07152d 0%, #030a16 100%)', border: '1px solid rgba(232, 88, 116, 0.4)' }}>
          {/* Neural Vision Target & Defect Scanner */}
          <g transform="translate(30, 15)">
            <circle cx="60" cy="45" r="35" stroke="#E85874" strokeWidth="2" fill="rgba(232, 88, 116, 0.1)" strokeDasharray="4 2" />
            <circle cx="60" cy="45" r="18" stroke="#E85874" strokeWidth="1.5" />
            <line x1="20" y1="45" x2="100" y2="45" stroke="#E85874" strokeWidth="1" />
            <line x1="60" y1="5" x2="60" y2="85" stroke="#E85874" strokeWidth="1" />

            {/* Defect Bounding Box */}
            <rect x="150" y="15" width="200" height="65" rx="6" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.15)" />
            <rect x="160" y="25" width="70" height="45" rx="4" fill="rgba(232, 88, 116, 0.2)" stroke="#E85874" strokeWidth="1.5" />
            <text x="195" y="52" fill="#E85874" fontSize="10" textAnchor="middle" fontWeight="bold">FLAW 99.8%</text>

            <rect x="245" y="25" width="90" height="45" rx="4" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="1.5" />
            <text x="290" y="45" fill="#34d399" fontSize="10" textAnchor="middle" fontWeight="bold">ISO 15415</text>
            <text x="290" y="60" fill="#34d399" fontSize="11" textAnchor="middle" fontWeight="bold">GRADE A</text>
          </g>
          <text x="20" y="118" fill="#E85874" fontSize="10" fontFamily="monospace" fontWeight="bold">SUB-8MS NEURAL DEFECT CLASSIFIER • HIGH-SPEED REJECT GATES</text>
        </svg>
      );

    case 'rfidPortals':
      return (
        <svg viewBox="0 0 400 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: `${height}px`, borderRadius: '8px', background: 'linear-gradient(135deg, #07152d 0%, #030a16 100%)', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
          {/* UHF RFID Gate Portal with Passing Pallet */}
          <g transform="translate(40, 15)">
            {/* Left Antenna */}
            <rect x="10" y="5" width="16" height="75" rx="3" fill="#f59e0b" />
            {/* Right Antenna */}
            <rect x="290" y="5" width="16" height="75" rx="3" fill="#f59e0b" />
            {/* RF Waves */}
            <path d="M 40 20 C 80 20, 100 45, 100 45 C 100 45, 80 70, 40 70" stroke="#f59e0b" strokeWidth="2" fill="none" strokeDasharray="3 3" opacity="0.8" />
            <path d="M 276 20 C 236 20, 216 45, 216 45 C 216 45, 236 70, 276 70" stroke="#f59e0b" strokeWidth="2" fill="none" strokeDasharray="3 3" opacity="0.8" />
            
            {/* Pallet with 20 Tags */}
            <rect x="115" y="20" width="85" height="50" rx="4" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" strokeWidth="2" />
            <text x="157" y="50" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="bold">PALLET #8824</text>
          </g>
          <text x="20" y="118" fill="#fbbf24" fontSize="10" fontFamily="monospace" fontWeight="bold">FIXED UHF DOCK GATES • 1,200+ TAGS/SEC • 300°C CERAMIC TAGS</text>
        </svg>
      );

    case 'industrialRobots':
      return (
        <svg viewBox="0 0 400 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: `${height}px`, borderRadius: '8px', background: 'linear-gradient(135deg, #07152d 0%, #030a16 100%)', border: '1px solid rgba(139, 92, 246, 0.4)' }}>
          {/* 6-Axis Robotic Arm & Print & Apply Applicator */}
          <g transform="translate(40, 15)">
            {/* Robot Base */}
            <rect x="50" y="60" width="40" height="20" rx="4" fill="#6d28d9" />
            {/* Arm Joint 1 */}
            <line x1="70" y1="60" x2="110" y2="30" stroke="#a78bfa" strokeWidth="8" strokeLinecap="round" />
            {/* Arm Joint 2 */}
            <line x1="110" y1="30" x2="170" y2="40" stroke="#a78bfa" strokeWidth="6" strokeLinecap="round" />
            {/* End Effector */}
            <circle cx="170" cy="40" r="8" fill="#f43f5e" />
            <line x1="170" y1="40" x2="170" y2="65" stroke="#f43f5e" strokeWidth="3" />

            {/* Target Package */}
            <rect x="210" y="25" width="130" height="55" rx="6" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.2)" />
            <rect x="220" y="35" width="40" height="35" rx="3" fill="#a78bfa" opacity="0.3" />
            <text x="280" y="55" fill="#c4b5fd" fontSize="11" fontWeight="bold">0.05mm POKAYOKE</text>
          </g>
          <text x="20" y="118" fill="#c4b5fd" fontSize="10" fontFamily="monospace" fontWeight="bold">6-AXIS ARTICULATED ROBOTS • SYNCHRONIZED PRINT & APPLY</text>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 400 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: `${height}px`, borderRadius: '8px', background: 'linear-gradient(135deg, #07152d 0%, #030a16 100%)', border: `1px solid ${color}40` }}>
          <g transform="translate(30, 20)">
            <rect x="10" y="10" width="80" height="60" rx="8" fill={`${color}20`} stroke={color} strokeWidth="2" />
            <circle cx="50" cy="40" r="16" fill={color} opacity="0.8" />
            <rect x="110" y="15" width="220" height="15" rx="3" fill="rgba(255, 255, 255, 0.15)" />
            <rect x="110" y="40" width="160" height="12" rx="3" fill="rgba(255, 255, 255, 0.1)" />
            <rect x="110" y="60" width="200" height="10" rx="2" fill={`${color}50`} />
          </g>
          <text x="20" y="118" fill={color} fontSize="10" fontFamily="monospace" fontWeight="bold">ATPL SMART FACTORY 4.0 TELEMETRY & HARDWARE INTEGRATION</text>
        </svg>
      );
  }
};
