document.addEventListener('DOMContentLoaded', function () {
  const noteList = document.querySelector('.note-list');
  const addButton = document.getElementById('add-button');
  const searchInput = document.getElementById('search-input');
  const showHistoryButton = document.getElementById('show-history-button');
  const historySection = document.querySelector('.history-section');
  const historyList = document.querySelector('.history-list');

  let notes = [];
  let deletedNotes = [];

  addButton.addEventListener('click', function () {
    const title = document.getElementById('note-title').value;
    const content = document.getElementById('note-content').value;

    if (title.trim() === '' || content.trim() === '') {
      alert('Title and content cannot be empty.');
      return;
    }

    const note = createNoteElement(title, content);
    notes.push(note);
    displayNotes();

    // Clear input fields
    document.getElementById('note-title').value = '';
    document.getElementById('note-content').value = '';
  });

  noteList.addEventListener('click', function (event) {
    const target = event.target;

    if (target.classList.contains('delete')) {
      const noteIndex = target.dataset.index;
      const deletedNote = notes.splice(noteIndex, 1)[0];
      deletedNotes.push(deletedNote);
      displayNotes();
    } else if (target.classList.contains('pin')) {
      const noteIndex = target.dataset.index;
      const pinnedNote = notes.splice(noteIndex, 1)[0];
      notes.unshift(pinnedNote);
      displayNotes();
    } else if (target.classList.contains('edit')) {
      const noteIndex = target.dataset.index;
      const note = notes[noteIndex];
      const newTitle = prompt('Enter new title:', note.querySelector('.note-title').textContent);
      const newContent = prompt('Enter new content:', note.querySelector('.note-content').textContent);

      if (newTitle !== null && newContent !== null) {
        note.querySelector('.note-title').textContent = newTitle;
        note.querySelector('.note-content').textContent = newContent;
      }
    }
  });

  showHistoryButton.addEventListener('click', function () {
    historySection.classList.toggle('show');
    showHistoryButton.textContent = historySection.classList.contains('show') ? 'Hide History' : 'See History';
  });

  searchInput.addEventListener('input', function () {
    const searchValue = searchInput.value.toLowerCase();

    const filteredNotes = notes.filter(note => {
      const title = note.querySelector('.note-title').textContent.toLowerCase();
      return title.includes(searchValue);
    });

    notes.forEach(note => {
      if (filteredNotes.includes(note)) {
        note.style.display = 'block';
      } else {
        note.style.display = 'none';
      }
    });
  });

  // Function to create a new note element
  function createNoteElement(title, content) {
    const note = document.createElement('div');
    note.classList.add('note');

    const noteTitle = document.createElement('div');
    noteTitle.classList.add('note-title');
    noteTitle.textContent = title;

    const noteContent = document.createElement('div');
    noteContent.classList.add('note-content');
    noteContent.textContent = content;

    const noteOptions = document.createElement('div');
    noteOptions.classList.add('note-options');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'Delete';
    deleteButton.dataset.index = notes.length - 1;

    const pinButton = document.createElement('button');
    pinButton.classList.add('pin');
    pinButton.textContent = 'Pin';
    pinButton.dataset.index = notes.length - 1;

    const editButton = document.createElement('button');
    editButton.classList.add('edit');
    editButton.textContent = 'Edit';
    editButton.dataset.index = notes.length - 1;

    const dateElement = document.createElement('div');
    dateElement.classList.add('note-date');
    dateElement.textContent = getFormattedDate();

    noteOptions.appendChild(deleteButton);
    noteOptions.appendChild(pinButton);
    noteOptions.appendChild(editButton);
    note.appendChild(noteOptions);
    note.appendChild(noteTitle);
    note.appendChild(noteContent);
    note.appendChild(dateElement);

    return note;
  }

  // Function to display notes in the note list and history section
  function displayNotes() {
    noteList.innerHTML = '';
    notes.forEach((note, index) => { // Use forEach with index
      note.querySelector('.delete').dataset.index = index; // Update delete button index
      note.querySelector('.pin').dataset.index = index; // Update pin button index
      note.querySelector('.edit').dataset.index = index; // Update edit button index
      noteList.appendChild(note);
    });

    historyList.innerHTML = '';
    deletedNotes.forEach((note, index) => {
      historyList.appendChild(note);
    });
  }

  // Function to get the formatted date and time
  function getFormattedDate() {
    const currentDate = new Date();
    return currentDate.toLocaleString();
  }
});
