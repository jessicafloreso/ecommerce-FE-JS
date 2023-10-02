

// Define a shopping cart array to store products and their quantities
const shoppingCart = [];
const users = [
    { id: 1, email: 'john@example.com', password: 'password123' },
    // Add more user objects as needed
];

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


// JavaScript for toggling the profile options
const profileLink = document.getElementById('profile-link');
const profileOptions = document.getElementById('profile-options');

profileLink.addEventListener('click', () => {
    profileOptions.classList.toggle('active');
});

// Function to hide the profile options
function hideProfileOptions() {
    profileOptions.classList.remove('active');
}

// Attach an event listener to the close button
const closeProfileOptionsButton = document.getElementById('close-profile-options');
closeProfileOptionsButton.addEventListener('click', hideProfileOptions);

// Attach a click event listener to the document to close the profile options when clicking outside
document.addEventListener('click', (event) => {
    const profileLink = document.getElementById('profile-link');
    
    if (!profileLink.contains(event.target) && !profileOptions.contains(event.target)) {
        hideProfileOptions();
    }
});

// JavaScript for toggling between login and register forms
const showLoginButton = document.getElementById('show-login-button');
const showRegisterButton = document.getElementById('show-register-button');
const loginContent = document.getElementById('login-content');
const registerContent = document.getElementById('register-content');
const logoutAside = document.getElementById('logout-aside');

showLoginButton.addEventListener('click', () => {
    showLoginButton.classList.add('active');
    showRegisterButton.classList.remove('active');
    loginContent.style.display = 'block';
    registerContent.style.display = 'none';
    logoutAside.style.display = 'none'; // Hide logout options
});

showRegisterButton.addEventListener('click', () => {
    showLoginButton.classList.remove('active');
    showRegisterButton.classList.add('active');
    loginContent.style.display = 'none';
    registerContent.style.display = 'block';
    logoutAside.style.display = 'none'; // Hide logout options
});
function registerUser() {
    // Get user input (replace with actual form field values)
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    // Create a new user object
    const newUser = {
        id: users.length + 1, // Assign a unique ID (you may use a more robust method in production)
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };

    // Add the new user to the array
    users.push(newUser);

    // Simulate a successful registration (you may want to add error handling)
    console.log('Registration successful:', newUser);

    // Optionally, you can clear the registration form fields here
    document.getElementById('first-name').value = '';
    document.getElementById('last-name').value = '';
    document.getElementById('register-email').value = '';
    document.getElementById('register-password').value = '';

    // After successful registration, you might want to automatically log in the user
    // Call the loginUser function with appropriate data
    loginUser(newUser.email, newUser.password);
}
const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    registerUser();
});

function loginUser(email, password) {
    // Get user input (replace with actual form field values)
    const usernameInput = document.getElementById('login-email').value;
    const passwordInput = document.getElementById('login-password').value;

    // Check if there is a matching user in the predefined data
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Simulate a successful login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', user.username);

        // Show the user's name and logout button
        const userNameSpan = document.getElementById('user-name');
        userNameSpan.textContent = user.username;
        logoutAside.classList.add('logged-in');

        // Hide the login and registration forms
        loginContent.style.display = 'none';
        registerContent.style.display = 'none';
    } else {
        // Display an error message or handle failed login
        console.error('Login failed: Invalid username or password.');
    }
}
