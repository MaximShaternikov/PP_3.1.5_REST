async function getRoles() {
    const response = await fetch("/api/admin/roles");
    return response.json();
}

async function createNewUser(user) {
    await fetch("/api/admin/new", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    });
}

async function newUserForm() {
    const newUserForm = document.getElementById("newUserForm");

    newUserForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const getValueAndTrim = (id) => newUserForm.querySelector(id).value.trim();

        const firstName = getValueAndTrim("#firstName");
        const lastName = getValueAndTrim("#lastName");
        const age = getValueAndTrim("#age");
        const email = getValueAndTrim("#email");
        const password = getValueAndTrim("#password");
        const rolesSelected = document.getElementById("roles");

        const allRoles = await getRoles();
        const rolesMap = allRoles.reduce((acc, role) => {
            acc[role.name] = role.id;
            return acc;
            }, {});

        const roles = Array.from(rolesSelected.selectedOptions)
            .filter(option => rolesMap.hasOwnProperty(option.value))
            .map(option => ({roleId: rolesMap[option.value], name: option.value}));

        const newUserData = {
            firstName,
            lastName,
            age,
            email,
            password,
            roles
        };

        await createNewUser(newUserData);
        newUserForm.reset();

        document.querySelector('#users-tab').click();
        await fillTableOfAllUsers();
    });
}