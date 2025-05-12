import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import style from "../styles/character-card-styles";
import { Character } from "../types";

@customElement("character-card")
export class CharacterCard extends LitElement {
  @property({ type: Object }) character: Character = {
    _id: "",
    name: "",
    films: [],
    shortFilms: [],
    tvShows: [],
    videoGames: [],
    parkAttractions: [],
    allies: [],
    enemies: [],
  };
  @property({ type: String }) searchTerm = "";

  @state() private isFavorite = false;

  static override styles = style;

  private highlightText(text: string): unknown {
    if (!this.searchTerm) return text;
    const regex = new RegExp(`(${this.searchTerm})`, "gi");
    const parts = text.split(regex);
    return html`${parts.map((part) =>
      part.toLowerCase() === this.searchTerm.toLowerCase()
        ? html`<mark>${part}</mark>`
        : part
    )}`;
  }

  override firstUpdated() {
    const favorites = this.getFavorites();
    this.isFavorite = favorites.some((f) => f._id === this.character._id);
  }

  private getFavorites(): Character[] {
    try {
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    } catch {
      return [];
    }
  }

  private updateFavorites(favorites: Character[]) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    this.dispatchEvent(
      new CustomEvent("favorites-updated", {
        bubbles: true,
        composed: true,
      })
    );
  }

  private toggleFavorite() {
    let favorites = this.getFavorites();

    if (this.isFavorite) {
      favorites = favorites.filter((f) => f._id !== this.character._id);
    } else {
      favorites.push(this.character);
    }

    this.updateFavorites(favorites);
    this.isFavorite = !this.isFavorite;
  }

  override render() {
    const {
      name,
      imageUrl,
      films = [],
      shortFilms = [],
      tvShows = [],
      videoGames = [],
    } = this.character;

    const mediaInfo = [
      { label: "Film", data: films },
      { label: "Short Film", data: shortFilms },
      { label: "TV Show", data: tvShows },
      { label: "Video Game", data: videoGames },
    ].filter(({ data }) => data.length > 0);

    return html`
      <div class="card">
        <div class="favorite" @click=${this.toggleFavorite}>
          ${this.isFavorite ? "★" : "☆"}
        </div>

        ${imageUrl
          ? html`<img src="${imageUrl}" alt="${name}" />`
          : html`<div>No image available</div>`}

        <div class="name">${this.highlightText(this.character.name)}</div>

        ${mediaInfo.map(
          ({ label, data }) =>
            html`<div class="info">${label}: ${data[0]}</div>`
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "character-card": CharacterCard;
  }
}
