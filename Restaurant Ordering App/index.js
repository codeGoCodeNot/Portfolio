import menuArray from "./data.js";

const order = [];

const addBtn = () => {
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

const renderOrder = () => {
  const total = order.reduce((total, current) => total + current.price, 0);
  let html = `<h1 class="order-title" >Your Order</h1>`;

  order.forEach((menu) => {
    html += `
          <div class="order-item">
          <div class="item">
            <h2>${menu.name}</h2>
            <span><p>remove</p></span>
            <p class="order-price">$${menu.price}</p>
          </div>
          `;
  });
  html += `
        <hr class="secondary-hr" />
          <div class="item">
            <h2>Total Price:</h2>
            <p class="order-price">$${total}</p>
          </div>
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
  addBtn();
};

render();
