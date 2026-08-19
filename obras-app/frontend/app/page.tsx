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
  type: "normal" | "extra" | "labor";
  paid: number;
  payments: { id: number; amount: number; date: string }[];
};

const works = [
  {
    name: "Casa do Pinhal",
    clientId: "client-martins",
    code: "OB-024",
    progress: 72,
    budget: 68400,
    extras: 3250,
    received: 42000,
    color: "terracotta",
  },
  {
    name: "Apartamento Baixa",
    clientId: "client-rita",
    code: "OB-023",
    progress: 38,
    budget: 41200,
    extras: 0,
    received: 15000,
    color: "lime",
  },
  {
    name: "Moradia do Lago",
    clientId: "client-martins",
    code: "OB-021",
    progress: 91,
    budget: 98700,
    extras: 8450,
    received: 92500,
    color: "blue",
  },
];

const initialClients = [
  { id: "client-martins", name: "Família Martins" },
  { id: "client-rita", name: "João e Rita" },
  { id: "client-empty", name: "Marco" },
];

const initialInvoices: Invoice[] = [
  {
    id: 1,
    supplier: "Materiais Silva",
    description: "Cimento e argamassa",
    amount: 428.5,
    date: "18 ago 2026",
    work: "Casa do Pinhal",
    status: "Classificada",
    type: "normal",
    paid: 0,
    payments: [],
  },
  {
    id: 2,
    supplier: "Alugueres Norte",
    description: "Aluguer de andaimes",
    amount: 875,
    date: "17 ago 2026",
    work: "Apartamento Baixa",
    status: "Classificada",
    type: "normal",
    paid: 0,
    payments: [],
  },
  {
    id: 3,
    supplier: "Luz & Fio",
    description: "Material elétrico",
    amount: 193.2,
    date: "16 ago 2026",
    work: "Casa do Pinhal",
    status: "A rever",
    type: "labor",
    paid: 0,
    payments: [],
  },
  {
    id: 4,
    supplier: "Pedra Forte",
    description: "Ladrilho exterior",
    amount: 1240,
    date: "14 ago 2026",
    work: "Moradia do Lago",
    status: "Classificada",
    type: "extra",
    paid: 600,
    payments: [
      { id: 41, amount: 300, date: "10 ago 2026" },
      { id: 42, amount: 300, date: "14 ago 2026" },
    ],
  },
  {
    id: 5,
    supplier: "Cozinha Nova",
    description: "Ilha pedida pelo cliente",
    amount: 2850,
    date: "12 ago 2026",
    work: "Casa do Pinhal",
    status: "A rever",
    type: "extra",
    paid: 1000,
    payments: [
      { id: 51, amount: 150, date: "12 ago 2026" },
      { id: 52, amount: 850, date: "18 ago 2026" },
    ],
  },
];

const money = new Intl.NumberFormat("pt-PT", {
  style: "currency",
  currency: "EUR",
});

function extractAmount(text: string) {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  const totalLineIndex = lines
    .map((line, index) => ({ line, index }))
    .reverse()
    .find(
      ({ line }) =>
        /\btotal\b/i.test(line) &&
        !/sub\s*total|subtotal|iva|vat|imposto/i.test(line),
    )?.index;
  if (totalLineIndex === undefined) return "";

  // Alguns documentos colocam o número na linha abaixo de "TOTAL".
  const totalArea = lines.slice(totalLineIndex, totalLineIndex + 4).join(" ");
  const candidates = totalArea.match(/\d{1,3}(?:[.\s]\d{3})*,\d{2}|\d+[,.]\d{2}/g);
  if (!candidates?.length) return "";
  const candidate = candidates.at(-1)?.replace(/[€$\s]/g, "") ?? "";
  const value = candidate.includes(",")
    ? candidate.replace(/\./g, "").replace(",", ".")
    : candidate;
  return value && Number.isFinite(Number(value)) ? value : "";
}

function extractDate(text: string) {
  const match = text.match(/\b(\d{1,2})[\/-](\d{1,2})[\/-](\d{2,4})\b/);
  if (!match) return "";
  const year = match[3].length === 2 ? `20${match[3]}` : match[3];
  return `${year}-${match[2].padStart(2, "0")}-${match[1].padStart(2, "0")}`;
}

