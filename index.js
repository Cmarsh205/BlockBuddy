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
   * Tooltips
   */
  const PAGE_SIZE = 50;

  function addTooltipListeners(element) {
    element.addEventListener("mouseenter", showTooltip);
    element.addEventListener("mouseleave", hideTooltip);
  }

  function showTooltip(event) {
    const trigger = event.currentTarget;
    const tooltipText = trigger.getAttribute("data-tooltip");

    if (!tooltipText) return;

    const tooltip = document.createElement("div");
    tooltip.className = "aria-tooltip";
    tooltip.setAttribute("role", "tooltip");
    tooltip.setAttribute("id", `tooltip-${Date.now()}`);
    tooltip.textContent = tooltipText;

    document.body.appendChild(tooltip);
    trigger.setAttribute("aria-describedby", tooltip.id);

    const rect = trigger.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
  }

  function hideTooltip(event) {
    const trigger = event.currentTarget;
    const tooltipId = trigger.getAttribute("aria-describedby");
    if (tooltipId) {
      const tooltip = document.getElementById(tooltipId);
      if (tooltip) {
        tooltip.remove();
      }
      trigger.removeAttribute("aria-describedby");
    }
  }
  /**
   * Featured Sets
   */
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
        const numSets = 5;

        while (uniqueIndices.size < numSets) {
          const idx = Math.floor(Math.random() * PAGE_SIZE);

          if (!uniqueIndices.has(idx)) {
            sets.push(data.results[idx]);
            uniqueIndices.add(idx);
          }
        }

        const featuredSetsList = document.createElement("div");
        featuredSetsList.classList.add("featuredSetsList");
        const loaderSVG = document.getElementById("loader");
        if (loaderSVG) loaderSVG.remove();

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

          let wishlistValue = localStorage.getItem("wishlist");
          let wishlist = wishlistValue ? JSON.parse(wishlistValue) : [];
          const isInWishlist = wishlist.some(
            (item) => item.set_num === set.set_num
          );

          wIcon.textContent = isInWishlist ? "favorite" : "favorite_border";
          wIcon.style.color = isInWishlist ? "red" : "black";
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
            let wishlist = wishlistValue ? JSON.parse(wishlistValue) : [];

            const exists = wishlist.some(
              (item) => item.set_num === set.set_num
            );

            if (!exists) {
              wishlist.push(set);
              localStorage.setItem("wishlist", JSON.stringify(wishlist));

              wIcon.textContent = "favorite";
              wIcon.style.color = "red";

              showCustomAlert("Added to Wishlist!");
            } else {
              wishlist = wishlist.filter(
                (item) => item.set_num !== set.set_num
              );
              localStorage.setItem("wishlist", JSON.stringify(wishlist));

              wIcon.textContent = "favorite_border";
              wIcon.style.color = "black";

              showCustomAlert("Removed from Wishlist!");
            }
          });

          setHeader.innerText = set.name;
          setPic.src =
            set.set_img_url ||
            "Media/blockbuddy-high-resolution-logo-transparent (2).png";
          setNumber.innerText = set.set_num;
          setHeader.setAttribute("data-tooltip", set.name);
          setNumber.setAttribute("data-tooltip", set.set_num);

          setDiv.classList.add("setContainer");
          setHeader.classList.add("setName", "tooltip-trigger");
          setPic.classList.add("setImg");
          setNumber.classList.add("setNum", "tooltip-trigger");
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

        document.querySelectorAll(".tooltip-trigger").forEach((element) => {
          addTooltipListeners(element);
        });
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
  const wymlSetsDiv = document.getElementById("box-w");

  if (!wymlSetsDiv.querySelector(".wymlSetsList")) {
    const placeHolder = document.createElement("p");
    placeHolder.id = "placeHolderMessage";
    placeHolder.classList.add("placeHolderMessage");
    placeHolder.innerText =
      "Nothing here yet! Add some sets to see recommendations.";
    wymlSetsDiv.appendChild(placeHolder);
  }

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
        const numSets = 5;

        const loaderSVG = document.getElementById("loader1");
        if (loaderSVG) {
          loaderSVG.remove();
        }

        while (uniqueIndices.size < numSets) {
          const idx = Math.floor(Math.random() * data.results.length);

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

          let wishlistValue = localStorage.getItem("wishlist");
          let wishlist = wishlistValue ? JSON.parse(wishlistValue) : [];
          const isInWishlist = wishlist.some(
            (item) => item.set_num === set.set_num
          );

          wIcon.textContent = isInWishlist ? "favorite" : "favorite_border";
          wIcon.style.color = isInWishlist ? "red" : "black";
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
            let wishlist = wishlistValue ? JSON.parse(wishlistValue) : [];

            const exists = wishlist.some(
              (item) => item.set_num === set.set_num
            );

            if (!exists) {
              wishlist.push(set);
              localStorage.setItem("wishlist", JSON.stringify(wishlist));

              wIcon.textContent = "favorite";
              wIcon.style.color = "red";

              showCustomAlert("Added to Wishlist!");
            } else {
              wishlist = wishlist.filter(
                (item) => item.set_num !== set.set_num
              );
              localStorage.setItem("wishlist", JSON.stringify(wishlist));

              wIcon.textContent = "favorite_border";
              wIcon.style.color = "black";

              showCustomAlert("Removed from Wishlist!");
            }
          });

          setHeader.innerText = set.name;
          setPic.src =
            set.set_img_url ||
            "Media/blockbuddy-high-resolution-logo-transparent (2).png";
          setNumber.innerText = set.set_num;
          setHeader.setAttribute("data-tooltip", set.name);
          setNumber.setAttribute("data-tooltip", set.set_num);

          setDiv.classList.add("setContainer");
          setHeader.classList.add("setName", "tooltip-trigger");
          setPic.classList.add("setImg");
          setNumber.classList.add("setNum", "tooltip-trigger");
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

        if (sets.length > 0) {
          const placeHolder = document.getElementById("placeHolderMessage");
          if (placeHolder) {
            placeHolder.remove();
          }

          document.querySelectorAll(".tooltip-trigger").forEach((element) => {
            addTooltipListeners(element);
          });
        }
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

  /**
   * Mobile Menu
   */

  var menuButton = document.getElementById("menu-button");
  var menuItems = document.getElementById("menu-items");

  menuButton.addEventListener("click", function () {
    menuItems.classList.toggle("active");
  });

  document.addEventListener("click", function (event) {
    if (window.innerWidth <= 768) {
      if (
        !menuButton.contains(event.target) &&
        !menuItems.contains(event.target)
      ) {
        menuItems.classList.remove("active");
      }
    }
  });
});
