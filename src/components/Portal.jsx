import React, { useState } from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  Truck,
  Users,
  ShieldCheck,
  LogOut,
  BadgeCheck,
  ShoppingCart,
  Boxes,
  PackageCheck,
  PackageSearch,
  Search,
  Plus,
  Minus,
  Check,
  FileText,
  ShoppingBag,
  X,
  ArrowRight,
  ArrowUpRight,
  Fingerprint
} from 'lucide-react';

const CATEGORY_IMAGES = {
  Rayon: '/assets/fabric-rayon.jpg',
  Cotton: '/assets/fabric-cotton.jpg',
  Viscose: '/assets/fabric-viscose.jpg'
};

const money = n => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

export function Portal({
  session,
  products,
  allProducts,
  filter,
  setFilter,
  search,
  setSearch,
  addToCart,
  cartLines,
  cartTotal,
  cartMeters,
  cart,
  setCart,
  unit,
  setUnit,
  transport,
  setTransport,
  markaa,
  setMarkaa,
  submitOrder,
  onLogout,
  onAdmin,
  orders,
  showReceipt,
  setShowReceipt,
  lastOrder,
  onWhatsApp,
  onHome
}) {
  const [tab, setTab] = useState('catalog');
  const [cartOpen, setCartOpen] = useState(false);
  const [receiptPreview, setReceiptPreview] = useState(false);
  const [qtyByProduct, setQtyByProduct] = useState({});

  const isBroker = session.role === 'broker';
  const price = p => isBroker ? p.priceB : p.priceA;
  const activeOrders = orders.filter(o => o.buyer === session.name || session.role === 'broker' || session.role === 'admin');

  return (
    <div className="sl-portal-layout">
      {/* Sidebar Navigation */}
      <aside className="sl-portal-sidebar">
        <div className="portal-sidebar-head">
          <div className="sl-brand" onClick={onHome} style={{ cursor: 'pointer' }}>
            <span className="sl-brand-title">SURATLOOM</span>
            <span className="sl-brand-sep">/</span>
            <span className="sl-brand-tagline">WORKSPACE</span>
          </div>
        </div>

        <div className="portal-nav-section">
          <span className="portal-nav-label">TRADE WORKSPACE</span>
          <nav className="portal-side-nav">
            <button
              type="button"
              className={`portal-side-btn ${tab === 'catalog' ? 'active' : ''}`}
              onClick={() => setTab('catalog')}
            >
              <LayoutDashboard size={15} />
              <span>Fabric Catalogue</span>
            </button>
            <button
              type="button"
              className={`portal-side-btn ${tab === 'orders' ? 'active' : ''}`}
              onClick={() => setTab('orders')}
            >
              <ClipboardList size={15} />
              <span>My Orders</span>
              {activeOrders.length > 0 && <span className="side-badge">{activeOrders.length}</span>}
            </button>
            <button
              type="button"
              className={`portal-side-btn ${tab === 'dispatch' ? 'active' : ''}`}
              onClick={() => setTab('dispatch')}
            >
              <Truck size={15} />
              <span>Dispatch & Transport</span>
            </button>
            {session.role === 'admin' && (
              <button
                type="button"
                className="portal-side-btn admin-link"
                onClick={onAdmin}
              >
                <Users size={15} />
                <span>Admin Console</span>
                <ArrowUpRight size={13} className="ml-auto" />
              </button>
            )}
          </nav>
        </div>

        {/* Workspace Security Box */}
        <div className="portal-sidebar-footer">
          <div className="portal-security-card">
            <div className="security-icon-row">
              <ShieldCheck size={15} className="accent-icon" />
              <strong>Verified Partner Session</strong>
            </div>
            <p>Role: {session.role.toUpperCase()} · Tier: {session.tier}</p>
            <span className="watermark-tag">Account Watermark Active</span>
          </div>

          {/* User Profile Bar */}
          <div className="portal-user-row">
            <div className="portal-avatar">
              {session.name.split(' ').map(x => x[0]).slice(0, 2).join('')}
            </div>
            <div className="portal-user-meta">
              <strong>{session.name}</strong>
              <small>{session.tier} · {session.city}</small>
            </div>
            <button
              type="button"
              className="portal-logout-btn"
              onClick={onLogout}
              title="Sign out of workspace"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Portal Viewport */}
      <main className="sl-portal-main">
        {/* Top Header Bar */}
        <header className="portal-topbar">
          <div className="portal-breadcrumbs">
            <button type="button" className="crumb-btn" onClick={onHome}>Suratloom</button>
            <span className="crumb-sep">/</span>
            <strong className="crumb-current">
              {tab === 'catalog' ? 'Fabric Catalogue' : tab === 'orders' ? 'Order Ledger' : 'Logistics'}
            </strong>
          </div>

          <div className="portal-top-actions">
            <div className="verified-status-tag">
              <BadgeCheck size={14} className="accent-icon" />
              <span>Verified {session.tier}</span>
            </div>

            <button
              type="button"
              className="sl-cart-toggle-btn"
              onClick={() => setCartOpen(true)}
              aria-label="Open Cart Drawer"
            >
              <ShoppingCart size={15} className="accent-icon" />
              <span>Order Draft</span>
              <strong className="cart-badge">{cart.reduce((s, i) => s + i.qty, 0)}</strong>
            </button>
          </div>
        </header>

        {/* Tab 1: Catalog */}
        {tab === 'catalog' && (
          <div className="portal-catalog-view">
            {/* Greeting & Protected Banner */}
            <div className="portal-welcome-banner">
              <div>
                <span className="sl-kicker">TRADE PARTNER WORKSPACE / {session.tier.toUpperCase()}</span>
                <h1 className="portal-title">Good afternoon, {session.name.split(' ')[0]}.</h1>
                <p className="portal-sub">
                  Your approved wholesale portfolio is active. Rates are locked to your {session.tier} tier.
                </p>
              </div>

              <div className="watermark-badge-pill">
                <Fingerprint size={16} className="accent-icon" />
                <div>
                  <strong>Protected Catalogue</strong>
                  <span>Account watermark applied</span>
                </div>
              </div>
            </div>

            {/* Metrics Telemetry */}
            <div className="portal-metrics-grid">
              <div className="portal-metric-card">
                <div className="metric-head">
                  <Boxes size={15} className="accent-icon" />
                  <span>Available Qualities</span>
                </div>
                <strong>{String(allProducts.length).padStart(2, '0')}</strong>
                <small>Running constructions</small>
              </div>

              <div className="portal-metric-card">
                <div className="metric-head">
                  <PackageCheck size={15} className="accent-icon" />
                  <span>Demo Stock on Hand</span>
                </div>
                <strong>{(allProducts.reduce((s, p) => s + p.stock, 0) / 1000).toFixed(1)}k</strong>
                <small>Meters in demo state</small>
              </div>

              <div className="portal-metric-card">
                <div className="metric-head">
                  <ClipboardList size={15} className="accent-icon" />
                  <span>Orders Logged</span>
                </div>
                <strong>{String(activeOrders.length).padStart(2, '0')}</strong>
                <small>Recorded in your ledger</small>
              </div>

              <div className="portal-metric-card">
                <div className="metric-head">
                  <Truck size={15} className="accent-icon" />
                  <span>Dispatch Hub</span>
                </div>
                <strong>Surat, GJ</strong>
                <small>Direct bilti transport network</small>
              </div>
            </div>

            {/* Catalog Filter Bar */}
            <div className="portal-catalog-tools">
              <div>
                <h2 className="portal-section-h2">Approved Fabric Collection</h2>
                <p className="portal-section-p">Wholesale rates in ₹/meter · Standard 100m whole-than units</p>
              </div>

              <div className="portal-tools-right">
                <div className="portal-search-input-wrap">
                  <Search size={14} />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search fabric code, shade, color..."
                  />
                </div>

                <select
                  className="portal-category-select"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option>All fabrics</option>
                  <option>Rayon</option>
                  <option>Cotton</option>
                  <option>Viscose</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="portal-grid">
              {products.map(p => {
                const currentQty = qtyByProduct[p.id] || 1;
                const imageSrc = CATEGORY_IMAGES[p.type] || '/assets/hero-textile-macro.jpg';

                return (
                  <div key={p.id} className="portal-card">
                    {/* Visual Swatch with Account Watermark */}
                    <div className="portal-card-thumb">
                      <img src={imageSrc} alt={p.name} className="portal-thumb-img" />
                      <div className="portal-thumb-overlay" />
                      <span className="portal-tag-pill">{p.tag}</span>
                      <div className="portal-shade-chip">Shade {p.shade}</div>

                      {/* Anti-piracy watermark overlay */}
                      <div className="portal-watermark-overlay" aria-hidden="true">
                        <span>{session.name.toUpperCase()}</span>
                        <span>CONFIDENTIAL TRADE COLLECTION</span>
                      </div>
                    </div>

                    <div className="portal-card-body">
                      <div className="card-code-line">
                        <span className="portal-mono-code">{p.code}</span>
                        <span className="portal-width-badge">{p.width} Panna</span>
                      </div>

                      <h3 className="portal-item-name">{p.name}</h3>
                      <p className="portal-item-spec">{p.type} · {p.color}</p>

                      <div className="portal-stock-indicator">
                        <span className="stock-dot" />
                        <span><strong>{p.stockThans} Thans</strong> available ({p.stock.toLocaleString('en-IN')}m)</span>
                      </div>

                      {/* Pricing & Add Stepper Row */}
                      <div className="portal-buy-controls">
                        <div className="portal-rate-display">
                          <strong>{money(price(p))}</strong>
                          <small>/ meter</small>
                        </div>

                        <div className="portal-stepper">
                          <button
                            type="button"
                            className="stepper-btn"
                            onClick={() => setQtyByProduct({
                              ...qtyByProduct,
                              [p.id]: Math.max(1, currentQty - 1)
                            })}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="stepper-val">{currentQty}T</span>
                          <button
                            type="button"
                            className="stepper-btn"
                            onClick={() => setQtyByProduct({
                              ...qtyByProduct,
                              [p.id]: currentQty + 1
                            })}
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="sl-btn sl-btn-primary-sm sl-btn-emerald-sm full-width mt-8"
                        onClick={() => addToCart(p, currentQty)}
                      >
                        <Plus size={14} /> Add {currentQty} Than ({currentQty * p.thanMeters}m)
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {!products.length && (
              <div className="portal-empty-state">
                <PackageSearch size={36} className="accent-icon" />
                <h3>No Matching Fabrics Found</h3>
                <p>Try modifying your search query or category filter.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Orders */}
        {tab === 'orders' && (
          <div className="portal-orders-view">
            <div className="portal-view-header">
              <span className="sl-kicker">ORDER MANAGEMENT DESK</span>
              <h1 className="portal-title">Order Ledger & History</h1>
              <p className="portal-sub">Track real-time lot dispatch statuses, transport allocations, and historical receipts.</p>
            </div>

            <div className="portal-table-container">
              <table className="sl-table">
                <thead>
                  <tr>
                    <th>ORDER ID</th>
                    <th>DATE</th>
                    <th>ITEMS / YARDAGE</th>
                    <th>TOTAL VALUE</th>
                    <th>STATUS</th>
                    <th>TRANSPORT / MARKAA</th>
                  </tr>
                </thead>
                <tbody>
                  {activeOrders.map(o => (
                    <tr key={o.id}>
                      <td>
                        <strong>{o.id}</strong>
                        <small className="mono-sub">{o.markaa}</small>
                      </td>
                      <td>{o.date}</td>
                      <td>
                        {o.items} qualities · <strong>{o.meters}m</strong>
                      </td>
                      <td>
                        <strong className="accent-text">{money(o.total)}</strong>
                      </td>
                      <td>
                        <span className={`status-pill-badge ${o.status.toLowerCase()}`}>
                          {o.status}
                        </span>
                      </td>
                      <td>
                        <strong>{o.transport}</strong>
                        <small className="mono-sub">{o.markaa}</small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Dispatch & Transport */}
        {tab === 'dispatch' && (
          <div className="portal-dispatch-view">
            <div className="portal-view-header">
              <span className="sl-kicker">LOGISTICS & DISPATCH CONFIGURATION</span>
              <h1 className="portal-title">Transport Preferences</h1>
              <p className="portal-sub">Configure your preferred Surat market carrier and stencil markaa for upcoming order slips.</p>
            </div>

            <div className="sl-dispatch-config-card">
              <div className="dispatch-card-title-row">
                <Truck size={18} className="accent-icon" />
                <div>
                  <h3>Preferred Transport Artery</h3>
                  <p>Applied to your next order slip and kacha bill generation.</p>
                </div>
              </div>

              <div className="sl-form-stack">
                <label className="sl-form-label">
                  <span>Primary Transporter (Surat Hub)</span>
                  <select
                    className="sl-select"
                    value={transport}
                    onChange={(e) => setTransport(e.target.value)}
                  >
                    <option>Shree Maruti</option>
                    <option>VRL Logistics</option>
                    <option>Patel Transport</option>
                    <option>Gati</option>
                    <option>Buyer pickup (Mill Gate)</option>
                  </select>
                </label>

                <label className="sl-form-label">
                  <span>Markaa / Destination Stencil</span>
                  <input
                    type="text"
                    className="sl-input"
                    value={markaa}
                    onChange={(e) => setMarkaa(e.target.value)}
                    placeholder="e.g. MF / DELHI"
                  />
                </label>

                <div className="dispatch-info-pill">
                  <span>
                    Carrier bookings are handled offline by our dispatch desk. Your chosen preference is automatically encoded into the order slip.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      {cartOpen && (
        <div 
          className="sl-modal-backdrop drawer-mode" 
          onClick={(e) => e.target === e.currentTarget && setCartOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <aside className="sl-cart-drawer">
            <div className="cart-drawer-header">
              <div>
                <span className="sl-kicker">ORDER BUILDER</span>
                <h2 className="cart-title">Order Draft</h2>
              </div>
              <button 
                type="button" 
                className="sl-modal-close" 
                onClick={() => setCartOpen(false)}
                aria-label="Close cart drawer"
              >
                <X size={18} />
              </button>
            </div>

            {cartLines.length ? (
              <>
                <div className="cart-items-scroller">
                  {cartLines.map(i => (
                    <div key={i.id} className="cart-line-item">
                      <div className="cart-item-info">
                        <strong>{i.name}</strong>
                        <small>{i.code} · Shade {i.shade} ({i.color}) · {i.width}</small>
                        <span className="cart-calc-sub">
                          {money(price(i))}/m × {i.qty} Than ({i.qty * i.thanMeters}m)
                        </span>
                      </div>
                      <div className="cart-item-right">
                        <strong>{money(i.lineTotal)}</strong>
                        <button
                          type="button"
                          className="cart-remove-btn"
                          onClick={() => setCart(cart.filter(c => c.id !== i.id))}
                          title="Remove item"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-logistics-config">
                  <label className="sl-form-label">
                    <span>Transport Artery</span>
                    <select
                      className="sl-select"
                      value={transport}
                      onChange={(e) => setTransport(e.target.value)}
                    >
                      <option>Shree Maruti</option>
                      <option>VRL Logistics</option>
                      <option>Patel Transport</option>
                      <option>Gati</option>
                      <option>Buyer pickup (Mill Gate)</option>
                    </select>
                  </label>

                  <label className="sl-form-label">
                    <span>Markaa Reference</span>
                    <input
                      type="text"
                      className="sl-input"
                      value={markaa}
                      onChange={(e) => setMarkaa(e.target.value)}
                    />
                  </label>
                </div>

                <div className="cart-footer-summary">
                  <div className="summary-row">
                    <span>Total Yardage</span>
                    <strong>{cartMeters} meters</strong>
                  </div>
                  <div className="summary-row">
                    <span>Subtotal (Commercial Rate)</span>
                    <strong>{money(cartTotal)}</strong>
                  </div>
                  <div className="summary-row grand-total">
                    <span>Order Value</span>
                    <strong className="accent-text">{money(cartTotal)}</strong>
                  </div>
                  <small className="cart-tax-notice">
                    GST applicable per tax invoice. This demo order draft reserves lot inventory locally.
                  </small>

                  <button
                    type="button"
                    className="sl-btn sl-btn-primary sl-btn-emerald full-width mt-10"
                    onClick={() => {
                      submitOrder();
                      setCartOpen(false);
                    }}
                  >
                    <Check size={16} /> Confirm Demo Order & Reserve Stock
                  </button>
                </div>
              </>
            ) : (
              <div className="cart-empty-view">
                <ShoppingBag size={38} className="accent-icon" />
                <h3>Your Order Draft is Empty</h3>
                <p>Browse our approved textile catalogue and add whole thans to prepare an order.</p>
                <button
                  type="button"
                  className="sl-btn sl-btn-primary"
                  onClick={() => setCartOpen(false)}
                >
                  Browse Catalogue
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* Kacha Bill Receipt Modal */}
      {showReceipt && lastOrder && (
        <div 
          className="sl-modal-backdrop" 
          onClick={(e) => e.target === e.currentTarget && setShowReceipt(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="sl-receipt-modal-container">
            <button 
              type="button" 
              className="sl-modal-close" 
              onClick={() => setShowReceipt(false)} 
              aria-label="Close receipt modal"
            >
              <X size={18} />
            </button>

            <div className="receipt-confirmation-banner">
              <div className="receipt-success-badge">
                <Check size={18} />
              </div>
              <div>
                <span className="sl-kicker">DEMO ORDER CONFIRMED</span>
                <h2>Demo Order Placed Successfully</h2>
                <p>Inventory counts have been atomically decreased in your browser's demo state.</p>
              </div>
            </div>

            {/* Printable Kacha Bill Paper */}
            <div className="sl-kacha-bill-paper">
              <div className="bill-header">
                <div>
                  <h3 className="bill-company">SURATLOOM TEXTILE MILLS</h3>
                  <p className="bill-sub">Pandesara GIDC · Surat, Gujarat 395002 · Direct Mill Desk</p>
                </div>
                <div className="bill-tag-box">
                  <span>KACHA BILL · DEMO ORDER SLIP</span>
                </div>
              </div>

              <div className="bill-meta-grid">
                <div>
                  <small>ORDER ID</small>
                  <strong>{lastOrder.id}</strong>
                </div>
                <div>
                  <small>ORDER DATE</small>
                  <strong>{lastOrder.date}</strong>
                </div>
                <div>
                  <small>BUYER / FIRM</small>
                  <strong>{lastOrder.buyer}</strong>
                  <span>{lastOrder.city}</span>
                </div>
                <div>
                  <small>TRANSPORT & MARKAA</small>
                  <strong>{lastOrder.transport}</strong>
                  <span className="mono-sub">{lastOrder.markaa}</span>
                </div>
              </div>

              <table className="bill-table">
                <thead>
                  <tr>
                    <th>ITEM / QUALITY CODE</th>
                    <th>SHADE & PANNA</th>
                    <th>QUANTITY</th>
                    <th>RATE / M</th>
                    <th>AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {(lastOrder.lines || []).map((l, i) => (
                    <tr key={i}>
                      <td>
                        <strong>{l.name}</strong>
                        <small>{l.code} · HSN {l.hsn}</small>
                      </td>
                      <td>{l.color} ({l.shade}) · {l.width}</td>
                      <td>{l.qty} Than ({l.meters}m)</td>
                      <td>{money(l.price)}</td>
                      <td><strong>{money(l.amount)}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="bill-totals-section">
                <div className="bill-total-row">
                  <span>Subtotal</span>
                  <strong>{money(lastOrder.total)}</strong>
                </div>
                <div className="bill-total-row">
                  <span>GST Treatment</span>
                  <strong>To be calculated per official tax invoice</strong>
                </div>
                <div className="bill-total-row final-total">
                  <span>Order Value</span>
                  <strong>{money(lastOrder.total)}</strong>
                </div>
              </div>

              <div className="bill-footer-note">
                Commercial Order Slip Preview · Suratloom Private B2B Demo · Subject to mill terms.
              </div>
            </div>

            {/* Action Bar */}
            <div className="receipt-action-bar">
              <button 
                type="button" 
                className="sl-btn sl-btn-secondary" 
                onClick={() => window.print()}
              >
                <FileText size={15} /> Print Kacha Bill
              </button>
              <button
                type="button"
                className="sl-btn sl-btn-primary sl-btn-emerald"
                onClick={() => {
                  onWhatsApp(lastOrder);
                  setReceiptPreview(true);
                }}
              >
                WhatsApp Receipt Preview <ArrowRight size={15} />
              </button>
            </div>

            {/* WhatsApp Text Preview Accordion */}
            {receiptPreview && (
              <div className="receipt-whatsapp-preview-box">
                <div className="whatsapp-box-head">
                  <span>WhatsApp Message Draft (Sales Desk Copy)</span>
                  <BadgeCheck size={14} className="accent-icon" />
                </div>
                <pre className="whatsapp-pre-text">
                  {lastOrder.whatsappText || 'Preparing message preview...'}
                </pre>
                <div className="whatsapp-disclaimer">
                  <span>
                    Demonstration message preview. Server-side WhatsApp Business API is required for automated dispatch notifications.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
