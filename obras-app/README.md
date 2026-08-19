# Obras App

Aplicacao web para gerir o contexto de obras, construida com Next.js, React e TypeScript.

## Comecar

Instala as dependencias e inicia o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) no navegador.

Tambem podes iniciar o projeto a partir da pasta `C:\dimoprop` com o script PowerShell:

```powershell
.\run.ps1
```

Ou abre `run.bat` com duplo clique. O script entra automaticamente em `obras-app`, instala as dependencias se necessario, abre o navegador em `http://localhost:3000` e inicia o frontend.

Comandos disponiveis:

```bash
npm run lint
npm run build
npm start
```

## Personalizar rapidamente o frontend

Em desenvolvimento, inicia o projeto uma vez e deixa o terminal aberto:

```powershell
cd C:\dimoprop
.\run.ps1
```

Depois edita os ficheiros e guarda normalmente. O Next.js tem hot reload: atualiza o separador automaticamente, sem voltares a executar o script.

Os locais principais são:

- `frontend/app/page.tsx`: dashboard, clientes, obras e faturas de demonstração;
- `frontend/app/login/page.tsx`: formulário de login;
- `frontend/app/globals.css`: cores, layout e aparência;
- `frontend/public/dimoprop-logo.svg`: logótipo da Dimoprop usado no login e nas páginas principais;
- `frontend/.env.local`: ligação ao Supabase, sem partilhar este ficheiro.

## Organizacao

O repositorio esta dividido em duas areas:

- `frontend/`: interface web do Dino, com resumo das obras, despesas e faturas.
- `backend/`: futura API, regras de negocio e integracoes do servidor.

## MVP atual

O dashboard permite:

- consultar as obras em curso e a percentagem de progresso;
- ver o total de despesas e as faturas recentes;
- filtrar faturas por obra;
- carregar uma imagem ou PDF de uma fatura, que fica marcada como `A rever`.

Nesta fase, o carregamento é local e a leitura dos dados é simulada. Para automatizar a leitura e preencher os Excels reais, o próximo passo é ligar o upload a OCR no backend e definir as colunas/modelos de Excel usados pelo teu pai.

A explicacao completa esta em [docs/organizacao-repositorio.md](docs/organizacao-repositorio.md).

## Autenticacao

O login com Supabase é opcional para consultar o dashboard. Para guardar clientes no Supabase, é necessário iniciar sessão; a sessão fica mantida através de cookies/token.

Para criar o acesso do teu pai: `Supabase Dashboard → Authentication → Users → Add user`. O email e a palavra-passe devem corresponder aos dados usados em `/login`.

## Tecnologias

- Next.js com App Router
- React
- TypeScript em modo estrito
- Tailwind CSS v4
- ESLint

## Deploy na Vercel

O projeto está numa estrutura de monorepo e a app web vive em `frontend/`.

### No dashboard da Vercel

Ao importar o repositório:

- define `frontend` como `Root Directory`;
- confirma que o framework detetado é `Next.js`;
- adiciona as variáveis de ambiente do Supabase:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

### Via Vercel CLI

Se quiseres testar localmente o deploy ou fazer deploy pela linha de comandos:

```bash
cd frontend
vercel
```

Ou a partir da raiz do repositório:

```bash
vercel --cwd frontend
```

### Depois do deploy

O site passa a abrir num link público `https://...vercel.app` e já fica acessível no telemóvel. Mais tarde, podemos adicionar suporte de instalação como app no ecrã principal.
