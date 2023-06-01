
// Fetch products from API
function fetchProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';
            data.forEach(product => {
                const card = `
      <div class="col-lg-4 col-md-6 col-12 mb-4">
        <div class="card" style="width: auto; height:22rem;">
            <div class="rotate-image text-center">
                <img src="${product.image}" class="card-img-top w-50 m-auto" alt="${product.title}" style="height:30vh">
                </div>
          <div class="card-body">
            <h5 class="card-title">${product.title.substring(0, 21)}...</h5>
            <p class="card-text">$${product.price}</p>
            <div class="d-flex justify-content-between d-flex_btn">
            <button onclick="addToCart(${product.id})" class="btn btn-primary mb-2">Add to Cart</button>
            <button onclick="removeFromCart(${product.id})" class="btn btn-danger mb-2">Remove</button>
            </div>
          </div>
        </div>
      </div>`;
                productList.insertAdjacentHTML('beforeend', card);

            });
        })
        .catch(error => {
            console.log('Error fetching products:', error);
        });
}

// Add product to cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartItemCount();
    alert('Product added to cart! Check on navbar');
}

// Remove product from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(id => id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartItemCount();
    alert('Product removed from cart! Check on navbar');
}

// Update cart item count
function updateCartItemCount() {
    const cartItemCount = document.getElementById('cart-item-count');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemCount.textContent = cart.length > 0 ? `${cart.length}` : 0;
}

// Filter products by price
function filterProducts() {
    const minPrice = document.getElementById('min-price').value;
    const maxPrice = document.getElementById('max-price').value;
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            const filteredProducts = data.filter(product => product.price >= minPrice && product.price <= maxPrice);
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';
            filteredProducts.forEach(product => {
                const card = `
      <div class="col-md-4 mb-4">
        <div class="card">
          <img src="${product.image}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">$${product.price}</p>
            <button onclick="addToCart(${product.id})" class="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>`;
                productList.insertAdjacentHTML('beforeend', card);
            });
        })
        .catch(error => {
            console.log('Error fetching products:', error);
        });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    updateCartItemCount();
});

// Attach event listeners
document.getElementById('filter-btn').addEventListener('click', filterProducts);
