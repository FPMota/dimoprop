(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/supabase/client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const works = [
    {
        name: "Casa do Pinhal",
        clientId: "client-martins",
        code: "OB-024",
        progress: 72,
        budget: 68400,
        extras: 3250,
        received: 42000,
        receivedPayments: [
            {
                id: 1001,
                amount: 42000,
                date: "18 ago 2026"
            }
        ],
        color: "terracotta"
    },
    {
        name: "Apartamento Baixa",
        clientId: "client-rita",
        code: "OB-023",
        progress: 38,
        budget: 41200,
        extras: 0,
        received: 15000,
        receivedPayments: [
            {
                id: 1002,
                amount: 15000,
                date: "17 ago 2026"
            }
        ],
        color: "lime"
    },
    {
        name: "Moradia do Lago",
        clientId: "client-martins",
        code: "OB-021",
        progress: 91,
        budget: 98700,
        extras: 8450,
        received: 92500,
        receivedPayments: [
            {
                id: 1003,
                amount: 92500,
                date: "14 ago 2026"
            }
        ],
        color: "blue"
    }
];
const initialClients = [
    {
        id: "client-martins",
        name: "Família Martins"
    },
    {
        id: "client-rita",
        name: "João e Rita"
    },
    {
        id: "client-empty",
        name: "Marco"
    }
];
const initialInvoices = [
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
        payments: []
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
        payments: []
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
        payments: []
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
            {
                id: 41,
                amount: 300,
                date: "10 ago 2026"
            },
            {
                id: 42,
                amount: 300,
                date: "14 ago 2026"
            }
        ]
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
            {
                id: 51,
                amount: 150,
                date: "12 ago 2026"
            },
            {
                id: 52,
                amount: 850,
                date: "18 ago 2026"
            }
        ]
    }
];
const money = new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR"
});
function extractAmount(text) {
    const lines = text.split("\n").map((line)=>line.trim()).filter(Boolean);
    const amountPattern = /\d{1,3}(?:[.\s]\d{3})*(?:,\d{2}|\.\d{2})|\d+[,.]\d{2}/g;
    const labelPattern = /(?:\btotal\b|\btotal\s+geral\b|\bvalor\s+total\b|\ba\s+pagar\b|\bmontante\b|\bimporte\b)/i;
    const skipPattern = /sub\s*total|subtotal|iva|vat|imposto|saldo|pagamento|fatura|invoice/i;
    function normalizeAmount(candidate) {
        const value = candidate.replace(/[€$\s]/g, "");
        const normalized = value.includes(",") ? value.replace(/\./g, "").replace(",", ".") : value;
        return normalized && Number.isFinite(Number(normalized)) ? normalized : "";
    }
    function findLastMatch(textValue) {
        const matches = textValue.match(amountPattern);
        if (!matches?.length) return "";
        return normalizeAmount(matches.at(-1) ?? "");
    }
    for(let index = lines.length - 1; index >= 0; index -= 1){
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
function extractDate(text) {
    const match = text.match(/\b(\d{1,2})[\/-](\d{1,2})[\/-](\d{2,4})\b/);
    if (!match) return "";
    const year = match[3].length === 2 ? `20${match[3]}` : match[3];
    return `${year}-${match[2].padStart(2, "0")}-${match[1].padStart(2, "0")}`;
}
function extractDescription(text, fallback) {
    const lines = text.split("\n").map((line)=>line.trim()).filter(Boolean);
    const noisePattern = /^(de|emitente|fornecedor|morada|address|nif|n\.?º|nº|data|fatura|invoice|ref\.?|referencia|referência|total|subtotal|iva|vat|imposto|pagamento|pago|valor|montante)/i;
    const datePattern = /\b\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}\b/;
    const amountPattern = /\d{1,3}(?:[.\s]\d{3})*(?:,\d{2}|\.\d{2})|\d+[,.]\d{2}/;
    const candidate = lines.find((line)=>line.length > 3 && !noisePattern.test(line) && !datePattern.test(line) && !amountPattern.test(line) && /[a-zA-ZÀ-ÿ]/.test(line));
    if (candidate) return candidate;
    return fallback;
}
function extractSupplier(text, fallback) {
    const lines = text.split("\n").map((line)=>line.trim()).filter(Boolean);
    const senderIndex = lines.findIndex((line)=>/^(de|emitente|fornecedor)\b/i.test(line));
    if (senderIndex >= 0) {
        const sameLineName = lines[senderIndex].replace(/^(de|emitente|fornecedor)\s*:?[\s-]*/i, "");
        if (sameLineName.length > 2 && !/rua|avenida|av\.|travessa|estrada/i.test(sameLineName)) {
            return sameLineName;
        }
        const candidate = lines.slice(senderIndex + 1, senderIndex + 4).find((line)=>line.length > 2 && !/rua|avenida|av\.|travessa|estrada|fatura|data|p\.o/i.test(line));
        if (candidate) return candidate;
    }
    return fallback;
}
function decodePdfLiteralString(source) {
    let result = "";
    for(let index = 0; index < source.length; index += 1){
        const char = source[index];
        if (char !== "\\") {
            result += char;
            continue;
        }
        index += 1;
        const next = source[index];
        switch(next){
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
async function tryDecodeFlateStream(bytes) {
    if (typeof DecompressionStream === "undefined") return "";
    try {
        const arrayBuffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
        const response = new Response(arrayBuffer).body?.pipeThrough(new DecompressionStream("deflate"));
        if (!response) return "";
        const outputBuffer = await new Response(response).arrayBuffer();
        return new TextDecoder("latin1").decode(new Uint8Array(outputBuffer));
    } catch  {
        return "";
    }
}
async function extractPdfTextFromFile(file) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const rawText = new TextDecoder("latin1").decode(bytes);
    const decodedParts = [];
    const streamPattern = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
    let matchedStream = false;
    for (const match of rawText.matchAll(streamPattern)){
        matchedStream = true;
        const section = match[1] ?? "";
        const sectionStart = (match.index ?? 0) + (match[0]?.indexOf(section) ?? 0);
        const sectionEnd = sectionStart + section.length;
        const rawSectionBytes = bytes.slice(sectionStart, sectionEnd);
        const header = rawText.slice(Math.max(0, (match.index ?? 0) - 200), match.index ?? 0);
        const candidateSection = header.includes("/FlateDecode") ? await tryDecodeFlateStream(rawSectionBytes) || section : section;
        const literalMatches = Array.from(candidateSection.matchAll(/\((?:\\.|[^\\)])*\)\s*Tj/g), (match)=>decodePdfLiteralString((match[0] ?? "").replace(/\)\s*Tj$/, "").slice(1, -1)));
        const arrayMatches = Array.from(candidateSection.matchAll(/\[((?:.|\n)*?)\]\s*TJ/g), (match)=>Array.from(match[1].matchAll(/\((?:\\.|[^\\)])*\)|<[^>]+>/g), (chunk)=>{
                const token = chunk[0] ?? "";
                if (token.startsWith("(")) {
                    return decodePdfLiteralString(token.slice(1, -1));
                }
                const hex = token.slice(1, -1).replace(/\s+/g, "");
                const pairs = hex.match(/.{1,2}/g) ?? [];
                return pairs.map((pair)=>String.fromCharCode(Number.parseInt(pair, 16))).join("");
            }).join(" "));
        const plainText = [
            literalMatches.join(" "),
            arrayMatches.join(" ")
        ].filter(Boolean).join("\n");
        if (plainText.trim()) decodedParts.push(plainText.trim());
    }
    if (!matchedStream) {
        decodedParts.push(rawText);
    }
    const extracted = decodedParts.join("\n").replace(/\s+\n/g, "\n").trim();
    if (extracted) return extracted;
    return rawText;
}
function Home() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isSidebarOpen, setIsSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [workItems, setWorkItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(works);
    const [clientItems, setClientItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialClients);
    const [selectedClient, setSelectedClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Todos os clientes");
    const [invoices, setInvoices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialInvoices);
    const [isClientModalOpen, setIsClientModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCreatingClient, setIsCreatingClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [clientError, setClientError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [newClientName, setNewClientName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [newClientEmail, setNewClientEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [newClientPhone, setNewClientPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isWorkModalOpen, setIsWorkModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newWorkName, setNewWorkName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [newWorkClient, setNewWorkClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [newWorkBudget, setNewWorkBudget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [newWorkReceived, setNewWorkReceived] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedWorkDetail, setSelectedWorkDetail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [workDetailTab, setWorkDetailTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("normal");
    const [showProfit, setShowProfit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isUploadingInvoice, setIsUploadingInvoice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [paymentAmounts, setPaymentAmounts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [workPaymentAmounts, setWorkPaymentAmounts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [expandedPaymentHistory, setExpandedPaymentHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [expandedWorkPayments, setExpandedWorkPayments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [invoiceEntryType, setInvoiceEntryType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [manualInvoiceSupplier, setManualInvoiceSupplier] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [manualInvoiceDescription, setManualInvoiceDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [manualInvoiceAmount, setManualInvoiceAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [manualExtraPaid, setManualExtraPaid] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [manualInvoiceDate, setManualInvoiceDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [useCurrentInvoiceDate, setUseCurrentInvoiceDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [ocrNotice, setOcrNotice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const visibleWorks = workItems.filter((work)=>selectedClient === "Todos os clientes" || work.clientId === selectedClient);
    const detailWork = workItems.find((work)=>work.name === selectedWorkDetail);
    const detailInvoices = detailWork ? invoices.filter((invoice)=>invoice.work === detailWork.name).sort((first, second)=>second.date.localeCompare(first.date)) : [];
    function getWorkSpent(workName) {
        return invoices.filter((invoice)=>invoice.work === workName).reduce((total, invoice)=>total + invoice.amount, 0);
    }
    async function handleLogout() {
        await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
        router.replace("/login");
    }
    async function handleCreateClient(event) {
        event.preventDefault();
        setClientError("");
        setIsCreatingClient(true);
        const { data: { user } } = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
        if (!user) {
            setClientError("O cliente só pode ser guardado depois de iniciares sessão no Supabase.");
            setIsCreatingClient(false);
            return;
        }
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("clients").insert({
            owner_id: user.id,
            name: newClientName,
            email: newClientEmail || null,
            phone: newClientPhone || null
        });
        if (error) {
            setClientError("Não foi possível criar o cliente. Confirma se a tabela clients já foi criada no Supabase.");
            setIsCreatingClient(false);
            return;
        }
        const clientId = `client-local-${Date.now()}`;
        setClientItems((current)=>[
                ...current,
                {
                    id: clientId,
                    name: newClientName
                }
            ]);
        setSelectedClient(clientId);
        setNewClientName("");
        setNewClientEmail("");
        setNewClientPhone("");
        setIsCreatingClient(false);
        setIsClientModalOpen(false);
    }
    function handleCreateWork(event) {
        event.preventDefault();
        const clientId = newWorkClient || `client-local-${Date.now()}`;
        const budget = Number(newWorkBudget) || 0;
        const received = Math.max(0, Math.min(Number(newWorkReceived) || 0, budget));
        const newWork = {
            name: newWorkName,
            clientId,
            code: `OB-${String(workItems.length + 25).padStart(3, "0")}`,
            progress: 0,
            budget,
            extras: 0,
            received,
            receivedPayments: received > 0 ? [
                {
                    id: Date.now(),
                    amount: received,
                    date: new Date().toLocaleDateString("pt-PT", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    })
                }
            ] : [],
            color: "blue"
        };
        setWorkItems((current)=>[
                ...current,
                newWork
            ]);
        if (!clientItems.some((client)=>client.id === clientId)) setClientItems((current)=>[
                ...current,
                {
                    id: clientId,
                    name: "Novo cliente"
                }
            ]);
        setSelectedClient(clientId);
        setNewWorkName("");
        setNewWorkClient("");
        setNewWorkBudget("");
        setNewWorkReceived("");
        setIsWorkModalOpen(false);
    }
    function updateExtraPayment(invoiceId, value) {
        setPaymentAmounts((current)=>({
                ...current,
                [invoiceId]: value
            }));
    }
    function registerExtraPayment(invoiceId) {
        const amount = Math.max(0, Number(paymentAmounts[invoiceId]) || 0);
        if (!amount) return;
        setInvoices((current)=>current.map((invoice)=>{
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
                                month: "short"
                            })
                        }
                    ]
                };
            }));
        setPaymentAmounts((current)=>({
                ...current,
                [invoiceId]: ""
            }));
    }
    function updateWorkPayment(workName, value) {
        setWorkPaymentAmounts((current)=>({
                ...current,
                [workName]: value
            }));
    }
    function registerWorkPayment(workName) {
        const amount = Math.max(0, Number(workPaymentAmounts[workName]) || 0);
        if (!amount) return;
        setWorkItems((current)=>current.map((work)=>{
                if (work.name !== workName) return work;
                const remaining = Math.max(0, work.budget - work.received);
                const payment = Math.min(amount, remaining);
                if (!payment) return work;
                return {
                    ...work,
                    received: work.received + payment,
                    receivedPayments: [
                        ...work.receivedPayments,
                        {
                            id: Date.now(),
                            amount: payment,
                            date: new Date().toLocaleDateString("pt-PT", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric"
                            })
                        }
                    ]
                };
            }));
        setWorkPaymentAmounts((current)=>({
                ...current,
                [workName]: ""
            }));
    }
    function removeInvoice(invoiceId) {
        setInvoices((current)=>current.filter((invoice)=>invoice.id !== invoiceId));
        setExpandedPaymentHistory((current)=>{
            const remaining = {
                ...current
            };
            delete remaining[invoiceId];
            return remaining;
        });
    }
    function openInvoiceEntry(type) {
        setInvoiceEntryType(type);
        setManualInvoiceSupplier("");
        setManualInvoiceDescription("");
        setManualInvoiceAmount("");
        setManualExtraPaid("");
        setManualInvoiceDate("");
        setUseCurrentInvoiceDate(true);
        setOcrNotice("");
    }
    function createManualInvoice(event) {
        event.preventDefault();
        if (!detailWork || !invoiceEntryType || !manualInvoiceSupplier.trim()) return;
        const amount = Math.max(0, Number(manualInvoiceAmount) || 0);
        const paid = invoiceEntryType === "extra" ? Math.min(amount, Math.max(0, Number(manualExtraPaid) || 0)) : 0;
        const invoiceDate = useCurrentInvoiceDate ? new Date().toISOString().slice(0, 10) : manualInvoiceDate;
        const date = new Date(`${invoiceDate}T12:00:00`).toLocaleDateString("pt-PT", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
        setInvoices((current)=>[
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
                    payments: paid > 0 ? [
                        {
                            id: Date.now() + 1,
                            amount: paid,
                            date
                        }
                    ] : []
                },
                ...current
            ]);
        setInvoiceEntryType(null);
    }
    async function handleInvoiceUpload(event) {
        const file = event.target.files?.[0];
        if (!file) return;
        setIsUploadingInvoice(true);
        const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
        setOcrNotice(isPdf ? "A ler o PDF neste dispositivo..." : "A ler a imagem neste dispositivo...");
        try {
            let text = "";
            if (isPdf) {
                text = await extractPdfTextFromFile(file);
            } else if (file.type.startsWith("image/")) {
                const { recognize } = await __turbopack_context__.A("[project]/node_modules/tesseract.js/src/index.js [app-client] (ecmascript, async loader)");
                const result = await recognize(file, "por");
                text = result.data.text;
            } else {
                throw new Error("Este ficheiro não é uma imagem nem um PDF.");
            }
            setManualInvoiceSupplier(extractSupplier(text, file.name.replace(/\.[^/.]+$/, "")));
            const detectedDate = extractDate(text);
            const detectedDescription = extractDescription(text, file.name.replace(/\.[^/.]+$/, ""));
            setManualInvoiceDescription(detectedDescription || "");
            setManualInvoiceAmount(extractAmount(text));
            setManualInvoiceDate(detectedDate);
            setUseCurrentInvoiceDate(!detectedDate);
            setOcrNotice(isPdf ? "PDF lido localmente. Confirma a descrição e o valor antes de guardar." : "Dados lidos localmente. Confirma ou corrige os campos antes de guardar.");
        } catch (error) {
            setManualInvoiceSupplier(file.name.replace(/\.[^/.]+$/, ""));
            setOcrNotice(error instanceof Error ? error.message : "Não foi possível ler a fatura. Preenche os campos manualmente.");
        } finally{
            setIsUploadingInvoice(false);
            event.target.value = "";
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: `dashboard-shell ${isSidebarOpen ? "sidebar-open" : "sidebar-collapsed"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "dashboard-sidebar",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sidebar-topbar",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "brand-lockup",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        className: "company-logo company-logo-small",
                                        src: "/dimoprop-logo.svg",
                                        alt: "Dimoprop Construções e Remodelações",
                                        width: 720,
                                        height: 270,
                                        priority: true
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 698,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "sidebar-logo-compact",
                                        "aria-hidden": "true",
                                        children: "D"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 706,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/page.tsx",
                                lineNumber: 697,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "sidebar-toggle",
                                type: "button",
                                onClick: ()=>setIsSidebarOpen((open)=>!open),
                                "aria-label": isSidebarOpen ? "Fechar barra lateral" : "Abrir barra lateral",
                                title: isSidebarOpen ? "Fechar barra lateral" : "Abrir barra lateral",
                                children: "☰"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/page.tsx",
                                lineNumber: 710,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/page.tsx",
                        lineNumber: 696,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sidebar-label",
                        children: "Área de trabalho"
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/page.tsx",
                        lineNumber: 724,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "sidebar-nav",
                        "aria-label": "Navegação principal",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                className: "nav-item nav-item-active",
                                href: "#resumo",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "▦"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 727,
                                        columnNumber: 13
                                    }, this),
                                    " Resumo"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/page.tsx",
                                lineNumber: 726,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                className: "nav-item",
                                href: "#obras",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "⌂"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 730,
                                        columnNumber: 13
                                    }, this),
                                    " Obras ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: visibleWorks.length
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 730,
                                        columnNumber: 34
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/page.tsx",
                                lineNumber: 729,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/page.tsx",
                        lineNumber: 725,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sidebar-bottom",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "status-dot"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/page.tsx",
                                lineNumber: 734,
                                columnNumber: 11
                            }, this),
                            " Dados locais",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-[var(--muted)]",
                                children: "v0.1"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/page.tsx",
                                lineNumber: 735,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/page.tsx",
                        lineNumber: 733,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/page.tsx",
                lineNumber: 695,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "dashboard-content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "dashboard-header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "dashboard-heading",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "eyebrow",
                                            children: "Terça-feira, 18 de agosto de 2026"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 743,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "display-font dashboard-title",
                                            children: "Olá, Dino."
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 744,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/app/page.tsx",
                                    lineNumber: 742,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/page.tsx",
                                lineNumber: 741,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "header-actions",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "new-client-button",
                                        type: "button",
                                        onClick: ()=>{
                                            setClientError("");
                                            setIsClientModalOpen(true);
                                        },
                                        children: "+ Novo cliente"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 748,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "profile-chip profile-button",
                                        type: "button",
                                        onClick: handleLogout,
                                        title: "Terminar sessão",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "profile-avatar",
                                                children: "DM"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 764,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "hidden sm:block",
                                                children: "Dino Mota"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 765,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                "aria-hidden": "true",
                                                children: "↪"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 766,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 758,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/page.tsx",
                                lineNumber: 747,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/page.tsx",
                        lineNumber: 740,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "content-section",
                        id: "obras",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "section-heading",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "eyebrow",
                                                children: "A acompanhar"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 774,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "display-font section-title",
                                                children: "As tuas obras"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 775,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 773,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "section-actions",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "client-picker",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Cliente"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 779,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: selectedClient,
                                                        onChange: (event)=>setSelectedClient(event.target.value),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                children: "Todos os clientes"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 784,
                                                                columnNumber: 19
                                                            }, this),
                                                            clientItems.map((client)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: client.id,
                                                                    children: client.name
                                                                }, client.id, false, {
                                                                    fileName: "[project]/frontend/app/page.tsx",
                                                                    lineNumber: 786,
                                                                    columnNumber: 21
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 780,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 778,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "new-work-button",
                                                type: "button",
                                                onClick: ()=>setIsWorkModalOpen(true),
                                                children: "+ Adicionar obra"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 792,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "text-button",
                                                children: [
                                                    "Ver todas ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "→"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 800,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 799,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 777,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/page.tsx",
                                lineNumber: 772,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "works-grid",
                                children: visibleWorks.map((work)=>{
                                    const spent = getWorkSpent(work.name);
                                    const clientName = clientItems.find((client)=>client.id === work.clientId)?.name ?? "Sem cliente";
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        className: "work-card work-card-clickable",
                                        onClick: ()=>{
                                            setSelectedWorkDetail(work.name);
                                            setWorkDetailTab("normal");
                                            setShowProfit(false);
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `work-color work-color-${work.color}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: work.code
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 821,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "↗"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 822,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 820,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "work-card-body",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start justify-between gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                        children: work.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/app/page.tsx",
                                                                        lineNumber: 827,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "work-client",
                                                                        children: clientName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/app/page.tsx",
                                                                        lineNumber: 828,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 826,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "work-progress",
                                                                children: [
                                                                    work.progress,
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 830,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 825,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "progress-track",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                width: `${work.progress}%`
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/page.tsx",
                                                            lineNumber: 833,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 832,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "work-finance",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "Orçamento"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/app/page.tsx",
                                                                        lineNumber: 837,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        children: money.format(work.budget)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/app/page.tsx",
                                                                        lineNumber: 838,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 836,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "Extras"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/app/page.tsx",
                                                                        lineNumber: 841,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        className: work.extras ? "extra-value" : "",
                                                                        children: work.extras ? `+ ${money.format(work.extras)}` : "—"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/app/page.tsx",
                                                                        lineNumber: 842,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 840,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "Recebido"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/app/page.tsx",
                                                                        lineNumber: 847,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        className: "received-value",
                                                                        children: money.format(work.received)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/app/page.tsx",
                                                                        lineNumber: 848,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 846,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 835,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "work-meta",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Gasto registado"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 854,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: money.format(spent)
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 855,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 853,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 824,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, work.code, true, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 811,
                                        columnNumber: 17
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/page.tsx",
                                lineNumber: 804,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/page.tsx",
                        lineNumber: 771,
                        columnNumber: 9
                    }, this),
                    isClientModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "client-modal-backdrop",
                        role: "presentation",
                        onMouseDown: (event)=>{
                            if (event.target === event.currentTarget) setIsClientModalOpen(false);
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "client-modal",
                            role: "dialog",
                            "aria-modal": "true",
                            "aria-labelledby": "new-client-title",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "modal-heading",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "eyebrow",
                                                    children: "Dimoprop / cliente"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 881,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    id: "new-client-title",
                                                    className: "display-font",
                                                    children: "Novo cliente"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 882,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 880,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "modal-close",
                                            type: "button",
                                            onClick: ()=>setIsClientModalOpen(false),
                                            "aria-label": "Fechar",
                                            children: "×"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 886,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/app/page.tsx",
                                    lineNumber: 879,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    className: "client-form",
                                    onSubmit: handleCreateClient,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "client-name",
                                            children: [
                                                "Nome",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "client-name",
                                                    value: newClientName,
                                                    onChange: (event)=>setNewClientName(event.target.value),
                                                    placeholder: "Nome do cliente",
                                                    required: true,
                                                    autoFocus: true
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 898,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 896,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "client-email",
                                            children: [
                                                "Email",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "client-email",
                                                    type: "email",
                                                    value: newClientEmail,
                                                    onChange: (event)=>setNewClientEmail(event.target.value),
                                                    placeholder: "cliente@email.pt"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 909,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 907,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "client-phone",
                                            children: [
                                                "Telefone",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "client-phone",
                                                    value: newClientPhone,
                                                    onChange: (event)=>setNewClientPhone(event.target.value),
                                                    placeholder: "912 345 678"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 919,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 917,
                                            columnNumber: 17
                                        }, this),
                                        clientError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "auth-error",
                                            role: "alert",
                                            children: clientError
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 927,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "modal-actions",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "text-button",
                                                    type: "button",
                                                    onClick: ()=>setIsClientModalOpen(false),
                                                    children: "Cancelar"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 932,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "auth-submit",
                                                    type: "submit",
                                                    disabled: isCreatingClient,
                                                    children: [
                                                        isCreatingClient ? "A guardar..." : "Guardar cliente",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "→"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/page.tsx",
                                                            lineNumber: 945,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 939,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 931,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/app/page.tsx",
                                    lineNumber: 895,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/app/page.tsx",
                            lineNumber: 873,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/page.tsx",
                        lineNumber: 865,
                        columnNumber: 11
                    }, this),
                    isWorkModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "client-modal-backdrop",
                        role: "presentation",
                        onMouseDown: (event)=>{
                            if (event.target === event.currentTarget) setIsWorkModalOpen(false);
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "client-modal",
                            role: "dialog",
                            "aria-modal": "true",
                            "aria-labelledby": "new-work-title",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "modal-heading",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "eyebrow",
                                                    children: "Dimoprop / obra"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 969,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    id: "new-work-title",
                                                    className: "display-font",
                                                    children: "Adicionar obra"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 970,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 968,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "modal-close",
                                            type: "button",
                                            onClick: ()=>setIsWorkModalOpen(false),
                                            "aria-label": "Fechar",
                                            children: "×"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 974,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/app/page.tsx",
                                    lineNumber: 967,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    className: "client-form",
                                    onSubmit: handleCreateWork,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "work-name",
                                            children: [
                                                "Nome da obra",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "work-name",
                                                    value: newWorkName,
                                                    onChange: (event)=>setNewWorkName(event.target.value),
                                                    placeholder: "Ex.: Moradia do Norte",
                                                    required: true,
                                                    autoFocus: true
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 986,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 984,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "work-client",
                                            children: [
                                                "Cliente",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    id: "work-client",
                                                    value: newWorkClient,
                                                    onChange: (event)=>setNewWorkClient(event.target.value),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "Novo cliente"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/page.tsx",
                                                            lineNumber: 1002,
                                                            columnNumber: 21
                                                        }, this),
                                                        clientItems.map((client)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: client.id,
                                                                children: client.name
                                                            }, client.id, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 1004,
                                                                columnNumber: 23
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 997,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 995,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "work-budget",
                                            children: [
                                                "Orçamento total",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "work-budget",
                                                    type: "number",
                                                    min: "0",
                                                    step: "0.01",
                                                    value: newWorkBudget,
                                                    onChange: (event)=>setNewWorkBudget(event.target.value),
                                                    placeholder: "0,00",
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1012,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 1010,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "work-received",
                                            children: [
                                                "Já recebido",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "work-received",
                                                    type: "number",
                                                    min: "0",
                                                    step: "0.01",
                                                    value: newWorkReceived,
                                                    onChange: (event)=>setNewWorkReceived(event.target.value),
                                                    placeholder: "0,00"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1025,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 1023,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "modal-actions",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "text-button",
                                                    type: "button",
                                                    onClick: ()=>setIsWorkModalOpen(false),
                                                    children: "Cancelar"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1036,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "auth-submit",
                                                    type: "submit",
                                                    children: [
                                                        "Guardar obra ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "→"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/page.tsx",
                                                            lineNumber: 1044,
                                                            columnNumber: 34
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1043,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 1035,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/app/page.tsx",
                                    lineNumber: 983,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/app/page.tsx",
                            lineNumber: 961,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/page.tsx",
                        lineNumber: 953,
                        columnNumber: 11
                    }, this),
                    detailWork && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "work-detail-backdrop",
                        role: "presentation",
                        onMouseDown: (event)=>{
                            if (event.target === event.currentTarget) setSelectedWorkDetail(null);
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "work-detail",
                            role: "dialog",
                            "aria-modal": "true",
                            "aria-labelledby": "work-detail-title",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                    className: "work-detail-header",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "eyebrow",
                                                    children: [
                                                        detailWork.code,
                                                        " / detalhe da obra"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1068,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    id: "work-detail-title",
                                                    className: "display-font",
                                                    children: detailWork.name
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1069,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "work-client",
                                                    children: clientItems.find((client)=>client.id === detailWork.clientId)?.name ?? "Sem cliente"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1072,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 1067,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "work-detail-header-actions",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "profit-box profit-summary",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "Lucro",
                                                                " ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>setShowProfit((visible)=>!visible),
                                                                    "aria-label": showProfit ? "Esconder lucro" : "Mostrar lucro",
                                                                    children: showProfit ? "◉" : "◌"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/app/page.tsx",
                                                                    lineNumber: 1082,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/app/page.tsx",
                                                            lineNumber: 1080,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: showProfit ? money.format(detailWork.budget + detailWork.extras - detailInvoices.filter((invoice)=>invoice.type !== "extra").reduce((total, invoice)=>total + invoice.amount, 0)) : "••••"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/page.tsx",
                                                            lineNumber: 1090,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1079,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "modal-close",
                                                    type: "button",
                                                    onClick: ()=>setSelectedWorkDetail(null),
                                                    "aria-label": "Fechar",
                                                    children: "×"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1102,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 1078,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/app/page.tsx",
                                    lineNumber: 1066,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "work-detail-finance",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Orçamento"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1114,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: money.format(detailWork.budget)
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1115,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 1113,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Faturas normais"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1118,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: money.format(detailInvoices.filter((invoice)=>invoice.type === "normal").reduce((total, invoice)=>total + invoice.amount, 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1119,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 1117,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Mão de obra"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1128,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: money.format(detailInvoices.filter((invoice)=>invoice.type === "labor").reduce((total, invoice)=>total + invoice.amount, 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1129,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 1127,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Extras"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1138,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: money.format(detailWork.extras)
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1139,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 1137,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "received-metric",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Pagamentos"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1142,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    className: "received-value",
                                                    children: money.format(detailWork.received)
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1143,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "received-toggle",
                                                    type: "button",
                                                    onClick: ()=>setExpandedWorkPayments((current)=>({
                                                                ...current,
                                                                [detailWork.name]: !current[detailWork.name]
                                                            })),
                                                    "aria-expanded": Boolean(expandedWorkPayments[detailWork.name]),
                                                    "aria-label": `Adicionar pagamento a ${detailWork.name}`,
                                                    children: expandedWorkPayments[detailWork.name] ? "−" : "+"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1146,
                                                    columnNumber: 19
                                                }, this),
                                                expandedWorkPayments[detailWork.name] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "work-payment-history",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "Histórico de pagamentos"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/page.tsx",
                                                            lineNumber: 1162,
                                                            columnNumber: 23
                                                        }, this),
                                                        detailWork.receivedPayments.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "payment-history-list",
                                                            children: detailWork.receivedPayments.map((payment)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        payment.date,
                                                                        " · ",
                                                                        money.format(payment.amount)
                                                                    ]
                                                                }, payment.id, true, {
                                                                    fileName: "[project]/frontend/app/page.tsx",
                                                                    lineNumber: 1166,
                                                                    columnNumber: 29
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/page.tsx",
                                                            lineNumber: 1164,
                                                            columnNumber: 25
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "no-payments",
                                                            children: "Ainda sem pagamentos registados."
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/page.tsx",
                                                            lineNumber: 1172,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            children: [
                                                                "Adicionar pagamento",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "number",
                                                                    min: "0",
                                                                    max: Math.max(0, detailWork.budget - detailWork.received),
                                                                    step: "0.01",
                                                                    value: workPaymentAmounts[detailWork.name] ?? "",
                                                                    onChange: (event)=>updateWorkPayment(detailWork.name, event.target.value)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/app/page.tsx",
                                                                    lineNumber: 1178,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>registerWorkPayment(detailWork.name),
                                                                    children: "Registar"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/app/page.tsx",
                                                                    lineNumber: 1188,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/app/page.tsx",
                                                            lineNumber: 1176,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1161,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 1141,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/app/page.tsx",
                                    lineNumber: 1112,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "work-detail-tabs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "tab-control",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: workDetailTab === "normal" ? "active" : "",
                                                    type: "button",
                                                    onClick: ()=>setWorkDetailTab("normal"),
                                                    children: "Faturas normais"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1201,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "tab-add-invoice",
                                                    type: "button",
                                                    onClick: ()=>openInvoiceEntry("normal"),
                                                    title: "Adicionar fatura normal",
                                                    "aria-label": "Adicionar fatura normal",
                                                    children: "+"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1208,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 1200,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "tab-control",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: workDetailTab === "labor" ? "active" : "",
                                                    type: "button",
                                                    onClick: ()=>setWorkDetailTab("labor"),
                                                    children: [
                                                        "Mão de obra",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                            children: detailInvoices.filter((invoice)=>invoice.type === "labor").length
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/page.tsx",
                                                            lineNumber: 1225,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1219,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "tab-add-invoice",
                                                    type: "button",
                                                    onClick: ()=>openInvoiceEntry("labor"),
                                                    title: "Adicionar mão de obra",
                                                    "aria-label": "Adicionar mão de obra",
                                                    children: "+"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1233,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 1218,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "tab-control",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: workDetailTab === "extra" ? "active" : "",
                                                    type: "button",
                                                    onClick: ()=>setWorkDetailTab("extra"),
                                                    children: [
                                                        "Extras",
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                            children: detailInvoices.filter((invoice)=>invoice.type === "extra").length
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/page.tsx",
                                                            lineNumber: 1250,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1244,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "tab-add-invoice",
                                                    type: "button",
                                                    onClick: ()=>openInvoiceEntry("extra"),
                                                    title: "Adicionar extra",
                                                    "aria-label": "Adicionar extra",
                                                    children: "+"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1258,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 1243,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/app/page.tsx",
                                    lineNumber: 1199,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "work-detail-list",
                                    children: [
                                        workDetailTab === "extra" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "extras-list-summary",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Total de extras"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/page.tsx",
                                                            lineNumber: 1273,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: money.format(detailInvoices.filter((invoice)=>invoice.type === "extra").reduce((total, invoice)=>total + invoice.amount, 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/page.tsx",
                                                            lineNumber: 1274,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1272,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Já pago"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/page.tsx",
                                                            lineNumber: 1283,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            className: "extra-paid",
                                                            children: money.format(detailInvoices.filter((invoice)=>invoice.type === "extra").reduce((total, invoice)=>total + invoice.paid, 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/page.tsx",
                                                            lineNumber: 1284,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1282,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Falta pagar"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/page.tsx",
                                                            lineNumber: 1293,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            className: "extra-cost",
                                                            children: money.format(detailInvoices.filter((invoice)=>invoice.type === "extra").reduce((total, invoice)=>total + invoice.amount - invoice.paid, 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/page.tsx",
                                                            lineNumber: 1294,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1292,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 1271,
                                            columnNumber: 19
                                        }, this),
                                        detailInvoices.filter((invoice)=>workDetailTab === "extra" ? invoice.type === "extra" : invoice.type === workDetailTab).map((invoice)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                className: `detail-invoice ${invoice.type === "extra" ? "detail-extra" : ""} ${invoice.type === "extra" && invoice.amount > 0 && invoice.paid >= invoice.amount ? "extra-paid-in-full" : ""}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "detail-invoice-title",
                                                                children: [
                                                                    invoice.type === "extra" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        className: "history-toggle",
                                                                        type: "button",
                                                                        onClick: ()=>setExpandedPaymentHistory((current)=>({
                                                                                    ...current,
                                                                                    [invoice.id]: !current[invoice.id]
                                                                                })),
                                                                        "aria-expanded": Boolean(expandedPaymentHistory[invoice.id]),
                                                                        "aria-label": `Ver histórico de pagamentos de ${invoice.supplier}`,
                                                                        children: expandedPaymentHistory[invoice.id] ? "⌄" : "›"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/app/page.tsx",
                                                                        lineNumber: 1321,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        children: invoice.supplier
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/app/page.tsx",
                                                                        lineNumber: 1336,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 1319,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    invoice.description,
                                                                    " · ",
                                                                    invoice.date
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 1338,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 1318,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "detail-invoice-value",
                                                        children: invoice.type === "extra" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "extra-values",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "extra-cost",
                                                                    children: [
                                                                        "Custo: ",
                                                                        money.format(invoice.amount)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/frontend/app/page.tsx",
                                                                    lineNumber: 1345,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "extra-paid",
                                                                    children: [
                                                                        "Pago: ",
                                                                        money.format(invoice.paid)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/frontend/app/page.tsx",
                                                                    lineNumber: 1346,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/app/page.tsx",
                                                            lineNumber: 1344,
                                                            columnNumber: 27
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    children: money.format(invoice.amount)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/app/page.tsx",
                                                                    lineNumber: 1350,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: invoice.type === "labor" ? "Mão de obra · abatida ao orçamento" : "Despesa geral"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/app/page.tsx",
                                                                    lineNumber: 1351,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/app/page.tsx",
                                                            lineNumber: 1349,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 1342,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "remove-invoice",
                                                        type: "button",
                                                        onClick: ()=>removeInvoice(invoice.id),
                                                        "aria-label": `Remover fatura ${invoice.supplier}`,
                                                        title: "Remover",
                                                        children: "×"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 1359,
                                                        columnNumber: 23
                                                    }, this),
                                                    invoice.type === "extra" && expandedPaymentHistory[invoice.id] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "extra-payment-history",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Histórico de pagamentos"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 1370,
                                                                columnNumber: 27
                                                            }, this),
                                                            invoice.payments.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "payment-history-list",
                                                                children: invoice.payments.map((payment)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            payment.date,
                                                                            " · ",
                                                                            money.format(payment.amount)
                                                                        ]
                                                                    }, payment.id, true, {
                                                                        fileName: "[project]/frontend/app/page.tsx",
                                                                        lineNumber: 1374,
                                                                        columnNumber: 33
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 1372,
                                                                columnNumber: 29
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "no-payments",
                                                                children: "Ainda sem pagamentos registados."
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 1380,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                children: [
                                                                    "Adicionar pagamento",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        min: "0",
                                                                        max: invoice.amount - invoice.paid,
                                                                        step: "0.01",
                                                                        value: paymentAmounts[invoice.id] ?? "",
                                                                        onChange: (event)=>updateExtraPayment(invoice.id, event.target.value)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/app/page.tsx",
                                                                        lineNumber: 1384,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: ()=>registerExtraPayment(invoice.id),
                                                                        children: "Registar"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/app/page.tsx",
                                                                        lineNumber: 1394,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 1382,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 1369,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, invoice.id, true, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 1314,
                                                columnNumber: 21
                                            }, this)),
                                        detailInvoices.filter((invoice)=>workDetailTab === "extra" ? invoice.type === "extra" : invoice.type === workDetailTab).length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "empty-detail",
                                            children: "Ainda não existem faturas nesta aba."
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 1407,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/app/page.tsx",
                                    lineNumber: 1269,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/app/page.tsx",
                            lineNumber: 1060,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/page.tsx",
                        lineNumber: 1052,
                        columnNumber: 11
                    }, this),
                    detailWork && invoiceEntryType && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "invoice-entry-backdrop",
                        role: "presentation",
                        onMouseDown: (event)=>{
                            if (event.target === event.currentTarget) setInvoiceEntryType(null);
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "invoice-entry-modal",
                            role: "dialog",
                            "aria-modal": "true",
                            "aria-labelledby": "invoice-entry-title",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "modal-heading",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "eyebrow",
                                                    children: invoiceEntryType === "extra" ? "novo extra" : invoiceEntryType === "labor" ? "nova mão de obra" : "nova fatura"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1431,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    id: "invoice-entry-title",
                                                    className: "display-font",
                                                    children: [
                                                        "Adicionar ",
                                                        invoiceEntryType === "extra" ? "extra" : invoiceEntryType === "labor" ? "mão de obra" : "fatura"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1438,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 1430,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "modal-close",
                                            type: "button",
                                            onClick: ()=>setInvoiceEntryType(null),
                                            "aria-label": "Fechar",
                                            children: "×"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 1446,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/app/page.tsx",
                                    lineNumber: 1429,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "invoice-entry-intro",
                                    children: "Carrega o documento para preencher os dados automaticamente ou insere-os manualmente."
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/page.tsx",
                                    lineNumber: 1455,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "invoice-upload-option",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: isUploadingInvoice ? "A carregar…" : "Carregar fatura"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 1459,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                            children: "Imagem ou PDF — a leitura é feita no teu dispositivo"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 1460,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "file",
                                            accept: "image/*,application/pdf",
                                            disabled: isUploadingInvoice,
                                            onChange: (event)=>handleInvoiceUpload(event)
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 1461,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/app/page.tsx",
                                    lineNumber: 1458,
                                    columnNumber: 15
                                }, this),
                                ocrNotice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: `ocr-notice ${ocrNotice.startsWith("Dados lidos") ? "ocr-notice-success" : ""}`,
                                    role: "status",
                                    children: ocrNotice
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/page.tsx",
                                    lineNumber: 1471,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "invoice-entry-divider",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "ou preencher manualmente"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 1475,
                                        columnNumber: 54
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/page.tsx",
                                    lineNumber: 1475,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    className: "invoice-entry-form",
                                    onSubmit: createManualInvoice,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: [
                                                "Fornecedor / título",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    required: true,
                                                    value: manualInvoiceSupplier,
                                                    onChange: (event)=>setManualInvoiceSupplier(event.target.value),
                                                    placeholder: "Ex.: Cozinha Nova"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1479,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 1477,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: [
                                                "Descrição",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    value: manualInvoiceDescription,
                                                    onChange: (event)=>setManualInvoiceDescription(event.target.value),
                                                    placeholder: "Ex.: Ilha pedida pelo cliente"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1488,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 1486,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: [
                                                "Valor total (€)",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    required: true,
                                                    type: "number",
                                                    min: "0",
                                                    step: "0.01",
                                                    value: manualInvoiceAmount,
                                                    onChange: (event)=>setManualInvoiceAmount(event.target.value),
                                                    placeholder: "0,00"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1496,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 1494,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: [
                                                "Data da fatura",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    required: !useCurrentInvoiceDate,
                                                    type: "date",
                                                    value: useCurrentInvoiceDate ? new Date().toISOString().slice(0, 10) : manualInvoiceDate,
                                                    disabled: useCurrentInvoiceDate,
                                                    onChange: (event)=>setManualInvoiceDate(event.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1508,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 1506,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "use-current-date",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: useCurrentInvoiceDate,
                                                    onChange: (event)=>setUseCurrentInvoiceDate(event.target.checked)
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1517,
                                                    columnNumber: 19
                                                }, this),
                                                "Usar data de hoje"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 1516,
                                            columnNumber: 17
                                        }, this),
                                        invoiceEntryType === "extra" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: [
                                                "Valor já pago (€)",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    min: "0",
                                                    max: manualInvoiceAmount || undefined,
                                                    step: "0.01",
                                                    value: manualExtraPaid,
                                                    onChange: (event)=>setManualExtraPaid(event.target.value),
                                                    placeholder: "0,00"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 1527,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 1525,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "invoice-entry-submit",
                                            type: "submit",
                                            children: [
                                                "Guardar ",
                                                invoiceEntryType === "extra" ? "extra" : invoiceEntryType === "labor" ? "mão de obra" : "fatura"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 1538,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/app/page.tsx",
                                    lineNumber: 1476,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/app/page.tsx",
                            lineNumber: 1423,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/page.tsx",
                        lineNumber: 1416,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/page.tsx",
                lineNumber: 739,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/app/page.tsx",
        lineNumber: 692,
        columnNumber: 5
    }, this);
}
_s(Home, "xToeqATt1tL1VXcaEMNAL7Ajvfk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/lib/supabase/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://xvrxcictjdyqbuukhlfh.supabase.co");
const supabasePublishableKey = ("TURBOPACK compile-time value", "sb_publishable_Uj-RePjXYpS-Q04H5phreQ_RRyujPL7");
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabasePublishableKey);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=frontend_0ysr6h6._.js.map