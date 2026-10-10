import React from 'react';
import { LockKeyhole, ArrowRight, ShieldCheck } from 'lucide-react';

export function PrivateTradeAccess({ onLogin, onRequest }) {
  return (
    <section className="sl-section sl-access-section" id="trade-access">
      <div className="sl-container">
        <div className="sl-access-card">
          <div className="access-content">
            <span className="sl-kicker">CONFIDENTIAL TRADE PRICING</span>

            <h2 className="access-title">
              Private buyer access.<br />
              <span className="serif-accent">Transparent wholesale trade.</span>
            </h2>

            <p className="access-description">
              Wholesale pricing, stock thans, and lot bookings are restricted to verified wholesale buyers, 
              garment manufacturers, and registered brokers. Access is granted following a brief business verification 
              to maintain commercial confidentiality across our supply network.
            </p>

            <div className="access-criteria-row">
              <div className="criteria-item">
                <span className="criteria-num">01</span>
                <div>
                  <strong>Wholesale Inquiries Only</strong>
                  <p>Minimum orders apply per shade (standard whole thans).</p>
                </div>
              </div>
              <div className="criteria-item">
                <span className="criteria-num">02</span>
                <div>
                  <strong>Direct Mill Coordination</strong>
                  <p>Direct communication with our Surat desk on lot schedules.</p>
                </div>
              </div>
              <div className="criteria-item">
                <span className="criteria-num">03</span>
                <div>
                  <strong>Logistics Routing</strong>
                  <p>Standard transport bilti dispatch to your local transport hub.</p>
                </div>
              </div>
            </div>

            <div className="access-actions">
              <button 
                type="button" 
                className="sl-btn sl-btn-primary"
                onClick={() => onRequest('B2B Portal Access')}
              >
                <span>Request B2B Access</span>
                <ArrowRight size={15} />
              </button>

              <button 
                type="button" 
                className="sl-btn sl-btn-secondary"
                onClick={onLogin}
              >
                <LockKeyhole size={14} />
                <span>Existing Partner Login</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
