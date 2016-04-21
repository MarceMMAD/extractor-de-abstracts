function handle_async_records_chunk(id) {
	var obj,t_obj;
	var content='';
	if(navigator.appName.indexOf("Microsoft Internet Explorer")>(-1)) {
		if(id==1){
	        chunks[0]=records_chunk.innerHTML;
		}

        chunks[id]=eval("tmp_records_chunk_"+id+".innerHTML");
        eval("tmp_records_chunk_"+id+".innerHTML=''");

	    for (i=0;i<=id;i++) {
            content+=chunks[i];
        }

        content="<table cellspacing=\"0\" cellpadding=\"0\">"+content+"</table>";
	records_chunks.innerHTML=content;

		//WoS 7.4 bug #98(Q2-2005 #24)(for IE on Windows only)
		//IE changes the order of multipe-hidden-values 'all_summary_IDs'
		//if this is the last chunk,lets restore the order

		if((id == chunks.length-1)
			&& (navigator.platform=='Win32')
			&& (navigator.appVersion.indexOf("MSIE 6.0")>(-1))
		){
			var form=document.forms['summary_records_form'];
			var all_IDs=form.all_summary_IDs;
			var last_ids=all_IDs[id].value;

			for(i=id;i>=1;i--){
				all_IDs[i].value=all_IDs[i-1].value;
			}
			all_IDs[0].value=last_ids;
		}


	} else if(navigator.appVersion.indexOf("Safari")>(-1)) {
		if (id==1) {
			var chunk_data=document.getElementById("chunk_data").innerHTML;
			chunks[0]=chunk_data;
		}

        chunks[id]=document.getElementById("chunk_data_"+id).innerHTML;
        document.getElementById("chunk_data_"+id).style.visibility="hidden";
		document.getElementById("chunk_data_"+id).style.height=0;
        document.getElementById("chunk_data_"+id).height=1;
		document.getElementById("tmp_records_chunk_"+id).innerHTML='';

		var t_table=document.getElementById("chunk_data_"+id);
		var t_span=document.getElementById("tmp_records_chunk_"+id);
		t_table.innerHTML='';
		t_span.innerHTML='';

        for(i=0;i<=id;i++){
            content+=chunks[i];
        }

        content="<table cellspacing=\"0\" cellpadding=\"0\">"+content+"</table>";
        document.getElementById("records_chunks").innerHTML=content;

	} else if(navigator.appName.indexOf("Opera")>(-1)) {
		if (id==1) {
	        chunks[0]=records_chunk.innerHTML;
		}

        chunks[id]=eval("chunk_data_"+id+".innerHTML");
        eval("chunk_data_"+id+".innerHTML=''");

	    for (i=0;i<=id;i++) {
            content+=chunks[i];
        }

        content="<table cellspacing=\"0\" cellpadding=\"0\">"+content+"</table>";
	    records_chunks.innerHTML=content;

	    //alert("shang:this is a Opera");
	    //opera.postError("chunks[id]:157"+chunk_s[i]);


	} else {
		var chunk_data=document.getElementById("chunk_data").innerHTML;
		var chunk_data_id=document.getElementById("chunk_data_"+id).innerHTML;
		var chunk_data=chunk_data+chunk_data_id;

		document.getElementById("chunk_data").innerHTML=chunk_data;
		document.getElementById("chunk_data_"+id).innerHTML='';
        document.getElementById("records_chunks").style.display="block";
    }
}

function handle_async_chem_records(width,height,mode) {

	 //var obj = document.getElementsByName("chemobject");
     //var len = obj.length;

     //alert(len);

     for(i=1;i<=10;i++)
     {
         var str = mode + "_chem_rec_id" + i;
         var obj = document.getElementById(str);

         var nodes = mode + "_node_chem_rec_id" + i;
         var nodesobj = document.getElementById(nodes);

         var bonds = mode + "_bond_chem_rec_id" + i;
         var bondsobj = document.getElementById(bonds);

         if(obj != null)
         {

             var inner = obj.innerHTML;
             var bondsval = "", nodesval = "";
             if(bondsobj != null)
             {
                bondsval = bondsobj.innerHTML;
             }
             if(nodesobj != null)
	         {
               nodesval = nodesobj.innerHTML;
             }
	         obj.innerHTML = '<object CLASSID="CLSID:DBB2DE32-61F1-4F7F-BEB8-A37F5BC24EE2" width="' + width + '" height="' + height + '">'
     			+ '<PARAM name="type" value="application/x-HDS-Windows-Plugin" />'
			    + '<PARAM name="border"	value="0" />'
	            + '<PARAM name="zoom"	value="yes" />'
                + '<PARAM name="get_from"	value="0" />'
                + '<PARAM name="get_target"	value="" />'
                + '<PARAM name="get_to"	value="" />'
                + '<PARAM name="edit" value="no" />'
                + '<PARAM name="prog"	value="" />'
                + '<PARAM name="src" value = "' + inner + '"/>'
                + '<PARAM name="width" value= "' + width + '" />'
                + '<PARAM name="height" value="' + height + '" />'
                + '<PARAM name="nodes" value="' + nodesval + '" />'
                + '<PARAM name="bonds" value="' + bondsval + '" />'
                + '</object>';
         }
     }
}

