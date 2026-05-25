/* ─────────────────────────────────────────────────────────────────────────────
   Hello Desk Leads — Marketing Site Scripts
───────────────────────────────────────────────────────────────────────────── */

/* ── Scroll Reveal ───────────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Mobile Nav ──────────────────────────────────────────────────────────── */
const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-mobile-menu');
navToggle?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
  navMenu.setAttribute('aria-hidden', !isOpen);
});
// Close on nav link click
navMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.setAttribute('aria-hidden', 'true');
  });
});

/* ── Smooth scroll for anchor links ─────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ── Header scroll shadow ────────────────────────────────────────────────── */
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── Demo Chat ───────────────────────────────────────────────────────────── */
const messagesEl    = document.getElementById('demo-messages');
const inputEl       = document.getElementById('demo-input');
const sendBtn       = document.getElementById('demo-send');
const quickReplies  = document.getElementById('demo-quick-replies');

// Simple rule-based demo AI responses
const DEMO_RESPONSES = [
  {
    triggers: ['book', 'appointment', 'schedule', 'call', 'meeting', 'consult'],
    response: "I'd be happy to help schedule that! Could you share your name and best phone number so we can get it confirmed?"
  },
  {
    triggers: ['quote', 'price', 'cost', 'how much', 'pricing'],
    response: "Great, I can get you a quote started! What's your name and a bit about what you're looking for? I'll make sure the right person follows up with you."
  },
  {
    triggers: ['question', 'info', 'information', 'learn', 'how does', 'what is', 'what do'],
    response: "Of course! I'm here to help. What would you like to know? I can answer questions about our services, pricing, or get you connected with the right person."
  },
  {
    triggers: ['hello', 'hi', 'hey', 'good morning', 'good afternoon'],
    response: "Hi there! Great to hear from you. Are you looking to schedule an appointment, get a quote, or do you have a question I can help answer?"
  },
  {
    triggers: ['hours', 'open', 'available', 'when'],
    response: "Our AI is available 24/7 — so you'll always get an instant response! A team member will follow up during business hours. Is there something specific you need help with?"
  },
  {
    triggers: ['name', 'my name is', 'i am', "i'm"],
    response: "Nice to meet you! And what's a good phone number or email to reach you at? I'll make sure someone gets back to you right away."
  },
  {
    triggers: ['phone', 'number', 'email', 'contact'],
    response: "Perfect — I've got your info noted. A team member will be reaching out to you shortly. Is there anything else I can help with in the meantime?"
  }
];

const FALLBACK_RESPONSES = [
  "Thanks for reaching out! Let me make sure the right person helps you. Could you share your name and phone number so we can follow up?",
  "Got it! I want to make sure I get you the right help. What's the best way for our team to reach you?",
  "I'll make sure someone connects with you about that. Can I grab your name and contact info real quick?"
];

let fallbackIndex = 0;

function getAIResponse(message) {
  const lower = message.toLowerCase();
  for (const rule of DEMO_RESPONSES) {
    if (rule.triggers.some(t => lower.includes(t))) {
      return rule.response;
    }
  }
  const resp = FALLBACK_RESPONSES[fallbackIndex % FALLBACK_RESPONSES.length];
  fallbackIndex++;
  return resp;
}

function appendMessage(text, role) {
  const div = document.createElement('div');
  div.className = `dchat-msg dchat-${role}`;
  const p = document.createElement('p');
  p.textContent = text;
  div.appendChild(p);
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return div;
}

function showTyping() {
  const div = document.createElement('div');
  div.className = 'typing-indicator dchat-msg dchat-ai';
  div.innerHTML = '<span></span><span></span><span></span>';
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return div;
}

function sendMessage(text) {
  if (!text.trim()) return;

  // Hide quick replies after first message
  if (quickReplies) quickReplies.style.display = 'none';

  appendMessage(text, 'user');
  if (inputEl) inputEl.value = '';

  const typing = showTyping();
  setTimeout(() => {
    typing.remove();
    const response = getAIResponse(text);
    appendMessage(response, 'ai');
  }, 900 + Math.random() * 600);
}

sendBtn?.addEventListener('click', () => sendMessage(inputEl?.value || ''));
inputEl?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage(inputEl.value);
  }
});

// Quick reply buttons
document.querySelectorAll('.quick-reply').forEach(btn => {
  btn.addEventListener('click', () => {
    sendMessage(btn.dataset.reply);
  });
});

/* ── CTA Form ────────────────────────────────────────────────────────────── */
const ctaForm    = document.getElementById('cta-form');
const ctaSubmit  = document.getElementById('cta-submit');
const ctaBtnText = document.getElementById('cta-btn-text');
const ctaSpinner = document.getElementById('cta-spinner');
const ctaSuccess = document.getElementById('cta-success');

ctaForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name     = document.getElementById('field-name')?.value.trim();
  const email    = document.getElementById('field-email')?.value.trim();
  const business = document.getElementById('field-business')?.value.trim();

  if (!name || !email || !business) {
    // Simple validation highlight
    [['field-name', name], ['field-email', email], ['field-business', business]].forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (!val) el?.style.setProperty('border-color', '#ff6b6b');
      else el?.style.removeProperty('border-color');
    });
    return;
  }

  // Show loading state
  ctaSubmit.disabled = true;
  ctaBtnText.style.display = 'none';
  ctaSpinner.style.display = 'block';

  // Simulate form submission (in production, POST to your backend)
  await new Promise(resolve => setTimeout(resolve, 1500));

  ctaSubmit.style.display = 'none';
  ctaSuccess.style.display = 'block';
});

// Remove error highlight on input
document.querySelectorAll('.form-input').forEach(input => {
  input.addEventListener('input', () => input.style.removeProperty('border-color'));
});
