var ctrl;
$(document).ready(function () {
    $("#rbT11_modify_current").click(function () {
        ctrl = document.getElementById("btnT11_update");
        ctrl.style.visibility = "visible";
        ctrl = document.getElementById("btnT11_cancel_update");
        ctrl.style.visibility = "visible";
        disable_action = false;
        tab11_controls_setup("current");
    });

    $("#rbT11_modify_1").click(function () {
        rblist_change('T11_modify', 1, 2);
    });
    $("#rbT11_modify_2").click(function () {
        rblist_change('T11_modify', 2, 2);
    });

    $("#ckT11_display_all_values").click(function () {
        if ($("#ckT11_display_all_values").is(":checked")) {
            display_tab11_popup_values = true;
        } else {
            display_tab11_popup_values = false;
        }
    });

    $("#btnUpdate_renewals").click(function (event) {
        renewal_update_check();
        event.preventDefault();
    });

    $("#ckT11_modify_current_values").click(function () {
        tab11_optional_texts();
    });

    $("#txtT11_total").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_PBM_vendor").focus();
        }
    });

    $("#txtT11_total").change(function () {
        set_dirty("hvrenewaldirty");
        ctrl = $("#txtT11_total");
        check_for_integer(ctrl, "Fees/Rates-Total #", 0);
        tab1_Update_Total();
    });

    $("#txtT11_current_effdate").change(function () {
        current_date();
    });

    $("#txtT11_current_changed_effdate").change(function () {
        current_changed_effdate();
    });

    $("#txtT11_renewal_effdate").change(function () {
        renewal_date();
    });

    $("#txtT11_PBM_vendor").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_1_current_to_HPI").focus();
        }
    });

    $("#txtT11_PBM_vendor").change(function () {
        set_dirty("hvrenewaldirty");
        tab2_Update_PBM();
    });


    $("#txtT11_Setup_note_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_1_current_to_HPI").focus();
        }
    });

    $("#divT11_Setup_note_current").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
               get_tab11_std_popup_values(11, "Item151a", "Set-up & Annl Maint. Fee Note (Current)", 490, 210);
            }
        }
    });
    $("#txtT11_Setup_note_current").change(function () {
        set_dirty("hvrenewaldirty");
    });
    $("#txtT11_Setup_note_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_3_renewal_to_HPI").focus();
        }
    });
    $("#divT11_Setup_note_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                get_tab11_std_popup_values(11, "Item151b", "Set-up & Annl Maint. Fee Note (Renewal)", 490, 585);
            }
        }
    });
    $("#txtT11_Setup_note_renewal").change(function () {
        set_dirty("hvrenewaldirty");
    });

    $("#txtT11_1_current_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_1_current_to_Broker").focus();
        }
    });
    $("#txtT11_1_current_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_1_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_1_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_1_current_Total");
        check_fee_amount(this, "Fees/Rates", 1);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });


    $("#divT11_1_current_to_HPI").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                get_tab11_std_popup_values(11, "Item1a1", "Run-in Fee To HPI (Current)", 515, 250);
            }
        }
    });

    $("#txtT11_1_current_to_Broker").keydown(function (evt) {
        //Allow tab (keycode=9) or ENTER (keycode=13) to move to next control down in Currrent
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_1_current").focus();
        }
    });
    $("#txtT11_1_current_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_1_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_1_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_1_current_Total");
        check_fee_amount(this, "Fees/Rates", 1);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });

    $("#divT11_1_current_to_Broker").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item1a2", "Run-in Fee To Broker (Current)", 515, 385);
            }
        }
    });

    $("#divT11_1_current_Total").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item1a3", "Run-in Fee Total (Current)", 515, 475);
            }
        }
    });

    $("#ckT11_1_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_1_current").is(":checked")) {
                $("#txtT11_1_Bk1_current").focus();
            } else {
                $("#txtT11_2_current_to_HPI").focus();
            }
        }
    });

    $("#ckT11_1_current").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });

    $("#lblT11_1_split").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item1a4", "Split Broker Fees? (Current)", 540, 185);
            }
        }
    });

    $("#divT11_1").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item1a4", "Split Broker Fees? (Current)", 540, 185);
            }
        }
    });

    $("#div_ckT11_1_current").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item1a4", "Split Broker Fees? (Current)", 540, 185);
            }
        }
    });

    $("#txtT11_1_Bk1_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_1_Bk2_current").focus();
        }
    });

    $("#txtT11_1_Bk1_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 1);
    });
    $("#divT11_1_Bk_1").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item1a5", "Broker #1 Fee (Current)", 540, 230);
            }
        }
    });


    $("#txtT11_1_Bk2_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_1_Bk3_current").focus();
        }
    });

    $("#txtT11_1_Bk2_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 1);
    });

    $("#divT11_1_Bk_2").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item1a6", "Broker #2 Fee (Current)", 540, 300);
            }
        }
    });


    $("#txtT11_1_Bk3_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_1_Bk4_current").focus();
        }
    });

    $("#txtT11_1_Bk3_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 1);
    });

    $("#divT11_1_Bk_3").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item1a7", "Broker #3 Fee (Current)", 540, 370);
            }
        }
    });

    $("#txtT11_1_Bk4_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_1_Bk5_current").focus();
        }
    });


    $("#txtT11_1_Bk4_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 1);
    });

    $("#divT11_1_Bk_4").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item1a8", "Broker #4 Fee (Current)", 540, 440);
            }
        }
    });

    $("#txtT11_1_Bk5_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_2_current_to_HPI").focus();
        }
    });

    $("#txtT11_1_Bk5_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 1);
    });

    $("#divT11_1_Bk_5").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item1a9", "Broker #5 Fee (Current)", 540, 510);
            }
        }
    });

    $("#txtT11_2_current_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_2_current_to_Broker").focus();
        }
    });
    $("#txtT11_2_current_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_2_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_2_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_2_current_Total");
        check_fee_amount(this, "Fees/Rates", 2);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });

    $('#divT11_2_current_to_HPI').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item2a1", "General Set-up Fee To HPI (Current)", 565, 250);
            }
        }
    });

    $("#txtT11_2_current_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_2_current").focus();
        }
    });
    $("#txtT11_2_current_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_2_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_2_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_2_current_Total");
        check_fee_amount(this, "Fees/Rates", 2);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });

    $('#divT11_2_current_to_Broker').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item2a2", "General Set-up Fee To Broker (Current)", 565, 385);
            }
        }
    });

    $('#divT11_2_current_Total').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item2a3", "General Set-up Fee Total (Current)", 565, 475);
            }
        }
    });

    $("#ckT11_2_current").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });

    $("#ckT11_2_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_2_current").is(":checked")) {
                $("#txtT11_2_Bk1_current").focus();
            } else {
                $("#txtT11_3_current_to_HPI").focus();
            }
        }
    });

    $("#lblT11_2_split").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item2a4", "Split Broker Fees? (Current)", 590, 185);
            }
        }
    });
    $("#div_ckT11_2_current").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item2a4", "Split Broker Fees? (Current)", 590, 185);
            }
        }
    });
    $("#divT11_2").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item2a4", "Split Broker Fees? (Current)", 590, 185);
            }
        }
    });

    $("#txtT11_2_Bk1_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_2_Bk2_current").focus();
        }
    });

    $("#txtT11_2_Bk1_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 2);
    });

    $("#divT11_2_Bk_1").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item2a5", "Broker #1 Fee (Current)", 590, 230);
            }
        }
    });

    $("#txtT11_2_Bk2_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_2_Bk3_current").focus();
        }
    });

    $("#txtT11_2_Bk2_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 2);
    });

    $("#divT11_2_Bk_2").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item2a6", "Broker #2 Fee (Current)", 590, 300);
            }
        }
    });

    $("#txtT11_2_Bk3_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_2_Bk4_current").focus();
        }
    });

    $("#txtT11_2_Bk3_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 2);
    });

    $("#divT11_2_Bk_3").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item2a7", "Broker #3 Fee (Current)", 590, 370);
            }
        }
    });

    $("#txtT11_2_Bk4_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_2_Bk5_current").focus();
        }
    });

    $("#txtT11_2_Bk4_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 2);
    });

    $("#divT11_2_Bk_4").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item2a8", "Broker #4 Fee (Current)", 590, 440);
            }
        }
    });

    $("#txtT11_2_Bk5_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_3_current_to_HPI").focus();
        }
    });

    $("#txtT11_2_Bk5_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 2);
    });

    $("#divT11_2_Bk_5").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item2a9", "Broker #5 Fee (Current)", 590, 510);
            }
        }
    });

    $("#txtT11_3_current_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_3_current_to_Broker").focus();
        }
    });
    $("#txtT11_3_current_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_3_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_3_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_3_current_Total");
        check_fee_amount(this, "Fees/Rates", 3);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_3_current_to_HPI').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item3a1", "Flex Set-up Fee to HPI (Current)", 615, 250);
            }
        }
    });

    $("#txtT11_3_current_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_3_current").focus();
        }
    });
    $("#txtT11_3_current_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_3_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_3_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_3_current_Total");
        check_fee_amount(this, "Fees/Rates", 3);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_3_current_to_Broker').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item3a2", "Flex Set-up Fee to Broker (Current)", 615, 385);
            }
        }
    });
    $('#divT11_3_current_Total').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item3a3", "Flex Set-up Fee Total (Current)", 615, 475);
            }
        }
    });

    $("#ckT11_3_current").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_3_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_3_current").is(":checked")) {
                $("#txtT11_3_Bk1_current").focus();
            } else {
                $("#txtT11_4_current_to_HPI").focus();
            }
        }
    });

    $("#lblT11_3_split").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item3a4", "Split Broker Fees? (Current)", 640, 185);
            }
        }
    });
    $("#div_ckT11_3_current").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item3a4", "Split Broker Fees? (Current)", 640, 185);
            }
        }
    });
    $("#divT11_3").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item3a4", "Split Broker Fees? (Current)", 640, 185);
            }
        }
    });


    $("#txtT11_3_Bk1_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_3_Bk2_current").focus();
        }
    });

    $("#txtT11_3_Bk1_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 3);
    });

    $("#divT11_3_Bk_1").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item3a5", "Broker #1 Fee (Current)", 640, 230);
            }
        }
    });


    $("#txtT11_3_Bk2_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_3_Bk3_current").focus();
        }
    });

    $("#txtT11_3_Bk2_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 3);
    });

    $("#divT11_3_Bk_2").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item3a6", "Broker #2 Fee (Current)", 640, 300);
            }
        }
    });

    $("#txtT11_3_Bk3_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_3_Bk4_current").focus();
        }
    });

    $("#txtT11_3_Bk3_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 3);
    });

    $("#divT11_3_Bk_3").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item3a7", "Broker #3 Fee (Current)", 640, 370);
            }
        }
    });

    $("#txtT11_3_Bk4_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_3_Bk5_current").focus();
        }
    });

    $("#txtT11_3_Bk4_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 3);
    });

    $("#divT11_3_Bk_4").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item3a8", "Broker #4 Fee (Current)", 640, 440);
            }
        }
    });

    $("#txtT11_3_Bk5_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_4_current_to_HPI").focus();
        }
    });

    $("#txtT11_3_Bk5_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 3);
    });

    $("#divT11_3_Bk_5").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item3a9", "Broker #5 Fee (Current)", 640, 510);
            }
        }
    });

    $("#txtT11_3_renewal_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_3_renewal_to_Broker").focus();
        }
    });

    $("#txtT11_3_renewal_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_3_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_3_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_3_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 3);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_3_renewal_to_HPI').mousedown(function (evt) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (evt.which != 1) {
            if (display_tab11_popup_values) {
                evt.preventDefault();
                //alert("page coords:  X: " + evt.pageX + ", Y: " + evt.pageY + ", Client coords: X: " + evt.clientX + ", Y: " + evt.clientY);
                get_tab11_std_popup_values(11, "Item3b1", "Flex Set-up Fee To HPI (Renewal)", 615, 595);
            }
        }
    });

    $("#txtT11_3_renewal_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_3_renewal").focus();
        }
    });
    $("#txtT11_3_renewal_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_3_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_3_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_3_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 3);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_3_renewal_to_Broker').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item3b2", "Flex Set-up Fee To Broker (Renewal)", 615, 685);
            }
        }
    });
    $('#divT11_3_renewal_Total').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item3b3", "Flex Set-up Fee Total (Renewal)", 615, 775);
            }
        }
    });

    $("#ckT11_3_renewal").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });

    $("#ckT11_3_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_3_renewal").is(":checked")) {
                $("#txtT11_3_Bk1_renewal").focus();
            } else {
                $("#txtT11_4_renewal_to_HPI").focus();
            }
        }
    });

    $('#div_ckT11_3_renewal').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item3b4", "Split Broker Fees? (Renewal)", 640, 585);
            }
        }
    });


    $("#txtT11_3_Bk1_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_3_Bk2_renewal").focus();
        }
    });

    $("#txtT11_3_Bk1_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 3);
    });

    $("#divT11_3_Bk_1_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item3b5", "Broker #1 Fee (Renewal)", 640, 625);
            }
        }
    });

    $("#txtT11_3_Bk2_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_3_Bk3_renewal").focus();
        }
    });

    $("#txtT11_3_Bk2_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 3);
    });

    $("#divT11_3_Bk_2_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item3b6", "Broker #2 Fee (Renewal)", 640, 695);
            }
        }
    });

    $("#txtT11_3_Bk3_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_3_Bk4_renewal").focus();
        }
    });

    $("#txtT11_3_Bk3_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 3);
    });

    $("#divT11_3_Bk_3_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item3b7", "Broker #3 Fee (Renewal)", 640, 765);
            }
        }
    });

    $("#txtT11_3_Bk4_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_3_Bk5_renewal").focus();
        }
    });

    $("#txtT11_3_Bk4_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 3);
    });

    $("#divT11_3_Bk_4_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item3b8", "Broker #4 Fee (Renewal)", 640, 835);
            }
        }
    });

    $("#txtT11_3_Bk5_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_4_renewal_to_HPI").focus();
        }
    });

    $("#txtT11_3_Bk5_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 3);
    });

    $("#divT11_3_Bk_5_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item3b9", "Broker #5 Fee (Renewal)", 640, 905);
            }
        }
    });

    $("#txtT11_4_current_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_4_current_to_Broker").focus();
        }
    });

    $("#txtT11_4_current_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_4_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_4_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_4_current_Total");
        check_fee_amount(this, "Fees/Rates", 4);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_4_current_to_HPI').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item4a1", "HRA Set-up Fee to HPI (Current)", 665, 250);
            }
        }
    });


    $("#txtT11_4_current_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_4_current").focus();
        }
    });
    $("#txtT11_4_current_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_4_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_4_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_4_current_Total");
        check_fee_amount(this, "Fees/Rates", 4);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_4_current_to_Broker').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item4a2", "HRA Set-up Fee to Broker (Current)", 665, 385);
            }
        }
    });
    $('#divT11_4_current_Total').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item4a3", "HRA Set-up Fee Total (Current)", 665, 475);
            }
        }
    });


    $("#ckT11_4_current").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_4_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_4_current").is(":checked")) {
                $("#txtT11_4_Bk1_current").focus();
            } else {
                $("#ddlT11_5_current").focus();
            }
        }
    });

    $("#lblT11_4_split").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item4a4", "Split Broker Fees? (Current)", 690, 185);
            }
        }
    });
    $("#div_ckT11_4_current").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item4a4", "Split Broker Fees? (Current)", 690, 185);
            }
        }
    });
    $("#divT11_4").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item4a4", "Split Broker Fees? (Current)", 690, 185);
            }
        }
    });

    $("#txtT11_4_Bk1_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_4_Bk2_current").focus();
        }
    });

    $("#txtT11_4_Bk1_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 4);
    });

    $("#divT11_4_Bk_1").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item4a5", "Broker #1 Fee (Current)", 690, 230);
            }
        }
    });


    $("#txtT11_4_Bk2_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_4_Bk3_current").focus();
        }
    });

    $("#txtT11_4_Bk2_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 4);
    });

    $("#divT11_4_Bk_2").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item4a6", "Broker #2 Fee (Current)", 690, 300);
            }
        }
    });

    $("#txtT11_4_Bk3_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_4_Bk4_current").focus();
        }
    });

    $("#txtT11_4_Bk3_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 4);
    });

    $("#divT11_4_Bk_3").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item4a7", "Broker #3 Fee (Current)", 690, 370);
            }
        }
    });

    $("#txtT11_4_Bk4_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_4_Bk5_current").focus();
        }
    });

    $("#txtT11_4_Bk4_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 4);
    });

    $("#divT11_4_Bk_4").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item4a8", "Broker #4 Fee (Current)", 690, 440);
            }
        }
    });

    $("#txtT11_4_Bk5_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ddlT11_5_current").focus();
        }
    });

    $("#txtT11_4_Bk5_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 4);
    });

    $("#divT11_4_Bk_5").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item4a9", "Broker #5 Fee (Current)", 690, 510);
            }
        }
    });

    $("#txtT11_4_renewal_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_4_renewal_to_Broker").focus();
        }
    });

    $("#txtT11_4_renewal_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_4_renewal_to_Broker").focus();
        }
    });

    $("#txtT11_4_renewal_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_4_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_4_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_4_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 4);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_4_renewal_to_HPI').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item4b1", "HRA Set-up Fee To HPI (Renewal)", 665, 550);
            }
        }
    });

    $("#txtT11_4_renewal_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_4_renewal").focus();
        }
    });
    $("#txtT11_4_renewal_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_4_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_4_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_4_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 4);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_4_renewal_to_Broker').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item4b2", "HRA Set-up Fee To Broker (Renewal)", 665, 685);
            }
        }
    });
    $('#divT11_4_renewal_Total').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item4b3", "HRA Set-up Fee Total (Renewal)", 665, 775);
            }
        }
    });


    $("#ckT11_4_renewal").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_4_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_4_renewal").is(":checked")) {
                $("#txtT11_4_Bk1_renewal").focus();
            } else {
                $("#ddlT11_5_renewal").focus();
            }
        }
    });

    $('#div_ckT11_4_renewal').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item4b4", "Split Broker Fees? (Renewal)", 690, 585);
            }
        }
    });

    $("#txtT11_4_Bk1_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_4_Bk2_renewal").focus();
        }
    });

    $("#txtT11_4_Bk1_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 4);
    });

    $("#divT11_4_Bk_1_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item4b5", "Broker #1 Fee (Renewal)", 690, 625);
            }
        }
    });

    $("#txtT11_4_Bk2_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_4_Bk3_renewal").focus();
        }
    });

    $("#txtT11_4_Bk2_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 4);
    });

    $("#divT11_4_Bk_2_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item4b6", "Broker #2 Fee (Renewal)", 690, 695);
            }
        }
    });

    $("#txtT11_4_Bk3_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_4_Bk4_renewal").focus();
        }
    });

    $("#txtT11_4_Bk3_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 4);
    });

    $("#divT11_4_Bk_3_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item4b7", "Broker #3 Fee (Renewal)", 690, 765);
            }
        }
    });

    $("#txtT11_4_Bk4_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_4_Bk5_renewal").focus();
        }
    });

    $("#txtT11_4_Bk4_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 4);
    });

    $("#divT11_4_Bk_4_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item4b8", "Broker #4 Fee (Renewal)", 690, 835);
            }
        }
    });

    $("#txtT11_4_Bk5_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ddlT11_5_renewal").focus();
        }
    });

    $("#txtT11_4_Bk5_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 4);
    });

    $("#divT11_4_Bk_5_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item4b9", "Broker #5 Fee (Renewal)", 690, 905);
            }
        }
    });

    $("#ddlT11_5_current").change(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });
    $("#txtT11_5_current").keydown(function (evt) {
        if (evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_6_current_to_HPI").focus();
        }
    });
    $("#txtT11_5_current").change(function () {
        check_fee_amount(this, "Fees/Rates", 5);
        tab11_optional_texts();
    });

    //Use mousedown for div because disabled ddl doesn't fire mousedown event
    $('#divT11_5_current').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item5a", "Health Risk Questionnaire Set-up Fee (Current)", 715, 250);
            }
        }
    });

    $('#divT11_5a_current').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item5a1", "Health Risk Questionnaire Set-up Fee Other (Current)", 715, 385);
            }
        }
    });


    $("#ddlT11_5_renewal").change(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });
    $('#ddlT11_5_renewal').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item5b", "Health Risk Questionnaire Set-up Fee (Renewal)", 715, 550);
            }
        }
    });

    $("#txtT11_5_renewal").keydown(function (evt) {
        if (evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_6_renewal_to_HPI").focus();
        }
    });
    $("#txtT11_5_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 5);
        tab11_optional_texts();
    });
    $('#divT11_5a_renewal').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item5b1", "Health Risk Questionnaire Set-up Fee Other (Renewal)", 715, 685);
            }
        }
    });


    $("#txtT11_6_current_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_6_current_to_Broker").focus();
        }
    });
    $("#txtT11_6_current_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_6_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_6_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_6_current_Total");
        check_fee_amount(this, "Fees/Rates", 6);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_6_current_to_HPI').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item6a1", "Med. Annual Maint. Fee to HPI (Current)", 740, 250);
            }
        }
    });

    $("#txtT11_6_current_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_6_current").focus();
        }
    });

    $("#txtT11_6_current_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_6_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_6_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_6_current_Total");
        check_fee_amount(this, "Fees/Rates", 6);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_6_current_to_Broker').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item6a2", "Med. Annual Maint. Fee to Broker (Current)", 740, 385);
            }
        }
    });
    $('#divT11_6_current_Total').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item6a3", "Med. Annual Maint. Fee Total (Current)", 740, 475);
            }
        }
    });


    $("#ckT11_6_current").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_6_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_6_current").is(":checked")) {
                $("#txtT11_6_Bk1_current").focus();
            } else {
                $("#txtT11_7_current_to_HPI").focus();
            }
        }
    });

    $("#lblT11_6_split").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item6a4", "Split Broker Fees? (Current)", 765, 185);
            }
        }
    });

    $("#divT11_6").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item6a4", "Split Broker Fees? (Current)", 765, 185);
            }
        }
    });

    $("#div_ckT11_6_current").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item6a4", "Split Broker Fees? (Current)", 765, 185);
            }
        }
    });



    $("#txtT11_6_Bk1_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_6_Bk2_current").focus();
        }
    });

    $("#txtT11_6_Bk1_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 6);
    });

    $("#divT11_6_Bk_1").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item6a5", "Broker Fees#1 (Current)", 765, 230);
            }
        }
    });

    $("#txtT11_6_Bk2_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_6_Bk3_current").focus();
        }
    });

    $("#txtT11_6_Bk2_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 6);
    });

    $("#divT11_6_Bk_2").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item6a6", "Broker Fees#2 (Current)", 765, 300);
            }
        }
    });

    $("#txtT11_6_Bk3_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_6_Bk4_current").focus();
        }
    });

    $("#txtT11_6_Bk3_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 6);
    });

    $("#divT11_6_Bk_3").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item6a7", "Broker Fees#3 (Current)", 765, 370);
            }
        }
    });

    $("#txtT11_6_Bk4_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_6_Bk5_current").focus();
        }
    });

    $("#txtT11_6_Bk4_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 6);
    });

    $("#divT11_6_Bk_4").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item6a8", "Broker Fees#4 (Current)", 765, 440);
            }
        }
    });

    $("#txtT11_6_Bk5_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_7_current_to_HPI").focus();
        }
    });

    $("#txtT11_6_Bk5_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 6);
    });

    $("#divT11_6_Bk_5").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item6a9", "Broker Fees#5 (Current)", 765, 510);
            }
        }
    });

    $("#txtT11_6_renewal_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_6_renewal_to_Broker").focus();
        }
    });
    $("#txtT11_6_renewal_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_6_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_6_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_6_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 6);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_6_renewal_to_HPI').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item6b1", "Med. Annual Maint. Fee to HPI (Renewal)", 740, 550);
            }
        }
    });

    $("#txtT11_6_renewal_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_6_renewal").focus();
        }
    });
    $("#txtT11_6_renewal_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_6_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_6_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_6_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 6);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_6_renewal_to_Broker').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item6b2", "Med. Annual Maint. Fee to Broker (Renewal)", 740, 685);
            }
        }
    });
    $('#divT11_6_renewal_Total').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item6b3", "Med. Annual Maint. Fee Total (Renewal)", 740, 775);
            }
        }
    });


    $("#ckT11_6_renewal").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_6_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_6_renewal").is(":checked")) {
                $("#txtT11_6_Bk1_renewal").focus();
            } else {
                $("#txtT11_7_renewal_to_HPI").focus();
            }
        }
    });

    $("#div_ckT11_6_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item6b4", "Split Broker Fees? (Renewal)", 765, 585);
            }
        }
    });


    $("#txtT11_6_Bk1_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_6_Bk2_renewal").focus();
        }
    });

    $("#txtT11_6_Bk1_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 6);
    });

    $("#divT11_6_Bk_1_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item6b5", "Broker #1 Fee (Renewal)", 765, 645);
            }
        }
    });

    $("#txtT11_6_Bk2_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_6_Bk3_renewal").focus();
        }
    });

    $("#txtT11_6_Bk2_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 6);
    });

    $("#divT11_6_Bk_2_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item6b6", "Broker #2 Fee (Renewal)", 765, 695);
            }
        }
    });

    $("#txtT11_6_Bk3_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_6_Bk4_renewal").focus();
        }
    });

    $("#txtT11_6_Bk3_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 6);
    });

    $("#divT11_6_Bk_3_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item6b7", "Broker #3 Fee (Renewal)", 765, 765);
            }
        }
    });

    $("#txtT11_6_Bk4_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_6_Bk5_renewal").focus();
        }
    });

    $("#txtT11_6_Bk4_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 6);
    });

    $("#divT11_6_Bk_4_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item6b8", "Broker #4 Fee (Renewal)", 765, 835);
            }
        }
    });

    $("#txtT11_6_Bk5_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_7_renewal_to_HPI").focus();
        }
    });

    $("#txtT11_6_Bk5_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 6);
    });

    $("#divT11_6_Bk_5_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item6b9", "Broker #5 Fee (Renewal)", 765, 905);
            }
        }
    });

    $("#txtT11_7_current_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_7_current_to_Broker").focus();
        }
    });
    $("#txtT11_7_current_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_7_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_7_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_7_current_Total");
        check_fee_amount(this, "Fees/Rates", 7);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_7_current_to_HPI').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item7a1", "Den. Annual Maint. Fee to HPI (Current)", 790, 250);
            }
        }
    });

    $("#txtT11_7_current_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_7_current").focus();
        }
    });
    $("#txtT11_7_current_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_7_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_7_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_7_current_Total");
        check_fee_amount(this, "Fees/Rates", 7);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_7_current_to_Broker').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item7a2", "Den. Annual Maint. Fee to Broker (Current)", 790, 385);
            }
        }
    });
    $('#divT11_7_current_Total').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item7a3", "Den. Annual Maint. Fee Total (Current)", 790, 475);
            }
        }
    });

    $("#ckT11_7_current").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_7_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_7_current").is(":checked")) {
                $("#txtT11_7_Bk1_current").focus();
            } else {
                $("#txtT11_8_current_to_HPI").focus();
            }
        }
    });

    $("#lblT11_7_split").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item7a4", "Split Broker Fees? (Current)", 815, 185);
            }
        }
    });

    $("#divT11_7").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item7a4", "Split Broker Fees? (Current)", 815, 185);
            }
        }
    });

    $("#div_ckT11_7_current").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item7a4", "Split Broker Fees? (Current)", 815, 185);
            }
        }
    });


    $("#txtT11_7_Bk1_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_7_Bk2_current").focus();
        }
    });

    $("#txtT11_7_Bk1_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 7);
    });

    $("#divT11_7_Bk_1").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item7a5", "Broker #1 Fees (Current)", 815, 230);
            }
        }
    });

    $("#txtT11_7_Bk2_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_7_Bk3_current").focus();
        }
    });

    $("#txtT11_7_Bk2_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 7);
    });

    $("#divT11_7_Bk_2").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item7a6", "Broker #2 Fees (Current)", 815, 300);
            }
        }
    });

    $("#txtT11_7_Bk3_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_7_Bk4_current").focus();
        }
    });

    $("#txtT11_7_Bk3_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 7);
    });

    $("#divT11_7_Bk_3").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item7a7", "Broker #3 Fees (Current)", 815, 370);
            }
        }
    });

    $("#txtT11_7_Bk4_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_7_Bk5_current").focus();
        }
    });

    $("#txtT11_7_Bk4_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 7);
    });

    $("#divT11_7_Bk_4").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item7a8", "Broker #4 Fees (Current)", 815, 440);
            }
        }
    });

    $("#txtT11_7_Bk5_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_8_current_to_HPI").focus();
        }
    });

    $("#txtT11_7_Bk5_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 7);
    });

    $("#divT11_7_Bk_5").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item7a9", "Broker #5 Fees (Current)", 815, 510);
            }
        }
    });


    $("#txtT11_7_renewal_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_7_renewal_to_Broker").focus();
        }
    });

    $("#txtT11_7_renewal_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_7_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_7_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_7_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 7);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_7_renewal_to_HPI').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item7b1", "Den. Annual Maint. Fee to HPI (Renewal)", 790, 550);
            }
        }
    });

    $("#txtT11_7_renewal_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_7_renewal").focus();
        }
    });
    $("#txtT11_7_renewal_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_7_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_7_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_7_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 7);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_7_renewal_to_Broker').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item7b2", "Den. Annual Maint. Fee to HPI (Renewal)", 790, 685);
            }
        }
    });
    $('#divT11_7_renewal_Total').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item7b3", "Den. Annual Maint. Fee Total (Renewal)", 790, 775);
            }
        }
    });


    $("#ckT11_7_renewal").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_7_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_7_renewal").is(":checked")) {
                $("#txtT11_7_Bk1_renewal").focus();
            } else {
                $("#txtT11_8_renewal_to_HPI").focus();
            }
        }
    });

    $("#div_ckT11_7_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item7b4", "Split Broker Fees? (Renewal)", 815, 585);
            }
        }
    });


    $("#txtT11_7_Bk1_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_7_Bk2_renewal").focus();
        }
    });

    $("#txtT11_7_Bk1_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 7);
    });

    $("#divT11_7_Bk_1_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item7b5", "Broker #1 Fees (Renewal)", 815, 625);
            }
        }
    });

    $("#txtT11_7_Bk2_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_7_Bk3_renewal").focus();
        }
    });

    $("#txtT11_7_Bk2_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 7);
    });

    $("#divT11_7_Bk_2_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item7b6", "Broker #2 Fees (Renewal)", 815, 695);
            }
        }
    });

    $("#txtT11_7_Bk3_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_7_Bk4_renewal").focus();
        }
    });

    $("#txtT11_7_Bk3_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 7);
    });

    $("#divT11_7_Bk_3_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item7b7", "Broker #3 Fees (Renewal)", 815, 765);
            }
        }
    });

    $("#txtT11_7_Bk4_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_7_Bk5_renewal").focus();
        }
    });

    $("#txtT11_7_Bk4_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 7);
    });

    $("#divT11_7_Bk_4_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item7b8", "Broker #4 Fees (Renewal)", 815, 835);
            }
        }
    });

    $("#txtT11_7_Bk5_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_8_renewal_to_HPI").focus();
        }
    });

    $("#txtT11_7_Bk5_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 7);
    });

    $("#divT11_7_Bk_5_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item7b9", "Broker #5 Fees (Renewal)", 815, 905);
            }
        }
    });

    $("#txtT11_8_current_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_8_current_to_Broker").focus();
        }
    });
    $("#txtT11_8_current_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_8_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_8_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_8_current_Total");
        check_fee_amount(this, "Fees/Rates", 8);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_8_current_to_HPI').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item8a1", "Flex Annual Fee to HPI (Current)", 840, 250);
            }
        }
    });

    $("#txtT11_8_current_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_8_current").focus();
        }
    });
    $("#txtT11_8_current_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_8_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_8_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_8_current_Total");
        check_fee_amount(this, "Fees/Rates", 8);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_8_current_to_Broker').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item8a2", "Flex Annual Fee to Broker (Current)", 840, 385);
            }
        }
    });
    $("#divT11_8_current_Total").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item8a3", "Flex Annual Fee Total (Current)", 840, 475);
            }
        }
    });

    $("#ckT11_8_current").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_8_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_8_current").is(":checked")) {
                $("#txtT11_8_Bk1_current").focus();
            } else {
                $("#txtT11_9_current_to_HPI").focus();
            }
        }
    });

    $("#div_ckT11_8_current").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item8a4", "Split Broker Fees? (Current)", 865, 185);
            }
        }
    });

    $("#lblT11_8_split").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item8a4", "Split Broker Fees? (Current)", 865, 85);
            }
        }
    });

    $("#divT11_8").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item8a4", "Split Broker Fees? (Current)", 865, 185);
            }
        }
    });


    $("#txtT11_8_Bk1_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_8_Bk2_current").focus();
        }
    });

    $("#txtT11_8_Bk1_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 8);
    });

    $("#divT11_8_Bk_1").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item8a5", "Broker #1 Fees (Current)", 865, 230);
            }
        }
    });

    $("#txtT11_8_Bk2_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_8_Bk3_current").focus();
        }
    });

    $("#txtT11_8_Bk2_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 8);
    });

    $("#divT11_8_Bk_2").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item8a6", "Broker #2 Fees (Current)", 865, 300);
            }
        }
    });

    $("#txtT11_8_Bk3_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_8_Bk4_current").focus();
        }
    });

    $("#txtT11_8_Bk3_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 8);
    });

    $("#divT11_8_Bk_3").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item8a7", "Broker #3 Fees (Current)", 865, 370);
            }
        }
    });

    $("#txtT11_8_Bk4_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_8_Bk5_current").focus();
        }
    });

    $("#txtT11_8_Bk4_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 8);
    });

    $("#divT11_8_Bk_4").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item8a8", "Broker #4 Fees (Current)", 865, 440);
            }
        }
    });

    $("#txtT11_8_Bk5_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_9_current_to_HPI").focus();
        }
    });

    $("#txtT11_8_Bk5_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 8);
    });

    $("#divT11_8_Bk_5").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item8a9", "Broker #5 Fees (Current)", 865, 510);
            }
        }
    });

    $("#txtT11_8_renewal_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_8_renewal_to_Broker").focus();
        }
    });
    $("#txtT11_8_renewal_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_8_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_8_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_8_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 8);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_8_renewal_to_HPI').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item8b1", "Flex Annual Fee to HPI (Renewal)", 840, 550);
            }
        }
    });

    $("#txtT11_8_renewal_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_8_renewal").focus();
        }
    });
    $("#txtT11_8_renewal_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_8_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_8_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_8_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 8);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $("#divT11_8_renewal_to_Broker").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item8b2", "Flex Annual Fee to Broker (Renewal)", 840, 685);
            }
        }
    });
    $("#divT11_8_renewal_Total").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item8b3", "Flex Annual Fee Total (Renewal)", 840, 775);
            }
        }
    });

    $("#ckT11_8_renewal").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_8_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_8_renewal").is(":checked")) {
                $("#txtT11_8_Bk1_renewal").focus();
            } else {
                $("#txtT11_9_renewal_to_HPI").focus();
            }
        }
    });

    $("#div_ckT11_8_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item8b4", "Split Broker Fees? (Renewal)", 865, 585);
            }
        }
    });

    $("#txtT11_8_Bk1_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_8_Bk2_renewal").focus();
        }
    });

    $("#txtT11_8_Bk1_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 8);
    });

    $("#divT11_8_Bk_1_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item8b5", "Broker #1 Fees (Renewal)", 865, 625);
            }
        }
    });

    $("#txtT11_8_Bk2_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_8_Bk3_renewal").focus();
        }
    });

    $("#txtT11_8_Bk2_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 8);
    });

    $("#divT11_8_Bk_2_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item8b6", "Broker #2 Fees (Renewal)", 865, 695);
            }
        }
    });

    $("#txtT11_8_Bk3_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_8_Bk4_renewal").focus();
        }
    });

    $("#txtT11_8_Bk3_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 8);
    });

    $("#divT11_8_Bk_3_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item8b7", "Broker #3 Fees (Renewal)", 865, 765);
            }
        }
    });

    $("#txtT11_8_Bk4_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_8_Bk5_renewal").focus();
        }
    });

    $("#txtT11_8_Bk4_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 8);
    });

    $("#divT11_8_Bk_4_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item8b8", "Broker #4 Fees (Renewal)", 865, 835);
            }
        }
    });

    $("#txtT11_8_Bk5_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_9_renewal_to_HPI").focus();
        }
    });

    $("#txtT11_8_Bk5_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 8);
    });

    $("#divT11_8_Bk_5_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item8b9", "Broker #5 Fees (Renewal)", 865, 905);
            }
        }
    });

    $("#txtT11_9_current_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_9_current_to_Broker").focus();
        }
    });
    $("#txtT11_9_current_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_9_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_9_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_9_current_Total");
        check_fee_amount(this, "Fees/Rates", 9);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_9_current_to_HPI').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item9a1", "HRA Annual Fee to HPI (Current)", 890, 250);
            }
        }
    });

    $("#txtT11_9_current_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_9_current").focus();
        }
    });

    $("#txtT11_9_current_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_9_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_9_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_9_current_Total");
        check_fee_amount(this, "Fees/Rates", 9);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_9_current_to_Broker').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item9a2", "HRA Annual Fee to Broker (Current)", 890, 385);
            }
        }
    });
    $('#divT11_9_current_Total').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item9a3", "HRA Annual Fee Total (Current)", 890, 475);
            }
        }
    });


    $("#ckT11_9_current").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_9_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_9_current").is(":checked")) {
                $("#txtT11_9_Bk1_current").focus();
            } else {
                $("#txtT11_146_current_to_HPI").focus();
            }
        }
    });

    $("#div_ckT11_9_current").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item9a4", "Split Broker Fees? (Current)", 915, 185);
            }
        }
    });

    $("#lblT11_9_split").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item9a4", "Split Broker Fees? (Current)", 915, 185);
            }
        }
    });

    $("#divT11_9").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item9a4", "Split Broker Fees? (Current)", 915, 185);
            }
        }
    });


    $("#txtT11_9_Bk1_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_9_Bk2_current").focus();
        }
    });

    $("#txtT11_9_Bk1_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 9);
    });

    $("#divT11_9_Bk_1").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item9a5", "Broker #1 Fees (Current)", 915, 230);
            }
        }
    });

    $("#txtT11_9_Bk2_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_9_Bk3_current").focus();
        }
    });

    $("#txtT11_9_Bk2_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 9);
    });

    $("#divT11_9_Bk_2").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item9a6", "Broker #2 Fees (Current)", 915, 300);
            }
        }
    });

    $("#txtT11_9_Bk3_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_9_Bk4_current").focus();
        }
    });

    $("#txtT11_9_Bk3_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 9);
    });

    $("#divT11_9_Bk_3").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item9a7", "Broker #3 Fees (Current)", 915, 370);
            }
        }
    });

    $("#txtT11_9_Bk4_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_9_Bk5_current").focus();
        }
    });

    $("#txtT11_9_Bk4_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 9);
    });

    $("#divT11_9_Bk_4").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item9a8", "Broker #4 Fees (Current)", 915, 440);
            }
        }
    });

    $("#txtT11_9_Bk5_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_146_current_to_HPI").focus();
        }
    });

    $("#txtT11_9_Bk5_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 9);
    });

    $("#divT11_9_Bk_5").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item9a9", "Broker #5 Fees (Current)", 915, 510);
            }
        }
    });


    $("#txtT11_9_renewal_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_9_renewal_to_Broker").focus();
        }
    });

    $("#txtT11_9_renewal_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_9_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_9_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_9_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 9);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });

    $('#divT11_9_renewal_to_HPI').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item9b1", "HRA Annual Fee to HPI (Renewal)", 890, 550);
            }
        }
    });

    $("#txtT11_9_renewal_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_9_renewal").focus();
        }
    });
    $("#txtT11_9_renewal_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_9_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_9_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_9_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 9);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_9_renewal_to_Broker').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item9b2", "HRA Annual Fee to Broker (Renewal)", 890, 685);
            }
        }
    });
    $('#divT11_9_renewal_Total').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item9b3", "HRA Annual Fee Total (Renewal)", 890, 775);
            }
        }
    });

    $("#ckT11_9_renewal").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_9_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_9_renewal").is(":checked")) {
                $("#txtT11_9_Bk1_renewal").focus();
            } else {
                $("#txtT11_146_renewal_to_HPI").focus();
            }
        }
    });

    $("#div_ckT11_9_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item9b4", "Split Broker Fees? (Renewal)", 915, 585);
            }
        }
    });


    $("#txtT11_9_Bk1_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_9_Bk2_renewal").focus();
        }
    });

    $("#txtT11_9_Bk1_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 9);
    });

    $("#divT11_9_Bk_1_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item9b5", "Broker #1 Fees (Renewal)", 915, 625);
            }
        }
    });

    $("#txtT11_9_Bk2_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_9_Bk3_renewal").focus();
        }
    });

    $("#divT11_9_Bk_2_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item9b6", "Broker #2 Fees (Renewal)", 915, 695);
            }
        }
    });

    $("#txtT11_9_Bk2_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 9);
    });

    $("#txtT11_9_Bk3_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_9_Bk4_renewal").focus();
        }
    });

    $("#txtT11_9_Bk3_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 9);
    });

    $("#divT11_9_Bk_3_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item9b7", "Broker #3 Fees (Renewal)", 915, 765);
            }
        }
    });

    $("#txtT11_9_Bk4_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_9_Bk5_renewal").focus();
        }
    });

    $("#txtT11_9_Bk4_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 9);
    });

    $("#divT11_9_Bk_4_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item9b8", "Broker #4 Fees (Renewal)", 915, 835);
            }
        }
    });

    $("#txtT11_9_Bk5_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_146_renewal_to_HPI").focus();
        }
    });

    $("#txtT11_9_Bk5_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 9);
    });

    $("#divT11_9_Bk_5_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item9b9", "Broker #5 Fees (Renewal)", 915, 905);
            }
        }
    });


    $("#txtT11_PEPM_Note_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_10_current_to_HPI").focus();
        }
    });
    $('#divT11_PEPM_Note_current').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item152a", "PEPM Note (Current)", 1040, 210);
            }
        }
    });
    $("#txtT11_PEPM_Note_current").change(function () {
        set_dirty("hvrenewaldirty");
    });
    $("#txtT11_PEPM_Note_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_10_renewal_to_HPI").focus();
        }
    });
    $('#divT11_PEPM_Note_renewal').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item152b", "PEPM Note (Renewal)", 1040, 585);
            }
        }
    });
    $("#txtT11_PEPM_Note_renewal").change(function () {
        set_dirty("hvrenewaldirty");
    });

    $("#txtT11_10_current_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_10_current_to_Broker").focus();
        }
    });

    $("#txtT11_10_current_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_10_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_10_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_10_current_Total");
        check_fee_amount(this, "Fees/Rates", 11);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_10_current_to_HPI').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item10a1", "Med./Rx Admin. Fee to HPI (Current)", 1065, 250);
            }
        }
    });

    $("#txtT11_10_current_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_10_current").focus();
        }
    });
    $("#txtT11_10_current_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_10_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_10_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_10_current_Total");
        check_fee_amount(this, "Fees/Rates", 11);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_10_current_to_Broker').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item10a2", "Med./Rx Admin. Fee to Broker (Current)", 1065, 385);
            }
        }
    });
    $('#divT11_10_current_Total').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item10a3", "Med./Rx Admin. Fee Total (Current)", 1065, 475);
            }
        }
    });


    $("#ckT11_10_current").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_10_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_10_current").is(":checked")) {
                $("#txtT11_10_Bk1_current").focus();
            } else {
                $("#txtT11_11_current_to_HPI").focus();
            }
        }
    });

    $("#div_ckT11_10_current").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item10a4", "Split Broker Fees? (Current)", 1090, 185);
            }
        }
    });

    $("#lblT11_10_split").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item10a4", "Split Broker Fees? (Current)", 1090, 185);
            }
        }
    });

    $("#divT11_10").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item10a4", "Split Broker Fees? (Current)", 1090, 185);
            }
        }
    });


    $("#txtT11_10_Bk1_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_10_Bk2_current").focus();
        }
    });

    $("#txtT11_10_Bk1_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 11);
    });

    $("#divT11_10_Bk_1").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item10a5", "Broker #1 Fees (Current)", 1090, 230);
            }
        }
    });

    $("#txtT11_10_Bk2_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_10_Bk3_current").focus();
        }
    });

    $("#txtT11_10_Bk2_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 11);
    });

    $("#divT11_10_Bk_2").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item10a6", "Broker #2 Fees (Current)", 1090, 300);
            }
        }
    });

    $("#txtT11_10_Bk3_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_10_Bk4_current").focus();
        }
    });

    $("#txtT11_10_Bk3_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 11);
    });

    $("#divT11_10_Bk_3").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item10a7", "Broker #3 Fees (Current)", 1090, 370);
            }
        }
    });

    $("#txtT11_10_Bk4_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_10_Bk5_current").focus();
        }
    });

    $("#txtT11_10_Bk4_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 11);
    });

    $("#divT11_10_Bk_4").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item10a8", "Broker #4 Fees (Current)", 1090, 440);
            }
        }
    });

    $("#txtT11_10_Bk5_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_11_current_to_HPI").focus();
        }
    });

    $("#txtT11_10_Bk5_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 11);
    });

    $("#divT11_10_Bk_5").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item10a9", "Broker #5 Fees (Current)", 1090, 510);
            }
        }
    });


    $("#txtT11_10_renewal_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_10_renewal_to_Broker").focus();
        }
    });

    $("#txtT11_10_renewal_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_10_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_10_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_10_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 11);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_10_renewal_to_HPI').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item10b1", "Med./Rx Admin. Fee to HPI (Renewal)", 1065, 550);
            }
        }
    });

    $("#txtT11_10_renewal_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_10_renewal").focus();
        }
    });
    $("#txtT11_10_renewal_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_10_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_10_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_10_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 11);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_10_renewal_to_Broker').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item10b2", "Med./Rx Admin. Fee to Broker (Renewal)", 1065, 685);
            }
        }
    });
    $('#divT11_10_renewal_Total').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item10b3", "Med./Rx Admin. Fee Total (Renewal)", 1065, 775);
            }
        }
    });


    $("#ckT11_10_renewal").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_10_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_10_renewal").is(":checked")) {
                $("#txtT11_10_Bk1_renewal").focus();
            } else {
                $("#txtT11_11_renewal_to_HPI").focus();
            }
        }
    });

    $("#div_ckT11_10_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item10b4", "Split Broker Fees? (Renewal)", 1090, 585);
            }
        }
    });


    $("#txtT11_10_Bk1_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_10_Bk2_renewal").focus();
        }
    });

    $("#txtT11_10_Bk1_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 11);
    });

    $("#divT11_10_Bk_1_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item10b5", "Broker #1 Fees (Renewal)", 1090, 625);
            }
        }
    });

    $("#txtT11_10_Bk2_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_10_Bk3_renewal").focus();
        }
    });

    $("#txtT11_10_Bk2_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 11);
    });

    $("#divT11_10_Bk_2_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item10b6", "Broker #2 Fees (Renewal)", 1090, 695);
            }
        }
    });

    $("#txtT11_10_Bk3_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_10_Bk4_renewal").focus();
        }
    });

    $("#txtT11_10_Bk3_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 11);
    });

    $("#divT11_10_Bk_3_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item10b7", "Broker #3 Fees (Renewal)", 1090, 765);
            }
        }
    });

    $("#txtT11_10_Bk4_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_10_Bk5_renewal").focus();
        }
    });

    $("#txtT11_10_Bk4_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 11);
    });

    $("#divT11_10_Bk_4_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item10b8", "Broker #4 Fees (Renewal)", 1090, 835);
            }
        }
    });

    $("#txtT11_10_Bk5_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_11_renewal_to_HPI").focus();
        }
    });

    $("#txtT11_10_Bk5_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 11);
    });

    $("#divT11_10_Bk_5_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item10b9", "Broker #5 Fees (Renewal)", 1090, 905);
            }
        }
    });

    $("#txtT11_11_current_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_11_current_to_Broker").focus();
        }
    });

    $("#txtT11_11_current_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_11_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_11_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_11_current_Total");
        check_fee_amount(this, "Fees/Rates", 12);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });

    $('#divT11_11_current_to_HPI').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item11a1", "Vision Fee to HPI (Current)", 1115, 250);
            }
        }
    });

    $("#txtT11_11_current_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_11_current").focus();
        }
    });

    $("#txtT11_11_current_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_11_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_11_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_11_current_Total");
        check_fee_amount(this, "Fees/Rates", 12);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_11_current_to_Broker').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item11a2", "Vision Fee to Broker (Current)", 1115, 385);
            }
        }
    });

    $('#divT11_11_current_Total').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item11a3", "Vision Fee to HPI (Current)", 1115, 475);
            }
        }
    });


    $("#ckT11_11_current").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_11_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_11_current").is(":checked")) {
                $("#txtT11_11_Bk1_current").focus();
            } else {
                $("#txtT11_12_current_to_HPI").focus();
            }
        }
    });

    $("#div_ckT11_11_current").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item11a4", "Split Broker Fees? (Current)", 1140, 185);
            }
        }
    });

    $("#lblT11_11_split").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item11a4", "Split Broker Fees? (Current)", 1140, 185);
            }
        }
    });

    $("#divT11_11").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item11a4", "Split Broker Fees? (Current)", 1140, 185);
            }
        }
    });

    $("#txtT11_11_Bk1_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_11_Bk2_current").focus();
        }
    });

    $("#txtT11_11_Bk1_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 12);
    });

    $("#divT11_11_Bk_1").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item11a5", "Broker #1 Fees (Current)", 1140, 230);
            }
        }
    });

    $("#txtT11_11_Bk2_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_11_Bk3_current").focus();
        }
    });

    $("#txtT11_11_Bk2_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 12);
    });

    $("#divT11_11_Bk_2").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item11a6", "Broker #2 Fees (Current)", 1140, 300);
            }
        }
    });

    $("#txtT11_11_Bk3_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_11_Bk4_current").focus();
        }
    });

    $("#txtT11_11_Bk3_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 12);
    });

    $("#divT11_11_Bk_3").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item11a7", "Broker #3 Fees (Current)", 1140, 370);
            }
        }
    });

    $("#txtT11_11_Bk4_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_11_Bk5_current").focus();
        }
    });

    $("#txtT11_11_Bk4_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 12);
    });

    $("#divT11_11_Bk_4").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item11a8", "Broker #4 Fees (Current)", 1140, 440);
            }
        }
    });

    $("#txtT11_11_Bk5_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_12_current_to_HPI").focus();
        }
    });

    $("#txtT11_11_Bk5_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 12);
    });

    $("#divT11_11_Bk_5").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item11a9", "Broker #5 Fees (Current)", 1140, 510);
            }
        }
    });


    $("#txtT11_11_renewal_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_11_renewal_to_Broker").focus();
        }
    });

    $("#txtT11_11_renewal_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_11_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_11_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_11_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 12);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_11_renewal_to_HPI').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item11b1", "Vision Fee to HPI (Renewal)", 1115, 550);
            }
        }
    });

    $("#txtT11_11_renewal_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_11_renewal").focus();
        }
    });
    $("#txtT11_11_renewal_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_11_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_11_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_11_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 12);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_11_renewal_to_Broker').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item11b2", "Vision Fee to Broker (Renewal)", 1115, 685);
            }
        }
    });

    $('#divT11_11_renewal_Total').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item11b3", "Vision Fee Total (Renewal)", 1115, 775);
            }
        }
    });

    $("#ckT11_11_renewal").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_11_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_11_renewal").is(":checked")) {
                $("#txtT11_11_Bk1_renewal").focus();
            } else {
                $("#txtT11_12_renewal_to_HPI").focus();
            }
        }
    });

    $("#div_ckT11_11_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item11b4", "Split Broker Fees? (Renewal)", 1140, 585);
            }
        }
    });


    $("#txtT11_11_Bk1_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_11_Bk2_renewal").focus();
        }
    });

    $("#txtT11_11_Bk1_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 12);
    });

    $("#divT11_11_Bk_1_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item11b5", "Broker #1 Fees (Renewal)", 1140, 625);
            }
        }
    });

    $("#txtT11_11_Bk2_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_11_Bk3_renewal").focus();
        }
    });

    $("#txtT11_11_Bk2_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 12);
    });

    $("#divT11_11_Bk_2_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item11b6", "Broker #2 Fees (Renewal)", 1140, 695);
            }
        }
    });

    $("#txtT11_11_Bk3_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_11_Bk4_renewal").focus();
        }
    });

    $("#txtT11_11_Bk3_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 12);
    });

    $("#divT11_11_Bk_3_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item11b7", "Broker #3 Fees (Renewal)", 1140, 765);
            }
        }
    });

    $("#txtT11_11_Bk4_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_11_Bk5_renewal").focus();
        }
    });

    $("#txtT11_11_Bk4_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 12);
    });

    $("#divT11_11_Bk_4_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item11b8", "Broker #4 Fees (Renewal)", 1140, 835);
            }
        }
    });

    $("#txtT11_11_Bk5_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_12_renewal_to_HPI").focus();
        }
    });

    $("#txtT11_11_Bk5_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 12);
    });

    $("#divT11_11_Bk_5_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item11b9", "Broker #5 Fees (Renewal)", 1140, 905);
            }
        }
    });


    $("#txtT11_12_current_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_12_current_to_Broker").focus();
        }
    });

    $("#txtT11_12_current_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_12_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_12_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_12_current_Total");
        check_fee_amount(this, "Fees/Rates", 13);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_12_current_to_HPI').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item12a1", "Dental Admin. Fee to HPI (Current)", 1165, 250);
            }
        }
    });

    $("#txtT11_12_current_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_12_current").focus();
        }
    });
    $("#txtT11_12_current_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_12_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_12_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_12_current_Total");
        check_fee_amount(this, "Fees/Rates", 13);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_12_current_to_Broker').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item12a2", "Dental Admin. Fee to Broker (Current)", 1165, 385);
            }
        }
    });
    $('#divT11_12_current_Total').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item12a3", "Dental Admin. Fee Total (Current)", 1165, 475);
            }
        }
    });


    $("#ckT11_12_current").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_12_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_12_current").is(":checked")) {
                $("#txtT11_12_Bk1_current").focus();
            } else {
                $("#txtT11_13_current_to_HPI").focus();
            }
        }
    });

    $("#div_ckT11_12_current").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item12a4", "Split Broker Fees? (Current)", 1190, 185);
            }
        }
    });

    $("#lblT11_12_split").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item12a4", "Split Broker Fees? (Current)", 1190, 185);
            }
        }
    });

    $("#divT11_12").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item12a4", "Split Broker Fees? (Current)", 1190, 185);
            }
        }
    });


    $("#txtT11_12_Bk1_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_12_Bk2_current").focus();
        }
    });

    $("#txtT11_12_Bk1_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 13);
    });

    $("#divT11_12_Bk_1").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item12a5", "Broker #1 Fees (Current)", 1190, 230);
            }
        }
    });

    $("#txtT11_12_Bk2_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_12_Bk3_current").focus();
        }
    });

    $("#txtT11_12_Bk2_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 13);
    });

    $("#divT11_12_Bk_2").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item12a6", "Broker #2 Fees (Current)", 1190, 300);
            }
        }
    });

    $("#txtT11_12_Bk3_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_12_Bk4_current").focus();
        }
    });

    $("#txtT11_12_Bk3_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 13);
    });

    $("#divT11_12_Bk_3").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item12a7", "Broker #3 Fees (Current)", 1190, 370);
            }
        }
    });

    $("#txtT11_12_Bk4_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_12_Bk5_current").focus();
        }
    });

    $("#txtT11_12_Bk4_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 13);
    });

    $("#divT11_12_Bk_4").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item12a8", "Broker #4 Fees (Current)", 1190, 440);
            }
        }
    });

    $("#txtT11_12_Bk5_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_13_current_to_HPI").focus();
        }
    });

    $("#txtT11_12_Bk5_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 13);
    });

    $("#divT11_12_Bk_5").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item12a9", "Broker #5 Fees (Current)", 1190, 510);
            }
        }
    });


    $("#txtT11_12_renewal_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_12_renewal_to_Broker").focus();
        }
    });
    $("#txtT11_12_renewal_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_12_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_12_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_12_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 13);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_12_renewal_to_HPI').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item12b1", "Dental Admin. Fee To HPI (Renewal)", 1165, 550);
            }
        }
    });

    $("#txtT11_12_renewal_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_12_renewal").focus();
        }
    });
    $("#txtT11_12_renewal_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_12_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_12_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_12_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 13);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_12_renewal_to_Broker').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item12b2", "Dental Admin. Fee To Broker (Renewal)", 1165, 685);
            }
        }
    });
    $('#divT11_12_renewal_Total').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item12b3", "Dental Admin. Fee Total (Renewal)", 1165, 775);
            }
        }
    });


    $("#ckT11_12_renewal").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_12_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_12_renewal").is(":checked")) {
                $("#txtT11_12_Bk1_renewal").focus();
            } else {
                $("#txtT11_13_renewal_to_HPI").focus();
            }
        }
    });

    $("#div_ckT11_12_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item12b4", "Split Broker Fees? (Renewal)", 1190, 585);
            }
        }
    });


    $("#txtT11_12_Bk1_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_12_Bk2_renewal").focus();
        }
    });

    $("#txtT11_12_Bk1_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 13);
    });

    $("#divT11_12_Bk_1_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item12b5", "Broker #1 Fees (Renewal)", 1190, 625);
            }
        }
    });

    $("#txtT11_12_Bk2_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_12_Bk3_renewal").focus();
        }
    });

    $("#txtT11_12_Bk2_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 13);
    });

    $("#divT11_12_Bk_2_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item12b6", "Broker #2 Fees (Renewal)", 1190, 695);
            }
        }
    });

    $("#txtT11_12_Bk3_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_12_Bk4_renewal").focus();
        }
    });

    $("#txtT11_12_Bk3_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 13);
    });

    $("#divT11_12_Bk_3_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item12b7", "Broker #3 Fees (Renewal)", 1190, 765);
            }
        }
    });

    $("#txtT11_12_Bk4_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_12_Bk5_renewal").focus();
        }
    });

    $("#txtT11_12_Bk4_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 13);
    });

    $("#divT11_12_Bk_4_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item12b8", "Broker #4 Fees (Renewal)", 1190, 835);
            }
        }
    });

    $("#txtT11_12_Bk5_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_13_renewal_to_HPI").focus();
        }
    });

    $("#txtT11_12_Bk5_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 13);
    });

    $("#divT11_12_Bk_5_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item12b9", "Broker #5 Fees (Renewal)", 1190, 905);
            }
        }
    });

    $("#txtT11_13_current_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_13_current_to_Broker").focus();
        }
    });
    $("#txtT11_13_current_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_13_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_13_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_13_current_Total");
        check_fee_amount(this, "Fees/Rates", 14);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_13_current_to_HPI').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item13a1", "COBRA Fee To HPI (Current)", 1215, 250);
            }
        }
    });

    $("#txtT11_13_current_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_13_current").focus();
        }
    });
    $("#txtT11_13_current_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_13_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_13_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_13_current_Total");
        check_fee_amount(this, "Fees/Rates", 14);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_13_current_to_Broker').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item13a2", "COBRA Fee To Broker (Current)", 1215, 385);
            }
        }
    });
    $('#divT11_13_current_Total').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item13a3", "COBRA Fee Total (Current)", 1215, 475);
            }
        }
    });


    $("#ckT11_13_current").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_13_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_13_current").is(":checked")) {
                $("#txtT11_13_Bk1_current").focus();
            } else {
                $("#ckT11_13_other_current").focus();
            }
        }
    });

    $("#div_ckT11_13_current").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item13a4", "Split Broker Fees? (Current)", 1240, 185);
            }
        }
    });

    $("#lblT11_13_split").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item13a4", "Split Broker Fees? (Current)", 1240, 185);
            }
        }
    });

    $("#divT11_13").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item13a4", "Split Broker Fees? (Current)", 1240, 185);
            }
        }
    });


    $("#txtT11_13_Bk1_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_13_Bk2_current").focus();
        }
    });

    $("#txtT11_13_Bk1_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 14);
    });

    $("#divT11_13_Bk_1").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item13a5", "Broker #1 Fees (Current)", 1240, 230);
            }
        }
    });

    $("#txtT11_13_Bk2_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_13_Bk3_current").focus();
        }
    });

    $("#txtT11_13_Bk2_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 14);
    });

    $("#divT11_13_Bk_2").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item13a6", "Broker #2 Fees (Current)", 1240, 300);
            }
        }
    });

    $("#txtT11_13_Bk3_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_13_Bk4_current").focus();
        }
    });

    $("#txtT11_13_Bk3_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 14);
    });

    $("#divT11_13_Bk_3").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item13a7", "Broker #3 Fees (Current)", 1240, 370);
            }
        }
    });

    $("#txtT11_13_Bk4_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_13_Bk5_current").focus();
        }
    });

    $("#txtT11_13_Bk4_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 14);
    });

    $("#divT11_13_Bk_4").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item13a8", "Broker #4 Fees (Current)", 1240, 440);
            }
        }
    });

    $("#txtT11_13_Bk5_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_14_current_to_HPI").focus();
        }
    });

    $("#txtT11_13_Bk5_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 14);
    });

    $("#divT11_13_Bk_5").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item13a9", "Broker #5 Fees (Current)", 1240, 510);
            }
        }
    });


    $("#txtT11_13_renewal_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_13_renewal_to_Broker").focus();
        }
    });
    $("#txtT11_13_renewal_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_13_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_13_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_13_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 14);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_13_renewal_to_HPI').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item13b1", "COBRA Fee To HPI (Renewal)", 1215, 550);
            }
        }
    });

    $("#txtT11_13_renewal_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_13_renewal").focus();
        }
    });
    $("#txtT11_13_renewal_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_13_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_13_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_13_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 14);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_13_renewal_to_Broker').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item13b2", "COBRA Fee To Broker (Renewal)", 1215, 685);
            }
        }
    });
    $('#divT11_13_renewal_Total').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item13b3", "COBRA Fee Total (Renewal)", 1215, 775);
            }
        }
    });


    $("#ckT11_13_renewal").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_13_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_13_renewal").is(":checked")) {
                $("#txtT11_13_Bk1_renewal").focus();
            } else {
                $("#ckT11_13_other_renewal").focus();
            }
        }
    });

    $("#div_ckT11_13_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item13b4", "Split Broker Fees? (Renewal)", 1240, 585);
            }
        }
    });


    $("#txtT11_13_Bk1_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_13_Bk2_renewal").focus();
        }
    });

    $("#txtT11_13_Bk1_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 14);
    });

    $("#divT11_13_Bk_1_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item13b5", "Broker #1 Fees (Renewal)", 1240, 625);
            }
        }
    });

    $("#txtT11_13_Bk2_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_13_Bk3_renewal").focus();
        }
    });

    $("#txtT11_13_Bk2_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 14);
    });

    $("#divT11_13_Bk_2_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item13b6", "Broker #2 Fees (Renewal)", 1240, 695);
            }
        }
    });


    $("#txtT11_13_Bk3_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_13_Bk4_renewal").focus();
        }
    });

    $("#txtT11_13_Bk3_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 14);
    });

    $("#divT11_13_Bk_3_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item13b7", "Broker #3 Fees (Renewal)", 1240, 765);
            }
        }
    });

    $("#txtT11_13_Bk4_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_13_Bk5_renewal").focus();
        }
    });

    $("#txtT11_13_Bk4_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 14);
    });

    $("#divT11_13_Bk_4_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item13b8", "Broker #4 Fees (Renewal)", 1240, 835);
            }
        }
    });

    $("#txtT11_13_Bk5_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_14_renewal_to_HPI").focus();
        }
    });

    $("#txtT11_13_Bk5_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 14);
    });

    $("#divT11_13_Bk_5_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item13b9", "Broker #5 Fees (Renewal)", 1240, 905);
            }
        }
    });

    $("#ckT11_13_other_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_13_other_current").is(":checked")) {
                $("#txtT11_13_other_current").focus();
            } else {
                $("#txtT11_14_current_to_HPI").focus();
            }
        }
    });

    $("#ckT11_13_other_current").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });

    $('#lblT11_13_Other').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item13a11", "COBRA Fee Other (Current)", 1265, 250);
            }
        }
    });

    $('#divT11_13_ck_other_current').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item13a10", "COBRA Fee Other? (Current)", 1265, 185);
            }
        }
    });

    $("#ckT11_13_other_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_13_other_renewal").is(":checked")) {
                $("#txtT11_13_other_renewal").focus();
            } else {
                $("#txtT11_14_renewal_to_HPI").focus();
            }
        }
    });
    $('#divT11_13_ck_other_renewal').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item13b10", "COBRA Fee Other? (Renewal)", 1265, 585);
            }
        }
    });
    $("#ckT11_13_other_renewal").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });

    $("#txtT11_13_other_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_14_current_to_HPI").focus();
        }
    });

    $("#txtT11_13_other_current").blur(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $('#divT11_13_other_current').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item13a11", "COBRA Fee Other (Current)", 1265, 250);
            }
        }
    });

    $("#txtT11_13_other_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_14_renewal_to_HPI").focus();
        }
    });

    $("#txtT11_13_other_renewal").blur(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });

    $('#divT11_13_other_renewal').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item13b11", "COBRA Fee Other (Renewal)", 1265, 610);
            }
        }
    });

    $("#txtT11_14_current_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_14_current_to_Broker").focus();
        }
    });

    $("#txtT11_14_current_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_14_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_14_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_14_current_Total");
        check_fee_amount(this, "Fees/Rates", 15);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_14_current_to_HPI').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item14a1", "HIPAA Fee To HPI (Current)", 1290, 250);
            }
        }
    });

    $("#txtT11_14_current_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_14_current").focus();
        }
    });

    $("#txtT11_14_current_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_14_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_14_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_14_current_Total");
        check_fee_amount(this, "Fees/Rates", 15);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_14_current_to_Broker').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item14a2", "HIPAA Fee To Broker (Current)", 1290, 385);
            }
        }
    });
    $('#divT11_14_current_Total').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item14a3", "HIPAA Fee Total (Current)", 1290, 475);
            }
        }
    });


    $("#ckT11_14_current").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_14_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_14_current").is(":checked")) {
                $("#txtT11_14_Bk1_current").focus();
            } else {
                $("#ckT11_14_other_current").focus();
            }
        }
    });

    $("#div_ckT11_14_current").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item14a4", "Split Broker Fees? (Current)", 1315, 185);
            }
        }
    });

    $("#lblT11_14_split").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item14a4", "Split Broker Fees? (Current)", 1315, 185);
            }
        }
    });

    $("#divT11_14").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item14a4", "Split Broker Fees? (Current)", 1315, 185);
            }
        }
    });


    $("#txtT11_14_Bk1_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_14_Bk2_current").focus();
        }
    });

    $("#txtT11_14_Bk1_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 15);
    });

    $("#divT11_14_Bk_1").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item14a5", "Broker #1 Fees (Current)", 1315, 230);
            }
        }
    });

    $("#txtT11_14_Bk2_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_14_Bk3_current").focus();
        }
    });

    $("#txtT11_14_Bk2_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 15);
    });

    $("#divT11_14_Bk_2").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item14a6", "Broker #2 Fees (Current)", 1315, 300);
            }
        }
    });

    $("#txtT11_14_Bk3_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_14_Bk4_current").focus();
        }
    });

    $("#txtT11_14_Bk3_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 15);
    });

    $("#divT11_14_Bk_3").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item14a7", "Broker #3 Fees (Current)", 1315, 370);
            }
        }
    });

    $("#txtT11_14_Bk4_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_14_Bk5_current").focus();
        }
    });

    $("#txtT11_14_Bk4_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 15);
    });

    $("#divT11_14_Bk_4").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item14a8", "Broker #4 Fees (Current)", 1315, 440);
            }
        }
    });

    $("#txtT11_14_Bk5_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_15_current_to_HPI").focus();
        }
    });

    $("#txtT11_14_Bk5_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 15);
    });

    $("#divT11_14_Bk_5").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item14a9", "Broker #5 Fees (Current)", 1315, 510);
            }
        }
    });


    $("#txtT11_14_renewal_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_14_renewal_to_Broker").focus();
        }
    });
    $("#txtT11_14_renewal_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_14_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_14_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_14_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 15);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_14_renewal_to_HPI').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item14b1", "HIPAA Fee To HPI (Renewal)", 1290, 550);
            }
        }
    });

    $("#txtT11_14_renewal_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_14_renewal").focus();
        }
    });
    $("#txtT11_14_renewal_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_14_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_14_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_14_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 15);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $('#divT11_14_renewal_to_Broker').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item14b2", "HIPAA Fee To Broker (Renewal)", 1290, 685);
            }
        }
    });
    $('#divT11_14_renewal_Total').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item14b3", "HIPAA Fee Total (Renewal)", 1290, 775);
            }
        }
    });


    $("#ckT11_14_renewal").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_14_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_14_renewal").is(":checked")) {
                $("#txtT11_14_Bk1_renewal").focus();
            } else {
                $("#ckT11_14_other_renewal").focus();
            }
        }
    });

    $("#div_ckT11_14_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item14b4", "Split Broker Fees? (Renewal)", 1315, 585);
            }
        }
    });


    $("#txtT11_14_Bk1_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_14_Bk2_renewal").focus();
        }
    });

    $("#txtT11_14_Bk1_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 15);
    });

    $("#divT11_14_Bk_1_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item14b5", "Broker #1 Fees (Renewal)", 1315, 625);
            }
        }
    });

    $("#txtT11_14_Bk2_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_14_Bk3_renewal").focus();
        }
    });

    $("#txtT11_14_Bk2_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 15);
    });

    $("#divT11_14_Bk_2_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item14b6", "Broker #2 Fees (Renewal)", 1315, 695);
            }
        }
    });

    $("#txtT11_14_Bk3_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_14_Bk4_renewal").focus();
        }
    });

    $("#txtT11_14_Bk3_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 15);
    });

    $("#divT11_14_Bk_3_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item14b7", "Broker #3 Fees (Renewal)", 1315, 765);
            }
        }
    });

    $("#txtT11_14_Bk4_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_14_Bk5_renewal").focus();
        }
    });

    $("#txtT11_14_Bk4_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 15);
    });

    $("#divT11_14_Bk_4_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item14b8", "Broker #4 Fees (Renewal)", 1315, 835);
            }
        }
    });

    $("#txtT11_14_Bk5_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_15_renewal_to_HPI").focus();
        }
    });

    $("#txtT11_14_Bk5_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 15);
    });

    $("#divT11_14_Bk_5_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item14b9", "Broker #5 Fees (Renewal)", 1315, 905);
            }
        }
    });

    $("#ckT11_14_other_current").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });

    $("#ckT11_14_other_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_14_other_current").is(":checked")) {
                $("#txtT11_14_other_current").focus();
            } else {
                $("#txtT11_15_current_to_HPI").focus();
            }
        }
    });

    $('#divT11_14_ck_other_current').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item14a10", "HIPAA Fee Other? (Current)", 1340, 185);
            }
        }
    });

    $('#lblT11_14_Other').mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item14a11", "HIPAA Fee Other (Current)", 1340, 250);
            }
        }
    });



    $("#txtT11_14_other_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_15_current_to_HPI").focus();
        }
    });
    $("#divT11_14_other_current").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item14a11", "HIPAA Fee Other (Current)", 1340, 250);
            }
        }
    });

    $("#txtT11_14_other_current").blur(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });

    $("#ckT11_14_other_renewal").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });
    $("#ckT11_14_other_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_14_other_renewal").is(":checked")) {
                $("#txtT11_14_other_renewal").focus();
            } else {
                $("#txtT11_15_renewal_to_HPI").focus();
            }
        }
    });
    $("#divT11_14_ck_other_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item14b10", "HIPAA Fee Other? (Renewal)", 1340, 585);
            }
        }
    });

    $("#txtT11_14_other_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_15_renewal_to_HPI").focus();
        }
    });

    $("#txtT11_14_other_renewal").blur(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });

    $("#divT11_14_other_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item14b11", "HIPAA Fee Other (Renewal)", 1340, 610);
            }
        }
    });

    $("#txtT11_15_current_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_15_current_to_Broker").focus();
        }
    });
    $("#txtT11_15_current_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_15_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_15_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_15_current_Total");
        check_fee_amount(this, "Fees/Rates", 16);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $("#divT11_15_current_to_HPI").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item15a1", "STD Admin. Fee To HPI (Current)", 1365, 250);
            }
        }
    });

    $("#txtT11_15_current_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_15_current").focus();
        }
    });
    $("#txtT11_15_current_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_15_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_15_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_15_current_Total");
        check_fee_amount(this, "Fees/Rates", 16);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $("#divT11_15_current_to_Broker").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item15a2", "STD Admin. Fee To Broker (Current)", 1365, 385);
            }
        }
    });
    $("#divT11_15_current_Total").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item15a3", "STD Admin. Fee Total (Current)", 1365, 475);
            }
        }
    });


    $("#ckT11_15_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_15_current").is(":checked")) {
                $("#txtT11_15_Bk1_current").focus();
            } else {
                $("#txtT11_16_current_to_HPI").focus();
            }
        }
    });

    $("#ckT11_15_current").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });

    $("#div_ckT11_15_current").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item15a4", "Split Broker Fees? (Current)", 1390, 185);
            }
        }
    });

    $("#lblT11_15_split").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item15a4", "Split Broker Fees? (Current)", 1390, 185);
            }
        }
    });

    $("#divT11_15").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item15a4", "Split Broker Fees? (Current)", 1390, 185);
            }
        }
    });


    $("#txtT11_15_Bk1_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_15_Bk2_current").focus();
        }
    });

    $("#txtT11_15_Bk1_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 16);
    });

    $("#divT11_15_Bk_1").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item15a5", "Broker #1 Fees (Current)", 1390, 230);
            }
        }
    });

    $("#txtT11_15_Bk2_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_15_Bk3_current").focus();
        }
    });

    $("#txtT11_15_Bk2_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 16);
    });

    $("#divT11_15_Bk_2").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item15a6", "Broker #2 Fees (Current)", 1390, 300);
            }
        }
    });

    $("#txtT11_15_Bk3_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_15_Bk4_current").focus();
        }
    });

    $("#txtT11_15_Bk3_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 16);
    });

    $("#divT11_15_Bk_3").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item15a7", "Broker #3 Fees (Current)", 1390, 370);
            }
        }
    });

    $("#txtT11_15_Bk4_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_15_Bk5_current").focus();
        }
    });

    $("#txtT11_15_Bk4_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 16);
    });

    $("#divT11_15_Bk_4").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item15a8", "Broker #4 Fees (Current)", 1390, 440);
            }
        }
    });

    $("#txtT11_15_Bk5_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_16_current_to_HPI").focus();
        }
    });

    $("#txtT11_15_Bk5_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 16);
    });

    $("#divT11_15_Bk_5").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item15a9", "Broker #5 Fees (Current)", 1390, 510);
            }
        }
    });

    $("#txtT11_15_current_Total").mouseout(function () {
        hide_popup_tab11();
    });
    $("#txtT11_15_renewal_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_15_renewal_to_Broker").focus();
        }
    });
    $("#txtT11_15_renewal_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_15_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_15_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_15_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 16);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $("#divT11_15_renewal_to_HPI").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item15b1", "STD Admin. Fee To HPI (Renewal)", 1365, 550);
            }
        }
    });

    $("#txtT11_15_renewal_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_15_renewal").focus();
        }
    });
    $("#txtT11_15_renewal_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_15_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_15_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_15_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 16);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $("#divT11_15_renewal_to_Broker").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item15b2", "STD Admin. Fee To Broker (Renewal)", 1365, 685);
            }
        }
    });
    $("#divT11_15_renewal_Total").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item15b3", "STD Admin. Fee Total (Renewal)", 1365, 775);
            }
        }
    });

    $("#ckT11_15_renewal").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_15_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_15_renewal").is(":checked")) {
                $("#txtT11_15_Bk1_renewal").focus();
            } else {
                $("#txtT11_16_renewal_to_HPI").focus();
            }
        }
    });

    $("#div_ckT11_15_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item15b4", "Split Broker Fees? (Renewal)", 1390, 585);
            }
        }
    });


    $("#txtT11_15_Bk1_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_15_Bk2_renewal").focus();
        }
    });

    $("#txtT11_15_Bk1_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 16);
    });

    $("#divT11_15_Bk_1_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item15b5", "Broker #1 Fees (Renewal)", 1390, 625);
            }
        }
    });

    $("#txtT11_15_Bk2_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_15_Bk3_renewal").focus();
        }
    });

    $("#txtT11_15_Bk2_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 16);
    });

    $("#divT11_15_Bk_2_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item15b6", "Broker #2 Fees (Renewal)", 1390, 695);
            }
        }
    });

    $("#txtT11_15_Bk3_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_15_Bk4_renewal").focus();
        }
    });

    $("#txtT11_15_Bk3_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 16);
    });

    $("#divT11_15_Bk_3_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item15b7", "Broker #3 Fees (Renewal)", 1390, 765);
            }
        }
    });

    $("#txtT11_15_Bk4_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_15_Bk5_renewal").focus();
        }
    });

    $("#txtT11_15_Bk4_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 16);
    });

    $("#divT11_15_Bk_4_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item15b8", "Broker #4 Fees (Renewal)", 1390, 835);
            }
        }
    });

    $("#txtT11_15_Bk5_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_16_renewal_to_HPI").focus();
        }
    });

    $("#txtT11_15_Bk5_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 16);
    });

    $("#divT11_15_Bk_5_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item15b9", "Broker #5 Fees (Renewal)", 1390, 905);
            }
        }
    });

    $("#txtT11_16_current_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_16_current_to_Broker").focus();
        }
    });
    $("#txtT11_16_current_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_16_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_16_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_16_current_Total");
        check_fee_amount(this, "Fees/Rates", 17);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $("#divT11_16_current_to_HPI").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item16a1", "LTD Admin. Fee To HPI (Current)", 1415, 250);
            }
        }
    });

    $("#txtT11_16_current_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_16_current").focus();
        }
    });
    $("#txtT11_16_current_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_16_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_16_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_16_current_Total");
        check_fee_amount(this, "Fees/Rates", 17);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $("#divT11_16_current_to_Broker").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item16a2", "LTD Admin. Fee To Broker (Current)", 1415, 385);
            }
        }
    });
    $("#divT11_16_current_Total").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item16a3", "LTD Admin. Fee Total (Current)", 1415, 475);
            }
        }
    });

    $("#ckT11_16_current").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_16_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_16_current").is(":checked")) {
                $("#txtT11_16_Bk1_current").focus();
            } else {
                $("#txtT11_147_current_to_HPI").focus();
            }
        }
    });

    $("#div_ckT11_16_current").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item16a4", "Split Broker Fees? (Current)", 1440, 185);
            }
        }
    });

    $("#lblT11_16_split").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item16a4", "Split Broker Fees? (Current)", 1440, 185);
            }
        }
    });

    $("#divT11_16").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item16a4", "Split Broker Fees? (Current)", 1440, 185);
            }
        }
    });


    $("#txtT11_16_Bk1_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_16_Bk2_current").focus();
        }
    });

    $("#txtT11_16_Bk1_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 17);
    });

    $("#divT11_16_Bk_1").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item16a5", "Broker #1 Fees (Current)", 1440, 230);
            }
        }
    });

    $("#txtT11_16_Bk2_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_16_Bk3_current").focus();
        }
    });

    $("#txtT11_16_Bk2_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 17);
    });

    $("#divT11_16_Bk_2").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item16a6", "Broker #2 Fees (Current)", 1440, 300);
            }
        }
    });

    $("#txtT11_16_Bk3_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_16_Bk4_current").focus();
        }
    });

    $("#txtT11_16_Bk3_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 17);
    });

    $("#divT11_16_Bk_3").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item16a7", "Broker #3 Fees (Current)", 1440, 370);
            }
        }
    });

    $("#txtT11_16_Bk4_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_16_Bk5_current").focus();
        }
    });

    $("#txtT11_16_Bk4_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 17);
    });

    $("#divT11_16_Bk_4").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item16a8", "Broker #4 Fees (Current)", 1440, 440);
            }
        }
    });

    $("#txtT11_16_Bk5_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_147_current_to_HPI").focus();
        }
    });

    $("#txtT11_16_Bk5_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 17);
    });

    $("#divT11_16_Bk_5").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item16a9", "Broker #5 Fees (Current)", 1440, 510);
            }
        }
    });

    $("#txtT11_16_renewal_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_16_renewal_to_Broker").focus();
        }
    });
    $("#txtT11_16_renewal_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_16_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_16_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_16_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 17);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $("#divT11_16_renewal_to_HPI").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item16b1", "LTD Admin. Fee To HPI (Renewal)", 1415, 550);
            }
        }
    });

    $("#txtT11_16_renewal_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_16_renewal").focus();
        }
    });
    $("#txtT11_16_renewal_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_16_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_16_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_16_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 17);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $("#divT11_16_renewal_to_Broker").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item16b2", "LTD Admin. Fee To Broker (Renewal)", 1415, 685);
            }
        }
    });
    $("#divT11_16_renewal_Total").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item16b3", "LTD Admin. Fee Total (Renewal)", 1415, 775);
            }
        }
    });

    $("#ckT11_16_renewal").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_16_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_16_renewal").is(":checked")) {
                $("#txtT11_16_Bk1_renewal").focus();
            } else {
                $("#txtT11_147_renewal_to_HPI").focus();
            }
        }
    });

    $("#div_ckT11_16_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item16b4", "Split Broker Fees? (Renewal)", 1440, 585);
            }
        }
    });


    $("#txtT11_16_Bk1_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_16_Bk2_renewal").focus();
        }
    });

    $("#txtT11_16_Bk1_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 17);
    });

    $("#divT11_16_Bk_1_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item16b5", "Broker #1 Fees (Renewal)", 1440, 625);
            }
        }
    });

    $("#txtT11_16_Bk2_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_16_Bk3_renewal").focus();
        }
    });

    $("#txtT11_16_Bk2_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 17);
    });

    $("#divT11_16_Bk_2_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item16b6", "Broker #2 Fees (Renewal)", 1440, 695);
            }
        }
    });

    $("#txtT11_16_Bk3_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_16_Bk4_renewal").focus();
        }
    });

    $("#txtT11_16_Bk3_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 17);
    });

    $("#divT11_16_Bk_3_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item16b7", "Broker #3 Fees (Renewal)", 1440, 765);
            }
        }
    });

    $("#txtT11_16_Bk4_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_16_Bk5_renewal").focus();
        }
    });

    $("#txtT11_16_Bk4_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 17);
    });

    $("#divT11_16_Bk_4_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item16b8", "Broker #4 Fees (Renewal)", 1440, 835);
            }
        }
    });

    $("#txtT11_16_Bk5_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_147_renewal_to_HPI").focus();
        }
    });

    $("#txtT11_16_Bk5_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 17);
    });

    $("#divT11_16_Bk_5_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item16b9", "Broker #5 Fees (Renewal)", 1440, 905);
            }
        }
    });

    $("#txtT11_17_current_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_17_current_to_Broker").focus();
        }
    });
    $("#txtT11_17_current_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_17_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_17_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_17_current_Total");
        check_fee_amount(this, "Fees/Rates", 19);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $("#divT11_17_current_to_HPI").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item17a1", "RN 24/7 To HPI (Current)", 1515, 250);
            }
        }
    });

    $("#txtT11_17_current_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_17_current").focus();
        }
    });
    $("#txtT11_17_current_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_17_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_17_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_17_current_Total");
        check_fee_amount(this, "Fees/Rates", 19);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $("#divT11_17_current_to_Broker").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item17a2", "RN 24/7 To Broker (Current)", 1515, 385);
            }
        }
    });
    $("#divT11_17_current_Total").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item17a3", "RN 24/7 Total (Current)", 1515, 475);
            }
        }
    });

    $("#ckT11_17_current").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_17_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_17_current").is(":checked")) {
                $("#txtT11_17_Bk1_current").focus();
            } else {
                $("#txtT11_18_current_to_HPI").focus();
            }
        }
    });

    $("#div_ckT11_17_current").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item17a4", "Split Broker Fees? (Current)", 1540, 185);
            }
        }
    });

    $("#lblT11_17_split").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item17a4", "Split Broker Fees? (Current)", 1540, 185);
            }
        }
    });

    $("#divT11_17").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item17a4", "Split Broker Fees? (Current)", 1540, 185);
            }
        }
    });

    $("#txtT11_17_Bk1_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_17_Bk2_current").focus();
        }
    });

    $("#txtT11_17_Bk1_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 19);
    });

    $("#divT11_17_Bk_1").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item17a5", "Broker #1 Fees (Current)", 1540, 230);
            }
        }
    });

    $("#txtT11_17_Bk2_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_17_Bk3_current").focus();
        }
    });

    $("#txtT11_17_Bk2_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 19);
    });

    $("#divT11_17_Bk_2").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item17a6", "Broker #2 Fees (Current)", 1540, 300);
            }
        }
    });

    $("#txtT11_17_Bk3_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_17_Bk4_current").focus();
        }
    });

    $("#txtT11_17_Bk3_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 19);
    });

    $("#divT11_17_Bk_3").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item17a7", "Broker #3 Fees (Current)", 1540, 370);
            }
        }
    });

    $("#txtT11_17_Bk4_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_17_Bk5_current").focus();
        }
    });

    $("#txtT11_17_Bk4_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 19);
    });

    $("#divT11_17_Bk_4").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item17a8", "Broker #4 Fees (Current)", 1540, 440);
            }
        }
    });

    $("#txtT11_17_Bk5_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_18_current_to_HPI").focus();
        }
    });

    $("#txtT11_17_Bk5_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 19);
    });

    $("#divT11_17_Bk_5").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item17a9", "Broker #5 Fees (Current)", 1540, 510);
            }
        }
    });

    $("#txtT11_17_renewal_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_17_renewal_to_Broker").focus();
        }
    });
    $("#txtT11_17_renewal_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_17_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_17_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_17_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 19);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $("#divT11_17_renewal_to_HPI").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item17b1", "RN 24/7 To HPI (Renewal)", 1515, 550);
            }
        }
    });

    $("#txtT11_17_renewal_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_17_renewal").focus();
        }
    });
    $("#txtT11_17_renewal_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_17_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_17_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_17_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 19);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $("#divT11_17_renewal_to_Broker").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item17b2", "RN 24/7 To Broker (Renewal)", 1515, 685);
            }
        }
    });
    $("#divT11_17_renewal_Total").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item17b3", "RN 24/7 Total (Renewal)", 1515, 775);
            }
        }
    });

    $("#ckT11_17_renewal").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_17_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_17_renewal").is(":checked")) {
                $("#txtT11_17_Bk1_renewal").focus();
            } else {
                $("#txtT11_18_renewal_to_HPI").focus();
            }
        }
    });

    $("#div_ckT11_17_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item17b4", "Split Broker Fees? (Renewal)", 1540, 585);
            }
        }
    });


    $("#txtT11_17_Bk1_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_17_Bk2_renewal").focus();
        }
    });

    $("#txtT11_17_Bk1_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 19);
    });

    $("#divT11_17_Bk_1_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item17b5", "Broker #1 Fees (Renewal)", 1540, 625);
            }
        }
    });

    $("#txtT11_17_Bk2_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_17_Bk3_renewal").focus();
        }
    });

    $("#txtT11_17_Bk2_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 19);
    });

    $("#divT11_17_Bk_2_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item17b6", "Broker #2 Fees (Renewal)", 1540, 695);
            }
        }
    });

    $("#txtT11_17_Bk3_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_17_Bk4_renewal").focus();
        }
    });

    $("#txtT11_17_Bk3_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 19);
    });

    $("#divT11_17_Bk_3_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item17b7", "Broker #3 Fees (Renewal)", 1540, 765);
            }
        }
    });

    $("#txtT11_17_Bk4_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_17_Bk5_renewal").focus();
        }
    });

    $("#txtT11_17_Bk4_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 19);
    });

    $("#divT11_17_Bk_4_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item17b8", "Broker #4 Fees (Renewal)", 1540, 835);
            }
        }
    });

    $("#txtT11_17_Bk5_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_18_renewal_to_HPI").focus();
        }
    });

    $("#txtT11_17_Bk5_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 19);
    });

    $("#divT11_17_Bk_5_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item17b9", "Broker #5 Fees (Renewal)", 1540, 905);
            }
        }
    });

    $("#txtT11_18_current_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_18_current_to_Broker").focus();
        }
    });
    $("#txtT11_18_current_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_18_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_18_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_18_current_Total");
        check_fee_amount(this, "Fees/Rates", 20);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $("#divT11_18_current_to_HPI").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item18a1", "Nurse Advocate To HPI (Current)", 1565, 250);
            }
        }
    });

    $("#txtT11_18_current_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_18_current").focus();
        }
    });
    $("#txtT11_18_current_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_18_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_18_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_18_current_Total");
        check_fee_amount(this, "Fees/Rates", 20);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $("#divT11_18_current_to_Broker").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item18a2", "Nurse Advocate To Broker (Current)", 1565, 385);
            }
        }
    });
    $("#divT11_18_current_Total").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item18a3", "Nurse Advocate Total (Current)", 1565, 475);
            }
        }
    });

    $("#ckT11_18_current").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_18_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_18_current").is(":checked")) {
                $("#txtT11_18_Bk1_current").focus();
            } else {
                $("#txtT11_170_current_to_HPI").focus();
            }
        }
    });

    $("#div_ckT11_18_current").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item18a4", "Split Broker Fees? (Current)", 1590, 185);
            }
        }
    });

    $("#lblT11_18_split").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item18a4", "Split Broker Fees? (Current)", 1590, 185);
            }
        }
    });

    $("#divT11_18").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item18a4", "Split Broker Fees? (Current)", 1590, 185);
            }
        }
    });


    $("#txtT11_18_Bk1_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_18_Bk2_current").focus();
        }
    });

    $("#txtT11_18_Bk1_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 20);
    });

    $("#divT11_18_Bk_1").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item18a5", "Broker #1 Fees (Current)", 1590, 230);
            }
        }
    });

    $("#txtT11_18_Bk2_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_18_Bk3_current").focus();
        }
    });

    $("#txtT11_18_Bk2_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 20);
    });

    $("#divT11_18_Bk_2").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item18a6", "Broker #2 Fees (Current)", 1590, 300);
            }
        }
    });

    $("#txtT11_18_Bk3_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_18_Bk4_current").focus();
        }
    });

    $("#txtT11_18_Bk3_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 20);
    });

    $("#divT11_18_Bk_3").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item18a7", "Broker #3 Fees (Current)", 1590, 370);
            }
        }
    });

    $("#txtT11_18_Bk4_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_18_Bk5_current").focus();
        }
    });

    $("#txtT11_18_Bk4_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 20);
    });

    $("#divT11_18_Bk_4").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item18a8", "Broker #4 Fees (Current)", 1590, 440);
            }
        }
    });

    $("#txtT11_18_Bk5_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            //Use JQuery to ck if ckbox is checked
            $("#txtT11_170_current_to_HPI").focus();
        }
    });

    $("#txtT11_18_Bk5_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 20);
    });

    $("#divT11_18_Bk_5").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item18a9", "Broker #5 Fees (Current)", 1590, 510);
            }
        }
    });


    $("#txtT11_18_renewal_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_18_renewal_to_Broker").focus();
        }
    });
    $("#txtT11_18_renewal_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_18_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_18_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_18_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 20);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $("#divT11_18_renewal_to_HPI").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item18b1", "Nurse Advocate To HPI (Renewal)", 1565, 550);
            }
        }
    });

    $("#txtT11_18_renewal_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_18_renewal").focus();
        }
    });
    $("#txtT11_18_renewal_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_18_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_18_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_18_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 20);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $("#divT11_18_renewal_to_Broker").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item18b2", "Nurse Advocate To Broker (Renewal)", 1565, 685);
            }
        }
    });
    $("#divT11_18_renewal_Total").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item18b2", "Nurse Advocate Total (Renewal)", 1565, 775);
            }
        }
    });


    $("#ckT11_18_renewal").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_18_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_18_renewal").is(":checked")) {
                $("#txtT11_18_Bk1_renewal").focus();
            } else {
                $("#txtT11_170_renewal_to_HPI").focus();
            }
        }
    });

    $("#div_ckT11_18_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item18b4", "Split Broker Fees? (Renewal)", 1590, 585);
            }
        }
    });


    $("#txtT11_18_Bk1_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_18_Bk2_renewal").focus();
        }
    });

    $("#txtT11_18_Bk1_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 20);
    });

    $("#divT11_18_Bk_1_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item18b5", "Broker #1 Fees (Renewal)", 1590, 625);
            }
        }
    });

    $("#txtT11_18_Bk2_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_18_Bk3_renewal").focus();
        }
    });

    $("#txtT11_18_Bk2_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 20);
    });

    $("#divT11_18_Bk_2_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item18b6", "Broker #2 Fees (Renewal)", 1590, 695);
            }
        }
    });

    $("#txtT11_18_Bk3_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_18_Bk4_renewal").focus();
        }
    });

    $("#txtT11_18_Bk3_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 20);
    });

    $("#divT11_18_Bk_3_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item18b7", "Broker #3 Fees (Renewal)", 1590, 765);
            }
        }
    });

    $("#txtT11_18_Bk4_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_18_Bk5_renewal").focus();
        }
    });

    $("#txtT11_18_Bk4_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 20);
    });

    $("#divT11_18_Bk_4_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item18b8", "Broker #4 Fees (Renewal)", 1590, 835);
            }
        }
    });

    $("#txtT11_18_Bk5_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_170_renewal_to_HPI").focus();
        }
    });

    $("#divT11_18_Bk_5_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item18b8", "Broker #5 Fees (Renewal)", 1590, 905);
            }
        }
    });

    $("#txtT11_18_Bk5_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 20);
    });

    $("#txtT11_170_current_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_170_current_to_Broker").focus();
        }
    });
    $("#txtT11_170_current_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_170_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_170_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_170_current_Total");
        check_fee_amount(this, "Fees/Rates", 21);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $("#divT11_170_current_to_HPI").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item170a1", "HSA To HPI (Current)", 1615, 250);
            }
        }
    });

    $("#txtT11_170_current_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_170_current").focus();
        }
    });
    $("#txtT11_170_current_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_170_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_170_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_170_current_Total");
        check_fee_amount(this, "Fees/Rates", 21);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $("#divT11_170_current_to_Broker").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item170a2", "HSA To Broker (Current)", 1615, 385);
            }
        }
    });
    $("#divT11_170_current_Total").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item170a3", "HSA Total (Current)", 1615, 475);
            }
        }
    });

    $("#ckT11_170_current").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_170_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_170_current").is(":checked")) {
                $("#txtT11_170_Bk1_current").focus();
            } else {
                $("#ckT11_19").focus();
            }
        }
    });

    $("#div_ckT11_170_current").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item170a4", "Split Broker Fees? (Current)", 1640, 185);
            }
        }
    });

    $("#lblT11_170_split").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item170a4", "Split Broker Fees? (Current)", 1640, 185);
            }
        }
    });

    $("#divT11_170").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item18a4", "Split Broker Fees? (Current)", 1640, 185);
            }
        }
    });


    $("#txtT11_170_Bk1_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_170_Bk2_current").focus();
        }
    });

    $("#txtT11_170_Bk1_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 20);
    });

    $("#divT11_170_Bk_1").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item18a5", "Broker #1 Fees (Current)", 1640, 230);
            }
        }
    });

    $("#txtT11_170_Bk2_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_170_Bk3_current").focus();
        }
    });

    $("#txtT11_170_Bk2_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 20);
    });

    $("#divT11_170_Bk_2").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item170a6", "Broker #2 Fees (Current)", 1640, 300);
            }
        }
    });

    $("#txtT11_170_Bk3_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_170_Bk4_current").focus();
        }
    });

    $("#txtT11_170_Bk3_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 21);
    });

    $("#divT11_170_Bk_3").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item170a7", "Broker #3 Fees (Current)", 1640, 370);
            }
        }
    });

    $("#txtT11_170_Bk4_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_170_Bk5_current").focus();
        }
    });

    $("#txtT11_170_Bk4_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 21);
    });

    $("#divT11_170_Bk_4").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item170a8", "Broker #4 Fees (Current)", 1640, 440);
            }
        }
    });

    $("#txtT11_170_Bk5_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_19").focus();
        }
    });

    $("#txtT11_170_Bk5_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 21);
    });

    $("#divT11_170_Bk_5").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item170a9", "Broker #5 Fees (Current)", 1640, 510);
            }
        }
    });


    $("#txtT11_170_renewal_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_170_renewal_to_Broker").focus();
        }
    });
    $("#txtT11_170_renewal_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_170_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_170_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_170_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 21);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $("#divT11_170_renewal_to_HPI").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item170b1", "HSA To HPI (Renewal)", 1615, 550);
            }
        }
    });

    $("#txtT11_170_renewal_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_170_renewal").focus();
        }
    });
    $("#txtT11_170_renewal_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_170_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_170_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_170_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 21);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $("#divT11_170_renewal_to_Broker").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item170b2", "HSA To Broker (Renewal)", 1615, 685);
            }
        }
    });
    $("#divT11_170_renewal_Total").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item170b2", "HSA Total (Renewal)", 1615, 775);
            }
        }
    });


    $("#ckT11_170_renewal").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_170_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_170_renewal").is(":checked")) {
                $("#txtT11_170_Bk1_renewal").focus();
            } else {
                if ($("#ckT11_170").is(":checked")) {
                    $("#txtT11_170_renewal_to_HPI").focus();
                } else {
                    $("#txtT11_20_renewal_to_HPI").focus();
                }
            }
        }
    });

    $("#div_ckT11_170_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item170b4", "Split Broker Fees? (Renewal)", 1640, 585);
            }
        }
    });


    $("#txtT11_170_Bk1_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_170_Bk2_renewal").focus();
        }
    });

    $("#txtT11_170_Bk1_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 21);
    });

    $("#divT11_170_Bk_1_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item170b5", "Broker #1 Fees (Renewal)", 1640, 625);
            }
        }
    });

    $("#txtT11_170_Bk2_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_170_Bk3_renewal").focus();
        }
    });

    $("#txtT11_170_Bk2_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 21);
    });

    $("#divT11_170_Bk_2_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item170b6", "Broker #2 Fees (Renewal)", 1640, 695);
            }
        }
    });

    $("#txtT11_170_Bk3_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_170_Bk4_renewal").focus();
        }
    });

    $("#txtT11_170_Bk3_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 21);
    });

    $("#divT11_170_Bk_3_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item170b7", "Broker #3 Fees (Renewal)", 1640, 765);
            }
        }
    });

    $("#txtT11_170_Bk4_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_170_Bk5_renewal").focus();
        }
    });

    $("#txtT11_170_Bk4_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 21);
    });

    $("#divT11_170_Bk_4_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item170b8", "Broker #4 Fees (Renewal)", 1640, 835);
            }
        }
    });

    $("#txtT11_170_Bk5_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_170").is(":checked")) {
                $("#txtT11_170_renewal_to_HPI").focus();
            } else {
                $("#txtT11_20_renewal_to_HPI").focus();
            }
        }
    });

    $("#divT11_170_Bk_5_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item170b8", "Broker #5 Fees (Renewal)", 1640, 905);
            }
        }
    });

    $("#txtT11_170_Bk5_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 21);
    });


    $("#ckT11_19").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });

    $("#ckT11_19").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_19").is(":checked")) {
                $("#txtT11_19").focus();
            } else {
                $("#txtT11_Flex_Note_current").focus();
            }
        }
    });

    $("#txtT11_19").keydown(function (evt) {
        //Since change event cancels this move event use global var movetocontrol to move curser
        movetocontrol = "";
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            movetocontrol = $("#txtT11_19_current_to_HPI");
            $("#txtT11_19_current_to_HPI").focus();
        }
    });

    $("#txtT11_19").blur(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
        if (movetocontrol.length > 0) movetocontrol.focus();
    });

    $("#divT11_19").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item19a", "PEPM Other", 1690, 0);
            }
        }
    });

    $("#txtT11_19_current_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_19_current_to_Broker").focus();
        }
    });
    $("#txtT11_19_current_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_19_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_19_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_19_current_Total");
        check_fee_amount(this, "Fees/Rates", 22);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $("#divT11_19_current_to_HPI").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item19a1", "PEPM Other to HPI (Current)", 1665, 250);
            }
        }
    });

    $("#txtT11_19_current_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_19_current").focus();
        }
    });
    $("#txtT11_19_current_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_19_current_to_HPI");
        ctrl_2 = document.getElementById("txtT11_19_current_to_Broker");
        ctrl_total = document.getElementById("txtT11_19_current_Total");
        check_fee_amount(this, "Fees/Rates", 22);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $("#divT11_19_current_to_Broker").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item19a2", "PEPM Other to Broker (Current)", 1665, 385);
            }
        }
    });
    $("#divT11_19_current_Total").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item19a3", "PEPM Other Total (Current)", 1665, 475);
            }
        }
    });


    $("#ckT11_19_current").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_19_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_19_current").is(":checked")) {
                $("#txtT11_19_Bk1_current").focus();
            } else {
                $("#txtT11_Flex_Note_current").focus();
            }
        }
    });

    $("#ckT11_19").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item19", "PEPM Other Fee", 1690, 5);
            }
        }
    });

    $("#div_ckT11_19_current").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item19a4", "Split Broker Fees? (Current)", 1690, 185);
            }
        }
    });

    $("#lblT11_19_split").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item19a4", "Split Broker Fees? (Current)", 1690, 185);
            }
        }
    });

    $("#txtT11_19_Bk1_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_19_Bk2_current").focus();
        }
    });

    $("#txtT11_19_Bk1_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 21);
    });

    $("#divT11_19_Bk_1").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item19a5", "Broker #1 Fees (Current)", 1690, 230);
            }
        }
    });

    $("#txtT11_19_Bk2_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_19_Bk3_current").focus();
        }
    });


    $("#txtT11_19_Bk2_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 21);
    });

    $("#divT11_19_Bk_2").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item19a6", "Broker #2 Fees (Current)", 1690, 300);
            }
        }
    });

    $("#txtT11_19_Bk3_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_19_Bk4_current").focus();
        }
    });

    $("#txtT11_19_Bk3_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 21);
    });

    $("#divT11_19_Bk_3").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item19a7", "Broker #3 Fees (Current)", 1690, 370);
            }
        }
    });

    $("#txtT11_19_Bk4_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_19_Bk5_current").focus();
        }
    });

    $("#txtT11_19_Bk4_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 21);
    });

    $("#divT11_19_Bk_4").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item19a8", "Broker #4 Fees (Current)", 1690, 440);
            }
        }
    });

    $("#txtT11_19_Bk5_current").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_Flex_Note_current").focus();
        }
    });

    $("#txtT11_19_Bk5_current").blur(function () {
        check_fee_amount(this, "Fees/Rates", 21);
    });

    $("#divT11_19_Bk_5").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item19a9", "Broker #5 Fees (Current)", 1690, 510);
            }
        }
    });


    $("#txtT11_19_renewal_to_HPI").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_19_renewal_to_Broker").focus();
        }
    });
    $("#txtT11_19_renewal_to_HPI").blur(function () {
        ctrl_1 = document.getElementById("txtT11_19_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_19_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_19_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 21);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $("#divT11_19_renewal_to_HPI").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item19b1", "PEPM Other to HPI (Renewal)", 1665, 550);
            }
        }
    });

    $("#txtT11_19_renewal_to_Broker").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#ckT11_19_renewal").focus();
        }
    });
    $("#txtT11_19_renewal_to_Broker").blur(function () {
        ctrl_1 = document.getElementById("txtT11_19_renewal_to_HPI");
        ctrl_2 = document.getElementById("txtT11_19_renewal_to_Broker");
        ctrl_total = document.getElementById("txtT11_19_renewal_Total");
        check_fee_amount(this, "Fees/Rates", 21);
        check_for_dollar_total(ctrl_1, ctrl_2, ctrl_total);
    });
    $("#divT11_19_renewal_to_Broker").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item19b2", "PEPM Other to Broker (Renewal)", 1665, 685);
            }
        }
    });
    $("#divT11_19_renewal_Total").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item19b3", "PEPM Other Total (Renewal)", 1665, 775);
            }
        }
    });

    $("#ckT11_19_renewal").click(function () {
        set_dirty("hvrenewaldirty");
        tab11_optional_texts();
    });


    $("#ckT11_19_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            if ($("#ckT11_19_renewal").is(":checked")) {
                $("#txtT11_19_Bk1_renewal").focus();
            } else {
                $("#txtT11_Flex_Note_renewal").focus();
            }
        }
    });

    $("#div_ckT11_19_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item19b4", "Split Broker Fees? (Renewal)", 1660, 585);
            }
        }
    });


    $("#txtT11_19_Bk1_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_19_Bk2_renewal").focus();
        }
    });

    $("#txtT11_19_Bk1_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 21);
    });

    $("#divT11_19_Bk_1_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item19b5", "Broker #1 Fees (Renewal)", 1690, 625);
            }
        }
    });

    $("#txtT11_19_Bk2_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_19_Bk3_renewal").focus();
        }
    });

    $("#txtT11_19_Bk2_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 21);
    });

    $("#divT11_19_Bk_2_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item19b6", "Broker #2 Fees (Renewal)", 1690, 695);
            }
        }
    });

    $("#txtT11_19_Bk3_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_19_Bk4_renewal").focus();
        }
    });

    $("#txtT11_19_Bk3_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 21);
    });

    $("#divT11_19_Bk_3_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item19b7", "Broker #3 Fees (Renewal)", 1690, 765);
            }
        }
    });

    $("#txtT11_19_Bk4_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_19_Bk5_renewal").focus();
        }
    });

    $("#txtT11_19_Bk4_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 21);
    });

    $("#divT11_19_Bk_4_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item19b8", "Broker #4 Fees (Renewal)", 1690, 835);
            }
        }
    });

    $("#txtT11_19_Bk5_renewal").keydown(function (evt) {
        if (evt.keyCode == 9 || evt.keyCode == 13) {
            evt.preventDefault();
            $("#txtT11_Flex_Note_renewal").focus();
        }
    });

    $("#txtT11_19_Bk5_renewal").blur(function () {
        check_fee_amount(this, "Fees/Rates", 21);
    });

    $("#divT11_19_Bk_5_renewal").mousedown(function (event) {
        //Get popup values if right-click and display_tab11_popup_values = true
        if (event.which != 1) {
            if (display_tab11_popup_values) {
                event.preventDefault();
                get_tab11_std_popup_values(11, "Item19b9", "Broker #5 Fees (Renewal)", 1690, 905);
            }
        }
    });

});             //end doc.ready