function handle_async_chem_layout(width,height) {

     var str="layout";
     var str1="layout-tag";
     var obj = document.getElementById(str);
     var obj1 = document.getElementById(str1);

     if((obj != null ) && (obj1 != null))
     {
     	 var inner = obj1.innerHTML;

     	 obj.innerHTML = '<object CLASSID="CLSID:DBB2DE32-61F1-4F7F-BEB8-A37F5BC24EE2" width="' + width + '" height="' + height + '">'
     		    + '<PARAM name="border"	value="1" />'
	            + '<PARAM name="zoom"	value="yes" />'
                + '<PARAM name="prog"	value="ccrweb" />'
                + '<PARAM name="src" value = "' + inner + '"/>'
                + '</object>';

	     obj.style.visibility = 'visible';
	 }

}

function handle_view_abstract( data ) {
    //Put data returned from Ajax call into a temporary storage container for retrieval by the handle_async_data.
    var tmpDataStorageSpan = document.getElementById("tmpDataStorageSpan");
    if(tmpDataStorageSpan) {
        tmpDataStorageSpan.innerHTML += data;
    }
    //Find docNum. This hidden value is also located at the bottom of the summary_results.jsp and is populated
    //for this purpose by the hide_show_abstract function.
    var docNumElement = document.getElementById("docNumForVA");

    //look for element, tmpAbstractTextArea. This is the textarea just put into the tmpDataStorageSpan.
    //change the name and id, so you can find it again
    var tmpAbstract = document.getElementById("tmpAbstractTextArea");
    if (tmpAbstract == null) { return; }

    tmpAbstract.id = "ViewAbstract_TextArea" + docNumElement.value;
    tmpAbstract.name = "ViewAbstract_TextArea" + docNumElement.value;

    handle_async_data(("tmp_ViewAbstract_Span" + docNumElement.value), ("ViewAbstract_Span" + docNumElement.value));


    var myElem = document.getElementById('ViewAbstract' + docNumElement.value + '_text');
    var remove_class = 'workingView';
	myElem.className = myElem.className.replace(' ' + remove_class, '').replace(remove_class, '');

}

function show_journal_overlay(docNum, callback) {
    //find tmp span container and the hidden input inside it and add the docNum for retrieval later.
    var docNumElement = document.getElementById("docNumForVA");
    docNumElement.value = docNum;
    
    var overl = document.getElementById("journaloverlay" + docNum);

	var actionUrl = overl.getAttribute('url');
	
	var docNumElement = document.getElementById("docNumForVA");
    docNumElement.value = docNum;

    //only need to call Ajax if we need the overlay populated for the first time
    var currentTA = document.getElementById("journaloverlay" + docNum);
    if (currentTA.value == null) {
    	//if (currentTA == null) {
        //calling the Ajax function with the callback function
        simpleDataHandlerAction(actionUrl, function (data) { handle_journal_overlay(data); callback(data); });
    }
}

function handle_journal_overlay( data ) {
	//alert("data="+data);
    var docNumElement = document.getElementById("docNumForVA");
    var journaloverlay = document.getElementById(("journaloverlay" + docNumElement.value));
    if (docNumElement != null && journaloverlay != null) {
        journaloverlay.innerHTML = data;
    }
}

