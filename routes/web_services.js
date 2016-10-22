// Load mongoose package
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

// Loading monoose models
var day_model = require('../schemas/day_schema');
var activity_model = require('../schemas/activity_schema');

/**
 * @api {get} /web_services/get_days Request Days information
 * @apiName GetDays
 * @apiGroup Days
 *
 *
 * @apiSuccess {ObjectId} _id Id del dia.
 * @apiSuccess {String} Activity  Nombre de la Actividad a realizar en el dia.
 * @apiSuccess {String} Day_Start_Time Hora de inicio del dia.
 * @apiSuccess {String} Day_Ending_Time  Hora de finalizacion del dia.
 * @apiSuccess {String} Date Fecha del dia.
 * @apiSuccess {int} success  Valor de confirmacion.
 * @apiSuccess {int} __v  Valor de la bd.
 
 * @apiSuccessExample Success-Response:
 *   HTTP/get_days 200 OK
 * {
 *  "Dias": [{
 *    "_id" : "57c64ecd8785aa2015c2b948",
 *    "Activity" : "Conferencias",
 *    "Day_Start_Time" : "7:00",
 *    "Day_Ending_Time" : "18:00",
 *    "Date" : "07/07/2017"
 *   }, {
 *    "_id" : "57c64ecd8785aa2015c2b948",
 *    "Activity" : "Conferencias",
 *    "Day_Start_Time" : "7:00",
 *    "Day_Ending_Time" : "18:00",
 *    "Date" : "08/07/2017"
 *   }],
 *    "success":1
 * }

 * @apiError DayNotFound The day was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/get_days 404 Not Found 
 *    {
 *       "success": 0,
 *       "descripcion": Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
 *     }

 */

/*--------------->GET ALL EVENT DAY's<----------*/
router.get('/get_days',function(req,res, next)
{
  try {
      //day_model.find({}, get_day);
      day_model.find({},{"_id":1,"Activity":1,"Day_Start_Time":1,"Day_Ending_Time":1,"Date":1},function (err, days_data) {
        if (err) return console.error(err);
          var days = [];
          for (var i = days_data.length - 1; i >= 0; i--) {
            var day =
              {
                Id:days_data[i]._id,
                Activity:days_data[i].Activity,
                Day_Start_Time:days_data[i].Day_Start_Time,
                Day_Ending_Time:days_data[i].Day_Ending_Time,
                Date:days_data[i].Date                           
              };
              days.push(day);
          };
          res.send({
            Dias:JSON.parse(JSON.stringify(days)),
            success:1
          });
      });
  }catch(e) {
    res.send({ success:0, descripcion:e.toString() }); // Sending signal to client of unsuccessful request
    console.log("Unable to get all the days from the Database");
    console.log("Error Qx00001 \n Error Description \n" + e); // Qx0001 --> No se pudo extraer la info de todos los dias de la bd
  }

});

/**
 * @api {get} /web_services/get_activities:id Request Activities information from a specific day
 * @apiName GetActivities
 * @apiGroup Activities
 *
 * @apiParam {Number} id Day unique ID.
 *
 * @apiSuccess {ObjectId} _id Id de la actividad.
 * @apiSuccess {String} Title  Conferencia/Taller/Inauracion.
 * @apiSuccess {Number} Tipo  1. (Inauguracion)/2. (Conferencia)/3. (Taller)/4. (Visita Tecnica)/5. (Cena de Gala)/6. (Noche de Convivencia).
 * @apiSuccess {String} Start_Time Hora de inicio de la actividad.
 * @apiSuccess {String} Ending_Time  Hora de finalizacion de la actividad.
 * @apiSuccess {String} Speaker Nombre del Conferencista.
 * @apiSuccess {int} Icon Identificador de cada imagen correspondiente a un taller/visita tecnica.
 * @apiSuccess {int} success  Valor de confirmacion.
 
 * @apiSuccessExample Success-Response:
 * HTTP/get_activities:id 200 OK
 *  {
 *    "Actividades": [{
 *      "_id" : "12398765sdfg234",
 *      "Title" : "Cloud Computing",
 *      "Type": 2,
 *      "Start_time" : "09:00",
 *      "Ending_time" : "10:00",
 *      "Speaker" : "Tony Stark",
 *      "Icon": 7
 *    },
 *    {
 *      "_id" : "098321asdf234",
 *      "Title" : "Taller Rayos Gama",
 *      "Type": 3,
 *      "Start_time" : "10:00",
 *      "Ending_time" : "11:00",
 *      "Speaker" : "Dr.Bruce Banner",
 *      "Icon": 8
 *    }],
 *    "success":1
 * }
 *
 * @apiError ActivitiesNotFound The actvities from a specified day id was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/get_activities:id 404 Not Found
 *     {
 *       "success": 0,
 *        "descripcion": Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
 *     }

 */

