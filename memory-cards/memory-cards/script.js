const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');


let cards = [];
let currentActiveCard = 0; 

function toggleAddContainer(e) {
    e.preventDefault();
    addContainer.classList.toggle('show');
}
showBtn.addEventListener('click', toggleAddContainer);


function addCard(question, answer) {
    const card= document.createElement('div');
    card.classList.add('card');
    card.innerHTML= ` 
        <div class="inner-card">
            <div class="inner-card-front">
                <p>${question}</p> 
                <div class="inner-card-back">
                <p>${answer}</p> 
                </div>
            </div>`
    cards.appendChild(card); 
    updateLocalStorage(question, answer);
}

addCardBtn.addEventListener('click', () => {
    const question= questionEl.value;
    const answer= answerEl.value;
    if (question.trim() && answer.trim()) {
        
        addCard(question, answer);
        questionEl.value = '';
        answerEl.value = '';
        addContainer.classList.remove('show');
    }
    else {
        alert('Please fill in both fields');
    }

}


);
function updateLocalStorage(){

}

function flipCard() { 
}

function nextCard() { 
    if (currentActiveCard === cards.length - 1) {
        currentActiveCard = 0;
    } else {
        currentActiveCard++;
    }
    currentCard();

}
function prevCard() {
    if (currentActiveCard === 0) {
        currentActiveCard = cards.length - 1;
    } else {
        currentActiveCard--;
    }
    currentCard();

    
 }
 function currentCard() { }

function deleteCard(id) { }

function saveCardsToStorage() {
 }
function loadCardsFromStorage() { }

function clearAllCards() { }
function renderCard() {
    

 };
