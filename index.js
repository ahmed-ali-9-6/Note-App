import { addNavBtn, app, notesNavBtn, plusIconBtn, archiveNotes, arrowIconBtn, inputTitleElement, inputAuthorElement, inputNoteElement,
actionBtnAddElement, actionBtnPinnedElement, pinnedListElement, notesListElement, viewNotesElement, getDeletePinnedBtns, getDeleteNoteBtns,
pinnedItemElements, noteItemElements, sectionElement, viewCloseIcon, inputSearchBar} from "./scripts/elements.js";

notesNavBtn.addEventListener("click", () => app.classList.remove("switch-section"));

addNavBtn.addEventListener("click", () => app.classList.add("switch-section"));

plusIconBtn.addEventListener("click", () => app.classList.add("switch-section"));

arrowIconBtn.addEventListener("click", () => archiveNotes.classList.toggle("archive-close"));

const today  = new Date();
const options = { year: 'numeric', month: 'short', day: 'numeric' };
const dateFormatter = new Intl.DateTimeFormat('en-US', options);
const date = dateFormatter.format(today);

const fetchData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : false;
};

const renderNoteList = (notes) => {
  let noteItem = "";
    notes.forEach((note) => {
      noteItem += `
              <li class="note-item">
                <div class="note-box">
                  <h3 class="note-title">${note.title}</h3>
                  <p class="note-text">
                    ${note.noteText}
                  </p>
                </div>
                <div class="note-footer">
                  <div>
                    <span class="note-date">${note.date}</span>
                    <span class="note-author">/ By ${note.author}</span>
                  </div>
                  <button class="delete-note-btn">Delete</button>
                </div>
              </li>
      `
    });
    notesListElement.innerHTML = noteItem;
    inputTitleElement.value = "";
    inputAuthorElement.value = "";
    inputNoteElement.value = "";
}

const renderPinnedNoteList = (notes) => {
  let noteItem = "";
    notes.forEach((note) => {
      noteItem += `
              <li class="pinned-item">
                <div class="note-box">
                  <h3 class="note-title">${note.title}</h3>
                  <p class="note-text">
                    ${note.noteText}
                  </p>
                </div>
                <div class="note-footer">
                  <div>
                    <span class="note-date">${note.date}</span>
                    <span class="note-author">/ By ${note.author}</span>
                  </div>
                  <button class="delete-pinned-btn">Delete</button>
                </div>
              </li>
      `
    });
    pinnedListElement.innerHTML = noteItem;
    inputTitleElement.value = "";
    inputAuthorElement.value = "";
    inputNoteElement.value = "";
}

const addNote = (e) => {
  e.preventDefault();
  const title = inputTitleElement.value;
  const author = inputAuthorElement.value;
  const noteText = inputNoteElement.value;

  if (!title || !author || !noteText) return;


  const note = {
    title: title,
    author: author,
    noteText: noteText,
    date: date, 
  }

  const notes = fetchData("notes") || [];

  notes.push(note);
  saveToDB("notes", notes);
  renderNoteList(notes);
  initListListeners();
}

actionBtnAddElement.addEventListener("click", (e) => addNote(e));

const addPinnedNote = (e) => {
  e.preventDefault();
  const title = inputTitleElement.value;
  const author = inputAuthorElement.value;
  const noteText = inputNoteElement.value;

  if (!title || !author || !noteText) return;

  const note = {
    title: title,
    author: author,
    noteText: noteText,
    date: date, 
  }

  const notes = fetchData("pinned-notes") || [];

  notes.push(note);
  saveToDB("pinned-notes", notes);
  renderPinnedNoteList(notes);
  initListListeners();
}

actionBtnPinnedElement.addEventListener("click", (e) => addPinnedNote(e));


const deleteNote = (e, index) => {
  const answer = confirm("هل انت متأكد من حذف الملاحظة؟");
  if(!answer) return;
  const notes = fetchData("notes");

  notes.splice(index, 1);
  saveToDB("notes", notes);
  
  renderNoteList(notes);
  initListListeners();
};

const deletePinned = (e, index) => {
  const answer = confirm("هل انت متأكد من حذف الملاحظة؟");
  if(!answer) return;
  const notes = fetchData("pinned-notes");

  notes.splice(index, 1);
  saveToDB("pinned-notes", notes);
  
  renderPinnedNoteList(notes);
  initListListeners();
};

const initNoteListeners = () => {
  getDeleteNoteBtns().forEach((icon, index) => {
    icon.addEventListener("click", (e) => deleteNote(e, index));
  });

  getDeletePinnedBtns().forEach((icon, index) => {
    icon.addEventListener("click", (e) => deletePinned(e, index));
  });
};

const renderViewNote = (note) => {
  let viewNoteItem = "";
    viewNoteItem = `
    <h3 class="view-title">${note.title}</h3>
            <div class="view-box">
              <span class="view-date">${note.date}</span>
              <span class="view-author">/ By ${note.author}</span>
            </div>
            <p class="view-note">
              ${note.noteText}
            </p>
    `
    viewNotesElement.innerHTML = viewNoteItem;
};

const renderViewPinnedNote = (note) => {
  let viewPinnedItem = "";
  viewPinnedItem = `
    <h3 class="view-title">${note.title}</h3>
            <div class="view-box">
              <span class="view-date">${note.date}</span>
              <span class="view-author">/ By ${note.author}</span>
            </div>
            <p class="view-note">
              ${note.noteText}
            </p>
    `
    viewNotesElement.innerHTML = viewPinnedItem;
};

const viewNote = (e, index) => {
  const notes = fetchData("notes");
  
  renderViewNote(notes[index]);
};

const viewPinnedNote = (e, index) => {
  const notes = fetchData("pinned-notes");
  
  renderViewPinnedNote(notes[index]);
};

const initViewNote = () => {
  noteItemElements().forEach((icon, index) => {
    icon.addEventListener("click", (e) => viewNote(e, index));
    icon.addEventListener("click", (e) => noteChecked());
  });
  
  pinnedItemElements().forEach((icon, index) => {
    icon.addEventListener("click", (e) => viewPinnedNote(e, index));
    icon.addEventListener("click", (e) => noteChecked());
  });
};

const noteChecked = () => {
  sectionElement.classList.add("note-checked");
};

viewCloseIcon.addEventListener("click", () => sectionElement.classList.remove("note-checked"));


const searchNote = (e) => {
  const value = e.target.value.toLowerCase(); 
  noteItemElements().forEach((note) => {
    const titleElement = note.querySelector(".note-title");
    const title = titleElement.textContent.toLowerCase(); 
    const selected = title.includes(value);
    if(inputSearchBar.value) {
      note.classList.toggle("bg-select-search", selected);
    } else {
      note.classList.remove("bg-select-search", selected);
    }
    });
}

inputSearchBar.addEventListener("input", (e) => searchNote(e));


const searchPinnedNote = (e) => {
  const value = e.target.value.toLowerCase(); 
  pinnedItemElements().forEach((note) => {
    const titleElement = note.querySelector(".note-title");
    const title = titleElement.textContent.toLowerCase(); 
    const selected = title.includes(value);
    if(inputSearchBar.value) {
      note.classList.toggle("bg-select-search", selected);
    } else {
      note.classList.remove("bg-select-search", selected);
    }
    });
}

inputSearchBar.addEventListener("input", (e) => searchPinnedNote(e));


const saveToDB = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const initListListeners = () => {
  initNoteListeners();
  initViewNote();
}

const initDataStratup = () => {
  renderNoteList(fetchData("notes"));
  renderPinnedNoteList(fetchData("pinned-notes"));
};


initDataStratup();
initListListeners();

