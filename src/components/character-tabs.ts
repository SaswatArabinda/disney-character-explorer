import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./favorites-panel";
import style from "../styles/character-tab-styles";

@customElement("character-tabs")
export class CharacterTabs extends LitElement {
  @state() private activeTab: "all" | "favorites" = "all";

  static override styles = style;

  private setTab(tab: "all" | "favorites") {
    this.activeTab = tab;
  }

  override render() {
    return html`
      <div class="tabs">
        <div
          class="tab ${this.activeTab === "all" ? "active" : ""}"
          @click=${() => this.setTab("all")}
        >
          All Characters
        </div>
        <div
          class="tab ${this.activeTab === "favorites" ? "active" : ""}"
          @click=${() => this.setTab("favorites")}
        >
          Favorites
        </div>
      </div>

      ${this.activeTab === "all"
        ? html`<slot name="all"></slot>`
        : html`<favorites-panel></favorites-panel>`}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "character-tabs": CharacterTabs;
  }
}
