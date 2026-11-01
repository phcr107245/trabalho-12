# Portfólio Pessoal — Pedro Henrique Correa Rovere

Bem-vindo ao seu site de portfólio pessoal moderno, responsivo e de alto padrão visual, desenvolvido com foco em apresentar suas habilidades, projetos e identidade na área de tecnologia e desenvolvimento de software.

O projeto foi construído combinando os pontos fortes de três grandes referências visuais de renome internacional:
1. **PEAR** ([https://pear.no/](https://pear.no/)): Tipografia de grande porte, proporções monumentais, estética editorial suíça e respiro visual.
2. **NIKE AFTER DARK TOUR** ([https://www.afterdarktour.nike.com/en/la](https://www.afterdarktour.nike.com/en/la)): Experiência noturna imersiva, dinamismo cinético (marquee ticker), acentos vibrantes em *Volt* (`#d4ff00`) e iluminação ambiente interativa.
3. **RETINAA** ([https://retinaa.ch/](https://retinaa.ch/)): Galeria de projetos em destaque, cartões visuais amplos, modal interativo de detalhes e composição minimalista com personalidade.

---

## 📁 Estrutura de Arquivos

```text
├── index.html                  # Página principal do portfólio
├── referencias-visuais.html    # Documento de referências visuais (pronto para PDF/Impressão)
├── REFERENCIAS_VISUAIS.md      # Versão em Markdown das referências visuais
├── css/
│   ├── style.css               # Design System, variáveis CSS, temas claro/escuro, responsividade
│   └── animations.css          # Animações fluidas, ticker contínuo, scroll reveal, microinterações
├── js/
│   ├── main.js                 # Gerenciamento de temas, navegação ativa, relógio em tempo real
│   ├── projects.js             # Dados dos projetos, filtros por categoria e modal interativo
│   └── contact.js              # Validação de formulário em tempo real, cópia de e-mail e envio
└── assets/
    └── images/                 # Imagens em alta resolução dos projetos (16:9)
        ├── project-1.jpg       # Veridian Capital Insights
        ├── project-2.jpg       # Aura Modern Editorial UI
        ├── project-3.jpg       # Hyperdrive Dev Platform
        └── project-4.jpg       # Audiophiliac Audio Experience
```

---

## ⚡ Como Visualizar o Site

1. Dê dois cliques no arquivo `index.html` para abri-lo diretamente em qualquer navegador moderno (Chrome, Edge, Firefox, Safari).
2. Para navegar pelo documento de entrega acadêmica, abra `referencias-visuais.html` e clique no botão **"Exportar para PDF / Imprimir"**.

---

## ✏️ Guia de Personalização Rápida

### 1. Seus Projetos Reais
Abra o arquivo `js/projects.js`. Cada projeto está mapeado no array `PROJECTS_DATA`:
- Altere o `title`, `shortDesc`, `fullDesc` e `tags`.
- Insira o link do seu repositório no campo `githubUrl`.
- Para trocar a imagem, coloque seu arquivo em `assets/images/` e atualize a propriedade `image`.

### 2. Seus Links Sociais e E-mail
No arquivo `index.html`:
- **E-mail:** Localize o elemento `<span id="email-address-text">` e substitua por seu endereço real.
- **GitHub:** Atualize o link `https://github.com/pedro-rovere`.
- **LinkedIn:** Atualize o link `https://linkedin.com/in/pedro-rovere`.

### 3. Ativação do Formulário de Contato
O formulário já possui validação em tempo real e abre o seu cliente de e-mail automaticamente (`mailto:`).
Se quiser receber os e-mails diretamente na sua caixa de entrada de forma 100% gratuita:
1. Acesse [Formspree.io](https://formspree.io) e crie uma conta grátis.
2. Crie um formulário e copie sua chave de endpoint (ex: `https://formspree.io/f/xyzabw`).
3. No arquivo `index.html`, na tag `<form id="contact-form">`, cole no atributo `action="https://formspree.io/f/SEU_CODIGO_AQUI"`.

---

## 🛠 Tecnologias Utilizadas

- **HTML5 Semântico:** Estrutura acessível, metadados para SEO e Open Graph.
- **CSS3 Moderno:** Variáveis nativas (Design Tokens), temas claro/escuro, CSS Grid, Flexbox e `@media print`.
- **JavaScript Puro (ES6+):** Zero dependências externas pesadas, carregamento instantâneo e performance a 60 FPS.
