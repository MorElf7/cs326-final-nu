const backToHome = document.getElementById("backToHome");
backToHome.addEventListener('click', () => {
    window.location.assign("/home");
});
let currentUser = {}
onload = async () => {
    const res = await fetch('/api/users/currentUser')
    const {status, message, data} = await res.json();
    if (!status === 200) {
      location.href("/users/login")
    } else {
      currentUser = data
    }
    const {username, email, description} = currentUser;
    document.getElementById('usernameInput').value = username;
    document.getElementById('emailInput').value = email;
    
    document.getElementById('desInput').value = description;
    document.getElementById('profileImg').setAttribute('src',`https://robohash.org/${username}?set=set4`)
}

const editButton = document.getElementById('editButton');
editButton.addEventListener('click', async() => {
    const username = document.getElementById('usernameInput');
    const email = document.getElementById('emailInput');
   
    const des = document.getElementById('desInput');
    if(editButton.innerText === 'Edit'){

        des.readOnly = false;
        des.classList.remove('readOnly');

        editButton.innerText = "Save";
    }
    else{
        username.readOnly = true;
        username.classList.add('readOnly');

        email.readOnly = true;
        email.classList.add('readOnly');

        des.readOnly = true;
        des.classList.add('readOnly');

        const accessToken = localStorage.getItem("accessToken");

        const response = await fetch(`/api/users/${currentUser._id}`, {
            method: "PUT",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                username: username.value,
                email: email.value,
                description: des.value
			}),
        });

        const res = await response.json();
        if (res.status === 200) {
            alert("Information saved");
            editButton.innerText = "Edit";
        } else {
            alert(`Error: ${res.message}`)
        }    
    }
});