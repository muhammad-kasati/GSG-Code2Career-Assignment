let allQuotes = [];
const listEl = document.getElementById('quotes-list');
const filterInput = document.getElementById('filter');
const errorEl = document.getElementById('error');

fetch('https://dummyjson.com/quotes')
  .then(res => {
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  })
  .then(data => {
    allQuotes = data.quotes;
    render(allQuotes);
  })
  .catch(err => {
    errorEl.textContent = 'Failed to load quotes: ' + err.message;
  });

function render(quotes) {
  listEl.innerHTML = '';
  if (quotes.length === 0) {
    listEl.innerHTML = `<li class="empty">No quotes match your search.</li>`;
    return;
  }
  const frag = document.createDocumentFragment();
  quotes.forEach(q => {
    const li = document.createElement('li');
    li.textContent = q.quote;
    frag.appendChild(li);
  });
  listEl.appendChild(frag);
}

filterInput.addEventListener('input', () => {
  const q = filterInput.value.trim().toLowerCase();
  render(allQuotes.filter(x => x.quote.toLowerCase().includes(q)));
});