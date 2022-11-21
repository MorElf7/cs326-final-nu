import { renderHtml } from "../../utils/index.js";
import { validateAddress } from "../geocodingUtils.js"

mapboxgl.accessToken = "pk.eyJ1IjoibGFpdGhpZW5uaGFuMDkiLCJhIjoiY2xhbXVvdDQ3MGdlcDNycXRud3QydnlzaSJ9.2OA98XNN6-jP-H14l-b0rQ"

const pinpointList = document.getElementById('pinpoint-list');

const addPinpointBtn = document.getElementById('add-pinpoint')
const createRouteBtn = document.getElementById('create-route-btn');
const loadRouteBtn = document.getElementById('load-routes-btn');
const routesList = document.getElementById('routes-list');
const saveInfoBtn = document.getElementById('save-info-btn');

const pinpoints = []
let currentUser = "" 

onload = async () => {
  const res = await fetch('/api/users/currentUser')
  const {status, message, data} = await res.json().data;
  if (!status === 200) {
    location.href("/users/login")
  } else {
    currentUser = data
  }
}

const saveInfo = async (e) => {
  e.preventDefault();
  const newName = document.getElementById('user-name').value
  const newDescription = document.getElementById('user-bio').value

  const response = await fetch(`/api/users/${currentUser}/`, {
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

const getDate = () => {
  let res = []
  for (const date of ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]){
    if ( document.getElementById(date).checked ) {
      res.push(date)
    }
  }
  return res
}

const renderMap = () => {
  const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [12.550343, 55.665957],
    zoom: 8
    });
}
const map = new mapboxgl.Map({
  container: 'map',
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [12.550343, 55.665957],
  zoom: 8
  });
   
  // Create a default Marker and add it to the map.
  const marker1 = new mapboxgl.Marker()
  .setLngLat([12.554729, 55.70651])
  .addTo(map);
   
  // Create a default Marker, colored black, rotated 45 degrees.
  const marker2 = new mapboxgl.Marker({ color: 'black', rotation: 45 })
  .setLngLat([12.65147, 55.608166])
  .addTo(map);

addPinpointBtn.addEventListener("click", addPinpoint)
createRouteBtn.addEventListener("click", createRoute)
saveInfoBtn.addEventListener('click', saveInfo)



