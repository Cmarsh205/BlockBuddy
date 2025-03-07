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
   * Wishlist list
   */
  const wishlistListDiv = document.getElementById("wishlistList");
  const loaderSVG = document.getElementById("loader");
  if (loaderSVG) loaderSVG.remove();

  let wishlistString = localStorage.getItem("wishlist");

  if (wishlistString === null) {
    localStorage.setItem("wishlist", "[]");
    wishlistString = "[]";
  }

  const wishlist = JSON.parse(wishlistString);

  if (wishlist.length === 0) {
    const placeholder = document.createElement("p");
    placeholder.id = "emptyMessage";
    placeholder.innerText =
      "Your wishlist is currently empty. Start adding some sets!";
    placeholder.classList.add("placeHolderMessage");
    wishlistListDiv.appendChild(placeholder);
  }

  for (const set of wishlist) {
    const emptyMessage = document.getElementById("emptyMessage");
    if (emptyMessage) {
      emptyMessage.remove();
      emptyMessage = null;
    }

    const setDiv = document.createElement("div");
    const setHeader = document.createElement("h3");
    const setPic = document.createElement("img");
    const setNumber = document.createElement("p");
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0";

    document.head.appendChild(link);

    const deleteBtn = document.createElement("button");
    const icon = document.createElement("span");
    icon.classList.add("material-symbols-outlined");
    icon.textContent = "delete";

    deleteBtn.addEventListener("click", () => {
      const setNum = set.set_num;

      const lsWishlist = localStorage.getItem("wishlist") ?? "[]";
      const _wishlist = JSON.parse(lsWishlist);

      const setIndex = _wishlist.findIndex((set) => set.set_num === setNum);

      if (setIndex === -1) {
        return;
      }

      _wishlist.splice(setIndex, 1);

      localStorage.setItem("wishlist", JSON.stringify(_wishlist));

      const setDiv = document.getElementById(`set-${setNum}`);

      if (!setDiv) {
        return;
      }

      setDiv.remove();

      if (_wishlist.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.id = "emptyMessage";
        emptyMessage.innerText =
          "Your wishlist is currently empty. Start adding some sets!";
        emptyMessage.classList.add("placeHolderMessage");
        wishlistListDiv.appendChild(emptyMessage);
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
    setDiv.id = `set-${set.set_num}`;
    setHeader.classList.add("setName", "tooltip-trigger");
    setPic.classList.add("setImg");
    setNumber.classList.add("setNum", "tooltip-trigger");
    deleteBtn.classList.add("deleteBtn");

    setDiv.appendChild(setHeader);
    setDiv.appendChild(setNumber);
    setDiv.appendChild(setPic);
    deleteBtn.appendChild(icon);
    setDiv.appendChild(deleteBtn);
    wishlistListDiv.appendChild(setDiv);
  }
  document.querySelectorAll(".tooltip-trigger").forEach((element) => {
    addTooltipListeners(element);
  });
});
