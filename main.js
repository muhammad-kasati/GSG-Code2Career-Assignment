const CHUNK = 10;
let allQuotes = [];
let filteredQuotes = [];
let renderedCount = CHUNK;

const listEl = document.getElementById('quotes-list');
const filterInput = document.getElementById('filter');
const errorEl = document.getElementById('error');
const showMoreBtn = document.getElementById('show-more');

// Fetch once on load
fetch('https://dummyjson.com/quotes')
  .then(res => {
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  })
  .then(data => {
    allQuotes = data.quotes;
    applyFilter();  
  })
  .catch(err => {
    errorEl.textContent = 'Failed to load quotes: ' + err.message;
  });

// Render up to `renderedCount` items from filteredQuotes
function render() {
  listEl.innerHTML = '';
  const slice = filteredQuotes.slice(0, renderedCount);

  if (slice.length === 0) {
    listEl.innerHTML = `<li class="empty">No quotes match your search.</li>`;
  } else {
    const frag = document.createDocumentFragment();
    slice.forEach(q => {
      const li = document.createElement('li');
      li.textContent = q.quote;
      frag.appendChild(li);
    });
    listEl.appendChild(frag);
  }

  // Show or hide "Show More" button
  if (renderedCount < filteredQuotes.length) {
    showMoreBtn.style.display = 'block';
  } else {
    showMoreBtn.style.display = 'none';
  }
}

// Update filteredQuotes based on input and reset pagination
function applyFilter() {
  const q = filterInput.value.trim().toLowerCase();
  filteredQuotes = allQuotes.filter(x =>
    x.quote.toLowerCase().includes(q)
  );
  renderedCount = CHUNK;
  render();
}

filterInput.addEventListener('input', applyFilter);

showMoreBtn.addEventListener('click', () => {
  renderedCount += CHUNK;
  render();
});