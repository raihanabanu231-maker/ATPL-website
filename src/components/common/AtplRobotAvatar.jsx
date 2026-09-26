import React from 'react';

/**
 * ATPL Official Robot Mascot Avatar
 * Exact design matching ATPL branding:
 * - Glossy white dome head & curved dark visor
 * - Expressive glowing cyan pill eyes (#00f0ff)
 * - Ear pods with dark slate chassis & #E85874 coral trim
 * - Glossy white torso with official ATPL Bow & Arrow Logo on center of chest
 * - Articulated mechanical arms & hands
 */
export const AtplRobotAvatar = ({ 
  size = 56, 
  className = '', 
  glow = true, 
  style = {} 
}) => {
  return (
    <div 
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: size,
        height: size,
        ...style 
      }} 
      className={className}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ 
          filter: glow ? 'drop-shadow(0 4px 12px rgba(0, 240, 255, 0.45))' : 'none',
          overflow: 'visible' 
        }}
      >
        <defs>
          {/* Head & Body Glossy Gradients */}
          <linearGradient id="headShine" x1="50" y1="20" x2="150" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          <linearGradient id="bodyShine" x1="60" y1="90" x2="140" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="65%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          <linearGradient id="visorDark" x1="60" y1="40" x2="140" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0a1526" />
            <stop offset="100%" stopColor="#030712" />
          </linearGradient>

          <filter id="eyeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <radialGradient id="chestBezel" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="80%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#0071ba" />
          </radialGradient>
        </defs>

        {/* 1. LEFT & RIGHT ARTICULATED ARMS */}
        {/* Left Arm */}
        <g>
          {/* Shoulder ball */}
          <circle cx="58" cy="118" r="9" fill="#e2e8f0" stroke="#334155" strokeWidth="2" />
          {/* Upper Arm Segment */}
          <rect x="42" y="122" width="7" height="18" rx="3.5" transform="rotate(20 42 122)" fill="#334155" />
          {/* Elbow Joint */}
          <circle cx="48" cy="142" r="5.5" fill="#1e293b" />
          {/* Forearm Guard */}
          <rect x="47" y="146" width="10" height="20" rx="5" transform="rotate(-15 47 146)" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
          {/* Cybernetic Hand with 3 fingers */}
          <rect x="54" y="164" width="9" height="9" rx="3" fill="#1e293b" />
          <path d="M54 173 L52 179 M58 173 L58 181 M62 173 L65 178" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Right Arm */}
        <g>
          {/* Shoulder ball */}
          <circle cx="142" cy="118" r="9" fill="#e2e8f0" stroke="#334155" strokeWidth="2" />
          {/* Upper Arm Segment */}
          <rect x="151" y="122" width="7" height="18" rx="3.5" transform="rotate(-20 151 122)" fill="#334155" />
          {/* Elbow Joint */}
          <circle cx="152" cy="142" r="5.5" fill="#1e293b" />
          {/* Forearm Guard */}
          <rect x="143" y="146" width="10" height="20" rx="5" transform="rotate(15 143 146)" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
          {/* Cybernetic Hand with 3 fingers */}
          <rect x="137" y="164" width="9" height="9" rx="3" fill="#1e293b" />
          <path d="M138 173 L135 178 M142 173 L142 181 M146 173 L148 179" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* 2. TORSO BODY */}
        {/* White Glossy Egg Torso */}
        <ellipse cx="100" cy="132" rx="38" ry="42" fill="url(#bodyShine)" stroke="#cbd5e1" strokeWidth="2" />
        
        {/* Dark Bottom Trim / Hover Base Joint */}
        <path d="M85 168 C90 174 110 174 115 168 Z" fill="#1e293b" />

        {/* 3. ATPL ARCHERY LOGO IN CENTER OF CHEST */}
        <g id="atpl-chest-logo-badge">
          {/* Outer Bezel Dial */}
          <circle cx="100" cy="126" r="21" fill="url(#chestBezel)" stroke="#0071ba" strokeWidth="2.5" />
          <circle cx="100" cy="126" r="18" fill="#ffffff" />
          <circle cx="100" cy="126" r="15.5" fill="none" stroke="rgba(0, 113, 186, 0.25)" strokeWidth="1" />

          {/* Scaled ATPL Logo Graphic (Center of Archery Badge) */}
          <g transform="translate(85.5, 111.5) scale(0.29)">
            {/* Top Blue Triangle Facet */}
            <polygon points="22,10.5 38,43 0,58 22,10.5" fill="#29A2E1" />
            {/* Middle Teal Accent */}
            <polygon points="23,54 44,53 29,73 23,54" fill="#0284c7" />
            {/* Bottom Blue Wing */}
            <polygon points="29,73 65,99.5 38,62 29,73" fill="#38bdf8" />
            {/* Dark Arrow Main Shaft */}
            <polygon points="0,85 38,51 83,22 75,34 0,85" fill="#334155" />
            {/* Dark Arrow Tip Diamond */}
            <polygon points="83,22 100,10.5 89,22.5 83,22" fill="#1e293b" />
            <polygon points="89,22.5 100,10.5 91.5,27.5 89,22.5" fill="#334155" />
            {/* Signature Coral Bow Arc (#E85874) */}
            <path 
              d="M42 0.5 C55 3 67 11 75.5 22.5 C84.5 35 88 50 85 65.5 C82 80 72.5 92 65 99.5 C67 92 72.5 78.5 74.5 65 C76.5 51.5 73 38 65 27 C57 16 47 9 42 0.5 Z" 
              fill="#E85874" 
            />
          </g>
        </g>

        {/* 4. NECK COLLAR */}
        <rect x="88" y="88" width="24" height="8" rx="4" fill="#1e293b" />

        {/* 5. ROBOT HEAD */}
        {/* Ear Pods */}
        <g>
          {/* Left Ear */}
          <rect x="44" y="52" width="10" height="24" rx="5" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1" />
          <circle cx="49" cy="64" r="4.5" fill="#E85874" />

          {/* Right Ear */}
          <rect x="146" y="52" width="10" height="24" rx="5" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1" />
          <circle cx="151" cy="64" r="4.5" fill="#E85874" />
        </g>

        {/* Glossy White Dome Head */}
        <ellipse cx="100" cy="62" rx="48" ry="38" fill="url(#headShine)" stroke="#cbd5e1" strokeWidth="2" />

        {/* Dark Curved Visor Screen */}
        <ellipse cx="100" cy="64" rx="36" ry="24" fill="url(#visorDark)" stroke="#0f172a" strokeWidth="1.5" />

        {/* 6. GLOWING CYAN PILL/OVAL EYES */}
        <g filter="url(#eyeGlow)">
          {/* Left Glowing Eye */}
          <rect x="76" y="57" width="15" height="14" rx="7" fill="#00f0ff" />
          {/* Eye Reflection highlight */}
          <ellipse cx="79" cy="61" rx="2" ry="3" fill="#ffffff" opacity="0.9" />

          {/* Right Glowing Eye */}
          <rect x="109" y="57" width="15" height="14" rx="7" fill="#00f0ff" />
          {/* Eye Reflection highlight */}
          <ellipse cx="112" cy="61" rx="2" ry="3" fill="#ffffff" opacity="0.9" />
        </g>

        {/* Top Gloss Highlight Sweep */}
        <path d="M72 35 C88 28 112 28 128 35 C116 31 84 31 72 35 Z" fill="#ffffff" opacity="0.6" />
      </svg>
    </div>
  );
};
