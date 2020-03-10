



type = ['', 'info', 'success', 'warning', 'danger'];


demo = {
    initPickColor: function() {
        $('.pick-class-label').click(function() {
            var new_class = $(this).attr('new-class');
            var old_class = $('#display-buttons').attr('data-class');
            var display_div = $('#display-buttons');
            if (display_div.length) {
                var display_buttons = display_div.find('.btn');
                display_buttons.removeClass(old_class);
                display_buttons.addClass(new_class);
                display_div.attr('data-class', new_class);
            }
        });
    },

    initDocumentationCharts: function() {
        /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

        dataDailySalesChart = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                [12, 17, 7, 17, 23, 18, 38]
            ]
        };

        optionsDailySalesChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
        }

        var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

        md.startAnimationForLineChart(dailySalesChart);
    },

    initDashboardPageCharts: function() {

        /* ----------==========     Daily Sales Chart initialization    ==========---------- */

/*  GETTING MOST RECENT AND UPDATING CARD */
var url='https://adroit-listener-194413.appspot.com/current_recent' ;//reference to current_recent route;
$.ajax({
     url:url,
     type:"GET",
     async:false,
     dataType:"json",
     success:function(result){
        recent=result;
       console.log("Data");
       console.log(result);      
     }
   });
            
            for(var i=0;i<recent.length;i++){
            console.log("CHECKING RECENT FOR CHART"+recent[0][i]['sector_id']+recent[0][i]['level'])
            }

            sectors=[];
            current_level=[];
            for(var i=0;i<recent[0].length;i++){
            sectors.push(recent[0][i]['sector_id']);
            current_level.push(recent[0][i]['level']);
            }
        
 


        dataDailySalesChart = {
            labels: sectors,
            series: [
                current_level
            ]
        };

        optionsDailySalesChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 100, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
        }

        var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

        md.startAnimationForLineChart(dailySalesChart);



        /* ----------==========     Completed Tasks Chart initialization    ==========---------- */
//EDITED BY ME




var url="https://api.openweathermap.org/data/2.5/forecast?id=1275339&APPID=58c80ff3f014aae79eb1104f9571f30b";

$.ajax({
     url:url,
     type:"GET",
     async:false,
     dataType:"json",
     success:function(result){
        var weather=result;
       console.log("Data");
       console.log(result);
       $('#predicted_severe_count').text(result.list[2].main.sea_level);
       $('#sea_date').text(result.list[2].dt_txt);
       

       timers=[];
            values=[];
            for(var i=0;i<16;i+=2){
            timers.push(weather.list[i].dt_txt.split(' ')[1].split(':')[0]);
            values.push(weather.list[i].main.temp_min);
        }

        
        console.log("eaxt time");
        console.log(weather.list[i].dt_txt.split(' ')[1].split(':')[0]);
        console.log(values);

        dataCompletedTasksChart = {
            labels: timers,
            series: [
                values
            ]
        };

    
        optionsCompletedTasksChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 290,
            high: 320, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        }

        var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

        // start animation for the Completed Tasks Chart - Line Chart
        md.startAnimationForLineChart(completedTasksChart);


             
     }
   });


//PREDICTION
$.ajax({
     url:'https://www.worldtides.info/api?heights&lat=18.917&lon=72.833&key=341afd3c-5757-45b9-9d18-fe25bb23c3c7',
     type:"GET",
     async:false,
     dataType:"json",
     success:function(result){
        
       console.log("Data");
       console.log(result);
       $('#last_24_rainfall').text(result['heights'][0]['height']);
       $('#tide_date').text(result['heights'][0]['date'].slice(11,));
       //$('#last_24_rainfall').text(result.list[0].main.humidity);
       timers=[];
            values=[];
            for(var i=0;i<10;i+=2){
            timers.push(result['heights'][i]['date'].slice(11,16));

            values.push(result['heights'][i]['height']);
        }

        
        console.log("Tides");
        
        console.log(timers);

        dataCompletedTasksChart = {
            labels: timers,
            series: [
                values
            ]
        };

    
        optionsCompletedTasksChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: -2,
            high: 2, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        }

        var completedTasksChart = new Chartist.Line('#emailsSubscriptionChart', dataCompletedTasksChart, optionsCompletedTasksChart);

        // start animation for the Completed Tasks Chart - Line Chart
        md.startAnimationForLineChart(completedTasksChart);


             
     }
   });



//PREDICTION

//MESSAGES
    
//MESSAGES




