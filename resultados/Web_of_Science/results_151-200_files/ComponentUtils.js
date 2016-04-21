//SCV: headlinker.jsp
//RA: headlinker.jsp
function call_caesar(rurl, c1, c2) {
	var str = rurl.split(":");
	if(str[0].toLowerCase() == "https") {
		window.location = c2;
	}
	else {
		window.location = c1;
	}
}

//CSI: checkemailform.jsp
function check() {
	var frm = document.checkemail;
	if (! frm.email.value || ! frm.retyemail.value ) {
		return false;
	}
	if (frm.email.value != frm.retyemail.value ) {
		alert("Email addresses do not match");
		return false;
	}
	frm.submit();
}

//ETS: email.jsp
function check_email(form) {

	var email_to = form.emailAddress.value;
	var email_return = form.returnEmail.value;
	var re = /^([a-zA-Z0-9])+([\.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]+)+$/;
	var emailTos = new String(email_to);
	var emailTo = emailTos.split(';');
	if(emailTo.length == 1 ) {
		emailTo = emailTos.split(',');
	}
	var emailReturns = new String(email_return);
	var emailReturn = emailReturns.split(";");
	if(emailReturn.length == 1) {
		emailReturn = emailReturns.split(',');
	}
	
	var toEbox = document.getElementById('to_email_error');
	var returnEbox = document.getElementById('return_email_error');
	toEbox.style.display = 'none';
	returnEbox.style.display = 'none';
	
	for(i=0; i < emailTo.length; i++) {

		emailTo[i] = emailTo[i].replace(/\s/g, "");
          
		if (!emailTo[i].match(re) ||(emailTo[i].length ==0 && i ==0)) {
			toEbox.style.display = 'block';
			return false;
		} 
	}
	var str = emailTo.join(",");
	form.emailAddress.value = str;
	for(k=0; k < emailReturn.length; k++) {

		emailReturn[k] = emailReturn[k].replace(/\s/g, "");

		if (!emailReturn[k].match(re)  && emailReturn[k].length != 0) {
			returnEbox.style.display = 'block';
			return false;
		} 
	}
	var returnStr = emailReturn.join(",");
	form.returnEmail.value = returnStr;
	return true;	
}

//CSI: registrationform.jsp
function check_register(checking) {
	var frm = document.register;
	alert(checking);
	frm.submit();
}

//CSI: editPreference.jsp
function confirminfo(firstName, lastName, primaryRole, subject) {
	var frm = document.editPreferenceForm;
	var currPass = frm.currPassword.value;
	var newPass = frm.passWord.value;
	var oldPass = frm.oldPassword.value;
	var retyPass = frm.retypswd.value;

	if (frm.firstName.value == "") {
		alert(firstName);
		frm.firstName.focus();
		return (false);
	}

	if (frm.lastName.value == "") {
		alert(lastName);
		frm.lastName.focus();
		return (false);
	}

	if(currPass != oldPass) {
		var message = frm.incorrectCurrPass.value;
		alert(message);
		return false;
	}
	if(retyPass != newPass) {
		var message = frm.pwNotMatch.value;
		alert(message);
		return false;
	}


	var newEmail = frm.eMail.value;
	var retyEmail = frm.retyemail.value;
	if (newEmail != retyEmail) {
		var mess = frm.emailNotMatch.value;
		alert(mess);
		return false;

	}
	
	if (IsValidEmail(newEmail) == -1)
		var valid = false;
	else
		var valid = true;
	
	if (newEmail && !valid) {
		var mess = frm.invalidEmail.value;
		alert(mess);
		return (false);
	}  	
	if (!newPass) {
		frm.passWord.value = oldPass;
	}
	if (!newEmail) {
		frm.eMail.value = frm.oldEmail.value;
	}

	if (frm.role.value.search("Select") != -1) {
		alert(primaryRole);
		frm.role.focus();
		return (false);
	}

	if (frm.subjectArea.value.search("Select") != -1) {
		alert(subject);
		frm.subjectArea.focus();
		return (false);
	}

	frm.submit();
	return true;
}

