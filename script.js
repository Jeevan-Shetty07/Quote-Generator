// Enhanced script.js - Device Compatible
const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const copyQuoteBtn = document.getElementById("copy-quote");
const copyMsg = document.getElementById("copyMsg");

let currentQuote = "";
let isOffline = false;

// Local fallback quotes (zen-themed)
const fallbackQuotes = [
  { content: "The only way out is through.", author: "Robert Frost" },
  { content: "Peace comes from within. Do not seek it without.", author: "Buddha" },
  { content: "In the beginner's mind there are many possibilities, but in the expert's there are few.", author: "Shunryu Suzuki" },
  { content: "Let go or be dragged.", author: "Zen Proverb" },
  { content: "To be enlightened is to be intimate with all things.", author: "Dogen" }
];

// Fetch from API with timeout & fallback
async function fetchQuote() {
  quoteElement.innerHTML = "Loading quote<span class=\"dots\"></span>";
  quoteElement.classList.add("loading-text");
  authorElement.textContent = "";
  copyMsg.style.display = "none";

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

  try {
    const response = await fetch("https://api.quotable.io/random?tags=inspirational|motivational|life", {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) throw new Error("API down");

    const data = await response.json();
    displayQuote(data.content, data.author);
    isOffline = false;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("Fetch error:", error);
    if (error.name === 'AbortError') {
      quoteElement.textContent = "Taking a moment...";
    } else {
      // Fallback to local
      const randomFallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      displayQuote(randomFallback.content, randomFallback.author);
      isOffline = true;
      quoteElement.textContent += " (Offline mode)";
    }
    quoteElement.classList.remove("loading-text");
  }
}

// Display quote
function displayQuote(quote, author) {
  currentQuote = `"${quote}" — ${author}`;
  quoteElement.textContent = quote;
  authorElement.textContent = `— ${author}`;
  quoteElement.classList.remove("loading-text");
}

// Enhanced copy with fallback
function copyToClipboard() {
  if (!currentQuote) {
    copyMsg.textContent = "No quote to copy!";
    copyMsg.style.color = "#ff6b6b";
    copyMsg.style.display = "block";
    setTimeout(() => copyMsg.style.display = "none", 2000);
    return;
  }

  // Modern API
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(currentQuote).then(() => showCopySuccess()).catch(() => fallbackCopy());
  } else {
    fallbackCopy();
  }
}

function fallbackCopy() {
  const textArea = document.createElement("textarea");
  textArea.value = currentQuote;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    showCopySuccess();
  } catch (err) {
    console.error("Copy failed:", err);
    showCopyError();
  }
  document.body.removeChild(textArea);
}

function showCopySuccess() {
  copyMsg.textContent = "Quote copied! ✨";
  copyMsg.style.color = "#00ff90";
  copyMsg.style.display = "block";
  setTimeout(() => copyMsg.style.display = "none", 2000);
}

function showCopyError() {
  copyMsg.textContent = "Copy failed—select & copy manually.";
  copyMsg.style.color = "#ff6b6b";
  copyMsg.style.display = "block";
  setTimeout(() => copyMsg.style.display = "none", 3000);
}

// Events
newQuoteBtn.addEventListener("click", fetchQuote);
copyQuoteBtn.addEventListener("click", copyToClipboard);

// Auto-load
window.addEventListener("load", () => {
  if (!navigator.onLine) isOffline = true;
  fetchQuote();
});

// Handle online/offline changes
window.addEventListener("online", () => { isOffline = false; fetchQuote(); });
window.addEventListener("offline", () => { isOffline = true; });