import React from 'react';
import { X, LockKeyhole, ArrowRight, Check, ShieldAlert, ShieldCheck } from 'lucide-react';

export function LoginModal({
  isOpen,
  onClose,
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  loginError,
  onLoginSubmit
}) {
  if (!isOpen) return null;

  return (
    <div 
      className="sl-modal-backdrop" 
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className="sl-auth-modal">
        <button 
          type="button" 
          className="sl-modal-close" 
          onClick={onClose} 
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="auth-header">
          <span className="sl-kicker">PRIVATE TRADE WORKSPACE</span>
          <h2 className="auth-title">Partner Login</h2>
          <p className="auth-subtitle">
            Access confidential wholesale pricing, live than stock, and instant order slips.
          </p>
        </div>

        {loginError && (
          <div className="sl-auth-alert" role="alert">
            <ShieldAlert size={15} className="alert-icon" />
            <span>{loginError}</span>
          </div>
        )}

        <form onSubmit={onLoginSubmit} className="sl-form-stack">
          <label className="sl-form-label">
            <span>Work Email</span>
            <input 
              type="email" 
              required 
              className="sl-input" 
              value={loginEmail} 
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="e.g. buyer@suratloom.demo"
            />
          </label>

          <label className="sl-form-label">
            <span>Password</span>
            <input 
              type="password" 
              required 
              className="sl-input" 
              value={loginPassword} 
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="••••••••••••"
            />
          </label>

          <button type="submit" className="sl-btn sl-btn-primary full-width mt-8">
            <span>Sign In to Workspace</span>
            <ArrowRight size={15} />
          </button>
        </form>

        <div className="demo-accounts-panel">
          <span className="demo-panel-title">ONE-CLICK DEMO ROLES</span>
          <p className="demo-panel-desc">Select an account below to preview role-specific pricing and features:</p>
          
          <div className="demo-pills-row">
            <button
              type="button"
              className="demo-pill-btn"
              onClick={() => {
                setLoginEmail('buyer@suratloom.demo');
                setLoginPassword('LoomDemo2026!');
              }}
            >
              <strong>Buyer</strong>
              <small>Mehta Fabrics (Delhi)</small>
            </button>
            <button
              type="button"
              className="demo-pill-btn"
              onClick={() => {
                setLoginEmail('broker@suratloom.demo');
                setLoginPassword('LoomDemo2026!');
              }}
            >
              <strong>Broker</strong>
              <small>Aarif Traders (Surat)</small>
            </button>
            <button
              type="button"
              className="demo-pill-btn"
              onClick={() => {
                setLoginEmail('admin@suratloom.demo');
                setLoginPassword('LoomDemo2026!');
              }}
            >
              <strong>Admin</strong>
              <small>Mill Operations</small>
            </button>
          </div>

          <div className="demo-disclaimer-note">
            <ShieldCheck size={14} className="accent-icon" />
            <span>
              Client-side demonstration login. State is persisted in browser local storage.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RequestModal({
  isOpen,
  onClose,
  requestSent,
  requestForm,
  setRequestForm,
  onSubmitRequest
}) {
  if (!isOpen) return null;

  return (
    <div 
      className="sl-modal-backdrop" 
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className="sl-request-modal">
        <button 
          type="button" 
          className="sl-modal-close" 
          onClick={onClose} 
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {requestSent ? (
          <div className="request-success-stage">
            <div className="success-icon-badge">
              <Check size={24} />
            </div>
            <span className="sl-kicker">DEMO INQUIRY RECORDED</span>
            <h2 className="success-title">Trade Request Registered</h2>
            <p className="success-desc">
              Your inquiry for <strong>{requestForm.interest}</strong> for <strong>{requestForm.company || 'your firm'}</strong> ({requestForm.city || 'India'}) has been recorded on this screen.
            </p>
            <div className="success-note">
              <span>
                In production, this submission routes to the Surat sales desk for verification and dispatch confirmation.
              </span>
            </div>
            <button 
              type="button" 
              className="sl-btn sl-btn-primary sl-btn-emerald full-width mt-18" 
              onClick={onClose}
            >
              Return to Website
            </button>
          </div>
        ) : (
          <>
            <div className="request-header">
              <span className="sl-kicker">TRADE ONBOARDING</span>
              <h2 className="auth-title">
                {requestForm.interest === 'Sample Swatch Book' ? 'Request Sample Swatch Book' : 'Request Private B2B Access'}
              </h2>
              <p className="auth-subtitle">
                Share your firm details to receive verified buyer access or physical swatch cards.
              </p>
            </div>

            <form onSubmit={onSubmitRequest} className="sl-form-stack">
              <label className="sl-form-label">
                <span>Full Name</span>
                <input 
                  type="text" 
                  className="sl-input" 
                  required 
                  value={requestForm.name} 
                  onChange={(e) => setRequestForm({ ...requestForm, name: e.target.value })} 
                  placeholder="e.g. Aman Mehta"
                />
              </label>

              <label className="sl-form-label">
                <span>Company / Firm Name</span>
                <input 
                  type="text" 
                  className="sl-input" 
                  required 
                  value={requestForm.company} 
                  onChange={(e) => setRequestForm({ ...requestForm, company: e.target.value })} 
                  placeholder="e.g. Mehta Fabrics & Co."
                />
              </label>

              <div className="sl-form-row">
                <label className="sl-form-label">
                  <span>Destination City</span>
                  <input 
                    type="text" 
                    className="sl-input" 
                    required 
                    value={requestForm.city} 
                    onChange={(e) => setRequestForm({ ...requestForm, city: e.target.value })} 
                    placeholder="e.g. Delhi / Jaipur"
                  />
                </label>

                <label className="sl-form-label">
                  <span>Phone Number</span>
                  <input 
                    type="tel" 
                    className="sl-input" 
                    required 
                    value={requestForm.phone} 
                    onChange={(e) => setRequestForm({ ...requestForm, phone: e.target.value })} 
                    placeholder="+91 98XXX XXXXX"
                  />
                </label>
              </div>

              <label className="sl-form-label">
                <span>Request Type</span>
                <select 
                  className="sl-select"
                  value={requestForm.interest} 
                  onChange={(e) => setRequestForm({ ...requestForm, interest: e.target.value })}
                >
                  <option value="B2B Portal Access">B2B Portal Access (Wholesale Rates & Lots)</option>
                  <option value="Sample Swatch Book">Sample Swatch Book (Physical Touch & Feel)</option>
                </select>
              </label>

              <p className="form-disclaimer">
                All wholesale orders require minimum than commitments. Rates in ₹/meter.
              </p>

              <button type="submit" className="sl-btn sl-btn-primary full-width">
                <span>Submit Trade Request</span>
                <ArrowRight size={15} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export function Toast({ notice, onClose }) {
  if (!notice) return null;

  return (
    <div className="sl-toast-notice" role="status" aria-live="polite">
      <span>{notice}</span>
      <button type="button" onClick={onClose} aria-label="Dismiss notice">
        <X size={14} />
      </button>
    </div>
  );
}
