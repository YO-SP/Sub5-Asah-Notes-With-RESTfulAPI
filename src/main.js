import './style.css';
import './app-bar.js';
import './card.js';
import './note-form.js';

const API_BASE = 'https://notes-api.dicoding.dev/v2';
const container = document.getElementById('mainNotesContainer');
const loadingEl = document.getElementById('loading');

function showLoading(show = true) {
  if (show) loadingEl.classList.remove('hidden');
  else loadingEl.classList.add('hidden');
}

async function fetchNotes() {
  showLoading(true);
  try {
    const response = await fetch(`${API_BASE}/notes`);
    const result = await response.json();

    if (result.status === 'success') {
      renderNotes(result.data);
    } else {
      container.innerHTML = '<p>Gagal memuat catatan.</p>';
    }
  } catch (error) {
    console.error(error);
    container.innerHTML = '<p>Terjadi kesalahan koneksi.</p>';
  } finally {
    showLoading(false);
  }
}

async function addNote(note) {
  showLoading(true);
  try {
    const response = await fetch(`${API_BASE}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: note.title,
        body: note.body,
      }),
    });

    const result = await response.json();
    if (result.status === 'success') {
      await fetchNotes();
    } else {
      alert('Gagal menambahkan catatan!');
    }
  } catch (error) {
    alert('Terjadi kesalahan jaringan!');
  } finally {
    showLoading(false);
  }
}

async function deleteNote(id) {
  showLoading(true);
  try {
    const response = await fetch(`${API_BASE}/notes/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();

    if (result.status === 'success') {
      await fetchNotes();
    } else {
      alert('Gagal menghapus catatan!');
    }
  } catch (error) {
    alert('Terjadi kesalahan jaringan!');
  } finally {
    showLoading(false);
  }
}

function renderNotes(notes) {
  container.innerHTML = '';
  notes.forEach((note) => {
    const noteWrapper = document.createElement('div');
    noteWrapper.style.display = 'flex';
    noteWrapper.style.flexDirection = 'column';
    noteWrapper.style.alignItems = 'flex-start';

    const card = document.createElement('my-note');
    card.setAttribute('id', note.id);
    card.setAttribute('title', note.title);
    card.setAttribute('body', note.body);
    card.setAttribute('createdAt', note.createdAt);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Hapus';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = () => deleteNote(note.id);

    noteWrapper.appendChild(card);
    noteWrapper.appendChild(deleteBtn);

    container.appendChild(noteWrapper);
  });
}

document.addEventListener('note-added', async (e) => {
  await addNote(e.detail);
});

fetchNotes();
