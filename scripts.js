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

// Demo AI responses — showcases Hello Desk Leads features
const DEMO_RESPONSES = [
  {
    triggers: ['what can you do', 'what do you do', 'capabilities', 'features', 'tell me about yourself', 'how do you work', 'what are you'],
    response: "Great question! Here's what I can do for your business:\n\n📋 Capture leads — I collect name, email, and phone through natural conversation, 24/7.\n\n📅 Book appointments — I show real calendar availability and confirm bookings right here in the chat — no back and forth.\n\n💬 Answer questions — I'm trained on your business info, services, FAQs, and pricing, so I give accurate answers instantly.\n\n💰 Qualify leads — I ask the right questions to understand what someone needs before your team follows up.\n\n🔔 Alert your team — The moment I capture a lead, your team gets an instant email or SMS alert.\n\nWant to see any of these in action?"
  },
  {
    triggers: ['book', 'appointment', 'schedule', 'call', 'meeting', 'consult', 'calendar'],
    response: "I can book appointments directly in this chat — no links, no back and forth. Here's how it works:\n\n1️⃣ I ask for your preferred date and time\n2️⃣ I check real availability from your calendar (Cal.com, Google Calendar, or Calendly)\n3️⃣ I confirm the booking and send a reminder email automatically\n\nWant to try it? What's your name and I'll walk you through it!"
  },
  {
    triggers: ['lead', 'leads', 'capture', 'collect', 'contact info', 'how does the lead'],
    response: "Every conversation I have is a lead opportunity. Here's what happens:\n\n✅ I naturally collect name, email, and phone during the conversation\n✅ The lead is instantly saved to your CRM dashboard\n✅ Your team gets an email or SMS alert within seconds\n✅ An automated follow-up email goes out on a schedule you set\n✅ If a lead goes cold, I can automatically re-engage them after X days\n\nAll leads are scored Hot / Warm / Cold by AI so your team knows who to call first. Pretty powerful, right?"
  },
  {
    triggers: ['quote', 'price', 'cost', 'how much', 'pricing'],
    response: "I can collect all the details needed for a quote and pass them directly to your team — no form needed.\n\nFor example, I'd ask:\n• What service are you looking for?\n• What's your timeline?\n• Any specific requirements?\n\nThen I save everything in your CRM with the lead's contact info so your team can follow up with a tailored quote. Want to try it? What are you looking to get quoted on?"
  },
  {
    triggers: ['email', 'follow up', 'follow-up', 'automatic', 'automation'],
    response: "Automated follow-ups are built right in. Here's what happens after I capture a lead:\n\n📧 Follow-up email sent automatically on your schedule (e.g. 1 hour, 1 day, 3 days later)\n📖 Read receipts — you see when the lead opens the email\n🔄 Re-engagement — if they don't respond after X days, I send a gentle nudge\n📊 All email activity is logged in the lead's profile\n\nYou can also send one-off emails or bulk emails to multiple leads straight from the dashboard."
  },
  {
    triggers: ['crm', 'dashboard', 'pipeline', 'manage', 'leads page'],
    response: "Hello Desk Leads includes a full built-in CRM — no HubSpot or Salesforce needed. Your dashboard gives you:\n\n🗂 Lead inbox — every captured lead in one place\n📊 Pipeline view — drag leads through stages (New → Contacted → Qualified → Closed)\n⭐ AI lead scoring — Hot, Warm, or Cold based on the conversation\n📝 Notes and full conversation transcript per lead\n📤 Bulk actions — email, export, or move multiple leads at once\n\nYour clients get their own login to see all of this for their business."
  },
  {
    triggers: ['facebook', 'messenger', 'instagram', 'social', 'meta'],
    response: "Great question! Hello Desk Leads connects with Facebook too:\n\n💬 Messenger Bot — when someone messages your Facebook Page, I respond automatically, collect their info, and it goes straight into your CRM\n\n📣 Facebook Lead Ads — leads from your Facebook ad campaigns auto-import as soon as they submit\n\n📊 Meta Pixel — I fire a Lead event to your Pixel every time a lead is captured, so your ad targeting stays sharp\n\nAll of this works alongside your website chat widget — every lead in one place regardless of where they came from."
  },
  {
    triggers: ['google', 'review', 'reviews', 'reputation'],
    response: "Reputation management is built in too! Here's what's available:\n\n⭐ Google Reviews Dashboard — view and reply to your Google reviews from inside the app\n🔗 Review prompts — after I capture a lead, I automatically ask them to leave a Google or Facebook review if you have those set up\n📧 Review links in follow-up emails — every automated follow-up can include a 'Leave us a review' button\n\nIt's a simple way to grow your reviews without asking manually every time."
  },
  {
    triggers: ['voice', 'speak', 'talk', 'microphone', 'audio', 'listen'],
    response: "Yep — I can speak! 🎤\n\nIf voice is enabled for your account:\n\n🔊 I read my replies aloud using a natural-sounding AI voice\n🎙️ Visitors can click the mic button and speak their message — I transcribe it instantly using OpenAI Whisper\n🔇 Visitors can mute me at any time with the speaker button in the chat header\n\nIt makes the experience feel like a real receptionist rather than a chatbot. You can turn voice on or off per client in the Setup page."
  },
  {
    triggers: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'howdy'],
    response: "Hey there! 👋 I'm a demo of Hello Desk Leads — an AI receptionist system for businesses.\n\nI can show you how I:\n📅 Book appointments in real time\n📋 Capture and qualify leads\n💬 Answer questions about your business\n🔔 Alert your team the moment someone's ready to connect\n\nWhat would you like to explore first?"
  },
  {
    triggers: ['hours', 'open', 'available', '24/7', 'always on'],
    response: "I'm available 24 hours a day, 7 days a week — that's the whole point. 😄\n\nWhile your team is sleeping, I'm still:\n• Answering questions from website visitors\n• Booking appointments on your calendar\n• Capturing lead info and saving it to your CRM\n• Sending your team an alert so they can follow up first thing\n\nNo lead slips through the cracks, even at 2am."
  },
  {
    triggers: ['setup', 'get started', 'sign up', 'onboard', 'how do i', 'how long'],
    response: "Getting set up is fast — most clients are live within 1–2 business days. Here's the process:\n\n1️⃣ You fill out a simple onboarding form (business info, AI name, knowledge base, email setup)\n2️⃣ We configure your AI receptionist and brand the widget to match your site\n3️⃣ We install the chat widget on your website (or give you the one-line code to paste)\n4️⃣ You're live — leads start flowing into your dashboard\n\nWant to get started? Click 'Get Started' above or type your name and we'll reach out!"
  },
  {
    triggers: ['name', 'my name is', 'i am', "i'm called"],
    response: "Great to meet you! 👋 If you're interested in Hello Desk Leads for your business, drop your email or phone number and someone from our team will reach out to walk you through a personalized demo."
  },
  {
    triggers: ['phone', 'number', 'contact', 'reach me'],
    response: "Perfect — I've got that noted! A team member will be in touch shortly. In the meantime, feel free to keep exploring — ask me anything about how Hello Desk Leads works."
  },
  {
    triggers: ['multiple', 'clients', 'agency', 'white label', 'resell', 'businesses'],
    response: "Hello Desk Leads is built for agencies and service providers who set it up for their clients. Here's how it works:\n\n🏢 Each client gets their own branded AI receptionist, their own CRM dashboard, and their own login\n⚙️ You configure everything for them — knowledge base, branding, email, calendar\n👤 They log in to see their leads, pipeline, and emails — but can't see other clients\n💳 Stripe billing is built in so you can charge clients directly through the platform\n\nIt's a done-for-you service model — you set it up, they get the results."
  }
];

const FALLBACK_RESPONSES = [
  "That's a great topic! Hello Desk Leads is built to handle exactly these kinds of conversations for real businesses. Want me to tell you more about how the lead capture works, how appointments get booked, or what the CRM dashboard looks like?",
  "Interesting! I'm a demo version, so I'm showing off what's possible. In a real deployment I'd be trained on your specific business and could answer that precisely. Want to see how the appointment booking or lead capture works?",
  "Good question! The real version of me would be trained on your business's specific info — services, pricing, FAQs — so I'd give a precise answer. Want to explore what else I can do, like booking appointments or capturing leads?"
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
  // Convert newlines to <br> tags so multi-line responses render correctly
  p.innerHTML = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');
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
