/* ============================================================
   CAUÃ FELIPE GOMES MEDEIROS | PORTFÓLIO
   script.js — Toda a lógica interativa
   ============================================================ */

/* ══════════════════════════════════════════════════════════
   ★ CONFIGURAÇÕES PESSOAIS — PREENCHA AQUI ★
   ══════════════════════════════════════════════════════════ */
const CONFIG = {
  // ── DADOS PESSOAIS ───────────────────────────────────────
  nome:           "Cauã Felipe Gomes Medeiros",
  nascimento:     "2000-01-01",      // Formato: AAAA-MM-DD (ex: "2003-07-15")
  localizacao:    "Fortaleza, CE",   // Ex: "São Paulo, SP"
  email:          "seu@email.com",   // Seu e-mail
  whatsapp:       "+55 (88) 9 9999-9999", // Seu WhatsApp
  cvUrl:          "#",               // Link para download do currículo (PDF)

  // ── REDES SOCIAIS ────────────────────────────────────────
  github:         "https://github.com/seu-usuario",
  linkedin:       "https://linkedin.com/in/seu-perfil",
  instagram:      "https://instagram.com/seu-perfil",

  // ── ESTATÍSTICAS (seção Sobre) ───────────────────────────
  anosExperiencia:  1,   // Anos de experiência
  projetos:         5,   // Projetos concluídos
  clientes:         3,   // Clientes satisfeitos
  tecnologias:     12,   // Tecnologias dominadas
};
/* ══════════════════════════════════════════════════════════
   FIM DAS CONFIGURAÇÕES
   ══════════════════════════════════════════════════════════ */


/* ─── PREENCHE DADOS DINÂMICOS ───────────────────────────── */
function preencheDados() {
  // Data de nascimento formatada (pt-BR)
  const nasc = new Date(CONFIG.nascimento + 'T00:00:00');
  const birthEl = document.getElementById('birthDateDisplay');
  if (birthEl && CONFIG.nascimento !== "2000-01-01") {
    birthEl.textContent = nasc.toLocaleDateString('pt-BR');
  }

  // Idade calculada automaticamente
  const hoje = new Date();
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
  const ageEl = document.getElementById('ageDisplay');
  if (ageEl && CONFIG.nascimento !== "2000-01-01") {
    ageEl.textContent = idade + ' anos';
  }

  // Localização
  const locEl = document.getElementById('locationDisplay');
  const contLocEl = document.getElementById('contactLocation');
  if (locEl) locEl.textContent = CONFIG.localizacao;
  if (contLocEl) contLocEl.textContent = CONFIG.localizacao;

  // Email
  const emailEl = document.getElementById('emailDisplay');
  const contEmailEl = document.getElementById('contactEmail');
  if (emailEl) emailEl.textContent = CONFIG.email;
  if (contEmailEl) {
    contEmailEl.textContent = CONFIG.email;
    contEmailEl.href = 'mailto:' + CONFIG.email;
  }

  // WhatsApp
  const waEl = document.getElementById('contactWhatsapp');
  if (waEl) {
    waEl.textContent = CONFIG.whatsapp;
    const numLimpo = CONFIG.whatsapp.replace(/\D/g, '');
    waEl.href = 'https://wa.me/' + numLimpo;
  }

  // CV
  const cvBtn = document.getElementById('downloadCvBtn');
  if (cvBtn) cvBtn.href = CONFIG.cvUrl;

  // Redes sociais
  const ghLinks = document.querySelectorAll('#githubLink, [title="GitHub"]');
  const liLinks = document.querySelectorAll('#linkedinLink, [title="LinkedIn"]');
  const igLinks = document.querySelectorAll('#instagramLink, [title="Instagram"]');
  ghLinks.forEach(el => el.href = CONFIG.github);
  liLinks.forEach(el => el.href = CONFIG.linkedin);
  igLinks.forEach(el => el.href = CONFIG.instagram);

  // Ano no footer
  const footerYear = document.getElementById('footerYear');
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  // Contadores de estatísticas
  const targets = document.querySelectorAll('.counter[data-target]');
  const stats = [
    CONFIG.anosExperiencia,
    CONFIG.projetos,
    CONFIG.clientes,
    CONFIG.tecnologias
  ];
  targets.forEach((el, i) => {
    el.dataset.target = stats[i] ?? 0;
  });
}


