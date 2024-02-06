"use strict";

const listElement = document.querySelector("#list");
const inputElement = document.querySelector("#input");
const createButton = document.getElementById("create");
const notes = [];

function render() {
  listElement.innerHTML = "";
  if (notes.length === 0) {
    listElement.innerHTML = "<p>Нет заметок</p>";
  }
  for (let i = 0; i < notes.length; i++) {
    listElement.insertAdjacentHTML("beforeend", getNoteTemplate(notes[i], i));
  }
}

render();

createButton.onclick = function () {
  if (inputElement.value === "") {
    return;
  }

  const newNote = {
    title: inputElement.value,
    completed: false,
  };

  notes.push(newNote);

  if (notes.length === 1) {
    let noNotes = document.querySelector("p");
    listElement.removeChild(noNotes);
  }

  listElement.insertAdjacentHTML(
    "beforeend",
    getNoteTemplate(notes.at(-1), notes.length - 1)
  );
  inputElement.value = "";
};

listElement.onclick = function (event) {
  if (event.target.dataset.index) {
    const index = Number(event.target.dataset.index);
    const type = event.target.dataset.type;

    if (type === "toggle") {
      notes[index].completed = !notes[index].completed;
    } else if (type === "remove") {
      notes.splice(index, 1);
    }
    render();
  }
};

function getNoteTemplate(note, index) {
  return `<li
  class="list-group-item d-flex justify-content-between align-items-center"
>
  <span class="${
    note.completed ? "text-decoration-line-through" : ""
  }" data-index="${index}">${note.title}</span>
  <span>
    <span class="btn btn-small btn-${
      note.completed ? "warning" : "success"
    }" data-index="${index}" data-type="toggle">&check;</span>
    <span class="btn btn-small btn-danger" data-index="${index}" data-type="remove">&times;</span>
  </span>
</li>`;
}
