var style = "";
var emv1 = "";
var targeturl = "";
var getCountURL = "";
var validated = false;
var reload = false;

(function($) { 
var fixDialogAutoWidth = $.noop;
if ( $.browser.msie ) {
    fixDialogAutoWidth = function(content) {
        var dialog = $(content).parent('.ui-dialog');
        var width = dialog.innerWidth();
        if ( width ) dialog.css('width', width);
    }
}

var _init = $.ui.dialog.prototype._init;
$.ui.dialog.prototype._init = function() {
    // IE magick: (width: 'auto' not working correctly) :
    // http://dev.jqueryui.com/ticket/4437
    if ( this.options.width == 'auto' ) { 
        var open = this.options.open;
        this.options.open = function() {
            fixDialogAutoWidth(this);
            if ( open ) open.apply(this);
        }
    }
    // yet another bug options.hide: 'drop' does not work
    // in IE http://dev.jqueryui.com/ticket/5615
    if ( $.browser.msie && this.options.hide == 'drop' ) {
        this.options.hide = 'fold';
    }
    return _init.apply(this); // calls open() if autoOpen
};
})(jQuery);


$( "#csi_error" ).hide();
$( "#csi_error_ic" ).hide();
$( "#csi_regerror" ).hide();
$( "#localsssheader" ).hide();

