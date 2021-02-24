const Authors = ['Sissy','Kaifeng','Tianxing','Moritz','Fabian'];
const IssueDescriptions = ['Minor','Major','Urgent','Critical'];
const RevisionDescriptions = ['Repair','Replace','Discard','Change'];
const PartStatuses = ['ok','good','bad'];
const Suppliers = ['KSB','Jung Pumpen','NEES'];

const Sensors = ['Füllstand Zufluss','Füllstand Pumpe', 'Leckage'];
const SensorTypes = ['mm', 'mm', ' '];

function validateSensorName(value) {
    return Sensors.includes(value);
}

function validateSensorType(value) {
    return SensorTypes.includes(value);
}
function validateAuthor(value) {
    return Authors.includes(value);
}

function validatePartStatus(value) {
    return PartStatuses.includes(value);
}

function validateIssueDescription(value) {
    return IssueDescriptions.includes(value);
}

function validateRevisionDescription(value) {
    return RevisionDescriptions.includes(value);
}

function validateSupplier(value) {
    return Suppliers.includes(value);
}

module.exports = {
    validateSensorName,
    validateSensorType,
    validateAuthor,
    validatePartStatus,
    validateIssueDescription,
    validateRevisionDescription,
    validateSupplier
};
