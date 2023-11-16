/** @format */

async function addProduct() {
  const name = $("#inp-name").val();
  const brand = $("#inp-brand").val();
  const price = $("#inp-price").val();
  const image = $("#inp-image")[0].files[0];

  const url = "http://localhost:8080/addProduct";

  const formData = new FormData();
  formData.append("name", name);
  formData.append("brand", brand);
  formData.append("price", price);
  formData.append("image", image);

  const res = await fetch(url, { method: "POST", body: formData })
    .then((response) => response.text()) // Extract the response text
    .then((data) => {
      console.log("Response:", data); // Print the response data
      $("#reg-response").text("Fill all details of the product.");
      // Add a timeout to clear the message after 5 seconds (adjust as needed)
      setTimeout(function () {
        $("#reg-response").text(""); // Clear the message
      }, 5000); // 5000 milliseconds (5 seconds)
    })
    .catch((error) => {
      console.error("Error:", error);
      // Add a timeout to clear the message after 5 seconds (adjust as needed)
      setTimeout(function () {
        $("#reg-response").text(""); // Clear the message
      }, 5000); // 5000 milliseconds (5 seconds)
    });
}

async function getAllProducts() {
  const url = "http://localhost:8080/getAllProducts";
  const result = await fetch(url, { method: "GET" });
  const globalData = await result.json();
  let num = 1;
  let data = "";
  globalData.forEach((element) => {
    data +=
      "<tr>" +
      "<td>" +
      num +
      "</td>" +
      "<td>" +
      element.name +
      "</td>" +
      "<td>" +
      element.brand +
      "</td>" +
      "<td>" +
      element.id +
      "</td>" +
      "<td>" +
      element.price +
      "</td>" +
      "<td>" +
      '<img class="cl-img" src="data:image/jpeg;base64,' +
      element.image +
      '">' +
      "</td>" +
      "<td>" +
      '<button class="btn btn-danger delete-btn" data-id="' +
      element.id +
      '"> Delete </button>' +
      "</td>" +
      "<td>" +
      '<button class="btn btn-warning update-btn" data-id="' +
      element.id +
      '"> Update </button>' +
      "</td>" +
      "</tr>";
    num++;
  });
  $("#td-products").html(data);

  // Add event listeners for the delete and update buttons
  $(".delete-btn").click(function () {
    const productId = $(this).data("id");
    if (confirm("Are you sure you want to delete this product?")) {
      $.ajax({
        url: "http://localhost:8080/deleteProduct",
        method: "DELETE",
        data: { id: productId },
        success: function (response) {
          if (response.success) {
            $(this).closest("tr").remove();
          } else {
            alert("Your product has been deleted.");
          }
        },
        error: function () {
          alert("An error occurred while deleting the product.");
        },
      });
    }
  });

  $(".update-btn").click(function () {
    const productId = $(this).data("id");
    window.location.href = `Update products.html?productId=${productId}`;
  });
}

// Call the function to populate the product columns with data.
getAllProducts();

async function viewAllProducts() {
  const url = "http://localhost:8080/getAllProducts";
  const result = await fetch(url, { method: "GET" });
  const globalData = await result.json();

  globalData.forEach((element) => {
    const productColumn = document.createElement("div");
    productColumn.classList.add("col-lg-3"); // Adjust the column size as needed

    const productInfo = document.createElement("div");
    productInfo.classList.add("card");

    const img = document.createElement("img");
    img.classList.add("cl-img");
    img.src = "data:image/jpeg;base64," + element.image; // Set the image source

    const productDetails = document.createElement("div");
    productDetails.classList.add("card-body");

    const productName = document.createElement("h5");
    productName.classList.add("card-title");
    productName.textContent = element.name;

    const productBrand = document.createElement("p");
    productBrand.classList.add("card-text");
    productBrand.textContent = element.brand;

    const productPrice = document.createElement("p");
    productPrice.classList.add("card-text");
    productPrice.textContent = `Price: ₹ ${element.price}`;

    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add("btn", "btn-primary");
    addToCartButton.textContent = "Add to Cart";

    // Add an event listener to the button to handle adding the item to the cart
    addToCartButton.addEventListener("click", () => {
      // Create an object to represent the item being added to the cart
      const cartItem = {
        name: element.name,
        brand: element.brand,
        price: element.price,
        image: element.image, // You can include the image if needed
      };

      // Add the item to the cart (you may have a cart array to store items)
      addToCart(cartItem);

      // Optionally, you can show a confirmation message
      alert(`Added "${element.name}" to the cart.`);
    });

    productDetails.appendChild(productName);
    productDetails.appendChild(productBrand);
    productDetails.appendChild(productPrice);
    productDetails.appendChild(addToCartButton);

    productInfo.appendChild(img);
    productInfo.appendChild(productDetails);

    productColumn.appendChild(productInfo);

    // Append the product column to the container with id "product-columns"
    document.getElementById("product-columns").appendChild(productColumn);
  });
}

