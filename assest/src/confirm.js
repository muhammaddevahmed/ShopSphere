window.onload = function () {
    const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
    const paymentData = JSON.parse(localStorage.getItem("paymentData"));

    if (!orderDetails) {
        window.location.href = "index.html"; // Redirect to home if no order details
    }

    // Display Shipping Address
    const shippingAddressDiv = document.getElementById("shippingAddress");
    shippingAddressDiv.innerHTML = `
        <p>${orderDetails.shippingAddress.address}</p>
        <p>${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.postalCode}</p>
        <p>${orderDetails.shippingAddress.country}</p>
    `;

    // Display Payment Method
    const paymentMethodDiv = document.getElementById("paymentMethod");
    if (paymentData) {
        paymentMethodDiv.innerHTML = `
            <img src="${paymentData.cardImage}" class="w-20 h-20 object-cover mr-4" alt="${paymentData.cardImage}">
            <p><strong>Payment Method:</strong> ${paymentData.paymentMethod}</p>
            <p><strong>Card Number:</strong> **** **** **** ${paymentData.cardNumber.slice(-4)}</p>
            <p><strong>Cardholder Name:</strong> ${paymentData.cardName}</p>
        `;
    } else {
        paymentMethodDiv.textContent = orderDetails.paymentMethod;
    }

    // Display Order Summary
    const orderSummaryDiv = document.getElementById("orderSummary");
    const orderTotalDiv = document.getElementById("orderTotal");

    let total = 0;
    orderDetails.cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("flex", "border-b", "pb-4");
        itemDiv.innerHTML = `
            <img src="${item.image}" class="w-16 h-16 object-cover mr-4" alt="${item.name}">
            <div>
                <h3 class="text-lg font-semibold">${item.name}</h3>
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
        `;
        orderSummaryDiv.appendChild(itemDiv);
        total += item.price * item.quantity;
    });
    orderTotalDiv.textContent = `Total: $${total.toFixed(2)}`;

    // Buy Now button click handler
    document.getElementById("buyNowButton").onclick = function () {
        alert(`Thank you for purchasing! Total amount of $${total.toFixed(2)} has been deducted from your account.`);

       

        

        window.location.href = "index.html";
    };
};



