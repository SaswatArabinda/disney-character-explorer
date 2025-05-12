import { css } from "lit";

export default css`
  .filter-group {
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
  }

  .dropdown-wrapper {
    display: flex;
    align-items: center;
    gap: 6px;
    flex: 1;
  }

  select {
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
  }
`;
