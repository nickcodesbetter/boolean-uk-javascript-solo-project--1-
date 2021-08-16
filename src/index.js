// json-server --watch db/db.json --routes db/routes.json --static .
// Instructions
// - Go to this template: https://codesandbox.io/s/javascript-solo-project-ygmmv?file=/styles/index.css
// - Export to zip and open in VS code
// - Run json-server --watch db/db.json --routes db/routes.json --static .
// - Check what you are working with in db.json

// Deliverables
// - Display a list of vets

// bridge vetlist
// create and append li of vets
// create for loop linked with creation of vets
// 
// 



// - When a user clicks "view" next to a vet:
//  add event listener to button, which contains... below
//    - Display a list of animals that vet is connected to by "vetId"
//      li of animals displayed which have the same vetId as the vet using .filter 
//     - A user should be able to see the animal's name, type and microchip status
//      create li, name, type, microchip status, etc.
//     - A user should be able to update an animal's microchip status
//      update button/link with either click/change addEventListener (change if there is a dropdown menu), and within addeventlistener, there should contain:
//      a .map to change the microchip status boolean value
// - A user should be able to create a vet
//  - inputVetName with submit eventlistener, contained within:
//  - li of the vet
// - A user should be able to create an animal when a vet is selected
// ->
// question - 
// In the instructions, it says - A user should be able to create an animal when a vet is selected. - Should the padding around the vet be interactive, or does 'selected' just mean when the view button is clicked, or is it up to us?
// .... or is it up to us?

//  - addEventListener - "click" contained within:
//  - li of animal

// Tips
// - Focus on the logic and then move onto styling (the animals list)

// Plan
// create vet list bridge - "vet-list"
// 

let state = {
  //  link
  vetId: null,

  selectedVet: null,
  vets: [],
  animals: []
}


const selectVetFormEl = document.querySelector("#create-vet-form")

function listensToSelectVetForm() {
selectVetFormEl.addEventListener("submit", (event) => {
event.preventDefault();

const vetFirstNameInput = selectVetFormEl.querySelector("#first-name")
// const vetFirstNameOutput = animalNameInput

// repeat for input of lastName

console.log("first name: ", vetFirstNameInput.value)

const vetLastNameInput = selectVetFormEl.querySelector("#last-name")

console.log("last name: ", vetLastNameInput.value)

fetch('http://localhost:3000/vets', {
method: 'post',
body: JSON.stringify({firstName: vetFirstNameInput.value, lastName: vetLastNameInput.value}),
headers: {
  'Content-Type': 'application/json'
}
}).then(function (response) {
  return response.json();
  // console.log("response from post", response.json())
  // response.json().then((vetData) => {

  // }) 
  
}).then(function (newVet) {
  console.log(newVet)
  renderVetListItem(newVet)

})
  // state = {
  //       ...state,
  //       firstName: vetFirstNameInput.value,
  //       lastName: vetLastNameInput.value
  //     };
  
// output of the values of form?
// use this - output of values 
// ... and then create create elements on the page


})
}

listensToSelectVetForm()

fetch('http://localhost:3000/vets', {
method: 'get',
headers: {
'Content-Type': 'application/json'
}
}).then(function (response) {
return response.json();
}).then(function (vets) {
// renderVetListItem(newVet)
vets.forEach(vet => {
renderVetListItem(vet)
});
console.log("array of Vets:", vets)
})

// // 1) get the names to show up - John Smith
const vetListEl = document.querySelector(".vet-list")

function renderVetListItem(vet) {
// function renderVetListItem() { tried this
// console.log("renderVetListItem", newVet)

const vetListItemEl = document.createElement("li");
// document.append(vetListItemEl)
// vetListEl.append(vetListItemEl)

const vetListHeader3El = document.createElement("h3");
vetListItemEl.append(vetListHeader3El)
vetListHeader3El.innerText = `${vet.firstName} ${vet.lastName}`

const vetListViewButtonEl = document.createElement("button")
vetListItemEl.append(vetListViewButtonEl)
// 1) class might be useful here to link to query selector
vetListViewButtonEl.innerText = "View"
// listensToVetViewButtonEl(vetListViewButtonEl)

vetListViewButtonEl.addEventListener(`click`, () => {
state.selectedVet = vet
state.animals = vet.animals
console.log("Here are the details of the selected vet and the animals they treat: ", state)
// console.log("State View", state)

activateCreateButton()


renderAnimalListItem(vet.animals, vet.id)

})
vetListEl.append(vetListItemEl)
}




