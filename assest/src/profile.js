window.onload = function () {
  const orderDetails = JSON.parse(localStorage.getItem("orderDetails")) || { cart: [] };
  const paymentData = JSON.parse(localStorage.getItem("paymentData"));
  const pendingOrders = JSON.parse(localStorage.getItem("pendingOrders")) || [];
  const declinedOrders = JSON.parse(localStorage.getItem("declinedOrders")) || [];

  // Display Shipping Address
  document.getElementById("shippingAddress").innerHTML = `
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

  // Display Order Summary with Updated Status & Delivery Time
  const orderSummaryDiv = document.getElementById("orderSummary");
  let total = 0;

  orderDetails.cart.forEach(item => {
      let status = "Pending";
      let deliveryTime = "Updating...";
      let statusColor = "bg-yellow-500"; // Default: Pending (Yellow)
      let deliveryColor = "bg-blue-500"; // Default: Blue for delivery time

      // Check if item is approved
      const approvedItem = pendingOrders.find(p => p.name === item.name);
      if (approvedItem) {
          status = approvedItem.status; // "Approved"
          deliveryTime = `${approvedItem.deliveryDays} `;
          statusColor = "bg-green-500"; // Approved -> Green
      }

      // Check if item is declined
      const declinedItem = declinedOrders.find(d => d.name === item.name);
      if (declinedItem) {
          status = "Out of Stock";
          deliveryTime = "-";
          statusColor = "bg-red-500"; // Declined -> Red
      }

      const itemDiv = document.createElement("div");
      itemDiv.classList.add("flex", "border-b", "pb-4");
      itemDiv.innerHTML = `
          <img src="${item.image}" class="w-16 h-16 object-cover mr-4" alt="${item.name}">
          <div>
              <h3 class="text-lg font-semibold">${item.name}</h3>
              <p>Price: $${item.price}</p>
              <p>Quantity: ${item.quantity}</p>
              <p class="mt-2"><strong>Status:</strong> 
                  <span class="status px-3 py-1 rounded-full text-white text-sm font-bold  ${statusColor}">${status}</span>
              </p>
              <p class="mt-2"><strong>Delivery Time:</strong> 
                  <span class="delivery px-3 py-1 rounded-md text-white text-sm font-bold ${deliveryColor}">${deliveryTime}</span>
              </p>
          </div>
      `;
      orderSummaryDiv.appendChild(itemDiv);
      total += item.price * item.quantity;
  });

  document.getElementById("orderTotal").textContent = `Total: $${total.toFixed(2)}`;
};
