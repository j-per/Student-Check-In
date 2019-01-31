const express = require('express');
const cors = require('cors');
const app = express();
const monk = require('monk');
const moment = require('moment');
const db = monk('localhost/studentcheckin');
const checkins = db.get('checkins');
const timeFormat = moment().format("L, LTS");

console.log(timeFormat);

console.log();
app.use(cors());
app.use(express.json());


//Sends all data from DB to counslor_backend
app.get('/counselorview', (req, res) => {
    checkins.find({}).then((docs) => {
        res.json(docs)
    })    
});

//Validates data being sent to MongoDB Server
function isValidStudentCheckin(studentAndCounselor) {
    return studentAndCounselor.studentID && studentAndCounselor.studentID.toString().trim() !== '' &&
    studentAndCounselor.counselorName && studentAndCounselor.counselorName.toString().trim() !== '';
}

//Takes data from form, creates object, inserts into DB, and returns it to console.log
const test = app.post('/studentcheckin', (req, res) => {
    if(isValidStudentCheckin(req.body)) {
        //insert into db
        const studentIDAndCounselor = {
            studentID: req.body.studentID.toString(),
            counselorName: req.body.counselorName.toString(),
            created: timeFormat
        };

        checkins
            .insert(studentIDAndCounselor)
            .then(createdCheckin => {
                res.json(createdCheckin); 
            });

    } else {
        res.status(422);
        res.json({
            message: 'Student ID & Counselor Are Required'
        });
    }
});

app.listen(5000, () => {
    console.log('Listening on http://localhost:5000');
});