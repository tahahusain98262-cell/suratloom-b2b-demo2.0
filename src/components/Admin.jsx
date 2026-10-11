import React, { useState } from 'react';
import {
  LayoutDashboard,
  Boxes,
  ClipboardList,
  Users,
  ShieldCheck,
  LogOut,
  ArrowRight,
  Check,
  Truck
} from 'lucide-react';

const money = n => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

export function Admin({
  session,
  products,
  setProducts,
  orders,
  setOrders,
  onLogout,
  onHome
}) {
  const [section, setSection] = useState('overview');
  const [stockDraft, setStockDraft] = useState({});
  const [approval, setApproval] = useState([
    { name: 'Khan Textiles', city: 'Jaipur', category: 'Wholesaler', status: 'Pending' },
    { name: 'Southline Traders', city: 'Chennai', category: 'A-category buyer', status: 'Pending' },
    { name: 'Aarif Traders', city: 'Surat', category: 'Broker', status: 'Approved' }
  ]);

  const updateStock = (id, val) => {
    const stockThans = Math.max(0, Number(val) || 0);
    setProducts(prev => prev.map(p => p.id === id ? {
      ...p,
      stockThans,
      stock: stockThans * p.thanMeters
    } : p));
  };

  return (
    <div className="sl-admin-layout">
      {/* Admin Top Navigation */}
      <header className="sl-admin-header">
        <div className="sl-brand" onClick={onHome} style={{ cursor: 'pointer' }}>
          <span className="sl-brand-title">SURATLOOM</span>
          <span className="sl-brand-sep">/</span>
          <span className="sl-brand-tagline">MILL DESK</span>
        </div>

        <div className="admin-status-pill">
          <span className="stock-dot" />
          <span>MILL CONTROL ROOM (DEMO)</span>
        </div>

        <div className="admin-actions-group">
          <button type="button" className="sl-btn sl-btn-secondary sl-btn-outline" onClick={onHome}>
            Public Website
          </button>
          <button type="button" className="portal-logout-btn" onClick={onLogout} title="Sign Out">
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Admin Body Container */}
      <div className="sl-admin-body">
        {/* Sidebar */}
        <aside className="sl-admin-sidebar">
          <span className="portal-nav-label">CONTROL ROOM</span>
          <nav className="portal-side-nav">
            <button
              type="button"
              className={`portal-side-btn ${section === 'overview' ? 'active' : ''}`}
              onClick={() => setSection('overview')}
            >
              <LayoutDashboard size={15} />
              <span>Overview</span>
            </button>
            <button
              type="button"
              className={`portal-side-btn ${section === 'inventory' ? 'active' : ''}`}
              onClick={() => setSection('inventory')}
            >
              <Boxes size={15} />
              <span>Inventory Control</span>
            </button>
            <button
              type="button"
              className={`portal-side-btn ${section === 'orders' ? 'active' : ''}`}
              onClick={() => setSection('orders')}
            >
              <ClipboardList size={15} />
              <span>All Orders</span>
              <span className="side-badge">{orders.length}</span>
            </button>
            <button
              type="button"
              className={`portal-side-btn ${section === 'buyers' ? 'active' : ''}`}
              onClick={() => setSection('buyers')}
            >
              <Users size={15} />
              <span>Buyer Approvals</span>
              {approval.filter(a => a.status === 'Pending').length > 0 && (
                <span className="side-badge alert">
                  {approval.filter(a => a.status === 'Pending').length}
                </span>
              )}
            </button>
          </nav>

          <div className="admin-sidebar-footer">
            <div className="portal-security-card">
              <ShieldCheck size={15} className="accent-icon" />
              <strong>Admin Authorization</strong>
              <p>Demo controls only. In production, ensure audited server actions.</p>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="sl-admin-content">
          {/* Mobile Admin Navigation (<= 992px) */}
          <nav className="admin-mobile-tabs" aria-label="Admin Mobile Navigation">
            <button
              type="button"
              className={`admin-mobile-tab ${section === 'overview' ? 'active' : ''}`}
              onClick={() => setSection('overview')}
            >
              <LayoutDashboard size={14} />
              <span>Overview</span>
            </button>
            <button
              type="button"
              className={`admin-mobile-tab ${section === 'inventory' ? 'active' : ''}`}
              onClick={() => setSection('inventory')}
            >
              <Boxes size={14} />
              <span>Inventory</span>
            </button>
            <button
              type="button"
              className={`admin-mobile-tab ${section === 'orders' ? 'active' : ''}`}
              onClick={() => setSection('orders')}
            >
              <ClipboardList size={14} />
              <span>Orders ({orders.length})</span>
            </button>
            <button
              type="button"
              className={`admin-mobile-tab ${section === 'buyers' ? 'active' : ''}`}
              onClick={() => setSection('buyers')}
            >
              <Users size={14} />
              <span>Buyers</span>
              {approval.filter(a => a.status === 'Pending').length > 0 && (
                <span className="mobile-tab-badge">{approval.filter(a => a.status === 'Pending').length}</span>
              )}
            </button>
          </nav>

          {/* Section: Overview */}
          {section === 'overview' && (
            <div className="admin-section-wrap">
              <div className="portal-view-header">
                <span className="sl-kicker">MILL OPERATIONS DESK</span>
                <h1 className="portal-title">Good afternoon, Operations Team.</h1>
                <p className="portal-sub">Real-time snapshot of demo mill inventory, buyer approval queues, and recent orders.</p>
              </div>

              {/* Metrics Grid */}
              <div className="portal-metrics-grid">
                <div className="portal-metric-card">
                  <div className="metric-head">
                    <ClipboardList size={15} className="accent-icon" />
                    <span>Orders Logged</span>
                  </div>
                  <strong>{String(orders.length).padStart(2, '0')}</strong>
                  <small>Recorded in demo ledger</small>
                </div>

                <div className="portal-metric-card">
                  <div className="metric-head">
                    <Boxes size={15} className="accent-icon" />
                    <span>Meters in Stock</span>
                  </div>
                  <strong>{products.reduce((s, p) => s + p.stock, 0).toLocaleString('en-IN')}</strong>
                  <small>Across active shades</small>
                </div>

                <div className="portal-metric-card">
                  <div className="metric-head">
                    <Users size={15} className="accent-icon" />
                    <span>Pending Approvals</span>
                  </div>
                  <strong>{String(approval.filter(a => a.status === 'Pending').length).padStart(2, '0')}</strong>
                  <small>Trade partner requests</small>
                </div>

                <div className="portal-metric-card">
                  <div className="metric-head">
                    <Truck size={15} className="accent-icon" />
                    <span>Dispatch Status</span>
                  </div>
                  <strong>Live Demo</strong>
                  <small>No carrier API connected</small>
                </div>
              </div>

              {/* Two Column Grid */}
              <div className="admin-panels-grid">
                {/* Recent Orders Panel */}
                <div className="admin-panel-card">
                  <div className="panel-card-head">
                    <div>
                      <h3>Recent Orders</h3>
                      <p>Latest activity in demo ledger</p>
                    </div>
                    <button 
                      type="button" 
                      className="panel-link-btn"
                      onClick={() => setSection('orders')}
                    >
                      View All <ArrowRight size={13} />
                    </button>
                  </div>

                  <table className="sl-table compact">
                    <thead>
                      <tr>
                        <th>ORDER ID</th>
                        <th>BUYER</th>
                        <th>VALUE</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 4).map(o => (
                        <tr key={o.id}>
                          <td>
                            <strong>{o.id}</strong>
                            <small className="mono-sub">{o.date}</small>
                          </td>
                          <td>
                            <strong>{o.buyer}</strong>
                            <small className="mono-sub">{o.city}</small>
                          </td>
                          <td><strong className="accent-text">{money(o.total)}</strong></td>
                          <td>
                            <span className={`status-pill-badge ${o.status.toLowerCase()}`}>
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Stock Watch Panel */}
                <div className="admin-panel-card">
                  <div className="panel-card-head">
                    <div>
                      <h3>Stock Watch</h3>
                      <p>Lowest remaining than counts</p>
                    </div>
                    <button 
                      type="button" 
                      className="panel-link-btn"
                      onClick={() => setSection('inventory')}
                    >
                      Manage <ArrowRight size={13} />
                    </button>
                  </div>

                  <div className="stock-watch-list">
                    {[...products].sort((a, b) => a.stockThans - b.stockThans).slice(0, 4).map(p => (
                      <div key={p.id} className="stock-watch-item">
                        <span className={`stock-watch-dot ${p.stockThans < 7 ? 'alert' : ''}`} />
                        <div className="stock-watch-meta">
                          <strong>{p.code} · {p.name}</strong>
                          <small>{p.shade} ({p.color})</small>
                        </div>
                        <strong className="stock-watch-count">{p.stockThans} Thans</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section: Inventory */}
          {section === 'inventory' && (
            <div className="admin-section-wrap">
              <div className="portal-view-header">
                <span className="sl-kicker">INVENTORY CONTROL ROOM</span>
                <h1 className="portal-title">Fabric Inventory Management</h1>
                <p className="portal-sub">
                  Adjust available stock by Than unit. 1 Than is configured as {products[0]?.thanMeters || 100} meters. 
                  Changes persist locally in your browser.
                </p>
              </div>

              <div className="portal-table-container">
                <table className="sl-table">
                  <thead>
                    <tr>
                      <th>FABRIC & CODE</th>
                      <th>SHADE / WIDTH</th>
                      <th>BUYER RATE</th>
                      <th>BROKER RATE</th>
                      <th>STOCK (THANS)</th>
                      <th>METERS IN STOCK</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id}>
                        <td>
                          <strong>{p.name}</strong>
                          <small className="mono-sub">{p.code} · {p.type}</small>
                        </td>
                        <td>{p.shade} · {p.width}</td>
                        <td><strong>{money(p.priceA)}/m</strong></td>
                        <td><strong>{money(p.priceB)}/m</strong></td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            className="sl-admin-stock-input"
                            value={stockDraft[p.id] ?? p.stockThans}
                            onChange={(e) => setStockDraft({ ...stockDraft, [p.id]: e.target.value })}
                            onBlur={(e) => updateStock(p.id, e.target.value)}
                          />
                        </td>
                        <td>
                          <strong className="accent-text">{p.stock.toLocaleString('en-IN')}m</strong>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="admin-table-note">
                <span>
                  Adjusting than count immediately updates total yardage calculations. In production, changes are recorded in an audit table.
                </span>
              </div>
            </div>
          )}

          {/* Section: Orders */}
          {section === 'orders' && (
            <div className="admin-section-wrap">
              <div className="portal-view-header">
                <span className="sl-kicker">ORDER DESK OPERATIONS</span>
                <h1 className="portal-title">All Commercial Orders</h1>
                <p className="portal-sub">Review order status and update dispatch stages.</p>
              </div>

              <div className="portal-table-container">
                <table className="sl-table">
                  <thead>
                    <tr>
                      <th>ORDER REF</th>
                      <th>BUYER / FIRM</th>
                      <th>YARDAGE</th>
                      <th>TOTAL VALUE</th>
                      <th>STATUS</th>
                      <th>UPDATE STAGE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o.id}>
                        <td>
                          <strong>{o.id}</strong>
                          <small className="mono-sub">{o.date}</small>
                        </td>
                        <td>
                          <strong>{o.buyer}</strong>
                          <small className="mono-sub">{o.city}</small>
                        </td>
                        <td>{o.meters}m</td>
                        <td><strong className="accent-text">{money(o.total)}</strong></td>
                        <td>
                          <span className={`status-pill-badge ${o.status.toLowerCase()}`}>
                            {o.status}
                          </span>
                        </td>
                        <td>
                          <select
                            className="sl-select-sm"
                            value={o.status}
                            onChange={(e) => setOrders(prev => prev.map(x => x.id === o.id ? { ...x, status: e.target.value } : x))}
                          >
                            <option>Confirmed</option>
                            <option>Packed</option>
                            <option>Dispatched</option>
                            <option>Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Section: Buyers */}
          {section === 'buyers' && (
            <div className="admin-section-wrap">
              <div className="portal-view-header">
                <span className="sl-kicker">TRADE PARTNER VERIFICATION</span>
                <h1 className="portal-title">Buyer Account Approvals</h1>
                <p className="portal-sub">Approve trade credentials before enabling portal access.</p>
              </div>

              <div className="admin-approvals-card">
                {approval.map((a, i) => (
                  <div key={a.name} className="approval-item-row">
                    <div className="approval-avatar">
                      {a.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                    </div>
                    <div className="approval-meta">
                      <strong>{a.name}</strong>
                      <small>{a.city} · {a.category}</small>
                    </div>
                    <span className={`status-pill-badge ${a.status.toLowerCase()}`}>
                      {a.status}
                    </span>
                    <div className="approval-action">
                      {a.status === 'Pending' ? (
                        <button
                          type="button"
                          className="sl-btn sl-btn-primary-sm"
                          onClick={() => setApproval(prev => prev.map((x, j) => j === i ? { ...x, status: 'Approved' } : x))}
                        >
                          <Check size={14} /> Approve Access
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="sl-btn sl-btn-secondary"
                          onClick={() => setApproval(prev => prev.map((x, j) => j === i ? { ...x, status: 'Pending' } : x))}
                        >
                          Revoke Demo
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="admin-table-note">
                <span>
                  Demo approval toggle. Production onboarding mandates server-side verification and audit records.
                </span>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