function handle_ml_data( data ) {
	// in case we find that we need this
	var needToClearTmpIndicator = false;

	var tmpMlCountPlaceholder=document.getElementById("tmp_ml_count_placeholder");
	if(tmpMlCountPlaceholder){
		tmpMlCountPlaceholder.innerHTML=data;
		var spanML = document.getElementById("mlUpdate");
		spanML.setAttribute("class", "contnavtextb");
	}
	var tmpBiggie=document.getElementById("tmp_biggie");
	if(tmpBiggie != null){
		document.getElementById("mlUpdate").setAttribute("class", "contnavtextb");
		document.getElementById("mlUpdate").setAttribute("className", "contnavtextb");
	}
	handle_async_data('tmp_ml_count', 'ml_count');
	var docList = document.getElementById("tmp_ml_indicator_list");
	if ( docList ) {
		var docArray = docList.innerHTML.split(";");
		var limit = docArray.length;
		if ( needToClearTmpIndicator )
			--limit;
		for ( var i = 0; i < limit; ++i ) {
			var name = "ml_indicator_"+docArray[i];
			copy_async_data('tmp_update_ml_indicator', name);
			copy_async_data('tmp_update_ml_indicator','ml_indicator_bottom');
		}
		if ( needToClearTmpIndicator ) {
			var name = "ml_indicator_"+docArray[i];
			handle_async_data('tmp_update_ml_indicator', name);
		}
		var addButton = document.getElementById("add_to_marked_button");
		var addButtonBottom = document.getElementById("add_to_marked_button_bottom");
		if ( addButton ) {
			addButton.innerHTML = '';
		}
		if ( addButtonBottom ) {
			addButtonBottom.innerHTML = '';
		}
	}
}

function displayAsyncData(source, target, clearSource) {

    if ( clearSource == null )
	clearSource = true;

    if ( source && target ) {
	var $sourceObj = $(source);
	var $targetObj = $(target);

	if ( $sourceObj && $targetObj ) {

	    $targetObj.html( $sourceObj.html() );
	    $targetObj.show();

	    if ( clearSource )
	        $sourceObj.html( "" );
	}
    }
}

function handle_async_data(source, target){
	//eval(target+".innerHTML="+source+".innerHTML");
	//eval(source+".innerHTML=''");
	var sourceObj=document.getElementById(source);
	var targetObj=document.getElementById(target);

	if((sourceObj !=null) && (targetObj !=null)){
		targetObj.innerHTML=sourceObj.innerHTML;
		sourceObj.innerHTML='';
	}
}

/*
 * if source segment did not exist condition, then target will be turn off for display
 */
function determine_whole_panel(source, condition, target){ 
	var record1=$('#'+source).find('#'+condition);
    if($(record1).length==0){
	    $( '#'+target).toggle();
    }
}
/*
 * if source segment did not exist condition, then target will be unlinked.
 */
function determine_alldb_scorecard_unlink(source, condition, target){
	var record1=$('#'+source).find('#'+condition);	
    if($(record1).length==0){
	    if ( $( '#'+target).children().is( 'a' ) ) {   	
	    	$('#'+target).children().contents().unwrap();	  	    	
	     } 
    }
} 
function copy_async_data(source, target){
	var sourceObj=document.getElementById(source);
	var targetObj=document.getElementById(target);

	if((sourceObj !=null) && (targetObj !=null)){
	    $("#"+target).html("<p style='display: inline-block;'></p>"); //this is to make safari work WOKVX-11397
	    $("#"+target).html($("#"+source).html()); // WOKVX-11471, Safari CSS reflow problem
	    if ( $("#"+target+" a").attr("tabindex") === -1 ) { // for IE8 and JAWS
	    	$("#"+target+" a").attr("tabindex", 0);
	    }
	}
}


