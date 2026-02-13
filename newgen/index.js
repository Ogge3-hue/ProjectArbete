document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.Searchbar');
  const searchButton = document.querySelector('.sokknappen');
  // Gör så att man kan söka på siten till olika delarna av sidan
  const navMap = new Map([
    ['home', 'index.html'],
    ['index', 'index.html'],
    ['news', 'https://www.crunchyroll.com/news'],
    ['about', 'AboutUs.html'],
    ['about us', 'AboutUs.html'],
    ['contact', 'ContactUs.html'],
    ['contact us', 'ContactUs.html'],
    ['watchlist', 'MyWatchList.html'],
    ['my watchlist', 'MyWatchList.html']
  ]);

  function performSearch() {
    const raw = searchInput.value.trim();
    const searchTerm = raw.toLowerCase();
    if (!searchTerm) return;

    // om sökningen matchar en nyckel i navMap, navigera till motsvarande URL
    for (const [key, url] of navMap) {
      if (searchTerm === key || searchTerm.includes(key)) {
        window.location.href = url;
        return;
      }
    }

    // behåller vanlig sökfunktion för övrigt
    console.log(`Searching for: ${raw}`);
    alert(`You have searched for "${raw}"`);
    searchInput.value = '';
  }

  searchButton.addEventListener('click', performSearch);

  // gör bara så enter också är som sökknappen
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
});
