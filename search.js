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
   * Search results
   */
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
      `${baseUrl}/api/v3/lego/sets?page=${1}&page_size=${70}&search=${query}`,
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
    const loaderSVG = document.getElementById("loader");
    if (loaderSVG) loaderSVG.remove();

    results.forEach((set) => {
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

      const wishlistValue = localStorage.getItem("wishlist");
      const wishlist = wishlistValue ? JSON.parse(wishlistValue) : [];

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

        const exists = wishlist.some((item) => item.set_num === set.set_num);

        if (!exists) {
          wishlist.push(set);
          localStorage.setItem("wishlist", JSON.stringify(wishlist));

          wIcon.textContent = "favorite"; 
          wIcon.style.color = "red";

          showCustomAlert("Added to Wishlist!");
        } else {
          wishlist = wishlist.filter((item) => item.set_num !== set.set_num);
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
      resultsListDiv.appendChild(setDiv);
    });
    document.querySelectorAll(".tooltip-trigger").forEach((element) => {
      addTooltipListeners(element);
    });
  }

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
