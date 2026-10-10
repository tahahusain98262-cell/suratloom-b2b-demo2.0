import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

export function SwatchBookSection({ onRequest }) {
  const swatchItems = [
    'Luxe Rayon Slub — Sandstone & Rose Clay fluid drape',
    'Cotton Flex Premium — Olive Mist & Ivory breathable weaves',
    'Viscose Satin & Twill — Midnight Blue & Charcoal lustrous handfeel',
    'Technical Spec Cards — Finished width (44"/58"), GSM, and shrinkage data'
  ];

  return (
    <section className="sl-section sl-swatch-section" id="swatch-book">
      <div className="sl-container">
        <div className="sl-swatch-card-wrapper">
          {/* Left Column: Visual Photography of the Swatch Binder */}
          <div className="swatch-media-col">
            <div className="swatch-img-frame">
              <img 
                src="/assets/swatch-book.jpg" 
                alt="Suratloom master trade sample swatch book open with fabric shade swatches"
                className="swatch-cover-img"
                loading="lazy"
              />
              <div className="swatch-caption">
                <span>Master Trade Swatch Binder · 6 Core Qualities</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy & Sample Request CTA */}
          <div className="swatch-info-col">
            <span className="sl-kicker">PHYSICAL VERIFICATION</span>

            <h2 className="swatch-title">
              Experience the drape.<br />
              <span className="serif-accent">Commit to bulk with confidence.</span>
            </h2>

            <p className="swatch-lead">
              Textiles cannot be fully judged on screens alone. We dispatch curated physical trade binders 
              containing genuine mill swatches, shade cuttings, and technical specifications 
              directly to verified garment houses, fashion labels, and wholesale merchants.
            </p>

            <div className="swatch-contents-box">
              <span className="contents-title">INCLUDED IN YOUR SWATCH PACK</span>
              <ul className="contents-list">
                {swatchItems.map((item, idx) => (
                  <li key={idx}>
                    <span className="contents-bullet" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="swatch-dispatch-note">
              Courier dispatch across India for verified business profiles.
            </p>

            <div className="swatch-action-row">
              <button 
                type="button" 
                className="sl-btn sl-btn-primary"
                onClick={() => onRequest('Sample Swatch Book')}
              >
                <span>Request Sample Swatch Book</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