// 

function activateCreateButton() {

createButtonForAnimalsForm = document.querySelector('button[type="activatedSubmit"]')

// vetViewButtonClick.getElementById = ("button").disabled = false
createButtonForAnimalsForm.removeAttribute("disabled")

console.log("activation of create button: ", createButtonForAnimalsForm)

}

const animalListEl = document.querySelector(".animal-list") 

function renderAnimalListItem(animal) {
const animalListItemEl = document.createElement("li");
animalListEl.append(animalListItemEl)

const animalListHeader3NameEl = document.createElement("h3");
animalListItemEl.append(animalListHeader3NameEl)
// document.getElementById("animalListHeader3NameEl").className = "animal-name"
animalListHeader3NameEl.innerText = `${animal.name}` 

const animalListHeader4TypeEl = document.createElement("h4");
animalListItemEl.append(animalListHeader4TypeEl)
// animalListHeader4TypeEl.getElementById("animalListHeader4TypeEl").className = "animal-type"
animalListHeader4TypeEl.innerText = `${animal.type}` 

// Not sure how to go about completing this
// const animalListMicrochipButtonEl = document.createElement("button")
// animalListItemEl.append(animalListMicrochipButtonEl)
// animalListMicrochipButtonEl.innerText = `${animal.microchip}`

console.log("clicked", vet, vet.animals)
}
    animalListEl.append(animalListItemEl)

    fetch('http://localhost:3000/animals', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
      }).then(function (response) {
        return response.json();
      }).then(function (animals) {
        // renderVetListItem(newVet)
    animals.forEach(animal => {
      renderAnimalListItem(animal)
    });
        console.log("array of animals:", animals)
      })


const selectCreateAnimalForm = document.querySelector("#create-animal-form")

function listensToCreateAnimalForm() {

selectCreateAnimalForm.addEventListener("submit", (event)=>{
  event.preventDefault();
  const animalNameInput = document.querySelector("#name");

  const animalTypeInput = document.querySelector("#type");


fetch('http://localhost:3000/animals', {
method: 'post',
body: JSON.stringify({name: animalNameInput.value, type: animalTypeInput.value}),
headers: {
  'Content-Type': 'application/json'
}
}).then(function (response) {
  return response.json();
  // console.log("response from post", response.json())
  // response.json().then((vetData) => {

  // }) 
  
}).then(function (newAnimal) {
  console.log(newAnimal)
  renderVetListItem(newAnimal)

})
  // state = {
  //       ...state,
  //       firstName: vetFirstNameInput.value,
  //       lastName: vetLastNameInput.value
  //     };
  
// output of the values of form?
// use this - output of values 
// ... and then create create elements on the page


})
}


listensToCreateAnimalForm()


fetch('http://localhost:3000/animals', {
method: 'get',
headers: {
'Content-Type': 'application/json'
}
}).then(function (response) {
return response.json();
}).then(function (animals) {
// renderVetListItem(newVet)
animals.forEach(animal => {
renderAnimalListItem(animal)
});
console.log("array of animals:", animals)
})


// Code keeps deleting when animal added









// renderVetListItem();
// renderVetListItem(newVet);
// tried both


//    - Display a list of animals that vet is connected to by "vetId"
// var elem = document.getElementById('para');

// View Button
// 2)You need a global state object to store the vet id so that when you press the view button the state object gets updated to contain that vet’s ID
// List of Animals
// 3)The event listener for the view button is going to take in that Id from the state object, using that Id you’re going to get the list of animals associated to that vet. You can console/log that data out so that you know you are getting the data. When you know you’re getting the data, then you can confidently go on to displaying that list of animals on the interface

// function listensToVetViewButtonEl() {
//   vetListViewButtonEl.addEventListener(`click`, (event) => {
//         event.preventDefault();
// console.log("clicked", vetListViewButtonEl)


//         const vetViewButtonClick = vetListViewButtonEl.querySelector("button")

//         vetViewButtonClick.getElementById = ("button").disabled = false

//         console.log("vetViewButtonClick", vetViewButtonClick.value)
//         // Not sure
//         // console.log("first name: ", vetButtonClick.click)
//         // console.log("first name: ", vetButtonClick)

//         fetch('http://localhost:3000/animals', {
//         method: 'get',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//         }).then(function (response) {
//           return response.json();
//         }).then(function (listOfAnimals) {

//           renderAnimalListItem(listOfAnimals)

//           console.log(listOfAnimals)


//         })
//       })
//     }