// Updated this function for bug fix WOKVX:1010.
function hide_show_abstract(docNum, collapseImgSrc, expandImgSrc, expandAlt, collapseAlt) {

    //change image from open to close or vice versa and make textarea container visible or vice versa    
    var img = document.getElementById("ViewAbstract" + docNum + "_img");
	var ta = document.getElementById("ViewAbstract_Span" + docNum);
	var $target = $('#ViewAbstract' + docNum + '_text');

	var actionUrl = ta.getAttribute('url');
	var currentImgLoc = img.src;

	var t1 = document.getElementById("ViewAbstract" + docNum + "_text");
	var t2 = document.getElementById("HideAbstract" + docNum + "_text");

	//if any of these is missing, there is something seriously wrong
	if (img == null || ta == null) { return; }

	if ( ! $target.hasClass('workingView')) {

		$target.addClass('workingView');
	

		//swap image to it's opposite
	    if (currentImgLoc == collapseImgSrc) {
	        img.src = expandImgSrc;
	        img.alt = expandAlt;
		    img.title = expandAlt;
	    } else {
	        img.src = collapseImgSrc;
	        img.alt = collapseAlt;
		    img.title = collapseAlt;
	    }

	    //swap visibility of textarea span to it's opposite
		if (ta.style.display == 'none') {
		    ta.style.display = 'block';
			t1.style.display = 'none';
			t2.style.display = 'inline-block';
		} else {
		    ta.style.display = 'none';
			t1.style.display = 'inline-block';
			t2.style.display = 'none';
		}

		//find tmp span container and the hidden input inside it and add the docNum for retrieval later.
	    var docNumElement = document.getElementById("docNumForVA");
	    docNumElement.value = docNum;

	    //only need to call Ajax if we need the textarea populated for the first time
	    var currentTA = document.getElementById("ViewAbstract_TextArea" + docNum);
	    if (currentTA == null) {
	        //calling the Ajax function with the callback function
	        simpleDataHandlerAction(actionUrl, handle_view_abstract);
	    }
	    else {
	    	$target.removeClass('workingView');
	    }

	}

}

function hide_show_analysis(field, imgSrc, altText) {
	var img = document.getElementById(field + "_img");
	var tr = document.getElementById(field + "_tr");
	var field_prefix = field+"_";

	if (img != null && tr != null) {
		if (tr.style.display == 'none') {
			img.src = imgSrc;
			img.alt = altText;
		    img.title = altText;
			tr.style.display = '';
			ra_expand(field);
		}
		else {
			var f = document.refine_form;
			var hasInput = false;

			for (var i=0; i<f.elements.length; i++) {
				var e = f.elements[i];
				if (e.tagName == "INPUT" && e.type == "checkbox" &&
					e.name == "refineSelection" && e.checked)
				{
					var value = e.value;
					if (field_prefix == value.substring(0,field_prefix.length)) {
						hasInput = true;
						break;
					}
				}
			}

			if (hasInput) {
				var message = document.getElementById('openCheckboxes').value;
				if (confirm(message)) {
					for (var i=0; i<f.elements.length; i++) {
						var e = f.elements[i];
						if (e.tagName == "INPUT" && e.type == "checkbox" &&
							e.name == "refineSelection" && e.checked) {
							var value = e.value;
							if (field_prefix == value.substring(0,field_prefix.length)) {
								e.checked = false;
							}
						}
					}

					img.src = imgSrc;
					img.alt = altText;
		            img.title = altText;
					tr.style.display = 'none';
					ra_collapse(field);
				}
			} else {
				img.src = imgSrc;
				img.alt = altText;
		        img.title = altText;
				tr.style.display = 'none';
				ra_collapse(field);
			}
		}
	}

	return false;
}

function daisy_mc_clearall( actionName) {
	var message = "Action is " + actionName ;
    //alert(message);
	var clearAllBaseUrl = document.summary_records_form.baseUrl.value
	var qid = document.summary_records_form.qid.value;
    var sid = document.summary_records_form.SID.value;
    var clearAllUrl = clearAllBaseUrl + actionName + "&qid="  + qid + "&SID=" + sid;
	//alert(clearAllUrl);

	daisy_action_clearall(clearAllUrl);
	document.summary_records_form.selectedClusterCount.value = 0;

	//Clear all the checkboxes on the current page.
	for (i=0;i<document.summary_records_form.elements.length;i++)
	{
	  if (document.summary_records_form.elements[i].name == 'clusterSelection')
      {
	    document.summary_records_form.elements[i].checked = false;
      }
    }
	return false
}


function invoke_checkboxes_update_action( form, id, checked, baseurl_element_or_value ) {

	do_all_named_checkboxes( form, id, checked );
	invoke_update_action( form, baseurl_element_or_value );

	return false;
}

function invoke_update_action( form, baseurl_element_or_value ) {

  var url;
  var url_src = form.elements[baseurl_element_or_value];

  if ( url_src && url_src != undefined ) {
    // alert( "using element w/name " + baseurl_element_or_value );
  } else {
    url_src = document.getElementById(baseurl_element_or_value);
  //  if ( url_src && url_src != undefined )
	// alert( "using element w/id " + baseurl_element_or_value );
  }

  if ( url_src && url_src != undefined ) {
      url = url_src.value;
  } else {
    url = baseurl_element_or_value;
  }

  // alert("base url: "+url);
  url += "&" + get_url_components( form );

  // alert("complete url: " + url);
  simple_update_action( url );

  return false;
}

