import { css } from "lit";

export default css`
  .container {
    max-width: 1024px;
    margin: 0 auto;
    padding: 16px;
    height: 100vh;
    overflow-y: auto;
  }

  .filters {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 20px;
  }

  .character-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
  }

  .loading {
    text-align: center;
    margin-top: 40px;
    font-size: 18px;
  }
`;
