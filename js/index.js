/**
 * index.js
 * Scroll-reveal for timeline items on the home page.
 */
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 120);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.tl-item').forEach(el => observer.observe(el));
});

const QUOTES = [
  {
    content: 'The more that you read, the more things you will know.',
    author: 'Dr. Seuss',
  },
  {
    content: 'Education is the most powerful weapon which you can use to change the world.',
    author: 'Nelson Mandela',
  },
  {
    content: 'Live as if you were to die tomorrow. Learn as if you were to live forever.',
    author: 'Mahatma Gandhi',
  },
  {
    content: 'The beautiful thing about learning is that nobody can take it away from you.',
    author: 'B.B. King',
  },
  {
    content: 'Success is the sum of small efforts, repeated day in and day out.',
    author: 'Robert Collier',
  },
  {
    content: 'The expert in anything was once a beginner.',
    author: 'Helen Hayes',
  },
  {
    content: 'Tell me and I forget. Teach me and I remember. Involve me and I learn.',
    author: 'Benjamin Franklin',
  },
];

function getQuoteOfTheDay() {
  const day = Math.floor(Date.now() / 86400000);
  return QUOTES[day % QUOTES.length];
}

function renderQuote(quote) {
  const textEl = document.getElementById('quote-text');
  const authorEl = document.getElementById('quote-author');
  if (!textEl || !authorEl) return;

  textEl.textContent = quote.content;
  authorEl.textContent = '- ' + quote.author;
  textEl.classList.add('loaded');
  authorEl.classList.add('loaded');
}

async function loadQuote() {
  const fallbackQuote = getQuoteOfTheDay();

  try {
    const day = Math.floor(Date.now() / 86400000);
    const quoteId = (day % 100) + 1;
    const response = await fetch(`https://dummyjson.com/quotes/${quoteId}`);
    if (!response.ok) throw new Error('Quote API unavailable');

    const data = await response.json();
    renderQuote({
      content: data.quote,
      author: data.author,
    });
  } catch {
    renderQuote(fallbackQuote);
  }
}

loadQuote();
