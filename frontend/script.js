const API = "https://e-commerce-backend-fr7k.onrender.com/api";

// ---------------- REGISTER ----------------
async function register() {
  try {
    console.log("Register clicked");

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log({ name, email, password });

    const res = await fetch(API + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    console.log("Response status:", res.status);

    const data = await res.json();
    console.log("Response data:", data);

    if (!res.ok) {
      alert(data.msg || "Registration failed");
      return;
    }

    alert("Registered successfully");
  } catch (err) {
    console.error("Error:", err);
    alert("Server error. Check console.");
  }
}

// ---------------- LOGIN ----------------
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(API + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    alert("Login successful");
    window.location.href = "index.html";
  } else {
    alert("Login failed");
  }
}

// ---------------- LOAD PRODUCTS ----------------
async function loadProducts() {
  const res = await fetch(API + "/products");
  const products = await res.json();

  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = "";

  products.forEach(p => {
    container.innerHTML += `
      <div>
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart('${p._id}')">Add to Cart</button>
      </div>
    `;
  });
}

// ---------------- CART ----------------
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to cart");
}

function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart");

  if (!container) return;

  container.innerHTML = "";

  cart.forEach(id => {
    container.innerHTML += `<div>Product ID: ${id}</div>`;
  });
}

// ---------------- PLACE ORDER ----------------
async function placeOrder() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  const items = cart.map(id => ({
    product: id,
    quantity: 1
  }));

  const token = localStorage.getItem("token");

  const res = await fetch(API + "/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify({ items })
  });

  const data = await res.json();

  alert("Order placed!");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
}

// ---------------- AUTO LOAD ----------------
loadProducts();
loadCart();