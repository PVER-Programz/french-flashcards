let flashcards = [];
let currentIndex = 0;
let flipped = false;

const card = document.getElementById("card");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const counter = document.getElementById("counter");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const flipBtn = document.getElementById("flipBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const resetBtn = document.getElementById("resetBtn");

fetch("flashcards.csv")
.then(response => response.text())
.then(data => {
flashcards = parseCSV(data);
showCard();
})
.catch(error => {
question.textContent = "Could not load flashcards.csv";
console.error(error);
});

function parseCSV(data) {
return data
.trim()
.split("\n")
.map(line => {
let parts = line.split(",");
return {
question: parts[0].trim(),
answer: parts.slice(1).join(",").trim()
};
});
}

function showCard() {
if (flashcards.length === 0) return;

flipped = false;
card.classList.remove("flipped");

question.textContent = flashcards[currentIndex].question;
answer.textContent = flashcards[currentIndex].answer;
counter.textContent = `${currentIndex + 1} / ${flashcards.length}`;
}

function flipCard() {
flipped = !flipped;
card.classList.toggle("flipped", flipped);
}

function nextCard() {
currentIndex++;
if (currentIndex >= flashcards.length) {
currentIndex = 0;
}
showCard();
}

function prevCard() {
currentIndex--;
if (currentIndex < 0) {
currentIndex = flashcards.length - 1;
}
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
if (event.key === " ") flipCard();
if (event.key === "ArrowRight") nextCard();
if (event.key === "ArrowLeft") prevCard();
});