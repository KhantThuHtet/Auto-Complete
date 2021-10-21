let inputBox = document.getElementById("inputBox");
let productContainer = document.querySelector(".productContainer");

let fetchData = async () => {
  let response = await fetch("https://fakestoreapi.com/products");
  let products = await response.json();
  buildUi(products);
};

let filteredProduct = [];
fetchData();



const buildUi = (products) => {
  inputBox.addEventListener("keyup", (event) => {
    if (
      event.key == "ArrowUp" ||
      event.key == "ArrowDown" ||
      event.key == "Enter"
    ) {
      navigateAndSelectProduct(event.key);
      return;
    }

    productContainer.innerHTML = "";
    if (event.target.value == 0) {
      return;
    }
    let searchText = event.target.value.toLowerCase();
    filteredProduct = products.filter((el) => {
      let productTitle = el.title.toLowerCase();
      return productTitle.includes(searchText);
    });
    filteredProduct.map((element) => {
      productContainer.innerHTML += `
      <div class="product" id="${element.id}">
          <div class="product-name">${element.title}</div>
          <img src="${element.image}" class="product-img">
      </div>`;
    });
  });
};

let indexToSelect = -1;

const navigateAndSelectProduct = (key) => {
  if (key == "ArrowDown") {
    

    indexToSelect += 1;
    let productIdToShow = document.getElementById(
      filteredProduct[indexToSelect].id.toString()
    );
    productIdToShow.style.backgroundColor = "#555048";
    productIdToShow.classList.add("selected");
    

    console.log(productIdToShow);
  } else if (key == "ArrowUp") {
    console.log("Arrow Up");
  } else {
    console.log("Enter");
  }
};
