
const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const API_URL = 'http://localhost:5000/studentcheckin';

loadingElement.style.display = 'none';

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const studentID = formData.get('studentID');
    const counselorName = formData.get('counselorName');

    const checkIn = {
        studentID,
        counselorName
    };

    loadingElement.style.display = '';
    
    //Need help verifying that student ID is indeed an integer
    if(studentID.length === 6 && Number.isInteger(parseInt(studentID))) {
    fetch(API_URL, {
        method: 'POST', 
        body: JSON.stringify(checkIn),
        headers: {
            'content-type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(createdCheckin => {
        console.log(createdCheckin);
        loadingElement.style.display = 'none'; 
        form.reset();

        })
    .catch(error => console.log(error));
    } else {
        alert('Please enter your student ID');
        location.reload();
    }
});
