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

      const response = await fetch("https://api.quotable.io/random", {
        cache: "no-cache",
        mode: "cors",
      });
      const data = await response.json();

      quoteElement.textContent = `"${data.content}"`;
      authorElement.textContent = data.author
        ? `— ${data.author}`
        : "— Unknown";
    } catch (error) {
      console.error("Error fetching quote:", error);
      quoteElement.textContent = "Failed to load quote. Try again.";
      authorElement.textContent = "";
    }
  }

  function copyQuote() {
    const fullQuote = `"${quoteElement.textContent}" ${authorElement.textContent}`;
    navigator.clipboard.writeText(fullQuote).then(() => {
      copyMsg.style.display = "block";
      setTimeout(() => {
        copyMsg.style.display = "none";
      }, 2000);
    });
  }

  // Buttons
  newQuoteBtn.addEventListener("click", fetchQuote);
  copyQuoteBtn.addEventListener("click", copyQuote);

  fetchQuote();

  setInterval(fetchQuote, 100000);
});
