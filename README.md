# Disney Character Explorer

## Component Breakdown

The app is built using Web Components powered by Lit. Key components:

- `<my-element>`: Root container for search, filters, and results.
- `<search-bar>`: Input with autocomplete support for character names.
- `<filter-panel>`: Dropdown filters for franchise, role, and era.
- `<character-card>`: Individual character display with favorite toggle.
- `<character-tabs>`: Tabbed navigation between "All Characters" and "Favorites".
- `<favorites-panel>`: Displays a list of locally saved favorite characters.

## Filter Architecture

The filtering system is driven by local state:

- `franchise`: Matches against available media types (`films`, `tvShows`, etc.)
- `role`: Currently not implemented; UI shows it as inactive.
- `era`: Currently not implemented; UI shows it as inactive.

Filters are updated via custom events (`@filter-change`) and kept in sync with the URL using `URLSearchParams`.

## UI Performance on Large Data Sets

The app supports infinite scroll:

- Loads 50 characters per API page
- Appends data while preserving scroll state
- Filters and searches are done client-side
- Favorites are persisted using `localStorage`
- Debounced search implemented


## Setup

```bash
npm i
```

## Build

```bash
npm run build
```

```bash
npm run build:watch
```

## Testing

```bash
npm test
```

```bash
npm test:watch
```

## Dev Server

```bash
npm run serve
```

## Linting

```bash
npm run lint
```

## Formatting

```bash
npm run format
```
