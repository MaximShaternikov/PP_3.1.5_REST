document.addEventListener('DOMContentLoaded', async function () {
    await fillTableOfAllUsers();
    await fillTableAboutCurrentUser();
    await addNewUserForm();
    await DeleteModalHandler();
    await EditModalHandler();
});

async function dataAboutAllUsers() {
    const response = await fetch("/api/admin");
    return await response.json();
}

async function dataAboutCurrentUser() {
    const response = await fetch("/api/user")
    return await response.json();
}


async function fillTableOfAllUsers() {
    const users = await dataAboutAllUsers();
    let usersTableHTML = "";
    for (let user of users) {
        usersTableHTML +=
            `<tr>
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
               <td>${user.roles.map(role => role.name.substring(5)).join(" ")}</td>
                <td>
                    <button class="btn btn-info"
                            data-bs-toggle="modal"
                            data-bs-target="#editModal"
                            data-user-id="${user.id}">
                        Edit</button>
                </td>
                <td>
                    <button class="btn btn-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteModal"
                            data-user-id="${user.id}">                     
                        Delete</button>
                </td>
            </tr>`;
    }
    $("#usersTable").html(usersTableHTML);
}


async function fillTableAboutCurrentUser(){
    const currentUser = await dataAboutCurrentUser();
    const roles = currentUser.roles.map(role => role.name.substring(5)).join(" ");
    $("#navbarUserEmail").text(currentUser.email);
    $("#navbarUserRoles").text(roles);
    $("#currentUserTable").append(
        `<tr>
            <td>${currentUser.id}</td>
            <td>${currentUser.firstName}</td>
            <td>${currentUser.lastName}</td>
            <td>${currentUser.age}</td>   
            <td>${currentUser.email}</td>
            <td>${roles}</td>
        </tr>`
    );
}