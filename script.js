document.addEventListener("DOMContentLoaded", () => {
  const quoteElement = document.getElementById("quote");
  const authorElement = document.getElementById("author");
  const newQuoteBtn = document.getElementById("new-quote");
  const copyQuoteBtn = document.getElementById("copy-quote");
  const copyMsg = document.getElementById("copyMsg");
async function fetchQuote() {
  try {
    quoteElement.innerHTML = `<span class="loading-text">Loading quote<span class="dots"></span></span>`;
    authorElement.textContent = "";

    // Use a proxy to fix CORS issues
    const proxyUrl = "https://api.allorigins.win/get?url=";
    const apiUrl = encodeURIComponent("https://api.quotable.io/random");

    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    const quoteData = JSON.parse(data.contents);

    quoteElement.textContent = `"${quoteData.content}"`;
    authorElement.textContent = quoteData.author ? `— ${quoteData.author}` : "— Unknown";
  } catch (error) {
    console.error("Error fetching quote:", error);
    quoteElement.textContent = "Failed to load quote. Try again.";
    authorElement.textContent = "";
  }
}


  function copyQuote() {
    const fullQuote = `"${quoteElement.textContent}" ${authorElement.textContent}`;

    // ✅ Works on Samsung Internet too
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullQuote)
        .then(() => showCopyMsg())
        .catch(() => fallbackCopy(fullQuote));
    } else {
      fallbackCopy(fullQuote);
    }
  }

  // ✨ Fallback copy method (for older browsers)
  function fallbackCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      showCopyMsg();
    } catch (err) {
      console.error("Fallback copy failed:", err);
    }
    document.body.removeChild(textArea);
  }

  function showCopyMsg() {
    copyMsg.style.display = "block";
    setTimeout(() => {
      copyMsg.style.display = "none";
    }, 2000);
  }

  // Buttons
  newQuoteBtn.addEventListener("click", fetchQuote);
  copyQuoteBtn.addEventListener("click", copyQuote);

  fetchQuote();
  setInterval(fetchQuote, 30000);
});
