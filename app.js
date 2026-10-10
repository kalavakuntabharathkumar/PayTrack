const transactions = [
  {merchant:"Grocery Market",date:"2026-11-04",category:"Food",amount:-86.40},
  {merchant:"Metro Transit",date:"2026-11-03",category:"Transport",amount:-24.00},
  {merchant:"Monthly salary",date:"2026-11-01",category:"Income",amount:5400.00},
  {merchant:"Online Books",date:"2026-10-29",category:"Shopping",amount:-42.50},
  {merchant:"Electricity bill",date:"2026-10-27",category:"Bills",amount:-96.60},
  {merchant:"Coffee House",date:"2026-10-25",category:"Food",amount:-18.00},
  {merchant:"Ride share",date:"2026-10-23",category:"Transport",amount:-31.00}
];
const $ = (id) => document.getElementById(id);
const money = (value) => `${value < 0 ? "−" : "+"}$${Math.abs(value).toFixed(2)}`;
const rows = $("transaction-rows");

function visibleTransactions() {
  const query = $("search").value.trim().toLowerCase();
  const category = $("category").value;
  return transactions.filter(t =>
    (category === "all" || t.category === category) &&
    `${t.merchant} ${t.category} ${t.date}`.toLowerCase().includes(query)
  );
}
function render() {
  const shown = visibleTransactions();
  rows.replaceChildren();
  shown.forEach(t => {
    const tr = document.createElement("tr");
    const values = [t.merchant, new Date(`${t.date}T12:00:00`).toLocaleDateString(), t.category, money(t.amount)];
    values.forEach((value, index) => {
      const td = document.createElement("td");
      td.textContent = value;
      if (index === 3) td.className = `amount ${t.amount >= 0 ? "credit" : "debit"}`;
      tr.append(td);
    });
    rows.append(tr);
  });
  $("result-count").textContent = `${shown.length} transaction${shown.length === 1 ? "" : "s"} shown`;
  $("empty-state").hidden = shown.length !== 0;
}
function announce(message) { $("status").textContent = message; }
function showForm() { $("transaction-dialog").hidden = false; $("merchant").focus(); }
function hideForm() { $("transaction-dialog").hidden = true; $("open-form").focus(); }
$("search").addEventListener("input", render);
$("category").addEventListener("change", render);
$("open-form").addEventListener("click", showForm);
$("close-form").addEventListener("click", hideForm);
$("cancel-form").addEventListener("click", hideForm);
$("transaction-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const merchant = String(data.get("merchant") || "").trim();
  const amount = Number(data.get("amount"));
  const date = String(data.get("date") || "");
  if (!merchant || !Number.isFinite(amount) || amount <= 0 || amount > 1000000 || !date) {
    $("form-error").textContent = "Enter a description, a valid amount, and a date.";
    return;
  }
  transactions.unshift({merchant,date,category:String(data.get("category")),amount:-amount});
  form.reset();
  $("form-error").textContent = "";
  $("search").value = "";
  $("category").value = "all";
  render();
  hideForm();
  announce(`Transaction for ${merchant} added.`);
});
$("export-csv").addEventListener("click", () => {
  const data = visibleTransactions();
  const quote = value => `"${String(value).replaceAll('"','""')}"`;
  const csv = [["Description","Date","Category","Amount"], ...data.map(t => [t.merchant,t.date,t.category,t.amount.toFixed(2)])]
    .map(row => row.map(quote).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], {type:"text/csv;charset=utf-8"}));
  const link = document.createElement("a");
  link.href = url; link.download = "paytrack-transactions.csv";
  document.body.append(link); link.click(); link.remove(); URL.revokeObjectURL(url);
  announce(`${data.length} transactions exported as CSV.`);
});
render();
