//
// AJAX functions.
//

function ra_expand (field) {
  try {
    var url= document.getElementById(field).getAttribute('url');
    url = url + '&action=expand';
	// debug_alert("sending URL "+url);
    document.getElementById(field).setAttribute('class', 'refine-item refine-item-open');
    $.ajax({
		url: url,
		type: "POST",
		timeout: 500000,
		success: function( data ) {
	   		ra_action(field, data, 'expand');
		},
		error: function( data ) {
			ra_error ("expand", data);
		}
	});
   } catch (e) {
    ;
   }
}

function ra_collapse (field) {
  try {
    var url= document.getElementById(field).getAttribute('url');
    url = url + '&action=collapse';
   
    document.getElementById(field).setAttribute('class', 'refine-item');
	// debug_alert("sending URL "+url);
  
    $.ajax({
		url: url,
		type: "POST",
		timeout: 500000,
		success: function( data ) {
	   		ra_action(field, data, 'collapse');
		},
		error: function( data ) {
			ra_error ("collapse", data);
		}
	});
   } catch (e) {
    ;
   }
}

function ra_more(field) {
  var url= document.getElementById(field).getAttribute('url');
  url = url + '&action=more';
  
  dojo.io.bind({
    url: url,
    load: function(type, data, evt) { ra_action(field, data); },
    mimetype: "text/plain"
  });
}

// callback function for RA actions - expand, collapse and more.
function ra_action (field,data,action) {
  try {
    var target = document.getElementById(field);
  
    document.getElementById("tmp_ajax").innerHTML=data;
  
    if (target !=null && action == 'expand') {
    	var expanded = document.getElementById("tmp_" + field).innerHTML;
    	if (expanded.length) {
            target.innerHTML = expanded;
            target.style.display = '';
            target.style.visiblility = 'visible'; 
            document.getElementById(field).setAttribute('class', 'refine-item refine-item-open');
    	}
    }
   } catch (e) {
    ;
   }
}

// ra error handling function
function ra_error (type, error) {
  try {
    var form = document.getElementById("summary_navigation");
  
    if (form != null) {
        form.submit();
    }
  } catch (e) {
      ;
  }
}

function ra_showRefinePanel (field) {
  var url= document.getElementById(field).getAttribute('url');
  url = url + '&action=showRefinePanel';

	// debug_alert("sending URL "+url);
  dojo.io.bind({
    url: url,
    load: function(type, data, evt) { ra_panel_action(field, data, 'showRefinePanel'); },
    mimetype: "text/plain"
  });
}

function ra_hideRefinePanel (field) {
  var url= document.getElementById(field).getAttribute('url');
  url = url + '&action=hideRefinePanel';
  
	// debug_alert("sending URL "+url);
  dojo.io.bind({
    url: url,
    load: function(type, data, evt) { ra_panel_action(field, data, 'hideRefinePanel'); },
    mimetype: "text/plain"
  });
}
// callback function for RA actions - expand, collapse and more.
function ra_panel_action (field,data,action) {
  var target = document.getElementById(field);
  
  document.getElementById("tmp_ajax").innerHTML=data;
  
  if (target && action == 'show') {
      target.innerHTML=document.getElementById("tmp_" + field).innerHTML;
      target.getElementById(field).style.display='';
      target.getElementById(field).style.visiblility='visible';
  } 
	// debug_alert("finished panel action");
}


function daisy_action_clearall (url) {
  //var url= url;
  
  var message = "dojo url is " + url ;

  
  dojo.io.bind({
    url: url,
    load: function(type, data, evt) { },
    mimetype: "text/plain"
  });
}

// used for ajax "status update" calls that need no error checking
//   and provide no useful data back 
function simple_update_action (url) {
  //var url= url;
  
  var message = "dojo url is " + url ;

  // debug_alert(message);  
  dojo.io.bind({
    url: url,
    encoding: "utf8",
    load: function(type, data, evt) { },
    mimetype: "text/plain"
  });
}

