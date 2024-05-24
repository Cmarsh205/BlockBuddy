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

        const featuredSetsList = document.createElement("div");

        for (let i = 0; i < sets.length; i++) {
          const set = sets[i];
          const setDiv = document.createElement("div");
          const setHeader = document.createElement("h3");
          const setPic = document.createElement("img");
          const setNumber = document.createElement("p");
          const collectionBtn = document.createElement("button");
          const wishlistBtn = document.createElement("button");

          collectionBtn.addEventListener("click", () => {
            let collectionValue = localStorage.getItem("collection");
            console.log("collection", collectionValue);

            if (collectionValue === null) {
              localStorage.setItem("collection", "[]");
              collectionValue = "[]";
            }

            const collection = JSON.parse(collectionValue);

            collection.push(set.set_num);
            localStorage.setItem("collection", JSON.stringify(collection));

            console.log("post collection", collection);
          });

          wishlistBtn.addEventListener("click", () => {
            let wishlistValue = localStorage.getItem("wishlist");
            console.log("wishlist", wishlistValue);

            if (wishlistValue === null) {
              localStorage.setItem("wishlist", "[]");
              wishlistValue = "[]";
            }

            const wishlist = JSON.parse(wishlistValue);

            wishlist.push(set.set_num);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));

            console.log("post wishlist", wishlist);
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

          setDiv.appendChild(setHeader);
          setDiv.appendChild(setPic);
          setDiv.appendChild(setNumber);
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
