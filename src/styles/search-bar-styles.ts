import { css } from "lit";

export default css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  .suggestion-container {
    position: relative;
    width: 100%;
  }

  input {
    padding: 10px 14px;
    width: 100%;
    font-size: 15px;
    border: 1px solid #ccc;
    border-radius: 6px;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  input:focus {
    border-color: #0078d4;
    box-shadow: 0 0 0 2px rgba(0, 120, 212, 0.2);
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    border: 1px solid #ccc;
    border-top: none;
    max-height: 180px;
    overflow-y: auto;
    background-color: #fff;
    position: absolute;
    width: 100%;
    z-index: 10;
    border-radius: 0 0 6px 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  li {
    padding: 10px 14px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
  }

  li:hover {
    background-color: #f5f5f5;
  }
`;
