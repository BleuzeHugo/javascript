import ClickIMG from "../assets/Cursor_clicker.svg";

export class ClickableArea {
  gameElement = null;
  onClick = null;

  constructor(gameElement, onClick) {
    this.gameElement = gameElement;
    this.onClick = onClick;
  }

  // clickable-area.js
  // Il faut ajouter dans les propriétés de la classe
  // la propriété "clickableAreaElement"

  render() {
    // On crée un nouvel élément du DOM.
    this.clickableAreaElement = document.createElement("section");
    this.clickableAreaElement.id = "game-clickable-area";
    // On modifie son HTML.
    this.clickableAreaElement.innerHTML = `
        <img id="click" class="main-cursor" src=${ClickIMG} width="256px" height="256px" alt="An awesome click." />
    `;
    // On ajoute un listener sur l'évènement "click" à l'élément.
    this.clickableAreaElement.addEventListener("click", () => {
      // On ajoute ici la logique d'animation pour la réaction au clique.
      window.requestAnimationFrame(() => {
        this.clickableAreaElement.classList.add("active");
        setTimeout(() => {
          window.requestAnimationFrame(() => {
            this.clickableAreaElement.classList.remove("active");
          });
        }, 100);
      });
      this.onClick();
    });
    // Il faut ajouter l'élément au DOM pour pouvoir le voir
    // On l'ajoute donc à notre élément Game.
    // Crée un conteneur pour les effets (ex: curseurs spéciaux)
    this.effectsContainer = document.createElement("div");
    this.effectsContainer.id = "effects-container";
    this.clickableAreaElement.appendChild(this.effectsContainer);

    // Ajoute la zone cliquable au DOM
    this.gameElement.append(this.clickableAreaElement);
  }
}
