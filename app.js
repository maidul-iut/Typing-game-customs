// proper procedure to call a api and use this promis data into another function start-----------------------------------------

const randomQuoteApiUrl = "https://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quotedisplay");
const quoteInputElement = document.getElementById("quoteinput");
const timerElement = document.getElementById("timer");

//need to set eventlistener in the input field.
document.getElementById("quoteinput").addEventListener("input", () => {
  const quoteArray = quoteDisplayElement.querySelectorAll("span");
  const arrayValue = quoteInputElement.value.split("");
  let correct = true;
  quoteArray.forEach((charSpan, index) => {
    const character = arrayValue[index]; // this wil match the index number between input value and display value. So that we can check character by character

    // Now check if the character not typed yet by passing a null value to it.
    if (character == null) {
      charSpan.classList.remove("correct");
      charSpan.classList.remove("incorrect");
      correct = false;
    } else if (charSpan.innerText === character) {
      charSpan.classList.add("correct"); //if typed charater matches with display character than it will add green class of correct.
      charSpan.classList.remove("incorrect");
    } else {
      charSpan.classList.add("incorrect");
      charSpan.classList.remove("correct");
      correct = false;
    }
  });

  if (!!correct) {
    getNextQuote();
    quoteInputElement.value = "";
    startTimer();
  }
});

function getRandomQuote() {
  return fetch(randomQuoteApiUrl)
    .then((res) => res.json())
    .then((data) => data);
  // .then((data) => data.content);
}

// to make this url a async functions so that it stacks up in queue

async function getNextQuote() {
  const dataPackage = await getRandomQuote();
  const quote = dataPackage.content;
  const author = dataPackage.author;

  quoteDisplayElement.innerHTML = "";
  quote.split("").forEach((character) => {
    const spanChar = document.createElement("span");
    // spanChar.classList.add("correct"); // add the correct classlist if the span is correct
    spanChar.innerText = character;
    quoteDisplayElement.appendChild(spanChar);
  });
  quoteinputElement = null;
}

getNextQuote();

// proper procedure to call a api and use this promise data into another function End---------------------------------------------

// let startTime;
let startTime;
function startTimer() {
  timerElement.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timerElement.innerText = getTimerTime();
  }, 1000);
}

function getTimerTime() {
  // here new Date() is getting called after exactly 1000 ms. we will get the difference to get the precise decision.
  return Math.floor((new Date() - startTime) / 1000);
}

startTimer();
