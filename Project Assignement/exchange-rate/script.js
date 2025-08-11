const currency_one = document.getElementById("currency-one");
const currency_two = document.getElementById("currency-two");
const amount_one = document.getElementById("amount-one");
const amount_two = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");


function calculate(){
 // fetch currency data using API link
  fetch('https://open.exchangerate-api.com/v6/latest')
  .then(res => res.json())
  .then(data =>{
    const rate= data.rates[currency_two.value] / data.rates[currency_one.value];
    rateEl.innerText= `1 ${currency_one.value} =  ${rate.toFixed(2)}  ${currency_two.value}`;
    amount_two.value = (amount_one.value * rate).toFixed(2);
  }
    );
}

// added event listener
  
currency_one.addEventListener('change', calculate);
currency_two.addEventListener('change', calculate);
amount_one.addEventListener('input', calculate);


