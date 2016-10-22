// Load mongoose package
var mongoose = require('mongoose');

// Loading monoose models
var day_model = require('../schemas/day_schema');
var activity_model = require('../schemas/activity_schema');

var activities; // Activitie array!!

var get_day_id = function (err,data) { // Callback to Query the ID of a specific Day
  	if (err) {
		console.log("ERROR:" + err);
		return console.error(err);
	}
  	else{
		Create_Activities(data[0]._id.toString());
	}
}

module.exports = function() { // Creting a new day with all activities in it.

	this.Create_Day = function (data){ //Recibe un arreglo dia

			var new_day = new day_model(
				{ 
					Activity:data.sd_activity, 
					Day_Start_Time:data.sd_day_start_time, 
					Day_Ending_Time:data.sd_day_ending_time, 
					Date:data.sd_date,
					success:1 
				});

			// Save day to database
			new_day.save(function(err){
			  if(err)
			    console.log(err);
			  else	  	
			    console.log(new_day);		
			});
		};

	this.Get_Date_Activity = function(data){

		activities = JSON.parse(data.activities);
		day_model.find({Date:data.sd_date},{"_id":1}, get_day_id); //Busca el registro insertado

	};
}

function Create_Activities(day_id) { //Creating all days activities.
	// Craeate a new activity on a specific day
	for (var i = activities.length - 1; i >= 0; i--) {
		
		var new_activity = new activity_model(
		{
			Title:activities[i].sa_title,
			Type:activities[i].sa_type,
			Start_time:activities[i].sa_start_time,
			Ending_time:activities[i].sa_ending_time,
			Speaker:activities[i].sa_speaker,
			Company:activities[i].sa_company,
			InCharge:activities[i].sa_incharge,
			InCharge_Phone:activities[i].sa_incharge_phone,

			//Detalles
			Description:activities[i].dsa_description,
			Place:activities[i].dsa_place,
			Address:activities[i].dsa_address,
			Latitud:activities[i].dsa_latitud,
			Length:activities[i].dsa_length,
			Img_Path:activities[i].dsa_img_path,
			Icon:activities[i].dsa_icon,
			Date:activities[i].dsa_date,
			
			Day_Id:day_id, //Id del dia		
			success:1
		});

		//Save new activity to database
		new_activity.save(function(err){
			if(err)
				console.log(err);
			else
				console.log(new_activity);
		});

	}
}