/*--------------->GET ACTIVITY OF A SINGLE DAY<----------*/
router.get('/get_activities:id',function(req,res, next)
{
  try {
  		  activity_model.find({"Day_Id":req.params.id},{"_id:":1,"Title":1, "Type":1,"Start_time":1,"Ending_time":1,"Speaker":1,"Icon":1},function (err, activities_data) {
          if (err) return console.error(err);
          var activities = [];
          for (var i = activities_data.length - 1; i >= 0; i--) {
            var activity =
              {
                Id:activities_data[i]._id,
                Titulo:activities_data[i].Title,
                Type:activities_data[i].Type,
                Start_Time:activities_data[i].Start_time,
                Ending_Time:activities_data[i].Ending_time,
                Speaker:activities_data[i].Speaker,
                Icon:activities_data[i].Icon                           
              };
              activities.push(activity);
          };
          res.send({
            Actividades:JSON.parse(JSON.stringify(activities)),
            success:1
          });
        });

  }catch(e) {
    res.send({ success:0, descripcion:e.toString() }); // Sending signal to client of unsuccessful request
    console.log("Unable to get activities from Database");
    console.log("Error Qx00002 \n Error Description \n" + e); // Qx0002 --> No se pudo extraer la info de la actividad del dia especificado de la bd
  }

});

/**
 * @api {get} /web_services/get_activity_detail:id Request Detail information from a specific Activity
 * @apiName GetActivitiesDetail
 * @apiGroup ActivitiesDetail
 *
 * @apiParam {Number} id Activity unique ID.
 *
 * @apiSuccess {ObjectId} _id Id de la actividad.
 * @apiSuccess {String} Title  Conferencia/Taller/Inauracion.
 * @apiSuccess {Number} Tipo  1. (Inauguracion)/2. (Conferencia)/3. (Taller)/4. (Visita Tecnica)/5. (Cena de Gala)/6. (Noche de Convivencia).
 * @apiSuccess {String} Start_Time Hora de inicio de la actividad.
 * @apiSuccess {String} Ending_Time  Hora de finalizacion de la actividad.
 * @apiSuccess {String} Place  Nombre del lugar donde se realizara la actividad.
 * @apiSuccess {String} Address  Direccion del lugar donde se realizara la actividad.
 * @apiSuccess {String} Speaker Nombre del Conferencista.
 * @apiSuccess {String} Company Nombre de la compañia patrocinadora.
 * @apiSuccess {String} InCharge Nombre del staff encargado de la actividad (Para Talleres).
 * @apiSuccess {String} InCharge_Phone Telefono del staff encargado de la actividad (Para Talleres).
 * @apiSuccess {String} Description Pequeña descripcion de la actividad.
 * @apiSuccess {String} Location Nombre y direccion del lugar donde se realizara la actividad.
 * @apiSuccess {String} Latitud Coordenada de Latitud para localizar la actividad en un mapa.
 * @apiSuccess {String} Length Coordenada de Longitud para localizar la actividad en un mapa.
 * @apiSuccess {String} Day_id Id del dia a la que pertenece la actividad.
 * @apiSuccess {int} Icon Identificador de cada imagen correspondiente a un taller/visita tecnica.
 * @apiSuccess {String} Date Fecha de la actividad.
 * @apiSuccess {int} success  Valor de confirmacion.
 * @apiSuccessExample Success-Response:
 *   HTTP/get_activity_detail:id 200 OK
 *  {
 *    "Detalle": {
 *      "_id":"123456789",
 *      "Title" : "Cloud Computing",
 *      "Type:" 2,
 *      "Start_time" : "15:00",
 *      "Ending_time" : "16:00",
 *      "Place": "Avengers Tower",
 *      "Address": "350 5th Ave, New York, NY 10118",
 *      "Speaker" : "Tony Stark",
 *      "Company" : "USAC",
 *      "InCharge" : "Robert Baratheon",
 *      "InCharge_Phone" : "1234-5678",
 *      "Description" : "Cloud Computing, el destino de nuestra informacion",
 *      "Location" : "USAC",
 *      "Latitud" : "1234",
 *      "Length" : "-987",
 *      "Day_Id" : "123",
 *      "Icon" : 7,
 *      "Date" : 14/08/1992     
 *    },
 *       "success" : 1
 *  }
 *
 * @apiError DetailActivityNotFound The id of the activity was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/get_activity_detail:id 404 Not Found
 *    {
 *       "success": 0
 *       "descripcion": Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
 *    }
*/

