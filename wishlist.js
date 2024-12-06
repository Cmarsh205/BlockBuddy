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
   * Wishlist list
   */  
  const wishlistListDiv = document.getElementById("wishlistList");

  let wishlistString = localStorage.getItem("wishlist");

  if (wishlistString === null) {
    localStorage.setItem("wishlist", "[]");
    wishlistString = "[]";
  }

  const wishlist = JSON.parse(wishlistString);

  for (const set of wishlist) {
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
    });

    setHeader.innerText = set.name;
    setPic.src = set.set_img_url;
    setNumber.innerText = set.set_num;

    setDiv.classList.add("setContainer");
    setDiv.id = `set-${set.set_num}`;
    setHeader.classList.add("setName");
    setPic.classList.add("setImg");
    setNumber.classList.add("setNum");
    deleteBtn.classList.add("deleteBtn");

    setDiv.appendChild(setHeader);
    setDiv.appendChild(setNumber);
    setDiv.appendChild(setPic);
    deleteBtn.appendChild(icon);
    setDiv.appendChild(deleteBtn);
    wishlistListDiv.appendChild(setDiv);
  }
});
