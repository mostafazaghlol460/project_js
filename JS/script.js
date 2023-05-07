// js for slider
var slideIndex = 1;
var slides = document.getElementsByClassName("slide");

showSlide(slideIndex);

function nextSlide() {
  clearTimeout(timer);
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  showSlide(slideIndex);
}

function prevSlide() {
  clearTimeout(timer);
  slideIndex--;
  if (slideIndex < 1) {
    slideIndex = slides.length;
  }
  showSlide(slideIndex);
}

function showSlide(n) {
  let i;
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  slides[slideIndex - 1].style.display = "block";

  timer = setTimeout(function() {
    nextSlide();
  }, 3000);
}

document.querySelector(".next").addEventListener("click", nextSlide);
document.querySelector(".prev").addEventListener("click", prevSlide);
// this function is called when i click to the button
// function choiceCatagory() {
//   // var button = document.querySelector(".button_click");

//   if (button == "catagories1") {
//     catagories1.classList.remove("Display_none");

//     catagories2.classList.add("Display_none");
//     catagories3.classList.add("Display_none");
//     catagories4.classList.add("Display_none");
//   } else if (button == "catagories2") {
//     catagories1.classList.add("Display_none");
//     catagories2.classList.remove("Display_none");
//     catagories3.classList.add("Display_none");
//     catagories4.classList.add("Display_none");
//   }
// }
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
