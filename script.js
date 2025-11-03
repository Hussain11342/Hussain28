let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let darkMode = localStorage.getItem('darkMode') === 'true';

document.addEventListener('DOMContentLoaded', () => {
  if (darkMode) document.body.classList.add('dark');
  renderTransactions();
  updateSummary();
  document.getElementById('addTransactionBtn').addEventListener('click', addTransaction);
});

function addTransaction() {
  const amount = parseFloat(prompt('Enter amount:'));
  const type = prompt('Type (income/expense):').toLowerCase();
  const category = prompt('Enter category:');
  const date = new Date().toISOString().slice(0, 10);

  if (!amount || amount <= 0) return alert('Enter valid amount!');
  const newTx = { id: Date.now(), type, category, amount, date };
  transactions.push(newTx);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  renderTransactions();
  updateSummary();
}

function renderTransactions() {
  const list = document.getElementById('transactionList');
  list.innerHTML = '';
  transactions.slice().reverse().forEach(tx => {
    const div = document.createElement('div');
    div.className = `transaction ${tx.type}`;
    div.innerHTML = `<strong>${tx.category}</strong> - ${tx.type} ₹${tx.amount} <small>${tx.date}</small>`;
    list.appendChild(div);
  });
}

function updateSummary() {
  const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;
  document.getElementById('balance').innerText = `₹${balance.toFixed(2)}`;
}
