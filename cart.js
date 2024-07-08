var cartItems = []; // Array to store cart items

// Function to calculate the total subtotal of all items in the cart
function calculateTotalSubtotal() {
    var totalSubtotal = 0;
    cartItems.forEach(function(item) {
        totalSubtotal += item.price * item.quantity;
    });
    return totalSubtotal;
}

// Function to update the purchase table with the total subtotal
function updatePurchaseTable() {
    var totalSubtotal = calculateTotalSubtotal();
    var totalSubtotalCell = document.getElementById('total-subtotal');
    totalSubtotalCell.textContent = '$' + totalSubtotal.toFixed(2);
}

// Function to update the cart icon with the total quantity
function updateCartIcon() {
    var cartCount = document.getElementById('cart-count');
    cartCount.textContent = calculateTotalQuantity();
}

// Function to add product to the cart
function addToCart(product, price) {
    var existingItem = cartItems.find(function(item) {
        return item.product === product;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        var newItem = {
            product: product,
            price: price,
            quantity: 1
        };
        cartItems.push(newItem);
    }

    saveCart(); // Save cart items to localStorage
    displayCartItems(); // Update cart display
}

// Function to display cart items
function displayCartItems() {
    var cartTable = document.getElementById('cart-items');
    cartTable.innerHTML = '';

    cartItems.forEach(function(item, index) {
        var row = cartTable.insertRow();
        var removeCell = row.insertCell(0);
        var productCell = row.insertCell(1);
        var priceCell = row.insertCell(2);
        var quantityCell = row.insertCell(3);
        var subtotalCell = row.insertCell(4);

        // Add button to remove product from cart
        var removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = function() {
            removeFromCart(index);
        };
        removeCell.appendChild(removeButton);

        // Display product name
        productCell.textContent = item.product;

        // Display product price
        priceCell.textContent = item.price;

        // Display product quantity with input field
        var quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = item.quantity;
        quantityInput.min = 1;
        quantityInput.addEventListener('change', function() {
            updateQuantity(index, parseInt(this.value));
        });
        quantityCell.appendChild(quantityInput);

        // Calculate and display subtotal for the product
        var subtotal = item.price * item.quantity;
        subtotalCell.textContent = subtotal;
    });

    updatePurchaseTable(); // Update the purchase table with the total subtotal
    updateCartIcon(); // Update the cart icon with the total quantity
}

// Function to remove product from cart
function removeFromCart(index) {
    cartItems.splice(index, 1);
    saveCart(); // Save cart items to localStorage
    displayCartItems(); // Update cart display
}

// Function to update quantity of a product in the cart
function updateQuantity(index, newQuantity) {
    cartItems[index].quantity = newQuantity;
    saveCart(); // Save cart items to localStorage
    displayCartItems(); // Update cart display
}

// Function to save cart items to localStorage
function saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Function to load cart items from localStorage
function loadCart() {
    var storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
        cartItems = JSON.parse(storedCart);
        displayCartItems();
        updateCartIcon(); // Call updateCartIcon after loading cart items
    }
}

// Function to handle purchase action
function purchase() {
    // Your purchase logic here
    alert("Thank you for your purchase!");
    // Optional: Clear the cart after purchase
    clearCart();
}

// Function to calculate total quantity of items in the cart
function calculateTotalQuantity() {
    var totalQuantity = 0;
    cartItems.forEach(function(item) {
        totalQuantity += item.quantity;
    });
    return totalQuantity;
}


// Call function to load cart items when page loads
window.onload = function() {
    loadCart();
    updatePurchaseTable(); // Update purchase table with initial total subtotal
};

