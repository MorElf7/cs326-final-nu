import { validateAddress } from "../geocodingUtils.js"

mapboxgl.accessToken = "pk.eyJ1IjoibGFpdGhpZW5uaGFuMDkiLCJhIjoiY2xhbXVvdDQ3MGdlcDNycXRud3QydnlzaSJ9.2OA98XNN6-jP-H14l-b0rQ"

const pinpointList = document.getElementById('pinpoint-list');

const addPinpointBtn = document.getElementById('add-pinpoint')
const createRouteBtn = document.getElementById('create-route-btn');
// const saveInfoBtn = document.getElementById('save-info-btn');

const pinpoints = []
let currentUser = {}

onload = async () => {
  const res = await fetch('/api/users/currentUser')
  const {status, message, data} = await res.json();
  if (!status === 200) {
    location.href("/users/login")
  } else {
    currentUser = data
  }
}

// const saveInfo = async (e) => {
//   e.preventDefault();
//   const newName = document.getElementById('user-name').value
//   const newDescription = document.getElementById('user-bio').value

//   const response = await fetch(`/api/users/${currentUser}/`, {
//     method: 'PUT',
//     credentials: 'same-origin',
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({name: newName, description: newDescription})
//   })
//   const { message, status } = await response.json();
//   if (status === 200) {
//     alert("Successfully saved info")
//   } else {
//     console.log("Error: " + status)
//   }
// }

const addPinpoint = async (e) => {
  const location = document.getElementById("pinpoint-input").value
  if (location === ''){
    alert('Please enter a location')
  } else {
    try {
      document.getElementById("pinpoint-input").value = ""
      const pinpoint = document.createElement("li")
      const temp =  await validateAddress(location)
      const t = document.createTextNode(temp.address)
      pinpoint.className = "list-group-item d-flex justify-content-between align-items-center";
      pinpoint.appendChild(t)
      pinpointList.appendChild(pinpoint);
      pinpoints.push(temp)
    } catch (error) {
      alert(error)
    }
  } 
}

const timeInput = document.getElementById("time-input")
const speedInput = document.getElementById("speed-input")

const createRoute = async (e) => {
  e.preventDefault()
  const speed = speedInput.value
  const time = timeInput.value
  if (speed === ''){
    alert("Please select a speed")
    return
  }
  if (time === ''){
    alert("Please select a time")
    return
  }
  const date = getDate();
  if (date.length === 0) {
    alert("Please select a date")
    return
  }
  if (pinpointList.length === 0){
    alert("add locations")
    return
  }

  const response = await fetch('/api/paths/', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pinpoints: pinpoints, user: currentUser._id, date: date, speed: speed, time: time }),
  })

  const { message, status } = await response.json();
  if (status === 200) {
    alert(`Successfully added new route:\nDate: ${date}\nSpeed: ${speed}\nTime: ${time}\nRoute: ${pinpoints.map(x => x.address + '\n')}`)
    window.location.href= "/home/"
  } else {
    alert("Error: " + status)
  }
}

const getDate = () => {
  let res = []
  for (const date of ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]){
    if ( document.getElementById(date).checked ) {
      res.push(date)
    }
  }
  return res
}

addPinpointBtn.addEventListener("click", addPinpoint)
createRouteBtn.addEventListener("click", createRoute)
// saveInfoBtn.addEventListener('click', saveInfo)


