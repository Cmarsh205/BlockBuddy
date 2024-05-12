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

  const PAGE_SIZE = 50;

  function getFeaturedSets(page = 1, pageSize = 100) {
    const apiKey = "";
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
        const numSets = 5;

        while (uniqueIndices.size < numSets) {
          const idx = Math.round(Math.random() * PAGE_SIZE);

          if (!uniqueIndices.has(idx)) {
            sets.push(data.results[idx]);
            uniqueIndices.add(idx);
          }
        }

        /**
         * create container list div
         * for each item in sets
         *   create div
         *   append header with set name
         *   append div to container list
         * append container list to document (featured sets element)
         */

        const featuredSetsList = document.createElement("div");

        for (let i = 0; i < sets.length; i++) {
          const set = sets[i];
          const setDiv = document.createElement("div");
          const setHeader = document.createElement("h3");
          const setNumber = document.createElement("p");

          setHeader.innerText = set.name;
          setNumber.innerText = set.set_num;

          // setHeader.classList.add('')
          // setHeader.id = ''

          setDiv.appendChild(setHeader);
          setDiv.appendChild(setNumber);
          featuredSetsList.appendChild(setDiv);
        }

        const featuredSetsDiv = document.getElementById("box-f");
        featuredSetsDiv.appendChild(featuredSetsList);
      });
  }

  const page = Math.ceil(Math.random() * 100);

  getFeaturedSets(page, PAGE_SIZE);
});
