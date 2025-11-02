document.addEventListener("DOMContentLoaded", () => {
  const quoteElement = document.getElementById("quote");
  const authorElement = document.getElementById("author");
  const newQuoteBtn = document.getElementById("new-quote");
  const copyQuoteBtn = document.getElementById("copy-quote");
  const copyMsg = document.getElementById("copyMsg");

  let quoteInterval = null;

  async function fetchQuote() {
    try {
      quoteElement.innerHTML = `<span class="loading-text">Loading quote<span class="dots"></span></span>`;
      authorElement.textContent = "";

      const response = await fetch("https://api.quotable.io/random", {
        mode: 'cors',
        credentials: 'omit',
        cache: 'no-cache'
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      quoteElement.textContent = `"${data.content}"`;
      authorElement.textContent = data.author ? `— ${data.author}` : "— Unknown";
    } catch (error) {
      console.error("Error fetching quote:", error);
      quoteElement.textContent = "Failed to load quote. Try again.";
      authorElement.textContent = "";
    }
  }

  function copyQuote() {
    const quoteText = quoteElement.textContent?.trim() || '';
    const authorText = authorElement.textContent?.trim() || '';
    const fullQuote = `"${quoteText}" ${authorText}`;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(fullQuote)
        .then(() => showCopyMsg())
        .catch(() => fallbackCopy(fullQuote));
    } else {
      fallbackCopy(fullQuote);
    }
  }

  function fallbackCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.opacity = "0";
    textArea.setAttribute("readonly", "");
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const success = document.execCommand("copy");
      if (success) showCopyMsg();
    } catch (err) {
      console.error("Copy failed:", err);
    }
    document.body.removeChild(textArea);
  }

  function showCopyMsg() {
    copyMsg.style.display = "block";
    clearTimeout(showCopyMsg.timeout);
    showCopyMsg.timeout = setTimeout(() => {
      copyMsg.style.display = "none";
    }, 2000);
  }

  function startAutoRefresh() {
    quoteInterval = setInterval(() => {
      if (!document.hidden) fetchQuote();
    }, 30000);
  }

  // Event Listeners
  newQuoteBtn.addEventListener("click", fetchQuote);
  copyQuoteBtn.addEventListener("click", copyQuote);

  // Init
  fetchQuote();
  startAutoRefresh();

  // Restart interval when tab becomes visible
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && !quoteInterval) {
      startAutoRefresh();
    }
  });
});