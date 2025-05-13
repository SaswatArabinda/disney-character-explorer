import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "../styles/filter-panel-styles";

@customElement("filter-panel")
export class FilterPanel extends LitElement {
  static override styles = styles;

  @property({ type: Object }) selected = { franchise: "", role: "", era: "" };

  @state() private franchiseOptions: { label: string; value: string }[] = [];
  @state() private roleOptions: string[] = [];
  @state() private eraOptions: string[] = [];

  override willUpdate() {
      this.generateFilterOptions();
  }

  private generateFilterOptions() {
    this.franchiseOptions = [
      { label: "Films", value: "films" },
      { label: "TV Shows", value: "tvShows" },
      { label: "Short Films", value: "shortFilms" },
      { label: "Video Games", value: "videoGames" },
    ];
    this.roleOptions = ["Hero", "Villain", "Sidekick"];
    this.eraOptions = ["Classic", "Renaissance", "Modern"];
  }

  private _onChange(key: keyof typeof this.selected, value: string) {
    const updated = { ...this.selected, [key]: value };
    this.selected = updated;
    this.dispatchEvent(
      new CustomEvent("filter-change", {
        detail: updated,
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    return html`
      <div class="filter-group">
        <select
          .value=${this.selected.franchise}
          @change=${(e: Event) =>
            this._onChange("franchise", (e.target as HTMLSelectElement).value)}
        >
          <option value="">All Franchises</option>
          ${this.franchiseOptions.map(
            (f) => html`<option value=${f.value}>${f.label}</option>`
          )}
        </select>

        <select
          .value=${this.selected.role}
          @change=${(e: Event) =>
            this._onChange("role", (e.target as HTMLSelectElement).value)}
          disabled
        >
          <option value="">All Roles</option>
          ${this.roleOptions.map((r) => html`<option value=${r}>${r}</option>`)}
        </select>

        <select
          .value=${this.selected.era}
          @change=${(e: Event) =>
            this._onChange("era", (e.target as HTMLSelectElement).value)}
          disabled
        >
          <option value="">All Eras</option>
          ${this.eraOptions.map((e) => html`<option value=${e}>${e}</option>`)}
        </select>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "filter-panel": FilterPanel;
  }
}
