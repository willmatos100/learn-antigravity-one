// ─── KNOWLEDGE BASE — William Matos ────────────────────────────────────────
const KB = {
  identidade: `Me chamo William Matos, mas todo mundo me chama de Will. Sou Staff Product Designer, especialista em DesignOps e ativismo de acessibilidade digital. Moro em São Paulo (Vila Carrão). Tenho mais de 20 anos de experiência — comecei como web designer e fui evoluindo até gestão e arquitetura de sistemas de design.`,

  contato: `Pode me achar no LinkedIn (linkedin.com/in/willmatos), pelo e-mail willmatos100@gmail.com ou pelo portfólio no Dribbble (dribbble.com/willmatos) e Pinterest (pinterest.com/willmatos/portfolio).`,

  sulamerica: `Desde dezembro de 2023 estou na SulAmérica como Staff Product Designer & DesignOps. Trabalho no núcleo estratégico de Ops — escalonamento de componentes, padrões operacionais, governança corporativa de design e liderança técnica de estruturas de produção.`,

  picpay: `Fiquei no PicPay de dezembro de 2019 a junho de 2023 — quase 4 anos com três promoções: Product Designer → DesignOps & Design System → Design Manager. Construí o sistema de design conta PJ do zero, tokens, componentes responsivos Web/iOS/Android, documentação no ZeroHeight. Como manager, cuidei de PDI, 1:1, trilha de carreira, Design Critiques, Reviews, Workshops e colaboração com UX Research, Content Design e ProductOps.`,

  praxio: `Na Praxio Tecnologia de 2016 a 2019 — setor de transporte corporativo. Implementei Lean UX, Service Design (Lean Canvas, Business Model Canvas), UX Research com testes remotos e presenciais, e desenvolvi Design Systems para WebApps e Mobile. Também publicava artigos de UX no Medium durante esse período.`,

  comuniclick: `Na ComuniClick de 2011 a 2016 como Design Manager. Liderava equipe de criação e frontend: sites institucionais, e-commerce, intranets, campanhas digitais. Fazia testes de usabilidade com Camtasia, SEO e Google Analytics. Foi onde desenvolvi a liderança de time.`,

  fullhaus: `Na Full Haus de 2010 a 2011 como Diretor de Arte. Campanhas digitais, identidade visual, mídia impressa, hotsites. Base sólida em direção criativa e comunicação visual.`,

  inicio: `Comecei em 2005 como instrutor de web design na Microcamp. Depois passei pela Webbusiness (2006–2009) com projetos de hotelaria e turismo, e pela All Click (2009–2011) fazendo frontend e arquitetura de informação.`,

  educacao: `Formado em Publicidade e Propaganda pela Universidade São Judas Tadeu (2009–2012). Além disso, tenho uma lista enorme de cursos: UX Metrics, Business Design, Design System Ops, OKR, Design Sprints, Product Design (Udacity), Strategic Design, Service Design, UX Research, Agile Leadership, NLP Master Practitioner... continua.`,

  skills: `Stack principal: Design Systems, DesignOps, Figma, ZeroHeight, UX Research, Lean UX, Dual Track Sprints, Service Design, Design Sprints 2.0, OKR, Agile/Scrum, liderança de chapter e gestão de comunidades de design. Tenho também base em HTML, CSS, Google Analytics, Looker e Blender 3D.`,

  acessibilidade: `Acessibilidade é uma causa pessoal. Participei da co-tradução oficial do WCAG 2.2 para português pelo Instituto Equidade Plural (INSEP). Foi um marco real para a inclusão digital no Brasil e no mundo lusófono — e continua sendo parte central do trabalho que faço.`,

  designsystem: `Design Systems são infraestrutura viva, não só biblioteca de componentes. No PicPay construí do zero com tokens, componentes responsivos para Web/iOS/Android, documentação no ZeroHeight e governança via Figma Organizations. Na SulAmérica escalo padrões corporativos com estrutura de governança real.`,

  designops: `DesignOps é meu core. Organização de ritos (Design Critiques, Reviews, Workshops), RACI, PDI, 1:1, trilha de carreira, guias de processo, onboarding de designers, métricas de maturidade de design. A operação de design tem que funcionar como sistema — previsível e escalável.`,

  lideranca: `Já liderei times com designers, desenvolvedores frontend, ilustradores e community managers. Foco em pessoas: PDI, 1:1, trilha de carreira e ritos saudáveis. Uma das recomendações que recebi diz que "fui o líder que a pessoa não sabia que precisava". Isso significa muito pra mim.`,

  recomendacoes: `Eric Cerqueira (Praxio/Tako) disse: "William é uma espécie de unicórnio em meio a outros designers, entende o processo como um todo, da pesquisa até a entrega, da produção ao gerenciamento." Marina Galsi (PicPay) disse que fui o líder que ela não sabia que precisava — e que fiz uma diferença enorme na carreira dela.`,

  publicacoes: `Escrevi artigos no Medium sobre UI Colors em design systems e sobre as diferenças entre UX, UI, CX e BX. Também tenho um livro publicado: "Intenso: Poesias para incendiar o coração" — disponível na Amazon Brasil.`,

  livro: `Sim, publiquei um livro de poesia: "Intenso: Poesias para incendiar o coração". Disponível na Amazon Brasil (amazon.com.br/dp/B0BZ8393XF). Design e palavras andam juntos.`,

  idiomas: `Português nativo, inglês intermediário.`,

  hobbies: `Além do trabalho: fotografia, cozinha vegana, meditação, xadrez, leitura, caminhadas, yoga, poesia, viagens e pesquisas em psicologia e inovação. Sou também praticante de NLP (Master Practitioner).`,

  resumo_carreira: `Mais de 20 anos de trajetória: Microcamp (2005) → Webbusiness → All Click → Full Haus → ComuniClick (2011-2016) → Praxio (2016-2019) → PicPay (2019-2023, 3 promoções) → SulAmérica (2023, atual). Sempre no eixo de sistemas, governança e escala.`,
}

