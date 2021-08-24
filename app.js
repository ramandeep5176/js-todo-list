// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitbtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearbtn = document.querySelector(".clear-btn");
// edit option
let editElement;
let editFlag = false;
let editId = "";

// ****** EVENT LISTENERS **********
// submit form

form.addEventListener("submit", additem);
// clear items
clearbtn.addEventListener("click", clearItems);

// load items
window.addEventListener("DOMContentLoaded", setupItems);
// ****** FUNCTIONS **********
function additem(e) {
  e.preventDefault();
  const value = grocery.value;

  const id = new Date().getTime().toString();
  if (value && !editFlag) {
    createListItem(id, value);

    //display alert
    displayalert("item added to the list", "success");
    // show container
    container.classList.add("show-container");
    // add to local storage
    addToLocalStorage(id, value);
    //set to dafault
    setBackToDefault();
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    displayalert("edited", "success");
    // edit local storage
    editLocalStorage(editId, value);
    setBackToDefault();
  } else {
    displayalert("please enter value", "danger");
  }
}
// display alert
function displayalert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  //remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}
// clear items
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");

  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayalert("empty list", "danger");
  setBackToDefault();
  localStorage.removeItem("list");
}
// delete button
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayalert("Item Deleted", "danger");
  setBackToDefault();
  // remove from local storage
  // removeFromLocalStorage(id)
}
// edit button
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  //set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  //  set form value
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editId = element.dataset.id;
  submitbtn.textContent = "edit";
}
// set to default
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editId = "";
  submitbtn.textContent = "submit";
}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
  const grocery = { id: id, value: value };
  let items = getLocalStorage();

  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));

  // console.log("added to local storage");
}
function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });

  localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {
  let items = getLocalStorage();
  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
// local storage api
// setitem
// getitem
// remove item
// save as string
// localStorage.setItem('orange',JSON.stringify(['i','g']))
// const oranges=JSON.parse(localStorage.getItem('orange'))

// ****** SETUP ITEMS **********
function setupItems() {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value);
    });
    container.classList.add("show-container");
  }
}

function createListItem(id, value) {
  const element = document.createElement("article");
  // add class
  element.classList.add("grocery-item");
  // add id
  const attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.innerHTML = ` <p class="title">${value} </p>
            <div class="btn-container">
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div> `;
  const deletebtn = element.querySelector(".delete-btn");
  const editbtn = element.querySelector(".edit-btn");
  deletebtn.addEventListener("click", deleteItem);
  editbtn.addEventListener("click", editItem);
  // append child
  list.appendChild(element);
}
