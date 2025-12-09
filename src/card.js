export class Card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const title = this.getAttribute('title');
    const body = this.getAttribute('body');
    const createdAt = this.getAttribute('createdAt');

    this.shadowRoot.innerHTML = `
      <style>
        .note {
          border: 1px solid #ddd;
          padding: 16px;
          border-radius: 10px;
          width: 240px;
          background: #fff;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        .note:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }
        .title {
          font-weight: 600;
          margin-bottom: 8px;
          font-size: 16px;
        }
        .body {
          font-size: 14px;
          margin-bottom: 10px;
          color: #555;
        }
        .date {
          font-size: 12px;
          color: gray;
        }
      </style>

      <div class="note">
        <div class="title">${title}</div>
        <div class="body">${body}</div>
        <div class="date">${new Date(createdAt).toLocaleString()}</div>
      </div>
    `;
  }
}

customElements.define('my-note', Card);
