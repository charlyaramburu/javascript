const users = []

function showModal(message) {
    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    document.querySelector('.modal-body').textContent = message;
    modal.show();
}

document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const lastName = document.getElementById('lastName').value;
    const ageRange = document.getElementById('ageRange').value;
    const email = document.getElementById('email').value;
    const emailConfirm = document.getElementById('emailConfirm').value;
    const country = document.getElementById('country').value;
    const gridCheck = document.getElementById('gridCheck').checked;

    function isValidEmail(email) {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(email);
    }
    if (email !== emailConfirm) {
        showModal('Los correos electrónicos no coinciden. Por favor, verifica tu correo electrónico.');
    } else if (!gridCheck) {
        showModal('Por favor acepta los términos del servicio.')
    } else if (!isValidEmail(email)) {
        showModal('El correo electrónico ingresado no es válido. Por favor, ingresa un correo electrónico válido.');
    } else if (name && lastName && ageRange && email && emailConfirm && country && isValidEmail(email)) {
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            alert(`El usuario con el correo "${email}" ya existe.`);
        } else {
            const user = {
                name: name,
                lastName: lastName,
                ageRange: ageRange,
                email: email,
                country: country
            };

            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            document.getElementById('name').value = '';
            document.getElementById('lastName').value = '';
            document.getElementById('ageRange').value = '';
            document.getElementById('email').value = '';
            document.getElementById('emailConfirm').value = '';
            document.getElementById('country').value = '';

            window.location.href = '/html/anamnesis.html';
        }
    } else {
        showModal('Por favor llena todos los campos para continuar.');
    }
});
