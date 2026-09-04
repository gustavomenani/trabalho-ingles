import type { Question, AssignmentGrade, AnswersState, QuestionSection, Language } from '../types/questionnaire';

export const ASSIGNMENT_METADATA = {
  institution: 'Etec de Araçatuba',
  instructor: 'Prof. Fausto Shell',
  term: '3º Bimestre (Term III)',
  termPt: '3º Bimestre',
  course: 'English Language & Academic Skills',
  title: 'English Language Assignment',
  titlePt: 'Trabalho de Língua Inglesa',
  subtitle: 'Reading Analysis, Grammar Mechanics & Written Expression',
  subtitlePt: 'Análise de Leitura, Estruturas Gramaticais e Expressão Escrita',
  estimatedMinutes: 4,
  totalGradedQuestions: 5,
};

export const QUESTION_SECTIONS: QuestionSection[] = [
  // ==========================================
  // SECTION 1: Daily Life & School Routine
  // ==========================================
  {
    id: 1,
    title: 'Section 1: Daily Life & School Routine',
    titlePt: 'Seção 1: Vida Cotidiana e Rotina Escolar',
    theme: 'School Routine',
    themePt: 'Rotina Escolar',
    description: 'Present perfect experiences, academic vocabulary, everyday idioms, and reading comprehension.',
    descriptionPt: 'Experiências com present perfect, vocabulário acadêmico, expressões do cotidiano e interpretação de texto.',
    questions: [
      {
        id: 'welcome',
        type: 'welcome',
        title: 'English Language & Proficiency Assignment',
        titlePt: 'Trabalho de Língua Inglesa e Avaliação de Proficiência',
        subtitle:
          'Official English language assessment for Etec de Araçatuba, 3rd Term (Term III), under the supervision of Prof. Fausto Shell. This assignment evaluates reading comprehension, grammar in context, vocabulary nuances, and written expression.',
        subtitlePt:
          'Avaliação oficial de língua inglesa da Etec de Araçatuba, 3º Bimestre, sob a supervisão do Prof. Fausto Shell. Este trabalho avalia compreensão de texto, gramática em contexto, nuances de vocabulário e expressão escrita.',
        category: 'Instructions',
        categoryPt: 'Instruções',
      },
      {
        id: 's1-grammar',
        type: 'single-choice',
        title: 'Complete the conversation with the correct verb form:',
        titlePt: 'Complete o diálogo com a forma verbal correta:',
        subtitle: '"Have you ever _____ to London?" — "Yes, I went there last summer."',
        subtitlePt: '"Have you ever _____ to London?" — "Yes, I went there last summer." (Você já esteve em Londres? — Sim, fui lá no verão passado.)',
        category: 'Grammar: Present Perfect',
        categoryPt: 'Gramática: Present Perfect',
        required: true,
        correctAnswer: 'been',
        explanation:
          'In English, the Present Perfect tense uses "have/has + past participle" (been) to talk about life experiences up to the present moment without specifying an exact past time.',
        explanationPt:
          'Em inglês, o tempo verbal Present Perfect utiliza a estrutura "have/has + particípio passado" (been) para relatar experiências de vida até o momento presente, sem especificar uma data exata no passado.',
        options: [
          { id: 'been', label: 'Been', labelPt: 'Been', description: 'Past participle of "be", correctly used with "have" for life experiences.', descriptionPt: 'Particípio passado do verbo "be", usado corretamente com "have" para relatar experiências de vida.', shortcut: 'A' },
          { id: 'went', label: 'Went', labelPt: 'Went', description: 'Simple past tense, used only for completed actions at specific past times.', descriptionPt: 'Passado simples (Simple Past), usado apenas para ações concluídas em momentos definidos do passado.', shortcut: 'B' },
          { id: 'go', label: 'Go', labelPt: 'Go', description: 'Base form of the verb; cannot follow "have" in the present perfect.', descriptionPt: 'Forma base do verbo no infinitivo sem "to"; não pode suceder o auxiliar "have" no Present Perfect.', shortcut: 'C' },
          { id: 'gone', label: 'Gone', labelPt: 'Gone', description: '"Gone" indicates that the person went and has not yet returned.', descriptionPt: '"Gone" indica que a pessoa viajou e ainda não retornou ao local de origem.', shortcut: 'D' },
        ],
      },
      {
        id: 's1-vocab',
        type: 'single-choice',
        title: 'Choose the word that best completes the sentence:',
        titlePt: 'Escolha a palavra que melhor completa a frase:',
        subtitle: '"All students must submit their chemistry _____ before Friday afternoon."',
        subtitlePt: '"All students must submit their chemistry _____ before Friday afternoon." (Todos os alunos devem entregar o seu trabalho de química antes de sexta-feira à tarde.)',
        category: 'Vocabulary in Context',
        categoryPt: 'Vocabulário em Contexto',
        required: true,
        correctAnswer: 'assignment',
        explanation:
          'An "assignment" is an academic task, project, or piece of schoolwork assigned by a teacher to students.',
        explanationPt:
          'A palavra "assignment" significa um trabalho escolar, lição ou tarefa acadêmica atribuída por um professor aos seus alunos.',
        options: [
          { id: 'assignment', label: 'Assignment', labelPt: 'Assignment', description: 'An academic task, project, or piece of schoolwork assigned to students.', descriptionPt: 'Trabalho escolar ou tarefa acadêmica atribuída a estudantes.', shortcut: 'A' },
          { id: 'luggage', label: 'Luggage', labelPt: 'Luggage', description: 'Suitcases, bags, and baggage used when traveling.', descriptionPt: 'Malas e bagagens utilizadas em viagens.', shortcut: 'B' },
          { id: 'weather', label: 'Weather', labelPt: 'Weather', description: 'Atmospheric conditions such as temperature, rain, and wind.', descriptionPt: 'Condições meteorológicas e clima, como chuva e temperatura.', shortcut: 'C' },
          { id: 'receipt', label: 'Receipt', labelPt: 'Receipt', description: 'A written proof of purchase or payment received after buying goods.', descriptionPt: 'Recibo ou comprovante fiscal de pagamento emitido em compras.', shortcut: 'D' },
        ],
      },
      {
        id: 's1-idiom',
        type: 'single-choice',
        title: 'What does the idiom "a piece of cake" mean in English?',
        titlePt: 'O que significa a expressão idiomática "a piece of cake" em inglês?',
        subtitle: '"Don\'t worry about the English quiz tomorrow; it\'s going to be a piece of cake!"',
        subtitlePt: '"Don\'t worry about the English quiz tomorrow; it\'s going to be a piece of cake!" (Não se preocupe com o teste de inglês de amanhã; vai ser muito fácil!)',
        category: 'Idiomatic Expressions',
        categoryPt: 'Expressões Idiomáticas',
        required: true,
        correctAnswer: 'easy',
        explanation:
          'The common idiom "a piece of cake" means something that is very simple, pleasant, and easy to accomplish.',
        explanationPt:
          'A expressão idiomática "a piece of cake" é usada para descrever algo extremamente fácil, simples e tranquilo de fazer ("moleza" ou "bico").',
        options: [
          { id: 'easy', label: 'Something very easy to do', labelPt: 'Algo muito fácil de fazer', description: 'Describing an effortless, simple, and straightforward task.', descriptionPt: 'Descreve uma tarefa simples, descomplicada e sem esforço.', shortcut: 'A' },
          { id: 'dessert', label: 'A delicious birthday dessert', labelPt: 'Uma deliciosa sobremesa de aniversário', description: 'Literal food meaning, which does not reflect the figurative idiom.', descriptionPt: 'Sentido literal de alimento, que não corresponde à figura de linguagem.', shortcut: 'B' },
          { id: 'expensive', label: 'A very expensive purchase', labelPt: 'Uma compra muito cara', description: 'Unrelated meaning.', descriptionPt: 'Sentido não relacionado à expressão.', shortcut: 'C' },
          { id: 'stressful', label: 'A difficult and stressful problem', labelPt: 'Um problema difícil e estressante', description: 'Opposite meaning.', descriptionPt: 'Sentido oposto ao significado da expressão.', shortcut: 'D' },
        ],
      },
      {
        id: 's1-prep',
        type: 'single-choice',
        title: 'Which preposition correctly completes the sentence?',
        titlePt: 'Qual preposição completa a frase corretamente?',
        subtitle: '"Lucas is very interested _____ learning computer programming at Etec."',
        subtitlePt: '"Lucas is very interested _____ learning computer programming at Etec." (Lucas está muito interessado em aprender programação na Etec.)',
        category: 'Preposition Collocations',
        categoryPt: 'Regência Preposicional',
        required: true,
        correctAnswer: 'in',
        explanation:
          'The adjective "interested" collocates with the preposition "in" (interested in something / interested in doing something).',
        explanationPt:
          'O adjetivo "interested" rege obrigatoriamente a preposição "in" em inglês (interested in something / interested in doing something).',
        options: [
          { id: 'in', label: 'In', labelPt: 'In', description: 'Correct collocation: interested in + noun or gerund verb.', descriptionPt: 'Regência correta: interested in + substantivo ou verbo no gerúndio (-ing).', shortcut: 'A' },
          { id: 'on', label: 'On', labelPt: 'On', description: 'Incorrect preposition with the adjective "interested".', descriptionPt: 'Preposição incorreta com o adjetivo "interested".', shortcut: 'B' },
          { id: 'at', label: 'At', labelPt: 'At', description: 'Incorrect preposition with the adjective "interested".', descriptionPt: 'Preposição incorreta com o adjetivo "interested".', shortcut: 'C' },
          { id: 'for', label: 'For', labelPt: 'For', description: 'Incorrect preposition with the adjective "interested".', descriptionPt: 'Preposição incorreta com o adjetivo "interested".', shortcut: 'D' },
        ],
      },
      {
        id: 's1-reading',
        type: 'single-choice',
        title: 'Based on the passage, what does Lucas believe about his routine?',
        titlePt: 'Com base no texto, o que Lucas acredita sobre sua rotina?',
        readingPassage:
          'Every morning, Lucas wakes up at six o’clock to attend his technical classes at Etec de Araçatuba. He loves working with computers and collaborating with his classmates on robotics projects. After school, he practices basketball for an hour before doing his homework. Lucas believes that balancing sports, studies, and technology makes his days much more productive.',
        readingPassagePt:
          'Todas as manhãs, Lucas acorda às seis horas para assistir às suas aulas técnicas na Etec de Araçatuba. Ele adora trabalhar com computadores e colaborar com seus colegas em projetos de robótica. Depois da aula, ele joga basquete por uma hora antes de fazer a lição de casa. Lucas acredita que equilibrar esportes, estudos e tecnologia torna seus dias muito mais produtivos.',
        subtitle: 'Read the short excerpt above and select the correct statement.',
        subtitlePt: 'Leia o pequeno trecho acima e selecione a afirmação correta.',
        category: 'Reading Comprehension',
        categoryPt: 'Interpretação de Texto',
        required: true,
        correctAnswer: 'balance',
        explanation:
          'The passage explicitly states in the final sentence: "Lucas believes that balancing sports, studies, and technology makes his days much more productive."',
        explanationPt:
          'O texto afirma explicitamente em sua frase de encerramento: "Lucas believes that balancing sports, studies, and technology makes his days much more productive."',
        options: [
          { id: 'balance', label: 'Balancing sports, studies, and technology makes him more productive', labelPt: 'Equilibrar esportes, estudos e tecnologia o torna mais produtivo', description: 'Directly supported by the final sentence of the passage.', descriptionPt: 'Afirmação comprovada diretamente pela última frase do texto.', shortcut: 'A' },
          { id: 'videogames', label: 'Playing video games all night helps him wake up early', labelPt: 'Jogar videogame a noite toda o ajuda a acordar cedo', description: 'Not mentioned or supported in the text.', descriptionPt: 'Informação não mencionada nem fundamentada no texto.', shortcut: 'B' },
          { id: 'alone', label: 'He prefers to spend all his free time alone without friends', labelPt: 'Ele prefere passar todo o seu tempo livre sozinho sem amigos', description: 'Contradicted by his collaboration on projects and playing basketball.', descriptionPt: 'Contradito pela colaboração em projetos de robótica e prática de basquete.', shortcut: 'C' },
          { id: 'boring', label: 'He thinks studying computers is boring and unnecessary', labelPt: 'Ele acha que estudar computação é chato e desnecessário', description: 'Contradicted by the text ("He loves working with computers").', descriptionPt: 'Contradito expressamente pelo texto ("He loves working with computers").', shortcut: 'D' },
        ],
      },
      {
        id: 's1-confidence',
        type: 'rating-scale',
        title: 'How confident do you feel reading and understanding basic English texts?',
        titlePt: 'Qual é o seu nível de confiança para ler e compreender textos básicos em inglês?',
        subtitle: 'Rate your confidence from 1 (need frequent help) to 10 (fully comfortable).',
        subtitlePt: 'Avalie sua confiança de 1 (preciso de ajuda frequente) a 10 (totalmente confortável).',
        category: 'Self-Reflection',
        categoryPt: 'Autoavaliação',
        required: true,
        min: 1,
        max: 10,
        minLabel: 'Need frequent help',
        minLabelPt: 'Preciso de ajuda frequente',
        maxLabel: 'Fully comfortable',
        maxLabelPt: 'Totalmente confortável',
      },
      {
        id: 's1-writing',
        type: 'text',
        title: 'Written Expression: Personal Reflection',
        titlePt: 'Expressão Escrita: Reflexão Pessoal',
        subtitle: 'What is your favorite school subject or hobby, and why do you enjoy it? (Write 1 to 3 sentences in English)',
        subtitlePt: 'Qual é a sua matéria escolar ou passatempo favorito e por que você gosta dele? (Escreva de 1 a 3 frases em inglês)',
        category: 'Written Expression',
        categoryPt: 'Expressão Escrita',
        required: false,
        placeholder: 'e.g., My favorite subject is computer science because I enjoy programming and creating new websites...',
        placeholderPt: 'Ex.: My favorite subject is computer science because I enjoy programming and creating new websites...',
        maxLength: 500,
      },
    ],
  },

  // ==========================================
  // SECTION 2: Travel, Tourism & World Cultures
  // ==========================================
  {
    id: 2,
    title: 'Section 2: Travel, Tourism & World Cultures',
    titlePt: 'Seção 2: Viagens, Turismo e Culturas do Mundo',
    theme: 'Travel & Cultures',
    themePt: 'Viagens & Culturas',
    description: 'First conditional, travel vocabulary, future excitement idioms, and cultural comprehension.',
    descriptionPt: 'Primeira condicional, vocabulário de viagens, expressões de expectativa futura e leitura cultural.',
    questions: [
      {
        id: 'welcome',
        type: 'welcome',
        title: 'English Language & Proficiency Assignment',
        titlePt: 'Trabalho de Língua Inglesa e Avaliação de Proficiência',
        subtitle:
          'Official English language assessment for Etec de Araçatuba, 3rd Term (Term III), under the supervision of Prof. Fausto Shell. Test your travel vocabulary, first conditionals, and cultural reading.',
        subtitlePt:
          'Avaliação oficial de língua inglesa da Etec de Araçatuba, 3º Bimestre, sob a supervisão do Prof. Fausto Shell. Avalie seu vocabulário de viagens, primeira condicional (First Conditional) e leitura cultural.',
        category: 'Instructions',
        categoryPt: 'Instruções',
      },
      {
        id: 's2-grammar',
        type: 'single-choice',
        title: 'Complete the sentence with the correct conditional verb tense:',
        titlePt: 'Complete a frase com o tempo verbal condicional correto:',
        subtitle: '"If the weather is sunny tomorrow, we _____ to the park with our classmates."',
        subtitlePt: '"If the weather is sunny tomorrow, we _____ to the park with our classmates." (Se o tempo estiver ensolarado amanhã, nós iremos ao parque com nossos colegas.)',
        category: 'Grammar: First Conditional',
        categoryPt: 'Gramática: First Conditional',
        required: true,
        correctAnswer: 'will-go',
        explanation:
          'First conditional sentences express real and possible future situations. The condition clause uses the Simple Present ("if the weather is..."), and the main result clause uses "will + base verb" (will go).',
        explanationPt:
          'O First Conditional expressa possibilidades reais e prováveis no futuro. A oração condicional utiliza o Simple Present ("if the weather is..."), e a oração principal de resultado utiliza "will + verbo base" (will go).',
        options: [
          { id: 'will-go', label: 'Will go', labelPt: 'Will go', description: 'Future with "will", standard for first conditional result clauses.', descriptionPt: 'Futuro com "will", padrão para a oração principal da primeira condicional.', shortcut: 'A' },
          { id: 'went', label: 'Went', labelPt: 'Went', description: 'Simple past tense; not used for real future possibilities.', descriptionPt: 'Passado simples (Simple Past); não é usado para expressar possibilidades futuras reais.', shortcut: 'B' },
          { id: 'had-gone', label: 'Had gone', labelPt: 'Had gone', description: 'Past perfect; used for third conditional unreal situations.', descriptionPt: 'Past Perfect; usado em hipóteses irreais da terceira condicional (Third Conditional).', shortcut: 'C' },
          { id: 'goes', label: 'Goes', labelPt: 'Goes', description: 'Simple present third person; does not agree with the subject "we".', descriptionPt: 'Presente simples na terceira pessoa do singular; não concorda com o sujeito "we".', shortcut: 'D' },
        ],
      },
      {
        id: 's2-vocab',
        type: 'single-choice',
        title: 'Choose the correct word to complete the sentence:',
        titlePt: 'Escolha a palavra correta para completar a frase:',
        subtitle: '"Before boarding an international flight, every passenger must present a valid _____."',
        subtitlePt: '"Before boarding an international flight, every passenger must present a valid _____." (Antes de embarcar em um voo internacional, todo passageiro deve apresentar um passaporte válido.)',
        category: 'Vocabulary in Context',
        categoryPt: 'Vocabulário em Contexto',
        required: true,
        correctAnswer: 'passport',
        explanation:
          'A "passport" is the official government document required to travel internationally between countries.',
        explanationPt:
          '"Passport" (passaporte) é o documento oficial governamental de identificação exigido para viagens internacionais entre diferentes países.',
        options: [
          { id: 'passport', label: 'Passport', labelPt: 'Passport', description: 'Official travel document required for international border crossing.', descriptionPt: 'Documento oficial de viagem obrigatório para travessia de fronteiras internacionais.', shortcut: 'A' },
          { id: 'cookbook', label: 'Cookbook', labelPt: 'Cookbook', description: 'A book containing recipes and culinary instructions.', descriptionPt: 'Livro contendo receitas e instruções culinárias.', shortcut: 'B' },
          { id: 'blanket', label: 'Blanket', labelPt: 'Blanket', description: 'A large piece of warm fabric used on a bed or for warmth.', descriptionPt: 'Cobertor ou manta de tecido usado para se aquecer ao dormir.', shortcut: 'C' },
          { id: 'keyboard', label: 'Keyboard', labelPt: 'Keyboard', description: 'An input device with keys used for typing on a computer.', descriptionPt: 'Teclado de computador utilizado para digitação.', shortcut: 'D' },
        ],
      },
      {
        id: 's2-idiom',
        type: 'single-choice',
        title: 'What does the phrasal verb "to look forward to" mean?',
        titlePt: 'O que significa o phrasal verb "to look forward to"?',
        subtitle: '"I am really looking forward to our graduation trip in December."',
        subtitlePt: '"I am really looking forward to our graduation trip in December." (Estou muito ansioso/empolgado pela nossa viagem de formatura em dezembro.)',
        category: 'Phrasal Verbs',
        categoryPt: 'Phrasal Verbs',
        required: true,
        correctAnswer: 'excited',
        explanation:
          'The phrasal verb "to look forward to" means to anticipate a future event with happiness, enthusiasm, and eager expectation.',
        explanationPt:
          'O phrasal verb "to look forward to" significa aguardar com alegria, entusiasmo e expectativa positiva a chegada de um evento futuro.',
        options: [
          { id: 'excited', label: 'To feel excited about a future event', labelPt: 'Sentir entusiasmo por um evento futuro', description: 'Anticipating an upcoming occasion with joy and enthusiasm.', descriptionPt: 'Aguardar uma ocasião futura com grande alegria e expectativa positiva.', shortcut: 'A' },
          { id: 'behind', label: 'To look behind your back while walking', labelPt: 'Olhar para trás enquanto caminha', description: 'Literal physical interpretation of the words.', descriptionPt: 'Interpretação física literal das palavras.', shortcut: 'B' },
          { id: 'forget', label: 'To forget an important appointment', labelPt: 'Esquecer um compromisso importante', description: 'Unrelated meaning.', descriptionPt: 'Sentido não relacionado.', shortcut: 'C' },
          { id: 'cancel', label: 'To cancel a planned trip unexpectedly', labelPt: 'Cancelar uma viagem planejada de forma inesperada', description: 'Opposite meaning.', descriptionPt: 'Sentido oposto ao significado da expressão.', shortcut: 'D' },
        ],
      },
      {
        id: 's2-prep',
        type: 'single-choice',
        title: 'Which preposition completes the collocation?',
        titlePt: 'Qual preposição completa a regência corretamente?',
        subtitle: '"Marina is exceptionally good _____ speaking English with international visitors."',
        subtitlePt: '"Marina is exceptionally good _____ speaking English with international visitors." (Marina é excepcionalmente boa em falar inglês com visitantes internacionais.)',
        category: 'Preposition Collocations',
        categoryPt: 'Regência Preposicional',
        required: true,
        correctAnswer: 'at',
        explanation:
          'The adjective "good" collocates with the preposition "at" to describe skill, talent, or competence in an activity (good at sports, good at speaking English).',
        explanationPt:
          'O adjetivo "good" rege a preposição "at" quando expressa habilidade, competência ou talento em uma atividade (good at sports, good at speaking English).',
        options: [
          { id: 'at', label: 'At', labelPt: 'At', description: 'Correct collocation: good at + activity or gerund verb.', descriptionPt: 'Regência correta: good at + atividade ou verbo no gerúndio (-ing).', shortcut: 'A' },
          { id: 'to', label: 'To', labelPt: 'To', description: 'Incorrect preposition for expressing abilities with "good".', descriptionPt: 'Preposição incorreta para expressar habilidades com o adjetivo "good".', shortcut: 'B' },
          { id: 'in', label: 'In', labelPt: 'In', description: 'Incorrect preposition for expressing abilities with "good".', descriptionPt: 'Preposição incorreta para expressar habilidades com o adjetivo "good".', shortcut: 'C' },
          { id: 'with', label: 'With', labelPt: 'With', description: 'Used for instruments or people (good with tools/children), but abilities take "at".', descriptionPt: 'Usado para instrumentos ou relações interpessoais (good with tools/children), mas habilidades exigem "at".', shortcut: 'D' },
        ],
      },
      {
        id: 's2-reading',
        type: 'single-choice',
        title: 'According to the passage, why is learning simple polite words helpful when traveling?',
        titlePt: 'De acordo com o texto, por que aprender palavras simples de cortesia é útil ao viajar?',
        readingPassage:
          'Traveling to a foreign country is an unforgettable adventure that broadens your worldview. When you visit a new place, trying local cuisine and communicating with residents helps you appreciate different cultural traditions. Even learning a few polite words in the local language, like "please" and "thank you", shows respect and opens doors to genuine friendships.',
        readingPassagePt:
          'Viajar para um país estrangeiro é uma aventura inesquecível que amplia sua visão de mundo. Ao visitar um novo lugar, experimentar a culinária local e conversar com os moradores ajuda você a valorizar diferentes tradições culturais. Até mesmo aprender algumas palavras de cortesia no idioma local, como "por favor" e "obrigado", demonstra respeito e abre portas para amizades verdadeiras.',
        subtitle: 'Read the excerpt above and select the statement supported by the text.',
        subtitlePt: 'Leia o trecho acima e selecione a afirmação comprovada pelo texto.',
        category: 'Reading Comprehension',
        categoryPt: 'Interpretação de Texto',
        required: true,
        correctAnswer: 'respect',
        explanation:
          'The passage explicitly states in the last sentence that using simple polite words "shows respect and opens doors to genuine friendships."',
        explanationPt:
          'O texto afirma explicitamente em sua última oração que usar palavras simples de cortesia "shows respect and opens doors to genuine friendships" (demonstra respeito e abre portas para amizades verdadeiras).',
        options: [
          { id: 'respect', label: 'It shows respect and helps build genuine friendly connections', labelPt: 'Demonstra respeito e ajuda a construir laços de amizade verdadeiros', description: 'Supported directly by the final sentence of the text.', descriptionPt: 'Afirmação comprovada diretamente pela última frase do texto.', shortcut: 'A' },
          { id: 'mandatory', label: 'It is legally mandatory to enter museums and restaurants', labelPt: 'É uma exigência legal obrigatória para entrar em museus e restaurantes', description: 'Not stated or suggested in the passage.', descriptionPt: 'Não mencionado nem sugerido no texto.', shortcut: 'B' },
          { id: 'delays', label: 'It guarantees that flights will never experience weather delays', labelPt: 'Garante que os voos nunca sofram atrasos por motivos meteorológicos', description: 'Unrelated to the passage.', descriptionPt: 'Sem nenhuma relação com o conteúdo do texto.', shortcut: 'C' },
          { id: 'free-meals', label: 'It allows tourists to avoid paying for restaurant meals', labelPt: 'Permite que os turistas deixem de pagar por refeições em restaurantes', description: 'Incorrect and unsupported.', descriptionPt: 'Incorreto e sem fundamento no texto.', shortcut: 'D' },
        ],
      },
      {
        id: 's2-confidence',
        type: 'rating-scale',
        title: 'How confident do you feel asking for directions or ordering food in English?',
        titlePt: 'Qual é o seu nível de confiança para pedir informações ou fazer pedidos em inglês?',
        subtitle: 'Rate your confidence from 1 (very nervous) to 10 (completely confident).',
        subtitlePt: 'Avalie sua confiança de 1 (muito inseguro) a 10 (completamente confiante).',
        category: 'Self-Reflection',
        categoryPt: 'Autoavaliação',
        required: true,
        min: 1,
        max: 10,
        minLabel: 'Very nervous',
        minLabelPt: 'Muito inseguro',
        maxLabel: 'Completely confident',
        maxLabelPt: 'Completamente confiante',
      },
      {
        id: 's2-writing',
        type: 'text',
        title: 'Written Expression: Dream Destination',
        titlePt: 'Expressão Escrita: Destino dos Sonhos',
        subtitle: 'If you could travel to any country in the world, where would you go and why? (Write 1 to 3 sentences in English)',
        subtitlePt: 'Se você pudesse viajar para qualquer país do mundo, para onde iria e por quê? (Escreva de 1 a 3 frases em inglês)',
        category: 'Written Expression',
        categoryPt: 'Expressão Escrita',
        required: false,
        placeholder: 'e.g., I would love to visit Canada because I want to see the snow and practice speaking English with native speakers...',
        placeholderPt: 'Ex.: I would love to visit Canada because I want to see the snow and practice speaking English with native speakers...',
        maxLength: 500,
      },
    ],
  },

  // ==========================================
  // SECTION 3: Technology, Games & Innovation
  // ==========================================
  {
    id: 3,
    title: 'Section 3: Technology, Games & Innovation',
    titlePt: 'Seção 3: Tecnologia, Jogos e Inovação',
    theme: 'Technology & Gaming',
    themePt: 'Tecnologia & Games',
    description: 'Comparatives, cybersecurity vocabulary, digital phrasals, and educational AI reading.',
    descriptionPt: 'Comparativos, vocabulário de cibersegurança, phrasal verbs digitais e leitura sobre IA na educação.',
    questions: [
      {
        id: 'welcome',
        type: 'welcome',
        title: 'English Language & Proficiency Assignment',
        titlePt: 'Trabalho de Língua Inglesa e Avaliação de Proficiência',
        subtitle:
          'Official English language assessment for Etec de Araçatuba, 3rd Term (Term III), under the supervision of Prof. Fausto Shell. Test your technical English, comparative forms, and modern technology vocabulary.',
        subtitlePt:
          'Avaliação oficial de língua inglesa da Etec de Araçatuba, 3º Bimestre, sob a supervisão do Prof. Fausto Shell. Avalie seu inglês técnico, formas comparativas e vocabulário moderno de tecnologia.',
        category: 'Instructions',
        categoryPt: 'Instruções',
      },
      {
        id: 's3-grammar',
        type: 'single-choice',
        title: 'Choose the correct comparative form:',
        titlePt: 'Escolha a forma comparativa correta:',
        subtitle: '"The new computer processor is much _____ than the previous generation."',
        subtitlePt: '"The new computer processor is much _____ than the previous generation." (O novo processador de computador é muito mais rápido do que o da geração anterior.)',
        category: 'Grammar: Comparatives',
        categoryPt: 'Gramática: Comparativos',
        required: true,
        correctAnswer: 'faster',
        explanation:
          'One-syllable adjectives in English form the comparative by adding "-er" (fast -> faster). They do not use "more".',
        explanationPt:
          'Adjetivos de uma sílaba em inglês formam o comparativo de superioridade recebendo o sufixo "-er" (fast -> faster). Não se utiliza a palavra "more" antes de adjetivos curtos.',
        options: [
          { id: 'faster', label: 'Faster', labelPt: 'Faster', description: 'Correct comparative form of the one-syllable adjective "fast".', descriptionPt: 'Forma comparativa correta do adjetivo monossílabo "fast".', shortcut: 'A' },
          { id: 'more-fast', label: 'More fast', labelPt: 'More fast', description: 'Incorrect: short adjectives take the "-er" suffix, not "more".', descriptionPt: 'Incorreto: adjetivos curtos recebem o sufixo "-er", e não o termo "more".', shortcut: 'B' },
          { id: 'fastest', label: 'Fastest', labelPt: 'Fastest', description: 'Superlative form, used when comparing three or more items.', descriptionPt: 'Forma superlativa, usada ao comparar três ou mais elementos entre si.', shortcut: 'C' },
          { id: 'as-fast', label: 'As fast', labelPt: 'As fast', description: 'Used in equality structures ("as fast as"), not with "than".', descriptionPt: 'Usado em estruturas de igualdade ("as fast as"), e não acompanhado de "than".', shortcut: 'D' },
        ],
      },
      {
        id: 's3-vocab',
        type: 'single-choice',
        title: 'Select the most appropriate word to complete the sentence:',
        titlePt: 'Selecione a palavra mais adequada para completar a frase:',
        subtitle: '"To protect your online accounts from unauthorized access, you must create a strong _____."',
        subtitlePt: '"To protect your online accounts from unauthorized access, you must create a strong _____." (Para proteger suas contas online contra acessos não autorizados, você deve criar uma senha forte.)',
        category: 'Vocabulary in Context',
        categoryPt: 'Vocabulário em Contexto',
        required: true,
        correctAnswer: 'password',
        explanation:
          'A "password" is a secret sequence of characters used to verify identity and safeguard digital accounts against unauthorized access.',
        explanationPt:
          'Uma "password" (senha) é uma sequência secreta de caracteres utilizada para autenticar a identidade do usuário e proteger contas digitais contra acessos não autorizados.',
        options: [
          { id: 'password', label: 'Password', labelPt: 'Password', description: 'A secret credential used for digital security and authentication.', descriptionPt: 'Credencial secreta utilizada para segurança digital e autenticação de acesso.', shortcut: 'A' },
          { id: 'wallpaper', label: 'Wallpaper', labelPt: 'Wallpaper', description: 'A decorative background image on a computer or smartphone screen.', descriptionPt: 'Imagem de fundo ou papel de parede na tela de computadores e celulares.', shortcut: 'B' },
          { id: 'microphone', label: 'Microphone', labelPt: 'Microphone', description: 'An audio hardware peripheral used to record acoustic sound or speech.', descriptionPt: 'Periférico de hardware de áudio utilizado para captar e gravar a voz.', shortcut: 'C' },
          { id: 'printer', label: 'Printer', labelPt: 'Printer', description: 'An output hardware device that prints digital documents onto physical paper.', descriptionPt: 'Impressora ou equipamento que transfere textos e imagens digitais para o papel físico.', shortcut: 'D' },
        ],
      },
      {
        id: 's3-idiom',
        type: 'single-choice',
        title: 'What does the phrasal verb "to turn off" mean?',
        titlePt: 'O que significa o phrasal verb "to turn off"?',
        subtitle: '"Don\'t forget to turn off the monitors before leaving the computer lab."',
        subtitlePt: '"Don\'t forget to turn off the monitors before leaving the computer lab." (Não se esqueça de desligar os monitores antes de sair do laboratório de informática.)',
        category: 'Phrasal Verbs',
        categoryPt: 'Phrasal Verbs',
        required: true,
        correctAnswer: 'power-down',
        explanation:
          '"To turn off" means to stop the operation or electrical power supply of an appliance, light, or digital device.',
        explanationPt:
          'O phrasal verb "to turn off" significa interromper o funcionamento ou fornecimento de energia elétrica de um aparelho, luz ou dispositivo digital (desligar).',
        options: [
          { id: 'power-down', label: 'To stop the electrical operation of a device', labelPt: 'Interromper o funcionamento elétrico de um aparelho (desligar)', description: 'Powering down or shutting off a machine or electrical appliance.', descriptionPt: 'Desligar a energia ou cessar o funcionamento de um dispositivo.', shortcut: 'A' },
          { id: 'volume-up', label: 'To increase the sound volume', labelPt: 'Aumentar o volume do som', description: 'That is the phrasal verb "to turn up".', descriptionPt: 'Isso corresponde ao phrasal verb "to turn up".', shortcut: 'B' },
          { id: 'repair', label: 'To repair a broken physical component', labelPt: 'Consertar um componente físico com defeito', description: 'That corresponds to "to repair" or "to fix".', descriptionPt: 'Isso corresponde aos verbos "to repair" ou "to fix".', shortcut: 'C' },
          { id: 'download', label: 'To download a video game from the web', labelPt: 'Baixar um jogo pela internet', description: 'Unrelated meaning.', descriptionPt: 'Sentido não relacionado.', shortcut: 'D' },
        ],
      },
      {
        id: 's3-prep',
        type: 'single-choice',
        title: 'Which preposition correctly completes the sentence?',
        titlePt: 'Qual preposição completa a frase corretamente?',
        subtitle: '"Modern mobile applications depend _____ reliable internet access to update data."',
        subtitlePt: '"Modern mobile applications depend _____ reliable internet access to update data." (Os aplicativos móveis modernos dependem de acesso confiável à internet para atualizar dados.)',
        category: 'Preposition Collocations',
        categoryPt: 'Regência Preposicional',
        required: true,
        correctAnswer: 'on',
        explanation:
          'The verb "depend" collocates with the preposition "on" (depend on someone / depend on something).',
        explanationPt:
          'O verbo "depend" rege obrigatoriamente a preposição "on" em inglês (depend on someone / depend on something).',
        options: [
          { id: 'on', label: 'On', labelPt: 'On', description: 'Correct collocation: depend on + object or noun.', descriptionPt: 'Regência correta: depend on + objeto ou substantivo.', shortcut: 'A' },
          { id: 'of', label: 'Of', labelPt: 'Of', description: 'Incorrect preposition with the verb "depend".', descriptionPt: 'Preposição incorreta com o verbo "depend".', shortcut: 'B' },
          { id: 'at', label: 'At', labelPt: 'At', description: 'Incorrect preposition with the verb "depend".', descriptionPt: 'Preposição incorreta com o verbo "depend".', shortcut: 'C' },
          { id: 'to', label: 'To', labelPt: 'To', description: 'Incorrect preposition with the verb "depend".', descriptionPt: 'Preposição incorreta com o verbo "depend".', shortcut: 'D' },
        ],
      },
      {
        id: 's3-reading',
        type: 'single-choice',
        title: 'What is the main benefit of educational AI tools according to the passage?',
        titlePt: 'Qual é o principal benefício das ferramentas de IA educacional segundo o texto?',
        readingPassage:
          'Artificial intelligence is transforming how students learn around the world. Interactive educational platforms can now adapt exercises to each student’s personal pace, providing immediate feedback when an answer is submitted. Rather than replacing human teachers, these smart digital tools empower educators to dedicate more time to creative discussions and personalized guidance.',
        readingPassagePt:
          'A inteligência artificial está transformando a forma como os estudantes aprendem em todo o mundo. Plataformas educacionais interativas agora conseguem adaptar os exercícios ao ritmo pessoal de cada aluno, oferecendo feedback instantâneo no momento em que uma resposta é enviada. Em vez de substituir os professores humanos, essas ferramentas digitais inteligentes capacitam os educadores a dedicar mais tempo a discussões criativas e orientação personalizada.',
        subtitle: 'Read the short text above and select the author\'s main point.',
        subtitlePt: 'Leia o pequeno texto acima e selecione o ponto principal do autor.',
        category: 'Reading Comprehension',
        categoryPt: 'Interpretação de Texto',
        required: true,
        correctAnswer: 'adapt-pace',
        explanation:
          'The passage explicitly explains that educational AI platforms adapt exercises to each student\'s personal pace and allow teachers to dedicate more time to personalized guidance.',
        explanationPt:
          'O texto esclarece expressamente que as plataformas de IA adaptam as lições ao ritmo individual de cada estudante e proporcionam aos professores mais tempo para orientação personalizada.',
        options: [
          { id: 'adapt-pace', label: 'They adapt lessons to individual pace and give teachers more time for guidance', labelPt: 'Elas adaptam as lições ao ritmo individual e dão mais tempo aos professores para orientação', description: 'Directly supported by the text.', descriptionPt: 'Afirmação comprovada diretamente pelo texto.', shortcut: 'A' },
          { id: 'replace-teachers', label: 'They will completely eliminate human teachers and schools', labelPt: 'Elas irão eliminar completamente os professores humanos e as escolas', description: 'Contradicted by the text ("Rather than replacing human teachers...").', descriptionPt: 'Contradito pelo texto ("Rather than replacing human teachers...").', shortcut: 'B' },
          { id: 'twenty-hours', label: 'They force students to study non-stop for twenty hours a day', labelPt: 'Elas obrigam os alunos a estudar sem parar durante vinte horas por dia', description: 'Not stated or suggested in the text.', descriptionPt: 'Informação não mencionada nem sugerida no texto.', shortcut: 'C' },
          { id: 'prevent-sharing', label: 'They forbid students from communicating with classmates', labelPt: 'Elas proíbem os estudantes de conversar com seus colegas de classe', description: 'Contradicted by the emphasis on creative discussions.', descriptionPt: 'Contradito expressamente pelo incentivo a discussões criativas.', shortcut: 'D' },
        ],
      },
      {
        id: 's3-confidence',
        type: 'rating-scale',
        title: 'How confident do you feel reading technology tutorials or game menus in English?',
        titlePt: 'Qual é o seu nível de confiança para ler tutoriais de tecnologia ou menus de jogos em inglês?',
        subtitle: 'Rate your confidence from 1 (struggle to understand) to 10 (understand easily).',
        subtitlePt: 'Avalie sua confiança de 1 (dificuldade para entender) a 10 (entendo com facilidade).',
        category: 'Self-Reflection',
        categoryPt: 'Autoavaliação',
        required: true,
        min: 1,
        max: 10,
        minLabel: 'Struggle to understand',
        minLabelPt: 'Dificuldade para entender',
        maxLabel: 'Understand easily',
        maxLabelPt: 'Entendo com facilidade',
      },
      {
        id: 's3-writing',
        type: 'text',
        title: 'Written Expression: Digital Life',
        titlePt: 'Expressão Escrita: Vida Digital',
        subtitle: 'How does technology or gaming help you learn new things or relax? (Write 1 to 3 sentences in English)',
        subtitlePt: 'Como a tecnologia ou os jogos ajudam você a aprender coisas novas ou a relaxar? (Escreva de 1 a 3 frases em inglês)',
        category: 'Written Expression',
        categoryPt: 'Expressão Escrita',
        required: false,
        placeholder: 'e.g., Playing online games helps me practice English because I have to communicate with players from different countries...',
        placeholderPt: 'Ex.: Playing online games helps me practice English because I have to communicate with players from different countries...',
        maxLength: 500,
      },
    ],
  },

  // ==========================================
  // SECTION 4: Music, Sports & Entertainment
  // ==========================================
  {
    id: 4,
    title: 'Section 4: Music, Sports & Entertainment',
    titlePt: 'Seção 4: Música, Esportes e Entretenimento',
    theme: 'Music & Sports',
    themePt: 'Música & Esportes',
    description: 'Modal verbs of advice, arts vocabulary, performance idioms, and music concentration reading.',
    descriptionPt: 'Verbos modais de conselho, vocabulário de artes, expressões de palco e leitura sobre música e foco.',
    questions: [
      {
        id: 'welcome',
        type: 'welcome',
        title: 'English Language & Proficiency Assignment',
        titlePt: 'Trabalho de Língua Inglesa e Avaliação de Proficiência',
        subtitle:
          'Official English language assessment for Etec de Araçatuba, 3rd Term (Term III), under the supervision of Prof. Fausto Shell. Test your English through sports, music, and leisure topics.',
        subtitlePt:
          'Avaliação oficial de língua inglesa da Etec de Araçatuba, 3º Bimestre, sob a supervisão do Prof. Fausto Shell. Avalie seu inglês por meio de temas de esportes, música e lazer.',
        category: 'Instructions',
        categoryPt: 'Instruções',
      },
      {
        id: 's4-grammar',
        type: 'single-choice',
        title: 'Choose the correct modal verb to give friendly advice:',
        titlePt: 'Escolha o modal verb correto para dar um conselho amigável:',
        subtitle: '"You have been studying for four hours without a break; you _____ rest for twenty minutes."',
        subtitlePt: '"You have been studying for four hours without a break; you _____ rest for twenty minutes." (Você está estudando há quatro horas sem intervalo; você deveria descansar vinte minutos.)',
        category: 'Grammar: Modal Verbs',
        categoryPt: 'Gramática: Modal Verbs',
        required: true,
        correctAnswer: 'should',
        explanation:
          'The modal verb "should" is used to provide constructive suggestions, friendly advice, and sensible recommendations.',
        explanationPt:
          'O modal verb "should" é utilizado para formular recomendações construtivas, sugestões e conselhos amigáveis ("deveria").',
        options: [
          { id: 'should', label: 'Should', labelPt: 'Should', description: 'Standard modal verb used for giving helpful advice and recommendations.', descriptionPt: 'Modal verb padrão para fornecer conselhos amigáveis e recomendações.', shortcut: 'A' },
          { id: 'must-not', label: 'Must not', labelPt: 'Must not', description: 'Expresses strong prohibition, contradicting helpful rest advice.', descriptionPt: 'Expressa proibição estrita ("não deve"), contrariando a sugestão de descanso.', shortcut: 'B' },
          { id: 'cannot', label: 'Cannot', labelPt: 'Cannot', description: 'Expresses physical impossibility or lack of capability.', descriptionPt: 'Expressa impossibilidade física ou incapacidade ("não pode").', shortcut: 'C' },
          { id: 'had', label: 'Had', labelPt: 'Had', description: 'Past tense of "have"; not a modal verb of advice.', descriptionPt: 'Passado do verbo "have"; não funciona como modal de conselho.', shortcut: 'D' },
        ],
      },
      {
        id: 's4-vocab',
        type: 'single-choice',
        title: 'Choose the best word to complete the concert description:',
        titlePt: 'Escolha a melhor palavra para completar a descrição do show:',
        subtitle: '"The band received a warm standing ovation from the enthusiastic _____ at the end of the show."',
        subtitlePt: '"The band received a warm standing ovation from the enthusiastic _____ at the end of the show." (A banda foi calorosamente ovacionada de pé pelo público entusiasmado ao final do show.)',
        category: 'Vocabulary in Context',
        categoryPt: 'Vocabulário em Contexto',
        required: true,
        correctAnswer: 'audience',
        explanation:
          'An "audience" refers to the group of spectators and listeners assembled to watch a live performance, show, or concert.',
        explanationPt:
          '"Audience" refere-se à plateia, público ou grupo de espectadores reunidos para assistir a um concerto ou espetáculo.',
        options: [
          { id: 'audience', label: 'Audience', labelPt: 'Audience', description: 'The spectators and listeners gathered at a live performance or concert.', descriptionPt: 'Espectadores e plateia reunidos para assistir a um show ou concerto.', shortcut: 'A' },
          { id: 'ingredients', label: 'Ingredients', labelPt: 'Ingredients', description: 'Food components and seasonings combined to prepare a culinary dish.', descriptionPt: 'Itens e ingredientes alimentícios combinados na culinária.', shortcut: 'B' },
          { id: 'furniture', label: 'Furniture', labelPt: 'Furniture', description: 'Movable household equipment such as chairs, desks, and tables.', descriptionPt: 'Mobília e móveis domésticos como cadeiras, mesas e sofás.', shortcut: 'C' },
          { id: 'vehicles', label: 'Vehicles', labelPt: 'Vehicles', description: 'Machines used for transportation, such as buses, trucks, and cars.', descriptionPt: 'Veículos automotores de transporte, como carros e ônibus.', shortcut: 'D' },
        ],
      },
      {
        id: 's4-idiom',
        type: 'single-choice',
        title: 'What does the idiom "break a leg" mean in English?',
        titlePt: 'O que significa a expressão "break a leg" em inglês?',
        subtitle: '"You are performing in the theater festival tonight, right? Break a leg!"',
        subtitlePt: '"You are performing in the theater festival tonight, right? Break a leg!" (Você vai se apresentar no festival de teatro hoje à noite, certo? Boa sorte!)',
        category: 'Idiomatic Expressions',
        categoryPt: 'Expressões Idiomáticas',
        required: true,
        correctAnswer: 'good-luck',
        explanation:
          '"Break a leg" is a traditional theatrical idiom used to wish performers good luck and great success before a performance.',
        explanationPt:
          '"Break a leg" é uma expressão tradicional do meio teatral usada para desejar boa sorte e sucesso a atores e músicos antes de subirem ao palco.',
        options: [
          { id: 'good-luck', label: 'Good luck (wishing someone a great performance)', labelPt: 'Boa sorte (desejar uma excelente apresentação)', description: 'Traditional theatrical phrase used to wish success.', descriptionPt: 'Frase tradicional do teatro usada para desejar sucesso e uma ótima performance.', shortcut: 'A' },
          { id: 'injury', label: 'Be careful not to fall and break a bone', labelPt: 'Tenha cuidado para não cair e quebrar um osso', description: 'Literal physical interpretation, not the figurative idiom.', descriptionPt: 'Interpretação física literal, e não a expressão idiomática.', shortcut: 'B' },
          { id: 'cancel', label: 'You should cancel your concert immediately', labelPt: 'Você deveria cancelar sua apresentação imediatamente', description: 'Opposite meaning.', descriptionPt: 'Sentido oposto ao significado da expressão.', shortcut: 'C' },
          { id: 'run-fast', label: 'Run as fast as you can to win a marathon', labelPt: 'Corra o mais rápido que puder para vencer uma maratona', description: 'Unrelated meaning.', descriptionPt: 'Sentido não relacionado.', shortcut: 'D' },
        ],
      },
      {
        id: 's4-prep',
        type: 'single-choice',
        title: 'Which preposition correctly completes the sentence?',
        titlePt: 'Qual preposição completa a frase corretamente?',
        subtitle: '"We usually listen _____ our favorite songs while jogging in the morning."',
        subtitlePt: '"We usually listen _____ our favorite songs while jogging in the morning." (Nós costumamos ouvir nossas músicas favoritas enquanto corremos pela manhã.)',
        category: 'Preposition Collocations',
        categoryPt: 'Regência Preposicional',
        required: true,
        correctAnswer: 'to',
        explanation:
          'The verb "listen" requires the preposition "to" when followed by an object (listen to music, listen to songs, listen to someone).',
        explanationPt:
          'O verbo "listen" exige a preposição "to" quando sucedido por um objeto (listen to music, listen to songs, listen to someone).',
        options: [
          { id: 'to', label: 'To', labelPt: 'To', description: 'Correct collocation: listen to + object or noun.', descriptionPt: 'Regência correta: listen to + objeto ou substantivo.', shortcut: 'A' },
          { id: 'at', label: 'At', labelPt: 'At', description: 'Incorrect preposition with the verb "listen".', descriptionPt: 'Preposição incorreta com o verbo "listen".', shortcut: 'B' },
          { id: 'for', label: 'For', labelPt: 'For', description: '"Listen for" means waiting to detect a specific sound, not enjoying music.', descriptionPt: '"Listen for" significa ficar atento esperando ouvir um sinal sonoro específico, não apreciar músicas.', shortcut: 'C' },
          { id: 'on', label: 'On', labelPt: 'On', description: 'Incorrect preposition with the verb "listen".', descriptionPt: 'Preposição incorreta com o verbo "listen".', shortcut: 'D' },
        ],
      },
      {
        id: 's4-reading',
        type: 'single-choice',
        title: 'According to the passage, why can calm instrumental music help while studying?',
        titlePt: 'Segundo o texto, por que músicas instrumentais calmas podem ajudar nos estudos?',
        readingPassage:
          'Listening to music while studying is a popular habit among students worldwide. Scientific studies suggest that calm instrumental melodies can lower stress levels and enhance mental concentration during complex tasks. However, listening to loud songs with lyrics may sometimes distract the brain when memorizing vocabulary. Selecting the right playlist is the key to maintaining focus.',
        readingPassagePt:
          'Ouvir música enquanto estuda é um hábito popular entre estudantes de todo o mundo. Estudos científicos sugerem que melodias instrumentais calmas podem reduzir os níveis de estresse e aprimorar a concentração mental durante tarefas complexas. No entanto, ouvir músicas altas com letras pode às vezes distrair o cérebro durante a memorização de vocabulário. Escolher a playlist adequada é o segredo para manter o foco.',
        subtitle: 'Read the short excerpt above and select the correct scientific finding.',
        subtitlePt: 'Leia o pequeno trecho acima e selecione a constatação científica correta.',
        category: 'Reading Comprehension',
        categoryPt: 'Interpretação de Texto',
        required: true,
        correctAnswer: 'lower-stress',
        explanation:
          'The text explicitly states: "calm instrumental melodies can lower stress levels and enhance mental concentration during complex tasks."',
        explanationPt:
          'O texto afirma explicitamente que "calm instrumental melodies can lower stress levels and enhance mental concentration during complex tasks" (melodias instrumentais calmas podem reduzir os níveis de estresse e aprimorar a concentração mental).',
        options: [
          { id: 'lower-stress', label: 'It can lower stress levels and enhance mental concentration', labelPt: 'Pode reduzir os níveis de estresse e aprimorar a concentração mental', description: 'Directly supported by the second sentence of the text.', descriptionPt: 'Afirmação comprovada diretamente pela segunda frase do texto.', shortcut: 'A' },
          { id: 'piano-hours', label: 'It teaches you how to play the piano in three hours', labelPt: 'Ensina você a tocar piano em três horas', description: 'Not stated or suggested in the passage.', descriptionPt: 'Informação não mencionada no texto.', shortcut: 'B' },
          { id: 'no-homework', label: 'It automatically does your homework for you', labelPt: 'Faz a lição de casa automaticamente por você', description: 'Incorrect and fictional.', descriptionPt: 'Incorreto e fictício.', shortcut: 'C' },
          { id: 'no-sleep', label: 'It makes sleeping completely unnecessary for students', labelPt: 'Torna o sono totalmente desnecessário para os estudantes', description: 'Contradicted by scientific facts and the text.', descriptionPt: 'Contradito pelos fatos e pelo bom senso.', shortcut: 'D' },
        ],
      },
      {
        id: 's4-confidence',
        type: 'rating-scale',
        title: 'How confident do you feel understanding songs or movie subtitles in English?',
        titlePt: 'Qual é o seu nível de confiança para entender letras de música ou legendas de filmes em inglês?',
        subtitle: 'Rate your confidence from 1 (rarely understand) to 10 (understand very well).',
        subtitlePt: 'Avalie sua confiança de 1 (raramente entendo) a 10 (entendo muito bem).',
        category: 'Self-Reflection',
        categoryPt: 'Autoavaliação',
        required: true,
        min: 1,
        max: 10,
        minLabel: 'Rarely understand',
        minLabelPt: 'Raramente entendo',
        maxLabel: 'Understand very well',
        maxLabelPt: 'Entendo muito bem',
      },
      {
        id: 's4-writing',
        type: 'text',
        title: 'Written Expression: Music & Free Time',
        titlePt: 'Expressão Escrita: Música e Lazer',
        subtitle: 'What kind of music or sport do you enjoy most, and how does it make you feel? (Write 1 to 3 sentences in English)',
        subtitlePt: 'Que tipo de música ou esporte você mais gosta e como isso faz você se sentir? (Escreva de 1 a 3 frases em inglês)',
        category: 'Written Expression',
        categoryPt: 'Expressão Escrita',
        required: false,
        placeholder: 'e.g., I love listening to rock music while studying because it motivates me and gives me energy...',
        placeholderPt: 'Ex.: I love listening to rock music while studying because it motivates me and gives me energy...',
        maxLength: 500,
      },
    ],
  },

  // ==========================================
  // SECTION 5: Nature, Environment & Future
  // ==========================================
  {
    id: 5,
    title: 'Section 5: Nature, Environment & Future',
    titlePt: 'Seção 5: Natureza, Meio Ambiente e Futuro',
    theme: 'Nature & Environment',
    themePt: 'Natureza & Meio Ambiente',
    description: 'Second conditional, eco vocabulary, perseverance idioms, and urban ecology reading.',
    descriptionPt: 'Segunda condicional, vocabulário ecológico, expressões de perseverança e leitura sobre ecologia urbana.',
    questions: [
      {
        id: 'welcome',
        type: 'welcome',
        title: 'English Language & Proficiency Assignment',
        titlePt: 'Trabalho de Língua Inglesa e Avaliação de Proficiência',
        subtitle:
          'Official English language assessment for Etec de Araçatuba, 3rd Term (Term III), under the supervision of Prof. Fausto Shell. Test your English on environment, conservation, and sustainability themes.',
        subtitlePt:
          'Avaliação oficial de língua inglesa da Etec de Araçatuba, 3º Bimestre, sob a supervisão do Prof. Fausto Shell. Avalie seu inglês em temas de meio ambiente, preservação e sustentabilidade.',
        category: 'Instructions',
        categoryPt: 'Instruções',
      },
      {
        id: 's5-grammar',
        type: 'single-choice',
        title: 'Complete the sentence with the correct hypothetical form:',
        titlePt: 'Complete a frase com a forma hipotética correta:',
        subtitle: '"If our city had more bicycle lanes, more people _____ their bikes to school."',
        subtitlePt: '"If our city had more bicycle lanes, more people _____ their bikes to school." (Se nossa cidade tivesse mais ciclovias, mais pessoas iriam de bicicleta para a escola.)',
        category: 'Grammar: Second Conditional',
        categoryPt: 'Gramática: Second Conditional',
        required: true,
        correctAnswer: 'would-ride',
        explanation:
          'Second conditional sentences express hypothetical or unreal present/future situations: "If + Simple Past" (had), the main clause uses "would + base verb" (would ride).',
        explanationPt:
          'A estrutura do Second Conditional expressa situações hipotéticas ou irreais no presente ou futuro: "If + Simple Past" (had), com a oração principal utilizando "would + verbo base" (would ride).',
        options: [
          { id: 'would-ride', label: 'Would ride', labelPt: 'Would ride', description: 'Second conditional main clause: would + base verb.', descriptionPt: 'Oração principal da segunda condicional: would + verbo na forma base.', shortcut: 'A' },
          { id: 'will-rode', label: 'Will rode', labelPt: 'Will rode', description: 'Grammatically incorrect combination of modal "will" with past tense.', descriptionPt: 'Combinação gramaticalmente incorreta do modal "will" com verbo no passado.', shortcut: 'B' },
          { id: 'rode', label: 'Rode', labelPt: 'Rode', description: 'Simple past alone; lacks the required auxiliary modal "would".', descriptionPt: 'Apenas passado simples; carece do verbo auxiliar modal "would".', shortcut: 'C' },
          { id: 'are-riding', label: 'Are riding', labelPt: 'Are riding', description: 'Present continuous; does not match a hypothetical conditional.', descriptionPt: 'Presente contínuo; não corresponde à estrutura de uma oração condicional hipotética.', shortcut: 'D' },
        ],
      },
      {
        id: 's5-vocab',
        type: 'single-choice',
        title: 'Choose the word that best completes the environmental advice:',
        titlePt: 'Escolha a palavra que melhor completa a recomendação ecológica:',
        subtitle: '"Turning off the tap while brushing your teeth helps _____ valuable clean water."',
        subtitlePt: '"Turning off the tap while brushing your teeth helps _____ valuable clean water." (Fechar a torneira enquanto escova os dentes ajuda a economizar água potável valiosa.)',
        category: 'Vocabulary in Context',
        categoryPt: 'Vocabulário em Contexto',
        required: true,
        correctAnswer: 'save',
        explanation:
          'To "save" in this context means to conserve, preserve, and prevent the needless waste of natural resources like drinking water.',
        explanationPt:
          'O verbo "save" neste contexto significa economizar, preservar e evitar o desperdício de recursos naturais essenciais, como a água tratada.',
        options: [
          { id: 'save', label: 'Save', labelPt: 'Save', description: 'To conserve and prevent the waste of natural resources.', descriptionPt: 'Economizar, preservar e evitar o desperdício de recursos naturais.', shortcut: 'A' },
          { id: 'waste', label: 'Waste', labelPt: 'Waste', description: 'To use carelessly or squander (opposite meaning).', descriptionPt: 'Desperdiçar ou consumir descuidadamente (sentido oposto).', shortcut: 'B' },
          { id: 'ignore', label: 'Ignore', labelPt: 'Ignore', description: 'To refuse to pay attention to something.', descriptionPt: 'Ignorar ou deixar de prestar atenção a algo.', shortcut: 'C' },
          { id: 'break', label: 'Break', labelPt: 'Break', description: 'To damage or separate an object into pieces.', descriptionPt: 'Quebrar, romper ou danificar fisicamente um objeto em pedaços.', shortcut: 'D' },
        ],
      },
      {
        id: 's5-idiom',
        type: 'single-choice',
        title: 'What does the phrasal verb "to give up" mean?',
        titlePt: 'O que significa o phrasal verb "to give up"?',
        subtitle: '"Learning English takes continuous practice and patience, so don\'t give up!"',
        subtitlePt: '"Learning English takes continuous practice and patience, so don\'t give up!" (Aprender inglês exige prática contínua e paciência, portanto não desista!)',
        category: 'Phrasal Verbs',
        categoryPt: 'Phrasal Verbs',
        required: true,
        correctAnswer: 'quit',
        explanation:
          'The phrasal verb "to give up" means to stop making an effort, quit, or surrender when facing a challenge.',
        explanationPt:
          'O phrasal verb "to give up" significa parar de tentar, desistir ou render-se diante de um obstáculo ou desafio.',
        options: [
          { id: 'quit', label: 'To stop trying or surrender when facing a challenge', labelPt: 'Parar de tentar ou desistir diante de um desafio', description: 'Abandoning an effort or admitting defeat.', descriptionPt: 'Abandonar um esforço ou conformar-se com a derrota (desistir).', shortcut: 'A' },
          { id: 'present', label: 'To give a physical gift to a teacher', labelPt: 'Dar um presente físico para um professor', description: 'Literal gift meaning, not the figurative phrasal verb.', descriptionPt: 'Sentido literal de presentear, que não corresponde ao phrasal verb.', shortcut: 'B' },
          { id: 'shout', label: 'To shout loudly in a classroom', labelPt: 'Gritar alto em uma sala de aula', description: 'Unrelated meaning.', descriptionPt: 'Sentido não relacionado.', shortcut: 'C' },
          { id: 'celebrate', label: 'To celebrate a successful victory with classmates', labelPt: 'Comemorar uma vitória com os colegas', description: 'Opposite meaning.', descriptionPt: 'Sentido oposto ao significado da expressão.', shortcut: 'D' },
        ],
      },
      {
        id: 's5-prep',
        type: 'single-choice',
        title: 'Which preposition correctly completes the sentence?',
        titlePt: 'Qual preposição completa a regência corretamente?',
        subtitle: '"Every student is responsible _____ keeping their desk and computer station clean."',
        subtitlePt: '"Every student is responsible _____ keeping their desk and computer station clean." (Todo aluno é responsável por manter sua mesa e computador limpos.)',
        category: 'Preposition Collocations',
        categoryPt: 'Regência Preposicional',
        required: true,
        correctAnswer: 'for',
        explanation:
          'The adjective "responsible" collocates with the preposition "for" (responsible for something / responsible for doing something).',
        explanationPt:
          'O adjetivo "responsible" rege obrigatoriamente a preposição "for" em inglês (responsible for something / responsible for doing something).',
        options: [
          { id: 'for', label: 'For', labelPt: 'For', description: 'Correct collocation: responsible for + noun or gerund verb.', descriptionPt: 'Regência correta: responsible for + substantivo ou verbo no gerúndio (-ing).', shortcut: 'A' },
          { id: 'with', label: 'With', labelPt: 'With', description: 'Incorrect preposition with the adjective "responsible".', descriptionPt: 'Preposição incorreta com o adjetivo "responsible".', shortcut: 'B' },
          { id: 'to', label: 'To', labelPt: 'To', description: 'Used when referring to an authority ("responsible to a supervisor"), but tasks require "for".', descriptionPt: 'Usado ao responder a uma autoridade ("responsible to a supervisor"), mas deveres e tarefas exigem "for".', shortcut: 'C' },
          { id: 'in', label: 'In', labelPt: 'In', description: 'Incorrect preposition with the adjective "responsible".', descriptionPt: 'Preposição incorreta com o adjetivo "responsible".', shortcut: 'D' },
        ],
      },
      {
        id: 's5-reading',
        type: 'single-choice',
        title: 'What is one major benefit of urban trees mentioned in the text?',
        titlePt: 'Qual é um dos principais benefícios das árvores urbanas citados no texto?',
        readingPassage:
          'Urban trees provide tremendous benefits to modern communities. They purify the air by absorbing carbon dioxide, provide refreshing shade during hot summer days, and reduce city noise. Furthermore, research reveals that students who have views of green parks from their classroom windows feel calmer and score higher on creative problem-solving tests. Protecting nature is essential for a healthy school environment.',
        readingPassagePt:
          'As árvores urbanas proporcionam benefícios extraordinários às comunidades modernas. Elas purificam o ar ao absorver dióxido de carbono, oferecem sombra refrescante nos dias quentes de verão e reduzem o ruído urbano. Além disso, pesquisas revelam que estudantes que têm vista para parques arborizados a partir das janelas da sala de aula sentem-se mais calmos e obtêm pontuações mais altas em testes criativos de resolução de problemas. Proteger a natureza é fundamental para um ambiente escolar saudável.',
        subtitle: 'Read the short environmental passage above and select the correct benefit.',
        subtitlePt: 'Leia o pequeno trecho ambiental acima e selecione o benefício correto.',
        category: 'Reading Comprehension',
        categoryPt: 'Interpretação de Texto',
        required: true,
        correctAnswer: 'purify',
        explanation:
          'The passage explicitly states that urban trees absorb carbon dioxide, reduce city noise, provide shade, and help students feel calmer.',
        explanationPt:
          'O texto cita expressamente que as árvores urbanas absorvem dióxido de carbono, reduzem o ruído, proporcionam sombra e auxiliam os estudantes a se sentirem mais tranquilos.',
        options: [
          { id: 'purify', label: 'They absorb carbon dioxide, reduce noise, and help students feel calmer', labelPt: 'Elas absorvem dióxido de carbono, reduzem ruídos e ajudam os alunos a se sentirem mais calmos', description: 'Supported directly throughout the text.', descriptionPt: 'Benefício comprovado diretamente ao longo do texto.', shortcut: 'A' },
          { id: 'wifi', label: 'They broadcast free wireless internet signals across the school', labelPt: 'Elas transmitem sinal de internet sem fio gratuito por toda a escola', description: 'Unrelated and fictitious.', descriptionPt: 'Informação não relacionada e fictícia.', shortcut: 'B' },
          { id: 'no-exams', label: 'They completely eliminate the need for school tests', labelPt: 'Elas eliminam completamente a necessidade de provas escolares', description: 'Not stated or suggested in the passage.', descriptionPt: 'Afirmação não mencionada no texto.', shortcut: 'C' },
          { id: 'fast-cars', label: 'They make sports cars drive twice as fast on roads', labelPt: 'Elas fazem os carros esportivos andarem com o dobro da velocidade nas ruas', description: 'Contradicted by the text and reality.', descriptionPt: 'Afirmação absurda e contradita pelo texto.', shortcut: 'D' },
        ],
      },
      {
        id: 's5-confidence',
        type: 'rating-scale',
        title: 'How confident do you feel talking about everyday habits or the environment in English?',
        titlePt: 'Qual é o seu nível de confiança para conversar sobre hábitos diários ou meio ambiente em inglês?',
        subtitle: 'Rate your confidence from 1 (still learning basics) to 10 (feel comfortable).',
        subtitlePt: 'Avalie sua confiança de 1 (ainda aprendendo o básico) a 10 (sinto-me confortável).',
        category: 'Self-Reflection',
        categoryPt: 'Autoavaliação',
        required: true,
        min: 1,
        max: 10,
        minLabel: 'Still learning basics',
        minLabelPt: 'Ainda aprendendo o básico',
        maxLabel: 'Feel comfortable',
        maxLabelPt: 'Sinto-me confortável',
      },
      {
        id: 's5-writing',
        type: 'text',
        title: 'Written Expression: Protecting Nature',
        titlePt: 'Expressão Escrita: Protegendo a Natureza',
        subtitle: 'What is one simple habit we can do every day to protect our environment? (Write 1 to 3 sentences in English)',
        subtitlePt: 'Qual é um hábito simples que podemos praticar todos os dias para proteger o meio ambiente? (Escreva de 1 a 3 frases em inglês)',
        category: 'Written Expression',
        categoryPt: 'Expressão Escrita',
        required: false,
        placeholder: 'e.g., We can save energy by turning off the lights when we leave a room and recycling plastic bottles...',
        placeholderPt: 'Ex.: We can save energy by turning off the lights when we leave a room and recycling plastic bottles...',
        maxLength: 500,
      },
    ],
  },
];

