//*********************************************************************************************** */
//new code of slider
var slider = document.getElementsByClassName("slider")[0];
var array = [
  "./img/slide6.jpg",

  "./img/slide1.jpg",
  "./img/slide5.jpg",
  "./img/slide7.jpg"
];

var currentIndex = 0;

function showSlide(index) {
  slider.style.backgroundImage = `url(${array[index]})`;
}
function nextSlide() {
  currentIndex = (currentIndex + 1) % array.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + array.length) % array.length;
  showSlide(currentIndex);
}
document.querySelector(".next").addEventListener("click", function() {
  clearInterval(slideInterval); // Clear the automatic slide transition interval
  nextSlide();
  slideInterval = setInterval(function() {
    nextSlide(); // Resume automatic slide transition
  }, 2000);
});

document.querySelector(".prev").addEventListener("click", function() {
  clearInterval(slideInterval); // Clear the automatic slide transition interval
  prevSlide();
  slideInterval = setInterval(function() {
    nextSlide(); // Resume automatic slide transition
  }, 2000);
});
function startSlider() {
  nextSlide(); // Show the initial slide
  slideInterval = setInterval(function() {
    nextSlide(); // Transition to the next slide
  }, 2000); // Change slide every 2 seconds
}

startSlider();

var catagories1 = document.querySelector(".catagories1");
var catagories2 = document.querySelector(".catagories2");
var catagories3 = document.querySelector(".catagories3");
var catagories4 = document.querySelector(".catagories4");
document.addEventListener("click", function(event) {
  const clickedElement = event.target;
  if (clickedElement.value == "catagories1") {
    catagories1.classList.remove("Display_none");

    catagories2.classList.add("Display_none");
    catagories3.classList.add("Display_none");
    catagories4.classList.add("Display_none");
  } else if (clickedElement.value == "catagories2") {
    catagories1.classList.add("Display_none");
    catagories2.classList.remove("Display_none");
    catagories3.classList.add("Display_none");
    catagories4.classList.add("Display_none");
  } else if (clickedElement.value == "catagories3") {
    catagories1.classList.add("Display_none");
    catagories3.classList.remove("Display_none");
    catagories2.classList.add("Display_none");
    catagories4.classList.add("Display_none");
  } else if (clickedElement.value == "catagories4") {
    catagories1.classList.add("Display_none");
    catagories4.classList.remove("Display_none");
    catagories2.classList.add("Display_none");
    catagories3.classList.add("Display_none");
  }
});

// handle of back-to-top
const backToTopButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", function() {
  if (window.pageYOffset > 200) {
    backToTopButton.style.display = "inline";
  } else {
    backToTopButton.style.display = "none";
  }
});
/******************************************validate form *********************************** */
function validateForm() {
  var name = document.forms["myForm"]["name"].value;
  var email = document.forms["myForm"]["email"].value;

  var error = false;

  // Password validation
  if (password.length < 8) {
    document.getElementById("passwordError").innerHTML =
      "Password must be at least 8 characters long";
    error = true;
  } else {
    document.getElementById("passwordError").innerHTML = "";
  }

  // Gender validation
  if (!gender) {
    document.getElementById("genderError").innerHTML =
      "Gender must be selected";
    error = true;
  } else {
    document.getElementById("genderError").innerHTML = "";
  }

  // Sports validation
  if (sports.length < 2) {
    document.getElementById("sportsError").innerHTML =
      "At least two sports must be selected";
    error = true;
  } else {
    document.getElementById("sportsError").innerHTML = "";
  }

  // Name validation
  if (!name) {
    document.getElementById("formError").innerHTML = "Name is required";
    error = true;
  } else {
    document.getElementById("formError").innerHTML = "";
  }

  // Form submission
  if (error) {
    return false;
  } else {
    var selectedSports = "";
    for (var i = 0; i < sports.length; i++) {
      selectedSports += sports[i].value + ", ";
    }
    selectedSports = selectedSports.slice(0, -2);
    var message =
      "Name: " +
      name +
      "<br>" +
      "Email: " +
      email +
      "<br>" +
      "Password: " +
      password +
      "<br>" +
      "Gender: " +
      gender +
      "<br>" +
      "Sports: " +
      selectedSports +
      "<br>" +
      "Country: " +
      country +
      "<br>";
    document.getElementById("formError").innerHTML = "";
    document.getElementById("myForm").reset();
    document.getElementById("registrationDetails").innerHTML = message;
    return false;
  }
}
// style of cart begin
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach(button => {
  button.addEventListener("click", function() {
    const productCard = button.closest(".card");
    const productPath = productCard
      .querySelector(".card-img-top")
      .getAttribute("src");
    const productName = productCard.querySelector(".h2").textContent;
    const productSalary = parseFloat(
      productCard.querySelector(".text-muted.text-right").textContent.slice(1)
    );

    const productData = {
      path: productPath,
      name: productName,
      salary: productSalary
    };

    // Retrieve the existing cart data from local storage
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];

    // Add the new product data to the cart data
    cartData.push(productData);

    // Save the updated cart data to local storage
    localStorage.setItem("cart", JSON.stringify(cartData));
  });
});
