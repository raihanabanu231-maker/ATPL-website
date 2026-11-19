import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  fetchInsightsPosts, 
  createInsightPost, 
  updateInsightPost, 
  deleteInsightPost 
} from '../../services/insightsService';
import { INSIGHTS_CATEGORIES, INITIAL_INSIGHTS_POSTS } from '../../data/seedInsightsPosts';
import {
  FileText,
  Plus,
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  Eye,
  CheckCircle2,
  AlertCircle,
  Save,
  X,
  Sparkles,
  Layers,
  Heading1,
  Heading2,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Code,
  Table as TableIcon,
  RefreshCw,
  Globe,
  Sliders,
  Calendar,
  Clock,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { toast } from 'sonner';

export const AdminInsightsManager = () => {
  const { authSession, navigateToInsight } = useApp();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal / Editor State
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [activeTab, setActiveTab] = useState('edit'); // 'edit' | 'preview' | 'seo'

  // Form Fields
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Automotive & EV',
    tags: '',
    excerpt: '',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    status: 'published',
    readingTime: '6 min read',
    authorName: 'ATPL Automation Lead',
    authorRole: 'Senior Solutions Architect',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    seoTitle: '',
    seoDescription: '',
    ogImage: ''
  });

  const [saving, setSaving] = useState(false);
  const textareaRef = useRef(null);

  // Load all posts for admin (including drafts)
  const loadPosts = async () => {
    setLoading(true);
    try {
      const res = await fetchInsightsPosts({ status: 'all', limit: 50 });
      setPosts(res.posts || []);
    } catch (err) {
      toast.error('Failed to load insights posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter(p => {
      const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      const q = search.toLowerCase().trim();
      const matchQuery = !q || 
        p.title?.toLowerCase().includes(q) || 
        p.slug?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.author?.name?.toLowerCase().includes(q);
      return matchCat && matchStatus && matchQuery;
    });
  }, [posts, categoryFilter, statusFilter, search]);

  // Open Editor for New Post
  const handleOpenNew = () => {
    setEditingPostId(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Automotive & EV',
      tags: 'IoT, Vision AI, Automation, Traceability',
      excerpt: '',
      content: `<h2>Executive Summary</h2>\n<p>Describe the client challenge, installation scope, and throughput SLA.</p>\n\n<h2>System Architecture</h2>\n<p>Explain the sensor integration, PLC communication, and optical configuration.</p>\n\n<blockquote>"Direct quote from client plant head or ATPL lead architect."</blockquote>\n\n<h2>Shopfloor Metrics &amp; ROI</h2>\n<p>Summarize the reduction in defect escapes and line stop savings.</p>`,
      coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      status: 'published',
      readingTime: '6 min read',
      authorName: authSession?.name || 'ATPL Automation Lead',
      authorRole: 'Senior Solutions Architect',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      seoTitle: '',
      seoDescription: '',
      ogImage: ''
    });
    setActiveTab('edit');
    setEditorOpen(true);
  };

  // Open Editor for Editing existing Post
  const handleOpenEdit = (post) => {
    setEditingPostId(post.id);
    setFormData({
      title: post.title || '',
      slug: post.slug || '',
      category: post.category || 'Automotive & EV',
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || ''),
      excerpt: post.excerpt || '',
      content: post.content || '',
      coverImage: post.coverImage || '',
      status: post.status || 'published',
      readingTime: post.readingTime || '6 min read',
      authorName: post.author?.name || 'ATPL Automation Lead',
      authorRole: post.author?.role || 'Senior Solutions Architect',
      authorAvatar: post.author?.avatar || '',
      seoTitle: post.seoTitle || post.title || '',
      seoDescription: post.seoDescription || post.excerpt || '',
      ogImage: post.ogImage || post.coverImage || ''
    });
    setActiveTab('edit');
    setEditorOpen(true);
  };

  // Auto-generate slug when title changes in new mode
  const handleTitleChange = (val) => {
    setFormData(prev => {
      const generatedSlug = !editingPostId 
        ? val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        : prev.slug;
      return {
        ...prev,
        title: val,
        slug: generatedSlug,
        seoTitle: prev.seoTitle === prev.title || !prev.seoTitle ? val : prev.seoTitle
      };
    });
  };

  // Insert Rich Text Formatting at Cursor
  const insertFormatting = (prefix, suffix = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = textarea.value.substring(start, end);
    const replacement = `${prefix}${selected || 'Sample Text'}${suffix}`;

    const newContent = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
    setFormData(prev => ({ ...prev, content: newContent }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + replacement.length - suffix.length);
    }, 50);
  };

  // Insert HTML Table Template
  const insertTableTemplate = () => {
    const tableHtml = `\n<div class="insight-table-wrapper">\n  <table>\n    <thead>\n      <tr>\n        <th>Specification</th>\n        <th>Legacy Bench</th>\n        <th>ATPL Solution</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Cycle Latency</td>\n        <td>28 ms</td>\n        <td><strong>6.4 ms</strong></td>\n      </tr>\n      <tr>\n        <td>Verification Rate</td>\n        <td>98.2%</td>\n        <td><strong>99.99%</strong></td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n`;
    insertFormatting(tableHtml);
  };

  // Save or Update Post
  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Title and content are required');
      return;
    }

    setSaving(true);
    const token = authSession?.token || 'admin-authenticated';

    const postPayload = {
      title: formData.title.trim(),
      slug: formData.slug.trim() || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: formData.category,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      excerpt: formData.excerpt.trim(),
      content: formData.content,
      coverImage: formData.coverImage.trim(),
      status: formData.status,
      readingTime: formData.readingTime.trim() || '6 min read',
      author: {
        name: formData.authorName.trim(),
        role: formData.authorRole.trim(),
        avatar: formData.authorAvatar.trim()
      },
      seoTitle: formData.seoTitle.trim() || formData.title.trim(),
      seoDescription: formData.seoDescription.trim() || formData.excerpt.trim(),
      ogImage: formData.ogImage.trim() || formData.coverImage.trim()
    };

    try {
      if (editingPostId) {
        await updateInsightPost(editingPostId, postPayload, token);
        toast.success('Teardown Article Updated!', {
          description: `"${postPayload.title}" has been saved.`
        });
      } else {
        await createInsightPost(postPayload, token);
        toast.success('New Insight Published!', {
          description: `"${postPayload.title}" is now live.`
        });
      }
      setEditorOpen(false);
      loadPosts();
    } catch (err) {
      toast.error('Failed to save article');
    } finally {
      setSaving(false);
    }
  };

  // Toggle Post Status (Published / Draft)
  const handleToggleStatus = async (post) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    const token = authSession?.token || 'admin-authenticated';
    try {
      await updateInsightPost(post.id, { status: newStatus }, token);
      toast.success(`Article set to ${newStatus.toUpperCase()}`);
      loadPosts();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  // Delete Post
  const handleDelete = async (post) => {
    if (!window.confirm(`Are you sure you want to delete "${post.title}"?`)) return;
    const token = authSession?.token || 'admin-authenticated';
    try {
      await deleteInsightPost(post.id, token);
      toast.success('Article deleted');
      loadPosts();
    } catch (err) {
      toast.error('Failed to delete post');
    }
  };

  return (
    <div style={{ color: '#ffffff', minHeight: '100%' }}>
      
      {/* 1. TOP HEADER & METRICS BAR */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            margin: '0 0 0.4rem',
            fontFamily: 'var(--font-display, sans-serif)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem'
          }}>
            <FileText size={24} color="#00f0ff" />
            <span>Insights &amp; Technical Teardowns</span>
          </h2>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.88rem' }}>
            Manage technical articles, field blueprints, SEO meta tags, and plant deployment teardowns.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={loadPosts}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8' }}
            title="Refresh articles"
          >
            <RefreshCw size={14} className={loading ? 'spin' : ''} />
            <span>Sync</span>
          </button>

          <button
            onClick={handleOpenNew}
            className="btn btn-cyan btn-sm"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontWeight: 700,
              padding: '0.55rem 1.15rem'
            }}
          >
            <Plus size={16} />
            <span>New Insight Post</span>
          </button>
        </div>
      </div>

      {/* 2. STATS OVERVIEW CARDS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid rgba(0, 240, 255, 0.2)',
          borderRadius: '12px',
          padding: '1.2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '10px',
            background: 'rgba(0, 240, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#00f0ff'
          }}>
            <FileText size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{posts.length}</div>
            <div style={{ fontSize: '0.76rem', color: '#94a3b8', textTransform: 'uppercase' }}>Total Articles</div>
          </div>
        </div>

        <div style={{
          background: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          borderRadius: '12px',
          padding: '1.2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '10px',
            background: 'rgba(16, 185, 129, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#10b981'
          }}>
            <CheckCircle2 size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>
              {posts.filter(p => p.status === 'published').length}
            </div>
            <div style={{ fontSize: '0.76rem', color: '#94a3b8', textTransform: 'uppercase' }}>Live Published</div>
          </div>
        </div>

        <div style={{
          background: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid rgba(232, 88, 116, 0.2)',
          borderRadius: '12px',
          padding: '1.2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '10px',
            background: 'rgba(232, 88, 116, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#E85874'
          }}>
            <Eye size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>
              {posts.reduce((sum, p) => sum + (p.views || 0), 0).toLocaleString()}
            </div>
            <div style={{ fontSize: '0.76rem', color: '#94a3b8', textTransform: 'uppercase' }}>Total Teardown Views</div>
          </div>
        </div>
      </div>

      {/* 3. SEARCH & FILTERS BAR */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '14px',
        padding: '1rem 1.25rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(4, 9, 20, 0.6)',
          border: '1px solid rgba(0, 240, 255, 0.2)',
          borderRadius: '8px',
          padding: '0.45rem 0.85rem',
          minWidth: '280px',
          flex: 1
        }}>
          <Search size={16} color="#00f0ff" style={{ marginRight: '0.65rem' }} />
          <input
            type="text"
            placeholder="Filter by title, slug, category, or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontSize: '0.86rem',
              outline: 'none',
              width: '100%'
            }}
          />
        </div>

        {/* Category & Status Selectors */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              background: 'rgba(4, 9, 20, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              borderRadius: '8px',
              padding: '0.45rem 0.75rem',
              fontSize: '0.84rem'
            }}
          >
            {INSIGHTS_CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              background: 'rgba(4, 9, 20, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              borderRadius: '8px',
              padding: '0.45rem 0.75rem',
              fontSize: '0.84rem'
            }}
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* 4. POSTS TABLE */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.65)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: 'rgba(9, 14, 26, 0.85)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <th style={{ padding: '0.9rem 1.25rem', color: '#00f0ff', fontFamily: 'var(--font-mono)' }}>POST</th>
                <th style={{ padding: '0.9rem 1rem', color: '#00f0ff', fontFamily: 'var(--font-mono)' }}>CATEGORY</th>
                <th style={{ padding: '0.9rem 1rem', color: '#00f0ff', fontFamily: 'var(--font-mono)' }}>AUTHOR</th>
                <th style={{ padding: '0.9rem 1rem', color: '#00f0ff', fontFamily: 'var(--font-mono)' }}>STATUS</th>
                <th style={{ padding: '0.9rem 1rem', color: '#00f0ff', fontFamily: 'var(--font-mono)' }}>VIEWS</th>
                <th style={{ padding: '0.9rem 1rem', color: '#00f0ff', fontFamily: 'var(--font-mono)' }}>DATE</th>
                <th style={{ padding: '0.9rem 1.25rem', textAlign: 'right', color: '#00f0ff', fontFamily: 'var(--font-mono)' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map(post => (
                <tr
                  key={post.id || post.slug}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 240, 255, 0.03)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {/* Title & Thumbnail */}
                  <td style={{ padding: '1rem 1.25rem', maxWidth: '380px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <img
                        src={post.coverImage}
                        alt=""
                        style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, color: '#ffffff', lineHeight: 1.3, marginBottom: '0.2rem' }}>
                          {post.title}
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: '#64748b' }}>
                          /insights/{post.slug}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      background: 'rgba(0, 240, 255, 0.08)',
                      border: '1px solid rgba(0, 240, 255, 0.25)',
                      color: '#00f0ff',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '6px',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      whiteSpace: 'nowrap'
                    }}>
                      {post.category}
                    </span>
                  </td>

                  {/* Author */}
                  <td style={{ padding: '1rem', whiteSpace: 'nowrap', color: '#cbd5e1' }}>
                    {post.author?.name || 'ATPL Lead'}
                  </td>

                  {/* Status Toggle */}
                  <td style={{ padding: '1rem' }}>
                    <button
                      onClick={() => handleToggleStatus(post)}
                      style={{
                        background: post.status === 'published' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                        border: `1px solid ${post.status === 'published' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(234, 179, 8, 0.4)'}`,
                        color: post.status === 'published' ? '#34d399' : '#facc15',
                        borderRadius: '999px',
                        padding: '0.25rem 0.75rem',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                      title="Click to toggle status"
                    >
                      <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: post.status === 'published' ? '#10b981' : '#eab308'
                      }} />
                      <span>{post.status.toUpperCase()}</span>
                    </button>
                  </td>

                  {/* Views */}
                  <td style={{ padding: '1rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                    {post.views || 0}
                  </td>

                  {/* Date */}
                  <td style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                    {new Date(post.publishedAt || Date.now()).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button
                        onClick={() => navigateToInsight(post.slug)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#38bdf8',
                          borderRadius: '6px',
                          padding: '0.35rem 0.65rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          fontSize: '0.78rem'
                        }}
                        title="View Public Post"
                      >
                        <ExternalLink size={13} />
                        <span>View</span>
                      </button>

                      <button
                        onClick={() => handleOpenEdit(post)}
                        style={{
                          background: 'rgba(0, 240, 255, 0.1)',
                          border: '1px solid rgba(0, 240, 255, 0.3)',
                          color: '#00f0ff',
                          borderRadius: '6px',
                          padding: '0.35rem 0.65rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          fontSize: '0.78rem',
                          fontWeight: 600
                        }}
                        title="Edit Article"
                      >
                        <Edit3 size={13} />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDelete(post)}
                        style={{
                          background: 'rgba(239, 68, 68, 0.1)',
                          border: '1px solid rgba(239, 68, 68, 0.25)',
                          color: '#f87171',
                          borderRadius: '6px',
                          padding: '0.35rem 0.55rem',
                          cursor: 'pointer'
                        }}
                        title="Delete Post"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. FULL-FEATURED CREATE / EDIT DRAWER & LIVE PREVIEW MODAL */}
      {editorOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(4, 9, 20, 0.85)',
          backdropFilter: 'blur(10px)',
          zIndex: 2000,
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '1100px',
            background: '#070c18',
            borderLeft: '1px solid rgba(0, 240, 255, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            boxShadow: '-20px 0 60px rgba(0, 0, 0, 0.7)'
          }}>
            
            {/* Drawer Header */}
            <div style={{
              padding: '1.25rem 1.75rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(15, 23, 42, 0.6)'
            }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                  {editingPostId ? 'Edit Technical Insight' : 'Create New Technical Insight'}
                </h3>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                  {editingPostId ? `ID: ${editingPostId}` : 'Publish live to https://atplgroup.com/insights'}
                </div>
              </div>

              {/* Tabs Toggle & Save */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  display: 'flex',
                  background: 'rgba(4, 9, 20, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  padding: '3px'
                }}>
                  <button
                    onClick={() => setActiveTab('edit')}
                    style={{
                      background: activeTab === 'edit' ? '#0071ba' : 'transparent',
                      color: activeTab === 'edit' ? '#ffffff' : '#94a3b8',
                      border: 'none',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Editor
                  </button>
                  <button
                    onClick={() => setActiveTab('preview')}
                    style={{
                      background: activeTab === 'preview' ? '#0071ba' : 'transparent',
                      color: activeTab === 'preview' ? '#ffffff' : '#94a3b8',
                      border: 'none',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Live Preview
                  </button>
                  <button
                    onClick={() => setActiveTab('seo')}
                    style={{
                      background: activeTab === 'seo' ? '#0071ba' : 'transparent',
                      color: activeTab === 'seo' ? '#ffffff' : '#94a3b8',
                      border: 'none',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    SEO Meta
                  </button>
                </div>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="btn btn-cyan btn-sm"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontWeight: 700,
                    padding: '0.5rem 1.25rem'
                  }}
                >
                  <Save size={15} />
                  <span>{saving ? 'Saving...' : 'Save & Publish'}</span>
                </button>

                <button
                  onClick={() => setEditorOpen(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    padding: '0.4rem'
                  }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Drawer Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.75rem' }}>
              
              {/* TAB 1: RICH TEXT EDITOR */}
              {activeTab === 'edit' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  {/* Title & Slug */}
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#00f0ff', marginBottom: '0.4rem' }}>
                        ARTICLE TITLE *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="e.g. Sub-8ms Battery Cell Traceability: How Ola Solved Genealogy"
                        style={{
                          width: '100%',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1px solid rgba(0, 240, 255, 0.3)',
                          borderRadius: '8px',
                          padding: '0.65rem 0.85rem',
                          color: '#ffffff',
                          fontSize: '0.94rem',
                          fontWeight: 600,
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.4rem' }}>
                        URL SLUG (/insights/:slug)
                      </label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="url-slug-teardown"
                        style={{
                          width: '100%',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '8px',
                          padding: '0.65rem 0.85rem',
                          color: '#38bdf8',
                          fontSize: '0.85rem',
                          fontFamily: 'var(--font-mono)',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>

                  {/* Category, Status, Reading Time */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.4rem' }}>
                        CATEGORY
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        style={{
                          width: '100%',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '8px',
                          padding: '0.6rem 0.85rem',
                          color: '#ffffff',
                          fontSize: '0.88rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      >
                        {INSIGHTS_CATEGORIES.filter(c => c !== 'All').map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.4rem' }}>
                        STATUS
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        style={{
                          width: '100%',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '8px',
                          padding: '0.6rem 0.85rem',
                          color: '#ffffff',
                          fontSize: '0.88rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      >
                        <option value="published">Published (Live)</option>
                        <option value="draft">Draft (Admin Only)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.4rem' }}>
                        READING TIME
                      </label>
                      <input
                        type="text"
                        value={formData.readingTime}
                        onChange={(e) => setFormData({ ...formData, readingTime: e.target.value })}
                        placeholder="e.g. 7 min read"
                        style={{
                          width: '100%',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '8px',
                          padding: '0.6rem 0.85rem',
                          color: '#ffffff',
                          fontSize: '0.88rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>

                  {/* Cover Image URL & Excerpt */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.4rem' }}>
                        EXCERPT / BRIEF SUMMARY
                      </label>
                      <textarea
                        rows={3}
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        placeholder="Concise 2-sentence technical summary shown on the card grid and social previews..."
                        style={{
                          width: '100%',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '8px',
                          padding: '0.6rem 0.85rem',
                          color: '#ffffff',
                          fontSize: '0.88rem',
                          lineHeight: 1.5,
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.4rem' }}>
                        COVER IMAGE URL
                      </label>
                      <input
                        type="text"
                        value={formData.coverImage}
                        onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                        placeholder="https://..."
                        style={{
                          width: '100%',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '8px',
                          padding: '0.6rem 0.85rem',
                          color: '#ffffff',
                          fontSize: '0.85rem',
                          outline: 'none',
                          boxSizing: 'border-box',
                          marginBottom: '0.5rem'
                        }}
                      />
                      {formData.coverImage && (
                        <div style={{ height: '56px', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                          <img src={formData.coverImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Author Credentials */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
                        AUTHOR NAME
                      </label>
                      <input
                        type="text"
                        value={formData.authorName}
                        onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                        style={{
                          width: '100%',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '8px',
                          padding: '0.5rem 0.75rem',
                          color: '#ffffff',
                          fontSize: '0.85rem',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
                        AUTHOR ROLE / JOB TITLE
                      </label>
                      <input
                        type="text"
                        value={formData.authorRole}
                        onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                        style={{
                          width: '100%',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '8px',
                          padding: '0.5rem 0.75rem',
                          color: '#ffffff',
                          fontSize: '0.85rem',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
                        TAGS (COMMA-SEPARATED)
                      </label>
                      <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        placeholder="EV, Vision AI, RFID"
                        style={{
                          width: '100%',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '8px',
                          padding: '0.5rem 0.75rem',
                          color: '#ffffff',
                          fontSize: '0.85rem',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>

                  {/* RICH CONTENT EDITOR WITH TOOLBAR */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#00f0ff', marginBottom: '0.6rem' }}>
                      ARTICLE CONTENT (HTML / RICH FORMATTING) *
                    </label>

                    {/* Editor Toolbar */}
                    <div style={{
                      background: 'rgba(15, 23, 42, 0.95)',
                      border: '1px solid rgba(0, 240, 255, 0.25)',
                      borderBottom: 'none',
                      borderRadius: '10px 10px 0 0',
                      padding: '0.5rem 0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      flexWrap: 'wrap'
                    }}>
                      <button
                        type="button"
                        onClick={() => insertFormatting('<h2>', '</h2>')}
                        style={{ background: 'rgba(255, 255, 255, 0.08)', border: 'none', color: '#ffffff', padding: '0.35rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 700 }}
                      >
                        H2
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('<h3>', '</h3>')}
                        style={{ background: 'rgba(255, 255, 255, 0.08)', border: 'none', color: '#ffffff', padding: '0.35rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 700 }}
                      >
                        H3
                      </button>
                      <span style={{ width: '1px', height: '18px', background: 'rgba(255, 255, 255, 0.15)', margin: '0 0.2rem' }} />
                      <button
                        type="button"
                        onClick={() => insertFormatting('<strong>', '</strong>')}
                        style={{ background: 'rgba(255, 255, 255, 0.08)', border: 'none', color: '#ffffff', padding: '0.35rem 0.6rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        title="Bold"
                      >
                        <Bold size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('<em>', '</em>')}
                        style={{ background: 'rgba(255, 255, 255, 0.08)', border: 'none', color: '#ffffff', padding: '0.35rem 0.6rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        title="Italic"
                      >
                        <Italic size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('<blockquote>\n  "', '"\n</blockquote>')}
                        style={{ background: 'rgba(255, 255, 255, 0.08)', border: 'none', color: '#ffffff', padding: '0.35rem 0.6rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        title="Blockquote"
                      >
                        <Quote size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('<pre><code class="language-json">', '</code></pre>')}
                        style={{ background: 'rgba(255, 255, 255, 0.08)', border: 'none', color: '#ffffff', padding: '0.35rem 0.6rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        title="Code Block"
                      >
                        <Code size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={insertTableTemplate}
                        style={{ background: 'rgba(0, 240, 255, 0.12)', border: '1px solid rgba(0, 240, 255, 0.3)', color: '#00f0ff', padding: '0.35rem 0.65rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', fontWeight: 600 }}
                        title="Insert Spec Comparison Table"
                      >
                        <TableIcon size={14} />
                        <span>Insert Table</span>
                      </button>
                    </div>

                    <textarea
                      ref={textareaRef}
                      rows={14}
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      style={{
                        width: '100%',
                        background: '#040812',
                        border: '1px solid rgba(0, 240, 255, 0.25)',
                        borderRadius: '0 0 10px 10px',
                        padding: '1rem',
                        color: '#38bdf8',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.88rem',
                        lineHeight: 1.6,
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                </div>
              )}

              {/* TAB 2: LIVE PREVIEW */}
              {activeTab === 'preview' && (
                <div style={{
                  background: 'rgba(15, 23, 42, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '2.5rem',
                  maxWidth: '850px',
                  margin: '0 auto'
                }}>
                  <div style={{
                    display: 'inline-block',
                    background: 'rgba(0, 240, 255, 0.1)',
                    border: '1px solid rgba(0, 240, 255, 0.3)',
                    color: '#00f0ff',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    marginBottom: '1rem'
                  }}>
                    {formData.category}
                  </div>

                  <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', margin: '0 0 1.25rem' }}>
                    {formData.title || 'Untitled Post'}
                  </h1>

                  <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                    {formData.excerpt}
                  </p>

                  {formData.coverImage && (
                    <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '2.5rem', maxHeight: '380px' }}>
                      <img src={formData.coverImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}

                  <div
                    className="insight-rich-content"
                    dangerouslySetInnerHTML={{ __html: formData.content }}
                  />
                </div>
              )}

              {/* TAB 3: SEO META SETTINGS */}
              {activeTab === 'seo' && (
                <div style={{ maxWidth: '750px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{
                    background: 'rgba(0, 240, 255, 0.05)',
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '1.25rem'
                  }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#00f0ff', marginBottom: '0.35rem' }}>
                      GOOGLE SEARCH &amp; SOCIAL CARD PREVIEW
                    </div>
                    <div style={{ fontSize: '1.15rem', color: '#38bdf8', fontWeight: 600, marginBottom: '0.2rem' }}>
                      {formData.seoTitle || formData.title || 'ATPL Insights Post'}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#10b981', fontFamily: 'var(--font-mono)', marginBottom: '0.4rem' }}>
                      https://atplgroup.com/insights/{formData.slug || 'sample-slug'}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                      {formData.seoDescription || formData.excerpt || 'Technical deployment notes from ATPL engineering.'}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.4rem' }}>
                      CUSTOM SEO META TITLE (Max 65 chars)
                    </label>
                    <input
                      type="text"
                      value={formData.seoTitle}
                      onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                      placeholder="Title tag displayed in Google search results"
                      style={{
                        width: '100%',
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '8px',
                        padding: '0.65rem 0.85rem',
                        color: '#ffffff',
                        fontSize: '0.88rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.4rem' }}>
                      CUSTOM SEO META DESCRIPTION (Max 160 chars)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.seoDescription}
                      onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                      placeholder="Snippet displayed in search results..."
                      style={{
                        width: '100%',
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '8px',
                        padding: '0.65rem 0.85rem',
                        color: '#ffffff',
                        fontSize: '0.88rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.4rem' }}>
                      OPEN GRAPH / TWITTER CARD IMAGE URL
                    </label>
                    <input
                      type="text"
                      value={formData.ogImage}
                      onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                      placeholder="https://... (defaults to cover image)"
                      style={{
                        width: '100%',
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '8px',
                        padding: '0.65rem 0.85rem',
                        color: '#ffffff',
                        fontSize: '0.88rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                </div>
              )}

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
