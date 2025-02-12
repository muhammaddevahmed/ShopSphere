const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
 // Categories Toggle
 document.getElementById('categories-toggle').addEventListener('click', function() {
    document.getElementById('categories-menu').classList.toggle('hidden');
});

// Language Dropdown Toggle and Selection
document.getElementById('language-toggle').addEventListener('click', function() {
    document.getElementById('language-menu').classList.toggle('hidden');
});

document.querySelectorAll('#language-menu a').forEach(item => {
    item.addEventListener('click', function() {
        document.getElementById('language-text').textContent = item.getAttribute('data-lang');
        document.getElementById('language-menu').classList.add('hidden');
    });
});

// Currency Dropdown Toggle and Selection
document.getElementById('currency-toggle').addEventListener('click', function() {
    document.getElementById('currency-menu').classList.toggle('hidden');
});

document.querySelectorAll('#currency-menu a').forEach(item => {
    item.addEventListener('click', function() {
        document.getElementById('currency-text').textContent = item.getAttribute('data-currency');
        document.getElementById('currency-icon').textContent = item.getAttribute('data-icon');
        document.getElementById('currency-menu').classList.add('hidden');
    });
});

// Ship to Dropdown Toggle and Selection
document.getElementById('shipto-toggle').addEventListener('click', function() {
    document.getElementById('shipto-menu').classList.toggle('hidden');
});

document.querySelectorAll('#shipto-menu a').forEach(item => {
    item.addEventListener('click', function() {
        document.getElementById('shipto-text').textContent = item.getAttribute('data-shipto');
        document.getElementById('shipto-flag').src = item.getAttribute('data-flag');
        document.getElementById('shipto-menu').classList.add('hidden');
    });
});

// Auto select the first Language and Currency
document.getElementById('language-text').textContent = 'English';
document.getElementById('currency-text').textContent = 'USD';
document.getElementById('currency-icon').textContent = '$';
document.getElementById('shipto-text').textContent = 'USA';
document.getElementById('shipto-flag').src = 'https://www.countryflags.io/us/flat/32.png';

 // Function to update flag based on language selection
 function updateFlag() {
    const selectedLanguage = document.getElementById('language-selector').value;
    const flagImage = document.getElementById('language-flag');

    // Map language codes to their respective flag images
    const flagMap = {
        'en': 'https://flagcdn.com/w20/us.png',
        'fr': 'https://flagcdn.com/w20/fr.png',
        'es': 'https://flagcdn.com/w20/es.png',
        'de': 'https://flagcdn.com/w20/de.png'
    };

    // Update the flag image source based on the selected language
    flagImage.src = flagMap[selectedLanguage];

}  


// Set the target date
const targetDate = new Date().getTime() + 5 * 24 * 60 * 60 * 1000; // 5 days from now

function updateTimer() {
  const now = new Date().getTime();
  const timeLeft = targetDate - now;

  if (timeLeft < 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return; // Stop updating once time has passed
  }

  // Calculate time components
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // Update the DOM
  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

// Run the timer update every second
setInterval(updateTimer, 1000);

// Initialize timer on page load
updateTimer();

  // Function to change the default flag
  function changeDefaultFlag(countryName, flagSrc) {
    document.getElementById('defaultFlagImg').src = flagSrc; // Update flag image
    document.getElementById('defaultFlagImg').alt = `${countryName} Flag`; // Update alt text
    document.getElementById('defaultCountryName').textContent = countryName; // Update country name
}

 // Automatic slider functionality
 const slides = document.querySelectorAll(".slider-item");
 let currentIndex = 0;

 function showNextSlide() {
     // Remove the active class from the current slide
     slides[currentIndex].classList.remove("active");

     // Update the index to the next slide
     currentIndex = (currentIndex + 1) % slides.length;

     // Add the active class to the next slide
     slides[currentIndex].classList.add("active");
 }

 // Automatically switch slides every 3 seconds
 setInterval(showNextSlide, 3000);
 
 document.getElementById("uploadPic").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("profilePic").src = e.target.result;
            // Optionally, save the updated profile picture to localStorage
            localStorage.setItem("profilePic", e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

 // Event listener for the upload button click
    document.getElementById("uploadButton").addEventListener("click", () => {
      document.getElementById("fileInput").click(); // Trigger file input click
    });

    // Event listener for file input change (when the user selects a file)
    document.getElementById("fileInput").addEventListener("change", (event) => {
      const file = event.target.files[0]; // Get the selected file
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const img = document.getElementById("profilePic");
          img.src = e.target.result; // Set the uploaded image as the src
          localStorage.setItem("profilePic", e.target.result); // Save the image in localStorage
        };
        reader.readAsDataURL(file); // Read the image as data URL
      }
    });

   // Get references to the upload button and file input
   const uploadButton = document.getElementById("uploadButton");
   const fileInput = document.getElementById("fileInput");
   const profilePic = document.getElementById("profilePic");

   // Trigger file input when the button is clicked
   uploadButton.addEventListener("click", () => {
     fileInput.click(); // This triggers the file input dialog
   });

   // Handle the file input change event (when the user selects a file)
   fileInput.addEventListener("change", (event) => {
     const file = event.target.files[0]; // Get the selected file
     if (file) {
       const reader = new FileReader();
       reader.onload = function(e) {
         // Set the uploaded image as the src for the profile picture
         profilePic.src = e.target.result;
         // Save the image in localStorage
         localStorage.setItem("profilePic", e.target.result);
       };
       reader.readAsDataURL(file); // Read the file as a data URL
     }
   });

   // On page load, check if there is a saved profile picture in localStorage
   window.addEventListener("load", () => {
     const savedPic = localStorage.getItem("profilePic");
     if (savedPic) {
       profilePic.src = savedPic; // Load the saved image
     }
   });
   


