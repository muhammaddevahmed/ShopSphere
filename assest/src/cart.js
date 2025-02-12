window.onload = function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    

    // Function to check if user is logged in
    function isUserLoggedIn() {
        const loginUsers = JSON.parse(localStorage.getItem("loginUsers")) || [];
        return loginUsers.length > 0; // Return true if there's at least one logged-in user
    }

    // Function to update the cart display
    function updateCartDisplay() {
        const cartItemsDiv = document.getElementById("cartItems");
        const cartTotalDiv = document.getElementById("cartTotal");
        const buyNowMessageDiv = document.getElementById("buyNowMessage");

        cartItemsDiv.innerHTML = ""; // Clear cart items before repopulating
        if (cart.length === 0) {
            cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
            cartTotalDiv.textContent = "";
            buyNowMessageDiv.classList.add("hidden");
        } else {
            let total = 0;
            cart.forEach((item, index) => {
                const itemDiv = document.createElement("div");
                itemDiv.classList.add("flex", "border-b", "pb-4");
                itemDiv.innerHTML = `
                    <img src="${item.image}" class="w-32 h-32 object-cover mr-4" alt="${item.name}">
                    <div>
                        <h3 class="text-xl font-semibold">${item.name}</h3>
                        <p>Price: $${item.price}</p>
                        <p>Quantity: <input type="number" value="${item.quantity}" min="1" class="quantity-input w-16 text-center border rounded mb-2" data-index="${index}"></p>
                        <p class="text-gray-700">${item.description}</p>
                        <button class="px-4 py-2 bg-red-500 mt-4 text-white rounded delete-btn" data-index="${index}">Delete</button>
                    </div>
                `;
                cartItemsDiv.appendChild(itemDiv);

                // Add event listener for delete button
                itemDiv.querySelector(".delete-btn").addEventListener("click", function () {
                    cart.splice(index, 1); // Remove the item from the cart array
                    localStorage.setItem("cart", JSON.stringify(cart)); // Save the updated cart to localStorage
                    updateCartDisplay(); // Refresh the display
                });

                // Add event listener for quantity input change
                itemDiv.querySelector(".quantity-input").addEventListener("input", function () {
                    const newQuantity = parseInt(this.value);
                    if (newQuantity > 0) {
                        cart[index].quantity = newQuantity; // Update quantity in the cart array
                        localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart
                        updateCartDisplay(); // Refresh display
                    }
                });

                // Calculate total price for the cart
                total += item.price * item.quantity;
            });

            // Display the total price
            cartTotalDiv.textContent = `Total: $${total.toFixed(2)}`;
            buyNowMessageDiv.classList.add("hidden"); // Hide the message initially
        }
    }

    // Event listener for "Buy Now" button
    const buyNowButton = document.getElementById("buyNowButton");
    buyNowButton.addEventListener("click", function () {
        const cartTotalDiv = document.getElementById("cartTotal");
        const totalAmount = parseFloat(cartTotalDiv.textContent.replace("Total: $", "").trim());

        if (!isUserLoggedIn()) {
            alert("Please log in to proceed with your purchase.");
            window.location.href = "login.html"; // Redirect to login page
            return;
        }

        // If the cart is empty, alert and do not proceed
        if (cart.length === 0) {
            alert("Your cart is empty. Please add items to your cart before proceeding.");
            window.location.href = "product.html"
        } else if (totalAmount === 0) {
            alert("Your cart is empty. Please add items to your cart before proceeding.");
            
        } else {
        
                // Redirect to checkout.html
                window.location.href = "checkout.html";

            // Store the total amount of the purchase in localStorage
            localStorage.setItem("lastPurchaseAmount", totalAmount.toFixed(2));

            // Clear the cart after successful purchase
         
        }
    });

    // Initial update of the cart display
    updateCartDisplay();
};

