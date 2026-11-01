/**
 * ==========================================================================
 * PORTFÓLIO PEDRO HENRIQUE CORREA ROVERE
 * Script Principal: Navegação, Temas, Animações e Microinterações
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initHeaderScroll();
  initScrollProgress();
  initActiveNavSpy();
  initMobileMenu();
  initBackToTop();
  initLiveClock();
  initScrollAnimations();
  initAmbientSpotlight();

  // Inicializa módulos adicionais
  if (typeof initProjectsModule === "function") {
    initProjectsModule();
  }
  if (typeof initContactModule === "function") {
    initContactModule();
  }
});

/* --- 1. GERENCIAMENTO DE TEMA (CLARO / ESCURO) --- */
function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const htmlElement = document.documentElement;

  // Carrega tema salvo ou define 'dark' como padrão
  const savedTheme = localStorage.getItem("pedro_portfolio_theme") || "dark";
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme") || "dark";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(newTheme);
      localStorage.setItem("pedro_portfolio_theme", newTheme);
    });
  }

  function setTheme(theme) {
    htmlElement.setAttribute("data-theme", theme);
    updateThemeIcon(theme);
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    if (theme === "dark") {
      // Ícone de Sol para alternar para o modo claro
      themeToggleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
      themeToggleBtn.setAttribute("title", "Alternar para Modo Claro");
      themeToggleBtn.setAttribute("aria-label", "Alternar para Modo Claro");
    } else {
      // Ícone de Lua para alternar para o modo escuro
      themeToggleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
      themeToggleBtn.setAttribute("title", "Alternar para Modo Escuro");
      themeToggleBtn.setAttribute("aria-label", "Alternar para Modo Escuro");
    }
  }
}

/* --- 2. HEADER DINÂMICO AO ROLAR --- */
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

/* --- 3. BARRA DE PROGRESSO DE ROLAGEM --- */
function initScrollProgress() {
  const progressBar = document.querySelector(".scroll-progress-bar");
  if (!progressBar) return;

  window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  }, { passive: true });
}

/* --- 4. ACTIVE LINK SPY (DESTAQUE DO MENU ATUAL) --- */
function initActiveNavSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (sections.length === 0 || navLinks.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, {
    rootMargin: "-25% 0px -65% 0px"
  });

  sections.forEach(sec => observer.observe(sec));
}

/* --- 5. MENU MOBILE RESPONSIVO --- */
function initMobileMenu() {
  const toggleBtn = document.querySelector(".mobile-nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu .nav-link, .nav-menu .btn");

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener("click", () => {
    toggleBtn.classList.toggle("active");
    navMenu.classList.toggle("open");
    document.body.style.overflow = navMenu.classList.contains("open") ? "hidden" : "";
  });

  // Fecha o menu ao clicar em qualquer link
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      toggleBtn.classList.remove("active");
      navMenu.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
}

/* --- 6. BOTÃO VOLTAR AO TOPO --- */
function initBackToTop() {
  const backBtn = document.getElementById("back-to-top-btn");
  if (!backBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backBtn.classList.add("visible");
    } else {
      backBtn.classList.remove("visible");
    }
  }, { passive: true });

  backBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* --- 7. RELÓGIO AO VIVO (SÃO PAULO / BRASIL) --- */
function initLiveClock() {
  const clockElement = document.getElementById("live-time-display");
  if (!clockElement) return;

  function updateClock() {
    const now = new Date();
    // Horário de Brasília / São Paulo (UTC-3)
    const options = {
      timeZone: "America/Sao_Paulo",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    };
    const timeString = new Intl.DateTimeFormat("pt-BR", options).format(now);
    clockElement.textContent = `SÃO PAULO, BR · ${timeString} (GMT-3)`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* --- 8. ANIMAÇÕES DE ENTRADA AO ROLAR (INTERSECTION OBSERVER) --- */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll(".reveal-element, .reveal-scale");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback para navegadores legados
    revealElements.forEach(el => el.classList.add("is-revealed"));
  }
}

/* --- 9. AMBIENT SPOTLIGHT (SEGUIDOR DE CURSOR SUAVE) --- */
function initAmbientSpotlight() {
  const spotlight = document.querySelector(".ambient-spotlight");
  if (!spotlight || window.innerWidth < 1024) return;

  // Verifica preferências de acessibilidade
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let spotX = mouseX;
  let spotY = mouseY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function animate() {
    // Interpolação suave (Lerp) para fluidez de movimento
    spotX += (mouseX - spotX) * 0.08;
    spotY += (mouseY - spotY) * 0.08;

    spotlight.style.left = `${spotX}px`;
    spotlight.style.top = `${spotY}px`;

    requestAnimationFrame(animate);
  }

  animate();
}
