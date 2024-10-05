const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");


cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});


if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", start);

} else {
    start();
}

function start() {
    addEvents();
}

function update() {
    addEvents();
    updateTotal();
}

function addEvents() {
    let cartRemove_btns = document.querySelectorAll(".cart-remove");

    console.log(cartRemove_btns);


    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click", handle_removeCartItem)
    });


    let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");


    cartQuantity_inputs.forEach((input) => {
        input.addEventListener("change", handle_changeItemQuantity);
    });


    let addCarts_btns = document.querySelectorAll(".add-cart");
    addCarts_btns.forEach((btn) => {
        btn.addEventListener("click", handle_addCartItem);
    });

}

const buy_btn = document.querySelector(".btn-buy");
buy_btn.addEventListener("click", handle_buyOrden);

let itemsAdded = [];

function handle_addCartItem() {
    let product = this.parentElement;

    let title = product.querySelector(".product-title").textContent;
    let price = product.querySelector(".product-price").textContent;
    let imgSrc = product.querySelector(".product-img").src;


    console.log(title, price, imgSrc);



    let newToAdd = {
        title,
        price,
        imgSrc,

    };

    if (itemsAdded.find((el) => el.title == newToAdd.title)) {
        alert("Este artículo ya existe");
        return;
    } else {
        itemsAdded.push(newToAdd);
    }

    let carBoxElement = cartBoxComponent(title, price, imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = carBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);
    update();


}

function handle_removeCartItem() {
    this.parentElement.remove();

    itemsAdded = itemsAdded.filter(
        (el) => el.title != this.parentElement.querySelector(".cart-product.title").innerHTML
    );

    update();

}


function handle_changeItemQuantity() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    this.value = Math.floor(this.value);

    update();


}

function handle_buyOrden() {
    if (itemsAdded.length <= 0) {
        alert("Aún no hay productos para comprar \nPor favor, seleccione algún producto");
        return;
    }

    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML = "";
    alert("Su pedido se realizó exitosamente");
    itemsAdded = [];
    update();
}

function updateTotal() {
    let cartBoxes = document.querySelectorAll(".cart-box");
    let total = 0;

    cartBoxes.forEach((cartBox) => {
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerText.replace("$", ""));
        let quantity = cartBox.querySelector(".cart-quantity").value;

        total += price * quantity;
    });

    total = total.toFixed(5);


    const totalElement = document.querySelector(".total-price");
    totalElement.innerText = "$" + total;
}


function cartBoxComponent(title, price, imgSrc) {

    return `
    
<div class="cart-box">

<img src=${imgSrc} alt ="" class="cart-img">

<div class="detail-box">

<div class="cart-product-title">${title}</div>


    <div class = "cart-price">${price}</div>
    <input type = "number" value="1" class= "cart-quantity">

</div>

<i class='bx bxs-trash cart-remove'></i>
    </div>

    `;
}
