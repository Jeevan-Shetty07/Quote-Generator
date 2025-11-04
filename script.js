// Elements
const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const copyQuoteBtn = document.getElementById("copy-quote");
const shareBtn = document.getElementById("share-twitter");
const favoriteBtn = document.getElementById("favorite-quote");
const copyMsg = document.getElementById("copyMsg");
const favMsg = document.getElementById("favMsg");
const themeToggle = document.getElementById("theme-toggle");
const viewFavoritesBtn = document.getElementById("view-favorites");
const favCount = document.getElementById("fav-count");
const modal = document.getElementById("favorites-modal");
const closeModal = document.querySelector(".close");
const favoritesList = document.getElementById("favorites-list");
const clearFavoritesBtn = document.getElementById("clear-favorites");
let currentQuote = "";
let currentQuoteObj = {};
const localQuotes = [
  {
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs.",
  },
  {
    content: "It always seems impossible until it’s done.",
    author: "Nelson Mandela.",
  },
  {
    content: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein.",
  },
  {
    content: "Why do we fall? So we can learn to pick ourselves up.",
    author: "Batman (Bruce Wayne).",
  },
  {
    content: "Don’t watch the clock; do what it does. Keep going.",
    author: "Sam Levenson.",
  },
  {
    content: "Code is like humor. When you have to explain it, it’s bad.",
    author: "Cory House.",
  },
  {
    content: "First, solve the problem. Then, write the code.",
    author: "John Johnson.",
  },
  {
    content: "Experience is the name everyone gives to their mistakes.",
    author: "Oscar Wilde.",
  },
  {
    content: "Simplicity is the soul of efficiency.",
    author: "Austin Freeman.",
  },
  {
    content: "Before software can be reusable it first has to be usable.",
    author: "Ralph Johnson.",
  },
  {
    content: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds.",
  },
  {
    content:
      "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson.",
  },
  {
    content: "Make it work, make it right, make it fast.",
    author: "Kent Beck.",
  },
  {
    content: "The best error message is the one that never shows up.",
    author: "Thomas Fuchs.",
  },
  {
    content: "Good code is its own best documentation.",
    author: "Steve McConnell.",
  },
  {
    content: "Code never lies, comments sometimes do.",
    author: "Ron Jeffries.",
  },
  {
    content: "Fix the cause, not the symptom.",
    author: "Steve Maguire.",
  },
  {
    content:
      "Programs are meant to be read by humans and only incidentally by computers.",
    author: "Donald Knuth.",
  },
  {
    content:
      "Programming isn’t about what you know; it’s about what you can figure out.",
    author: "Chris Pine.",
  },
  {
    content: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra.",
  },
  {
    content: "Learning to write programs stretches your mind.",
    author: "Bill Gates.",
  },
  {
    content:
      "The computer was born to solve problems that did not exist before.",
    author: "Bill Gates.",
  },
  {
    content:
      "Don’t worry if it doesn’t work right. If everything did, you’d be out of a job.",
    author: "Mosher’s Law of Software Engineering.",
  },
  {
    content: "It’s not a bug; it’s an undocumented feature.",
    author: "Anonymous.",
  },
  {
    content: "Code is like poetry; it should be short and expressive.",
    author: "Anonymous.",
  },
  {
    content: "Computers are fast; programmers keep it slow.",
    author: "Anonymous.",
  },
  {
    content:
      "If debugging is the process of removing software bugs, then programming must be the process of putting them in.",
    author: "Edsger W. Dijkstra.",
  },
  {
    content: "To iterate is human, to recurse divine.",
    author: "L. Peter Deutsch.",
  },
  {
    content:
      "The most disastrous thing that you can ever learn is your first programming language.",
    author: "Alan Kay.",
  },
  {
    content: "One man’s crappy software is another man’s full-time job.",
    author: "Jessica Gaston.",
  },
  {
    content:
      "Walking on water and developing software from a specification are easy if both are frozen.",
    author: "Edward V. Berard.",
  },
  {
    content:
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler.",
  },
  {
    content:
      "If you can’t explain it simply, you don’t understand it well enough.",
    author: "Albert Einstein.",
  },
  {
    content:
      "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday’s code.",
    author: "Dan Salomon.",
  },
  {
    content:
      "A user interface is like a joke. If you have to explain it, it’s not that good.",
    author: "Martin LeBlanc.",
  },
  {
    content:
      "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.",
    author: "Patrick McKenzie.",
  },
  {
    content:
      "The most important property of a program is whether it accomplishes the intention of its user.",
    author: "C.A.R. Hoare.",
  },
  {
    content: "Code without tests is broken by design.",
    author: "Jacob Kaplan-Moss.",
  },
  {
    content:
      "The function of good software is to make the complex appear simple.",
    author: "Grady Booch.",
  },
  {
    content: "The best way to predict the future is to invent it.",
    author: "Alan Kay.",
  },
  {
    content: "Programming is not about typing; it’s about thinking.",
    author: "Rich Hickey.",
  },
  {
    content: "Premature optimization is the root of all evil.",
    author: "Donald Knuth.",
  },
  {
    content:
      "In theory, there is no difference between theory and practice. But, in practice, there is.",
    author: "Jan L. A. van de Snepscheut.",
  },
  {
    content:
      "Computers do what you tell them to do, not what you want them to do.",
    author: "Murphy’s Law of Computing.",
  },
  {
    content: "Failure is not the opposite of success; it’s part of success.",
    author: "Arianna Huffington.",
  },
  {
    content: "Stay hungry, stay foolish.",
    author: "Steve Jobs.",
  },
  {
    content: "The secret of getting ahead is getting started.",
    author: "Mark Twain.",
  },
  {
    content: "Push yourself, because no one else is going to do it for you.",
    author: "Anonymous.",
  },
  {
    content: "Do something today that your future self will thank you for.",
    author: "Anonymous.",
  },
  {
    content:
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill.",
  },
  {
    content: "Dream big. Start small. Act now.",
    author: "Robin Sharma.",
  },
  {
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    content: "It always seems impossible until it’s done.",
    author: "Nelson Mandela",
  },
  {
    content: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
  },
  {
    content: "Why do we fall? So we can learn to pick ourselves up.",
    author: "Thomas Wayne",
  },
  {
    content: "The quieter you become, the more you can hear.",
    author: "Ram Dass",
  },
  {
    content:
      "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    author: "Ralph Waldo Emerson",
  },
  {
    content:
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    content: "Life is what happens when you’re busy making other plans.",
    author: "John Lennon",
  },
  {
    content:
      "Your time is limited, so don’t waste it living someone else’s life.",
    author: "Steve Jobs",
  },
  { content: "Happiness depends upon ourselves.", author: "Aristotle" },
  { content: "The best revenge is massive success.", author: "Frank Sinatra" },
  { content: "What we think, we become.", author: "Buddha" },
  {
    content:
      "If you want to go fast, go alone. If you want to go far, go together.",
    author: "African Proverb",
  },
  { content: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
  {
    content: "Sometimes you win, sometimes you learn.",
    author: "John C. Maxwell",
  },
  {
    content:
      "The less you respond to negativity, the more peaceful your life becomes.",
    author: "Unknown",
  },
  {
    content: "You must be the change you wish to see in the world.",
    author: "Mahatma Gandhi",
  },
  { content: "Dream big. Start small. Act now.", author: "Robin Sharma" },
  {
    content: "The hardest choices require the strongest wills.",
    author: "Thanos",
  },
  {
    content: "Don’t watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    content:
      "Courage doesn’t always roar. Sometimes it’s the quiet voice saying, ‘I will try again tomorrow.’",
    author: "Mary Anne Radmacher",
  },
  { content: "Silence is a source of great strength.", author: "Lao Tzu" },
  {
    content:
      "The biggest communication problem is we listen to reply, not to understand.",
    author: "Stephen R. Covey",
  },
  {
    content:
      "You are not a drop in the ocean. You are the entire ocean in a drop.",
    author: "Rumi",
  },
  {
    content: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
  },
  {
    content: "Fear is a reaction. Courage is a decision.",
    author: "Winston Churchill",
  },
  {
    content: "Don’t let yesterday take up too much of today.",
    author: "Will Rogers",
  },
  {
    content: "A smooth sea never made a skilled sailor.",
    author: "Franklin D. Roosevelt",
  },
  { content: "Everything you can imagine is real.", author: "Pablo Picasso" },
  {
    content: "You miss 100% of the shots you don’t take.",
    author: "Wayne Gretzky",
  },
  {
    content:
      "To live is the rarest thing in the world. Most people exist, that is all.",
    author: "Oscar Wilde",
  },
  { content: "You don’t have to be perfect to be amazing.", author: "Unknown" },
  {
    content: "Your mind is a garden. Your thoughts are the seeds.",
    author: "William Wordsworth",
  },
  { content: "When nothing goes right, go left.", author: "Unknown" },
  {
    content:
      "Sometimes it’s not the people who change, it’s the mask that falls off.",
    author: "Unknown",
  },
  {
    content: "Life is really simple, but we insist on making it complicated.",
    author: "Confucius",
  },
  {
    content: "Technology is best when it brings people together.",
    author: "Matt Mullenweg",
  },
  {
    content:
      "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson",
  },
  { content: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  {
    content:
      "If debugging is the process of removing software bugs, then programming must be the process of putting them in.",
    author: "Edsger Dijkstra",
  },
  {
    content: "In the end, we only regret the chances we didn’t take.",
    author: "Lewis Carroll",
  },
  {
    content: "Every saint has a past, and every sinner has a future.",
    author: "Oscar Wilde",
  },
  {
    content:
      "It’s not who you are underneath, but what you do that defines you.",
    author: "Batman",
  },
  {
    content: "Even the darkest night will end and the sun will rise.",
    author: "Victor Hugo",
  },
  {
    content:
      "The world breaks everyone, and afterward, some are strong at the broken places.",
    author: "Ernest Hemingway",
  },
  {
    content: "Pain is inevitable. Suffering is optional.",
    author: "Haruki Murakami",
  },
  {
    content: "Don’t compare your chapter 1 to someone else’s chapter 20.",
    author: "Unknown",
  },
  {
    content: "When you have a dream, you’ve got to grab it and never let go.",
    author: "Carol Burnett",
  },
  {
    content:
      "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson",
  },
  {
    content: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
  },
  { content: "Not all those who wander are lost.", author: "J.R.R. Tolkien" },
  {
    content:
      "Sometimes the smallest step in the right direction ends up being the biggest step of your life.",
    author: "Naeem Callaway",
  },
  {
    content: "It’s okay to outgrow people who don’t grow with you.",
    author: "Unknown",
  },
  {
    content: "Be kind, for everyone you meet is fighting a hard battle.",
    author: "Plato",
  },
  {
    content:
      "If you can’t explain it simply, you don’t understand it well enough.",
    author: "Albert Einstein",
  },
  {
    content:
      "The best way to find yourself is to lose yourself in the service of others.",
    author: "Mahatma Gandhi",
  },
  {
    content: "You don’t need eyes to see, you need vision.",
    author: "Maxi Jazz",
  },
  { content: "Be a voice, not an echo.", author: "Albert Einstein" },
  {
    content:
      "Logic will get you from A to B. Imagination will take you everywhere.",
    author: "Albert Einstein",
  },
  {
    content: "Don’t count the days, make the days count.",
    author: "Muhammad Ali",
  },
];

function loadTheme() {
  const isLight = localStorage.getItem("theme") === "light";
  document.body.classList.toggle("light", isLight);
  themeToggle.textContent = isLight ? "🌞" : "🌙";
}
loadTheme();

themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  themeToggle.textContent = isLight ? "🌞" : "🌙";
});

