document.addEventListener("DOMContentLoaded", function() {
  const cartItemsElement = document.querySelector(".cart-items");
  const totalItemElement = document.querySelector(".total_item-count");
  const summaryItemsElement = document.querySelector(".summary-items-count");
  const summaryPriceElement = document.querySelector(".summary-total-price");
  const totalPriceElement = document.querySelector(
    ".summary-total-price-with-shipping"
  );

  // Retrieve cart data from local storage
  const cartData = JSON.parse(localStorage.getItem("cart")) || [];
  let itemCount = cartData.length; // Calculate the total item count
  let totalSalary = cartData.reduce((total, item) => total + item.salary, 0); // Calculate the total salary

  // Function to update the cart
  function updateCart() {
    cartItemsElement.innerHTML = "";
    totalItemElement.textContent = itemCount;
    summaryItemsElement.textContent = itemCount;
    summaryPriceElement.textContent = totalSalary.toFixed(2);
    totalPriceElement.textContent = (totalSalary + 5).toFixed(2);

    cartData.forEach((item, index) => {
      const itemName = item.name ? item.name : "";
      const itemDescription = item.description ? item.description : "";
      const itemPrice = item.salary ? item.salary : 0;

      const itemHtml = `
            <div class="row main align-items-center">
              <div class="col-2"><img class="img-fluid" src="${
                item.path
              }"></div>
              <div class="col">
                <div class="row text-muted">${itemName}</div>
                <div class="row">${itemDescription}</div>
              </div>
              <div class="col">&euro; ${itemPrice.toFixed(
                2
              )} <span class="close" data-index="${index}">&#10005;</span></div>
            </div>
          `;

      cartItemsElement.insertAdjacentHTML("beforeend", itemHtml);
    });

    // Add event listeners to minus buttons
    const minusButtons = document.querySelectorAll(".minus-button");
    minusButtons.forEach(button => {
      button.addEventListener("click", function() {
        const index = button.getAttribute("data-index");
        const quantityElement = button.nextElementSibling;
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 1) {
          quantity--;
          quantityElement.textContent = quantity;
          itemCount--;
          totalPrice -= cartData[index].price;
          updateCart();

          // Update the cart data in local storage
          cartData[index].quantity = quantity; // Update the quantity for the corresponding product
          localStorage.setItem("cart", JSON.stringify(cartData));
        }
      });
    });

    // Add event listeners to plus buttons
    const plusButtons = document.querySelectorAll(".plus-button");
    plusButtons.forEach(button => {
      button.addEventListener("click", function() {
        const index = button.getAttribute("data-index");
        const quantityElement = button.previousElementSibling;
        let quantity = parseInt(quantityElement.textContent);
        quantity++;
        quantityElement.textContent = quantity;
        itemCount++;
        totalPrice += cartData[index].price;
        updateCart();

        // Update the cart data in local storage
        cartData[index].quantity = quantity; // Update the quantity for the corresponding product
        localStorage.setItem("cart", JSON.stringify(cartData));
      });
    });

    // Add event listeners to close icons
    const closeIcons = document.querySelectorAll(".close");
    closeIcons.forEach(icon => {
      icon.addEventListener("click", function() {
        const index = icon.getAttribute("data-index");
        const itemRow = icon.parentElement.parentElement;
        const quantityElement = itemRow.querySelector(".col:nth-child(3) a");
        const price = parseFloat(
          itemRow.querySelector(".col:last-child").textContent.split(" ")[1]
        );
        const quantity = parseInt(quantityElement.textContent);
        itemCount -= quantity;
        totalPrice -= price * quantity;
        itemRow.remove();
        updateCart();

        // Remove the product from the cart data in local storage
        cartData.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cartData));
      });
    });
  }

  // Initialize the cart on page load
  updateCart();
  const checkoutButton = document.querySelector(".CHECKOUT");
  checkoutButton.addEventListener("click", function() {
    // Clear the cart data in local storage
    localStorage.removeItem("cart");
  });
});
