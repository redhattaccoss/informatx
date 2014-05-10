require.config({ 
    //path mappings for module names not found directly under baseUrl 
    paths: { 
        jquery:     'vendor/jqm/jquery', 
        jqm:     'vendor/jqm/jquery.mobile-1.4.1.min', 
        underscore: 'vendor/underscore/underscore-min', 
        backbone:   'vendor/backbone/backbone-min', 
        pushnotif:   'PushNotification', 
        
        text:       'vendor/require/text', 
        plugin:    'plugin', 
        router:'router',
        templates:  '../templates', 
        modules:    '../modules', 
        model:       '../model' 
    } 
 
}); 

//bootstrap device ready events
function onDeviceReady(){
	initializePushNotification();
} 

//initialize Push notification
function initializePushNotification(){
	var pushNotification;
	
	pushNotification = window.plugins.pushNotification;
	//get push notification info
	if(device.platform == 'android' || device.platform == 'Android') {
		
		pushNotification.register(successHandler, errorHandler,{"senderID":"696026617591","ecb":"onNotificationGCM"});
	} else {
		pushNotification.register(tokenHandler, errorHandler, {
			"badge" : "true",
			"sound" : "true",
			"alert" : "true",
			"ecb" : "onNotificationAPN"
		});
	}
	
} 
 
//PHONEGAP RELATED
//android receive authorization
function successHandler(result) {
	//alert("Success"+result);
}

//ios receive authorization
function tokenHandler(result) {
	//alert(result);
}

//error handler
function errorHandler(result) {
	//alert("Error: "+result);
}

function onAndroidConfirm(buttonIndex){
	if (buttonIndex==2){
		var data = {company_id:APP_ID, device_uuid:DEVICE_UUID}
		jQuery.post(BASE_URL+"/api/android_device_push_notifications/sync_device_information/", data, function(response){
		
		});
	}
}

// Android Notification Handler
function onNotificationGCM(e) {
	switch( e.event ) {
		case 'registered':
			if(e.regid.length > 0) {
				DEVICE_UUID = e.regid;
			}
			var data = {company_id:APP_ID, device_uuid:DEVICE_UUID}
			jQuery.post(BASE_URL+"/api/android_device_push_notifications/get_device_information/", data, function(response){
				if (response.success&&response.notFound){
					navigator.notification.confirm(
				        'Do you want to receive notifications about the latest news about Amarantus?', // message
				         onAndroidConfirm,            // callback to invoke with index of button pressed
				        'Notice',           // title
				        'No,Yes'         // buttonLabels
				    );
				}
			});
			break;

		case "message":
			break;
	}
}

// IOS Notification Handler
// IOS Notification Handler
// iOS
function onNotificationAPN (event) {
    if ( event.alert )
    {
        navigator.notification.alert(event.alert);
    }

    if ( event.sound )
    {
        var snd = new Media(event.sound);
        snd.play();
    }

    if ( event.badge )
    {
        pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
    }
}
 
//1. load app.js, 
//2. configure jquery mobile to prevent default JQM ajax navigation 
//3. bootstrapping application 
define(['app','jqm-config'], function(app) { 
    $(document).ready(function() { 
    	// are we running in native app or in a browser?
	    window.isphone = false;
	    if(document.URL.indexOf("http://") === -1 
	        && document.URL.indexOf("https://") === -1) {
	        window.isphone = true;
	    }
       if( window.isphone ) {
	         
			//on device ready event
			 document.addEventListener("deviceready", onDeviceReady, false);
	    } else {
	        onDeviceReady();
	    }
    });    
    $(document).on("mobileinit", function(){
	    $.mobile.defaultPageTransition   = 'none';
	    $.mobile.defaultDialogTransition = 'none';
	});
    app.initialize(); 
});