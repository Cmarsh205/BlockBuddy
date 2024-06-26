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

  const collectionString = localStorage.getItem("collection");
  const collectionList = JSON.parse(collectionString);

  if (collectionString === null) {
    localStorage.setItem("collection", "[]");
    collectionString = "[]";
  }

  for (let i = 0; i < sets.length; i++) {
    const setDiv = document.createElement("div");
    const setHeader = document.createElement("h3");
    const setPic = document.createElement("img");
    const setNumber = document.createElement("p");

    setHeader.innerText = set.name;
    setPic.src = set.set_img_url;
    setNumber.innerText = set.set_num;

    setDiv.classList.add("setContainer");
    setHeader.classList.add("setName");
    setPic.classList.add("setImg");
    setNumber.classList.add("setNum");

    setDiv.appendChild(setHeader);
    setDiv.appendChild(setNumber);
    setDiv.appendChild(setPic);
    collectionList.appendChild(setDiv);
  }
});
