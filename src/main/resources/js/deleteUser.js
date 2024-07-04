async function deleteUserData(userId) {
    await fetch(`/api/admin/${userId}`, {
        method: 'DELETE'
    });
}

const modalDelete = document.getElementById("deleteModal");

async function DeleteModalHandler() {
    await modalWindow(modalDelete);
}

const formDelete = document.forms["modalBodyDelete"];
formDelete.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userId = formDelete.id.value;
    await deleteUserData(userId);
    await usersTable();

    bootstrap.Modal.getInstance(modalDelete).hide();
});