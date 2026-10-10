import React from 'react';
import { ArrowDown, ArrowRight, LockKeyhole } from 'lucide-react';

export function Hero({ onLogin, onRequest, onExplore }) {
  return (
    <section className="sl-hero" id="hero">
      <div className="sl-container">
        <div className="sl-hero-grid">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="sl-hero-text">
            <span className="sl-kicker">SURAT WEAVING & WHOLESALE TRADE</span>

            <h1 className="sl-hero-headline">
              Textiles from Surat.<br />
              <span className="serif-accent">Partnerships built on trust.</span>
            </h1>

            <p className="sl-hero-description">
              Explore fabric collections and connect with textile trade partners for wholesale sourcing.
              Supplying verified garment houses, fashion labels, and wholesale merchants across India.
            </p>

            <div className="sl-hero-cta-group">
              <a 
                href="#fabrics" 
                className="sl-btn sl-btn-secondary"
                onClick={(e) => {
                  if (onExplore) {
                    e.preventDefault();
                    onExplore();
                  }
                }}
              >
                <span>Explore Fabrics</span>
                <ArrowDown size={15} />
              </a>

              <button 
                type="button" 
                className="sl-btn sl-btn-primary"
                onClick={() => onRequest('B2B Portal Access')}
              >
                <span>Request B2B Access</span>
                <ArrowRight size={15} />
              </button>
            </div>

            <div className="sl-hero-facts">
              <div className="fact-item">
                <span className="fact-dot" />
                <span>Standard 100m Whole Than Units</span>
              </div>
              <div className="fact-item">
                <span className="fact-dot" />
                <span>Pandesara GIDC Dispatch Network</span>
              </div>
              <div className="fact-item">
                <span className="fact-dot" />
                <span>Verified B2B Wholesale Pricing</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Editorial Textile Photography */}
          <div className="sl-hero-media">
            <div className="sl-hero-image-frame">
              <img 
                src="/assets/hero-textile-macro.jpg" 
                alt="Woven textile detail with natural drape and balanced warp-weft threads"
                className="sl-hero-image"
                loading="eager"
              />
              <div className="sl-hero-caption">
                <span className="caption-label">Core Construction</span>
                <span className="caption-text">Rayon Slub & Combed Cotton Weave · 58" Panna</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
