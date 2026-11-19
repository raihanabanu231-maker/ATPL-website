import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { fetchInsightBySlug, fetchInsightsPosts } from '../../services/insightsService';
import { applyArticleSEO } from '../../utils/seoManager';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Eye, 
  Share2, 
  Linkedin, 
  Copy, 
  Check, 
  MessageSquare, 
  ChevronRight, 
  ArrowRight,
  BookOpen,
  Sparkles,
  ExternalLink,
  Tag,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';

export const InsightDetailView = () => {
  const { currentInsightSlug, navigateToInsight, setCurrentView, openDemoModal } = useApp();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [headings, setHeadings] = useState([]);
  const [activeHeadingId, setActiveHeadingId] = useState('');
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef(null);

  // Extract slug from URL if not already in context
  const slug = useMemo(() => {
    if (currentInsightSlug) return currentInsightSlug;
    if (typeof window !== 'undefined') {
      const parts = window.location.pathname.split('/').filter(Boolean);
      if (parts[0] === 'insights' && parts[1]) return parts[1];
      const hashParts = (window.location.hash || '').replace(/^#\/?/, '').split('/');
      if (hashParts[0] === 'insights' && hashParts[1]) return hashParts[1];
    }
    return '';
  }, [currentInsightSlug]);

  // Load post data
  useEffect(() => {
    if (!slug) return;
    let isMounted = true;
    setLoading(true);

    fetchInsightBySlug(slug).then(data => {
      if (isMounted) {
        setPost(data);
        setLoading(false);
        if (data) {
          applyArticleSEO(data);
        }
      }
    }).catch(() => {
      if (isMounted) setLoading(false);
    });

    return () => { isMounted = false; };
  }, [slug]);

  // Fetch related and prev/next posts
  useEffect(() => {
    if (!post) return;
    let isMounted = true;

    fetchInsightsPosts({ status: 'published', limit: 20 }).then(res => {
      if (!isMounted) return;
      const all = res.posts || [];
      const currentIndex = all.findIndex(p => p.slug === post.slug);

      if (currentIndex !== -1) {
        setPrevPost(currentIndex > 0 ? all[currentIndex - 1] : null);
        setNextPost(currentIndex < all.length - 1 ? all[currentIndex + 1] : null);
      }

      // Related: same category, excluding current
      const related = all.filter(p => p.category === post.category && p.slug !== post.slug).slice(0, 3);
      if (related.length === 0) {
        // Fallback to any other articles
        setRelatedPosts(all.filter(p => p.slug !== post.slug).slice(0, 3));
      } else {
        setRelatedPosts(related);
      }
    });

    return () => { isMounted = false; };
  }, [post]);

  // Parse HTML headings for Table of Contents (TOC) & Scroll Spy
  useEffect(() => {
    if (!post || !contentRef.current) return;

    const hElements = contentRef.current.querySelectorAll('h2, h3');
    const parsedHeadings = [];

    hElements.forEach((h, index) => {
      const id = h.id || `heading-${index}-${h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      h.id = id;
      parsedHeadings.push({
        id,
        text: h.textContent,
        level: h.tagName.toLowerCase() === 'h2' ? 2 : 3
      });
    });

    setHeadings(parsedHeadings);

    // Scroll spy observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveHeadingId(entry.target.id);
        }
      });
    }, { rootMargin: '-100px 0px -60% 0px' });

    hElements.forEach(h => observer.observe(h));

    return () => {
      hElements.forEach(h => observer.unobserve(h));
    };
  }, [post]);

  const scrollToHeading = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveHeadingId(id);
    }
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      toast.success('Teardown Link Copied!', {
        description: 'Direct article URL saved to your clipboard.'
      });
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      toast.error('Unable to copy link');
    });
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post?.title || 'ATPL Insights');
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const handleShareWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Read this ATPL Technical Teardown: "${post?.title}"\n${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const formatDate = (isoString) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch {
      return 'Recently Published';
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '80vh',
        background: '#040812',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.25rem',
        color: '#00f0ff'
      }}>
        <div style={{
          width: '46px',
          height: '46px',
          border: '3px solid rgba(0, 240, 255, 0.2)',
          borderTopColor: '#00f0ff',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
        <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
          Loading Field Teardown...
        </span>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{
        minHeight: '80vh',
        background: '#040812',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
        color: '#f8fafc'
      }}>
        <BookOpen size={54} color="#E85874" style={{ marginBottom: '1rem' }} />
        <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 1rem' }}>Article Not Found</h2>
        <p style={{ color: '#94a3b8', maxWidth: '440px', margin: '0 0 2rem' }}>
          The requested technical teardown could not be located. It may have been relocated or updated.
        </p>
        <button
          onClick={() => setCurrentView('insights')}
          style={{
            background: 'linear-gradient(135deg, #0071ba 0%, #00f0ff 100%)',
            color: '#040812',
            border: 'none',
            padding: '0.75rem 1.75rem',
            borderRadius: '8px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          ← Return to All Insights
        </button>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #040812 0%, #060b14 100%)',
      color: '#f8fafc',
      paddingBottom: '6rem'
    }}>
      {/* 1. TOP BREADCRUMB & BACK LINK */}
      <div style={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(9, 14, 26, 0.85)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0.85rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <button
            onClick={() => setCurrentView('insights')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#00f0ff',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.86rem',
              fontWeight: 600,
              cursor: 'pointer',
              padding: 0
            }}
          >
            <ArrowLeft size={16} />
            <span>All Insights</span>
          </button>

          {/* Social Share Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', marginRight: '0.25rem' }}>Share:</span>
            <button
              onClick={handleShareLinkedIn}
              title="Share on LinkedIn"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#38bdf8',
                borderRadius: '8px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Linkedin size={15} />
            </button>
            <button
              onClick={handleShareWhatsApp}
              title="Share on WhatsApp"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#22c55e',
                borderRadius: '8px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <MessageSquare size={15} />
            </button>
            <button
              onClick={handleCopyLink}
              title="Copy link"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: copied ? '#00f0ff' : '#cbd5e1',
                borderRadius: '8px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
            </button>
          </div>
        </div>
      </div>

      {/* 2. ARTICLE HEADER */}
      <header style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '3.5rem 1.5rem 2rem',
        textAlign: 'center'
      }}>
        {/* Category Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          background: 'rgba(0, 240, 255, 0.1)',
          border: '1px solid rgba(0, 240, 255, 0.35)',
          color: '#00f0ff',
          padding: '0.35rem 0.95rem',
          borderRadius: '999px',
          fontSize: '0.78rem',
          fontWeight: 700,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          marginBottom: '1.5rem'
        }}>
          <Sparkles size={13} color="#00f0ff" />
          <span>{post.category}</span>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(2rem, 4.2vw, 3.4rem)',
          fontWeight: 800,
          lineHeight: 1.2,
          letterSpacing: '-0.025em',
          color: '#ffffff',
          margin: '0 0 1.75rem',
          fontFamily: 'var(--font-display, sans-serif)'
        }}>
          {post.title}
        </h1>

        {/* Excerpt Lead */}
        <p style={{
          fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
          lineHeight: 1.65,
          color: '#94a3b8',
          maxWidth: '820px',
          margin: '0 auto 2.5rem'
        }}>
          {post.excerpt}
        </p>

        {/* Author & Meta Line */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          paddingBottom: '2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img
              src={post.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
              alt={post.author?.name || 'Author'}
              style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #00f0ff' }}
            />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff' }}>{post.author?.name}</div>
              <div style={{ fontSize: '0.76rem', color: '#94a3b8' }}>{post.author?.role}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#94a3b8', fontSize: '0.84rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Calendar size={14} color="#00f0ff" />
              {formatDate(post.publishedAt)}
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Clock size={14} color="#E85874" />
              {post.readingTime || '6 min read'}
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Eye size={14} color="#10b981" />
              {(post.views || 0) + 1} views
            </span>
          </div>
        </div>
      </header>

      {/* 3. COVER IMAGE */}
      <div style={{ maxWidth: '1100px', margin: '0 auto 3.5rem', padding: '0 1.5rem' }}>
        <div style={{
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid rgba(0, 240, 255, 0.2)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(0, 240, 255, 0.1)',
          maxHeight: '520px'
        }}>
          <img
            src={post.coverImage}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* 4. MAIN ARTICLE GRID WITH STICKY TABLE OF CONTENTS */}
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '0 1.5rem',
        display: 'grid',
        gridTemplateColumns: headings.length > 0 ? 'minmax(0, 1fr) 280px' : '1fr',
        gap: '3.5rem',
        alignItems: 'start'
      }}>
        
        {/* ARTICLE BODY */}
        <article style={{ minWidth: 0 }}>
          <div
            ref={contentRef}
            className="insight-rich-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              margin: '3rem 0 2rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem', marginRight: '0.5rem' }}>
                <Tag size={14} /> Technologies:
              </span>
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    background: 'rgba(0, 240, 255, 0.06)',
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                    color: '#00f0ff',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 600
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Bottom Social Share */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '1.25rem 1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            margin: '2rem 0 3.5rem'
          }}>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff' }}>Found this blueprint insightful?</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Share it with plant managers, automation leads, and peers.</div>
            </div>
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <button
                onClick={handleShareLinkedIn}
                style={{
                  background: '#0a66c2',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  cursor: 'pointer'
                }}
              >
                <Linkedin size={15} />
                <span>LinkedIn</span>
              </button>
              <button
                onClick={handleShareWhatsApp}
                style={{
                  background: '#25D366',
                  color: '#040812',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  cursor: 'pointer'
                }}
              >
                <MessageSquare size={15} />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={handleCopyLink}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  cursor: 'pointer'
                }}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                <span>{copied ? 'Copied' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* 5. REQUEST DEMO CTA BANNER */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 113, 186, 0.25) 0%, rgba(232, 88, 116, 0.15) 100%)',
            border: '1px solid rgba(0, 240, 255, 0.35)',
            borderRadius: '20px',
            padding: '2.5rem',
            textAlign: 'left',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 240, 255, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '3.5rem'
          }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                color: '#00f0ff',
                fontSize: '0.76rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
                fontFamily: 'var(--font-mono)'
              }}>
                <Sparkles size={14} color="#00f0ff" />
                <span>FACTORY AUTOMATION CONSULTATION</span>
              </div>
              <h3 style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)', fontWeight: 800, color: '#ffffff', margin: '0 0 0.85rem' }}>
                Need a Custom Solution for Your Plant Floor?
              </h3>
              <p style={{ color: '#cbd5e1', maxWidth: '640px', margin: '0 0 1.75rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
                ATPL specializes in turnkey engineering: RFID portals, sub-10ms vision inspection, and ERP-integrated shopfloor automation. Book a direct walkthrough with our solutions engineers.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => openDemoModal()}
                  style={{
                    background: 'linear-gradient(135deg, #00f0ff 0%, #0071ba 100%)',
                    color: '#040812',
                    border: 'none',
                    padding: '0.8rem 1.8rem',
                    borderRadius: '10px',
                    fontWeight: 800,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)'
                  }}
                >
                  Request Plant Walkthrough
                </button>
                <button
                  onClick={() => {
                    window.location.hash = '#demos';
                  }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '10px',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    cursor: 'pointer'
                  }}
                >
                  Test 3D Simulator
                </button>
              </div>
            </div>
          </div>

          {/* 6. PREVIOUS & NEXT ARTICLE NAVIGATION */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '4rem'
          }}>
            {prevPost ? (
              <div
                onClick={() => navigateToInsight(prevPost.slug)}
                style={{
                  background: 'rgba(15, 23, 42, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px',
                  padding: '1.25rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.4)';
                  e.currentTarget.style.transform = 'translateX(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div style={{ fontSize: '0.74rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <ArrowLeft size={13} color="#00f0ff" /> Previous Teardown
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.35 }}>
                  {prevPost.title}
                </div>
              </div>
            ) : <div />}

            {nextPost && (
              <div
                onClick={() => navigateToInsight(nextPost.slug)}
                style={{
                  background: 'rgba(15, 23, 42, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px',
                  padding: '1.25rem',
                  cursor: 'pointer',
                  textAlign: 'right',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.4)';
                  e.currentTarget.style.transform = 'translateX(3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div style={{ fontSize: '0.74rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.3rem' }}>
                  Next Teardown <ArrowRight size={13} color="#00f0ff" />
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.35 }}>
                  {nextPost.title}
                </div>
              </div>
            )}
          </div>

        </article>

        {/* STICKY SIDEBAR: TABLE OF CONTENTS */}
        {headings.length > 0 && (
          <aside style={{
            position: 'sticky',
            top: '80px',
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(0, 240, 255, 0.15)',
            borderRadius: '16px',
            padding: '1.5rem',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.78rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#00f0ff',
              marginBottom: '1rem',
              fontFamily: 'var(--font-mono)'
            }}>
              <BookOpen size={15} color="#00f0ff" />
              <span>TABLE OF CONTENTS</span>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {headings.map(h => {
                const active = activeHeadingId === h.id;
                return (
                  <button
                    key={h.id}
                    onClick={() => scrollToHeading(h.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      textAlign: 'left',
                      padding: '0.4rem 0.6rem',
                      paddingLeft: h.level === 3 ? '1.25rem' : '0.6rem',
                      borderRadius: '6px',
                      fontSize: '0.82rem',
                      color: active ? '#00f0ff' : '#94a3b8',
                      fontWeight: active ? 700 : 500,
                      cursor: 'pointer',
                      borderLeft: active ? '2px solid #00f0ff' : '2px solid transparent',
                      transition: 'all 0.15s ease',
                      lineHeight: 1.4
                    }}
                    onMouseEnter={(e) => {
                      if (!active) e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      if (!active) e.currentTarget.style.color = '#94a3b8';
                    }}
                  >
                    {h.text}
                  </button>
                );
              })}
            </nav>

            {/* Quick Demo Button in Sidebar */}
            <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <button
                onClick={() => openDemoModal()}
                style={{
                  width: '100%',
                  background: 'rgba(0, 240, 255, 0.1)',
                  border: '1px solid rgba(0, 240, 255, 0.3)',
                  color: '#00f0ff',
                  padding: '0.6rem 0.85rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                <span>Request Demo</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </aside>
        )}

      </div>

      {/* 7. RELATED POSTS SECTION */}
      {relatedPosts.length > 0 && (
        <section style={{
          maxWidth: '1240px',
          margin: '4rem auto 0',
          padding: '0 1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '3.5rem'
        }}>
          <h3 style={{
            fontSize: '1.45rem',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Sparkles size={20} color="#00f0ff" />
            <span>Related Technical Teardowns</span>
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {relatedPosts.map(rel => (
              <div
                key={rel.id || rel.slug}
                onClick={() => navigateToInsight(rel.slug)}
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.35)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div style={{ height: '170px', overflow: 'hidden' }}>
                  <img
                    src={rel.coverImage}
                    alt={rel.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ fontSize: '0.74rem', color: '#00f0ff', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    {rel.category}
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.35, margin: '0 0 0.65rem' }}>
                    {rel.title}
                  </h4>
                  <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.5, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {rel.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Embedded CSS for Rich Article Typography, Tables, and Code Blocks */}
      <style>{`
        .insight-rich-content {
          font-size: 1.08rem;
          line-height: 1.8;
          color: #cbd5e1;
          font-family: inherit;
        }
        .insight-rich-content h2 {
          font-size: clamp(1.45rem, 2.2vw, 1.95rem);
          font-weight: 800;
          color: #ffffff;
          margin: 2.75rem 0 1.25rem;
          font-family: var(--font-display, sans-serif);
          scroll-margin-top: 100px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .insight-rich-content h2::before {
          content: "";
          display: inline-block;
          width: 4px;
          height: 1.1em;
          background: linear-gradient(180deg, #00f0ff 0%, #0071ba 100%);
          border-radius: 2px;
        }
        .insight-rich-content h3 {
          font-size: 1.3rem;
          font-weight: 700;
          color: #f1f5f9;
          margin: 2rem 0 1rem;
          scroll-margin-top: 100px;
        }
        .insight-rich-content p {
          margin: 0 0 1.5rem;
        }
        .insight-rich-content blockquote {
          margin: 2rem 0;
          padding: 1.25rem 1.75rem;
          background: rgba(0, 240, 255, 0.05);
          border-left: 4px solid #00f0ff;
          border-radius: 0 12px 12px 0;
          font-style: italic;
          color: #e2e8f0;
          font-size: 1.12rem;
          line-height: 1.6;
        }
        .insight-rich-content .insight-table-wrapper {
          overflow-x: auto;
          margin: 2rem 0;
          border-radius: 12px;
          border: 1px solid rgba(0, 240, 255, 0.2);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }
        .insight-rich-content table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
          text-align: left;
        }
        .insight-rich-content th {
          background: rgba(15, 23, 42, 0.95);
          color: #00f0ff;
          padding: 0.85rem 1.2rem;
          font-weight: 700;
          border-bottom: 1px solid rgba(0, 240, 255, 0.2);
          font-family: var(--font-mono, monospace);
        }
        .insight-rich-content td {
          padding: 0.85rem 1.2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          color: #cbd5e1;
        }
        .insight-rich-content tr:nth-child(even) td {
          background: rgba(15, 23, 42, 0.35);
        }
        .insight-rich-content pre {
          background: #090e1a;
          border: 1px solid rgba(0, 240, 255, 0.2);
          border-radius: 12px;
          padding: 1.25rem;
          overflow-x: auto;
          margin: 2rem 0;
          font-family: var(--font-mono, monospace);
          font-size: 0.88rem;
          line-height: 1.5;
          color: #38bdf8;
        }
        .insight-rich-content code {
          font-family: var(--font-mono, monospace);
        }
        @media (max-width: 900px) {
          .insight-rich-content {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};
