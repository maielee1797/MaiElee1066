// Sample trending articles data
const articles = [
    { title: "Breaking: Local Team Wins Championship", url: "#" },
    { title: "Celebrity Gossip: Big Movie Release", url: "#" },
    { title: "Tech Update: New Smartphone Launch", url: "#" }
];

// Function to display articles
function loadArticles() {
    const ul = document.querySelector("ul");
    ul.innerHTML = ""; // Clear placeholder
    articles.forEach(article => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = article.url;
        a.textContent = article.title;
        li.appendChild(a);
        ul.appendChild(li);
    });
}

// Load articles on page load
window.onload = loadArticles;
