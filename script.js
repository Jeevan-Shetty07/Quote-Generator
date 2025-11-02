const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const btn = document.getElementById("btn");

async function getQuote() {
  quoteEl.textContent = "Fetching quote...";
  authorEl.textContent = "";

  try {
    // Add a unique timestamp to avoid cache
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
      "https://zenquotes.io/api/random"
    )}&t=${new Date().getTime()}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch quote");

    const data = await response.json();
    const quoteData = JSON.parse(data.contents)[0];

    console.log("Fetched:", quoteData);

    quoteEl.textContent = `"${quoteData.q}"`;
    authorEl.textContent = `– ${quoteData.a}`;
  } catch (error) {
    console.error("Error:", error);
    quoteEl.textContent = "Oops! Couldn't fetch a quote 😢";
    authorEl.textContent = "Try again later.";
  }
}

btn.addEventListener("click", getQuote);
window.addEventListener("load", getQuote);