// ─── REGRAS DE MATCHING ──────────────────────────────────────────────────────
const RULES = [
  { keys: ['oi', 'olá', 'ola', 'hello', 'hi', 'hey', 'bom dia', 'boa tarde', 'boa noite', 'tudo bem', 'tudo bom', 'e aí', 'eai', 'salve', 'opa'],
    reply: `Oi! Que bom ter você por aqui. Pode me perguntar o que quiser — carreira, projetos, acessibilidade, ou qualquer coisa sobre mim. Tô por aqui.` },

  { keys: ['obrigad', 'valeu', 'thanks', 'thank you', 'agradeço', 'agradec'],
    reply: `Imagina! Se tiver mais alguma dúvida, é só chamar.` },

  { keys: ['quem é você', 'quem vc', 'se apresenta', 'fala sobre você', 'fala de você', 'quem é o will', 'quem é william'],
    reply: KB.identidade },

  { keys: ['sulamerica', 'sul américa', 'sul america'],
    reply: KB.sulamerica },

  { keys: ['picpay', 'pic pay'],
    reply: KB.picpay },

  { keys: ['praxio'],
    reply: KB.praxio },

  { keys: ['comuniclick', 'comuni click', 'agencia', 'agência'],
    reply: KB.comuniclick },

  { keys: ['full haus', 'fullhaus', 'diretor de arte'],
    reply: KB.fullhaus },

  { keys: ['carreira', 'experiência', 'experiencia', 'historico', 'histórico', 'timeline', 'empresas', 'onde trabalhou', 'trajetória', 'trajetoria'],
    reply: KB.resumo_carreira },

  { keys: ['wcag', 'acessibilidade', 'a11y', 'insep', 'inclusão', 'inclusao', 'acessível', 'acessivel'],
    reply: KB.acessibilidade },

  { keys: ['design system', 'design systems', 'componente', 'token', 'figma', 'zeroheight', 'biblioteca'],
    reply: KB.designsystem },

  { keys: ['designops', 'design ops', 'governança', 'governanca', 'operação', 'operacao', 'rito', 'critique'],
    reply: KB.designops },

  { keys: ['skill', 'habilidade', 'ferramenta', 'stack', 'domina', 'conhecimento', 'tecnologia', 'sabe fazer'],
    reply: KB.skills },

  { keys: ['liderança', 'lideranca', 'gestão', 'gestao', 'manager', 'time', 'equipe', 'pessoas', 'lider', 'líder'],
    reply: KB.lideranca },

  { keys: ['recomendação', 'recomendacao', 'recomenda', 'falam de', 'disseram'],
    reply: KB.recomendacoes },

  { keys: ['livro', 'poesia', 'poema', 'intenso', 'amazon', 'publicou'],
    reply: KB.livro },

  { keys: ['artigo', 'medium', 'publicação', 'publicacao', 'escreveu', 'texto'],
    reply: KB.publicacoes },

  { keys: ['formação', 'formacao', 'faculdade', 'universidade', 'são judas', 'sao judas', 'graduação', 'graduacao', 'curso', 'certificado'],
    reply: KB.educacao },

  { keys: ['idioma', 'inglês', 'ingles', 'português', 'portugues', 'língua', 'lingua', 'fala inglês'],
    reply: KB.idiomas },

  { keys: ['hobby', 'hobbies', 'gosta', 'faz fora', 'lazer', 'pessoal', 'vegan', 'yoga', 'xadrez', 'fotografia', 'meditação'],
    reply: KB.hobbies },

  { keys: ['contato', 'contratar', 'hire', 'falar', 'email', 'e-mail', 'linkedin', 'vaga', 'oportunidade', 'freelance'],
    reply: KB.contato },

  { keys: ['onde mora', 'cidade', 'são paulo', 'sao paulo', 'localização', 'localizacao'],
    reply: `Moro em São Paulo, no bairro Vila Carrão.` },

  { keys: ['atual', 'hoje', 'agora', 'staff', 'trabalhando'],
    reply: KB.sulamerica },

  { keys: ['portfólio', 'portfolio', 'trabalhos', 'projetos', 'dribbble', 'behance', 'pinterest'],
    reply: `Portfólio no Pinterest (pinterest.com/willmatos/portfolio), Dribbble (dribbble.com/willmatos) e Behance (behance.net/willmatos).` },

  { keys: ['idade', 'quantos anos', 'nasceu', 'nascimento'],
    reply: `Não divulgo minha idade, mas comecei a carreira como designer em 2006 — ou seja, ${new Date().getFullYear() - 2006} anos de experiência. Experiente o suficiente pra saber o que funciona, jovem o suficiente pra continuar aprendendo.` },
]