// method to save the form data asynchronously. 
function saveForm (formId) {

	// debug_alert( 'in saveForm');
  if (formId == null) {
      return false;
  }
  
  var form = dojo.byId(formId);
  
  if (form == null) {
      return false;
  }
  
  var url = null;
  
  url = form.getAttribute('auto_save_url');
  
  if (url == null) {
      return false;
  }
  
  //if the browser is not support place holder, we need to remove placeholder text before we submit
  if (!$.fn.placeholder.input) {
  	var f1;
  	if(formId){
	        f1 = document.forms[formId];        
			var $inputs = $('.placeholder', f1).each(function(){
				this.value = '';
				//$(this).removeClass('placeholder');
			});

  	}
  } 
  
  var sid = document.forms[formId].elements["SID"].value;
  var product = document.forms[formId].elements["product"].value;
  var search_mode = document.forms[formId].elements["search_mode"].value;
  
  url = url + '&SID=' + sid + '&product=' + product + '&search_mode=' + search_mode;
  
  try {
    dojo.io.bind({
      url: url,
      encoding: "utf8",
      sync: false,
      formNode: form,
      mimetype: "text/plain"
    });
  }  catch (e)  {
    return false;
  }
  //if the browser is not support place holder, we need to recover placeholder text after we submit
  if (!$.fn.placeholder.input) {
  	var f1;
  	if(formId){
	        f1 = document.forms[formId]; 
			var $inputs = $('.placeholder', f1).each(function(){
				this.value = $(this).attr("placeholder");
			});

  	}
  } 
  return false;
}

// For Save to Menu persistent
// method to save the form data asynchronously. 
function saveOutputForm (formId) {

	// debug_alert( 'in saveForm');
  if (formId == null) {
      return false;
  }
  var saveToVal = document.getElementById("saveToMenu").value;
  document.getElementById("saveToMenuDefault").value = saveToVal;
  var form = dojo.byId(formId);
  
  if (form == null) {
      return false;
  }
  
  var url = null;
  
  url = form.getAttribute('auto_save_url');
  
  if (url == null) {
      return false;
  }
  
  //if the browser is not support place holder, we need to remove placeholder text before we submit
  if (!$.fn.placeholder.input) {
  	var f1;
  	if(formId){
	        f1 = document.forms[formId];        
			var $inputs = $('.placeholder', f1).each(function(){
				this.value = '';
				//$(this).removeClass('placeholder');
			});

  	}
  } 
  
  var sid = document.forms[formId].elements["SID"].value;
  var product = document.forms[formId].elements["product"].value;
  var search_mode = document.forms[formId].elements["search_mode"].value;
  
  url = url + '&SID=' + sid + '&product=' + product + '&search_mode=' + search_mode;
  
  try {
    dojo.io.bind({
      url: url,
      encoding: "utf8",
      sync: false,
      formNode: form,
      mimetype: "text/plain"
    });
  }  catch (e)  {
    return false;
  }
  //if the browser is not support place holder, we need to recover placeholder text after we submit
  if (!$.fn.placeholder.input) {
  	var f1;
  	if(formId){
	        f1 = document.forms[formId]; 
			var $inputs = $('.placeholder', f1).each(function(){
				this.value = $(this).attr("placeholder");
			});

  	}
  } 
  return false;
}

function logAccessEvent(url) {

	//debug_alert( 'in logAccessEvent');
	if (url == null) {
	    return false;
	}
	$.ajax({type:'GET', 
        url: url,
        success: function(data) {
            //alert("logAccessEvent success");
        },
        error: function(data){
            //alert("logAccessEvent ERROR");
        }  
    });

	return false;
}

