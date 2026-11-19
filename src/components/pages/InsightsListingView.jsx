import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { fetchInsightsPosts } from '../../services/insightsService';
import { INSIGHTS_CATEGORIES } from '../../data/seedInsightsPosts';
import { 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  Layers, 
  CheckCircle2, 
  ChevronRight,
  TrendingUp,
  Cpu,
  BookOpen,
  Eye,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const InsightsListingView = () => {
  const { navigateToInsight, openDemoModal } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPostsCount, setTotalPostsCount] = useState(0);

  // Fetch posts from API / fallback service
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchInsightsPosts({
      category: selectedCategory,
      search: searchQuery,
      status: 'published',
      page: 1,
      limit: 12
    }).then(res => {
      if (isMounted) {
        setPosts(res.posts || []);
        setTotalPages(res.pagination?.totalPages || 1);
        setTotalPostsCount(res.pagination?.total || 0);
        setLoading(false);
      }
    }).catch(() => {
      if (isMounted) setLoading(false);
    });

    return () => { isMounted = false; };
  }, [selectedCategory, searchQuery]);

  // Featured post is the first article if no active filter, or the top matched article
  const featuredPost = useMemo(() => {
    if (posts.length > 0) return posts[0];
    return null;
  }, [posts]);

  // Remaining articles for grid
  const gridPosts = useMemo(() => {
    if (posts.length > 1) return posts.slice(1);
    return [];
  }, [posts]);

  const formatDate = (isoString) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return 'Recently Published';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #040812 0%, #060b14 100%)',
      color: '#f8fafc',
      paddingBottom: '6rem'
    }}>
      {/* 1. HERO SECTION */}
      <section style={{
        position: 'relative',
        padding: '5rem 1.5rem 3.5rem',
        borderBottom: '1px solid rgba(0, 240, 255, 0.12)',
        overflow: 'hidden'
      }}>
        {/* Glow ambient background aura */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '750px',
          height: '420px',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.12) 0%, rgba(232, 88, 116, 0.08) 50%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          
          {/* Engineering Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(0, 240, 255, 0.08)',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            borderRadius: '999px',
            padding: '0.4rem 1.1rem',
            marginBottom: '1.5rem',
            fontSize: '0.78rem',
            fontFamily: 'var(--font-mono, monospace)',
            letterSpacing: '0.08em',
            color: '#00f0ff',
            textTransform: 'uppercase'
          }}>
            <Sparkles size={14} color="#00f0ff" />
            <span>Field Deployment Notes &amp; Teardowns</span>
          </div>

          {/* Hero Title */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            margin: '0 0 1.25rem',
            background: 'linear-gradient(135deg, #ffffff 30%, #94a3b8 70%, #00f0ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: 'var(--font-display, sans-serif)'
          }}>
            Insights
          </h1>

          {/* Required Subtitle */}
          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            color: '#94a3b8',
            maxWidth: '820px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6
          }}>
            Field deployment notes, implementation blueprints, and technical teardowns from ATPL's plant installations across India.
          </p>

          {/* Search Bar */}
          <div style={{
            maxWidth: '680px',
            margin: '0 auto 2.5rem',
            position: 'relative'
          }}>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid rgba(0, 240, 255, 0.25)',
              borderRadius: '14px',
              padding: '0.35rem 0.6rem 0.35rem 1.25rem',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 12px rgba(0, 240, 255, 0.05)',
              backdropFilter: 'blur(12px)'
            }}>
              <Search size={20} color="#00f0ff" style={{ flexShrink: 0, marginRight: '0.85rem' }} />
              <input
                type="text"
                placeholder="Search by title, technology, client (Ola, Sundram, Proconnect) or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '0.96rem',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    color: '#94a3b8',
                    borderRadius: '8px',
                    padding: '0.3rem 0.6rem',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    marginRight: '0.5rem'
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Chips */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.65rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {INSIGHTS_CATEGORIES.map(category => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    background: active 
                      ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.22) 0%, rgba(0, 113, 186, 0.3) 100%)' 
                      : 'rgba(15, 23, 42, 0.65)',
                    border: active 
                      ? '1px solid #00f0ff' 
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    color: active ? '#ffffff' : '#94a3b8',
                    padding: '0.55rem 1.15rem',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    fontWeight: active ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: active ? '0 0 15px rgba(0, 240, 255, 0.3)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem'
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.35)';
                      e.currentTarget.style.color = '#ffffff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.color = '#94a3b8';
                    }
                  }}
                >
                  {active && <CheckCircle2 size={13} color="#00f0ff" />}
                  <span>{category}</span>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* 2. MAIN CONTENT AREA */}
      <main style={{ maxWidth: '1240px', margin: '3.5rem auto 0', padding: '0 1.5rem' }}>
        
        {/* Loading Skeletons */}
        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2rem' }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} style={{
                background: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '16px',
                height: '420px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ height: '200px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '12px' }} />
                <div style={{ height: '24px', width: '40%', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '6px' }} />
                <div style={{ height: '28px', width: '85%', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '6px' }} />
                <div style={{ height: '40px', width: '100%', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '6px' }} />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '5rem 2rem',
            background: 'rgba(15, 23, 42, 0.4)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <BookOpen size={48} color="#00f0ff" style={{ margin: '0 auto 1.25rem', opacity: 0.8 }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.75rem', color: '#ffffff' }}>
              No Technical Insights Found
            </h3>
            <p style={{ color: '#94a3b8', maxWidth: '480px', margin: '0 auto 1.5rem', fontSize: '0.95rem' }}>
              We couldn't find any articles matching your search for "{searchQuery}". Try selecting "All" categories or adjusting your keywords.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
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
              Reset Filters
            </button>
          </div>
        )}

        {/* FEATURED POST (Hero Card) */}
        {!loading && featuredPost && !searchQuery && selectedCategory === 'All' && (
          <div style={{ marginBottom: '3.5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.78rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#00f0ff',
              marginBottom: '1rem',
              fontFamily: 'var(--font-mono, monospace)'
            }}>
              <TrendingUp size={16} color="#00f0ff" />
              <span>FEATURED FIELD TEARDOWN</span>
            </div>

            <div
              onClick={() => navigateToInsight(featuredPost.slug)}
              style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(9, 14, 26, 0.95) 100%)',
                border: '1px solid rgba(0, 240, 255, 0.25)',
                borderRadius: '24px',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 240, 255, 0.1)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#00f0ff';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 240, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.25)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 240, 255, 0.1)';
              }}
            >
              {/* Cover Image */}
              <div style={{ position: 'relative', minHeight: '320px', overflow: 'hidden' }}>
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to right, transparent 60%, rgba(15, 23, 42, 0.95) 100%)'
                }} />
                <div style={{
                  position: 'absolute',
                  top: '1.25rem',
                  left: '1.25rem',
                  background: 'rgba(4, 9, 20, 0.85)',
                  border: '1px solid rgba(0, 240, 255, 0.4)',
                  backdropFilter: 'blur(8px)',
                  color: '#00f0ff',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em'
                }}>
                  {featuredPost.category}
                </div>
              </div>

              {/* Card Body */}
              <div style={{
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#94a3b8', fontSize: '0.82rem', marginBottom: '1rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={14} color="#00f0ff" />
                      {formatDate(featuredPost.publishedAt)}
                    </span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={14} color="#E85874" />
                      {featuredPost.readingTime || '7 min read'}
                    </span>
                  </div>

                  <h2 style={{
                    fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)',
                    fontWeight: 800,
                    lineHeight: 1.25,
                    color: '#ffffff',
                    margin: '0 0 1rem',
                    fontFamily: 'var(--font-display, sans-serif)'
                  }}>
                    {featuredPost.title}
                  </h2>

                  <p style={{
                    fontSize: '0.98rem',
                    lineHeight: 1.6,
                    color: '#cbd5e1',
                    margin: '0 0 1.5rem'
                  }}>
                    {featuredPost.excerpt}
                  </p>

                  {/* Tags */}
                  {featuredPost.tags && featuredPost.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '2rem' }}>
                      {featuredPost.tags.slice(0, 4).map((tag, tIdx) => (
                        <span key={tIdx} style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '6px',
                          padding: '0.25rem 0.55rem',
                          fontSize: '0.74rem',
                          color: '#94a3b8'
                        }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Author & CTA */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <img
                      src={featuredPost.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
                      alt={featuredPost.author?.name || 'Author'}
                      style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #00f0ff' }}
                    />
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>{featuredPost.author?.name}</div>
                      <div style={{ fontSize: '0.76rem', color: '#94a3b8' }}>{featuredPost.author?.role}</div>
                    </div>
                  </div>

                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: '#00f0ff',
                    fontWeight: 700,
                    fontSize: '0.9rem'
                  }}>
                    <span>Read Teardown</span>
                    <ArrowRight size={16} />
                  </span>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* 3. CARD GRID OF INSIGHTS */}
        {!loading && (
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.75rem'
            }}>
              <h3 style={{
                fontSize: '1.35rem',
                fontWeight: 700,
                color: '#ffffff',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Cpu size={20} color="#00f0ff" />
                <span>
                  {searchQuery ? `Search Results (${totalPostsCount})` : selectedCategory === 'All' ? 'Latest Plant Deployments' : `${selectedCategory} (${posts.length})`}
                </span>
              </h3>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '2rem'
            }}>
              {(searchQuery || selectedCategory !== 'All' ? posts : gridPosts).map((post) => (
                <div
                  key={post.id || post.slug}
                  onClick={() => navigateToInsight(post.slug)}
                  style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 240, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Cover Image */}
                  <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      background: 'rgba(4, 9, 20, 0.85)',
                      border: '1px solid rgba(0, 240, 255, 0.3)',
                      backdropFilter: 'blur(8px)',
                      color: '#00f0ff',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '999px',
                      fontSize: '0.72rem',
                      fontWeight: 700
                    }}>
                      {post.category}
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#94a3b8', fontSize: '0.78rem', marginBottom: '0.75rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Calendar size={13} color="#00f0ff" />
                          {formatDate(post.publishedAt)}
                        </span>
                        <span>•</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Clock size={13} color="#E85874" />
                          {post.readingTime || '6 min read'}
                        </span>
                      </div>

                      <h4 style={{
                        fontSize: '1.18rem',
                        fontWeight: 700,
                        lineHeight: 1.35,
                        color: '#ffffff',
                        margin: '0 0 0.85rem'
                      }}>
                        {post.title}
                      </h4>

                      <p style={{
                        fontSize: '0.88rem',
                        lineHeight: 1.6,
                        color: '#94a3b8',
                        margin: '0 0 1.25rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Footer Author & Arrow */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '1rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <img
                          src={post.author?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'}
                          alt={post.author?.name || 'Author'}
                          style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f1f5f9' }}>{post.author?.name}</div>
                          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{post.author?.role}</div>
                        </div>
                      </div>

                      <span style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(0, 240, 255, 0.08)',
                        border: '1px solid rgba(0, 240, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#00f0ff'
                      }}>
                        <ArrowRight size={15} />
                      </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. BOTTOM PLANT WALKTHROUGH CTA BANNER */}
        <div style={{
          marginTop: '5rem',
          background: 'linear-gradient(135deg, rgba(0, 113, 186, 0.15) 0%, rgba(232, 88, 116, 0.1) 100%)',
          border: '1px solid rgba(0, 240, 255, 0.25)',
          borderRadius: '24px',
          padding: '3rem 2rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <h3 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', fontWeight: 800, color: '#ffffff', margin: '0 0 1rem' }}>
            Looking to Deploy Similar Automation at Your Plant?
          </h3>
          <p style={{ color: '#94a3b8', maxWidth: '640px', margin: '0 auto 2rem', fontSize: '1rem', lineHeight: 1.6 }}>
            Our senior automation and RFID systems architects offer zero-cost feasibility studies and on-site line audits across India.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => openDemoModal()}
              style={{
                background: 'linear-gradient(135deg, #00f0ff 0%, #0071ba 100%)',
                color: '#040812',
                border: 'none',
                padding: '0.85rem 2rem',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(0, 240, 255, 0.35)'
              }}
            >
              Request Plant Walkthrough
            </button>
            <button
              onClick={() => {
                window.location.hash = '#demos';
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '0.85rem 1.85rem',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer'
              }}
            >
              Explore 3D Digital Twin
            </button>
          </div>
        </div>

      </main>
    </div>
  );
};
