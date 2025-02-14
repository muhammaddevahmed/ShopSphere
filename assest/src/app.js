// Add this initialization function at the beginning of your code
const initializeAdmin = () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const staticAdmin = {
    username: "Admin",
    email: "admin@gmail.com",    // Static admin email
    password: "admin123",       // Static admin password
    role: "admin"
  };

  // Check if static admin exists
  if (!users.some(u => u.email === staticAdmin.email)) {
    users.push(staticAdmin);
    localStorage.setItem("users", JSON.stringify(users));
  }
};

// Initialize admin when the script loads
initializeAdmin();

// Modified storeUser function
const storeUser = (user) => {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Prevent modification of static admin
  if (user.email === "admin@example.com") {
    alert("Admin account cannot be modified");
    return;
  }

  // Rest of the original storeUser function remains the same
  // if (users.some((u) => u.email === user.email)) {
  //   alert("Succesfully account created.");
  //   return;
  // }

  if (user.role === "admin") {
    alert("Admin account creation is restricted");
    return;
  }

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Signup successful!");
  window.location.href = "login.html";
};

// Modified deleteUser function to protect admin
const DeleteUser = (index) => {
  let loginUsers = JSON.parse(localStorage.getItem("loginUsers")) || [];
  
  // Prevent deletion of admin login records
  if (loginUsers[index]?.email === "admin@example.com") {
    alert("Admin login records cannot be deleted");
    return;
  }
  
  loginUsers.splice(index, 1);
  localStorage.setItem("loginUsers", JSON.stringify(loginUsers));
  loadAdminData();
};

// Validate Signup
const validateSignup = () => {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const role = document.getElementById("role").value;

  let valid = true;

  if (username.length > 20) {
    document.getElementById("usernameError").classList.remove("hidden");
    valid = false;
  } else {
    document.getElementById("usernameError").classList.add("hidden");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById("emailError").classList.remove("hidden");
    valid = false;
  } else {
    document.getElementById("emailError").classList.add("hidden");
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    document.getElementById("passwordError").classList.remove("hidden");
    valid = false;
  } else {
    document.getElementById("passwordError").classList.add("hidden");
  }

  if (password !== confirmPassword) {
    document.getElementById("confirmPasswordError").classList.remove("hidden");
    valid = false;
  } else {
    document.getElementById("confirmPasswordError").classList.add("hidden");
  }

  if (valid) {
    storeUser({ username, email, password, role });
  }
};

// Handle Login
const handleLogin = () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.email === email && u.password === password);


  if (!user) {
    document.getElementById("loginError").classList.remove("hidden");
  } else {
    document.getElementById("loginError").classList.add("hidden");

    // Save current user data to localStorage
    localStorage.setItem("currentUser", JSON.stringify(user));

    if (user.role === "admin") {
      window.location.href = "admin.html";
    } else {
      // Save user login to localStorage for admin panel tracking
      let loginUsers = JSON.parse(localStorage.getItem("loginUsers")) || [];
      loginUsers.push({ email: user.email, username: user.username });
      localStorage.setItem("loginUsers", JSON.stringify(loginUsers));

      window.location.href = "index.html";
    }
  }
};

// Load Admin Data
const loadAdminData = () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const adminBox = document.getElementById("adminData");

  adminBox.innerHTML = users
    .filter((u) => u.role === "admin")
    .map(
      (u, index) => `
        <li class="flex justify-between items-center">
          ${u.username} (${u.email})
        </li>`
    )
    .join("");

  const loginUsers = JSON.parse(localStorage.getItem("loginUsers")) || [];
  const userBox = document.getElementById("userData");
  userBox.innerHTML = loginUsers
    .map(
      (u, index) => `
        <li class="flex justify-between items-center m-4 g-10">
          ${u.username} (${u.email})
          <button onclick="deleteUser(${index})" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
        </li>`
    )
    .join("");
};

// Delete User
const deleteUser = (index) => {
  let loginUsers = JSON.parse(localStorage.getItem("loginUsers")) || [];
  loginUsers.splice(index, 1);
  localStorage.setItem("loginUsers", JSON.stringify(loginUsers));
  loadAdminData();
};



// Logout Functionality
document.getElementById("logoutButton")?.addEventListener("click", function (e) {
  e.preventDefault();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    confirm("Are you sure you want to Logout?");
    localStorage.removeItem("currentUser");
    alert("You have been successfully logged out.");
    window.location.href = "login.html";
  } else {
    alert("You need to log in first.");
    window.location.href = "login.html";  
  }
});
// Load Cart Data and Last Purchase Amount in Admin Page
const loadCartData = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsDiv = document.getElementById("cartItems");
  const lastPurchaseDiv = document.getElementById("lastPurchase");

  // Initialize Balance
  let totalBalance = parseFloat(localStorage.getItem("totalBalance")) || 0;
  const balanceAmount = document.getElementById("balanceAmount");
  if(balanceAmount) balanceAmount.textContent = `$${totalBalance.toFixed(2)}`;

  cartItemsDiv.innerHTML = ""; // Clear existing items
  lastPurchaseDiv.innerHTML = "";

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<h1>No cart data available.</h1>";
  } else {
    cart.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("flex", "border-b", "pb-4", "items-center", "justify-between", "flex-wrap");
    
      itemDiv.innerHTML = `
        <div class="flex items-center">
          <img src="${item.image}" class="w-32 h-32 object-cover mr-4" alt="${item.name}">
          <div>
            <h3 class="text-xl font-semibold">${item.name}</h3>
            <p>Price: $${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            ${item.status ? `<p>Status: ${item.status}</p>` : ""}
          </div>
        </div>
    
        <!-- Responsive Button Container -->
        <div class="flex flex-col md:flex-row gap-2 w-full md:w-auto mt-2 md:mt-0">
          <button onclick="handleAccept(${index})" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full md:w-auto">
            Accept
          </button>
          <button onclick="handleDecline(${index})" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full md:w-auto">
            Decline
          </button>
        </div>
      `;
    
      cartItemsDiv.appendChild(itemDiv);
    });
    
  }

  const lastPurchaseAmount = localStorage.getItem("lastPurchaseAmount");
  lastPurchaseDiv.innerHTML = lastPurchaseAmount
    ? `<h3 class="text-xl font-semibold">Last Purchase Amount: $${lastPurchaseAmount}</h3>`
    : "<p>No purchase made yet.</p>";
};

