import React from 'react';
import { ArrowRight, LockKeyhole, Layers, FileCheck, PhoneCall } from 'lucide-react';

export function BuiltForWholesale({ onLogin, onRequest }) {
  const steps = [
    {
      step: 'Step 1',
      title: 'Browse Available Collections',
      desc: 'Review running rayon, cotton, and viscose fabric constructions, technical panna widths, and shade availability on our website.',
      icon: Layers
    },
    {
      step: 'Step 2',
      title: 'Request Trade Access or Samples',
      desc: 'Submit your business details to receive verified wholesale credentials for private rates, or request a physical swatch book delivered to your office.',
      icon: FileCheck
    },
    {
      step: 'Step 3',
      title: 'Discuss Availability & Ordering',
      desc: 'Work directly with our team to reserve bulk lot meterage, confirm Surat transport bilti logistics, and arrange scheduled dispatches.',
      icon: PhoneCall
    }
  ];

  return (
    <section className="sl-section sl-wholesale-section" id="wholesale">
      <div className="sl-container">
        {/* Section Header */}
        <div className="sl-section-header">
          <div className="header-left">
            <span className="sl-kicker">HOW WE WORK</span>
            <h2 className="sl-section-title">
              The wholesale process.<br />
              <span className="serif-accent">Straightforward, transparent trade.</span>
            </h2>
          </div>
          <div className="header-right">
            <p className="sl-section-description">
              Designed around the commercial realities of India's textile market. 
              Clear communication, standard 100m whole-than units, and verified trade pricing.
            </p>
          </div>
        </div>

        {/* 3 Simple Steps Grid */}
        <div className="sl-steps-grid">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="sl-step-box">
                <div className="step-box-header">
                  <span className="step-tag">{item.step}</span>
                  <Icon size={18} className="step-icon" />
                </div>
                <h3 className="step-box-title">{item.title}</h3>
                <p className="step-box-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Demo Notice Banner */}
        <div className="sl-wholesale-notice">
          <div className="notice-left">
            <span className="notice-tag">Interactive Demo Notice</span>
            <p className="notice-text">
              This preview website includes a fully interactive demonstration of our buyer, broker, and mill admin workflows. 
              Orders and inventory adjustments are simulated in your browser's local memory.
            </p>
          </div>
          <div className="notice-actions">
            <button 
              type="button" 
              className="sl-btn sl-btn-secondary"
              onClick={onLogin}
            >
              <LockKeyhole size={14} />
              <span>Launch Demo Workspace</span>
            </button>
            <button 
              type="button" 
              className="sl-btn sl-btn-primary"
              onClick={() => onRequest('B2B Portal Access')}
            >
              <span>Request B2B Access</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
