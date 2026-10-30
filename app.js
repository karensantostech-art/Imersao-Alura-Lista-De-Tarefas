// =============================================================================
// APLICAÇÃO: TAREFAS DO DIA (TO-DO LIST)
// =============================================================================

// 1. SELEÇÃO DOS ELEMENTOS DO HTML (DOM)
const todoForm = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const clearAllBtn = document.getElementById("clear-all-btn");

// Novos elementos adicionados:
const progressPercentage = document.getElementById("progress-percentage");
const progressBarFill = document.getElementById("progress-bar-fill");
const congratsMessage = document.getElementById("congrats-message");
const themeButtons = document.querySelectorAll(".theme-btn");

// 2. ESTADO DA APLICAÇÃO (DADOS)
let tasks = [];

// =============================================================================
// GERENCIAMENTO DE TEMAS DE CORES
// =============================================================================

/**
 * Aplica o tema escolhido na tag <html> e atualiza os botões visuais
 * @param {string} themeName - Nome do tema ('purple', 'blue', 'green', 'orange', 'pink')
 */
function setTheme(themeName) {
  // 1. Altera o atributo 'data-theme' no HTML para mudar as cores via CSS
  document.documentElement.setAttribute("data-theme", themeName);

  // 2. Salva a escolha do usuário no navegador
  localStorage.setItem("tema_preferido", themeName);

  // 3. Atualiza qual botão de cor está com a borda de ativo
  themeButtons.forEach(btn => {
    if (btn.dataset.color === themeName) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

/**
 * Carrega o tema salvo anteriormente (ou usa o roxo como padrão)
 */
function loadTheme() {
  const savedTheme = localStorage.getItem("tema_preferido") || "purple";
  setTheme(savedTheme);
}

// Evento de clique para cada botão seletor de cor
themeButtons.forEach(button => {
  button.addEventListener("click", () => {
    const selectedColor = button.dataset.color;
    setTheme(selectedColor);
  });
});

// =============================================================================
// FUNÇÕES DE PERSISTÊNCIA (LocalStorage)
// =============================================================================

function saveToLocalStorage() {
  localStorage.setItem("minhas_tarefas", JSON.stringify(tasks));
}

function loadFromLocalStorage() {
  const savedTasks = localStorage.getItem("minhas_tarefas");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
}

// =============================================================================
// FUNÇÕES PRINCIPAIS (Regras de Negócio)
// =============================================================================

// Contador para garantir que cada tarefa tenha um identificador único exclusivo
let taskIdCounter = Date.now();

function addTask(text) {
  const newTask = {
    id: taskIdCounter++, // Incrementa o contador garantindo ID único
    text: text.trim(),
    completed: false
  };

  tasks.unshift(newTask);
  saveToLocalStorage();
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  saveToLocalStorage();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveToLocalStorage();
  renderTasks();
}

function clearCompletedTasks() {
  tasks = tasks.filter(task => !task.completed);
  saveToLocalStorage();
  renderTasks();
}

// =============================================================================
// RENDERIZAÇÃO DA INTERFACE & MEDIDOR DE PROGRESSO
// =============================================================================

function renderTasks() {
  // Limpa o conteúdo da lista
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = `<li class="empty-state">Nenhuma tarefa cadastrada. Adicione uma acima!</li>`;
  } else {
    tasks.forEach(task => {
      const li = document.createElement("li");
      li.className = `task-item ${task.completed ? "completed" : ""}`;

      li.innerHTML = `
        <label class="task-content">
          <input 
            type="checkbox" 
            class="task-checkbox" 
            ${task.completed ? "checked" : ""}
          >
          <span class="task-text">${escapeHtml(task.text)}</span>
        </label>
        <button class="btn-delete" title="Excluir tarefa" aria-label="Excluir tarefa">&times;</button>
      `;

      // Evento de concluir/desmarcar
      const checkbox = li.querySelector(".task-checkbox");
      checkbox.addEventListener("change", () => {
        toggleTask(task.id);
      });

      // Evento de exclusão
      const deleteBtn = li.querySelector(".btn-delete");
      deleteBtn.addEventListener("click", () => {
        deleteTask(task.id);
      });

      taskList.appendChild(li);
    });
  }

  // Atualiza as métricas (progresso, porcentagem e resumo)
  updateMetrics();
}

/**
 * Calcula a porcentagem de conclusão, atualiza a barra de progresso
 * e controla a exibição da mensagem de parabéns
 */
function updateMetrics() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;

  // Cálculo da porcentagem (evita divisão por zero quando a lista está vazia)
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  // Atualiza o texto da porcentagem e o preenchimento da barra
  progressPercentage.textContent = `${percentage}%`;
  progressBarFill.style.width = `${percentage}%`;

  // Atualiza o texto de resumo
  if (total === 0) {
    taskCount.textContent = "Nenhuma tarefa cadastrada";
    clearAllBtn.classList.add("hidden");
  } else {
    taskCount.textContent = `${completed} de ${total} tarefas concluídas`;

    if (completed > 0) {
      clearAllBtn.classList.remove("hidden");
    } else {
      clearAllBtn.classList.add("hidden");
    }
  }

  // Controle da mensagem de parabéns:
  // Só aparece se houver tarefas cadastradas E todas estiverem 100% concluídas!
  if (total > 0 && completed === total) {
    congratsMessage.classList.remove("hidden");
  } else {
    congratsMessage.classList.add("hidden");
  }
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.innerText = text;
  return div.innerHTML;
}

// =============================================================================
// EVENT LISTENERS (Ouvintes de Eventos)
// =============================================================================

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = taskInput.value.trim();
  if (text !== "") {
    addTask(text);
    taskInput.value = "";
    taskInput.focus();
  }
});

clearAllBtn.addEventListener("click", clearCompletedTasks);

// =============================================================================
// INICIALIZAÇÃO DA APLICAÇÃO
// =============================================================================

loadTheme();           // Carrega o tema preferido do usuário
loadFromLocalStorage(); // Carrega as tarefas salvas
renderTasks();          // Desenha a interface inicial
