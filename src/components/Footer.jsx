import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export function Footer({ onLogin, onRequest }) {
  return (
    <footer className="sl-footer">
      <div className="sl-container">
        <div className="sl-footer-grid">
          {/* Brand & Address Column */}
          <div className="footer-col brand-col">
            <span className="footer-brand-title">SURATLOOM</span>
            <p className="footer-tagline">
              Wholesale textile supply connecting Surat manufacturing with verified buyers across India.
            </p>
            <div className="footer-address">
              <span>Pandesara Industrial Estate (GIDC)</span>
              <span>Surat, Gujarat 395002, India</span>
              <span className="mono-note">Wholesale B2B Inquiries Only</span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="footer-col">
            <span className="footer-heading">Navigation</span>
            <ul className="footer-links">
              <li><a href="#fabrics">Fabric Collections</a></li>
              <li><a href="#manufacturing">Manufacturing in Surat</a></li>
              <li><a href="#wholesale">Wholesale Process</a></li>
              <li><a href="#swatch-book">Sample Swatch Book</a></li>
              <li><a href="#trade-access">Private Buyer Access</a></li>
            </ul>
          </div>

          {/* Fabrics Column */}
          <div className="footer-col">
            <span className="footer-heading">Fabrics</span>
            <ul className="footer-links">
              <li><a href="#fabrics">Luxe Rayon Slub (58")</a></li>
              <li><a href="#fabrics">Cotton Flex Premium (44")</a></li>
              <li><a href="#fabrics">Viscose Satin & Twill (58")</a></li>
              <li><a href="#fabrics">Standard 100m Thans</a></li>
            </ul>
          </div>

          {/* Trade Inquiries Column */}
          <div className="footer-col">
            <span className="footer-heading">Trade Services</span>
            <ul className="footer-links">
              <li>
                <button type="button" className="footer-link-btn" onClick={() => onRequest('B2B Portal Access')}>
                  Request B2B Access <ArrowUpRight size={12} />
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => onRequest('Sample Swatch Book')}>
                  Order Swatch Book <ArrowUpRight size={12} />
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={onLogin}>
                  Partner Portal Login <ArrowUpRight size={12} />
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="sl-footer-bottom">
          <p>© 2026 Suratloom. Commercial Wholesale Demonstration.</p>
          <div className="footer-bottom-notes">
            <span>Direct Mill Coordination</span>
            <span className="sep">·</span>
            <span>Surat Transport Network</span>
            <span className="sep">·</span>
            <span>All Rates in ₹/Meter</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
