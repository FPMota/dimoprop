"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase/client";

type Transaction = {
  id: string;
  amount: number;
  date: string;
};

type Invoice = {
  id: string;
  supplier: string;
  description: string;
  amount: number;
  date: string;
  workId: string;
  work: string;
  status: "Classificada" | "A rever";
  type: "normal" | "extra" | "labor";
  paid: number;
  payments: Transaction[];
};

type Work = {
  id: string;
  name: string;
  clientId: string;
  code: string;
  progress: number;
  budget: number;
  extras: number;
  received: number;
  receivedPayments: Transaction[];
  color: string;
};

type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};

const money = new Intl.NumberFormat("pt-PT", {
  style: "currency",
  currency: "EUR",
});

type ClientRow = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
};

type WorkRow = {
  id: string;
  name: string;
  code: string;
  budget: number | string | null;
  progress: number | null;
  status: string | null;
  client_id: string | null;
};

type InvoiceRow = {
  id: string;
  supplier: string | null;
  description: string | null;
  invoice_date: string | null;
  amount: number | string | null;
  status: string | null;
  type: "normal" | "extra" | "labor";
  work_id: string | null;
  file_path: string | null;
};

type InvoicePaymentRow = {
  id: string;
  invoice_id: string;
  amount: number | string | null;
  payment_date: string | null;
};

type WorkPaymentRow = {
  id: string;
  work_id: string;
  amount: number | string | null;
  payment_date: string | null;
  description: string | null;
};

const workColors = ["blue", "lime", "terracotta"] as const;

function toNumber(value: number | string | null | undefined) {
  return Number(value ?? 0) || 0;
}

function formatDate(dateValue: string | null | undefined) {
  if (!dateValue) return "—";
  const date = new Date(`${dateValue}T12:00:00`);
  if (Number.isNaN(date.getTime())) return dateValue;
  return date.toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function toIsoDate(value = new Date()) {
  return value.toISOString().slice(0, 10);
}

function extractAmount(text: string) {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  const amountPattern = /\d{1,3}(?:[.\s]\d{3})*(?:,\d{2}|\.\d{2})|\d+[,.]\d{2}/g;
  const labelPattern = /(?:\btotal\b|\btotal\s+geral\b|\bvalor\s+total\b|\ba\s+pagar\b|\bmontante\b|\bimporte\b)/i;
  const skipPattern = /sub\s*total|subtotal|iva|vat|imposto|saldo|pagamento|fatura|invoice/i;

  function normalizeAmount(candidate: string) {
    const value = candidate.replace(/[€$\s]/g, "");
    const normalized = value.includes(",")
      ? value.replace(/\./g, "").replace(",", ".")
      : value;
    return normalized && Number.isFinite(Number(normalized)) ? normalized : "";
  }

  function findLastMatch(textValue: string) {
    const matches = textValue.match(amountPattern);
    if (!matches?.length) return "";
    return normalizeAmount(matches.at(-1) ?? "");
  }

  for (let index = lines.length - 1; index >= 0; index -= 1) {
    const line = lines[index];
    if (!labelPattern.test(line) || skipPattern.test(line)) continue;
    const amountMatch = line.match(amountPattern)?.at(-1);
    if (amountMatch) return normalizeAmount(amountMatch);
    const nearby = lines.slice(index, index + 3).join(" ");
    const nearbyMatch = nearby.match(amountPattern)?.at(-1);
    if (nearbyMatch) return normalizeAmount(nearbyMatch);
  }

  return findLastMatch(text);
}

function extractDate(text: string) {
  const match = text.match(/\b(\d{1,2})[\/-](\d{1,2})[\/-](\d{2,4})\b/);
  if (!match) return "";
  const year = match[3].length === 2 ? `20${match[3]}` : match[3];
  return `${year}-${match[2].padStart(2, "0")}-${match[1].padStart(2, "0")}`;
}

function extractDescription(text: string, fallback: string) {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  const noisePattern = /^(de|emitente|fornecedor|morada|address|nif|n\.?º|nº|data|fatura|invoice|ref\.?|referencia|referência|total|subtotal|iva|vat|imposto|pagamento|pago|valor|montante)/i;
  const datePattern = /\b\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}\b/;
  const amountPattern = /\d{1,3}(?:[.\s]\d{3})*(?:,\d{2}|\.\d{2})|\d+[,.]\d{2}/;

  const candidate = lines.find(
    (line) =>
      line.length > 3 &&
      !noisePattern.test(line) &&
      !datePattern.test(line) &&
      !amountPattern.test(line) &&
      /\p{L}/u.test(line),
  );

  if (candidate) return candidate;

  return fallback;
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

async function getOwnerId() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  if (!data.user) throw new Error("Utilizador não autenticado.");
  return data.user.id;
}

