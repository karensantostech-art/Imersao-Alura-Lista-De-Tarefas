# 📋 Tarefas do Dia — To-Do List Interativo

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![LocalStorage](https://img.shields.io/badge/Web_Storage-LocalStorage-blueviolet?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Concluído-success?style=for-the-badge)

<p align="center">
  Uma aplicação web moderna, intuitiva e didática para gerenciar suas tarefas diárias com facilidade, acompanhar seu progresso visual em tempo real e personalizar o visual com temas de cores.
</p>

</div>

---

## 📖 Sobre o Projeto

O **Tarefas do Dia** foi desenvolvido com foco no aprendizado de programação e desenvolvimento de software utilizando ferramentas de IA, no caso o Google Antigravity, que utilizou **HTML5, CSS3 e JavaScript puro (Vanilla JS)** para a criação da interface visual personalizável, e ser de fato um sistema de Gerenciamento de Tarefas.

---

## ✨ Principais Funcionalidades

- ➕ **Adicionar Tarefas:** Digite a atividade e adicione clicando no botão ou simplesmente pressionando a tecla `Enter`.
- ✔️ **Marcar como Concluída:** Ao clicar na caixinha de seleção, a tarefa ganha um estilo riscado e esmaecido.
- 🗑️ **Remover Tarefas:** Exclusão individual de tarefas com um clique no botão `×`.
- 🧹 **Limpeza em Lote:** Botão para excluir todas as tarefas já concluídas de uma só vez.
- 📊 **Medidor em Porcentagem (%):** Barra de progresso animada que calcula dinamicamente a proporção de tarefas concluídas em relação ao total.
- 🎉 **Mensagem de Conquista:** Quando você atinge 100% das tarefas concluídas, uma mensagem comemorativa de parabéns surge na tela.
- 🎨 **Seletor de Temas de Cores:** Escolha entre 5 opções de paletas visuais (Roxo, Azul, Verde, Laranja e Rosa).
- 💾 **Persistência de Dados (`localStorage`):** Suas tarefas e o tema escolhido ficam salvos no navegador, permanecendo intactos mesmo após fechar ou recarregar a página (`F5`).

---

## 🗂️ Estrutura de Arquivos

```plaintext
Imersao-Alura-Lista-De-Tarefas/
├── index.html     # Estrutura visual e marcação semântica
├── style.css      # Estilos visuais, variáveis de tema (CSS Variables) e animações
├── app.js         # Lógica da aplicação, manipulação do DOM e LocalStorage
└── README.md      # Documentação completa e guia de estudo do projeto
```

---

## 🧠 Conceitos e Aprendizados Aplicados

Este projeto reúne conceitos essenciais de desenvolvimento de software:

### 1. Separação de Responsabilidades
- **HTML (`index.html`)**: Define *o que* está na tela (estrutura e semântica).
- **CSS (`style.css`)**: Define *como* a tela se parece (cores, espaçamentos, flexbox e animações).
- **JavaScript (`app.js`)**: Define *o que acontece* quando o usuário interage (comportamento e lógica).

### 2. Estado da Aplicação (State Management)
As tarefas são tratadas como dados em memória através de uma lista de objetos:
```javascript
{
  id: 1714000000001,           // Identificador numérico único
  text: "Estudar JavaScript",  // Descrição digitada pelo usuário
  completed: false             // Estado de conclusão (booleano)
}
```

### 3. Métodos Modernos de Array
O código evita laços tradicionais como `for (let i = ...)` em favor de métodos funcionais e legíveis:
- `.map()`: Para alternar o status de conclusão da tarefa sem mutação direta desordenada.
- `.filter()`: Para criar uma nova lista sem a tarefa excluída e para calcular as tarefas pendentes/concluídas.
- `.unshift()`: Para inserir as tarefas mais recentes sempre no topo da lista.
- `.forEach()`: Para renderizar dinamicamente os elementos na tela.

### 4. Variáveis CSS (`CSS Custom Properties`)
Permitem alternar temas instantaneamente alterando apenas o atributo `data-theme` na tag raiz `<html>`:
```css
:root, [data-theme="purple"] {
  --theme-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --theme-primary: #667eea;
}

[data-theme="blue"] {
  --theme-gradient: linear-gradient(135deg, #0072ff 0%, #00c6ff 100%);
  --theme-primary: #0072ff;
}
```

### 5. Boas Práticas e Segurança
- **Identificadores Únicos Garantidos:** Uso de contador monotônico (`let taskIdCounter = Date.now(); id: taskIdCounter++`) que previne conflitos de IDs mesmo se tarefas forem criadas no mesmo milissegundo.
- **Prevenção de XSS:** Função `escapeHtml()` para impedir injeção indevida de tags ou scripts maliciosos pelo campo de texto.
- **Tratamento de Formulário:** `event.preventDefault()` para impedir que a página recarregue ao submeter o formulário.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

* Ter o **Git** instalado (opcional, para clonar o repositório).
* Não é necessário instalar nenhum programa adicional. Siga os passos:

1. Abra o terminal da sua máquina (Prompt de Comando, PowerShell ou Terminal do Linux/Mac).
Clone o repositório com o comando:

**Via Git:**
```bash
git clone https://github.com/karensantostech-art/Imersao-Alura-Calculadora-Aprimorada.git
cd Imersao-Alura-Calculadora-Aprimorada
```
*Ou baixe o arquivo ZIP diretamente pelo botão verde **Code > Download ZIP** no GitHub e descompacte a pasta no seu computador.*

2. Abra o arquivo index.html em qualquer navegador (dando duplo clique no arquivo).
3. O projeto abrirá imediatamente no seu navegador padrão (Google Chrome, Microsoft Edge, Mozilla Firefox, Opera, etc.).

---

## 🧪 Testes e Validação de Qualidade

Todas as funcionalidades do projeto foram submetidas a uma suíte de testes automatizados executada diretamente em navegador headless, com **100% de taxa de aprovação**:

| Cenário Avaliado | Resultado |
| :--- | :---: |
| Estado inicial com lista vazia e progresso em 0% | ✅ Aprovado |
| Adição de tarefas e atualização do resumo | ✅ Aprovado |
| Conclusão parcial com cálculo proporcional de porcentagem | ✅ Aprovado |
| Conclusão total (100%) com ativação do card de parabéns | ✅ Aprovado |
| Reversão de conclusão e ocultamento de mensagem festiva | ✅ Aprovado |
| Alternância dinâmica entre as 5 cores de tema | ✅ Aprovado |
| Exclusão individual de tarefa e recálculo da porcentagem | ✅ Aprovado |
| Limpeza em lote de tarefas concluídas | ✅ Aprovado |
| Persistência e integridade dos dados no `localStorage` | ✅ Aprovado |

---

