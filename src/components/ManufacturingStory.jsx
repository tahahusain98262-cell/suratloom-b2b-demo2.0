import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

export function ManufacturingStory({ onRequest }) {
  const steps = [
    {
      num: '01',
      title: 'Yarn Preparation & Warping',
      desc: 'Selected viscose filaments, staple combed cotton, and slub yarns are wound onto warp beams under calibrated tension to maintain uniform thread density and prevent mispicks during shedding.'
    },
    {
      num: '02',
      title: 'Precision Weaving in Surat',
      desc: 'High-speed rapier and shuttleless looms produce standard 44" and 58" panna fabrications. Synchronized electronic let-off mechanisms ensure consistent pick density across bulk meterage.'
    },
    {
      num: '03',
      title: 'Pre-Treatment & Reactive Dyeing',
      desc: 'Greige fabric undergoes desizing and scouring before entering low-liquor jet dyeing vessels. Controlled dye formulas yield uniform absorption and high colorfastness across production lots.'
    },
    {
      num: '04',
      title: 'Finishing & Than Packaging',
      desc: 'Stentering and dimensional stabilization reduce residual shrinkage. Finished textiles are wound into uniform 100-meter whole thans, poly-wrapped, and tagged for safe transport.'
    }
  ];

  return (
    <section className="sl-section sl-manufacturing-section" id="manufacturing">
      <div className="sl-container">
        {/* Section Header */}
        <div className="sl-section-header">
          <div className="header-left">
            <span className="sl-kicker">MANUFACTURING IN SURAT</span>
            <h2 className="sl-section-title">
              Weaving and finishing.<br />
              <span className="serif-accent">Grounded in textile discipline.</span>
            </h2>
          </div>
          <div className="header-right">
            <p className="sl-section-description">
              Surat's textile cluster combines specialized weaving infrastructure with decades of trade experience. 
              We prioritize consistency in weave tension, shade fidelity, and accurate yardage on every than.
            </p>
          </div>
        </div>

        {/* Editorial Story Layout */}
        <div className="sl-story-grid">
          {/* Left Column: Visual Photography */}
          <div className="story-media-column">
            <div className="story-image-frame">
              <img 
                src="/assets/manufacturing-loom.jpg" 
                alt="Modern textile weaving loom machinery in Surat weaving shed" 
                className="story-image"
                loading="lazy"
              />
              <div className="story-image-caption">
                <span className="caption-title">Surat Weaving Shed</span>
                <span className="caption-sub">Woven on electronic rapier looms under continuous operator inspection</span>
              </div>
            </div>

            <div className="story-specs-card">
              <h3 className="specs-card-title">Commercial Manufacturing Standards</h3>
              <ul className="specs-list">
                <li>
                  <span className="spec-label">Available Widths:</span>
                  <span className="spec-value">44" and 58" Panna</span>
                </li>
                <li>
                  <span className="spec-label">Packaging Standard:</span>
                  <span className="spec-value">100m Whole Than Rolls</span>
                </li>
                <li>
                  <span className="spec-label">Inspection:</span>
                  <span className="spec-value">Graded by meter before roll sealing</span>
                </li>
                <li>
                  <span className="spec-label">Logistics Dispatch:</span>
                  <span className="spec-value">Direct loading to Surat transport hubs</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Steps Sequence */}
          <div className="story-steps-column">
            <div className="story-steps-list">
              {steps.map(step => (
                <div key={step.num} className="story-step-card">
                  <div className="step-num">{step.num}</div>
                  <div className="step-content">
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="story-cta-box">
              <p className="story-cta-text">
                Need specific construction details, custom GSM requirements, or specialized shade cards?
              </p>
              <button 
                type="button" 
                className="sl-btn sl-btn-secondary"
                onClick={() => onRequest('B2B Portal Access')}
              >
                <span>Discuss Manufacturing Needs</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
