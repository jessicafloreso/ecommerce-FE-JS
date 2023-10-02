

// Define a shopping cart array to store products and their quantities
const shoppingCart = [];

// Load the JSON data
fetch('./products.json')
    .then(response => response.json())
    .then(data => {
        // Create product cards dynamically
        //// <label for="quantity">Quantity:${product.quantity}</label>
        const productContainer = document.querySelector('.product-list');
        data.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" >
                </div>
                <h3 id="${product.id}">${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <label for="quantity">Quantity: </label>
                <input type="number" class="quantity-input" value="1" min="1">
                <button class="add-to-cart">Add to Cart</button>
            `;
            productContainer.appendChild(productCard);

            // Handle adding products to the shopping cart
            const addToCartButton = productCard.querySelector('.add-to-cart');
            addToCartButton.addEventListener('click', addToCart.bind(null, product));
        });

        // Function to add a product to the cart
        function addToCart(product) {
            const quantityInput = document.querySelector('.quantity-input');
            const quantity = parseInt(quantityInput.value);

            // Check if the product is already in the cart
            const existingProduct = shoppingCart.find(item => item.id === product.id);

            if (existingProduct) {
                // If the product is already in the cart, update its quantity
                existingProduct.quantity += quantity;
            } else {
                // If it's not in the cart, add it
                shoppingCart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    quantity: quantity
                });
            }

            // Update the cart display
            updateCartDisplay();
        }

        // Function to update the cart display
        function updateCartDisplay() {
            const cartContainer = document.querySelector('.cart-items');
            cartContainer.innerHTML = ''; // Clear the cart container
        
            let total = 0;
        
            shoppingCart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <span>${item.name}</span>
                    <span>Quantity: ${item.quantity}</span>
                    <span>Price: $${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-from-cart">Remove</button>
                `;
                cartContainer.appendChild(cartItem);
        
                // Calculate the total price
                total += item.price * item.quantity;

                // Handle removing items from the cart
                const removeButton = cartItem.querySelector('.remove-from-cart');
                removeButton.addEventListener('click', removeFromCart.bind(null, item));
            });
        
            // Update the total price display
            const cartTotal = document.querySelector('.cart-total');
            cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    
            // Store the cart data in local storage
            localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
        }
//Function to remove an item from the cart
        function removeFromCart(item) {
            const index = shoppingCart.indexOf(item);
            if (index !== -1) {
                shoppingCart.splice(index, 1);
                updateCartDisplay();
            }
        }
        // Load cart data from local storage if available
        const savedCart = localStorage.getItem('shoppingCart');
        if (savedCart) {
            shoppingCart.push(...JSON.parse(savedCart));
            updateCartDisplay();
        }

    })
    .catch(error => console.error('Error loading JSON data:', error));

    // JavaScript for toggling shopping cart
const cart = document.querySelector('.shopping-cart');
const cartToggleLink = document.querySelector('.navbar-icon');
const cartCloseButton = document.querySelector('.cart-close-button');

cartToggleLink.addEventListener('click', () => {
  cart.style.right = '0'; // Slide in the cart from the right
});

cartCloseButton.addEventListener('click', () => {
  cart.style.right = '-300px'; // Slide out the cart to the right
});


  

// JavaScript for the "Place Order" button
const placeOrderButton = document.getElementById('placeOrderButton');
placeOrderButton.addEventListener('click', () => {
  // Hide the shopping cart (slide it out)
  cart.style.right = '-300px';
  // Create a URL with query parameters to pass cart data
  const cartData = encodeURIComponent(JSON.stringify(shoppingCart));
  const url = `order.html?cart=${cartData}`;

  // Redirect to the order.html page with cart data
  window.location.href = url;
});



