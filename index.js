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

  const PAGE_SIZE = 50;

  function getFeaturedSets(page = 1, pageSize = 100) {
    const apiKey = "ebd77297ed794bb129b23c3cd006661e";
    const baseUrl = "https://rebrickable.com";

    const headers = new Headers();
    headers.set(`Authorization`, `key ${apiKey}`);

    fetch(`${baseUrl}/api/v3/lego/sets?page=${page}&page_size=${pageSize}`, {
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        const uniqueIndices = new Set();
        const sets = [];
        const numSets = 6;

        while (uniqueIndices.size < numSets) {
          const idx = Math.round(Math.random() * PAGE_SIZE);

          if (!uniqueIndices.has(idx)) {
            sets.push(data.results[idx]);
            uniqueIndices.add(idx);
          }
        }

        const featuredSetsList = document.createElement("div");
        featuredSetsList.classList.add("featuredSetsList");

        for (let i = 0; i < sets.length; i++) {
          const set = sets[i];
          const setDiv = document.createElement("div");
          const setHeader = document.createElement("h3");
          const setPic = document.createElement("img");
          const setNumber = document.createElement("p");
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href =
            "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0";

          document.head.appendChild(link);

          const collectionBtn = document.createElement("button");
          const wishlistBtn = document.createElement("button");
          const cIcon = document.createElement("span");
          cIcon.classList.add("material-symbols-outlined");
          cIcon.textContent = "menu_book";
          const wIcon = document.createElement("span");
          wIcon.classList.add("material-symbols-outlined");
          wIcon.textContent = "favorite";

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

          setDiv.classList.add("setContainer");
          setHeader.classList.add("setName");
          setPic.classList.add("setImg");
          setNumber.classList.add("setNum");
          wishlistBtn.classList.add("wishlistBtnSP");
          collectionBtn.classList.add("collectionBtnSP");

          setDiv.appendChild(setHeader);
          setDiv.appendChild(setNumber);
          setDiv.appendChild(setPic);
          collectionBtn.appendChild(cIcon);
          wishlistBtn.appendChild(wIcon);
          setDiv.appendChild(collectionBtn);
          setDiv.appendChild(wishlistBtn);
          featuredSetsList.appendChild(setDiv);
        }

        const featuredSetsDiv = document.getElementById("box-f");
        featuredSetsDiv.appendChild(featuredSetsList);
      });
  }

  const page = Math.ceil(Math.random() * 100);

  getFeaturedSets(page, PAGE_SIZE);
});

/**
 * What you might like
 *
 * 1. Iterate through collection/wishlist
 *  1.1. get localstorage for list
 *  1.2. loop through the list to search for theme
 * 2. Count the number of times a theme appears
 * 3. Take the top X themes and make API request for each of them (there is a themes endpoint)
 * 4. Take the results, iterate over them to display them in the container
 *
 * All of the code has basically been done already, just need to piece it together
 */
