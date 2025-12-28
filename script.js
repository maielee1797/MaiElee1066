// Sample article data
const articles = {
    latest: [
        async function fetchNews() {
    const apiKey = '8b74c49bbbbd47039e4e9222bfd69ef7'; // Replace with your real API key
    const categories = ['general', 'sports', 'entertainment'];

    for (let category of categories) {
        const response = await fetch(`https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&max=5&token=${apiKey}`);
        const data = await response.json();

        const container = document.getElementById(`${category === 'general' ? 'latest' : category}-articles`);
        container.innerHTML = ''; // clear previous

        data.articles.forEach(article => {
            container.innerHTML += `
                <article class="article-card">
                    <img src="${article.image || 'https://via.placeholder.com/400x200'}" alt="${article.title}" class="article-image">
                    <div class="article-content">
                        <h4 class="article-title">${article.title}</h4>
                        <p class="article-excerpt">${article.description || ''}</p>
                        <div class="article-meta">
                            <span>🌐 Source: ${article.source.name}</span>
                            <span>${new Date(article.publishedAt).toLocaleTimeString()}</span>
                        </div>
                    </div>
                </article>
            `;
        });
    }
}

// Call fetchNews on load
fetchNews();
    ],
    sports: [
        { title: "Epic Championship Match", excerpt: "Sports world in shock...", image: "https://via.placeholder.com/400x200/ef4444/ffffff?text=Sports" },
        { title: "Record-Breaking Performance", excerpt: "Athlete makes history...", image: "https://via.placeholder.com/400x200/10b981/ffffff?text=Record" }
    ],
    entertainment: [
        { title: "Hollywood Blockbuster Revealed", excerpt: "Major film announcement...", image: "https://via.placeholder.com/400x200/8b5cf6/ffffff?text=Movies" },
        { title: "Music Awards Shock", excerpt: "Unexpected winners...", image: "https://via.placeholder.com/400x200/f97316/ffffff?text=Music" }
    ]
};

// Populate articles
function populateArticles() {
    Object.keys(articles).forEach(category => {
        const container = document.getElementById(`${category}-articles`);
        articles[category].forEach(article => {
            container.innerHTML += `
                <article class="article-card">
                    <img src="${article.image}" alt="${article.title}" class="article-image">
                    <div class="article-content">
                        <h4 class="article-title">${article.title}</h4>
                        <p class="article-excerpt">${article.excerpt}</p>
                        <div class="article-meta">
                            <span>🔥 12.5k views</span>
                            <span>2h ago</span>
                        </div>
                    </div>
                </article>
            `;
        });
    });
}

// Slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 5000);

// Nav active state
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    });
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0.1s';
        }
    });
});

document.querySelectorAll('.section').forEach(section => observer.observe(section));

// Initialize
populateArticles();
showSlide(0);