// selectVetViewButtonEl version of listensToVetViewButtonEl
// selectVetViewButtonEl version of listensToVetViewButtonEl
// selectVetViewButtonEl version of listensToVetViewButtonEl

// const selectVetViewButtonEl = document.querySelector("${viewButton}")

// function listensToVetViewButtonEl() {
//   selectVetViewButtonEl.addEventListener("click", (event) => {
//         event.preventDefault();

//         const vetViewButtonClick = selectVetViewButtonEl.querySelector("button")

//         vetViewButtonClick.getElementById = ("button").disabled = false

//         console.log("vetViewButtonClick", vetViewButtonClick.value)
//         // Not sure
//         // console.log("first name: ", vetButtonClick.click)
//         // console.log("first name: ", vetButtonClick)

//         fetch('http://localhost:3000/animals', {
//         method: 'get',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//         }).then(function (response) {
//           return response.json();
//         }).then(function (listOfAnimals) {

//           renderAnimalListItem(listOfAnimals)

//           console.log(listOfAnimals)


//         })
//       })
//     }

// selectVetViewButtonEl version of listensToVetViewButtonEl
// selectVetViewButtonEl version of listensToVetViewButtonEl
// selectVetViewButtonEl version of listensToVetViewButtonEl





//     function renderAnimalListItem(listOfAnimals) {

//       const animalListEl = document.querySelector("animal-list")

//       const {
//         name,
//         type,
//         microchip,
//       } = newAnimal;

//       const animalListItemEl = document.createElement("li");
//       document.append(animalListItemEl)

//       const animalListHeader3NameEl = animalListItemEl.createElement("h3");
//       animalListItemEl.append(animalListHeader3NameEl)
//       animalListHeader3NameEl.getElementById("animalListHeader3NameEl").className = "animal-name"
//       animalListHeader3NameEl.innerText = "${name}"
// console.log("Animal name: ", animalListHeader3NameEl)

//       const animalListHeader4TypeEl = animalListItemEl.createElement("h4");
//       animalListItemEl.append(animalListHeader4TypeEl)
//       animalListHeader4TypeEl.getElementById("animalListHeader4TypeEl").className = "animal-type"
//       animalListHeader4TypeEl.innerText = "${type}"

//       const animalListMicrochipButtonEl = vetListItemEl.createElement("button")
//       vetListItemEl.append(animalListMicrochipButtonEl)
//       animalListMicrochipButtonEl.innerText = "${microchipButton}"

//       return animalListItemEl;
//     }

//     const selectAnimalFormEl = document.querySelector("#create-animal-form")

// function listensToSelectAnimalForm() {
//     selectAnimalFormEl.addEventListener("submit", (event) => {
//         event.preventDefault();

//         const animalNameInput = selectAnimalFormEl.querySelector("#animal-name")

//         console.log("animal name: ", animalNameInput.value)


//         const animalSelectType = selectAnimalFormEl.querySelector("#microchip")

//         console.log("animal name: ", animalSelectType.value)

//       fetch('http://localhost:3000/animals', {
//         method: 'post',
//         body: JSON.stringify({name: animalNameInput.value, animalSelectType}),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//         }).then(function (response) {
//           return response.json();
//           // console.log("response from post", response.json())
//           // response.json().then((vetData) => {

//           // }) 
  
//         }).then(function (newVet) {
//           console.log(newVet)
//         })

//         fetch('http://localhost:3000/animals', {
//         method: 'post',
//         body: JSON.stringify({name: animalNameInput.value, animalSelectType}),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//         }).then(function (response) {
//           return response.json();
//           // console.log("response from post", response.json())
//           // response.json().then((vetData) => {

//           // }) 
  
//         }).then(function (newVet) {
//           console.log(newVet)
//         })

//       })
//     }


// Not sure what to put here - which bracket
// 
// 
// }
// 
// 
// 


// First attempt at getting the submit button to work

// fetch(

// )
//     .then((res) => res.json())
//     // .then(("vets"."firstname") => { doesn't seem right
//         .then((firstNameData) => {

//         //If we are actually meant to put John in (rather than inputting everything from scratch, John being an example) I feel like this isn't right, I feel like it should be the class or something
//       state = {
//         ...state,
//         "firstName": firstNameData,
//         // "vets"."firstName": "john",
//       };



//   console.log("Inside GET fetch: ", state);

//    render the Vet section here or main section?

// options other than fetch (because there is no data online):
// CORRECTION: two options? fetch from db.json and fetch from input
//   })
// }
