var mongoose = require('mongoose');

// Create a Activity Schema
var Activity_Schema = new mongoose.Schema({
	Title:String, // Nombre de la actividad
	Type:Number, // Tipo de actividad
	Start_time:String, // Hora de inicio de la actividad
	Ending_time:String, // Hora de finalizacion de la actividad
	Speaker:String, // Nombre del Conferencista o Expositor
	Company:String, // Empresa de la que viene el expositor
	InCharge:String, // Nombre del encargado de la actividad.
	InCharge_Phone:String, //Telefono del encargado de la actividad.

	Description:String, //Descripcion/Detalles de la actividad
	Place:String, // Nombre del lugar donde ser realizara la actividad
	Address:String, // Direccion del lugar en donde se realiza la actividad
	Latitud:String, // Coordenada latitud
	Length:String, // Coordenada longitud
	Img_path:String, // ruta donde se encuentra la imagen que se requiera desplegar	
	Icon:Number, // Id del icono representativo de cada taller/visita tecnica
	Day_Id:String, // Id del dia al que pertenece la actividad
	Date:String	
});

// Create a model based on the Activity Schema
var activity_model = mongoose.model('Activity', Activity_Schema);

module.exports = activity_model;