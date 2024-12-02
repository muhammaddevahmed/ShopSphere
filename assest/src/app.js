// Store user details in Local Storage
const storeUser = (user) => {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if the user email already exists
  if (users.some((u) => u.email === user.email)) {
    alert("Email already exists.");
    return;
  }

  // Check if the user is an admin
  if (user.role === "admin") {
    // Prevent adding/editing admin users once they are created
    if (users.some((u) => u.role === "admin")) {
      alert("Admin account already exists. Admin data cannot be modified.");
      return;
    }
  }

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Signup successful!");
  window.location.href = "login.html";
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
        <li class="flex justify-between items-center">
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

  cartItemsDiv.innerHTML = ""; // Clear any existing cart items
  lastPurchaseDiv.innerHTML = ""; // Clear any existing last purchase info

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>No cart data available.</p>";
  } else {
    cart.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("flex", "border-b", "pb-4");
      itemDiv.innerHTML = `
        <img src="${item.image}" class="w-32 h-32 object-cover mr-4" alt="${item.name}">
        <div>
          <h3 class="text-xl font-semibold">${item.name}</h3>
          <p>Price: $${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
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

// Initialize Data on Page Load
if (window.location.pathname.includes("admin.html")) {
  loadAdminData();
  loadCartData();
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
