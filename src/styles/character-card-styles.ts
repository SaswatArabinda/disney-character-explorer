import { css } from "lit";

export default css`
  .card {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 14px;
    background-color: #fff;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
    position: relative;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  }

  .card img {
    max-width: 100%;
    height: auto;
    border-radius: 6px;
    object-fit: cover;
  }

  .name {
    font-weight: 600;
    font-size: 16px;
    margin-top: 10px;
    color: #333;
  }

  .info {
    margin-top: 6px;
    font-size: 13px;
    color: #666;
  }

  .favorite {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 18px;
    color: #f39c12;
    transition: transform 0.2s ease;
  }

  .favorite:hover {
    transform: scale(1.2);
  }

  mark {
    background-color: yellow;
    padding: 0px;
    border-radius: 2px;
  }
`;