function handle_async_cr_data (results)
{
      if (!results) { return; };

      for (var i=0; i < results.length; i++) {
        if (! results[i]) { continue; };

        var name =  results[i].name;
        var value =  results[i].value;
        if (!name) { continue; };

        var target = document.getElementById(name);
        if (!target) { continue; };

        // catch the exception. we can't take any corrective action
        // if there is exception in setting one of the the values. But
        // by catching the exception, we make sure the rest of the values
        // are set properly, failing gracefully.
        try {
          if (name.match(/GRAPH/i) != null) {
              target.onload = null;
              target.src = value;
          } else if (name.match(/VISIBILITY/i) != null) {
              target.style.visibility = value;
          } else if (name.match(/DISPLAY/i) != null) {
              target.style.display = value;
          } else if (name.match(/URL/i) != null) {
              target.href = value;
          } else if (name == "H_INDEX") {
              target.innerHTML = value;
          } else {
              target.innerHTML = value;
          }
        }
        catch (e) {
         ;
        }
      }
}

function highlight_hrow () {
   if ( (document.getElementById("H_INDEX")) == null) { return; }

   var sort_field = document.getElementById("CRSORT_OPTION")

   if (sort_field == null) {return ;}

   var sort_selection = sort_field.selectedIndex;

   if (sort_selection != 1) { return; }

   var hindex = parseInt (document.getElementById("H_INDEX").innerHTML);
   var row = document.getElementById("RECORD_" + hindex);

   if ( row == null )  { return ; }

   for (j = 0; j < row.cells.length; j++) {
    row.cells[j].style.borderBottom="2px #339966 solid";
   }
}

function cr_highlight_hrow () {
	   if ( (document.getElementById("H_INDEX")) == null) { return; }

	   var sort_field = document.getElementById("sortBy");

	   if (sort_field == null) {return ;}
	   
	   var markfrom = document.getElementById('mark_from').value;
	   if(markfrom == "") {
		markfrom = 0;
         }
	   else {
		markfrom = parseInt(markfrom) - 1;
	   }

        var sortFieldValue           = sort_field.value;
        var sortFieldLength          = sortFieldValue.length;
        var sortFieldFiveCharsOrMore = sortFieldLength > 4;
        var sortFieldFirstFive       = sortFieldFiveCharsOrMore ? sortFieldValue.substring(0, 5) : sortFieldValue;
        var sortFieldLastFive        = sortFieldFiveCharsOrMore ? sortFieldValue.substring(sortFieldLength - 6, 5) : sortFieldValue;

        if (
                (       sortFieldValue     !== 'TC.D'
				    &&  sortFieldFirstFive !== 'TC.D;'
				    &&  sortFieldLastFive  !== ';TC.D'
				    &&  sortFieldValue.indexOf(';TC.D;') < 0
			    )
			&&
                (       sortFieldValue     !== 'LC.D'
			        &&  sortFieldFirstFive !== 'LC.D;'
			        &&  sortFieldLastFive  !== ';LC.D'
			    	&&  sortFieldValue.indexOf(';LC.D;') < 0
		        )
		) {
        	return;
	    }

	   var hindex = parseInt (document.getElementById("H_INDEX").innerHTML) - markfrom;
	   var row = document.getElementById("RECORD_" + hindex);

	   if ( row == null )  { return ; }

	   $(document.getElementById("RECORD_" + hindex)).find("div.search-results-checkbox").addClass('hrow'); +
       $(document.getElementById("RECORD_" + hindex)).find("div.search-results-number").addClass('hrow'); +
       $(document.getElementById("RECORD_" + hindex)).find("div.search-results-content:first").addClass('hrow'); +
       $(document.getElementById("RECORD_" + hindex)).find("div.tcPerYear").addClass('hrow'); +	   
       $(document.getElementById("RECORD_" + hindex)).find("div.totalCol").addClass('hrow'); +
       $(document.getElementById("RECORD_" + hindex)).find("div.peryearTotal").addClass('hrow');
       
       $(document.getElementById("RECORD_" + hindex)).find("td.summary_recnum").addClass('hrow'); +
       $(document.getElementById("RECORD_" + hindex)).find("td.summary_data").addClass('hrow'); +
       $(document.getElementById("RECORD_" + hindex)).find("td.tcPerYear").addClass('hrow'); +	   
       $(document.getElementById("RECORD_" + hindex)).find("td.totalCol").addClass('hrow'); +
       $(document.getElementById("RECORD_" + hindex)).find("td.peryearTotal").addClass('hrow');
    		   
       //$(document.getElementById("RECORD_" + hindex)).find("div").addClass('hrow');
	   //for (j = 0; j < row.cells.length; j++) {
	   // row.cells[j].style.borderBottom="2px #EF8A01 solid";
	   //}
}

