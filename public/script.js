let cart = [];

fetch("http://localhost:3000/products")
    .then(res => res.json())
    .then(products => {
        const productDiv = document.getElementById("products");
        products.forEach(product => {
            productDiv.innerHTML += `
                <div class="product">
                    <h2>${product.name}</h2>
                    <p>Price: ₹${product.price}</p>
                    <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
                </div>
            `;
        });
    });

function addToCart(name, price) {
    let existingProduct = cart.find(item => item.name === name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    let cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    let totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    document.getElementById("cart-count").innerText = cartCount;
    document.getElementById("cart-total").innerText = totalPrice;
}

function checkout() {
    alert("Proceeding to checkout with total ₹" + document.getElementById("cart-total").innerText);
}
