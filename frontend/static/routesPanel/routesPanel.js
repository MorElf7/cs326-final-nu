const pinpointList = document.getElementById('pinpoint-list');

const addPinpointBtn = document.getElementById('add-pinpoint')

const pinpoints = []

const addPinpoint = (e) => {
  const location = document.getElementById("pinpoint-input").value
  pinpoints.push(location)
}

const renderPinpointList = () => {
  
}

const createRoute = (e) => {

}
addPinpointBtn.addEventListener("click", addPinpoint)

