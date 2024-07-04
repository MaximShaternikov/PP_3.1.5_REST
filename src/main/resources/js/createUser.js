async function getRoles() {
    const response = await fetch("/api/admin/roles");
    return await response.json();
}


async function createNewUser(user) {
    await fetch("/api/admin/new",
        {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(user)})

}

async function addNewUserForm() {
    const newUserForm = document.getElementById("newUserForm");

    newUserForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const firstName = newUserForm.querySelector("#firstName").value.trim();
        const lastName = newUserForm.querySelector("#lastName").value.trim();
        const age = newUserForm.querySelector("#age").value.trim();
        const email = newUserForm.querySelector("#email").value.trim();
        const password = newUserForm.querySelector("#password").value.trim();
        const rolesSelected = document.getElementById("roles");

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


        const newUserData = {
            firstName: firstName,
            lastName: lastName,
            age: age,
            email: email,
            password: password,
            roles: roles
        };

        await createNewUser(newUserData);
        newUserForm.reset();

        document.querySelector('#users-tab').click();
        await fillTableOfAllUsers();
    });
}