function extractSupplier(text: string, fallback: string) {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  const senderIndex = lines.findIndex((line) => /^(de|emitente|fornecedor)\b/i.test(line));
  if (senderIndex >= 0) {
    const sameLineName = lines[senderIndex].replace(/^(de|emitente|fornecedor)\s*:?[\s-]*/i, "");
    if (sameLineName.length > 2 && !/rua|avenida|av\.|travessa|estrada/i.test(sameLineName)) {
      return sameLineName;
    }
    const candidate = lines
      .slice(senderIndex + 1, senderIndex + 4)
      .find(
        (line) =>
          line.length > 2 &&
          !/rua|avenida|av\.|travessa|estrada|fatura|data|p\.o/i.test(line),
      );
    if (candidate) return candidate;
  }
  return fallback;
}

export default function Home() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [workItems, setWorkItems] = useState(works);
  const [clientItems, setClientItems] = useState(initialClients);
  const [selectedClient, setSelectedClient] = useState("Todos os clientes");
  const [invoices, setInvoices] = useState(initialInvoices);
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
  const [selectedWorkDetail, setSelectedWorkDetail] = useState<string | null>(
    null,
  );
  const [workDetailTab, setWorkDetailTab] = useState<Invoice["type"]>("normal");
  const [showProfit, setShowProfit] = useState(false);
  const [isUploadingInvoice, setIsUploadingInvoice] = useState(false);
  const [paymentAmounts, setPaymentAmounts] = useState<Record<number, string>>(
    {},
  );
  const [expandedPaymentHistory, setExpandedPaymentHistory] = useState<
    Record<number, boolean>
  >({});
  const [invoiceEntryType, setInvoiceEntryType] = useState<Invoice["type"] | null>(
    null,
  );
  const [manualInvoiceSupplier, setManualInvoiceSupplier] = useState("");
  const [manualInvoiceDescription, setManualInvoiceDescription] = useState("");
  const [manualInvoiceAmount, setManualInvoiceAmount] = useState("");
  const [manualExtraPaid, setManualExtraPaid] = useState("");
  const [manualInvoiceDate, setManualInvoiceDate] = useState("");
  const [useCurrentInvoiceDate, setUseCurrentInvoiceDate] = useState(true);
  const [ocrNotice, setOcrNotice] = useState("");

  const visibleWorks = workItems.filter(
    (work) =>
      selectedClient === "Todos os clientes" ||
      work.clientId === selectedClient,
  );
  const detailWork = workItems.find((work) => work.name === selectedWorkDetail);
  const detailInvoices = detailWork
    ? invoices
        .filter((invoice) => invoice.work === detailWork.name)
        .sort((first, second) => second.date.localeCompare(first.date))
    : [];

  function getWorkSpent(workName: string) {
    return invoices
      .filter((invoice) => invoice.work === workName)
      .reduce((total, invoice) => total + invoice.amount, 0);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  async function handleCreateClient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setClientError("");
    setIsCreatingClient(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setClientError(
        "O cliente só pode ser guardado depois de iniciares sessão no Supabase.",
      );
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
      setClientError(
        "Não foi possível criar o cliente. Confirma se a tabela clients já foi criada no Supabase.",
      );
      setIsCreatingClient(false);
      return;
    }

    const clientId = `client-local-${Date.now()}`;
    setClientItems((current) => [
      ...current,
      { id: clientId, name: newClientName },
    ]);
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
    if (!clientItems.some((client) => client.id === clientId))
      setClientItems((current) => [
        ...current,
        { id: clientId, name: "Novo cliente" },
      ]);
    setSelectedClient(clientId);
    setNewWorkName("");
    setNewWorkClient("");
    setNewWorkBudget("");
    setNewWorkReceived("");
    setIsWorkModalOpen(false);
  }

  function updateExtraPayment(invoiceId: number, value: string) {
    setPaymentAmounts((current) => ({ ...current, [invoiceId]: value }));
  }

  function registerExtraPayment(invoiceId: number) {
    const amount = Math.max(0, Number(paymentAmounts[invoiceId]) || 0);
    if (!amount) return;
    setInvoices((current) =>
      current.map((invoice) => {
        if (invoice.id !== invoiceId) return invoice;
        const remaining = Math.max(0, invoice.amount - invoice.paid);
        const payment = Math.min(amount, remaining);
        return {
          ...invoice,
          paid: invoice.paid + payment,
          payments: [
            ...invoice.payments,
            {
              id: Date.now(),
              amount: payment,
              date: new Date().toLocaleDateString("pt-PT", {
                day: "2-digit",
                month: "short",
              }),
            },
          ],
        };
      }),
    );
    setPaymentAmounts((current) => ({ ...current, [invoiceId]: "" }));
  }

  function removeInvoice(invoiceId: number) {
    setInvoices((current) => current.filter((invoice) => invoice.id !== invoiceId));
    setExpandedPaymentHistory((current) => {
      const remaining = { ...current };
      delete remaining[invoiceId];
      return remaining;
    });
  }

  function openInvoiceEntry(type: Invoice["type"]) {
    setInvoiceEntryType(type);
    setManualInvoiceSupplier("");
    setManualInvoiceDescription("");
    setManualInvoiceAmount("");
    setManualExtraPaid("");
    setManualInvoiceDate("");
    setUseCurrentInvoiceDate(true);
    setOcrNotice("");
  }

  function createManualInvoice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!detailWork || !invoiceEntryType || !manualInvoiceSupplier.trim()) return;

    const amount = Math.max(0, Number(manualInvoiceAmount) || 0);
    const paid =
      invoiceEntryType === "extra"
        ? Math.min(amount, Math.max(0, Number(manualExtraPaid) || 0))
        : 0;
    const invoiceDate = useCurrentInvoiceDate
      ? new Date().toISOString().slice(0, 10)
      : manualInvoiceDate;
    const date = new Date(`${invoiceDate}T12:00:00`).toLocaleDateString("pt-PT", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    setInvoices((current) => [
      {
        id: Date.now(),
        supplier: manualInvoiceSupplier.trim(),
        description: manualInvoiceDescription.trim() || "Sem descrição",
        amount,
        date,
        work: detailWork.name,
        status: "Classificada",
        type: invoiceEntryType,
        paid,
        payments:
          paid > 0 ? [{ id: Date.now() + 1, amount: paid, date }] : [],
      },
      ...current,
    ]);
    setInvoiceEntryType(null);
  }

  async function handleInvoiceUpload(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploadingInvoice(true);
    setOcrNotice("A ler a imagem neste dispositivo…");

    try {
      if (!file.type.startsWith("image/")) {
        throw new Error("O OCR local lê imagens. Para PDF, preenche os campos manualmente.");
      }
      const { recognize } = await import("tesseract.js");
      const result = await recognize(file, "por");
      const text = result.data.text;
      setManualInvoiceSupplier(
        extractSupplier(text, file.name.replace(/\.[^/.]+$/, "")),
      );
      const detectedDate = extractDate(text);
      setManualInvoiceDescription(detectedDate ? `Fatura de ${detectedDate}` : "");
      setManualInvoiceAmount(extractAmount(text));
      setManualInvoiceDate(detectedDate);
      setUseCurrentInvoiceDate(!detectedDate);
      setOcrNotice("Dados lidos localmente. Confirma ou corrige os campos antes de guardar.");
    } catch (error) {
      setManualInvoiceSupplier(file.name.replace(/\.[^/.]+$/, ""));
      setOcrNotice(
        error instanceof Error
          ? error.message
          : "Não foi possível ler a fatura. Preenche os campos manualmente.",
      );
    } finally {
      setIsUploadingInvoice(false);
      event.target.value = "";
    }
  }

  return (
    <main
      className={`dashboard-shell ${isSidebarOpen ? "sidebar-open" : "sidebar-collapsed"}`}
    >
      <aside className="dashboard-sidebar">
        <div className="sidebar-topbar">
          <div className="brand-lockup">
            <Image
              className="company-logo company-logo-small"
              src="/dimoprop-logo.svg"
              alt="Dimoprop Construções e Remodelações"
              width={720}
              height={270}
              priority
            />
            <span className="sidebar-logo-compact" aria-hidden="true">
              D
            </span>
          </div>
          <button
            className="sidebar-toggle"
            type="button"
            onClick={() => setIsSidebarOpen((open) => !open)}
            aria-label={
              isSidebarOpen ? "Fechar barra lateral" : "Abrir barra lateral"
            }
            title={
              isSidebarOpen ? "Fechar barra lateral" : "Abrir barra lateral"
            }
          >
            ☰
          </button>
        </div>
        <div className="sidebar-label">Área de trabalho</div>
        <nav className="sidebar-nav" aria-label="Navegação principal">
          <a className="nav-item nav-item-active" href="#resumo">
            <span>▦</span> Resumo
          </a>
          <a className="nav-item" href="#obras">
            <span>⌂</span> Obras <b>{visibleWorks.length}</b>
          </a>
        </nav>
        <div className="sidebar-bottom">
          <span className="status-dot" /> Dados locais{" "}
          <span className="text-xs text-[var(--muted)]">v0.1</span>
        </div>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div className="dashboard-heading">
            <div>
              <p className="eyebrow">Terça-feira, 18 de agosto de 2026</p>
              <h1 className="display-font dashboard-title">Olá, Dino.</h1>
            </div>
          </div>
          <div className="header-actions">
            <button
              className="new-client-button"
              type="button"
              onClick={() => {
                setClientError("");
                setIsClientModalOpen(true);
              }}
            >
              + Novo cliente
            </button>
            <button
              className="profile-chip profile-button"
              type="button"
              onClick={handleLogout}
              title="Terminar sessão"
            >
              <span className="profile-avatar">DM</span>
              <span className="hidden sm:block">Dino Mota</span>
              <span aria-hidden="true">↪</span>
            </button>
          </div>
        </header>

        <section className="content-section" id="obras">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A acompanhar</p>
              <h2 className="display-font section-title">As tuas obras</h2>
            </div>
            <div className="section-actions">
              <label className="client-picker">
                <span>Cliente</span>
                <select
                  value={selectedClient}
                  onChange={(event) => setSelectedClient(event.target.value)}
                >
                  <option>Todos os clientes</option>
                  {clientItems.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </label>
              <button
                className="new-work-button"
                type="button"
                onClick={() => setIsWorkModalOpen(true)}
              >
                + Adicionar obra
              </button>
              <button className="text-button">
                Ver todas <span>→</span>
              </button>
            </div>
          </div>
          <div className="works-grid">
            {visibleWorks.map((work) => {
              const spent = getWorkSpent(work.name);
              const clientName =
                clientItems.find((client) => client.id === work.clientId)
                  ?.name ?? "Sem cliente";
              return (
                <article
                  className="work-card work-card-clickable"
                  key={work.code}
                  onClick={() => {
                    setSelectedWorkDetail(work.name);
                    setWorkDetailTab("normal");
                    setShowProfit(false);
                  }}
                >
                  <div className={`work-color work-color-${work.color}`}>
                    <span>{work.code}</span>
                    <span>↗</span>
                  </div>
                  <div className="work-card-body">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3>{work.name}</h3>
                        <span className="work-client">{clientName}</span>
                      </div>
                      <span className="work-progress">{work.progress}%</span>
                    </div>
                    <div className="progress-track">
                      <span style={{ width: `${work.progress}%` }} />
                    </div>
                    <div className="work-finance">
                      <div>
                        <span>Orçamento</span>
                        <strong>{money.format(work.budget)}</strong>
                      </div>
                      <div>
                        <span>Extras</span>
                        <strong className={work.extras ? "extra-value" : ""}>
                          {work.extras ? `+ ${money.format(work.extras)}` : "—"}
                        </strong>
                      </div>
                      <div>
                        <span>Recebido</span>
                        <strong className="received-value">
                          {money.format(work.received)}
                        </strong>
                      </div>
                    </div>
                    <div className="work-meta">
                      <span>Gasto registado</span>
                      <strong>{money.format(spent)}</strong>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {isClientModalOpen && (
          <div
            className="client-modal-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget)
                setIsClientModalOpen(false);
            }}
          >
            <section
              className="client-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="new-client-title"
            >
              <div className="modal-heading">
                <div>
                  <p className="eyebrow">Dimoprop / cliente</p>
                  <h2 id="new-client-title" className="display-font">
                    Novo cliente
                  </h2>
                </div>
                <button
                  className="modal-close"
                  type="button"
                  onClick={() => setIsClientModalOpen(false)}
                  aria-label="Fechar"
                >
                  ×
                </button>
              </div>
              <form className="client-form" onSubmit={handleCreateClient}>
                <label htmlFor="client-name">
                  Nome
                  <input
                    id="client-name"
                    value={newClientName}
                    onChange={(event) => setNewClientName(event.target.value)}
                    placeholder="Nome do cliente"
                    required
                    autoFocus
                  />
                </label>
                <label htmlFor="client-email">
                  Email
                  <input
                    id="client-email"
                    type="email"
                    value={newClientEmail}
                    onChange={(event) => setNewClientEmail(event.target.value)}
                    placeholder="cliente@email.pt"
                  />
                </label>
                <label htmlFor="client-phone">
                  Telefone
                  <input
                    id="client-phone"
                    value={newClientPhone}
                    onChange={(event) => setNewClientPhone(event.target.value)}
                    placeholder="912 345 678"
                  />
                </label>
                {clientError && (
                  <p className="auth-error" role="alert">
                    {clientError}
                  </p>
                )}
                <div className="modal-actions">
                  <button
                    className="text-button"
                    type="button"
                    onClick={() => setIsClientModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="auth-submit"
                    type="submit"
                    disabled={isCreatingClient}
                  >
                    {isCreatingClient ? "A guardar..." : "Guardar cliente"}
                    <span>→</span>
                  </button>
                </div>
              </form>
            </section>
          </div>
        )}
        {isWorkModalOpen && (
          <div
            className="client-modal-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget)
                setIsWorkModalOpen(false);
            }}
          >
            <section
              className="client-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="new-work-title"
            >
              <div className="modal-heading">
                <div>
                  <p className="eyebrow">Dimoprop / obra</p>
                  <h2 id="new-work-title" className="display-font">
                    Adicionar obra
                  </h2>
                </div>
                <button
                  className="modal-close"
                  type="button"
                  onClick={() => setIsWorkModalOpen(false)}
                  aria-label="Fechar"
                >
                  ×
                </button>
              </div>
              <form className="client-form" onSubmit={handleCreateWork}>
                <label htmlFor="work-name">
                  Nome da obra
                  <input
                    id="work-name"
                    value={newWorkName}
                    onChange={(event) => setNewWorkName(event.target.value)}
                    placeholder="Ex.: Moradia do Norte"
                    required
                    autoFocus
                  />
                </label>
                <label htmlFor="work-client">
                  Cliente
                  <select
                    id="work-client"
                    value={newWorkClient}
                    onChange={(event) => setNewWorkClient(event.target.value)}
                  >
                    <option value="">Novo cliente</option>
                    {clientItems.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label htmlFor="work-budget">
                  Orçamento total
                  <input
                    id="work-budget"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newWorkBudget}
                    onChange={(event) => setNewWorkBudget(event.target.value)}
                    placeholder="0,00"
                    required
                  />
                </label>
                <label htmlFor="work-received">
                  Já recebido
                  <input
                    id="work-received"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newWorkReceived}
                    onChange={(event) => setNewWorkReceived(event.target.value)}
                    placeholder="0,00"
                  />
                </label>
                <div className="modal-actions">
                  <button
                    className="text-button"
                    type="button"
                    onClick={() => setIsWorkModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button className="auth-submit" type="submit">
                    Guardar obra <span>→</span>
                  </button>
                </div>
              </form>
            </section>
          </div>
        )}
        {detailWork && (
          <div
            className="work-detail-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget)
                setSelectedWorkDetail(null);
            }}
          >
            <section
              className="work-detail"
              role="dialog"
              aria-modal="true"
              aria-labelledby="work-detail-title"
            >
              <header className="work-detail-header">
                <div>
                  <p className="eyebrow">{detailWork.code} / detalhe da obra</p>
                  <h2 id="work-detail-title" className="display-font">
                    {detailWork.name}
                  </h2>
                  <p className="work-client">
                    {clientItems.find(
                      (client) => client.id === detailWork.clientId,
                    )?.name ?? "Sem cliente"}
                  </p>
                </div>
                <div className="work-detail-header-actions">
                  <div className="profit-box profit-summary">
                    <span>
                      Lucro{" "}
                      <button
                        type="button"
                        onClick={() => setShowProfit((visible) => !visible)}
                        aria-label={showProfit ? "Esconder lucro" : "Mostrar lucro"}
                      >
                        {showProfit ? "◉" : "◌"}
                      </button>
                    </span>
                    <strong>
                      {showProfit
                        ? money.format(
                            detailWork.budget +
                              detailWork.extras -
                              detailInvoices
                                .filter((invoice) => invoice.type !== "extra")
                                .reduce((total, invoice) => total + invoice.amount, 0),
                          )
                        : "••••"}
                    </strong>
                  </div>
                  <button
                    className="modal-close"
                    type="button"
                    onClick={() => setSelectedWorkDetail(null)}
                    aria-label="Fechar"
                  >
                    ×
                  </button>
                </div>
              </header>
              <div className="work-detail-finance">
                <div>
                  <span>Orçamento</span>
                  <strong>{money.format(detailWork.budget)}</strong>
                </div>
                <div>
                  <span>Faturas normais</span>
                  <strong>
                    {money.format(
                      detailInvoices
                        .filter((invoice) => invoice.type === "normal")
                        .reduce((total, invoice) => total + invoice.amount, 0),
                    )}
                  </strong>
                </div>
                <div>
                  <span>Extras</span>
                  <strong>{money.format(detailWork.extras)}</strong>
                </div>
                <div>
                  <span>Mão de obra</span>
                  <strong>
                    {money.format(
                      detailInvoices
                        .filter((invoice) => invoice.type === "labor")
                        .reduce((total, invoice) => total + invoice.amount, 0),
                    )}
                  </strong>
                </div>
                <div>
                  <span>Pagamentos</span>
                  <strong className="received-value">
                    {money.format(detailWork.received)}
                  </strong>
                </div>
              </div>
              <div className="work-detail-tabs">
                <div className="tab-control">
                  <button
                    className={workDetailTab === "normal" ? "active" : ""}
                    type="button"
                    onClick={() => setWorkDetailTab("normal")}
                  >
                    Faturas normais
                  </button>
                  <button
                    className="tab-add-invoice"
                    type="button"
                    onClick={() => openInvoiceEntry("normal")}
                    title="Adicionar fatura normal"
                    aria-label="Adicionar fatura normal"
                  >
                    +
                  </button>
                </div>
                <div className="tab-control">
                  <button
                    className={workDetailTab === "extra" ? "active" : ""}
                    type="button"
                    onClick={() => setWorkDetailTab("extra")}
                  >
                    Extras{" "}
                    <b>
                      {
                        detailInvoices.filter(
                          (invoice) => invoice.type === "extra",
                        ).length
                      }
                    </b>
                  </button>
                  <button
                    className="tab-add-invoice"
                    type="button"
                    onClick={() => openInvoiceEntry("extra")}
                    title="Adicionar extra"
                    aria-label="Adicionar extra"
                  >
                    +
                  </button>
                </div>
                <div className="tab-control">
                  <button
                    className={workDetailTab === "labor" ? "active" : ""}
                    type="button"
                    onClick={() => setWorkDetailTab("labor")}
                  >
                    Mão de obra
                    <b>
                      {
                        detailInvoices.filter(
                          (invoice) => invoice.type === "labor",
                        ).length
                      }
                    </b>
                  </button>
                  <button
                    className="tab-add-invoice"
                    type="button"
                    onClick={() => openInvoiceEntry("labor")}
                    title="Adicionar mão de obra"
                    aria-label="Adicionar mão de obra"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="work-detail-list">
                {workDetailTab === "extra" && (
                  <div className="extras-list-summary">
                    <div>
                      <span>Total de extras</span>
                      <strong>
                        {money.format(
                          detailInvoices
                            .filter((invoice) => invoice.type === "extra")
                            .reduce((total, invoice) => total + invoice.amount, 0),
                        )}
                      </strong>
                    </div>
                    <div>
                      <span>Já pago</span>
                      <strong className="extra-paid">
                        {money.format(
                          detailInvoices
                            .filter((invoice) => invoice.type === "extra")
                            .reduce((total, invoice) => total + invoice.paid, 0),
                        )}
                      </strong>
                    </div>
                    <div>
                      <span>Falta pagar</span>
                      <strong className="extra-cost">
                        {money.format(
                          detailInvoices
                            .filter((invoice) => invoice.type === "extra")
                            .reduce(
                              (total, invoice) => total + invoice.amount - invoice.paid,
                              0,
                            ),
                        )}
                      </strong>
                    </div>
                  </div>
                )}
                {detailInvoices
                  .filter((invoice) =>
                    workDetailTab === "extra"
                      ? invoice.type === "extra"
                      : invoice.type === workDetailTab,
                  )
                  .map((invoice) => (
                    <article
                      className={`detail-invoice ${invoice.type === "extra" ? "detail-extra" : ""} ${invoice.type === "extra" && invoice.amount > 0 && invoice.paid >= invoice.amount ? "extra-paid-in-full" : ""}`}
                      key={invoice.id}
                    >
                      <div>
                        <div className="detail-invoice-title">
                          {invoice.type === "extra" && (
                            <button
                              className="history-toggle"
                              type="button"
                              onClick={() =>
                                setExpandedPaymentHistory((current) => ({
                                  ...current,
                                  [invoice.id]: !current[invoice.id],
                                }))
                              }
                              aria-expanded={Boolean(expandedPaymentHistory[invoice.id])}
                              aria-label={`Ver histórico de pagamentos de ${invoice.supplier}`}
                            >
                              {expandedPaymentHistory[invoice.id] ? "⌄" : "›"}
                            </button>
                          )}
                          <strong>{invoice.supplier}</strong>
                        </div>
                        <span>
                          {invoice.description} · {invoice.date}
                        </span>
                      </div>
                      <div className="detail-invoice-value">
                        {invoice.type === "extra" ? (
                          <div className="extra-values">
                            <span className="extra-cost">Custo: {money.format(invoice.amount)}</span>
                            <span className="extra-paid">Pago: {money.format(invoice.paid)}</span>
                          </div>
                        ) : (
                          <>
                            <strong>{money.format(invoice.amount)}</strong>
                            <span>
                              {invoice.type === "labor"
                                ? "Mão de obra · abatida ao orçamento"
                                : "Despesa geral"}
                            </span>
                          </>
                        )}
                      </div>
                      <button
                        className="remove-invoice"
                        type="button"
                        onClick={() => removeInvoice(invoice.id)}
                        aria-label={`Remover fatura ${invoice.supplier}`}
                        title="Remover"
                      >
                        ×
                      </button>
                      {invoice.type === "extra" && expandedPaymentHistory[invoice.id] && (
                        <div className="extra-payment-history">
                          <strong>Histórico de pagamentos</strong>
                          {invoice.payments.length ? (
                            <div className="payment-history-list">
                              {invoice.payments.map((payment) => (
                                <span key={payment.id}>
                                  {payment.date} · {money.format(payment.amount)}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="no-payments">Ainda sem pagamentos registados.</span>
                          )}
                          <label>
                            Adicionar pagamento
                            <input
                              type="number"
                              min="0"
                              max={invoice.amount - invoice.paid}
                              step="0.01"
                              value={paymentAmounts[invoice.id] ?? ""}
                              onChange={(event) =>
                                updateExtraPayment(invoice.id, event.target.value)
                              }
                            />
                            <button type="button" onClick={() => registerExtraPayment(invoice.id)}>
                              Registar
                            </button>
                          </label>
                        </div>
                      )}
                    </article>
                  ))}
                {detailInvoices.filter((invoice) =>
                  workDetailTab === "extra"
                    ? invoice.type === "extra"
                    : invoice.type === workDetailTab,
                ).length === 0 && (
                  <p className="empty-detail">
                    Ainda não existem faturas nesta aba.
                  </p>
                )}
              </div>
            </section>
          </div>
        )}
        {detailWork && invoiceEntryType && (
          <div
            className="invoice-entry-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setInvoiceEntryType(null);
            }}
          >
            <section
              className="invoice-entry-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="invoice-entry-title"
            >
              <div className="modal-heading">
                <div>
                  <p className="eyebrow">
                    {invoiceEntryType === "extra"
                      ? "novo extra"
                      : invoiceEntryType === "labor"
                        ? "nova mão de obra"
                        : "nova fatura"}
                  </p>
                  <h2 id="invoice-entry-title" className="display-font">
                    Adicionar {invoiceEntryType === "extra"
                      ? "extra"
                      : invoiceEntryType === "labor"
                        ? "mão de obra"
                        : "fatura"}
                  </h2>
                </div>
                <button
                  className="modal-close"
                  type="button"
                  onClick={() => setInvoiceEntryType(null)}
                  aria-label="Fechar"
                >
                  ×
                </button>
              </div>
              <p className="invoice-entry-intro">
                Carrega o documento para preencher os dados automaticamente ou insere-os manualmente.
              </p>
              <label className="invoice-upload-option">
                <span>{isUploadingInvoice ? "A carregar…" : "Carregar fatura"}</span>
                <small>Imagem — a leitura é feita no teu dispositivo</small>
                <input
                  type="file"
                  accept="image/*"
                  disabled={isUploadingInvoice}
                  onChange={(event) =>
                    handleInvoiceUpload(event)
                  }
                />
              </label>
              {ocrNotice && (
                <p className={`ocr-notice ${ocrNotice.startsWith("Dados lidos") ? "ocr-notice-success" : ""}`} role="status">
                  {ocrNotice}
                </p>
              )}
              <div className="invoice-entry-divider"><span>ou preencher manualmente</span></div>
              <form className="invoice-entry-form" onSubmit={createManualInvoice}>
                <label>
                  Fornecedor / título
                  <input
                    required
                    value={manualInvoiceSupplier}
                    onChange={(event) => setManualInvoiceSupplier(event.target.value)}
                    placeholder="Ex.: Cozinha Nova"
                  />
                </label>
                <label>
                  Descrição
                  <input
                    value={manualInvoiceDescription}
                    onChange={(event) => setManualInvoiceDescription(event.target.value)}
                    placeholder="Ex.: Ilha pedida pelo cliente"
                  />
                </label>
                <label>
                  Valor total (€)
                  <input
                    required
                    type="number"
                    min="0"
                    step="0.01"
                    value={manualInvoiceAmount}
                    onChange={(event) => setManualInvoiceAmount(event.target.value)}
                    placeholder="0,00"
                  />
                </label>
                <label>
                  Data da fatura
                  <input
                    required={!useCurrentInvoiceDate}
                    type="date"
                    value={useCurrentInvoiceDate ? new Date().toISOString().slice(0, 10) : manualInvoiceDate}
                    disabled={useCurrentInvoiceDate}
                    onChange={(event) => setManualInvoiceDate(event.target.value)}
                  />
                </label>
                <label className="use-current-date">
                  <input
                    type="checkbox"
                    checked={useCurrentInvoiceDate}
                    onChange={(event) => setUseCurrentInvoiceDate(event.target.checked)}
                  />
                  Usar data de hoje
                </label>
                {invoiceEntryType === "extra" && (
                  <label>
                    Valor já pago (€)
                    <input
                      type="number"
                      min="0"
                      max={manualInvoiceAmount || undefined}
                      step="0.01"
                      value={manualExtraPaid}
                      onChange={(event) => setManualExtraPaid(event.target.value)}
                      placeholder="0,00"
                    />
                  </label>
                )}
                <button className="invoice-entry-submit" type="submit">
                  Guardar {invoiceEntryType === "extra"
                    ? "extra"
                    : invoiceEntryType === "labor"
                      ? "mão de obra"
                      : "fatura"}
                </button>
              </form>
            </section>
          </div>
        )}
      </section>
    </main>
  );
}
