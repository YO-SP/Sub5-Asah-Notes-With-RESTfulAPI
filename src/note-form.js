export class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        input, textarea, button {
          font-size: 14px;
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-family: inherit;
        }
        input:focus, textarea:focus {
          outline: none;
          border-color: var(--primary-color);
        }
        button {
          background-color: var(--primary-color, #4a69bd);
          color: white;
          border: none;
          cursor: pointer;
          transition: background 0.3s;
        }
        button:hover {
          background-color: #3b5bdb;
        }
        .error {
          color: red;
          font-size: 12px;
          text-align: left;
        }
      </style>
      <form id="noteForm">
        <input type="text" id="titleInput" placeholder="Judul catatan" required>
        <div class="error" id="titleError"></div>

        <textarea id="bodyInput" rows="4" placeholder="Isi catatan" required></textarea>
        <div class="error" id="bodyError"></div>

        <button type="submit">Tambah Catatan</button>
      </form>
    `;

    const form = this.shadowRoot.getElementById('noteForm');
    const titleInput = this.shadowRoot.getElementById('titleInput');
    const bodyInput = this.shadowRoot.getElementById('bodyInput');
    const titleError = this.shadowRoot.getElementById('titleError');
    const bodyError = this.shadowRoot.getElementById('bodyError');

    const validate = () => {
      let valid = true;
      if (titleInput.value.trim() === '') {
        titleError.textContent = 'Judul tidak boleh kosong';
        valid = false;
      } else titleError.textContent = '';

      if (bodyInput.value.trim() === '') {
        bodyError.textContent = 'Isi catatan tidak boleh kosong';
        valid = false;
      } else bodyError.textContent = '';

      return valid;
    };

    titleInput.addEventListener('input', validate);
    bodyInput.addEventListener('input', validate);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()) return;

      const event = new CustomEvent('note-added', {
        detail: {
          title: titleInput.value,
          body: bodyInput.value,
        },
        bubbles: true,
      });

      this.dispatchEvent(event);
      form.reset();
    });
  }
}

customElements.define('note-form', NoteForm);
