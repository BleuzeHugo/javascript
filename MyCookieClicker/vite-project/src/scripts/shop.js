import "../styles/shop.css";
import imgShop from "../assets/icon_shop.png";

export class Shop {
  constructor(gameElement) {
    this.shopElement = null;
    this.gameElement = gameElement;
    this.cursorCount = 0;
  }

  render() {
    // Créer le panneau du shop
    const shopPanel = document.createElement("div");
    shopPanel.id = "shop";
    shopPanel.innerHTML = `
      <h2>Shop</h2>
      <div class="shop-item" id="cursor-upgrade">
        <span>Clickers :</span>
        <button id="buy-cursor">Acheter (10 clicks)</button>
        <span id="cursor-count">Acquis: 0</span>
      </div>
    `;
    document.body.appendChild(shopPanel);

    // Créer le bouton de toggle
    const toggleButton = document.createElement("button");
    toggleButton.id = "shop-toggle-button";

    const img = document.createElement("img");
    img.src = imgShop;  
    img.alt = "";                         
    img.style.width = "48px";
    img.style.height = "48px";
    img.style.transition = "transform 0.3s ease";
    img.style.pointerEvents = "none";

    toggleButton.appendChild(img); // ← uniquement l'image dans le bouton
    document.body.appendChild(toggleButton);

    // Toggle shop
    toggleButton.addEventListener("click", () => {
      const isHidden = shopPanel.classList.toggle("hidden");
      toggleButton.style.right = isHidden ? "0" : "250px";
    });

    this.shopElement = shopPanel;
    this.updateCursorDisplay();
  }

  updateCursorDisplay() {
    const button = this.shopElement.querySelector("#buy-cursor");
    const countDisplay = this.shopElement.querySelector("#cursor-count");
    const price = this.getCursorPrice();
    button.innerText = `Acheter (${price} clicks)`;
    countDisplay.innerText = `Acquis: ${this.cursorCount}`;
  }

  getCursorPrice() {
    return 10 + this.cursorCount * 3;
  }

  onBuyCursor(callback) {
    const button = this.shopElement.querySelector("#buy-cursor");
    button.addEventListener("click", () => {
      callback(this.getCursorPrice());
    });
  }

  incrementCursorCount() {
    this.cursorCount++;
    this.updateCursorDisplay();
  }

  getPassiveIncomePerSecond() {
    return this.cursorCount * 0.1;
  }
}
