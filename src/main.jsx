import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ShieldCheck } from 'lucide-react';
import './styles.css';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FabricCollections } from './components/FabricCollections';
import { ManufacturingStory } from './components/ManufacturingStory';
import { BuiltForWholesale } from './components/BuiltForWholesale';
import { SwatchBookSection } from './components/SwatchBookSection';
import { PrivateTradeAccess } from './components/PrivateTradeAccess';
import { Footer } from './components/Footer';
import { LoginModal, RequestModal, Toast } from './components/Modals';
import { Portal } from './components/Portal';
import { Admin } from './components/Admin';
import { Chatbot } from './components/Chatbot';

const INITIAL_PRODUCTS = [
  { id: 'SL-104', name: 'Luxe Rayon Slub', type: 'Rayon', code: 'RAY-104', color: 'Sandstone', shade: 'S-04', width: '58"', unit: 'Than', priceA: 62, priceB: 66, stock: 1240, thanMeters: 100, stockThans: 12, swatch: 'sand', tag: 'Best seller' },
  { id: 'SL-208', name: 'Cotton Flex Premium', type: 'Cotton', code: 'COT-208', color: 'Olive Mist', shade: 'C-12', width: '44"', unit: 'Than', priceA: 78, priceB: 83, stock: 860, thanMeters: 100, stockThans: 8, swatch: 'olive', tag: 'New arrival' },
  { id: 'SL-316', name: 'Viscose Satin', type: 'Viscose', code: 'VIS-316', color: 'Midnight Blue', shade: 'V-09', width: '58"', unit: 'Than', priceA: 91, priceB: 97, stock: 540, thanMeters: 100, stockThans: 5, swatch: 'blue', tag: 'Limited stock' },
  { id: 'SL-422', name: 'Soft Drape Rayon', type: 'Rayon', code: 'RAY-422', color: 'Rose Clay', shade: 'S-18', width: '44"', unit: 'Than', priceA: 59, priceB: 64, stock: 1750, thanMeters: 100, stockThans: 17, swatch: 'rose', tag: 'Regular' },
  { id: 'SL-537', name: 'Cotton Satin Weave', type: 'Cotton', code: 'COT-537', color: 'Ivory', shade: 'C-02', width: '58"', unit: 'Than', priceA: 84, priceB: 89, stock: 620, thanMeters: 100, stockThans: 6, swatch: 'ivory', tag: 'Premium' },
  { id: 'SL-641', name: 'Viscose Twill', type: 'Viscose', code: 'VIS-641', color: 'Charcoal', shade: 'V-22', width: '58"', unit: 'Than', priceA: 73, priceB: 78, stock: 930, thanMeters: 100, stockThans: 9, swatch: 'charcoal', tag: 'Regular' }
];

const INITIAL_ORDERS = [
  { id: 'SO-261008-014', buyer: 'Mehta Fabrics', city: 'Delhi', items: 3, meters: 400, total: 28400, status: 'Packed', date: '08 Oct 2026', transport: 'Shree Maruti', markaa: 'MF / DELHI' },
  { id: 'SO-261007-009', buyer: 'Raza Textile House', city: 'Bhopal', items: 2, meters: 200, total: 15700, status: 'Confirmed', date: '07 Oct 2026', transport: 'Patel Transport', markaa: 'RTH / BPL' },
  { id: 'SO-261005-006', buyer: 'Southline Traders', city: 'Chennai', items: 4, meters: 600, total: 46700, status: 'Dispatched', date: '05 Oct 2026', transport: 'VRL Logistics', markaa: 'ST / CHN' }
];

const money = n => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const getSaved = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