//CSI: exitForm.jsp
function disable_autosign(dom, imgurl) {
        var expired = new Date(1000);
        document.cookie = "AUTO_LOGIN=null; domain=" + dom + "; path=/; expires=" + expired.toGMTString();
        eval("document.logout_page.imgDisable.src = '" + imgurl + "/clrdot.gif'");
        eval("document.logout_page.imgDisable.width = '0'");
        eval("document.logout_page.imgDisable.height = '0'");
}

//CSI: editStartapp.jsp, preference.jsp
//ETS: processingEmail.jsp, saveToENW.jsp
function errorHandler(errorMessage, url, line) {
	//alert ("My own errorHandler, message=" + errorMessage + ", url=" + url)
	return
}

//CSI: inputPassword.jsp, inputPasswordForm.jsp, signinHome.jsp
function forgotYourPswd(SID) {
	fpWin = open("forgotpwd.do?SID=" + SID, "confirmemail", "resizable=yes, scrollbars=yes, status=yes, width=500, height=400");
}

function forgotYourPswdovl(csiurl, SID) {
	var csiovlurl = csiurl.replace("csihome.do", "forgotpwd.do");
	fpWin = open(csiovlurl + "?SID=" + SID, "confirmemail", "resizable=yes, scrollbars=yes, status=yes, width=1000, height=400");
}

//CSI: registrationform.jsp
function isValidDemographicValue(val) {
	//if(val.match(/^[\x20-\x7E]+$/)) { return true; }
	//else { return false; }
	return true;
}

//CSI: checkemailform.jsp, editPreference.jsp
function IsValidEmail(emailaddr) {
	//var re = /^([a-zA-Z0-9\'])+([\.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]+)+$/;
	var re = /^(.)+@(.)+(\..+)+$/;
	var s1 = new String(emailaddr);
	if (s1.match(re)) {
		return 1;
	}
	return 0;
}

//ETS: crformatForPrint.jsp, formatForPrint.jsp
function navigate(direction) {
	var newPageNum = parseInt(document.forms[0].pagenum.value);
	if (! isNaN(direction)) {
		newPageNum = direction;
	} else if (direction=="forward") {
		newPageNum = newPageNum + 1;
	} else {
		newPageNum = newPageNum - 1;
	}
	newPageNum += '';
	document.forms[0].pagenum.value = newPageNum;
	document.forms[0].submit();
}

//SCV: headlinker.jsp
//CSI: checkemailform.jsp
//RA: headlinker.jsp
function openHelpWindow(C) {
	var B = parseInt(screen.width*0.85);
	var A = parseInt(screen.height*0.7);
	winprops = "height=" + A + ", width=" + B + ", top=70, left=60, menubar=yes, resizable=yes, scrollbars=yes, status=no";
	newwindow = window.open(C, "_WOK_Help_", winprops);
	if(window.focus) {
		newwindow.focus()
	}
}

//SCV: headlinker.jsp, header.jsp
//CSI: footer.jsp
//RA: footer.jsp, headlinker.jsp
function openWindow(theURL, winname) {
	var win_w = parseInt(screen.width*.85);
	var win_h = parseInt(screen.height*.70);
	winprops = 'height='+win_h+', width='+win_w+', top=70, left=60, directories=yes, location=yes, menubar=yes, resizable=yes, scrollbars=yes, status=yes, toolbar=yes';
	newwindow=window.open(theURL, winname, winprops);
	if (window.focus) {
		newwindow.focus()
	}
}

//CSI: signinHome.jsp
function registerNew(SID, rurl, product) {
	window.location.href = "csihome.do" + "?SID=" + SID + "&product=" + product + "&Func=Per_Registration&rurl=" + escape(rurl);
}

//CSI: editStartlang.jsp
function reloadPage(language) {
	alert("language= " + language);
}

//ETS: saveDataToRefWorks.jsp
function saveDataToRefWorks() {
	document.getElementById('ExportRWForm').submit();
}

//ETS: saveToFile.jsp
function saveToFile() {
	document.getElementById('etsForm').submit();
}

//ETS: saveToRef.jsp
function saveToRef() {
	document.getElementById('etsForm').submit();
}

