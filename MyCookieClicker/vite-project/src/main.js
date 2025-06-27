import "./styles/style.css";
import { Game } from "./scripts/game.js";

document.querySelector("#app").innerHTML = `
    <h1>Welcome to my Clicker!</h1>
    <main id="game">
    </main>
`;

const game = new Game();

game.load();

game.start();
