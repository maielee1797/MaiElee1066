const apiKey = '8b74c49bbbbd47039e4e9222bfd69ef7'; // replace with your NewsAPI key
const newsContainer = document.getElementById('news-container');

fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    data.articles.forEach(article => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${article.urlToImage || 'https://via.placeholder.com/400'}" alt="News Image">
        <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
        <p>${article.description || ''}</p>
      `;
      newsContainer.appendChild(card);
    });
  })
  .catch(err => console.log(err));