// For DIIDW-CHEM to handle Chime plugin
function saveDCRForm (formId) {

	// debug_alert( 'in saveForm');
  if (formId == null) {
      return false;
  }
  
  var form = dojo.byId(formId);
  
  if (form == null) {
      return false;
  }
  
  var url = null;
  
  url = form.getAttribute('auto_save_url');
  
  if (url == null) {
      return false;
  }
  
  var sid = document.forms[formId].elements["SID"].value;
  var product = document.forms[formId].elements["product"].value;
  var search_mode = document.forms[formId].elements["search_mode"].value;
  
  url = url + '&SID=' + sid + '&product=' + product + '&search_mode=' + search_mode;
  var newForm=form.cloneNode(true);
  //this is a huge bug in JAVASCRIPT,cloneNode loses form field states in IE6 & IE7 
  newForm.innerHTML=form.innerHTML;
  
  for(var i=0;i<newForm.elements.length;i++){
	var v=newForm.elements[i].value;
	var t=newForm.elements[i].type;
   	if(typeof v == 'undefined'){		 
		 newForm.elements[i].value="";
    }
	if(t == null){
		newForm.elements[i].type="unknown";
	}   	
  }
  //here we handle the radio input
  for(var i=0;i<newForm.elements.length;i++){
	var v=newForm.elements[i].value;
	var t=newForm.elements[i].type;
	var c=newForm.elements[i].checked;
	var n=newForm.elements[i].name;
	
	if(t=='radio' && c==false){
		newForm.elements[i].name="ignore";
	}
	//debug_alert( 'SHANG3.3:v:'+v+':t:'+t+':checked:'+newForm.elements[i].checked+':n:'+newForm.elements[i].name);
  }
  
  
  try {
    dojo.io.bind({
      url: url,
      sync: false,
      formNode: newForm,
      mimetype: "text/plain"
    });
  }  catch (e)  {
    return false;
  }
  
  return false;
}

// For radio button persistent problem
function saveRadioForm (formId) {

	// debug_alert( 'in saveForm');
  if (formId == null) {
      return false;
  }
  
  var form = dojo.byId(formId);
  
  if (form == null) {
      return false;
  }
  
  var url = null;
  
  url = form.getAttribute('auto_save_url');
  
  if (url == null) {
      return false;
  }
  
  var sid = document.forms[formId].elements["SID"].value;
  var product = document.forms[formId].elements["product"].value;
  var search_mode = document.forms[formId].elements["search_mode"].value;
  
  url = url + '&SID=' + sid + '&product=' + product + '&search_mode=' + search_mode;

  for(var i=0;i<form.elements.length;i++){
	var v=form.elements[i].value;
	var t=form.elements[i].type;
	var c=form.elements[i].checked;
	var n=form.elements[i].name;
	
	if(typeof v == 'undefined'){		 
		 form.elements[i].value="";
    }
	if(t == null){
		form.elements[i].type="unknown";
	}
	if(t=='radio') {
	    if (c==false && (n != 'period' && n != 'granularity')){ //granularity is not to be ignored!
		    form.elements[i].name="ignore";
		}
	}
	//debug_alert( 'SHANG3.3:v:'+v+':t:'+t+':checked:'+newForm.elements[i].checked+':n:'+newForm.elements[i].name);
	
  }
  
  
  try {
    dojo.io.bind({
      url: url,
      encoding: "utf8",
      sync: false,
      formNode: form,
      mimetype: "text/plain"
    });
  }  catch (e)  {
    return false;
  }
  
  return false;
}

// method to execute a form-based asynchronous task
function postAsyncForm(formId, urlAttrName) {

  var handler = function(data) { };

  formDataHandlerAction( formId, handler, urlAttrName );
}


