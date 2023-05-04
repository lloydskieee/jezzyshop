// Define cart variable
let cart = [];

// Add click event listener to all add-to-cart buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-id');
        const productTitle = button.previousElementSibling.previousElementSibling.innerText;
        const productPrice = parseFloat(button.previousElementSibling.innerText.slice(1));
        const quantityInput = button.nextElementSibling;
        const quantityValue = parseInt(quantityInput.value);
        
        if (isNaN(quantityValue) || quantityValue <= 0) {
            alert('Please enter a valid quantity.');
            return;
        }

        addToCart(productId, productTitle, productPrice, quantityValue);
        updateCartSummary();
    });
});

function addToCart(id, title, price, quantity) {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: id,
            title: title,
            price: price,
            quantity: quantity
        });
    }
}

function updateCartSummary() {
    const selectedItems = document.querySelector('#selected-items');
    const totalPrice = document.querySelector('#total-price');

    selectedItems.innerHTML = '';
    let totalCost = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerText = `${item.title} (${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`;
        totalCost += (item.price * item.quantity);
        selectedItems.appendChild(li);
    });

    totalPrice.innerText = totalCost.toFixed(2);
}

//THIS IS THE CODE FOR THE SLIDER
const sliders = document.querySelectorAll('.slider');

sliders.forEach(slider => {
  let currentSlide = 0;
  const slides = slider.querySelectorAll('img');
  setInterval(() => {
    currentSlide++;
    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }
    slides.forEach(slide => {
      slide.style.opacity = 0;
    });
    slides[currentSlide].style.opacity = 1;
  }, 3000);
});


//THIS IS THE CODE FOR PAYMENT OPTIONS
// Get the payment options and the pay button
const paymentOptions = document.querySelectorAll('input[name="payment-method"]');
const payButton = document.getElementById('pay-button');

// Add a change event listener to the payment options
paymentOptions.forEach(option => {
    option.addEventListener('change', () => {
        // Enable the pay button
        payButton.disabled = false;

        // Change the pay button text and link based on the selected payment method
        switch (option.id) {
            case 'credit-card':
                payButton.textContent = 'Pay with Credit Card';
                payButton.setAttribute('href', 'https://www.bdo.com.ph/');
                payButton.setAttribute('target', '_blank');
                break;
            case 'paymaya':
                payButton.textContent = 'Pay with PayMaya';
                payButton.setAttribute('href', 'https://www.maya.ph/');
                payButton.setAttribute('target', '_blank');
                break;
            case 'gcash':
                payButton.textContent = 'Pay with GCash';
                payButton.setAttribute('href', 'https://gcash.com/');
                payButton.setAttribute('target', '_blank');
                break;
            case 'coins.ph':
                payButton.textContent = 'Pay with Coins.ph';
                payButton.setAttribute('href', 'https://coins.ph');
                payButton.setAttribute('target', '_blank');
                break;
        }
    });
});
