/**
 * ==========================================================================
 * PORTFÓLIO PEDRO HENRIQUE CORREA ROVERE
 * Módulo de Projetos & Modal Interativo
 * ==========================================================================
 * 
 * GUIA DE EDIÇÃO:
 * Para adicionar ou alterar seus projetos reais, basta editar o array 'PROJECTS_DATA'
 * abaixo. Não invente links: você pode colocar o link do seu repositório no GitHub
 * ou o link da hospedagem (ex: Vercel, Netlify).
 */

const PROJECTS_DATA = [
  {
    id: "veridian",
    category: "web",
    categoryLabel: "Web App / Fintech",
    index: "01",
    title: "Veridian Capital Insights",
    shortDesc: "Dashboard analítico de performance e alocação de ativos com visualização de dados em tempo real e interface escura de alta fidelidade.",
    fullDesc: "O Veridian Capital foi desenvolvido para solucionar a necessidade de visualização clara e em tempo real de métricas financeiras complexas. O projeto foca em alta performance de renderização de gráficos, design modular responsivo e um modo escuro sob medida que minimiza a fadiga visual durante longas sessões de análise.",
    image: "assets/images/project-1.jpg",
    tags: ["JavaScript ES6+", "CSS Grid/Flexbox", "Data Visualization", "Modular Architecture"],
    features: [
      "Visualização dinâmica de alocação de ativos com gráficos SVG interativos",
      "Monitoramento de P&L diário e retornos mensais comparativos",
      "Arquitetura modular de componentes desacoplados em Vanilla JS",
      "Layout totalmente adaptativo para mobile, tablet e desktop"
    ],
    role: "Front-end & Arquitetura de Interface",
    status: "Concluído / Em evolução",
    liveDemoUrl: "#", // Substitua pelo link de demonstração real quando disponível
    githubUrl: "https://github.com/pedro-rovere/veridian-capital" // Substitua pelo seu repo real
  },
  {
    id: "aura",
    category: "ui",
    categoryLabel: "Design System / UI",
    index: "02",
    title: "Aura Modern Editorial UI",
    shortDesc: "Design system experimental e biblioteca de componentes baseada no estilo editorial suíço, glassmorphism e tipografia expressiva.",
    fullDesc: "Inspirado pela vanguarda do web design e publicação editorial moderna, o Aura explora a fronteira entre tipografia de alto impacto e microinterações táteis. Cada componente foi desenhado a partir de uma escala tipográfica rigorosa com tokens CSS sem dependência de bibliotecas externas.",
    image: "assets/images/project-2.jpg",
    tags: ["Vanilla CSS", "Design Tokens", "Glassmorphism", "Microinterações", "Acessibilidade"],
    features: [
      "Sistema de design tokens com variáveis nativas CSS para temas claro/escuro",
      "Componentes de cartões translúcidos com camadas de desfoque óptico",
      "Rigorosa hierarquia tipográfica com fontes suíças e geométricas",
      "Interações táteis calibradas a 60 frames por segundo"
    ],
    role: "Design System & Engenharia de CSS",
    status: "Concluído",
    liveDemoUrl: "#",
    githubUrl: "https://github.com/pedro-rovere/aura-ui"
  },
  {
    id: "hyperdrive",
    category: "tools",
    categoryLabel: "DevTools / Sistemas",
    index: "03",
    title: "Hyperdrive Dev Platform",
    shortDesc: "Painel de orquestração para desenvolvedores com monitor de latência de endpoints, terminal integrado e métricas de servidores.",
    fullDesc: "Ferramenta desenvolvida para centralizar a observabilidade de microsserviços e consumo de APIs. O painel inclui monitoramento em tempo real de taxa de requisições por segundo, gráficos de latência com picos e logs de erros, permitindo rápida identificação de gargalos.",
    image: "assets/images/project-3.jpg",
    tags: ["DevTools", "REST APIs", "Terminal UI", "Performance", "Clean Code"],
    features: [
      "Monitor de taxa de transferência e latência média em tempo real",
      "Emulador de terminal integrado para inspeção de saídas de log",
      "Filtros de status HTTP dinâmicos com codificação por cores",
      "Estrutura orientada a eventos para rápida atualização de estado"
    ],
    role: "Lógica de Aplicação & Interface",
    status: "Em desenvolvimento ativo",
    liveDemoUrl: "#",
    githubUrl: "https://github.com/pedro-rovere/hyperdrive-core"
  },
  {
    id: "audiophiliac",
    category: "web",
    categoryLabel: "E-Commerce / Concept",
    index: "04",
    title: "Audiophiliac Audio Experience",
    shortDesc: "Experiência de e-commerce conceitual para equipamentos de áudio de alta precisão, inspirada na estética minimalista e cinética.",
    fullDesc: "Um estudo detalhado de jornada do usuário e apresentação de produto que combina a energia do visual esportivo/noturno com a clareza da tipografia minimalista. Conta com transições fluidas, visualização técnica de especificações de hardware e navegação intuitiva.",
    image: "assets/images/project-4.jpg",
    tags: ["E-Commerce UX", "CSS Animations", "Responsive Design", "Motion Web"],
    features: [
      "Apresentação cinematográfica de produtos com iluminação e contraste dinâmico",
      "Filtro técnico de especificações por categoria (fones, amplificadores, caixas)",
      "Carrinho interativo com persistência em armazenamento local (LocalStorage)",
      "Transições refinadas de abertura de detalhes sem recarregar a página"
    ],
    role: "Front-end & UX Engineering",
    status: "Concluído",
    liveDemoUrl: "#",
    githubUrl: "https://github.com/pedro-rovere/audiophiliac-store"
  }
];

