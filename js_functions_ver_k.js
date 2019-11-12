var newnetworkrow = 1000;

window.onbeforeunload = function () {
    if (browserclosing) {
        if (readonly) {
            record_browserclose();
            return "Just a moment ... recording the end of your WIP session.";
        } else {
            //READ/WRITE user
            if (formisdirty || brokertabisdirty || networktabisdirty) {
                record_browserclose();
                return "You have changed data and NOT saved it ... do you want to Leave or Stay on this web page?.";
            } else {
                record_browserclose();
                return "Just a moment ... recording the end of your WIP session.";
            }
        }
    }
}

// ************************************** 

function addcontactinfo(intbroker) {
	//Make sure there is a Broker for the slot
   if ($("#txtT6_BrokerName_" + intbroker).val().length == 0){
		subject = "MISSING BROKER";
		message = "There is no Broker listed. Please enter Broker info, then you can add contacts"
			$.alerts.dialogClass = "error"; 
			jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
			});
		return false;
	}
	
	//Change the instructions to use Enter
	$("#lblT6_Contactinfo").html("Enter the contact info below and click DONE (or Cancel).");
	clear_contactinfo();
	AMcontactinfomod = "A";
	brokercode = $("#hvbroker_" + intbroker).val()
	brokernumber = intbroker;
	brokerinfotype = "c";
	AMcontactinfo_table = document.getElementById("gvT6_Contactinfo_" + intbroker);
	show_contactinfo(true);

}

// **************************************  

function addnewPPO() {
	var blnAddPPO_to_ddl = true;
	var listitem;
	var txtval;
	
	txtval =$("#txtT3_49_newPPO").val();
	txtval = $.trim(txtval);
	txtval = txtval.toUpperCase();
	
	//Make sure the new PPO was entered
	if (txtval.length == 0){
		subject = "MISSING NEW PPO";
		message = "Please enter the new PPO."
			$.alerts.dialogClass = "error"; 
			jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
			});
		$("#txtT3_49_newPPO").focus();
		return false;
	} 
	
	//Ck that PPO is not already in the ddl
	$("#ddlPPO option").each(function() { 
		listitem = $(this).val();
		listitem = $.trim(listitem);
		listitem = listitem.toUpperCase();
		if (listitem == txtval) blnAddPPO_to_ddl = false;
	});
	
	if (blnAddPPO_to_ddl) {
		addnewPPO_send();
	} else {
		subject = "PPO ALREADY IN THE DROP-DOWN LIST";
		message = "The PPO you entered is already in the drop-down list."
			$.alerts.dialogClass = "error"; 
			jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
			});
	}

} //end function addnewPPO

// **************************************  

function addnewPPO_reply(data) {
  try {
	if (data == "OK" || data == "DUP"){
		var blncontinue = true;
		var cellPPOname;
		var initial_chars;
		var insert_before_row;
		var listitem;
		var newrow;
		var txtval;
	
		txtval =$("#txtT3_49_newPPO").val();
		txtval = $.trim(txtval);
		txtval = txtval.toUpperCase();
		
		//Add to the ddl
		$("#ddlPPO option").each(function() { 
			listitem = $(this).val();
			listitem = $.trim(listitem);
			listitem = listitem.toUpperCase();
			initial_chars = listitem.substring(0,2);
			
			if (initial_chars == "[-" && blncontinue) {
				insert_before_row = this;
				blncontinue = false;
			}
			
			if (initial_chars != "[S" && listitem > txtval && blncontinue) {
				insert_before_row = this;
				blncontinue = false;
			} 
		});
		
		//Set back to original entry
		txtval =$("#txtT3_49_newPPO").val();
		txtval = $.trim(txtval);
		
		//Create a new option row in ddl
		//Add to the list: $(“<option value=’9’>Value 9</option>”).appendTo(“#ComboBox”);
		$('<option value="' + txtval + '">' + txtval + '</option>').appendTo('#ddlPPO');
		newrow = $("#ddlPPO option:last");
		newrow.insertBefore(insert_before_row);
		cellPPOname = $(newrow).find("option").eq(1);
		$(cellPPOname).val(txtval);
		$(cellPPOname).html(txtval);
		 
		show_newPPO(false);
		show_PPOinfo(true);
		subject = "NEW PPO ADDED";
		message = "The new PPO has been added to the list.";
		$.alerts.dialogClass = "success"; 
		jAlert(message,subject, function() {
			$.alerts.dialogClass = null; // reset to default
		 });
	} else {
		 subject = "ERROR ADDING NEW PPO";
		 message = "The following error occured trying to add the new PPO: <BR>";
		 message = message + data + "<BR> If the problem reoccurs, please notify the IS Dept.";
		 $.alerts.dialogClass = "error"; 
		 jAlert(message,subject, function() {
			$.alerts.dialogClass = null; // reset to default
		 });
	}
  }
  catch(errorObject) {
	alert("In addnewPPO_reply, the following error occurred: " + errorObject.description);
  } 
} //end function addnewPPO_reply

// ************************************** 

function addnewPPO_send() {
	var txtnewPPO = $("#txtT3_49_newPPO").val();

	$.post("AJAX_RQ.ashx", {userid: $("#hvuser").val(), NewPPO: txtnewPPO },
			function(data){
				addnewPPO_reply(data);
	 });     
} //end function addnewPPO_send

// **************************************  
   
function addnote() {
	var txtaddnote = document.getElementById("txtAddNote");
	
	if (txtaddnote.value.length == 0) {
		subject = "MISSING NEW NOTE";
		message = "Please enter the new note."
			$.alerts.dialogClass = "error"; 
			jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
			});
		txtaddnote.focus();
		return false;
	}
	
	addnote_send();
	
}  //end function addnote

// **************************************

function addnote_reply(data) {
	var txtnotes = document.getElementById("txtT" + hvtab + "_Notes");
		
	display_addnote(false);
	txtnotes.value = data + txtnotes.value;
	
} //end function addnote_reply

// **************************************

function addnote_send(){
	//Add punbr & grnbr params
	var grnbr;
	var punbr = $("#ddlPunbr").val();
	var txtaddnote = document.getElementById("txtAddNote");
	
	grnbr = $("#txtGrnbr").val();
	if (grnbr.length == 0) grnbr = $("#ddlGroup").val();
	
	$.post("AJAX_RQ.ashx",{userid:$("#hvuser").val(),Punbr:punbr,Grnbr:grnbr,Note:txtaddnote.value,Tab:hvtab},
			function(data){
				addnote_reply(data);
	 });
		
}  //end function addnote_send

// **************************************

function add_ppo_to_assignment() {
	var assignment_number;
	var btnhtml = "";
	var btnid;
	var cell;
	var cell_0;
	var cell_1;
	var cell_2;
	var cell_3;
	var cell_4;
	var cell_5;
	var cell_6;
	var cell_7;
	var cell_8;
	var cell_9;
	var cell_10;
	var cell_11;
	var cellhtml;
	var row;
	var row_inserted;
	var rownum_to_append_int = 0;
	var tbl = document.getElementById("gvT10_Networks");
	var total_rows = rownum = $("#gvT10_Networks >tbody >tr").length;

	try {
		networktabisdirty = true;

		//Use javascript to loop thru rows; simpler than JQuery
		// Find Assignment # of row clicked, and rownum of last row with the Assignment#
		assignment_number = "z";
		for (var i = 1; i < total_rows; i++) {
			row = tbl.rows[i]
			//Ck if cell[10], rowid is from the Add btn clicked
			cellhtml = row.cells[10].innerHTML;
			if (cellhtml == network_assignment_rowid) assignment_number = row.cells[2].innerHTML;

			//Ck if row is a ppo row for the assignment#
			cellhtml = row.cells[11].innerHTML;
			if (cellhtml == assignment_number) rownum_to_append_int = i + 1;
		}

		// use straight javascript insertRow to insert a new row. Current version of JQuery not working
		row_inserted = tbl.insertRow(rownum_to_append_int);

		cell_0 = row_inserted.insertCell(0);

		//Create new Del button
		btnid = "btnDel_" + newnetworkrow;

		btnhtml = "<input type='submit' name='" + btnid;
		btnhtml = btnhtml + "' value='Delete' onclick='return delete_network_row(" + newnetworkrow + ");' "
		btnhtml = btnhtml + " id='" + btnid + "'";
		btnhtml = btnhtml + " style='color:Red;background-color:#FFC0C0' />";

		cell_0.innerHTML = btnhtml;
		cell_0.style.textAlign = "center";

		cell_1 = row_inserted.insertCell(1);
		cell_2 = row_inserted.insertCell(2);
		cell_3 = row_inserted.insertCell(3);
		cell_4 = row_inserted.insertCell(4);
		cell_5 = row_inserted.insertCell(5);

		//Add ppo
		cell_6 = row_inserted.insertCell(6);
		cell_6.innerHTML = ppo;

		//Add ppo role
		cell_7 = row_inserted.insertCell(7);
		cell_7.innerHTML = ppo_role;

		//Add ppo payment
		cell_8 = row_inserted.insertCell(8);
		cell_8.innerHTML = ppo_payment;

		//Add ppo united role
		cell_9 = row_inserted.insertCell(9);
		cell_9.innerHTML = ppo_united_role;

		//Add rowid
		cell_10 = row_inserted.insertCell(10);
		cell_10.innerHTML = newnetworkrow;
		$(cell_10).hide();
		newnetworkrow += 1;

		//Add network_assignment number
		cell_11 = row_inserted.insertCell(11);
		cell_11.innerHTML = assignment_number;
		$(cell_11).hide();

	} // end try
	catch (errorObject) {
		alert("In add_ppo_to_assignment, the following error occurred: " + errorObject.description);
	}
}

// **************************************

function add_ppo_to_assignment() {
	var assignment_number;
	var btnhtml = "";
	var btnid;
	var cell;
	var cell_0;
	var cell_1;
	var cell_2;
	var cell_3;
	var cell_4;
	var cell_5;
	var cell_6;
	var cell_7;
	var cell_8;
	var cell_9;
	var cell_10;
	var cell_11;
	var cellhtml;
	var row;
	var row_inserted;
	var rownum_to_append_int = 0;
	var tbl = document.getElementById("gvT10_Networks");
	var total_rows = rownum = $("#gvT10_Networks >tbody >tr").length;

	try {
		networktabisdirty = true;

		//Use javascript to loop thru rows; simpler than JQuery
		// Find Assignment # of row clicked, and rownum of last row with the Assignment#
		assignment_number = "z";
		for (var i = 1; i < total_rows; i++) {
			row = tbl.rows[i]
			//Ck if cell[10], rowid is from the Add btn clicked
			cellhtml = row.cells[10].innerHTML;
			if (cellhtml == network_assignment_rowid) assignment_number = row.cells[2].innerHTML;

			//Ck if row is a ppo row for the assignment#
			cellhtml = row.cells[11].innerHTML;
			if (cellhtml == assignment_number) rownum_to_append_int = i + 1;
		}

		// use straight javascript insertRow to insert a new row. Current version of JQuery not working
		row_inserted = tbl.insertRow(rownum_to_append_int);

		cell_0 = row_inserted.insertCell(0);

		//Create new Del button
		btnid = "btnDel_" + newnetworkrow;

		btnhtml = "<input type='submit' name='" + btnid;
		btnhtml = btnhtml + "' value='Delete' onclick='return delete_network_row(" + newnetworkrow + ");' "
		btnhtml = btnhtml + " id='" + btnid + "'";
		btnhtml = btnhtml + " style='color:Red;background-color:#FFC0C0' />";

		cell_0.innerHTML = btnhtml;
		cell_0.style.textAlign = "center";

		cell_1 = row_inserted.insertCell(1);
		cell_2 = row_inserted.insertCell(2);
		cell_3 = row_inserted.insertCell(3);
		cell_4 = row_inserted.insertCell(4);
		cell_5 = row_inserted.insertCell(5);

		//Add ppo
		cell_6 = row_inserted.insertCell(6);
		cell_6.innerHTML = ppo;

		//Add ppo role
		cell_7 = row_inserted.insertCell(7);
		cell_7.innerHTML = ppo_role;

		//Add ppo payment
		cell_8 = row_inserted.insertCell(8);
		cell_8.innerHTML = ppo_payment;

		//Add ppo united role
		cell_9 = row_inserted.insertCell(9);
		cell_9.innerHTML = ppo_united_role;

		//Add rowid
		cell_10 = row_inserted.insertCell(10);
		cell_10.innerHTML = newnetworkrow;
		$(cell_10).hide();
		newnetworkrow += 1;

		//Add network_assignment number
		cell_11 = row_inserted.insertCell(11);
		cell_11.innerHTML = assignment_number;
		$(cell_11).hide();

	} // end try
	catch (errorObject) {
		alert("In add_ppo_to_assignment, the following error occurred: " + errorObject.description);
	}
}

// **************************************

function addnewppoinfo() {;
	var cell;
	var cellhtml; 
	var rowx;

	try 
	{        
		//Get 1st row after header row
		rowx = $("#gvPPOs tr").eq(1)

		//Look at value in 1st cell, PPO col., in 1st row
		cell = $(rowx).find("td").eq(0);
		cellhtml = $(cell).html();

		//Make rowx new row added to table, if PPO <> "[none]"
		if (cellhtml != "[none]") {
			$("#gvPPOs > tbody:last").append("<tr><td></td><td></td><td></td><td></td></tr>");
			rowx = $("#gvPPOs tr:last");
		}

		 //Update the cells of rowx
		cell = $(rowx).find("td").eq(0); 
		$(cell).html(ppo);
		cell = $(rowx).find("td").eq(1); 
		$(cell).html(ppo_role);
		cell = $(rowx).find("td").eq(2); 
		$(cell).html(ppo_payment);
		cell = $(rowx).find("td").eq(3); 
		$(cell).html(ppo_united_role);

		$("#btnAddNetwork_to_group").show();            
	} // end try
	catch (errorObject) {
		alert("In addnewppoinfo, the following error occurred: " + errorObject.description);
	} 
} // end function addnewppoinfo

// **************************************

function addpporow(pponame,ppodivloc) {
	var blncontinue = true;
	var blninsert = true;
	var blninsertlastrow = false;
	var cellPPOdivloc;
	var cellPPOname;
	var clonedrow;
	var insert_before_row;
	var insert_rownum;
	var lblremove;
	var ppodivloc_upper;
	var pponame_upper;
	var rownum = 0;
	var rowid;
	var rowPPOdivloc;
	var rowPPOname;
	var rowx;
	var table = document.getElementById("gvT3_49");
	var totalrows = $("#gvT3_49 tr").length;
  try 
  {  
	//Compare strings in upppercase
	pponame_upper = pponame.toUpperCase();
	ppodivloc_upper = ppodivloc.toUpperCase();
	
	
	//Traverse each row in the table
	$("#gvT3_49 tr").each(function() {
		rowx = (this);
		rownum = rownum + 1;
		//1st row is header row so skip
	  if (rownum > 1 &&  blncontinue){
		cellPPOname = $(rowx).find("td").eq(1); 
		rowPPOname = $(cellPPOname).html(); 
		
		cellPPOdivloc =  $(rowx).find("td").eq(2);
		rowPPOdivloc = $(cellPPOdivloc).html();
		
		//Replace 1st row if name = '[none]'
		if (rowPPOname == "[none]") {
		
			$(cellPPOname).html(pponame);
			$(cellPPOdivloc).html(ppodivloc);
			rowid = pponame + ppodivloc;
			
			//Show Remove button
			lblremove = $(rowx).find("td").eq(0).find("span");
			$(lblremove).removeClass("hidden");
			$(lblremove).addClass("visible");
			
			blncontinue = false;
			blninsert = false;
		}
	   
		if (blncontinue) { 
			//Make row items all uppercase to string comparisons work
			rowPPOname = rowPPOname.toUpperCase();
			rowPPOdivloc = rowPPOdivloc.toUpperCase();
			 
			//Identify the second row for cloning
			if (rownum == 2) {
				clonedrow = $(this);         
			}   
		
			//Locate the insert_before_row
		
			//Insert before current rownum if rowPPOname > pponame
			if (rownum > 1 && rownum <= totalrows) {
				if (rowPPOname > pponame_upper) {
					insert_before_row = rowx;
					insert_rownum = rownum;
					blncontinue = false;
				} else {
					//Compare divloc if rowPPOname = pponame
					if (rowPPOname == pponame_upper) {
						if ((rowPPOdivloc) > (ppodivloc_upper)) {
							insert_before_row = rowx;
							insert_rownum = rownum;
							blncontinue = false;
						}                    
					}
				}
			}
			if (blncontinue && rownum == totalrows){
				// insert new last row
				blninsertlastrow = true;
				blncontinue = false        
			}        
		} //end if blncontinue
	  } // end if(rownum > 1 &&  blncontinue){
	}); // end $("#gvT3_49 tr").each(function() {
	
	if (blninsert) {
		//Create a new row in last row of table
		$("#gvT3_49").append(clonedrow.clone());
		clonedrow = $("#gvT3_49 tr:last");
		
		//Move last row to insertrow, if necessary
		if (!blninsertlastrow){
			clonedrow.insertBefore(insert_before_row); 
		}        
		
		
		//Changed the name/div/loc contents 
		cellPPOname = $(clonedrow).find("td").eq(1);
		$(cellPPOname).html(pponame);
		cellPPOdivloc = $(clonedrow).find("td").eq(2);
		$(cellPPOdivloc).html(ppodivloc);
	} //end if (blninsert)
	
  } // end try
  catch(errorObject) {
	alert("In addpporow, the following error occurred: " + errorObject.description);
  }    
} //end function addpporow

// **************************************

function addppoinfo() {
	var ddlPPO = document.getElementById("ddlPPO");
	var divloc = "";
	var invalid_selection;
	var PPOname = ddlPPO.value;
	var selindex;
	var txtval;
	
	selindex = ddlPPO.selectedIndex;
	invalid_selection = ddlPPO.length-2;
	
	if (selindex == 0 || selindex == invalid_selection){
		subject = "NO PPO SELECTED FROM DROP-DOWN LIST";
		 message = "Please select a PPO from the drop-down list."
			$.alerts.dialogClass = "error"; 
			jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
			});	       
			return;
	}
	
	 //Ck for DivLoc
	txtval =$("#txtT3_49_divloc").val();
	if (txtval.length > 0) {
		divloc = txtval;
		divloc = $.trim(divloc);
	}
	
	if (PPO_not_added()) {
		addpporow(PPOname,divloc); 
		$("#hvPPOchange").val("yes");
		show_PPOinfo(false);
		ppodata_changed = true;
		set_dirty("hvformdirty");
	} else {
		subject = "PPO/DIV/LOC IS ALREADY IN THE LIST";
		 message = "The PPO/division/location entered is already in the list."
			$.alerts.dialogClass = "error"; 
			jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
			});	       
			return
	}
	
	
} //end function addppoinfo

// **************************************

function addrptrecip() {
	if (valid_rptrecip()) addrptrecip_send();           
} //end function addrptrecip

// **************************************

function addrptrecip_send() {
	var action = "A";
	var effdate = $("#txtT1_rptrecip_effdate").val();
	var email = $("#txtT1_rptrecip_email").val();
	var emailaction;
	var fname = $("#txtT1_rptrecip_fname").val();
	var lname = $("#txtT1_rptrecip_lname").val();
	var phi = false;
	
	if ($("#rbT1_rptrecip_notify_0").is(":checked")) emailaction = "1"; //Don't send at this time
	if ($("#rbT1_rptrecip_notify_1").is(":checked")) emailaction = "2"; //Send
	if ($("#rbT1_rptrecip_notify_2").is(":checked")) emailaction = "3"; //Don't ever send 
	if ($("#ckT1_rpt_recip_phi").is(":checked")) phi = true;

	$.post("AJAX_RQ.ashx", {userid: $("#hvuser").val(), Punbr: current_punbr, Grnbr: current_grnbr, rptrecip_action: action, rptrecip_effdate: effdate, rptrecip_fname: fname, rptrecip_lname: lname, rptrecip_email: email, rptrecip_emailaction: emailaction, getsphi: phi },
			function(data){
				addrptrecip_reply(data);
	 });
	 
	 displayprocessing(true);
} //end function addrptrecip_send 

// **************************************

function addrptrecip_reply(data) {
	var msgitems = data.split("|");
	
	 displayprocessing(false);
	
	 if (msgitems[0] == "OK") { 
		show_rptrecipientinfo(false);
		subject = "REPORT RECIPIENT ADDED";
		message = msgitems[1];
		$.alerts.dialogClass = "success"; 
		jAlert(message,subject, function() {
		   $.alerts.dialogClass = null; // reset to default
		});
		return;
	 } else {
		subject = "PROBLEM ADDING REPORT RECIPIENT";
		message = msgitems[1];
		$.alerts.dialogClass = "error"; 
		jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});
		return;
	 }
} //end function addrptrecip_reply

// **************************************

function valid_rptrecip() {
	
	var email;
	var fname;
	var lname;
	
	var txtval;
	var valid_date;
	
try {
	
	//Ck for FName
	 txtval = $("#txtT1_rptrecip_fname").val();
	 txtval = $.trim(txtval);
	 if (txtval.length == 0) {
		subject = "MISSING FIRST NAME";
		message = "Please enter the First Name for the report recipient.";
		 $.alerts.dialogClass = "error"; 
		 jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});
		return false;    
	 } else {
		fname = txtval;
	 }
	 
	 //Ck for LName
	 txtval = $("#txtT1_rptrecip_lname").val();
	 txtval = $.trim(txtval);
	 if (txtval.length == 0) {
		subject = "MISSING LAST NAME";
		message = "Please enter the Last Name for the report recipient.";
		 $.alerts.dialogClass = "error"; 
		 jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});
		return false;    
	 } else {
		lname = txtval;
	 }
	 
	 //Ck for Email
	 txtval = $("#txtT1_rptrecip_email").val();
	 txtval = $.trim(txtval);
	 if (txtval.length == 0) {
		subject = "MISSING EMAIL ADDRESS";
		message = "Please enter the EMAIL for the report recipient.";
		 $.alerts.dialogClass = "error"; 
		 jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});
		return false;    
	 } else {
		email = txtval;
	 }
	 
	 //Ck for valid email if ddlHpi is  none
	 if ($("#ddlHpi").val() == "[none]") {
		if (!valid_email(email)) {
		   subject = "INVALID EMAIL ADDRESS";
		   message = "You entered an invalid email address. Please revise or click Cancel";
		   $.alerts.dialogClass = "error"; 
		   jAlert(message,subject, function() {
					$.alerts.dialogClass = null; // reset to default
		   });
		return false;
		}
	 }
	 
	 //Ck that recip is not already in list
	 if (recip_in_list(fname,lname)) {
		subject = "RECIPIENT ALREADY IN LIST";
		   message = "The report recipient is already in the list. Add a different recipient or click Cancel";
		   $.alerts.dialogClass = "error"; 
		   jAlert(message,subject, function() {
					$.alerts.dialogClass = null; // reset to default
		   });
		return false;
	 }
	 
	 //Ck for Effdate
	 txtval = $("#txtT1_rptrecip_effdate").val();
	 txtval = $.trim(txtval);
	 if (txtval.length == 0) {
		subject = "MISSING EFFECTIVE DATE";
		message = "Please enter the Effective Date for the report recipient.";
		 $.alerts.dialogClass = "error"; 
		 jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});
		return false;    
	 }
	 
	 //Make sure effdate is valid
	 valid_date = Date.parse(txtval);
	
	 if (valid_date < 0 || isNaN(valid_date)) {
		subject = "INVALID EFFECTIVE DATE";
		message = "Please enter a valid effective date."
		$.alerts.dialogClass = "error"; 
		jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});
		return false;
	  }
	  
	 //Make sure a radio button is checked
	 if ($("#rbT1_rptrecip_notify_0").is(":checked")) {
		return true;
	 }
	 
	 if ($("#rbT1_rptrecip_notify_1").is(":checked")) {
		return true;
	 }
	 
	 if ($("#rbT1_rptrecip_notify_2").is(":checked")) {
		return true;
	 }
	 
	 subject = "NOTICIATION OPTION NOT SELECTED";
	 message = "Please select a Notification Option for adding the report recipient."
	 $.alerts.dialogClass = "error"; 
		jAlert(message,subject, function() {
		$.alerts.dialogClass = null; // reset to default
	 });
	 return false;
} //end try
catch(errorObject) {
	alert("In valid_rptrecip, the following error occurred: " + errorObject.description);
	return false;
}
} //end function valid_rptrecip

// **************************************

function valid_email(email) { 
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
} //end function valid_email

// **************************************

function recip_in_list(fname,lname) {
	var blnfound = false;
	var cell;
	var cellvalue_fname;
	var cellvalue_lname;
	var rowx;
	
	//Make sure recip is not already in gvT1_47
	$("#gvT1_47 tr").each(function(){
	   rowx = (this);
	   cell = $(rowx).find("td").eq(1);
	   cellval_fname = $(cell).html();
	   
	   cell = $(rowx).find("td").eq(2);
	   cellval_lname = $(cell).html();
	  
	   if (cellval_fname==fname && cellval_lname==lname) {
		blnfound = true;
	   }
	 });
	 
	 return blnfound;
} // end function recip_in_list

// **************************************

function advance_brokers(removeslot) {
try {
	var blncontinue = true;
	var highslot;
	var row;
	var slottomove;
	var slottoupdate;
	var tbltoupdate;
	var tbltomove;
	var tmpnumber;
	var totalcolumns;
	var totalrows;
	var tmpval = "";
	
	// Nothing to reorder if removing last row
	if (removeslot == MAX_BROKERS) return false;
	
	//locate the highest slot with a value
	highslot = 0;
	for (var intbroker=MAX_BROKERS;intbroker > 0;intbroker--) {
		tmpval = $("#hvbroker_" + intbroker).val();
		if (blncontinue && tmpval.length > 0) {
				highslot = intbroker;
				blncontinue = false;
		}
	}
	
	//No rows to advance
	//if (highslot == 0) return false;
	
	// Nothing to advance if highslot is 1
	//if (highslot == 1) return false;
	
	// Nothin to advance if highslot is lower than removeslot
	if (highslot < removeslot) return false;
	
	//Start at empty removeslot and overwrite with next row until reached highslot
	blncontinue = true;
	slottoupdate = removeslot;
	slottomove = slottoupdate + 1;
	tmpnumber = $("#hvbroker_" + slottomove).val();
	if (tmpnumber.length == 0) blncontinue = false;
	
	while(blncontinue){
		tmpval = $("#hvbroker_" + slottomove).val();
		$("#hvbroker_" + slottoupdate).val(tmpval);
		$("#hvbroker_" + slottomove).val("");
		
		tmpval = $("#txtT6_BrokerName_" + slottomove).val();
		$("#txtT6_BrokerName_" + slottoupdate).val(tmpval);
		$("#txtT6_BrokerName_" + slottomove).val("");
		
		//Move tbltomove to tbltoupdate
		tbltoupdate = document.getElementById("gvT6_Contactinfo_" + slottoupdate);        
		tbltomove = document.getElementById("gvT6_Contactinfo_" + slottomove);
		
		//Remove all rows, except [0] in tbltoupdate
		totalrows = tbltoupdate.rows.length;
		for (var i=1;i<totalrows;i++) {
			row = tbltoupdate.rows[i];
			$(row).remove();
		}
		
		//Add all rows from tbltomove to tbltoupdate
		totalrows = tbltomove.rows.length;
		for (var i=1;i<totalrows;i++) {
			row = tbltomove.rows[i];
			$(tbltoupdate).append(row);
		}
		
		//Set row[1] of tbltomove to [none] and remove all other rows
		totalrows = tbltomove.rows.length;
		row = tbltomove.rows[1];
		totalcolumns = row.cells.length;
		
		//Remove the button from cell[0] by removing all cell[0]'s nodes from the DOM
		var nodes = row.cells[0].childNodes;
		var node;
		for (i=0;i<nodes.length;i++) {
			node = nodes[i];
			row.cells[0].removeChild(node);
		}
			
		//Set cell[1] to [none]
		row.cells[1].innerHTML = "[none]"
			
			
		//Set all the remaining cells to space
		for (i=2;i<totalcolumns;i++) {
			row.cells[i].innerHTML = space;
		}
		 
		//Remove any other rows after [1]
		for (i=2;i<totalrows;i++) {
			row = tbl.rows[i];
			$(row).remove();
		}   
		

		//advance to next slot
		slottoupdate = slottomove
		slottomove = slottomove + 1;
		if (slottomove > MAX_BROKERS) {
			 blncontinue = false
		} else {
			tmpnumber = $("#hvbroker_" + slottomove).val();
			if (tmpnumber.length == 0) blncontinue = false;
		}        
		
	}    
	
	
} //end try
catch(errorObject) {
	alert("In advance_brokers, the following error occurred: " + errorObject.description);
	return false;
}
} //end function advance_brokers

// **************************************
function save_AMContactinfo() {
	var broker_email_action; 
	var blnchecked = false;
	var fname = "";
	var lname = "";
	var addr1 = "";
	var addr2 = "";
	var city = "";
	var state = "";
	var zip = "";
	var tel = "";
	var fax = "";
	var email = "";
	var effdate = "";
	var comment = "";
	var textbox = "";
	var recid = $("#txtT6_RecID_" + brokernumber).val();
	
	//Ck if Do NOT email at this time, emailsent value s/b 0
	if ($("#rbT6_brokersave_action_1").is(":checked")) {
		blnchecked = true;
		broker_email_action = "0";
	}
	
	//Ck if Send Email, emailsent value s/b 1
	if ($("#rbT6_brokersave_action_2").is(":checked")) {
		blnchecked = true;
		broker_email_action = "1";
	}
	
	//Ck if Do NOT Send Email, emailsent value s/b 2
	if ($("#rbT6_brokersave_action_3").is(":checked")) {
		blnchecked = true;
		broker_email_action = "2";
	}
	
	if (!blnchecked) {
		subject = "NO EMAIL ACTION SELECTED";
		message = "Please select an email action and click SAVE.";
		$.alerts.dialogClass = "error"; 
		jAlert(message,subject, function() {
			$.alerts.dialogClass = null; // reset to default
		});
		return;
	} 
	
	displayprocessing(true);
	
	//Get the effdate
	txtbox = document.getElementById("txtT6_Contactinfo_Effdate");
	effdate = txtbox.value;
	
	if (AMcontactinfomod == "R") {
	    $.post("AJAX_RQ.ashx", { userid: $("#hvuser").val(), AMContactmod: AMcontactinfomod, Emailaction: broker_email_action, RowID: AMcontactinfo_rowID, Effdate: effdate },
			function(data){
				AMContactinfo_reply(data);
		});
		return;  
	}
	
	//Get the varables to pass as Post variables
	txtbox = document.getElementById("txtT6_Contactinfo_FName");
	if (txtbox.value.length > 0){
		fname = txtbox.value;
	}
	
	txtbox = document.getElementById("txtT6_Contactinfo_LName");
	if (txtbox.value.length > 0){
		lname = txtbox.value;
	}
	
	txtbox = document.getElementById("txtT6_Contactinfo_Tel");
	if (txtbox.value.length > 0){
		tel = txtbox.value;
	}
	
	txtbox = document.getElementById("txtT6_Contactinfo_Fax");
	if (txtbox.value.length > 0){
		fax = txtbox.value;
	}
	
   txtbox = document.getElementById("txtT6_Contactinfo_Email");
	if (txtbox.value.length > 0){
		email = txtbox.value;
	}
	
	txtbox = document.getElementById("txtT6_Contactinfo_Addr1");
	if (txtbox.value.length > 0){
		addr1 = txtbox.value;
	}
	
	txtbox = document.getElementById("txtT6_Contactinfo_Addr2");
	if (txtbox.value.length > 0){
		addr2 = txtbox.value;
	}
	
	txtbox = document.getElementById("txtT6_Contactinfo_City");
	if (txtbox.value.length > 0){
		city = txtbox.value;
	}
	
	txtbox = document.getElementById("txtT6_Contactinfo_ST");
	if (txtbox.value.length > 0){
		state = txtbox.value;
	}
	
   txtbox = document.getElementById("txtT6_Contactinfo_Zip");
	if (txtbox.value.length > 0){
		zip = txtbox.value;
	}
   
   txtbox = document.getElementById("txtT6_Contactinfo_Comment");
	if (txtbox.value.length > 0){
		comment = txtbox.value;
	}


$.post("AJAX_RQ.ashx", {userid: $("#hvuser").val(), AMContactmod: AMcontactinfomod, Emailaction: broker_email_action, RecID: recid, RowID: AMcontactinfo_rowID, Punbr: current_punbr, Grnbr: current_grnbr, Brokercode: brokercode, FName: fname, LName: lname, Tel: tel, Fax: fax, Email: email, Addr1: addr1, Addr2: addr2, City: city, State: state, Zip: zip, Comment: comment, Effdate: effdate },
			function(data){
				AMContactinfo_reply(data);
	});
}

// **************************************

function AMContactinfo_done() {
	var effdate = "";
	var txtbox;
	
	if (!AMcontactinfoisdirty) {
		 subject = "NO CONTACT INFORMATION CHANGED";
		 message = "You must add or modify the contact info to save this data."
			$.alerts.dialogClass = "error"; 
			jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
			});	       
			return;
	}
	
	//Make sure the effdate has a date
	txtbox = document.getElementById("txtT6_Contactinfo_Effdate");
	if (txtbox.value.length > 0){
		effdate = txtbox.value;
	} else {
		subject = "MISSING EFFECTIVE DATE";
		message = "You must enter the effective date to save this data."
		$.alerts.dialogClass = "error"; 
		jAlert(message,subject, function() {
			$.alerts.dialogClass = null; // reset to default
		});	       
			return;
	}
	
	show_contactinfo(false);
	show_broker_save_email_action(true);

} //end function AMContactinfo_done

// **************************************

function AMContactinfo_remove() {
	jConfirm("Are you sure you want to remove this Contact info? Once removed, it cannot be recovered.", "REMOVE CONTACT INFO", function(OKresponse) {
		if (OKresponse){
			AMcontactinfomod = "R";
			show_contactinfo(false);
			show_broker_save_email_action(true);    
		}
	});
}

// **************************************

function modify(bk, rowid) {
	modify_contactinfo(bk, rowid);
	return false;
}

// **************************************

function add_ppo_row(rowid) {
	network_assignment_rowid = rowid;
	display_ppoassignment(true);
	return false;
}

// **************************************

function addnewnetworkinfo() {
	var btnhtml = "";
	var btnid;
	var cell;
	var cellhtml;
	var numval;
	var row_network;
	var maxassignment_number = 0;
	var rowid = 1;
	var rownum;
	var rowPPO;
	var tbl = document.getElementById("gvT10_Networks");

	try {
		networktabisdirty = true;

		//Get 1st row after header row
		row_network = $("#gvT10_Networks tr").eq(1);

		//Look at value in 4th cell, Assigned by col., in 1st row
		cell = $(row_network).find("td").eq(3);
		cellhtml = $(cell).html();

		//Remove 1st row with  [none]
		if (cellhtml == "[none]") $(row_network).remove();

		//Row # of new row to be inserted
		rownum = $("#gvT10_Networks >tbody >tr").length;

		//Get the max Assignment # in table
		$("#gvT10_Networks tr").each(function () {
			row_network = (this);
			cell = $(this).find("td").eq(2);
			cellhtml = $(cell).html();
			numval = parseInt(cellhtml, 10);
			if (!isNaN(numval)) maxassignment_number = numval;
		});

		//Get the last rowid if more than one row in gv
		if (rownum > 1) {
			row_network = $("#gvT10_Networks tr:last")
			cell = $(row_network).find("td").eq(10);
			cellhtml = $(cell).html();
			rowid = parseInt(cellhtml, 10);
			rowid += 1;
		}

		//Create new network row
		$("#gvT10_Networks > tbody:last").append("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
		row_network = tbl.rows[rownum];

		//Create new Del button
		btnid = "btnModify_" + rownum;

		btnhtml = "<input type='submit' name='" + btnid;
		btnhtml = btnhtml + "' value='Delete' onclick='return delete_network_row(" + rowid + ");' "
		btnhtml = btnhtml + " id='" + btnid + "'";
		btnhtml = btnhtml + " style='color:Red;background-color:#FFC0C0' />";

		row_network.cells[0].className = "columnmiddle";
		row_network.cells[0].innerHTML = btnhtml;

		//Create new Add button
		btnid = "btnAdd_" + rownum;

		btnhtml = "<input type='submit' name='" + btnid;
		btnhtml = btnhtml + "' value='Add' onclick='return add_ppo_row(" + rowid + ");' "
		btnhtml = btnhtml + " id='" + btnid + "'";
		btnhtml = btnhtml + " style='color:White;background-color:Blue' />";

		row_network.cells[1].className = "columnmiddle";
		row_network.cells[1].innerHTML = btnhtml;

		//Add next Assignment #
		maxassignment_number += 1;
		row_network.cells[2].className = "columnmiddle";
		row_network.cells[2].innerHTML = maxassignment_number;

		//Add Assignmed By:
		row_network.cells[3].innerHTML = network_assigned_by;

		//Add Assignment Values:
		row_network.cells[4].innerHTML = network_assignment_values;

		//Add Assignment Instructions
		row_network.cells[5].innerHTML = network_assignment_instructions;

		//Add rowid
		row_network.cells[10].innerHTML = rowid;


		//Add No PPOs, if ckNoPPOs is ck'd
		if ($("#ckNoPPOs").is(":checked")) {
			row_network.cells[6].innerHTML = "NO PPOs";
		} else {
			//Add a row for each row in gvPPOs, for ID# use assignment #a, b, ... e.g. 1a, 1b, ...
			$("#gvPPOs tr").each(function () {
				cell = $(this).find("td").eq(0);
				cellhtml = $(cell).html();
				if (cellhtml) {
					$("#gvT10_Networks > tbody").append("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
					rownum += 1;
					rowid += 1;
					row_network = tbl.rows[rownum];

					//Add delete btn (cell[0]) for PPO row
					btnhtml = "<input type='submit' name='" + btnid;
					btnhtml = btnhtml + "' value='Delete' onclick='return delete_network_row(" + rowid + ");' ";
					btnhtml = btnhtml + " id='" + btnid + "'";
					btnhtml = btnhtml + " style='color:Red;background-color:#FFC0C0' />";

					row_network.cells[0].className = "columnmiddle";
					row_network.cells[0].innerHTML = btnhtml;

					//Make Assignment No. (cell[2]), Assigned By (cell[3]), Assignment Values (cell[4]), Assignment Instructions (cell[5]) blank
					row_network.cells[2].innerHTML = "";
					row_network.cells[3].innerHTML = "";
					row_network.cells[4].innerHTML = "";
					row_network.cells[5].innerHTML = "";

					//Add PPO info from row of gvPPOs
					rowPPO = (this);

					// copy PPO, cell[0] -> cell[6]
					cell = $(this).find("td").eq(0);
					cellhtml = $(cell).html();
					row_network.cells[6].innerHTML = cellhtml;

					// copy Role, cell[1] -> cell[7]
					cell = $(this).find("td").eq(1);
					cellhtml = $(cell).html();
					row_network.cells[7].innerHTML = cellhtml;

					// copy Payment, cell[2] -> cell[8]
					cell = $(this).find("td").eq(2);
					cellhtml = $(cell).html();
					row_network.cells[8].innerHTML = cellhtml;

					// copy United Role, cell[3] -> cell[9]
					cell = $(this).find("td").eq(3);
					cellhtml = $(cell).html();
					row_network.cells[9].innerHTML = cellhtml;

					//Add rowid
					row_network.cells[10].innerHTML = rowid;

					//Add network_assignment number
					row_network.cells[11].innerHTML = maxassignment_number;
				}
			});
		}

		//Hide last 2 cols, ID#s inserted into gvT10_Networks, with JQuery
		$("#gvT10_Networks tr").each(function () {
			gvrow = (this);
			cell = $(this).find("td").eq(10);
			$(cell).hide();
			cell = $(this).find("td").eq(11);
			$(cell).hide();
		});

		display_networkassignment(false);

	} //end try
	catch (errorObject) {
		alert("In addnewnetworkinfo, the following error occurred: " + errorObject.description);
	}
} // end function addnewnetworkingo

// **************************************

function AMContactinfo_reply(data) {  //0
   displayprocessing(false);
   $("#hvmessage").val(data);
   display_message();
   
   var btnhtml = "";
   var btnid;
   var cell_0;
   var cell_1;
   var cell_2;
   var cell_3;
   var cell_4;
   var cell_5;
   var cell_6;
   var cell_7;
   var cell_8;
   var cell_9;
   var cell_10;
   var cell_11;
   var cell_12;
   var cell_13;
   var lastrow;
   var msgitems = data.split("|");
   var modbtn;
   var row;
   var rowtoremove;
   var rowitem;
   var tbl = AMcontactinfo_table;
   var totalcolumns;
   var totalrows = tbl.rows.length;
   var txtval;
   
   //If the AJAX send saved to the DB, 1st char in reply was 'S', then update the table
   if (msgitems[0] == "S") { 
		show_broker_save_email_action(false);
		
		row = tbl.rows[1];
		totalcolumns = row.cells.length;
		
		if (AMcontactinfomod == "A") { 
			//Create a new row for the table
			AMcontactinfo_rowID = msgitems[3];
			btnid = "btnModify_" + brokernumber + "_" + AMcontactinfo_rowID;
			
			btnhtml = "<input type='submit' name='" + btnid;
			btnhtml = btnhtml + "' value='Modify' onclick='return modify_contactinfo(" + brokernumber + "," + AMcontactinfo_rowID + ");' ";
			btnhtml = btnhtml + " id='" + btnid + "'";
			btnhtml = btnhtml + " style='color:Blue;background-color:#C0C0FF' />";
			
			//Ck if FName == [none]
			rowitem = row.cells[1].innerHTML;
			if (rowitem == "[none]") {
				//insert new btn into cell 0
				row.cells[0].className = "columnmiddle";
				row.cells[0].innerHTML = btnhtml;
				
				//update remaining cells if there is a value in the pop-up box
				if ($("#txtT6_Contactinfo_FName").val().length > 0) row.cells[1].innerHTML = $("#txtT6_Contactinfo_FName").val();
				row.cells[1].className = "columnmiddle";
				
				if ($("#txtT6_Contactinfo_LName").val().length > 0) row.cells[2].innerHTML = $("#txtT6_Contactinfo_LName").val();
				row.cells[2].className = "columnmiddle";
				
				if ($("#txtT6_Contactinfo_Addr1").val().length > 0) row.cells[3].innerHTML = $("#txtT6_Contactinfo_Addr1").val();
				row.cells[3].className = "columnmiddle";
				
				if ($("#txtT6_Contactinfo_Addr2").val().length > 0) row.cells[4].innerHTML = $("#txtT6_Contactinfo_Addr2").val();
				row.cells[4].className = "columnmiddle";
				
				if ($("#txtT6_Contactinfo_City").val().length > 0) row.cells[5].innerHTML = $("#txtT6_Contactinfo_City").val();
				row.cells[5].className = "columnmiddle";
				
				if ($("#txtT6_Contactinfo_ST").val().length > 0) row.cells[6].innerHTML = $("#txtT6_Contactinfo_ST").val();
				row.cells[6].className = "columnmiddle";
				
				if ($("#txtT6_Contactinfo_Zip").val().length > 0) row.cells[7].innerHTML = $("#txtT6_Contactinfo_Zip").val();
				row.cells[7].className = "columnmiddle";
				
				if ($("#txtT6_Contactinfo_Tel").val().length > 0) row.cells[8].innerHTML = $("#txtT6_Contactinfo_Tel").val();
				row.cells[8].className = "columnmiddle";
				
				if ($("#txtT6_Contactinfo_Fax").val().length > 0) row.cells[9].innerHTML = $("#txtT6_Contactinfo_Fax").val();
				row.cells[9].className = "columnmiddle";
				
				if ($("#txtT6_Contactinfo_Email").val().length > 0) row.cells[10].innerHTML = $("#txtT6_Contactinfo_Email").val();
				row.cells[10].className = "columnmiddle";
				
				if ($("#txtT6_Contactinfo_Effdate").val().length > 0) row.cells[11].innerHTML = $("#txtT6_Contactinfo_Effdate").val();
				row.cells[11].className = "columnmiddle";
				
				if ($("#txtT6_Contactinfo_Comment").val().length > 0) row.cells[12].innerHTML = $("#txtT6_Contactinfo_Comment").val();                
				
			} else {
				//add a new row at end of table
				lastrow = tbl.rows.length;
				row = tbl.insertRow(lastrow);
				
				//Add btnModify in cell_0
				cell_0 = row.insertCell(0);
				row.cells[0].className = "columnmiddle";
				row.cells[0].innerHTML = btnhtml;
				
				//Create additional cells
				cell_1 = row.insertCell(1);
				row.cells[1].className = "columnmiddle";
				if ($("#txtT6_Contactinfo_FName").val().length > 0) cell_1.innerHTML = $("#txtT6_Contactinfo_FName").val();
				
				cell_2 = row.insertCell(2);
				row.cells[2].className = "columnmiddle";
				if ($("#txtT6_Contactinfo_LName").val().length > 0) cell_2.innerHTML = $("#txtT6_Contactinfo_LName").val();
				
				cell_3 = row.insertCell(3);
				row.cells[3].className = "columnmiddle";
				if ($("#txtT6_Contactinfo_Addr1").val().length > 0) cell_3.innerHTML = $("#txtT6_Contactinfo_Addr1").val();
				
				cell_4 = row.insertCell(4);
				row.cells[4].className = "columnmiddle";
				if ($("#txtT6_Contactinfo_Addr2").val().length > 0) cell_4.innerHTML = $("#txtT6_Contactinfo_Addr2").val();
				
				cell_5 = row.insertCell(5);
				row.cells[5].className = "columnmiddle";
				if ($("#txtT6_Contactinfo_City").val().length > 0) cell_5.innerHTML = $("#txtT6_Contactinfo_City").val();
				
				cell_6 = row.insertCell(6);
				row.cells[6].className = "columnmiddle";
				if ($("#txtT6_Contactinfo_ST").val().length > 0) cell_6.innerHTML = $("#txtT6_Contactinfo_ST").val();
				
				cell_7 = row.insertCell(7);
				row.cells[7].className = "columnmiddle";
				if ($("#txtT6_Contactinfo_Zip").val().length > 0) cell_7.innerHTML = $("#txtT6_Contactinfo_Zip").val();
				
				cell_8 = row.insertCell(8);
				row.cells[8].className = "columnmiddle";
				if ($("#txtT6_Contactinfo_Tel").val().length > 0) cell_8.innerHTML = $("#txtT6_Contactinfo_Tel").val();
				
				cell_9 = row.insertCell(9);
				row.cells[9].className = "columnmiddle";
				if ($("#txtT6_Contactinfo_Fax").val().length > 0) cell_9.innerHTML = $("#txtT6_Contactinfo_Fax").val();
				
				cell_10 = row.insertCell(10);
				row.cells[10].className = "columnmiddle";
				if ($("#txtT6_Contactinfo_Email").val().length > 0) cell_10.innerHTML = $("#txtT6_Contactinfo_Email").val();
				
				cell_11 = row.insertCell(11);
				row.cells[11].className = "columnmiddle";
				if ($("#txtT6_Contactinfo_Effdate").val().length > 0) cell_11.innerHTML = $("#txtT6_Contactinfo_Effdate").val();
				
				cell_12 = row.insertCell(12);
				row.cells[12].className = "columnmiddle";
				if ($("#txtT6_Contactinfo_Comment").val().length > 0) cell_12.innerHTML = $("#txtT6_Contactinfo_Comment").val();
				
				cell_13 = row.insertCell(13);
				cell_13.className = "hidden";
			} //end if rowitem == [none]
			
			row.cells[13].innerHTML = AMcontactinfo_rowID;
		
		} // end if AMcontactinfomod == 'A'
		
		if (AMcontactinfomod == "M") { 
			//locate the row to update
			for (i=0;i<totalrows;i++) {
				row = tbl.rows[i];
				rowitem = row.cells[13].innerHTML;
				
				if (rowitem == AMcontactinfo_rowID) {
				  //Update FName            
				  txtval = space; 
				  if ($("#txtT6_Contactinfo_FName").val().length > 0) txtval = $("#txtT6_Contactinfo_FName").val();
				  row.cells[1].innerHTML = txtval;
				  
				  //Update LName            
				  txtval = space; 
				  if ($("#txtT6_Contactinfo_LName").val().length > 0) txtval = $("#txtT6_Contactinfo_LName").val();
				  row.cells[2].innerHTML = txtval;
				  
				  //Update Addr1            
				  txtval = space; 
				  if ($("#txtT6_Contactinfo_Addr1").val().length > 0) txtval = $("#txtT6_Contactinfo_Addr1").val();
				  row.cells[3].innerHTML = txtval;
				  
				  //Update Addr2            
				  txtval = space; 
				  if ($("#txtT6_Contactinfo_Addr2").val().length > 0) txtval = $("#txtT6_Contactinfo_Addr2").val();
				  row.cells[4].innerHTML = txtval;
				  
				  //Update City            
				  txtval = space; 
				  if ($("#txtT6_Contactinfo_City").val().length > 0) txtval = $("#txtT6_Contactinfo_City").val();
				  row.cells[5].innerHTML = txtval;
				  
				  //Update State            
				  txtval = space; 
				  if ($("#txtT6_Contactinfo_ST").val().length > 0) txtval = $("#txtT6_Contactinfo_ST").val();
				  row.cells[6].innerHTML = txtval;
				  
				  //Update Zip            
				  txtval = space; 
				  if ($("#txtT6_Contactinfo_Zip").val().length > 0) txtval = $("#txtT6_Contactinfo_Zip").val();
				  row.cells[7].innerHTML = txtval;
				  
				  //Update Tel            
				  txtval = space; 
				  if ($("#txtT6_Contactinfo_Tel").val().length > 0) txtval = $("#txtT6_Contactinfo_Tel").val();
				  row.cells[8].innerHTML = txtval;
				  
				  //Update Fax            
				  txtval = space; 
				  if ($("#txtT6_Contactinfo_Fax").val().length > 0) txtval = $("#txtT6_Contactinfo_Fax").val();
				  row.cells[9].innerHTML = txtval;
				  
				  //Update Email            
				  txtval = space; 
				  if ($("#txtT6_Contactinfo_Email").val().length > 0) txtval = $("#txtT6_Contactinfo_Email").val();
				  row.cells[10].innerHTML = txtval;
				  
				  //Update Effdate            
				  txtval = space; 
				  if ($("#txtT6_Contactinfo_Effdate").val().length > 0) txtval = $("#txtT6_Contactinfo_Effdate").val();
				  row.cells[11].innerHTML = txtval;
				  
				  //Update Comment            
				  txtval = space; 
				  if ($("#txtT6_Contactinfo_Comment").val().length > 0) txtval = $("#txtT6_Contactinfo_Comment").val();
				  row.cells[12].innerHTML = txtval;
				} //end if rowitem == AMcontactinfo_rowID
			} //for i=0
		} // if AMcontactinfomod == 'M'
		
		if (AMcontactinfomod == "R") {
			//If only 2 rows, change row 2 to [none]  
			 if (totalrows == 2) {
				row = tbl.rows[1];
				
				//Remove the button from cell[0] by removing all cell[0]'s nodes from the DOM
				var nodes = row.cells[0].childNodes;
				var node;
				for (i=0;i<nodes.length;i++) {
					node = nodes[i];
					row.cells[0].removeChild(node);
				}
				
				//Set cell[1] to [none]
				row.cells[1].innerHTML = "[none]"
				
				
				//Set all the remaining cells to space
				for (i=2;i<totalcolumns;i++) {
					row.cells[i].innerHTML = space;
				}
			 } else {
				//Find the row and remove it
				for (i=0;i<totalrows;i++) {
					row = tbl.rows[i];
					rowitem = row.cells[13].innerHTML;
					if (rowitem == AMcontactinfo_rowID) rowtoremove = row; 
				}
				$(rowtoremove).remove();
			 } //end if totalrows == 2
		} //end if AMcontactinfomod == 'R'
		
		
   } // end if msgitems[0] == 'S'
		
} //end function AMContactinfo_reply
   

// **************************************

function attachment() {
	var ddlT12_item = document.getElementById("ddlT12_item");
	var ddlT12_tab = document.getElementById("ddlT12_tab");
	var filename;
	var hvitem_number = document.getElementById("hvitem_number");
	var selindex;
	var tabindex;
	var misc_tab_index= ddlT12_tab.options.length - 1;
	var pos;
	var uploadfile = document.getElementById("uploadfile");
	
	//Ck that file has been selected
	if (uploadfile.value.length == 0){
		 subject = "NO ATTACHMENT SELECTED";
		 message = "Please click the Browse... button and select the attachment file to upload."
			$.alerts.dialogClass = "error"; 
			jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
			});	       
			return;
	}
	
	//Get just the filename not full path and check for illegal chars
	pos = uploadfile.value.lastIndexOf("\\");
	filename = uploadfile.value.substring(pos + 1);
   
	//Ck that filename does not have ' /
	if (filename.indexOf("'") != -1 || filename.indexOf("/") != -1){
		subject = "INVALID FILENAME";
		 message = 'The filename for the attachment cannot contain the characters \' " / ; : ? < > | $ # @ % &'
		 $.alerts.dialogClass = "error"; 
		 jAlert(message,subject, function() {
			$.alerts.dialogClass = null; // reset to default
		 });	       
		 return;
	
	}
	
	//Ck that filename does not have " ; :
	if (filename.indexOf('"') != -1 || filename.indexOf(';') != -1 || filename.indexOf(':') != -1){
		subject = "INVALID FILENAME";
		 message = 'The filename for the attachment cannot contain the characters \' "  / ; : ? < > | $ # @ % &'
		 $.alerts.dialogClass = "error"; 
		 jAlert(message,subject, function() {
			$.alerts.dialogClass = null; // reset to default
		 });	       
		 return;
	
	}
	
	//Ck that filename does not have ? < >
	if (filename.indexOf('?') != -1 || filename.indexOf('<') != -1 || filename.indexOf('>') != -1){
		subject = "INVALID FILENAME";
		 message = 'The filename for the attachment cannot contain the characters \' "  / ; : ? < > | $ # @ % &'
		 $.alerts.dialogClass = "error"; 
		 jAlert(message,subject, function() {
			$.alerts.dialogClass = null; // reset to default
		 });	       
		 return;
	
	}
	
	//Ck that filename does not have | $ #
	if (filename.indexOf('|') != -1 || filename.indexOf('$') != -1 || filename.indexOf('#') != -1){
		subject = "INVALID FILENAME";
		 message = 'The filename for the attachment cannot contain the characters \' "  / ; : ? < > | $ # @ % &'
		 $.alerts.dialogClass = "error"; 
		 jAlert(message,subject, function() {
			$.alerts.dialogClass = null; // reset to default
		 });	       
		 return;
	
	}
	 
	//Ck that filename does not have @ % &
	if (filename.indexOf('@') != -1 || filename.indexOf('%') != -1 || filename.indexOf('&') != -1){
		subject = "INVALID FILENAME";
		 message = 'The filename for the attachment cannot contain the characters \' " \\  / ; : ? < > | $ # @ % &'
		 $.alerts.dialogClass = "error"; 
		 jAlert(message,subject, function() {
			$.alerts.dialogClass = null; // reset to default
		 });	       
		 return;
	
	}
	
	//Ck that ddlT12_tab identifies the tab for the attachment
	selindex = ddlT12_tab.selectedIndex;
	tabindex = selindex;
	if (selindex == 0){
		subject = "NO TAB SELECTED FOR ATTACHMENT";
		 message = "Please select the tab from the Tab drop-down list for the attachment file to upload."
			$.alerts.dialogClass = "error"; 
			jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
			});	       
			return;
	}
	
	 //Ck that ddlT12_item identifies the item for the attachment
	selindex = ddlT12_item.selectedIndex;
	if (selindex == 0 && tabindex != misc_tab_index){
		subject = "NO ITEM# SELECTED FOR ATTACHMENT";
		 message = "Please select the Item# from the Item drop-down list for the attachment file to upload."
			$.alerts.dialogClass = "error"; 
			jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
			});	       
			return;
	}

	hvitem_number.value = ddlT12_item.options[selindex].text;
	$("#hvaction").val("ATTACHMENT");

	email_action(true);

		$("#lblEmail_instructions").html("Enter a Note for the Attachment, if desired, and click DONE to save and email the Attachment");

		// Show Note, hide other divs that are n/a for Attachments
		$("#div_emailaction_note").show();
		$("#div_emailaction_effdate").hide();
		$("#txtEffdate_newdata").hide();
		$("#div_emailaction_rb_1").hide();
		$("#div_emailaction_rb_2").hide();
		$("#div_emailaction_rb_3").hide();

	// Set hvmessage to "ATTACHMENT" and perform a Postback
	
//    displayprocessing(true);
//    __doPostBack("ddlGrnbr","");
	
	
}  //end function attachment

// **************************************

function email_action(blndisplay) {
	//Show std divs, in case they are hidden for Attachment upload
	$("#div_emailaction_effdate").show();
	$("#txtEffdate_newdata").show();
	$("#div_emailaction_rb_1").show();
	$("#div_emailaction_rb_2").show();
	$("#div_emailaction_rb_3").show();
	$("#div_emailaction_note").hide();

	//Initialize rb's, effdate, & note
	$("#txtEffdate_newdata").val("");
	$("#txtEmailaction_note").val("");
	$("#rbEmailaction_1").removeAttr("checked");
	$("#rbEmailaction_2").removeAttr("checked");
	$("#rbEmailaction_3").removeAttr("checked");

	if (blndisplay) {
		$("#displayinfo_Overlay").css({ opacity: 0.5 });
		$("#displayinfo_Overlay").show();
		$("#divEmail_action").show();
	} else {
		$("#divEmail_action").hide();
		$("#displayinfo_Overlay").hide();
	}
}

// **************************************

function attachment_grid_change(tab,item_number,action,tab_desc,item_desc){

	//action: 'A' = add if not there and not on Upload grid, 'R' = remove if there
	// Use jquery to get the first row, and the remainder rows 
	
try
{
	
   inttrip = inttrip + 1;
   
   var cell_0;
   var cell_1;
   var cell_2;
   var cell_3;
   var introw;
   var inttab_input = parseInt(tab);
   var inttab_intable;
   var intitem_number_input = parseInt(item_number);
   var intitem_number_intable;
   var insert_row = 1;
   var newrow;
   var rowitemnumber;   
   var rowpresent = false;
   var rowtab;
   var table = document.getElementById("gvT12_AttNotEmailed");
   var totalcells;
   var totalrows; 
   
	
	// Find the row in tblAttNotEmailed and remove it if action = 'R'
	$("#gvT12_AttNotEmailed tr").each(function() { 
		row = $(this);
		rowtab = $(this).find("td:last").html(); 
		rowitemnumber = $(this).find("td").eq(1).html(); 
		if (rowtab == tab && item_number == rowitemnumber) {
			rowpresent = true;
			// remove row and return if action = 'R', Add back [none] row if necessary
			if (action == "R")
			{
				$(this).remove();
				totalrows = table.rows
				if (totalrows.length == 1){
					newrow = table.insertRow();
					cell_0 = newrow.insertCell();
					cell_0.innerHTML = "[none]";
		
					cell_1 = newrow.insertCell();
					cell_1.innerHTML = "";
		
					cell_2 = newrow.insertCell();
					cell_2.innerHTML="[none]";
		
					cell_3 = newrow.insertCell();
					cell_3.innerHTML="";
					cell_3.style.visibility = "hidden";   
				} //if totalrows.length == 1
				return;
			} //if action == 'R'    
		}  // if rowtab==tab && item_number == rowitemnumber     
	});
	
	 // Return if action = 'R' and not found, or action = 'A' and it's already in table
	if (action == "R") return;
	if (action == "A" && rowpresent) return;
	
	//alert("#1 rowpresent: " + rowpresent);
	//Action is 'A' and item is not in gvT12AttNotEmailed
	
	//Return if item is in gvT12AttUploaded
	$("#gvT12_AttUploaded tr").each(function() { 
		row = $(this);
		rowtab = $(this).find("td:last").html(); 
		rowitemnumber = $(this).find("td").eq(2).html(); 
		if (rowtab == tab && item_number == rowitemnumber) rowpresent = true;           
	 }); 
	 
	 //alert("#2 rowpresent: " + rowpresent + ", tabdesc: " + tabdesc);
	 if (rowpresent) return;  
	 
	 //Return if item is in gvT12AttPrevEmailed
	$("#gvT12_AttEmailed tr").each(function() { 
		row = $(this);
		rowtab = $(this).find("td:last").html(); 
		rowitemnumber = $(this).find("td").eq(2).html(); 
		if (rowtab == tab && item_number == rowitemnumber) rowpresent = true;           
	 });  
	 if (rowpresent) return;
	
	// Item must be added to gvT12AttNotEmailed
	
	//Update row1 if [none]
	totalrows = table.rows;
	totalcells = totalrows[1].cells;
	if (totalcells[0].innerHTML == "[none]")
	{
		cell_0 = totalcells[0];
		cell_0.innerHTML = tab_desc;
		
		cell_1 = totalcells[1];
		cell_1.style.textAlign  = "center";
		cell_1.innerHTML = item_number;
		
		cell_2 = totalcells[2];
		cell_2.innerHTML = item_desc;
		
		cell_3 = totalcells[3];
		cell_3.innerHTML = tab;
	   
	}
	else
	{        
		
		//determine where to insert new row
		for (introw=1;introw < totalrows.length; introw++){
			totalcells = totalrows[introw].cells;
			rowtab = totalcells[3].innerHTML;
			rowitemnumber = totalcells[1].innerHTML;
			inttab_intable = parseInt(rowtab);
			intitem_number_intable = parseInt(rowitemnumber);
			if (inttab_intable < inttab_input) insert_row = introw + 1;
			if (inttab_intable == inttab_input && intitem_number_intable <  intitem_number_input) insert_row = introw+1;
		}
		
		// Insert tab Desc
		newrow = table.insertRow(insert_row);
		cell_0 = newrow.insertCell(0);
		cell_0.innerHTML = tab_desc;
		
		// Insert Item#
		cell_1 = newrow.insertCell(1);
		cell_1.style.textAlign  = "center";
		cell_1.innerHTML = item_number;
		
		// Insert Item Desc.
		cell_2 = newrow.insertCell(2);
		cell_2.innerHTML = item_desc;
		
		// Insert tab
		cell_3 = newrow.insertCell(3);
		cell_3.innerHTML = tab;
		 cell_3.innerHTML = tab;
	}
} //end try
	catch(errorObject) {
		alert("In attachment_grid_change, the following error occurred: " + errorObject.description);
	}

}  //end function attachment_grid_change

// **************************************

function attachment_tab_change() {
	var ddltab = $("#ddlT12_tab").val();
	var hv = $("#hvattachments_tab" + ddltab).val();
	var ddlT12_item = document.getElementById("ddlT12_item");
	var itemarray;
	var value_separator = "¥";
	
	//Empty the items ddl
	while (ddlT12_item.options.length) ddlT12_item.options[0] = null;

	itemarray = hv.split(value_separator)
	
	for ( i = 0; i < itemarray.length; i++ ) {

		// Create a new drop down option with the
		// display text and value from arr

		option = new Option( itemarray[i], i );

		// Add to the end of the existing options

		ddlT12_item.options[ddlT12_item.length] = option;
	}

	// Preselect option 0

	ddlT12_item.selectedIndex=0;
} //end function attachment_tab_change

// **************************************

function check_timeout() {
    var popup_message = "Your session will expire in 5 seconds. Click OK if you want to keep working.";
    
    response = false;

    // return if a mousedown event occurred before checking for timeout
    if (mousedownevent) {
        mousedownevent = false;
        reset_server_timeout();
        return;
    }

    if ($("#hvusertype").val() == "W") popup_message += "  (The current data displayed, may be restored the next time you open this program)";

    jConfirm(popup_message, "SESSION TIMING OUT", function (OKresponse) {
        if (OKresponse) {
            response = true;
            reset_server_timeout();
            return;
        } else {
            //Perform PostBack to save data and display Timeout page
            response = true;
            $("#ddlPunbr").removeAttr("disabled");
            $("#ddlGrnbr").removeAttr("disabled");
            $("#ddlGroup").removeAttr("disabled");
            if ($("#hvusertype").val() == "W") save_networks_to_hvnetworkinfo();
            displayprocessing(true);
            __doPostBack("ddlGrnbr", "");
            return;
        }
    });

    //pause 5 secs then ck response (setTimeout uses ms)
    if (!response) setTimeout("checkresponse();", 5000);

} // end function check_timeout

// **************************************

function reset_server_timeout() {
    //Invoke JQuery AJAX call to server
    	$.post("AJAX_RQ.ashx",{session_reset:1},
    			function(data){
    				reset_server_timeout_reply(data);
    	 });
}

// **************************************

function reset_server_timeout_reply(data) {
    // do nothing, returned from resetting session on ASHX page
}

// **************************************

function auto_postback() {
    //2/6/15 Change to timeout method

	//Invoke JQuery AJAX call to server
//	$.post("AJAX_RQ.ashx",{Auto:1},
//			function(data){
//				auto_postback_reply(data);
//	 });
//	//Invoke every 10 min.
//	setTimeout("auto_postback();",600000);
}

// **************************************

function checkresponse() {

    if (!response) {
      $("#ddlPunbr").removeAttr("disabled");
      $("#ddlGrnbr").removeAttr("disabled");
      $("#ddlGroup").removeAttr("disabled");
      if ($("#hvusertype").val() == "W") save_networks_to_hvnetworkinfo();
      displayprocessing(true)
      //Do postback and let code behind know by hvmessage a TIMEOUT occured
      $("#hvmessage").val("TIMEOUT");
        __doPostBack("btnDisplay", "");
    }

}

// **************************************

function auto_postback_reply(data) {
	//do nothing, simply returned from resetting session
}

// **************************************

function changed_ddladdppo() {
    //5/23/16 D.Maibor: modify div_United to united_options, and united_choice
	var ddlval = $("#ddlAddPPO").val();

	$("#div_PPO_role").hide();
	$("#div_special_PPO").hide();
	$("#div_PPO_payment").hide();
	$("#div_PPO_payment_nocharge").hide();
	$("#div_united_options").hide();
	$("#div_united_choice").hide();

	$("#btnSave_ppo").hide();

	if (ddlval != "[?]") {
	    $("#div_PPO_role").show();
	    if (ddlval.indexOf("United Options") > -1) $("#div_united_options").show();
	    if (ddlval.indexOf("United Choice") > -1) $("#div_united_choice").show();
		if (ddlval == "Special Network (specify)")  $("#div_special_PPO").show();
		$("#div_PPO_role").show();
		ppo_payment_options();
	}

} // end function changed_addppo

// **************************************

function changed_grnbr() {
    //3/19/15 D.Maibor: store grnbr in hvgrnbr
	try
	{
		var hvmessage = document.getElementById("hvmessage");
		
		if (formdirty() || brokertabisdirty) {   
			jConfirm("You changed some info on the current WIP but didn't save the changes. Are you sure you want to change the Grnbr and lose any changes entered?", "INFO CHANGED", function(OKresponse) {
				if (OKresponse){
				    hvmessage.value = "GRNBR";
				    $("#hvgrnbr").val($("#ddlGrnbr option:selected").text());
					displayprocessing(true);
					__doPostBack("ddlGrnbr","");
				} else {
	                //Reset ddlGrnbr back to previous value
	                $("#ddlGrnbr option:contains(" + $("#ddlGroup").val() + ")").attr('selected', 'selected');
				}
			});
		} else {
	        hvmessage.value = "GRNBR";
	        $("#hvgrnbr").val($("#ddlGrnbr option:selected").text());
			displayprocessing(true);
			__doPostBack("ddlGrnbr","");
		}
	}
	catch(errorObject) {
		alert("In changed_grnbr, the following error occurred: " + errorObject.description);
	}
}

// **************************************

function changed_broker(brokernum) {
	var ddlBrokers = document.getElementById("ddlBrokers_" + brokernum);
	var selindex = ddlBrokers.selectedIndex;
	
	 if (selindex == 0) return;
	 
	 brokerinfo = brokers[selindex].split("|");
	 brokercode = brokerinfo[0];
	
	//Ck that Broker is not already in the list
	for (var intbroker=1;intbroker<MAX_BROKERS + 1;intbroker++) {
		if (brokercode == $("#hvbroker_" + intbroker).val()){
			subject = "BROKER ALREADY ADDED";
			message = "The Broker you selected is already listed as Broker #" + intbroker + " for this group."
			$.alerts.dialogClass = "error"; 
			jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
			});
			return;
		}
	}
	
	fill_brokerinfo(brokernum);    
}

// **************************************

function changed_group() {
    //3/19/15 D.Maibor: store grnbr in hvgrnbr
	try
	{
		var hvmessage = document.getElementById("hvmessage");
		if (document.getElementById("ddlGroup").value == current_group) return;
		if (formdirty()) {   
			jConfirm("You changed some info on the current WIP but didn't save the changes. Are you sure you want to change the Group and lose any changes entered?", "INFO CHANGED", function(OKresponse) {
				if (OKresponse){
				    hvmessage.value = "GROUP";
				    $("#hvgrnbr").val($("#ddlGroup").val());
					displayprocessing(true);
					__doPostBack("ddlGroup","");
				} else {
					//Reset ddlGrnbr back to previous value
					document.getElementById("ddlGroup").value = current_group;
				}
			});
		} else {
			hvmessage.value = "GROUP";
			$("#hvgrnbr").val($("#ddlGroup").val());
			displayprocessing(true);
			__doPostBack("ddlGroup","");
		}
	}
	catch(errorObject) {
		alert("In changed_group, the following error occurred: " + errorObject.description);
	}
}

// **************************************

function changed_ddlHpi() {
   
	var Hpivalue = $("#ddlHpi").val();
	var pos_start;
	var pos_end;
	var tmpval;
	
	// Set radio buttons,ckboxes, and Effdate to unck'd/nothing
	$("#rbT1_rptrecip_notify_0").attr('checked', false);
	$("#rbT1_rptrecip_notify_1").attr('checked', false);
	$("#rbT1_rptrecip_notify_2").attr('checked', false);
	$("#ckT1_rpt_recip_phi").attr('checked', false);
	$("#txtT1_rptrecip_effdate").val("");
	
	if (Hpivalue == "[none]") {
		$("#txtT1_rptrecip_fname").val("");
		$("#txtT1_rptrecip_lname").val("");
		$("#txtT1_rptrecip_email").val("");
	} else {        
		//Get LName
		pos_start = 0;
		pos_end = Hpivalue.indexOf(","); 
		tmpval = Hpivalue.substring(pos_start,pos_end);
		$("#txtT1_rptrecip_lname").val(tmpval);
		
		//Get FName
		pos_start = pos_end + 2;
		pos_end = Hpivalue.indexOf("("); 
		tmpval = Hpivalue.substring(pos_start,pos_end);
		$("#txtT1_rptrecip_fname").val(tmpval);
		
		//Get Email
		pos_start = pos_end + 1;
		pos_end = Hpivalue.indexOf(")"); 
		tmpval = Hpivalue.substring(pos_start,pos_end);
		$("#txtT1_rptrecip_email").val(tmpval);
	}
} //end function changed_ddlHpi

// **************************************

function changed_punbr() {
    //3/19/15 D.Maibor: store hvpunbr from ddlPunbr
	try
	{
	    var hvmessage = document.getElementById("hvmessage");
	    $("#hvpunbr").val($("#ddlPunbr").val());
		if (document.getElementById("ddlPunbr").value == current_punbr) return;
		if (formdirty() || brokertabisdirty) {    
			jConfirm("You changed some info on the current WIP but didn't save the changes. Are you sure you want to change the Underwriter and lose any changes entered?", "INFO CHANGED", function(OKresponse) {
				if (OKresponse){
					hvmessage.value = "PUNBR";
					displayprocessing(true);
					__doPostBack("ddlPunbr","");
				} else {
					//Reset ddlPunbr back to previous value
					document.getElementById("ddlPunbr").value = current_punbr;
				}
			});
		} else {
			hvmessage.value = "PUNBR";
			displayprocessing(true);
			__doPostBack("ddlPunbr","");
		}
	} //end try
	catch(errorObject) {
		alert("In changed_punbr, the following error occurred: " + errorObject.description);
	}
} //end function changed_punbr

// **************************************

function changed_scheduleA() {
	var ddlvalue = $("#ddlSchedA").val();
	
	if (ddlvalue > 2) {
		alert("Not yet implemented");
		show_scheduleAinfo(false);
		return;
	}
	
	if (ddlvalue == 0) {
		show_scheduleAinfo(false);
	} else {
		show_scheduleAinfo(true);
	}
	
} //end function changed_scheduleA()

// **************************************

function check_digit(total,keycode,currctrl,nextctrl) {
	//Make sure key pressed is 0-9. If the length of currctrl = total and nextctrl is not NULL, 
	//  move to next control 
	var movetoctrl = document.getElementById(nextctrl);
	
	//Allow backspace(8), tab (9), and delete (46)
	if (keycode==8 || keycode==9 || keycode==46)return true
	
	if (currctrl.value.length == total)return false;
	
	//Check for numbers 0-9 (keycodes 48-57)
	if (keycode>47 && keycode<58){
		currctrl.value = currctrl.value + String.fromCharCode(keycode);
		if (currctrl.value.length==total && nextctrl.length>0)movetoctrl.focus();
	}
	
	//Check for keypad numbers 0-9 (keycodes (96-105)
	if (keycode>95 && keycode<106){
		//currctrl.value = currctrl.value + keycode-96;
		currctrl.value = currctrl.value + String.fromCharCode(keycode-48);
		if (currctrl.value.length==total && nextctrl.length>0)movetoctrl.focus();
	}
	
	//For ENTER(13) move to next control if length is 0 for total<6
	if (total<6 && keycode==13 && currctrl.value.length==0 && nextctrl.length>0)movetoctrl.focus();
	
	//For ENTER(13) move to next control if length is 0-total-1 for total = 6 (ext.)
	if (total==6 && keycode==13 && nextctrl.length>0)movetoctrl.focus();
	
	return false;
	
} //end function check_digit


// **************************************

function check_percent(ctrl,tabname,itemnumber) {

	check_for_float(ctrl,tabname,itemnumber);
	if (valid_amount) check_for_percentage(ctrl);    
}

// **************************************
function check_fee_amount(ctrl, tabname, itemnumber) {
    var invalidnumber = false;
    var ctrlval = ctrl.value;

    //Remove ',' if present
    ctrlval = ctrlval.replace(",", "");

    //Remove '$' if 1st char
    if (ctrlval.charAt(0) == "$") {
        ctrlval = ctrlval.substring(1);
    }

    if (isNaN(ctrlval)) invalidnumber = true;
        
    if (invalidnumber) {
        subject = "INVALID NUMBER";
        message = "The value you entered on tab: " + tabname + ", Item# " + itemnumber + ", " + ctrl.value + ",  is not a valid number. You must enter a number for this value or leave blank."
        $.alerts.dialogClass = "error";
        jAlert(message, subject, function () {
            $.alerts.dialogClass = null; // reset to default
        });
        $(ctrl).val("");
    } else {
        check_for_dollar_amount(ctrl);
        tab11_optional_texts();    
    }

//    check_for_float(ctrl,tabname,itemnumber);
//	if (valid_amount) check_for_dollar_amount(ctrl);    
}

// **************************************

function check_for_dollar_amount(ctrl) {
	var number_to_ck;
	var startpos = 0;
	var value_initial = ctrl.value;
	var value_final;
	
	if (hvtab == 11) {
		set_dirty("hvrenewaldirty");
	} else {
		set_dirty("hvformdirty");
	}
	
	if (value_initial.length == 0) return;
	
	 //Remove any , in number
	value_initial = value_initial.replace(",","");
	
	//Check if 1st char is $
	if (value_initial.indexOf("$") == 0) {
		 startpos = 1;
		 if (value_initial.length == 1) return;
	}
	
	number_to_ck = value_initial.substring(startpos)
	
	//Return if not a number, after initial $
	if (isNaN(number_to_ck)) return;
	
	value_final = parseFloat(number_to_ck);
	ctrl.value = "$" + value_final.toFixed(2);

}

// **************************************

function check_for_dollar_total(ctrl1,ctrl2,ctrltotal){
	var char;
	var number_to_ck;
	var val_1 = ctrl1.value;
	var val_2 = ctrl2.value;
	var startpos = 0;
	var total = 0;
	
	ctrltotal.value = "";
	
	if (val_1.length == 0 && val_2.length == 0) {
		$(ctrltotal).val("");
		return;
	}
	
	
	// process val_1
	if (val_1.length > 0) {
		//Check if 1st char is $
		if (val_1.indexOf("$") == 0) {
			 startpos = 1;
		}
		
		 number_to_ck = val_1.substring(startpos);
	
		//Return if not a number, after initial $
		if (isNaN(number_to_ck)) {
		   // ignore 
		} else {
			total = parseFloat(number_to_ck);
		}
	}
	
	 // process val_2
	startpos = 0
	if (val_2.length > 0) {
		//Check if 1st char is $
		if (val_2.indexOf("$") == 0) {
			 startpos = 1;
		}
		
		 number_to_ck = val_2.substring(startpos);
	
		//Return if not a number, after initial $
		if (isNaN(number_to_ck)) {
		   //ignore
		} else {
			total = total +  parseFloat(number_to_ck);
		}
	}
	
	//Round total to 2 dec. places 
	if (total > 0) ctrltotal.value = "$" + total.toFixed(2);
	  
} //end check_for_dollar_total

// **************************************

function check_for_percentage(ctrl) {
	var number_to_ck;
	var lastpos;
	var value_initial = ctrl.value;
	var value_final;
	
	set_dirty("hvrenewaldirty");
	if (value_initial.length == 0) return;
	
	lastpos = value_initial.length - 1;
	
	//Check if last char is %
	if (value_initial.indexOf("%") == lastpos) {
		 lastpos = lastpos - 1;
		 if (value_initial.length == 1) return;
	}
	
	number_to_ck = value_initial.substring(0,lastpos + 1);
	
	//Return if not a number, after initial $
	if (isNaN(number_to_ck)) return;
	
	value_final = parseFloat(number_to_ck);
	ctrl.value = value_final + "%";
}  //end check_for_dollar_amount

// **************************************

function check_for_percentage_total(ctrl1,ctrl2,ctrltotal){
	var number_to_ck;
	var val_1 = ctrl1.value;
	var val_2 = ctrl2.value;
	var lastpos = 0;
	var total = 0;
	
	ctrltotal.value = "";
	
	if (val_1.length == 0 && val_2.length == 0) return;
	
	// process val_1
	if (val_1.length > 0) {
		
		lastpos = val_1.length - 1;
		
		//Check if last char is %
		if (val_1.indexOf("%") == lastpos) {
			lastpos = lastpos - 1;
			if (val_1.length == 1) return;
		}
		
		 number_to_ck = val_1.substring(0,lastpos + 1);
	
		//Return if not a number, after initial $
		if (isNaN(number_to_ck)) {
			return;
		}
	
		total = parseFloat(number_to_ck);
	}
	
	// process val_2
	startpos = 0
	if (val_2.length > 0) {
	
		lastpos = val_2.length - 1;
		
		//Check if last char is %
		if (val_2.indexOf("%") == lastpos) {
			lastpos = lastpos - 1;
			if (val_2.length == 1) return;
		}
		
		 number_to_ck = val_2.substring(0,lastpos + 1)
	
		//Return if not a number, after initial $
		if (isNaN(number_to_ck)) {
			return;
		}
	
		total += parseFloat(number_to_ck);
	}
	 
	
	ctrltotal.value = total + "%";    
} //end check_for_dollar_total

// **************************************

function check_for_integer(ctrl,tabname,itemnumber) {
	var tmpval;
	
	valid_int = true;
 
	tmpval = $(ctrl).val();
	
	//Ck that each char is an integer
	for (i = 0 ; i < tmpval.length ; i++) { 
		if ((tmpval.charAt(i) < '0') || (tmpval.charAt(i) > '9')) {
			$(ctrl).removeClass('transparent').addClass('highlight');
			$(ctrl).val("");
			
			valid_int = false;
			
			subject = "INVALID NUMBER";
			message = "The value you entered on tab: " + tabname + ", Item# " + itemnumber + "  is not a valid number. You must enter a number (1,2, etc.) for this value or leave blank."
			$.alerts.dialogClass = "error"; 
			jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
			});
			return;	            
		}
	} 
	
	//valid integer
	set_dirty("hvformdirty");
	$(ctrl).removeClass('highlight').addClass('transparent');
		
} //end function check_for_integer


// **************************************

function check_for_float(ctrl,tabname,itemnumber) {
	var lastpos;
	var tmpval;
	
	valid_amount = false;
	tmpval = ctrl.value;
	if (tmpval) {
		//alert("in check_for_float, tmpval exists");
		if (tmpval.length == 0) return;
		
		lastpos = tmpval.length - 1;
		
		//Remove ',' if present
		tmpval = tmpval.replace(",","");
	
		//Remove '$' if 1st char
		if (tmpval.charAt(0) == "$") {
			 tmpval = tmpval.substring(1);
		}
		
		//Remove '%' if last char
		if (tmpval.charAt(lastpos) == "%")  {
			 tmpval = tmpval.substring(0,lastpos);
		}
		
		tmpval = parseFloat(tmpval);
		valid_amount = false;
		
		if (isNaN(tmpval)) {
			 $(ctrl).removeClass('transparent').addClass('highlight');
			 $(ctrl).val("");
			 subject = "INVALID NUMBER";
			 message = "The value you entered on tab: " + tabname + ", Item# " + itemnumber + "  is not a valid number. You must enter a number (e.g. 35.5) for this value or leave blank."
			 $.alerts.dialogClass = "error"; 
			 jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
			 });
				return;	
		}
		
		//tmpval is a valid float number. Make sure it is not negative
		if (tmpval < 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
			$(ctrl).val("");
			subject = "INVALID NUMBER";
			message = "The value you entered on tab: " + tabname + ", Item# " + itemnumber + "  cannot be less than zero. Please enter another value or leave blank."
			$.alerts.dialogClass = "error"; 
			jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
			});
				return;	
		}
		
		//valid float
		set_dirty("hvformdirty");
		valid_amount = true;
		$(ctrl).removeClass('highlight').addClass('transparent');
	} else {
		//alert("in check_for_float, tmpval does NOT exists");
	}
	


} //end function check_for_float

// **************************************

function check_for_unsent_data() {
    //1/15/16 D.Maibor: change AJAX call to use grnbr
    var grnbr = $("#ddlGrnbr").val(); 

    displayprocessing(true);
    //Make AJAX call 
    $.post("AJAX_RQ.ashx", { userid: $("#hvuser").val(), unsent_data: 1, Grnbr: current_grnbr },
			function (data) {
			    check_for_unsent_data_reply(data);
			});
}

// **************************************

function check_for_unsent_data_reply(data) {
    // 5/27/15 D.Maibor: perform postback if return is 'OK' 
     var msgitems = data.split("|");

     if (msgitems.length == 0) {
        $.alerts.dialogClass = "error"; 
        subject = "PROBLEM CHECKING FOR UNSENT DATA";
        message = "There was a problem checking the DB for unsent data. If the problem continues, please call the HELP DESK."
        jAlert(message,subject, function() {
		    $.alerts.dialogClass = null; // reset to default
	    });
        displayprocessing(false);
        return;	
     } 
        
     if (msgitems[0] != "OK") {
            subject = msgitems[1];
            message = msgitems[2];
            $.alerts.dialogClass = "error";
             jAlert(message,subject, function() {
		        $.alerts.dialogClass = null; // reset to default
		    });
		    displayprocessing(false);
		    return;	
      } 
      
      // returned 'OK'
       __doPostBack("btnEmailUnsent", "");

} // end function check_for_unsent_data_reply

// **************************************

function check_text_length(ctrl,length,tabname,itemnumber) {
	var txtlength;
	
	if (hvtab != 6) set_dirty("hvformdirty");
	
	if (ctrl.value.length > length) {
		ctrl.className = "highlight";
		ctrl.value = ctrl.value.substring(0, length);
		subject = "TOO MUCH DATA ENTERED";
		message = "The value you entered on tab: " + tabname + ", Item# " + itemnumber + " exceeds the max. no. of chars. for this field (max is: " + length + " chars). Your entry has been truncated. If you need to enter more chars, please notify the IS Dept.";
		$.alerts.dialogClass = "error"; 
		jAlert(message,subject, function() {
			$.alerts.dialogClass = null; // reset to default
		});
	} else {
		if (tabname != "AMContact Info") ctrl.className = "transparent"
	}
}

// **************************************

function check_for_valid_date(ctrl) {
	var entrydate = $(ctrl).val();
	valid_date = Date.parse(entrydate);
	
	if (valid_date < 0 || isNaN(valid_date)) {
		$(ctrl).val("");
		ctrl.focus();
		ctrl.className = "highlight";
		subject = "INVALID DATE ENTERED";
		message = "You must select a date for this field from the pop-up calendar or leave the box blank.";
		$.alerts.dialogClass = "error"; 
		jAlert(message,subject, function() {
			$.alerts.dialogClass = null; // reset to default
		});
	} else {
		if (ctrl.id == "txtT6_Contactinfo_Effdate") {
			ctrl.className = "white"
		} else {
			ctrl.className = "transparent"
		}
		
	}
} // end function check_for_valid_date

// **************************************

function check_for_valid_state(ctrl) {
	var state = $(ctrl).val();
	var regex = /^(AK|AL|AR|AZ|CA|CO|CT|DC|DE|FL|GA|HI|IA|ID|IL|IN|KS|KY|LA|MA|MD|ME|MI|MN|MO|MS|MT|NB|NC|ND|NH|NJ|NM|NV|NY|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VA|VT|WA|WI|WV|WY)$/i;

	if (!state.match(regex)) {
		subject = "INVALID STATE ENTERED";
		message = "You must enter a valid STATE abbreviation or leave the box blank.";
		$.alerts.dialogClass = "error";
		jAlert(message, subject, function () {
			$.alerts.dialogClass = null; // reset to default
		});
		$(ctrl).val("");
	}
}

// **************************************

function check_for_valid_zip(ctrl) {
	var zip = $(ctrl).val();
	var regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

	if (!zip.match(regex)) {
		subject = "INVALID ZIP CODE ENTERED";
		message = "You must enter a valid Zip code or leave the box blank.";
		$.alerts.dialogClass = "error";
		jAlert(message, subject, function () {
			$.alerts.dialogClass = null; // reset to default
		});
		$(ctrl).val("");
	}
}

// **************************************

function check_for_value(ctrl){
	if (ctrl.value.length > 0){
		ctrl.style.background = "Transparent";
	}
	else
	{
		 ctrl.style.background = "#FFC0C0";
	}
}  //end function check_for_value

// **************************************

function check_new_PPO() {
	var ddlPPO = document.getElementById("ddlPPO");
	var selindex;
	
	selindex = ddlPPO.selectedIndex;
	if (selindex == ddlPPO.length-1){
		show_PPOinfo(false); 
		show_newPPO(true);
	}
} // end function check_new_PPO

// **************************************

function check_state(ctrl) {
	
	var nextchar;
	
	//if (txtT1_14.value.length > 0){
	if (ctrl.value.length > 0) {
		//Check that State is 2 chars
		if (ctrl.value.length != 2){
			subject = "INVALID STATE";
			message = "Please enter the state as two characters, e.g. MA"
			$.alerts.dialogClass = "error"; 
			jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
			});
			
			ctrl.className = "highlight";
			return;
		}
		  
		//Check that 1st char is A-Z
		nextchar = ctrl.value.charAt(0);
		nextchar = nextchar.toUpperCase();
		if (nextchar < "A" || nextchar > "Z"){
			subject = "INVALID STATE";
			message = "Please enter the state as two characters, e.g. MA"
			$.alerts.dialogClass = "error"; 
			jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
			});
			ctrl.className = "highlight";
			return;
		}
		
		
	   //Check that 1st char is A-Z
		nextchar = ctrl.value.charAt(1);
		nextchar = nextchar.toUpperCase();
		if (nextchar < "A" || nextchar > "Z"){
			subject = "INVALID STATE";
			message = "Please enter the state as two characters, e.g. MA"
			$.alerts.dialogClass = "error"; 
			jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
			});
			ctrl.className = "highlight";
			return;
		}
		
	  //State is 2 alpha chars   
	  ctrl.value = ctrl.value.toUpperCase();
	  if (ctrl.id == "txtT1_14") ctrl.className = "transparent";
	  if (ctrl.id == "txtT6_Contactinfo_ST") ctrl.className = "white";
		
	}
	
} //end function check_state

// **************************************

function check_states_other() {
	var selectedItems = $("#lbStates").val();
	var lbvalue = document.getElementById("lbStates");   

	//Show div_Other_state if Other(specify) is selected
	$("#div_Other_state").hide();
	if (lbvalue.value.length > 0) {
		for (var i = 0; i < selectedItems.length; i++) {
			if (selectedItems[i] == "Other (specify)") $("#div_Other_state").show();
		}
		$("#div_Network_PPOs").show();
		$("#btnAddPPO").show();
		if ($("#ckNoPPOs").is(":checked")) $("#btnAddPPO").hide();
	}
	
} //end function check_states_other

// **************************************

function check_taxid() {
	//TaxID must contain 9 digits
	var digits = "";
	var nextchar;
	var position;
	var txtbox = document.getElementById("txtT1_17");
	
	//Exit if no value entered
	if (txtbox.value.length == 0){
		txtbox.className = "transparent";
		return;
	}
	
	//Save all numbers in digits
	for (position=0; position < txtbox.value.length; position++){
		nextchar = txtbox.value.charAt(position);
		if ((nextchar>="0") && (nextchar<="9")){
			digits += nextchar;
		}
	}
	
	//Make sure digits = 9
	if (digits.length != 9){
		subject = "INVALID TAX ID NUMBER";
		message = "The Tax ID number must have 9 digits."
		$.alerts.dialogClass = "error"; 
			jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});
			txtbox.className = "highlight";
			return;
	}
	
	//Number is OK, rewrite as xx-xxxxxxxx
	txtbox.value = digits.substr(0,2) + "-" + digits.substr(2,7)
	txtbox.className = "transparent";
}

// **************************************

function confirm_reset() {
	var hvmessage = document.getElementById("hvmessage");
	
	 jConfirm("Are you sure you want to reset this form and lose any changes entered?", "RESET THIS FORM?", function(OKresponse) {
		if (OKresponse){
		   hvmessage.value = "RESET";
		   displayprocessing(true);
			__doPostBack("btnuPDATE","");
		}
		});
		
} // end function confirm_reset

// **************************************

function current_date() {
	var hvmessage = document.getElementById("hvmessage")
	var lblT11_currentdate = document.getElementById("lblT11_currentdate");
	var txtT11_current_effdate = document.getElementById("txtT11_current_effdate");
	
	//Check if no length
	if (txtT11_current_effdate.value.length == 0)
	{
		lblT11_currentdate.innerHTML = "[DATE]";
		return;
	}
	
	
	if (valid_date_entered(txtT11_current_effdate.value))
	{
		lblT11_currentdate.innerHTML = txtT11_current_effdate.value;
		return;
	}
	else
	{
		subject = "INVALID DATE ENTERED";
		message = "The current/previous values effective date is invalid."
		$.alerts.dialogClass = "error"; 
			jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});   
	}
	
}

// **************************************

function  current_changed_effdate(){
	var txtT11_current_changed_effdate = document.getElementById("txtT11_current_changed_effdate");
	var txteffdate = document.getElementById("txtEffDate");
	
	//Update txteffdate with current_changed_effdate if len > 0
	if (txtT11_current_changed_effdate.value.length > 0){
		txteffdate.value = txtT11_current_changed_effdate.value;
	}
}

// **************************************

function delete_network_row(rowid) {
	var assignment_number;
	var deleterow;
	var rowx;
	var rowtype = "n"; //Assume deleting entire Network assignment
	var totalrows;

	networktabisdirty = true;

	// Get the row with rowid
	$("#gvT10_Networks tr").each(function () {
		rowx = (this);
		cell = $(this).find("td").eq(10);
		cellhtml = $(cell).html();
		if (cellhtml == rowid) deleterow = rowx;
	});

	cell = $(deleterow).find("td").eq(2);
	cellhtml = $(cell).html();

	//If Assignment # col is not a number, only deleting a PPO row
	if (cellhtml == "" || cellhtml == "&nbsp;") rowtype = "p";

	// Change confirm depending if just PPO row or entire Network Assignment
	if (rowtype == "p") {
		jConfirm("Are you sure you want to delete this PPO row?", "DELETE PPO ROW", function (OKresponse) {
			if (OKresponse) {
				cell = $(deleterow).find("td").eq(11);
				cellhtml = $(cell).html();
				assignment_number = cellhtml;
				$(deleterow).remove();
				check_networks(assignment_number, 'p');
			}
		});
	} else {
		jConfirm("Are you sure you want to delete this Network Asignment?", "DELETE NETWORK ASSIGNMENT", function (OKresponse) {
			if (OKresponse) {
				//If a No PPOs rows just delete
				cell = $(deleterow).find("td").eq(6);
				cellhtml = $(cell).html();
				if (cellhtml == "NO PPOs") {
					$(deleterow).remove();
					check_networks(assignment_number, 'n');
				} else {
					//Need to delete both Network row and all associated PPOs
					cell = $(deleterow).find("td").eq(2);
					cellhtml = $(cell).html();
					assignment_number = cellhtml;
					$(deleterow).remove(); //remove assignment row

					//remove all rows where parentid, cell[10] = assignment number
					$("#gvT10_Networks tr").each(function () {
						rowx = (this);
						cell = $(this).find("td").eq(11);
						cellhtml = $(cell).html();
						if (cellhtml == assignment_number) $(rowx).remove();
					});
					check_networks(assignment_number, 'n');
				}
			}
		});  // end jConfirm
	} // end if rowtype == p
	return false;
} // end function delete_network_row

// **************************************
function check_networks(assignment_number,rowtype) {
	// Remove assignment row, if no PPOs
	// Add [none] row if no more assignment rows

	var blnPPOs = false;
	var assignment_row;
	var tbl = document.getElementById("gvT10_Networks");
	var totalrows;

	//If PPO row was deleted, ck if there are any more PPO rows, where parentid = assignment_number. If not, delete assignment row
	if (rowtype == 'p') {
		$("#gvT10_Networks tr").each(function () {
			cell = $(this).find("td").eq(10);
			cellhtml = $(cell).html();
			if (cellhtml == assignment_number) blnPPOs = true;
		});

		// if no more PPOs, remove the assignment row as well
		if (! blnPPOs) {
			$("#gvT10_Networks tr").each(function () {
				rowx = (this);
				cell = $(this).find("td").eq(1);
				cellhtml = $(cell).html();
				if (cellhtml == assignment_number) $(this).remove();
			});
		}
	} // end if rowtype == p

	// If no data rows left, create row w/[none]
	totalrows = $('#gvT10_Networks tr').length;
	if (totalrows == 1) {
		//Create new network row with [none] as Assigned By in cell[2]
		$("#gvT10_Networks > tbody:last").append("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
		assignment_row = $("#gvT10_Networks tr").eq(1);
		assignment_row = tbl.rows[1];

		assignment_row.cells[2].className = "columnmiddle";
		assignment_row.cells[2].innerHTML = "[none]";
	}
} // end function check_networks

// **************************************

function display_addnote(display) {
	 var addnoteinfo = document.getElementById("addnoteinfo");
	 var txtaddnote = document.getElementById("txtAddNote");

	if (display){
		addnoteinfo.style.visibility = "visible";
		txtaddnote.value = "";
		txtaddnote.focus();
	} else {
		addnoteinfo.style.visibility = "hidden";
	}

}

// **************************************

function display_add_email_note(display) {
	 var addnoteinfo = document.getElementById("add_email_noteinfo");
	 var txtaddnote = document.getElementById("txtAddEmailNote");

	if (display){
		addnoteinfo.style.visibility = "visible";
		txtaddnote.focus();
	} else {
		addnoteinfo.style.visibility = "hidden";
	}
}

// **************************************

function display_main_buttons(blndisplay) {
//5/27/15 D.Maibor: remove hiding btnEmailUnsent
	if (blndisplay) {
		$("#mainbuttons").show();
		$("#tab11buttons").hide();
	} else {
		$("#mainbuttons").hide();
	}
}

// **************************************

function display_ppoassignment(display) {
	if (display) {
		$("#displayinfo_PPO_overlay").css({ opacity: 0.5 });
		$("#displayinfo_PPO_overlay").show();
		$("#addPPO_to_network").show();
		initialize_ppoform();
	} else {
		$("#displayinfo_PPO_overlay").hide();
		$("#addPPO_to_network").hide();
	}
}

// **************************************

function display_ppo_savebutton() {
	$("#btnSave_ppo").hide();

	//Show if payment option is selected
	if ($("#rbPPO_payment_1").is(":checked")) $("#btnSave_ppo").show();
	if ($("#rbPPO_payment_2").is(":checked")) $("#btnSave_ppo").show();
	if ($("#rbPPO_payment_3").is(":checked")) $("#btnSave_ppo").show();

}

// **************************************

function display_networkassignment(display) {
	var txt = document.getElementById("txtNetwork_dept_member");

	if (display) {
		$("#displayinfo_Overlay").css({ opacity: 0.5 });
		$("#displayinfo_Overlay").show();
		$("#networkassignment").show();
		$("#network_by_state").hide();
		$("#div_Other_state").hide();
		$("#network_by_dept_member").hide();
		$("#div_Network_PPOs").hide();

		//Display state/dept-member div depending on which rb is selected
		if ($("#rbAssigned_by_1").is(":checked")) {
			$("#network_by_state").show();
			check_states_other();
		}

		if ($("#rbAssigned_by_2").is(":checked")) {
			$("#network_by_dept_member").show();
			$("#lblNetwork_dept_member").html("Department(s)");
			$("#div_Network_PPOs").show();
			if (txt.value.length > 0) {
				$("#btnAddPPO").show();
				if ($("#ckNoPPOs").is(":checked")) $("#btnAddPPO").hide();
			} 
		}
		
		if ($("#rbAssigned_by_3").is(":checked")) {
			$("#network_by_dept_member").show();
			$("#lblNetwork_dept_member").html("Member Choice(s)");
			$("#div_Network_PPOs").show();
			if (txt.value.length > 0) {
				$("#btnAddPPO").show();
				if ($("#ckNoPPOs").is(":checked")) $("#btnAddPPO").hide();
			} 
		}
	} else {
		$("#displayinfo_Overlay").hide();
		$("#networkassignment").hide();
	}
}

// **************************************

function display_network_email(display) {
	if (display) {
		//Initialize effdate & rb's
		$("#txtT10_effdate").val("");
		$('#rbT10_networksave_action_1').removeAttr('checked');
		$('#rbT10_networksave_action_2').removeAttr('checked');
		$('#rbT10_networksave_action_3').removeAttr('checked');

		$("#displayinfo_Overlay").css({ opacity: 0.5 });
		$("#displayinfo_Overlay").show();
		$("#Network_email_action").show();
	} else {
		$("#displayinfo_Overlay").hide();
		$("#Network_email_action").hide();
	}
} //end function display_metwork_email

// **************************************
function display_attachments() {
try
{
  var att_separator = "$";
  var attnotuploaded_data = ""; 
  var attwindow;
  var fontcolor;
  var grnbr = $("#ddlGrnbr").val();
  var groupname = $("#ddlGroup").val();
  var reportpath = "Attachments.aspx";
  var usertype = $("#hvusertype").val();
  var value_separator = ";"
  
  
  //Add punbr
  reportpath += "?punbr=" + $("#ddlPunbr").val() + "&grnbr=";
  
  //Retrieve grnbr from 1st 3 chars of lblClient if New
  if (grnbr.indexOf("[") != -1) {
		grnbr = $("#lblClient").text();
		grnbr = grnbr.substring(0,3);
		groupname = "[NEW CLIENT]";
  }
  
  //Add grnbr, groupname to querystring
  reportpath += grnbr + "&group=" + groupname +  "&name=";
  
  //Add Client name from lblClient
  reportpath += $("#lblClient").text();
  
  //Add usertype
  reportpath += "&user=" + usertype;  
	
  
  if ($("#rbT1_39_1").is(":checked")) {
	fontcolor = $("#lblT1_39_Attachment").css("color");
	if (fontcolor == "red") attnotuploaded_data = "T1" + value_separator + "39";
  }

  if( $("#ckT1_46l").is(":checked")) {
	fontcolor = $("#lblT1_46_Attachment").css("color");
	if (fontcolor == "red") {
		if (attnotuploaded_data.length > 0) attnotuploaded_data = attnotuploaded_data + att_separator;
		attnotuploaded_data = attnotuploaded_data + "T1" + value_separator + "64";
	}
  }
  
 if( $("#rbT2_8_1").is(":checked") ) {
	fontcolor = $("#lblT2_8_Attachment").css("color");
	if (fontcolor == "red") {
		if (attnotuploaded_data.length > 0) attnotuploaded_data = attnotuploaded_data + att_separator;
		attnotuploaded_data = attnotuploaded_data + "T2" + value_separator + "8";
	}
 }
  
 if( $("#rbT2_23_1").is(":checked") ) { 
	fontcolor = $("#lblT2_23_Attachment").css("color");
	if (fontcolor == "red") {
		if (attnotuploaded_data.length > 0) attnotuploaded_data = attnotuploaded_data + att_separator;
		attnotuploaded_data = attnotuploaded_data + "T2" + value_separator + "23";
	}
 }
  
  if( $("#rbT7_16_1").is(":checked") ) { 
	fontcolor = $("#lblT7_16_Attachment").css("color");
	if (fontcolor == "red") {
		if (attnotuploaded_data.length > 0) attnotuploaded_data = attnotuploaded_data + att_separator;
		attnotuploaded_data = attnotuploaded_data + "T7" + value_separator + "16";
	}
  }
  
  if( $("#rbT9_9_1").is(":checked") ) {
	fontcolor = $("#lblT9_9_Attachment").css("color");
	if (fontcolor == "red") {
		if (attnotuploaded_data.length > 0) attnotuploaded_data = attnotuploaded_data + att_separator;
		attnotuploaded_data = attnotuploaded_data + "T9" + value_separator + "9";
	}
  }
  
  //Add attnotuploaded_data if len > 0
  if (attnotuploaded_data.length > 0) reportpath += "&attdata=" +  attnotuploaded_data;
  
  //Open a new window for the .pdf file
  pdfwindow = window.open (reportpath,"mywindow","scrollbars=1,resizable=1,width=950,height=560");
  
}
catch(errorObject) {
		alert("In display_attachments, the following error occurred: " + errorObject.description);
}
} //end function display_docs

// **************************************


function display_date(){
	var hvmessage = document.getElementById("hvmessage");
	var txtdisplaydate = document.getElementById("txtDisplayDate");

	if (txtdisplaydate.value.length == 0)
	{
		 subject = "MISSING EFFECTIVE DATE";
		 message = "Please enter the effective date for the displayed values";
		 $.alerts.dialogClass = "error"; 
		 jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});
		return false;
	}
	
	if (formdirty()) {   
		jConfirm("You changed some info on the current WIP but didn't save the changes. Are you sure you want to change the Eff Date and lose any changes entered?", "INFO CHANGED", function(OKresponse) {
			if (OKresponse){
				hvmessage.value = "DISPLAY";
				displayprocessing(true);
				__doPostBack("btnDisplay",""); 
			} else {
				return false;
			}
		 });
	} else {
		hvmessage.value = "DISPLAY";
		displayprocessing(true);
		__doPostBack("btnDisplay","");
	}
	
} // end function display_date

// **************************************

function display_effdate(display) {
	var mainbuttons = document.getElementById("mainbuttons");
	var mainbuttons_0 = document.getElementById("mainbuttons_0");
	var printbutton = document.getElementById("print");
	
	var effdate = document.getElementById("effdate");
	var now = new Date();
	var txteffdate = document.getElementById("txtEffDate");
	
	if (display){
		effdate.style.visibility = "visible";
		//mainbuttons.style.visibility = "hidden";
		mainbuttons_0.style.visibility = "hidden";
		printbutton.style.visibility = "hidden";
		txteffdate.value = "";
		txteffdate.className = "highlight";
	}
	else {
		effdate.style.visibility = "hidden";
		//mainbuttons.style.visibility = "visible";
		mainbuttons_0.style.visibility = "visible";
		printbutton.style.visibility = "visible";
	}
} //end function display_effdate

// **************************************

function display_message() {
//1st item in hvmessage:
//11 - display Tab11
//11S - display Tab11 and show SUCCESS alert
//11E - display Tab11 and show ERROR alert
//11C - display Tab11 and show CAUTION alert
//S - E - C - display Tab1 and show appropriate alert
	 var hvmessage = document.getElementById("hvmessage");
	 var msgitems = hvmessage.value.split("|");
	 
	 subject = msgitems[1];
	 message = msgitems[2];
	 hvmessage.value = "";
	 
	 //Display Tab11 and return
	 if (msgitems[0]== "11"){
		hvtab = 11;
		return;
	 }
	 
	 //Display Tab11 and alert message
	 //if (msgitems[0].substring(0,1)== "11") displaytab();
	 
	 //Determine msg format
	 switch(msgitems[0])
	{
	  case "S":
		$.alerts.dialogClass = "success"; 
	  break;
	  case "11S":
		$.alerts.dialogClass = "success"; 
	  break;
	  case "E":
		$.alerts.dialogClass = "error"; 
	  break;
	  case "11E":
		$.alerts.dialogClass = "error"; 
	  break;
	  case "C":
		$.alerts.dialogClass = "caution"; 
	  break;
	  case "11C":
		$.alerts.dialogClass = "caution"; 
	  break;
	}
	
	 jAlert(message,subject, function() {
		$.alerts.dialogClass = null; // reset to default
	});
  
} //end function display_message

// **************************************

function displayprocessing(display) {
	//3/12/14 D.Maibor: call start_animation when displaying 
	//2/9/12 D.Maibor use jquery show/hide
	var divprocessing = document.getElementById("processing");
	
	if (display){
		browserclosing = false;
		window.scrollTo(0,0); 
		//divprocessing.style.visibility = "visible";
		start_animation();
	} else {
		//divprocessing.style.visibility = "hidden";
		$("#processing").hide();
		browserclosing = true;
	}
}

// **************************************
function displaytab_new() {
	//5/29/15 D.Maibor: add var's tabinfo, tabtitle,tabx. Hide tab title for Tab 11.

//    if (hvtab == 11) {
//        __doPostBack("btntab_11_Click", "");
//    }

	try {
		var tabinfo;
        	var tabtitle = document.getElementById("lblTabTitle");
        	var tabx;

		//set hidden field hvtab
		$("#hvtab").val(hvtab);

		//Show divWIP
		$("#divWIP").show();

		//Hide processing div & Error div
		displayprocessing(false);
		$("#divError").hide();

		initialize_formisdirty();

		//Save current ddl values for Punbr/Grnbr/Group
		current_punbr = $("#ddlPunbr").val();
		current_grnbr = $("#ddlGroup").val();

		//add check if current_grnbr = [new]
		if (current_grnbr == "[new]") current_grnbr = $("#txtGrnbr").val();
		current_group = $("#ddlGrnbr").val();

		var hvmessage = $("#hvmessage").val();
		$("#btnEmailAtt").hide();

		if (hvmessage == "PDF") {
			hvmessage = "";
			display_pdf();
		}

		if (hvmessage.indexOf("EMAIL UPLOADED ATTACHMENTS") != -1) {
			$("#btnEmailAtt").show();
			set_general_tab_buttons(true);
			$("#btnEmailAtt").show();
			hvmessage = "";
		}

		if (hvmessage != "") {
			display_message()
			hvmessage = "";
		}

		//Set display_popup_values
		display_popup_values = false;
		display_tab11_popup_values = false;
		if ($("#ckvaluepopups").is(":checked")) display_popup_values = true;

		//Hide all tabs
		$("#tabinfo_1").hide();
		$("#lblRxAcct").hide();

		$("#tabinfo_2").hide();
		$("#tabinfo_3").hide();
		$("#tabinfo_4").hide();
		$("#tabinfo_5").hide();
		$("#tabinfo_6").hide();
		$("#tabinfo_7").hide();
		$("#tabinfo_8").hide();
		$("#tabinfo_9").hide();
		$("#tabinfo_10").hide();
		$("#tabinfo_11").hide();
		$("#btnT10_ShowNotes").hide();
		$("#tabinfo_12").hide();
		
		//Show clicked tab
		$("#tabinfo_" + hvtab).show();

		$("#displayinfo").show();
		$("#lblCritical").show();
		$("#lblCritical_fees").hide();

		$("#btnUpdate").show();
		display_main_buttons(true);
		$("#mainbuttons_0").show();
		$("#print").show();

		//Highlight the tab button and set the tab title displayed
		for (j = 1; j < totaltabs + 3; j++) {
			tabx = document.getElementById("tab" + j);
			tabinfo = document.getElementById("tabinfo_" + j);
			if (j == hvtab) {
				tabx.className = "tab_selected";
				//tabinfo.className = "tabinfo_selected";
				tabinfo.style.visibility = "visible";
				tabtitle.innerHTML = tabtitles[j - 1]
			}
			else {
				tabx.className = "tab";
			}
		}

		//Show/hide tab specific items
		if (hvtab == 1) {
			$("#lblRxAcct").show();
			tab1_optional_texts();
		}

		if (hvtab == 2) tab2_optional_texts();
		if (hvtab == 3) tab3_optional_texts();
		if (hvtab == 4) tab4_optional_texts();
		if (hvtab == 5) tab5_optional_texts();

		//Load brokers array if it is empty and tab=6
		if (hvtab == 6) {
			if (brokers.length == 0) {
				brokers = $("#hvbrokers").val().split("^");
			}
			$("#btnUpdate").hide();
			tab6_optional_texts();
		}

		if (hvtab == 7) tab7_optional_texts();
		if (hvtab == 8) tab8_optional_texts();
		if (hvtab == 9) tab9_optional_texts();

		if (hvtab == 10) {
			$("#btnT10_ShowNotes").show();
			//$("#displayinfo").hide();
			tab10_optional_texts();
		}

		if (hvtab == 11) {
			$("#displayinfo").hide();
			$("#lblCritical").hide();
			$("#lblCritical_fees").show();
			display_main_buttons(false);
			tab11_optional_texts();
		}

		if (hvtab == 12) {
			$("#displayinfo").hide();
			$("#lblCritical").hide();
			$("#lblCritical_fees").hide();
			display_main_buttons(false);
		}

	} //end try
	catch (errorObject) {
		alert("In displaytab_new, the following error occurred: " + errorObject.description);
	}
} //end function displaytab_new

// **************************************

function display_tab11() {
	browserclosing = false;
	//renewal_display();
	//Make sure at least Current/Prev or Renewal date is entered to perform a TAB11DISPLAY postback
	effdate_current = $("#txtT11_current_effdate").val();
	if (valid_date_entered(effdate_current)) {
		$("#hvmessage").val("TAB11DISPLAY");
		displayprocessing(true);
		__doPostBack("ddlGrnbr", "");
	} else {
		effdate_renewal = $("#txtT11_renewal_effdate").val();
		if (valid_date_entered(effdate_renewal)) {
			$("#hvmessage").val("TAB11DISPLAY");
			displayprocessing(true);
			__doPostBack("ddlGrnbr", "");
		} else {
			subject = "NO VALID DATES ENTERED"
			message = "Please enter the Current/Prev. date, Renewal Date, or both and click DISPLAY.";
			$.alerts.dialogClass = "error";
			jAlert(message, subject, function () {
				$.alerts.dialogClass = null; // reset to default
			});
		}
	}
}

// **************************************

function display_docs() {
  var pdfwindow;
  var reportpath = "file://hpiwfs03/HPI/Group Documents";
  
  //Open a new window for the .pdf file
  pdfwindow = window.open (reportpath,"mywindow","scrollbars=1,resizable=1,width=500,height=500");
} //end function display_docs

// **************************************

function display_guide() {
  var pdfwindow;
  //var reportpath = "file://hpiwfs03/HPI/WIP Automation/WIP Program.Training Guide.pdf";
  var reportpath = "file://hpiwfs01/Wip/WIP Program.Training Guide.pdf";
  
  //Open a new window for the .pdf file
  pdfwindow = window.open (reportpath,"mywindow","scrollbars=1,resizable=1,width=500,height=500");
} //end function display_guide

// **************************************

function display_pdf() {
try {
  var pdfwindow;
  var reportpath = document.getElementById("hvreportpath").value;
  
  //Open a new window for the .pdf files
  show_printinfo(false);
  pdfwindow = window.open (reportpath,"mywindow","scrollbars=1,resizable=1,width=500,height=500");
}

catch(errorObject) {
	alert("In display_pdf, the following error occurred: " + errorObject.description);
}
	
} //end function display_pdf

// **************************************

function display_values(display) {
	//var mainbuttons = document.getElementById("mainbuttons");
	var mainbuttons_0 = document.getElementById("mainbuttons_0");
	var printbutton = document.getElementById("print");
	var displayvalues = document.getElementById("displayvalues");
	var txtdisplaydate = document.getElementById("txtDisplayDate");
	
	if (display){
		displayvalues.style.visibility = "visible";
		//mainbuttons.style.visibility = "hidden";
		mainbuttons_0.style.visibility = "hidden";
		printbutton.style.visibility = "hidden";
	}
	else {
		displayvalues.style.visibility = "hidden";
		//mainbuttons.style.visibility = "visible";
		mainbuttons_0.style.visibility = "visible";
		printbutton.style.visibility = "visible";
	}
} //end function display_effdate

// **************************************

function fill_brokerinfo(brokernum) {
// 9/28/15 D.Maibor Split CitySTZip into separate City, ST, Zip controls
try {
	var ctrl;
	var taxid = "";
	var txtval = ""; 
	
	//Set hvbroker changed
	$("#hvbroker_" + brokernum + "_changed").val("yes");
	
	//Show AM Contact info
	$("#btnContact_" + brokernum).show();
	
	brokertabisdirty = true; 
	
	//Save brokercode
	$("#hvbroker_" + brokernum).val(brokercode);
	
	
	//Clear txt boxes
	$("#txtT6_BrokerName_" + brokernum).val("");
	$("#txtT6_Effdate_" + brokernum).val("");
	$("#txtT6_Addr1_" + brokernum).val("");
	$("#txtT6_Addr2_" + brokernum).val("");
	$("#txtT6_City_" + brokernum).val("");
	$("#txtT6_ST_" + brokernum).val("");
	$("#txtT6_Zip_" + brokernum).val("");
	
	$("#txtT6_Tel_" + brokernum).val("");
	$("#txtT6_Fax_" + brokernum).val("");
	$("#txtT6_Contact_" + brokernum).val("");
	$("#txtT6_taxID_" + brokernum).val("");
	
	// uncheck the TaxOD tupe radio buttons
	$("#rbT6_TINSSN_" + brokernum + "_1").removeAttr("checked"); 
	$("#rbT6_TINSSN_" + brokernum + "_2").removeAttr("checked");

	$("#txtT6_Remarks1_" + brokernum).val("");
	$("#txtT6_Remarks2_" + brokernum).val("");
	
	
	//Fill with new value
	$("#hvbroker_" + brokernum).val(brokerinfo[0]);
	ctrl = "hvbroker_" + brokernum;
	broker_controls_modified[broker_controls_index] = ctrl;
	broker_controls_index = broker_controls_index + 1;
	
	$("#hvbrokernumber").val(brokerinfo[0]);
	
	$("#txtT6_BrokerName_" + brokernum).val(brokerinfo[1]);
	ctrl = "txtT6_BrokerName_" + brokernum;
	broker_controls_modified[broker_controls_index] = ctrl;
	broker_controls_index = broker_controls_index + 1;
	
	$("#txtT6_Addr1_" + brokernum).val(brokerinfo[2]);
	ctrl = "txtT6_Addr1_" + brokernum;
	broker_controls_modified[broker_controls_index] = ctrl;
	broker_controls_index = broker_controls_index + 1;
	
	$("#txtT6_Addr2_" + brokernum).val(brokerinfo[3]);
	ctrl = "txtT6_Addr2_" + brokernum;
	broker_controls_modified[broker_controls_index] = ctrl;
	broker_controls_index = broker_controls_index + 1;
	
	$("#txtT6_City_" + brokernum).val(brokerinfo[4]);
	ctrl = "txtT6_City_" + brokernum;
	broker_controls_modified[broker_controls_index] = ctrl;
	broker_controls_index = broker_controls_index + 1;

	$("#txtT6_ST_" + brokernum).val(brokerinfo[5]);
	ctrl = "txtT6_ST_" + brokernum;
	broker_controls_modified[broker_controls_index] = ctrl;
	broker_controls_index = broker_controls_index + 1;

	$("#txtT6_Zip_" + brokernum).val(brokerinfo[6]);
	ctrl = "txtT6_Zip_" + brokernum;
	broker_controls_modified[broker_controls_index] = ctrl;
	broker_controls_index = broker_controls_index + 1;    
    
    $("#txtT6_Tel_" + brokernum).val(brokerinfo[7]);
	ctrl = "txtT6_Tel_" + brokernum;
	broker_controls_modified[broker_controls_index] = ctrl;
	broker_controls_index = broker_controls_index + 1;

	$("#txtT6_Fax_" + brokernum).val(brokerinfo[8]);
	ctrl = "txtT6_Fax_" + brokernum;
	broker_controls_modified[broker_controls_index] = ctrl;
	broker_controls_index = broker_controls_index + 1; 
	
	$("#txtT6_Contact_" + brokernum).val(brokerinfo[9]);
	ctrl = "txtT6_Contact_" + brokernum;
	broker_controls_modified[broker_controls_index] = ctrl;
	broker_controls_index = broker_controls_index + 1;
	
	taxid = txtval + brokerinfo[10];
	
	//Determine which TaxIDType radio button to check and format number w/dashes
	if (brokerinfo[11] == "F") {
		$("#rbT6_TINSSN_" + brokernum + "_1").attr("checked","checked");
		txtval = taxid.substr(0,2) + "-" + taxid.substr(2)
		$("#txtT6_taxID_" + brokernum).val(txtval);
		ctrl = "rbT6_TINSSN_" + brokernum + "_1";
		broker_controls_modified[broker_controls_index] = ctrl;
		broker_controls_index = broker_controls_index + 1;

	} else {
		$("#rbT6_TINSSN_" + brokernum + "_2").attr("checked","checked");
		txtval = taxid.substr(0,3) + "-" + taxid.substr(3,2) + "-" + taxid.substr(5)
		$("#txtT6_taxID_" + brokernum).val(txtval);
		ctrl = "rbT6_TINSSN_" + brokernum + "_2";
		broker_controls_modified[broker_controls_index] = ctrl;
		broker_controls_index = broker_controls_index + 1;
	}
	ctrl = "txtT6_taxID_" + brokernum;
	broker_controls_modified[broker_controls_index] = ctrl;
	broker_controls_index = broker_controls_index + 1;
	
	
	$("#txtT6_Remarks1_" + brokernum).val(brokerinfo[12]);
	ctrl = "txtT6_Remarks1_" + brokernum;
	broker_controls_modified[broker_controls_index] = ctrl;
	broker_controls_index = broker_controls_index + 1;
	
	$("#txtT6_Remarks2_" + brokernum).val(brokerinfo[13]);
	ctrl = "txtT6_Remarks2_" + brokernum;
	broker_controls_modified[broker_controls_index] = ctrl;
	broker_controls_index = broker_controls_index + 1;
	
	 $("#btnContact_" + brokernum).hide();
	 $("#lblT6_contactinfo_" + brokernum).show();
}
catch(errorObject) {
	alert("In fill_brokerinfo, the following error occurred: " + errorObject.description);
}
} //end function fill_brokerinfo

// **************************************

function find_grnbr() {
    //3/19/15 D.Maibor: store grnbr in hvgrnbr
   var hvmessage = document.getElementById("hvmessage");
   var tmp;
   var txtgrnbr = document.getElementById("txtGrnbr");
	
	//make sure txtgrnbr has a value
	if (txtgrnbr.value.length == 0){
		subject = "MISSING GRNBR TO FIND";
		message = "Please enter the Grnbr you want to find.";
		$.alerts.dialogClass = "error"; 
			jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});
		txtgrnbr.className = "highlight";
		return false;
	}
	
	 //make sure txtgrnbr has 3 chars
	if (txtgrnbr.value.length != 3){
		subject = "INCORRECT GRNBR TO FIND";
		message = "Please enter a Grnbr with only 3 letters/numbers.";
		$.alerts.dialogClass = "error"; 
			jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});
		txtgrnbr.className = "highlight";
		return false;
	}

txtgrnbr.value = txtgrnbr.value.toUpperCase();
$("#hvgrnbr").val(txtgrnbr.value);
if (valid_grnbr(txtgrnbr.value)) {
	    if (formdirty() || brokertabisdirty) {
			jConfirm("You changed some info on the current WIP but didn't save the changes. Are you sure you want to change the Grnbr and lose any changes entered?", "INFO CHANGED", function (OKresponse) {
				if (OKresponse) {
					hvmessage.value = "FIND";
					displayprocessing(true);
					__doPostBack("btnfindgrnbr", "");
					txtgrnbr.value = "";
					return;
				} else {
					txtgrnbr.value = "";
					return;
				}
			});
	    } else {
		    hvmessage.value = "FIND";
			displayprocessing(true);
			__doPostBack("btnfindgrnbr", "");
			return true;
	    }
	} // not valid grnbr
	else {
		jConfirm("The Grnbr you entered was not found. Do you want to create a NEW WIP, or retrieve previously stored data, for a grnbr not yet in HW?", "NEW WIP FOR UNLISTED GRNBR?", function (OKresponse) {
		    if (OKresponse) {
		        hvmessage.value = "NEW";
		        displayprocessing(true);
		        __doPostBack("btnfindgrnbr", "");
		    } else {
		        txtgrnbr.value = "";
		    }
		});
		return false;
	}
} //end function find_grnbr

// **************************************

function find_grnbr_with_formdirty() {
   var hvmessage = document.getElementById("hvmessage");
   var tmp;
   var txtgrnbr = document.getElementById("txtGrnbr");
   
   jConfirm("You changed some info on the current WIP but didn't save the changes. Are you sure you want to change the Grnbr and lose any changes entered?", "INFO CHANGED", function(OKresponse) {
   if (OKresponse){
	hvmessage.value = "NEW";
	displayprocessing(true);
	__doPostBack("btnfindgrnbr",""); 
   } else {
	txtgrnbr.value = "";
   }
   });
}

// **************************************

function formdirty() {
	var hvformdirty = document.getElementById("hvformdirty");
	var hvrenewaldirty = document.getElementById("hvrenewaldirty");
	if (readonly) return false;
	if (hvformdirty.value == "yes") return true;
	if (hvrenewaldirty.value == "yes") return true;
	return false;
}

// **************************************

function generate_printinfo(){

	var hvmessage = document.getElementById("hvmessage");
	var ckbox = document.getElementById("ck_tab11")
	var rb = document.getElementById("rblPrintInfo_0")
	
	//Enable Tab11 controls so code-behind can read Current/Renewal control values for pdf report
	if (ckbox.checked && rb.checked) {
		disable_action = false;
		//tab11_current_controls();
		tab11_set_controls("current", "enable")
		tab11_set_controls("renewal", "enable")
	}
	
	store_ppodata();
	
	//Store contactinfo if tab6 is checked
	if ($("#ck_tab6").is(":checked")) store_contactinfo();
	
	hvmessage.value = "PDF";
	displayprocessing(true);
	__doPostBack("btnPrintInfo","");
}

// **************************************

function getPosition(obj) {
    if (obj == null) return;
    var p = {};
    p.x = obj.offsetLeft;
    p.y = obj.offsetTop;
    while (obj.offsetParent) {
        p.x = p.x + obj.offsetParent.offsetLeft;
        p.y = p.y + obj.offsetParent.offsetTop;
        if (obj == document.getElementsByTagName("body")[0]) {
            break;
        }
        else {
            obj = obj.offsetParent;
        }
    }
    return p;
}

// **************************************

function get_rblist_multi_values(tabnum, itemid, itemlabel, top, left, rblist) {
    //12/2/15 D.Maibor: add punbr, grnbr to AJAX post 
    if (display_popup_values) {
        rb_original_values = rblist;
        popup_title = itemlabel;
        popup_top = top;
        popup_left = left;
        popup_itemID = itemid;
        popup_tabnum = tabnum;
        rbvalues = new Array();
        rbvalues = rblist.split("$");

        $.post("AJAX_RQ.ashx", { userid: $("#hvuser").val(), Popup: 1, Tab: tabnum, ID: itemid, effdate: $("#hveffdate").val(), Punbr: current_punbr, Grnbr: current_grnbr },
			function (data) {
			    show_rblist_multi_values(data);
			}
	    )
    };
}


// **************************************

function get_tab11_rblist_multi_values(tabnum, itemid, itemlabel, top, left, rblist) {
//8/14/15 D.Maibor: change split symbol from $ to |
	if (display_tab11_popup_values){
		rb_original_values = rblist;
		popup_title = itemlabel;
		popup_top = top;
		popup_left = left;
		popup_itemID = itemid;
		popup_tabnum = tabnum;
		rbvalues = new Array();
		rbvalues = rblist.split("|");
	
		show_review();
	 }
}

// **************************************

function get_rblist_popup_values(tabnum, itemid, itemlabel, top, left, rb0, rb1) {
    //12/2/15 D.Maibor: add punbr, grnbr to AJAX post call
    if (display_popup_values) {
        popup_title = itemlabel;
        popup_top = top;
        popup_left = left;
        popup_itemID = itemid;
        popup_tabnum = tabnum;
        rb0_option = rb0;
        rb1_option = rb1;

        $.post("AJAX_RQ.ashx", { userid: $("#hvuser").val(), Popup: 1, Tab: tabnum, ID: itemid, effdate: $("#hveffdate").val(), Punbr: current_punbr, Grnbr: current_grnbr },
			function (data) {
			    show_rblist_popup_values(data);
			});
    }
} //end function get_rblist_popup_values

// **************************************

function get_tab11_rblist_popup_values(tabnum,itemid,itemlabel,top,left,rb0,rb1){
    if (display_tab11_popup_values) {
    //8/14/15 D.Maibor: change divider from $ to |
	
		//Save orig values to pass in AJAX call to AJAX_RQ
		rb_original_values = rb0 + "|" + rb1;
		
		popup_title = itemlabel;
		popup_top = top;
		popup_left = left;
		popup_itemID = itemid;
		popup_tabnum = tabnum;
		
		rb0_option = rb0;
		rb1_option = rb1;
	
		show_review();
	 
	 }
} //end function get_rblist_popup_values

// **************************************

function get_PPO_popup_values() {
    //12/2/15 D.Maibor: add punbr, grnbr values to AJAX post
    var tabnum = 3;
    var itemid = "ppo";
    popup_itemID = "Item49";
    popup_tabnum = tabnum;
    popup_title = "PPOs";
    popup_top = 2350;
    popup_left = 0;

    if (display_popup_values) {
        $.post("AJAX_RQ.ashx", { userid: $("#hvuser").val(), Popup: 1, Tab: tabnum, ID: popup_itemID, effdate: $("#hveffdate").val(), Punbr: current_punbr, Grnbr: current_grnbr },
			function (data) {
			    show_PPO_popup_values(data);
			});
    }
} //end function get_PPO_popup_values

// **************************************

function get_std_popup_values(tabnum, itemid, itemlabel, top, left) {
    //12/2/15 D.Maibor: add punbr,grnbr to AJAX post

    if (display_popup_values) {
        popup_title = itemlabel;
        popup_top = top;
        popup_left = left;
        popup_itemID = itemid;
        popup_tabnum = tabnum;

        $.post("AJAX_RQ.ashx", { userid: $("#hvuser").val(), Popup: 1, Tab: tabnum, ID: itemid, effdate: $("#hveffdate").val(), Punbr: current_punbr, Grnbr: current_grnbr },
			function (data) {
			    show_std_popup_values(data);
			});

    }
} //end function get_std_popup_values

// **************************************

function get_tab11_std_popup_values(tabnum,itemid,itemlabel,top,left){
	if (display_tab11_popup_values){
		popup_title = itemlabel;
		popup_top = top;
		popup_left = left;
		popup_itemID = itemid;
		popup_tabnum = tabnum;
		
		show_review();
	 }
} //end function get_std_popup_values

// **************************************

function hide_popup(){
	var popup = document.getElementById("popup");
	
	if (display_popup_values){
		popup.style.visibility = "hidden";
		$("#PPOvalues").hide();
		$("#brokerpopup").hide();
	}
}

// **************************************

function hide_popup_tab11(){
	var popup = document.getElementById("popup");
	
	if (display_tab11_popup_values){
		popup.style.visibility = "hidden";
	}
}

// **************************************

function initialize_formisdirty() {
	var hv_form = document.getElementById("hvformdirty");
	var hv_renewal = document.getElementById("hvrenewaldirty");
	
	if (hv_form.value == "yes") formisdirty = true;
	if (hv_renewal.value == "yes") formisdirty = true;
}

// **************************************

function initialize_networkform() {
	var ctrl;
	var cell;
	var rownum = 0;
	var rowx;

	network_assigned_by = "";
	network_assignment_values = "";
	network_assignment_instructions = "";
	network_assignment_rowid = 0;

	ctrl = document.getElementById("rbAssigned_by_1");
	ctrl.checked = false;
	ctrl = document.getElementById("rbAssigned_by_2");
	ctrl.checked = false;
	ctrl = document.getElementById("rbAssigned_by_3");
	ctrl.checked = false;
	ctrl = document.getElementById("ckNoPPOs");
	ctrl.checked = false;

	$("#txtNetwork_dept_member").val("");
	$("#txtNetworkSpecial").val("");
	$("#lbStates").val("");

	$("#btnAddNetwork_to_group").hide();

	//remove all rows from gvPPOs, except header and 1st row
	$("#gvPPOs tr").each(function() {
		rowx = (this);
		if (rownum == 1) {
			cell = $(this).find("td").eq(0);
			$(cell).html("[none]");
			cell = $(this).find("td").eq(1);
			$(cell).html("");
			cell = $(this).find("td").eq(2);
			$(cell).html("");
			cell = $(this).find("td").eq(3);
			$(cell).html("");
		}
		if (rownum > 1) $(this).remove();
		rownum = rownum + 1;
	}); // end $("#gvPPOs tr").each(function() {
} // end function initialize_networkform

// **************************************

function initialize_ppoform() {
	var ctrl;

	$("#div_PPO_role").hide();
	$("#div_special_PPO").hide();
	$("#div_PPO_payment").hide();
	$("#div_united_options").hide();
	$("#div_united_choice").hide();
	$("#btnSave_ppo").hide();
	$("#ddlAddPPO").val("[?]");

	//Unck rbPPO_roles
	ctrl = document.getElementById("rbPPO_role_1");
	ctrl.checked = false;
	ctrl = document.getElementById("rbPPO_role_2");
	ctrl.checked = false;
	ctrl = document.getElementById("rbPPO_role_3");
	ctrl.checked = false;

	//Clear special PPO
	$("#txtspecial_PPO").val("");

	//Unck rbPPO_payments
	ctrl = document.getElementById("rbPPO_payment_1");
	ctrl.checked = false;
	ctrl = document.getElementById("rbPPO_payment_2");
	ctrl.checked = false;
	ctrl = document.getElementById("rbPPO_payment_3");
	ctrl.checked = false;

	//Unck rbUnited_options
	ctrl = document.getElementById("rbUnited_option_1");
	ctrl.checked = false;
	ctrl = document.getElementById("rbUnited_option_2");
	ctrl.checked = false;
	ctrl = document.getElementById("rbUnited_option_3");
	ctrl.checked = false;
}

// **************************************

function logout_formdirty(){
	jConfirm("You changed some info on the current WIP but didn't save the changes. Are you sure you want to logout and lose any changes entered?", "INFO CHANGED", function(OKresponse) {
		if (OKresponse){
			record_logout();
			window.location = homepage;
		} 
	 });
}

// **************************************
function modify_brokerinfo() {
	var blncontinue = true;
	var ddlBrokers = document.getElementById("ddlBrokers");
	var selindex = ddlBrokers.selectedIndex;
	
	//Ck that ddlBrokers selectedIndex is not 0
	if (!newbroker && selindex == 0) {
		blncontinue = false;
		subject = "NO BROKER SELECTED";
		message = "Please select a Broker from the list"
		$.alerts.dialogClass = "error"; 
		jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});
	}
	
	if (blncontinue) {
		show_brokerinfo(true);
	
		//clear the txt values
		$("#txtT6_BrokerName_mod").val("");
		$("#txtT6_Tel_mod").val("");
		$("#txtT6_Addr1_mod").val("");
		$("#txtT6_Fax_mod").val("");
		$("#txtT6_Addr2_mod").val("");
		$("#txtT6_Contact_mod").val("");
		$("#txtT6_CityStZip_mod").val("");
		$("#txtT6_taxID_mod").val("");
		$("#txtT6_Remarks1_mod").val("");
		$("#txtT6_Remarks2_mod").val("");
		   
		   //Copy current info if modifying broker
		if (!newbroker) {       
			$("#txtT6_BrokerName_mod").val(brokerinfo[1]);
			$("#txtT6_Addr1_mod").val(brokerinfo[2]);
			$("#txtT6_Addr2_mod").val(brokerinfo[3]);
			$("#txtT6_CityStZip_mod").val(brokerinfo[4]);        
			$("#txtT6_Tel_mod").val(brokerinfo[5]);
			$("#txtT6_Fax_mod").val(brokerinfo[6]);
			$("#txtT6_Contact_mod").val(brokerinfo[7])
			$("#txtT6_taxID_mod").val(brokerinfo[8])
			$("#txtT6_Remarks1_mod").val(brokerinfo[9]);
			$("#txtT6_Remarks2_mod").val(brokerinfo[10]);
		}
	}
	
} //end function modify_brokerinfo

// **************************************

function modify_brokerinfo_done() {
	//Use JQUERY AJAX w/POST variables to send info to server
	//Place * as 1st char for all variables that changed if mod to existing broker
	var bkmod;
	var bknumber;
	var bkname;
	var bkaddr1;
	var bkaddr2;
	var bkcitystzip;
	var bktel;
	var bkfax;
	var bkcontact;
	var bktaxid;
	var bkremarks1;
	var bkremarks2;
	var txtval;
	
	if (valid_brokerinfo()) {
		//Establish type of change for broker info (new or modification)
		if (newbroker) {
			bkmod = "A";
		} else {
			bkmod = "M"; 
		}
		
		//Get broker number
		if (newbroker){
			bknumber = "";
		} else {
			bknumber = brokerinfo[0];
		}
		
		//Get broker name
		txtval = $("#txtT6_BrokerName_mod").val();
		txtval = $.trim(txtval);
		if (newbroker) {
			bkname = txtval;
		} else {
			if (txtval == brokerinfo[1]){
				bkname = ""
			} else {
				bkname = "*" + txtval;
			}
		}
		
		//Get broker Addr1
		txtval = $("#txtT6_Addr1_mod").val();
		txtval = $.trim(txtval);
		if (newbroker) {
			bkaddr1 = txtval;
		} else {
			if (txtval == brokerinfo[2]){
				bkaddr1 = ""
			} else {
				bkaddr1 = "*" + txtval;
			}
		}
		
		//Get broker Addr2
		txtval = $("#txtT6_Addr2_mod").val();
		txtval = $.trim(txtval);
		if (newbroker) {
			bkaddr2 = txtval;
		} else {
			if (txtval == brokerinfo[3]){
				bkaddr2 = ""
			} else {
				bkaddr2 = "*" + txtval;
			}
		}
		
		//Get broker CitySTZip
		txtval = $("#txtT6_CityStZip_mod").val();
		txtval = $.trim(txtval);
		if (newbroker) {
			bkcitystzip = txtval;
		} else {
			if (txtval == brokerinfo[4]){
				bkcitystzip = ""
			} else {
				bkcitystzip = "*" + txtval;
			}
		}
		
		//Get broker Tel
		txtval = $("#txtT6_Tel_mod").val();
		txtval = $.trim(txtval);
		if (newbroker) {
			bktel = txtval;
		} else {
			if (txtval == brokerinfo[5]){
				bktel = ""
			} else {
				bktel = "*" + txtval;
			}
		}
		
		//Get broker Fax
		txtval = $("#txtT6_Fax_mod").val();
		txtval = $.trim(txtval);
		if (newbroker) {
			bkfax = txtval;
		} else {
			if (txtval == brokerinfo[6]){
				bkfax = ""
			} else {
				bkfax = "*" + txtval;
			}
		}
		
		//Get broker contact
		txtval = $("#txtT6_Contact_mod").val();
		txtval = $.trim(txtval);
		if (newbroker) {
			bkcontact = txtval;
		} else {
			if (txtval == brokerinfo[7]){
				bkcontact = ""
			} else {
				bkcontact = "*" + txtval;
			}
		}
		
		//Get broker taxID
		txtval = $("#txtT6_taxID_mod").val();
		txtval = $.trim(txtval);
		if (newbroker) {
			bktaxid = txtval;
		} else {
			if (txtval == brokerinfo[8]){
				bktaxid = ""
			} else {
				bktaxid = "*" + txtval;
			}
		}
		
		//Get broker Remarks1
		txtval = $("#txtT6_Remarks1_mod").val();
		txtval = $.trim(txtval);
		if (newbroker) {
			bkremarks1 = txtval;
		} else {
			if (txtval == brokerinfo[9]){
				bkremarks1 = ""
			} else {
				bkremarks1 = "*" + txtval;
			}
		}
		
		//Get broker Remarks2
		txtval = $("#txtT6_Remarks2_mod").val();
		txtval = $.trim(txtval);
		if (newbroker) {
			bkremarks2 = txtval;
		} else {
			if (txtval == brokerinfo[10]){
				bkremarks2 = ""
			} else {
				bkremarks2 = "*" + txtval;
			}
		}
		
		show_brokerinfo(false);
		displayprocessing(true);
		
		$.post("AJAX_RQ.ashx",{brokerchange:bkmod,number:bknumber,name:bkname,addr1:bkaddr1,addr2:bkaddr2,citystzip:bkcitystzip,tel:bktel,fax:bkfax,contact:bkcontact,taxid:bktaxid,remarks1:bkremarks1,remarks2:bkremarks2},
			function(data){
				modify_brokerinfo_reply(data);
		});
			 
	}  //if valid_brokerinfo
	
}  //end function modify_brokerinfo_done

// **************************************

function modify_brokerinfo_reply(data) {
   displayprocessing(false);
   $("#hvmessage").val(data);
   display_message(); 
}

// **************************************

function set_general_tab_buttons(blndisable) {
	if (blndisable) {
		$("#btntab_1").attr("disabled", true);
		$("#btntab_2").attr("disabled", true);
		$("#btntab_3").attr("disabled", true);
		$("#btntab_4").attr("disabled", true);
		$("#btntab_5").attr("disabled", true);
		$("#btntab_6").attr("disabled", true);
		$("#btntab_7").attr("disabled", true);
		$("#btntab_8").attr("disabled", true);
		$("#btntab_9").attr("disabled", true);
		$("#btntab_10").attr("disabled", true);
		$("#btntab_12").attr("disabled", true);
		$("#btnDisplayTab11").attr("disabled", true);
		$("#ddlPunbr").attr("disabled", true);
		$("#ddlGrnbr").attr("disabled", true);
		$("#ddlGroup").attr("disabled", true);
		$("#btnFindgrnbr").attr("disabled", true);
		if (hvtab != 11) $("#btntab_11").attr("disabled", true);
	} else {
		 $("#btntab_1").removeAttr("disabled");
		$("#btntab_2").removeAttr("disabled");
		$("#btntab_3").removeAttr("disabled");
		$("#btntab_4").removeAttr("disabled");
		$("#btntab_5").removeAttr("disabled");
		$("#btntab_6").removeAttr("disabled");
		$("#btntab_7").removeAttr("disabled");
		$("#btntab_8").removeAttr("disabled");
		$("#btntab_9").removeAttr("disabled");
		$("#btntab_10").removeAttr("disabled");
		$("#btntab_12").removeAttr("disabled");
		$("#btnDisplayTab11").removeAttr("disabled");
		$("#ddlPunbr").removeAttr("disabled");
		$("#ddlGrnbr").removeAttr("disabled");
		$("#ddlGroup").removeAttr("disabled");
		$("#btnFindgrnbr").removeAttr("disabled");
		if (hvtab != 11) $("#btntab_11").removeAttr("disabled");
	}
}

// **************************************

function modify_contactinfo(payeenumber,rowid) {
	var active;
	var addr1;
	var addr2;
	var city;
	var comment;
	var effdate;
	var email;
	var fname;
	var lname;
	var rowitem;
	var row;
	var rowtomodify;
	var state;
	var tbl;
	var telfax;
	var totalcolumns;
	var totalrows;
	
	
	//Set brokernumber, brokerinfotype 
	brokernumber = payeenumber;
	brokerinfotype = "c";
	
	// Save the type of change, 'M' for modify,save the gvID, and save the rowID in the global variable AMcontactinfo_rowID
	AMcontactinfomod = "M";
	AMcontactinfo_table = document.getElementById("gvT6_Contactinfo_" + brokernumber);
	AMcontactinfo_rowID = rowid;
	
	
	
	tbl = AMcontactinfo_table;
	totalrows = tbl.rows.length;
	row = tbl.rows[1];
	totalcolumns = row.cells.length;
	
	clear_contactinfo();
	
	//Change the instructions to use Modify
	$("#lblT6_Contactinfo").html("Modify the contact info below and click DONE (or Cancel).");
	
	//Find the row to modify and enter the values into the popup
	for (i=0;i<totalrows;i++) {
		row = tbl.rows[i];
		rowitem = row.cells[13].innerHTML;
				
		if (rowitem == rowid) {
			//Ck FName
			rowitem = row.cells[1].innerHTML;
			if (rowitem.substring(0,3) != "&nb") $("#txtT6_Contactinfo_FName").val(rowitem);
			
			//Ck LName            
			 rowitem = row.cells[2].innerHTML;
			if (rowitem.substring(0,3) != "&nb") $("#txtT6_Contactinfo_LName").val(rowitem);
			
			//Ck Addr1
			 rowitem = row.cells[3].innerHTML;
			if (rowitem.substring(0,3) != "&nb") $("#txtT6_Contactinfo_Addr1").val(rowitem);
			
			//Ck Addr2
			rowitem = row.cells[4].innerHTML; 
			if (rowitem.substring(0,3) != "&nb") $("#txtT6_Contactinfo_Addr2").val(rowitem);
			
			//Ck City
			rowitem = row.cells[5].innerHTML; 
			if (rowitem.substring(0,3) != "&nb") $("#txtT6_Contactinfo_City").val(rowitem);
			
			//Ck State
			rowitem = row.cells[6].innerHTML; 
			if (rowitem.substring(0,3) != "&nb") $("#txtT6_Contactinfo_ST").val(rowitem);
			
			//Ck Zip
			rowitem = row.cells[7].innerHTML; 
			if (rowitem.substring(0,3) != "&nb") $("#txtT6_Contactinfo_Zip").val(rowitem);
			
			//Ck Tel
			rowitem = row.cells[8].innerHTML; 
			if (rowitem.substring(0,3) != "&nb") $("#txtT6_Contactinfo_Tel").val(rowitem);
			
			//Ck Fax
			rowitem = row.cells[9].innerHTML; 
			if (rowitem.substring(0,3) != "&nb") $("#txtT6_Contactinfo_Fax").val(rowitem);
			
			//Ck Email
			rowitem = row.cells[10].innerHTML; 
			if (rowitem.substring(0,3) != "&nb") $("#txtT6_Contactinfo_Email").val(rowitem);
			
			//Ck Effdate
			rowitem = row.cells[11].innerHTML; 
			if (rowitem.substring(0,3) != "&nb") $("#txtT6_Contactinfo_Effdate").val(rowitem);
			
			//Ck Comment
			rowitem = row.cells[12].innerHTML; 
			if (rowitem.substring(0,3) != "&nb") $("#txtT6_Contactinfo_Comment").val(rowitem);
		} //end if rowitem == AMcontactinfo_rowID
	} //end for loop
	
	show_contactinfo(true);
	
	return false;        

}

// **************************************

function clear_contactinfo() {
	AMcontactinfoisdirty = false;
	$("#txtT6_Contactinfo_FName").val("");
	$("#txtT6_Contactinfo_LName").val("");
	$("#txtT6_Contactinfo_Tel").val("");
	$("#txtT6_Contactinfo_Fax").val("");
	$("#txtT6_Contactinfo_Email").val("");
	$("#txtT6_Contactinfo_Addr1").val("");
	$("#txtT6_Contactinfo_Addr2").val("");
	$("#txtT6_Contactinfo_City").val("");
	$("#txtT6_Contactinfo_ST").val("");
	$("#txtT6_Contactinfo_Zip").val("");
	$("#txtT6_Contactinfo_Comment").val("");
	$("#txtT6_Contactinfo_Effdate").val("");
}

// **************************************

function notes_hide(tabnum) {
	var section = document.getElementById("T" + tabnum + "Notes");
	var btnshow = document.getElementById("btnT" + tabnum + "_ShowNotes");
	var btnhide = document.getElementById("btnT" + tabnum + "_HideNotes");
	
	section.style.visibility = "hidden";
	btnhide.style.visibility = "hidden";
	
	btnshow.style.visibility = "visible";
}

// **************************************

function notes_show(tabnum) {
	var section = document.getElementById("T" + tabnum + "Notes");
	var text = document.getElementById("txtT" + tabnum + "_Notes");
	var btnshow = document.getElementById("btnT" + tabnum + "_ShowNotes");
	var btnhide = document.getElementById("btnT" + tabnum + "_HideNotes");
	
	section.style.visibility = "visible";
	btnhide.style.visibility = "visible";
	
	btnshow.style.visibility = "hidden";
	text.focus();
	
	
} //end function notes_show

// **************************************

function notimplemented() {
	subject = "NOT YET IMPLEMENTED";
	message = "This function is not yet implemented. Stay tuned ... ";
	jAlert(message,subject, function() {
		$.alerts.dialogClass = null; // reset to default
	});
	return false;
}

// **************************************

function ppo_payment_options() {
	var blnrole = false;
	var ddlval = $("#ddlAddPPO").val();

	$("#div_PPO_payment_nocharge").hide();

	//Don't exit if a role is assigned 
	if ($("#rbPPO_role_1").is(":checked")) blnrole = true;
	if ($("#rbPPO_role_2").is(":checked")) blnrole = true;
	if ($("#rbPPO_role_3").is(":checked")) blnrole = true;

	if (!blnrole) return;

	 //Show PEPM/% Sav. payment options (rbPPO_payment_1/2
	 $("#rbPPO_payment_1").show();
	 $("#lblrbPPO_payment_1").show();
	 $("#rbPPO_payment_2").show();
	 $("#lblrbPPO_payment_2").show();

	$("#div_PPO_payment").show();
   
	$("#rbPPO_payment_1").show();
	$("#lblrbPPO_payment_1").show();

	//Only allow PEPM if primary
	if ($("#rbPPO_role_1").is(":checked")) {
		$("#rbPPO_payment_2").hide();
		$("#lblrbPPO_payment_2").hide();
		document.getElementById("rbPPO_payment_1").checked = true;
		document.getElementById("rbPPO_payment_2").checked = false;
		document.getElementById("rbPPO_payment_3").checked = false;
	}

	// Only allow % of Savings if United and Travel
	if (ddlval.indexOf("United") > -1) {
		if ($("#rbPPO_role_2").is(":checked")) {
			$("#rbPPO_payment_1").hide();
			$("#lblrbPPO_payment_1").hide();
			document.getElementById("rbPPO_payment_2").checked = true;
			document.getElementById("rbPPO_payment_1").checked = false;
			document.getElementById("rbPPO_payment_3").checked = false;
		}
	} // if United

	//If HPHC and Travel, show No Change and set as default
	if (ddlval == "HPHC") {
		if ($("#rbPPO_role_2").is(":checked")) {
			$("#div_PPO_payment_nocharge").show();
			document.getElementById("rbPPO_payment_3").checked = true;
			document.getElementById("rbPPO_payment_1").checked = false;
			document.getElementById("rbPPO_payment_2").checked = false;
		}
	} // if HPHC

	display_ppo_savebutton();

} // end function ppo_payment_options

// **************************************

function prefill_termination() {
	var blnvalue = false;
	var ckbox;
	var txtval;
	
	//Check PBM vendor
	txtval =$("#txtT2_18").val();
	if (txtval.length > 0) {
	   $("#txtT9_14b").val(txtval); 
	   set_dirty("hvformdirty");
	   ckbox = document.getElementById("ckT9_14b");
	   ckbox.checked = true;
	   tab9_optional_texts();
	   blnvalue = true;
	}
	
	//Check Carrier
	txtval =$("#txtT11_51_current").val();
	if (txtval.length > 0) {
	   $("#txtT9_3").val(txtval); 
	   set_dirty("hvformdirty");
	   blnvalue = true;
	}
	
	//Contract Basis
	txtval =$("#txtT11_54_current").val();
	if (txtval.length > 0) {
	   $("#txtT9_4").val(txtval); 
	   set_dirty("hvformdirty");
	   blnvalue = true;
	}
	
	//Aggregate Contract Basis
	txtval =$("#txtT11_66_current").val();
	if (txtval.length > 0) {
	   $("#txtT9_5").val(txtval);
	   set_dirty("hvformdirty"); 
	   blnvalue = true;
	}
	
	if (blnvalue){
		subject = "WIP VALUES USED";
		message = "WIP values have been used to pre-fill some of the termination items.";
		 $.alerts.dialogClass = "success"; 
		 jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});
	} else {
		subject = "NO WIP VALUES TO PREFILL";
		message = "There are no current values in other tabs to pre-fill the Carrier/PBM Vendor/Specific Contract/Aggregate Contract.";
		 $.alerts.dialogClass = "error"; 
		 jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});
	}
	
	
}

// **************************************

function PPO_not_added() {
	var blnreturnval = true;
	var cellPPOname;
	var cellPPOdivloc;
	var divloc = "";
	var PPOname = $("#ddlPPO").val();
	var rowPPOname;
	var rowPPOdivloc;
	var rowx;
	var txtval;
	
	PPOname = $.trim(PPOname);
	PPOname = PPOname.replace("%nbsp;","")
	
	//Ck for Divloc
	txtval =$("#txtT3_49_divloc").val();
	if (txtval.length > 0) {
		divloc = txtval;
		divloc = $.trim(divloc);
	}
	
	
	$("#gvT3_49 tr").each(function() {
		rowx = (this);
		cellPPOname = $(rowx).find("td").eq(1); 
		rowPPOname = $(cellPPOname).html(); 
		if (rowPPOname) rowPPOname = rowPPOname.replace("&nbsp;","")
		
		cellPPOdivloc = $(rowx).find("td").eq(2); 
		rowPPOdivloc = $(cellPPOdivloc).html(); 
		if (rowPPOdivloc) rowPPOdivloc = rowPPOdivloc.replace("&nbsp;","")
		
		//Return false if row contains name/div/loc
		if (rowPPOname == PPOname && rowPPOdivloc == divloc) blnreturnval = false;; 
	});
	
	return blnreturnval;
	
} //end function PPO_not_added

// **************************************

function printinfo_checkall(){
	var intval;
	var ckbox;
	var ckall = document.getElementById("ck_taball");
	
	for (intval=1; intval <= totaltabs; intval++) {
	  ckbox = document.getElementById("ck_tab" + intval)
	  if (ckall.checked){
		ckbox.checked = true;
	  } else {
		ckbox.checked = false;
	  }
	}
	
	ckbox = document.getElementById("ck_tab11")
	if (ckall.checked){
		ckbox.checked = true;
	} else {
		ckbox.checked = false;
	}
	
	ckbox = document.getElementById("ck_tab12")
	if (ckall.checked){
		ckbox.checked = true;
	} else {
		ckbox.checked = false;
	}
	
	return true;
} //end function printinfo_checkall

// **************************************

function rblist_change(item, numclicked, numbuttons) {
// 11/11/14 D.Maibor: don't set hvrenewaldirty if rbT11_modify rb is clicked
	var intoption;
	var optionx;
	
	//Set the appropriate dirty hidden value
	if (item.indexOf("T11") != -1 && item.indexOf("_modify") == -1) {
	    set_dirty("hvrenewaldirty");
	} else {
	    set_dirty("hvformdirty");
	}
	
	for (intoption=1; intoption <= numbuttons; intoption++){
		optionx = document.getElementById("rb" + item + "_" + intoption);
		if (intoption != numclicked){
			optionx.checked = false;
		}
	}

	//don't need tab optionals if popup rb's
	if (item.indexOf("PPO_role") != -1) return;
	if (item.indexOf("PPO_payment") != -1) return;
	if (item.indexOf("United_option") != -1) return;
	if (item.indexOf("SchedA") != -1) return;
	if (item.indexOf("Emailaction") != -1) return;
	
	tab1_optional_texts();
	tab2_optional_texts();
	tab3_optional_texts();
	tab4_optional_texts();
	tab5_optional_texts();
	
	tab7_optional_texts();
	tab8_optional_texts();
	tab9_optional_texts();
	tab10_optional_texts();
	tab11_optional_texts();
}

// **************************************

function record_browserclose() {
	var usertype = $("#hvusertype").val();
	var session = $("#hvsessionid").val();

	if (!loggedout) {
	    loggedout = true;
	    $.post("AJAX_RQ.ashx", { userid: $("#hvuser").val(), Browserclose: 0, user: usertype, sessionid: session },
			function () {
			    return;
			});
	}
} // end function record_broswerclose

// **************************************

function record_logout() {
	var usertype = $("#hvusertype").val();
	var session = $("#hvsessionid").val();

	if (!loggedout) {
	    loggedout = true;
	    browserclosing = false;
	    $.post("AJAX_RQ.ashx", { userid: $("#hvuser").val(), Logout: 0, user: usertype, sessionid: session },
			function () {
			    return;
			});
	}
} // end function record_logout


// **************************************

function remove_attachment(tab,item_number){
	var hvmessage = document.getElementById("hvmessage");
	var hvitem_number = document.getElementById("hvitem_number");
	var hvtab_ctrl = document.getElementById("hvtab");
	
	hvmessage.value = "REMOVE";
	displayprocessing(true);
	hvitem_number.value = item_number;
	hvtab_ctrl.value = tab;
	
}

// **************************************

function remove_contactinfo() {
  try {
  
	jConfirm("Are you sure you want to remove this Contact info?", "REMOVE THIS CONTACT INFO?", function(OKresponse) {
		if (OKresponse){
			alert("use AJAX to remove row in DB and remove row from table");
		} //end if OKresponse
	 }); //end JConfirm    
  }  // end Try
  catch(errorObject) {
	alert("In remove_contactinfo, the following error occurred: " + errorObject.description);
	return false;
  }
} //end function remove_contactinfo 
 
// **************************************
function remove_pporow(lbl) {
	var cellPPOdiv;
	var cellPPOloc;
	var cellPPOname;
	var lblremove;
	var totalrows = $("#gvT3_49 tr").length;
	
	//Get 1st row of data if have to replace w/[none]
	var rowx = ("#gvT3_49 tr:eq(1)");
	
  try {
  
	jConfirm("Are you sure you want to remove this PPO entry?", "REMOVE THIS PPO ROW?", function(OKresponse) {
		if (OKresponse){
			ppodata_changed = true;
			//replace 1st row w/[none] if totalrows = 2
			if (totalrows == 2) {
				cellPPOname = $(rowx).find("td").eq(1); 
				$(cellPPOname).html("[none]");
		
				cellPPOdiv = $(rowx).find("td").eq(2); 
				$(cellPPOdiv).html("[none]");
	   
				cellPPOloc =  $(rowx).find("td").eq(3);
				$(cellPPOloc).html("[none]"); 
	   
				lblremove = $(rowx).find("td").eq(0).find("span");
				$(lblremove).removeClass("visible");
				$(lblremove).addClass("hidden");       
			} else {
				//remove the row that the lable is in
				$(lbl).parent().parent().remove();       
			} //end if totalrows == 2
		} //end if OKresponse
	 }); //end JConfirm    
  }  // end Try
  catch(errorObject) {
	alert("In remove_pporow, the following error occurred: " + errorObject.description);
	return false;
  }
} // end function remove_pporow

// **************************************

function remove_rptrecipientrow(lbl) {
	var cell;
	var lblremove;
	var totalrows = $("#gvT1_47 tr").length;
	
	//Get 1st row of data if have to replace w/[none]
	var rowx = ("#gvT1_47 tr:eq(1)");
	
  try {
  
	jConfirm("Are you sure you want to remove this Report Recipient?", "REMOVE THIS REPORT RECIPIENT?", function(OKresponse) {
		if (OKresponse){
			//ppodata_changed = true;
			//replace 1st row w/[none] if totalrows = 2
			if (totalrows == 2) {
				 lblremove = $(rowx).find("td").eq(0).find("span");
				$(lblremove).hide();
				
				cell = $(rowx).find("td").eq(1); 
				$(cell).html("[none]");
		
				cell = $(rowx).find("td").eq(2); 
				$(cell).html("[none]");
				
				cell = $(rowx).find("td").eq(3); 
				$(cell).html("");
				
				 cell = $(rowx).find("td").eq(4); 
				$(cell).html("");
			} else {
				//remove the row that the lable is in
				$(lbl).parent().parent().remove();       
			} //end if totalrows == 2
		} //end if OKresponse
	 }); //end JConfirm    
  }  // end Try
  catch(errorObject) {
	alert("In remove_pporow, the following error occurred: " + errorObject.description);
	return false;
  }
} // end function remove_pporow

// **************************************

function renewal_date() {
	var lblT11_renewaldate = document.getElementById("lblT11_renewaldate");
	var txtT11_renewal_effdate = document.getElementById("txtT11_renewal_effdate");
	
	if (txtT11_renewal_effdate.value.length == 0)
	{
		lblT11_renewaldate.innerHTML = "[DATE]";
	} else {
		check_for_valid_date(txtT11_renewal_effdate);
		if (isNaN(valid_date)) {
			// do nothing if invalid date, check_for_valid_date already displayed the error msg
		} else {
			lblT11_renewaldate.innerHTML = txtT11_renewal_effdate.value;
		}   
	}
}

// **************************************

function renewal_display() {
	
	var hvmessage = document.getElementById("hvmessage");
	var txtT11_current_effdate = document.getElementById("txtT11_current_effdate"); 
	var txtT11_renewal_effdate = document.getElementById("txtT11_renewal_effdate"); 
	
	 if (txtT11_current_effdate.value.length==0 && txtT11_renewal_effdate.value.length == 0){
		subject = "NO EFFECTIVE DATES ENTERED";
		message = "Please enter the effective dates to display for Current/Previous or Renewal values.";
		 $.alerts.dialogClass = "error"; 
		 jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});
		return false;    
	}    
	hvmessage.value = "RENEWAL";
	displayprocessing(true);
	__doPostBack("btnDisplayTab11","");
}

// **************************************

function renewal_update_check() {
	var ck_current = document.getElementById("ckT11_modify_current_values");
	var hvmessage = document.getElementById("hvmessage");
	var txtT11_current_changed_effdate = document.getElementById("txtT11_current_changed_effdate"); 
	var txtT11_renewal_effdate = document.getElementById("txtT11_renewal_effdate"); 
	
	//Check that current changed effdate has a value if ckbox ck'd
	if (ck_current.checked && txtT11_current_changed_effdate.value.length == 0){
		subject = "NO EFFECTIVE DATE ENTERED";
		message = "Please enter the effective date for the changes to the Current/Previous values.";
		 $.alerts.dialogClass = "error"; 
		 jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});
		return false;    
	}
	
	
	//Display Nothing to Update message if necessary
	if (ck_current.checked == false  && txtT11_renewal_effdate.value.length == 0){
		subject = "MISSING RENEWAL EFFECTIVE DATE";
		message = "Please enter the renewal effective date to modify the renewal values.";
		 $.alerts.dialogClass = "error"; 
		 jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});
		return false;    
	}
	
	 jConfirm("Are you sure you want to update the database with the entered information?", "UPDATE THIS WIP?", function(OKresponse) {
		if (OKresponse){
			hvmessage.value = "UPDATE";
			displayprocessing(true);
			__doPostBack("btnUpdate_renewals","");
		}
	 });    
}

// **************************************
function save_brokers() {
	var blncontinue = true;
	var blndata_to_save = false;
	var ctrl;
	var entrydate;
	var txtval;
	
	//Ck that all Brokers with a Name value have a valid effdate
	for (var i=1;i < MAX_BROKERS + 1;i++) {
		if (blncontinue) {
			txtval =  document.getElementById("txtT6_BrokerName_" + i).value;
			if(txtval.length > 0) {
				ctrl = $("#txtT6_Effdate_" + i);
				entrydate = $(ctrl).val();
				valid_date = Date.parse(entrydate);
				
				if (isNaN(valid_date)) {
					blncontinue = false;
					$(ctrl).val("");
					ctrl.focus();
					ctrl.className = "highlight";
					subject = "INVALID DATE ENTERED";
					message = "For #: " + i + " You must select a date for this field from the pop-up calendar.";
					$.alerts.dialogClass = "error"; 
					jAlert(message,subject, function() {
						$.alerts.dialogClass = null; // reset to default
					});
				}//end if valid_date
			} //end if txtval.length > 0
		} //end if blncontinue
   } // end for
   
   if (blncontinue) {
	 //Ck that at least one Broker info has changed
	 for (var i=1;i < MAX_BROKERS + 1;i++) {
		 if($("#hvbroker_" + i + "_changed").val() == "yes") blndata_to_save = true;
	 }
	 
	 if (blndata_to_save) {
		//save_brokerinfotype as 'b' for broker
		brokerinfotype = "b"; 
		brokernumber = 1;
		show_broker_save_email_action(true);
	 } else {
		subject = "NO BROKER DATA TO SAVE";
		message = "There is no Broker data to save.";
		$.alerts.dialogClass = "error"; 
		jAlert(message,subject, function() {
			$.alerts.dialogClass = null; // reset to default
		});
	 }
   } //if blncontinue
} //end function save_brokers

// **************************************

function show_broker_save_email_action(display) {
	var popup = document.getElementById("BrokerSave_email_action");
	var topvalue;
	
	if (display) {
		//Uncheck all radio buttons
		$("#rbT6_brokersave_action_1").attr("checked", false); 
		$("#rbT6_brokersave_action_2").attr("checked", false); 
		$("#rbT6_brokersave_action_3").attr("checked", false); 
		
		switch (brokernumber)
		{
			case 1:
				topvalue = broker_popup_position_1;
				break;
			case 2:
				topvalue = broker_popup_position_2;
				break;
			case 3:
				topvalue = broker_popup_position_3;
				break;
			case 4:
				topvalue = broker_popup_position_4;
				break;
			case 5:
				topvalue = broker_popup_position_5;
				break;
		}
		popup.style.top = topvalue + "px"; 
		$("#displayinfo_Overlay").css({ opacity: 0.5 });
		$("#displayinfo_Overlay").show();
		$("#BrokerSave_email_action").show();
	} else {
		$("#displayinfo_Overlay").hide();
		$("#BrokerSave_email_action").hide();
	}
}

//**************************************

function save_broker_info() {
// 4/20/15 D.Maibor: ensure current_grnbr = hvgrnbr
	
	var action_separator = "|";
	var blnchecked = false;
	var broker_email_action = "broker_email_action:";
	var item_separator = "∞";
	var brokerinfo = "";
	var ch;
	var ctrl_current = "";
	var ctrl_next;
	var ctrltype;
	var effdate;
	var pair_separator = "Ω";
	var sorted_array;
	var txtval;
	var value_separator = "¥";
	
  try {
	
	//Prepare brokerinfo - single string of name/value pairs, using
	//Email action separator: | / Item separator: ∞ / Pair separator: "Ω" / Value separator:"¥" / ' separator: β / " separator: µ
	
	//Ck if Do NOT email at this time, emailsent value s/b 0
	if ($("#rbT6_brokersave_action_1").is(":checked")) {
		blnchecked = true;
		broker_email_action = broker_email_action + "0" + action_separator;
	}
	
	//Ck if Send Email, emailsent value s/b 1
	if ($("#rbT6_brokersave_action_2").is(":checked")) {
		blnchecked = true;
		broker_email_action = broker_email_action + "1" + action_separator;
	}
	
	//Ck if Do NOT Send Email, emailsent value s/b 2
	if ($("#rbT6_brokersave_action_3").is(":checked")) {
		blnchecked = true;
		broker_email_action = broker_email_action + "2" + action_separator;
	}
	
	
	if (!blnchecked) {
		subject = "NO EMAIL ACTION SELECTED";
		message = "Please select an email action and click SAVE.";
		$.alerts.dialogClass = "error"; 
		jAlert(message,subject, function() {
			$.alerts.dialogClass = null; // reset to default
		});
		return;
	} 
	
	displayprocessing(true); 
	
	//Sort the array of modified controls
	sorted_array = broker_controls_modified.sort();
	
	//loop through the sorted array to load all non-duplicate values into the string brokerinfo
	//each item has three values: effdate, controlID, value
	for (var i=0; i < sorted_array.length; i++) {
		
		//Include the ctrl if it is not a dup
		ctrl_next = sorted_array[i];
		if (ctrl_next != ctrl_current) {
			if (brokerinfo.length > 0) brokerinfo = brokerinfo + pair_separator + item_separator;
			ctrl_current = ctrl_next;
			ctrltype = ctrl_next.substring(0,2);
			
			//Last char of each control in Tab 6 is the broker number 1-5, except FOR rb's
			if (ctrltype == "rb") {
				//rb controls in Tab 6 have Broker #,  3 chars in from the end
				// E.g. Broker #1 rb's
				//rbT6_TINSSN_1_1
					brokernumber = ctrl_next.charAt(ctrl_next.length-3);
			 } else {
				brokernumber = ctrl_next.charAt(ctrl_next.length-1);
			 }            
			//Get the effdate associated with the control, in txtT6_Effdate_brokernumber
			effdate = $("#txtT6_Effdate_" + brokernumber).val(); 
			brokerinfo = brokerinfo + "effdate" + value_separator + effdate + pair_separator;
			
			//Add the controlID for the item
			brokerinfo = brokerinfo + "control" + value_separator + ctrl_next + pair_separator;
			
			//Controls to include are tx/hv/ck/rb
			brokerinfo = brokerinfo + "value" + value_separator;
			
			//Get the value if ctrl begins with tx or hv
			if (ctrltype == "tx" || ctrltype == "hv") brokerinfo = brokerinfo + $("#" + ctrl_next).val();
			
			if (ctrltype == "ck"){
				//Include if ckbox is checked to Terminate Broker add recID as value 
				 if ($("#" + ctrl_next).is(":checked")) {
					brokerinfo = brokerinfo + $("#txtT6_RecID_" + brokernumber).val();
				 } else {
					//Put blank value to tell code-behind to ignore
					brokerinfo = brokerinfo + "";
				 }
			}
			
			//If ctrl begins w/rb record each rb value
			if (ctrltype == "rb") {
				//Included checked/unchecked as value
				if ($("#" + ctrl_next).is(":checked")) {
					brokerinfo = brokerinfo + "checked";
				} else {
					brokerinfo = brokerinfo + "unchecked";
				}
			}
		} //if ctrl_next != ctrl_current
		
				 
	} //for loop
	
	//Add broker email action to front brokerinfo
	brokerinfo = broker_email_action + brokerinfo;
	brokertabisdirty = false;

	current_grnbr = $("#hvgrnbr").val();
		
	//Make AJAX call to server to store values
	$.post("AJAX_RQ.ashx",{savebrokerinfo:"yes",Punbr:current_punbr,Grnbr:current_grnbr,Info:brokerinfo},
		function(data){
			save_broker_info_reply(data);
	});

  } 
  catch(errorObject) {
	alert("In save_broker_info, the following error occurred: " + errorObject.description);
	return false;
  }

} //end save broker_info

// **************************************

function save_broker_info_reply(data) {
 //pair_separator = "Ω";
 //value_separator = "¥"
 var msgitems = data.split("|");
 var recids;
 var recidpair;
 
	displayprocessing(false);
	 
	 subject = msgitems[1];
	 message = msgitems[2];
	 
	 //Save new RecID if returned
	 if (msgitems.length == 4) {
		recids = msgitems[3].split("Ω")
		for (var i=0;i < recids.length;i++) {
			recidpair = recids[i].split("¥");
			$("#txtT6_RecID_" + recidpair[0]).val(recidpair[1]);
			$("#btnContact_" + recidpair[0]).show();
			$("#lblT6_contactinfo_" + recidpair[0]).hide();
		}
	 }
	 
	 //Determine msg format
	 switch(msgitems[0])
	{
	  case "S":
		show_broker_save_email_action(false);
		//Reset brokerchange hidden values to blank  
		 for (var i=1;i < MAX_BROKERS+1;i++) {
			 $("#hvbroker_" + i + "_changed").val("");
		 }
		 
		 //Clear broker controls array and index
		broker_controls_index = 0;
		broker_controls_modified = [];
		
		$.alerts.dialogClass = "success"; 
		break;
	  case "E":
		$.alerts.dialogClass = "error"; 
		break;
	}
	
	 jAlert(message,subject, function() {
		$.alerts.dialogClass = null; // reset to default
	});	
}

// **************************************

function save_networks_to_hvnetworkinfo() {
	var cell;
	var cellhtml;
	var network_row_splitter = "|";
	var network_field_splitter = "¥";
	var row;
	var tbl = document.getElementById("gvT10_Networks");
	var totalcells = 10;
	var totalrows = $('#gvT10_Networks tr').length;
	var txtval = "";

	//pack all gvT10_Network rows into hvnetworkingo. Use std for loop so return occurs AFTER processing all tbl rows
	$("#hvnetworkinfo").val("");

	//Loop to get each row after header row
	for (var i = 1; i < totalrows; i++) {
		row = tbl.rows[i];

		//Loop to get the cells/fields for the row, Assigned By [3], Assignment Values [3, Assignment Instructions [4], PPO [5], Role [6], Payment [7], United Role [8]
		for (var v = 3; v < totalcells; v++) {
			cellhtml = row.cells[v].innerHTML;
			if (cellhtml != "&nbsp;" && cellhtml != "") txtval += cellhtml;

			// Add a field splitter if not last field
			if (v < totalcells - 1) txtval += network_field_splitter;
		}
		//Add a row splitter if not last row
		if (i < totalrows - 1) txtval += network_row_splitter;
	}

    $("#hvnetworkinfo").val(txtval);
} //end function save_networks_to_hvnetworkinfo

// **************************************

function save_network_info() {
	var cell;
	var cellhtml;
	var network_row_splitter = "|";
	var network_field_splitter = "¥";
	var row;
	var tbl = document.getElementById("gvT10_Networks");
	var totalcells = 9;
	var totalrows = $('#gvT10_Networks tr').length;
	var txtval = "";

	if (networktabisdirty) {
		save_networks_to_hvnetworkinfo();
		return true;

	} else {
		subject = "NO NETWORK INFO CHANGED";
		message = "You have not changed any network info on this tab. There is nothing to save.";
		$.alerts.dialogClass = "error";
		jAlert(message, subject, function () {
			$.alerts.dialogClass = null; // reset to default
		});
		return false;
	} // end if networktabisdirty
	
} // end function save_network_info

// **************************************

function save_ppo_info() {
    //5/24/16 D.Maibor: change United to United Options / United Choice 
	var blnoption = false;
	var txtspecial;

	ppo = $("#ddlAddPPO").val();    
	ppo_role = "";
	ppo_payment = "";
	ppo_united_role = "";

	//Make sure United option is selected  
	if (ppo.indexOf("United Options") != -1) {
		if ($("#rbUnited_option_1").is(":checked")) {
			blnoption = true;
			ppo_united_role = $("#lblrbUnited_option_1").html();
		}

		if ($("#rbUnited_option_2").is(":checked")) {
			blnoption = true;
			ppo_united_role = $("#lblrbUnited_option_2").html();
		}
		
		if ($("#rbUnited_option_3").is(":checked")) {
			blnoption = true;
			ppo_united_role = $("#lblrbUnited_option_3").html();
		} 

		if (! blnoption) {
			ppo = "";
			subject = "MISSING UNITED OPTIONS ROLE"
			message = "Please select  whether United is STANDARD/EXCEPTION OPTIONS.";
			$.alerts.dialogClass = "error"; 
			jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
			});
			return;
		} // end if ! blnoption
} // end if United Options

if (ppo.indexOf("United Choice") != -1) {
	if ($("#rbUnited_choice_1").is(":checked")) {
		blnoption = true;
		ppo_united_role = $("#lblrbUnited_choice_1").html();
	}

	if ($("#rbUnited_choice_2").is(":checked")) {
		blnoption = true;
		ppo_united_role = $("#lblrbUnited_choice_2").html();
	}
		
	if ($("#rbUnited_choice_3").is(":checked")) {
		blnoption = true;
		ppo_united_role = $("#lblrbUnited_choice_3").html();
	} 

	if (! blnoption) {
		ppo = "";
		subject = "MISSING UNITED CHOICE ROLE"
		message = "Please select  whether United is STANDARD/EXCEPTION OPTIONS.";
		$.alerts.dialogClass = "error"; 
		jAlert(message,subject, function() {
			$.alerts.dialogClass = null; // reset to default
		});
		return;
	} // end if ! blnoption
} // end if United Options

//Make sure special role is entered
if (ppo == "Special Network (specify)") {
	txtspecial = $("#txtspecial_PPO").val();
	if (txtspecial.length > 0) {
		ppo = txtspecial;
	} else {
		subject = "MISSING SPECIAL PPO";
		message = "Please enter the special PPO.";
		$.alerts.dialogClass = "error";
		jAlert(message, subject, function () {
			$.alerts.dialogClass = null; // reset to default
		});
		ppo = "";
		return;
	}         
	
} // end if ppo = Special Network

	//Save ppo_role
	if ($("#rbPPO_role_1").is(":checked")) ppo_role = $("#lblrbPPO_role_1").html();
	if ($("#rbPPO_role_2").is(":checked")) ppo_role = $("#lblrbPPO_role_2").html();
	if ($("#rbPPO_role_3").is(":checked")) ppo_role = $("#lblrbPPO_role_3").html();

	//Save ppo_payment
	if ($("#rbPPO_payment_1").is(":checked")) ppo_payment = $("#lblrbPPO_payment_1").html();
	if ($("#rbPPO_payment_2").is(":checked")) ppo_payment = $("#lblrbPPO_payment_2").html();
	if ($("#rbPPO_payment_3").is(":checked")) ppo_payment = $("#lblrbPPO_payment_3").html();

	display_ppoassignment(false);

	if (network_assignment_rowid == 0) {
		// Creating new Assignment, add ppo to list of PPO's for the Assignment
		addnewppoinfo();
	} else {
		//Add btn was clicked for an existing Assignment
		add_ppo_to_assignment();
	}

} //end function save_ppo_info

// **************************************

function start_animation() {
	$("#processing").show();
	//Using setTimeout to reset the src property of the Image control, processing_gif, causes the animated gif to run during the postback 
	setTimeout('document.images["processing_gif"].src="Images/loadingAnimation.gif"', 200);
}

// **************************************

function term_broker_info(brokernumber) {
    //If ckbox is ck'd initialize effdate and lock all other boxes
    //10/13/15 D.Maibor: Fix CitySTZip now 3 separate controls
	var curr_effdate;
	
	if ($("#ckTermBroker_" + brokernumber).is(":checked")) {
		//Set broker_changed to yes
		$("#hvbroker_" + brokernumber + "_changed").val("yes");
		
		//Hide Add Broker btn/ddl & btnContact
		$("#T6AddBroker_" + brokernumber).hide();
		$("#btnContact_" + brokernumber).hide();
		
		//Save curr_effdate in case User unchecks ckbox
		curr_effdate = $("#txtT6_Effdate_" + brokernumber).val();
		switch (brokernumber)
		{
			case 1:
				broker_effdate_1 = curr_effdate;
				break;
			case 2:
				broker_effdate_2 = curr_effdate;
				break;
			case 3:
				broker_effdate_3 = curr_effdate;
				break;
			case 4:
				broker_effdate_4 = curr_effdate;
				break;
			case 5:
				broker_effdate_5 = curr_effdate;
				break;
		}
		
		//Set effdate to ""
		$("#txtT6_Effdate_" + brokernumber).val("");
		
		$("#txtT6_BrokerName_" + brokernumber).attr("readonly",true); 
		$("#txtT6_BrokerName_" + brokernumber).css("background-color","#C0C0C0"); 
		
		$("#txtT6_Addr1_" + brokernumber).attr("readonly", true);
		$("#txtT6_Addr1_" + brokernumber).css("background-color","#C0C0C0"); 
		
		$("#txtT6_Tel_" + brokernumber).attr("readonly", true);
		$("#txtT6_Tel_" + brokernumber).css("background-color","#C0C0C0"); 
		
		$("#txtT6_Addr2_" + brokernumber).attr("readonly", true);
		$("#txtT6_Addr2_" + brokernumber).css("background-color","#C0C0C0");
		
		$("#txtT6_Fax_" + brokernumber).attr("readonly", true);
		$("#txtT6_Fax_" + brokernumber).css("background-color","#C0C0C0");

		//txtT6_City_1
		$("#txtT6_City_" + brokernumber).attr("readonly", true);
		$("#txtT6_City_" + brokernumber).css("background-color", "#C0C0C0");

		$("#txtT6_ST_" + brokernumber).attr("readonly", true);
		$("#txtT6_ST_" + brokernumber).css("background-color", "#C0C0C0");

		$("#txtT6_Zip_" + brokernumber).attr("readonly", true);
		$("#txtT6_Zip_" + brokernumber).css("background-color", "#C0C0C0");
		
		$("#txtT6_Contact_" + brokernumber).attr("readonly", true);
		$("#txtT6_Contact_" + brokernumber).css("background-color","#C0C0C0");
		
		$("#txtT6_Remarks1_" + brokernumber).attr("readonly", true);
		$("#txtT6_Remarks1_" + brokernumber).css("background-color","#C0C0C0");
		
		$("#txtT6_taxID_" + brokernumber).attr("readonly", true);
		$("#txtT6_taxID_" + brokernumber).css("background-color","#C0C0C0");
		
		$("#txtT6_Remarks2_" + brokernumber).attr("readonly", true);
		$("#txtT6_Remarks2_" + brokernumber).css("background-color","#C0C0C0");
		
		$("#rbT6_TINSSN_" + brokernumber + "_1").attr("disabled", true);
		$("#rbT6_TINSSN_" + brokernumber + "_2").attr("disabled", true);
		
		$("#gvT6_hide_" + brokernumber).css({opacity: 0.5});
		$("#gvT6_hide_" + brokernumber).show();
	} else { 
		 //Show Add Broker btn/ddl & btnContact
		$("#T6AddBroker_" + brokernumber).show();
		$("#btnContact_" + brokernumber).show();
		
		//Set effdate to previous value
		switch (brokernumber)
		{
			case 1:
				curr_effdate = broker_effdate_1;
				break;
			case 2:
				curr_effdate = broker_effdate_2;
				break;
			case 3:
				curr_effdate = broker_effdate_3;
				break;
			case 4:
				curr_effdate = broker_effdate_4;
				break;
			case 5:
				curr_effdate = broker_effdate_5;
				break;
		}
		$("#txtT6_Effdate_" + brokernumber).val(curr_effdate);
			   
		$("#txtT6_BrokerName_" + brokernumber).removeAttr("readonly"); 
		$("#txtT6_BrokerName_" + brokernumber).css("background-color","transparent"); 
		
		$("#txtT6_Addr1_" + brokernumber).removeAttr("readonly");
		$("#txtT6_Addr1_" + brokernumber).css("background-color","transparent"); 
		
		$("#txtT6_Tel_" + brokernumber).removeAttr("readonly");
		$("#txtT6_Tel_" + brokernumber).css("background-color","transparent"); 
		
		$("#txtT6_Addr2_" + brokernumber).removeAttr("readonly");
		$("#txtT6_Addr2_" + brokernumber).css("background-color","transparent");
		
		$("#txtT6_Fax_" + brokernumber).removeAttr("readonly");
		$("#txtT6_Fax_" + brokernumber).css("background-color","transparent");
		
		$("#txtT6_CityStZip_" + brokernumber).removeAttr("readonly");
		$("#txtT6_CityStZip_" + brokernumber).css("background-color","transparent");
		
		$("#txtT6_Contact_" + brokernumber).removeAttr("readonly");
		$("#txtT6_Contact_" + brokernumber).css("background-color","transparent");
		
		$("#txtT6_Remarks1_" + brokernumber).removeAttr("readonly");
		$("#txtT6_Remarks1_" + brokernumber).css("background-color","transparent");
		
		$("#txtT6_taxID_" + brokernumber).removeAttr("readonly");
		$("#txtT6_taxID_" + brokernumber).css("background-color","transparent");
		
		$("#txtT6_Remarks2_" + brokernumber).removeAttr("readonly");
		$("#txtT6_Remarks2_" + brokernumber).css("background-color","transparent");
		
		$("#rbT6_TINSSN_" + brokernumber + "_1").attr("disabled", false);
		$("#rbT6_TINSSN_" + brokernumber + "_2").attr("disabled", false);
		
		$("#gvT6_hide_" + brokernumber).hide();
	}
}

// **************************************

function set_dirty(item) {
	var hv = document.getElementById(item);
	hv.value = "yes";
	formisdirty = true;
}

// **************************************

function show_brokerinfo(blnshow) {
	
	if (blnshow) {
		//Use JQuery to set the overlay opacity
		$("#displayinfo_Overlay").css({ opacity: 0.5 });
		$("#displayinfo_Overlay").show();
		$("#brokerchange").show();
	   
	} else {
		$("#displayinfo_Overlay").hide();
		$("#brokerchange").hide();
	}

} //end function show_brokerInfo

// **************************************

function show_contactinfo(blnshow) {
	if (blnshow) {
		var popup = document.getElementById("AMContactChange");
		var topvalue;
		
		switch (brokernumber)
		{
			case 1:
				topvalue = broker_popup_position_1;
				break;
			case 2:
				topvalue = broker_popup_position_2;
				break;
			case 3:
				topvalue = broker_popup_position_3;
				break;
			case 4:
				topvalue = broker_popup_position_4;
				break;
			case 5:
				topvalue = broker_popup_position_5;
				break;
		}
		popup.style.top = topvalue + "px";
		
		//Use JQuery to set the overlay opacity
		$("#displayinfo_Overlay").css({ opacity: 0.5 });
		$("#displayinfo_Overlay").show();
		$("#AMContactChange").show();
		
		//Shoe Remove button if Mod operation
		if (AMcontactinfomod == "M") {
			$("#btnT6_Contactinfo_Remove").show();
		} else {
			$("#btnT6_Contactinfo_Remove").hide();
		}
		
	} else {
		$("#displayinfo_Overlay").hide();
		$("#AMContactChange").hide();
	}
}

// **************************************

function show_helpinfo(blnshow,helpdiv) {
	if (blnshow) {
		//Use JQuery to set the overlay opacity
		$("#displayinfo_Overlay").css({ opacity: 0.5 });
		$("#displayinfo_Overlay").show();
		$(helpdiv).show();
	   
	} else {
		$("#displayinfo_Overlay").hide();
		$(helpdiv).hide();
	}
}

// **************************************

function show_rptrecipientinfo(blnshow) {
	
	if (blnshow) {
		//Use JQuery to set the overlay opacity
		$("#displayinfo_Overlay").css({ opacity: 0.5 });
		$("#displayinfo_Overlay").show();
		$("#rptrecipient").show();
		
		//Initialize controls
		$("#txtT1_rptrecip_fname").val("");
		$("#txtT1_rptrecip_lname").val("");
		$("#txtT1_rptrecip_email").val("");
		$("#txtT1_rptrecip_effdate").val("");
		$("#rbT1_rptrecip_notify_0").attr('checked', false);
		$("#rbT1_rptrecip_notify_1").attr('checked', false);
		$("#rbT1_rptrecip_notify_2").attr('checked', false);
		$("#ckT1_rpt_recip_phi").attr('checked', false);
		$("#ddlHpi").val("[none]");
		
	   
	} else {
		//Leave controls w/data to add to gvT1_47
		$("#displayinfo_Overlay").hide();
		$("#rptrecipient").hide();
	}

} //end function show_rptrecipientinfo

// **************************************

function show_rptemail_list(blnshow) {
	
	if (blnshow) {
		//Use JQuery to set the overlay opacity
		$("#displayinfo_Overlay").css({ opacity: 0.5 });
		$("#displayinfo_Overlay").show();
		$("#rptemail_list").show();
	   
	} else {
		$("#displayinfo_Overlay").hide();
		$("#rptemail_list").hide();
	}

} //end function show_rptsend info

// **************************************

function show_tab11_help_info(blnshow) {
	if (blnshow) {
		//Use JQuery to set the overlay opacity
		$("#displayinfo_Overlay").css({ opacity: 0.5 });
		$("#displayinfo_Overlay").show();
		$("#Fees_Rates_Help").show();
	   
	} else {
		$("#displayinfo_Overlay").hide();
		$("#Fees_Rates_Help").hide();
	}
}

// **************************************

function show_broker_popup_values(data) {
	var brokerinfo = new Array();
	var brokernumber = 1;
	var brokerrows = new Array();
	var popup = document.getElementById("popup");
	var temparray = new Array();
	var tempval;
	
	
	//Use the PPO popup to show broker info
	var lblBroker_curr_value = document.getElementById("lblBroker_curr_value");
	var txtBroker_curr_value = document.getElementById("txtBroker_curr_value");
	var lblBroker_next_value = document.getElementById("lblBroker_next_value");
	var txtBroker_next_value = document.getElementById("txtBroker_next_value");
	var lblBroker_prev_value = document.getElementById("lblBroker_prev_value");
	var txtBroker_prev_value = document.getElementById("txtBroker_prev_value");
	
	temparray = data.split("*");
	
	if (temparray.length == 0){
		alert("Problem retrieving programs from ajaxRQ.aspx");
		return;
	}
		
	//Get curr effdate
	lblBroker_curr_value.innerHTML = "Current Value. Effective: " + temparray[0];
	
	//Get curr ppo(s)
	brokerrows = temparray[1].split("|")

	if (brokerrows[0] == "[none]") {
		txtBroker_curr_value.value = "[none]";
	} else {
		//Get the ppo rows and enter into txtpopup_curr_value
		tempval = "";
		for (var i=0;i<brokerrows.length;i++) {
			brokernumber = i + 1;
			tempval += "Broker #" + brokernumber + ": " + brokerrows[i]
			tempval += "\r";
		}
		txtBroker_curr_value.value = tempval;
	}
	
	lblBroker_next_value.innerHTML = "Next Value. Effective: " + temparray[2];
	brokerrows = temparray[3].split("|")
	if (brokerrows[0] == "[none]") {
		txtBroker_next_value.value = "[none]";
	} else {
		//Get the ppo rows and enter into txtpopup_curr_value
		tempval = "";
		for (var i=0;i<brokerrows.length;i++) {
			 brokernumber = i + 1;
			tempval += "Broker #" + brokernumber + ": " + brokerrows[i]
			tempval += "\r";
		}
		txtBroker_next_value.value = tempval;
	}
	
   lblBroker_prev_value.innerHTML = "Previous Value. Effective: " + temparray[4];
	brokerrows = temparray[5].split("|")
	if (brokerrows[0] == "[none]") {
		txtBroker_prev_value.value = "[none]";
	} else {
		//Get the ppo rows and enter into txtpopup_curr_value
		tempval = "";
	   for (var i=0;i<brokerrows.length;i++) {
			brokernumber = i + 1;
			tempval += "Broker #" + brokernumber + ": " + brokerrows[i]
			tempval += "\r";
		}
		txtBroker_prev_value.value = tempval;
	}
	
	
	//Hide std popup/PPO popup, show broker popup
	popup.style.visibility = "hidden";
	$("#PPOvalues").hide();
	$("#brokerpopup").show();
}

// **************************************

function show_newPPO(blnshow) {
	
	if (blnshow) {
		$("#displayinfo_Overlay").css({ opacity: 0.5 });
		$("#displayinfo_Overlay").show();
		$("#newPPOpopup").show()
		$("#txtT3_49_newPPO").val("");
	} else {
		$("#displayinfo_Overlay").hide();
		$("#newPPOpopup").hide()
	}
} // end function show_newPPO

// **************************************
function show_PPOinfo(blnshow) {
	var ddlPPO = document.getElementById("ddlPPO");
	
	if (blnshow) {
		//Use JQuery to set the overlay opacity
	   $("#displayinfo_Overlay").css({ opacity: 0.5 });
	   $("#displayinfo_Overlay").show();
	   $("#PPOpopup").show();
	   $("#txtT3_49_divloc").val("");
	   ddlPPO.selectedIndex = 0;
	   $("#txtT3_49_div").val("");
	   $("#txtT3_49_loc").val("");
	} else {
		$("#displayinfo_Overlay").hide();
		$("#PPOpopup").hide();
	}
} //end function show_PPOinfo

// **************************************

function show_printinfo(blnshow) {
	//2/9/12 D. Maibor Change Schedule_A_Word_printinfo to use jquery 
	var printinfo = document.getElementById("printinfopopup");
	var word_printinfo = document.getElementById("Schedule_A_Word_printinfo");
	var ckall = document.getElementById("ck_taball");
	
	if (blnshow) {
		printinfo.style.visibility = "visible";
	   
		//Set ckall to unchecked and run printinfo_checkall to unck all tabs
		ckall.checked = false;
		printinfo_checkall();
	} else {
		printinfo.style.visibility = "hidden";
		//word_printinfo.style.visibility = "hidden";
		$("#Schedule_A_Word_printinfo").hide();
		$("#displayinfo_Overlay").hide();
	}
}

// **************************************

function show_scheduleAinfo(blnshow) {
	if (blnshow) {
		//Use JQuery to set the overlay opacity
	   $("#displayinfo_Overlay").css({ opacity: 0.5 });
	   $("#displayinfo_Overlay").show();
	   $("#scheduleA").show();
	   $('#rbSchedA_1').removeAttr('checked');
	   $('#rbSchedA_2').removeAttr('checked');
	   $("#txtSchedA_effdate").val("");
	} else {
		$("#ddlSchedA").val(0);
		$("#displayinfo_Overlay").hide();
		$("#scheduleA").hide();
	}
}

// **************************************

function show_PPO_popup_values(data) {
	
	var popup = document.getElementById("popup");
	var temparray = new Array();
	var pporows = new Array();
	var ppoinfo = new Array();
	var tempval;
	
	var lblpopup_curr_value = document.getElementById("lblPPO_curr_value");
	var txtpopup_curr_value = document.getElementById("txtPPO_curr_value");
	var lblpopup_next_value = document.getElementById("lblPPO_next_value");
	var txtpopup_next_value = document.getElementById("txtPPO_next_value");
	var lblpopup_prev_value = document.getElementById("lblPPO_prev_value");
	var txtpopup_prev_value = document.getElementById("txtPPO_prev_value");
	
	temparray = data.split("*");
	
	if (temparray.length == 0){
		alert("Problem retrieving programs from ajaxRQ.aspx");
		return;
	}

	if (temparray.length == 1) return;
		
	//Get curr effdate
	lblpopup_curr_value.innerHTML = "Current Value. Effective: " + temparray[0];
	
	//Get curr ppo(s)
	pporows = temparray[1].split("^")

	if (pporows[0] == "[none]") {
		txtpopup_curr_value.value = "[none]";
	} else {
		//Get the ppo rows and enter into txtpopup_curr_value
		tempval = "";
		for (var i=0;i<pporows.length;i++) {
			ppoinfo = pporows[i].split("|")
			tempval += ppoinfo[0] + ", Div/Loc: "
			if (ppoinfo.length > 1) tempval += ppoinfo[1];
			tempval += "\r";
		}
		txtpopup_curr_value.value = tempval;
	}
	
	lblpopup_next_value.innerHTML = "Next Value. Effective: " + temparray[2];
	pporows = temparray[3].split("^")
	if (pporows[0] == "[none]") {
		txtpopup_next_value.value = "[none]";
	} else {
		//Get the ppo rows and enter into txtpopup_curr_value
		tempval = "";
		for (var i=0;i<pporows.length;i++) {
			ppoinfo = pporows[i].split("|")
			tempval += ppoinfo[0] + ", Div/Loc: "
			if (ppoinfo.length > 1) tempval += ppoinfo[1];
			tempval += "\r";
		}
		txtpopup_next_value.value = tempval;
	}
	
   lblpopup_prev_value.innerHTML = "Previous Value. Effective: " + temparray[4];
	pporows = temparray[5].split("^")
	if (pporows[0] == "[none]") {
		txtpopup_prev_value.value = "[none]";
	} else {
		//Get the ppo rows and enter into txtpopup_curr_value
		tempval = "";
		for (var i=0;i<pporows.length;i++) {
			ppoinfo = pporows[i].split("|")
			tempval += ppoinfo[0] + ", Div/Loc: "
			if (ppoinfo.length > 1) tempval += ppoinfo[1];
			tempval += "\r";
		}
		txtpopup_prev_value.value = tempval;
	}
	
	
	//Hide std popup, show PPO popup
	popup.style.visibility = "hidden";
	$("#brokerpopup").hide();
	$("#PPOvalues").show();
}

// **************************************

function show_review() {
	
	displayprocessing(true);

	//Make AJAX call to server to retrieve values
	$.post("AJAX_RQ.ashx", {userid: $("#hvuser").val(), Values: "yes", Punbr: current_punbr, Grnbr: current_grnbr, Tab: hvtab, ID: popup_itemID, rbvals: rb_original_values },
		function(data){
			show_review_reply(data);
	}); 
}

// **************************************
function modify_effdate_value(lbl)
{
	var cellx;
	var rowx;
	var modify_popup = document.getElementById("modify_effdate_value");

	 // Save label clicked
	 lbl_effdate_value_change = lbl;
	 rowx = $(lbl).parent().parent();
	 
	 //Store effdate
	 cellx = $(rowx).find("td").eq(2);
	 popup_effdate = $(cellx).html();
	 $("#lblCurrentEffdate").html(popup_effdate);
	 
	 //Store datechanged
	 cellx = $(rowx).find("td").eq(3);
	 popup_datechanged = $(cellx).html();
	 
	 
	 //Store changedby
	 cellx = $(rowx).find("td").eq(4); 
	 popup_changedby = $(cellx).html(); 
	 
	 //Position modify_popup inside effvalues popup
	  //$("#modify_effdate_value").hide();
	modify_popup.style.visibility = "visible";
	 
}  

// **************************************

function save_modified_effdate()
{
	popup_neweffdate = $("#txtNewEffDate").val();
	
	if (popup_neweffdate.length == 0) {
		subject = "MISSING EFFDATE"
		message = "Please enter the new effdate.";
		$.alerts.dialogClass = "error"; 
		jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});
		return;
	}
	if (valid_date_entered(popup_neweffdate)) {
		//Make AJAX call to server to update the record from the WIP_Values table
	    $.post("AJAX_RQ.ashx", {userid: $("#hvuser").val(), ModifyEffdate: "yes", Punbr: current_punbr, Grnbr: current_grnbr, Tab: hvtab, ID: popup_itemID, Oldeffdate: popup_effdate, Datechanged: popup_datechanged, Changedby: popup_changedby, Effdate: popup_neweffdate },
				function(data){
				save_modified_effdate_reply(data);
			}); 
	} else {
		subject = "INVALID EFFDATE"
		message = "Please enter a valid effdate.";
		$.alerts.dialogClass = "error"; 
		jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});
	}
}

// **************************************

function save_modified_effdate_reply(data)
{
	var cellx;
	var rowx;
	var modify_popup = document.getElementById("modify_effdate_value");
	
	if (data == "OK") {
		modify_popup.style.visibility = "hidden";
		
		//update the effdate lbl in the row
		 rowx = $(lbl_effdate_value_change).parent().parent();
		 cellx = $(rowx).find("td").eq(2);
		 $(cellx).html(popup_neweffdate);
	} else {
		alert("The following problem occurred trying to delete the record:\n\n" + data);
	}
}

// **************************************

function remove_effdate_value(lbl)
{
	var cellx;
	var rowx;	
	
  try {
  
	jConfirm("Are you sure you want to remove this entry?", "REMOVE THIS RECORD?", function(OKresponse) {
		if (OKresponse){
			// Save label clicked
			lbl_effdate_value_change = lbl;
			
			rowx = $(lbl).parent().parent();
			cellx = $(rowx).find("td").eq(3); 
			popup_datechanged = $(cellx).html();
			cellx = $(rowx).find("td").eq(4); 
			popup_changedby = $(cellx).html();
	   
			//Make AJAX call to server to delete the record from the WIP_Values table
			$.post("AJAX_RQ.ashx", {userid: $("#hvuser").val(), RemoveValue: "yes", Punbr: current_punbr, Grnbr: current_grnbr, Tab: hvtab, ID: popup_itemID, Datechanged: popup_datechanged, Changedby: popup_changedby },
				function(data){
				remove_effdate_value_reply(data);
			});  
		}
	});
			
  }  // end Try
  catch(errorObject) {
	alert("In remove_pporow, the following error occurred: " + errorObject.description);
	return false;
  }
}

// **************************************

function remove_effdate_value_reply(data) 
{
	if (data == "OK") {
		//remove the row that the lable is in, parent of label is <td>, parent of <td> is <tr>
		$(lbl_effdate_value_change).parent().parent().remove();      
	} else {
		alert("The following problem occurred trying to delete the record:\n\n" + data);
	}
	
} //end function remove_effdate_value_reply

// **************************************

function add_review_rows(data) {
  try {
	var cellx;
	var clonedrow;
	var introw;
	var lbltitle = document.getElementById("lblEffdate_value_title");
	var popup = document.getElementById("effdate_values");
	var rownum_to_insert = 0;
	var rowx;

	//Field separator: "Ω" / Row separator:"£" /CR separator: β;
	var tempfields = new Array();
	var temprows = new Array();
	
	
	data = data.replace(/β/g, '<BR>'); 
	
	 //Use JQuery to set the overlay opacity
	$("#displayinfo_Overlay").css({ opacity: 0.5 });
	$("#displayinfo_Overlay").show();
	$("#effdate_values").show();    
	
	//Set title and location of review popup
	lbltitle.innerHTML = popup_title;

	popup.style.top = popup_top + "px";
	popup.style.left = popup_left + "px";

	temprows = data.split("£");
	
	clear_gvEffdate_values();
	
	//Set up clonedrow as 1st row w/data
	$("#gvEffdate_values tr").each(function() {
	  rownum_to_insert = rownum_to_insert + 1;
	 if (rownum_to_insert == 2) clonedrow = $(this);
	});  
	
	rownum_to_insert = 0;
	
	//Add each row in temprows to gvEffdate_values 
	for (introw=0; introw < temprows.length; introw++) {
		rownum_to_insert = rownum_to_insert + 1;
		tempfields = temprows[introw].split("Ω");
		
		//Replace row 1 
		if (rownum_to_insert == 1) {
			rowx = clonedrow;
		} else {  //Add new row
			//Create a new row in last row of table
			$("#gvEffdate_values").append(clonedrow.clone());
			rowx = $("#gvEffdate_values tr:last");            
		}
		
		//Update each cell in the table w/array tempfields values
		cellx = $(rowx).find("td").eq(1); 
		$(cellx).html(tempfields[0]);

		cellx = $(rowx).find("td").eq(2); 
		$(cellx).html(tempfields[1]);
		
		cellx = $(rowx).find("td").eq(3); 
		$(cellx).html(tempfields[2]);

		cellx = $(rowx).find("td").eq(4); 
		$(cellx).html(tempfields[3]);
		
		cellx = $(rowx).find("td").eq(5); 
		$(cellx).html(tempfields[4]);
	} //end for
	
	//set focus 
	$("#txtEffdate_focus").focus();
  } // end try
  catch(errorObject) {
	alert("In add_review_rows, the following error occurred: " + errorObject.description);
	return false;
  }
} // end function add_review_rows

// **************************************

function clear_gvEffdate_values() {
	var rownum = 0;
	
  try {    
	//Use JQuery to remove all rows after 1st two in gv
	$("#gvEffdate_values tr").each(function() {
	  rownum = rownum + 1;
	  if (rownum > 2) clonedrow = $(this).remove();
	}); 
		 
  }  // end Try
  catch(errorObject) {
	alert("In clear_gvEffdate_values, the following error occurred: " + errorObject.description);
	return false;
  }
}  // end function clear_gvEffdate_values

// **************************************

function show_review_reply(data) {
	
	displayprocessing(false);
	rb_original_values = "";
	
	if (data == "[none]") {
		subject = "NO VALUES TO DISPLAY"
		message = "There are no values recorded for this item.";
		 $.alerts.dialogClass = "error"; 
		 jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});
	} else {
		add_review_rows(data);
	} 
} // end function show_review_reply

// **************************************

function show_rblist_multi_values(data) {
	var temparray = new Array();
	var tempval;
	var strval;
	
	var popup = document.getElementById("popup");
	var lblpopup_title = document.getElementById("lblpopup_title");
	var lblpopup_curr_value = document.getElementById("lblpopup_curr_value");
	var txtpopup_curr_value = document.getElementById("txtpopup_curr_value");
	var lblpopup_next_value = document.getElementById("lblpopup_next_value");
	var txtpopup_next_value = document.getElementById("txtpopup_next_value");
	var lblpopup_prev_value = document.getElementById("lblpopup_prev_value");
	var txtpopup_prev_value = document.getElementById("txtpopup_prev_value")
	
	temparray = data.split("|");
	
	if (temparray.length == 0){
		alert("Problem retrieving programs from ajaxRQ.aspx");
		return;
	}
	
	lblpopup_title.innerHTML = popup_title;
	lblpopup_curr_value.innerHTML = "Current Value. Effective: " + temparray[0];
	
	//Determine which rblist value to display for curr value
	txtpopup_curr_value.value = "[none]";
	if (temparray[1] != "[none]") {
		tempval = parseInt(temparray[1]);
		//Replace ^ with $ if present
		strval = rbvalues[tempval-1];
		strval = strval.replace("^","$");
		txtpopup_curr_value.value = strval;
	}
	
	lblpopup_next_value.innerHTML = "Next Value. Effective: " + temparray[2];
	
	//Determine which rblist value to display for next value
	txtpopup_next_value.value = "[none]";
	if (temparray[3] != "[none]" && temparray[3] != "0") {
		tempval = parseInt(temparray[3]);
		strval = rbvalues[tempval-1];
		strval = strval.replace("^","$");
		txtpopup_next_value.value = strval;
	}
   
	 //Determine which rblist value to display for prev val
	lblpopup_prev_value.innerHTML = "Previous Value. Effective: " + temparray[4];
	txtpopup_prev_value.value = "[none]";
	if (temparray[5] != "[none]") {
		tempval = parseInt(temparray[5]);
		strval = rbvalues[tempval-1];
		strval = strval.replace("^","$");
		txtpopup_prev_value.value = strval;
	}
	
	popup.style.top = popup_top + "px";
	popup.style.left = popup_left + "px";
	popup.style.visibility = "visible";
	$("#PPOvalues").hide();
	$("#brokerpopup").hide();
	
}

// **************************************
function show_rblist_popup_values(data) {
	//In data, return curr effdate, curr value, next effdate, next value, prev. effdate,
	//  prev. value  all separated by '$',
  
	var temparray = new Array();
	var tempval;
	
	var popup = document.getElementById("popup");
	var lblpopup_title = document.getElementById("lblpopup_title");
	var lblpopup_curr_value = document.getElementById("lblpopup_curr_value");
	var txtpopup_curr_value = document.getElementById("txtpopup_curr_value");
	var lblpopup_next_value = document.getElementById("lblpopup_next_value");
	var txtpopup_next_value = document.getElementById("txtpopup_next_value");
	var lblpopup_prev_value = document.getElementById("lblpopup_prev_value");
	var txtpopup_prev_value = document.getElementById("txtpopup_prev_value")
	
	temparray = data.split("|");
	
	if (temparray.length == 0){
		alert("Problem retrieving programs from ajaxRQ.aspx");
		return;
	}
	
	lblpopup_title.innerHTML = popup_title;
	lblpopup_curr_value.innerHTML = "Current Value. Effective: " + temparray[0];
	
	//Determine which rblist value to display
//    txtpopup_curr_value.value = temparray[1]
	
	if (temparray[1]== "1"){
		txtpopup_curr_value.value = rb0_option;
	} else {
		if (temparray[1]== "2"){
			txtpopup_curr_value.value = rb1_option;
		}
	}
	
	lblpopup_next_value.innerHTML = "Next Value. Effective: " + temparray[2];
	
	//Determine which rblist value to display
	txtpopup_next_value.value = temparray[3];
	if (temparray[3]== "0"){
		txtpopup_next_value.value = rb0_option;
	} else {
		
		if (temparray[3]== "1"){
			txtpopup_next_value.value = rb1_option;
		}
	}
	
	lblpopup_prev_value.innerHTML = "Previous Value. Effective: " + temparray[4];
	 txtpopup_prev_value.value = temparray[5];
	//Determine which rblist value to display
	if (temparray[5]== "0"){
		txtpopup_prev_value.value = rb0_option;
	} else {
		if (temparray[5]== "1"){
			txtpopup_prev_value.value = rb1_option;
		}
    }

	popup.style.top = popup_top + "px";
	popup.style.left = popup_left + "px";
	popup.style.visibility = "visible";
	$("#PPOvalues").hide();
	$("#brokerpopup").hide();
	
} // end function process

// **************************************

function show_std_popup_values(data) {
	//In data, return curr effdate, curr value, next effdate, next value, prev. effdate,
	//  prev. value  all separated by '$',
  
	var temparray = new Array();
	var tempval;
	
	var popup = document.getElementById("popup");
	var lblpopup_title = document.getElementById("lblpopup_title");
	var lblpopup_curr_value = document.getElementById("lblpopup_curr_value");
	var txtpopup_curr_value = document.getElementById("txtpopup_curr_value");
	var lblpopup_next_value = document.getElementById("lblpopup_next_value");
	var txtpopup_next_value = document.getElementById("txtpopup_next_value");
	var lblpopup_prev_value = document.getElementById("lblpopup_prev_value");
	var txtpopup_prev_value = document.getElementById("txtpopup_prev_value")
	
	temparray = data.split("|");
	
	if (temparray.length == 0){
		alert("Problem retrieving programs from ajaxRQ.aspx");
		return;
	}
	
	lblpopup_title.innerHTML = popup_title;
	lblpopup_curr_value.innerHTML = "Current Value. Effective: " + temparray[0];
	txtpopup_curr_value.value = temparray[1];
	lblpopup_next_value.innerHTML = "Next Value. Effective: " + temparray[2];
	txtpopup_next_value.value = temparray[3];
	lblpopup_prev_value.innerHTML = "Previous Value. Effective: " + temparray[4];
	txtpopup_prev_value.value = temparray[5];
	popup.style.top = popup_top + "px";
	popup.style.left = popup_left + "px";
	popup.style.visibility = "visible";
	$("#PPOvalues").hide();
	$("#brokerpopup").hide();
	
} // end function process

// **************************************

function store_contactinfo() {
	var contactinfo;
	var gv;
	var intgv;
	var introw;
	var row;
	var txt = "";
	
	var row_separator = "∞";
	var pair_separator = "Ω";
	var value_separator = "¥";
	
	
	//load each gv contact row after header into the hvcontacts hidden field
	for (intgv = 1;intgv < MAX_BROKERS + 1;intgv ++) {
		gv = document.getElementById("gvT6_Contactinfo_" + intgv);
		$("#hvcontacts_" + intgv).val("");
		txt = "";
		
		if (gv.rows.length > 1) {
			//Add each field in gv as a pair
			for (introw = 1;introw < gv.rows.length;introw ++) {
				row = gv.rows[introw];
				if (txt.length > 0) txt = txt + row_separator;
				
				txt = txt + "fname" + value_separator + row.cells[1].innerHTML + pair_separator;
				txt = txt + "lname" + value_separator + row.cells[2].innerHTML + pair_separator;
				txt = txt + "addr1" + value_separator + row.cells[3].innerHTML + pair_separator;
				txt = txt + "addr2" + value_separator + row.cells[4].innerHTML + pair_separator;
				txt = txt + "city" + value_separator + row.cells[5].innerHTML + pair_separator;
				txt = txt + "state" + value_separator + row.cells[6].innerHTML + pair_separator;
				txt = txt + "zip" + value_separator + row.cells[7].innerHTML + pair_separator;
				txt = txt + "tel" + value_separator + row.cells[8].innerHTML + pair_separator;
				txt = txt + "fax" + value_separator + row.cells[9].innerHTML + pair_separator;
				txt = txt + "email" + value_separator + row.cells[10].innerHTML + pair_separator;
				txt = txt + "effdate" + value_separator + row.cells[11].innerHTML + pair_separator;
				txt = txt + "comment" + value_separator + row.cells[12].innerHTML;
			}
			$("#hvcontacts_" + intgv).val(txt);
		}
		
	}
} //end function store_contactinfo

// **************************************

function store_ppodata() {
	var cellPPOdivloc;
	var cellPPOname;
	var rowPPOdivloc;
	var rowPPOname;
	var rownum = 0;
	var rowx;
	var stored_data = "";
	
	//Loop through all rows in gvT3_49 table after 1st and store in hvppodata using | as field separator
	//  and ^ as row separator
	 $("#gvT3_49 tr").each(function() {
		rowx = (this);
		rownum = rownum + 1;
		
		if (rownum > 1) {
			cellPPOname = $(rowx).find("td").eq(1); 
			rowPPOname = $(cellPPOname).html();
			rowPPOname = $.trim(rowPPOname);
			
			cellPPOdivloc =  $(rowx).find("td").eq(2);
			rowPPOdivloc = $(cellPPOdivloc).html();
			rowPPOdivloc = $.trim(rowPPOdivloc);
			
			//set hvppodata to nothing if 1st row is [none]
			if (rowPPOname != "[none]") {
				if (stored_data.length > 0) stored_data = stored_data + "^";
				stored_data = stored_data + rowPPOname + "|" + rowPPOdivloc;
			}
		}
	 });
	 
	 //put stored_data into hvppodata
		$("#hvppodata").val(stored_data);
}

// **************************************

function tab1_optional_texts() {
    //7/18/16 D.Maibor: add rbT1_70
	var btnT1_ShowNotes = document.getElementById("btnT1_ShowNotes");
	var btnT1_HideNotes = document.getElementById("btnT1_HideNotes");
	var btnUpdate = document.getElementById("btnUpdate"); 
	
	var ckcollectivebargaining = document.getElementById("ckT1_48");
	var ckHRA = document.getElementById("ckT1_46l");
	var ckHSA = document.getElementById("ckT1_46e");
	var ckSTD = document.getElementById("ckT1_46d");
	var ckothercoverage = document.getElementById("ckT1_46m");
	var planyr_other = document.getElementById("rbT1_9_2");
	var explain = document.getElementById("txtT1_36");
	var divexpirationdate = document.getElementById("divT1_48a");
	var expirationdate = document.getElementById("txtT1_48");
	var HRA_Group_Enrollment = document.getElementById("lblT1_46_Attachment");
	var HSAvendor = document.getElementById("txtT1_46e");
	var div_impl_meeting = document.getElementById("divT1_impl_meeting");
	var impl_meeting_no = document.getElementById("rbT1_65_1");
	var impl_meeting_na = document.getElementById("rbT1_65_2");
	var impl_meeting_yes = document.getElementById("rbT1_65_3");
	var impl_meeting_date = document.getElementById("txtT1_65");
	var other = document.getElementById("txtT1_9");
	var othercoverage = document.getElementById("txtT1_46m");
	var primary_co_address_same = document.getElementById("rbT1_64_1");
	var primary_co_address_other = document.getElementById("rbT1_64_2");
	var primary_co_address_1 = document.getElementById("Primary_Client_Address_1");
	var primary_co_address_2 = document.getElementById("Primary_Client_Address_2");
	var primary_co_address_3 = document.getElementById("Primary_Client_Address_3");
	var primary_co_address_addr1 = document.getElementById("txtT1_64a");
	var primary_co_address_city = document.getElementById("txtT1_64c");
	var primary_co_address_state = document.getElementById("txtT1_64d");
	var primary_co_address_zip = document.getElementById("txtT1_64e");
	var SG_no = document.getElementById("rbT1_36_2");
	var sob_yes = document.getElementById("rbT1_39_1");
	var sob_no = document.getElementById("rbT1_39_2");
	var SOBattachment = document.getElementById("lblT1_39_Attachment");
	var SOBcompleted = document.getElementById("txtT1_39");
	var state_reporting_for_APCD_yes = document.getElementById("rbT1_70_1");
	var state_reporting_for_APCD_no = document.getElementById("rbT1_70_2");
	var state_reporting_for_APCD_attachment = document.getElementById("lblT1_70_Attachment");
	var svsguarantee = document.getElementById("txtT1_36");
	var taxpercentage = document.getElementById("txtT1_46d");
	var T1Notes = document.getElementById("T1Notes");
	
	try {
		//Enable btnUpdate for all tabs except Broker Info & Attachments if not READ-ONLY user
		if (btnUpdate) {
			btnUpdate.disabled = false;
			$("#ckEmail").show();
			$("#lblEmail").show();
			$("#ckNoEmail").show();
			$("#lblNoEmail").show();
			if (hvtab == 12 || hvtab == 10) btnUpdate.disabled = true;
			if (hvtab == 6) {
				btnUpdate.disabled = true;
				$("#ckEmail").hide();
				$("#lblEmail").hide();
				$("#ckNoEmail").hide();
				$("#lblNoEmail").hide();
			}
		}

		//Hide all optional controls
		divexpirationdate.style.visibility = "hidden";
		explain.style.visibility = "hidden";
		HRA_Group_Enrollment.style.visibility = "hidden";
		HSAvendor.style.visibility = "hidden";
		other.style.visibility = "hidden";
		othercoverage.style.visibility = "hidden";
		SOBattachment.style.visibility = "hidden";
		SOBcompleted.style.visibility = "hidden";
		state_reporting_for_APCD_attachment.style.visibility = "hidden";
		taxpercentage.style.visibility = "hidden";
		primary_co_address_1.style.visibility = "hidden";
		primary_co_address_2.style.visibility = "hidden";
		primary_co_address_3.style.visibility = "hidden";
		div_impl_meeting.style.visibility = "hidden";

		//Hide Note buttons/text
		btnT1_HideNotes.style.visibility = "hidden";
		btnT1_ShowNotes.style.visibility = "hidden";
		T1Notes.style.visibility = "hidden";

		//Hide rpt pop-ups
		show_rptrecipientinfo(false);
		show_rptemail_list(false);

		//Exit if tab1 is not selected
		if (hvtab != 1) return;

		btnT1_ShowNotes.style.visibility = "visible";

		//Review item 9
		if (planyr_other.checked) {
			other.style.visibility = "visible";
			if (other.value.length > 0) {
				other.className = "transparent";
			}
			else {
				other.className = "highlight";
			}
		}

		//Review item 36
		if (SG_no.checked) {
			explain.style.visibility = "visible";
			if (explain.value.length > 0) {
				explain.className = "transparent";
			}
			else {
				explain.className = "highlight";
			}
		}

		//Review item 39
		if (sob_yes.checked) {
			SOBattachment.style.visibility = "visible";
			attachment_grid_change(1, 56, "A", "GROUP INFO", "SOB");
		}

		if (sob_no.checked) {
			SOBcompleted.style.visibility = "visible";
			if (SOBcompleted.value.length > 0) {
				SOBcompleted.className = "transparent";
			}
			else {
				SOBcompleted.className = "highlight";
			}
			attachment_grid_change(1, 56, "R", "", "");
		}

		//Review item 46d
		if (ckSTD.checked) {
			taxpercentage.style.visibility = "visible";
			if (taxpercentage.value.length > 0) {
				taxpercentage.className = "transparent";
			}
			else {
				taxpercentage.className = "highlight";
			}
		}

		//Review item 46e
		if (ckHSA.checked) {
			HSAvendor.style.visibility = "visible";
			if (HSAvendor.value.length > 0) {
				HSAvendor.className = "transparent";
			}
			else {
				HSAvendor.className = "highlight";
			}
		}

		//Review item 46l
		if (ckHRA.checked) {
			HRA_Group_Enrollment.style.visibility = "visible";
			attachment_grid_change(1, 64, 'A', "GROUP INFO", "HRA Group Enrollment Form");
		}
		else {
			attachment_grid_change(1, 64, "R", "", "");
		}

		//Review item 46m
		if (ckothercoverage.checked) {
			othercoverage.style.visibility = "visible";
			if (othercoverage.value.length > 0) {
				othercoverage.className = "transparent";
			}
			else {
				othercoverage.className = "highlight";
			}
		}

		//Review item 48
		if (ckcollectivebargaining.checked) {
			divexpirationdate.style.visibility = "visible";
			if (expirationdate.value.length > 0) {
				expirationdate.className = "transparent";
			}
			else {
				expirationdate.className = "highlight";
			}
		}

		//Review item 64
        if (primary_co_address_other.checked) {
            primary_co_address_1.style.visibility = "visible";
            primary_co_address_2.style.visibility = "visible";
            primary_co_address_3.style.visibility = "visible";
            if (primary_co_address_addr1.value.length > 0) {
                primary_co_address_addr1.className = "transparent";
            }
            else {
                primary_co_address_addr1.className = "highlight";
            }

            if (primary_co_address_city.value.length > 0) {
                primary_co_address_city.className = "transparent";
            }
            else {
                primary_co_address_city.className = "highlight";
            }

            if (primary_co_address_state.value.length > 0) {
                primary_co_address_state.className = "transparent";
            }
            else {
                primary_co_address_state.className = "highlight";
            }

            if (primary_co_address_zip.value.length > 0) {
                primary_co_address_zip.className = "transparent";
            }
            else {
                primary_co_address_zip.className = "highlight";
            }
        }

		//Review item 65
		if (impl_meeting_no.checked) div_impl_meeting.style.visibility = "hidden";
		if (impl_meeting_na.checked) div_impl_meeting.style.visibility = "hidden";
		if (impl_meeting_yes.checked) {
			div_impl_meeting.style.visibility = "visible";
			if (impl_meeting_date.value.length > 0) {
				impl_meeting_date.className = "transparent";
			}
			else {
				impl_meeting_date.className = "highlight";
			}
		}
		
	} // end try
	catch (errorObject) {
		alert("In tab1_optional_texts, the following error occurred: " + errorObject.description);
		return false;
}

//Review item 70
if (state_reporting_for_APCD_yes.checked) {
    state_reporting_for_APCD_attachment.style.visibility = "visible";
    attachment_grid_change(1, 70, "A", "GROUP INFO", "Signed Form");
}

if (state_reporting_for_APCD_no.checked) {
    state_reporting_for_APCD_attachment.style.visibility = "hidden";
}

   
} //end function tab1_optional_texts 

// **************************************

function tab1_Update_Total() {
	var tab11_total = document.getElementById("txtT11_total");
	var tab1_total = document.getElementById("txtT1_45");
	
	if (tab1_total.value != tab11_total.value) tab1_total.value = tab11_total.value;
}

// **************************************

function tab2_Update_PBM() {
	var tab11_PBM = document.getElementById("txtT11_PBM_vendor");
	var tab2_PBM = document.getElementById("txtT2_18");
	
	if (tab2_PBM.value != tab11_PBM.value) tab2_PBM.value = tab11_PBM.value;
}

// **************************************

function tab2_Update_Plans(tab2val,tab11val) {
	//Update tab2 plan values with changed tab11 values

try {   
	var tab2textbox;
	var tab2rb;
	var tab11textbox;
	var tab11rb;
	
	tab11textbox = document.getElementById("txtT11_" + tab11val);
	tab2textbox = document.getElementById("txtT2_" + tab2val);
	tab2textbox.value = tab11textbox.value;
		
	tab11rb = document.getElementById("rbT11_" + tab11val + "_1")
	tab2rb = document.getElementById("rbT2_" + tab2val + "_1")
	tab2rb.checked = tab11rb.checked;
		
	tab11rb = document.getElementById("rbT11_" + tab11val + "_2")
	tab2rb = document.getElementById("rbT2_" + tab2val + "_2")
	tab2rb.checked = tab11rb.checked;
		
} //end Try
catch(errorObject) {
	alert("In tab2_Update_Plans, the following error occurred: " + errorObject.description + "intval: " + intval);
}        
	
} //end function tab2_Update_Plans

// **************************************

function tab11_Update_PBM() {
	var tab11_PBM = document.getElementById("txtT11_PBM_vendor");
	var tab2_PBM = document.getElementById("txtT2_18");
	
	if (tab11_PBM.value != tab2_PBM.value) tab11_PBM.value = tab2_PBM.value;
}

// **************************************
function tab11_Update_Total() {
	var tab11_total = document.getElementById("txtT11_total");
	var tab1_total = document.getElementById("txtT1_45");
	
	if (tab11_total.value != tab1_total.value) tab11_total.value = tab1_total.value;
}

// **************************************
function tab11_Update_Plans(tab2val,tab11val) {
try {
	//Update tab11 plan values with changed tab2 values
	var tab2textbox;
	var tab2rb;
	var tab11textbox;
	var tab11rb;
	
	tab2textbox = document.getElementById("txtT2_" + tab2val);
	tab11textbox = document.getElementById("txtT11_" + tab11val);
	tab11textbox.value = tab2textbox.value;
		
	tab2rb = document.getElementById("rbT2_" + tab2val + "_1")
	tab11rb = document.getElementById("rbT11_" + tab11val + "_1")
	tab11rb.checked = tab2rb.checked;
		
	tab2rb = document.getElementById("rbT2_" + tab2val + "_2")
	tab11rb = document.getElementById("rbT11_" + tab11val + "_2")
	tab11rb.checked = tab2rb.checked;    
} //end Try
catch(errorObject) {
	alert("In tab11_Update_Plans, the following error occurred: " + errorObject.description + "intval: " + intval);
}  
} //end function tab11_Update_Plans

// **************************************
function tab11_set_controls(col, action) {
	// col: current or renewal
    // action: enable or disable
 //5/17/16 D.Maibor: add ckT11_19, txtT11_19
 //5/22/15 D.Maibor: add T11_175, MGU 
 // 4/14/15 D.Maibor: exclude rbT11_32, Accordant: no changes allowed after 4/1/15
	var ctrl;
	var disable_ctrl = true;
	var intval; 

	if (action == "enable") disable_ctrl = false;
	
	//Section Notes
	ctrl = $("#txtT11_Setup_note_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}
		
	ctrl = $("#txtT11_PEPM_Note_" + col);
	if (action =="enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}
	
	ctrl = $("#txtT11_Flex_Note_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_Wellness_Note_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_HMS_Note_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_Accordant_Note_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_MedWatch_Note_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_Sub_Note_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_PPO_Note_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_Anc_Note_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}
	
	ctrl = $("#txtT11_Reins_Note_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_Broker_Note_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}
	
	ctrl = $("#txtT11_Cobra_Note_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_Disability_Note_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	//PPO fees
	for (intval = 1; intval < 14; intval++) {
		ctrl = $("#txtT11_PPO_" + intval + "_" + col);
		if (ctrl != null) {
			if (action == "enable") {
				$(ctrl).removeAttr("disabled");
			} else {
				$(ctrl).attr("disabled", true);
			}
		}
	}

	//Ctrls 1-3
	for (intval = 1; intval < 4; intval++) {
		//O
		ctrl = $("#txtT11_" + intval + "_" + col + "_to_HPI");
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}

		ctrl = $("#txtT11_" + intval + "_" + col + "_to_Broker");
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}

		ctrl = $("#ckT11_" + intval + "_" + col);
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}

		ctrl = $("#txtT11_" + intval + "_Bk1_" + col);
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}

		ctrl = $("#txtT11_" + intval + "_Bk2_" + col);
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}

		ctrl = $("#txtT11_" + intval + "_Bk3_" + col);
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}

		ctrl = $("#txtT11_" + intval + "_Bk4_" + col);
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}

		ctrl = $("#txtT11_" + intval + "_Bk5_col");
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}
	}

	//Ctrl 4
	ctrl = $("#txtT11_4_" + col + "_to_HPI");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_4_" + col + "_to_Broker");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#ckT11_4_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_4_Bk1_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_4_Bk2_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_4_Bk3_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_4_Bk4_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_4_Bk5_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	//Ctrl 5
	ctrl = $("#ddlT11_5_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_5_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}


	//Ctrls 6-24
	for (intval = 6; intval < 25; intval++) {
		ctrl = $("#txtT11_" + intval + "_" + col +  "_to_HPI");
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}

		ctrl = $("#txtT11_" + intval + "_" + col + "_to_Broker");
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}

		ctrl = $("#ckT11_" + intval + "_" + col);
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}

		ctrl = $("#txtT11_" + intval + "_Bk1_" + col);
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}

		ctrl = $("#txtT11_" + intval + "_Bk2_" + col);
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}

		ctrl = $("#txtT11_" + intval + "_Bk3_" + col);
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}

		ctrl = $("#txtT11_" + intval + "_Bk4_" + col);
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}

		ctrl = $("#txtT11_" + intval + "_Bk5_" + col);
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}
	}

	//Ctrl 13-14 other current controls 
	ctrl = $("#ckT11_13_other_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_13_other_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#ckT11_14_other_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_14_other_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

    //Ctrl ckT11_19, txtT11_19. Enable if either modify rb is ck'd
    ctrl = $("#ckT11_19");
    $(ctrl).attr("disabled", true);
    if ($("#rbT11_modify_1").is(":checked") || $("#rbT11_modify_2").is(":checked")) $(ctrl).removeAttr("disabled");

    ctrl = $("#txtT11_19");
    $(ctrl).attr("disabled", true);
    if ($("#rbT11_modify_1").is(":checked") || $("#rbT11_modify_2").is(":checked")) $(ctrl).removeAttr("disabled");

	//Ctrls 25
	ctrl = $("#rbT11_25_" + col + "_1");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}
	ctrl = $("#rbT11_25_" + col + "_2");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_25_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	//Ctrls 26-28
	for (intval = 26; intval < 29; intval++) {
		ctrl = $("#txtT11_" + intval + "_" + col + "_to_HPI");
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}
}

    //Ctrls rb 27
for (intval = 1; intval < 4; intval++) {
        //rbT11_27_current_1
        ctrl = $("#rbT11_27_" + col + "_" + intval);
        if (action == "enable") {
            $(ctrl).removeAttr("disabled");
        } else {
            $(ctrl).attr("disabled", true);
        }
    }

	//Ctrls 29-31
	for (intval = 29; intval < 32; intval++) {
		ctrl = $("#ckT11_" + intval + "_" + col);
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}
	}

	//Ctrls 34-35
	for (intval = 34; intval < 36; intval++) {
		ctrl = $("#txtT11_" + intval + "_" + col + "_to_HPI");
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}

		ctrl = $("#txtT11_" + intval + "_" + col + "_to_Vendor");
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}
	}

	//Ctrl 49
	ctrl = $("#rbT11_49_" + col + "_1");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#rbT11_49_" + col + "_2");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

    //Ctrl 50, Prior Carrier, only for current
	if (col == "current") {
	    ctrl = $("#txtT11_50_current");
	    if (action == "enable") {
	        $(ctrl).removeAttr("disabled");
	    } else {
	        $(ctrl).attr("disabled", true);
	    }
	}
    
    //Ctrl 51
    ctrl = $("#txtT11_51_" + col);
    if (action == "enable") {
        $(ctrl).removeAttr("disabled");
    } else {
        $(ctrl).attr("disabled", true);
    }

    //Ctrl 52
	ctrl = $("#rbT11_52_" + col + "_1");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#rbT11_52_" + col + "_2");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	//Ctrl 53
	ctrl = $("#ckT11_53a_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#ckT11_53b_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#ckT11_53c_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#ckT11_53d_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#ckT11_53e_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_53_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	//Ctrl 54
	ctrl = $("#txtT11_54_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	//Ctrl 55
	ctrl = $("#rbT11_55_" + col + "_1");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#rbT11_55_" + col + "_2");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#ckT11_55_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	//Ctrls 56-62
	for (intval = 56; intval < 63; intval++) {
		ctrl = $("#txtT11_" + intval + "_" + col);
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}
	}

	//Ctrl 63
	ctrl = $("#rbT11_63_" + col + "_1");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#rbT11_63_" + col + "_2");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#rbT11_63_" + col + "_3");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_63_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	//Ctrl 64
	ctrl = $("#rbT11_64_" + col + "_1");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#rbT11_64_" + col + "_2");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	//Ctrl 65
	ctrl = $("#ckT11_65a_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#ckT11_65b_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#ckT11_65c_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#ckT11_65d_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#ckT11_65e_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_65_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	//Ctrl 66
	ctrl = $("#txtT11_66_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

//Ctrl 67
	ctrl = $("#rbT11_67_" + col + "_1");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#rbT11_67_" + col + "_2");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_67_PEPM_" + col + "_med");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_67_PEPM_" + col + "_den");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_67_Annual_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#ckT11_67_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_67_Other_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	//Ctrl 68
	ctrl = $("#txtT11_68_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	//Ctrl 69
	ctrl = $("#rbT11_69_" + col + "_1");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#rbT11_69_" + col + "_2");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	//Ctrls 70-90
	for (intval = 70; intval < 91; intval++) {
		ctrl = $("#txtT11_" + intval + "_" + col);
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}
	}

	//Ctrl 91
	ctrl = $("#rbT11_91_" + col + "_1");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#rbT11_91_" + col + "_2");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	//Ctrls 92-94
	for (intval = 92; intval < 95; intval++) {
		ctrl = $("#txtT11_" + intval + "_" + col);
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}
	}

	//Ctrl 95
	ctrl = $("#rbT11_95_" + col + "_1");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}
	ctrl = $("#rbT11_95_" + col + "_2");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	//Ctrls 96-98
	for (intval = 96; intval < 99; intval++) {
		ctrl = $("#txtT11_" + intval + "_" + col);
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}
	}

	//Ctrls 99-103
	for (intval = 99; intval < 104; intval++) {
		ctrl = $("#txtT11_" + intval + "_" + col + "_1");
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}

		ctrl = $("#txtT11_" + intval + "_" + col + "_2");
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}

		ctrl = $("#txtT11_" + intval + "_" + col + "_3");
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}

		ctrl = $("#txtT11_" + intval + "_" + col + "_4");
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}
	}

	//Ctrl 104
	ctrl = $("#rbT11_104_" + col + "_1");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#rbT11_104_" + col + "_2");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_104_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	//Ctrl 105
	ctrl = $("#txtT11_105a_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_105b_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_105c_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_105d_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_105e_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}


	//Ctrl 106-141
	for (intval = 106; intval < 142; intval++) {
		ctrl = $("#txtT11_" + intval + "_" + col + "_1");
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}

		ctrl = $("#txtT11_" + intval + "_" + col + "_2");
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}

		ctrl = $("#txtT11_" + intval + "_" + col + "_3");
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}

		ctrl = $("#txtT11_" + intval + "_" + col + "_4");
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}
	}

	//Ctrl 142
	ctrl = $("#rbT11_142_" + col + "_1");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#rbT11_142_" + col + "_2");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	for (intval = 1; intval < 6; intval++) {
		ctrl = $("#txtT11_142_" + col + "_" + intval);
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}
	}

	//Ctrl 143
	ctrl = $("#txtT11_143_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	//Plan controls 144-148
	ctrl = $("#txtT11_144");
	if (action == "enable" && col == "current") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#rbT11_144_1");
	if (action == "enable" && col == "current") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#rbT11_144_2");
	if (action == "enable" && col == "current") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_145");
	if (action == "enable" && col == "current") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#rbT11_145_1");
	if (action == "enable" && col == "current") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#rbT11_145_2");
	if (action == "enable" && col == "current") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_146");
	if (action == "enable" && col == "current") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#rbT11_146_1");
	if (action == "enable" && col == "current") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#rbT11_146_2");
	if (action == "enable" && col == "current") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_147");
	if (action == "enable" && col == "current") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#rbT11_147_1");
	if (action == "enable" && col == "current") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#rbT11_147_2");
	if (action == "enable" && col == "current") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_148");
	if (action == "enable" && col == "current") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#rbT11_148_1");
	if (action == "enable" && col == "current") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#rbT11_148_2");
	if (action == "enable" && col == "current") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	//Ctrl144
	ctrl = $("#rbT11_144_" + col + "_1");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#rbT11_144_" + col + "_2");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_144_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	//Ctrl145
	ctrl = $("#rbT11_145_" + col + "_1");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#rbT11_145_" + col + "_2");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_145_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	//Ctrl 146
	ctrl = $("#txtT11_146_" + col + "_to_HPI");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_146_" + col + "_to_Broker");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#ckT11_146_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_146_Bk1_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_146_Bk2_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_146_Bk3_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_146_Bk4_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_146_Bk5_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	//Ctrl 147
	ctrl = $("#txtT11_147_" + col + "_to_HPI");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_147_" + col + "_to_Broker");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#ckT11_147_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_147_Bk1_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_147_Bk2_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_147_Bk3_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_147_Bk4_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_147_Bk5_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	//Ctrl 149
	ctrl = $("#rbT11_149_" + col + "_1");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#rbT11_149_" + col + "_2");
	ctrl.disabled = disable_action;if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_149_" + col);
	ctrl.disabled = disable_action;if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#ddlWellness_option_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	//Ctrl 150
	ctrl = $("#txtT11_150_" + col + "_to_HPI");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_150_" + col + "_to_Broker");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#ckT11_150_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_150_Bk1_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_150_Bk2_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_150_Bk3_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_150_Bk4_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_150_Bk5_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	//Ctrl 164
	ctrl = $("#txtT11_164_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	//Ctrl 165
	ctrl = $("#txtT11_165_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

   //Ctrls 166-168
	for (intval = 166; intval < 169; intval++) {
		ctrl = $("#rbT11_" + intval + "_" + col + "_1");
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}

		ctrl = $("#rbT11_" + intval + "_" + col + "_2");
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}

		ctrl = $("#rbT11_" + intval + "_" + col + "_3");
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}

		ctrl = $("#txtT11_" + intval + "_" + col);
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}

	}

	//Ctrl 169
	ctrl = document.getElementById("txtT11_169_" + col);
	if (ctrl != null) {
		if (action == "enable") {
			$(ctrl).removeAttr("disabled");
		} else {
			$(ctrl).attr("disabled", true);
		}
	}

	//Ctrl 170
	ctrl = document.getElementById("txtT11_170_" + col + "_to_HPI");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = document.getElementById("txtT11_170_" + col + "_to_Broker");
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}


	ctrl = document.getElementById("ckT11_170_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = document.getElementById("txtT11_170_Bk1_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = document.getElementById("txtT11_170_Bk2_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = document.getElementById("txtT11_170_Bk3_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = document.getElementById("txtT11_170_Bk4_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	ctrl = document.getElementById("txtT11_170_Bk5_" + col);
	if (action == "enable") {
		$(ctrl).removeAttr("disabled");
	} else {
		$(ctrl).attr("disabled", true);
	}

	for (intval = 1; intval < 4; intval++) {
	    ctrl = document.getElementById("rbT11_171_" + col + "_" + intval);
	    if (action == "enable") {
	        $(ctrl).removeAttr("disabled");
	    } else {
	        $(ctrl).attr("disabled", true);
	    }
	}
	
	ctrl = document.getElementById("txtT11_171_" + col);
	if (action == "enable") {
	    $(ctrl).removeAttr("disabled");
	} else {
	    $(ctrl).attr("disabled", true);
	}

	// TW 04/28/2016 BEGIN Added for IT # 923
	// ddlT11_171
	ctrl = $("#ddlT11_171_" + col);
	if (action == "enable") {
	    $(ctrl).removeAttr("disabled");
	} else {
	    $(ctrl).attr("disabled", true);
	}
	// TW 04/28/2016 *END* Added for IT # 923

	ctrl = document.getElementById("txtT11_172_" + col);
	if (action == "enable") {
	    $(ctrl).removeAttr("disabled");
	} else {
	    $(ctrl).attr("disabled", true);
	}

	ctrl = document.getElementById("txtT11_173_" + col);
	if (action == "enable") {
	    $(ctrl).removeAttr("disabled");
	} else {
	    $(ctrl).attr("disabled", true);
	}

	ctrl = $("#rbT11_174_" + col + "_1");
	if (action == "enable") {
	    $(ctrl).removeAttr("disabled");
	} else {
	    $(ctrl).attr("disabled", true);
	}

	ctrl = $("#rbT11_174_" + col + "_2");
	if (action == "enable") {
	    $(ctrl).removeAttr("disabled");
	} else {
	    $(ctrl).attr("disabled", true);
	}

	ctrl = $("#rbT11_174_" + col + "_3");
	if (action == "enable") {
	    $(ctrl).removeAttr("disabled");
	} else {
	    $(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_174_" + col);
	if (action == "enable") {
	    $(ctrl).removeAttr("disabled");
	} else {
	    $(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_175_" + col);
	if (action == "enable") {
	    $(ctrl).removeAttr("disabled");
	} else {
	    $(ctrl).attr("disabled", true);
	}

	for (intval = 1; intval < 3; intval++) {
	    ctrl = document.getElementById("rbT11_176_" + col + "_" + intval);
	    if (action == "enable") {
	        $(ctrl).removeAttr("disabled");
	    } else {
	        $(ctrl).attr("disabled", true);
	    }
	}

	for (intval = 1; intval < 3; intval++) {
	    ctrl = document.getElementById("rbT11_176a_" + col + "_" + intval);
	    if (action == "enable") {
	        $(ctrl).removeAttr("disabled");
	    } else {
	        $(ctrl).attr("disabled", true);
	    }
	}

    // TW Added 1/25/2016
	for (intval = 1; intval < 3; intval++) {
	    ctrl = document.getElementById("rbT11_176a1_" + col + "_" + intval);
	    if (action == "enable") {
	        $(ctrl).removeAttr("disabled");
	    } else {
	        $(ctrl).attr("disabled", true);
	    }
	}

	ctrl = $("#txtT11_176a_" + col);
	if (action == "enable") {
	    $(ctrl).removeAttr("disabled");
	} else {
	    $(ctrl).attr("disabled", true);
	}

	for (intval = 1; intval < 5; intval++) {
	    ctrl = document.getElementById("rbT11_176b_" + col + "_" + intval);
	    if (action == "enable") {
	        $(ctrl).removeAttr("disabled");
	    } else {
	        $(ctrl).attr("disabled", true);
	    }
	}

	ctrl = $("#txtT11_176b_" + col + "_2");
	if (action == "enable") {
	    $(ctrl).removeAttr("disabled");
	} else {
	    $(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_176b1_" + col + "_2");
	if (action == "enable") {
	    $(ctrl).removeAttr("disabled");
	} else {
	    $(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_176b_" + col + "_3");
	if (action == "enable") {
	    $(ctrl).removeAttr("disabled");
	} else {
	    $(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_176b1_" + col + "_3");
	if (action == "enable") {
	    $(ctrl).removeAttr("disabled");
	} else {
	    $(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_176b2_" + col + "_3");
	if (action == "enable") {
	    $(ctrl).removeAttr("disabled");
	} else {
	    $(ctrl).attr("disabled", true);
	}

	ctrl = $("#txtT11_176b2_" + col + "_4");
	if (action == "enable") {
	    $(ctrl).removeAttr("disabled");
	} else {
	    $(ctrl).attr("disabled", true);
	}

	// TW 04/28/2016 BEGIN Added for IT # 923
	// rbT11_177
	for (intval = 1; intval < 4; intval++) {
	    ctrl = document.getElementById("rbT11_177_" + col + "_" + intval);
	    if (action == "enable") {
	        $(ctrl).removeAttr("disabled");
	    } else {
	        $(ctrl).attr("disabled", true);
	    }
	}
	// txtT11_177
	ctrl = document.getElementById("txtT11_177_" + col);
	if (action == "enable") {
	    $(ctrl).removeAttr("disabled");
	} else {
	    $(ctrl).attr("disabled", true);
	}
    ///////////////////////////////////////
	// txtT11_TrslTree_Note
	ctrl = $("#txtT11_TreslTree_Note_" + col);
	if (action == "enable") {
	    $(ctrl).removeAttr("disabled");
	} else {
	    $(ctrl).attr("disabled", true);
	}
	///////////////////////////////////////
	// rbT11_178
	for (intval = 1; intval < 4; intval++) {
	    ctrl = document.getElementById("rbT11_178_" + col + "_" + intval);
	    if (action == "enable") {
	        $(ctrl).removeAttr("disabled");
	    } else {
	        $(ctrl).attr("disabled", true);
	    }
	}
	// rbT11_178a
	for (intval = 1; intval < 3; intval++) {
	    ctrl = document.getElementById("rbT11_178a_" + col + "_" + intval);
	    if (action == "enable") {
	        $(ctrl).removeAttr("disabled");
	    } else {
	        $(ctrl).attr("disabled", true);
	    }
	}
	// txtT11_178
	ctrl = document.getElementById("txtT11_178_" + col);
	if (action == "enable") {
	    $(ctrl).removeAttr("disabled");
	} else {
	    $(ctrl).attr("disabled", true);
	}
	// ckT11_178
	ctrl = $("#ckT11_178_" + col);
	if (action == "enable") {
	    $(ctrl).removeAttr("disabled");
	} else {
	    $(ctrl).attr("disabled", true);
	}
	///////////////////////////////////////
	// rbT11_179
	for (intval = 1; intval < 4; intval++) {
	    ctrl = document.getElementById("rbT11_179_" + col + "_" + intval);
	    if (action == "enable") {
	        $(ctrl).removeAttr("disabled");
	    } else {
	        $(ctrl).attr("disabled", true);
	    }
	}
	// rbT11_179a
	for (intval = 1; intval < 3; intval++) {
	    ctrl = document.getElementById("rbT11_179a_" + col + "_" + intval);
	    if (action == "enable") {
	        $(ctrl).removeAttr("disabled");
	    } else {
	        $(ctrl).attr("disabled", true);
	    }
	}
	// txtT11_179
	ctrl = document.getElementById("txtT11_179_" + col);
	if (action == "enable") {
	    $(ctrl).removeAttr("disabled");
	} else {
	    $(ctrl).attr("disabled", true);
	}
	// ckT11_179
	ctrl = $("#ckT11_179_" + col);
	if (action == "enable") {
	    $(ctrl).removeAttr("disabled");
	} else {
	    $(ctrl).attr("disabled", true);
	}
	///////////////////////////////////////
	// rbT11_180
	for (intval = 1; intval < 4; intval++) {
	    ctrl = document.getElementById("rbT11_180_" + col + "_" + intval);
	    if (action == "enable") {
	        $(ctrl).removeAttr("disabled");
	    } else {
	        $(ctrl).attr("disabled", true);
	    }
	}
	// txtT11_180
	ctrl = document.getElementById("txtT11_180_" + col);
	if (action == "enable") {
	    $(ctrl).removeAttr("disabled");
	} else {
	    $(ctrl).attr("disabled", true);
	}
	// ckT11_180
	ctrl = $("#ckT11_180_" + col);
	if (action == "enable") {
	    $(ctrl).removeAttr("disabled");
	} else {
	    $(ctrl).attr("disabled", true);
	}
	///////////////////////////////////////
	// rbT11_181
	for (intval = 1; intval < 4; intval++) {
	    ctrl = document.getElementById("rbT11_181_" + col + "_" + intval);
	    if (action == "enable") {
	        $(ctrl).removeAttr("disabled");
	    } else {
	        $(ctrl).attr("disabled", true);
	    }
	}
	// txtT11_181
	ctrl = document.getElementById("txtT11_181_" + col);
	if (action == "enable") {
	    $(ctrl).removeAttr("disabled");
	} else {
	    $(ctrl).attr("disabled", true);
	}
	// ckT11_181
	ctrl = $("#ckT11_181_" + col);
	if (action == "enable") {
	    $(ctrl).removeAttr("disabled");
	} else {
	    $(ctrl).attr("disabled", true);
	}
	// TW 04/28/2016 *END* Added for IT # 923

}  //end function tab11_set_controls

// **************************************

function tab11_optional_texts() {
//7/6/16 D.Maibor: add rb's for Complex CM Fees, #27
//8/10/15 D.Maibor: add EatRight Rewards controls, #176
//4/27/15 D.Maibor: add rbT11_174 US Med. Diabetic Monitoring 
//3/6/15 D.Maibor: add rbT11_171 Medwatch Steps2Health
//1/27/15 D.Maibor: hide/show rbT11_modify buttons based on where effdates displayed
//11/6/14 D.Maibor: add Flex set up fee code to handle historical data. Hide main buttons
// 10/7/14 D.Maibor: remove old PPO fee controls and Flex set up controls

try {    
	var ck_run_in_fee_split_current = document.getElementById("ckT11_1_current");
	var ck_general_setup_fee_split_current = document.getElementById("ckT11_2_current");
	var ck_flex_setup_fee_split_current = document.getElementById("ckT11_3_current"); ;
	var ck_flex_setup_fee_split_renewal = document.getElementById("ckT11_3_renewal"); ;
	var ck_hra_setup_fee_split_current = document.getElementById("ckT11_4_current");
	var ck_hra_setup_fee_split_renewal = document.getElementById("ckT11_4_renewal");
	var ck_med_annual_fee_split_current = document.getElementById("ckT11_6_current");
	var ck_med_annual_fee_split_renewal = document.getElementById("ckT11_6_renewal");
	var ck_den_annual_fee_split_current = document.getElementById("ckT11_7_current");
	var ck_den_annual_fee_split_renewal = document.getElementById("ckT11_7_renewal");
	var ck_flex_annual_fee_split_current = document.getElementById("ckT11_8_current");
	var ck_flex_annual_fee_split_renewal = document.getElementById("ckT11_8_renewal");
	
	var ck_hra_annual_fee_split_current = document.getElementById("ckT11_9_current");
	var ck_hra_annual_fee_split_renewal = document.getElementById("ckT11_9_renewal");
	var ck_medrx_admin_fee_split_current = document.getElementById("ckT11_10_current");
	var ck_medrx_admin_fee_split_renewal = document.getElementById("ckT11_10_renewal");
	var ck_remit_prem_current = document.getElementById("ckT11_67_current");
	var ck_remit_prem_renewal = document.getElementById("ckT11_67_renewal");
	
	var ck_std_maint_fee_split_current = document.getElementById("ckT11_146_current");
	var ck_std_maint_fee_split_renewal = document.getElementById("ckT11_146_renewal");
	
	var ck_vision_fee_split_current = document.getElementById("ckT11_11_current");
	var ck_vision_fee_split_renewal = document.getElementById("ckT11_11_renewal");
	var ck_den_admin_fee_split_current = document.getElementById("ckT11_12_current");
	var ck_den_admin_fee_split_renewal = document.getElementById("ckT11_12_renewal");
	var ck_cobra_fee_split_current = document.getElementById("ckT11_13_current");
	var ck_cobra_fee_split_renewal = document.getElementById("ckT11_13_renewal");
	
	var ck_cobra_fee_other_current = document.getElementById("ckT11_13_other_current");
	var ck_cobra_fee_other_renewal = document.getElementById("ckT11_13_other_renewal");
	
	var ck_HIPAA_fee_split_current = document.getElementById("ckT11_14_current");
	var ck_HIPAA_fee_split_renewal = document.getElementById("ckT11_14_renewal");
	
	var ck_HIPAA_fee_other_current = document.getElementById("ckT11_14_other_current");
	var ck_HIPAA_fee_other_renewal = document.getElementById("ckT11_14_other_renewal");
	
	var ck_STD_fee_split_current = document.getElementById("ckT11_15_current");
	var ck_STD_fee_split_renewal = document.getElementById("ckT11_15_renewal");
	var ck_LTD_fee_split_current = document.getElementById("ckT11_16_current");
	var ck_LTD_fee_split_renewal = document.getElementById("ckT11_16_renewal");
	
	var ck_Life_ADD_admin_fee_split_current = document.getElementById("ckT11_147_current");
	var ck_Life_ADD_admin_fee_split_renewal = document.getElementById("ckT11_147_renewal");
	
	var ck_RN_fee_split_current = document.getElementById("ckT11_17_current");
	var ck_RN_fee_split_renewal = document.getElementById("ckT11_17_renewal");
	var ck_nurse_fee_split_current = document.getElementById("ckT11_18_current");
	var ck_nurse_fee_split_renewal = document.getElementById("ckT11_18_renewal");
	var ck_other_fee_split_current = document.getElementById("ckT11_19_current");
	var ck_other_fee_split_renewal = document.getElementById("ckT11_19_renewal");
	var ck_med_reimbursement_split_current = document.getElementById("ckT11_20_current");
	var ck_med_reimbursement_split_renewal = document.getElementById("ckT11_20_renewal");
	var ck_depcare_reimbursement_split_current = document.getElementById("ckT11_21_current");
	var ck_depcare_reimbursement_split_renewal = document.getElementById("ckT11_21_renewal");
	var ck_transportation_fee_split_current = document.getElementById("ckT11_22_current");
	var ck_transportation_fee_split_renewal = document.getElementById("ckT11_22_renewal");
	var ck_depmedcare_fee_split_current = document.getElementById("ckT11_23_current");
	var ck_depmedcare_fee_split_renewal = document.getElementById("ckT11_23_renewal");
	var ck_hra_fee_split_current = document.getElementById("ckT11_150_current");
	var ck_hra_fee_split_renewal = document.getElementById("ckT11_150_renewal");
	var ck_hsa_fee_split_current = document.getElementById("ckT11_170_current");
	var ck_hsa_fee_split_renewal = document.getElementById("ckT11_170_renewal");
	var ck_debitcard_fee_split_current = document.getElementById("ckT11_24_current");
	var ck_debitcard_fee_split_renewal = document.getElementById("ckT11_24_renewal");
	
	var ck_aggregate_rates_other_current = document.getElementById("ckT11_65e_current");
	var ck_aggregate_rates_other_renewal = document.getElementById("ckT11_65e_renewal");
	var ck_current_controls = document.getElementById("ckT11_modify_current_values");
	var ck_PEPM_other = document.getElementById("ckT11_19");
	var ck_specific_rates_other_current = document.getElementById("ckT11_53e_current");
	var ck_specific_rates_other_renewal = document.getElementById("ckT11_53e_renewal");
	
	var ctrl;
   
	var ddl_HRA_other_current = document.getElementById("ddlT11_5_current");
	var ddl_HRA_other_renewal = document.getElementById("ddlT11_5_renewal");
	
	var div_Aggregate_rates_apply_current = document.getElementById("divT11_145a_current");
	var div_Aggregate_rates_apply_renewal = document.getElementById("divT11_145a_renewal");
	var div_ClientAddress_current = document.getElementById("clientaddress_current");
	var div_ClientAddress_label = document.getElementById("clientaddress_label");
	var div_ClientAddress_renewal = document.getElementById("clientaddress_renewal");
	
	var div_Cobra_fee_split = document.getElementById("divT11_13");
	var div_Cobra_fee_split_current = document.getElementById("divT11_13_current");
	var div_Cobra_fee_split_renewal = document.getElementById("divT11_13_renewal");
	
	var div_Cobra_fee_other_current = document.getElementById("divT11_13_other_current");
	var div_Cobra_fee_other_renewal = document.getElementById("divT11_13_other_renewal");
	
	var div_CurrentEffDate = document.getElementById("t11_current_changed_effdate");
	var div_Debitcard_fee_split = document.getElementById("divT11_24");
	var div_Debitcard_fee_split_current = document.getElementById("divT11_24_current");
	var div_Debitcard_fee_split_renewal = document.getElementById("divT11_24_renewal");
	var div_Deductible_Aggregate_current = document.getElementById("Deductible_Aggregate_current");
	var div_Deductible_Aggregate_renewal = document.getElementById("Deductible_Aggregate_renewal");
	var div_Den_admin_fee_split = document.getElementById("divT11_12");
	var div_Den_admin_fee_split_current = document.getElementById("divT11_12_current");
	var div_Den_admin_fee_split_renewal = document.getElementById("divT11_12_renewal");
	var div_Den_annual_fee_split = document.getElementById("divT11_7");
	var div_Den_annual_fee_split_current = document.getElementById("divT11_7_current");
	var div_Den_annual_fee_split_renewal = document.getElementById("divT11_7_renewal");
	var div_Depcare_reimbursement_split = document.getElementById("divT11_21");
	var div_Depcare_reimbursement_split_current = document.getElementById("divT11_21_current");
	var div_Depcare_reimbursement_split_renewal = document.getElementById("divT11_21_renewal");
	var div_Depmedcare_fee_split = document.getElementById("divT11_23");
	var div_Depmedcare_fee_split_current = document.getElementById("divT11_23_current");
	var div_Depmedcare_fee_split_renewal = document.getElementById("divT11_23_renewal");

	var div_EatRight_cost = document.getElementById("divT11_EatRight_cost");
	var div_EatRight_cost_current = document.getElementById("divT11_EatRight_cost_current");
	var div_EatRight_cost_renewal = document.getElementById("divT11_EatRight_cost_renewal");

	var sp_Compex_CM_current = document.getElementById("sp_T11_27a_current");
	var sp_Compex_CM_renewal = document.getElementById("sp_T11_27a_renewal");

    // TW added 3/1/2016
	var div_EatRight_cost_exception = document.getElementById("divT11_EatRight_cost_exception");

	var div_EatRight_cost_exception_current = document.getElementById("divT11_EatRight_cost_exception_current");
	var div_EatRight_cost_exception_renewal = document.getElementById("divT11_EatRight_cost_exception_renewal");
	// TW Added 1/25/2016
	var div_EatRight_Implementation_Fee = document.getElementById("divT11_Implementation_Fee");
	var div_EatRight_Implementation_Fee_current = document.getElementById("divT11_Implementation_Fee_current");
	var div_EatRight_Implementation_Fee_renewal = document.getElementById("divT11_Implementation_Fee_renewal");
	
    var div_EatRight_option = document.getElementById("divT11_EatRight_option");
    var div_EatRight_option_1_current = document.getElementById("divT11_EatRight_Option_1_current");
    var div_EatRight_option_1_renewal = document.getElementById("divT11_EatRight_Option_1_renewal");

    var div_EatRight_option_2_current = document.getElementById("divT11_EatRight_Option_2_current");
    var div_EatRight_option_2_renewal = document.getElementById("divT11_EatRight_Option_2_renewal");
    var div_EatRight_option_2_coupon_current = document.getElementById("divT11_EatRight_Option_2_coupon_current");
    var div_EatRight_option_2_coupon_renewal = document.getElementById("divT11_EatRight_Option_2_coupon_renewal");
    var div_EatRight_option_2_score_current = document.getElementById("divT11_EatRight_Option_2_score_current");
    var div_EatRight_option_2_score_renewal = document.getElementById("divT11_EatRight_Option_2_score_renewal");

    var div_EatRight_option_3_current = document.getElementById("divT11_EatRight_Option_3_current");
    var div_EatRight_option_3_renewal = document.getElementById("divT11_EatRight_Option_3_renewal");
    var div_EatRight_option_3_coupon_current = document.getElementById("divT11_EatRight_Option_3_score_current");
    var div_EatRight_option_3_coupon_renewal = document.getElementById("divT11_EatRight_Option_3_score_renewal");
    var div_EatRight_option_3_score_current = document.getElementById("divT11_EatRight_Option_3_score_current");
    var div_EatRight_option_3_score_renewal = document.getElementById("divT11_EatRight_Option_3_score_renewal");
    var div_EatRight_option_3_card_current = document.getElementById("divT11_EatRight_Option_3_card_current");
    var div_EatRight_option_3_card_renewal = document.getElementById("divT11_EatRight_Option_3_card_renewal");

    var div_EatRight_option_4_current = document.getElementById("divT11_EatRight_Option_4_current");
    var div_EatRight_option_4_renewal = document.getElementById("divT11_EatRight_Option_4_renewal");
    var div_EatRight_option_4_custom_current = document.getElementById("divT11_EatRight_Option_4_custom_current");
    var div_EatRight_option_4_custom_renewal = document.getElementById("divT11_EatRight_Option_4_custom_renewal");

	var div_Flex_annual_fee_split = document.getElementById("divT11_8");
	var div_Flex_annual_fee_split_current = document.getElementById("divT11_8_current");
	var div_Flex_annual_fee_split_renewal = document.getElementById("divT11_8_renewal");
	var div_Flex_setup_fee_split = document.getElementById("divT11_3");
	var div_Flex_setup_fee_split_current = document.getElementById("divT11_3_current");
	var div_Flex_setup_fee_split_renewal = document.getElementById("divT11_3_renewal");
  
	var div_General_setup_fee_split = document.getElementById("divT11_2");
	var div_General_setup_fee_split_current = document.getElementById("divT11_2_current");
	
	var div_HIPAA_fee_split = document.getElementById("divT11_14");
	var div_HIPAA_fee_split_current = document.getElementById("divT11_14_current");
	var div_HIPAA_fee_split_renewal = document.getElementById("divT11_14_renewal");
	
	var div_HIPAA_fee_other_current = document.getElementById("divT11_14_other_current");
	var div_HIPAA_fee_other_renewal = document.getElementById("divT11_14_other_renewal");
	
	var div_HRA_annual_fee_split = document.getElementById("divT11_9");
	var div_HRA_annual_fee_split_current = document.getElementById("divT11_9_current");
	var div_HRA_annual_fee_split_renewal = document.getElementById("divT11_9_renewal");
	var div_HRA_setup_fee_split = document.getElementById("divT11_4");
	var div_HRA_setup_fee_split_current = document.getElementById("divT11_4_current");
	var div_HRA_setup_fee_split_renewal = document.getElementById("divT11_4_renewal");
	var div_HRA_fee_split = document.getElementById("divT11_150");
	var div_HRA_fee_split_current = document.getElementById("divT11_150_current");
	var div_HRA_fee_split_renewal = document.getElementById("divT11_150_renewal");
	var div_HSA_fee_split = document.getElementById("divT11_170");
	var div_HSA_fee_split_current = document.getElementById("divT11_170_current");
	var div_HSA_fee_split_renewal = document.getElementById("divT11_170_renewal");
	
	var div_LTD_fee_split = document.getElementById("divT11_16");
	var div_LTD_fee_split_current = document.getElementById("divT11_16_current");
	var div_LTD_fee_split_renewal = document.getElementById("divT11_16_renewal");
	
	var div_Life_ADD_admin_fee_split = document.getElementById("divT11_147");
	var div_Life_ADD_admin_fee_split_current = document.getElementById("divT11_147_current");
	var div_Life_ADD_admin_fee_split_renewal = document.getElementById("divT11_147_renewal");
	
	var div_Med_annual_fee_split = document.getElementById("divT11_6");
	var div_Med_annual_fee_split_current = document.getElementById("divT11_6_current");
	var div_Med_annual_fee_split_renewal = document.getElementById("divT11_6_renewal");
	var div_Med_reimbursement_split = document.getElementById("divT11_20");
	var div_Med_reimbursement_split_current = document.getElementById("divT11_20_current");
	var div_Med_reimbursement_split_renewal = document.getElementById("divT11_20_renewal");
	var div_Medrx_admin_fee_split = document.getElementById("divT11_10");
	var div_Medrx_admin_fee_split_current = document.getElementById("divT11_10_current");
	var div_Medrx_admin_fee_split_renewal = document.getElementById("divT11_10_renewal");
	var div_Nurse_fee_split = document.getElementById("divT11_18");
	var div_Nurse_fee_split_current = document.getElementById("divT11_18_current");
	var div_Nurse_fee_split_renewal = document.getElementById("divT11_18_renewal");
	var div_Other_fee = document.getElementById("divT11_19_other");
	var div_Other_fee_split_current = document.getElementById("divT11_19_current");
	var div_Other_fee_split_renewal = document.getElementById("divT11_19_renewal");
	var div_PEPM_Other = document.getElementById("PEPM_Other");
	var div_PPO_Other = document.getElementById("PPO_Other");
	var div_RemitPrem_PEPM_current = document.getElementById("T11_67_PEPM_current");
	var div_RemitPrem_PEPM_renewal = document.getElementById("T11_67_PEPM_renewal");
	var div_RemitPrem_Annual_current = document.getElementById("divT11_67_Annual_current");
	var div_RemitPrem_Annual_renewal = document.getElementById("divT11_67_Annual_renewal");
	var div_RN_fee_split = document.getElementById("divT11_17");
	var div_RN_fee_split_current = document.getElementById("divT11_17_current");
	var div_RN_fee_split_renewal = document.getElementById("divT11_17_renewal");
	var div_Run_in_fee_split = document.getElementById("divT11_1");
	var div_Run_in_fee_split_current = document.getElementById("divT11_1_current");
	var div_Specific_rates_apply_current = document.getElementById("divT11_144a_current");
	var div_Specific_rates_apply_renewal = document.getElementById("divT11_144a_renewal");
	
	var div_STD_fee_split = document.getElementById("divT11_15");
	var div_STD_fee_split_current = document.getElementById("divT11_15_current");
	var div_STD_fee_split_renewal = document.getElementById("divT11_15_renewal");
	
	var div_STD_maint_fee_split = document.getElementById("divT11_146");
	var div_STD_maint_fee_split_current = document.getElementById("divT11_146_current");
	var div_STD_maint_fee_split_renewal = document.getElementById("divT11_146_renewal");
	
	var div_Transportation_fee_split = document.getElementById("divT11_22");
	var div_Transportation_fee_split_current = document.getElementById("divT11_22_current");
	var div_Transportation_fee_split_renewal = document.getElementById("divT11_22_renewal");
	var div_Vision_fee_split = document.getElementById("divT11_11");
	var div_Vision_fee_split_current = document.getElementById("divT11_11_current");
	var div_Vision_fee_split_renewal = document.getElementById("divT11_11_renewal");
	var div_Wellness_current = document.getElementById("T11_25_Wellness_current");
	var div_Wellness_renewal = document.getElementById("T11_25_Wellness_renewal");
	var div_Wellness_Portal_current = document.getElementById("T11_149_Wellness_current");
	var div_Wellness_Portal_renewal = document.getElementById("T11_149_Wellness_renewal");
	
	var lblNH_Assessment_Fee_current =  document.getElementById("lblT11_63_current");
	var lblNH_Assessment_Fee_renewal =  document.getElementById("lblT11_63_renewal");
	var lblSubmitPrem = document.getElementById("lblT11_104a");

	var rbT11_modify_current = document.getElementById("rbT11_modify_1");
	var rbT11_modify_renewal = document.getElementById("rbT11_modify_2");
	var rbT11_Wellness_current = document.getElementById("rbT11_25_current_1");
	var rbT11_Wellness_renewal = document.getElementById("rbT11_25_renewal_1");
	var rbT11_ChronicDM_FeeAmt_current = document.getElementById("rbT11_33_current_1");
	var rbT11_ChronicDM_FeeAmt_renewal = document.getElementById("rbT11_33_renewal_1");
	var rbT11_ClientAddress_current = document.getElementById("rbT11_142_current_2");
	var rbT11_ClientAddress_renewal = document.getElementById("rbT11_142_renewal_2");
	
    var rbT11_EatRight_current = document.getElementById("rbT11_176_current_1");
    var rbT11_EatRight_renewal = document.getElementById("rbT11_176_renewal_1");
    var rbT11_EatRight_cost_exception_current = document.getElementById("rbT11_176a_current_2");
    var rbT11_EatRight_cost_exception_renewal = document.getElementById("rbT11_176a_renewal_2");
    // TW Added 1/25/2016
    var rbT11_EatRight_Implementation_Fee_current = document.getElementById("rbT11_176a1_current_1");
    var rbT11_EatRight_Implementation_Fee_renewal = document.getElementById("rbT11_176a1_renewal_1");

    var rbT11_NH_Assessment_Fee_current = document.getElementById("rbT11_63_current_2");
	var rbT11_NH_Assessment_Fee_renewal = document.getElementById("rbT11_63_renewal_2");
	var rbT11_RareDM_FeeAmt_current = document.getElementById("rbT11_32_current_1");
	var rbT11_RareDM_FeeAmt_renewal = document.getElementById("rbT11_32_renewal_1");
	var rbT11_Reinsurance_Deductible_Ind_current = document.getElementById("rbT11_55_current_1");
	var rbT11_Reinsurance_Deductible_Ind_renewal = document.getElementById("rbT11_55_renewal_1");
	var rbT11_Reinsurance_Deductible_Fam_current = document.getElementById("rbT11_55_current_2");
	var rbT11_Reinsurance_Deductible_Fam_renewal = document.getElementById("rbT11_55_renewal_2");
	var rbT11_RemitPrem_Annual_current = document.getElementById("rbT11_67_current_2");
	var rbT11_RemitPrem_Annual_renewal = document.getElementById("rbT11_67_renewal_2");
	var rbT11_RemitPrem_PEPM_current = document.getElementById("rbT11_67_current_1");
	var rbT11_RemitPrem_PEPM_renewal = document.getElementById("rbT11_67_renewal_1");
	var rbT11_Specific_rates_apply_current = document.getElementById("rbT11_144_current_2");
	var rbT11_Specific_rates_apply_renewal = document.getElementById("rbT11_144_renewal_2");
	var rbT11_Aggregate_rates_apply_current = document.getElementById("rbT11_145_current_2");
	var rbT11_Aggregate_rates_apply_renewal = document.getElementById("rbT11_145_renewal_2");
	var rbT11_SubmitPremNet_current = document.getElementById("rbT11_104_current_1");
	var rbT11_SubmitPremNet_renewal = document.getElementById("rbT11_104_renewal_1");
	var rbT11_Wellness_Portal_current = document.getElementById("rbT11_149_current_1");
	var rbT11_Wellness_Portal_renewal = document.getElementById("rbT11_149_renewal_1");
	var rbT11_ChronicDM_MedWatch_current = document.getElementById("rbT11_166_current_1");
	var rbT11_ChronicDM_MedWatch_renewal = document.getElementById("rbT11_166_renewal_1");
	var rbT11_CallMD_MedWatch_current = document.getElementById("rbT11_167_current_1");
	var rbT11_CallMD_MedWatch_renewal = document.getElementById("rbT11_167_renewal_1");
	var rbT11_RareDM_MedWatch_current = document.getElementById("rbT11_168_current_1");
	var rbT11_RareDM_MedWatch_renewal = document.getElementById("rbT11_168_renewal_1");
	var rbT11_Steps2Health_MedWatch_current = document.getElementById("rbT11_171_current_1");
	var rbT11_Steps2Health_MedWatch_renewal = document.getElementById("rbT11_171_renewal_1");
	var rbT11_Steps2Health_MedWatch_NoChg_current = document.getElementById("rbT11_171_current_2");
	var rbT11_Steps2Health_MedWatch_NoChg_renewal = document.getElementById("rbT11_171_renewal_2");

	// TW 04/27/2016 BEGIN Added for IT # 923
	var ddlT11_Steps2Health_EventMonth_current = document.getElementById("ddlT11_171_current");
	var ddlT11_Steps2Health_EventMonth_renewal = document.getElementById("ddlT11_171_renewal");

	var rbT11_CallADoc_MedWatch_current = document.getElementById("rbT11_177_current_1");
	var rbT11_CallADoc_MedWatch_renewal = document.getElementById("rbT11_177_renewal_1");
	var txtFeeAmt_CallADoc_MedWatch_current = document.getElementById("txtT11_177_current");
	var txtFeeAmt_CallADoc_MedWatch_renewal = document.getElementById("txtT11_177_renewal");

	var rbT11_Lifestyle_Mgt_Coaching_current = document.getElementById("rbT11_178_current_1");
	var rbT11_Lifestyle_Mgt_Coaching_renewal = document.getElementById("rbT11_178_renewal_1");

    // TW 05/13/2016 BEGIN Added rbT11_178-181_current_2 and renewal_2
    var rbT11_LifeStyle_Mgt_Coaching_NoChg_current = document.getElementById("rbT11_178_current_2");
    var rbT11_LifeStyle_Mgt_Coaching_NoChg_renewal = document.getElementById("rbT11_178_renewal_2");
    var rbT11_Disease_Mgt_Coaching_NoChg_current = document.getElementById("rbT11_179_current_2");
    var rbT11_Disease_Mgt_Coaching_NoChg_renewal = document.getElementById("rbT11_179_renewal_2");
    var rbT11_Onsite_Coach_NoChg_current = document.getElementById("rbT11_180_current_2");
    var rbT11_Onsite_Coach_NoChg_renewal = document.getElementById("rbT11_180_renewal_2");
    var rbT11_Your_Health_Story_NoChg_current = document.getElementById("rbT11_181_current_2");
    var rbT11_Your_Health_Story_NoChg_renewal = document.getElementById("rbT11_181_renewal_2");
    // TW 05/13/2016 *END* Added rbT11_178-181_current_2 and renewal_2

    // TW 05/09/2016 BEGIN Added rbT11_178a Fee Type
	var rbT11_LifeStyle_Mgt_Coach_Fee_Type_current = document.getElementById("rbT11_178a_current_1");
	var rbT11_LifSetyle_Mgt_Coach_Fee_Type_renewal = document.getElementById("rbT11_178a_renewal_1");
	// TW 05/09/2016 *END* Added rbT11_178a Fee Type
	var txtFeeAmt_Lifestyle_Mgt_Coaching_current = document.getElementById("txtT11_178_current");
	var txtFeeAmt_Lifestyle_Mgt_Coaching_renewal = document.getElementById("txtT11_178_renewal");
	var ckT11_Lifestyle_Mgt_ClientDirect_current = document.getElementById("ckT11_178_current");
	var ckT11_Lifestyle_Mgt_ClientDirect_renewal = document.getElementById("ckT11_178_renewal");
	var lblT11_Lifestyle_Mgt_ClientDirect = document.getElementById("lblT11_138a");

	var rbT11_Disease_Mgt_Coaching_current = document.getElementById("rbT11_179_current_1");
	var rbT11_Disease_Mgt_Coaching_renewal = document.getElementById("rbT11_179_renewal_1");

	// TW 05/09/2016 BEGIN Added rbT11_179a Fee Type
	var rbT11_Disease_Mgt_Coach_Fee_Type_current = document.getElementById("rbT11_179a_current_1");
	var rbT11_Disease_Mgt_Coach_Fee_Type_renewal = document.getElementById("rbT11_179a_renewal_1");
	// TW 05/09/2016 *END* Added rbT11_179a Fee Type
	var txtFeeAmt_Disease_Mgt_Coaching_current = document.getElementById("txtT11_179_current");
	var txtFeeAmt_Disease_Mgt_Coaching_renewal = document.getElementById("txtT11_179_renewal");
	var ckT11_Disease_Mgt_ClientDirect_current = document.getElementById("ckT11_179_current");
	var ckT11_Disease_Mgt_ClientDirect_renewal = document.getElementById("ckT11_179_renewal");
	var lblT11_Disease_Mgt_ClientDirect = document.getElementById("lblT11_141a");

	var rbT11_Onsite_Coach_current = document.getElementById("rbT11_180_current_1");
	var rbT11_Onsite_Coach_renewal = document.getElementById("rbT11_180_renewal_1");
	var txtFeeAmt_Onsite_Coach_current = document.getElementById("txtT11_180_current");
	var txtFeeAmt_Onsite_Coach_renewal = document.getElementById("txtT11_180_renewal");
	var ckT11_Onsite_Coach_ClientDirect_current = document.getElementById("ckT11_180_current");
	var ckT11_Onsite_Coach_ClientDirect_renewal = document.getElementById("ckT11_180_renewal");
	var lblT11_Onsite_Coach_ClientDirect = document.getElementById("lblT11_144a");

	var rbT11_Your_Health_Story_current = document.getElementById("rbT11_181_current_1");
	var rbT11_Your_Health_Story_renewal = document.getElementById("rbT11_181_renewal_1");
	var txtFeeAmt_Your_Health_Story_current = document.getElementById("txtT11_181_current");
	var txtFeeAmt_Your_Health_Story_renewal = document.getElementById("txtT11_181_renewal");
	var ckT11_Your_Health_Story_ClientDirect_current = document.getElementById("ckT11_181_current");
	var ckT11_Your_Health_Story_ClientDirect_renewal = document.getElementById("ckT11_181_renewal");
	var lblT11_Your_Health_story_ClientDirect = document.getElementById("lblT11_147a");
	// TW 04/27/2016 *END* Added for IT # 923

	var rbT11_USMed_Diabetic_Monitoring_current = document.getElementById("rbT11_174_current_1");
	var rbT11_USMed_Diabetic_Monitoring_renewal = document.getElementById("rbT11_174_renewal_1");

	var txtAggregate_rates_apply_current = document.getElementById("txtT11_145_current");
	var txtAggregate_rates_apply_renewal = document.getElementById("txtT11_145_renewal");
	var txtAggregate_rates_other_current = document.getElementById("txtT11_65_current");
	var txtAggregate_rates_other_renewal = document.getElementById("txtT11_65_renewal");
	var txtClient_Addr1_current = document.getElementById("txtT11_142_current_1");
	var txtClient_Addr1_renewal = document.getElementById("txtT11_142_renewal_1");
	var txtClient_Addr2_current = document.getElementById("txtT11_142_current_2");
	var txtClient_Addr2_renewal = document.getElementById("txtT11_142_renewal_2");
	var txtClient_City_current = document.getElementById("txtT11_142_current_3");
	var txtClient_City_renewal = document.getElementById("txtT11_142_renewal_3");
	var txtClient_State_current = document.getElementById("txtT11_142_current_4");
	var txtClient_State_renewal = document.getElementById("txtT11_142_renewal_4");
	var txtClient_Zip_current = document.getElementById("txtT11_142_current_5");
	var txtClient_Zip_renewal = document.getElementById("txtT11_142_renewal_5");
	
	var txtCobra_fee_other_current = document.getElementById("txtT11_13_other_current");
	var txtCobra_fee_other_renewal = document.getElementById("txtT11_13_other_renewal");

	var txtComplex_CM_Fee_current = document.getElementById("txtT11_27_current_to_HPI");
	var txtComplex_CM_Fee_renewal = document.getElementById("txtT11_27_renewal_to_HPI");
	
	var txtEffdate_current = document.getElementById("txtT11_current_effdate");
	var txtEffdate_renewal = document.getElementById("txtT11_renewal_effdate");
	
	var txtFeeAmt_RareDM_current = document.getElementById("txtT11_32_current");
	var txtFeeAmt_RareDM_renewal = document.getElementById("txtT11_32_renewal");
	var txtFeeAmt_ChronicDM_current = document.getElementById("txtT11_33_current");
	var txtFeeAmt_ChronicDM_renewal = document.getElementById("txtT11_33_renewal");
	var txtFeeAmt_ChronicDM_MedWatch_current = document.getElementById("txtT11_166_current");
	var txtFeeAmt_ChronicDM_MedWatch_renewal = document.getElementById("txtT11_166_renewal");
	var txtFeeAmt_CallMD_MedWatch_current = document.getElementById("txtT11_167_current");
	var txtFeeAmt_CallMD_MedWatch_renewal = document.getElementById("txtT11_167_renewal");
	var txtFeeAmt_RareDM_MedWatch_current = document.getElementById("txtT11_168_current");
	var txtFeeAmt_RareDM_MedWatch_renewal = document.getElementById("txtT11_168_renewal");
	var txtFeeAmt_Steps2Health_MedWatch_current = document.getElementById("txtT11_171_current");
	var txtFeeAmt_Steps2Health_MedWatch_renewal = document.getElementById("txtT11_171_renewal");
	// TW 05/11/2016 BEGIN Added label for Event Month
	var lblT11_Steps2Health_MedWatch_Event_Month = document.getElementById("lblT11_171b");
	// TW 05/11/2016 *END* Added label for Event Month
	var txtFeeAmt_USMed_Diabetic_Monitoring_current = document.getElementById("txtT11_174_current");
	var txtFeeAmt_USMed_Diabetic_Monitoring_renewal = document.getElementById("txtT11_174_renewal");
	
	var txtHIPAA_fee_other_current = document.getElementById("txtT11_14_other_current");
	var txtHIPAA_fee_other_renewal = document.getElementById("txtT11_14_other_renewal");
	
	var txtHRA_Other_current = document.getElementById("txtT11_5_current");
	var txtHRA_Other_renewal = document.getElementById("txtT11_5_renewal");
	var txtNH_Assessment_Fee_current = document.getElementById("txtT11_63_current");
	var txtNH_Assessment_Fee_renewal = document.getElementById("txtT11_63_renewal");
	var txtPEPM_other = document.getElementById("txtT11_19");
	
	var txtRemitPrem_Annual_current = document.getElementById("txtT11_67_Annual_current");
	var txtRemitPrem_Annual_renewal = document.getElementById("txtT11_67_Annual_renewal");
	var txtRemitPrem_PEPM_current_med = document.getElementById("txtT11_67_PEPM_current_med");
	var txtRemitPrem_PEPM_current_den = document.getElementById("txtT11_67_PEPM_current_den");
	var txtRemitPrem_PEPM_renewal_med = document.getElementById("txtT11_67_PEPM_renewal_med");
	var txtRemitPrem_PEPM_renewal_den = document.getElementById("txtT11_67_PEPM_renewal_den");
	var txtRemitPrem_Other_current = document.getElementById("txtT11_67_Other_current");
	var txtRemitPrem_Other_renewal = document.getElementById("txtT11_67_Other_renewal");

	var txtSpecific_rates_apply_current = document.getElementById("txtT11_144_current");
	var txtSpecific_rates_apply_renewal = document.getElementById("txtT11_144_renewal");
	var txtSpecific_rates_other_current = document.getElementById("txtT11_53_current");
	var txtSpecific_rates_other_renewal = document.getElementById("txtT11_53_renewal");
	var txtSubmitPremNet_current = document.getElementById("txtT11_104_current");
	var txtSubmitPremNet_renewal = document.getElementById("txtT11_104_renewal"); 
	var txtWellness_current = document.getElementById("txtT11_25_current");
	var txtWellness_renewal = document.getElementById("txtT11_25_renewal");
	var txtWellness_Portal_current =  document.getElementById("txtT11_149_current");
	var txtWellness_Portal_renewal = document.getElementById("txtT11_149_renewal");

	
	//Set disable action for Tab11 current controls
	//disable_action = true;
	//if (ck_current_controls.checked) disable_action = false;
	
	//Hide all optional controls on Tab11
	txtAggregate_rates_other_current.style.visibility = "hidden";
	txtAggregate_rates_other_renewal.style.visibility = "hidden";
   
	div_ClientAddress_current.style.visibility = "hidden";
	div_ClientAddress_label.style.visibility = "hidden";
	div_ClientAddress_renewal.style.visibility = "hidden";
	
	div_Cobra_fee_split.style.visibility = "hidden";
	div_Cobra_fee_split_current.style.visibility = "hidden";
	div_Cobra_fee_split_renewal.style.visibility = "hidden";
	
	div_Cobra_fee_other_current.style.visibility = "hidden";
	div_Cobra_fee_other_renewal.style.visibility = "hidden";

	div_EatRight_cost.style.visibility = "hidden";
	div_EatRight_cost_current.style.visibility = "hidden";
	div_EatRight_cost_renewal.style.visibility = "hidden";
	// TW Added 1/25/2016
	div_EatRight_cost_exception.style.visibility = "hidden";
	div_EatRight_Implementation_Fee.style.visibility = "hidden";
	div_EatRight_Implementation_Fee_current.style.visibility = "hidden";
	div_EatRight_Implementation_Fee_renewal.style.visibility = "hidden";

	div_EatRight_cost_exception_current.style.visibilty = "hidden";
	div_EatRight_cost_exception_renewal.style.visibilty = "hidden";

	div_EatRight_option.style.visibility = "hidden";
	div_EatRight_option_1_current.style.visibility = "hidden";
	div_EatRight_option_1_renewal.style.visibility = "hidden";
	div_EatRight_option_2_current.style.visibility = "hidden";
	div_EatRight_option_2_renewal.style.visibility = "hidden";
	div_EatRight_option_2_coupon_current.style.visibility = "hidden";
	div_EatRight_option_2_coupon_renewal.style.visibility = "hidden";
    div_EatRight_option_2_score_current.style.visibility = "hidden";
	div_EatRight_option_2_score_renewal.style.visibility = "hidden";
	div_EatRight_option_3_current.style.visibility = "hidden";
	div_EatRight_option_3_renewal.style.visibility = "hidden";
	div_EatRight_option_3_coupon_current.style.visibility = "hidden";
	div_EatRight_option_3_coupon_renewal.style.visibility = "hidden";
	div_EatRight_option_3_score_current.style.visibility = "hidden";
	div_EatRight_option_3_score_renewal.style.visibility = "hidden";
	div_EatRight_option_3_card_current.style.visibility = "hidden";
	div_EatRight_option_3_card_renewal.style.visibility = "hidden";
	div_EatRight_option_4_current.style.visibility = "hidden";
	div_EatRight_option_4_renewal.style.visibility = "hidden";
	div_EatRight_option_4_custom_current.style.visibility = "hidden";
	div_EatRight_option_4_custom_renewal.style.visibility = "hidden";

	div_CurrentEffDate.style.visibility = "hidden";
	div_Debitcard_fee_split.style.visibility = "hidden";
	div_Debitcard_fee_split_current.style.visibility = "hidden";
	div_Debitcard_fee_split_renewal.style.visibility = "hidden";
	div_Deductible_Aggregate_current.style.visibility = "hidden";
	div_Deductible_Aggregate_renewal.style.visibility = "hidden"; 
	div_Den_admin_fee_split.style.visibility = "hidden";
	div_Den_admin_fee_split_current.style.visibility = "hidden";
	div_Den_admin_fee_split_renewal.style.visibility = "hidden"; 
	div_Den_annual_fee_split.style.visibility = "hidden";
	div_Den_annual_fee_split_current.style.visibility = "hidden";
	div_Den_annual_fee_split_renewal.style.visibility = "hidden";
	div_Depcare_reimbursement_split.style.visibility = "hidden";
	div_Depcare_reimbursement_split_current.style.visibility = "hidden";
	div_Depcare_reimbursement_split_renewal.style.visibility = "hidden";
	div_Depmedcare_fee_split.style.visibility = "hidden";
	div_Depmedcare_fee_split_current.style.visibility = "hidden";
	div_Depmedcare_fee_split_renewal.style.visibility = "hidden";

	sp_Compex_CM_current.style.visibility = "hidden";
	sp_Compex_CM_renewal.style.visibility = "hidden";

	txtFeeAmt_ChronicDM_current.style.visibility = "hidden";
	txtFeeAmt_ChronicDM_renewal.style.visibility = "hidden";
	txtFeeAmt_ChronicDM_MedWatch_current.style.visibility = "hidden";
	txtFeeAmt_ChronicDM_MedWatch_renewal.style.visibility = "hidden"
	txtFeeAmt_CallMD_MedWatch_current.style.visibility = "hidden";
	txtFeeAmt_CallMD_MedWatch_renewal.style.visibility = "hidden";
	txtFeeAmt_RareDM_MedWatch_current.style.visibility = "hidden";
	txtFeeAmt_RareDM_MedWatch_renewal.style.visibility = "hidden";
	txtFeeAmt_Steps2Health_MedWatch_current.style.visibility = "hidden";
	txtFeeAmt_Steps2Health_MedWatch_renewal.style.visibility = "hidden";

	// TW 04/28/2016 BEGIN Added for IT # 923
	ddlT11_Steps2Health_EventMonth_current.style.visibility = "hidden";
	ddlT11_Steps2Health_EventMonth_renewal.style.visibility = "hidden";

	txtFeeAmt_CallADoc_MedWatch_current.style.visibility = "hidden";
	txtFeeAmt_CallADoc_MedWatch_renewal.style.visibility = "hidden";

	txtFeeAmt_Lifestyle_Mgt_Coaching_current.style.visibility = "hidden";
	txtFeeAmt_Lifestyle_Mgt_Coaching_renewal.style.visibility = "hidden";
	ckT11_Lifestyle_Mgt_ClientDirect_current.style.visibility = "hidden";
	ckT11_Lifestyle_Mgt_ClientDirect_renewal.style.visibility = "hidden";

	txtFeeAmt_Disease_Mgt_Coaching_current.style.visibility = "hidden";
	txtFeeAmt_Disease_Mgt_Coaching_renewal.style.visibility = "hidden";
    ckT11_Disease_Mgt_ClientDirect_current.style.visibility = "hidden";
    ckT11_Disease_Mgt_ClientDirect_renewal.style.visibility = "hidden";

	txtFeeAmt_Onsite_Coach_current.style.visibility = "hidden";
	txtFeeAmt_Onsite_Coach_renewal.style.visibility = "hidden";
	ckT11_Onsite_Coach_ClientDirect_current.style.visibility = "hidden";
	ckT11_Onsite_Coach_ClientDirect_renewal.style.visibility = "hidden";

	txtFeeAmt_Your_Health_Story_current.style.visibility = "hidden";
	txtFeeAmt_Your_Health_Story_renewal.style.visibility = "hidden";
	ckT11_Your_Health_Story_ClientDirect_current.style.visibility = "hidden";
	ckT11_Your_Health_Story_ClientDirect_renewal.style.visibility = "hidden";
	// TW 04/28/2016 *END* Added for IT # 923

	txtFeeAmt_RareDM_current.style.visibility = "hidden";
	txtFeeAmt_RareDM_renewal.style.visibility = "hidden";
	txtFeeAmt_USMed_Diabetic_Monitoring_current.style.visibility = "hidden";
	txtFeeAmt_USMed_Diabetic_Monitoring_renewal.style.visibility = "hidden";
	
	div_Flex_annual_fee_split.style.visibility = "hidden";
	div_Flex_annual_fee_split_current.style.visibility = "hidden";
	div_Flex_annual_fee_split_renewal.style.visibility = "hidden";

	div_Flex_setup_fee_split.style.visibility = "hidden";
	div_Flex_setup_fee_split_current.style.visibility = "hidden";
	div_Flex_setup_fee_split_renewal.style.visibility = "hidden";
	
	div_General_setup_fee_split_current.style.visibility = "hidden";
	div_General_setup_fee_split.style.visibility = "hidden";

	div_HIPAA_fee_split.style.visibility = "hidden";
	div_HIPAA_fee_split_current.style.visibility = "hidden";
	div_HIPAA_fee_split_renewal.style.visibility = "hidden";
	
	div_HIPAA_fee_other_current.style.visibility = "hidden";
	div_HIPAA_fee_other_renewal.style.visibility = "hidden";
	
	div_HRA_annual_fee_split.style.visibility = "hidden";
	div_HRA_annual_fee_split_current.style.visibility = "hidden";
	div_HRA_annual_fee_split_renewal.style.visibility = "hidden";
	div_HRA_setup_fee_split.style.visibility = "hidden";
	div_HRA_setup_fee_split_current.style.visibility = "hidden";
	div_HRA_setup_fee_split_renewal.style.visibility = "hidden";
	div_HRA_fee_split_current.style.visibility = "hidden";
	div_HRA_fee_split_renewal.style.visibility = "hidden";
	div_HSA_fee_split_current.style.visibility = "hidden";
	div_HSA_fee_split_renewal.style.visibility = "hidden";
	txtHRA_Other_current.style.visibility = "hidden";
	txtHRA_Other_renewal.style.visibility = "hidden";
	
	div_LTD_fee_split.style.visibility = "hidden";
	div_LTD_fee_split_current.style.visibility = "hidden";
	div_LTD_fee_split_renewal.style.visibility = "hidden";
	
	div_Life_ADD_admin_fee_split.style.visibility = "hidden";
	div_Life_ADD_admin_fee_split_current.style.visibility = "hidden";
	div_Life_ADD_admin_fee_split_renewal.style.visibility = "hidden";
	
	div_Med_annual_fee_split.style.visibility = "hidden";
	div_Med_annual_fee_split_current.style.visibility = "hidden";
	div_Med_annual_fee_split_renewal.style.visibility = "hidden";
	
	div_Med_reimbursement_split.style.visibility = "hidden";
	div_Med_reimbursement_split_current.style.visibility = "hidden";
	div_Med_reimbursement_split_renewal.style.visibility = "hidden";
	
	div_Medrx_admin_fee_split.style.visibility = "hidden";
	div_Medrx_admin_fee_split_current.style.visibility = "hidden";
	div_Medrx_admin_fee_split_renewal.style.visibility = "hidden";

	lblNH_Assessment_Fee_current.style.visibility = "hidden";
	lblNH_Assessment_Fee_renewal.style.visibility = "hidden";
	txtNH_Assessment_Fee_current.style.visibility = "hidden";
	txtNH_Assessment_Fee_renewal.style.visibility = "hidden";
	
	div_Nurse_fee_split.style.visibility = "hidden";
	div_Nurse_fee_split_current.style.visibility = "hidden";
	div_Nurse_fee_split_renewal.style.visibility = "hidden";  
	
	div_Other_fee.style.visibility = "hidden";
	div_Other_fee_split_current.style.visibility = "hidden";
	div_Other_fee_split_renewal.style.visibility = "hidden";  
   
	div_PEPM_Other.style.visibility = "hidden";
   
	div_RemitPrem_Annual_current.style.visibility = "hidden";
	div_RemitPrem_Annual_renewal.style.visibility = "hidden";
	div_RemitPrem_PEPM_current.style.visibility = "hidden";
	div_RemitPrem_PEPM_renewal.style.visibility = "hidden";
	txtRemitPrem_Other_current.style.visibility = "hidden";
	txtRemitPrem_Other_renewal.style.visibility = "hidden";
	
	div_RN_fee_split.style.visibility = "hidden";
	div_RN_fee_split_current.style.visibility = "hidden";
	div_RN_fee_split_renewal.style.visibility = "hidden";
	
	div_Run_in_fee_split.style.visibility = "hidden";
	div_Run_in_fee_split_current.style.visibility = "hidden";
	
	div_Specific_rates_apply_current.style.visibility = "hidden";
	div_Specific_rates_apply_renewal.style.visibility = "hidden";

	txtSpecific_rates_other_current.style.visibility = "hidden";
	txtSpecific_rates_other_renewal.style.visibility = "hidden";

	lblSubmitPrem.style.visibility = "hidden";
	txtSubmitPremNet_current.style.visibility = "hidden";
	txtSubmitPremNet_renewal.style.visibility = "hidden";
	
	div_STD_fee_split.style.visibility = "hidden";
	div_STD_fee_split_current.style.visibility = "hidden";
	div_STD_fee_split_renewal.style.visibility = "hidden";
	
	div_STD_maint_fee_split.style.visibility = "hidden";
	div_STD_maint_fee_split_current.style.visibility = "hidden";
	div_STD_maint_fee_split_renewal.style.visibility = "hidden";
	
	div_Transportation_fee_split.style.visibility = "hidden";
	div_Transportation_fee_split_current.style.visibility = "hidden";
	div_Transportation_fee_split_renewal.style.visibility = "hidden";
	
	div_Vision_fee_split.style.visibility = "hidden";
	div_Vision_fee_split_current.style.visibility = "hidden";
	div_Vision_fee_split_renewal.style.visibility = "hidden";
	
	div_Wellness_current.style.visibility = "hidden";
	div_Wellness_renewal.style.visibility = "hidden";
	div_Wellness_Portal_current.style.visibility = "hidden";
	div_Wellness_Portal_renewal.style.visibility = "hidden";

	if (hvtab != 11) return;

	display_main_buttons(false);
	$("#tab11buttons").hide();
	$("#lblT11_update").hide();
	set_general_tab_buttons(false);

	//enable/disable controls based on rb ck'd
    
	        if ($("#rbT11_modify_1").is(":checked")) {
	            tab11_set_controls("current", "enable");
	            $("#tab11buttons").show();
	            set_general_tab_buttons(true);
	            $("#lblT11_update").html("Enter CURRENT data and click UPDATE");
	            $("#lblT11_update").show();
	        } else {
	            tab11_set_controls("current", "disable");
	        }

	        if ($("#rbT11_modify_2").is(":checked")) {
	            tab11_set_controls("renewal", "enable");
	            $("#tab11buttons").show();
	            set_general_tab_buttons(true);
	            $("#lblT11_update").html("Enter RENEWAL data and click UPDATE");
	            $("#lblT11_update").show();
	        } else {
	            tab11_set_controls("renewal", "disable");
	        }
	
	//Store global effdates
	effdate_current = "";
	if (txtEffdate_current.value.length > 0) effdate_current = txtEffdate_current.value;    
	
	//hide/show rbT11_modify buttons based on txtT11_current/renewal_effdates
	$("#div_modify_current").hide();
	$("#div_modify_renewal").hide();
	if (!readonly &&  txtEffdate_current.value.length > 0) $("#div_modify_current").show();

	effdate_renewal = "";
	if (txtEffdate_renewal.value.length > 0) {
		effdate_renewal = txtEffdate_renewal.value;
		if (!readonly) $("#div_modify_renewal").show();
	}
	
	//Enable/Disable current controls
	//tab11_current_controls();
	
	//Review item 1
	if (ck_run_in_fee_split_current.checked){
		div_Run_in_fee_split.style.visibility = "visible";
		div_Run_in_fee_split_current.style.visibility = "visible";
	} else {
		div_Run_in_fee_split.style.visibility = "hidden";
		div_Run_in_fee_split_current.style.visibility = "hidden";
	}
	
	//Review item 2
	if (ck_general_setup_fee_split_current.checked){
		div_General_setup_fee_split.style.visibility = "visible";
		div_General_setup_fee_split_current.style.visibility = "visible";
	} else {
		div_General_setup_fee_split.style.visibility = "hidden";
		div_General_setup_fee_split_current.style.visibility = "hidden";
	}
	
	//Review item 3
	//Display Amt/Broker if either ckbox checked
	if (ck_flex_setup_fee_split_current.checked || ck_flex_setup_fee_split_renewal.checked) {
		div_Flex_setup_fee_split.style.visibility = "visible";
	} else {
		 div_Flex_setup_fee_split.style.visibility = "hidden";
	}
	
	// Display current split?
	if (ck_flex_setup_fee_split_current.checked){
		div_Flex_setup_fee_split_current.style.visibility = "visible";
	} else {
		div_Flex_setup_fee_split_current.style.visibility = "hidden";
	}
	
	//Display renewal split?
	if (ck_flex_setup_fee_split_renewal.checked){
		div_Flex_setup_fee_split_renewal.style.visibility = "visible";
	} else {
		div_Flex_setup_fee_split_renewal.style.visibility = "hidden";
	}
	
	//Review item 4
	//Display Amt/Broker if either ckbox checked
	if (ck_hra_setup_fee_split_current.checked || ck_hra_setup_fee_split_renewal.checked) {
		div_HRA_setup_fee_split.style.visibility = "visible";
	} else {
		 div_HRA_setup_fee_split.style.visibility = "hidden";
	}
	
	// Display current split?
	if (ck_hra_setup_fee_split_current.checked){
		div_HRA_setup_fee_split_current.style.visibility = "visible";
	} else {
		div_HRA_setup_fee_split_current.style.visibility = "hidden";
	}
	
	//Display renewal split?
	if (ck_hra_setup_fee_split_renewal.checked){
		div_HRA_setup_fee_split_renewal.style.visibility = "visible";
	} else {
		div_HRA_setup_fee_split_renewal.style.visibility = "hidden";
	}
	
	//Review item 5
   if (ddl_HRA_other_current.value == "5")
   {
	txtHRA_Other_current.style.visibility = "visible";
	if (txtHRA_Other_current.value.length > 0)
	{
		txtHRA_Other_current.className = "transparent";
	}
	else
	{
		txtHRA_Other_current.className = "highlight";
	}
   }
   else
   {
	txtHRA_Other_current.style.visibility = "hidden";
   }
   
   if (ddl_HRA_other_renewal.value == "5")
   {
	txtHRA_Other_renewal.style.visibility = "visible";
	if (txtHRA_Other_renewal.value.length > 0)
	{
		txtHRA_Other_renewal.className = "transparent";
	}
	else
	{
		txtHRA_Other_renewal.className = "highlight";
	}
   }
   else
   {
	txtHRA_Other_renewal.style.visibility = "hidden";
   } 
   
	//Review item 6
	//Display Amt/Broker if either ckbox checked
	if (ck_med_annual_fee_split_current.checked || ck_med_annual_fee_split_renewal.checked) {
		div_Med_annual_fee_split.style.visibility = "visible";
	} else {
		 div_Med_annual_fee_split.style.visibility = "hidden";
	}
	
	// Display current split?
	if (ck_med_annual_fee_split_current.checked){
		div_Med_annual_fee_split_current.style.visibility = "visible";
	} else {
		div_Med_annual_fee_split_current.style.visibility = "hidden";
	}
	
	//Display renewal split?
	if (ck_med_annual_fee_split_renewal.checked){
		div_Med_annual_fee_split_renewal.style.visibility = "visible";
	} else {
		div_Med_annual_fee_split_renewal.style.visibility = "hidden";
	}
	
	//Review item 7
	//Display Amt/Broker if either ckbox checked
	if (ck_den_annual_fee_split_current.checked || ck_den_annual_fee_split_renewal.checked) {
		div_Den_annual_fee_split.style.visibility = "visible";
	} else {
		 div_Den_annual_fee_split.style.visibility = "hidden";
	}
	
	// Display current split?
	if (ck_den_annual_fee_split_current.checked){
		div_Den_annual_fee_split_current.style.visibility = "visible";
	} else {
		div_Den_annual_fee_split_current.style.visibility = "hidden";
	}
	
	//Display renewal split?
	if (ck_den_annual_fee_split_renewal.checked){
		div_Den_annual_fee_split_renewal.style.visibility = "visible";
	} else {
		div_Den_annual_fee_split_renewal.style.visibility = "hidden";
	}
	
	//Review item 8
	//Display Amt/Broker if either ckbox checked
    if (ck_flex_annual_fee_split_current.checked || ck_flex_annual_fee_split_renewal.checked) {
        div_Flex_annual_fee_split.style.visibility = "visible";
    } else {
         div_Flex_annual_fee_split.style.visibility = "hidden";
    }
    
    // Display current split?
    if (ck_flex_annual_fee_split_current.checked){
        div_Flex_annual_fee_split_current.style.visibility = "visible";
    } else {
        div_Flex_annual_fee_split_current.style.visibility = "hidden";
    }
    
    //Display renewal split?
    if (ck_flex_annual_fee_split_renewal.checked){
        div_Flex_annual_fee_split_renewal.style.visibility = "visible";
    } else {
        div_Flex_annual_fee_split_renewal.style.visibility = "hidden";
    }
    
	//Review item 9
	//Display Amt/Broker if either ckbox checked
	if (ck_hra_annual_fee_split_current.checked || ck_hra_annual_fee_split_renewal.checked) {
		div_HRA_annual_fee_split.style.visibility = "visible";
	} else {
		 div_HRA_annual_fee_split.style.visibility = "hidden";
	}
	
	// Display current split?
	if (ck_hra_annual_fee_split_current.checked){
		div_HRA_annual_fee_split_current.style.visibility = "visible";
	} else {
		div_HRA_annual_fee_split_current.style.visibility = "hidden";
	}
	
	//Display renewal split?
	if (ck_hra_annual_fee_split_renewal.checked){
		div_HRA_annual_fee_split_renewal.style.visibility = "visible";
	} else {
		div_HRA_annual_fee_split_renewal.style.visibility = "hidden";
	}
	
	
	//Review item 10
	//Display Amt/Broker if either ckbox checked
	if (ck_std_maint_fee_split_current.checked || ck_std_maint_fee_split_renewal.checked) {
		div_STD_maint_fee_split.style.visibility = "visible";
	} else {
		 div_STD_maint_fee_split.style.visibility = "hidden";
	}
	
	// Display current split?
	if (ck_std_maint_fee_split_current.checked){
		div_STD_maint_fee_split_current.style.visibility = "visible";
	} else {
		div_STD_maint_fee_split_current.style.visibility = "hidden";
	}
	
	//Display renewal split?
	if (ck_std_maint_fee_split_renewal.checked){
		div_STD_maint_fee_split_renewal.style.visibility = "visible";
	} else {
		div_STD_maint_fee_split_renewal.style.visibility = "hidden";
	}
	
	//Review item 11
	//Display Amt/Broker if either ckbox checked
	if (ck_medrx_admin_fee_split_current.checked || ck_medrx_admin_fee_split_renewal.checked) {
		div_Medrx_admin_fee_split.style.visibility = "visible";
	} else {
		 div_Medrx_admin_fee_split.style.visibility = "hidden";
	}
	
	// Display current split?
	if (ck_medrx_admin_fee_split_current.checked){
		div_Medrx_admin_fee_split_current.style.visibility = "visible";
	} else {
		div_Medrx_admin_fee_split_current.style.visibility = "hidden";
	}
	
	//Display renewal split?
	if (ck_medrx_admin_fee_split_renewal.checked){
		div_Medrx_admin_fee_split_renewal.style.visibility = "visible";
	} else {
		div_Medrx_admin_fee_split_renewal.style.visibility = "hidden";
	}
	
	
	//Review item 12
	//Display Amt/Broker if either ckbox checked
	if (ck_vision_fee_split_current.checked || ck_vision_fee_split_renewal.checked) {
		div_Vision_fee_split.style.visibility = "visible";
	} else {
		 div_Vision_fee_split.style.visibility = "hidden";
	}
	
	// Display current split?
	if (ck_vision_fee_split_current.checked){
		div_Vision_fee_split_current.style.visibility = "visible";
	} else {
		div_Vision_fee_split_current.style.visibility = "hidden";
	}
	
	//Display renewal split?
	if (ck_vision_fee_split_renewal.checked){
		div_Vision_fee_split_renewal.style.visibility = "visible";
	} else {
		div_Vision_fee_split_renewal.style.visibility = "hidden";
	}
	
	//Review item 13
	//Display Amt/Broker if either ckbox checked
	if (ck_den_admin_fee_split_current.checked || ck_den_admin_fee_split_renewal.checked) {
		div_Den_admin_fee_split.style.visibility = "visible";
	} else {
		 div_Den_admin_fee_split.style.visibility = "hidden";
	}
	
	// Display current split?
	if (ck_den_admin_fee_split_current.checked){
		div_Den_admin_fee_split_current.style.visibility = "visible";
	} else {
		div_Den_admin_fee_split_current.style.visibility = "hidden";
	}
	
	//Display renewal split?
	if (ck_den_admin_fee_split_renewal.checked){
		div_Den_admin_fee_split_renewal.style.visibility = "visible";
	} else {
		div_Den_admin_fee_split_renewal.style.visibility = "hidden";
	} 
	
	//Review item 14
	
	//Display current other?
	if (ck_cobra_fee_other_current.checked){
		//Disable To HPI/To Broker/Total and Split Brokers after saving values in COBRA_fee_values_current
		
		//Save To HPI in cell [0]
		COBRA_fee_values_current[0] = "";
		ctrl = document.getElementById("txtT11_13_current_to_HPI");
		if (ctrl.value.length > 0) COBRA_fee_values_current[0] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
		 
		//Save To Broker in cell [1]
		COBRA_fee_values_current[1] = "";
		ctrl = document.getElementById("txtT11_13_current_to_Broker");
		if (ctrl.value.length > 0) COBRA_fee_values_current[1] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
		
		//Save Total in cell [2]
		COBRA_fee_values_current[2] = "";
		ctrl = document.getElementById("txtT11_13_current_Total");
		if (ctrl.value.length > 0) COBRA_fee_values_current[2] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
	   
		//Save Split Brk ckbox in cell [3]
		COBRA_fee_values_current[3] = "0";
		ctrl = document.getElementById("ckT11_13_current");
		if (ctrl.checked) COBRA_fee_values_current[3] = "1";
		ctrl.checked = false;
		ctrl.disabled = true;
		
		//Save Bkr 1 Split in cell [4]
		COBRA_fee_values_current[4] = "";
		ctrl = document.getElementById("txtT11_13_Bk1_current");
		if (ctrl.value.length > 0) COBRA_fee_values_current[4] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
		
		//Save Bkr 2 Split in cell [5]
		COBRA_fee_values_current[5] = "";
		ctrl = document.getElementById("txtT11_13_Bk2_current");
		if (ctrl.value.length > 0) COBRA_fee_values_current[5] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
		
		//Save Bkr 3 Split in cell [6]
		COBRA_fee_values_current[6] = "";
		ctrl = document.getElementById("txtT11_13_Bk3_current");
		if (ctrl.value.length > 0) COBRA_fee_values_current[6] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
		
		//Save Bkr 4 Split in cell [7]
		COBRA_fee_values_current[7] = "";
		ctrl = document.getElementById("txtT11_13_Bk4_current");
		if (ctrl.value.length > 0) COBRA_fee_values_current[7] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
		
		 //Save Bkr 5 Split in cell [8]
		COBRA_fee_values_current[8] = "";
		ctrl = document.getElementById("txtT11_13_Bk5_current");
		if (ctrl.value.length > 0) COBRA_fee_values_current[8] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
		
		//Display Other txtbox
		div_Cobra_fee_other_current.style.visibility = "visible";
		if (txtCobra_fee_other_current.value.length > 0){
			txtCobra_fee_other_current.className = "transparent";
		} else {
			txtCobra_fee_other_current.className = "highlight";
		}
	} else {
		//Restore values in COBRA_fee_values_current, if any
		if (COBRA_fee_values_current.length > 0) {
			//Restore To HPI from cell [0]
			ctrl = document.getElementById("txtT11_13_current_to_HPI");
			ctrl.value = COBRA_fee_values_current[0];
			ctrl.disabled = false; 
			
			//Restore To Broker from cell [1]
			ctrl = document.getElementById("txtT11_13_current_to_Broker");
			ctrl.value = COBRA_fee_values_current[1];
			ctrl.disabled = false; 
			
			//Restore Total from cell [2]
			ctrl = document.getElementById("txtT11_13_current_Total");
			ctrl.value = COBRA_fee_values_current[2];
			ctrl.disabled = false; 
			
			//Restore Split Ckbox from cell [3]
			ctrl = document.getElementById("ckT11_13_current");
			ctrl.disabled = false;
			if (COBRA_fee_values_current[3] == "1") ctrl.checked = true;
		   
			
			//Restore Bkr 1 from cell [4]
			ctrl = document.getElementById("txtT11_13_Bk1_current");
			ctrl.value = COBRA_fee_values_current[4];
			ctrl.disabled = false;
			
			//Restore Bkr 2 from cell [5]
			ctrl = document.getElementById("txtT11_13_Bk2_current");
			ctrl.value = COBRA_fee_values_current[5];
			ctrl.disabled = false;
			
			//Restore Bkr 3 from cell [6]
			ctrl = document.getElementById("txtT11_13_Bk3_current");
			ctrl.value = COBRA_fee_values_current[6];
			ctrl.disabled = false;
			
			//Restore Bkr 4 from cell [7]
			ctrl = document.getElementById("txtT11_13_Bk4_current");
			ctrl.value = COBRA_fee_values_current[7];
			ctrl.disabled = false;
			
			//Restore Bkr 5 from cell [8]
			ctrl = document.getElementById("txtT11_13_Bk5_current");
			ctrl.value = COBRA_fee_values_current[8];
			ctrl.disabled = false; 
			
			COBRA_fee_values_current = new Array(); 
		}
		
		//Hide Other txtbox 
		div_Cobra_fee_other_current.style.visibility = "hidden";
	}
	
	//Display Amt/Broker if either ckbox checked
	if (ck_cobra_fee_split_current.checked || ck_cobra_fee_split_renewal.checked) {
		div_Cobra_fee_split.style.visibility = "visible";
	} else {
		 div_Cobra_fee_split.style.visibility = "hidden";
	}
	
	// Display current split?
	if (ck_cobra_fee_split_current.checked){
		div_Cobra_fee_split_current.style.visibility = "visible";
	} else {
		div_Cobra_fee_split_current.style.visibility = "hidden";
	}
	
	//Display renewal other?
	if (ck_cobra_fee_other_renewal.checked){
		//Disable To HPI/To Broker/Total and Split Brokers after saving values in COBRA_fee_values_current
		
		//Save To HPI in cell [0]
		COBRA_fee_values_renewal[0] = "";
		ctrl = document.getElementById("txtT11_13_renewal_to_HPI");
		if (ctrl.value.length > 0) COBRA_fee_values_renewal[0] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
		 
		//Save To Broker in cell [1]
		COBRA_fee_values_renewal[1] = "";
		ctrl = document.getElementById("txtT11_13_renewal_to_Broker");
		if (ctrl.value.length > 0) COBRA_fee_values_renewal[1] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
		
		//Save Total in cell [2]
		COBRA_fee_values_renewal[2] = "";
		ctrl = document.getElementById("txtT11_13_renewal_Total");
		if (ctrl.value.length > 0) COBRA_fee_values_renewal[2] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
	   
		//Save Split Brk ckbox in cell [3]
		COBRA_fee_values_renewal[3] = "0";
		ctrl = document.getElementById("ckT11_13_renewal");
		if (ctrl.checked) COBRA_fee_values_renewal[3] = "1";
		ctrl.checked = false;
		ctrl.disabled = true;
		
		//Save Bkr 1 Split in cell [4]
		COBRA_fee_values_renewal[4] = "";
		ctrl = document.getElementById("txtT11_13_Bk1_renewal");
		if (ctrl.value.length > 0) COBRA_fee_values_renewal[4] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
		
		//Save Bkr 2 Split in cell [5]
		COBRA_fee_values_renewal[5] = "";
		ctrl = document.getElementById("txtT11_13_Bk2_renewal");
		if (ctrl.value.length > 0) COBRA_fee_values_renewal[5] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
		
		//Save Bkr 3 Split in cell [6]
		COBRA_fee_values_renewal[6] = "";
		ctrl = document.getElementById("txtT11_13_Bk3_renewal");
		if (ctrl.value.length > 0) COBRA_fee_values_renewal[6] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
		
		//Save Bkr 4 Split in cell [7]
		COBRA_fee_values_renewal[7] = "";
		ctrl = document.getElementById("txtT11_13_Bk4_renewal");
		if (ctrl.value.length > 0) COBRA_fee_values_renewal[7] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
		
		 //Save Bkr 5 Split in cell [8]
		COBRA_fee_values_renewal[8] = "";
		ctrl = document.getElementById("txtT11_13_Bk5_renewal");
		if (ctrl.value.length > 0) COBRA_fee_values_renewal[8] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
		
		div_Cobra_fee_other_renewal.style.visibility = "visible";
		if (txtCobra_fee_other_renewal.value.length > 0){
			txtCobra_fee_other_renewal.className = "transparent";
		} else {
			txtCobra_fee_other_renewal.className = "highlight";
		}
	} else {
		if (COBRA_fee_values_renewal.length > 0) {
			//Restore To HPI from cell [0]
			ctrl = document.getElementById("txtT11_13_renewal_to_HPI");
			ctrl.value = COBRA_fee_values_renewal[0];
			ctrl.disabled = false; 
			
			//Restore To Broker from cell [1]
			ctrl = document.getElementById("txtT11_13_renewal_to_Broker");
			ctrl.value = COBRA_fee_values_renewal[1];
			ctrl.disabled = false; 
			
			//Restore Total from cell [2]
			ctrl = document.getElementById("txtT11_13_renewal_Total");
			ctrl.value = COBRA_fee_values_renewal[2];
			ctrl.disabled = false; 
			
			//Restore Split Ckbox from cell [3]
			ctrl = document.getElementById("ckT11_13_renewal");
			ctrl.disabled = false;
			if (COBRA_fee_values_renewal[3] == "1") ctrl.checked = true;
		   
			
			//Restore Bkr 1 from cell [4]
			ctrl = document.getElementById("txtT11_13_Bk1_renewal");
			ctrl.value = COBRA_fee_values_renewal[4];
			ctrl.disabled = false;
			
			//Restore Bkr 2 from cell [5]
			ctrl = document.getElementById("txtT11_13_Bk2_renewal");
			ctrl.value = COBRA_fee_values_renewal[5];
			ctrl.disabled = false;
			
			//Restore Bkr 3 from cell [6]
			ctrl = document.getElementById("txtT11_13_Bk3_renewal");
			ctrl.value = COBRA_fee_values_renewal[6];
			ctrl.disabled = false;
			
			//Restore Bkr 4 from cell [7]
			ctrl = document.getElementById("txtT11_13_Bk4_renewal");
			ctrl.value = COBRA_fee_values_renewal[7];
			ctrl.disabled = false;
			
			//Restore Bkr 5 from cell [8]
			ctrl = document.getElementById("txtT11_13_Bk5_renewal");
			ctrl.value = COBRA_fee_values_renewal[8];
			ctrl.disabled = false; 
			
			COBRA_fee_values_renewal = new Array(); 
		}
		
		div_Cobra_fee_other_renewal.style.visibility = "hidden";
	}
	
	//Display renewal split?
	if (ck_cobra_fee_split_renewal.checked){
		div_Cobra_fee_split_renewal.style.visibility = "visible";
	} else {
		div_Cobra_fee_split_renewal.style.visibility = "hidden";
	}
	
	
	//Review item 15
	//Display Amt/Broker if either ckbox checked
	if (ck_HIPAA_fee_split_current.checked || ck_HIPAA_fee_split_renewal.checked) {
		div_HIPAA_fee_split.style.visibility = "visible";
	} else {
		 div_HIPAA_fee_split.style.visibility = "hidden";
	}
	
	 // Display current other?
	if (ck_HIPAA_fee_other_current.checked){
		//Disable To HPI/To Broker/Total and Split Brokers after saving values in COBRA_fee_values_current
		
		//Save To HPI in cell [0]
		HIPAA_fee_values_current[0] = "";
		ctrl = document.getElementById("txtT11_14_current_to_HPI");
		if (ctrl.value.length > 0) HIPAA_fee_values_current[0] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
		 
		//Save To Broker in cell [1]
		HIPAA_fee_values_current[1] = "";
		ctrl = document.getElementById("txtT11_14_current_to_Broker");
		if (ctrl.value.length > 0) HIPAA_fee_values_current[1] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
		
		//Save Total in cell [2]
		HIPAA_fee_values_current[2] = "";
		ctrl = document.getElementById("txtT11_14_current_Total");
		if (ctrl.value.length > 0) HIPAA_fee_values_current[2] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
	   
		//Save Split Brk ckbox in cell [3]
		HIPAA_fee_values_current[3] = "0";
		ctrl = document.getElementById("ckT11_14_current");
		if (ctrl.checked) HIPAA_fee_values_current[3] = "1";
		ctrl.checked = false;
		ctrl.disabled = true;
		
		//Save Bkr 1 Split in cell [4]
		HIPAA_fee_values_current[4] = "";
		ctrl = document.getElementById("txtT11_14_Bk1_current");
		if (ctrl.value.length > 0) HIPAA_fee_values_current[4] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
		
		//Save Bkr 2 Split in cell [5]
		HIPAA_fee_values_current[5] = "";
		ctrl = document.getElementById("txtT11_14_Bk2_current");
		if (ctrl.value.length > 0) HIPAA_fee_values_current[5] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
		
		//Save Bkr 3 Split in cell [6]
		HIPAA_fee_values_current[6] = "";
		ctrl = document.getElementById("txtT11_14_Bk3_current");
		if (ctrl.value.length > 0) HIPAA_fee_values_current[6] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
		
		//Save Bkr 4 Split in cell [7]
		HIPAA_fee_values_current[7] = "";
		ctrl = document.getElementById("txtT11_14_Bk4_current");
		if (ctrl.value.length > 0) HIPAA_fee_values_current[7] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
		
		//Save Bkr 5 Split in cell [8]
		HIPAA_fee_values_current[8] = "";
		ctrl = document.getElementById("txtT11_14_Bk5_current");
		if (ctrl.value.length > 0) HIPAA_fee_values_current[8] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
		
		div_HIPAA_fee_other_current.style.visibility = "visible";
		if (txtHIPAA_fee_other_current.value.length > 0){
			txtHIPAA_fee_other_current.className = "transparent";
		} else {
			txtHIPAA_fee_other_current.className = "highlight";
		}
	} else {
		if (HIPAA_fee_values_current.length > 0) {
			//Restore To HPI from cell [0]
			ctrl = document.getElementById("txtT11_14_current_to_HPI");
			ctrl.value = HIPAA_fee_values_current[0];
			ctrl.disabled = false; 
			
			//Restore To Broker from cell [1]
			ctrl = document.getElementById("txtT11_14_current_to_Broker");
			ctrl.value = HIPAA_fee_values_current[1];
			ctrl.disabled = false; 
			
			//Restore Total from cell [2]
			ctrl = document.getElementById("txtT11_14_current_Total");
			ctrl.value = HIPAA_fee_values_current[2];
			ctrl.disabled = false; 
			
			//Restore Split Ckbox from cell [3]
			ctrl = document.getElementById("ckT11_14_current");
			ctrl.disabled = false;
			if (HIPAA_fee_values_current[3] == "1") ctrl.checked = true;
		   
			
			//Restore Bkr 1 from cell [4]
			ctrl = document.getElementById("txtT11_14_Bk1_current");
			ctrl.value = HIPAA_fee_values_current[4];
			ctrl.disabled = false;
			
			//Restore Bkr 2 from cell [5]
			ctrl = document.getElementById("txtT11_14_Bk2_current");
			ctrl.value = HIPAA_fee_values_current[5];
			ctrl.disabled = false;
			
			//Restore Bkr 3 from cell [6]
			ctrl = document.getElementById("txtT11_14_Bk3_current");
			ctrl.value = HIPAA_fee_values_current[6];
			ctrl.disabled = false;
			
			//Restore Bkr 4 from cell [7]
			ctrl = document.getElementById("txtT11_14_Bk4_current");
			ctrl.value = HIPAA_fee_values_current[7];
			ctrl.disabled = false;
			
			//Restore Bkr 5 from cell [8]
			ctrl = document.getElementById("txtT11_14_Bk5_current");
			ctrl.value = HIPAA_fee_values_current[8];
			ctrl.disabled = false; 
			
			HIPAA_fee_values_current = new Array(); 
		}
		
		div_HIPAA_fee_other_current.style.visibility = "hidden";
	}
	
	// Display current split?
	if (ck_HIPAA_fee_split_current.checked){
		div_HIPAA_fee_split_current.style.visibility = "visible";
	} else {
		div_HIPAA_fee_split_current.style.visibility = "hidden";
	}
	
	// Display renewal other?
	if (ck_HIPAA_fee_other_renewal.checked){
		//Disable To HPI/To Broker/Total and Split Brokers after saving values in COBRA_fee_values_renewal
		
		//Save To HPI in cell [0]
		HIPAA_fee_values_renewal[0] = "";
		ctrl = document.getElementById("txtT11_14_renewal_to_HPI");
		if (ctrl.value.length > 0) HIPAA_fee_values_renewal[0] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
		 
		//Save To Broker in cell [1]
		HIPAA_fee_values_renewal[1] = "";
		ctrl = document.getElementById("txtT11_14_renewal_to_Broker");
		if (ctrl.value.length > 0) HIPAA_fee_values_renewal[1] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
		
		//Save Total in cell [2]
		HIPAA_fee_values_renewal[2] = "";
		ctrl = document.getElementById("txtT11_14_renewal_Total");
		if (ctrl.value.length > 0) HIPAA_fee_values_renewal[2] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
	   
		//Save Split Brk ckbox in cell [3]
		HIPAA_fee_values_renewal[3] = "0";
		ctrl = document.getElementById("ckT11_14_renewal");
		if (ctrl.checked) HIPAA_fee_values_renewal[3] = "1";
		ctrl.checked = false;
		ctrl.disabled = true;
		
		//Save Bkr 1 Split in cell [4]
		HIPAA_fee_values_renewal[4] = "";
		ctrl = document.getElementById("txtT11_14_Bk1_renewal");
		if (ctrl.value.length > 0) HIPAA_fee_values_renewal[4] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
		
		//Save Bkr 2 Split in cell [5]
		HIPAA_fee_values_renewal[5] = "";
		ctrl = document.getElementById("txtT11_14_Bk2_renewal");
		if (ctrl.value.length > 0) HIPAA_fee_values_renewal[5] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
		
		//Save Bkr 3 Split in cell [6]
		HIPAA_fee_values_renewal[6] = "";
		ctrl = document.getElementById("txtT11_14_Bk3_renewal");
		if (ctrl.value.length > 0) HIPAA_fee_values_renewal[6] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
		
		//Save Bkr 4 Split in cell [7]
		HIPAA_fee_values_renewal[7] = "";
		ctrl = document.getElementById("txtT11_14_Bk4_renewal");
		if (ctrl.value.length > 0) HIPAA_fee_values_renewal[7] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
		
		//Save Bkr 5 Split in cell [8]
		HIPAA_fee_values_renewal[8] = "";
		ctrl = document.getElementById("txtT11_14_Bk5_renewal");
		if (ctrl.value.length > 0) HIPAA_fee_values_renewal[8] = ctrl.value;
		ctrl.value = "";
		ctrl.disabled = true;
		
		div_HIPAA_fee_other_renewal.style.visibility = "visible";
		if (txtHIPAA_fee_other_renewal.value.length > 0){
			txtHIPAA_fee_other_renewal.className = "transparent";
		} else {
			txtHIPAA_fee_other_renewal.className = "highlight";
		}
	} else {
		 if (HIPAA_fee_values_renewal.length > 0) {
			//Restore To HPI from cell [0]
			ctrl = document.getElementById("txtT11_14_renewal_to_HPI");
			ctrl.value = HIPAA_fee_values_renewal[0];
			ctrl.disabled = false; 
			
			//Restore To Broker from cell [1]
			ctrl = document.getElementById("txtT11_14_renewal_to_Broker");
			ctrl.value = HIPAA_fee_values_renewal[1];
			ctrl.disabled = false; 
			
			//Restore Total from cell [2]
			ctrl = document.getElementById("txtT11_14_renewal_Total");
			ctrl.value = HIPAA_fee_values_renewal[2];
			ctrl.disabled = false; 
			
			//Restore Split Ckbox from cell [3]
			ctrl = document.getElementById("ckT11_14_renewal");
			ctrl.disabled = false;
			if (HIPAA_fee_values_renewal[3] == "1") ctrl.checked = true;
		   
			
			//Restore Bkr 1 from cell [4]
			ctrl = document.getElementById("txtT11_14_Bk1_renewal");
			ctrl.value = HIPAA_fee_values_renewal[4];
			ctrl.disabled = false;
			
			//Restore Bkr 2 from cell [5]
			ctrl = document.getElementById("txtT11_14_Bk2_renewal");
			ctrl.value = HIPAA_fee_values_renewal[5];
			ctrl.disabled = false;
			
			//Restore Bkr 3 from cell [6]
			ctrl = document.getElementById("txtT11_14_Bk3_renewal");
			ctrl.value = HIPAA_fee_values_renewal[6];
			ctrl.disabled = false;
			
			//Restore Bkr 4 from cell [7]
			ctrl = document.getElementById("txtT11_14_Bk4_renewal");
			ctrl.value = HIPAA_fee_values_renewal[7];
			ctrl.disabled = false;
			
			//Restore Bkr 5 from cell [8]
			ctrl = document.getElementById("txtT11_14_Bk5_renewal");
			ctrl.value = HIPAA_fee_values_renewal[8];
			ctrl.disabled = false; 
			
			HIPAA_fee_values_renewal = new Array(); 
		}
	
		div_HIPAA_fee_other_renewal.style.visibility = "hidden";
	}
	
	//Display renewal split?
	if (ck_HIPAA_fee_split_renewal.checked){
		div_HIPAA_fee_split_renewal.style.visibility = "visible";
	} else {
		div_HIPAA_fee_split_renewal.style.visibility = "hidden";
	} 
	
	//Review item 16
	//Display Amt/Broker if either ckbox checked
	if (ck_STD_fee_split_current.checked || ck_STD_fee_split_renewal.checked) {
		div_STD_fee_split.style.visibility = "visible";
	} else {
		 div_STD_fee_split.style.visibility = "hidden";
	}
	
	// Display current split?
	if (ck_STD_fee_split_current.checked){
		div_STD_fee_split_current.style.visibility = "visible";
	} else {
		div_STD_fee_split_current.style.visibility = "hidden";
	}
	
	//Display renewal split?
	if (ck_STD_fee_split_renewal.checked){
		div_STD_fee_split_renewal.style.visibility = "visible";
	} else {
		div_STD_fee_split_renewal.style.visibility = "hidden";
	}
	
	//Review item 17
	//Display Amt/Broker if either ckbox checked
	if (ck_LTD_fee_split_current.checked || ck_LTD_fee_split_renewal.checked) {
		div_LTD_fee_split.style.visibility = "visible";
	} else {
		 div_LTD_fee_split.style.visibility = "hidden";
	}
	
	// Display current split?
	if (ck_LTD_fee_split_current.checked){
		div_LTD_fee_split_current.style.visibility = "visible";
	} else {
		div_LTD_fee_split_current.style.visibility = "hidden";
	}
	
	//Display renewal split?
	if (ck_LTD_fee_split_renewal.checked){
		div_LTD_fee_split_renewal.style.visibility = "visible";
	} else {
		div_LTD_fee_split_renewal.style.visibility = "hidden";
	} 
	
	//Review item 18
	//Display Amt/Broker if either ckbox checked
	if (ck_Life_ADD_admin_fee_split_current.checked || ck_Life_ADD_admin_fee_split_renewal.checked) {
		div_Life_ADD_admin_fee_split.style.visibility = "visible";
	} else {
		 div_Life_ADD_admin_fee_split.style.visibility = "hidden";
	}
	
	// Display current split?
	if (ck_Life_ADD_admin_fee_split_current.checked){
		div_Life_ADD_admin_fee_split_current.style.visibility = "visible";
	} else {
		div_Life_ADD_admin_fee_split_current.style.visibility = "hidden";
	}
	
	//Display renewal split?
	if (ck_Life_ADD_admin_fee_split_renewal.checked){
		div_Life_ADD_admin_fee_split_renewal.style.visibility = "visible";
	} else {
		div_Life_ADD_admin_fee_split_renewal.style.visibility = "hidden";
	} 
	
	//Review item 19
	//Display Amt/Broker if either ckbox checked
	if (ck_RN_fee_split_current.checked || ck_RN_fee_split_renewal.checked) {
		div_RN_fee_split.style.visibility = "visible";
	} else {
		 div_RN_fee_split.style.visibility = "hidden";
	}
	
	// Display current split?
	if (ck_RN_fee_split_current.checked){
		div_RN_fee_split_current.style.visibility = "visible";
	} else {
		div_RN_fee_split_current.style.visibility = "hidden";
	}
	
	//Display renewal split?
	if (ck_RN_fee_split_renewal.checked){
		div_RN_fee_split_renewal.style.visibility = "visible";
	} else {
		div_RN_fee_split_renewal.style.visibility = "hidden";
	} 
	

	
	//Review item 20
	//Display Amt/Broker if either ckbox checked
	if (ck_nurse_fee_split_current.checked || ck_nurse_fee_split_renewal.checked) {
		div_Nurse_fee_split.style.visibility = "visible";
	} else {
		 div_Nurse_fee_split.style.visibility = "hidden";
	}
	
	// Display current split?
	if (ck_nurse_fee_split_current.checked){
		div_Nurse_fee_split_current.style.visibility = "visible";
	} else {
		div_Nurse_fee_split_current.style.visibility = "hidden";
	}
	
	//Display renewal split?
	if (ck_nurse_fee_split_renewal.checked){
		div_Nurse_fee_split_renewal.style.visibility = "visible";
	} else {
		div_Nurse_fee_split_renewal.style.visibility = "hidden";
	} 
	  
   //Review item 21
	if (ck_PEPM_other.checked){
	   div_PEPM_Other.style.visibility = "visible";
	   div_Other_fee.style.visibility = "visible";
	   if (txtPEPM_other.value.length > 0){
			txtPEPM_other.className = "transparent";
		}
		else
		{
			txtPEPM_other.className = "highlight";
		}
		
		// Display current split?
		if (ck_other_fee_split_current.checked){
			div_Other_fee_split_current.style.visibility = "visible";
		} else {
			div_Other_fee_split_current.style.visibility = "hidden";
		}
	
		//Display renewal split?
		if (ck_other_fee_split_renewal.checked){
			div_Other_fee_split_renewal.style.visibility = "visible";
		} else {
			div_Other_fee_split_renewal.style.visibility = "hidden";
		} 
		
	}
	

	//Review item 22
	//Display Amt/Broker if either ckbox checked
	if (ck_med_reimbursement_split_current.checked || ck_med_reimbursement_split_renewal.checked) {
		div_Med_reimbursement_split.style.visibility = "visible";
	} else {
		 div_Med_reimbursement_split.style.visibility = "hidden";
	}
	
	
	// Display current split?
	if (ck_med_reimbursement_split_current.checked){
		div_Med_reimbursement_split_current.style.visibility = "visible";
	} else {
		div_Med_reimbursement_split_current.style.visibility = "hidden";
	}
	
	
	//Display renewal split?
	if (ck_med_reimbursement_split_renewal.checked){
		div_Med_reimbursement_split_renewal.style.visibility = "visible";
	} else {
		div_Med_reimbursement_split_renewal.style.visibility = "hidden";
	} 
	
	//Review item 23
	//Display Amt/Broker if either ckbox checked
	if (ck_depcare_reimbursement_split_current.checked || ck_depcare_reimbursement_split_renewal.checked) {
		div_Depcare_reimbursement_split.style.visibility = "visible";
	} else {
		 div_Depcare_reimbursement_split.style.visibility = "hidden";
	}
	
	
	// Display current split?
	if (ck_depcare_reimbursement_split_current.checked){
		div_Depcare_reimbursement_split_current.style.visibility = "visible";
	} else {
		div_Depcare_reimbursement_split_current.style.visibility = "hidden";
	}
	
	
	//Display renewal split?
	if (ck_depcare_reimbursement_split_renewal.checked){
		div_Depcare_reimbursement_split_renewal.style.visibility = "visible";
	} else {
		div_Depcare_reimbursement_split_renewal.style.visibility = "hidden";
	} 
	
	
	
	//Review item 24
	//Display Amt/Broker if either ckbox checked
	if (ck_transportation_fee_split_current.checked || ck_transportation_fee_split_renewal.checked) {
		div_Transportation_fee_split.style.visibility = "visible";
	} else {
		 div_Transportation_fee_split.style.visibility = "hidden";
	}
	
	
	// Display current split?
	if (ck_transportation_fee_split_current.checked){
		div_Transportation_fee_split_current.style.visibility = "visible";
	} else {
		div_Transportation_fee_split_current.style.visibility = "hidden";
	}
	
	
	//Display renewal split?
	if (ck_transportation_fee_split_renewal.checked){
		div_Transportation_fee_split_renewal.style.visibility = "visible";
	} else {
		div_Transportation_fee_split_renewal.style.visibility = "hidden";
	} 
	
	//Review item 25
	//Display Amt/Broker if either ckbox checked
	if (ck_depmedcare_fee_split_current.checked || ck_depmedcare_fee_split_renewal.checked) {
		div_Depmedcare_fee_split.style.visibility = "visible";
	} else {
		 div_Depmedcare_fee_split.style.visibility = "hidden";
	}
	
	
	// Display current split?
	if (ck_depmedcare_fee_split_current.checked){
		div_Depmedcare_fee_split_current.style.visibility = "visible";
	} else {
		div_Depmedcare_fee_split_current.style.visibility = "hidden";
	}
	
	
	//Display renewal split?
	if (ck_depmedcare_fee_split_renewal.checked){
		div_Depmedcare_fee_split_renewal.style.visibility = "visible";
	} else {
		div_Depmedcare_fee_split_renewal.style.visibility = "hidden";
	} 
	
	//Review item 26
	//Display Amt/Broker if either ckbox checked
	if (ck_debitcard_fee_split_current.checked || ck_debitcard_fee_split_renewal.checked) {
		div_Debitcard_fee_split.style.visibility = "visible";
	} else {
		 div_Debitcard_fee_split.style.visibility = "hidden";
	}
	
	
	// Display current split?
	if (ck_debitcard_fee_split_current.checked){
		div_Debitcard_fee_split_current.style.visibility = "visible";
	} else {
		div_Debitcard_fee_split_current.style.visibility = "hidden";
	}
	
	
	//Display renewal split?
	if (ck_debitcard_fee_split_renewal.checked){
		div_Debitcard_fee_split_renewal.style.visibility = "visible";
	} else {
		div_Debitcard_fee_split_renewal.style.visibility = "hidden";
	} 
	
	//Review item 27
	if (rbT11_Wellness_current.checked){
		div_Wellness_current.style.visibility = "visible";
		if (txtWellness_current.value.length > 0){
			txtWellness_current.className = "transparent";
		}
		else
		{
			txtWellness_current.className = "highlight";
		}
	}
	
	if (rbT11_Wellness_renewal.checked){
		div_Wellness_renewal.style.visibility = "visible";
		if (txtWellness_renewal.value.length > 0){
			txtWellness_renewal.className = "transparent";
		}
		else
		{
			txtWellness_renewal.className = "highlight";
		}
	}
	
	
	//Review item 28
	if (rbT11_Wellness_Portal_current.checked){
		div_Wellness_Portal_current.style.visibility = "visible";
		if (txtWellness_Portal_current.value.length > 0){
			txtWellness_Portal_current.className = "transparent";
		}
		else
		{
			txtWellness_Portal_current.className = "highlight";
		}
	}
	
	if (rbT11_Wellness_Portal_renewal.checked){
		div_Wellness_Portal_renewal.style.visibility = "visible";
		if (txtWellness_Portal_renewal.value.length > 0){
			txtWellness_Portal_renewal.className = "transparent";
		}
		else
		{
			txtWellness_Portal_renewal.className = "highlight";
		}
}

    //Review item 33, Complex CM Fee
if (txtComplex_CM_Fee_current.value.length > 0) sp_Compex_CM_current.style.visibility = "visible";
if (txtComplex_CM_Fee_renewal.value.length > 0) sp_Compex_CM_renewal.style.visibility = "visible";
	
	//Review item 34
	if (rbT11_RareDM_FeeAmt_current.checked){
		txtFeeAmt_RareDM_current.style.visibility = "visible";
		if (txtFeeAmt_RareDM_current.value.length > 0){
			txtFeeAmt_RareDM_current.className = "transparent";
		}
		else
		{
			txtFeeAmt_RareDM_current.className = "highlight";
		}
	}
	
	if (rbT11_RareDM_FeeAmt_renewal.checked){
		txtFeeAmt_RareDM_renewal.style.visibility = "visible";
		if (txtFeeAmt_RareDM_renewal.value.length > 0){
			txtFeeAmt_RareDM_renewal.className = "transparent";
		}
		else
		{
			txtFeeAmt_RareDM_renewal.className = "highlight";
		}
	}
	
	//Review item 35
	if (rbT11_ChronicDM_FeeAmt_current.checked){
		txtFeeAmt_ChronicDM_current.style.visibility = "visible";
		if (txtFeeAmt_ChronicDM_current.value.length > 0){
			txtFeeAmt_ChronicDM_current.className = "transparent";
		}
		else
		{
			txtFeeAmt_ChronicDM_current.className = "highlight";
		}
	}
	
	if (rbT11_ChronicDM_FeeAmt_renewal.checked){
		txtFeeAmt_ChronicDM_renewal.style.visibility = "visible";
		if (txtFeeAmt_ChronicDM_renewal.value.length > 0){
			txtFeeAmt_ChronicDM_renewal.className = "transparent";
		}
		else
		{
			txtFeeAmt_ChronicDM_renewal.className = "highlight";
		}
	}

	//US Med Diabetic Monitoring
    if (rbT11_USMed_Diabetic_Monitoring_current.checked) {
        txtFeeAmt_USMed_Diabetic_Monitoring_current.style.visibility = "visible";
        if (txtFeeAmt_USMed_Diabetic_Monitoring_current.value.length > 0) {
            txtFeeAmt_USMed_Diabetic_Monitoring_current.className = "transparent";
        }
        else {
            txtFeeAmt_USMed_Diabetic_Monitoring_current.className = "highlight";
        }
    }

    if (rbT11_USMed_Diabetic_Monitoring_renewal.checked) {
        txtFeeAmt_USMed_Diabetic_Monitoring_renewal.style.visibility = "visible";
        if (txtFeeAmt_USMed_Diabetic_Monitoring_renewal.value.length > 0) {
            txtFeeAmt_USMed_Diabetic_Monitoring_renewal.className = "transparent";
        }
        else {
            txtFeeAmt_USMed_Diabetic_Monitoring_renewal.className = "highlight";
        }
    }

	//Review item 54
	if (rbT11_Specific_rates_apply_current.checked){
		div_Specific_rates_apply_current.style.visibility = "visible";
		if (txtSpecific_rates_apply_current.value.length > 0){
			txtSpecific_rates_apply_current.className = "transparent";
		}
		else
		{
			txtSpecific_rates_apply_current.className = "highlight";
		}
	}
	
	if (rbT11_Specific_rates_apply_renewal.checked){
		div_Specific_rates_apply_renewal.style.visibility = "visible";
		if (txtSpecific_rates_apply_renewal.value.length > 0){
			txtSpecific_rates_apply_renewal.className = "transparent";
		}
		else
		{
			txtSpecific_rates_apply_renewal.className = "highlight";
		}
	}
	
	//Review item 56
	if (ck_specific_rates_other_current.checked){
	   txtSpecific_rates_other_current.style.visibility = "visible";
	   if (txtSpecific_rates_other_current.value.length > 0){
			txtSpecific_rates_other_current.className = "transparent";
		}
		else
		{
			txtSpecific_rates_other_current.className = "highlight";
		}
	}
	
	 if (ck_specific_rates_other_renewal.checked){
	   txtSpecific_rates_other_renewal.style.visibility = "visible";
	   if (txtSpecific_rates_other_renewal.value.length > 0){
			txtSpecific_rates_other_renewal.className = "transparent";
		}
		else
		{
			txtSpecific_rates_other_renewal.className = "highlight";
		}
	}
	
	//Review item 66
	if (rbT11_NH_Assessment_Fee_current.checked){
		txtNH_Assessment_Fee_current.style.visibility = "visible";
		lblNH_Assessment_Fee_current.style.visibility = "visible";
		if (txtNH_Assessment_Fee_current.value.length > 0){
			txtNH_Assessment_Fee_current.className = "transparent";
		}
		else
		{
			txtNH_Assessment_Fee_current.className = "highlight";
		}
	}
	
	if (rbT11_NH_Assessment_Fee_renewal.checked){
		txtNH_Assessment_Fee_renewal.style.visibility = "visible";
		lblNH_Assessment_Fee_renewal.style.visibility = "visible";
		if (txtNH_Assessment_Fee_renewal.value.length > 0){
			txtNH_Assessment_Fee_renewal.className = "transparent";
		}
		else
		{
			txtNH_Assessment_Fee_renewal.className = "highlight";
		}
	}
	
	//Review item 67
	if (rbT11_Aggregate_rates_apply_current.checked){
		div_Aggregate_rates_apply_current.style.visibility = "visible";
		if (txtAggregate_rates_apply_current.value.length > 0){
			txtAggregate_rates_apply_current.className = "transparent";
		}
		else
		{
			txtAggregate_rates_apply_current.className = "highlight";
		}
	}
	
	if (rbT11_Aggregate_rates_apply_renewal.checked){
		div_Aggregate_rates_apply_renewal.style.visibility = "visible";
		if (txtAggregate_rates_apply_renewal.value.length > 0){
			txtAggregate_rates_apply_renewal.className = "transparent";
		}
		else
		{
			txtAggregate_rates_apply_renewal.className = "highlight";
		}
	}
	
	//Review item 69
	if (ck_aggregate_rates_other_current.checked){
	   txtAggregate_rates_other_current.style.visibility = "visible";
	   if (txtAggregate_rates_other_current.value.length > 0){
			txtAggregate_rates_other_current.className = "transparent";
		}
		else
		{
			txtAggregate_rates_other_current.className = "highlight";
		}
	}
	
	 if (ck_aggregate_rates_other_renewal.checked){
	   txtAggregate_rates_other_renewal.style.visibility = "visible";
	   if (txtAggregate_rates_other_renewal.value.length > 0){
			txtAggregate_rates_other_renewal.className = "transparent";
		}
		else
		{
			txtAggregate_rates_other_renewal.className = "highlight";
		}
	}
	
	//Review item 71
	if (rbT11_Reinsurance_Deductible_Ind_current.checked){
		div_Deductible_Aggregate_current.style.visibility = "visible";
	}
	if (rbT11_Reinsurance_Deductible_Fam_current.checked){
		div_Deductible_Aggregate_current.style.visibility = "visible";
	}
	if (rbT11_Reinsurance_Deductible_Ind_renewal.checked){
		div_Deductible_Aggregate_renewal.style.visibility = "visible";
	}
	if (rbT11_Reinsurance_Deductible_Fam_renewal.checked){
		div_Deductible_Aggregate_renewal.style.visibility = "visible";
	}
	
	//Review item 73
	if (ck_remit_prem_current.checked){
		//Set Other to visible
		txtRemitPrem_Other_current.style.visibility = "visible";
		if (txtRemitPrem_Other_current.value.length > 0){
			txtRemitPrem_Other_current.className = "transparent";
		}
		else
		{
			txtRemitPrem_Other_current.className = "highlight";
		}
		
		//Unck & disable rb's, hide PEPM/Annual text boxes & set to blank,
rbT11_RemitPrem_PEPM_current.checked = false;
rbT11_RemitPrem_Annual_current.checked = false;

    if (!readonly) {
        if (rbT11_modify_current.checked) rbT11_RemitPrem_PEPM_current.disabled = true;
        if (rbT11_modify_current.checked) rbT11_RemitPrem_Annual_current.disabled = true;
    }		
		txtRemitPrem_PEPM_current_med,value = "";
		txtRemitPrem_PEPM_current_den,value = "";
		txtRemitPrem_Annual_current.value = "";
		div_RemitPrem_PEPM_current.style.visibility = "hidden";
		div_RemitPrem_Annual_current.style.visibility = "hidden";
	   
	} else {
    //Enable rb's
	    if (!readonly) {
	        if (rbT11_modify_current.checked) rbT11_RemitPrem_PEPM_current.disabled = false;
	        if (rbT11_modify_current.checked) rbT11_RemitPrem_Annual_current.disabled = false;
	    } 
	}
	
	if (rbT11_RemitPrem_PEPM_current.checked){        
		div_RemitPrem_PEPM_current.style.visibility = "visible";
		if (txtRemitPrem_PEPM_current_med.value.length > 0){
			txtRemitPrem_PEPM_current_med.className = "transparent";
		}
		else
		{
			txtRemitPrem_PEPM_current_med.className = "highlight";
		}
		
		if (txtRemitPrem_PEPM_current_den.value.length > 0){
			txtRemitPrem_PEPM_current_den.className = "transparent";
		}
		else
		{
			txtRemitPrem_PEPM_current_den.className = "highlight";
		}
	}
	
	if (rbT11_RemitPrem_Annual_current.checked){
		
		div_RemitPrem_Annual_current.style.visibility = "visible";
		if (txtRemitPrem_Annual_current.value.length > 0){
			txtRemitPrem_Annual_current.className = "transparent";
		}
		else
		{
			txtRemitPrem_Annual_current.className = "highlight";
		}
	}
	
	if (ck_remit_prem_renewal.checked){
	   
		//Unck & disable rb's, hide PEPM/Annual text boxes & set to blank,
		rbT11_RemitPrem_PEPM_renewal.checked = false;
		rbT11_RemitPrem_Annual_renewal.checked = false;

		if (!readonly) {
		    if (rbT11_modify_renewal.checked) rbT11_RemitPrem_PEPM_renewal.disabled = true;
		    if (rbT11_modify_renewal.checked) rbT11_RemitPrem_Annual_renewal.disabled = true;
		}
              
		txtRemitPrem_PEPM_renewal_med,value = "";
		txtRemitPrem_PEPM_renewal_den,value = "";
		txtRemitPrem_Annual_renewal.value = "";
		
		//Set Other to visible
		txtRemitPrem_Other_renewal.style.visibility = "visible";
		if (txtRemitPrem_Other_renewal.value.length > 0){
			txtRemitPrem_Other_renewal.className = "transparent";
		}
		else
		{
			txtRemitPrem_Other_renewal.className = "highlight";
		}
} else {
    if (!readonly) {
        //Enable rb's
        if (rbT11_modify_renewal.checked) rbT11_RemitPrem_PEPM_renewal.disabled = false;
        if (rbT11_modify_renewal.checked) rbT11_RemitPrem_Annual_renewal.disabled = false;     
    }
}
	
	 if (rbT11_RemitPrem_PEPM_renewal.checked){        
		div_RemitPrem_PEPM_renewal.style.visibility = "visible";
		if (txtRemitPrem_PEPM_renewal_med.value.length > 0){
			txtRemitPrem_PEPM_renewal_med.className = "transparent";
		}
		else
		{
			txtRemitPrem_PEPM_renewal_med.className = "highlight";
		}
		
		if (txtRemitPrem_PEPM_renewal_den.value.length > 0){
			txtRemitPrem_PEPM_renewal_den.className = "transparent";
		}
		else
		{
			txtRemitPrem_PEPM_renewal_den.className = "highlight";
		}
	}
	
	if (rbT11_RemitPrem_Annual_renewal.checked){        
		div_RemitPrem_Annual_renewal.style.visibility = "visible";
		if (txtRemitPrem_Annual_renewal.value.length > 0){
			txtRemitPrem_Annual_renewal.className = "transparent";
		}
		else
		{
			txtRemitPrem_Annual_renewal.className = "highlight";
		}
	}
	
	
	 //Review item 108
	if (rbT11_SubmitPremNet_current.checked){
		lblSubmitPrem.style.visibility = "hidden";
		txtSubmitPremNet_current.style.visibility = "visible";
		if (txtSubmitPremNet_current.value.length > 0){
			txtSubmitPremNet_current.className = "transparent";
		}
		else
		{
			txtSubmitPremNet_current.className = "highlight";
		}
	}
	
	if (rbT11_SubmitPremNet_renewal.checked){
		lblSubmitPrem.style.visibility = "hidden";
		txtSubmitPremNet_renewal.style.visibility = "visible";
		if (txtSubmitPremNet_renewal.value.length > 0){
			txtSubmitPremNet_renewal.className = "transparent";
		}
		else
		{
			txtSubmitPremNet_renewal.className = "highlight";
		}
	}
	
	//Review item 146
	if (rbT11_ClientAddress_current.checked){
		div_ClientAddress_current.style.visibility = "visible";
		div_ClientAddress_label.style.visibility = "visible";
		if (txtClient_Addr1_current.value.length > 0){
			txtClient_Addr1_current.className = "transparent";
		}
		else
		{
			txtClient_Addr1_current.className = "highlight";
		}
		
		if (txtClient_Addr2_current.value.length > 0){
			txtClient_Addr2_current.className = "transparent";
		}
		else
		{
			txtClient_Addr2_current.className = "highlight";
		}
		
		if (txtClient_City_current.value.length > 0){
			txtClient_City_current.className = "transparent";
		}
		else
		{
			txtClient_City_current.className = "highlight";
		}
		
		if (txtClient_State_current.value.length > 0){
			txtClient_State_current.className = "transparent";
		}
		else
		{
			txtClient_State_current.className = "highlight";
		}
		
		if (txtClient_Zip_current.value.length > 0){
			txtClient_Zip_current.className = "transparent";
		}
		else
		{
			txtClient_Zip_current.className = "highlight";
		}
	}
	
	if (rbT11_ClientAddress_renewal.checked){
		div_ClientAddress_renewal.style.visibility = "visible";
		div_ClientAddress_label.style.visibility = "visible";
		if (txtClient_Addr1_renewal.value.length > 0){
			txtClient_Addr1_renewal.className = "transparent";
		}
		else
		{
			txtClient_Addr1_renewal.className = "highlight";
		}
		
		if (txtClient_Addr2_renewal.value.length > 0){
			txtClient_Addr2_renewal.className = "transparent";
		}
		else
		{
			txtClient_Addr2_renewal.className = "highlight";
		}
		
		if (txtClient_City_renewal.value.length > 0){
			txtClient_City_renewal.className = "transparent";
		}
		else
		{
			txtClient_City_renewal.className = "highlight";
		}
		
		if (txtClient_State_renewal.value.length > 0){
			txtClient_State_renewal.className = "transparent";
		}
		else
		{
			txtClient_State_renewal.className = "highlight";
		}
		
		if (txtClient_Zip_renewal.value.length > 0){
			txtClient_Zip_renewal.className = "transparent";
		}
		else
		{
			txtClient_Zip_renewal.className = "highlight";
		}
	}
	
	//Review item 150
	//Display Amt/Broker if either ckbox checked
	if (ck_hra_fee_split_current.checked || ck_hra_fee_split_renewal.checked) {
		div_HRA_fee_split.style.visibility = "visible";
	} else {
		 div_HRA_fee_split.style.visibility = "hidden";
	}
	
	// Display current split?
	if (ck_hra_fee_split_current.checked){
		div_HRA_fee_split_current.style.visibility = "visible";
	} else {
		div_HRA_fee_split_current.style.visibility = "hidden";
	}
	
	//Display renewal split?
	if (ck_hra_fee_split_renewal.checked){
		div_HRA_fee_split_renewal.style.visibility = "visible";
	} else {
		div_HRA_fee_split_renewal.style.visibility = "hidden";
	} 
	
	//Move to next control if necessary
	if (movetocontrol.length > 0) {
		$(movetocontrol).focus();
		movetocontrol = "";
	}

	//Review item 166
	if (rbT11_ChronicDM_MedWatch_current.checked) {
		 txtFeeAmt_ChronicDM_MedWatch_current.style.visibility = "visible";
		 if (txtFeeAmt_ChronicDM_MedWatch_current.value.length > 0) {
			 txtFeeAmt_ChronicDM_MedWatch_current.className = "transparent";
		}
		else {
			txtFeeAmt_ChronicDM_MedWatch_current.className = "highlight";
		}
	}

	if (rbT11_ChronicDM_MedWatch_renewal.checked) {
		txtFeeAmt_ChronicDM_MedWatch_renewal.style.visibility = "visible";
		if (txtFeeAmt_ChronicDM_MedWatch_renewal.value.length > 0) {
			txtFeeAmt_ChronicDM_MedWatch_renewal.className = "transparent";
		}
		else {
			txtFeeAmt_ChronicDM_MedWatch_renewal.className = "highlight";
		}
	}

	//Review item 167
	if (rbT11_CallMD_MedWatch_current.checked) {
		txtFeeAmt_CallMD_MedWatch_current.style.visibility = "visible";
		if (txtFeeAmt_CallMD_MedWatch_current.value.length > 0) {
			txtFeeAmt_CallMD_MedWatch_current.className = "transparent";
		}
		else {
			txtFeeAmt_CallMD_MedWatch_current.className = "highlight";
		}
	}

	if (rbT11_CallMD_MedWatch_renewal.checked) {
		txtFeeAmt_CallMD_MedWatch_renewal.style.visibility = "visible";
		if (txtFeeAmt_CallMD_MedWatch_renewal.value.length > 0) {
			txtFeeAmt_CallMD_MedWatch_renewal.className = "transparent";
		}
		else {
			txtFeeAmt_CallMD_MedWatch_renewal.className = "highlight";
		}
	}

	//Review item 168
	if (rbT11_RareDM_MedWatch_current.checked) {
		txtFeeAmt_RareDM_MedWatch_current.style.visibility = "visible";
		if (txtFeeAmt_RareDM_MedWatch_current.value.length > 0) {
			txtFeeAmt_RareDM_MedWatch_current.className = "transparent";
		}
		else {
			txtFeeAmt_RareDM_MedWatch_current.className = "highlight";
		}
	}

	if (rbT11_RareDM_MedWatch_renewal.checked) {
		txtFeeAmt_RareDM_MedWatch_renewal.style.visibility = "visible";
		if (txtFeeAmt_RareDM_MedWatch_renewal.value.length > 0) {
			txtFeeAmt_RareDM_MedWatch_renewal.className = "transparent";
		}
		else {
			txtFeeAmt_RareDM_MedWatch_renewal.className = "highlight";
		}
	}

	//Review item 170
	//Display Amt/Broker if either ckbox checked
	if (ck_hsa_fee_split_current.checked || ck_hsa_fee_split_renewal.checked) {
		div_HSA_fee_split.style.visibility = "visible";
	} else {
		div_HSA_fee_split.style.visibility = "hidden";
	}

	// Display current split?
	if (ck_hsa_fee_split_current.checked) {
		div_HSA_fee_split_current.style.visibility = "visible";
	} else {
		div_HSA_fee_split_current.style.visibility = "hidden";
	}

	//Display renewal split?
	if (ck_hsa_fee_split_renewal.checked) {
		div_HSA_fee_split_renewal.style.visibility = "visible";
	} else {
		div_HSA_fee_split_renewal.style.visibility = "hidden";
	}
    
    // Review item 171
    if (rbT11_Steps2Health_MedWatch_current.checked) {
        txtFeeAmt_Steps2Health_MedWatch_current.style.visibility = "visible";
        //ddlT11_Steps2Health_EventMonth_current.style.visibility = "visible";

        if (txtFeeAmt_Steps2Health_MedWatch_current.value.length > 0) {
            txtFeeAmt_Steps2Health_MedWatch_current.className = "transparent";
        }
        else {
            txtFeeAmt_Steps2Health_MedWatch_current.className = "highlight";
        }
    }

    if (rbT11_Steps2Health_MedWatch_renewal.checked) {
        txtFeeAmt_Steps2Health_MedWatch_renewal.style.visibility = "visible";
        //ddlT11_Steps2Health_EventMonth_renewal.style.visibility = "visible";

        if (txtFeeAmt_Steps2Health_MedWatch_renewal.value.length > 0) {
            txtFeeAmt_Steps2Health_MedWatch_renewal.className = "transparent";
        }
        else {
            txtFeeAmt_Steps2Health_MedWatch_renewal.className = "highlight";
        }
    }
    // TW 05/11/2016 BEGIN Control visibility for MedWatch Event Month
    if (rbT11_Steps2Health_MedWatch_NoChg_current.checked || rbT11_Steps2Health_MedWatch_current.checked) {
        ddlT11_Steps2Health_EventMonth_current.style.visibility = "visible";
    } else {
        ddlT11_Steps2Health_EventMonth_current.style.visibility = "hidden";
    }
    if (rbT11_Steps2Health_MedWatch_NoChg_renewal.checked || rbT11_Steps2Health_MedWatch_renewal.checked) {
        ddlT11_Steps2Health_EventMonth_renewal.style.visibility = "visible";
    } else {
        ddlT11_Steps2Health_EventMonth_renewal.style.visibility = "hidden";
    }
    if (rbT11_Steps2Health_MedWatch_NoChg_current.checked
    || rbT11_Steps2Health_MedWatch_current.checked
    || rbT11_Steps2Health_MedWatch_NoChg_renewal.checked 
    || rbT11_Steps2Health_MedWatch_renewal.checked) {
        lblT11_Steps2Health_MedWatch_Event_Month.style.visibility = "visible";
    } else {
        lblT11_Steps2Health_MedWatch_Event_Month.style.visibility = "hidden";
    }

    // TW 05/11/2016 *END* Control visibility for MedWatch Event Month

    // TW 04/28/2016 BEGIN Added for IT # 923
    // Review item 177
    if (rbT11_CallADoc_MedWatch_current.checked) {
        txtFeeAmt_CallADoc_MedWatch_current.style.visibility = "visible";
        if (txtFeeAmt_CallADoc_MedWatch_current.value.length > 0) {
            txtFeeAmt_CallADoc_MedWatch_current.className = "transparent";
        }
        else {
            txtFeeAmt_CallADoc_MedWatch_current.className = "highlight";
        }
    }
    if (rbT11_CallADoc_MedWatch_renewal.checked) {
        txtFeeAmt_CallADoc_MedWatch_renewal.style.visibility = "visible";
        if (txtFeeAmt_CallADoc_MedWatch_renewal.value.length > 0) {
            txtFeeAmt_CallADoc_MedWatch_renewal.className = "transparent";
        }
        else {
            txtFeeAmt_CallADoc_MedWatch_renewal.className = "highlight";
        }
    }
    // Review item 178
    if (rbT11_Lifestyle_Mgt_Coaching_current.checked) {
        txtFeeAmt_Lifestyle_Mgt_Coaching_current.style.visibility = "visible";

        if (txtFeeAmt_Lifestyle_Mgt_Coaching_current.value.length > 0) {
            txtFeeAmt_Lifestyle_Mgt_Coaching_current.className = "transparent";
        }
        else {
            txtFeeAmt_Lifestyle_Mgt_Coaching_current.className = "highlight";
        }
    }

    if (rbT11_Lifestyle_Mgt_Coaching_renewal.checked) {
        txtFeeAmt_Lifestyle_Mgt_Coaching_renewal.style.visibility = "visible";

        if (txtFeeAmt_Lifestyle_Mgt_Coaching_renewal.value.length > 0) {
            txtFeeAmt_Lifestyle_Mgt_Coaching_renewal.className = "transparent";
        }
        else {
            txtFeeAmt_Lifestyle_Mgt_Coaching_renewal.className = "highlight";
        }
    }
    // TW 05/10/2015 BEGIN Control item 178 Client Direct visibility
    // checkbox current
    if ((rbT11_Lifestyle_Mgt_Coaching_current.checked)
    || (rbT11_LifeStyle_Mgt_Coaching_NoChg_current.checked)) {
        ckT11_Lifestyle_Mgt_ClientDirect_current.style.visibility = "visible";
    } else {
        ckT11_Lifestyle_Mgt_ClientDirect_current.style.visibility = "hidden";
    }
    // checkbox renewal
    if ((rbT11_Lifestyle_Mgt_Coaching_renewal.checked)
    || (rbT11_LifeStyle_Mgt_Coaching_NoChg_renewal.checked)) {
        ckT11_Lifestyle_Mgt_ClientDirect_renewal.style.visibility = "visible";
    } else {
        ckT11_Lifestyle_Mgt_ClientDirect_renewal.style.visibility = "hidden";
    }
    // label
    if ((ckT11_Lifestyle_Mgt_ClientDirect_current.style.visibility == "visible")
    || (ckT11_Lifestyle_Mgt_ClientDirect_renewal.style.visibility == "visible")) {
        lblT11_Lifestyle_Mgt_ClientDirect.style.visibility = "visible";
    } else {
        lblT11_Lifestyle_Mgt_ClientDirect.style.visibility = "hidden";
    }
    // TW 05/10/2015 *END* Control item 178 Client Direct visibility

    // Review item 179
    if (rbT11_Disease_Mgt_Coaching_current.checked) {
        txtFeeAmt_Disease_Mgt_Coaching_current.style.visibility = "visible";

        if (txtFeeAmt_Disease_Mgt_Coaching_current.value.length > 0) {
            txtFeeAmt_Disease_Mgt_Coaching_current.className = "transparent";
        }
        else {
            txtFeeAmt_Disease_Mgt_Coaching_current.className = "highlight";
        }
    }

    if (rbT11_Disease_Mgt_Coaching_renewal.checked) {
        txtFeeAmt_Disease_Mgt_Coaching_renewal.style.visibility = "visible";

        if (txtFeeAmt_Disease_Mgt_Coaching_renewal.value.length > 0) {
            txtFeeAmt_Disease_Mgt_Coaching_renewal.className = "transparent";
        }
        else {
            txtFeeAmt_Disease_Mgt_Coaching_renewal.className = "highlight";
        }
    } 

    // TW 05/10/2015 BEGIN Control item 179 Client Direct visibility
    // checkbox current
    if ((rbT11_Disease_Mgt_Coaching_current.checked)
    || (rbT11_Disease_Mgt_Coaching_NoChg_current.checked)) {
        ckT11_Disease_Mgt_ClientDirect_current.style.visibility = "visible";
    } else {
        ckT11_Disease_Mgt_ClientDirect_current.style.visibility = "hidden";
    }
    // checkbox renewal
    if ((rbT11_Disease_Mgt_Coaching_renewal.checked)
    || (rbT11_Disease_Mgt_Coaching_NoChg_renewal.checked)) {
        ckT11_Disease_Mgt_ClientDirect_renewal.style.visibility = "visible";
    } else {
        ckT11_Disease_Mgt_ClientDirect_renewal.style.visibility = "hidden";
    }
    // label
    if ((ckT11_Disease_Mgt_ClientDirect_current.style.visibility == "visible")
    || (ckT11_Disease_Mgt_ClientDirect_renewal.style.visibility == "visible")) {
        lblT11_Disease_Mgt_ClientDirect.style.visibility = "visible";
    } else {
        lblT11_Disease_Mgt_ClientDirect.style.visibility = "hidden";
    }
    // TW 05/10/2015 *END* Control item 179 Client Direct visibility

    // Review item 180
    if (rbT11_Onsite_Coach_current.checked) {
        txtFeeAmt_Onsite_Coach_current.style.visibility = "visible";
        ckT11_Onsite_Coach_ClientDirect_current.style.visibility = "visible";

        if (txtFeeAmt_Onsite_Coach_current.value.length > 0) {
            txtFeeAmt_Onsite_Coach_current.className = "transparent";
        }
        else {
            txtFeeAmt_Onsite_Coach_current.className = "highlight";
        }
    } else {
        ckT11_Onsite_Coach_ClientDirect_current.style.visibility = "hidden";
    }

    if (rbT11_Onsite_Coach_renewal.checked) {
        txtFeeAmt_Onsite_Coach_renewal.style.visibility = "visible";
        ckT11_Onsite_Coach_ClientDirect_renewal.style.visibility = "visible";

        if (txtFeeAmt_Onsite_Coach_renewal.value.length > 0) {
            txtFeeAmt_Onsite_Coach_renewal.className = "transparent";
        }
        else {
            txtFeeAmt_Onsite_Coach_renewal.className = "highlight";
        }
    } else {
        ckT11_Onsite_Coach_ClientDirect_renewal.style.visibility = "hidden";
    }
    // TW 05/10/2015 BEGIN Control item 180 Client Direct visibility
    // checkbox current
    if ((rbT11_Onsite_Coach_current.checked)
    || (rbT11_Onsite_Coach_NoChg_current.checked)) {
        ckT11_Onsite_Coach_ClientDirect_current.style.visibility = "visible";
    } else {
        ckT11_Onsite_Coach_ClientDirect_current.style.visibility = "hidden";
    }
    // checkbox renewal
    if ((rbT11_Onsite_Coach_renewal.checked)
    || (rbT11_Onsite_Coach_NoChg_renewal.checked)) {
        ckT11_Onsite_Coach_ClientDirect_renewal.style.visibility = "visible";
    } else {
        ckT11_Onsite_Coach_ClientDirect_renewal.style.visibility = "hidden";
    }
    // label
    if ((ckT11_Onsite_Coach_ClientDirect_current.style.visibility == "visible")
    || (ckT11_Onsite_Coach_ClientDirect_renewal.style.visibility == "visible")) {
        lblT11_Onsite_Coach_ClientDirect.style.visibility = "visible";
    } else {
        lblT11_Onsite_Coach_ClientDirect.style.visibility = "hidden";
    }
    // TW 05/10/2015 *END* Control item 180 Client Direct visibility

    // Review item 181
    if (rbT11_Your_Health_Story_current.checked) {
        txtFeeAmt_Your_Health_Story_current.style.visibility = "visible";
        ckT11_Your_Health_Story_ClientDirect_current.style.visibility = "visible";

        if (txtFeeAmt_Your_Health_Story_current.value.length > 0) {
            txtFeeAmt_Your_Health_Story_current.className = "transparent";
        }
        else {
            txtFeeAmt_Your_Health_Story_current.className = "highlight";
        }
    } else {
        ckT11_Your_Health_Story_ClientDirect_current.style.visibility = "hidden";
    }

    if (rbT11_Your_Health_Story_renewal.checked) {
        txtFeeAmt_Your_Health_Story_renewal.style.visibility = "visible";
        ckT11_Your_Health_Story_ClientDirect_renewal.style.visibility = "visible";

        if (txtFeeAmt_Your_Health_Story_renewal.value.length > 0) {
            txtFeeAmt_Your_Health_Story_renewal.className = "transparent";
        }
        else {
            txtFeeAmt_Your_Health_Story_renewal.className = "highlight";
        }
    } else {
        ckT11_Your_Health_Story_ClientDirect_renewal.style.visibility = "hidden";
    }
    // TW 05/10/2015 BEGIN Control item 180 Client Direct visibility
    // checkbox current
    if ((rbT11_Your_Health_Story_current.checked)
    || (rbT11_Your_Health_Story_NoChg_current.checked)) {
        ckT11_Your_Health_Story_ClientDirect_current.style.visibility = "visible";
    } else {
        ckT11_Your_Health_Story_ClientDirect_current.style.visibility = "hidden";
    }
    // checkbox renewal
    if ((rbT11_Your_Health_Story_renewal.checked)
    || (rbT11_Your_Health_Story_NoChg_renewal.checked)) {
        ckT11_Your_Health_Story_ClientDirect_renewal.style.visibility = "visible";
    } else {
        ckT11_Your_Health_Story_ClientDirect_renewal.style.visibility = "hidden";
    }
    // label
    if ((ckT11_Your_Health_Story_ClientDirect_current.style.visibility == "visible")
    || (ckT11_Your_Health_Story_ClientDirect_renewal.style.visibility == "visible")) {
        lblT11_Your_Health_story_ClientDirect.style.visibility = "visible";
    } else {
        lblT11_Your_Health_story_ClientDirect.style.visibility = "hidden";
    }
    // TW 04/28/2016 *END* Added for IT # 923


    //review item 176
    //Hide labels for cost/option
    div_EatRight_cost.style.visibility = "hidden";
    div_EatRight_option.style.visibility = "hidden";
    // TW Added 1/25/2016
    div_EatRight_cost_exception.style.visibility = "hidden";
    div_EatRight_Implementation_Fee.style.visibility = "hidden";
    div_EatRight_Implementation_Fee_current.style.visibility = "hidden";
    div_EatRight_Implementation_Fee_renewal.style.visibility = "hidden";

    document.getElementById("txtT11_176b_current_2").style.visibility = "hidden";
    document.getElementById("txtT11_176b_renewal_2").style.visibility = "hidden";
    document.getElementById("txtT11_176b1_current_2").style.visibility = "hidden";
    document.getElementById("txtT11_176b1_renewal_2").style.visibility = "hidden";
    document.getElementById("txtT11_176b_current_3").style.visibility = "hidden";
    document.getElementById("txtT11_176b_renewal_3").style.visibility = "hidden";
    document.getElementById("txtT11_176b1_current_3").style.visibility = "hidden";
    document.getElementById("txtT11_176b1_renewal_3").style.visibility = "hidden";
    document.getElementById("txtT11_176b2_current_3").style.visibility = "hidden";
    document.getElementById("txtT11_176b2_renewal_3").style.visibility = "hidden";
    document.getElementById("txtT11_176b2_current_4").style.visibility = "hidden";
    document.getElementById("txtT11_176b2_renewal_4").style.visibility = "hidden";

    if (rbT11_EatRight_current.checked) {
        div_EatRight_cost.style.visibility = "visible";
        div_EatRight_cost_current.style.visibility = "visible";
        // TW Added 1/25/2016
        div_EatRight_cost_exception.style.visibility = "visible";
        div_EatRight_Implementation_Fee.style.visibility = "visible";
        div_EatRight_Implementation_Fee_current.style.visibility = "visible";

        if (rbT11_EatRight_cost_exception_current.checked) {
            div_EatRight_cost_exception_current.style.visibility = "visible";
            ctrl = document.getElementById("txtT11_176a_current")
            if (ctrl.value.length > 0) {
                ctrl.className = "transparent";
            }
            else {
                ctrl.className = "highlight";
            }
        } else {
            div_EatRight_cost_exception_current.style.visibility = "hidden";
        }        
        
        div_EatRight_option.style.visibility = "visible";
        div_EatRight_option_1_current.style.visibility = "visible";

        div_EatRight_option_2_current.style.visibility = "visible";
        div_EatRight_option_2_coupon_current.style.visibility = "visible";
        div_EatRight_option_2_score_current.style.visibility = "visible";
        if (document.getElementById("rbT11_176b_current_2").checked) {
            ctrl = document.getElementById("txtT11_176b_current_2") 
            ctrl.style.visibility = "visible";
            if (ctrl.value.length > 0) {
                ctrl.className = "transparent";
            }
            else {
                ctrl.className = "highlight";
            }

            ctrl = document.getElementById("txtT11_176b1_current_2")
            ctrl.style.visibility = "visible";
            if (ctrl.value.length > 0) {
                ctrl.className = "transparent";
            }
            else {
                ctrl.className = "highlight";
            }
        }
        
        div_EatRight_option_3_current.style.visibility = "visible";
        div_EatRight_option_3_coupon_current.style.visibility = "visible";
        div_EatRight_option_3_score_current.style.visibility = "visible";
        div_EatRight_option_3_card_current.style.visibility = "visible";
        if (document.getElementById("rbT11_176b_current_3").checked) {
            ctrl = document.getElementById("txtT11_176b_current_3")
            ctrl.style.visibility = "visible";
            if (ctrl.value.length > 0) {
                ctrl.className = "transparent";
            }
            else {
                ctrl.className = "highlight";
            }

            ctrl = document.getElementById("txtT11_176b1_current_3")
            ctrl.style.visibility = "visible";
            if (ctrl.value.length > 0) {
                ctrl.className = "transparent";
            }
            else {
                ctrl.className = "highlight";
            }

            ctrl = document.getElementById("txtT11_176b2_current_3")
            ctrl.style.visibility = "visible";
            if (ctrl.value.length > 0) {
                ctrl.className = "transparent";
            }
            else {
                ctrl.className = "highlight";
            }
        }
        
        div_EatRight_option_4_current.style.visibility = "visible";
        div_EatRight_option_4_custom_current.style.visibility = "visible";
        if (document.getElementById("rbT11_176b_current_4").checked) {
            ctrl = document.getElementById("txtT11_176b2_current_4")
            ctrl.style.visibility = "visible";
            if (ctrl.value.length > 0) {
                ctrl.className = "transparent";
            }
            else {
                ctrl.className = "highlight";
            }
        }
    } else {
        div_EatRight_cost_current.style.visibility = "hidden";
        
        div_EatRight_option_1_current.style.visibility = "hidden";
        div_EatRight_cost_exception_current.style.visibility = "hidden";
        // TW Added 1/25/2016
        div_EatRight_cost_exception.style.visibility = "hidden";
        div_EatRight_Implementation_Fee.style.visibility = "hidden";
        div_EatRight_Implementation_Fee_current.style.visibility = "hidden";

        div_EatRight_option_2_current.style.visibility = "hidden";
        div_EatRight_option_2_score_current.style.visibility = "hidden";
        div_EatRight_option_2_coupon_current.style.visibility = "hidden";
        div_EatRight_option_3_current.style.visibility = "hidden";
        div_EatRight_option_3_coupon_current.style.visibility = "hidden";
        div_EatRight_option_3_score_current.style.visibility = "hidden";
        div_EatRight_option_3_card_current.style.visibility = "hidden";
        div_EatRight_option_4_current.style.visibility = "hidden";
        div_EatRight_option_4_custom_current.style.visibility = "hidden";
    }

    if (rbT11_EatRight_renewal.checked) {
        div_EatRight_cost.style.visibility = "visible";
        div_EatRight_cost_renewal.style.visibility = "visible";
        // TW Added 1/25/2016
        div_EatRight_cost_exception.style.visibility = "visible";
        div_EatRight_Implementation_Fee.style.visibility = "visible";
        div_EatRight_Implementation_Fee_renewal.style.visibility = "visible";

        if (rbT11_EatRight_cost_exception_renewal.checked) {
            div_EatRight_cost_exception_renewal.style.visibility = "visible";
            ctrl = document.getElementById("txtT11_176a_renewal")
            if (ctrl.value.length > 0) {
                ctrl.className = "transparent";
            }
            else {
                ctrl.className = "highlight";
            }
        } else {
            div_EatRight_cost_exception_renewal.style.visibility = "hidden";
        }

        div_EatRight_option.style.visibility = "visible";
        div_EatRight_option_1_renewal.style.visibility = "visible";
        div_EatRight_option_2_renewal.style.visibility = "visible";
        div_EatRight_option_2_coupon_renewal.style.visibility = "visible";
        div_EatRight_option_2_score_renewal.style.visibility = "visible";
        if (document.getElementById("rbT11_176b_renewal_2").checked) {
            ctrl = document.getElementById("txtT11_176b_renewal_2")
            ctrl.style.visibility = "visible";
            if (ctrl.value.length > 0) {
                ctrl.className = "transparent";
            }
            else {
                ctrl.className = "highlight";
            }

            ctrl = document.getElementById("txtT11_176b1_renewal_2")
            ctrl.style.visibility = "visible";
            if (ctrl.value.length > 0) {
                ctrl.className = "transparent";
            }
            else {
                ctrl.className = "highlight";
            }
        }

        div_EatRight_option_3_renewal.style.visibility = "visible";
        div_EatRight_option_3_coupon_renewal.style.visibility = "visible";
        div_EatRight_option_3_score_renewal.style.visibility = "visible";
        div_EatRight_option_3_card_renewal.style.visibility = "visible";
        if (document.getElementById("rbT11_176b_renewal_3").checked) {
            ctrl = document.getElementById("txtT11_176b_renewal_3");
            ctrl.style.visibility = "visible";
            if (ctrl.value.length > 0) {
                ctrl.className = "transparent";
            }
            else {
                ctrl.className = "highlight";
            }

            ctrl = document.getElementById("txtT11_176b1_renewal_3")
            ctrl.style.visibility = "visible";
            if (ctrl.value.length > 0) {
                ctrl.className = "transparent";
            }
            else {
                ctrl.className = "highlight";
            }

            ctrl = document.getElementById("txtT11_176b2_renewal_3")
            ctrl.style.visibility = "visible";
            if (ctrl.value.length > 0) {
                ctrl.className = "transparent";
            }
            else {
                ctrl.className = "highlight";
            }
        }
        
        div_EatRight_option_4_renewal.style.visibility = "visible";
        div_EatRight_option_4_custom_renewal.style.visibility = "visible";
        if (document.getElementById("rbT11_176b_renewal_4").checked) {
            ctrl = document.getElementById("txtT11_176b2_renewal_4")
            ctrl.style.visibility = "visible";
            if (ctrl.value.length > 0) {
                ctrl.className = "transparent";
            }
            else {
                ctrl.className = "highlight";
            }
        }
    } else {
        div_EatRight_cost_renewal.style.visibility = "hidden";

        div_EatRight_option_1_renewal.style.visibility = "hidden";
        div_EatRight_cost_exception_renewal.style.visibility = "hidden";
        //TW Added 1/25/2016
        div_EatRight_Implementation_Fee_renewal.style.visibility = "hidden";

        div_EatRight_option_2_renewal.style.visibility = "hidden";
        div_EatRight_option_2_score_renewal.style.visibility = "hidden";
        div_EatRight_option_3_renewal.style.visibility = "hidden";
        div_EatRight_option_3_score_renewal.style.visibility = "hidden";
        div_EatRight_option_3_card_renewal.style.visibility = "hidden";
        div_EatRight_option_4_renewal.style.visibility = "hidden";
        div_EatRight_option_4_custom_renewal.style.visibility = "hidden";
    }

  } //end Try
  
  catch(errorObject) {
		alert("In tab11_optional_texts, the following error occurred: " + errorObject.description);
  }
} //end tab11_optional_texts

// **************************************

function tab2_optional_texts() {        

	var agreement = document.getElementById("txtT2_3");
	var btnT2_ShowNotes = document.getElementById("btnT2_ShowNotes");
	var btnT2_HideNotes = document.getElementById("btnT2_HideNotes");
	var claimdata = document.getElementById("claimdata");
	var claimdatarequested_yes = document.getElementById("rbT2_9_2");
	var issue_check_option = document.getElementById("rbT2_22a_2");
	var late_entrant_other = document.getElementById("txtT2_12c");
	var late_entrant_other_option = document.getElementById("rbT2_12c_2");
	var lookback_other = document.getElementById("txtT2_12a");
	var lookback_other_option = document.getElementById("rbT2_12a_3");
	var pbm_contract_other = document.getElementById("txtT2_31");
	var pbm_contract_other_option = document.getElementById("rbT2_31_3");
	var pbm_other = document.getElementById("txtT2_17");
	var pbm_other_option = document.getElementById("rbT2_17_3");
	var pdattached_no = document.getElementById("rbT2_8_2");
	var pdattached_yes = document.getElementById("rbT2_8_1");
	var pdattachment = document.getElementById("lblT2_8_Attachment");
	var pdexplanation = document.getElementById("txtT2_8");
	var person_receiving_check_div = document.getElementById("person_receiving_ck");
	var person_to_receive_check = document.getElementById("txtT2_22a");
	var processingclaims_yes = document.getElementById("rbT2_3_2");
	var pre_existingcondition = document.getElementById("pre_existingcondition");
	var pre_existingcondition_yes = document.getElementById("rbT2_12_2");
	var processingclaimsagreement = document.getElementById("ProcessingClaimsAgreement");
	var rebate_agreement_div = document.getElementById("rebate_agreement");
	var rebate_agreement_option = document.getElementById("rbT2_22_2");
	var rebate_percentage = document.getElementById("txtT2_22");
	var rxmatrix_attachment = document.getElementById("lblT2_23_Attachment")
	var rxmatrix_yes = document.getElementById("rbT2_23_1");
	var T2Notes = document.getElementById("T2Notes");
	var waiting_period_other = document.getElementById("txtT2_12b");
	var waiting_period_other_option = document.getElementById("rbT2_12b_3");

	// Item numbers of form: 22,23,24
    var MailOrderVendor_Yes = document.getElementById("rbT2_33a_2")
    var MailOrderVendor = document.getElementById("MailOrderVendor")
    var MailOrderVendorName = document.getElementById("txtT2_33b")
    var MailOrderContractSection = document.getElementById("MailOrderContractSection")
    var MailOrderContract_Other = document.getElementById("rbT2_33c_3")
	var MailOrderContract = document.getElementById("txtT2_33d")

	var SupplementalPBMVendor_Yes = document.getElementById("rbT2_34a_2")
	var SupplementalPBMVendor = document.getElementById("SupplementalPBMVendor")
	var SupplementalPBMVendorName = document.getElementById("txtT2_34b")
	var SupplementalPBMContractSection = document.getElementById("SupplementalPBMContractSection")
	var SupplementalPBMContract_Other = document.getElementById("rbT2_34c_3")
	var SupplementalPBMContract = document.getElementById("txtT2_34d")

	var SpecialtyPharmacyVendor_Yes = document.getElementById("rbT2_35a_2")
	var SpecialtyPharmacyVendor = document.getElementById("SpecialtyPharmacyVendor")
	var SpecialtyPharmacyVendorName = document.getElementById("txtT2_35b")
	var SpecialtyPharmacyContractSection = document.getElementById("SpecialtyPharmacyContractSection")
	var SpecialtyPharmacyContract_Other = document.getElementById("rbT2_35c_3")
	var SpecialtyPharmacyContract = document.getElementById("txtT2_35d")

 
	 //Hide Note buttons/text
	btnT2_HideNotes.style.visibility = "hidden";
	btnT2_ShowNotes.style.visibility = "hidden";
	T2Notes.style.visibility = "hidden";
	
	//Hide all optional controls on Tab2
	claimdata.style.visibility = "hidden";
	late_entrant_other.style.visibility = "hidden";
	lookback_other.style.visibility = "hidden";
	pbm_contract_other.style.visibility = "hidden";
	pbm_other.style.visibility = "hidden";
	pdattachment.style.visibility = "hidden";
	pdexplanation.style.visibility = "hidden";
	person_receiving_check_div.style.visibility = "hidden";
	pre_existingcondition.style.visibility = "hidden";
	processingclaimsagreement.style.visibility = "hidden";
	rebate_agreement_div.style.visibility = "hidden";
	rxmatrix_attachment.style.visibility = "hidden";
	waiting_period_other.style.visibility = "hidden";

	MailOrderVendor.style.visibility = "hidden";
	MailOrderContractSection.visibility = "hidden";
	MailOrderContract.style.visibility = "hidden";
	SupplementalPBMVendor.style.visibility = "hidden";
	SupplementalPBMContractSection.visibility = "hidden";
	SupplementalPBMContract.style.visibility = "hidden";
	SpecialtyPharmacyVendor.style.visibility = "hidden";
	SpecialtyPharmacyContractSection.visibility = "hidden";
	SpecialtyPharmacyContract.style.visibility = "hidden";
	
	if (hvtab != 2) return;
	
	btnT2_ShowNotes.style.visibility = "visible";
	
	//Review item 3
	if (processingclaims_yes.checked){
		processingclaimsagreement.style.visibility = "visible";
		if (agreement.value.length > 0){
			agreement.className = "transparent";
		}
		else
		{
			agreement.className = "highlight";
		}
	}
	
	//Review item 8
	if (pdattached_yes.checked){
		pdexplanation.style.visibility = "hidden";
		pdattachment.style.visibility = "visible";
		attachment_grid_change(2,9,"A","Plan Info","Prior PD plan");
	}
	
	if (pdattached_no.checked){
		pdexplanation.style.visibility = "visible";
		pdattachment.style.visibility = "hidden";
		if (pdexplanation.value.length > 0){
			pdexplanation.className = "transparent";
		}
		else
		{
			pdexplanation.className = "highlight";
		}
		attachment_grid_change(2,9,"R","","");
	}
	
	//Review item 9
	if (claimdatarequested_yes.checked){
		claimdata.style.visibility = "visible";
		
	}
	
	//Review item 13
	if (pre_existingcondition_yes.checked){
		pre_existingcondition.style.visibility = "visible";
	}
	
	//Review item 13a
	if (lookback_other_option.checked){
		lookback_other.style.visibility = "visible";
		if (lookback_other.value.length > 0){
			lookback_other.className = "transparent";
		}
		else
		{
			lookback_other.className = "highlight";
		}
	}
	
	//Review item 13b
	if (waiting_period_other_option.checked){
		waiting_period_other.style.visibility = "visible";
		if (waiting_period_other.value.length > 0){
			waiting_period_other.className = "transparent";
		}
		else
		{
			waiting_period_other.className = "highlight";
		}
	}
	
	//Review item 13c
	if (late_entrant_other_option.checked){
		late_entrant_other.style.visibility = "visible";
		if (late_entrant_other.value.length > 0){
			late_entrant_other.className = "transparent";
		}
		else
		{
			late_entrant_other.className = "highlight";
		}
	}
	
	//Review item 17
	if (pbm_other_option.checked){
		pbm_other.style.visibility = "visible";
		if (pbm_other.value.length > 0){
			pbm_other.className = "transparent";
		}
		else
		{
			pbm_other.className = "highlight";
		}
	}

	//Review item 18b
	ctrl = $("#divT2_18b");
	$(ctrl).hide();
	if ($("#ckT2_18b").is(":checked")) {
		$(ctrl).show();
		ctrl = $("#txtT2_18b");
		txtval = $(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
	
	//Review item 31
	if (pbm_contract_other_option.checked){
		pbm_contract_other.style.visibility = "visible";
		if (pbm_contract_other.value.length > 0){
			pbm_contract_other.className = "transparent";
		}
		else
		{
			pbm_contract_other.className = "highlight";
		}
	}
	
	//Review item T2 22a
	if (rebate_agreement_option.checked){
		rebate_agreement_div.style.visibility = "visible";
		
		//Display proper highlight for %
		if (rebate_percentage.value.length > 0){
			rebate_percentage.className = "transparent";
		}
		else
		{
			rebate_percentage.className = "highlight";
		}
		
		//Determine whether to display person receiving ck
		if (issue_check_option.checked) {
			person_receiving_check_div.style.visibility = "visible";
			
			//Display proper hight for person receiving ck
			if (person_to_receive_check.value.length > 0){
			person_to_receive_check.className = "transparent";
			}
			else
			{
				person_to_receive_check.className = "highlight";
			}
		}
		else
		{
			person_receiving_check_div.style.visibility = "hidden";
		}
		
	}
	else
	{
		rebate_agreement_div.style.visibility = "hidden";
	}
	
	//Review item T2 23
	if (rxmatrix_yes.checked) {
		rxmatrix_attachment.style.visibility = "visible";
		attachment_grid_change(2,26,"A","Plan Info","Rx matrix");
	}
	else
	{
		attachment_grid_change(2,26,"R","","");
	}

    // 12-2-15: START -- Item numbers on form: 22,23,24

    // Item Number on Form=22, T2 inforow32
    if (MailOrderVendor_Yes.checked) {
        MailOrderVendor.style.visibility = "visible";

        if (MailOrderVendorName.value.length > 0) {
            MailOrderVendorName.className = "transparent";
        }
        else {
            MailOrderVendorName.className = "highlight";
        }

        MailOrderContractSection.style.visibility = "visible"

        // Item Number on Form=22, T2 inforow33
        if (MailOrderContract_Other.checked) {
            MailOrderContract.style.visibility = "visible";

            if (MailOrderContract.value.length > 0) {
                MailOrderContract.className = "transparent";
            }
            else {
                MailOrderContract.className = "highlight";
            }
        }
    }
    else {
        MailOrderContractSection.style.visibility = "hidden";
    }

    // Item Number on Form=23, T2 inforow34
    if (SupplementalPBMVendor_Yes.checked) {
        SupplementalPBMVendor.style.visibility = "visible";

        if (SupplementalPBMVendorName.value.length > 0) {
            SupplementalPBMVendorName.className = "transparent";
        }
        else {
            SupplementalPBMVendorName.className = "highlight";
        }

        SupplementalPBMContractSection.style.visibility = "visible"

        // Item Number on Form=23, T2 inforow35
        if (SupplementalPBMContract_Other.checked) {
            SupplementalPBMContract.style.visibility = "visible";

            if (SupplementalPBMContract.value.length > 0) {
                SupplementalPBMContract.className = "transparent";
            }
            else {
                SupplementalPBMContract.className = "highlight";
            }
        }
    }
    else {
        SupplementalPBMContractSection.style.visibility = "hidden";
    }

    // Item Number on Form=24, T2 inforow36
    if (SpecialtyPharmacyVendor_Yes.checked) {
        SpecialtyPharmacyVendor.style.visibility = "visible";

        if (SpecialtyPharmacyVendorName.value.length > 0) {
            SpecialtyPharmacyVendorName.className = "transparent";
        }
        else {
            SpecialtyPharmacyVendorName.className = "highlight";
        }

        SpecialtyPharmacyContractSection.style.visibility = "visible";

        // Item Number on Form=24, T2 inforow37
        if (SpecialtyPharmacyContract_Other.checked) {
            SpecialtyPharmacyContract.style.visibility = "visible";

            if (SpecialtyPharmacyContract.value.length > 0) {
                SpecialtyPharmacyContract.className = "transparent";
            }
            else {
                SpecialtyPharmacyContract.className = "highlight";
            }
        }
    }
    else {
        SpecialtyPharmacyContractSection.style.visibility = "hidden";
    }

    // 12-2-15: END -- Item numbers of form: 22,23,24


} // end function tab2_optional_texts

// **************************************

function tab3_optional_texts() {
	var btnT3_ShowNotes = document.getElementById("btnT3_ShowNotes");
	var btnT3_HideNotes = document.getElementById("btnT3_HideNotes");
	var ctrl;
	var div_bundled_coverages = document.getElementById("T3_Bundled_Coverages");
	var T3Notes = document.getElementById("T3Notes");
	var txtval;

try {    
	 //Hide Note buttons/text
	div_bundled_coverages.style.visibility = "hidden";
	btnT3_HideNotes.style.visibility = "hidden";
	btnT3_ShowNotes.style.visibility = "hidden";
	T3Notes.style.visibility = "hidden";

	//Needed for TEST web server to hide on initial display
	document.getElementById("divT3_2a").style.visibility = "hidden";
	document.getElementById("divT3_4a").style.visibility = "hidden";
	document.getElementById("divT3_6a").style.visibility = "hidden";
	document.getElementById("divT3_8a").style.visibility = "hidden";
	document.getElementById("divT3_10a").style.visibility = "hidden";
	document.getElementById("divT3_16a").style.visibility = "hidden";
	document.getElementById("txtT3_18").style.visibility = "hidden";
	document.getElementById("divT3_19").style.visibility = "hidden";
	document.getElementById("divT3_20a").style.visibility = "hidden";
	document.getElementById("divT3_30a").style.visibility = "hidden";
	document.getElementById("divT3_FTS").style.visibility = "hidden";
	document.getElementById("divT3_39b").style.visibility = "hidden";
	document.getElementById("divT3_41a").style.visibility = "hidden";
	document.getElementById("divT3_44a").style.visibility = "hidden";
	document.getElementById("divT3_46a").style.visibility = "hidden";
	document.getElementById("divT3_50a").style.visibility = "hidden";
	document.getElementById("divT3_55a").style.visibility = "hidden";
	document.getElementById("divT3_56a").style.visibility = "hidden";
	document.getElementById("divT3_59a").style.visibility = "hidden";
	document.getElementById("divT3_62a").style.visibility = "hidden";
	document.getElementById("divT3_63a").style.visibility = "hidden";
	document.getElementById("divT3_65a").style.visibility = "hidden";
	document.getElementById("divT3_66a").style.visibility = "hidden";
	document.getElementById("divT3_67a").style.visibility = "hidden";
	document.getElementById("divT3_70a").style.visibility = "hidden";
	document.getElementById("divT3_72a").style.visibility = "hidden";
	document.getElementById("divT3_73a").style.visibility = "hidden";
	document.getElementById("divT3_74a").style.visibility = "hidden";

	if (hvtab != 3) return;
	
	btnT3_ShowNotes.style.visibility = "visible";
	
   //Review itemT3_1
	ctrl = $("#txtT3_1");
	$(ctrl).hide();
   if ($("#rbT3_1_2").is(":checked")) {
		div_bundled_coverages.style.visibility = "visible";
		if ($("#ckT3_1_4").is(":checked")) {
			$(ctrl).show();
			txtval =$(ctrl).val();
			if (txtval.length == 0) {
				$(ctrl).removeClass('transparent').addClass('highlight');
			} else {
				$(ctrl).removeClass('highlight').addClass('transparent');
			}
		}
	} 
	
	//Review itemT3_2
   if ($("#rbT3_2_2").is(":checked")) {
	   document.getElementById("divT3_2a").style.visibility = "visible";
		ctrl = $("#txtT3_2");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
	
	//Review itemT3_4
   if ($("#rbT3_4_2").is(":checked")) {
		document.getElementById("divT3_4a").style.visibility = "visible";
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
	
	//Review itemT3_6
   if ($("#rbT3_6_2").is(":checked")) {
	   document.getElementById("divT3_6a").style.visibility = "visible";
		ctrl = $("#txtT3_6");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
	
	//Review itemT3_8
   if ($("#rbT3_8_2").is(":checked")) {
	   document.getElementById("divT3_8a").style.visibility = "visible";
	}
	
	//Review itemT3_10
   if ($("#rbT3_10_2").is(":checked")) {
	   document.getElementById("divT3_10a").style.visibility = "visible";
		ctrl = $("#txtT3_10");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
	
	//Review itemT3_16
	 if ($("#rbT3_16_2").is(":checked")) {
		 document.getElementById("divT3_16a").style.visibility = "visible";
	}
	
	//Review itemT3_18
   if ($("#rbT3_18a_2").is(":checked")) {
	   document.getElementById("txtT3_18").style.visibility = "visible";
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
	
	//Review itemT3_19
   if ($("#rbT3_19_2").is(":checked")) {
	   document.getElementById("divT3_19").style.visibility = "visible";
	}
	
	//Review itemT3_20
   if ($("#rbT3_20_2").is(":checked")) {
	   document.getElementById("divT3_20a").style.visibility = "visible";
		ctrl = $("#txtT3_20");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
	
	//Review itemT3_30
   if ($("#rbT3_30_3").is(":checked")) {
	   document.getElementById("divT3_30a").style.visibility = "visible";
		ctrl = $("#txtT3_30");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}

	if ($("#rbT3_39_2").is(":checked")) {
		document.getElementById("divT3_FTS").style.visibility = "visible";
		//Review itemT3_39a
		ctrl = $("#txtT3_39a");
		$(ctrl).hide();
		if ($("#rbT3_39a_4").is(":checked")) {
			$(ctrl).show();
			txtval = $(ctrl).val();
			if (txtval.length == 0) {
				$(ctrl).removeClass('transparent').addClass('highlight');
			} else {
				$(ctrl).removeClass('highlight').addClass('transparent');
			}
		}

		//Review itemT3_39b
		if ($("#rbT3_39b_2").is(":checked")) {
			document.getElementById("divT3_39b").style.visibility = "visible";
			ctrl = $("#txtT3_39b");
			txtval = $(ctrl).val();
			if (txtval.length == 0) {
				$(ctrl).removeClass('transparent').addClass('highlight');
			} else {
				$(ctrl).removeClass('highlight').addClass('transparent');
			}
		}
	}

	//Review itemT3_41
   if ($("#rbT3_41_2").is(":checked")) {
	   document.getElementById("divT3_41a").style.visibility = "visible";
		ctrl = $("#txtT3_41");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
	
	//Review itemT3_44
   if ($("#rbT3_44_2").is(":checked")) {
	   document.getElementById("divT3_44a").style.visibility = "visible";
	}
	
	//Review itemT3_46
   if ($("#rbT3_46_2").is(":checked")) {
	   document.getElementById("divT3_46a").style.visibility = "visible";
   }
   
   //Review itemT3_50
   if ($("#rbT3_50_2").is(":checked")) {
	   document.getElementById("divT3_50a").style.visibility = "visible";
		ctrl = $("#txtT3_50");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
	
	//Review itemT3_55
   if ($("#rbT3_55_2").is(":checked")) {
	   document.getElementById("divT3_55a").style.visibility = "visible";
		ctrl = $("#txtT3_55");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
	
	//Review itemT3_56
   //ctrl = $("#divT3_56a");
   //$(ctrl).hide();
   if ($("#rbT3_56_2").is(":checked")) {
	   document.getElementById("divT3_56a").style.visibility = "visible";
		ctrl = $("#txtT3_56");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
	
	//Review itemT3_59
   if ($("#rbT3_59_2").is(":checked")) {
	   document.getElementById("divT3_59a").style.visibility = "visible";
		ctrl = $("#txtT3_59");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
			check_for_dollar_amount(document.getElementById("txtT3_59"));
		}
	}
	
	//Review itemT3_62
   if ($("#rbT3_62_2").is(":checked")) {
	   document.getElementById("divT3_62a").style.visibility = "visible";
		ctrl = $("#txtT3_62");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
	
	//Review itemT3_63
   if ($("#rbT3_63_2").is(":checked")) {
	   document.getElementById("divT3_63a").style.visibility = "visible";
		ctrl = $("#txtT3_63");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
	
	//Review itemT3_65
   if ($("#rbT3_65_2").is(":checked")) {
	   document.getElementById("divT3_65a").style.visibility = "visible";
		ctrl = $("#txtT3_65");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
	
	//Review itemT3_66
   if ($("#rbT3_66_2").is(":checked")) {
	   document.getElementById("divT3_66a").style.visibility = "visible";
		ctrl = $("#txtT3_66");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
	
	//Review itemT3_67
   if ($("#rbT3_67_4").is(":checked")) {
	   document.getElementById("divT3_67a").style.visibility = "visible";
		ctrl = $("#txtT3_67");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
	
	//Review itemT3_70
   if ($("#rbT3_70_3").is(":checked")) {
	   document.getElementById("divT3_70a").style.visibility = "visible";
		ctrl = $("#txtT3_70a");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
	
	//Review itemT3_72
   if ($("#rbT3_72_2").is(":checked")) {
	   document.getElementById("divT3_72a").style.visibility = "visible";
		ctrl = $("#txtT3_72");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
	
	//Review itemT3_73
   if ($("#rbT3_73_2").is(":checked")) {
	   document.getElementById("divT3_73a").style.visibility = "visible";
		ctrl = $("#txtT3_73");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
	
	//Review itemT3_74
   if ($("#rbT3_74_2").is(":checked")) {
	   document.getElementById("divT3_74a").style.visibility = "visible";
		ctrl = $("#txtT3_74");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
 }
 catch(errorObject) {
		alert("In tab3_optional_texts, the following error occurred: " + errorObject.description);
}
} //end function tab3_optional_texts

// **************************************

function tab4_optional_texts() {
	var btnT4_ShowNotes = document.getElementById("btnT4_ShowNotes");
	var btnT4_HideNotes = document.getElementById("btnT4_HideNotes");
	var ctrl;
	var T4Notes = document.getElementById("T4Notes"); 
	var txtval;
	
try {
	//Hide Note buttons/text
	btnT4_HideNotes.style.visibility = "hidden";
	btnT4_ShowNotes.style.visibility = "hidden";
	T4Notes.style.visibility = "hidden";

	//Need to use these approach to hide correctly on Test Web server
	document.getElementById("tab4_bankinfo").style.visibility = "hidden";
	document.getElementById("divT4_3a").style.visibility = "hidden";
	document.getElementById("divT4_3b").style.visibility = "hidden";
	document.getElementById("divT4_4a").style.visibility = "hidden";
	
	if (hvtab != 4) return;
	
	btnT4_ShowNotes.style.visibility = "visible";
	
	//Review itemT4_1
   if ($("#rbT4_1_2").is(":checked")) {
	   document.getElementById("tab4_bankinfo").style.visibility = "visible";
		ctrl = $("#txtT4_2");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
		
		if ($("#rbT4_3_2").is(":checked")) {
			document.getElementById("divT4_3a").style.visibility = "visible";
			document.getElementById("divT4_3b").style.visibility = "visible";
			ctrl = $("#txtT4_3");
			txtval =$(ctrl).val();
			if (txtval.length == 0) {
				$(ctrl).removeClass('transparent' ).addClass('highlight');
			} else {
				$(ctrl).removeClass('highlight').addClass('transparent');
			}
			
			ctrl = $("#txtT4_3a");
			txtval =$(ctrl).val();
			if (txtval.length == 0) {
				$(ctrl).removeClass('transparent').addClass('highlight');
			} else {
				$(ctrl).removeClass('highlight').addClass('transparent');
			}
			
			ctrl = $("#txtT4_3b");
			txtval =$(ctrl).val();
			if (txtval.length == 0) {
				$(ctrl).removeClass('transparent').addClass('highlight');
			} else {
				$(ctrl).removeClass('highlight').addClass('transparent');
			}
			
			ctrl = $("#txtT4_3c");
			txtval =$(ctrl).val();
			if (txtval.length == 0) {
				$(ctrl).removeClass('transparent').addClass('highlight');
			} else {
				$(ctrl).removeClass('highlight').addClass('transparent');
			}
			
			ctrl = $("#txtT4_3d");
			txtval =$(ctrl).val();
			if (txtval.length == 0) {
				$(ctrl).removeClass('transparent').addClass('highlight');
			} else {
				$(ctrl).removeClass('highlight').addClass('transparent');
			}
			
			ctrl = $("#txtT4_3e");
			txtval =$(ctrl).val();
			if (txtval.length == 0) {
				$(ctrl).removeClass('transparent').addClass('highlight');
			} else {
				$(ctrl).removeClass('highlight').addClass('transparent');
			}
			
			ctrl = $("#txtT4_3f");
			txtval =$(ctrl).val();
			if (txtval.length == 0) {
				$(ctrl).removeClass('transparent').addClass('highlight');
			} else {
				$(ctrl).removeClass('highlight').addClass('transparent');
			}
			
			ctrl = $("#txtT4_3g");
			txtval =$(ctrl).val();
			if (txtval.length == 0) {
				$(ctrl).removeClass('transparent').addClass('highlight');
			} else {
				$(ctrl).removeClass('highlight').addClass('transparent');
			}
		}  // if rbT4_3_2 is checked
		
		//Review itemT4_4
		if ($("#rbT4_4_2").is(":checked")) {
			document.getElementById("divT4_4a").style.visibility = "visible";
			ctrl = $("#txtT4_4");
			txtval =$(ctrl).val();
			if (txtval.length == 0) {
				$(ctrl).removeClass('transparent').addClass('highlight');
			} else {
				$(ctrl).removeClass('highlight').addClass('transparent');
			}
		} // if rbT4_4_2 is checked
		
	} // if rbT4_1_2 is checked
}  //end try
catch(errorObject) {
		alert("In tab4_optional_texts, the following error occurred: " + errorObject.description);
}
}  // end tab4_optional_texts

// **************************************

function tab5_optional_texts() {
	var btnT5_ShowNotes = document.getElementById("btnT5_ShowNotes");
	var btnT5_HideNotes = document.getElementById("btnT5_HideNotes");
	var divT5_hosp_type = document.getElementById("divT5_hosp_type");
	var divT5_id_hosp_by = document.getElementById("divT5_id_hosp_by");
	var divT5_hosp_ids = document.getElementById("divT5_hosp_ids");
	var hosp_ids = document.getElementById("txtT5_9");
	var ctrl;
	var T5Notes = document.getElementById("T5Notes"); 
	var txtval;
	
try {
	//Hide Note buttons/text
	btnT5_HideNotes.style.visibility = "hidden";
	btnT5_ShowNotes.style.visibility = "hidden";
	divT5_hosp_type.style.visibility = "hidden";
	divT5_id_hosp_by.style.visibility = "hidden";
	divT5_hosp_ids.style.visibility = "hidden";
	T5Notes.style.visibility = "hidden";

	//Need to use these approach to hide correctly on Test Web server
	document.getElementById("divT5_1a").style.visibility = "hidden";
	document.getElementById("divT5_2a").style.visibility = "hidden";
	document.getElementById("divT5_3a").style.visibility = "hidden";
	document.getElementById("divT5_3b").style.visibility = "hidden";
	document.getElementById("divT5_4a").style.visibility = "hidden";
	document.getElementById("divT5_8a").style.visibility = "hidden";

	if (hvtab != 5) return;
	
	btnT5_ShowNotes.style.visibility = "visible";
	
	//Review itemT5_1
	if ($("#rbT5_1_3").is(":checked")) {
		document.getElementById("divT5_1a").style.visibility = "visible";
	}
	
	//Review itemT5_2
	if ($("#rbT5_2_3").is(":checked")) {
		document.getElementById("divT5_2a").style.visibility = "visible";
		ctrl = $("#txtT5_2");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
	
	//Review itemT5_3
	if ($("#rbT5_3_2").is(":checked")) {
		document.getElementById("divT5_3a").style.visibility = "visible";
		document.getElementById("divT5_3b").style.visibility = "visible";
		
		ctrl = $("#txtT5_3");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
		
		ctrl = $("#txtT5_3a");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
		
		ctrl = $("#txtT5_3b");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
		
		ctrl = $("#txtT5_3c");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
	
	//Review itemT5_4
	if ($("#rbT5_4_2").is(":checked")) {
		document.getElementById("divT5_4a").style.visibility = "visible";
		ctrl = $("#txtT5_4a");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
		
		ctrl = $("#txtT5_4b");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
		
		ctrl = $("#txtT5_4c");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
	
	//Review itemT5_8
	if ($("#rbT5_8_4").is(":checked")) {
		document.getElementById("divT5_8a").style.visibility = "visible";
		ctrl = $("#txtT5_8");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}

	//Review itemT5_9
	if ($("#rbT5_9_2").is(":checked")) {
		divT5_hosp_type.style.visibility = "visible";
		divT5_id_hosp_by.style.visibility = "hidden";
		divT5_hosp_ids.style.visibility = "hidden";
		if ($("#rbT5_9a_2").is(":checked")) {
			divT5_id_hosp_by.style.visibility = "visible";
			divT5_hosp_ids.style.visibility = "hidden";
			if ($("#rbT5_9b_1").is(":checked")) {
				$("#lblT5_9b").html("Network(s)   [separate by commas]");
				divT5_hosp_ids.style.visibility = "visible";
				ctrl = $("#txtT5_9");
				txtval = $(ctrl).val();
				if (txtval.length == 0) {
					$(ctrl).removeClass('transparent').addClass('highlight');
				} else {
					$(ctrl).removeClass('highlight').addClass('transparent');
				}
			}
			if ($("#rbT5_9b_2").is(":checked")) {
				$("#lblT5_9b").html("TIN(s)   [separate by commas]");
				divT5_hosp_ids.style.visibility = "visible";
				ctrl = $("#txtT5_9");
				txtval = $(ctrl).val();
				if (txtval.length == 0) {
					$(ctrl).removeClass('transparent').addClass('highlight');
				} else {
					$(ctrl).removeClass('highlight').addClass('transparent');
				}
			}
		}
	}
}  //end try
catch(errorObject) {
		alert("In tab5_optional_texts, the following error occurred: " + errorObject.description);
}
}  // end tab5_optional_texts

// **************************************

function tab6_optional_texts() {
try {
	var btnT6_AddBroker_1 = document.getElementById("btnAddBroker_1");
	var btnT6_AddBroker_2 = document.getElementById("btnAddBroker_2");
	var btnT6_AddBroker_3 = document.getElementById("btnAddBroker_3");
	var btnT6_AddBroker_4 = document.getElementById("btnAddBroker_4");
	var btnT6_AddBroker_5 = document.getElementById("btnAddBroker_5");
	var btnT6_ShowNotes = document.getElementById("btnT6_ShowNotes");
	var btnT6_HideNotes = document.getElementById("btnT6_HideNotes");
	var ctrl;
	var ddlBrokers_1 = document.getElementById("ddlBrokers_1"); 
	var ddlBrokers_2 = document.getElementById("ddlBrokers_2"); 
	var ddlBrokers_3 = document.getElementById("ddlBrokers_3"); 
	var ddlBrokers_4 = document.getElementById("ddlBrokers_4");
	var ddlBrokers_5 = document.getElementById("ddlBrokers_5");
	var T6Notes = document.getElementById("T6Notes"); 
	var txtval;
	
	//Hide Note buttons/text/divs
	btnT6_HideNotes.style.visibility = "hidden";
	btnT6_ShowNotes.style.visibility = "hidden";
	ddlBrokers_1.style.visibility = "hidden";
	ddlBrokers_2.style.visibility = "hidden";
	ddlBrokers_3.style.visibility = "hidden";
	ddlBrokers_4.style.visibility = "hidden";
	ddlBrokers_5.style.visibility = "hidden";
	T6Notes.style.visibility = "hidden";

	
	if (hvtab != 6) return;
	
	//Hide update button if Tab is 6
	//btnUpdate.style.visibility = "hidden";
	btnT6_ShowNotes.style.visibility = "visible"; 
	
	$("#gvT6_hide_1").hide();
	$("#gvT6_hide_2").hide();
	$("#gvT6_hide_3").hide();
	$("#gvT6_hide_4").hide();
	$("#gvT6_hide_5").hide();

	$("#divT6_1m"). hide();
	$("#divT6_2m"). hide();
	$("#divT6_3m"). hide();
	$("#divT6_4m"). hide();
	$("#divT6_5m"). hide();
	
	//Hide Term ckbox div, AM Contact info btn if Name is blank
	for (var i=1;i < MAX_BROKERS + 1;i++) {
	  if ($("#txtT6_BrokerName_" + i).val().length == 0){
		$("#T6TermBroker_" + i).hide();
		$("#btnContact_" + i).hide();
		$("#lblT6_contactinfo_" + i).hide();
	  } else {
		$("#T6TermBroker_" + i).show();
		$("#btnContact_" + i).show();
		$("#lblT6_contactinfo_" + i).hide();
	  }  
	}
	
}  //end try
catch(errorObject) {
		alert("In tab6_optional_texts, the following error occurred: " + errorObject.description);
}
}  // end tab6_optional_texts


// **************************************

function tab7_optional_texts() {
try {
	var btnT7_ShowNotes = document.getElementById("btnT7_ShowNotes");
	var btnT7_HideNotes = document.getElementById("btnT7_HideNotes");
	var ctrl;
	var IDcard_attached_yes = document.getElementById("rbT7_16_1");
	var IDcard_attached_no = document.getElementById("rbT7_16_2");
	var IDcard_attachment = document.getElementById("lblT7_16_Attachment");
	var T7Notes = document.getElementById("T7Notes"); 
	var txtval;
	
	//Hide Note buttons/text
	btnT7_HideNotes.style.visibility = "hidden";
	btnT7_ShowNotes.style.visibility = "hidden";
	IDcard_attachment.style.visibility = "hidden";
	T7Notes.style.visibility = "hidden";

	//Use this method to hide so program works on the TEST Web server
	document.getElementById("divT7_4a").style.visibility = "hidden";
	document.getElementById("divT7_7a").style.visibility = "hidden";
	document.getElementById("divT7_9a").style.visibility = "hidden";
	
	if (hvtab != 7) return;
	
	btnT7_ShowNotes.style.visibility = "visible";
	
	//Review itemT7_4
	if ($("#rbT7_4_2").is(":checked")) {
		document.getElementById("divT7_4a").style.visibility = "visible";
		ctrl = $("#txtT7_4");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
	
	//Review itemT7_7
	if ($("#rbT7_7_2").is(":checked")) {
		document.getElementById("divT7_7a").style.visibility = "visible";
		ctrl = $("#txtT7_7a");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
	
	//Review itemT7_9
	if ($("#rbT7_9_2").is(":checked")) {
		document.getElementById("divT7_9a").style.visibility = "visible";
	}
	
	//Review itemT7_16
	if (IDcard_attached_yes.checked) {
		 IDcard_attachment.style.visibility = "visible";
		 attachment_grid_change(7,16,"A","ID Cards","Sample ID card");
	}
	
	if (IDcard_attached_no.checked){
		IDcard_attachment.style.visibility = "hidden";
		attachment_grid_change(7,16,"R","","");
	}
	
}  //end try
catch(errorObject) {
		alert("In tab7_optional_texts, the following error occurred: " + errorObject.description);
}
}  //end function tab7_optional_texts

// **************************************

function tab8_optional_texts() {
try {
	var btnT8_ShowNotes = document.getElementById("btnT8_ShowNotes");
	var btnT8_HideNotes = document.getElementById("btnT8_HideNotes");
	var ctrl;
	var T8Notes = document.getElementById("T8Notes"); 
	var txtval;
	
	//Hide Note buttons/text
	btnT8_HideNotes.style.visibility = "hidden";
	btnT8_ShowNotes.style.visibility = "hidden";
	T8Notes.style.visibility = "hidden";
	
	if (hvtab != 8) return;
	
	btnT8_ShowNotes.style.visibility = "visible";
	
	//Review itemT8_10
	ctrl = $("#divT8_10a");
	$(ctrl).hide();
	if ($("#ckT8_10").is(":checked")) {
		$(ctrl).show();
		ctrl = $("#txtT8_10");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
} //end try
catch(errorObject) {
		alert("In tab8_optional_texts, the following error occurred: " + errorObject.description);
}
} //end tab8_optional_texts

// **************************************

function tab9_optional_texts() {
try {
	var btnT9_ShowNotes = document.getElementById("btnT9_ShowNotes");
	var btnT9_HideNotes = document.getElementById("btnT9_HideNotes");
	var ctrl;
	var runout_agreement_attached_yes = document.getElementById("rbT9_9_1");
	var runout_agreement_attached_no = document.getElementById("rbT9_9_2");
	var runoutattachment = document.getElementById("lblT9_9_Attachment");
	var T9Notes = document.getElementById("T9Notes"); 
	var txtval;

	//Hide Note buttons/text
	runoutattachment.style.visibility = "hidden";
	btnT9_HideNotes.style.visibility = "hidden";
	btnT9_ShowNotes.style.visibility = "hidden";
	T9Notes.style.visibility = "hidden";

	//Need to use this method to hide divs for program to display properly on the TEST Web server
	document.getElementById("divT9_14a").style.visibility = "hidden";
	document.getElementById("divT9_14b").style.visibility = "hidden";
	document.getElementById("divT9_14c").style.visibility = "hidden";
	document.getElementById("divT9_14d").style.visibility = "hidden";
	
	if (hvtab != 9) return;
	
	btnT9_ShowNotes.style.visibility = "visible";

	//Review item 9
	if (runout_agreement_attached_yes.checked) {
		 runoutattachment.style.visibility = "visible";
		 attachment_grid_change(9,9,"A","TERMINATION","Run-out agreement");
	}
	
	if (runout_agreement_attached_no.checked){
		runoutattachment.style.visibility = "hidden";
		attachment_grid_change(9,9,"R","","");
	}
	
	//Review itemT9_12
	if ($("#ckT9_14a").is(":checked")) {
		document.getElementById("divT9_14a").style.visibility = "visible"; 
		ctrl = $("#txtT9_14a");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
	
	if ($("#ckT9_14b").is(":checked")) {
		document.getElementById("divT9_14b").style.visibility = "visible"; 
		ctrl = $("#txtT9_14b");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
	
	if ($("#ckT9_14c").is(":checked")) {
		document.getElementById("divT9_14c").style.visibility = "visible"; 
		ctrl = $("#txtT9_14c");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
	
	if ($("#ckT9_14d").is(":checked")) {
		document.getElementById("divT9_14d").style.visibility = "visible"; 
		ctrl = $("#txtT9_14d");
		txtval =$(ctrl).val();
		if (txtval.length == 0) {
			$(ctrl).removeClass('transparent').addClass('highlight');
		} else {
			$(ctrl).removeClass('highlight').addClass('transparent');
		}
	}
	
}  //end try
catch(errorObject) {
		alert("In tab9_optional_texts, the following error occurred: " + errorObject.description);
}
}   //end function tab9_optional_texts

// **************************************

function tab10_optional_texts() {
	var ctrl;

	var btnT10_ShowNotes = document.getElementById("btnT10_ShowNotes");
	var btnT10_HideNotes = document.getElementById("btnT10_HideNotes");
	var ctrl;
	var T10Notes = document.getElementById("T10Notes");

	try {

		//Need to use this method to hide divs for program to display properly on the TEST Web server
		document.getElementById("divT10_1a").style.visibility = "hidden";
		document.getElementById("divT10_1b").style.visibility = "hidden";
		document.getElementById("divT10_1c").style.visibility = "hidden";
		document.getElementById("divT10_3").style.visibility = "hidden";
		//document.getElementById("networkassignment").style.visibility = "hidden";

		if (hvtab != 10) return;


		//Hide Note buttons/text
		btnT10_HideNotes.style.visibility = "hidden";
		btnT10_ShowNotes.style.visibility = "hidden";
		T10Notes.style.visibility = "hidden";

		if (hvtab != 10) return;

		btnT10_ShowNotes.style.visibility = "visible";

		//Ck if hospital
		if ($("#rbT10_1_2").is(":checked")) {
			//Hospital group, show Have domes. network
			document.getElementById("divT10_1a").style.visibility = "visible";
			//Show network payment if Group has domestic network
			if ($("#rbT10_1a_2").is(":checked")) {
				//Have domes. network, show Network payment
				document.getElementById("divT10_1b").style.visibility = "visible";
				if ($("#rbT10_1b_1").is(":checked") || $("#rbT10_1b_2").is(":checked") || $("#rbT10_1b_3").is(":checked")) {
					//Payment option is checked, show TINs
					document.getElementById("divT10_1c").style.visibility = "visible";
					ctrl = $("#txtT10_1");
					txtval = $(ctrl).val();
					if (txtval.length == 0) {
						$(ctrl).removeClass('transparent').addClass('highlight');
					} else {
						$(ctrl).removeClass('highlight').addClass('transparent');
					}
				}

			}

		}

		//Ck if group has dental
		if ($("#rbT10_3_2").is(":checked")) {
			document.getElementById("divT10_3").style.visibility = "visible";
		}
	}
	catch (errorObject) {
		alert("In tab10_optional_texts, the following error occurred: " + errorObject.description);
	}
		
} // end function_tab10_optional_texts

// **************************************

function tab_selected_for_print() {
	var intval;
	var ckbox;

	//save gvT10_Networks if ck_tab10 is checked
	ckbox = document.getElementById("ck_tab10")
	if (ckbox.checked) {
		save_networks_to_hvnetworkinfo();
		return true;
	} 

	//ck tabs 1-10
	for (intval=1; intval <= totaltabs; intval++) {
	  ckbox = document.getElementById("ck_tab" + intval)
	  if (ckbox.checked) return true;
  }

	
	//ck tab11
	ckbox = document.getElementById("ck_tab11")
	if (ckbox.checked) return true;
	
	subject = "NO TABS SELECTED";
		 message = "Please check at least one tab to print";
		 $.alerts.dialogClass = "error"; 
		 jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});
	return false;

}

// **************************************

function update(){
	var copany_name = document.getElementById("txtT1_10");
	var group_effdate = document.getElementById("txtT1_5");
	var hvdirty_renewals = document.getElementById("hvrenewaldirty");
	var hvmessage = document.getElementById("hvmessage");
	var txteffdate = document.getElementById("txtEffDate");
	
	//Make sure effdate for update has a value
	if (txteffdate.value.length == 0)
	{
		 subject = "MISSING EFFECTIVE DATE";
		 message = "Please enter the effective date for the updated values";
		 $.alerts.dialogClass = "error"; 
		 jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});
		txteffdate.className = "highlight";
		return false;
	}
	
	//Make sure Group tab, Co. Name has a value
	if (copany_name.value.length == 0)
	{
		 subject = "MISSING COMPANY NAME";
		 message = "Please enter the Company Name for this group on the Group Tab, #10.";
		 $.alerts.dialogClass = "error"; 
		 jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});
		copany_name.className = "highlight";
		return false;
	}
	
	//Make sure Group tab, Eff. Date has a value
	if (group_effdate.value.length == 0)
	{
		 subject = "MISSING EFFECTIVE DATE";
		 message = "Please enter the Effective Date for this group on the Group Tab, #5.";
		 $.alerts.dialogClass = "error"; 
		 jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});
		group_effdate.className = "highlight";
		return false;
	}
	
	//Check if renewal tab is OK
	if (hvdirty_renewals) {
	   var ck_current = document.getElementById("ckT11_modify_current_values");
	   var hvmessage = document.getElementById("hvmessage");
	   var txtT11_current_changed_effdate = document.getElementById("txtT11_current_changed_effdate"); 
	   var txtT11_renewal_effdate = document.getElementById("txtT11_renewal_effdate"); 
	
		//Check that current changed effdate has a value if ckbox ck'd
		if (ck_current.checked && txtT11_current_changed_effdate.value.length == 0){
			subject = "NO EFFECTIVE DATE ENTERED ON RENEWALS TAB FOR CURRENT CHANGES";
			message = "Please enter the effective date for the changes to the Current/Previous values.";
			$.alerts.dialogClass = "error"; 
			jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
			});
			return false;    
		}
	} 
	
	//Confirm no email notification if ckNoEmail is checked
	if ($("#ckNoEmail").is(":checked")) {
		jConfirm("Are you sure you want to update the database and NOT notify anyone with an email?", "OMIT NOTIFICATION EMAIL?", function(OKresponse) {
			if (OKresponse){
				hvmessage.value = "UPDATE";
				store_ppodata();
				displayprocessing(true);
				__doPostBack("btnuPDATE","");
			} else {
				return false;
			}
		 });
	} else {
		if ($("#ckEmail").is(":checked")) {
			//Clear txtAddEmailNote.text
			$("#txtAddEmailNote").val("");
			
			jConfirm("Do you want to add a note to the Notification email?", "ADD NOTE TO NOTIFICATION EMAIL?", function(OKresponse) {
				if (OKresponse){
					display_add_email_note(true);
					return false;
				} else {
					hvmessage.value = "UPDATE";
					store_ppodata();
					displayprocessing(true);
					__doPostBack("btnuPDATE","");
				}
			});
		} else { 
			hvmessage.value = "UPDATE";
			store_ppodata();
			displayprocessing(true);
			__doPostBack("btnuPDATE","");
		}
	}
	 
} //end function update

// **************************************

function update_with_email_note() {
	var hvmessage = document.getElementById("hvmessage");
	
	hvmessage.value = "UPDATE";
	
	store_ppodata();
	displayprocessing(true);
	__doPostBack("btnuPDATE","");
}

// **************************************

function notification_popup() {

} //end function notification_popup

// **************************************

function valid_brokerinfo() {
	var infochanged = false;
	var txtval;
	
	//Make sure Co. name is specified
	 txtval = $("#txtT6_BrokerName_mod").val();
	 txtval = $.trim(txtval);
	 if (txtval.length == 0) {
		subject = "MISSING BROKER CO. NAME ENTERED";
		message = "Please enter the Co. Name for the broker.";
		 $.alerts.dialogClass = "error"; 
		 jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});
		
		return false;    
	 }
	 
	 //Check that at least one value has changed if modifying broker
	 if (!newbroker) {
		//Ck if brokername changed
		if (txtval != brokerinfo[1])return true;
		
		//Ck if Addr1 changed
		txtval = $("#txtT6_Addr1_mod").val();
		txtval = $.trim(txtval);
		if (txtval != brokerinfo[2])return true;
		
		//Ck if Addr2 changed
		txtval = $("#txtT6_Addr2_mod").val();
		txtval = $.trim(txtval);
		if (txtval != brokerinfo[3])return true;
		
		//Ck if CityStZip changed
		txtval = $("#txtT6_CityStZip_mod").val();
		if (txtval != brokerinfo[4])return true;
		
		//Ck if Tel changed
		txtval = $("#txtT6_Tel_mod").val();
		txtval = $.trim(txtval);
		if (txtval != brokerinfo[5])return true;
		
		//Ck if Fax changed
		txtval = $("#txtT6_Fax_mod").val();
		txtval = $.trim(txtval);
		if (txtval != brokerinfo[6])return true;
		
		//Ck if Contact changed
		txtval = $("#txtT6_Contact_mod").val();
		txtval = $.trim(txtval);
		if (txtval != brokerinfo[7])return true;
		
		//Ck if taxID changed
		txtval = $("#txtT6_taxID_mod").val();
		txtval = $.trim(txtval);
		if (txtval != brokerinfo[8])return true;
		
		//Ck if Remarks1 changed
		txtval = $("#txtT6_Remarks1_mod").val();
		txtval = $.trim(txtval);
		if (txtval != brokerinfo[9])return true;
		
		//Ck if Remarks2 changed
		txtval = $("#txtT6_Remarks2_mod").val();
		txtval = $.trim(txtval);
		if (txtval != brokerinfo[10])return true;
		
		subject = "NO CHANGES MADE TO BROKER INFO";
		message = "You have not modified any of the current broker information.";
		 $.alerts.dialogClass = "error"; 
		 jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});
		
		return false;
	 } else {
		return true;
	 }
} //end function valid_broker_info

// **************************************

function valid_date_entered(strdate_entry) { 
  var date_entry = new Date(strdate_entry); 
  
  if (Object.prototype.toString.call(date_entry) !== "[object Date]") return false; 
  return !isNaN(date_entry.getTime()); 
} 

// **************************************

function valid_grnbr(grnbr){
	var ddl = document.getElementById("ddlGroup");
	
	ddl.value = grnbr.toUpperCase();
	if (ddl.value == grnbr.toUpperCase()){
		return true;
	}
	else {
		return false;
	}
} //end function valid_grnbr

// **************************************

function valid_network_email() {
	var blnEmailoption = false;
	var ctrl;
	var effdate = $("#txtT10_effdate").val();

	//Ck for Effdate
	if (! valid_date_entered(effdate)) {
		subject = "INVALID EFFECTIVE DATE";
		message = "Please enter a valid Effective Date."
		$.alerts.dialogClass = "error";
		jAlert(message, subject, function () {
			$.alerts.dialogClass = null; // reset to default
		});
		return false;
	}

	//Ck for email option
	ctrl = document.getElementById("rbT10_networksave_action_1");
	if (ctrl.checked) blnEmailoption = true;

	ctrl = document.getElementById("rbT10_networksave_action_2");
	if (ctrl.checked) blnEmailoption = true;

	ctrl = document.getElementById("rbT10_networksave_action_3");
	if (ctrl.checked) blnEmailoption = true;

	 if (! blnEmailoption) {
		subject = "NO EMAIL NOTIFICATION OPTION SELECTED";
		message = "Please select the Email Notification option ."
		$.alerts.dialogClass = "error";
		jAlert(message, subject, function () {
			$.alerts.dialogClass = null; // reset to default
		});
		return false;
	}

	return true;
}

// **************************************

function valid_network_for_group() {
	var ctrl;
	var blnvalid = false;
	var rowx;
	var cell;
	var cellhtml;
	var selectedItems = $("#lbStates").val();
	var lbvalue = document.getElementById("lbStates");

	//Ck Network Assigned by rb's
	ctrl = document.getElementById("rbAssigned_by_1");
	if (ctrl.checked) {
		network_assigned_by = "By State";
		blnvalid = true;
	}

	ctrl = document.getElementById("rbAssigned_by_2");
	if (ctrl.checked) {
		network_assigned_by = "By Dept.";
		blnvalid = true;
	} 

	ctrl = document.getElementById("rbAssigned_by_3");
	if (ctrl.checked) {
		network_assigned_by = "By Member Choice";
		blnvalid = true;
	} 

	if (!blnvalid) {
		subject = "NO NETWORK ASSIGNED BY SELECTED";
		message = "Please select How this network is assigned."
		$.alerts.dialogClass = "error";
		jAlert(message, subject, function () {
			$.alerts.dialogClass = null; // reset to default
		});
		return false;
	}

	// Ck lbStates
	ctrl = document.getElementById("rbAssigned_by_1");
	if (ctrl.checked) {
		ctrl = document.getElementById("lbStates");
		if (ctrl.value.length == 0) {
			subject = "NO STATE SELECTED";
			message = "Please select one or more items in the States list."
			$.alerts.dialogClass = "error";
			jAlert(message, subject, function () {
				$.alerts.dialogClass = null; // reset to default
			});
			return false;
		} else {           
			if (lbvalue.value.length > 0) {
				for (var i = 0; i < selectedItems.length; i++) {
					if (i > 0) network_assignment_values += ", ";
					network_assignment_values += selectedItems[i];
					if (selectedItems[i] == "Other (specify)") {
					   ctrl = document.getElementById("txtOther_state");
					   if (ctrl.value.length == 0) {
							subject = "NO SPECIFIED OTHER VALUE FOR STATE";
							message = "Please enter the OTHER value for State.."
							$.alerts.dialogClass = "error";
							jAlert(message, subject, function () {
								$.alerts.dialogClass = null; // reset to default
							});
							return false;
					   }  else {
						   network_assignment_values += ": " + $("#txtOther_state").val();
					   } // end if ctrl.value.length == 0
					} // end if selectediItems[i] == Other 
				} // end for loop
			 } // end if lbvalue.value.length > 0
		} // end if ctr.value.length == 0
   } // end if ctrl.checked

	//Ck Dept
	ctrl = document.getElementById("rbAssigned_by_2");
	if (ctrl.checked) {
		ctrl = document.getElementById("txtNetwork_dept_member");
		if (ctrl.value.length == 0) {
			subject = "NO DEPARTEMENT(s) ENTERED";
			message = "Please enter one or more departments."
			$.alerts.dialogClass = "error";
			jAlert(message, subject, function () {
				$.alerts.dialogClass = null; // reset to default
			});
			return false;
		} else {
			network_assignment_values = ctrl.value;
		}
	}

	//CkMember Choice
	ctrl = document.getElementById("rbAssigned_by_3");
	if (ctrl.checked) {
		ctrl = document.getElementById("txtNetwork_dept_member");
		if (ctrl.value.length == 0) {
			subject = "NO MEMBER CHOICE(s) ENTERED";
			message = "Please enter one or more Member Choices."
			$.alerts.dialogClass = "error";
			jAlert(message, subject, function () {
				$.alerts.dialogClass = null; // reset to default
			});
			return false;
		} else {
			network_assignment_values = ctrl.value;
		}
	}

	//Special Instructions, if any
	ctrl = document.getElementById("txtNetworkSpecial");
	if (ctrl.value.length > 0) {
		network_assignment_instructions = ctrl.value;
	}

	//Return true if No PPOs ck'd
	ctrl = document.getElementById("ckNoPPOs");
	 if (ctrl.checked) return true;

	 //Make sure 1st  PPO row is not [none]
	 rowx = $("#gvPPOs tr").eq(1)

	 //Look at value in 1st cell, PPO col., in 1st row. Make sure it's not [none]
	 cell = $(rowx).find("td").eq(0);
	 cellhtml = $(cell).html();

	 if (cellhtml == "[none]") {
		 subject = "NO PPOs  ENTERED";
		 message = "Please enter one or more PPOs."
		 $.alerts.dialogClass = "error";
		 jAlert(message, subject, function () {
			 $.alerts.dialogClass = null; // reset to default
		 });
		 return false;
	 }

	return true;
}

// **************************************

function valid_scheduleAinfo() {
try {
	var blndoctype = false;
	var ctrl = document.getElementById("txtSchedA_effdate");
	var entrydate = $(ctrl).val();
	var valid_date;
   
		
	//Make sure doc. type rb is checked
	 if ($("#rbSchedA_1").is(":checked")) blndoctype = true;
	 if ($("#rbSchedA_2").is(":checked")) blndoctype = true;
	 if (!blndoctype) {
		subject = "NO DOCUMENT TYPE SELECTED";
		message = "Please select PDF or Word for the document type."
		$.alerts.dialogClass = "error"; 
		jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});
		return false;
	 }
	 
	 //Make sure effdate is valid
	 valid_date = Date.parse(entrydate);
	
	 if (valid_date < 0 || isNaN(valid_date)) {
		subject = "INVALID EFFECTIVE DATE";
		message = "Please enter a valid effective date in the format m/d/yyyy."
		$.alerts.dialogClass = "error"; 
		jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});
		return false;
	  }
	  
	  return true;
}
catch(errorObject) {
	alert("In valid_scheduleAinfo, the following error occurred: " + errorObject.description);
  } 
} //end function valid_scheduleAinfo

// **************************************

function check_SIC_code() {
	var entry = $("#txtT1_63").val();
	var intval = 0;
	
	if (entry.length == 0) {
		$("#txtT1_63").removeClass('highlight').addClass('transparent');
		return; 
	}
	
	if (isNaN(entry)) {
		subject = "INVALID SIC CODE";
		message = "You must enter a 3-4 digit SIC code or leave blank."
		$.alerts.dialogClass = "error"; 
		jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});
		$("#txtT1_63").val("");
		$("#txtT1_63").removeClass('transparent').addClass('highlight');
		$("#txtT1_63").focus();
		return;
	} else {
		//check that entry is a 3-4 digit number, 1000-9999
		
		//remove leading 0 if present, otherwise 0200 is assumed to be octal and becomes 128
		if (entry.charAt(0) == '0') entry = entry.substring(1,entry.length);
		
		intval = parseInt(entry);
	   
		if (intval > 99 && intval <10000) {
			//make sure code is only integers and 4 digits, with a leading 0 if < 1000
			entry = intval;
			if (intval < 1000) entry = "0" + entry;
			$("#txtT1_63").val(entry);
			$("#txtT1_63").removeClass('highlight').addClass('transparent');
			return;
		} else {
			subject = "INVALID SIC CODE";
			message = "You must enter a 3-4 digit SIC code or leave blank."
			$.alerts.dialogClass = "error"; 
			jAlert(message,subject, function() {
					$.alerts.dialogClass = null; // reset to default
			});
			$("#txtT1_63").val("");
			$("#txtT1_63").removeClass('transparent').addClass('highlight');
			$("#txtT1_63").focus();
			return;
		}
	}
} //end valid_SIC_code

// **************************************

function check_for_scheduleA_info() {
	try {
	var col_type = "R"
	var ddlvalue = $("#ddlSchedA").val();
	var doctype = "P";
	var schedA_effdate = $("#txtSchedA_effdate").val();
	
	//Set doctype to W if Word rb checked
	if ($("#rbSchedA_2").is(":checked")) doctype = "W";

	//Set col_type to "C" if rbSchedA_col_1 is checked
	if ($("#rbSchedA_col_1").is(":checked")) col_type = "C";

	//Set schedA_report_type as 'F':flex, 'M':medical. 'NM':non-medical
	switch (ddlvalue)
	{
		case "1":
			schedA_report_type = "F";
			break;
		case "2":
			schedA_report_type = "M";
			break;   
		case "3":
		   schedA_report_type = "NM";
		   alert("not yet implemented");
		   return;
		   break;
	}
	
	show_scheduleAinfo(false);
	displayprocessing(true);
	
	//Make AJAX call to server to add a record in the DB
	$.post("AJAX_RQ.ashx", {userid: $("#hvuser").val(), schedulea_check: true, Punbr: current_punbr, Grnbr: current_grnbr, docformat: doctype, report: schedA_report_type, schedulea_effdate: schedA_effdate, col: col_type },
		function(data){
			check_for_scheduleA_info_reply(data);
		});         
} //end try
catch(errorObject) {
	alert("In check_for_scheduleA_info, the following error occurred: " + errorObject.description);
  }  
}

// **************************************

function check_for_scheduleA_info_reply(data) {
try{
	displayprocessing(false);
	
	if (data == "0") {
		subject = "NO SCHEDULE A DATA FOR EFFECTIVE DATE";
		message = "No data was found for the effective date entered."
		$.alerts.dialogClass = "error"; 
		jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		});
		return;
	}
	
	if (data == "1") {
		print_scheduleA_info();
		return;
	}
	
	subject = "PROBLEM RETRIEVING SCHEDULE A INFO";
	message = "There was a problem retrieving Schedule A info. The IT dept. has been notified."
		$.alerts.dialogClass = "error"; 
		jAlert(message,subject, function() {
				$.alerts.dialogClass = null; // reset to default
		}); 
} //end try
catch(errorObject) {
	alert("In check_for_scheduleA_info_reply, the following error occurred: " + errorObject.description);
  }     
}

// **************************************

function print_scheduleA_info() {
	var doctype = "P";
	var reportpath;
	var view_window;
	
	//Set doctype to W if Word rb checked
	if ($("#rbSchedA_2").is(":checked")) doctype = "W";

	if (doctype == "P") {
		reportpath = "file://hpiwfs03/HPI/WIP Automation/ScheduleA_PDF_report.pdf";
		//reportpath = "file://hpiwfs01/Wip/ScheduleA_PDF_report.pdf";
		 //Open a new window for the . file
		view_window = window.open (reportpath,"mywindow","scrollbars=1,resizable=1,width=500,height=500");
	} else {
		show_scheduleA_word_info();        
	}
}

// **************************************
function show_scheduleA_word_info() {
	  $("#scheduleA").hide();
	  $("#displayinfo_Overlay").css({ opacity: 0.5 });
	  $("#displayinfo_Overlay").show();
	  $("#Schedule_A_Word_printinfo").show();
}

// **************************************

function open_scheduleA_worddoc() {
	var reportpath;
	$("#displayinfo_Overlay").hide();
	$("#Schedule_A_Word_printinfo").hide();
	
	//Set reportpath for Flex
	reportpath = "file://hpiwfs03/HPI/WIP Automation/Schedule A Flex.docx";
	
	if (schedA_report_type == "M")  reportpath = "file://hpiwfs03/HPI/WIP Automation/Schedule A Med.docx";
	
	view_window = window.open (reportpath,"mywindow","scrollbars=1,resizable=1,width=500,height=500");
}

// **************************************

function version_pgrm() {
try
{
	
   var br = "<BR>";
   var msgitems;
   
   subject = "WIP VERSION INFO";
   message = $("#hvversion").val();
   
   //the replace function doesn't seem to work. Use split and manually insert <BR>
   msgitems = message.split("$");
   message = "";
   
   for (i=0;i<msgitems.length;i++) {
	message += msgitems[i] + br;
   }
	
   //$.alerts.dialogClass = "caution";
   jAlert(message,subject, function() {
		$.alerts.dialogClass = null; // reset to default
   });
}
catch(errorObject) {
	alert("In version, the following error occurred: " + errorObject.description);
  }  
}

// **************************************

function view_attachment(path) {
	var view_window;
	
	view_window = window.open(path);   
	return false;
}