function formDataHandlerAction(formId, sdhaHandler, urlAttrName) {

  // debug_alert("formDataHandlerAction starting with "+sdhaHandler);
  if ( sdhaHandler == null )
	sdhaHandler = function(data) { document.write( data ); };

  var form = null;

  if (formId != null) {
	form = dojo.byId(formId);
  }
  
  if (form == null) {
      return false;
  }
  
  // debug_alert( 'got form by id '+formId );

  var url = null;

  if ( urlAttrName == null )
	urlAttrName = "url";

  url = form.getAttribute( urlAttrName );
  if (url == null || url.length < 1) {
      return false;
  }
  
  var newForm;
  if ( navigator.userAgent.indexOf('Safari')>0 ) {
	newForm = form;
  } else {
	var newForm=form.cloneNode(true);
	for(var i=0;i<newForm.elements.length;i++){
		var v=newForm.elements[i].value;
		var t=newForm.elements[i].type;
	   	if(typeof v == 'undefined'){		 
			 newForm.elements[i].value="";
		 }
   		if(t == null){
			newForm.elements[i].type="unknown";
		}   	
    }
  }
  
  // debug_alert( 'formDataHandlerAction posting form at '+url );
  var rc = true;

  try {
    dojo.io.bind({
      url: url,
      encoding: "utf8",
      sync: true,
      formNode: newForm,
      mimetype: "text/plain",
      load: function(type, data, evt) { 
		// debug_alert('found data:' + data); 
		rc = sdhaHandler( data ); 
	}
    });
  }  catch (e)  {
    return false;
  }
  
  return rc;
}

function postAsyncCheckboxForm(formId, urlAttrName) {

  var handler = function(data) { };

  checkboxFormDataHandlerAction( formId, handler, urlAttrName );
}

function checkboxFormDataHandlerActionAlt(formId, sdhaHandler, urlAttrName, isSync) {

  // debug_alert("formDataHandlerAction starting with "+sdhaHandler);
  if ( sdhaHandler == null )
	sdhaHandler = function(data) { document.write( data ); };

  var form = null;

  if (formId != null) {
	form = dojo.byId(formId);
  }
  
  if (form == null) {
      return false;
  }
  
  // debug_alert( 'got form by id '+formId );

  var url = null;

  if ( urlAttrName == null )
	urlAttrName = "url";

  url = form.getAttribute( urlAttrName );
  if (url == null || url.length < 1) {
      return false;
  }
  
  if ( navigator.userAgent.indexOf('Safari')>0 ) {

  } else {
	for(var i=0;i<form.elements.length;i++){
		var v=form.elements[i].value;
		var t=form.elements[i].type;
	   	if(typeof v == 'undefined'){		 
			 form.elements[i].value="";
		 }
   		if(t == null){
			form.elements[i].type="unknown";
		}   	
    }
  }
  
  // debug_alert( 'formDataHandlerAction posting form at '+url );
  try {
    dojo.io.bind({
      url: url,
      encoding: "utf8",
      sync: isSync,
      formNode: form,
      mimetype: "text/plain",
      load: function(type, data, evt) { 
		// debug_alert('found data:' + data); 
		sdhaHandler( data ); 
	}
    });
  }  catch (e)  {
    return false;
  }
  
  return false;
}

//following function is deprecated, please use checkboxFormDataHandlerActionAlt instead
function checkboxFormDataHandlerAction(formId, sdhaHandler, urlAttrName) {

  // debug_alert("formDataHandlerAction starting with "+sdhaHandler);
  if ( sdhaHandler == null )
	sdhaHandler = function(data) { document.write( data ); };

  var form = null;

  if (formId != null) {
	form = dojo.byId(formId);
  }
  
  if (form == null) {
      return false;
  }
  
  // debug_alert( 'got form by id '+formId );

  var url = null;

  if ( urlAttrName == null )
	urlAttrName = "url";

  url = form.getAttribute( urlAttrName );
  if (url == null || url.length < 1) {
      return false;
  }
  
  if ( navigator.userAgent.indexOf('Safari')>0 ) {

  } else {
	for(var i=0;i<form.elements.length;i++){
		var v=form.elements[i].value;
		var t=form.elements[i].type;
	   	if(typeof v == 'undefined'){		 
			 form.elements[i].value="";
		 }
   		if(t == null){
			form.elements[i].type="unknown";
		}   	
    }
  }
  
  // debug_alert( 'formDataHandlerAction posting form at '+url );
  try {
    dojo.io.bind({
      url: url,
      encoding: "utf8",
      sync: true,
      formNode: form,
      mimetype: "text/plain",
      load: function(type, data, evt) { 
		// debug_alert('found data:' + data); 
		sdhaHandler( data ); 
	}
    });
  }  catch (e)  {
    return false;
  }
  
  return false;
}