function buildDisplayDate(value: string | null | undefined) {
  return formatDate(value);
}

function buildWorkColor(index: number) {
  return workColors[index % workColors.length];
}

function getPaymentTotal(payments: Transaction[]) {
  return payments.reduce((total, payment) => total + payment.amount, 0);
}

async function loadDashboardDataFromDb() {
  const [clientsResult, worksResult, invoicesResult, invoicePaymentsResult, workPaymentsResult] =
    await Promise.all([
      supabase
        .from("clients")
        .select("id,name,email,phone,address,created_at")
        .order("created_at", { ascending: true }),
      supabase
        .from("works")
        .select("id,name,code,budget,progress,status,client_id,created_at")
        .order("created_at", { ascending: true }),
      supabase
        .from("invoices")
        .select("id,supplier,description,invoice_date,amount,status,type,work_id,file_path,created_at")
        .order("created_at", { ascending: false }),
      supabase
        .from("invoice_payments")
        .select("id,invoice_id,amount,payment_date,created_at")
        .order("created_at", { ascending: true }),
      supabase
        .from("work_payments")
        .select("id,work_id,amount,payment_date,description,created_at")
        .order("created_at", { ascending: true }),
    ]);

  const firstError =
    clientsResult.error ??
    worksResult.error ??
    invoicesResult.error ??
    invoicePaymentsResult.error ??
    workPaymentsResult.error;
  if (firstError) throw firstError;

  const clientRows = (clientsResult.data ?? []) as ClientRow[];
  const workRows = (worksResult.data ?? []) as WorkRow[];
  const invoiceRows = (invoicesResult.data ?? []) as InvoiceRow[];
  const invoicePaymentRows = (invoicePaymentsResult.data ?? []) as InvoicePaymentRow[];
  const workPaymentRows = (workPaymentsResult.data ?? []) as WorkPaymentRow[];

  const clients = clientRows.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email ?? "",
    phone: row.phone ?? "",
    address: row.address ?? "",
  }));

  const paymentsByInvoiceId = new Map<string, InvoicePaymentRow[]>();
  for (const payment of invoicePaymentRows) {
    const list = paymentsByInvoiceId.get(payment.invoice_id) ?? [];
    list.push(payment);
    paymentsByInvoiceId.set(payment.invoice_id, list);
  }

  const workPaymentsByWorkId = new Map<string, WorkPaymentRow[]>();
  for (const payment of workPaymentRows) {
    const list = workPaymentsByWorkId.get(payment.work_id) ?? [];
    list.push(payment);
    workPaymentsByWorkId.set(payment.work_id, list);
  }

  const workLookup = new Map<string, WorkRow>();
  workRows.forEach((row) => workLookup.set(row.id, row));

  const invoices = invoiceRows.map((row) => {
    const payments = (paymentsByInvoiceId.get(row.id) ?? []).map((payment) => ({
      id: payment.id,
      amount: toNumber(payment.amount),
      date: buildDisplayDate(payment.payment_date),
    }));
    const work = row.work_id ? workLookup.get(row.work_id)?.name ?? "" : "";
    return {
      id: row.id,
      supplier: row.supplier ?? "",
      description: row.description ?? "",
      amount: toNumber(row.amount),
      date: buildDisplayDate(row.invoice_date),
      workId: row.work_id ?? "",
      work,
      status: row.status === "Classificada" ? "Classificada" : "A rever",
      type: row.type,
      paid: getPaymentTotal(payments),
      payments,
    } satisfies Invoice;
  });

  const workItems = workRows.map((row, index) => {
    const workInvoices = invoices.filter((invoice) => invoice.workId === row.id);
    const receivedPayments = (workPaymentsByWorkId.get(row.id) ?? []).map((payment) => ({
      id: payment.id,
      amount: toNumber(payment.amount),
      date: buildDisplayDate(payment.payment_date),
    }));
    const received = receivedPayments.reduce((total, payment) => total + payment.amount, 0);
    const budget = toNumber(row.budget);
    const progress = budget > 0 ? Math.min(Math.round((received / budget) * 100), 100) : 0;

    return {
      id: row.id,
      name: row.name,
      clientId: row.client_id ?? "",
      code: row.code,
      progress,
      budget,
      extras: workInvoices
        .filter((invoice) => invoice.type === "extra")
        .reduce((total, invoice) => total + invoice.amount, 0),
      received,
      receivedPayments,
      color: buildWorkColor(index),
    } satisfies Work;
  });

  return { workItems, clientItems: clients, invoices };
}

