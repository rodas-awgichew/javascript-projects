const balance = document.getElementById('balance');
const incomes = document.getElementById('money-plus');
const expens = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


// const dummyData = [
//   {id:1 , text:'tea', amount :30},
//   {id:2 , text:'water', amount :90},
//   {id:3 , text:'burgur', amount :100},
//   {id:4 , text:'coffe', amount :120}
// ]


const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorageTransactions !== null ? localStorageTransactions : [];


// Creates a unique ID for each transaction
function generateId(){
  return Math.floor( Math.random() * 1000000 );
}

// Function that runs when the form is submitted
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add both text and amount');
  } else {
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value  
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
}

//Adds a transaction to the HTML list
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(item);
}

// Calculates and updates the balance, income, and expense totals.
function updateValues() {
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
  const income = amounts.filter(val => val > 0).reduce((acc, val) => acc + val, 0).toFixed(2);
  const expense = (amounts.filter(val => val < 0).reduce((acc, val) => acc + val, 0) * -1).toFixed(2);

  balance.innerText = `$${total}`;
  incomes.innerText = `$${income}`;
  expens.innerText = `$${expense}`;
}

// Saves the current transactions array to localStorage.
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions)); 
}

// Removes a transaction by ID and updates everything.
function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateLocalStorage();
  init();   
}

// Clears the list and re-renders all transactions.
function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues(); 
}

form.addEventListener('submit', addTransaction);


init();

