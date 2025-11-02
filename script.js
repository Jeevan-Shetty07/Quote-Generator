document.addEventListener("DOMContentLoaded", () => {
  const quoteElement = document.getElementById('quote');
  const authorElement = document.getElementById('author');
  const newQuoteBtn = document.getElementById('new-quote');
  const copyQuoteBtn = document.getElementById('copy-quote');
  const copyMsg = document.getElementById('copyMsg');

  async function fetchQuote() {
    try {
      quoteElement.textContent = "Loading quote...";
      authorElement.textContent = "";

      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();

      quoteElement.textContent = `"${data.content}"`;
      authorElement.textContent = data.author ? `— ${data.author}` : "— Unknown";
    } catch (error) {
      console.error(error);
      quoteElement.textContent = "Failed to load quote. Try again.";
      authorElement.textContent = "";
    }
  }

  function copyQuote() {
    const fullQuote = `"${quoteElement.textContent}" ${authorElement.textContent}`;
    navigator.clipboard.writeText(fullQuote).then(() => {
      copyMsg.style.display = 'block';
      setTimeout(() => {
        copyMsg.style.display = 'none';
      }, 2000);
    });
  }

  newQuoteBtn.addEventListener('click', fetchQuote);
  copyQuoteBtn.addEventListener('click', copyQuote);

  
  fetchQuote();
});
