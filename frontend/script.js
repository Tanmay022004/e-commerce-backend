const API = "https://e-commerce-backend-fr7k.onrender.com/api";


// ---------------- REGISTER ----------------
async function register() {
  try {
    console.log("Register clicked");

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(API + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const text = await res.text();
    console.log("RAW RESPONSE:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("Not JSON response:", text);
      alert("Server error (invalid response)");
      return;
    }

    console.log("Parsed:", data);

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
  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(API + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const text = await res.text();
    console.log("RAW RESPONSE:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      alert("Server error");
      return;
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Login successful");
      window.location.href = "index.html";
    } else {
      alert(data.msg || "Login failed");
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
}


// ---------------- LOAD PRODUCTS ----------------
async function loadProducts() {
  try {
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
  } catch (err) {
    console.error("Failed to load products:", err);
  }
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
  try {
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
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ items })
    });

    const text = await res.text();
    console.log("ORDER RESPONSE:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      alert("Order failed (invalid response)");
      return;
    }

    if (!res.ok) {
      alert(data.msg || "Order failed");
      return;
    }

    alert("Order placed!");
    localStorage.removeItem("cart");
    window.location.href = "index.html";

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
}


// ---------------- INIT ----------------
loadProducts();
loadCart();