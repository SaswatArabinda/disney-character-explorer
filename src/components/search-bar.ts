import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "../styles/search-bar-styles";

@customElement("search-bar")
export class SearchBar extends LitElement {
  static override styles = styles;

  @property({ type: Array }) allCharacters: { name: string }[] = [];
  @property({ type: String }) prefilled = "";
  @state() private query = "";
  @state() private suggestions: { name: string }[] = [];
  private initializedFromPrefill = false;
  private debounceTimer: number | undefined;

  override updated() {
    if (!this.initializedFromPrefill && this.prefilled) {
      this.query = this.prefilled;
      this.suggestions = [];
      this.dispatchEvent(
        new CustomEvent("search", {
          detail: this.query,
          bubbles: true,
          composed: true,
        })
      );
      this.initializedFromPrefill = true;
    }
  }

  private _onInput(e: Event) {
    const value = (e.target as HTMLInputElement).value.trim();
    this.query = value;

    const lower = value.toLowerCase();
    this.suggestions = lower
      ? this.allCharacters
          .filter((c) => c.name.toLowerCase().includes(lower))
          .slice(0, 5)
      : [];

    clearTimeout(this.debounceTimer);
    this.debounceTimer = window.setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent("search", {
          detail: this.query,
          bubbles: true,
          composed: true,
        })
      );
    }, 300);
  }

  private _onSelect(name: string) {
    this.query = name;
    this.suggestions = [];
    this.dispatchEvent(
      new CustomEvent("character-selected", {
        detail: name,
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    return html`
      <div class="suggestion-container">
        <input
          type="text"
          placeholder="Search characters..."
          .value=${this.query}
          @input=${this._onInput}
          @blur=${() => (this.suggestions = [])}
        />
        ${this.suggestions.length > 0
          ? html`<ul>
              ${this.suggestions.map(
                (c) =>
                  html`<li @click=${() => this._onSelect(c.name)}>
                    ${c.name}
                  </li>`
              )}
            </ul>`
          : ""}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "search-bar": SearchBar;
  }
}
