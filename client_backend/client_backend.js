const button = document.querySelector('#get_appointments');
const output = document.querySelector('#table');
const API_URL = 'http://localhost:5000/counselorview';

button.addEventListener('click', (event) => {
    fetch(API_URL)
    .then(response => response.json())
    .then(theStuff => {
        // for(let i = 0; i < theStuff.length; i++) {
        //     const para = document.createElement("p");
        //     para.innerText = `${theStuff[i].studentID}`;
        //     output.appendChild(para);
        // }
        const student = theStuff[theStuff.length - 1].studentID;
        const counselor = theStuff[theStuff.length - 1].counselorName;
        const checkInTime = theStuff[theStuff.length - 1].created;
        structureData(student, counselor, checkInTime);
        console.log(theStuff);
    });
});

function structureData (student, counselor, checkin) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.innerText = student;
    tr.appendChild(td);
    tr.innerText = counselor;
    tr.appendChild(td);
    output.append(tr);    

}

        // <tr>
        //     <td>Alfreds Futterkiste</td>
        //     <td>Maria Anders</td>
        //     <td>Germany</td>
        // </tr>