document.addEventListener("DOMContentLoaded", () => {
  /**
   * Navigation
   */
  const homeBtn = document.getElementById("homeBtn");
  const collectionBtn = document.getElementById("collectionBtn");
  const wishlistBtn = document.getElementById("wishlistBtn");
  const logo = document.getElementById("bbLogo");

  homeBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
  collectionBtn.addEventListener("click", () => {
    window.location.href = "collection.html";
  });
  wishlistBtn.addEventListener("click", () => {
    window.location.href = "wishlist.html";
  });
  logo.addEventListener("click", () => {
    window.location.href = "index.html";
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

  /**
   * Featured sets
   */
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
          const btnDiv = document.createElement("div");

          collectionBtn.addEventListener("click", () => {
            let collectionValue = localStorage.getItem("collection");

            if (collectionValue === null) {
              localStorage.setItem("collection", "[]");
              collectionValue = "[]";
            }

            const collection = JSON.parse(collectionValue);

            collection.push(set);
            localStorage.setItem("collection", JSON.stringify(collection));

            showCustomAlert("Added to Collection!");
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

            showCustomAlert("Added to Wishlist!");
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
          btnDiv.classList.add("btnContainer");

          setDiv.appendChild(setHeader);
          setDiv.appendChild(setNumber);
          setDiv.appendChild(setPic);
          collectionBtn.appendChild(cIcon);
          wishlistBtn.appendChild(wIcon);
          setDiv.appendChild(collectionBtn);
          setDiv.appendChild(wishlistBtn);
          btnDiv.appendChild(collectionBtn);
          btnDiv.appendChild(wishlistBtn);
          setDiv.appendChild(btnDiv);
          featuredSetsList.appendChild(setDiv);
        }

        const featuredSetsDiv = document.getElementById("box-f");
        featuredSetsDiv.appendChild(featuredSetsList);
      });
  }

  const page = Math.ceil(Math.random() * 100);

  getFeaturedSets(page, PAGE_SIZE);

  /**
   * Search by clicking image
   */
  document.getElementById("imageContainer1").addEventListener("click", () => {
    const query = "star wars";
    window.location.href = `search.html?q=${query}`;
  });

  document.getElementById("imageContainer2").addEventListener("click", () => {
    const query = "ninjago";
    window.location.href = `search.html?q=${query}`;
  });

  document.getElementById("imageContainer3").addEventListener("click", () => {
    const query = "harry potter";
    window.location.href = `search.html?q=${query}`;
  });

  document.getElementById("imageContainer4").addEventListener("click", () => {
    const query = "technic";
    window.location.href = `search.html?q=${query}`;
  });

  document.getElementById("imageContainer5").addEventListener("click", () => {
    const query = "lord of the rings";
    window.location.href = `search.html?q=${query}`;
  });

  document.getElementById("imageContainer6").addEventListener("click", () => {
    const query = "marvel";
    window.location.href = `search.html?q=${query}`;
  });

  /**
   * What you might like
   */
  function getWhatYouMightLike() {
    let collectionString = localStorage.getItem("collection");

    if (collectionString === null) {
      localStorage.setItem("collection", "[]");
      collectionString = "[]";
    }

    let collection = JSON.parse(collectionString);

    let occurrences = {};

    for (const set of collection) {
      if (occurrences[set.theme_id]) {
        occurrences[set.theme_id] += 1;
      } else {
        occurrences[set.theme_id] = 1;
      }
    }
    let maxKey = null;
    let maxValue = -Infinity;

    for (const [key, value] of Object.entries(occurrences)) {
      if (value > maxValue) {
        maxValue = value;
        maxKey = key;
      }
    }
    const apiKey = "ebd77297ed794bb129b23c3cd006661e";
    const baseUrl = "https://rebrickable.com";

    const headers = new Headers();
    headers.set(`Authorization`, `key ${apiKey}`);

    fetch(`${baseUrl}/api/v3/lego/sets?theme_id=${maxKey}`, {
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        const uniqueIndices = new Set();
        const sets = [];
        const numSets = 6;

        while (uniqueIndices.size < numSets) {
          const idx = Math.round(Math.random() * data.results.length);

          if (!uniqueIndices.has(idx)) {
            sets.push(data.results[idx]);
            uniqueIndices.add(idx);
          }
        }

        const wymlSetsList = document.createElement("div");
        wymlSetsList.classList.add("wymlSetsList");

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
          const btnDiv = document.createElement("div");

          collectionBtn.addEventListener("click", () => {
            let collectionValue = localStorage.getItem("collection");

            if (collectionValue === null) {
              localStorage.setItem("collection", "[]");
              collectionValue = "[]";
            }

            const collection = JSON.parse(collectionValue);

            collection.push(set);
            localStorage.setItem("collection", JSON.stringify(collection));

            showCustomAlert("Added to Collection!");
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

            showCustomAlert("Added to Wishlist!");
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
          btnDiv.classList.add("btnContainer");

          setDiv.appendChild(setHeader);
          setDiv.appendChild(setNumber);
          setDiv.appendChild(setPic);
          collectionBtn.appendChild(cIcon);
          wishlistBtn.appendChild(wIcon);
          setDiv.appendChild(collectionBtn);
          setDiv.appendChild(wishlistBtn);
          btnDiv.appendChild(collectionBtn);
          btnDiv.appendChild(wishlistBtn);
          setDiv.appendChild(btnDiv);
          wymlSetsList.appendChild(setDiv);
        }

        const wymlSetsDiv = document.getElementById("box-w");
        wymlSetsDiv.appendChild(wymlSetsList);
      });
  }
  getWhatYouMightLike();

  /**
   * Button alert
   */
  function showCustomAlert(message) {
    const alertBox = document.getElementById("customAlert");
    const alertMessage = document.getElementById("alertMessage");
    const closeAlert = document.getElementById("closeAlert");

    alertMessage.innerText = message;
    alertBox.classList.remove("hidden");

    closeAlert.addEventListener("click", () => {
      alertBox.classList.add("hidden");
    });

    setTimeout(() => {
      alertBox.classList.add("hidden");
    }, 3000);
  }
});
