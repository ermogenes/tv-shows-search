const handleSearch = async (event) => {
  event.preventDefault();

  const shows = document.querySelector('#shows');
  const message = document.querySelector('#message');

  shows.innerHTML = '';
  message.innerHTML = 'searching...';

  const query = document.querySelector('#query').value;
  const url = `https://api.tvmaze.com/search/shows?q=${query}`;
  const response = await fetch(url);
  const result = await response.json();

  if (result.length === 0) {
    message.innerHTML = 'not found';
    return;
  }

  message.innerHTML = '';

  result.forEach((entry) => {
    shows.insertAdjacentHTML(
      'beforeend',
      `
      <li>
        <img class="poster" title="poster" src="${
          entry?.show?.image?.original || ''
        }" />
        <span class="show-name">${entry?.show?.name || ''}</span>
      </li>`
    );
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('#search-form');
  searchForm.addEventListener('submit', handleSearch);
});