var checkemailovlstartDialogOpts = {
	  autoOpen: false,
	  dialogClass: 'ui-dialog-csi',
	  width: '750',
	  height: 'auto',
	  modal: true, 
	  resizable: false,
	  overlay: {
			opacity: 0.1,
			background: "#C2C2C2"
	  },
	  close: function() {
		checkCloseRedirect('csiCheckEmailCloseRedirect'); // TODO: remove when SSS Local Open is implemented in Java
		validated = false;
		$( "#checkemailovlstart #checkemail").val(""); 
		$( "#checkemailovlstart #checkretyemail").val(""); 
		$( "#checkemailovlstart #csi_regerror").html(""); 
		$( "#checkemailovlstart #csi_regerror").hide();  
	  },
	  open: function() {
		validated = false;
		$("#checkEmailValidator1").hide();
		$("#enterEmailMessage1").hide();
		$("#enterValidEmailMessage1").hide();
		$("#checkEmailValidator2").hide();
		$("#enterEmailMessage2").hide();
		//$('#checkemailovlstart #checkretyemail').prop('disabled',true);

		var validation = {					//reduce global footprint by using JavaScript object
			'checkemail1' : function(){			//method for the object for the email form field
				var ele = $('#checkemail');						//assign form field with the ID to the variable so it can be reused
				//var ele2 = $('#checkretyemail');
				//ele2.prop('disabled',true);							//gray out the 'retype email' input

				var patt = /^([a-zA-Z0-9])(([a-zA-Z0-9])*(['\._-])?([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$/;

				if(ele.val() == null || ele.val() == '') {							//if the value of ele does not match the pattern, 
					validation.emailerror = true;					//set the object's variable val.errors to true
					$("#checkEmailValidator1").show();	//display an 'X'
					$("#enterEmailMessage1").show();
					$("#enterValidEmailMessage1").hide();
					$("#checkEmailValidator2").hide();
					$("#enterEmailMessage2").hide();
				} else if(!patt.test(ele.val())) {							//if the value of ele does not match the pattern, 
					validation.emailerror = true;					//set the object's variable val.errors to true
					$("#checkEmailValidator1").show();	//display an 'X'
					$("#enterValidEmailMessage1").show();
					$("#enterEmailMessage1").hide();
					$("#checkEmailValidator2").hide();
					$("#enterEmailMessage2").hide();
				} else {
					//ele2.prop('disabled',false);					//enable the 'retype email' input
					validation.emailerror = false;
					$("#checkEmailValidator1").hide();	
					$("#enterValidEmailMessage1").hide();					
					$("#enterEmailMessage1").hide();
				}
			},
			
			'checkemail2' : function(){	//method for the object for the email form field
				
				var ele = $('#checkemail');						//assign form field with the ID to the variable so it can be reused
				var ele2 = $('#checkretyemail');
			
				if(ele.val()!=''&& validation.emailerror==false)
				{					
					if(ele2.val() == null || ele2.val() == '') {							//if the value of ele is not the same as ele2's, 
						validation.checkemailerror = true;
						$("#checkEmailValidator2").show();				//display an 'X'
						$("#enterEmailMessage2").show();
					} else {
						validation.checkemailerror = false;
						$("#checkEmailValidator2").hide();				
						$("#enterEmailMessage2").hide();
					}
				}
			},
			
			'grayOut' : function (){
				var ele2 = $('#checkemailovlstart #checkretyemail');
				ele2.prop('disabled',true);
			},
			
			'sendForm' : function (){
				$("#checkemailovlstart #csi_regerror").hide();
				validation.checkemail1();
				validation.checkemail2();
				if (validation.emailerror || validation.checkemailerror) {
					return false;
				}

				if($("#checkemail").val() == $("#checkretyemail").val()){
					validated = true;
					return checkEmail($("#csiURL").val(), 'e1', 'e2', 'e3');
				}
				
				$("#checkemailovlstart #csi_regerror").html($("#checkemailovlstart #regEmailUnmatchErrorMessage").val()).show();
				return false;
			}	
		};
		
		$('#checkemailovlstart #continue').click(function(){
			if(!validated) {
				validation.sendForm();
			}
			return false;
		});

		//$("#checkretyemail").ready(validation.grayOut);		//when the page is ready, gray out the 'retype email' input

		$("#checkemail").keydown(function(e) {
			if (e.keyCode == 13) {
				if(!validated) {
					validation.sendForm();
				}
				return false;
			} //else {
				//validation.checkemail1();
			//}
		});
		
		$("#checkretyemail").keydown(function(e) {
			if (e.keyCode == 13) {
				if(!validated) {
					validation.sendForm();
				}
				return false;
			} //else {
				//validation.checkemail2();
			//}
		});
	}
};

var csiregistrationovlDialogOpts = { 
		  autoOpen: false,
		  dialogClass: 'ui-dialog-csi',
		  width: '750',
		  height: 'auto',
		  modal: true, 
		  resizable: false,
		  overlay: {
		        opacity: 0.1,
		        background: "#C2C2C2"
		  },
		  close: function () {
		   checkCloseRedirect('csiRegCloseRedirect'); // TODO: remove when SSS Local Open is implemented in Java
			$( "#checkemailovlstart #checkemail").val(""); 
			$( "#checkemailovlstart #checkretyemail").val(""); 
			$( "#csiregistrationovl #csi_regerror").html(""); 
			$( "#csiregistrationovl #csi_regerror").hide(); 
		  },
		  open: function( event, ui ) { 			
			$("#firstNameValidator").hide();	
			$("#enterFirstName").hide();
			$("#lastNameValidator").hide();	
			$("#enterLastName").hide();
			$("#passwordValidator1").hide();			
			$("#enterPassword1").hide();
			$("#passwordValidator2").hide();
			$("#enterPassword2Empty").hide();
			$("#enterPassword2NoMatch").hide();
			$("#roleValidator").hide();				
			$("#selectRole").hide(); 
			$("#subjectAreaValidator").hide();				
			$("#selectSubjectArea").hide();
			$("#rAndRValidator").hide();				
			$("#acceptRAndR").hide();
			
			var validation = {	
				'firstname' : function(){
					if($('#firstName').val() == '') {
						$("#firstNameValidator").show();	
						$("#enterFirstName").show(); return false;
					} else {
						$("#firstNameValidator").hide();	
						$("#enterFirstName").hide(); return true;
					}
				},
				'lastname' : function(){
					if($('#lastName').val() == '') {
						$("#lastNameValidator").show();	
						$("#enterLastName").show(); return false;
					} else {
						$("#lastNameValidator").hide();	
						$("#enterLastName").hide(); return true;
					}
				},
				'checkpassword1' : function(){			
					var ele = $('#passwordreg');						
					var ele2 = $('#retypePass');
					//ele2.prop('disabled',true);							
					
					var patt = /^.*(?=.{8,})(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^*()~`{}[\]|&_]).*$/;
					
					if(!patt.test(ele.val())) {							
						validation.passerror = true;					
						$("#passwordValidator1").show();	
						$("#enterPassword1").show();
						$("#passwordValidator2").hide();
						$("#enterPassword2Empty").hide();
						$("#enterPassword2NoMatch").hide();
						return false;
					} else {
						//ele2.prop('disabled',false);					
						validation.passerror = false;
						$("#passwordValidator1").hide();			
						$("#enterPassword1").hide();
						/**if(ele2.val()!=''){
							validation.checkpassword2();
						} else {
							$("#passwordValidator2").show();			
							$("#enterPassword2Empty").show();
							$("#enterPassword2NoMatch").hide();
						}*/
					}
					return true;
				},
				
				'checkpassword2' : function(){	
				
					var ele = $('#passwordreg');						
					var ele2 = $('#retypePass');

					//if(ele.val()!=''&& validation.passerror==false){					
						if($.trim(ele2.val()) == '') {							
							validation.errors  = true;						
							$("#passwordValidator2").show();				
							$("#enterPassword2Empty").show();
							$("#enterPassword2NoMatch").hide();
							return false;
						} else if(ele.val()!=(ele2.val())) {
							validation.errors  = true;						
							$("#passwordValidator2").show();				
							$("#enterPassword2Empty").hide();
							$("#enterPassword2NoMatch").show();
							return false;
						} else {
							validation.errors = false;
							$("#passwordValidator2").hide();				
							$("#enterPassword2Empty").hide();
							$("#enterPassword2NoMatch").hide();
							return true;
						}
					//}
				},
				
				'role' : function (){
					if(!$('#role').val().match("^Select")) {
						$("#roleValidator").hide();				
						$("#selectRole").hide(); return true;
					} else {
						$("#roleValidator").show();				
						$("#selectRole").show(); return false;
					}
				},
				
				'subject' : function (){
					if(!$('#subject').val().match("^Select")) {
						$("#subjectAreaValidator").hide();				
						$("#selectSubjectArea").hide(); return true;
					} else {
						$("#subjectAreaValidator").show();				
						$("#selectSubjectArea").show(); return false;
					}
				},
				
				'randr' : function (){
					if($('#rAndR').is(':checked')) {
						$("#rAndRValidator").hide();				
						$("#acceptRAndR").hide(); return true;
					} else {
						$("#rAndRValidator").show();				
						$("#acceptRAndR").show(); return false;
					}
				},
				
				'grayOut' : function (){
					var ele2 = $('#retypePass');
					ele2.prop('disabled',true);
				}
					
			};
			
			$('#csiregistrationovl #submit_reg').click(function(){
				var validFields = true;
					if(!validation.firstname()) {validFields = false;} 
					if(!validation.lastname()) {validFields = false;} 
					if(!validation.checkpassword1()) {validFields = false;} 
					if(!validation.checkpassword2()) {validFields = false;} 
					if(!validation.role()) {validFields = false;} 
					if(!validation.subject()) {validFields = false;} 
					if(!validation.randr()) {validFields = false;} 
					if(validFields) {
						//Added for the bug fix WOKVX-22669
						$("#submit_reg").off('click');
						return submit_regovl();
					}
					return false;
			});

			//$("#retypePass").ready(validation.grayOut);	
			//$('#firstName').keyup(validation.firstname);
			//$('#lastName').keyup(validation.lastname);
			//$("#passwordreg").keyup(validation.checkpassword1);
			//$("#retypePass").keyup(validation.checkpassword2);
			//$("#role").change(validation.role);
			//$("#subject").change(validation.subject);
			//$("#rAndR").change(validation.randr);
		}
};


function csicancel() {	
	$( "#csiovldialog" ).dialog("close"); 
	$( "#csiovldialog-incites" ).dialog("close"); 
}
function csiregcheckemailcancel() { 
	$( "#checkemailovlstart" ).dialog("close");
}
function csiregcancel() { 
	$( "#csiregistrationovl" ).dialog("close");
}
function verifyemailClose(){	
	$("#checkemailcode #verifybutton2" ).hide();
	$("#checkemailcode #verifybutton1" ).show();
	$("#checkemailcode" ).dialog("close"); 
}

//TODO: remove when SSS Local Open is implemented in Java
function opencsiovlfromreg() {
	var csiCheckEmailCloseRedirect = $('#csiCheckEmailCloseRedirect').val();
	$('#csiCheckEmailCloseRedirect').val('');
	csiregcheckemailcancel();
	if(csiCheckEmailCloseRedirect != null && csiCheckEmailCloseRedirect == 'yes') {
		$('#csiCheckEmailCloseRedirect').val('yes');
	}
	csiovl('','');
}

//function to call when clicking a link which requires to be signed-in. Opens up the signin overlay dialog.
function csiovl(st, turl, handleAutoSubmit) 
{  
	$('#remember').show();
	$('#register').show();
	
	if ( handleAutoSubmit ) 
	     invokeAutoSubmit(); 
	style = st; 
	csidiag = "#csiovldialog";
	switch(style) {
	  case 'INCITES':
		csidiag = "#csiovldialog-incites";
		break;
	  default:
		break;	
	}
	targeturl = turl;
    $("#s2id_saveToMenu").click();
	$("#csiovldialog").dialog({ title: $("#csiovldialog #csititle").val() });
	$('#csiovldialog #localsssheader').html('');
	$('#csiovldialog #localsssheader').hide();
	$('#localssstext #localsss').hide();
	$('#localssstext #localsssopen').hide();
	$('#localSaveError').html('');
	$('#csiFrom').val(style);
	switch(style) {
	  case '':
		$('#styletext').html($("#csigeneraltext").html());
		break;
	  case 'SETTINGS':
		$('#styletext').html($("#csisettingstext").html());
		break;
	  case 'ENW':
		$('#styletext').html($("#csienwtext").html());
		break;
	  case 'SAVEENW':
		$('#styletext').html($("#csienwtext").html());
		break;
	  case 'RID':
		$('#styletext').html($("#csiridtext").html());
		break;
	  case 'INCITES':
	    $('#remember').hide();
	    $('#register').hide();
		$('#styletext-incites').html($("#csiincitestext").html());
		break;
	  case 'SSSSave':
		$("#csiovldialog").dialog({ title: $("#csiovldialog #csissssavetitle").val() });
		$('#csiovldialog #localsssheader').html($("#csissssaveheader").html());
		$('#csiovldialog #localsssheader').show();
		$('#styletext').html($("#csissstext").html());
		$('#localssstext #localsss').show();
		break;
	  case 'SSS':
		$("#csiovldialog").dialog({ title: $("#csiovldialog #csisssopentitle").val() });
		$('#csiovldialog #localsssheader').html($("#csisssopenheader").html());
		$('#csiovldialog #localsssheader').show();
		$('#styletext').html($("#csissstext").html());
		$('#localssstext #localsssopen').show();
		$('#localssstext #localsssopen #sssLocalSavedSearchError').hide();
		break;
	  case 'PCT':
		$('#styletext').html($("#csipcttext").html());
		break;
	  case 'PCTAdd':
		$('#styletext').html($("#csipcttext").html());
		break;
	  case 'MJL':
		$('#styletext').html($("#csimjltext").html());
		break;
	  case 'SQC':
	  case 'SaveToML':
		$('#styletext').html($("#csigeneraltext").html());
		getCountURL = turl;
		targeturl = '';
	    break;
	  case 'openManage':
		$('#styletext').html($("#csigeneraltext").html());
		break;
	  default:
		$('#styletext').html($("#csisqctext").html());
		break;
	}
	
	$('#csiovldialog-incites').dialog('widget').find(".ui-dialog-titlebar").hide();

	if($.browser.msie) { 
	  //$( "#csiovldialog" ).dialog({ height:"100%" });
	  //$( "#csiovldialog" ).dialog( "open" );
	  //$( "#csiovldialog" ).removeAttr('style');
	  $( csidiag ).dialog({ height:"100%" });
      $( csidiag ).dialog( "open" );
      $( csidiag ).removeAttr('style');
	}
	else {
		//$( "#csiovldialog" ).dialog( "open" );
		$(csidiag).dialog( "open" );
	}
	//$("#csiovldialog").dialog("option", "position", 'center' );
	$(csidiag).dialog("option", "position", 'center' );
	
	//$( "#csiovldialog" ).keydown(function(e) {
	$( csidiag ).keydown(function(e) {
   	 if (e.keyCode == 13) { e.preventDefault(); return signIn($("#csiURL").val()); }
	});
	
	// TODO: remove when SSS Local Open is implemented in Java
	var invalidFileError = $('#invalidFileError').val();
	if (invalidFileError != null && invalidFileError == 'error' ) {
		$('#csiCloseRedirect').val('yes');
		$('#csiCheckEmailCloseRedirect').val('yes');
		$('#csiRegCloseRedirect').val('yes');
	}
	
	//$( "#csiovldialog" ).show();
	$( csidiag ).show();
}

//function to call when clicking a link which requires to be signed-in. Opens up the signin overlay dialog.
function csiCheckemailovl(turl) 
{  
	if (targeturl == null || targeturl.length <= 0) {
		targeturl = turl;
	}
	
	$( "#csi_regerror" ).html('').hide();
	
	var csiCloseRedirect = $('#csiCloseRedirect').val();
	$('#csiCloseRedirect').val(''); // TODO: remove when SSS Local Open is implemented in Java
	if($.browser.msie) { 
	  $( "#checkemailovlstart" ).dialog(checkemailovlstartDialogOpts)
			.dialog('option', { height:"100%" });
	  $( "#csiovldialog" ).dialog( "close" );
	  if(csiCloseRedirect != null && csiCloseRedirect == 'yes') { // TODO: remove when SSS Local Open is implemented in Java
		  $('#csiCloseRedirect').val('yes');
		  $('#csiCheckEmailCloseRedirect').val('yes');
	  }
	  $( "#checkemailovlstart" ).dialog( "open" );
	  $( "#checkemailovlstart" ).removeAttr('style');
	}
	else {
	  $( "#csiovldialog" ).dialog( "close" );
	  $( "#checkemailovlstart" ).dialog(checkemailovlstartDialogOpts).dialog( "open" );
	}
	
	$("#checkemailovlstart").dialog("option", "position", 'center' );
	
	$( "#checkemailovlstart" ).keydown(function(e) {
   	 if (e.keyCode == 13) { return $('#checkemailovlstart #continue').click(); }
	});
}

//function to call to verify email address during registration. Opens up the verify email overlay.
function verifyEmail(emailval) 
{  

	if(emailval === '') {
	  emailval = emv1;
	}
	else { emv1 = emailval; }
	
	var requrl = "SecurityKeyLookup.do?action=generateEmail";
	$.ajax({	   
	type: 'POST',
	url: requrl,
	data: { SID: $('#SID').val(), product: "UA", email: emailval, emailTitle: $("#verifyemailtitle").html(), emailText: $("#verifyemailtext").html() },
	dataType: "text",
	crossDomain: false,
	xhrFields: {
         withCredentials: true
	},
	success: function(data){
        $("#checkemailcode #verifybutton2" ).hide();
        $("#checkemailcode #verifybutton1" ).show();
		if(data === "true") {
			$("#checkemailovlstart").dialog("close");
			$("#csi_regerror" ).html('').hide();
			$("#checkemailcode #codeerror" ).html('');
			$("#checkemailcode #emailcode" ).val('');
			$("#checkemailcode #email_val").html(emailval);
			$("#checkemailcode").dialog("open");
			$("#checkemailcode").show();
			
			$("#checkemailcode").dialog("option", "position", 'center' );
			
			$( "#checkemailcode" ).keydown(function(e) {
	   	 		if (e.keyCode == 13) { return $('#checkemailcode #continue').click(); }
			});
		}
		else {
			alert($("#verifyemailerror3").text());
		}
    },
	error:function(data){
		alert($("#verifyemailerror3").text());
	}
    }); 

}

//function to call to verify email address during registration. Opens up the verify email overlay.
function verifyEmailCode() 
{  
	var emailval = $('#email_val').val();
	var codeval = $('#emailcode').val();
	
	if (codeval.length){
		// Send an AJAX request only if the code field contains some value
		var requrl = "SecurityKeyLookup.do?action=validateSecurityKey";
		$.ajax({	   
		type: 'POST',
		url: requrl,
		data: { SID: $('#SID').val(), product: "UA", ID: codeval },
		dataType: "text",
		crossDomain: false,
		xhrFields: {
	         withCredentials: true
		},
		success: function(data){
			if(data.indexOf("true") != -1) {
				$("#checkemailcode").dialog("close");
				if($.browser.msie) {
					$("#csi_regerrorpw").hide();
					$("#csiregistrationovl" ).dialog({ height:"100%" });
					$("#csiregistrationovl").dialog("open");
					$("#csiregistrationovl" ).removeAttr('style');
					$("#csiregistrationovl").dialog("option", "position", 'center' );
					$("#csiregistrationovl").css("overflow", "hidden");
				}
				else {
					$("#csi_regerrorpw").hide();
					$("#csiregistrationovl").dialog("open");
					$("#csiregistrationovl").dialog("option", "position", 'center' );
					$("#csiregistrationovl").css("overflow", "hidden");
				}
			}
			else if(data.indexOf("false") != -1) {
				$( "#checkemailcode #codeerror" ).html($("#verifyemailerror1").text()).show();
			}
			else if(data.indexOf("reject") != -1) {
				$("#checkemailcode #codeerror" ).html($("#verifyemailerror2").text()).show();
				$("#checkemailcode #verifybutton1" ).hide();
				$("#checkemailcode #verifybutton2" ).show();
				setTimeout(verifyemailClose, 5000); // Close the overlay after 5 seconds -- WOSVX-7419
			}
	    },
		error:function(data){
				$( "#checkemailcode #codeerror" ).html($("#verifyemailerror3").text()).show();
				$("#checkemailcode #verifybutton1" ).hide();
				$("#checkemailcode #verifybutton2" ).show();
		}
	    }); 
	} else {
		// Show new error for empty code field -- WOSVX-7479
		$("#checkemailcode #codeerror" ).html($("#verifyemailerror4").text()).show();
	}

}

// Converts an object to a JSON object
function convertToJSON(data) {
	data = JSON.stringify(data); 
}


function signIn(csiurl) {
	
$("#signInImageEnabled").hide();
$("#signInImageDisabled").show();	

var returl = $('#currUrl').val();
var dataType = "json";
var jsonpCallback = "";
var csiovlurl = csiurl.replace("csihome.do", "signinovl.do");
var crossd = true;
var emailval = $('#email').val();
var passwordval = $('#password').val();
switch(style) {
  case 'INCITES':
	emailval = $('#email_ic').val();
	passwordval = $('#password_ic').val();
	break;
  default:
	break;	
}

// CORS 2 (with JQuery). Use UA's OutboundService for IE8/9 which don't support CORS.
if(!$.support.cors) {
    csiovlurl = "OutboundService.do?action=go&mode=csisigninService";
	crossd = false;
}

$('#rememberme').attr("value", $('#rememberme').attr("checked") ? 1 : 0);

$.ajax({	   
	type: 'POST',
	url: csiovlurl,
	data: { SID: $('#SID').val(), email: emailval , password: passwordval , product: "UA", rememberme: $('#rememberme').val(), csiFrom: $('#csiFrom').val(), overlay: "yes" },
	dataType: dataType,
	crossDomain: crossd,
	xhrFields: {
         withCredentials: true
    },
	success: function(data){
		$.map(data, function(val, key) {
// error handling - display error message in overlay dialog.
		if(key == "ERROR") {
			$("#signInImageEnabled").show();
			$("#signInImageDisabled").hide();
			
			$("#csi_error").html(val[0]);
			$("#csi_error").show();
			$("#csi_error_ic").html(val[0]);
			$("#csi_error_ic").show();
		}
// user did not accept terms and conditions - take user there and signin 
		else if(key == "CHECKRANDR") {
			$("#signInImageEnabled").show();
			$("#signInImageDisabled").hide();
			
			var userid = val;
			var url = csiurl.replace("csihome.do", "signinTerms.do");
 			url += "?SID=" + $('#SID').val() + "&rurl=" + encodeURIComponent(returl) + "&userID=" + userid + "&product=Portal";
			$(location).attr('href',url);	
		}
// success returned - depending upon style takes user to appropriate location/window.
		else {
		    if(targeturl == null || targeturl == '') {
		    	targeturl = location.href;
		    }
			if (targeturl.indexOf("ExcludeIfFromNonInterProduct") > -1) {
				targeturl = targeturl.replace("ExcludeIfFromNonInterProduct", "ExcludeIfReload");
			}
			if (targeturl.indexOf("ExcludeIfFromFullRecPage") > -1) {
					targeturl = targeturl.replace("EExcludeIfFromFullRecPage", "ExcludeIfReload");
			}
			if (targeturl.indexOf("excludeEventConfig") == -1) {
                if (targeturl.indexOf("?") == -1)
                    targeturl = targeturl + "?excludeEventConfig=ExcludeIfReload";
                else
                    targeturl = targeturl + "&excludeEventConfig=ExcludeIfReload";
			}
								
		switch(style) {
		  case '':
			window.location.replace(targeturl);
			break;
		  case 'SETTINGS':
			$(location).attr('href',returl);
			break;
		  case 'SAVEENW':
		   	 $("#enw_signedin").val('true');
		  	 $( "#csiovldialog" ).dialog('close');
		   	 var e = jQuery.Event("change")
		   	 e.val = "enw";
		     $("#saveToMenu").trigger(e);
			break;
		  case 'ENW':
		   	$(location).attr('href',returl);
			open_location(targeturl,'_ENW_');
		    break; 
		  case 'RID':
			$(location).attr('href',returl);
			open_location(targeturl,'_RID_');
			break;
		  case 'SSSSave':
			returl += "&newCurrUrl=" + encodeURIComponent(returl);
			$(location).attr('href', returl);
			//returl = $('#rurl').val();
			//targeturl += "&rurl=" + returl;
			//$(location).attr('href', targeturl);
			break;
		  case 'PCTAdd':
			//returl += "&displaySSSOverlay=true";
			returl += "&newCurrUrl=" + encodeURIComponent(returl);
			$(location).attr('href', returl);
			//$('#localssstext').empty();
			//returl = $('#rurl').val();
			//targeturl += "&rurl=" + returl;
			//$(location).attr('href', targeturl);
			break;
		  case 'SSS':
			//returl = $('#rurl').val();
			returl = returl.replace('&localRunSearchStatus=error', ''); // TODO: remove when SSS Local Open is implemented in Java
			targeturl += "&rurl=" + encodeURIComponent(returl);
			$(location).attr('href', targeturl);
			break;
		  case 'PCT':
			returl = $('#rurl').val();
			targeturl += "&rurl=" + returl;
			$(location).attr('href', targeturl);
			break;
		  case 'MJL':
			returl = $('#rurl').val();
			targeturl += "&rurl=" + returl;
			$(location).attr('href', targeturl);
			break;
		  case 'SQC':
			returl = $('#rurl').val();
			targeturl += "&rurl=" + returl;
			$(location).attr('href', targeturl);
			break;
		  case 'INCITES':   
		   $("#incites_signedin").val('true');
		   $("#incites_refreshpage").val('true');
		   $("#IncitesEntitled").val('yes');
		   $( "#csiovldialog-incites" ).dialog('close');
		   var e = jQuery.Event("change")
		   e.val = "incites";
		   $("#saveToMenu").trigger(e);
			break;
		  case 'SaveToML':
			  $(".ui-dialog").hide();
			  reload = true;
			  saveToML(getCountURL);
			  break;
		  case 'openManage':
			targeturl += "&rurl=" + returl;
		    $(location).attr('href', targeturl);
			break;
		  default:
			targeturl += "&rurl=" + returl;
			$(location).attr('href', targeturl);
			break;
		  }
		 }
		});
      	},
	error:function(data){
		$("#signInImageEnabled").show();
		$("#signInImageDisabled").hide();
		
		if(!data.responseText) $(location).attr('href', returl);
		else {
			$("#csi_error").html(data.responseText);
			$("#csi_error").show();
			$("#csi_error_ic").html(data.responseText);
			$("#csi_error_ic").show();
		}
	}
    }); 
	

}

function set_autocookie(csiurl, emailval, pswd, auto) {
	
var dataType = "json";
var jsonpCallback = "";
var csiovlurl = csiurl.replace("csihome.do", "setautocookie.do");

// CORS 2 (with JQuery)
if(!$.support.cors) {
	csiovlurl += "?jsonp=?";
	dataType = "jsonp";
	jsonpCallback = "convertToJSON";
}

$.ajax({	   
	type: 'POST',
	url: csiovlurl,
	data: { SID: $('#SID').val(), email: emailval, password: pswd, rememberme: auto, overlay: "yes" },
	jsonpCallback: jsonpCallback,
	dataType: dataType,
	crossDomain: true,
	xhrFields: {
         withCredentials: true
    },
	success: function(data){
      	},
	error:function(data){
	}
    }); 


}

function inputPasswd(csiurl, email) {
var returl = $('#currUrl').val();
var dataType = "json";
var csiovlurl = $("#csiURL").val().replace("csihome.do", "signinovl.do");
var crossd = true;

// CORS 2 (with JQuery)
if(!$.support.cors) {
    csiovlurl = "OutboundService.do?action=go&mode=csisigninService";
	crossd = false;
}


$.ajax({	   
	type: 'POST',
	url: csiovlurl,
	data: { SID: $('#SID').val(), email: email , password: $('#passwd').val() , product: "UA", overlay: "yes" },
	dataType: dataType,
	crossDomain: crossd,
	success: function(data){
		$.map(data, function(val, key) {
// error handling - display error message in overlay dialog.
		if(key == "ERROR") {
//			$("#csiregistrationovl #csi_regerror").html(val[0]);
//			$("#csiregistrationovl #csi_regerror").show(0, function() { });
			$("#csi_regerrorpw").html(val[0]);
			$("#csi_regerrorpw").show(0, function() { });
		}
// user did not accept terms and conditions - take user there and signin 
		else if(key == "CHECKRANDR") {
			var userid = val;
			var url = $("#csiURL").val().replace("csihome.do", "signinTerms.do");
 			url += "?SID=" + $('#SID').val() + "&rurl=" + encodeURIComponent(returl) + "&email=" + encodeURIComponent(email) + "&password=" + encodeURIComponent($('#passwd').val()) + "&userID=" + userid + "&product=Portal";
			$(location).attr('href',url);
		}
// success returned - depending upon style takes user to appropriate location/window.
		else {
		switch(style) {
		  case '':
			window.location.reload();
			break;
		  case 'SETTINGS':
			$('#styletext').html($("#csisettingstext").html());
			$(location).attr('href',returl);
			break;
		  case 'ENW':
			$(location).attr('href',returl);
			open_location(targeturl,'_ENW_');
			break;
		  case 'RID':
			$(location).attr('href',returl);
			open_location(targeturl,'_RID_');
			break;
		  case 'SSS':
			returl = $('#rurl').val();
		  case 'PCT':
			returl = $('#rurl').val();
		  case 'MJL':
			returl = $('#rurl').val();
		  case 'SQC':
			returl = $('#rurl').val();
		  default:
			targeturl += "&rurl=" + returl;
			$(location).attr('href', targeturl);
			break;
		  }
		 }
		});
      	},
	error:function(data){
		if(!data.responseText) $(location).attr('href', returl);
		else {
			$("#csiregistrationovl #csi_regerror").html(data.responseText);
			$("#csiregistrationovl #csi_regerror").show();
		}
	}
    }); 


}

function checkEmail(csiurl, err1, err2, err3) {
	var returl = $('#currUrl').val();
	var dataType = "html";
	var checkemail = $('#checkemailovlstart #checkemail').val();
	
	//Only use CORS if it is supported by the browser
	var checkemailurl = "";
	if($.support.cors && csiurl) { 
		checkemailurl = csiurl;
		checkemailurl = checkemailurl.replace("csihome.do", "checkemailovl.do");
		checkEmailCORS(returl, checkemailurl, dataType, checkemail);
	}
	
	if (!checkemailurl) {
		checkemailurl = "OutboundService.do?action=go&mode=csiceService";
		checkEmailOutboundService(returl, checkemailurl, dataType, checkemail);
	}
}

function checkEmailCORS(returl, checkemailurl, dataType, checkemail) {
	$.ajax({	   
		type: 'POST',
		url: checkemailurl,
		data: { email: checkemail , SID: $('#SID').val() , product: "UA", overlay: "yes" },
		dataType: dataType,
		crossDomain: true,
		xhrFields: {
	         withCredentials: true
	    },
		success: function(data){
			$('#csiCheckEmailCloseRedirect').val(''); // TODO: remove when SSS Local Open is implemented in Java
			$("#csiregistrationovl").dialog(csiregistrationovlDialogOpts).html(data);
			//$("#checkemailovlstart").dialog("close");
			if(data.indexOf("inputPasswd") != -1) {
			$("#checkemailovlstart").dialog("close");
			if($.browser.msie) { 
			  $("#csi_regerrorpw").hide();
			  $( "#csiregistrationovl" ).dialog({ height:"100%" });
			  $("#csiregistrationovl").dialog("open");
			  $( "#csiregistrationovl" ).removeAttr('style');
			  $("#csiregistrationovl").dialog("option", "position", 'center' );
			  $("#csi_regerrorpw").hide();
			  $("#csiregistrationovl").css("overflow", "hidden");
			}
			else {
				$("#csi_regerrorpw").hide();
				$("#csiregistrationovl").dialog("open");
				$("#csiregistrationovl").dialog("option", "position", 'center' );
				$("#csi_regerrorpw").hide();
				$("#csiregistrationovl").css("overflow", "hidden");
			}
			}
			else {
				verifyEmail(checkemail);
			}
		},
		error: function(data) { 
			if(!data.responseText) $(location).attr('href', returl);
			else {	
				$("#csiregistrationovl").dialog(csiregistrationovlDialogOpts).html(data);
				$("#checkemailovlstart").dialog("close");
				$("#csiregistrationovl").dialog("open");
			  }
	        }
	    }); 
}

function checkEmailOutboundService(returl, checkemailurl, dataType, checkemail) {
	$.ajax({	   
		type: 'POST',
		url: checkemailurl,
		data: { email: checkemail , SID: $('#SID').val() , product: "UA", overlay: "yes" },
		dataType: dataType,
		success: function(data){
			$('#csiCheckEmailCloseRedirect').val(''); // TODO: remove when SSS Local Open is implemented in Java
			$("#csiregistrationovl").dialog(csiregistrationovlDialogOpts).html(data);
			if(data.indexOf("inputPasswd") != -1) {
			$("#checkemailovlstart").dialog("close");
			if($.browser.msie) { 
			  $("#csi_regerrorpw").hide();
			  $( "#csiregistrationovl" ).dialog({ height:"100%" });
			  $("#csiregistrationovl").dialog("open");
			  $( "#csiregistrationovl" ).removeAttr('style');
			  $("#csiregistrationovl").dialog("option", "position", 'center' );
			  $("#csi_regerrorpw").hide();
			  $("#csiregistrationovl").css("overflow", "hidden");
			}
			else {
				$("#csi_regerrorpw").hide();
				$("#csiregistrationovl").dialog("open");
				$("#csiregistrationovl").dialog("option", "position", 'center' );
				$("#csi_regerrorpw").hide();
				$("#csiregistrationovl").css("overflow", "hidden");
			}
			}
			else {
				verifyEmail(checkemail);
			}
		},
		error: function(data) { 
			if(!data.responseText) $(location).attr('href', returl);
			else {	
				$("#csiregistrationovl").dialog(csiregistrationovlDialogOpts).html(data);
				$("#checkemailovlstart").dialog("close");
				$("#csiregistrationovl").dialog("open");
				}
	        }
	    }); 
}

function submit_regovl() {
	//Added for the bug fix WOKVX-22669
    var image_url = document.getElementById('image_url');
    if(typeof image_url !== 'undefined' && image_url !== null) 
    image_urlval=document.getElementById('image_url').value;
    
    var imgSource=image_urlval+"/saving_disabled.gif";
    document.getElementById('submit_reg').src=imgSource;

	var csiurl = $("#csiURL").val();
	var returl = $('#currUrl').val();
	returl = returl.replace('&localRunSearchStatus=error', ''); // TODO: remove when SSS Local Open is implemented in Java
	if (targeturl == null || targeturl.length <= 0) {
		targeturl = returl;
	}

    if (targeturl.indexOf("?") == -1) { targeturl = returl; }
    else { targeturl = targeturl + "&rurl=" + encodeURIComponent(returl); }

	if(style == 'SSSSave' || style == 'PCTAdd') {
		targeturl = returl + "&newCurrUrl=" + encodeURIComponent(returl);		
	}
	
	var dataType = "html";

	//Only use CORS if it is supported by the browser
	var registerurl = "";
	if($.support.cors && csiurl) { 
		registerurl = csiurl;
		registerurl = registerurl.replace("csihome.do", "registerovl.do");
		registerCORS(targeturl, registerurl, dataType);
	}
	
	if (!registerurl) {
		registerurl = "OutboundService.do?action=go&mode=csiregService";
		registerOutboundService(targeturl, registerurl, dataType);
	}

}

function registerCORS(targeturl, registerurl, dataType) {
	$.ajax({	   
		type: 'POST',
		url: registerurl,
		data: { SID: $('#SID').val(), product: "UA", rurl: targeturl, email: document.getElementById('regemail').value , fname: document.getElementById('firstName').value , lname: document.getElementById('lastName').value , minitial: document.getElementById('middleInit').value , password: document.getElementById('passwordreg').value , role: document.getElementById('role').value , subject: document.getElementById('subject').value, biblio: document.getElementById('biblio').value, optinout: $('input:radio[name=optinout]:checked').val() , auto: $('input:radio[name=auto]:checked').val() , rAndr: "rAndr", overlay: "yes" },
		dataType: dataType,
		crossDomain: true,
		xhrFields: {
	         withCredentials: true
	    },
		success: function(data){
			$('#csiRegCloseRedirect').val(''); // TODO: remove when SSS Local Open is implemented in Java
			$("#csiregistrationovl").dialog("close");
			$("#csiregistrationovl").html(data);
			$('#csiRegCloseRedirect').val('yes');
			if($.browser.msie) { 
				$("#csiregistrationovl").dialog("option", "height", "auto");
			}
			$("#csiregistrationovl").dialog("open");
			$("#csiregistrationovl").dialog("option", "width", 600);
			$("#csiregistrationovl").dialog("option", "position", 'center' );
		},
		 error: function(data) { 
			if(!data.responseText) $(location).attr('href', returl);
			else {
				$("#csiregistrationovl").html(data);
				$("#csiregistrationovl").dialog("option", "width", 600);
				$("#csiregistrationovl").dialog("option", "position", 'center' );
			}
	       }
	    }); 
}

function registerOutboundService(targeturl, registerurl, dataType) {
	$.ajax({	   
		type: 'POST',
		url: registerurl,
		data: { SID: $('#SID').val(), product: "UA", rurl: targeturl, email: document.getElementById('regemail').value , fname: document.getElementById('firstName').value , lname: document.getElementById('lastName').value , minitial: document.getElementById('middleInit').value , password: document.getElementById('passwordreg').value , role: document.getElementById('role').value , subject: document.getElementById('subject').value, biblio: document.getElementById('biblio').value, optinout: $('input:radio[name=optinout]:checked').val() , auto: $('input:radio[name=auto]:checked').val() , rAndr: "rAndr", overlay: "yes" },
		dataType: dataType,
		success: function(data){
			if ($('input:radio[name=auto]:checked').val() == '1') {
				set_autocookie($("#csiURL").val(), document.getElementById('regemail').value, document.getElementById('passwordreg').value, $('input:radio[name=auto]:checked').val());
			}
			$('#csiRegCloseRedirect').val(''); // TODO: remove when SSS Local Open is implemented in Java
			$("#csiregistrationovl").dialog("close");
			$("#csiregistrationovl").html(data);
			$('#csiRegCloseRedirect').val('yes');
			if($.browser.msie) { 
				$("#csiregistrationovl").dialog("option", "height", "auto");
			}
			$("#csiregistrationovl").dialog("open");
			$("#csiregistrationovl").dialog("option", "width", 600);
			$("#csiregistrationovl").dialog("option", "position", 'center' );
		},
		 error: function(data) { 
			if(!data.responseText) $(location).attr('href', returl);
			else {
				$("#csiregistrationovl").html(data);
				$("#csiregistrationovl").dialog("option", "width", 600);
				$("#csiregistrationovl").dialog("option", "position", 'center' );
			}
	       }
	    }); 
}

function checkEmail_cors(csiurl, err1, err2, err3) {

var returl = $('#currUrl').val();
//var checkemailurl = "http://localhost:8080/CSI/checkemailovl.do";
var dataType = "json";
var jsonpCallback = "";
var checkemailurl = csiurl.replace("csihome.do", "checkemailovl.do");


// CORS 2 (with JQuery)
if(!$.support.cors) {
	checkemailurl += "?jsonp=?";
	dataType = "jsonp";
	jsonpCallback = "convertToJSON";
}

var checkemail = $('#checkemailovlstart #checkemail').val();
$.ajax({	   
	type: 'POST',
	url: checkemailurl,
	data: { email: checkemail , SID: $('#SID').val() , product: "UA", rurl: "rurl", overlay: "yes" },
	jsonpCallback: jsonpCallback,
	dataType: dataType,
	crossDomain: true,
	contentType: "application/json; charset=utf-8",
	success: function(data){
		// alert("success");     
	},
 error: function(data) { 
		//alert("error"); 
		//alert(JSON.stringify(data));  
		if(!data.responseText) $(location).attr('href', returl);
		else {	
			$("#csiregistrationovl").html(data.responseText);
			$("#checkemailovlstart").dialog("close");
			$("#csiregistrationovl").dialog("open");
			}
        }
    }); 
}

function submit_regovl_cors() {

var returl = $('#currUrl').val();
//var registerurl = "http://localhost:8080/CSI/registerovl.do";
var dataType = "json";
var jsonpCallback = "";
var csiurl = $("#csiURL").val();
var registerurl = csiurl.replace("csihome.do", "registerovl.do");

// CORS 2 (with JQuery)
if(!$.support.cors) {
	registerurl += "?jsonp=?";
	dataType = "jsonp";
	jsonpCallback = "convertToJSON";
}

$.ajax({	   
	type: 'POST',
	url: registerurl,
	data: { SID: $('#SID').val() , email: document.getElementById('regemail').value , fname: document.getElementById('firstName').value , lname: document.getElementById('lastName').value , minitial: document.getElementById('middleInit').value , password: document.getElementById('passwordreg').value , role: document.getElementById('role').value , subject: document.getElementById('subject').value, biblio: document.getElementById('biblio').value, optinout: $('input:radio[name=optinout]:checked').val() , auto: $('input:radio[name=auto]:checked').val() , rAndr: "rAndr", overlay: "yes" },
	jsonpCallback: jsonpCallback,
	dataType: dataType,
	crossDomain: true,
	success: function(data){
		alert("success");     
	},
 error: function(data) { alert("error");
		if(!data.responseText) $(location).attr('href', returl);
		else {
			$("#csiregistrationovl").html(data.responseText);
			//$("#csiregistrationovl #csi_regerror").show();
		}
            }
    }); 

}

//Checks to see if the user selected a file to upload
function validateLocalSSSFileName(fileName) {
	if(fileName == null || $.trim(fileName) == '') {
		$('#localssstext #localsssopen #sssLocalSavedSearchError').show();
		return false;
	}
	return true;
}

// accounts for opening an invalid local sss file
function checkAndDisplayOpenSSSFileError(sssUrl) {
	var invalidFileError = $('#invalidFileError').val();
	if (invalidFileError != null && invalidFileError == 'error' ) {
		csiovl('SSS', sssUrl);
		$('#localssstext #localsssopen #sssLocalSavedSearchError').show();
		$('#csiCloseRedirect').val('yes');
		$('#csiCheckEmailCloseRedirect').val('yes');
		$('#csiRegCloseRedirect').val('yes');
	}
}

// redirects when there was a localRunSearchStatus error when closing the csi dialogs
function checkCloseRedirect(closeInputId) {
	var csiCloseRedirect = $('#' + closeInputId).val();
	if(csiCloseRedirect != null && csiCloseRedirect != '' && csiCloseRedirect == 'yes') {
	  var currUrl = $('#currUrl').val();
	  currUrl = currUrl.replace('&localRunSearchStatus=error', '');
	  $(location).attr('href', currUrl);
  	}
}
