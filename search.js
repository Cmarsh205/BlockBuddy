document.addEventListener("DOMContentLoaded", () => {
  /**
   * Navigation
   */
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

  /**
   * Search
   */
  document
    .getElementById("searchForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const query = document.getElementById("searchInput").value;

      console.log("query", query);

      if (query) {
        window.location.href = `search.html?q=${query}`;
      }
    });

  const params = new URLSearchParams(document.location.search);
  const q = params.get("q");

  if (q) {
    fetchResults(q);
  } else {
    console.log("Missing search query");
  }

  function fetchResults(query) {
    const apiKey = "ebd77297ed794bb129b23c3cd006661e";
    const baseUrl = "https://rebrickable.com";

    const headers = new Headers();
    headers.set(`Authorization`, `key ${apiKey}`);

    fetch(
      `${baseUrl}/api/v3/lego/sets?page=${1}&page_size=${20}&search=${query}`,
      {
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        displayResults(data.results);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  }

  function displayResults(results) {
    console.log(results);
    const resultsContainer = document.getElementById("resultsList");
    resultsContainer.innerHTML = "";

    if (results.length === 0) {
      resultsContainer.innerHTML = "<p>No results found.</p>";
      return;
    }
    const resultsListDiv = document.getElementById("resultsList");

    results.forEach((set) => {
      const setDiv = document.createElement("div");
      const setHeader = document.createElement("h3");
      const setPic = document.createElement("img");
      const setNumber = document.createElement("p");
      const collectionBtn = document.createElement("button");
      const wishlistBtn = document.createElement("button");

      collectionBtn.addEventListener("click", () => {
        let collectionValue = localStorage.getItem("collection");

        if (collectionValue === null) {
          localStorage.setItem("collection", "[]");
          collectionValue = "[]";
        }

        const collection = JSON.parse(collectionValue);

        collection.push(set);
        localStorage.setItem("collection", JSON.stringify(collection));
      });

      wishlistBtn.addEventListener("click", () => {
        let wishlistValue = localStorage.getItem("wishlist");

        if (wishlistValue === null) {
          localStorage.setItem("wishlist", "[]");
          wishlistValue = "[]";
        }

        const wishlist = JSON.parse(wishlistValue);

        wishlist.push(set);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
      });

      setHeader.innerText = set.name;
      setPic.src = set.set_img_url;
      setNumber.innerText = set.set_num;
      collectionBtn.innerText = "Add to collection";
      wishlistBtn.innerText = "Add to wishlist";

      setDiv.classList.add("setContainer");
      setHeader.classList.add("setName");
      setPic.classList.add("setImg");
      setNumber.classList.add("setNum");
      wishlistBtn.classList.add("wishlistBtnSP");
      collectionBtn.classList.add("collectionBtnSP");

      setDiv.appendChild(setHeader);
      setDiv.appendChild(setNumber);
      setDiv.appendChild(setPic);
      setDiv.appendChild(collectionBtn);
      setDiv.appendChild(wishlistBtn);
      resultsListDiv.appendChild(setDiv);
    });
  }
});
