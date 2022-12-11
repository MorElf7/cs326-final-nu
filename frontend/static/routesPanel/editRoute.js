let currentUser = {}
const pinpoint = []

onload = async () => {
  const res = await fetch('/api/users/currentUser')
  const {status, message, data} = await res.json();
  if (!status === 200) {
    location.href("/users/login")
  } else {
    currentUser = data
  }
  await renderRoute()
}

const renderRoute = async () => {
  const res = await fetch(`/api/paths/${currentUser._id}`);
  const {status, message, data } = await res.json();
    // if (status !== 200) {
    //     location.href = "/routesPanel"
    // }

  const pinpoints = data.pinpoints.map(x => x.address);
  const speed = data.speed;
  const date = data.date;
  const time = data.time;
  

}

// Routing for link buttons

const home = document.getElementById('home-btn')
home.addEventListener("click", () => {
  location.href = "/home"
})

const userProfile = document.getElementById('user-profile-btn');
userProfile.addEventListener("click", () => {
  location.href = "/users/profile"
})
