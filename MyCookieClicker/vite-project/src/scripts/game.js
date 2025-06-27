import { ClickableArea } from "./clickable-area";
import { Shop } from "./shop.js";
import { RandomSpawn } from "./random-spawn.js";
import "../styles/game.css";

export class Game {
  // Game Properties
  clicks = 0;

  // Game Elements
  gameElement = null;
  scoreElement = null;
  shop = null;
  randomSpawn = null;

  // Game Components
  clickableArea = null;

  constructor(config = {}) {
    // Récupère les valeurs de config ou valeurs par défaut
    this.clicks = config.clicks || 0;

    // Récupère l'élément avec l'id game.
    this.gameElement = document.querySelector("#game");
    // Crée le composant ClickableArea qui gère la logique de la zone cliquable.
    this.clickableArea = new ClickableArea(
      this.gameElement,
      this.onClickableAreaClick
    );

    this.shop = new Shop(this.gameElement);

    // Si config contient des données de shop, appliquer ici
    if (config.shopPurchases) {
      this.shopPurchases = config.shopPurchases;
      if (this.shopPurchases.cursorCount) {
        this.shop.cursorCount = this.shopPurchases.cursorCount;
      }
    } else {
      this.shopPurchases = { cursorCount: 0 };
    }
  }

  // Lance le jeu
  start() {
    this.render();
    this.startPassiveIncome();

    this.randomSpawn = new RandomSpawn(this, this.clickableArea);
    this.randomSpawn.start();
  }

  // Génère les éléments à afficher.
  render() {
    this.renderScore();
    this.clickableArea.render();

    this.shop.render();
    this.shop.onBuyCursor((price) => {
      if (this.clicks >= price) {
        this.clicks -= price;
        this.shop.incrementCursorCount();
        this.shopPurchases.cursorCount = this.shop.cursorCount;
        this.updateScore();
        this.save(); // Sauvegarder à chaque achat
      }
    });
  }

  // Génère l'affichage du score.
  renderScore() {
    this.scoreElement = document.createElement("section");
    this.scoreElement.id = "game-score";
    this.gameElement.append(this.scoreElement);
    this.updateScore();
  }

  // Met à jour l'affichage du score.
  updateScore() {
    this.scoreElement.innerHTML = `
        <span>${this.clicks.toFixed(0)} clicks</span>
    `;
    this.save(); // Sauvegarder à chaque update de score
  }

  // Fonction fléchée pour garder le contexte "this"
  onClickableAreaClick = () => {
    this.clicks += 1;
    window.requestAnimationFrame(() => {
      this.updateScore();
    });
  };

  startPassiveIncome() {
    setInterval(() => {
      const income = this.shop.getPassiveIncomePerSecond();
      if (income > 0) {
        this.clicks += income;
        this.updateScore();
      }
    }, 1000);
  }

  // Sauvegarder la config dans localStorage
  save() {
    const saveConfig = {
      clicks: this.clicks,
      shopPurchases: this.shopPurchases,
    };
    localStorage.setItem("cookieGameSave", JSON.stringify(saveConfig));
  }

  // Charger la config depuis localStorage
  load() {
    const saved = localStorage.getItem("cookieGameSave");
    if (saved) {
      const config = JSON.parse(saved);
      this.clicks = config.clicks || 0;
      this.shopPurchases = config.shopPurchases || { cursorCount: 0 };

      if (this.shopPurchases.cursorCount) {
        this.shop.cursorCount = this.shopPurchases.cursorCount;
      }
    }
  }
}
