# Organizacao do repositorio

Este documento explica onde cada tipo de codigo deve ficar e porque a estrutura foi escolhida.

## Estrutura atual

```text
obras-app/
|-- frontend/                    # Aplicacao web Next.js
|   |-- app/                     # Rota, layout e estilos globais
|   |-- public/                  # Ficheiros estaticos do frontend
|   |-- tsconfig.json            # Tipos e alias do frontend
|   `-- next-env.d.ts            # Tipos gerados pelo Next.js
|-- backend/                     # API e regras de negocio do servidor
|   `-- README.md                # Limites e proposito do backend
|-- docs/                        # Documentacao tecnica e decisoes do projeto
|   `-- organizacao-repositorio.md
|-- package.json                 # Workspace e scripts de atalho
|-- package-lock.json            # Dependencias fixadas do workspace
|-- .gitignore                   # Exclusoes globais do Git
`-- README.md                    # Entrada rapida para desenvolvimento
```

As configuracoes especificas do Next.js ficam dentro de `frontend/`: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs` e `next-env.d.ts`.

## Porque esta organizacao

O projeto esta dividido por contexto: `frontend/` contem tudo o que e executado e apresentado no browser, enquanto `backend/` e a fronteira reservada para a API e o servidor. Esta separacao evita misturar UI com acesso a dados e permite evoluir cada lado de forma independente.

Dentro do frontend, o projeto usa o App Router do Next.js. Por isso, `frontend/app/` e a fronteira natural das rotas: a localizacao de um ficheiro determina a URL e os ficheiros especiais, como `layout.tsx`, controlam o comportamento dessas rotas.

Como a aplicacao ainda e pequena, nao foram criadas camadas vazias nem uma arquitetura pesada. A estrutura deve crescer quando houver uma responsabilidade real, preservando a facilidade de encontrar o codigo.

## Onde colocar codigo novo

| Tipo de codigo | Local | Regra |
| --- | --- | --- |
| Paginas e segmentos de URL | `frontend/app/` | Usa a convencao do App Router. Mantem a logica da pagina proxima da rota quando for especifica dela. |
| Componentes reutilizaveis | `frontend/components/` | Cria esta pasta quando houver componentes partilhados por duas ou mais rotas. |
| Funcoes de negocio e integracoes | `backend/src/` | Coloca aqui acesso a APIs, base de dados, validacoes e funcoes sem estado de UI. |
| Hooks React reutilizaveis | `frontend/hooks/` | Usa para comportamento partilhado entre componentes. |
| Tipos TypeScript partilhados | `frontend/types/` ou `backend/src/types/` | Mantem os contratos junto do contexto que os utiliza. |
| Ficheiros estaticos | `frontend/public/` | Usa caminhos absolutos, por exemplo `/logo.svg`. |
| Documentacao tecnica | `docs/` | Regista decisoes, fluxos e instrucoes que nao pertencem ao README. |

## Regras praticas

1. Nao colocar componentes reutilizaveis diretamente em `frontend/app/`; reserva essa pasta para rotas e elementos proprios do Next.js.
2. Evitar ficheiros genericos como `utils.ts` quando uma funcao puder ter um nome e uma area claros.
3. Usar o alias `@/*` definido em `frontend/tsconfig.json` para imports do frontend quando isso tornar o import mais legivel.
4. Manter secrets em variaveis de ambiente e nunca os commitar. Variaveis publicas para o browser devem usar o prefixo `NEXT_PUBLIC_`.
5. Antes de abrir uma alteracao, executar `npm run lint` e, para alteracoes maiores, `npm run build`.

## Evolucao recomendada

Quando a primeira funcionalidade de negocio for criada, uma evolucao razoavel sera:

```text
frontend/app/
|-- (dashboard)/                # Agrupa rotas sem alterar a URL
|   |-- layout.tsx
|   `-- obras/
|       `-- page.tsx
frontend/components/           # UI partilhada
frontend/hooks/                 # Comportamento React partilhado
backend/src/                    # API, regras de negocio e integracoes
```

Essa separacao deve ser introduzida por necessidade, e nao apenas para preencher pastas.