function decodePdfLiteralString(source: string) {
  let result = "";
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (char !== "\\") {
      result += char;
      continue;
    }
    index += 1;
    const next = source[index];
    switch (next) {
      case "n":
        result += "\n";
        break;
      case "r":
        result += "\r";
        break;
      case "t":
        result += "\t";
        break;
      case "b":
        result += "\b";
        break;
      case "f":
        result += "\f";
        break;
      case "(":
      case ")":
      case "\\":
        result += next;
        break;
      case "\n":
        break;
      case "\r":
        if (source[index + 1] === "\n") index += 1;
        break;
      default:
        result += next ?? "";
        break;
    }
  }
  return result;
}

async function tryDecodeFlateStream(bytes: Uint8Array) {
  if (typeof DecompressionStream === "undefined") return "";
  try {
    const arrayBuffer = bytes.buffer.slice(
      bytes.byteOffset,
      bytes.byteOffset + bytes.byteLength,
    ) as ArrayBuffer;
    const response = new Response(arrayBuffer).body?.pipeThrough(
      new DecompressionStream("deflate"),
    );
    if (!response) return "";
    const outputBuffer = await new Response(response).arrayBuffer();
    return new TextDecoder("latin1").decode(new Uint8Array(outputBuffer));
  } catch {
    return "";
  }
}

async function extractPdfTextFromFile(file: File) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const rawText = new TextDecoder("latin1").decode(bytes);
  const decodedParts: string[] = [];
  const streamPattern = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
  let matchedStream = false;

  for (const match of rawText.matchAll(streamPattern)) {
    matchedStream = true;
    const section = match[1] ?? "";
    const sectionStart = (match.index ?? 0) + (match[0]?.indexOf(section) ?? 0);
    const sectionEnd = sectionStart + section.length;
    const rawSectionBytes = bytes.slice(sectionStart, sectionEnd);
    const header = rawText.slice(Math.max(0, (match.index ?? 0) - 200), match.index ?? 0);
    const candidateSection = header.includes("/FlateDecode")
      ? (await tryDecodeFlateStream(rawSectionBytes) || section)
      : section;

    const literalMatches = Array.from(
      candidateSection.matchAll(/\((?:\\.|[^\\)])*\)\s*Tj/g),
      (match) => decodePdfLiteralString((match[0] ?? "").replace(/\)\s*Tj$/, "").slice(1, -1)),
    );
    const arrayMatches = Array.from(
      candidateSection.matchAll(/\[((?:.|\n)*?)\]\s*TJ/g),
      (match) =>
        Array.from(match[1].matchAll(/\((?:\\.|[^\\)])*\)|<[^>]+>/g), (chunk) => {
          const token = chunk[0] ?? "";
          if (token.startsWith("(")) {
            return decodePdfLiteralString(token.slice(1, -1));
          }
          const hex = token.slice(1, -1).replace(/\s+/g, "");
          const pairs = hex.match(/.{1,2}/g) ?? [];
          return pairs
            .map((pair) => String.fromCharCode(Number.parseInt(pair, 16)))
            .join("");
        }).join(" "),
    );
    const plainText = [literalMatches.join(" "), arrayMatches.join(" ")]
      .filter(Boolean)
      .join("\n");
    if (plainText.trim()) decodedParts.push(plainText.trim());
  }

  if (!matchedStream) {
    decodedParts.push(rawText);
  }

  const extracted = decodedParts.join("\n").replace(/\s+\n/g, "\n").trim();
  if (extracted) return extracted;

  return rawText;
}

