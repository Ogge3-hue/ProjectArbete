document.addEventListener('DOMContentLoaded', () => {
const searchInput = document.querySelector('.Searchbar');
const searchButton = document.querySelector('.sokknappen');

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    console.log(`Searching for: ${searchTerm}`);
    alert(`You have searched for "${searchTerm}"`);
    searchInput.value = '';
  }
});
});
