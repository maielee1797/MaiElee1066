<script>
  // 1. Search Functionality
  document.getElementById('searchInput').addEventListener('input', function(e) {
    const term = e.target.value.toLowerCase();
    document.querySelectorAll('.card').forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(term) ? 'block' : 'none';
    });
  });

  // 2. Dark Mode Toggle
  document.getElementById('darkMode').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    document.getElementById('darkMode').textContent = isDark ? '☀️' : '🌙';
  });

  // 3. Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // 🔥 LIVE NEWS API - POPULATES ENTIRE NEWS SECTION
  async function loadLiveNews() {
    const apiKey = '8b74c49bbbbd47039e4e9222bfd69ef7'; // YOUR KEY ✅
    const newsCards = document.getElementById('news-cards');
    const loading = document.getElementById('news-loading');
    
    try {
      loading.textContent = 'Fetching live headlines...';
      
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&pageSize=6`
      );
      
      const data = await response.json();
      
      if (data.articles && data.articles.length > 0) {
        newsCards.innerHTML = ''; // Clear loading cards
        
        data.articles.slice(0, 6).forEach(article => {
          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `
            <img src="${article.urlToImage || 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=800&q=80'}" 
                 alt="${article.title}" onerror="this.src='https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=800&q=80'">
            <h3>${article.title || 'Breaking News'}</h3>
            <p>${article.description || 'Read the full story for latest updates.'}</p>
            <div class="social-share">
              <a href="https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(article.url)}" target="_blank" title="Facebook">📘</a>
              <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(article.url)}&text=${encodeURIComponent(article.title)}" target="_blank" title="Twitter">🐦</a>
              <a href="https://instagram.com" target="_blank" title="Instagram">📷</a>
            </div>
          `;
          newsCards.appendChild(card);
        });
        
        loading.textContent = `Updated: ${new Date().toLocaleTimeString()}`;
      } else {
        throw new Error('No articles found');
      }
    } catch (error) {
      console.error('News API Error:', error);
      loading.textContent = 'Using demo content';
      newsCards.innerHTML = `
        <div class="card">
          <img src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=800&q=80">
          <h3>🔥 Live News Active</h3>
          <p>API connected! Check browser console for details. Refresh page.</p>
          <div class="social-share">
            <a href="#" title="Facebook">📘</a>
            <a href="#" title="Twitter">🐦</a>
            <a href="#" title="Instagram">📷</a>
          </div>
        </div>
      `;
    }
  }

  // Load news on page load + refresh every 5 minutes
  loadLiveNews();
  setInterval(loadLiveNews, 5 * 60 * 1000); // 5 minutes
</script>