//ETS: saveToRefWorks.jsp
function saveToRefWorks() {
	document.getElementById('etsForm').submit();
}

//CSI: editStartapp.jsp, preference.jsp
//ETS: processingEmail.jsp, saveToENW.jsp
function select_all() {
	var formObj = document.OpenHistories;
	for (var i = 0;i < formObj.length; i++) {
		fldObj = formObj.elements[i];
		if (fldObj.type == 'checkbox') {
			fldObj.checked = true; 
		}
	}
	return 'javascript:void(0)';
}

//CSI: forgotpwd.jsp
function sendpwd() {
	var frm = document.sendemail;
	if (! frm.email.value) {
		return false;
	}
	frm.submit();
}

//SCV: header.jsp
function show_help(url) {
	var win_w = parseInt(screen.width * .85);
	var win_h = parseInt(screen.height * .70);
	winprops = 'height='+win_h+',width='+win_w+',top=70,left=60, menubar=yes, resizable=yes, scrollbars=yes, status=no';
	newwindow=window.open(url, '_WOK_Help_', winprops);
	if (window.focus) {newwindow.focus()}
}

//CSI: inputPassword.jsp, inputPasswordForm.jsp
// Replaced with signIn function in csiovl.js
/**function signIn() {
	var frm = document.signin;
	frm.submit();
}*/

//CSI: signinTerms.jsp
function acceptTermsAndSignin(termsAndConditions) {
	var frm = document.acceptTerms;
	if (frm.rAndR.checked) {
		frm.submit();
		return true;
	}
	alert(termsAndConditions);
	return false;
}

/*  signInWithValidation() used to also be 
 *  called "signIn"--those two RA files
 *  defined this function but neither ever
 *  called signIn() to begin with...
 *                                         */
//CSI: signinHome.jsp
//RA: analyzeResult.jsp, home.jsp
function signInWithValidation() {
	var frm = document.signin;
	if (! frm.email.value && ! frm.password.value) {
		return false;
	}
	frm.submit();
}

//CSI: checkemailform.jsp
function submit_email(missingEmail, invalidEmail, mismatchEmail) {
	var theForm = document.checkemail;

	if (theForm.email.value == "") {
		alert(missingEmail);
		theForm.email.focus();
		return (false);
	}

	if (!IsValidEmail(theForm.email.value)) {
		alert(invalidEmail);
		theForm.email.focus();
		return (false);
	}

	if (theForm.email.value != theForm.retyemail.value) {
		alert(mismatchEmail);
		theForm.email.focus();
		return (false);
	}

	theForm.submit();
}

//CSI: registrationform.jsp
function submit_reg(firstName, lastName, password, retypePassword, matchPassword, primaryRole, subject, opt, checkRandR, termsAndConditions) {
	var theForm = document.register;

	if (theForm.fname.value == "") {
		alert(firstName);
		theForm.fname.focus();
		return (false);
	}

	if (theForm.lname.value == "") {
		alert(lastName);
		theForm.lname.focus();
		return (false);
	}

	if (theForm.password.value == "") {
		alert(password);
		theForm.password.focus();
		return (false);
	}

	if (theForm.retypswd.value == "") {
		alert(retypePassword);
		theForm.retypswd.focus();
		return (false);
	}

	if (theForm.password.value != theForm.retypswd.value) {
		alert(matchPassword);
		theForm.password.value="";
		theForm.retypswd.value="";
		theForm.password.focus();
		return (false);
	}

	if (theForm.role.value == "") {
		alert(primaryRole);
		theForm.role.focus();
		return (false);
	}

	if (theForm.subject.value == "") {
		alert(subject);
		theForm.subject.focus();
		return (false);
	}

	if (!theForm.optinout[0].checked && !theForm.optinout[1].checked) {
		alert(opt);
		return (false);
	}
	
	if (checkRandR && checkRandR.toLowerCase() == 'yes' && !theForm.rAndR.checked) {
		alert(termsAndConditions);
		return (false);
	}

	theForm.submit();
}