/* ─── CURSOR PERSONALIZADO ───────────────────────────────── */
function initCursor() {
  const cursor    = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  if (!cursor || !cursorDot) return;

  let mouseX = 0, mouseY = 0;
  let curX = 0, curY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });

  // Suave lag no cursor externo
  function animCursor() {
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;
    cursor.style.left = curX + 'px';
    cursor.style.top  = curY + 'px';
    requestAnimationFrame(animCursor);
  }
  animCursor();

  // Hover em elementos clicáveis
  document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}


/* ─── NAVBAR ─────────────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  // Scroll → estilo sticky
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    highlightNavLink();
  }, { passive: true });

  // Hamburger mobile
  hamburger?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
  });

  // Fecha menu ao clicar em link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks?.classList.remove('open'));
  });
}

function highlightNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.scrollY;
  sections.forEach(sec => {
    const top    = sec.offsetTop - 100;
    const bottom = top + sec.offsetHeight;
    const link   = document.querySelector(`.nav-link[href="#${sec.id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < bottom);
  });
}


/* ─── TEMA CLARO / ESCURO ────────────────────────────────── */
function initTheme() {
  const btn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if (saved === 'light') applyLight();

  btn?.addEventListener('click', () => {
    if (document.body.classList.contains('light')) {
      document.body.classList.remove('light');
      btn.textContent = '☀';
      localStorage.setItem('theme', 'dark');
    } else {
      applyLight();
    }
  });

  function applyLight() {
    document.body.classList.add('light');
    if (btn) btn.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
}


/* ─── REVEAL ON SCROLL ───────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => obs.observe(el));
}


/* ─── CONTADOR ANIMADO ───────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target) || 0;
      const dur    = 1500;
      const step   = target / (dur / 16);
      let current  = 0;
      const timer  = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current);
      }, 16);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => obs.observe(el));
}


/* ─── TABS DE HABILIDADES ────────────────────────────────── */
function initSkillsTabs() {
  const tabBtns   = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const panel = document.getElementById('tab-' + target);
      if (panel) {
        panel.classList.add('active');
        // Anima barras de habilidade ao trocar aba
        panel.querySelectorAll('.skill-fill').forEach(fill => {
          fill.style.width = '0';
          setTimeout(() => {
            fill.style.width = fill.dataset.width + '%';
          }, 100);
        });
      }
    });
  });
}


/* ─── BARRAS DE HABILIDADE ───────────────────────────────── */
function initSkillBars() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.skill-fill').forEach(fill => {
        fill.style.width = fill.dataset.width + '%';
      });
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skills-grid').forEach(grid => obs.observe(grid));
}


/* ─── FORMULÁRIO DE CONTATO ──────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  form?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    // Simulação de envio (substitua por sua lógica real, ex: EmailJS ou backend)
    setTimeout(() => {
      feedback.textContent = '✅ Mensagem enviada com sucesso! Responderei em breve.';
      feedback.style.color = '#4ade80';
      btn.textContent = original;
      btn.disabled = false;
      form.reset();
      setTimeout(() => feedback.textContent = '', 5000);
    }, 1200);
  });
}


/* ─── SMOOTH SCROLL ──────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (id === '#') return;
      e.preventDefault();
      const target = document.querySelector(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}


/* ─── EFEITO TYPING NA HERO ──────────────────────────────── */
function initTyping() {
  const el = document.querySelector('.hero-role');
  if (!el) return;
  const textos = ['Desenvolvedor Full Stack', 'Criador de Experiências', 'Apaixonado por Código'];
  let atual = 0, pos = 0, apagando = false;
  const accent = document.createElement('span');
  accent.className = 'accent';
  el.innerHTML = '';
  el.appendChild(accent);

  function type() {
    const txt = textos[atual];
    if (!apagando) {
      accent.textContent = txt.substring(0, pos + 1);
      pos++;
      if (pos === txt.length) { apagando = true; setTimeout(type, 1800); return; }
    } else {
      accent.textContent = txt.substring(0, pos - 1);
      pos--;
      if (pos === 0) {
        apagando = false;
        atual = (atual + 1) % textos.length;
        setTimeout(type, 400);
        return;
      }
    }
    setTimeout(type, apagando ? 50 : 90);
  }
  setTimeout(type, 1200);
}


/* ─── INICIALIZAÇÃO ──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  preencheDados();
  initCursor();
  initNavbar();
  initTheme();
  initReveal();
  initCounters();
  initSkillsTabs();
  initSkillBars();
  initContactForm();
  initSmoothScroll();
  initTyping();

  console.log('%c Portfólio de Cauã Felipe 🚀', 'color:#64ffda;font-size:16px;font-weight:bold;');
  console.log('%c Para personalizar, edite o objeto CONFIG no topo do script.js', 'color:#8892b0;font-size:13px;');
});