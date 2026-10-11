import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, ArrowRight, Layers, BookOpen, ShieldCheck } from 'lucide-react';

export function Chatbot({ onExplore, onRequest, onLogin }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: 'Hello! How can we help you with fabrics, wholesale enquiries, or sample requests?',
      time: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const panelRef = useRef(null);
  const launcherRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Keyboard accessibility: Escape to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen(prev => !prev);
  };

  const handleQuickAction = (action) => {
    if (action === 'explore') {
      onExplore?.();
      // Add message to chat log
      setMessages(prev => [
        ...prev,
        { id: Date.now(), sender: 'user', text: 'Show me fabric collections' },
        { 
          id: Date.now() + 1, 
          sender: 'assistant', 
          text: 'Browsing collections on page. We offer Luxe Rayon Slub, Cotton Flex, Viscose Satin, and custom mill-dyed weaves in 44" and 58" widths.' 
        }
      ]);
    } else if (action === 'wholesale') {
      onRequest?.('B2B Wholesale Enquiry');
      setMessages(prev => [
        ...prev,
        { id: Date.now(), sender: 'user', text: 'I want to inquire about wholesale pricing and MOQs' },
        { 
          id: Date.now() + 1, 
          sender: 'assistant', 
          text: 'Opening the wholesale trade verification form. Verified buyers receive direct mill-rate A-category pricing.' 
        }
      ]);
    } else if (action === 'samples') {
      onRequest?.('Sample Swatch Book');
      setMessages(prev => [
        ...prev,
        { id: Date.now(), sender: 'user', text: 'Request swatch book samples' },
        { 
          id: Date.now() + 1, 
          sender: 'assistant', 
          text: 'Opening sample swatch request form. Swatch sets are dispatched via courier with shade cards and GSM specifications.' 
        }
      ]);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { id: Date.now(), sender: 'user', text: trimmed, time: 'Just now' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Contextual demo response generator
    setTimeout(() => {
      let reply = '';
      const lower = trimmed.toLowerCase();

      if (lower.includes('sample') || lower.includes('swatch')) {
        reply = 'We provide physical swatch books with authentic fabric cuts, shade numbers, and GSM details for wholesale buyers. You can use the "Request Samples" button to place a courier dispatch request.';
      } else if (lower.includes('price') || lower.includes('rate') || lower.includes('cost')) {
        reply = 'Wholesale rates are tiered by volume (A-category wholesale & broker rates). Because pricing fluctuates with grey yarn and market dye indices, verified rates are unlocked via Trade Verification.';
      } else if (lower.includes('rayon') || lower.includes('cotton') || lower.includes('viscose') || lower.includes('fabric')) {
        reply = 'Our looms specialize in Rayon Slub, Cotton Flex, and Viscose Satin in standard 44" and 58" than widths. Minimum wholesale order starts at 1 Than (~100 meters per shade).';
      } else if (lower.includes('transport') || lower.includes('dispatch') || lower.includes('delhi') || lower.includes('mumbai')) {
        reply = 'All orders are packed with water-resistant baling and booked via verified textile market transporters (e.g., Shree Maruti, Patel Transport, VRL Logistics) directly from Ring Road, Surat.';
      } else {
        reply = 'Thank you for reaching out! Suratloom connects wholesale garment makers with manufacturing mills in Surat. For formal quotes or dispatch status, please use the quick actions below or submit a B2B enquiry.';
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'assistant',
          text: reply,
          time: 'Just now',
          isDemo: true
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* 1. Floating Launcher Button */}
      <div className="sl-chatbot-launcher-wrap">
        <button
          ref={launcherRef}
          type="button"
          className={`sl-chatbot-launcher ${isOpen ? 'is-active' : ''}`}
          onClick={toggleOpen}
          aria-label={isOpen ? 'Close Suratloom assistant' : 'Chat with Suratloom'}
          aria-expanded={isOpen}
          aria-controls="sl-chatbot-panel"
        >
          {isOpen ? (
            <X size={22} className="sl-chatbot-launcher-icon" aria-hidden="true" />
          ) : (
            <MessageSquare size={22} className="sl-chatbot-launcher-icon" aria-hidden="true" />
          )}
          <span className="sl-chatbot-tooltip" role="tooltip">
            Chat with Suratloom
          </span>
        </button>
      </div>

      {/* 2. Floating Responsive Chat Panel */}
      {isOpen && (
        <section
          ref={panelRef}
          id="sl-chatbot-panel"
          className="sl-chatbot-panel"
          role="dialog"
          aria-labelledby="sl-chatbot-title"
          aria-modal="false"
        >
          {/* Header */}
          <div className="sl-chatbot-header">
            <div className="sl-chatbot-header-info">
              <div className="sl-chatbot-avatar" aria-hidden="true">
                <span className="sl-chatbot-avatar-text">SL</span>
                <span className="sl-chatbot-status-dot" title="Online"></span>
              </div>
              <div>
                <h3 id="sl-chatbot-title" className="sl-chatbot-title">
                  Suratloom Assistant
                </h3>
                <p className="sl-chatbot-subtitle">
                  Direct Mill & Wholesale Inquiries
                </p>
              </div>
            </div>
            <button
              type="button"
              className="sl-chatbot-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close assistant panel"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          {/* Backend Integration Notice (Transparency) */}
          <div className="sl-chatbot-notice">
            <Sparkles size={13} className="sl-chatbot-notice-icon" aria-hidden="true" />
            <span>Interactive Demo: Connect AI backend / webhook for live automated replies.</span>
          </div>

          {/* Messages Area */}
          <div className="sl-chatbot-messages" role="log" aria-live="polite">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`sl-chat-msg ${msg.sender === 'user' ? 'sl-chat-msg-user' : 'sl-chat-msg-assistant'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="sl-chat-msg-avatar" aria-hidden="true">
                    SL
                  </div>
                )}
                <div className="sl-chat-msg-bubble">
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="sl-chat-msg sl-chat-msg-assistant">
                <div className="sl-chat-msg-avatar" aria-hidden="true">SL</div>
                <div className="sl-chat-msg-bubble sl-chat-typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Suggestion Chips */}
          <div className="sl-chatbot-quick-actions" aria-label="Suggested quick actions">
            <button
              type="button"
              className="sl-chatbot-chip"
              onClick={() => handleQuickAction('explore')}
            >
              <Layers size={13} aria-hidden="true" />
              <span>Explore Fabrics</span>
            </button>
            <button
              type="button"
              className="sl-chatbot-chip"
              onClick={() => handleQuickAction('wholesale')}
            >
              <ShieldCheck size={13} aria-hidden="true" />
              <span>Wholesale Enquiry</span>
            </button>
            <button
              type="button"
              className="sl-chatbot-chip"
              onClick={() => handleQuickAction('samples')}
            >
              <BookOpen size={13} aria-hidden="true" />
              <span>Request Samples</span>
            </button>
          </div>

          {/* Input Bar */}
          <form className="sl-chatbot-form" onSubmit={handleSend}>
            <input
              ref={inputRef}
              type="text"
              className="sl-chatbot-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about fabrics, MOQs, samples..."
              aria-label="Message to Suratloom Assistant"
              maxLength={240}
            />
            <button
              type="submit"
              className="sl-chatbot-send-btn"
              disabled={!input.trim()}
              aria-label="Send message"
            >
              <Send size={15} aria-hidden="true" />
            </button>
          </form>
        </section>
      )}
    </>
  );
}
