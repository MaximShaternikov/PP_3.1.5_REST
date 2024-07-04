async function getRoles() {
    const response = await fetch(`/api/admin/roles`);
    return await response.json();
}

async function sendDataEditUser(user) {
    await fetch(`/api/admin/` + user.id, {
        method: "PATCH",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(user)
    });
}

const modalEdit = document.getElementById("editModal");

async function EditModalHandler() {
    await fillModal(modalEdit);
}

modalEdit.addEventListener("submit", async function (event) {
    event.preventDefault();

    const rolesSelected = document.getElementById("rolesEdit");

    let allRole = await getRoles();
    let AllRoles = {};
    for (let role of allRole) {
        AllRoles[role.name] = role.id;
    }
    let roles = [];
    for (let option of rolesSelected.selectedOptions) {
        if (Object.keys(AllRoles).indexOf(option.value) !== -1) {
            roles.push({roleId: AllRoles[option.value], name: option.value});
        }
    }

    let user = {
        id: document.getElementById("idEdit").value,
        firstName: document.getElementById("firstNameEdit").value,
        lastName: document.getElementById("lastNameEdit").value,
        age: document.getElementById("ageEdit").value,
        email: document.getElementById("emailEdit").value,
        password: document.getElementById("passwordEdit").value,
        roles: roles
    }

    await sendDataEditUser(user);
    await fillTableOfAllUsers();

    const modalBootstrap = bootstrap.Modal.getInstance(modalEdit);
    modalBootstrap.hide();
});
