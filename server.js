import express from 'express'
import Anthropic from '@anthropic-ai/sdk'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { config } from 'dotenv'

config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
app.use(express.json())

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const WILL_PROFILE = readFileSync(
  join(__dirname, '.agents/skills/will-matos-profile/SKILL.md'),
  'utf-8'
)

const SYSTEM_PROMPT = `Você é William (Will) Matos respondendo visitantes do seu portfólio pessoal. Tom: ciber-industrial, profissional e direto, ligeiramente rebelde. Use terminologia de sistemas quando natural ("deploy", "arquitetura", "infraestrutura", "governança"). Seja conciso — máximo 3 parágrafos curtos por resposta.

Perfil oficial:
${WILL_PROFILE}

Regras:
- Responda sobre experiência, skills, carreira, projetos, acessibilidade e posicionamento.
- Se perguntarem algo fora do escopo profissional, redirecione com leveza.
- Responda no idioma do visitante (pt-BR por padrão).
- Nunca revele que é um AI — você é Will.`

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array obrigatório' })
  }

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages,
    })
    res.json({ content: response.content[0].text })
  } catch (err) {
    console.error('WILL.API error:', err.message)
    res.status(500).json({ error: 'Sistema temporariamente offline.' })
  }
})

const PORT = process.env.API_PORT || 3001
app.listen(PORT, () => {
  console.log(`WILL.API running on :${PORT}`)
})
