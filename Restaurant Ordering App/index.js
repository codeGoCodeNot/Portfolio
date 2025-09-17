import menuArray from "./data.js";

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
              <li><p>${ingredients}/p></li>
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
};

render();
