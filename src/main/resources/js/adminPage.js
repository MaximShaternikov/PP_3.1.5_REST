document.addEventListener('DOMContentLoaded', async function () {
    await usersTable();
    await currentUserTable();
    await newUserForm();
    await DeleteModalHandler();
    await EditModalHandler();
});

async function fetchData(url) {
    const response = await fetch(url);
    return await response.json();
}

async function usersTable() {
    try {
        const users = await fetchData("/api/admin");
        const usersTableInfo = users.map(user => `
            <tr>
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td>${user.roles.map(role => role.name.substring(5)).join(" ")}</td>
                <td><button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#editModal" data-user-id="${user.id}">Edit</button></td>
                <td><button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" data-user-id="${user.id}">Delete</button></td>
            </tr>
        `).join('');
        $("#usersTable").html(usersTableInfo);
    } catch (error) {
        console.error(error);
    }
}

async function currentUserTable() {
    try {
        const currentUser = await fetchData("/api/user");
        const roles = currentUser.roles.map(role => role.name.substring(5)).join(" ");
        $("#navbarUserEmail").text(currentUser.email);
        $("#navbarUserRoles").text(roles);
        $("#currentUserTable").append(`
            <tr>
                <td>${currentUser.id}</td>
                <td>${currentUser.firstName}</td>
                <td>${currentUser.lastName}</td>
                <td>${currentUser.age}</td>   
                <td>${currentUser.email}</td>
                <td>${roles}</td>
            </tr>
        `);
    } catch (error) {
        console.error(error);
    }
}