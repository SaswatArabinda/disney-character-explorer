import { css } from "lit";

export default css`
  .tabs {
    display: flex;
    gap: 0;
    margin-bottom: 16px;
    border-bottom: 2px solid #ccc;
  }

  .tab {
    padding: 10px 20px;
    border: 1px solid transparent;
    border-bottom: none;
    background: transparent;
    cursor: pointer;
    font-size: 14px;
    color: #555;
    transition: all 0.2s ease;
    position: relative;
    top: 2px;
  }

  .tab:hover {
    color: #000;
  }

  .tab.active {
    border: 1px solid #ccc;
    border-bottom: 2px solid #fff;
    background: #fff;
    font-weight: bold;
    color: #000;
    z-index: 1;
  }
`;
