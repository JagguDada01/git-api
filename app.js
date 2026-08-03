let input = document.querySelector("input");

function submit() {
    let dt = input.value;
    if (!dt) return;
    let url = `https://api.github.com/users/${dt}`;
    let userInfo = document.getElementById("userInfo");
    userInfo.innerHTML = "<p>Loading...</p>";
    git(url);
}

async function git(url) {
    try {
        let data = await fetch(url);
        let info = await data.json();
        display(info);
        console.log(info);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function display(info) {
    let userInfo = document.getElementById("userInfo");
    if (info.message === "Not Found") {
        userInfo.innerHTML = "<p>User not found</p>";
        return;
    }
    userInfo.innerHTML = `
        <img src="${info.avatar_url}" alt="Avatar" width="100">
        <p><strong>Username:</strong> ${info.login}</p>
        <p><strong>Name:</strong> ${info.name}</p>
        <p><strong>Bio:</strong> ${info.bio}</p>
        <p><strong>Followers:</strong> ${info.followers}</p>
        <p><strong>Following:</strong> ${info.following}</p>
        <p><strong>Public Repos:</strong> ${info.public_repos}</p>
    `;
}
