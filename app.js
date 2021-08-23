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

// ****** FUNCTIONS **********
function additem(e) {
  e.preventDefault();
  const value = grocery.value;

  const id = new Date().getTime().toString();
  if (value && !editFlag) {
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
    //display alert
    displayalert("item added to the list", "success");
    // show container
    container.classList.add("show-container");
    // add to local storage
    addToLocalStorage(id, value);
    //set to dafault
    setBackToDefault();
  } else if (value && editFlag) {
    console.log("editind");
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
  //   localStorage.removeItem('list')
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
  // console.log("added to local storage");
}
function removeFromLocalStorage(id) {}
// ****** SETUP ITEMS **********
