// script.js
const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const copyQuoteBtn = document.getElementById("copy-quote");
const copyMsg = document.getElementById("copyMsg");

let currentQuote = "";


const localQuotes = [
  { content: "The only way to do great work is to love what you do.", author: "Steve Jobs." },
  { content: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill." },
  { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt." },
  { content: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs." },
  { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt." },
  { content: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius." },
  { content: "Everything you've ever wanted is on the other side of fear.", author: "George Addair." },
  { content: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein." },
  { content: "I attribute my success to this: I never gave or took any excuse.", author: "Florence Nightingale." },
  { content: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky." },
  { content: "The best revenge is massive success.", author: "Frank Sinatra." },
  { content: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson." },
  { content: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford." },
  { content: "The only impossible journey is the one you never begin.", author: "Tony Robbins." },
  { content: "Act as if what you do makes a difference. It does.", author: "William James." },
  { content: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau." },
  { content: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller." },
  { content: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson." },
  { content: "Opportunities don't happen. You create them.", author: "Chris Grosser." },
  { content: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.", author: "Roy T. Bennett." },
  { content: "The secret of getting ahead is getting started.", author: "Mark Twain." },
  { content: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis." },
  { content: "Dream big and dare to fail.", author: "Norman Vaughan." },
  { content: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar." },
  { content: "If you can dream it, you can do it.", author: "Walt Disney." },
  { content: "Keep your face always toward the sunshine—and shadows will fall behind you.", author: "Walt Whitman." },
  { content: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt." },
  { content: "It’s not whether you get knocked down, it’s whether you get up.", author: "Vince Lombardi." },
  { content: "The harder the conflict, the greater the triumph.", author: "George Washington." },
  { content: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe." },
  { content: "The best way to predict the future is to create it.", author: "Peter Drucker." },
  { content: "Don’t let yesterday take up too much of today.", author: "Will Rogers." },
  { content: "You don’t have to be great to start, but you have to start to be great.", author: "Zig Ziglar." },
  { content: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill." },
  { content: "The only place where success comes before work is in the dictionary.", author: "Vidal Sassoon." },
  { content: "I never dreamed about success. I worked for it.", author: "Estée Lauder." },
  { content: "Don’t wait for opportunity. Create it.", author: "George Bernard Shaw." },
  { content: "Great things never come from comfort zones.", author: "Roy T. Bennett." },
  { content: "Dream it. Wish it. Do it.", author: "Unknown." },
  { content: "Success doesn’t just find you. You have to go out and get it.", author: "Unknown." },
  { content: "The harder you work for something, the greater you’ll feel when you achieve it.", author: "Unknown." },
  { content: "Wake up with determination. Go to bed with satisfaction.", author: "Unknown." },
  { content: "Don’t stop when you’re tired. Stop when you’re done.", author: "Unknown." },
  { content: "Little things make big days.", author: "Unknown." },
  { content: "It’s going to be hard, but hard does not mean impossible.", author: "Unknown." },
  { content: "Don’t wait for opportunity. Create it.", author: "Unknown." },
  { content: "Sometimes we’re tested not to show our weaknesses, but to discover our strengths.", author: "Unknown." },
  { content: "The key to success is to focus on goals, not obstacles.", author: "Unknown." },
  { content: "Dream it. Believe it. Achieve it.", author: "Unknown." },
  { content: "Your limitation—it’s only your imagination.", author: "Unknown." }
];



async function fetchQuoteFromAPI() {
  const response = await fetch(
    "https://api.quotable.io/random?tags=inspirational|motivational|life|success"
  );
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();
  return { content: data.content, author: data.author };
}


async function fetchQuote() {
  // Show loading state
  quoteElement.textContent = "Loading quote…";
  quoteElement.classList.add("loading-text");
  authorElement.textContent = "";

  try {
    const quote = await fetchQuoteFromAPI();
    displayQuote(quote.content, quote.author);
  } catch (err) {
    console.warn("API failed, using local quotes:", err);
    // ---- FALLBACK TO LOCAL ----
    const randomIdx = Math.floor(Math.random() * localQuotes.length);
    const quote = localQuotes[randomIdx];
    displayQuote(quote.content, quote.author);
  }
}


function displayQuote(quote, author) {
  currentQuote = `"${quote}" — ${author}`;
  quoteElement.textContent = quote;
  authorElement.textContent = `— ${author}`;
  quoteElement.classList.remove("loading-text");
  copyMsg.style.display = "none"; 
}


function copyToClipboard() {
  navigator.clipboard.writeText(currentQuote).then(() => {
    copyMsg.style.display = "block";
    setTimeout(() => (copyMsg.style.display = "none"), 2000);
  }).catch(err => {
    console.error("Copy failed:", err);
    copyMsg.textContent = "Failed to copy!";
    copyMsg.style.color = "#ff6b6b";
    copyMsg.style.display = "block";
    setTimeout(() => {
      copyMsg.textContent = "Quote copied to clipboard!";
      copyMsg.style.color = "#00ff90";
      copyMsg.style.display = "none";
    }, 2000);
  });
}

newQuoteBtn.addEventListener("click", fetchQuote);
copyQuoteBtn.addEventListener("click", copyToClipboard);

window.addEventListener("load", fetchQuote);