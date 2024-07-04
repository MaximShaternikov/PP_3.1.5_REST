async function deleteUserData(userId) {
    await fetch(`/api/admin/${userId}`, {method: 'DELETE'});
}

const modalDelete = document.getElementById("deleteModal");

async function DeleteModalHandler() {
    await fillModal(modalDelete);
}

let formDelete = document.forms["modalBodyDelete"];
formDelete.addEventListener("submit", async function (event) {
        event.preventDefault();

        let userId = formDelete.id.value;
        await deleteUserData(userId);
        await fillTableOfAllUsers();

        const modalBootstrap = bootstrap.Modal.getInstance(modalDelete);
        modalBootstrap.hide();
    }
)