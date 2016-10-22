var mongoose = require('mongoose');

// Create a day schema
var Day_Schema = new mongoose.Schema({
  Activity: String,// Nombre de la actividd
  Day_Start_Time: String, // Hora de inicio del dia
  Day_Ending_Time: String, // Hora de finalizacion del dia
  Date: String // Fecha
});

// Create a model based on the Day schema
var day_model = mongoose.model('Day', Day_Schema);

module.exports = day_model;