async function fetchQuoteFromAPI(timeout = 2000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(
      "https://api.quotable.io/random?tags=inspirational|motivational|life|success",
      { signal: controller.signal }
    );
    clearTimeout(timer);
    if (!response.ok) throw new Error("API error");
    return await response.json();
  } catch (err) {
    clearTimeout(timer);
    throw new Error("Timeout or API error");
  }
}

async function fetchQuote() {
  quoteElement.textContent = "Loading quote";
  quoteElement.classList.add("loading-text");
  authorElement.textContent = "";
  copyMsg.style.display = "none";
  favMsg.style.display = "none";

  try {
    const data = await fetchQuoteFromAPI();
    currentQuoteObj = { content: data.content, author: data.author };
    displayQuote(data.content, data.author);
  } catch (err) {
    console.warn("API failed, using local:", err);
    const q = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    currentQuoteObj = q;
    displayQuote(q.content, q.author);
  }
}

function displayQuote(quote, author) {
  currentQuote = `"${quote}" — ${author}`;
  quoteElement.textContent = quote;
  authorElement.textContent = `— ${author}`;
  quoteElement.classList.remove("loading-text");
}

function copyToClipboard() {
  navigator.clipboard.writeText(currentQuote).then(() => {
    copyMsg.style.display = "block";
    setTimeout(() => (copyMsg.style.display = "none"), 2000);
  });
}

