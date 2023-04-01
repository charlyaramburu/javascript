function showModal(message) {
    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    document.querySelector('.modal-body').textContent = message;
    modal.show();
}

function displayUserName() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const lastUser = users[users.length - 1];
    const bienvenida = document.getElementById('bienvenida');
    bienvenida.textContent = `Gracias, ${lastUser.name}. Te realizaré un par de preguntas para identificar los signos y síntomas relevantes para el diagnóstico y,
    con ello, para tu tratamiento.`;
}

function handleResponse(questionId, response) {
    if (questionId === 'dolor') {
        if (response === 'si') {
            fiebreContainer.style.display = 'block';
        } else {
            fiebreContainer.style.display = 'none';
            showModal('Esta aplicación está limitada por el momento para ayudarte en caso de dolor de garganta. Te avisaremos cuando tengamos otros síntomas incluidos.');
        }
    } else if (questionId === 'fiebre') {
        if (response === 'si' || response === 'no') {
            adenopatiasContainer.style.display = 'block';
        } else {
            adenopatiasContainer.style.display = 'none';
        }
    } else if (questionId === 'adenopatias') {
        if (response === 'si' || response === 'no') {
            exudadoContainer.style.display = 'block';
        } else {
            exudadoContainer.style.display = 'none';
        }
    } else if (questionId === 'exudado') {
        if (response === 'si' || response === 'no') {
            tosContainer.style.display = 'block';
        } else {
            tosContainer.style.display = 'none';
        }
    } else if (questionId === 'tos') {
        if (response === 'si' || response === 'no') {
            continuarContainer.style.display = 'block';
        } else {
            continuarContainer.style.display = 'none';
        }
    }
}

function dataForUser() {
    const form = document.getElementById('anamnesisForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const dolor = document.getElementById('dolor').value;
        const fiebre = document.getElementById('fiebre').value;
        const adenopatias = document.getElementById('adenopatias').value;
        const exudado = document.getElementById('exudado').value;
        const tos = document.getElementById('tos').value;

        if (dolor && fiebre && adenopatias && exudado && tos) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const lastUserIndex = users.length - 1;
            const updatedUser = { ...users[lastUserIndex], dolor, fiebre, adenopatias, exudado, tos };
            users[lastUserIndex] = updatedUser;
            localStorage.setItem('users', JSON.stringify(users));
            window.location.href = '/html/diagnostico.html';
        } else {
            alert('Por favor selecciona todos tus signos y síntomas.');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const dolor = document.querySelector('#dolor');
    const fiebre = document.querySelector('#fiebre');
    const adenopatias = document.querySelector('#adenopatias');
    const exudado = document.querySelector('#exudado');
    const tos = document.querySelector('#tos');

    dolor.addEventListener('change', (event) => {
        handleResponse('dolor', event.target.value);
    });

    fiebre.addEventListener('change', (event) => {
        handleResponse('fiebre', event.target.value);
    });

    adenopatias.addEventListener('change', (event) => {
        handleResponse('adenopatias', event.target.value);
    });

    exudado.addEventListener('change', (event) => {
        handleResponse('exudado', event.target.value);
    });

    tos.addEventListener('change', (event) => {
        handleResponse('tos', event.target.value);
    });
    displayUserName();
    dataForUser();
});