/*--------------->GET DETAIL OF A SINGLE ACTIVITY<----------*/
router.get('/get_activity_detail:id',function(req,res, next)
{
  try {
        var ObjectId = mongoose.Types.ObjectId(req.params.id);
        //db.activities.find({Day_Id:ObjectId("57bfe54e464bc9d5243aa059")}).pretty()
        activity_model.find({"_id":ObjectId},function (err, detail_data) {
          if (err) return console.error(err);
          var detalle = 
          {
            Id:detail_data[0]._id,
            Title:detail_data[0].Title,
            Type:detail_data[0].Type,
            Start_time:detail_data[0].Start_time,
            Ending_time:detail_data[0].Ending_time,
            Speaker:detail_data[0].Speaker,
            Company:detail_data[0].Company,
            InCharge:detail_data[0].InCharge,
            InCharge_Phone:detail_data[0].InCharge_Phone,
            Description:detail_data[0].Description,
            Place:detail_data[0].Place,
            Address:detail_data[0].Address,
            Latitud:detail_data[0].Latitud,
            Longitud:detail_data[0].Length,
            Id_Dia:detail_data[0].Day_Id,
            Icon:detail_data[0].Icon,
            Img_path:detail_data[0].Img_path,
            Date:detail_data[0].Date
          };
          res.send({
            Detalle:detalle,
            success:1
          });
        });

  }catch(e) {
    res.send({ success:0, descripcion:e.toString() }); // Sending signal to client of unsuccessful request
    console.log("Unable to get day from Database");
    console.log("Error Qx00003 \n Error Description \n" + e); // Qx0002 --> No se pudo extraer la info de la actividad del dia especificado de la bd
  }

});

/**
 * @api {get} /web_services/get_places Request Name and Address from all Places
 * @apiName GetPlaces
 * @apiGroup Places
 *
 * @apiSuccess {String} Lugar  JSON de un lugar en especifico.
 * @apiSuccess {String} Nombre Nombre del lugar donde se realizaran las actividades.
 * @apiSuccess {String} Direccion  Direccion del lugar donde se realizaran las actividades.
 * @apiSuccess {String} Latitud Coordenada de Latitud para localizar la actividad en un mapa.
 * @apiSuccess {String} Longitud Coordenada de Longitud para localizar la actividad en un mapa.
 * @apiSuccess {int} success Valor de confirmacion.
 * @apiSuccessExample Success-Response:
 *   HTTP/get_places 200 OK
 *{
 *  "Lugares": [{
 *    "Nombre": "Ministerio de Gobernacion",
 *    "Direccion": "14 calle y 6a. ave. Zona 1",
 *    "Latitud": "14.635343",
 *    "Longitud": "-90.514662"
 *  }, {
 *    "Nombre": "Universidad del Valle de Guatemala",
 *    "Direccion": "18 Avenida 11-95 zona 15,, Vista Hermosa 3",
 *    "Latitud": "14.604655",
 *    "Longitud": "-90.489313"
 *  }],
 *  "success": 1
 *}
 *
 * @apiError GetPlacesNotFound Places where not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/get_activity_detail:id 404 Not Found
 *    {
 *       "success": 0
 *       "descripcion": Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
 *     }
*/

/*--------------->GET ADDRESS OF ACTIVITIES PLACES<----------*/
router.get('/get_places',function(req,res, next)
{
  try {
        //db.activities.aggregate([{"$group":{"_id":{"Place":"$Place","Address":"$Address"}}}])
        activity_model.aggregate(
            [
              {
                "$group":{"_id":{"Place":"$Place","Address":"$Address","Latitud":"$Latitud","Length":"$Length"}}
              }
            ],function (err, data) {
                if (err) return console.error(err);
                var places = [];
                for (var i = data.length - 1; i >= 0; i--) {
                     var place =
                     {
                        Nombre:data[i]._id.Place,
                        Direccion:data[i]._id.Address,
                        Latitud:data[i]._id.Latitud,
                        Longitud:data[i]._id.Length                           
                     };
                     places.push(place);
                };
                res.send({
                  Lugares:JSON.parse(JSON.stringify(places)),
                  success:1
                });
        });

  }catch(e) {
    res.send({ success:0, descripcion:e.toString() }); // Sending signal to client of unsuccessful request
    console.log("Unable to get Places from Database");
    console.log("Error Qx00003 \n Error Description \n" + e); // Qx0002 --> No se pudo extraer la info de la actividad del dia especificado de la bd
  }

});

module.exports = router;