"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase/client";

type Invoice = {
  id: number;
  supplier: string;
  description: string;
  amount: number;
  date: string;
  work: string;
  status: "Classificada" | "A rever";
};

const works = [
  { name: "Casa do Pinhal", clientId: "client-martins", code: "OB-024", progress: 72, budget: 68400, extras: 3250, received: 42000, color: "terracotta" },
  { name: "Apartamento Baixa", clientId: "client-rita", code: "OB-023", progress: 38, budget: 41200, extras: 0, received: 15000, color: "lime" },
  { name: "Moradia do Lago", clientId: "client-martins", code: "OB-021", progress: 91, budget: 98700, extras: 8450, received: 92500, color: "blue" },
];

const initialClients = [
  { id: "client-martins", name: "Família Martins" },
  { id: "client-rita", name: "João e Rita" },
  { id: "client-empty", name: "Marco" },
];

const initialInvoices: Invoice[] = [
  { id: 1, supplier: "Materiais Silva", description: "Cimento e argamassa", amount: 428.5, date: "18 ago 2026", work: "Casa do Pinhal", status: "Classificada" },
  { id: 2, supplier: "Alugueres Norte", description: "Aluguer de andaimes", amount: 875, date: "17 ago 2026", work: "Apartamento Baixa", status: "Classificada" },
  { id: 3, supplier: "Luz & Fio", description: "Material elétrico", amount: 193.2, date: "16 ago 2026", work: "Casa do Pinhal", status: "A rever" },
  { id: 4, supplier: "Pedra Forte", description: "Ladrilho exterior", amount: 1240, date: "14 ago 2026", work: "Moradia do Lago", status: "Classificada" },
];

const money = new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" });

