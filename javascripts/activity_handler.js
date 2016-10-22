var socket = io(); //Iniciando conexion con el servidor a travez de socket io.
var activity_array = new Array(); //Arreglo de actividades por dia

function Create_Day()
{
	// Info general sobre un dia
	var activity = $('#activity').val();
	var day_start_time = $('#day_start_time').val();
	var day_ending_time = $('#day_ending_time').val();
	var date = $('#date').val();

	var single_day = 
	{
		sd_activity:activity.toString(),
		sd_day_start_time:day_start_time.toString(),
		sd_day_ending_time:day_ending_time.toString(),
		sd_date:date.toString()
	}

	console.log("Sending data to server");

	socket.emit('day_activities', single_day);
	socket.on('response', function(data) {
    	alert(data);
    });
}

function Save_All_Activities(){

	var activities = {
		sd_date:$('#date').val().toString(),
		activities:JSON.stringify(activity_array)
	}

	socket.emit('save_activities', activities);
	socket.on('response', function(data) {
    	alert(data);
    });
}

function Save_Activity() {
    
    //Info general sobre una actividad
	var title = $('#title').val();
	var type = $('#type').val();
	var icon = $('#icon').val();
	var start_time = $('#start_time').val();
	var ending_time = $('#ending_time').val();
	var speaker = $('#speaker').val();
	var company = $('#company').val();
	var incharge = $('#incharge').val();
	var incharge_phone = $('#incharge_phone').val();

	//Info detallada sobre una actividad
	var description = $('#description').val();
	var place = $('#place').val();
	var address = $('#address').val();
	var latitud = $('#latitud').val();
	var length = $('#length').val();
	var img_path = $('#img_path').val();
	var date = $('#date').val();

	var single_activity = //Creando JSON de una sola actividad
	{
		//Actividad
		sa_title:title.toString(),
		sa_type:parseInt(type),
		sa_start_time:start_time.toString(),
		sa_ending_time:ending_time.toString(),
		sa_speaker:speaker.toString(),
		sa_company:company.toString(),
		sa_incharge:incharge.toString(),
		sa_incharge_phone:incharge_phone.toString(),

		//Detalle de cada actividad
		dsa_description:description.toString(),
		dsa_place:place.toString(),
		dsa_address:address.toString(),
		dsa_latitud:latitud.toString(),
		dsa_length:length.toString(),
		dsa_icon:parseInt(icon),
		dsa_img_path:img_path.toString(),
		dsa_date:date.toString()
	}

	activity_array.push(single_activity); //Guardando cada actividad en un array
	
	console.log("saved activity data in memory");
	alert("Activity Saved in Memory");
}

function New_Activity()
{

	//Info general sobre una actividad
	$('#title').val("");
	$('#start_time').val("");
	$('#ending_time').val("");
	$('#speaker').val("");
	$('#company').val("");
	$('#incharge').val("");
	$('#incharge_phone').val("");

	//Info detallada sobre una actividad
	$('#description').val("");
	$('#place').val("");
	$('#address').val("");	
	$('#location').val("");
	$('#latitud').val("");
	$('#length').val("");
	$('#img_path').val("");
}

function Clear_Day()
{
	// Info general sobre un dia
	$('#activity').val("");
	$('#day_start_time').val("");
	$('#day_ending_time').val("");
	$('#date').val("");	
}

function Clear_All()
{
	//Liberando memoria
	activity_array = [];

	// Info general sobre un dia
	$('#activity').val("");
	$('#day_start_time').val("");
	$('#day_ending_time').val("");
	$('#date').val("");

	//Info general sobre una actividad
	$('#title').val("");
	$('#start_time').val("");
	$('#ending_time').val("");
	$('#speaker').val("");
	$('#company').val("");
	$('#incharge').val("");
	$('#incharge_phone').val("");

	//Info detallada sobre una actividad
	$('#description').val("");
	$('#place').val("");
	$('#address').val("");	
	$('#location').val("");
	$('#latitud').val("");
	$('#length').val("");
	$('#img_path').val("");

}