export default function Home() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [workItems, setWorkItems] = useState<Work[]>([]);
  const [clientItems, setClientItems] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState("Todos os clientes");
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [dataError, setDataError] = useState("");
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
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
  const [paymentAmounts, setPaymentAmounts] = useState<Record<string, string>>(
    {},
  );
  const [workPaymentAmounts, setWorkPaymentAmounts] = useState<
    Record<string, string>
  >({});
  const [expandedPaymentHistory, setExpandedPaymentHistory] = useState<
    Record<string, boolean>
  >({});
  const [expandedWorkPayments, setExpandedWorkPayments] = useState<
    Record<string, boolean>
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

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const loaded = await loadDashboardDataFromDb();
        if (!active) return;
        setWorkItems(loaded.workItems);
        setClientItems(loaded.clientItems);
        setInvoices(loaded.invoices);
        setDataError("");
      } catch {
        if (!active) return;
        setDataError("Não foi possível carregar os dados da base de dados.");
      } finally {
        if (active) setIsLoadingData(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const visibleWorks = workItems.filter(
    (work) =>
      selectedClient === "Todos os clientes" ||
      work.clientId === selectedClient,
  );
  const detailWork = workItems.find((work) => work.name === selectedWorkDetail);
  const detailInvoices = detailWork
    ? invoices
        .filter((invoice) => invoice.workId === detailWork.id)
        .sort((first, second) => second.date.localeCompare(first.date))
    : [];

  function getWorkSpent(workName: string) {
    return invoices
      .filter((invoice) => invoice.work === workName)
      .reduce((total, invoice) => total + invoice.amount, 0);
  }

  async function reloadDashboardData() {
    const loaded = await loadDashboardDataFromDb();
    setWorkItems(loaded.workItems);
    setClientItems(loaded.clientItems);
    setInvoices(loaded.invoices);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  async function handleCreateClient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const clientName = newClientName.trim();
    if (!clientName) return;
    const ownerId = await getOwnerId();
    const { data, error } = await supabase
      .from("clients")
      .insert({
        owner_id: ownerId,
        name: clientName,
        email: newClientEmail.trim() || null,
        phone: newClientPhone.trim() || null,
      })
      .select("id")
      .single();
    if (error) throw error;
    setSelectedClient(data.id);
    setNewClientName("");
    setNewClientEmail("");
    setNewClientPhone("");
    setIsClientModalOpen(false);
    await reloadDashboardData();
  }

  async function handleCreateWork(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const ownerId = await getOwnerId();
    const clientId = newWorkClient || null;
    const budget = Number(newWorkBudget) || 0;
    const received = Math.max(0, Math.min(Number(newWorkReceived) || 0, budget));
    const code = `OB-${String(workItems.length + 1).padStart(3, "0")}`;
    const { data, error } = await supabase
      .from("works")
      .insert({
        owner_id: ownerId,
        name: newWorkName.trim(),
        code,
        budget,
        progress: 0,
        status: "Em curso",
        client_id: clientId,
      })
      .select("id")
      .single();
    if (error) throw error;

    if (received > 0) {
      const payment = await supabase.from("work_payments").insert({
        owner_id: ownerId,
        work_id: data.id,
        amount: received,
        payment_date: toIsoDate(),
        description: "Pagamento inicial",
      });
      if (payment.error) throw payment.error;
    }

    setSelectedClient(clientId ?? "Todos os clientes");
    setNewWorkName("");
    setNewWorkClient("");
    setNewWorkBudget("");
    setNewWorkReceived("");
    setIsWorkModalOpen(false);
    await reloadDashboardData();
  }

  function updateExtraPayment(invoiceId: string, value: string) {
    setPaymentAmounts((current) => ({ ...current, [invoiceId]: value }));
  }

  async function registerExtraPayment(invoiceId: string) {
    const amount = Math.max(0, Number(paymentAmounts[invoiceId]) || 0);
    if (!amount) return;
    const ownerId = await getOwnerId();
    const invoice = invoices.find((entry) => entry.id === invoiceId);
    if (!invoice) return;
    const remaining = Math.max(0, invoice.amount - invoice.paid);
    const payment = Math.min(amount, remaining);
    if (!payment) return;

    const { error } = await supabase.from("invoice_payments").insert({
      owner_id: ownerId,
      invoice_id: invoiceId,
      amount: payment,
      payment_date: toIsoDate(),
    });
    if (error) throw error;

    setPaymentAmounts((current) => ({ ...current, [invoiceId]: "" }));
    await reloadDashboardData();
  }

  function updateWorkPayment(workName: string, value: string) {
    setWorkPaymentAmounts((current) => ({ ...current, [workName]: value }));
  }

  async function registerWorkPayment(workName: string) {
    const amount = Math.max(0, Number(workPaymentAmounts[workName]) || 0);
    if (!amount) return;
    const ownerId = await getOwnerId();
    const work = workItems.find((entry) => entry.name === workName);
    if (!work) return;
    const remaining = Math.max(0, work.budget - work.received);
    const payment = Math.min(amount, remaining);
    if (!payment) return;

    const { error } = await supabase.from("work_payments").insert({
      owner_id: ownerId,
      work_id: work.id,
      amount: payment,
      payment_date: toIsoDate(),
      description: "Pagamento registado",
    });
    if (error) throw error;

    setWorkPaymentAmounts((current) => ({ ...current, [workName]: "" }));
    await reloadDashboardData();
  }

  async function removeInvoice(invoiceId: string) {
    const { error } = await supabase.from("invoices").delete().eq("id", invoiceId);
    if (error) throw error;
    setExpandedPaymentHistory((current) => {
      const remaining = { ...current };
      delete remaining[invoiceId];
      return remaining;
    });
    await reloadDashboardData();
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

  async function createManualInvoice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!detailWork || !invoiceEntryType || !manualInvoiceSupplier.trim()) return;

    const ownerId = await getOwnerId();
    const amount = Math.max(0, Number(manualInvoiceAmount) || 0);
    const paid =
      invoiceEntryType === "extra"
        ? Math.min(amount, Math.max(0, Number(manualExtraPaid) || 0))
        : 0;
    const invoiceDate = useCurrentInvoiceDate
      ? toIsoDate()
      : manualInvoiceDate;

    const { data, error } = await supabase
      .from("invoices")
      .insert({
        owner_id: ownerId,
        work_id: detailWork.id,
        supplier: manualInvoiceSupplier.trim(),
        description: manualInvoiceDescription.trim() || "Sem descrição",
        amount,
        invoice_date: invoiceDate,
        status: "Classificada",
        type: invoiceEntryType,
      })
      .select("id")
      .single();
    if (error) throw error;

    if (paid > 0) {
      const payment = await supabase.from("invoice_payments").insert({
        owner_id: ownerId,
        invoice_id: data.id,
        amount: paid,
        payment_date: invoiceDate,
      });
      if (payment.error) throw payment.error;
    }

    setInvoiceEntryType(null);
    await reloadDashboardData();
  }

  async function handleInvoiceUpload(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploadingInvoice(true);
    const isPdf =
      file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    setOcrNotice(
      isPdf ? "A ler o PDF neste dispositivo..." : "A ler a imagem neste dispositivo...",
    );

    try {
      let text = "";
      if (isPdf) {
        text = await extractPdfTextFromFile(file);
      } else if (file.type.startsWith("image/")) {
        const { recognize } = await import("tesseract.js");
        const result = await recognize(file, "por");
        text = result.data.text;
      } else {
        throw new Error("Este ficheiro não é uma imagem nem um PDF.");
      }

      setManualInvoiceSupplier(
        extractSupplier(text, file.name.replace(/\.[^/.]+$/, "")),
      );
      const detectedDate = extractDate(text);
      const detectedDescription = extractDescription(
        text,
        file.name.replace(/\.[^/.]+$/, ""),
      );
      setManualInvoiceDescription(detectedDescription || "");
      setManualInvoiceAmount(extractAmount(text));
      setManualInvoiceDate(detectedDate);
      setUseCurrentInvoiceDate(!detectedDate);
      setOcrNotice(
        isPdf
          ? "PDF lido localmente. Confirma a descrição e o valor antes de guardar."
          : "Dados lidos localmente. Confirma ou corrige os campos antes de guardar.",
      );
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
      {isLoadingData && (
        <div className="ocr-notice ocr-notice-success" role="status">
          A carregar dados da base de dados...
        </div>
      )}
      {dataError && (
        <div className="ocr-notice" role="alert">
          {dataError}
        </div>
      )}
      <aside className="dashboard-sidebar">
        <div className="sidebar-topbar">
          <div className="brand-lockup">
            <span className="company-name company-name-small">DIMOPROP</span>
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
          <span className="status-dot" /> Dados na base de dados{" "}
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
              onClick={() => setIsClientModalOpen(true)}
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
                <div className="modal-actions">
                  <button
                    className="text-button"
                    type="button"
                    onClick={() => setIsClientModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button className="auth-submit" type="submit">
                    Guardar cliente <span>→</span>
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
                  <b>
                    {
                      detailInvoices.filter((invoice) => invoice.type === "normal")
                        .length
                    }
                  </b>
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
                  <span>Extras</span>
                  <strong>{money.format(detailWork.extras)}</strong>
                </div>
                <div className="received-metric">
                  <div className="received-metric-top">
                    <span>Pagamentos</span>
                    <strong className="received-value">
                      {money.format(detailWork.received)}
                    </strong>
                  </div>
                  <div className="received-meter" aria-hidden="true">
                    <span
                      style={{
                        width:
                          detailWork.budget > 0
                            ? `${Math.min(
                                (detailWork.received / detailWork.budget) * 100,
                                100,
                              )}%`
                            : "0%",
                      }}
                    />
                  </div>
                  <div className="received-metric-foot">
                    <span>Já pago {money.format(detailWork.received)}</span>
                    <span>Falta {money.format(Math.max(0, detailWork.budget - detailWork.received))}</span>
                  </div>
                  <button
                    className="received-toggle"
                    type="button"
                    onClick={() =>
                      setExpandedWorkPayments((current) => ({
                        ...current,
                        [detailWork.name]: !current[detailWork.name],
                      }))
                    }
                    aria-expanded={Boolean(expandedWorkPayments[detailWork.name])}
                    aria-label={`Adicionar pagamento a ${detailWork.name}`}
                  >
                    {expandedWorkPayments[detailWork.name] ? "−" : "+"}
                  </button>
                  {expandedWorkPayments[detailWork.name] && (
                    <div className="work-payment-history">
                      <strong>Histórico de pagamentos</strong>
                      {detailWork.receivedPayments.length ? (
                        <div className="payment-history-list">
                          {detailWork.receivedPayments.map((payment) => (
                            <span key={payment.id}>
                              {payment.date} · {money.format(payment.amount)}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="no-payments">
                          Ainda sem pagamentos registados.
                        </span>
                      )}
                      <label>
                        Adicionar pagamento
                        <input
                          type="number"
                          min="0"
                          max={Math.max(0, detailWork.budget - detailWork.received)}
                          step="0.01"
                          value={workPaymentAmounts[detailWork.name] ?? ""}
                          onChange={(event) =>
                            updateWorkPayment(detailWork.name, event.target.value)
                          }
                        />
                        <button
                          type="button"
                          onClick={() => registerWorkPayment(detailWork.name)}
                        >
                          Registar
                        </button>
                      </label>
                    </div>
                  )}
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
                    <b>
                      {
                        detailInvoices.filter(
                          (invoice) => invoice.type === "normal",
                        ).length
                      }
                    </b>
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
                <small>Imagem ou PDF — a leitura é feita no teu dispositivo</small>
                <input
                  type="file"
                  accept="image/*,application/pdf"
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

