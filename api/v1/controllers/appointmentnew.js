const { get } = require('mongoose');
const appointmentsModel = require('../models/appointments');
const moment = require('moment');
require('moment/locale/he'); // חשוב! כדי לטעון עברית

const GetAll = async (req, res) => {
    try {
        const appointments = await appointmentsModel.find().lean();

        const formattedAppointments = appointments.map(appt => ({
            ...appt,
            formattedDate: moment(appt.date)//עריכת שעה כדי שתהיה קריאה
                .locale('he')
                .format('dddd, DD/MM/YYYY [בשעה] HH:mm')
        }));

        res.render('appointment', {
            layout: 'main',
            appointments: formattedAppointments
        });
    } catch (err) {
        console.error("שגיאה בשליפת פגישות:", err);
        res.status(500).send("שגיאת שרת");
    }}


module.exports = {
    GetAll
};









