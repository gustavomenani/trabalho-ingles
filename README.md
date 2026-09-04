# 🎓 Trabalho de Língua Inglesa — 3º Bimestre (Term III)
### Etec de Araçatuba • Prof. Fausto Shell

Uma aplicação web interativa, moderna e acessível desenvolvida para a avaliação bimestral de Língua Inglesa na **Etec de Araçatuba**, sob a orientação do docente **Prof. Fausto Shell**.

---

## 🌟 Funcionalidades Principais

- **🎲 5 Seções de Questões Aleatórias:**
  - A cada novo acesso ou início de prova, uma entre 5 seções completas de questões é selecionada aleatoriamente.
  - Abrange gramática contextual, vocabulário, phrasal verbs, interpretação de texto (reading comprehension) e autoavaliação.
- **🌐 Suporte Bilíngue em Tempo Real (EN / PT):**
  - Alternância instantânea entre Inglês e Português pelo cabeçalho sem recarregar a página e sem perder respostas salvas.
  - Sincronização em tempo real do título da aba (`document.title`) e atributo `<html lang="...">`.
- **👁️‍🗨️ Controle Flexível de Dicas e Traduções:**
  - Botão de alternância **Ocultar/Mostrar Tradução** disponível em textos de leitura e sentenças.
  - Permite aos alunos desafiarem seu inglês sem dicas visuais ou consultar a tradução em caso de dúvida interpretativa.
- **🔊 Motor de Voz de Alta Definição (HD Voice):**
  - Leitor de áudio com pronúncia humana cristalina em inglês americano (en-US).
  - Pré-carregamento proativo de sentenças sem pausas incômodas.
  - Leitura natural de lacunas de gramática (como `_____` pronunciado como *"blank"*).
- **📊 Avaliação Objetiva & Nivelamento CEFR:**
  - Cálculo automático de pontuação ao término da avaliação.
  - Equivalência internacional CEFR (A2, B1, B1+, B2) com feedback pedagógico e recomendações de estudo personalizadas.
- **📋 Certificado & Exportação de Resultados:**
  - Cartão de conclusão com identificação do aluno, data, tempo de conclusão, período acadêmico e nota final.
  - Botões para copiar resumo formatado ou baixar o relatório em JSON.
- **⌨️ Navegação Acessível por Teclado:**
  - Teclas de atalho (A, B, C, D / 1 a 0 / Enter / Setas) com modal de ajuda interativo.
- **🌓 Design Moderno com Tema Claro & Escuro:**
  - Suporte completo a Dark Mode e efeitos sonoros com controle de volume.

---

## 🛠️ Tecnologias Utilizadas

- **Framework & Runtime:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 8](https://vitejs.dev/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animações:** [Framer Motion](https://www.framer.com/motion/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Linter de Alta Performance:** [Oxlint](https://oxc.rs/)
- **Efeitos de Celebração:** Canvas Confetti

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- `npm` instalado

### 1. Clonar o repositório
```bash
git clone https://github.com/gustavomenani/trabalho-ingles.git
cd trabalho-ingles
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```
Acesse no seu navegador: `http://localhost:5173/`

### 4. Build de produção
```bash
npm run build
```

### 5. Pré-visualizar o build
```bash
npm run preview
```

---

## 📂 Estrutura do Projeto

```
trabalho-ingles/
├── public/                 # Favicons e ícones estáticos
├── src/
│   ├── components/         # Componentes React modulares
│   │   ├── layout/         # Header, FooterNav, Barra de Progresso
│   │   ├── questions/      # Telas de questões (múltipla escolha, escala, texto, leitura)
│   │   ├── results/        # Tela de conclusão, certificado e relatório final
│   │   ├── review/         # Gaveta lateral de revisão de questões
│   │   └── ui/             # Componentes de interface reutilizáveis (Card, Badge, Button, Modais)
│   ├── context/            # Context API para estado do questionário e tema
│   ├── data/               # Banco de questões (5 seções) e dicionários de tradução EN/PT
│   ├── hooks/              # Hooks customizados (useModernSpeech, useQuestionnaire, som, atalhos)
│   ├── types/              # Definições de tipagem TypeScript
│   ├── App.tsx             # Componente raiz da aplicação
│   ├── main.tsx            # Ponto de entrada React
│   └── index.css           # Estilos globais e Tailwind CSS
├── .gitignore              # Regras de exclusão do controle de versão
├── package.json            # Metadados e dependências
├── tsconfig.json           # Configurações TypeScript
└── vite.config.ts          # Configurações do Vite
```

---

## 👨‍🏫 Informações Acadêmicas

- **Instituição:** Etec de Araçatuba
- **Disciplina:** Língua Inglesa
- **Período:** 3º Bimestre (Term III)
- **Professor Orientador:** Fausto Shell
- **Desenvolvedor:** Gustavo Menani

