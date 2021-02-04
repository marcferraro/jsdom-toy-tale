let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

 
});

// fetch from http://localhost:3000/toys
// iterate over object and create new div with class card
// add toy info to card
// add child nodes to card (h2, img (with src), p, button (with class 'like-btn'))

function main(){
  fetchToys()
  createSubmitListener()
  // createLikeListener()
}


function fetchToys(){
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys => toys.forEach(toy => renderToy(toy)))
}

function renderToy(toy){
  const collection = document.getElementById('toy-collection')
  const card = document.createElement('div')
  card.class = "card"
  
  const h2 = document.createElement('h2')
  h2.innerText = toy.name

  const img = document.createElement('img')
  img.src = toy.image
  img.className = "toy-avatar"

  const likes = document.createElement('p')
  likes.innerText = `${toy.likes} likes`

  const button = document.createElement('button')
  button.className = "like-btn"
  button.innerText = "like ❤️"
  button.setAttribute("data-like", `${toy.likes}`)
  button.setAttribute("toy-id", toy.id)


  card.appendChild(h2)
  card.appendChild(img)
  card.appendChild(likes)
  card.appendChild(button)

  collection.appendChild(card)

  createLikeListener(button)
}

// Add a new toy
// create event listner for submit
// prevent default
// create the toyObject
// create POST
// send to fetch 
// render toy in the list

function createSubmitListener() {
  const form = document.getElementsByClassName('add-toy-form')[0]
  form.addEventListener('submit', function(event) {
    event.preventDefault()
    const newToy = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0 
    }
    const requestObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newToy)
    }
    fetch('http://localhost:3000/toys', requestObj)
    .then(resp => resp.json())
    .then(toy => renderToy(toy))
    form.reset()
  }) // closes addEventListener & function(event)
} // closes createSubmitListener()


// iterate and create event listeners for each like button
//  for each like button, make a listener for element
//  prevent default
//  create fetch
  // how to interpolate ID, where can we get the ID?
  // accept fetch
  // patch failed
//  update dom


function createLikeListener(button){
  button.addEventListener('click', function(event){
    event.preventDefault()
    // debugger
    const newLikeCount = parseInt(event.currentTarget.getAttribute('data-like'), 10) + 1
    const buttonNode = event.currentTarget
    const requestObj = {

      method: "PATCH",
      headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": newLikeCount
      })

    }

    fetch(`http://localhost:3000/toys/${event.currentTarget.getAttribute('toy-id')}`, requestObj)
    .then(resp => resp.json())
    .then(like => updateLike(like, buttonNode))
  })
}

function updateLike(like, button){
  // debugger
  const p = button.parentElement.querySelector('p')

  button.dataset.like = like.likes
  p.innerText = `${like.likes} likes`
}

main()