export default function Home() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [workItems, setWorkItems] = useState(works);
  const [clientItems, setClientItems] = useState(initialClients);
  const [selectedClient, setSelectedClient] = useState("Todos os clientes");
  const [selectedWork, setSelectedWork] = useState("Todas as obras");
  const [invoices, setInvoices] = useState(initialInvoices);
  const [isUploading, setIsUploading] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isCreatingClient, setIsCreatingClient] = useState(false);
  const [clientError, setClientError] = useState("");
  const [newClientName, setNewClientName] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);
  const [newWorkName, setNewWorkName] = useState("");
  const [newWorkClient, setNewWorkClient] = useState("");
  const [newWorkBudget, setNewWorkBudget] = useState("");
  const [newWorkReceived, setNewWorkReceived] = useState("");

  const visibleWorks = workItems.filter((work) => selectedClient === "Todos os clientes" || work.clientId === selectedClient);
  const visibleInvoices = (() => {
    const clientWorkNames = visibleWorks.map((work) => work.name);
    return invoices.filter((invoice) => clientWorkNames.includes(invoice.work) && (selectedWork === "Todas as obras" || invoice.work === selectedWork));
  })();

  const totalSpent = visibleInvoices.reduce((total, invoice) => total + invoice.amount, 0);
  const totalBudget = visibleWorks.reduce((total, work) => total + work.budget, 0);
  const totalExtras = visibleWorks.reduce((total, work) => total + work.extras, 0);
  const totalReceived = visibleWorks.reduce((total, work) => total + work.received, 0);
  const reviewCount = visibleInvoices.filter((invoice) => invoice.status === "A rever").length;
  const reviewLevel = reviewCount === 0 ? "review-none" : reviewCount <= 2 ? "review-some" : "review-many";
  const availableBudget = totalBudget + totalExtras - totalSpent;

  function getWorkSpent(workName: string) {
    return invoices
      .filter((invoice) => invoice.work === workName)
      .reduce((total, invoice) => total + invoice.amount, 0);
  }

  function handleInvoiceUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    window.setTimeout(() => {
      setInvoices((current) => [{
        id: Date.now(),
        supplier: file.name.replace(/\.[^/.]+$/, ""),
        description: "Fatura digitalizada",
        amount: 0,
        date: "Hoje",
        work: selectedWork === "Todas as obras" ? visibleWorks[0]?.name ?? workItems[0].name : selectedWork,
        status: "A rever",
      }, ...current]);
      setIsUploading(false);
      event.target.value = "";
    }, 900);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  async function handleCreateClient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setClientError("");
    setIsCreatingClient(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setClientError("O cliente só pode ser guardado depois de iniciares sessão no Supabase.");
      setIsCreatingClient(false);
      return;
    }

    const { error } = await supabase.from("clients").insert({
      owner_id: user.id,
      name: newClientName,
      email: newClientEmail || null,
      phone: newClientPhone || null,
    });

    if (error) {
      setClientError("Não foi possível criar o cliente. Confirma se a tabela clients já foi criada no Supabase.");
      setIsCreatingClient(false);
      return;
    }

    const clientId = `client-local-${Date.now()}`;
    setClientItems((current) => [...current, { id: clientId, name: newClientName }]);
    setSelectedClient(clientId);
    setNewClientName("");
    setNewClientEmail("");
    setNewClientPhone("");
    setIsCreatingClient(false);
    setIsClientModalOpen(false);
  }

  function handleCreateWork(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const clientId = newWorkClient || `client-local-${Date.now()}`;
    const newWork = {
      name: newWorkName,
      clientId,
      code: `OB-${String(workItems.length + 25).padStart(3, "0")}`,
      progress: 0,
      budget: Number(newWorkBudget) || 0,
      extras: 0,
      received: Number(newWorkReceived) || 0,
      color: "blue",
    };
    setWorkItems((current) => [...current, newWork]);
    if (!clientItems.some((client) => client.id === clientId)) setClientItems((current) => [...current, { id: clientId, name: "Novo cliente" }]);
    setSelectedClient(clientId);
    setSelectedWork("Todas as obras");
    setNewWorkName("");
    setNewWorkClient("");
    setNewWorkBudget("");
    setNewWorkReceived("");
    setIsWorkModalOpen(false);
  }

  return (
    <main className={`dashboard-shell ${isSidebarOpen ? "sidebar-open" : "sidebar-collapsed"}`}>
      <aside className="dashboard-sidebar">
        <div className="sidebar-topbar"><div className="brand-lockup"><Image className="company-logo company-logo-small" src="/dimoprop-logo.svg" alt="Dimoprop Construções e Remodelações" width={720} height={270} priority /><span className="sidebar-logo-compact" aria-hidden="true">D</span></div><button className="sidebar-toggle" type="button" onClick={() => setIsSidebarOpen((open) => !open)} aria-label={isSidebarOpen ? "Fechar barra lateral" : "Abrir barra lateral"} title={isSidebarOpen ? "Fechar barra lateral" : "Abrir barra lateral"}>☰</button></div>
        <div className="sidebar-label">Área de trabalho</div>
        <nav className="sidebar-nav" aria-label="Navegação principal">
          <a className="nav-item nav-item-active" href="#resumo"><span>▦</span> Resumo</a>
          <a className="nav-item" href="#obras"><span>⌂</span> Obras <b>{visibleWorks.length}</b></a>
          <a className="nav-item" href="#faturas"><span>▤</span> Faturas <b>{invoices.length}</b></a>
        </nav>
        <div className="sidebar-bottom"><span className="status-dot" /> Dados locais <span className="text-xs text-[var(--muted)]">v0.1</span></div>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div className="dashboard-heading"><div><p className="eyebrow">Terça-feira, 18 de agosto de 2026</p><h1 className="display-font dashboard-title">Olá, Dino.</h1></div></div>
          <div className="header-actions"><label className="client-picker"><span>Cliente</span><select value={selectedClient} onChange={(event) => { setSelectedClient(event.target.value); setSelectedWork("Todas as obras"); }}><option>Todos os clientes</option>{clientItems.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}</select></label><button className="new-client-button" type="button" onClick={() => { setClientError(""); setIsClientModalOpen(true); }}>+ Novo cliente</button><button className="profile-chip profile-button" type="button" onClick={handleLogout} title="Terminar sessão"><span className="profile-avatar">DM</span><span className="hidden sm:block">Dino Mota</span><span aria-hidden="true">↪</span></button></div>
        </header>

        <div className="dashboard-grid" id="resumo">
          <div className="summary-card summary-card-dark"><span className="card-kicker">Orçamento total</span><strong>{money.format(totalBudget)}</strong><span className="card-foot">Pedido pelo cliente</span></div>
          <div className="summary-card"><span className="card-kicker">Extras aprovados</span><strong>{money.format(totalExtras)}</strong><span className="card-foot">Orçamento disponível: {money.format(availableBudget)}</span></div>
          <div className="summary-card summary-card-received"><span className="card-kicker">Já recebido do cliente</span><strong>{money.format(totalReceived)}</strong><span className="card-foot">Pagamentos recebidos</span></div>
          <div className={`summary-card review-card ${reviewLevel}`}><span className="card-kicker">Faturas por rever</span><strong>{reviewCount}</strong><span className="card-foot">{reviewCount === 0 ? "Tudo tratado" : "Precisam da tua atenção"}</span></div>
        </div>

        <section className="content-section" id="obras">
          <div className="section-heading"><div><p className="eyebrow">A acompanhar</p><h2 className="display-font section-title">As tuas obras</h2></div><div className="section-actions"><button className="new-work-button" type="button" onClick={() => setIsWorkModalOpen(true)}>+ Adicionar obra</button><button className="text-button">Ver todas <span>→</span></button></div></div>
          <div className="works-grid">{visibleWorks.map((work) => { const spent = getWorkSpent(work.name); const clientName = clientItems.find((client) => client.id === work.clientId)?.name ?? "Sem cliente"; return <article className="work-card" key={work.code}><div className={`work-color work-color-${work.color}`}><span>{work.code}</span><span>↗</span></div><div className="work-card-body"><div className="flex items-start justify-between gap-3"><div><h3>{work.name}</h3><span className="work-client">{clientName}</span></div><span className="work-progress">{work.progress}%</span></div><div className="progress-track"><span style={{ width: `${work.progress}%` }} /></div><div className="work-finance"><div><span>Orçamento</span><strong>{money.format(work.budget)}</strong></div><div><span>Extras</span><strong className={work.extras ? "extra-value" : ""}>{work.extras ? `+ ${money.format(work.extras)}` : "—"}</strong></div><div><span>Recebido</span><strong className="received-value">{money.format(work.received)}</strong></div></div><div className="work-meta"><span>Gasto registado</span><strong>{money.format(spent)}</strong></div></div></article>; })}</div>
        </section>

        <section className="content-section invoice-section" id="faturas">
          <div className="section-heading"><div><p className="eyebrow">Contabilidade sem papéis</p><h2 className="display-font section-title">Faturas recentes</h2></div><div className="invoice-actions"><select className="work-filter" value={selectedWork} onChange={(event) => setSelectedWork(event.target.value)}><option>Todas as obras</option>{visibleWorks.map((work) => <option key={work.name}>{work.name}</option>)}</select><label className="small-upload-button">+ Adicionar fatura<input type="file" accept="image/*,.pdf" onChange={handleInvoiceUpload} disabled={isUploading} /></label></div></div>
          <div className="invoice-table-wrap"><table className="invoice-table"><thead><tr><th>Fornecedor</th><th>Descrição</th><th>Obra</th><th>Data</th><th className="text-right">Valor</th><th>Estado</th></tr></thead><tbody>{visibleInvoices.map((invoice) => <tr key={invoice.id}><td className="font-bold">{invoice.supplier}</td><td>{invoice.description}</td><td>{invoice.work}</td><td>{invoice.date}</td><td className="text-right font-bold">{invoice.amount ? money.format(invoice.amount) : "Por preencher"}</td><td><span className={`invoice-status ${invoice.status === "A rever" ? "invoice-status-review" : ""}`}>{invoice.status}</span></td></tr>)}</tbody></table></div>
        </section>
        {isClientModalOpen && <div className="client-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsClientModalOpen(false); }}><section className="client-modal" role="dialog" aria-modal="true" aria-labelledby="new-client-title"><div className="modal-heading"><div><p className="eyebrow">Dimoprop / cliente</p><h2 id="new-client-title" className="display-font">Novo cliente</h2></div><button className="modal-close" type="button" onClick={() => setIsClientModalOpen(false)} aria-label="Fechar">×</button></div><form className="client-form" onSubmit={handleCreateClient}><label htmlFor="client-name">Nome<input id="client-name" value={newClientName} onChange={(event) => setNewClientName(event.target.value)} placeholder="Nome do cliente" required autoFocus /></label><label htmlFor="client-email">Email<input id="client-email" type="email" value={newClientEmail} onChange={(event) => setNewClientEmail(event.target.value)} placeholder="cliente@email.pt" /></label><label htmlFor="client-phone">Telefone<input id="client-phone" value={newClientPhone} onChange={(event) => setNewClientPhone(event.target.value)} placeholder="912 345 678" /></label>{clientError && <p className="auth-error" role="alert">{clientError}</p>}<div className="modal-actions"><button className="text-button" type="button" onClick={() => setIsClientModalOpen(false)}>Cancelar</button><button className="auth-submit" type="submit" disabled={isCreatingClient}>{isCreatingClient ? "A guardar..." : "Guardar cliente"}<span>→</span></button></div></form></section></div>}
        {isWorkModalOpen && <div className="client-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsWorkModalOpen(false); }}><section className="client-modal" role="dialog" aria-modal="true" aria-labelledby="new-work-title"><div className="modal-heading"><div><p className="eyebrow">Dimoprop / obra</p><h2 id="new-work-title" className="display-font">Adicionar obra</h2></div><button className="modal-close" type="button" onClick={() => setIsWorkModalOpen(false)} aria-label="Fechar">×</button></div><form className="client-form" onSubmit={handleCreateWork}><label htmlFor="work-name">Nome da obra<input id="work-name" value={newWorkName} onChange={(event) => setNewWorkName(event.target.value)} placeholder="Ex.: Moradia do Norte" required autoFocus /></label><label htmlFor="work-client">Cliente<select id="work-client" value={newWorkClient} onChange={(event) => setNewWorkClient(event.target.value)}><option value="">Novo cliente</option>{clientItems.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}</select></label><label htmlFor="work-budget">Orçamento total<input id="work-budget" type="number" min="0" step="0.01" value={newWorkBudget} onChange={(event) => setNewWorkBudget(event.target.value)} placeholder="0,00" required /></label><label htmlFor="work-received">Já recebido<input id="work-received" type="number" min="0" step="0.01" value={newWorkReceived} onChange={(event) => setNewWorkReceived(event.target.value)} placeholder="0,00" /></label><div className="modal-actions"><button className="text-button" type="button" onClick={() => setIsWorkModalOpen(false)}>Cancelar</button><button className="auth-submit" type="submit">Guardar obra <span>→</span></button></div></form></section></div>}
      </section>
    </main>
  );
}
