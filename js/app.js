let inputBox = document.getElementsByClassName('form-control')[0];
let productContainer = document.getElementsByClassName('productContainer')[0];

let fetchData = async ()=>{
    let respone = await fetch("https://fakestoreapi.com/products");
    let product = await respone.json();
    buildUi(product);
}
let filteredProduct = [];
fetchData();

let buildUi = (data) => {
  let product = data;

  inputBox.addEventListener('keyup', (event) =>{
    if ( event.key == "ArrowDown" || event.key == "ArrowUp" || event.key == "Enter") {
        navigateAndShowProduct(event.key);
    }
    productContainer.innerHTML = "";

    if (event.target.value.length == 0) {
        return;
    }
    let searchText = event.target.value.toLowerCase();
    filteredProduct = product.filter( element =>{
        return element.title.toLowerCase().includes(searchText);
    });
    filteredProduct.map( element =>{
        productContainer.innerHTML += `
        <div class="product" id="${element.id}">
          <div class="product-name">${element.title}</div>
          <img src="${element.image}" class="product-img" />
        </div>
    `;
    });
  });
};
let indexToSelect = -1;
const navigateAndShowProduct = (eventKey) =>{
    
    //Error Code...
    if ( eventKey == "ArrowDown") {
        indexToSelect += 1;
        let productIdToShow = document.getElementById(
          filteredProduct[indexToSelect].id
        );
        // console.log(productIdToShow);
        productIdToShow.style.backgroundColor = "#555048";
        productIdToShow.classList.add("selected");
        console.log(productIdToShow);

   } else if ( eventKey == "ArrowUp"){
    console.log("Arrow Up");
   } else {
    console.log("Enter");
   }
}

