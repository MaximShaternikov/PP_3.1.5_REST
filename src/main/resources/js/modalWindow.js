async function getUserDataById(userId) {
    const response = await fetch(`/api/admin/${userId}`);
    return response.json();
}

async function modalWindow(modal) {
    modal.addEventListener("show.bs.modal", async function (event) {
        const userId = event.relatedTarget.dataset.userId;
        const user = await getUserDataById(userId);
        const modalBody = modal.querySelector(".modal-body");

        modalBody.querySelectorAll("[data-user-id]").forEach(input => {
            const field = input.dataset.userId;
            if (field === 'password') {
                return;
            }
            if (field === 'rolesDelete' || field === 'rolesEdit') {
                let rolesHTML = '';
                if (field === 'rolesDelete') {
                    rolesHTML = user.roles.map(role => `<option value="${role.name}">${role.name.substring(5)}</option>`).join('');
                } else {
                    rolesHTML = `<option value="ROLE_ADMIN">ADMIN</option><option value="ROLE_USER">USER</option>`;
                }
                input.innerHTML = rolesHTML;
            } else {
                input.value = user[field] || '';
            }
        });
    });
}