//SCV: header.jsp
function view_records(url, flag) {
	var urlstr = url;
	var exclude = flag;
	var form = document.getElementById("resultForm");
	var recordnum = form.refineSelection.length;
	var canRun = document.getElementById("canRun").value;
	var checkmark = 0;
	var i =0;

	if (document.resultForm.refineSelection.checked) {
		checkmark = 1;
	}

	for (i = 0; i <= document.resultForm.refineSelection.length-1; i++){
		if ( document.resultForm.refineSelection[i].checked == true ) {
			checkmark = 1;
			break;
		}
	}

	if( checkmark == 0 ) {
		//	alert("NOTICE\n You have not checked rows.\n");
	}  else if (canRun == "yes") {
	
		if(exclude == 1){
			form.action = url + "/InboundService.do?action=search&exclude=exclude";
			// form.exclude=1;
		} else {
			form.action = url + "/InboundService.do?action=search&exclude=";
		}
		form.submit();
	} else {
		alert("NOTICE\n Your Search History, which lists all of the searches created during this session, is full. To view or exclude these records, delete some of the existing sets from the Search History table on the Advanced Search or Search History pages.");
	}
}

//Author Finder
function toggle_tips(value) {

	if (value == "show") {			
        document.getElementById('showTips').style.display = "block";
        document.getElementById('hideTips').style.display = "none";
        document.forms[0].tipsStatus.value = "show";
    } else {
        document.getElementById('showTips').style.display = "none";
        document.getElementById('hideTips').style.display = "block";
        document.forms[0].tipsStatus.value = "hide";
    }
}

//Author Finder
function validate() {
    var frm = document.forms[0];
    var ln = frm.lastName.value;
    var re = new RegExp("\\b(and|or|not|near|same|sent)\\b", "i");
    var ree = new RegExp("\"and\"|\"or\"|\"not\"|\"near\"|\"same\"|\"sent\"", "i");
    var wildcard = new RegExp("[@%&*#!$?]");
    var chk1 = 1;
    var chk2 = 1;
    var chk3 = 1;
    	
    // Check to make sure last name is entered
    if (ln == '') {
        alert("Please enter a last name (required field).");
        chk1 = 0;
    } 

    // Check to make sure last name is entered
    if (ln.match(re)) {
        if (! ln.match(ree)) {
            alert("The Last Name field contains a word that is a Boolean operator (AND, OR, NEAR, NOT, SAME, SENT). Boolean operations are not allowed in the Last Name field. Either remove the Boolean operators, or surround them with quotes if they are part of the name.");
            chk2 = 0;
        }
    }

    // wildcard is not allowed in last name
    if (ln.match(wildcard)) {
        alert("Wild card is not allowed in last name. Please remove it.");
        chk3 = 0;	
    }

    if (chk1 == 0 || chk2 == 0 ||  chk3 == 0 ) {
        return false;
    }
        
    return true;   
}

function afEnterFunction(event) {
	if (event && event.keyCode == 13) {
		validateAFNames();
		
	} else {
		return false; 
	}		  
}

