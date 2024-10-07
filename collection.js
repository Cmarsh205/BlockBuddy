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

  const collectionListDiv = document.getElementById("collectionList");

  let collectionString = localStorage.getItem("collection");

  if (collectionString === null) {
    localStorage.setItem("collection", "[]");
    collectionString = "[]";
  }

  let collection = JSON.parse(collectionString);

  for (const set of collection) {
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

      const lsCollection = localStorage.getItem("collection") ?? "[]";
      const _collection = JSON.parse(lsCollection);

      const setIndex = _collection.findIndex((set) => set.set_num === setNum);

      if (setIndex === -1) {
        return;
      }

      _collection.splice(setIndex, 1);

      localStorage.setItem("collection", JSON.stringify(_collection));

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
    collectionListDiv.appendChild(setDiv);
  }
});
