async function fetchDiagnosisData() {
    const response = await fetch('../Data/diagnosis_data.json');
    const data = await response.json();
    return data;
}

fetchDiagnosisData().then((diagnosisData) => {
    console.log(diagnosisData);
});

function calculatePoints(user) {
    let points = 0;
    
    if (user.age >= 3 && user.age <= 14) {
        points += 1;
    } else if (user.age >= 15 && user.age <= 44) {
        points += 0;
    } else if (user.age > 44) {
        points -= 1;
    }

    if (user.fiebre === 'si') {
        points += 1;
    } else {
        points = 0;
    }
    if (user.adenopatias === 'si') {
        points += 1;
    } else {
        points += 0;
    }
    if (user.exudado === 'si') {
        points += 1;
    } else {
        points += 0;
    } if (user.tos === 'no') {
        points += 1;
    } else {
        points += 0;
    }
    return points;
}


function displayUserName() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const lastUser = users[users.length - 1];
    const usuario = document.getElementById('usuario');
    usuario.textContent = `Listo, ${lastUser.name}.`;
}

async function displayDiagnostico() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const lastUser = users[users.length - 1];
    const diagnostico = document.getElementById('diagnostico');
    const points = calculatePoints(lastUser);

    const diagnosisData = await fetchDiagnosisData();
    let diagnosisId;
    if (points < 2) {
        diagnosisId = 1;
    } else if (points >= 2 && points <= 3) {
        diagnosisId = 2;
    } else {
        diagnosisId = 3;
    }

    const diagnosisInfo = diagnosisData.find(item => item.id === diagnosisId);

    diagnostico.textContent = `Dados los signos y síntomas que presentas, tu diagnóstico es de faringitis ${diagnosisInfo.diagnosis}.`;
}

displayDiagnostico();


async function displayTratamiento() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const lastUser = users[users.length - 1];
    const tratamiento = document.getElementById('tratamiento');
    const points = calculatePoints(lastUser);

    const diagnosisData = await fetchDiagnosisData();
    let diagnosisId;
    if (points < 2) {
        diagnosisId = 1;
    } else if (points >= 2 && points <= 3) {
        diagnosisId = 2;
    } else {
        diagnosisId = 3;
    }
    const diagnosisInfo = diagnosisData.find(item => item.id === diagnosisId);
    tratamiento.innerHTML = `Por tanto, tu tratamiento consiste en: ${diagnosisInfo.treatment}.`;
}

displayTratamiento();


document.addEventListener('DOMContentLoaded', () => {
    displayUserName();
    displayDiagnostico();
    displayTratamiento();
})