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