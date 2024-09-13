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

  const collection = JSON.parse(collectionString);

  for (const set of collection) {
    const setDiv = document.createElement("div");
    const setHeader = document.createElement("h3");
    const setPic = document.createElement("img");
    const setNumber = document.createElement("p");
    const deleteBtn = document.createElement("button");

    deleteBtn.addEventListener("click", () => {
    });

    setHeader.innerText = set.name;
    setPic.src = set.set_img_url;
    setNumber.innerText = set.set_num;
    deleteBtn.innerText = "Delete";

    setDiv.classList.add("setContainer");
    setHeader.classList.add("setName");
    setPic.classList.add("setImg");
    setNumber.classList.add("setNum");
    deleteBtn.classList.add("deleteBtn");

    setDiv.appendChild(setHeader);
    setDiv.appendChild(setNumber);
    setDiv.appendChild(setPic);
    setDiv.appendChild(deleteBtn);
    collectionListDiv.appendChild(setDiv);
  }
});
