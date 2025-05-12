import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./components/search-bar";
import "./components/filter-panel";
import "./components/character-card";
import "./components/character-tabs";
import styles from "./styles/my-element-styles";
import { Character, FilterCriteria } from "./types";

@customElement("my-element")
export class MyElement extends LitElement {
  @state() private allCharacters: Character[] = [];
  @state() private characters: Character[] = [];
  @state() private searchTerm = "";
  @state() private filters: FilterCriteria = {
    franchise: "",
    role: "",
    era: "",
  };
  @state() private isLoading = false;
  @state() private currentPage = 1;
  @state() private hasNextPage = true;

  static override styles = styles;

  override async firstUpdated() {
    const params = new URLSearchParams(window.location.search);
    this.filters = {
      franchise: (params.get("franchise") as FilterCriteria["franchise"]) || "",
      role: params.get("role") || "",
      era: params.get("era") || "",
    };
    this.searchTerm = params.get("search")?.toLowerCase() || "";

    const container = this.shadowRoot?.querySelector(".container");
    container?.addEventListener("scroll", () => this.handleScroll(container));
    await this.fetchCharacters();
  }

  private async fetchCharacters(page = 1, pageSize = 50) {
    this.isLoading = true;
    try {
      const response = await fetch(
        `https://api.disneyapi.dev/character?page=${page}&pageSize=${pageSize}`
      );
      const data = await response.json();

      this.allCharacters =
        page === 1 ? data.data : [...this.allCharacters, ...data.data];
      this.hasNextPage = !!data.info?.nextPage;

      sessionStorage.setItem(
        "disneyCharacters",
        JSON.stringify(this.allCharacters)
      );
      this.applyFilters();
    } catch (error) {
      console.error("Failed to fetch characters:", error);
      this.characters = [];
    } finally {
      this.isLoading = false;
    }
  }

  private handleScroll(container: Element | null) {
    if (!container) return;
    const scrollBottom =
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - 5;
    if (scrollBottom && !this.isLoading && this.hasNextPage) {
      this.currentPage++;
      this.fetchCharacters(this.currentPage);
    }
  }

  private handleSearch(e: CustomEvent<string>) {
    this.searchTerm = e.detail.toLowerCase();
    this.updateUrlParams();
    this.applyFilters();
  }

  private handleFilterChange(e: CustomEvent<FilterCriteria>) {
    this.filters = e.detail;
    this.updateUrlParams();
    this.applyFilters();
  }

  private updateUrlParams() {
    const params = new URLSearchParams();
    if (this.searchTerm) params.set("search", this.searchTerm);
    if (this.filters.franchise) params.set("franchise", this.filters.franchise);
    if (this.filters.role) params.set("role", this.filters.role);
    if (this.filters.era) params.set("era", this.filters.era);
    history.replaceState(null, "", `?${params.toString()}`);
  }

  private matchesSearch(char: Character): boolean {
    return this.searchTerm
      ? char.name.toLowerCase().includes(this.searchTerm)
      : true;
  }

  private matchesFranchise(char: Character): boolean {
    const key = this.filters.franchise;
    return key ? Array.isArray(char[key]) && char[key].length > 0 : true;
  }

  private applyFilters() {
    this.characters = this.allCharacters.filter(
      (char) => this.matchesSearch(char) && this.matchesFranchise(char)
    );
  }

  override render() {
    return html`
      <div class="container">
        <div class="filters">
          <search-bar
            .allCharacters=${this.allCharacters}
            .prefilled=${this.searchTerm}
            @search=${this.handleSearch}
          ></search-bar>

          <filter-panel
            .characters=${this.allCharacters}
            .selected=${this.filters}
            @filter-change=${this.handleFilterChange}
          ></filter-panel>
        </div>

        <character-tabs>
          <div slot="all">
            <div class="character-list">
              ${this.characters.map(
                (char) =>
                  html`<character-card
                    .character=${char}
                    .searchTerm=${this.searchTerm}
                  ></character-card> `
              )}
            </div>
            ${this.isLoading ? html`<div class="loading">Loading...</div>` : ""}
          </div>
        </character-tabs>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-element": MyElement;
  }
}
