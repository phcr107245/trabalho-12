/**
 * ==========================================================================
 * PORTFÓLIO PEDRO HENRIQUE CORREA ROVERE
 * Módulo de Contato: Validação, Envio e Interação
 * ==========================================================================
 * 
 * COMO ATIVAR O RECEBIMENTO DIRETO NO SEU E-MAIL (100% GRATUITO):
 * 1. Acesse https://formspree.io e crie uma conta gratuita.
 * 2. Crie um "New Form" e copie a URL gerada (ex: https://formspree.io/f/xyzabw).
 * 3. No arquivo index.html, no elemento <form id="contact-form">, cole a URL no atributo action:
 *    action="https://formspree.io/f/SEU_CODIGO_AQUI"
 * 4. Pronto! Cada mensagem enviada cairá direto na sua caixa de entrada real.
 * 
 * Se você não configurar o Formspree, o formulário abrirá automaticamente
 * seu cliente de e-mail (Outlook, Gmail, etc.) com a mensagem preenchida
 * via mailto, garantindo que nenhuma mensagem seja perdida!
 */

function initContactModule() {
  const form = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");
  const charCounter = document.getElementById("char-counter");
  const copyEmailBtn = document.getElementById("copy-email-btn");
  const emailToCopy = document.getElementById("email-address-text");

  // Contador de caracteres para a mensagem
  if (messageInput && charCounter) {
    messageInput.addEventListener("input", () => {
      const currentLength = messageInput.value.length;
      charCounter.textContent = `${currentLength} / 500`;
      if (currentLength > 500) {
        charCounter.style.color = "#ef4444";
      } else {
        charCounter.style.color = "";
      }
    });
  }

  // Validação em tempo real ao digitar ou sair do campo (blur)
  if (nameInput) {
    nameInput.addEventListener("input", () => validateField(nameInput, validateName));
    nameInput.addEventListener("blur", () => validateField(nameInput, validateName));
  }

  if (emailInput) {
    emailInput.addEventListener("input", () => validateField(emailInput, validateEmail));
    emailInput.addEventListener("blur", () => validateField(emailInput, validateEmail));
  }

  if (subjectInput) {
    subjectInput.addEventListener("input", () => validateField(subjectInput, validateSubject));
    subjectInput.addEventListener("blur", () => validateField(subjectInput, validateSubject));
  }

  if (messageInput) {
    messageInput.addEventListener("input", () => validateField(messageInput, validateMessage));
    messageInput.addEventListener("blur", () => validateField(messageInput, validateMessage));
  }

  // Copiar E-mail para a Área de Transferência
  if (copyEmailBtn && emailToCopy) {
    copyEmailBtn.addEventListener("click", () => {
      const email = emailToCopy.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        copyEmailBtn.classList.add("copied");
        const originalContent = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          Copiado!
        `;
        showToast("E-mail copiado para a área de transferência!");
        setTimeout(() => {
          copyEmailBtn.classList.remove("copied");
          copyEmailBtn.innerHTML = originalContent;
        }, 2500);
      }).catch(err => {
        console.error("Erro ao copiar e-mail: ", err);
      });
    });
  }

  // Envio do formulário
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }
}

// Funções de Validação Específicas
function validateName(value) {
  if (!value || value.trim().length < 3) {
    return "Por favor, informe seu nome completo (mínimo 3 caracteres).";
  }
  return "";
}

function validateEmail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value || !emailRegex.test(value.trim())) {
    return "Por favor, informe um endereço de e-mail válido.";
  }
  return "";
}

function validateSubject(value) {
  if (!value || value.trim().length < 3) {
    return "Por favor, especifique o assunto do contato.";
  }
  return "";
}

function validateMessage(value) {
  if (!value || value.trim().length < 10) {
    return "Por favor, digite uma mensagem mais detalhada (mínimo 10 caracteres).";
  }
  if (value.length > 500) {
    return "A mensagem excede o limite máximo de 500 caracteres.";
  }
  return "";
}

// Utilitário de validação visual por campo
function validateField(inputElement, validatorFn) {
  const errorElement = document.getElementById(`${inputElement.id}-error`);
  const errorMessage = validatorFn(inputElement.value);

  if (errorMessage) {
    inputElement.classList.add("invalid");
    inputElement.classList.remove("valid");
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.classList.add("visible");
    }
    return false;
  } else {
    inputElement.classList.remove("invalid");
    inputElement.classList.add("valid");
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove("visible");
    }
    return true;
  }
}

// Manipulador de Submissão
async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");
  const submitBtn = document.getElementById("contact-submit-btn");

  // Validação de todos os campos antes de prosseguir
  const isNameValid = validateField(nameInput, validateName);
  const isEmailValid = validateField(emailInput, validateEmail);
  const isSubjectValid = validateField(subjectInput, validateSubject);
  const isMessageValid = validateField(messageInput, validateMessage);

  if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
    showToast("Por favor, corrija os campos destacados antes de enviar.");
    return;
  }

  const actionUrl = form.getAttribute("action");
  const isFormspreeConfigured = actionUrl && actionUrl.includes("formspree.io") && !actionUrl.includes("SEU_CODIGO_AQUI");

  // Estado de carregamento no botão
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <svg class="btn-spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 1s linear infinite;">
      <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
      <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
    </svg>
    Enviando...
  `;

  if (isFormspreeConfigured) {
    // Envio real via API do Formspree (fetch JSON)
    try {
      const formData = new FormData(form);
      const response = await fetch(actionUrl, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        showToast("Mensagem enviada com sucesso! Obrigado pelo contato.");
        form.reset();
        clearValidationState([nameInput, emailInput, subjectInput, messageInput]);
      } else {
        throw new Error("Erro no envio");
      }
    } catch (error) {
      showToast("Não foi possível enviar via Formspree. Abrindo cliente de e-mail...");
      openMailtoFallback(nameInput.value, emailInput.value, subjectInput.value, messageInput.value);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  } else {
    // Solução funcional direta via mailto estruturado
    setTimeout(() => {
      openMailtoFallback(nameInput.value, emailInput.value, subjectInput.value, messageInput.value);
      showToast("Abrindo seu cliente de e-mail para confirmar o envio!");
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }, 600);
  }
}

// Fallback funcional via mailto
function openMailtoFallback(name, email, subject, message) {
  const targetEmail = "pedro.rovere@email.com"; // Endereço de Pedro
  const encodedSubject = encodeURIComponent(`[Contato Portfólio] ${subject}`);
  const encodedBody = encodeURIComponent(
    `Olá Pedro,\n\nMeu nome: ${name}\nMeu e-mail: ${email}\n\nMensagem:\n${message}\n\n---\nEnviado através do seu portfólio pessoal.`
  );
  window.location.href = `mailto:${targetEmail}?subject=${encodedSubject}&body=${encodedBody}`;
}

// Limpar estados visuais de validação após envio
function clearValidationState(inputs) {
  inputs.forEach(input => {
    input.classList.remove("valid", "invalid");
  });
  const counter = document.getElementById("char-counter");
  if (counter) counter.textContent = "0 / 500";
}

// Sistema de Notificações Toast
function showToast(message) {
  let toastContainer = document.querySelector(".toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = "toast success";
  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);
  
  // Animação de entrada
  setTimeout(() => toast.classList.add("visible"), 50);

  // Remoção após 4 segundos
  setTimeout(() => {
    toast.classList.remove("visible");
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// Exportação global
window.initContactModule = initContactModule;
window.showToast = showToast;
