const backToHome = document.getElementById("backToHome");
backToHome.addEventListener('click', () => {
    window.location.assign("/home");
});

onload = async () => {
    const currentUser = localStorage.getItem("currentUser");
    let userData = await await fetch(`/api/users/${currentUser}`, {
        method: "GET",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
    });
    localStorage.setItem('userData', JSON.stringify(userData));
    const {username, email, phone, address, description} = userData;
    document.getElementById('usernameInput').value = username;
    document.getElementById('emailInput').value = email;
    document.getElementById('phoneInput').value = phone;
    document.getElementById('addressInput').value = address;
    document.getElementById('desInput').value = description;
}

const editButton = document.getElementById('editButton');
editButton.addEventListener('click', async() => {
    const currentUser = localStorage.getItem("currentUser");
    if(editButton.innerText === 'Edit'){
        window.location.assign(`/users/${currentUser}/edit`);
    }
    else{
        const username = document.getElementById('usernameInput');
        const email = document.getElementById('emailInput');
        const phone = document.getElementById('phoneInput');
        const address = document.getElementById('addressInput');
        const des = document.getElementById('desInput');
        const accessToken = localStorage.getItem("accessToken");

        const response = await fetch(`/api/users/${currentUser}`, {
            method: "PUT",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
				username: username,
				email: email,
                phone: phone,
                address: address,
                description: des
			}),
        });

        const res = await response.json();

        window.location.assign(`/users/${currentUser}`);
    }
});