// Validates the inputs entered on the Step One page.
function validateAFNames(performSearch) {
	
//	var searchInputs = $('input:text'); //all text inputs
//	var numAuthorVariants = searchInputs.length / 2; // number of author variant rows
	var lastNameInputs = $('input:text[name^=lastName]'); //all last name textboxes 
	var numAuthorVariants = lastNameInputs.length; //precisely
	var firstInitialInputs = $('input:text[name^=initial]'); //all first initial textboxes
	var exactMatchInputs = $('input:checkbox[name^=actual_exactMatch]'); //all exact match checkboxes
    var minLastNameSize = parseInt(document.getElementById('min_lastName_size').value);

    // hide any existing error messages
	$(".errorMessage").css("display", "none");
    document.getElementById('noAuthorResults').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('error.no.last.name').style.display = 'none';
	    
	var numMissingLastNames = 0;
    for (i = 0; i < numAuthorVariants; i++) {
		trim_input(lastNameInputs[i]);
		trim_input(firstInitialInputs[i]);		
		var lastNameObj = lastNameInputs[i];
		if (!$.fn.placeholder.input) {
            $(lastNameObj).placeholder();
		}
		var lastName = $(lastNameObj).val();

		var firstInitialObj = firstInitialInputs[i];
		if (!$.fn.placeholder.input) {
            $(firstInitialObj).placeholder();
		}
		var firstInitial = $(firstInitialObj).val();
		
		var exactMatch = exactMatchInputs[i].checked;		
		
		if (lastName == null || lastName.length < minLastNameSize) {	
			// Check to make sure no first initials are entered without a last name
			if (firstInitial != null && firstInitial.length != 0) {
		    	document.getElementById('errorMessage').style.display = 'block';
		    	document.getElementById('error.no.last.name').style.display = 'block';
				return false;
			}
			
			// Check to make sure no exact match checkbox is checked without a last name
			if (exactMatch == true) {
				document.getElementById('errorMessage').style.display = 'block';
		    	document.getElementById('error.no.last.name').style.display = 'block';
				return false;
			}
			numMissingLastNames++;
		} 
	}
    
    // Check if there are no last names entered at all. 
    if (numMissingLastNames == numAuthorVariants) {
    	document.getElementById('errorMessage').style.display = 'block';
    	document.getElementById('error.no.last.name').style.display = 'block';
		return false;
    }
	
    // If the Search button is selected, perform the search.
    var frm = $("form[name='WOS_AuthorSearch_input_form']"); 
    var activeStepNo = $("form[name='WOS_AuthorSearch_input_form'] input[name='activeStepNo']");
    if (performSearch != null && performSearch == true) {
        // If the Search button is selected on the 1st step of the wizard, 
        // perform the search in AF first to see if its a valid search.
		if ($(activeStepNo).val() == '1') {
			$(activeStepNo).val("searchAndExitAF");
            frm.submit();
        } else {
            setActiveStepNo();
        }
        
    }
    else {
        frm.submit();
    }

	return true;
}

// Author Finder
var checkflag = "false";
function check(form) {
	var field = form.category;
	var categoryCheckAll = document.getElementsByName("categoryCheckAll")[0];
	if (checkflag == "false") {
	    for (i = 0; i < field.length; i++) {
		    field[i].checked = true;
		}

	    checkflag = "true";
	    categoryCheckAll.value = "yes";
		return "Uncheck All"; 
	
	} else {
		for (i = 0; i < field.length; i++) {
		    field[i].checked = false; 
		}
		 
		checkflag = "false";
		categoryCheckAll.value = "no";
		return "Check All"; 
	
	}
}

// For Author Finder to check selected institutions not over 50.
/*function checkInstitutionCount(form) {
    var count = 0;
	var institutions = document.getElementsByName("institution");	
    for (i = 0; i < institutions.length; i++) {
    	if (institutions[i].checked == true) {
    		count++;
    	}
	}
    if (count > 50){
    	alert("Please select a maximum of 50 institutions.");
    }
    return false;
}*/

//Author Finder
function toggle_sort(value) {

	var institution = document.forms['WOS_AuthorSearch_input_form'].institution;
    var checkedInst = new Array();
    var seen = new Array();

    for (i = 0; i < institution.length; ++i) {
        val = institution[i].value;
        if (seen[val] == 1) { continue }
        if (institution[i].checked) {
        	checkedInst[val] = 1;
        	seen[val] = 1;
        } else {
        	checkedInst[val] = 0;
        }
    }

    if (value == "record") {
        document.getElementById('recordSort').style.display = "block";
        document.getElementById('institutionSort').style.display = "none";
    } else {
        document.getElementById('recordSort').style.display = "none";
        document.getElementById('institutionSort').style.display = "block";
    }

    var seen = new Array();
    for (i = 0; i < institution.length; ++i) {
        val = institution[i].value;
        if (checkedInst[val] == 1) {
            institution[i].checked = true;
            seen[val] = 1;
        } else {
            institution[i].checked = false;
        }
    }
}

//Author Finder
function addAnotherName() {
	var frm = document.forms[0];
	frm.addName.value = "true";
	frm.submit();
}

function setActiveStepNo() {
	$("form[name='WOS_AuthorSearch_input_form'] input[name='activeStepNo']").val("exitAF");
	$("form[name='WOS_AuthorSearch_input_form']").submit();
}