// Inicialização das funcionalidades de projetos
function initProjectsModule() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const modalBackdrop = document.getElementById("project-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");

  // Filtro por categorias
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Atualiza classe ativa
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const category = button.getAttribute("data-filter");

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        if (category === "all" || cardCategory === category) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // Abertura do Modal de Detalhes
  const detailButtons = document.querySelectorAll(".btn-open-modal");
  detailButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute("data-project-id");
      openProjectModal(projectId);
    });
  });

  // Fechamento do Modal
  if (modalCloseBtn && modalBackdrop) {
    modalCloseBtn.addEventListener("click", closeProjectModal);
    
    // Fechar ao clicar no backdrop (fora do card)
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) {
        closeProjectModal();
      }
    });

    // Fechar com a tecla ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalBackdrop.classList.contains("active")) {
        closeProjectModal();
      }
    });
  }
}

// Abrir e preencher o modal com os dados do projeto
function openProjectModal(projectId) {
  const project = PROJECTS_DATA.find(p => p.id === projectId);
  if (!project) return;

  const modalBackdrop = document.getElementById("project-modal");
  const modalMedia = document.getElementById("modal-image");
  const modalCategory = document.getElementById("modal-category");
  const modalIndex = document.getElementById("modal-index");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const modalRole = document.getElementById("modal-role");
  const modalStatus = document.getElementById("modal-status");
  const modalTags = document.getElementById("modal-tags");
  const modalFeatures = document.getElementById("modal-features");
  const modalLiveBtn = document.getElementById("modal-live-btn");
  const modalGithubBtn = document.getElementById("modal-github-btn");

  if (modalMedia) modalMedia.src = project.image;
  if (modalCategory) modalCategory.textContent = project.categoryLabel;
  if (modalIndex) modalIndex.textContent = `[ ${project.index} ]`;
  if (modalTitle) modalTitle.textContent = project.title;
  if (modalDesc) modalDesc.textContent = project.fullDesc;
  if (modalRole) modalRole.textContent = project.role;
  if (modalStatus) modalStatus.textContent = project.status;

  // Preenche tags
  if (modalTags) {
    modalTags.innerHTML = project.tags.map(t => `<span class="project-stack-item">${t}</span>`).join("");
  }

  // Preenche destaques/features
  if (modalFeatures) {
    modalFeatures.innerHTML = project.features.map(f => `<li>${f}</li>`).join("");
  }

  // Preenche links
  if (modalLiveBtn) {
    modalLiveBtn.href = project.liveDemoUrl;
  }
  if (modalGithubBtn) {
    modalGithubBtn.href = project.githubUrl;
  }

  // Abre visualmente
  modalBackdrop.classList.add("active");
  document.body.style.overflow = "hidden"; // Trava scroll da página
}

// Fechar modal
function closeProjectModal() {
  const modalBackdrop = document.getElementById("project-modal");
  if (modalBackdrop) {
    modalBackdrop.classList.remove("active");
    document.body.style.overflow = ""; // Restaura scroll
  }
}

// Expõe globalmente caso necessário
window.initProjectsModule = initProjectsModule;
window.openProjectModal = openProjectModal;
