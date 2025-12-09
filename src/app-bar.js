export class AppBar extends HTMLElement {
  static get observedAttributes() {
    return ['theme'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const theme = this.getAttribute('theme') || 'blue';
    this.innerHTML = `<div style="text-transform: uppercase; font-weight:600; font-size:18px;">Notes App</div>`;
  }
}

customElements.define('app-bar', AppBar);