function shareOnTwitter() {
  const text = encodeURIComponent(currentQuote);
  window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
}

function saveFavorite() {
  let favorites = JSON.parse(localStorage.getItem("favoriteQuotes") || "[]");
  if (favorites.some((f) => f.content === currentQuoteObj.content)) {
    favMsg.textContent = "Already saved!";
    favMsg.style.color = "#aaa";
  } else {
    favorites.push(currentQuoteObj);
    localStorage.setItem("favoriteQuotes", JSON.stringify(favorites));
    favMsg.textContent = "Saved to favorites! ❤️";
    updateFavCount();
  }
  favMsg.style.display = "block";
  setTimeout(() => (favMsg.style.display = "none"), 2000);
}

function updateFavCount() {
  const count = JSON.parse(
    localStorage.getItem("favoriteQuotes") || "[]"
  ).length;
  favCount.textContent = count;
}
function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favoriteQuotes") || "[]");
  favoritesList.innerHTML = "";
  if (favorites.length === 0) {
    favoritesList.innerHTML =
      "<p style='color:#888; text-align:center;'>No favorites yet.</p>";
    return;
  }
  favorites.forEach((q, i) => {
    const item = document.createElement("div");
    item.className = "fav-item";
    item.innerHTML = `
      <em>"${q.content}"</em><br><strong>— ${q.author}</strong>
      <button class="remove-fav" data-index="${i}">×</button>
    `;
    favoritesList.appendChild(item);
  });
}

favoritesList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-fav")) {
    let favorites = JSON.parse(localStorage.getItem("favoriteQuotes") || "[]");
    const index = e.target.dataset.index;
    favorites.splice(index, 1);
    localStorage.setItem("favoriteQuotes", JSON.stringify(favorites));
    loadFavorites();
    updateFavCount();
  }
});

clearFavoritesBtn.addEventListener("click", () => {
  if (confirm("Clear all favorites?")) {
    localStorage.removeItem("favoriteQuotes");
    loadFavorites();
    updateFavCount();
  }
});

viewFavoritesBtn.addEventListener("click", () => {
  loadFavorites();
  modal.style.display = "block";
});
closeModal.addEventListener("click", () => (modal.style.display = "none"));
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

newQuoteBtn.addEventListener("click", fetchQuote);
copyQuoteBtn.addEventListener("click", copyToClipboard);
shareBtn.addEventListener("click", shareOnTwitter);
favoriteBtn.addEventListener("click", saveFavorite);

window.addEventListener("load", () => {
  fetchQuote();
  updateFavCount();
});