function old_async_update_ml() {
  var url = null;
  var element = document.getElementById('ml_count');
  if ( element ) {
    url = element.getAttribute('url');
  }

  if ( url ) {
    var summary_records_form = document.forms["summary_records_form"];

    if ( summary_records_form ) {
      url += '&update_indicators=true';
    }
	 debug_alert("async_update_ml sending URL "+url);
    dojo.io.bind({
      url: url,
      encoding: "utf8",
      load: function(type, data, evt) { handle_ml_data( data ); },
      mimetype: "text/plain"
    });
  }
}

// accepts a handler function that takes one argument, the data...
function simpleDataHandlerAction( url, sdhaHandler ) {

// debug_alert("simpleDataHandlerAction starting with "+sdhaHandler);
  if ( sdhaHandler == null )
	sdhaHandler = function(data) { document.write( data ); };

  if ( url ) {
//	debug_alert("simpleDataHandlerAction sending URL "+url);
    dojo.io.bind({
      url: url,
      encoding: "utf8",
      load: function(type, data, evt) { 
		// debug_alert('found data:' + data); 
		sdhaHandler( data ); 
	},
      mimetype: "text/plain"
    });
  }
}

function subjectDataHandlerAction( url, sdhaHandler) {

	// debug_alert("simpleDataHandlerAction starting with "+sdhaHandler);
  if ( sdhaHandler == null )
	sdhaHandler = function(data) { document.write( data ); };

    if ( url ) {
//		debug_alert("simpleDataHandlerAction sending URL "+url);
	    dojo.io.bind({
	      url: url,
	      encoding: "utf8",
	      load: function(type, data, evt) { 
			//alert('found data:' + data); 
	    	  sdhaHandler(data);
		},
	      mimetype: "text/plain"
    });
  }
}

// Chem Full Record Navigation 
function chem_fullrec_navigation(url,mode)
{
	if ( url ) {

    dojo.io.bind({
      url: url,
      load: function(type, data, evt) { 
		chem_fullrec_data_handler(data,mode); 
	},
      mimetype: "text/plain"
    });
   
   }
}


//method to save form element data to the server asynchronously. 
function saveFormElements(formId) {

	// debug_alert( 'in saveFormElements');
  if (formId == null) {
      return false;
  }
  
  var form = dojo.byId(formId);
  
  if (form == null) {
      return false;
  }
  
  var url = null;
  
  url = form.getAttribute('auto_save_url');
  
  if (url == null) {
      return false;
  }
  
  //debug_alert("Full auto saving url:" + url);
  
  try {
    dojo.io.bind({
      url: url,
      encoding: "utf8",
      sync: false,
      formNode: form,
      mimetype: "text/plain"
    });
  }  catch (e)  {
    return false;
  }
  
  return false;
}

function addTitles( url, targetid, imgtarget, imgurl) {
	if ($(targetid).is(":visible")) {
		$(targetid).hide();
		$(imgtarget).attr("src", imgurl + "/expand.gif");
		
	} else {
		$(targetid).load(url, function(response, status, xhr) {
			  if (status == "error") {
				  location.reload(); //if there was an error, its probably a session timeout - reload the page to let the user get a new session 
			  } else {
					$(targetid).show();
					$(imgtarget).attr("src", imgurl + "/collapse.gif");				  
			  }
			});


	}
}

