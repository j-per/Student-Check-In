const button = document.querySelector('#get_appointments');
const table = document.querySelector('#table');
const API_URL = 'http://localhost:5000/counselorview';

button.addEventListener('click', (event) => {
    fetch(API_URL)
    .then(response => response.json())
    .then(theStuff => {
        theStuff.forEach((currentValue, index, array) => {
            structureData(currentValue.studentID, currentValue.counselorName, currentValue.created, index + 1);
        })
    });
});

function structureData (student, counselor, checkin, rowNum) {
    const row = table.insertRow(rowNum);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);

    cell1.innerText = student;
    cell2.innerText = counselor;
    cell3.innerText = checkin;
}