// Load Pending Orders
const loadPendingOrders = () => {
  const pendingOrders = JSON.parse(localStorage.getItem("pendingOrders")) || [];
  const pendingOrdersDiv = document.getElementById("pendingOrders");

  pendingOrdersDiv.innerHTML = "";

  pendingOrders.forEach((order) => {
    const orderDiv = document.createElement("div");
    orderDiv.classList.add("flex", "border-b", "pb-4", "items-center", "justify-between", "mb-4");
    orderDiv.innerHTML = `
      <div class="flex items-center">
        <img src="${order.image}" class="w-32 h-32 object-cover mr-4" alt="${order.name}">
        <div>
          <h3 class="text-xl font-semibold">${order.name}</h3>
          <p>Price: $${order.price}</p>
          <p>Quantity: ${order.quantity}</p>
          <p class="text-green-500">Status: ${order.status}</p>
          <p>Estimated Delivery: ${order.deliveryDays} days</p>
        </div>
      </div>
    `;
    pendingOrdersDiv.appendChild(orderDiv);
  });
};

// Load Declined Orders
const loadDeclinedOrders = () => {
  const declinedOrders = JSON.parse(localStorage.getItem("declinedOrders")) || [];
  const declinedOrdersDiv = document.getElementById("declinedOrders");

  declinedOrdersDiv.innerHTML = "";

  declinedOrders.forEach((order) => {
    const orderDiv = document.createElement("div");
    orderDiv.classList.add("flex", "border-b", "pb-4", "items-center", "justify-between", "mb-4");
    orderDiv.innerHTML = `
      <div class="flex items-center">
        <img src="${order.image}" class="w-32 h-32 object-cover mr-4" alt="${order.name}">
        <div>
          <h3 class="text-xl font-semibold">${order.name}</h3>
          <p>Price: $${order.price}</p>
          <p>Quantity: ${order.quantity}</p> 
          <p class="text-red-500">Status: Out of Stock</p>
        </div>
      </div>
    `;
    declinedOrdersDiv.appendChild(orderDiv);
  });
};
const handleAccept = (index) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart[index];

  if (item) {
    // Show delivery time dropdown
    document.getElementById("deliveryOptions").classList.remove("hidden");

    document.getElementById("confirmOrderBtn").onclick = () => {
      const selectedDeliveryTime = document.getElementById("deliveryTimeSelect").value;
      const totalBalance = parseFloat(localStorage.getItem("totalBalance")) || 0;
      const amount = item.price * item.quantity;

      // Update total balance
      localStorage.setItem("totalBalance", (totalBalance + amount).toString());

      // Create pending order with selected delivery time
      const pendingOrder = {
        ...item,
        status: "Approved",
        deliveryDays: selectedDeliveryTime,
      };

      // Add to pending orders
      const pendingOrders = JSON.parse(localStorage.getItem("pendingOrders")) || [];
      pendingOrders.push(pendingOrder);
      localStorage.setItem("pendingOrders", JSON.stringify(pendingOrders));

      // Remove from cart
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));

      // Hide dropdown and refresh displays
      document.getElementById("deliveryOptions").classList.add("hidden");
      loadCartData();
      loadPendingOrders();
    };
  }
};


const handleDecline = (index) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart[index];
  
  if (item) {
    // Create declined order
    const declinedOrder = {
      ...item,
      status: "Out of Stock"
    };

    // Add to declined orders
    const declinedOrders = JSON.parse(localStorage.getItem("declinedOrders")) || [];
    declinedOrders.push(declinedOrder);
    localStorage.setItem("declinedOrders", JSON.stringify(declinedOrders));

    // Remove from cart
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Refresh displays
    loadCartData();
    loadDeclinedOrders();
  }
};

// Initialize Data on Page Load
if (window.location.pathname.includes("admin.html")) {
  loadAdminData();
  loadCartData();
  loadPendingOrders();
  loadDeclinedOrders();
  
  const balanceAmount = document.getElementById("balanceAmount");
  if(balanceAmount) {
    const totalBalance = parseFloat(localStorage.getItem("totalBalance")) || 0;
    balanceAmount.textContent = `$${totalBalance.toFixed(2)}`;
  }
}


// Event Listeners for Forms
document.getElementById("signupForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  validateSignup();
});

document.getElementById("loginForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  handleLogin();
});

// Event Listeners for Forms
document.getElementById("signupForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  validateSignup();
});

document.getElementById("loginForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  handleLogin();
});

// Admin Logout Functionality
document.getElementById("adminLogoutButton")?.addEventListener("click", function(e) {
  e.preventDefault();

  // Confirm logout
  const logoutConfirmed = confirm("Are you sure you want to log out?");

  if (logoutConfirmed) {
      // Clear current session data (admin or user)
      localStorage.removeItem("currentUser");  // Remove the logged-in user's data
      localStorage.removeItem("loginUsers");   
      
      // Redirect to login page
      alert("You have been logged out successfully.");
      window.location.href = "index.html";  
  }
});  