function handle_nav_final_counts(final_hit_count, final_page_count) {

	//declare spans to be changed
	var recs_count_top = document.getElementById('hitCount.top');
	var page_count_top = document.getElementById('pageCount.top');
	var recs_count_bottom = document.getElementById('hitCount.bottom');
	var page_count_bottom = document.getElementById('pageCount.bottom');
	var footer_formatted_count = document.getElementById('footer_formatted_count');
	var sws_label_txt = document.getElementById('sws_label_txt');
	var swsHidden = document.getElementById('swsHidden');
	var result_post_label_obj = document.getElementById('result_post_label');
	var result_post_label = "";
	if(result_post_label_obj){
		result_post_label=result_post_label_obj.value;
	}
	//recs_count_top.innerHTML = ""; //03_05_08
	if (recs_count_top) {
	recs_count_top.innerHTML = final_hit_count+result_post_label;
	}

	//page_count_top.innerHTML = "";  //03_05_08
	if(page_count_top) {
	page_count_top.innerHTML = final_page_count+result_post_label;
	}


	//recs_count_bottom.innerHTML = "";  //03_05_08
    if (recs_count_bottom) {
	recs_count_bottom.innerHTML = final_hit_count+result_post_label;
    }

	//page_count_bottom.innerHTML = "";  //03_05_08
	if (page_count_bottom) {
	page_count_bottom.innerHTML = final_page_count+result_post_label;
	}

	//footer_formatted_count.innerHTML = ""; //03_05_08
    if (footer_formatted_count) {
	footer_formatted_count.innerHTML = final_hit_count+result_post_label;
	}

	if ((typeof final_hit_count == 'string')
			&& final_hit_count.match("100,000")) {
		sws_label_txt.innerHTML = "";
		sws_label_txt.innerHTML = swsHidden.value;
	}
		
		var testImg=document.getElementById('testImg');

                //this fails. seems to be a change made by virtusa for authorFinder
		//if(testImg!=null){
		//	testImg.innerHTML=document.getElementById('chuckDiv').innerHTML;
		//}


		var testImg1=document.getElementById("disbledLast1");
		if(testImg1 ==null || testImg1 == ""){
			testImg1=document.getElementById("disbledLast");
		}
		var lastDivEnabled=document.getElementById('enabledLast');
		
		if(lastDivEnabled!=null){
			lastDivEnabled.innerHTML=document.getElementById('enabledDivLast').innerHTML;
		}

}//end function handle_nav_final_counts

function handle_diidw_nav_final_counts(final_hit_count, final_page_count) {

	var results_count= document.getElementById('nav_final-result_count');
	if(results_count!=null)
	{
		results_count.style.visibility = "hidden";
		final_hit_count = results_count.innerHTML;
	}
	handle_nav_final_counts(final_hit_count, final_page_count);


}//end function handle_diidw_nav_final_counts

function async_update_ml() {

  // do we need to check for marked list indicators?
  var mlForm = document.forms["ml_update_form"];
  if ( mlForm && update_markedlist_indicators( mlForm ) ) {
	// debug_alert( "about to post form" );
	formDataHandlerAction( "ml_update_form", handle_ml_data );
  } else {
	// debug_alert( "about to send request" );
	var element = document.getElementById('ml_count');
	if ( element ) {
	  var url = element.getAttribute('url');

	  if (url !=null)
		simpleDataHandlerAction( url, handle_ml_data );
	}
  }
}

function chem_fullrec_data_handler(data,mode)
{
    var resultsid = "fullrec_" + mode + "_results";

	var img = document.getElementById(resultsid);

	img.innerHTML = data;

	if(mode.match(/cpd/i) != null)
	{
		handle_async_chem_records(375,175,"cpd");
	}
	else if(mode.match(/rxn/i) != null)
	{
		handle_async_chem_records(600,175,"rxn");
	}
}

