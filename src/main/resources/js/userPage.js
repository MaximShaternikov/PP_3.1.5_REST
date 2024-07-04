document.addEventListener('DOMContentLoaded', async function () {
    await userTable();
});

async function userTable() {
    const response = await fetch("/api/user/");
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const user = await response.json();
    const roles = user.roles.map(role => role.name.substring(5)).join(" ");
    $("#navbarUserEmail").text(user.email);
    $("#navbarUserRoles").text(roles);
    $("#userTable").append(
        `<tr>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>   
            <td>${user.email}</td>
            <td>${roles}</td>
        </tr>`
    );
}