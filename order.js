

document.addEventListener('DOMContentLoaded', function () {
    // Parse the URL to retrieve cart data
    const urlParams = new URLSearchParams(window.location.search);
    const cartData = urlParams.get('cart');

    if (cartData) {
        // Convert the cart data back to an array
        const cartItems = JSON.parse(decodeURIComponent(cartData));

        // Display the cart items in the order-summary section
        const cartSummary = document.querySelector('.cart-summary');

        cartItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
            cartSummary.appendChild(listItem);
        });
    }

    // Handle payment form submission
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // Get payment form data and handle payment processing here
        alert('Payment processed successfully!');
        paymentForm.reset();
    });
});
