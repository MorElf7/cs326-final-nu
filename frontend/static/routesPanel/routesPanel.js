import { validateAddress } from "../geocodingUtils.js"

const pinpointList = document.getElementById('pinpoint-list');

const addPinpointBtn = document.getElementById('add-pinpoint')
const createRouteBtn = document.getElementById('create-route-btn');
const loadRouteBtn = document.getElementById('load-routes-btn');
const routesList = document.getElementById('routes-list');
const saveInfoBtn = document.getElementById('save-info-btn');

const pinpoints = []
const fakeUserId = "0123456789" 



const saveInfo = async (e) => {
  e.preventDefault();
  const newName = document.getElementById('user-name').value
  const newDescription = document.getElementById('user-bio').value

  const response = await fetch(`/api/users/${fakeUserId}/`, {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name: newName, description: newDescription})
  })
  const { message, status } = await response.json();
  if (status === 200) {
    alert("Successfully saved info")
  } else {
    console.log("Error: " + status)
  }
}

const addPinpoint = async (e) => {
  const location = document.getElementById("pinpoint-input").value
  if (location === ''){
    alert('Please enter a location')
  } else {
    try {
      document.getElementById("pinpoint-input").value = ""
      const pinpoint = document.createElement("li")
      const temp = await validateAddress(location)
      const t = document.createTextNode(temp)
      pinpoint.className = "list-group-item d-flex justify-content-between align-items-center";
      pinpoint.appendChild(t)
      pinpointList.appendChild(pinpoint);
      pinpoints.push(location)
    } catch (error) {
      alert(error)
    }
  } 
}

const timeInput = document.getElementById("time-input")
const speedInput = document.getElementById("speed-input")

const createRoute = async (e) => {
  e.preventDefault()
  speed = speedInput.value
  time = timeInput.value
  if (speed === ''){
    alert("Please select a speed")
    return
  }
  if (time === ''){
    alert("Please select a time")
    return
  }
  const dates = getDate();
  if (dates.length === 0) {
    alert("Please select a date")
    return
  }
  if (pinpointList.length === 0){
    alert("add locations")
    return
  }

  const response = await fetch('/api/paths', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pinpoints, dates, speed, time }),
  })

  const { data, message, status } = await response.json();
  if (status === 200) {
    alert(`Successfully added new route:\nDate: ${dates}\nSpeed: ${speed}\nTime: ${time}\nRoute: ${pinpoints}`)
  } else {
    console.log("Error: " + status)
  }
}



const getUserRoutes = async (e) => {
  e.preventDefault();
  e.stopPropagation()
  const response = await fetch(`/api/paths/all/${fakeUserId}`,{
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
    },
  })
  const { data, message, status } = await response.json();
  if (status === 200) {
    // location.href = "";
    displayAllRoutes(data)

  } else {
    console.log("Error: " + response)
  }
}

const displayAllRoutes = (data) => {
  while (routesList.firstChild){
    routesList.removeChild(routesList.lastChild);
  }
//   <li class="list-group-item">
//   <div>Dates:</div>
//   <div>Time:</div>
//   <div>
    
//   </div>
// </li>
  for (const route of data){
    const fakePathId = "1234"
    const r = document.createElement("li")
    r.className = "list-group-item flex justify-content-between align-items-center border-top border-left border-right border-bottom rounded"
    const date = document.createElement("div")
    date.innerText = `Date: ${route.date}`
    const time = document.createElement("div")
    time.innerText = `Time: ${route.time}`
    const points = document.createElement("div")
    points.innerText = `Route: ${route.pinpoints}`
    const speed = document.createElement("div")
    speed.innerText = `Speed: ${route.speed}`
    r.appendChild(date)
    r.appendChild(time)
    r.appendChild(points)
    r.appendChild(speed)
    const deleteRouteBtn = document.createElement("button");
    deleteRouteBtn.innerText = "DELETE"
    deleteRouteBtn.addEventListener("click", async (e) => {
      e.preventDefault()
      e.stopPropagation()
      const response = await fetch(`/api/paths/${fakePathId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const { data, message, status } = await response.json();
      if (status === 200) {
        // location.href = "";
        alert("Deleted route")
        routesList.removeChild(r)
      } else {
        console.log("Error: " + response)
      }
    })
    r.appendChild(deleteRouteBtn)
    routesList.appendChild(r)
  }
}

const getDate = () => {
  res = []
  for (const date of ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]){
    if ( document.getElementById(date).checked ) {
      res.push(date)
    }
  }
  return res
}

addPinpointBtn.addEventListener("click", addPinpoint)
createRouteBtn.addEventListener("click", createRoute)
loadRouteBtn.addEventListener("click", getUserRoutes)
saveInfoBtn.addEventListener('click', saveInfo)



