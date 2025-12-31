// State
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let expenseChart = null;

// Default budgets in Rupees
const budgets = {
    "Housing": 7000, "Food": 2000, "Transportation": 1000,
    "Shopping": 1000, "Other": 500
};

const categoryColors = {
    "Housing": "#3b82f6", // blue
    "Food": "#10b981",    // emerald
    "Transportation": "#f59e0b", // amber
    "Entertainment": "#8b5cf6", // violet
    "Shopping": "#ec4899", // pink
    "Utilities": "#06b6d4", // cyan
    "Other": "#94a3b8"     // slate
};

window.onload = () => {
    initChart();
    updateUI();
};

function initChart() {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    expenseChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: Object.values(categoryColors),
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            plugins: {
                legend: { display: false }
            }
        }
    });
}

document.getElementById('transaction-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    const entry = {
        id: Date.now(),
        description: document.getElementById('desc').value,
        amount: amount,
        type: type,
        category: document.getElementById('category').value,
        date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
    };

    transactions.unshift(entry);
    save();
    updateUI();
    e.target.reset();
    showToast("Added successfully!");
});

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    save();
    updateUI();
    showToast("Entry removed");
}

function save() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function updateUI() {
    const filter = document.getElementById('filter-category').value;
    const historyBody = document.getElementById('history-body');
    const emptyState = document.getElementById('empty-state');

    let income = 0, expenses = 0;
    const catTotals = {};

    transactions.forEach(t => {
        if (t.type === 'income') income += t.amount;
        else {
            expenses += t.amount;
            catTotals[t.category] = (catTotals[t.category] || 0) + t.amount;
        }
    });

    // Update Stats (using en-IN for Indian comma system)
    document.getElementById('stat-income').innerText = `₹${income.toLocaleString('en-IN')}`;
    document.getElementById('stat-expenses').innerText = `₹${expenses.toLocaleString('en-IN')}`;
    document.getElementById('stat-balance').innerText = `₹${(income - expenses).toLocaleString('en-IN')}`;

    // Update Chart
    const chartLabels = Object.keys(catTotals);
    const chartData = Object.values(catTotals);
    const chartColors = chartLabels.map(l => categoryColors[l] || '#cbd5e1');

    expenseChart.data.labels = chartLabels;
    expenseChart.data.datasets[0].data = chartData;
    expenseChart.data.datasets[0].backgroundColor = chartColors;
    expenseChart.update();

    // Update Insights
    const topCat = chartLabels.length > 0 ? chartLabels[chartData.indexOf(Math.max(...chartData))] : "None";
    document.getElementById('quick-insight').innerHTML = `
        <div class="flex items-center gap-2"><i class="fa-solid fa-fire text-orange-500"></i> Top Expense: <b class="text-slate-800">${topCat}</b></div>
        <div class="flex items-center gap-2"><i class="fa-solid fa-chart-line text-blue-500"></i> Savings Rate: <b class="text-slate-800">${income > 0 ? ((income-expenses)/income*100).toFixed(0) : 0}%</b></div>
        <div class="flex items-center gap-2"><i class="fa-solid fa-calendar text-emerald-500"></i> Daily Avg: <b class="text-slate-800">₹${(expenses/30).toFixed(2)}</b></div>
    `;

    // Update Table
    const displayList = filter === 'all' ? transactions : transactions.filter(t => t.category === filter);
    historyBody.innerHTML = '';
    if (displayList.length === 0) emptyState.classList.remove('hidden');
    else {
        emptyState.classList.add('hidden');
        displayList.forEach(t => {
            const row = document.createElement('tr');
            row.className = "group hover:bg-slate-50 transition-all";
            row.innerHTML = `
                <td class="py-3 text-[13px] text-slate-400 font-medium">${t.date}</td>
                <td class="py-3 text-[13px] font-semibold text-slate-700">${t.description}</td>
                <td class="py-3"><span class="px-2 py-0.5 text-[9px] font-bold uppercase rounded bg-slate-100 text-slate-500">${t.category}</span></td>
                <td class="py-3 text-sm font-bold text-right ${t.type === 'income' ? 'text-emerald-500' : 'text-slate-900'}">
                    ${t.type === 'income' ? '+' : ''}₹${t.amount.toLocaleString('en-IN', {minimumFractionDigits: 2})}
                </td>
                <td class="py-3 text-right">
                    <button onclick="deleteTransaction(${t.id})" class="p-2 text-slate-200 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </td>
            `;
            historyBody.appendChild(row);
        });
    }

    // Update Budget Progress
    const budgetList = document.getElementById('budget-list');
    budgetList.innerHTML = '';
    Object.keys(budgets).forEach(cat => {
        const spent = catTotals[cat] || 0;
        const limit = budgets[cat];
        const pct = Math.min((spent / limit) * 100, 100);
        const color = pct > 90 ? 'bg-rose-500' : pct > 70 ? 'bg-amber-500' : 'bg-blue-500';

        budgetList.innerHTML += `
            <div>
                <div class="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-1">
                    <span class="text-slate-600">${cat}</span>
                    <span class="${pct > 100 ? 'text-rose-500' : 'text-slate-400'}">₹${spent.toLocaleString('en-IN', {maximumFractionDigits: 0})} / ₹${limit.toLocaleString('en-IN')}</span>
                </div>
                <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div class="${color} h-full transition-all duration-700" style="width: ${pct}%"></div>
                </div>
            </div>
        `;
    });
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.innerText = msg;
    t.classList.remove('translate-y-24', 'opacity-0');
    setTimeout(() => t.classList.add('translate-y-24', 'opacity-0'), 2500);
}

function resetData() {
    if (confirm("Reset everything?")) {
        transactions = [];
        save();
        updateUI();
    }
}

function exportData() {
    if (transactions.length === 0) return;
    const csv = "Date,Description,Type,Category,Amount\n" + transactions.map(t => `${t.date},${t.description},${t.type},${t.category},${t.amount}`).join("\n");
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'budget_export.csv');
    a.click();
}