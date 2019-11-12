try {

    $(document).ready(function () {
        // 4/14/15 D.Maibor: disable Accordant rb's. No longer appicable 4/1/15

        Date.firstDayOfWeek = 0;
        Date.format = 'mm/dd/yyyy';

        hvtab = $("#hvtab").val();

        //Initialize homepage
        homepage = $("#hvhomepage").val();

        //Disable Fees Alere buttons. No longer appilcable, 1/1/15
        var ctrl;
        ctrl = document.getElementById("rbT11_33_current_1");
        ctrl.disabled = true;
        ctrl = document.getElementById("rbT11_33_current_2");
        ctrl.disabled = true;
        ctrl = document.getElementById("rbT11_33_current_3");
        ctrl.disabled = true;
        ctrl = document.getElementById("rbT11_33_renewal_1");
        ctrl.disabled = true;
        ctrl = document.getElementById("rbT11_33_renewal_2");
        ctrl.disabled = true;
        ctrl = document.getElementById("rbT11_33_renewal_3");
        ctrl.disabled = true;

        //Disable Fees Accordant buttons. No longer appilcable, 4/1/15
        var ctrl;
        ctrl = document.getElementById("rbT11_32_current_1");
        ctrl.disabled = true;
        ctrl = document.getElementById("rbT11_32_current_2");
        ctrl.disabled = true;
        ctrl = document.getElementById("rbT11_32_current_3");
        ctrl.disabled = true;
        ctrl = document.getElementById("rbT11_32_renewal_1");
        ctrl.disabled = true;
        ctrl = document.getElementById("rbT11_32_renewal_2");
        ctrl.disabled = true;
        ctrl = document.getElementById("rbT11_32_renewal_3");
        ctrl.disabled = true;

        readonly = true;
        if ($("#hvusertype").val() == "W") readonly = false;

        //Initialize old datePicker w/startDate
        $(function () {
            $('.date-pick').datePicker({ clickInput: true, startDate: '01/01/1980' })
        });

        //Initialize new datepicker. changeMonth/changeYear:true means display the Month & Year drop-down lists
        $(function () {
            $(".datePicker").datepicker({
                changeMonth: true,
                changeYear: true,
                minDate: new Date('01/01/2008')
            });
        }); //end function to initialize datepicLntbker

        //Set mousedownevent=true with each button click, so check_timeout function can see if any mouse clicks occurred since the last time ck'd
        $("body").mousedown(function () {
            mousedownevent = true;
        });

        //Invoke the check_timeout function, in ms, with setInterval, based on the number of minutes in hvtimeout
        var timeout_min = $("#hvtimeout").val();
        var timeout_ms = timeout_min * 60000; // 60,000 ms in a min.
        setInterval("check_timeout();", timeout_ms)

        //Hide last 2  rows, ID#, parentID in gvT10_Networks, with JQuery
        var gvrow;
        $("#gvT10_Networks tbody tr th").eq(10).hide();
        $("#gvT10_Networks tbody tr th").eq(11).hide();

        $("#gvT10_Networks tr").each(function () {
            gvrow = (this);
            cell = $(this).find("td").eq(10);
            $(cell).hide();
            cell = $(this).find("td").eq(11);
            $(cell).hide();
        });

        $("#divEmail_action").hide();
        $("#tab11buttons").hide();

        //hide Fees/Rates Info/Broker Help Info/Effdate_values popups
        $("#Fees_Rates_Help").hide();
        $("#Broker_Help").hide();
        $("#effdate_values").hide();

        $("#div_modify_current").hide();
        $("#div_modify_renewal").hide();

        //Hide Broker RecID txtboxes
        $("#txtT6_RecID_1").hide();
        $("#txtT6_RecID_2").hide();
        $("#txtT6_RecID_3").hide();
        $("#txtT6_RecID_4").hide();
        $("#txtT6_RecID_5").hide();

        //$("#divT1_impl_meeting").hide();

        //Hide BrokerSave-email action popup
        $("#BrokerSave_email_action").hide();

        //Hide Schedule A popup
        $("#scheduleA").hide();

        $("#ddlSchedA").change(function () {
            changed_scheduleA();
        })

        $("#rbSchedA_1").click(function () {
            rblist_change('SchedA', 1, 2);
        });

        $("#rbSchedA_2").click(function () {
            rblist_change('SchedA', 2, 2);
        });

        $("#rbSchedA_col_1").click(function () {
            rblist_change('SchedA_col', 1, 2);
        });

        $("#rbSchedA_col_2").click(function () {
            rblist_change('SchedA_col', 2, 2);
        });

        //Provide client-side sorting for the table gvT12_Attemailed
        var tbl = $("#gvT12_AttEmailed");
        if (tbl) $(tbl).tablesorter();

        //Provide client-side sorting for the table gvT12_AttUploaded
        tbl = $("#gvT12_AttUploaded");
        if (tbl) $(tbl).tablesorter();

        //Provide client-side sorting for the table gvT12_AttNotEmailed
        tbl = document.getElementById("gvT12_AttNotEmailed");
        if (tbl) $(tbl).tablesorter();

        $("#txtGrnbr").keydown(function (evt) {
            if (evt.keyCode == 13) {
                evt.preventDefault();
                find_grnbr();
            }
        });

        $("#ddlGroup").change(function () {
            changed_group();
        });

        $("#ddlHpi").change(function () {
            changed_ddlHpi();
        });

        $("#ckvaluepopups").click(function () {
            if ($("#ckvaluepopups").is(":checked")) {
                display_popup_values = true;
            } else {
                //hide_popup();
                display_popup_values = false;
            }
        });

        $("#ckEmail").click(function () {
            if ($("#ckEmail").is(":checked")) {
                $("#ckNoEmail").removeAttr("checked");
            }
        });

        $("#ckNoEmail").click(function () {
            if ($("#ckNoEmail").is(":checked")) {
                $("#ckEmail").removeAttr("checked");
            }
        });

        $("#ckT9_prefill").click(function () {
            if ($("#ckT9_prefill").is(":checked")) {
                prefill_termination();
            }
        });

        $("#btnAddBroker_1").click(function (event) {
            event.preventDefault();
            document.getElementById("ddlBrokers_1").style.visibility = "visible";
        });
        $("#btnAddBroker_2").click(function (event) {
            event.preventDefault();
            document.getElementById("ddlBrokers_2").style.visibility = "visible";
        });

        $("#btnAddBroker_3").click(function (event) {
            event.preventDefault();
            document.getElementById("ddlBrokers_3").style.visibility = "visible";
        });
        $("#btnAddBroker_4").click(function (event) {
            event.preventDefault();
            document.getElementById("ddlBrokers_4").style.visibility = "visible";
        });
        $("#btnAddBroker_5").click(function (event) {
            event.preventDefault();
            document.getElementById("ddlBrokers_5").style.visibility = "visible";
        });

        $("#btnAddEmailNote").click(function (event) {
            event.preventDefault();
            update_with_email_note();
        });

        $("#btnAddNote").click(function (event) {
            addnote();
            event.preventDefault();
        });

        $("#btnT1_AddNote").click(function (event) {
            event.preventDefault();
            display_addnote(true);
        });


        $("#btnT2_AddNote").click(function (event) {
            event.preventDefault();
            display_addnote(true);
        });

        $("#btnT3_AddNote").click(function (evt) {
            evt.preventDefault();
            display_addnote(true);
        });

        $("#btnT4_AddNote").click(function (evt) {
            evt.preventDefault();
            display_addnote(true);
        });

        $("#btnT5_AddNote").click(function (evt) {
            evt.preventDefault();
            display_addnote(true);
        });

        $("#btnT6_AddNote").click(function (evt) {
            evt.preventDefault();
            display_addnote(true);
        });

        $("#btnT7_AddNote").click(function (evt) {
            evt.preventDefault();
            display_addnote(true);
        });

        $("#btnT8_AddNote").click(function (evt) {
            evt.preventDefault();
            display_addnote(true);
        });

        $("#btnT9_AddNote").click(function (evt) {
            evt.preventDefault();
            display_addnote(true);
        });

        $("#btnT10_AddNote").click(function (evt) {
            evt.preventDefault();
            display_addnote(true);
        });

        //display_ppoassignment
        $("#btnAddPPO").click(function (evt) {
            evt.preventDefault();
            display_ppoassignment(true);
        });

        $("#btnT3AddPPOInfo").click(function (evt) {
            evt.preventDefault();
            addppoinfo();
        });

        $("#btnT3AddnewPPO").click(function (evt) {
            evt.preventDefault();
            addnewPPO();
        });

        $("#btnT11_AddNote").click(function (event) {
            event.preventDefault();
            display_addnote(true);
        });

        $("#btnT10_AddNetwork").click(function (event) {
            event.preventDefault();
            initialize_networkform();
            display_networkassignment(true);
        });

        $("#btnAddNetwork_to_group").click(function (event) {
            event.preventDefault();
            if (valid_network_for_group()) addnewnetworkinfo();
        });

        $("#btnCancelAddEmailNote").click(function (event) {
            event.preventDefault();
            //Clear txtAddEmailNote
            $("#txtAddEmailNote").val("");
            update_with_email_note();
        });

        $("#btnCancelAddNote").click(function (event) {
            event.preventDefault();
            display_addnote(false);
            $("#hvmessage").val("");
        });

        $("#btnCancel_AddNetwork").click(function (event) {
            event.preventDefault();
            display_networkassignment(false);
            $("#hvmessage").val("");
        });

        $("#btnCancel_addppo").click(function (event) {
            event.preventDefault();
            display_ppoassignment(false);
        });


        $("#btnT6_CancelBrokerinfo").click(function (evt) {
            evt.preventDefault();
            show_brokerinfo(false);
            $("#hvmessage").val("");
        });

        $("#btnT6CancelSave").click(function (evt) {
            evt.preventDefault();
            $("#BrokerSave_email_action").hide();
            show_brokerinfo(false);
            $("#hvmessage").val("");
        });

        $("#btnCancelDisplayDate").click(function (event) {
            display_values(false);
            event.preventDefault();
        });

        $("#btnCancelEffdate").click(function (event) {
            event.preventDefault();
            display_effdate(false);
        });

        $("#btnCancel_modify_effdate").click(function (event) {
            event.preventDefault();
            document.getElementById("modify_effdate_value").style.visibility = "hidden";
        });

        $("#btnCancel_effdate_values").click(function (event) {
            event.preventDefault();
            $("#displayinfo_Overlay").hide();
            $("#effdate_values").hide();
        });


        $("#btnT6CancelHelp").click(function (evt) {
            evt.preventDefault();
            div = $("#Broker_Help")
            show_helpinfo(false, div);
        });

        $("#btnT11CancelHelp").click(function (evt) {
            evt.preventDefault();
            show_tab11_help_info(false);
        });

        $("#btnT3CancelnewPPO").click(function (evt) {
            evt.preventDefault();
            show_newPPO(false);
            $("#ddlPPO").attr("selectedIndex", 0);
            show_PPOinfo(true);
        });

        $("#btnCancelPopup").click(function (event) {
            event.preventDefault();
            document.getElementById("ckvaluepopups").checked = false;
            hide_popup();
            display_popup_values = false;
        });

        $("#btnCancelPopup_ppo").click(function (event) {
            event.preventDefault();
            document.getElementById("ckvaluepopups").checked = false;
            hide_popup();
            display_popup_values = false;
        });

        $("#btnT10_Cancel_networkemail").click(function (event) {
            event.preventDefault();
            display_network_email(false);
            $("#hvmessage").val("");
        });

        $("#btnT3CancelPPOInfo").click(function (evt) {
            evt.preventDefault();
            show_PPOinfo(false);
        });

        $("#btnT11Cancel_update").click(function (evt) {
            evt.preventDefault();
            $("#rbT11_modify_1").attr('checked', false);
            $("#rbT11_modify_2").attr('checked', false);
            tab11_optional_texts();
        });

        $("#btnCancelPrintInfo").click(function (event) {
            event.preventDefault();
            show_printinfo(false);
        });

        $("#btnCancel_Schedule_A_Word_print").click(function (event) {
            event.preventDefault();
            show_printinfo(false);
        });

        $("#btnCancelSchedA").click(function (event) {
            event.preventDefault();
            show_scheduleAinfo(false);
        });

        $("#btnT6_Contactinfo_Cancel").click(function (event) {
            event.preventDefault();
            show_contactinfo(false);
        });

        $("#btnT6_Contactinfo_Remove").click(function (event) {
            event.preventDefault();
            AMContactinfo_remove();
        });

        $("#btnContact_1").click(function (event) {
            event.preventDefault();
            addcontactinfo(1);
        });

        $("#btnContact_2").click(function (event) {
            event.preventDefault();
            addcontactinfo(2);
        });

        $("#btnContact_3").click(function (event) {
            event.preventDefault();
            addcontactinfo(3);
        });

        $("#btnContact_4").click(function (event) {
            event.preventDefault();
            addcontactinfo(4);
            //alert("being updated");
        });

        $("#btnContact_5").click(function (event) {
            event.preventDefault();
            addcontactinfo(5);
        });

        //Temporary disable
        $("#btnT6_Contactinfo_Done").click(function (event) {
            event.preventDefault();
            //alert("NOT YET REVISED ... STAY TUNED!");
            brokerinfotype == "c"
            AMContactinfo_done();
        });

        $("#btnDisplayDate").click(function (event) {
            display_date();
            event.preventDefault();
        });

        $("#btnDisplayTab11").click(function (event) {
            event.preventDefault();
            display_tab11();
        });

        $("#btnDocs").click(function (event) {
            event.preventDefault();
            display_docs();
        });

        //Temporary disable
        $("#btnT6_DoneBrokerInfo").click(function (event) {
            event.preventDefault();
            alert("NOT YET REVISED ... STAY TUNED!");
            //modify_brokerinfo_done();
        });

        $("#btnEffDate").click(function (event) {
            event.preventDefault();
            update();
        });

        $("#btnEmailUnsent").click(function (event) {
            event.preventDefault();
            check_for_unsent_data();
        });

        $("#btnFindgrnbr").click(function (event) {
            event.preventDefault();
            find_grnbr();
        });

        $("#btnGuide").click(function (event) {
            event.preventDefault();
            display_guide();
        });

        $("#btnT6HelpInfo").click(function (evt) {
            evt.preventDefault();
            div = $("#Broker_Help")
            show_helpinfo(true, div);
        });

        //Temporarily disable
        $("#btnT11HelpInfo").click(function (evt) {
            evt.preventDefault();
            alert("NOT YET REVISED ... STAY TUNED!");
            //show_tab11_help_info(true);
        });

        $("#btnT1_HideNotes").click(function (event) {
            event.preventDefault();
            notes_hide(1);
        });

        $("#btnT2_HideNotes").click(function (event) {
            event.preventDefault();
            notes_hide(2);
        });

        $("#btnT3_HideNotes").click(function (evt) {
            evt.preventDefault();
            notes_hide(3);
        });

        $("#btnT4_HideNotes").click(function (evt) {
            evt.preventDefault();
            notes_hide(4);
        });

        $("#btnT5_HideNotes").click(function (evt) {
            evt.preventDefault();
            notes_hide(5);
        });

        $("#btnT6_HideNotes").click(function (evt) {
            evt.preventDefault();
            notes_hide(6);
        });

        $("#btnT7_HideNotes").click(function (evt) {
            evt.preventDefault();
            notes_hide(7);
        });

        $("#btnT8_HideNotes").click(function (evt) {
            evt.preventDefault();
            notes_hide(8);
        });

        $("#btnT9_HideNotes").click(function (evt) {
            evt.preventDefault();
            notes_hide(9);
        });

        $("#btnT10_HideNotes").click(function (evt) {
            evt.preventDefault();
            notes_hide(10);
        });

        $("#btnLogout").click(function (event) {
            event.preventDefault();
            if (readonly) {
                browserclosing = false;
                record_logout();
                window.location = homepage;
            } else {
                //READ/WRITE user
                if (formisdirty || brokertabisdirty || networktabisdirty) {
                    jConfirm("You changed data but did not save it! Do you want to Logout and ignore changed data?.", "UNSAVED DATA", function (OKresponse) {
                        if (OKresponse) {
                            browserclosing = false;
                            record_logout();
                            window.location = homepage;
                        }
                    });
                } else {
                    browserclosing = false;
                    record_logout();
                    window.location = homepage;
                }
            }

        });

        $("#btnModifyBroker").click(function (event) {
            event.preventDefault();
            newbroker = false;
            modify_brokerinfo();
        });

        $("#btnModify_effdate_value").click(function (event) {
            event.preventDefault();
            save_modified_effdate();
        });

        $("#btnNewBroker").click(function (event) {
            event.preventDefault();
            newbroker = true;
            modify_brokerinfo();
        });

        $("#btnPrint").click(function (event) {
            event.preventDefault();
            show_printinfo(true);
        });

        $("#btnT11Print").click(function (event) {
            event.preventDefault();
            show_printinfo(true);
        });

        $("#btnPrintInfo").click(function (event) {
            event.preventDefault();
            if (tab_selected_for_print()) generate_printinfo();
        });

        $("#btnPrintSchedA").click(function (event) {
            event.preventDefault();
            if (valid_scheduleAinfo()) {
                check_for_scheduleA_info();
            }
        });

        $("#btnPrint_Schedule_A_Word").click(function (event) {
            event.preventDefault();
            open_scheduleA_worddoc();
        });


        $("#btnReset").click(function (event) {
            event.preventDefault();
            confirm_reset();
        });

        $("#btnReview").click(function (evt) {
            evt.preventDefault();
            show_review();
        });

        $("#btnReview_ppo").click(function (evt) {
            evt.preventDefault();
            show_review();
        });

        $("#btnT1_rptrecip_cancel").click(function (event) {
            event.preventDefault();
            show_rptrecipientinfo(false);
        });

        $("#btnT1_rpt_recip_done").click(function (event) {
            event.preventDefault();
            addrptrecip();
        });

        $("#btnShowEffDate").click(function (evt) {
            evt.preventDefault();
            display_values(true);
        });

        $("#btnT1_47").click(function (event) {
            event.preventDefault();
            show_rptrecipientinfo(true);
        });

        $("#btnRecipList").click(function (event) {
            event.preventDefault();
            show_rptemail_list(true);
        });

        $("#btnT1_rptemail_list_cancel").click(function (event) {
            event.preventDefault();
            show_rptemail_list(false);
        });

        $("#btnSave_ppo").click(function (event) {
            event.preventDefault();
            save_ppo_info();
        });

        $("#btnT1_ShowNotes").click(function (event) {
            notes_show(1);
            event.preventDefault();
        });

        $("#btnT2_ShowNotes").click(function (event) {
            event.preventDefault();
            notes_show(2);
        });

        $("#btnT3_49").click(function (evt) {
            evt.preventDefault();
            show_PPOinfo(true);
        });

        //Temporarily disable
        $("#btnT6Save").click(function (evt) {
            save_brokers();
            evt.preventDefault();
            //alert("NOT YET REVISED ... STAY TUNED!");
        });

        $("#btnT6SaveBroker").click(function (evt) {
            if (brokerinfotype == "b") save_broker_info();
            if (brokerinfotype == "c") save_AMContactinfo();
            evt.preventDefault();
        });


        $("#btnT10_SaveNetworks").click(function (evt) {
            evt.preventDefault();
            if (save_network_info()) {
                $("#hvmessage").val("UPDATE_TAB10");
                email_action(true);
            }
        });

        $("#btnT10_Save_networkemail").click(function (evt) {
            evt.preventDefault();
            if (valid_network_email()) {
                $("#hvmessage").val("NETWORK");
                displayprocessing(true);
                __doPostBack("ddlGrnbr", "");
            }
        });

        $("#btnT3_ShowNotes").click(function (evt) {
            evt.preventDefault();
            notes_show(3);
        });

        $("#btnT4_ShowNotes").click(function (evt) {
            evt.preventDefault();
            notes_show(4);
        });

        $("#btnT5_ShowNotes").click(function (evt) {
            evt.preventDefault();
            notes_show(5);
        });

        $("#btnT6_ShowNotes").click(function (evt) {
            evt.preventDefault();
            notes_show(6);
        });

        $("#btnT7_ShowNotes").click(function (evt) {
            evt.preventDefault();
            notes_show(7);
        });

        $("#btnT8_ShowNotes").click(function (evt) {
            evt.preventDefault();
            notes_show(8);
        });

        $("#btnT9_ShowNotes").click(function (evt) {
            evt.preventDefault();
            notes_show(9);
        });

        $("#btnT10_ShowNotes").click(function (evt) {
            evt.preventDefault();
            notes_show(10);
        });

        $("#btntab_1").click(function (event) {
            event.preventDefault();
            hvtab = 1;
            displaytab_new();

        });

        $("#btntab_2").click(function (event) {
            event.preventDefault();
            hvtab = 2;
            //displaytab();
            //display_main_buttons(true);
            displaytab_new();
        });

        $("#btntab_3").click(function (event) {
            event.preventDefault();
            hvtab = 3;
            //displaytab();
            //display_main_buttons(true);
            displaytab_new();
        });

        $("#btntab_4").click(function (event) {
            event.preventDefault();
            hvtab = 4;
            //displaytab();
            //display_main_buttons(true);
            displaytab_new();
        });

        $("#btntab_5").click(function (event) {
            event.preventDefault();
            hvtab = 5;
            //displaytab();
            //display_main_buttons(true);
            displaytab_new();
        });

        $("#btntab_6").click(function (event) {
            event.preventDefault();
            hvtab = 6;
            //displaytab();
            //display_main_buttons(true);
            displaytab_new();
        });

        $("#btntab_7").click(function (event) {
            event.preventDefault();
            hvtab = 7;
            //displaytab();
            //display_main_buttons(true);
            displaytab_new();
        });

        $("#btntab_8").click(function (event) {
            event.preventDefault();
            hvtab = 8;
            //displaytab();
            //display_main_buttons(true);
            displaytab_new();
        });

        $("#btntab_9").click(function (event) {
            event.preventDefault();
            hvtab = 9;
            //displaytab();
            //display_main_buttons(true);
            displaytab_new();
        });

        $("#btntab_10").click(function (event) {
            event.preventDefault();
            hvtab = 10;
            //displaytab();
            //display_main_buttons(true);
            displaytab_new();
        });

        $("#btntab_11").click(function (event) {
            event.preventDefault();
            if (hvtab != 11) {
                hvtab = 11;
                displaytab_new();
            }
        });

        $("#btntab_12").click(function (event) {
            event.preventDefault();
            //display_attachments();
            hvtab = 12;
            //displaytab();
            //display_main_buttons(true);
            displaytab_new();
        });

        $("#btnUpdate").click(function (event) {
            event.preventDefault();
            if (!formisdirty) {
                subject = "NO CHANGES TO DATA"
                message = "You have not modified any data. There is nothing to update";
                $.alerts.dialogClass = "error";
                jAlert(message, subject, function () {
                    $.alerts.dialogClass = null; // reset to default
                });
            } else {
                //display_effdate(true);
                email_action(true);
                $("#hvmessage").val("UPDATE_ALL");
                $("#lblEmail_instructions").html("For update to GENERAL TABS (NOT Networks, Brokers, Fees/Rates,Attachments), Select Effdate and Email action related to changed data");
            }
        });


        $("#btnT11Update").click(function (event) {
            event.preventDefault();
            if ($("#hvrenewaldirty").val() == "yes") {
                email_action(true);
                $("#hvmessage").val("UPDATE_TAB11");
                $("#lblEmail_instructions").html("For update to GENERAL TABS (NOT Networks, Brokers, Fees/Rates,Attachments), Select Effdate and Email action related to changed data");
            } else {
                subject = "NO CHANGES TO DATA"
                message = "You have not modified any data. There is nothing to update";
                $.alerts.dialogClass = "error";
                jAlert(message, subject, function () {
                    $.alerts.dialogClass = null; // reset to default
                });
            }
        });

        $("#rbEmailaction_1").click(function () {
            rblist_change('Emailaction', 1, 3);
            $("#div_emailaction_note").hide();
        });
        $("#rbEmailaction_2").click(function () {
            rblist_change('Emailaction', 2, 3);
            $("#div_emailaction_note").show();
        });
        $("#rbEmailaction_3").click(function () {
            rblist_change('Emailaction', 3, 3);
            $("#div_emailaction_note").hide();
        });

        $("#btnEmailaction_done").click(function (event) {
            event.preventDefault();

            //Handle Attachment separately, nothing to ck, just do postback
            if (hvtab == 12) {
                $("#hvaction").val("");
                $("#hvmessage").val("ATTACHMENT");
                displayprocessing(true);
                __doPostBack("btnEmailaction_done", "");
                email_action(false);
                return;
            }

            if (valid_date_entered($("#txtEffdate_newdata").val())) {
                //Make sure an rb is selected
                rbvalues = false;
                if ($("#rbEmailaction_1").is(":checked")) rbvalues = true;
                if ($("#rbEmailaction_2").is(":checked")) rbvalues = true;
                if ($("#rbEmailaction_3").is(":checked")) rbvalues = true;
                if (rbvalues) {
                    $("#divEmail_action").hide();
                    $("#displayinfo_Overlay").hide();
                    displayprocessing(true);
                    __doPostBack("btnEmailaction_done", "");
                } else {
                    subject = "NO EMAIL OPTION SELECTED";
                    message = "Please select the Email option for the changed data.";
                    $.alerts.dialogClass = "error";
                    jAlert(message, subject, function () {
                        $.alerts.dialogClass = null; // reset to default
                    });
                }

            } else {
                subject = "INVALID EFFECTIVE DATE";
                message = "Please enter a valid effective date for the changed data.";
                $.alerts.dialogClass = "error";
                jAlert(message, subject, function () {
                    $.alerts.dialogClass = null; // reset to default
                });
            }
        });

        $("#btnEmailaction_cancel").click(function (event) {
            event.preventDefault();
            email_action(false);
            $("#hvaction").val("");
            $("#hvmessage").val("");
        });

        //Temporarily disable
        $("#btnUpload").click(function (event) {
            event.preventDefault();
            //alert("NOT YET REVISED ... STAY TUNED!");
            attachment();
        });

        $("#btnVersion").click(function (event) {
            event.preventDefault();
            version_pgrm();
        });

        $("#ck_taball").click(function (event) {
            printinfo_checkall();
        });

        $("#ddlBrokers_1").change(function () {
            changed_broker(1);
        });
        $("#ddlBrokers_2").change(function () {
            changed_broker(2);
        });
        $("#ddlBrokers_3").change(function () {
            changed_broker(3);
        });
        $("#ddlBrokers_4").change(function () {
            changed_broker(4);
        });
        $("#ddlBrokers_5").change(function () {
            changed_broker(5);
        });

        //Display processing div for ddl changes involving postbacks
        $("#ddlPunbr").change(function () {
            changed_punbr();
        });

        $("#ddlGrnbr").change(function () {
            changed_grnbr();
        });

        //Set General controls
        $("#txtEffDate").change(function () {
            var ctrl = document.getElementById("txtEffDate");
            var entrydate = $(ctrl).val();
            if (entrydate.length > 0) {
                check_for_valid_date(ctrl);
            } else {
                ctrl.className = "highlight";
            }
        });

        //Set Tab 1 controls
        $("#lblT1_66").mouseover(function () {
            get_std_popup_values('1', 'Item66', 'HPID', '190', '5');
        });
        $("#txtT1_66").mouseover(function () {
            get_std_popup_values('1', 'Item66', 'HPID', '190', '5');
        });
        $("#txtT1_66").change(function () {
            set_dirty("hvformdirty");
        });


        $("#lblT1_1").mouseover(function () {
            get_std_popup_values('1', 'Item1', 'AM', '215', '5');
        });

        $("#ddlAM").change(function () {
            set_dirty("hvformdirty");
        });
        $("#ddlAM").mouseover(function () {
            get_std_popup_values('1', 'Item1', 'AM', '215', '5');
        });

        $("#lblT1_2").mouseover(function () {
            get_std_popup_values('1', 'Item2', 'Alternate AM', '215', '200');
        });

        $("#ddlAM_alt").change(function () {
            set_dirty("hvformdirty");
        });
        $("#ddlAM_alt").mouseover(function () {
            get_std_popup_values('1', 'Item2', 'Alternate AM', '215', '200');
        });

        $("#lblT1_3").mouseover(function () {
            get_std_popup_values('1', 'Item3', 'Sales Rep.', '215', '432');
        });

        $("#ddlSalesrep").change(function () {
            set_dirty("hvformdirty");
        });
        $("#ddlSalesrep").mouseover(function () {
            get_std_popup_values('1', 'Item3', 'Sales Rep.', '215', '432');
        });

        $("#lblT1_4").mouseover(function () {
            get_std_popup_values('1', 'Item4', 'Alternate Sales Rep.', '215', '522');
        });

        $("#ddlSalesrep_alt").mouseover(function () {
            get_std_popup_values('1', 'Item4', 'Alternate Sales Rep.', '215', '522');
        });

        $("#lblT1_5").mouseover(function () {
            get_std_popup_values('1', 'Item5', 'Effective Date', '240', '102');
        });

        $("#txtT1_5").change(function () {
            set_dirty("hvformdirty");
            var ctrl = document.getElementById("txtT1_5");
            var entrydate = $(ctrl).val();
            if (entrydate.length > 0) {
                check_for_valid_date(ctrl);
            } else {
                ctrl.className = "transparent"
            }
        });
        $("#txtT1_5").mouseover(function () {
            get_std_popup_values('1', 'Item5', 'Effective Date', '240', '102');
        });

        $("#lblT1_6").mouseover(function () {
            get_std_popup_values('1', 'Item6', 'Date Plan First Effective', '240', '322');
        });

        $("#txtT1_6").change(function () {
            set_dirty("hvformdirty");
            var ctrl = document.getElementById("txtT1_6");
            var entrydate = $(ctrl).val();
            if (entrydate.length > 0) {
                check_for_valid_date(ctrl);
            } else {
                ctrl.className = "transparent"
            }
        });
        $("#txtT1_6").mouseover(function () {
            get_std_popup_values('1', 'Item6', 'Date Plan First Effective', '240', '322');
        });

        $("#lblT1_7").mouseover(function () {
            get_std_popup_values('1', 'Item7', 'Contract Year Ends', '240', '427');
        });

        $("#txtT1_7").change(function () {
            var ctrl = document.getElementById("txtT1_7");
            check_text_length(ctrl, 50, "Group", "7");
        });
        $("#txtT1_7").mouseover(function () {
            get_std_popup_values('1', 'Item7', 'Contract Year Ends', '240', '427');
        });

        $("#lblT1_8").mouseover(function () {
            get_std_popup_values('1', 'Item8', 'Fiscal Year Ends', '240', '502');
        });

        $("#txtT1_8").change(function () {
            var ctrl = document.getElementById("txtT1_8");
            check_text_length(ctrl, 50, "Group", "8");
        });
        $("#txtT1_8").mouseover(function () {
            get_std_popup_values('1', 'Item8', 'Fiscal Year Ends', '240', '502');
        });

        $("#rbT1_9_1").click(function () {
            rblist_change('T1_9', 1, 2);
            tab1_optional_texts();
        });
        $("#rbT1_9_2").click(function () {
            rblist_change('T1_9', 2, 2);
            tab1_optional_texts();
        });
        $("#lblT1_9").mouseover(function () {
            get_rblist_popup_values('1', 'Item9', 'Plan Year Runs', '265', '2', 'Calendar Year', 'Other');
        });

        $("#rbT1_9_1").mouseover(function () {
            get_rblist_popup_values('1', 'Item9', 'Plan Year Runs', '265', '2', 'Calendar Year', 'Other');
        });

        $("#rbT1_9_2").mouseover(function () {
            get_rblist_popup_values('1', 'Item9', 'Plan Year Runs', '265', '2', 'Calendar Year', 'Other');
        });

        $("#txtT1_9").keydown(function (evt) {
            //Cancel ENTER (keycode=13) from performing default button click. Change focus to trigger
            // the change and blur events. NOTE: movetocontrol does NOT work to force cursor to move
            // to txtT1_10 in tab1_optional_texts
            if (evt.keyCode == 13) {
                evt.preventDefault();
                movetocontrol = "#txtT1_10";
                $("#txtT1_63").focus();
            }
        });

        $("#txtT1_9").change(function () {
            set_dirty("hvformdirty");

            //Set background to transparent or highlight
            tab1_optional_texts();

            //Check text length, if any text entered
            var ctrl = document.getElementById("txtT1_9");
            if (ctrl.value.length > 0) {
                check_text_length(ctrl, 200, "Group", "9");
            }
        });

        $("#txtT1_9").mouseover(function () {
            get_std_popup_values('1', 'Item9a', 'Other Plan Year', '265', '400');
        });

        $("#lblT1_10").mouseover(function () {
            get_std_popup_values('1', 'Item10', 'Company Name', '315', '2');
        });

        $("#txtT1_10").keydown(function (evt) {
            //Move control to the next control regardless if the tab(keycode=9) or ENTER (keycode=13) is pressed
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_11").focus();
            }
        });
        $("#txtT1_10").change(function () {
            var ctrl = document.getElementById("txtT1_10");
            //Don't check for max chars of 50, since checking for value
            check_for_value(ctrl);
            set_dirty("hvformdirty");
        });
        $("#txtT1_10").mouseover(function () {
            get_std_popup_values('1', 'Item10', 'Company Name', '315', '2');
        });

        $("#lblT1_11").mouseover(function () {
            get_std_popup_values('1', 'Item11', 'Address 1', '340', '2');
        });

        $("#txtT1_11").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_12").focus();
            }
        });
        $("#txtT1_11").change(function () {
            var ctrl = document.getElementById("txtT1_11");
            check_text_length(ctrl, 50, "Group", "12");
        });
        $("#txtT1_11").mouseover(function () {
            get_std_popup_values('1', 'Item11', 'Address 1', '340', '2');
        });

        $("#lblT1_12").mouseover(function () {
            get_std_popup_values('1', 'Item12', 'Address 2', '365', '2');
        });

        $("#txtT1_12").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_13").focus();
            }
        });
        $("#txtT1_12").change(function () {
            var ctrl = document.getElementById("txtT1_12");
            check_text_length(ctrl, 50, "Group", "12");
        });
        $("#txtT1_12").mouseover(function () {
            get_std_popup_values('1', 'Item12', 'Address 2', '365', '2');
        });

        $("#lblT1_13").mouseover(function () {
            get_std_popup_values('1', 'Item13', 'City', '390', '2');
        });

        $("#txtT1_13").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_14").focus();
            }
        });
        $("#txtT1_13").change(function () {
            var ctrl = document.getElementById("txtT1_13");
            check_text_length(ctrl, 50, "Group", "13");
        });
        $("#txtT1_13").mouseover(function () {
            get_std_popup_values('1', 'Item13', 'City', '390', '2');
        });

        $("#lblT1_14").mouseover(function () {
            get_std_popup_values('1', 'Item14', 'State', '390', '502');
        });

        $("#txtT1_14").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_15").focus();
            }
        });

        $("#txtT1_14").change(function () {
            set_dirty("hvformdirty");
            // Don't check text length since checking state
            var ctrl = document.getElementById("txtT1_14");
            check_state(ctrl);
        });
        $("#txtT1_14").mouseover(function () {
            get_std_popup_values('1', 'Item14', 'State', '390', '502');
        });

        $("#lblT1_15").mouseover(function () {
            get_std_popup_values('1', 'Item15', 'Zip', '390', '552');
        });

        $("#txtT1_15").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_16a").focus();
            }
        });
        $("#txtT1_15").change(function () {
            var ctrl = document.getElementById("txtT1_15");
            check_text_length(ctrl, 50, "Group", "15");
        });
        $("#txtT1_15").mouseover(function () {
            get_std_popup_values('1', 'Item15', 'Zip', '390', '552');
        });


        $("#lblT1_16").mouseover(function () {
            get_std_popup_values('1', 'Item16', 'Phone', '415', '2');
        });

        $("#txtT1_16a").keydown(function (evt) {
            if (!check_digit(3, evt.keyCode, this, 'txtT1_16b')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_16a").mouseover(function () {
            get_std_popup_values('1', 'Item16', 'Phone', '415', '2');
        });

        $("#txtT1_16b").keydown(function (evt) {
            if (!check_digit(3, evt.keyCode, this, 'txtT1_16c')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_16b").mouseover(function () {
            get_std_popup_values('1', 'Item16', 'Phone', '415', '2');
        });

        $("#txtT1_16c").keydown(function (evt) {
            if (!check_digit(4, evt.keyCode, this, 'txtT1_16d')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_16c").mouseover(function () {
            get_std_popup_values('1', 'Item16', 'Phone', '415', '2');
        });

        $("#txtT1_16d").keydown(function (evt) {
            if (!check_digit(6, evt.keyCode, this, 'txtT1_17')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_16d").mouseover(function () {
            get_std_popup_values('1', 'Item16', 'Phone', '415', '2');
        });

        $("#lblT1_17").mouseover(function () {
            get_std_popup_values('1', 'Item17', 'Tax ID', '415', '402');
        });

        $("#txtT1_17").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_18").focus();
            }
        });
        $("#txtT1_17").change(function () {
            set_dirty("hvformdirty");
            check_taxid();
        });
        $("#txtT1_17").mouseover(function () {
            get_std_popup_values('1', 'Item17', 'Tax ID', '415', '402');
        });

        $("#lblT1_18").mouseover(function () {
            get_std_popup_values('1', 'Item18', 'Contact Person (Eligibility) Name', '470', '2');
        });

        $("#txtT1_18").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_19a").focus();
            }
        });
        $("#txtT1_18").change(function () {
            var ctrl = document.getElementById("txtT1_18");
            check_text_length(ctrl, 200, "Group", "18");
        });
        $("#txtT1_18").mouseover(function () {
            get_std_popup_values('1', 'Item18', 'Contact Person (Eligibility) Name #1', '470', '2');
        });


        $("#lblT1_19").mouseover(function () {
            get_std_popup_values('1', 'Item19', 'Contact Person (Eligibility) Phone', '470', '352');
        });

        $("#txtT1_19a").keydown(function (evt) {
            if (!check_digit(3, evt.keyCode, this, 'txtT1_19b')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_19a").mouseover(function () {
            get_std_popup_values('1', 'Item19', 'Contact Person #1 (Eligibility) Phone', '470', '352');
        });

        $("#txtT1_19b").keydown(function (evt) {
            if (!check_digit(3, evt.keyCode, this, 'txtT1_19c')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_19b").mouseover(function () {
            get_std_popup_values('1', 'Item19', 'Contact Person #1 (Eligibility) Phone', '470', '352');
        });

        $("#txtT1_19c").keydown(function (evt) {
            if (!check_digit(4, evt.keyCode, this, 'txtT1_19d')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_19c").mouseover(function () {
            get_std_popup_values('1', 'Item19', 'Contact Person #1 (Eligibility) Phone', '470', '352');
        });

        $("#txtT1_19d").keydown(function (evt) {
            if (!check_digit(6, evt.keyCode, this, 'txtT1_20a')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_19d").mouseover(function () {
            get_std_popup_values('1', 'Item19', 'Contact Person #1 (Eligibility) Phone', '470', '352');
        });

        $("#lblT1_20").mouseover(function () {
            get_std_popup_values('1', 'Item20', 'Contact Person #1 (Eligibility) Fax', '470', '452');
        });

        $("#txtT1_20a").keydown(function (evt) {
            if (!check_digit(3, evt.keyCode, this, 'txtT1_20b')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_20a").mouseover(function () {
            get_std_popup_values('1', 'Item20', 'Contact Person #1 (Eligibility) Fax', '470', '452');
        });

        $("#txtT1_20b").keydown(function (evt) {
            if (!check_digit(3, evt.keyCode, this, 'txtT1_20c')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_20b").mouseover(function () {
            get_std_popup_values('1', 'Item20', 'Contact Person #1 (Eligibility) Fax', '470', '452');
        });

        $("#txtT1_20c").keydown(function (evt) {
            if (!check_digit(4, evt.keyCode, this, 'txtT1_20d')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_20c").mouseover(function () {
            get_std_popup_values('1', 'Item20', 'Contact Person #1 (Eligibility) Fax', '470', '452');
        });

        $("#txtT1_20d").keydown(function (evt) {
            if (!check_digit(6, evt.keyCode, this, 'txtT1_21')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_20d").mouseover(function () {
            get_std_popup_values('1', 'Item20', 'Contact Person #1 (Eligibility) Fax', '470', '452');
        });

        $("#lblT1_21").mouseover(function () {
            get_std_popup_values('1', 'Item21', 'Contact Person #1 (Eligibility) Email', '495', '2');
        });

        $("#txtT1_21").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_22").focus();
            }
        });
        $("#txtT1_21").change(function () {
            var ctrl = document.getElementById("txtT1_21");
            check_text_length(ctrl, 50, "Group", "21");
        });
        $("#txtT1_21").mouseover(function () {
            get_std_popup_values('1', 'Item21', 'Contact Person #1 (Eligibility) Email', '495', '2');
        });

        $("#lblT1_22").mouseover(function () {
            get_std_popup_values('1', 'Item23', 'Contact Person #1 (Eligibility) Additional', '495', '402');
        });

        $("#txtT1_22").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_50").focus();
            }
        });
        $("#txtT1_22").change(function () {
            var ctrl = document.getElementById("txtT1_22");
            check_text_length(ctrl, 200, "Group", "22");
        });
        $("#txtT1_22").mouseover(function () {
            get_std_popup_values('1', 'Item23', 'Contact Person #1 (Eligibility) Additional', '495', '402');
        });

        $("#lblT1_50").mouseover(function () {
            get_std_popup_values('1', 'Item51', 'Contact Person (Eligibility) Name #2', '545', '2');
        });

        $("#txtT1_50").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_51a").focus();
            }
        });
        $("#txtT1_50").change(function () {
            var ctrl = document.getElementById("txtT1_50");
            check_text_length(ctrl, 200, "Group", "23");
        });
        $("#txtT1_50").mouseover(function () {
            get_std_popup_values('1', 'Item51', 'Contact Person #2 (Eligibility) Name #2', '545', '2');
        });

        $("#lblT1_51").mouseover(function () {
            get_std_popup_values('1', 'Item52', 'Contact Person #2 (Eligibility) Phone', '545', '352');
        });

        $("#txtT1_51a").keydown(function (evt) {
            if (!check_digit(3, evt.keyCode, this, 'txtT1_51b')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_51a").mouseover(function () {
            get_std_popup_values('1', 'Item52', 'Contact Person #2 (Eligibility) Phone', '545', '352');
        });

        $("#txtT1_51b").keydown(function (evt) {
            if (!check_digit(3, evt.keyCode, this, 'txtT1_51c')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_51b").mouseover(function () {
            get_std_popup_values('1', 'Item52', 'Contact Person #2 (Eligibility) Phone', '545', '352');
        });

        $("#txtT1_51c").keydown(function (evt) {
            if (!check_digit(4, evt.keyCode, this, 'txtT1_51d')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_51c").mouseover(function () {
            get_std_popup_values('1', 'Item52', 'Contact Person #2 (Eligibility) Phone', '545', '352');
        });

        $("#txtT1_51d").keydown(function (evt) {
            if (!check_digit(6, evt.keyCode, this, 'txtT1_52a')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_51d").mouseover(function () {
            get_std_popup_values('1', 'Item52', 'Contact Person #2 (Eligibility) Phone', '545', '352');
        });

        $("#lblT1_52").mouseover(function () {
            get_std_popup_values('1', 'Item53', 'Contact Person #2 (Eligibility) Fax', '545', '452');
        });

        $("#txtT1_52a").keydown(function (evt) {
            if (!check_digit(3, evt.keyCode, this, 'txtT1_52b')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_52a").mouseover(function () {
            get_std_popup_values('1', 'Item53', 'Contact Person #2 (Eligibility) Fax', '545', '452');
        });

        $("#txtT1_52b").keydown(function (evt) {
            if (!check_digit(3, evt.keyCode, this, 'txtT1_52c')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_52b").mouseover(function () {
            get_std_popup_values('1', 'Item53', 'Contact Person #2 (Eligibility) Fax', '545', '452');
        });

        $("#txtT1_52c").keydown(function (evt) {
            if (!check_digit(4, evt.keyCode, this, 'txtT1_52d')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_52c").mouseover(function () {
            get_std_popup_values('1', 'Item53', 'Contact Person #2 (Eligibility) Fax', '545', '452');
        });

        $("#txtT1_52d").keydown(function (evt) {
            if (!check_digit(6, evt.keyCode, this, 'txtT1_53')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_52d").mouseover(function () {
            get_std_popup_values('1', 'Item53', 'Contact Person #2 (Eligibility) Fax', '545', '452');
        });

        $("#lblT1_53").mouseover(function () {
            get_std_popup_values('1', 'Item54', 'Contact Person #2 (Eligibility) Email', '570', '2');
        });

        $("#txtT1_53").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_54").focus();
            }
        });
        $("#txtT1_53").change(function () {
            var ctrl = document.getElementById("txtT1_53");
            check_text_length(ctrl, 50, "Group", "26");
        });
        $("#txtT1_53").mouseover(function () {
            get_std_popup_values('1', 'Item54', 'Contact Person #2 (Eligibility) Email', '570', '2');
        });

        $("#lblT1_54").mouseover(function () {
            get_std_popup_values('1', 'Item55', 'Contact Person #2 (Eligibility) Addl', '570', '402');
        });

        $("#txtT1_54").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_55").focus();
            }
        });
        $("#txtT1_54").change(function () {
            var ctrl = document.getElementById("txtT1_54");
            check_text_length(ctrl, 200, "Group", "27");
        });
        $("#txtT1_54").mouseover(function () {
            get_std_popup_values('1', 'Item55', 'Contact Person #2 (Eligibility) Addl', '570', '402');
        });

        $("#lblT1_55").mouseover(function () {
            get_std_popup_values('1', 'Item56', 'Contact Person #2 (Elig) Addl Info', '655', '205');
        });

        $("#txtT1_55").mouseover(function () {
            get_std_popup_values('1', 'Item56', 'Contact Person #2 (Elig) Addl Info', '655', '205');
        });



        $("#lblT1_23").mouseover(function () {
            get_std_popup_values('1', 'Item23', 'Contact Person #1 (Funding) Name #1', '745', '2');
        });

        $("#txtT1_23").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_24a").focus();
            }
        });
        $("#txtT1_23").change(function () {
            var ctrl = document.getElementById("txtT1_23");
            check_text_length(ctrl, 200, "Group", "29");
        });
        $("#txtT1_23").mouseover(function () {
            get_std_popup_values('1', 'Item23', 'Contact Person #1 (Funding) Name', '745', '2');
        });

        $("#lblT1_24").mouseover(function () {
            get_std_popup_values('1', 'Item24', 'Contact Person #1 (Funding) Phone', '745', '300');
        });

        $("#txtT1_24a").keydown(function (evt) {
            if (!check_digit(3, evt.keyCode, this, 'txtT1_24b')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_24a").mouseover(function () {
            get_std_popup_values('1', 'Item24', 'Contact Person #1 (Funding) Phone', '745', '300');
        });

        $("#txtT1_24b").keydown(function (evt) {
            if (!check_digit(3, evt.keyCode, this, 'txtT1_24c')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_24b").mouseover(function () {
            get_std_popup_values('1', 'Item24', 'Contact Person #1 (Funding) Phone', '745', '300');
        });

        $("#txtT1_24c").keydown(function (evt) {
            if (!check_digit(4, evt.keyCode, this, 'txtT1_24d')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_24c").mouseover(function () {
            get_std_popup_values('1', 'Item24', 'Contact Person #1 (Funding) Phone', '745', '300');
        });

        $("#txtT1_24d").keydown(function (evt) {
            if (!check_digit(6, evt.keyCode, this, 'txtT1_25a')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_24d").mouseover(function () {
            get_std_popup_values('1', 'Item24', 'Contact Person #1 (Funding) Phone', '745', '300');
        });

        $("#lblT1_25").mouseover(function () {
            get_std_popup_values('1', 'Item25', 'Contact Person #1 (Funding) Fax', '745', '452');
        });

        $("#txtT1_25a").keydown(function (evt) {
            if (!check_digit(3, evt.keyCode, this, 'txtT1_25b')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_25a").mouseover(function () {
            get_std_popup_values('1', 'Item25', 'Contact Person #1 (Funding) Fax', '745', '452');
        });

        $("#txtT1_25b").keydown(function (evt) {
            if (!check_digit(3, evt.keyCode, this, 'txtT1_25c')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_25b").mouseover(function () {
            get_std_popup_values('1', 'Item25', 'Contact Person #1 (Funding) Fax', '745', '452');
        });

        $("#txtT1_25c").keydown(function (evt) {
            if (!check_digit(4, evt.keyCode, this, 'txtT1_25d')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_25c").mouseover(function () {
            get_std_popup_values('1', 'Item25', 'Contact Person #1 (Funding) Fax', '745', '452');
        });

        $("#txtT1_25d").keydown(function (evt) {
            if (!check_digit(6, evt.keyCode, this, 'txtT1_26')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_25d").mouseover(function () {
            get_std_popup_values('1', 'Item25', 'Contact Person #1 (Funding) Fax', '745', '452');
        });

        $("#lblT1_26").mouseover(function () {
            get_std_popup_values('1', 'Item26', 'Contact Person #1 (Funding) Email', '765', '2');
        });

        $("#txtT1_26").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_27").focus();
            }
        });
        $("#txtT1_26").change(function () {
            var ctrl = document.getElementById("txtT1_26");
            check_text_length(ctrl, 50, "Group", "32");
        });
        $("#txtT1_26").mouseover(function () {
            get_std_popup_values('1', 'Item26', 'Contact Person #1 (Funding) Email', '765', '2');
        });

        $("#lblT1_27").mouseover(function () {
            get_std_popup_values('1', 'Item27', 'Contact Person #1 (Funding) Additional', '765', '402');
        });

        $("#txtT1_27").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_56").focus();
            }
        });
        $("#txtT1_27").change(function () {
            var ctrl = document.getElementById("txtT1_27");
            check_text_length(ctrl, 200, "Group", "33");
        });
        $("#txtT1_27").mouseover(function () {
            get_std_popup_values('1', 'Item27', 'Contact Person #1 (Funding) Additional', '765', '402');
        });

        $("#lblT1_56").mouseover(function () {
            get_std_popup_values('1', 'Item57', 'Contact Person (Funding) Name #2', '815', '2');
        });

        $("#txtT1_56").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_57a").focus();
            }
        });
        $("#txtT1_56").change(function () {
            var ctrl = document.getElementById("txtT1_56");
            check_text_length(ctrl, 200, "Group", "34");
        });
        $("#txtT1_56").mouseover(function () {
            get_std_popup_values('1', 'Item57', 'Contact Person (Funding) Name #2', '815', '2');
        });

        $("#lblT1_57").mouseover(function () {
            get_std_popup_values('1', 'Item58', 'Contact Person (Funding) Phone', '815', '300');
        });

        $("#txtT1_57a").keydown(function (evt) {
            if (!check_digit(3, evt.keyCode, this, 'txtT1_57b')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_57a").mouseover(function () {
            get_std_popup_values('1', 'Item58', 'Contact Person #2 (Funding) Phone', '815', '300');
        });

        $("#txtT1_57b").keydown(function (evt) {
            if (!check_digit(3, evt.keyCode, this, 'txtT1_57c')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_57b").mouseover(function () {
            get_std_popup_values('1', 'Item58', 'Contact Person #2 (Funding) Phone', '815', '300');
        });

        $("#txtT1_57c").keydown(function (evt) {
            if (!check_digit(4, evt.keyCode, this, 'txtT1_57d')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_57c").mouseover(function () {
            get_std_popup_values('1', 'Item58', 'Contact Person #2 (Funding) Phone', '815', '300');
        });

        $("#txtT1_57d").keydown(function (evt) {
            if (!check_digit(6, evt.keyCode, this, 'txtT1_58a')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_57d").mouseover(function () {
            get_std_popup_values('1', 'Item58', 'Contact Person #2 (Funding) Phone', '815', '300');
        });

        $("#lblT1_58").mouseover(function () {
            get_std_popup_values('1', 'Item59', 'Contact Person #2 (Funding) Fax', '815', '452');
        });

        $("#txtT1_58a").keydown(function (evt) {
            if (!check_digit(3, evt.keyCode, this, 'txtT1_58b')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_58a").mouseover(function () {
            get_std_popup_values('1', 'Item59', 'Contact Person #2 (Funding) Fax', '815', '452');
        });

        $("#txtT1_58b").keydown(function (evt) {
            if (!check_digit(3, evt.keyCode, this, 'txtT1_58c')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_58b").mouseover(function () {
            get_std_popup_values('1', 'Item59', 'Contact Person #2 (Funding) Fax', '815', '452');
        });

        $("#txtT1_58c").keydown(function (evt) {
            if (!check_digit(4, evt.keyCode, this, 'txtT1_58d')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_58c").mouseover(function () {
            get_std_popup_values('1', 'Item59', 'Contact Person #2 (Funding) Fax', '815', '452');
        });

        $("#txtT1_58d").keydown(function (evt) {
            if (!check_digit(6, evt.keyCode, this, 'txtT1_59')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_58d").mouseover(function () {
            get_std_popup_values('1', 'Item59', 'Contact Person #2 (Funding) Fax', '815', '452');
        });

        $("#lblT1_59").mouseover(function () {
            get_std_popup_values('1', 'Item60', 'Contact Person #2 (Funding) Email', '840', '2');
        });

        $("#txtT1_59").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_60").focus();
            }
        });
        $("#txtT1_59").change(function () {
            var ctrl = document.getElementById("txtT1_59");
            check_text_length(ctrl, 50, "Group", "37");
        });
        $("#txtT1_59").mouseover(function () {
            get_std_popup_values('1', 'Item60', 'Contact Person #2 (Funding) Email', '840', '2');
        });

        $("#lblT1_60").mouseover(function () {
            get_std_popup_values('1', 'Item61', 'Contact Person #2 (Funding) Additional', '840', '402');
        });

        $("#txtT1_60").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_61").focus();
            }
        });
        $("#txtT1_60").change(function () {
            var ctrl = document.getElementById("txtT1_60");
            check_text_length(ctrl, 200, "Group", "38");
        });
        $("#txtT1_60").mouseover(function () {
            get_std_popup_values('1', 'Item61', 'Contact Person #2 (Funding) Additional', '840', '402');
        });

        $("#lblT1_61").mouseover(function () {
            get_std_popup_values('1', 'Item62', 'Contact Person #2 (Funding) Addl Info', '940', '205');
        });

        $("#txtT1_61").mouseover(function () {
            get_std_popup_values('1', 'Item62', 'Contact Person #2 (Funding) Addl Info', '940', '205');
        });

        $("#lblT1_28").mouseover(function () {
            get_std_popup_values('1', 'Item28', 'Key Executive: Name', '1015', '2');
        });

        $("#txtT1_28").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_29a").focus();
            }
        });
        $("#txtT1_28").change(function () {
            var ctrl = document.getElementById("txtT1_28");
            check_text_length(ctrl, 200, "Group", "28");
        });
        $("#txtT1_28").mouseover(function () {
            get_std_popup_values('1', 'Item28', 'Key Executive: Name', '1015', '2');
        });

        $("#lblT1_29").mouseover(function () {
            get_std_popup_values('1', 'Item29', 'Key Executive: Phone', '1015', '300');
        });

        $("#txtT1_29a").keydown(function (evt) {
            if (!check_digit(3, evt.keyCode, this, 'txtT1_29b')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_29a").mouseover(function () {
            get_std_popup_values('1', 'Item29', 'Key Executive: Phone', '1015', '300');
        });

        $("#txtT1_29b").keydown(function (evt) {
            if (!check_digit(3, evt.keyCode, this, 'txtT1_29c')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_29b").mouseover(function () {
            get_std_popup_values('1', 'Item29', 'Key Executive: Phone', '1015', '300');
        });

        $("#txtT1_29c").keydown(function (evt) {
            if (!check_digit(4, evt.keyCode, this, 'txtT1_29d')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_29c").mouseover(function () {
            get_std_popup_values('1', 'Item29', 'Key Executive: Phone', '1015', '300');
        });

        $("#txtT1_29d").keydown(function (evt) {
            if (!check_digit(6, evt.keyCode, this, 'txtT1_30a')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_29d").mouseover(function () {
            get_std_popup_values('1', 'Item29', 'Key Executive: Phone', '1015', '300');
        });

        $("#lblT1_30").mouseover(function () {
            get_std_popup_values('1', 'Item30', 'Key Executive: Fax', '1015', '452');
        });

        $("#txtT1_30a").keydown(function (evt) {
            if (!check_digit(3, evt.keyCode, this, 'txtT1_30b')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_30a").mouseover(function () {
            get_std_popup_values('1', 'Item30', 'Key Executive: Fax', '1015', '452');
        });

        $("#txtT1_30b").keydown(function (evt) {
            if (!check_digit(3, evt.keyCode, this, 'txtT1_30c')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_30b").mouseover(function () {
            get_std_popup_values('1', 'Item30', 'Key Executive: Fax', '1015', '452');
        });

        $("#txtT1_30c").keydown(function (evt) {
            if (!check_digit(4, evt.keyCode, this, 'txtT1_30d')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_30c").mouseover(function () {
            get_std_popup_values('1', 'Item30', 'Key Executive: Fax', '1015', '452');
        });

        $("#txtT1_30d").keydown(function (evt) {
            if (!check_digit(6, evt.keyCode, this, 'txtT1_31')) {
                evt.preventDefault();
            }
        });
        $("#txtT1_30d").mouseover(function () {
            get_std_popup_values('1', 'Item30', 'Key Executive: Fax', '1015', '452');
        });

        $("#lblT1_31").mouseover(function () {
            get_std_popup_values('1', 'Item31', 'Key Executive: Email', '1040', '2');
        });

        $("#txtT1_31").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_32").focus();
            }
        });
        $("#txtT1_31").change(function () {
            var ctrl = document.getElementById("txtT1_31");
            check_text_length(ctrl, 50, "Group", "31");
        });
        $("#txtT1_31").mouseover(function () {
            get_std_popup_values('1', 'Item31', 'Key Executive: Email', '1040', '2');
        });

        $("#lblT1_32").mouseover(function () {
            get_std_popup_values('1', 'Item32', 'Key Executive: Additional', '1040', '402');
        });

        $("#txtT1_32").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_33").focus();
            }
        });
        $("#txtT1_32").change(function () {
            var ctrl = document.getElementById("txtT1_32");
            check_text_length(ctrl, 200, "Group", "32");
        });
        $("#txtT1_32").mouseover(function () {
            get_std_popup_values('1', 'Item32', 'Key Executive: Additional', '1040', '402');
        });

        $("#lblT1_33").mouseover(function () {
            get_std_popup_values('1', 'Item33', 'Name of Person who will sign Plan Document and Amendments', '1115', '2');
        });

        $("#txtT1_33").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_34").focus();
            }
        });
        $("#txtT1_33").change(function () {
            var ctrl = document.getElementById("txtT1_33");
            check_text_length(ctrl, 200, "Group", "33");
        });
        $("#txtT1_33").mouseover(function () {
            get_std_popup_values('1', 'Item33', 'Name of Person who will sign Plan Document and Amendments', '1115', '2');
        });

        $("#lblT1_34").mouseover(function () {
            get_std_popup_values('1', 'Item34', 'Names of Persons who will have access to PHI reports', '1165', '2');
        });

        $("#txtT1_34").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_35").focus();
            }
        });
        $("#txtT1_34").change(function () {
            var ctrl = document.getElementById("txtT1_34");
            check_text_length(ctrl, 200, "Group", "34");
        });
        $("#txtT1_34").mouseover(function () {
            get_std_popup_values('1', 'Item34', 'Names of Persons who will have access to PHI reports', '1165', '2');
        });

        $("#lblT1_35").mouseover(function () {
            get_std_popup_values('1', 'Item35', 'Classes/Job Titles with access to PHI to list in PD', '1190', '22');
        });

        $("#txtT1_35").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_67").focus();
            }
        });
        $("#txtT1_35").change(function () {
            var ctrl = document.getElementById("txtT1_35");
            check_text_length(ctrl, 200, "Group", "35");
        });
        $("#txtT1_35").mouseover(function () {
            get_std_popup_values('1', 'Item35', 'Classes/Job Titles with access to PHI to list in PD', '1190', '22');
        });

        //Add Compliance Contacts
        $("#lblT1_67").mouseover(function () {
            get_std_popup_values('1', 'Item67', 'Compliance Contacts: Who should receive communications?', '1240', '22');
        });

        $("#txtT1_67").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_67a").focus();
            }
        });

        $("#txtT1_67").change(function () {
            var ctrl = document.getElementById("txtT1_67");
            check_text_length(ctrl, 200, "Group", "50");
        });

        $("#txtT1_67").mouseover(function () {
            get_std_popup_values('1', 'Item67', 'Compliance Contacts: Who should receive communications?', '1240', '22');
        });

        $("#lblT1_67a").mouseover(function () {
            get_std_popup_values('1', 'Item67a', 'Compliance Contacts: Email for communications contact', '1240', '550');
        });

        $("#txtT1_67a").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_68").focus();
            }
        });
        $("#txtT1_67a").change(function () {
            var ctrl = document.getElementById("txtT1_67a");
            check_text_length(ctrl, 200, "Group", "50");
        });

        $("#txtT1_67a").mouseover(function () {
            get_std_popup_values('1', 'Item67a', 'Compliance Contacts: Email for communications contact', '1240', '550');
        });

        $("#lblT1_68").mouseover(function () {
            get_std_popup_values('1', 'Item68', 'Compliance Contacts: Who should receive initial ASA/Schedule A?', '1265', '22');
        });

        $("#txtT1_68").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_68a").focus();
            }
        });

        $("#txtT1_68").change(function () {
            var ctrl = document.getElementById("txtT1_68");
            check_text_length(ctrl, 200, "Group", "51");
        });

        $("#txtT1_68").mouseover(function () {
            get_std_popup_values('1', 'Item68', 'Compliance Contacts: Who should receive initial ASA/Schedule A?', '1265', '22');
        });

        $("#lblT1_68a").mouseover(function () {
            get_std_popup_values('1', 'Item68a', 'Compliance Contacts: Email for initial ASA/Schedule A contact', '1265', '550');
        });

        $("#txtT1_68a").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_69").focus();
            }
        });
        $("#txtT1_68a").change(function () {
            var ctrl = document.getElementById("txtT1_68a");
            check_text_length(ctrl, 200, "Group", "51");
        });

        $("#txtT1_68a").mouseover(function () {
            get_std_popup_values('1', 'Item68a', 'Compliance Contacts: Email for initial ASA/Schedule A contact', '1265', '550');
        });

        $("#lblT1_69").mouseover(function () {
            get_std_popup_values('1', 'Item69', 'Compliance Contacts: Who should receive renewal Schedule A?', '1290', '22');
        });

        $("#txtT1_69").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_69a").focus();
            }
        });

        $("#txtT1_69").change(function () {
            var ctrl = document.getElementById("txtT1_69");
            check_text_length(ctrl, 200, "Group", "52");
        });

        $("#txtT1_69").mouseover(function () {
            get_std_popup_values('1', 'Item69', 'Compliance Contacts: Who should receive renewal Schedule A?', '1290', '22');
        });

        $("#lblT1_69a").mouseover(function () {
            get_std_popup_values('1', 'Item69a', 'Compliance Contacts: Email for renewal Schedule A contact', '1290', '550');
        });

        $("#txtT1_69a").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#rbT1_36_1").focus();
            }
        });
        $("#txtT1_69a").change(function () {
            var ctrl = document.getElementById("txtT1_69a");
            check_text_length(ctrl, 200, "Group", "52");
        });

        $("#txtT1_69a").mouseover(function () {
            get_std_popup_values('1', 'Item69a', 'Compliance Contacts: Email for renewal Schedule A contact', '1290', '550');
        });

        $("#rbT1_36_1").click(function () {
            rblist_change('T1_36', 1, 2);
        });
        $("#rbT1_36_1").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#rbT1_36_2").focus();
            }
        });
        $("#rbT1_36_2").click(function () {
            rblist_change('T1_36', 2, 2);
        });
        $("#rbT1_36_2").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                if ($("#rbT1_36_2").is(":checked")) {
                    $("#txtT1_36").focus();
                } else {
                    $("#txtT1_37").focus();
                }
            }
        });
        $("#lblT1_36").mouseover(function () {
            get_rblist_multi_values('1', 'Item36', 'Service Guarantee', '1315', '2', 'No$Yes (explain)');
        });

        $("#txtT1_36").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_37").focus();
            }
        });
        $("#txtT1_36").change(function () {
            set_dirty("hvformdirty");
        });
        $("#txtT1_36").blur(function () {
            tab1_optional_texts();
        });
        $("#txtT1_36").mouseover(function () {
            get_std_popup_values('1', 'Item36a', 'Service Guarantee', '1315', '200');
        });

        $("#lblT1_37").mouseover(function () {
            get_std_popup_values('1', 'Item37', 'Type of Business', '1340', '2');
        });

        $("#txtT1_37").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_38").focus();
            }
        });
        $("#txtT1_37").change(function () {
            var ctrl = document.getElementById("txtT1_37");
            check_text_length(ctrl, 200, "Group", "37");
        });
        $("#txtT1_37").mouseover(function () {
            get_std_popup_values('1', 'Item37', 'Type of Business', '1340', '2');
        });

        $("#lblT1_38").mouseover(function () {
            get_std_popup_values('1', 'Item38', 'Dept. Names/Divisions', '1340', '302');
        });

        $("#txtT1_38").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#rbT1_39_1").focus();
            }
        });
        $("#txtT1_38").change(function () {
            var ctrl = document.getElementById("txtT1_38");
            check_text_length(ctrl, 200, "Group", "38");
        });
        $("#txtT1_38").mouseover(function () {
            get_std_popup_values('1', 'Item38', 'Dept. Names/Divisions', '1340', '302');
        });

        $("#rbT1_39_1").click(function () {
            rblist_change('T1_39', 1, 2);
        });
        $("#rbT1_39_2").click(function () {
            rblist_change('T1_39', 2, 2);
        });
        $("#rbT1_39_1").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#rbT1_39_2").focus();
            }
        });
        $("#rbT1_39_2").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                if ($("#rbT1_39_2").is(":checked")) {
                    $("#txtT1_39").focus();
                } else {
                    $("#txtT1_40").focus();
                }
            }
        });
        $("#lblT1_39").mouseover(function () {
            get_rblist_multi_values('1', 'Item39', 'SOB Attached', '1365', '3', 'Yes$No (when will it be completed)');
        });

        $("#txtT1_39").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_40").focus();
            }
        });
        $("#txtT1_39").change(function () {
            set_dirty("hvformdirty");

            //Set background to transparent or highlight
            tab1_optional_texts();

            //Check text length, if any text entered
            var ctrl = document.getElementById("txtT1_39");
            if (ctrl.value.length > 0) {
                check_text_length(ctrl, 200, "Group", "39");
            }
        });

        $("#txtT1_39").mouseover(function () {
            get_std_popup_values('1', 'Item39a', 'SOB Completion Date', '1365', '357');
        });

        $("#lblT1_40").mouseover(function () {
            get_std_popup_values('1', 'Item40', 'Headcount: Single', '1415', '2');
        });

        $("#txtT1_40").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_41").focus();
            }
        });
        $("#txtT1_40").change(function () {
            ctrl = $("#txtT1_40");
            check_for_integer(ctrl, "Group", 52);
        });
        $("#txtT1_40").mouseover(function () {
            get_std_popup_values('1', 'Item40', 'Headcount: Single', '1415', '2');
        });

        $("#lblT1_41").mouseover(function () {
            get_std_popup_values('1', 'Item41', 'Headcount: Family', '1415', '202');
        });

        $("#txtT1_41").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_42").focus();
            }
        });
        $("#txtT1_41").change(function () {
            ctrl = $("#txtT1_41");
            check_for_integer(ctrl, "Group", 53);
        });
        $("#txtT1_41").mouseover(function () {
            get_std_popup_values('1', 'Item41', 'Headcount: Family', '1415', '202');
        });

        $("#lblT1_42").mouseover(function () {
            get_std_popup_values('1', 'Item41', 'Headcount: Total', '1415', '302');
        });

        $("#txtT1_42").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_43").focus();
            }
        });
        $("#txtT1_42").change(function () {
            ctrl = $("#txtT1_42");
            check_for_integer(ctrl, "Group", 54);
        });
        $("#txtT1_42").mouseover(function () {
            get_std_popup_values('1', 'Item42', 'Headcount: Total', '1415', '302');
        });

        $("#lblT1_43").mouseover(function () {
            get_std_popup_values('1', 'Item43', 'Eligibility: How will it be provided?', '1440', '2');
        });

        $("#txtT1_43").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_44").focus();
            }
        });
        $("#txtT1_43").change(function () {
            var ctrl = document.getElementById("txtT1_43");
            check_text_length(ctrl, 200, "Group", "43");
        });
        $("#txtT1_43").mouseover(function () {
            get_std_popup_values('1', 'Item43', 'Eligibility: How will it be provided?', '1440', '2');
        });

        $("#lblT1_44").mouseover(function () {
            get_std_popup_values('1', 'Item44', 'Eligibility: When will it be provided?', '1440', '452');
        });

        $("#txtT1_44").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_45").focus();
            }
        });
        $("#txtT1_44").change(function () {
            var ctrl = document.getElementById("txtT1_44");
            check_text_length(ctrl, 200, "Group", "44");
        });
        $("#txtT1_44").mouseover(function () {
            get_std_popup_values('1', 'Item44', 'Eligibility: When will it be provided?', '1440', '452');
        });

        $("#lblT1_45").mouseover(function () {
            get_std_popup_values('1', 'Item45', 'Total # of Employees', '1465', '502');
        });

        $("#txtT1_45").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#rbT1_64_1").focus();
            }
        });
        $("#txtT1_45").change(function () {
            ctrl = $("#txtT1_45");
            check_for_integer(ctrl, "Group", 57);
            if (valid_int) tab11_Update_Total();
        });
        $("#txtT1_45").mouseover(function () {
            get_std_popup_values('1', 'Item45', 'Total # of Employees', '1465', '502');
        });

        $("#lblT1_64").mouseover(function () {
            get_rblist_multi_values('1', 'Item64', 'Client Addr. for benefits:', '1490', '400', 'Same as Co. Address above$Other (specify)');
        });

        $("#rbT1_64_1").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#rbT1_64_2").focus();
            }
        });
        $("#rbT1_64_1").click(function () {
            rblist_change('T1_64', 1, 2);
        });
        $("#rbT1_64_2").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                if ($("#rbT1_64_2").is(":checked")) {
                    $("#txtT1_64a").focus();
                } else {
                    $("#ckT1_46a").focus();
                }
            }
        });
        $("#rbT1_64_2").click(function () {
            rblist_change('T1_64', 2, 2);
        });
        $("#rbT1_64_1").mouseover(function () {
            get_rblist_multi_values('1', 'Item64', 'Client Addr. for benefits:', '1490', '400', 'Same as Co. Address above$Other (specify)');
        });

        $("#rbT1_64_2").mouseover(function () {
            get_rblist_multi_values('1', 'Item64', 'Client Addr. for benefits:', '1490', '400', 'Same as Co. Address above$Other (specify)');
        });


        $("#txtT1_64a").keydown(function (evt) {
            //Cancel ENTER (keycode=13) from performing default button click. Change focus to trigger
            // the change and blur events. NOTE: movetocontrol does NOT work to force cursor to move
            // to txtT1_10 in tab1_optional_texts
            if (evt.keyCode == 13) {
                evt.preventDefault();
                movetocontrol = "#txtT1_64b";
                $("#txtT1_64b").focus();
            }
        });

        $("#txtT1_64a").change(function () {
            set_dirty("hvformdirty");

            //Set background to transparent or highlight
            tab1_optional_texts();
        });

        $("#txtT1_64a").mouseover(function () {
            get_std_popup_values('1', 'Item64a', 'Primary Client Address 1', '1515', '2');
        });

        $("#txtT1_64b").keydown(function (evt) {
            //Cancel ENTER (keycode=13) from performing default button click. Change focus to trigger
            // the change and blur events. NOTE: movetocontrol does NOT work to force cursor to move
            // to txtT1_10 in tab1_optional_texts
            if (evt.keyCode == 13) {
                evt.preventDefault();
                movetocontrol = "#txtT1_64c";
                $("#txtT1_64c").focus();
            }
        });

        $("#txtT1_64b").change(function () {
            set_dirty("hvformdirty");

            //Set background to transparent or highlight
            tab1_optional_texts();
        });

        $("#txtT1_64b").mouseover(function () {
            get_std_popup_values('1', 'Item64b', 'Primary Client Address 2', '1540', '2');
        });

        $("#txtT1_64c").keydown(function (evt) {
            //Cancel ENTER (keycode=13) from performing default button click. Change focus to trigger
            // the change and blur events. NOTE: movetocontrol does NOT work to force cursor to move
            // to txtT1_10 in tab1_optional_texts
            if (evt.keyCode == 13) {
                evt.preventDefault();
                movetocontrol = "#txtT1_64d";
                $("#txtT1_64d").focus();
            }
        });

        $("#txtT1_64c").change(function () {
            set_dirty("hvformdirty");

            //Set background to transparent or highlight
            tab1_optional_texts();
        });

        $("#txtT1_64c").mouseover(function () {
            get_std_popup_values('1', 'Item64c', 'Primary Client City', '1565', '2');
        });

        $("#txtT1_64d").keydown(function (evt) {
            //Cancel ENTER (keycode=13) from performing default button click. Change focus to trigger
            // the change and blur events. NOTE: movetocontrol does NOT work to force cursor to move
            // to txtT1_10 in tab1_optional_texts
            if (evt.keyCode == 13) {
                evt.preventDefault();
                movetocontrol = "#txtT1_64e";
                $("#txtT1_64e").focus();
            }
        });

        $("#txtT1_64d").change(function () {
            set_dirty("hvformdirty");

            //Check text length, if any text entered
            var ctrl = document.getElementById("txtT1_64d");

            if (ctrl.value.length > 0) {
                //Make state all caps
                ctrl.value = ctrl.value.toUpperCase();
                check_for_valid_state(ctrl);
            }

            //Set background to transparent or highlight
            tab1_optional_texts();
        });

        $("#txtT1_64d").mouseover(function () {
            get_std_popup_values('1', 'Item64d', 'Primary Client State', '1565', '400');
        });

        //*****

        $("#txtT1_64e").keydown(function (evt) {
            //Cancel ENTER (keycode=13) from performing default button click. Change focus to trigger
            // the change and blur events. NOTE: movetocontrol does NOT work to force cursor to move
            // to txtT1_10 in tab1_optional_texts
            if (evt.keyCode == 13) {
                evt.preventDefault();
                movetocontrol = "#ckT1_46a";
                $("#ckT1_46a").focus();
            }
        });

        $("#txtT1_64e").change(function () {
            set_dirty("hvformdirty");

            //Check text length, if any text entered
            var ctrl = document.getElementById("txtT1_64e");
            if (ctrl.value.length > 0) {
                check_for_valid_zip(ctrl);
            }

            //Set background to transparent or highlight
            tab1_optional_texts();
        });

        $("#txtT1_64e").mouseover(function () {
            get_std_popup_values('1', 'Item64e', 'Primary Client Zip', '1565', '600');
        });

        $("#ckT1_46a").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#ckT1_46b").focus();
            }
        });
        $("#ckT1_46a").click(function () {
            set_dirty("hvformdirty");
        });
        $("#ckT1_46a").mouseover(function () {
            get_std_popup_values('1', 'Item46a', 'Coverage: Medical', '1615', '2');
        });

        $("#ckT1_46b").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#ckT1_46c").focus();
            }
        });
        $("#ckT1_46b").click(function () {
            set_dirty("hvformdirty");
        });
        $("#ckT1_46b").mouseover(function () {
            get_std_popup_values('1', 'Item46b', 'Coverage: Rx', '1615', '82');
        });

        $("#ckT1_46c").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#ckT1_46d").focus();
            }
        });
        $("#ckT1_46c").click(function () {
            set_dirty("hvformdirty");
        });
        $("#ckT1_46c").mouseover(function () {
            get_std_popup_values('1', 'Item46c', 'Coverage: Life', '1615', '172');
        });

        $("#ckT1_46d").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                if ($("#ckT1_46d").is(":checked")) {
                    $("#txtT1_46d").focus();
                } else {
                    $("#ckT1_46e").focus();
                }
            }
        });
        $("#ckT1_46d").click(function () {
            set_dirty("hvformdirty");
            tab1_optional_texts();
        });
        $("#ckT1_46d").mouseover(function () {
            get_std_popup_values('1', 'Item46d', 'Coverage: STD Cut Checks', '1615', '252');
        });

        $("#txtT1_46d").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#ckT1_46e").focus();
            }
        });

        $("#txtT1_46d").change(function () {
            set_dirty("hvformdirty");

            //Set background to transparent or highlight
            tab1_optional_texts();

            //Check text length, if any text entered
            var ctrl = document.getElementById("txtT1_46d");
            if (ctrl.value.length > 0) {
                check_text_length(ctrl, 50, "Group", "46");
            }
        });

        $("#txtT1_46d").mouseover(function () {
            get_std_popup_values('1', 'Item46d1', 'STD. % of Taxes to Deduct', '1615', '527');
        });

        $("#ckT1_46e").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                if ($("#ckT1_46e").is(":checked")) {
                    $("#txtT1_46e").focus();
                } else {
                    $("#ckT1_46f").focus();
                }
            }
        });
        $("#ckT1_46e").click(function () {
            set_dirty("hvformdirty");
            tab1_optional_texts();
        });
        $("#ckT1_46e").mouseover(function () {
            get_std_popup_values('1', 'Item46e', 'HSA-compatibile HDHP', '1640', '2');
        });

        $("#lblT1_46e").mouseover(function () {
            get_std_popup_values('1', 'Item46e1', 'HSA Vendor', '1640', '202');
        });

        $("#txtT1_46e").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#ckT1_46f").focus();
            }
        });
        $("#txtT1_46e").change(function () {
            set_dirty("hvformdirty");
            tab1_optional_texts();
        });
        $("#txtT1_46e").mouseover(function () {
            get_std_popup_values('1', 'Item46e1', 'HSA Vendor', '1640', '202');
        });

        $("#ckT1_46f").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#ckT1_46g").focus();
            }
        });
        $("#ckT1_46f").click(function () {
            set_dirty("hvformdirty");
        });
        $("#ckT1_46f").mouseover(function () {
            get_std_popup_values('1', 'Item46f', 'Coverage: Dental', '1665', '2');
        });

        $("#ckT1_46g").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#ckT1_46h").focus();
            }
        });
        $("#ckT1_46g").click(function () {
            set_dirty("hvformdirty");
        });
        $("#ckT1_46g").mouseover(function () {
            get_std_popup_values('1', 'Item46g', 'Coverage: HIPAA', '1665', '82');
        });

        $("#ckT1_46h").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#ckT1_46i").focus();
            }
        });
        $("#ckT1_46h").click(function () {
            set_dirty("hvformdirty");
        });
        $("#ckT1_46h").mouseover(function () {
            get_std_popup_values('1', 'Item46h', 'Coverage: COBA', '1665', '172');
        });

        $("#ckT1_46i").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#ckT1_46j").focus();
            }
        });
        $("#ckT1_46i").click(function () {
            set_dirty("hvformdirty");
        });
        $("#ckT1_46i").mouseover(function () {
            get_std_popup_values('1', 'Item46i', 'Coverage: STD Verification Only', '1665', '252');
        });

        $("#ckT1_46j").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#ckT1_46k").focus();
            }
        });
        $("#ckT1_46j").click(function () {
            set_dirty("hvformdirty");
        });
        $("#ckT1_46j").mouseover(function () {
            get_std_popup_values('1', 'Item46j', 'Coverage: MCRA', '1690', '2');
        });

        $("#ckT1_46k").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#ckT1_46l").focus();
            }
        });
        $("#ckT1_46k").click(function () {
            set_dirty("hvformdirty");
        });
        $("#ckT1_46k").mouseover(function () {
            get_std_popup_values('1', 'Item46k', 'Coverage: DCRA', '1690', '82');
        });

        $("#ckT1_46l").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#ckT1_46m").focus();
            }
        });

        $("#ckT1_46l").click(function () {
            set_dirty("hvformdirty");
            tab1_optional_texts();
        });

        $("#ckT1_46l").mouseover(function () {
            get_std_popup_values('1', 'Item46l', 'Coverage: HRA', '1690', '172');
        });


        $("#ckT1_46m").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                if ($("#ckT1_46m").is(":checked")) {
                    $("#txtT1_46m").focus();
                } else {
                    $("#rbT1_47_1").focus();
                }
            }
        });
        $("#ckT1_46m").click(function () {
            set_dirty("hvformdirty");
            tab1_optional_texts();
        });
        $("#ckT1_46m").mouseover(function () {
            get_std_popup_values('1', 'Item46m', 'Coverage: Other', '1690', '502');
        });

        $("#txtT1_46m").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#rbT1_47_1").focus();
            }
        });
        $("#txtT1_46m").change(function () {
            set_dirty("hvformdirty");

            //Set background to transparent or highlight
            tab1_optional_texts();

            //Check text length, if any text entered
            var ctrl = document.getElementById("txtT1_46m");
            if (ctrl.value.length > 0) {
                check_text_length(ctrl, 200, "Group", "46");
            }
        });


        $("#txtT1_46m").mouseover(function () {
            get_std_popup_values('1', 'Item46m1', 'Coverage: Other', '1690', '527');
        });

        $("#rbT1_47_1").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#rbT1_47_2").focus();
            }
        });
        $("#rbT1_47_1").click(function () {
            rblist_change('T1_47', 1, 2);
        });
        $("#rbT1_47_2").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#ckT1_48").focus();
            }
        });
        $("#rbT1_47_2").click(function () {
            rblist_change('T1_47', 2, 2);
        });
        $("#rbT1_47_1").mouseover(function () {
            get_rblist_multi_values('1', 'Item47', 'PD:', '1740', '2', 'One PD for Med/Dental/STD$Separate PDs');
        });

        $("#rbT1_47_2").mouseover(function () {
            get_rblist_multi_values('1', 'Item47', 'PD:', '1740', '2', 'One PD for Med/Dental/STD$Separate PDs');
        });

        $("#ckT1_48").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#rbT1_79_1").focus();
            }
        });
        $("#ckT1_48").click(function () {
            tab1_optional_texts();
        });
        $("#ckT1_48").mouseover(function () {
            get_std_popup_values('1', 'Item48', 'Plan subject to collective bargaining agreement', '1765', '2');
        });

        $("#txtT1_48").change(function () {
            set_dirty("hvformdirty");
        });

        $("#txtT1_48").blur(function () {
            tab1_optional_texts();
        })

        $("#txtT1_48").mouseover(function () {
            get_std_popup_values('1', 'Item48a', 'Expiration date of current agreement', '1900', '2');
        });

        $("#ckT1_49").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
            }
        });
        $("#ckT1_49").click(function () {
            set_dirty("hvformdirty");
        });
        $("#ckT1_49").mouseover(function () {
            get_std_popup_values('1', 'Item49', 'Plan is MEWA', '2020', '2');
        });

        $("#txtT1_63").change(function () {
            set_dirty("hvformdirty");
        });

        $("#txtT1_63").blur(function () {
            check_SIC_code();
        })


        $("#lblT1_63").mouseover(function () {
            get_std_popup_values('1', 'Item63', 'SIC code', '290', '2');
        });

        $("#txtT1_63").mouseover(function () {
            get_std_popup_values('1', 'Item63', 'SIC code', '290', '2');
        });

        $("#txtT1_63").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#txtT1_10").focus();
            }
        });

        $("#lblT1_65").mouseover(function () {
            get_rblist_multi_values('1', 'Item65', 'Implementation Meeting Held?:', '2045', '3', 'No$N/A (existing group)$Yes');
        });

        $("#rbT1_65_1").mouseover(function () {
            get_rblist_multi_values('1', 'Item65', 'Implementation Meeting Held?:', '2045', '3', 'No$N/A (existing group)$Yes');
        });
        $("#rbT1_65_2").mouseover(function () {
            get_rblist_multi_values('1', 'Item65', 'Implementation Meeting Held?:', '2045', '3', 'No$N/A (existing group)$Yes');
        });
        $("#rbT1_65_3").mouseover(function () {
            get_rblist_multi_values('1', 'Item65', 'Implementation Meeting Held?:', '2045', '3', 'No$N/A (existing group)$Yes');
        });

        $("#rbT1_65_1").click(function () {
            rblist_change('T1_65', 1, 3);
        });

        $("#rbT1_65_2").click(function () {
            rblist_change('T1_65', 2, 3);
        });

        $("#rbT1_65_3").click(function () {
            rblist_change('T1_65', 3, 3);
        });

        $("#rbT1_65_1").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#rbT1_65_2").focus();
            }
        });

        $("#rbT1_65_2").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
                $("#rbT1_65_3").focus();
            }
        });

        $("#rbT1_65_3").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
            }
        });

        $("#txtT1_65").blur(function () {
            tab1_optional_texts();
        })

        $("#txtT1_65").mouseover(function () {
            get_std_popup_values('1', 'Item65a', 'Implementation Meeting date', '2045', '500');
        });

        $("#txtT1_65").keydown(function (evt) {
            if (evt.keyCode == 9 || evt.keyCode == 13) {
                evt.preventDefault();
            }
        });

        $("#rbT1_70_1").click(function () {
            rblist_change('T1_70', 1, 2);
            $("#lblT1_70_attachment").show();
        });
        $("#rbT1_70_2").click(function () {
            rblist_change('T1_70', 2, 2);
            $("#lblT1_70_attachment").hide();
        });

        $("#lblT1_70").mouseover(function () {
            get_rblist_multi_values('1', 'Item70', 'Does client want data inclusion in state reporting for APCD?:', '1945', '2', 'Yes$No');
        });

    });
}  // end Try
  catch(errorObject) {
    alert("In docready_tab1, the following error occurred: " + errorObject.description);
  }