function App() {
  const [page, setPage] = useState('home'); // 'home' | 'portal' | 'admin'
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('buyer@suratloom.demo');
  const [loginPassword, setLoginPassword] = useState('LoomDemo2026!');
  const [loginError, setLoginError] = useState('');
  const [session, setSession] = useState(null);

  const [products, setProducts] = useState(() => getSaved('sl-products', INITIAL_PRODUCTS));
  const [orders, setOrders] = useState(() => getSaved('sl-orders', INITIAL_ORDERS));
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState('All fabrics');
  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState('');
  const [selectedTransport, setSelectedTransport] = useState('Shree Maruti');
  const [markaa, setMarkaa] = useState('MF / DELHI');
  const [unit, setUnit] = useState('Than');
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  const [requestOpen, setRequestOpen] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [requestForm, setRequestForm] = useState({
    name: '',
    company: '',
    city: '',
    phone: '',
    interest: 'B2B Portal Access'
  });

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('sl-products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sl-orders', JSON.stringify(orders));
  }, [orders]);

  // Notice auto-dismiss
  useEffect(() => {
    if (notice) {
      const timer = setTimeout(() => setNotice(''), 3400);
      return () => clearTimeout(timer);
    }
  }, [notice]);

  const go = next => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLogin = () => {
    setLoginOpen(true);
    setLoginError('');
  };

  const openRequest = (interest = 'B2B Portal Access') => {
    setRequestForm(prev => ({ ...prev, interest }));
    setRequestSent(false);
    setRequestOpen(true);
  };

  const login = e => {
    e.preventDefault();
    const email = loginEmail.trim().toLowerCase();
    if (
      loginPassword !== 'LoomDemo2026!' ||
      !['buyer@suratloom.demo', 'admin@suratloom.demo', 'broker@suratloom.demo'].includes(email)
    ) {
      setLoginError('Demo credentials do not match. Please use one of the one-click demo accounts below.');
      return;
    }
    const role = email.startsWith('admin') ? 'admin' : email.startsWith('broker') ? 'broker' : 'buyer';
    const newSession = {
      email,
      role,
      name: role === 'admin' ? 'Mill Admin' : role === 'broker' ? 'Aarif Traders' : 'Mehta Fabrics',
      city: role === 'buyer' ? 'Delhi' : role === 'broker' ? 'Surat' : 'Surat',
      tier: role === 'buyer' ? 'A-category' : role === 'broker' ? 'Broker' : 'Admin'
    };
    setSession(newSession);
    setLoginOpen(false);
    setPage(role === 'admin' ? 'admin' : 'portal');
    setNotice(`Welcome back to Suratloom, ${newSession.name}.`);
  };

  const logout = () => {
    setSession(null);
    setCart([]);
    setShowReceipt(false);
    go('home');
    setNotice('You have been signed out of the private workspace.');
  };

  const visibleProducts = useMemo(() => {
    return products.filter(p => {
      const matchesFilter = filter === 'All fabrics' || p.type === filter;
      const matchesSearch = `${p.name} ${p.type} ${p.code} ${p.color}`.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [products, filter, search]);

  const unitPrice = p => session?.role === 'broker' ? p.priceB : p.priceA;

  const addToCart = (product, qty = 1) => {
    const available = product.stockThans || 0;
    const existing = cart.find(i => i.id === product.id);
    const nextQty = (existing?.qty || 0) + qty;
    if (nextQty > available) {
      setNotice(`Only ${available} thans currently available for ${product.code}.`);
      return;
    }
    setCart(prev => existing
      ? prev.map(i => i.id === product.id ? { ...i, qty: nextQty } : i)
      : [...prev, { id: product.id, qty, unit: product.unit }]
    );
    setNotice(`${product.name} (${qty} Than / ${qty * product.thanMeters}m) added to order draft.`);
  };

  const cartLines = cart.map(item => {
    const p = products.find(x => x.id === item.id);
    return p ? { ...p, qty: item.qty, lineTotal: unitPrice(p) * p.thanMeters * item.qty } : null;
  }).filter(Boolean);

  const cartTotal = cartLines.reduce((sum, item) => sum + item.lineTotal, 0);
  const cartMeters = cartLines.reduce((sum, item) => sum + item.qty * item.thanMeters, 0);

  const submitOrder = () => {
    if (!cartLines.length) {
      setNotice('Please add fabric to your order draft before confirming.');
      return;
    }
    const id = `SO-${new Date().toISOString().slice(2, 10).replaceAll('-', '')}-${String(orders.length + 15).padStart(3, '0')}`;
    const order = {
      id,
      buyer: session?.name || 'Demo Buyer',
      city: session?.city || 'Delhi',
      items: cartLines.length,
      meters: cartMeters,
      total: cartTotal,
      status: 'Confirmed',
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      transport: selectedTransport,
      markaa,
      lines: cartLines.map(i => ({
        id: i.id,
        code: i.code,
        name: i.name,
        shade: i.shade,
        color: i.color,
        qty: i.qty,
        meters: i.qty * i.thanMeters,
        width: i.width,
        price: unitPrice(i),
        amount: i.lineTotal,
        hsn: '5407'
      }))
    };

    // Decrement stock in demo state
    setProducts(prev => prev.map(p => {
      const line = cartLines.find(i => i.id === p.id);
      return line ? {
        ...p,
        stockThans: Math.max(0, p.stockThans - line.qty),
        stock: Math.max(0, p.stock - line.qty * p.thanMeters)
      } : p;
    }));

    setOrders(prev => [order, ...prev]);
    setLastOrder(order);
    setCart([]);
    setShowReceipt(true);
    setNotice('Demo order confirmed. Inventory ledger updated locally.');
  };

  const openWhatsAppPreview = order => {
    if (!order) return;
    const lines = (order.lines || []).map(i =>
      `${i.code} | ${i.name} | Shade ${i.shade} ${i.color} | ${i.qty} Than (${i.meters}m) | ${money(i.amount)} | HSN ${i.hsn}`
    ).join('\n');
    const message = `*SURATLOOM — DEMO ORDER RECEIPT*\n` +
      `Order Ref: ${order.id}\n` +
      `Buyer: ${order.buyer}, ${order.city}\n` +
      `Transport: ${order.transport}\n` +
      `Markaa Stencil: ${order.markaa}\n\n` +
      `*ORDER LINES:*\n${lines}\n\n` +
      `*Total Yardage:* ${order.meters} meters\n` +
      `*Subtotal:* ${money(order.total)}\n` +
      `*GST:* Calculated per manufacturer tax invoice\n` +
      `*Order Value:* ${money(order.total)}\n\n` +
      `_Note: Demonstration message preview. No automated WhatsApp API call was dispatched._`;

    setNotice('WhatsApp receipt draft prepared for sales desk.');
    setLastOrder({ ...order, whatsappText: message });
  };

  const submitRequest = e => {
    e.preventDefault();
    setRequestSent(true);
    setNotice('Demo request captured on this screen. Connect backend to store it permanently.');
  };

  return (
    <div className="sl-app-shell">
      {/* 1. PUBLIC HOMEPAGE */}
      {page === 'home' && (
        <>
          <Navbar 
            onLogin={openLogin} 
            onRequest={openRequest} 
            onPortal={() => session ? go(session.role === 'admin' ? 'admin' : 'portal') : openLogin()}
            session={session}
            onLogout={logout}
          />
          <main>
            <Hero 
              onLogin={openLogin} 
              onRequest={openRequest}
              onExplore={() => {
                const el = document.getElementById('fabrics');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <FabricCollections 
              products={products}
              onLogin={openLogin}
              onRequest={openRequest}
            />
            <ManufacturingStory 
              onRequest={openRequest}
            />
            <BuiltForWholesale 
              onLogin={openLogin}
              onRequest={openRequest}
            />
            <SwatchBookSection 
              onRequest={openRequest}
            />
            <PrivateTradeAccess 
              onLogin={openLogin}
              onRequest={openRequest}
            />
          </main>
          <Footer 
            onLogin={openLogin}
            onRequest={openRequest}
          />
        </>
      )}

      {/* 2. PRIVATE PARTNER PORTAL */}
      {page === 'portal' && session && (
        <Portal 
          session={session}
          products={visibleProducts}
          allProducts={products}
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
          addToCart={addToCart}
          cartLines={cartLines}
          cartTotal={cartTotal}
          cartMeters={cartMeters}
          cart={cart}
          setCart={setCart}
          unit={unit}
          setUnit={setUnit}
          transport={selectedTransport}
          setTransport={setSelectedTransport}
          markaa={markaa}
          setMarkaa={setMarkaa}
          submitOrder={submitOrder}
          onLogout={logout}
          onAdmin={() => go('admin')}
          orders={orders}
          showReceipt={showReceipt}
          setShowReceipt={setShowReceipt}
          lastOrder={lastOrder}
          onWhatsApp={openWhatsAppPreview}
          onHome={() => go('home')}
        />
      )}

      {/* 3. MILL ADMIN CONSOLE */}
      {page === 'admin' && session?.role === 'admin' && (
        <Admin 
          session={session}
          products={products}
          setProducts={setProducts}
          orders={orders}
          setOrders={setOrders}
          onLogout={logout}
          onHome={() => go('home')}
        />
      )}

      {/* Access Denied Fallback */}
      {page === 'admin' && session?.role !== 'admin' && (
        <div className="sl-access-denied-view">
          <ShieldCheck size={48} className="emerald-accent mb-16" />
          <h2>Admin Console Access Required</h2>
          <p>This section is restricted to the mill administration account.</p>
          <button 
            type="button" 
            className="sl-btn sl-btn-emerald mt-16" 
            onClick={() => go('portal')}
          >
            Return to Partner Portal
          </button>
        </div>
      )}

      {/* Floating AI Chatbot Assistant */}
      <Chatbot 
        onExplore={() => {
          if (page !== 'home') go('home');
          setTimeout(() => {
            const el = document.getElementById('fabrics');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onRequest={openRequest}
        onLogin={openLogin}
      />

      {/* Modals & Overlays */}
      <LoginModal 
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        loginEmail={loginEmail}
        setLoginEmail={setLoginEmail}
        loginPassword={loginPassword}
        setLoginPassword={setLoginPassword}
        loginError={loginError}
        onLoginSubmit={login}
      />

      <RequestModal 
        isOpen={requestOpen}
        onClose={() => setRequestOpen(false)}
        requestSent={requestSent}
        requestForm={requestForm}
        setRequestForm={setRequestForm}
        onSubmitRequest={submitRequest}
      />

      <Toast 
        notice={notice} 
        onClose={() => setNotice('')} 
      />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
