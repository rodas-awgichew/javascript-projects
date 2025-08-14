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

hideBtn.addEventListener('click', ()=> {
  addContainer.classList.remove('show;');
})



addCardBtn.addEventListener('click', () => {
  const question = questionEl.value.trim();
  const answer = answerEl.value.trim();

  if (question && answer) {
    const newCard = {
      id: Date.now(),
      question,
      answer
    };

    cards.push(newCard);
    localStorage.setItem('memoryCards', JSON.stringify(cards));

    renderCards(); 

    questionEl.value = '';
    answerEl.value = '';
    addContainer.classList.remove('show');
  } else {
    alert('Please fill out both fields');
  }
});

function renderCards() {
  cardsContainer.innerHTML = '';

  cards.forEach((cardData, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    if (index === currentActiveCard) 
        card.classList.add('active');

    card.innerHTML = `
      <div class="inner-card">
        <div class="inner-card-front">
          <p>${cardData.question}</p>
        </div>
        <div class="inner-card-back">
          <p>${cardData.answer}</p>
        </div>
      </div>
    `;

    card.addEventListener('click', () => {
      card.classList.toggle('show-answer');
    });

    cardsContainer.appendChild(card);
  });

  currentCard();
}

function loadCardsFromStorage() {
  const storedCards = JSON.parse(localStorage.getItem('memoryCards'));
  if (storedCards) {
    cards = storedCards;
    renderCards();
  }
}

window.onload = loadCardsFromStorage;


function nextCard() { 
    if (currentActiveCard === cards.length - 1) {
        // currentActiveCard = cards.length;
    } else {
        currentActiveCard++;
    }
    currentCard();

}

nextBtn.addEventListener('click', nextCard);

function prevCard() {
    if (currentActiveCard === 0) {
        currentActiveCard = 0;
    } else {
        currentActiveCard--;
    }
    currentCard();
 
 }
 prevBtn.addEventListener('click', prevCard);

 function currentCard() {
  currentEl.innerText = `${currentActiveCard + 1}/${cards.length}`;

  const allCards = document.querySelectorAll('.card');
  allCards.forEach((card, index) => {
    card.classList.remove('active');
    if (index === currentActiveCard) {
      card.classList.add('active');
    }
  });
};

function clearAllCards() {
  cards = [];
  localStorage.removeItem('memoryCards');
  renderCards();
  currentEl.innerText = '0/0';
}

 
clearBtn.addEventListener('click', clearAllCards);