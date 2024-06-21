document.addEventListener("DOMContentLoaded", () => {
  const homeBtn = document.getElementById("homeBtn");
  const collectionBtn = document.getElementById("collectionBtn");
  const wishlistBtn = document.getElementById("wishlistBtn");

  homeBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
  collectionBtn.addEventListener("click", () => {
    window.location.href = "collection.html";
  });
  wishlistBtn.addEventListener("click", () => {
    window.location.href = "wishlist.html";
  });
});

document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const query = document.getElementById("searchInput").value;
    if (query) {
      fetchResults(query);
    }
  });

function fetchResults(query) {
  const apiKey = "";
  const baseUrl = "https://rebrickable.com";

  const headers = new Headers();
  headers.set(`Authorization`, `key ${apiKey}`);

  fetch(`${baseUrl}/api/v3/lego/sets?page=${page}&page_size=${pageSize}`, {
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      displayResults(data.results);
    })
    .catch((error) => {
      console.error("Error fetching search results:", error);
    });
}

function displayResults(results) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (results.length > 0) {
    results.forEach((result) => {
      const resultItem = document.createElement("div");
      resultItem.classList.add("result-item");
      resultItem.innerHTML = `
                <h2>${result.title}</h2>
                <p>${result.description}</p>
                <a href="${result.url}" target="_blank">Read more</a>
            `;
      resultsContainer.appendChild(resultItem);
    });
  } else {
    resultsContainer.innerHTML = "<p>No results found.</p>";
  }
}
