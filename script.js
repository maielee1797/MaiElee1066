// Sample articles by category
const articles = {
    latest: [
        { title: "Breaking: Local Team Wins Championship", url: "#" },
        { title: "Celebrity Gossip: Big Movie Release", url: "#" },
        { title: "Tech Update: New Smartphone Launch", url: "#" }
    ],
    sports: [
        { title: "Football: Top 5 Goals This Week", url: "#" },
        { title: "Basketball: Championship Highlights", url: "#" }
    ],
    entertainment: [
        { title: "Movie Review: Blockbuster Hit", url: "#" },
        { title: "Celebrity Interview: Behind the Scenes", url: "#" }
    ]
};

// Function to display articles in a section with images and share button
function loadArticles() {
    Object.keys(articles).forEach(category => {
        const ul = document.getElementById(`${category}-articles`);
        ul.innerHTML = "";
        articles[category].forEach(article => {
            const li = document.createElement("li");

            // Article image
            const img = document.createElement("img");
            img.src = "https://via.placeholder.com/100"; // placeholder image
            img.alt = article.title;
            img.style.width = "100px";
            img.style.height = "100px";
            img.style.objectFit = "cover";
            img.style.marginRight = "10px";
            img.style.borderRadius = "6px";
            img.style.verticalAlign = "middle";
            li.appendChild(img);

            // Article link
            const a = document.createElement("a");
            a.href = article.url;
            a.textContent = article.title;
            a.style.verticalAlign = "middle";
            li.appendChild(a);

            // Social Share button
            const shareBtn = document.createElement("a");
            shareBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + " " + article.url)}`;
            shareBtn.textContent = " 🔗 Share";
            shareBtn.target = "_blank";
            shareBtn.style.marginLeft = "10px";
            li.appendChild(shareBtn);

            ul.appendChild(li);
        });
    });
}

// Load articles on page load
window.onload = () => {
    loadArticles();
    showSlide(currentSlide);
    setInterval(nextSlide, 4000);
};

// ---------------- Slider ----------------
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
        if (i === index) slide.classList.add("active");
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}
