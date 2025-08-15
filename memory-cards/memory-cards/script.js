// Get references to DOM elements for card display, navigation, adding, and clearing
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

// Show/hide the "Add Card" form overlay
function toggleAddContainer(e) {
    e.preventDefault();
    addContainer.classList.toggle('show');
}
showBtn.addEventListener('click', toggleAddContainer);

hideBtn.addEventListener('click', ()=> {
  addContainer.classList.remove('show');
})

// Add a new card with question and answer, save to localStorage
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

    renderCards(); // Re-render cards list

    questionEl.value = '';
    answerEl.value = '';
    addContainer.classList.remove('show');
  } else {
    alert('Please fill out both fields');
  }
});

// Render all cards, show "No cards" message if empty
function renderCards() {
  cardsContainer.innerHTML = '';
  if (cards.length === 0) {
    cardsContainer.innerHTML = '<p class="empty">No cards available. Add one!</p>';
    currentEl.innerText = '0/0';
    return;
  }

  cards.forEach((cardData, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    if (index === currentActiveCard) 
        card.classList.add('active');

    // Card structure with front (question) and back (answer)
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

    // Click to flip card to show answer
    card.addEventListener('click', () => {
      card.classList.toggle('show-answer');
    });

    cardsContainer.appendChild(card);
  });

  currentCard();
}

// Load cards from localStorage on page load
function loadCardsFromStorage() {
  const storedCards = JSON.parse(localStorage.getItem('memoryCards'));
  if (storedCards) {
    cards = storedCards;
  }
  renderCards();
}

window.onload = loadCardsFromStorage;

// Show next card in the list
function nextCard() { 
  if (currentActiveCard < cards.length - 1) {
    currentActiveCard++;
    currentCard();
  }
  else if (currentActiveCard === cards.length - 1) {
    alert('You’re already on the last card!');
  }
}
nextBtn.addEventListener('click', nextCard);

// Show previous card in the list
function prevCard() {
    if (currentActiveCard === 0) {
        currentActiveCard = 0;
    } else {
        currentActiveCard--;
    }
    currentCard();
}
prevBtn.addEventListener('click', prevCard);

// Update the card status display and which card is active
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

// Remove all cards and clear localStorage
function clearAllCards() {
  cards = [];
  localStorage.removeItem('memoryCards');
  renderCards();
  currentEl.innerText = '0/0';
}

clearBtn.addEventListener('click', clearAllCards);