//DASHBOARD_OUR JAVASCRIPT HERE STARTS------------------------------------------------------------------->
var link='https://adroit-listener-194413.appspot.com/';
    
        //Call for number of High Severity areas(current)
        $.ajax({
            url:link+'count_current_records', //Reference to count_current_record
            dataType:'json',
            success:function(result){
                console.log('COUNT is------------------------------------------------------>');
                var severe_count=0;
                for(var i=0;i<result.length;i++){
                    if(result[i]['level']>=38){
                        severe_count++;
                    }
                }
                console.log("FROM DEMO COUNT IS "+severe_count);
                $('#current_severe_count').text(severe_count);
            }
        });

         $.ajax({
     url:'https://www.worldtides.info/api?heights&lat=18.917&lon=72.833&key=f72ac5f8-5d98-4676-bb38-b716f08cc0ab',
     type:"GET",
     async:false,
     dataType:"json",
     success:function(result){
        
       console.log("Data from tide");
       console.log(result['heights'][0]['height']);
//       $('#last_24_rainfall').text(result['heights'][0]['height']);
  //     $('#tide_date').text(result['heights'][0]['date'].slice(11,));
   }
});


$.ajax({
            url:'https://adroit-listener-194413.appspot.com/current_recent', //Reference to current_recent
            dataType:'json',
             //async: false,
            success:function(current){
                    
                    //ANOTHER AJAX CALL
                    $.ajax({
                    url:'https://adroit-listener-194413.appspot.com/get_latlng', //Reference to get_latlng
                    dataType:'json',
                    success:function(latlng){
                    map_current=current;
                    map_latlng=latlng;
                    //console.log("INSIDE"+map_current);
                    initMap(map_current,map_latlng);
                    
                     }
                    });        
                
            }
        });         
       

//DASHBOARD_OUR JAVASCRIPT HERE ENDS -------------------------------------------------------------------->
  

        /* ----------==========     Emails Subscription Chart initialization    ==========---------- */
        //EDITED BY ME
        /*
var url="https://api.openweathermap.org/data/2.5/forecast?id=1275339&APPID=58c80ff3f014aae79eb1104f9571f30b";
$.ajax({
     url:url,
     type:"GET",
     async:false,
     dataType:"json",
     success:function(result){
        weather=result;
       console.log("Data");
       console.log(result);
       $('#last_24_rainfall').text(result.list[0].main.humidity);
             
     }
   });
            
            prediction_sector=[];
            prediction_values=[];
            for(var i=0;i<16;i+=2){
            prediction_sector.push(weather.list[i].dt_txt.split(' ')[1].split(':')[0]);
            prediction_values.push(weather.list[i].main.temp_min);
        }
*/
/*

        var dataEmailsSubscriptionChart = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
                [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

            ]
        };
        var optionsEmailsSubscriptionChart = {
            axisX: {
                showGrid: false
            },
            low: 0,
            high: 1000,
            chartPadding: {
                top: 0,
                right: 5,
                bottom: 0,
                left: 0
            }
        };
        var responsiveOptions = [
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function(value) {
                        return value[0];
                    }
                }
            }]
        ];
        var emailsSubscriptionChart = Chartist.Bar('#emailsSubscriptionChart', dataEmailsSubscriptionChart, optionsEmailsSubscriptionChart, responsiveOptions);

        //start animation for the Emails Subscription Chart
        md.startAnimationForBarChart(emailsSubscriptionChart);
        */

    },

    initGoogleMaps: function() {
        var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
        var mapOptions = {
            zoom: 13,
            center: myLatlng,
            scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
            styles: [{
                "featureType": "water",
                "stylers": [{
                    "saturation": 43
                }, {
                    "lightness": -11
                }, {
                    "hue": "#0088ff"
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [{
                    "hue": "#ff0000"
                }, {
                    "saturation": -100
                }, {
                    "lightness": 99
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#808080"
                }, {
                    "lightness": 54
                }]
            }, {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ece2d9"
                }]
            }, {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ccdca1"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#767676"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "poi",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "landscape.natural",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#b8cb93"
                }]
            }, {
                "featureType": "poi.park",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi.sports_complex",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi.medical",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi.business",
                "stylers": [{
                    "visibility": "simplified"
                }]
            }]

        }
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            title: "Hello World!"
        });

        // To add the marker to the map, call setMap();
        marker.setMap(map);
    },

    showNotification: function(from, align) {
        color = Math.floor((Math.random() * 4) + 1);

        $.notify({
            icon: "notifications",
            message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."

        }, {
            type: type[color],
            timer: 4000,
            placement: {
                from: from,
                align: align
            }
        });
    }

}

