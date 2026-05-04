let flashcards = [];
let originalFlashcards = [];
let currentIndex = 0;
let flipped = false;

const card = document.getElementById("card");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const counter = document.getElementById("counter");
const progressBar = document.getElementById("progressBar");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const flipBtn = document.getElementById("flipBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const resetBtn = document.getElementById("resetBtn");

fetch("flashcards.csv")
.then(response => response.text())
.then(data => {
flashcards = parseCSV(data);
originalFlashcards = [...flashcards];
showCard();
})
.catch(error => {
question.textContent = "Could not load flashcards.csv";
answer.textContent = "Use a local server like VS Code Live Server.";
console.error(error);
});

function parseCSV(data) {
return data
.trim()
.split(/\r?\n/)
.map(line => {
let parts = line.split(",");
return {
question: clean(parts[0]),
answer: clean(parts.slice(1).join(","))
};
})
.filter(card => card.question && card.answer);
}

function clean(text) {
return text.trim().replace(/^"|"$/g, "");
}

function showCard() {
if (flashcards.length === 0) return;

flipped = false;
card.classList.remove("flipped");

question.textContent = flashcards[currentIndex].question;
answer.textContent = flashcards[currentIndex].answer;

counter.textContent = `${currentIndex + 1} / ${flashcards.length}`;
progressBar.style.width = `${((currentIndex + 1) / flashcards.length) * 100}%`;
}

function flipCard() {
flipped = !flipped;
card.classList.toggle("flipped", flipped);
}

function nextCard() {
currentIndex = (currentIndex + 1) % flashcards.length;
showCard();
}

function prevCard() {
currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
showCard();
}

function shuffleCards() {
for (let i = flashcards.length - 1; i > 0; i--) {
let j = Math.floor(Math.random() * (i + 1));
[flashcards[i], flashcards[j]] = [flashcards[j], flashcards[i]];
}
currentIndex = 0;
showCard();
}

function resetCards() {
flashcards = [...originalFlashcards];
currentIndex = 0;
showCard();
}

card.addEventListener("click", flipCard);
flipBtn.addEventListener("click", flipCard);
nextBtn.addEventListener("click", nextCard);
prevBtn.addEventListener("click", prevCard);
shuffleBtn.addEventListener("click", shuffleCards);
resetBtn.addEventListener("click", resetCards);

document.addEventListener("keydown", event => {
if (event.code === "Space") {
event.preventDefault();
flipCard();
}
if (event.key === "ArrowRight") nextCard();
if (event.key === "ArrowLeft") prevCard();
});
