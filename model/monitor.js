const mongoose = require('mongoose');

const {
    validateSensorName,
    validateSensorType
} = require('./validation');

const Sensoren_TestSchema = new mongoose.Schema({
    when: {
        type: Date,
        required: true
    },
    sensor_name: {
        type: String,
        required: true,
        validate: validateSensorName
    },
    sensor_type: {
        type: String,
        required: true,
        validate: validateSensorType
    },
    temperature: {
        type: Number,
        required: true
    }
});
//const TrimWheelV42Schema = new mongoose.Schema({
//    when: {
//        type: Date,
//        required: true
//    },
//    sensor_name: {
//        type: String,
//        required: true,
//        validate: validateSensorName
//    },
//    sensor_type: {
//        type: String,
//        required: true,
//        validate: validateSensorType
//    },
//    temperature: {
//        type: Number,
//        required: true
//    }
//});

//const TrimWheelV50Schema = new mongoose.Schema({
//    when: {
//        type: Date,
//        required: true
//    },
//    sensor_name: {
//        type: String,
//        required: true,
//        validate: validateSensorName
//    },
//    sensor_type: {
//        type: String,
//        required: true,
//        validate: validateSensorType
//    },
//    temperature: {
//        type: Number,
//        required: true
//    }
//});

module.exports = {
    Sensoren_Test: mongoose.model('Sensoren_Test', Sensoren_TestSchema),
    //TrimWheelV42: mongoose.model('TrimWheelV42', TrimWheelV42Schema),
   // TrimWheelV50: mongoose.model('TrimWheelV50', TrimWheelV50Schema)
};
