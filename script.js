async function getQuote() {
  quoteEl.textContent = "Fetching quote...";
  authorEl.textContent = "";

  try {
    const response = await fetch("https://zenquotes.io/api/random");
    const data = await response.json();
    const quoteData = data[0];

    quoteEl.textContent = `"${quoteData.q}"`;
    authorEl.textContent = `– ${quoteData.a}`;
    copyMsg.style.display = "none";
  } catch (error) {
    console.error("Error fetching quote:", error);
    quoteEl.textContent = "Oops! Couldn't fetch a quote 😢";
    authorEl.textContent = "Try again later.";
  }
}
