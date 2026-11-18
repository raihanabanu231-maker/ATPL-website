import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Cpu,
  Activity,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CustomerCollaborativeVideoSection = () => {
  const { openDemoModal } = useApp();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section
      id="collaborative-robotics-video"
      style={{
        position: 'relative',
        backgroundColor: '#050D1C',
        backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(1, 118, 211, 0.22) 0%, rgba(3, 15, 36, 0.95) 60%, #030a17 100%)',
        color: '#ffffff',
        padding: 'clamp(5rem, 8vw, 7.5rem) 0 clamp(4.5rem, 7vw, 6.5rem) 0',
        overflow: 'hidden',
        borderTop: '1px solid rgba(0, 240, 255, 0.15)',
        borderBottom: '1px solid rgba(0, 240, 255, 0.15)'
      }}
    >
      {/* Decorative Golden Star Accent (Matching Reference Screenshot) */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(32px, 6vw, 70px)',
          right: 'clamp(6%, 14vw, 18%)',
          zIndex: 20,
          pointerEvents: 'none'
        }}
      >
        <svg width="46" height="46" viewBox="0 0 24 24" fill="#FFB800" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z" />
        </svg>
      </div>

      <div
        className="container"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 clamp(1rem, 3vw, 2.5rem)',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto clamp(2.5rem, 4vw, 3.5rem) auto' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', backgroundColor: 'rgba(0, 240, 255, 0.1)', border: '1px solid rgba(0, 240, 255, 0.3)', marginBottom: '1.25rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00f0ff', boxShadow: '0 0 10px #00f0ff' }} />
            <span style={{ fontSize: '11.5px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#00f0ff' }}>
              COLLABORATIVE INTELLIGENCE // HUMAN &amp; ROBOTICS
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.2vw, 3.5rem)',
              fontWeight: 800,
              lineHeight: 1.18,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: '0 0 1.25rem 0'
            }}
          >
            Where Human Ingenuity Joins Industrial Precision Robotics
          </h2>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
              lineHeight: 1.65,
              color: '#94a3b8',
              maxWidth: '740px',
              margin: '0 auto',
              fontWeight: 450
            }}
          >
            Watch how ATPL engineers partner with shopfloor leaders to deploy millisecond computer vision, 
            cognitive laser marking, and automated RFID portals across 200+ enterprise mega-factories.
          </p>
        </div>

        {/* Video Showcase Card */}
        <div style={{ maxWidth: '1080px', margin: '0 auto', position: 'relative' }}>
          
          <div
            style={{
              position: 'relative',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 30px 90px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(0, 240, 255, 0.35)',
              backgroundColor: '#020b18',
              aspectRatio: '16 / 9',
              maxHeight: '600px'
            }}
          >
            {/* The Video Element */}
            <video
              ref={videoRef}
              src="/assets/videos/human_robot_handshake.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Video Gradient Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(2, 11, 24, 0.3) 0%, transparent 45%, rgba(2, 11, 24, 0.8) 100%)',
                pointerEvents: 'none'
              }}
            />

            {/* Top Left Status Badge */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 16px',
                borderRadius: '999px',
                backgroundColor: 'rgba(5, 12, 28, 0.85)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(0, 240, 255, 0.35)',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: '#ffffff',
                textTransform: 'uppercase'
              }}
            >
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
              <span>LIVE AUTOMATION TELEMETRY SYNC</span>
            </div>

            {/* Bottom Action Bar */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              {/* Action Button */}
              <button
                onClick={() => openDemoModal({ solution: 'Robotics & Vision Integration', notes: 'Inquiry from Collaborative Video Section' })}
                style={{
                  backgroundColor: '#00f0ff',
                  color: '#031738',
                  border: 'none',
                  padding: '10px 22px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <span>REQUEST PLANT WALKTHROUGH</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>

          {/* Three Live Plant Metric Badges below video */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem',
              marginTop: '2.5rem'
            }}
          >
            <div style={{ backgroundColor: 'rgba(11, 23, 48, 0.65)', border: '1px solid rgba(0, 240, 255, 0.2)', borderRadius: '16px', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: 'rgba(0, 240, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00f0ff' }}>
                <Activity size={20} />
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>&lt; 12ms</div>
                <div style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: 600 }}>Edge Scan-to-Cloud Latency</div>
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(11, 23, 48, 0.65)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '16px', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>99.99%</div>
                <div style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: 600 }}>First-Pass Optical Vision Grading</div>
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(11, 23, 48, 0.65)', border: '1px solid rgba(129, 140, 248, 0.25)', borderRadius: '16px', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: 'rgba(129, 140, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8' }}>
                <Layers size={20} />
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>Zero Escapes</div>
                <div style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: 600 }}>Pneumatic Rejection Gate Defense</div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};

export default CustomerCollaborativeVideoSection;

