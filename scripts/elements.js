const app = document.querySelector(".app");
const notesNavBtn = document.querySelector(".notes-btn");
const addNavBtn = document.querySelector(".add-btn");
const plusIconBtn = document.querySelector(".plus-icon");

const archiveNotes = document.querySelector(".archive-notes");
const arrowIconBtn = document.querySelector(".arrow-icon");

const inputTitleElement = document.querySelector(".input-title");
const inputAuthorElement = document.querySelector(".input-Author");
const inputNoteElement = document.querySelector(".input-note");

const actionBtnAddElement = document.querySelector(".action-btn--add");
const actionBtnPinnedElement = document.querySelector(".action-btn--pinned");

const pinnedListElement = document.querySelector(".pinned-list");
const notesListElement = document.querySelector(".notes-list");
const viewNotesElement = document.querySelector(".view-notes");

const getDeletePinnedBtns = () => document.querySelectorAll(".delete-pinned-btn");
const getDeleteNoteBtns = () => document.querySelectorAll(".delete-note-btn");
const pinnedItemElements = () => document.querySelectorAll(".pinned-item");
const noteItemElements = () => document.querySelectorAll(".note-item");


const sectionElement = document.querySelector(".section");
const viewCloseIcon = document.querySelector(".view-cross");
const inputSearchBar = document.querySelector(".input-search");



export {
  app,
  notesNavBtn,
  addNavBtn,
  plusIconBtn,
  archiveNotes,
  arrowIconBtn,
  inputTitleElement,
  inputAuthorElement,
  inputNoteElement,
  actionBtnAddElement,
  actionBtnPinnedElement,
  pinnedListElement,
  notesListElement,
  viewNotesElement,
  getDeletePinnedBtns,
  getDeleteNoteBtns,
  pinnedItemElements,
  noteItemElements,
  sectionElement,
  viewCloseIcon,
  inputSearchBar,
};