// Method for expanding research domains to research areas in Author Finder.
function addResearchAreas( url, targetid, imgtarget, imgurl) {
	if ($(targetid).is(":visible")) {
		$(targetid).hide();
		$(imgtarget).attr("src", imgurl + "/expand1.gif");
		
	} else {
		$.post(url,$('#expandDomain').serialize(),function(response, status, xhr) {
			if (status == "error") {
				location.reload(); //if there was an error, its probably a session timeout - reload the page to let the user get a new session 
			} else {
				$(targetid).html(response);
				$(targetid).show();
				$(imgtarget).attr("src", imgurl + "/collapse1.gif");				  
			}
		});
	}
}

function isValidEmail(email) {
	var re = /^(([a-zA-Z0-9])(([a-zA-Z0-9])*(['\._-])?([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+( )*([,;])?( )*)+$/;
	email = $.trim(email);
    var s1 = new String(email);
    if (s1.match(re)) {
          return true;
      }
    return false;
}

function checkSaveFields() {
          
          var validFields = true;
          var email = $('input:text[name="email_address"]').val();
          if(!isValidEmail(email)) {
                 $("#pctAddErrorEmailDiv").show();
                 return false;
          } 
          $("#pctAddErrorEmailDiv").hide();
          
          return validFields;
}

function pct_overlay_close(){
    $( "#pct_overlay" ).dialog( "close" );
}

function pct_confirmation_overlay_close(){
    $( "#pct_confirmation_overlay" ).dialog( "close" );
}

function mlFirstUse_close(){
    $( "#mlFirstUse" ).dialog( "close" );
}

function mlOpen_close(){
    $( "#mlOpen" ).dialog( "close" );
}

function pct_error_overlay_close(){
    $( "#pct_error_overlay" ).dialog( "close" );
}

function getPCTconfirmation(pct_link){

    if(checkSaveFields()) {
          
    $("#createCitAlert").hide();
    $("#createAlertImageDisabled").show();
    
    $.ajax({
    type:'POST', 
    url: pct_link, 
    data:{ SID: $('#SID').val(), email_address: $('#emailaddress').val() , email_format: $('#emailformat').val() ,  
                 alert_status: $('#alertstatus').val() , overlay: "yes" }, 
    success: function(data) {
          var status = data.Status;
          if (status == "Success" || data.errorMessage == 'DUPLICATE.SEARCH.NAME') {
                 $( "#pct_overlay" ).dialog({
					close: function() {
						 $("#createCitAlert").show();
				          $("#createAlertImageDisabled").hide();
					}
                 });
                 pct_overlay_close();
                 $("#rss_feed #rssURL").attr('href', 'javascript:openWindow(\'' + data.rss_url +'\',\'_WOK_RSS_\')');
                 $( "#pct_confirmation_overlay" ).dialog( "open" );   
          } else if(data.errorMessage == 'OVER.MAX.GROUP.ALERTS.ALLOWED') {
				var overMaxGroupCountMessage = $('#overMaxGroupAlertsAllowedMessage').val();
				alert(overMaxGroupCountMessage);
				pct_overlay_close();
	      } else if(data.errorMessage == 'OVER.MAX.USER.ALERTS.ALLOWED') {
			var overMaxUserCountMessage = $('#overMaxUserAlertsAllowedMessage').val();
			alert(overMaxUserCountMessage);
			pct_overlay_close();
	      }
          else {
        	  $("#errorMessagePct").show();
          }
          
          $("#createCitAlert").show();
          $("#createAlertImageDisabled").hide();
    },
 error: function(data){
    	  $("#errorMessagePct").show();
          $("#createCitAlert").show();
          $("#createAlertImageDisabled").hide();
  }  
});
    
    }
};


function modifyPCTOverlayClose(url) {
	   $("#pct_overlay").dialog({ 
	          close:function() {
	                 $(location).attr('href', url);
	          }
	   });
	   
	   $("#pct_confirmation_overlay").dialog({ 
	          close:function() {
	                 $(location).attr('href', url);
	          }
	   });
}