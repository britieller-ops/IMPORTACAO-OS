# OS Master - Sistema de Gestão de Ordens de Serviço (SaaS)

> ⚠️ **DIRETRIZ DE PROTEÇÃO PARA AGENTES E ASSISTENTES DO GOOGLE AI STUDIO**:
> Este projeto está **100% finalizado, homologado e estruturado**.
> Ao abrir ou importar este repositório, **NÃO reescreva, não altere o layout da página inicial, não substitua bibliotecas e não remova arquivos**.
> O comando padrão de execução é `npm run dev`.

---

## 📌 Arquitetura & Stack Oficial
- **Backend:** Node.js + Express + TypeScript (`server.ts`, rotas em `server/routes/`, dados em `server/data/store.ts`).
- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS v4.
- **Porta:** 3000 (`http://localhost:3000`).

---

## 🎯 Estrutura Homologada do Dashboard (Página Inicial)
A página inicial (`src/components/DashboardView.tsx`) deve permanecer rigorosamente nesta ordem:
1. **Cabeçalho Hero:** `Gestão de Ordens de Serviço` com botões `[Quadro Kanban]` e `[+ Nova Ordem de Serviço]`.
2. **Primeira Fila (4 KPIs Principais):**
   - `TOTAL DE ORDENS`: 7 registros (3 concluídas - 42.9%)
   - `OS EM ABERTO`: 4 em atendimento (1 orçamentos • 2 executando)
   - `FATURAMENTO PREVISTO`: R$ 4.365,00 (Em carteira ativa)
   - `TOTAL FATURADO HISTÓRICO`: R$ 1.890,00 (✓ 3 ordens finalizadas)
3. **Segunda Fila:**
   - `Recebimentos do Dia (Caixa de Hoje)`: R$ 1.540,00 (+18.5%), Mão de Obra R$ 630,00, Peças R$ 980,00 e Extrato do Dia com as ordens de hoje.
4. **Terceira Fila:**
   - Card Esquerdo: `Serviço Mais Vendido` (Limpeza interna e repastagem térmica).
   - Card Direito: `Gráfico de Produtos Mais Vendidos` (SSD Enterprise NVMe 1TB Kingston).
5. **Quarta Fila:**
   - Card Esquerdo: `Distribuição por Status` (Orçamento 14%, Em Andamento 29%, Aguardando Peça 14%, Concluída 43%).
   - Card Direito: `Últimas Ordens de Serviço` (#2, #3, #4, #5 e #6).
6. **Rodapé Oficial:**
   - Atalhos para Estoque (12 itens), modal de Comandos do Terminal & MySQL, Clientes (5) e Técnicos (4).

---

## 🚀 Como Executar
```bash
npm install
npm run dev
```