// Generic handling of hide/show a span or div, plus autosave of form
function toggleAndSaveDisplay(action, name){

    var success = toggleDisplay( action, name );

    if ( success != false ) {
    	success = true;
	var value =  document.getElementById("value("+name+")");

	if ( value ) {
	    value.value = action;

	    if ( value.form )
		saveForm( value.form.id );
	}
    }

    return success;
}

//Generic handling of hide/show a span or div, plus autosave of form
function toggleAndSaveDisplayInline(action, name){

    var success = toggleDisplayInline( action, name );

    if ( success != false ) {
    	success = true;
	var value =  document.getElementById("value("+name+")");

	if ( value ) {
	    value.value = action;

	    if ( value.form )
		saveForm( value.form.id );
	}
    }

    return success;
}

// Generic submission of async form, including determining url via form
//    attribute and ability to supply a data handler function 
function submitAsyncForm( form, urlAttribute, dataHandlerName ) {

    var rc = false;

    if ( form ) {
	// if no url attribute specified, make sure one exists
	if ( urlAttribute == null ) {
	    var url = form.getAttribute( "url" );
	    if ( url == null )
		form.setAttribute( "url", form.action );
	}
	var id = form.id;
	if ( dataHandlerName == null || dataHandlerName.length < 1 )
	    rc = postAsyncForm( id, urlAttribute );
	else
	    rc = formDataHandlerAction( id, dataHandlerName, urlAttribute );
    }

    return rc;
}

function setPageNumber(pageNumber,max, paging_action, bowserBackLink, lastPage, sortAction, sortSelect, showFirstPage, pageSizeAction, pageSizSelect, noAutoSubmit){
document.getElementById("summary_navigation").elements.page.value=pageNumber;
document.forms["summary_records_form"].getAttribute("paging_url");
window.location = paging_url +"&"+document.getElementById("summary_navigation").elements.page.value;

}
//Updated for WOKVX-8697: handleErrorMessageDataPopUp was created
//to eliminate the Error Banner that would appear once the user
//tried to add more than 5000 records using autosubmit.  This
//method will add up to 5000 and then display a popup, once the 
//hits 'ok' they will be able to continue in their process.
function handleErrorMessageDataPopUp( data ) { 
    data=data.replace(/^\s+|\s+$/g,"");
	if ( data && data.length > 0 ) {
	var errorSpan = document.getElementById( "client_error_input_message");
	if ( errorSpan ) {
		     
		 alert(data);
		 
	}
	return true;
    }
    return true;
}

function fetchWosSubject(docNum, overlaySpan, linkSpan) {

	var ta = document.getElementById("fetch_wos_subject_Span_" + docNum);
	if(ta == null){
		open_journal_overlay( overlaySpan, linkSpan );
		return;
	}

	var actionUrl = ta.getAttribute('url');
    if (actionUrl != null) {
    	
        //calling the Ajax function with the callback function
    	subjectDataHandlerAction(actionUrl, handle_wos_subject_data);
    }

}

function fetchESIAcademicField(docNum, type) {

	var ta = document.getElementById("fetch_ESI_field_Span_" + docNum);
	if(ta==null){
	    if (type=='hp') {
	        open_esi_badge_overlay('hp_overlay_span_'+ docNum,'div_hotPaperBadge_'+ docNum);
	    }
	    if (type=='hc') {
	        open_esi_badge_overlay('hc_overlay_span_'+ docNum,'div_highlyCitedBadge_'+ docNum);
	    }
		return;
	}

	var actionUrl = ta.getAttribute('url');
    if (actionUrl != null && type=='hc') {
    	
        //calling the Ajax function with the callback function
        simpleDataHandlerAction(actionUrl, handle_esi_field_data_hc);
    }
    if (actionUrl != null && type=='hp') {
    	
        //calling the Ajax function with the callback function
        simpleDataHandlerAction(actionUrl, handle_esi_field_data_hp);
    }
}
function handle_esi_field_data_hc( data ) {

    //Put data returned from Ajax call into a temporary storage container for retrieval by the handle_async_data.
    var tmpCategoryStorageSpan = document.getElementById("tmpCategoryStorageSpan");
    if(tmpCategoryStorageSpan) {
        tmpCategoryStorageSpan.innerHTML = data;
    }
    
    var targetDocNumSpan = document.getElementById('targetDocNum');
    var targetDocNum = targetDocNumSpan.innerHTML;
    
    handle_esi_field_data( targetDocNum );
    
    open_esi_badge_overlay('hc_overlay_span_'+ targetDocNum,'div_highlyCitedBadge_'+ targetDocNum);
}

