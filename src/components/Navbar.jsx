import React, { useState, useEffect } from 'react';
import { LockKeyhole, ArrowRight, Menu, X, ShieldCheck } from 'lucide-react';

export function Navbar({ onLogin, onRequest, onPortal, session, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sl-navbar ${scrolled ? 'sl-navbar-scrolled' : ''}`}>
      <div className="sl-navbar-inner">
        {/* Brand Wordmark */}
        <a href="#hero" className="sl-brand" aria-label="Suratloom Home">
          <span className="sl-brand-title">SURATLOOM</span>
          <span className="sl-brand-sep">/</span>
          <span className="sl-brand-tagline">SURAT · TEXTILES</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="sl-nav-links" aria-label="Main Navigation">
          <a href="#fabrics" className="sl-nav-link">Collections</a>
          <a href="#manufacturing" className="sl-nav-link">Manufacturing</a>
          <a href="#wholesale" className="sl-nav-link">Wholesale</a>
          <a href="#swatch-book" className="sl-nav-link">Sample Swatches</a>
          <a href="#trade-access" className="sl-nav-link">Private Access</a>
        </nav>

        {/* Action CTAs */}
        <div className="sl-nav-actions">
          {session ? (
            <div className="sl-session-pill">
              <button 
                type="button" 
                className="sl-btn sl-btn-portal"
                onClick={onPortal}
                title="Enter your active workspace"
              >
                <ShieldCheck size={14} className="accent-icon" />
                <span>{session.name.split(' ')[0]} ({session.tier})</span>
              </button>
              <button 
                type="button" 
                className="sl-btn sl-btn-text" 
                onClick={onLogout}
              >
                Sign out
              </button>
            </div>
          ) : (
            <button 
              type="button" 
              className="sl-btn sl-btn-ghost" 
              onClick={onLogin}
              aria-label="Partner Login"
            >
              <LockKeyhole size={14} />
              <span>Partner Login</span>
            </button>
          )}

          <button 
            type="button" 
            className="sl-btn sl-btn-primary sl-btn-emerald" 
            onClick={() => onRequest('B2B Portal Access')}
          >
            <span>Request B2B Access</span>
            <ArrowRight size={14} />
          </button>

          {/* Mobile menu button */}
          <button 
            type="button" 
            className="sl-mobile-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sl-mobile-drawer" role="dialog" aria-modal="true">
          <div className="sl-mobile-drawer-content">
            <nav className="sl-mobile-nav">
              <a 
                href="#fabrics" 
                className="sl-mobile-link" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Collections
              </a>
              <a 
                href="#manufacturing" 
                className="sl-mobile-link" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Manufacturing
              </a>
              <a 
                href="#wholesale" 
                className="sl-mobile-link" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Wholesale Process
              </a>
              <a 
                href="#swatch-book" 
                className="sl-mobile-link" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Sample Swatches
              </a>
              <a 
                href="#trade-access" 
                className="sl-mobile-link" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Private Access
              </a>
            </nav>

            <div className="sl-mobile-footer-actions">
              {session ? (
                <>
                  <button 
                    type="button" 
                    className="sl-btn sl-btn-portal full-width" 
                    onClick={() => { setMobileMenuOpen(false); onPortal(); }}
                  >
                    <ShieldCheck size={16} /> Open Workspace ({session.tier})
                  </button>
                  <button 
                    type="button" 
                    className="sl-btn sl-btn-ghost full-width" 
                    onClick={() => { setMobileMenuOpen(false); onLogout(); }}
                  >
                    Sign out ({session.name.split(' ')[0]})
                  </button>
                </>
              ) : (
                <button 
                  type="button" 
                  className="sl-btn sl-btn-ghost full-width" 
                  onClick={() => { setMobileMenuOpen(false); onLogin(); }}
                >
                  <LockKeyhole size={15} /> Partner Login
                </button>
              )}
              <button 
                type="button" 
                className="sl-btn sl-btn-primary full-width" 
                onClick={() => { setMobileMenuOpen(false); onRequest('B2B Portal Access'); }}
              >
                Request B2B Access <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
