const input = document.querySelector(".search-box input");
const btn = document.querySelector(".search-btn");
const container = document.querySelector(".images");

// List of default images to show initially
const defaultImages = [
    'img1.jpeg',
    'img2.jpeg',
    'img3.jpeg',
    'img4.jpeg',
    'img5.jpeg',
    'img6.jpeg',
    'img7.jpeg',
    'img8.jpeg',
    'img9.jpeg',
    'img10.jpeg'
];

function showImages(filenames) {
    container.innerHTML = "";
    filenames.forEach(filename => {
        let li = document.createElement("li");
        li.classList.add("image");
        li.innerHTML = `
            <img src="images/${filename}" alt="image" class="photo">
            <div class="details">
                <div class="user"></div>
                <div class="download">
                    <a href="images/${filename}" download>
                        <button>Download</button>
                    </a>
                </div>
            </div>
        `;
        container.appendChild(li);
    });
}




// Show default images on initial load
window.addEventListener("DOMContentLoaded", () => {
    showImages(defaultImages, true);
});

btn.addEventListener("click", () => {
    let keyword = input.value.trim();
    if (!keyword) return;

    fetch(`search.php?keyword=${keyword}`)
        .then(res => res.json())
        .then(images => {
            container.innerHTML = "";
            if (images.length === 0) {
                container.innerHTML = "<p>No results found.</p>";
                return;
            }

            const filenames = images.map(img => img.filename);
            showImages(filenames, false);
        });
});