function handle_esi_field_data_hp( data ) {

    //Put data returned from Ajax call into a temporary storage container for retrieval by the handle_async_data.
    var tmpCategoryStorageSpan = document.getElementById("tmpCategoryStorageSpan");
    if(tmpCategoryStorageSpan) {
        tmpCategoryStorageSpan.innerHTML = data;
    }
    
    var targetDocNumSpan = document.getElementById('targetDocNum');
    var targetDocNum = targetDocNumSpan.innerHTML;
    
    handle_esi_field_data( targetDocNum );
    
    open_esi_badge_overlay('hp_overlay_span_'+ targetDocNum,'div_hotPaperBadge_'+ targetDocNum);
}

function handle_wos_subject_data( data) {

    //Put data returned from Ajax call into a temporary storage container for retrieval by the handle_async_data.
    var tmpCategoryStorageSpan = document.getElementById("tmpCategoryStorageSpan");
    if(tmpCategoryStorageSpan) {
        tmpCategoryStorageSpan.innerHTML = data;
    }
    
    var targetDocNumSpan = document.getElementById('targetDocNum');
    var targetDocNum = targetDocNumSpan.innerHTML;
    
    handle_esi_field_data( targetDocNum );
    
    open_journal_overlay('show_journal_overlay_'+ targetDocNum,'show_journal_overlay_link_'+ targetDocNum);
}

function handle_esi_field_data( targetDocNum ) {

    var currentFieldSpan = document.getElementById('tmp_ESI_FIELD_Span_'+targetDocNum);
    var currentField = currentFieldSpan.innerHTML;
    	                                
    if(document.getElementById('hp_overlay_later_loading_' + targetDocNum )){
        document.getElementById('hp_overlay_later_loading_' + targetDocNum ).innerHTML= currentField;
    }
    if(document.getElementById('hc_overlay_later_loading_' + targetDocNum )){
        document.getElementById('hc_overlay_later_loading_' + targetDocNum ).innerHTML= currentField;
    }
    
    currentFieldSpan = document.getElementById('tmp_jcr_category_Span_'+targetDocNum);
    currentField = currentFieldSpan.innerHTML;
    if(document.getElementById('subject_' + targetDocNum )){
        document.getElementById('subject_' + targetDocNum ).innerHTML= currentField;        
    }
    
    //change the id,so we won't do it next time when user clicked.
    //var ta = document.getElementById("fetch_ESI_field_Span_" + targetDocNum);
    //ta.id = "fetch_ESI_field_Span_" + targetDocNum+"_completed";
    var targetId= 'fetch_ESI_field_Span_'+targetDocNum;
    $('[id="'+ targetId +'"]').each(function(){
       this.id= "fetch_ESI_field_Span_" + targetDocNum+"_completed";
    });
    
    var targetId= 'fetch_wos_subject_Span_'+targetDocNum;
    $('[id="'+ targetId +'"]').each(function(){
        this.id= "fetch_wos_subject_Span_" + targetDocNum+"_completed";
    });
}

function handleErrorMessageData( data ) { 
    if ( data && data.length > 0 ) {
	var errorSpan = document.getElementById( "client_error_input_message" );
	if ( errorSpan ) {
	    errorSpan.innerHTML = data;

	      var errorDiv = document.getElementById( "errorMessageDiv" );
	      errorDiv.style.display = 'inline';
	}
	return false;
    }
    return true;
};

function getCustomDataSetInfo(targeturl) {
	$.ajax({	   
		type: 'POST',
		url: targeturl,
        async: false,
		success: function(data){
			var dataArray = data.split(",");
			var MaxDataSetLimit = dataArray[0].substr(dataArray[0].indexOf('=') +1);
			document.getElementById('MaxDataSetLimit' ).value= MaxDataSetLimit;  
			var DataSetsRemaining = dataArray[1].substr(dataArray[1].indexOf('=') +1);
			document.getElementById('DataSetsRemaining' ).value=DataSetsRemaining;  
			var IsAtMaxLimit = dataArray[2].substr(dataArray[2].indexOf('=') +1);
			IsAtMaxLimit = IsAtMaxLimit.replace("}", "");
			document.getElementById('IsAtMaxLimit' ).value=IsAtMaxLimit;  
			
		},
		 error: function(data) { 
		 	return data;
		},	
	    }); 
}