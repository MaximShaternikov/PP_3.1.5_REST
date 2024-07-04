async function getRoles() {
    const response = await fetch(`/api/admin/roles`);
    return response.json();
}

async function sendDataEditUser(user) {
    await fetch(`/api/admin/${user.id}`, {
        method: "PATCH",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(user)
    });
}

const modalEdit = document.getElementById("editModal");

async function EditModalHandler() {
    await modalWindow(modalEdit);
}

modalEdit.addEventListener("submit", async function (event) {
    event.preventDefault();

    const rolesSelected = document.getElementById("rolesEdit");

    const allRoles = await getRoles();
    const rolesMap = allRoles.reduce((acc, role) => {
        acc[role.name] = role.id;
        return acc;
    }, {});

    const roles = Array.from(rolesSelected.selectedOptions)
        .filter(option => rolesMap.hasOwnProperty(option.value))
        .map(option => ({ roleId: rolesMap[option.value], name: option.value }));

    const user = {
        id: document.getElementById("idEdit").value,
        firstName: document.getElementById("firstNameEdit").value,
        lastName: document.getElementById("lastNameEdit").value,
        age: document.getElementById("ageEdit").value,
        email: document.getElementById("emailEdit").value,
        password: document.getElementById("passwordEdit").value,
        roles
    };

    await sendDataEditUser(user);
    await fillTableOfAllUsers();

    bootstrap.Modal.getInstance(modalEdit).hide();
});