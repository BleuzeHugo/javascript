import "../styles/random-spawn.css";
import cursor1 from "../assets/cursor_alea/cursor1.png";
import cursor2 from "../assets/cursor_alea/cursor2.png";
import cursor3 from "../assets/cursor_alea/cursor3.png";
import cursor4 from "../assets/cursor_alea/cursor4.png";

export class RandomSpawn {
  constructor(game, clickableArea) {
    this.game = game;
    this.clickableArea = clickableArea;

    this.cursorImages = [cursor1, cursor2, cursor3, cursor4];
    this.cursorImages.forEach((imgSrc) => {
      const img = new Image();
      img.src = imgSrc;
    });
  }

  start() {
    setInterval(() => {
      this.spawnRandomCursor();
    }, 15000);
  }

  spawnRandomCursor() {
    const click = document.createElement("img");

    const index = Math.floor(Math.random() * this.cursorImages.length);
    click.src = this.cursorImages[index];
    click.alt = `Clicker Spécial ${index}`;
    click.classList.add("random-cursor");

    const clickableRect =
      this.clickableArea.clickableAreaElement.getBoundingClientRect();
    const size = 48;
    const x = Math.random() * (clickableRect.width - size);
    const y = Math.random() * (clickableRect.height - size);

    click.style.left = `${x}px`;
    click.style.top = `${y}px`;

this.clickableArea.effectsContainer.appendChild(click);

    const income = this.game.shop.getPassiveIncomePerSecond();
    const bonus = Math.floor(Math.random() * (income * 1000 - 1) + 1);

    const remove = () => click.remove();

    click.addEventListener("click", () => {
      event.stopPropagation();
      this.game.clicks += bonus;
      this.game.updateScore();
      remove();
    });

    setTimeout(remove, 5000);
  }
}
