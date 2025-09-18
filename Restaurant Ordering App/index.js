import menuArray from "./data.js";

const order = []; // holds menuArray

const renderBtn = () => {
  document.querySelectorAll(".add-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const menuId = Number(e.target.dataset.id);
      const targetId = menuArray.find((item) => item.id === menuId);
      if (targetId) {
        order.push(targetId);
        renderOrder();
      }
    });
  });
};

// remove feature
const removeOrder = (id) => {
  const index = order.findIndex((item) => item.id === id);
  if (index !== -1) {
    order.splice(index, 1);
    renderOrder();
  }
};

// format name for thank you message
const formatName = (name) => {
  return name
    .trim()
    .split(/\s+/) // regex for white spaces
    .map((word) => word[0].toUpperCase() + word.substring(1).toLowerCase())
    .join(" ");
};

// remove and complete order listener
document.addEventListener("click", (e) => {
  const modal = document.querySelector(".modal");
  // remove order logic
  if (e.target.classList.contains("remove-btn")) {
    const id = +e.target.getAttribute("data-remove");
    removeOrder(id);
  }

  // complete order logic
  if (e.target.classList.contains("payment-btn")) {
    modal.classList.add("show");
  }

  // pay logic
  if (e.target.classList.contains("form-btn")) {
    e.preventDefault();
    const name = document.querySelector(".name-input").value;
    modal.classList.remove("show");

    document.querySelector(".order-container").innerHTML = `
    <div class="thank-you-message">
      Thanks, ${formatName(name)}! Your order is on its way!
    </div>
    `;
  }

  // cancel order logic
  if (e.target.classList.contains("cancel-btn")) {
    modal.classList.remove("show");
  }
});

const renderOrder = () => {
  const total = order.reduce((total, current) => total + current.price, 0);
  let html = `<h1 class="order-title" >Your Order</h1>`;

  order.forEach((menu) => {
    html += `
          <div class="order-item">
            <div class="order-row">
              <div class="order-name-remove">
                <span class="order-name"><h2>${menu.name}</h2></span>
                <span class="remove-btn" data-remove="${menu.id}" >remove</span>
              </div>
              <span class="order-price">$${menu.price}</span>
            </div>
          </div>
          `;
  });
  html += `
        <hr class="secondary-hr" />
        <div class="wrapper">
          <div class="item">
            <h2>Total Price:</h2>
            <p class="order-price">$${total}</p>
          </div>
          <button class="payment-btn" >Complete order</button>
        </div>
        `;

  document.querySelector(".order-container").innerHTML = html;
};

const renderHtml = () => {
  return menuArray
    .map((menu) => {
      const { name, ingredients, id, price, image } = menu;
      return `
      <div class="menu-item">
          <div class="item-list">
            <img src="${image}" alt="" />

            <ul>
              <li><h2>${name}</h2></li>
              <li><p>${ingredients.join(", ")}</p></li>
              <li>$${price}</li>
            </ul>
          </div>
          <button class="add-btn" data-id=${id} >+</button>
        </div>
        <hr class="main-hr" />
    `;
    })
    .join("");
};

const render = () => {
  document.querySelector(".menu-container").innerHTML = renderHtml();
  renderBtn();
};

render();
