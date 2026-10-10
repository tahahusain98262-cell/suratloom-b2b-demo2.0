import React, { useState } from 'react';
import { Eye, LockKeyhole, X, ArrowRight, Check } from 'lucide-react';

const CATEGORY_IMAGES = {
  Rayon: '/assets/fabric-rayon.jpg',
  Cotton: '/assets/fabric-cotton.jpg',
  Viscose: '/assets/fabric-viscose.jpg'
};

export function FabricCollections({ products, onLogin, onRequest }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [inspectingProduct, setInspectingProduct] = useState(null);

  const categories = ['All', 'Rayon', 'Cotton', 'Viscose'];

  const filteredProducts = activeFilter === 'All' 
    ? products 
    : products.filter(p => p.type === activeFilter);

  return (
    <section className="sl-section sl-fabrics-section" id="fabrics">
      <div className="sl-container">
        {/* Section Header */}
        <div className="sl-section-header">
          <div className="header-left">
            <span className="sl-kicker">RUNNING FABRIC QUALITIES</span>
            <h2 className="sl-section-title">
              Core fabric collections.<br />
              <span className="serif-accent">Woven for commercial supply.</span>
            </h2>
          </div>
          <div className="header-right">
            <p className="sl-section-description">
              Curated staple weaves produced in standard 44" and 58" widths. 
              Wholesale pricing, live lot availability, and shade cards are visible to verified wholesale partners.
            </p>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="sl-filter-bar">
          <div className="filter-chips" role="tablist" aria-label="Fabric Category Filters">
            {categories.map(cat => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeFilter === cat}
                className={`filter-chip ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>
          <div className="filter-count">
            <span>Showing {filteredProducts.length} running qualities</span>
          </div>
        </div>

        {/* Fabric Cards Grid */}
        <div className="sl-fabrics-grid">
          {filteredProducts.map(product => {
            const imageSrc = CATEGORY_IMAGES[product.type] || '/assets/hero-textile-macro.jpg';

            return (
              <article key={product.id} className="sl-fabric-card">
                <div className="card-media">
                  <img 
                    src={imageSrc} 
                    alt={`${product.name} texture detail`} 
                    className="card-image"
                    loading="lazy"
                  />
                  <div className="card-media-meta">
                    <span className="meta-badge">{product.type}</span>
                    <span className="meta-badge">{product.width} Panna</span>
                  </div>
                </div>

                <div className="card-body">
                  <div className="card-sub-line">
                    <span className="card-code">{product.code}</span>
                    <span className="card-shade">Shade {product.shade} ({product.color})</span>
                  </div>

                  <h3 className="card-title">{product.name}</h3>

                  <div className="card-pricing-lock">
                    <LockKeyhole size={13} className="lock-icon" />
                    <span>Wholesale rates gated · Verified partners only</span>
                  </div>

                  <div className="card-actions">
                    <button 
                      type="button" 
                      className="card-btn-inspect"
                      onClick={() => setInspectingProduct(product)}
                      aria-label={`Inspect ${product.name} specifications`}
                    >
                      <Eye size={14} /> Spec Sheet
                    </button>
                    <button 
                      type="button" 
                      className="card-btn-request"
                      onClick={() => onRequest('Sample Swatch Book')}
                    >
                      Sample Swatch <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Clean Spec Sheet Inspection Modal */}
      {inspectingProduct && (
        <div 
          className="sl-modal-backdrop" 
          onClick={(e) => e.target === e.currentTarget && setInspectingProduct(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="sl-spec-modal">
            <button 
              type="button" 
              className="sl-modal-close" 
              onClick={() => setInspectingProduct(null)} 
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div className="spec-modal-header">
              <span className="sl-kicker">TECHNICAL SPECIFICATION</span>
              <h2 className="spec-title">{inspectingProduct.name}</h2>
              <p className="spec-code">{inspectingProduct.code} · {inspectingProduct.type} Family</p>
            </div>

            <div className="spec-table-container">
              <table className="sl-spec-table">
                <tbody>
                  <tr>
                    <th>Fabric Construction</th>
                    <td>{inspectingProduct.name} ({inspectingProduct.type})</td>
                  </tr>
                  <tr>
                    <th>Quality Code</th>
                    <td>{inspectingProduct.code}</td>
                  </tr>
                  <tr>
                    <th>Finished Width</th>
                    <td>{inspectingProduct.width} (Standard Surat Panna)</td>
                  </tr>
                  <tr>
                    <th>Shade Reference</th>
                    <td>{inspectingProduct.shade} — {inspectingProduct.color}</td>
                  </tr>
                  <tr>
                    <th>Standard Packaging</th>
                    <td>100 Meters Whole Than Unit</td>
                  </tr>
                  <tr>
                    <th>Dyeing Process</th>
                    <td>Even jet dyeing with high wash-fastness</td>
                  </tr>
                  <tr>
                    <th>Commercial Rates</th>
                    <td>
                      <span className="spec-gated-note">
                        <LockKeyhole size={12} /> Accessible upon trade account approval
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="spec-modal-actions">
              <button 
                type="button" 
                className="sl-btn sl-btn-secondary"
                onClick={() => {
                  setInspectingProduct(null);
                  onRequest('Sample Swatch Book');
                }}
              >
                Request Swatch Book
              </button>

              <button 
                type="button" 
                className="sl-btn sl-btn-primary"
                onClick={() => {
                  setInspectingProduct(null);
                  onLogin();
                }}
              >
                Sign In to View Rates
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
