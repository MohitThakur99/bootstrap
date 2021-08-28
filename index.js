const taskContainer = document.querySelector(".task__container");

let globalStore = [];

const generateNewCard = (taskData) => `
 <div class="col-md-6 col-lg-4 >
  <div class="card">
    <div class="card-header d-flex justify-content-end gap-2">
     <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
     <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this, arguments)"><i class="fas fa-trash" id=${taskData.id} onclick="deleteCard.apply(this, arguments)"></i></button>
    </div>
   <img src=${taskData.imageUrl} class="card-img-top" alt="image">

     <div class="card-body">
     <h5 class="card-title">${taskData.taskTitle}</h5>  
     <p class="card-text">${taskData.taskDescription}</a>
     <a href="#" class="btn btn-primary">Task</a>
     </div>
     <div class="card-footer text-muted">
     <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
     </div>
     </div>
</div>`;


const loadInitialCardData = () => {
  // localstorage to get task card data

  const getCardData = localStorage.getItem("task");

  // convert  from string to normal object

  const { cards } = JSON.parse(getCardData);

  //  loop over those array of task object to create HTML card, inject it to DOM

  cards.map((cardObject) => {
    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));
     
    // update our globalStore

    globalStore.push(cardObject);
  })

  
};


const saveChanges = () => { 
  const taskData = {
    id: `${Date.now()}`,  //unique number for id
    imageUrl: document.getElementById("imageurl").value,
    taskTitle: document.getElementById("tasktitle").value,
    taskType: document.getElementById("tasktype").value,
    taskDescription: document.getElementById("taskdescription").value,
  };



  taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

  globalStore.push(taskData);

  localStorage.setItem("task", JSON.stringify({ cards: globalStore }));  // JSON requires an object, here is array so converted to object0
};

const deleteCard = (event) => {
  event = window.event;

  // browser related properties ( event object feature)
  // your HTML element
  // id
  const targetID = event.target.id
  const tagname = event.target.tagName; // BUTTON

  // match the id of the element with the id inside the globalStore
  // if match found remove it

  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
  localStorage.setItem("task", JSON.stringify({cards: globalStore})); // an object
  
  // contact parent

  if(tagname === "BUTTON"){
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  }
  else{
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }
  
};

// Issues

// Page refresh will cause the data to be deleted -> localstorage -> 5MB [solved]


// Info
// API -> Application Programming Interface

// localstorage -> Application
// Access Application via -> Programming
// Interface as a middleman4

// localstorage -> with some method -> javascript

// -Info


// Features
// Delete The Card
// Edit the card
// Open the card