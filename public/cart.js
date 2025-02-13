let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    let existingProduct = cart.find(item => item.name === name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

function updateCartDisplay() {
    let cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    let totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    let cartCountElement = document.getElementById("cart-count");
    let cartTotalElement = document.getElementById("cart-total");

    if (cartCountElement) cartCountElement.innerText = cartCount;
    if (cartTotalElement) cartTotalElement.innerText = totalPrice;
}

function displayCartItems() {
    let cartItemsDiv = document.getElementById("cart-items");
    let totalAmount = 0;
    
    if (cartItemsDiv) {
        cartItemsDiv.innerHTML = ""; // Clear previous items
        cart.forEach(item => {
            let itemTotal = item.price * item.quantity;
            totalAmount += itemTotal;
            cartItemsDiv.innerHTML += `
                <p>${item.name} x ${item.quantity} - ₹${itemTotal}</p>
            `;
        });

        // Update total amount
        let cartTotalElement = document.getElementById("cart-total");
        if (cartTotalElement) {
            cartTotalElement.innerText = totalAmount;
        }
    }

    updateCartDisplay();
}

function checkout() {
    alert("Proceeding to checkout! Total: ₹" + document.getElementById("cart-total").innerText);
    localStorage.removeItem("cart");
    window.location.href = "index.html";
}

window.onload = function () {
    updateCartDisplay();
    if (document.getElementById("cart-items")) {
        displayCartItems();
    }
};
