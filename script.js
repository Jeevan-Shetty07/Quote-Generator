// script.js
const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const copyQuoteBtn = document.getElementById("copy-quote");
const copyMsg = document.getElementById("copyMsg");

let currentQuote = "";

// Fetch a random quote from Quotable API
async function fetchQuote() {
  // Show loading state
  quoteElement.textContent = "Loading quote";
  quoteElement.classList.add("loading-text");
  authorElement.textContent = "";

  try {
    const response = await fetch("https://api.quotable.io/random?tags=inspirational|motivational|life|success");
    if (!response.ok) throw new Error("Failed to fetch quote");

    const data = await response.json();
    displayQuote(data.content, data.author);
  } catch (error) {
    quoteElement.textContent = "Oops! Something went wrong. Try again.";
    quoteElement.classList.remove("loading-text");
    authorElement.textContent = "";
    console.error("Error fetching quote:", error);
  }
}

// Display quote and author
function displayQuote(quote, author) {
  currentQuote = `"${quote}" — ${author}`;
  quoteElement.textContent = quote;
  authorElement.textContent = `— ${author}`;
  quoteElement.classList.remove("loading-text");
  copyMsg.style.display = "none"; // Hide copy message on new quote
}

// Copy quote to clipboard
function copyToClipboard() {
  navigator.clipboard.writeText(currentQuote).then(() => {
    copyMsg.style.display = "block";
    setTimeout(() => {
      copyMsg.style.display = "none";
    }, 2000);
  }).catch(err => {
    console.error("Failed to copy: ", err);
    copyMsg.textContent = "Failed to copy!";
    copyMsg.style.color = "#ff6b6b";
    copyMsg.style.display = "block";
    setTimeout(() => {
      copyMsg.style.display = "none";
      copyMsg.textContent = "Quote copied to clipboard!";
      copyMsg.style.color = "#00ff90";
    }, 2000);
  });
}

// Event Listeners
newQuoteBtn.addEventListener("click", fetchQuote);
copyQuoteBtn.addEventListener("click", copyToClipboard);

// Load first quote on page load
window.addEventListener("load", fetchQuote);