// ─── ENGINE ──────────────────────────────────────────────────────────────────
function matchRule(input) {
  const lower = input.toLowerCase()
  for (const rule of RULES) {
    if (rule.keys.some(k => lower.includes(k))) return rule.reply
  }
  return null
}

const QUESTION_WORDS = [
  'quem é ', 'quem foi ', 'o que é ', 'o que foi ', 'o que são ', 'me fala sobre ',
  'fala sobre ', 'o que significa ', 'what is ', 'who is ', 'who was ', 'what are ',
  'me explica ', 'explica ', 'conta sobre ', 'como funciona ', 'qual é ',
]

function extractSearchTerm(input) {
  let q = input.toLowerCase().trim().replace(/\?$/, '').trim()
  for (const w of QUESTION_WORDS) {
    if (q.startsWith(w)) { q = q.slice(w.length).trim(); break }
  }
  return q
}

async function searchWikipedia(input) {
  const term = extractSearchTerm(input)
  if (term.length < 3) return null
  try {
    const lang = /^[a-zA-Z\s]+$/.test(term) ? 'en' : 'pt'
    const searchUrl = `https://${lang}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(term)}&format=json&origin=*&srlimit=1`
    const { query } = await (await fetch(searchUrl)).json()
    const title = query?.search?.[0]?.title
    if (!title) return null

    const summaryUrl = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
    const data = await (await fetch(summaryUrl)).json()
    const extract = data?.extract?.split('\n')[0]?.slice(0, 320)
    if (!extract) return null

    return `${extract}... — pergunta interessante! Se quiser saber sobre minha carreira ou projetos, pode perguntar também.`
  } catch {
    return null
  }
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)) }

export function initNeuralChat() {
  const form       = document.getElementById('chat-form')
  const input      = document.getElementById('chat-input')
  const messagesEl = document.getElementById('chat-messages')
  if (!form || !input || !messagesEl) return

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const text = input.value.trim()
    if (!text || input.disabled) return

    appendMessage('user', text)
    input.value = ''
    input.disabled = true

    const loadingEl = appendLoading()

    await delay(500 + Math.random() * 600)
    loadingEl.remove()
    const reply = matchRule(text) ?? `Essa eu não sei responder por aqui. Mas pode me perguntar sobre minha carreira, projetos, Design Systems ou acessibilidade!`
    appendMessage('assistant', reply)

    input.disabled = false
    input.focus()
  })

  function appendMessage(role, text) {
    const label = role === 'user' ? 'VISITOR.INPUT' : 'WILL.SYS'
    const div = document.createElement('div')
    div.className = `chat-msg ${role}-msg`
    div.innerHTML = `<span class="mono-label msg-label">${label}</span><p>${escapeHtml(text)}</p>`
    messagesEl.appendChild(div)
    messagesEl.scrollTop = messagesEl.scrollHeight
  }

  function appendLoading() {
    const div = document.createElement('div')
    div.className = 'chat-msg assistant-msg'
    div.innerHTML = `<span class="mono-label msg-label">WILL.SYS</span><p class="typing-dots"><span>.</span><span>.</span><span>.</span></p>`
    messagesEl.appendChild(div)
    messagesEl.scrollTop = messagesEl.scrollHeight
    return div
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>')
  }
}
