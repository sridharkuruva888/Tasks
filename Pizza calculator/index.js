// Data Storage

const MENU = {
    Size: {
        thin: 8.00,
        regular: 10.00,
        stuffed: 12.00
    },

    Lenght: {
        small: 1.0,
        medium: 1.5,
        large: 2.0
    },

    toppings: {
        cheese: 1.0,
        pepperoni: 1.0,
        mushrooms: 1.0,
        onions: 1.0,
        peppers: 1.0,
        sausage: 1.0
    }
};


// Pure Logic

const calculatePrice = (Size, Lenght) => {
    const Sizeprize =
        MENU.Size[Size] || MENU.Size.regular;

    const Lenghtprize =
        MENU.Lenght[Lenght] || MENU.Lenght.medium;

    return Sizeprize * Lenghtprize;
};


const calculateToppingsPrice = (toppings) => {
    return toppings.reduce((total, topping) => {
        return total + MENU.toppings[topping];
    }, 0);
};


// Higher Order Function

const calculateTotalPrice = (
    calculatePrice,
    calculateToppingsPrice
) => {

    return (Size, Lenght, toppings) => {

        const basePrice =
            calculatePrice(Size, Lenght);

        const toppingsPrice =
            calculateToppingsPrice(toppings);

        return basePrice + toppingsPrice;
    };
};

const getTotal =
    calculateTotalPrice(
        calculatePrice,
        calculateToppingsPrice
    );


// DOM Elements

const sizeSelect =
    document.getElementById("size");

const lengthBtns =
    document.querySelectorAll(".length-btn");

const toppingCheckboxes =
    document.querySelectorAll(
        '.toppings input[type="checkbox"]'
    );

let selectedLength = "medium";


// Button Events

lengthBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        lengthBtns.forEach(button =>
            button.classList.remove("active")
        );

        btn.classList.add("active");

        selectedLength =
            btn.dataset.length;

        updateReceipt();
    });
});

sizeSelect.addEventListener(
    "change",
    updateReceipt
);

toppingCheckboxes.forEach(box => {
    box.addEventListener(
        "change",
        updateReceipt
    );
});


// Update Receipt

function updateReceipt() {

    const selectedSize =
        sizeSelect.value;

    const selectedToppings = [];

    toppingCheckboxes.forEach(box => {
        if (box.checked) {
            selectedToppings.push(box.value);
        }
    });

    const base =
        calculatePrice(
            selectedSize,
            selectedLength
        );

    const toppingCost =
        calculateToppingsPrice(
            selectedToppings
        );

    const subtotal = base + toppingCost;

    const finalAmount = subtotal * 0.9;

    document.getElementById(
        "pizzaTitle"
    ).textContent =
        `${selectedLength.toUpperCase()} ${selectedSize.toUpperCase()} CRUST PIZZA`;

    document.getElementById(
        "basePrice"
    ).textContent =
        `$${base.toFixed(2)}`;

    document.getElementById(
        "toppingsPrice"
    ).textContent =
        `$${toppingCost.toFixed(2)}`;

    document.getElementById(
        "subtotal"
    ).textContent =
        `$${subtotal.toFixed(2)}`;

    document.getElementById(
        "totalPrice"
    ).textContent =
        `$${finalAmount.toFixed(2)}`;
}


// Initial Load
updateReceipt();


// Place Order

document.getElementById("orderBtn")
.addEventListener("click", () => {

    alert("🍕 Order Placed Successfully!");
});