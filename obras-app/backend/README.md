# Backend

Esta pasta fica reservada para a API e as integrações do Dino.

Quando o backend for iniciado, a recomendação é colocar o código em `backend/src/`, mantendo aqui apenas regras de negócio, acesso a dados e endpoints. O frontend deve comunicar com esta camada através de contratos explícitos, sem importar código diretamente do backend.

## Próxima fase

O backend deverá receber a fatura, executar OCR, normalizar fornecedor/data/valor e sugerir a obra e a categoria de despesa. Depois de confirmação, poderá exportar os dados para o Excel correspondente.

Antes de implementar essa parte é necessário confirmar:

1. se os Excels são um ficheiro por obra ou um ficheiro com várias folhas;
2. quais são as colunas obrigatórias;
3. se os ficheiros ficam no computador, OneDrive ou outro local;
4. se as faturas são fotografias, PDFs ou ambos.

## Modelo financeiro

## Relação entre clientes e obras

Um cliente pode ter zero, uma ou várias obras. A relação é feita pela coluna `works.client_id`, que aponta para `clients.id`:

```text
clients (1) ──────── (0..N) works
```

Uma obra pertence a um único cliente, mas um cliente pode existir antes de qualquer obra ser criada.

Cada obra deve guardar dois valores separados:

- `budget`: orçamento total pedido pelo cliente;
- `extras`: compras ou trabalhos adicionais aprovados depois.

O valor disponível é calculado assim:

```text
orçamento disponível = budget + extras - total das faturas
```

Na tabela `works`, estes campos devem ser valores monetários `numeric(12, 2)` e começar em `0`. Não se deve substituir o orçamento original pelos extras, porque o pai precisa de distinguir o que foi contratado do que apareceu depois.