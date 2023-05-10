const checkinForm = document.getElementById("checkin-form");
const signedInList = document.getElementById("signed-in-list");
const signOutButton = document.getElementById("sign-out");
const modal = document.getElementById("modal");
const modalCancelButton = document.getElementById("modal-cancel");
const modalSignOutButton = document.getElementById("modal-sign-out");
let signedInName = null;

checkinForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    if (name !== "") {
        if (signedInList.children.length > 0) {
            signedInName = signedInList.children[0].textContent;
            const message = `${signedInName} is already signed in. Are you sure you want to sign in as ${name}?`;
            showModal(message);
        } else {
            const li = document.createElement("li");
            li.textContent = name;
            signedInList.appendChild(li);
            checkinForm.reset();
            updateStatus();
        }
    }
});

function showModal(message) {
    modal.querySelector("p").textContent = message;
    modal.style.display = "block";
}

signOutButton.addEventListener("click", () => {
    while (signedInList.firstChild) {
        signedInList.removeChild(signedInList.firstChild);
    }
    signedInName = null;
    updateStatus();
});

modalCancelButton.addEventListener("click", () => {
    modal.style.display = "none";
});

modalSignOutButton.addEventListener("click", () => {
    signedInList.innerHTML = "";
    const name = document.getElementById("name").value.trim();
    if (name !== "") {
        const li = document.createElement("li");
        li.textContent = name;
        signedInList.appendChild(li);
        checkinForm.reset();
    }
    signedInName = null;
    updateStatus();
    modal.style.display = "none";
});

function updateStatus() {
    const status = document.getElementById("status");
    const signedInNames = Array.from(signedInList.children).map(li => li.textContent);
    if (signedInNames.length > 0) {
        status.style.display = "block";
        const statusText = `Currently signed in:`;
        status.querySelector("p").textContent = statusText;
        if (signedInNames.length > 1) {
            signedInName = signedInNames[0];
            const message = `${signedInName} is already signed in. Are you sure you want to sign out and sign in as the new person?`;
            showModal(message);
        } else {
            modal.style.display = "none";
        }
    } else {
        status.style.display = "none";
        modal.style.display = "none";
    }
}