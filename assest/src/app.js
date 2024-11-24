// Store user details in Local Storage
const storeUser = (user) => {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.some((u) => u.email === user.email)) {
    alert("Email already exists.");
    return;
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

  if (username.length > 14) {
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
          <button onclick="editAdmin(${index})" class="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Edit</button>
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

// Edit Admin Data
let editIndex = null;

const editAdmin = (index) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  editIndex = index;
  const admin = users.filter((u) => u.role === "admin")[index];

  document.getElementById("editUsername").value = admin.username;
  document.getElementById("editEmail").value = admin.email;

  document.getElementById("editModal").classList.remove("hidden");
};

document.getElementById("editForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("editUsername").value;
  const email = document.getElementById("editEmail").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const admins = users.filter((u) => u.role === "admin");
  admins[editIndex].username = username;
  admins[editIndex].email = email;

  const nonAdmins = users.filter((u) => u.role !== "admin");
  const updatedUsers = [...admins, ...nonAdmins];
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  document.getElementById("editModal").classList.add("hidden");
  loadAdminData();
});

// Cancel Edit
document.getElementById("cancelEdit")?.addEventListener("click", () => {
  document.getElementById("editModal").classList.add("hidden");
});

// Initialize Admin Data on Page Load
if (window.location.pathname.includes("admin.html")) {
  loadAdminData();
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