// Call the function to populate the product columns with data.
viewAllProducts();

async function searchByNameOrBrand() {
  let data = $("#search").val();
  let url = "http://localhost:8080/getByNameOrBrand?data=" + data;

  try {
    const result = await fetch(url, { method: "GET" });
    const globalData = await result.json();

    const productColumnsDiv = document.getElementById("product-columns");
    productColumnsDiv.innerHTML = ""; // Clear previous results

    if (globalData.length === 0) {0
      productColumnsDiv.innerHTML = "No results found.";
    } else {
      globalData.forEach((element) => {
        const productColumn = document.createElement("div");
        productColumn.classList.add("col-lg-3"); // Adjust the column size as needed

        const productInfo = document.createElement("div");
        productInfo.classList.add("card");

        const img = document.createElement("img");
        img.classList.add("cl-img");
        img.src = "data:image/jpeg;base64," + element.image; // Set the image source

        const productDetails = document.createElement("div");
        productDetails.classList.add("card-body");

        const productName = document.createElement("h5");
        productName.classList.add("card-title");
        productName.textContent = element.name;

        const productBrand = document.createElement("p");
        productBrand.classList.add("card-text");
        productBrand.textContent = element.brand;

        const productPrice = document.createElement("p");
        productPrice.classList.add("card-text");
        productPrice.textContent = `Price: ₹ ${element.price}`;

        const addToCartButton = document.createElement("button");
        addToCartButton.classList.add("btn", "btn-primary");
        addToCartButton.textContent = "Add to Cart";

        addToCartButton.addEventListener("click", () => {
          const cartItem = {
            name: element.name,
            brand: element.brand,
            price: element.price,
            image: element.image,
          };
          addToCart(cartItem);
          alert(`Added "${element.name}" to the cart.`);
        });

        productDetails.appendChild(productName);
        productDetails.appendChild(productBrand);
        productDetails.appendChild(productPrice);
        productDetails.appendChild(addToCartButton);

        productInfo.appendChild(img);
        productInfo.appendChild(productDetails);

        productColumn.appendChild(productInfo);

        productColumnsDiv.appendChild(productColumn);
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function updateProduct() {
  const productId = document.getElementById("upd-id").value;
  const name = document.getElementById("upd-name").value;
  const brand = document.getElementById("upd-brand").value;
  const price = document.getElementById("upd-price").value;
  const imageInput = document.getElementById("upd-image");

  // Check if any of the input fields are empty
  if (!productId || !name || !brand || !price) {
    const regResponseElement = document.getElementById("reg-response");
    regResponseElement.textContent = "Please fill in all details.";
    return; // Exit the function early if any input is empty
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("brand", brand);
  formData.append("price", price);

  if (imageInput.files.length > 0) {
    formData.append("image", imageInput.files[0]);
  }

  const url = `http://localhost:8080/updateProduct/${productId}`; // Replace with your actual API endpoint

  try {
    const response = await fetch(url, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const regResponseElement = document.getElementById("reg-response");
    regResponseElement.textContent = "Id No: " + productId + " Updated";
  } catch (error) {
    const regResponseElement = document.getElementById("reg-response");
    regResponseElement.textContent = "Please add image of Id no.: " + productId;
  }
}

const cartIcon = document.getElementById("cart-icon");
const cartCount = document.querySelector(".cart-count");
const cartItemsList = document.getElementById("cart-items-list");
const placeOrderButton = document.getElementById("place-order-button");
const closeCartButton = document.getElementById("close-cart-sidebar");

const cart = []; // Initialize an empty cart array to store items

// Function to update the cart count in the cart icon
function updateCartCount() {
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalQuantity;
}

let totalPrice = 0; // Initialize the total price

// Function to update the total amount
function updateTotalAmount() {
  const totalAmountElement = document.getElementById("total-amount");
  totalAmountElement.textContent = "Total Amount: ₹ " + totalPrice.toFixed(2); // Format the total price with two decimal places
}

// Function to add an item to the cart and update the sidebar
function addToCart(item) {
  // Check if the item is already in the cart
  const existingItemIndex = cart.findIndex(
    (cartItem) => cartItem.brand === item.brand
  );

  if (existingItemIndex !== -1) {
    // Item is already in the cart, increment its quantity
    cart[existingItemIndex].quantity++;
  } else {
    // Item is not in the cart, add it with a quantity of 1
    cart.push({ ...item, quantity: 1 });
  }

  // Update the total price by adding the price of the added item
  totalPrice += item.price;

  updateCartCount(); // Update the cart count
  updateCartDisplay(); // Update the cart display
  updateTotalAmount(); // Update the total amount
}

// Function to update the cart display
function updateCartDisplay() {
  // Clear the cart content
  cartItemsList.innerHTML = "";

  // Iterate over the items in the cart and create HTML elements for each
  cart.forEach((item, index) => {
    const listItem = document.createElement("li");

    // Create a container for the item details
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("cart-item");

    // Create elements for name, brand, and price
    const itemName = document.createElement("div");
    itemName.textContent = "Name: " + item.name;
    itemName.classList.add("cart-item-name"); // Add CSS class

    const itemBrand = document.createElement("div");
    itemBrand.textContent = "Brand: " + item.brand;
    itemBrand.classList.add("cart-item-brand"); // Add CSS class

    const itemPrice = document.createElement("div");
    itemPrice.textContent = "Price: ₹ " + item.price;
    itemPrice.classList.add("cart-item-price"); // Add CSS class

    const itemQuantity = document.createElement("div");
    itemQuantity.textContent = "Quantity: ";
    itemQuantity.classList.add("item-quantity"); // Add a class for styling

    // Create plus and minus buttons for quantity
    const minusButton = document.createElement("button");
    minusButton.textContent = "-";
    minusButton.classList.add("quantity-button"); // Add a class for styling
    minusButton.addEventListener("click", () => decreaseQuantity(index));

    const quantityDisplay = document.createElement("span");
    quantityDisplay.textContent = item.quantity; // Show item quantity

    const plusButton = document.createElement("button");
    plusButton.textContent = "+";
    plusButton.addEventListener("click", () => increaseQuantity(index));
    plusButton.classList.add("quantity-button"); // Add a class for styling

    // Create a remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeItem(index));
    removeButton.classList.add("remove-button"); // Add a class for styling

    // Append all elements to the item container
    itemContainer.appendChild(itemName);
    itemContainer.appendChild(itemBrand);
    itemContainer.appendChild(itemPrice);

    itemQuantity.appendChild(minusButton);
    itemQuantity.appendChild(quantityDisplay);
    itemQuantity.appendChild(plusButton);

    itemContainer.appendChild(itemQuantity);
    itemContainer.appendChild(removeButton);

    // Append the item container to the list item
    listItem.appendChild(itemContainer);

    // Append the list item to the cart list
    cartItemsList.appendChild(listItem);
  });
}

// Add a click event listener to each "Add to Cart" button
const addToCartButtons = document.querySelectorAll(".add-cart");
addToCartButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    // Get the item details (customize this based on your data structure)
    const item = {
      name: document.querySelectorAll(".food-title")[index].textContent,
      brand: document.querySelectorAll(".food-brand")[index].textContent,
      price: document.querySelectorAll(".food-price")[index].textContent,
    };
    addToCart(item);
  });
});

// Add a click event listener to the cart icon to display the cart sidebar
cartIcon.addEventListener("click", () => {
  // Display the cart sidebar
  const cartSidebar = document.getElementById("cart-sidebar");
  cartSidebar.style.right = "0";
});

// Add a click event listener to the close button of the cart sidebar
closeCartButton.addEventListener("click", () => {
  // Close the cart sidebar
  const cartSidebar = document.getElementById("cart-sidebar");
  cartSidebar.style.right = "-300px";
});

// Initialize the cart count
updateCartCount();

// Initialize the cart display
updateCartDisplay();

// Function to remove an item from the cart
function removeItem(index) {
  cart.splice(index, 1); // Remove the item from the cart
  updateCartCount(); // Update the cart count
  updateCartDisplay(); // Update the cart display
}

function increaseQuantity(index) {
  cart[index].quantity++; // Increase the quantity

  // Update the total price when quantity increases
  totalPrice += cart[index].price;

  updateCartDisplay(); // Update the cart display
  updateCartCount(); // Update the cart count
  updateTotalAmount(); // Update the total amount
}

// Function to decrease the quantity of an item
function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--; // Decrease the quantity for the item at the given index

    // Update the total price when quantity decreases
    totalPrice -= cart[index].price;

    updateCartDisplay(); // Update the cart display
    updateCartCount(); // Update the cart count
    updateTotalAmount(); // Update the total amount
  } else {
    // If quantity is 1, remove the item from the cart
    removeItem(index);
  }
}
updateTotalAmount();
