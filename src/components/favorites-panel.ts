import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./character-card";
import { Character } from "../types";

@customElement("favorites-panel")
export class FavoritesPanel extends LitElement {
  @state() private favorites: Character[] = [];

  static override styles = css`
    .panel {
      padding: 16px;
    }
    .title {
      font-size: 20px;
      margin-bottom: 12px;
    }
    .list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 12px;
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
    this.loadFavorites();
    window.addEventListener("favorites-updated", this.loadFavorites);
  }

  private loadFavorites = () => {
    const stored = localStorage.getItem("favorites") || "[]";
    this.favorites = JSON.parse(stored);
  };

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("favorites-updated", this.loadFavorites);
  }

  override render() {
    return html`
      <div class="panel">
        <div class="title">Favorite Characters</div>
        <div class="list">
          ${this.favorites.map(
            (char) => html`<character-card .character=${char}></character-card>`
          )}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "favorites-panel": FavoritesPanel;
  }
}