export function getSectionById(sectionId: number): QuestionSection {
  const found = QUESTION_SECTIONS.find((s) => s.id === sectionId);
  return found || QUESTION_SECTIONS[0];
}

export function getRandomSectionId(): number {
  return Math.floor(Math.random() * QUESTION_SECTIONS.length) + 1;
}

export function calculateAssignmentGrade(
  answers: AnswersState,
  questions: Question[],
  studentName?: string,
  elapsedSeconds?: number,
  sectionTitle?: string,
  language: Language = 'en'
): AssignmentGrade {
  const gradedQuestions = questions.filter((q) => q.correctAnswer !== undefined);
  let correctCount = 0;

  gradedQuestions.forEach((q) => {
    if (answers[q.id] === q.correctAnswer) {
      correctCount += 1;
    }
  });

  const totalQuestions = gradedQuestions.length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  const isPt = language === 'pt';

  let letterGrade = 'A';
  let cefrLevel = isPt ? 'B1+ (Intermediário)' : 'B1+ (Intermediate)';
  let title = isPt ? 'Ótimo Desempenho em Inglês!' : 'Great English Performance!';
  let summary = isPt
    ? 'Muito bem! Você demonstrou uma boa compreensão de gramática, vocabulário prático, expressões idiomáticas e interpretação de texto.'
    : 'Well done! You demonstrated a good understanding of grammar, practical vocabulary, common idioms, and reading comprehension.';
  const recommendations = isPt
    ? [
        'Continue praticando inglês com músicas, podcasts e séries com legendas em inglês.',
        'Revise regências preposicionais e conjugações verbais para aumentar ainda mais sua fluência.',
      ]
    : [
        'Keep practicing English with songs, podcasts, and series with English subtitles.',
        'Review preposition collocations and verb conjugations to further improve your fluency.',
      ];

  if (percentage === 100) {
    letterGrade = 'A+';
    cefrLevel = isPt ? 'B2 (Intermediário Superior)' : 'B2 (Upper-Intermediate)';
    title = isPt ? 'Desempenho Extraordinário! 🌟' : 'Outstanding Performance! 🌟';
    summary = isPt
      ? 'Pontuação perfeita! Você acertou todas as questões, demonstrando excelente domínio da gramática, precisão de vocabulário e interpretação textual impecável.'
      : 'Perfect score! You answered every question correctly, demonstrating great attention to grammar, vocabulary precision, and clear reading comprehension.';
  } else if (percentage >= 80) {
    letterGrade = 'A';
    cefrLevel = isPt ? 'B1+ (Intermediário Avançado)' : 'B1+ (Strong Intermediate)';
    title = isPt ? 'Excelente Domínio do Inglês!' : 'Excellent English Command!';
    summary = isPt
      ? 'Ótimo trabalho! Você demonstrou domínio consistente das estruturas cotidianas do inglês, vocabulário exato e compreensão de leitura.'
      : 'Great work! You demonstrated solid mastery of everyday English structures, accurate vocabulary, and reading comprehension.';
  } else if (percentage >= 60) {
    letterGrade = 'B';
    cefrLevel = isPt ? 'B1 (Intermediário)' : 'B1 (Intermediate)';
    title = isPt ? 'Bom Esforço e Compreensão!' : 'Good Effort & Understanding!';
    summary = isPt
      ? 'Bom trabalho! Você possui uma base sólida em gramática e vocabulário básico. Revisar o gabarito comentado abaixo ajudará a consolidar seu aprendizado.'
      : 'Good job! You have a solid grasp of basic grammar and vocabulary. Reviewing the answer key below will help you solidify your knowledge.';
    recommendations.unshift(
      isPt
        ? 'Revise as regras gramaticais e regências no gabarito comentado abaixo.'
        : 'Review the grammar rules and preposition patterns in the answer key below.'
    );
  } else {
    letterGrade = 'C';
    cefrLevel = isPt ? 'A2 (Básico / Em Desenvolvimento)' : 'A2 (Elementary / Developing)';
    title = isPt ? 'Continue Estudando e Praticando!' : 'Keep Learning & Practicing!';
    summary = isPt
      ? 'Você está desenvolvendo as bases da língua inglesa. Não desista! Revise as explicações de cada questão no gabarito comentado abaixo para aprender os padrões corretos.'
      : 'You are developing your English foundations. Don’t give up! Review each question’s explanation below to learn the correct patterns.';
    recommendations.unshift(
      isPt
        ? 'Pratique vocabulário do dia a dia e tempos verbais com leituras curtas diárias.'
        : 'Practice everyday vocabulary and verb tenses with short daily reading exercises.'
    );
  }

  const grammarScore = Math.round(percentage);
  const vocabScore = Math.max(50, Math.round(percentage));
  const readingScore = Math.max(60, Math.round(percentage));

  return {
    studentName,
    elapsedSeconds,
    sectionTitle,
    score: correctCount,
    totalQuestions,
    percentage,
    letterGrade,
    cefrLevel,
    title,
    summary,
    competencies: isPt
      ? [
          { label: 'Gramática & Tempos Verbais', score: grammarScore },
          { label: 'Vocabulário & Expressões Práticas', score: vocabScore },
          { label: 'Interpretação de Texto', score: readingScore },
          { label: 'Fluência Geral em Inglês', score: Math.max(70, percentage) },
        ]
      : [
          { label: 'Grammar & Verb Tenses', score: grammarScore },
          { label: 'Vocabulary & Everyday Phrases', score: vocabScore },
          { label: 'Reading Comprehension', score: readingScore },
          { label: 'Overall English Fluency', score: Math.max(70, percentage) },
        ],
    recommendations,
  };
}
