var tutorialVisible = false;
var idiomasVisible = false;
var findDatepicker;
var findDatepickerCount = 0;
var findTooltip;
var findTooltipCount = 0;

var initControls = (function () {

    return {
        iniciarControles: function () {
            $("#mainRow .options menu ul").hide();
        }
    }

})(initControls || {})


var initTiggers = (function () {
    return {
        iniciarTiggers: function (lan) {
            activarTiggers(lan);
        }
    }
})(initTiggers || {})

var optionsDatePickerLanguage = (function () {
    return {
        changeLanguage: function (lan) {
            if ($('#fechaEmision').length != 0) {
                if ($('#fechaEmision').data("DateTimePicker")) {
                    $('#fechaEmision').data("DateTimePicker").options({
                        locale: lan
                    });
                }
            }
        }
    }
})(optionsDatePickerLanguage || {})

var mostrarBtnAyuda = (function () {

    return {
        activarBtnAyuda: function (visible) {
            activarBotonAyuda(visible);
        }
    }

})(mostrarBtnAyuda || {})

function mostrarTutorial(event) {
    $(".campos-formulario label").css({ "z-index": "2", "position": "relative" });
    $(".tutorial-formulario").css({ "display": "block" }).animate({ "opacity": "1" }, 500, "linear", function () {
        $("#mostrarTutorial").html("X").toggleClass("greenFondo");
		
		var $allToolTips = $(".tutorial-formulario").find(".tooltipTutorial");
		
		$(".tooltipTutorial").css({"display":"none"});
		
		$($allToolTips[0]).css({"display":"block"}).animate({ "opacity": "1" }, 300, "linear", null);
		
		$allToolTips.each(function(index){
			var $toolTip = $allToolTips[index];
			
			$($toolTip).off("click").on("click", function(){
				$(this).animate({ "opacity": "0" }, 50, "linear", function(){
					$(this).css({"display":"none"});
					$(this).parent().css({ "z-index": "0 !important" });
				});
				if($($allToolTips[index + 1]).length > 0){
					$($allToolTips[index + 1]).css({"display":"block"}).animate({ "opacity": "1" }, 300, "linear", null);
				} else {
					ocultarTutorial();
				}
			});
		});
    });
}

function CheckDatePicker(lan) {
    if ($('#fechaEmision').length != 0) {
        // revisar que el elemento no tenga ya el widget
        if ($('#fechaEmision').data("DateTimePicker")) {
            $('#fechaEmision').data("DateTimePicker").destroy();
        }
        $('#fechaEmision').datetimepicker({
            locale: lan,
            format: "DD/MM/YYYY"
        });
        clearInterval(findDatepicker);
    }
    // TODO Add aditional validation to find date
    findDatepickerCount++;
    if (findDatepickerCount >= 200){
        clearInterval(findDatepicker);
        findDatepickerCount = 0;
    }
}

function CheckTooltip() {
    if ($('.tutorial-formulario').length != 0) {
        clearInterval(findTooltip);
    }
    // TODO Add aditional validation to find date
    findTooltipCount++;
    if (findTooltipCount >= 200){
        clearInterval(findTooltip);
        findTooltipCount = 0;
    }
}

function ocultarTutorial() {
    $(".tutorial-formulario").animate({ "opacity": "0" }, 500, "linear", function () {
        $(".tutorial-formulario .tooltipTutorial").animate({ "opacity": "0" }, 500, "linear", null);
        $(".campos-formulario label").css({ "z-index": "0", "position": "relative" });
        $(".tutorial-formulario").css({ "display": "none" });
        $("#mostrarTutorial").html("?").toggleClass("greenFondo");
        tutorialVisible = false;
    });
    $(".tutorial-formulario").find("label .tooltipTutorial").each(function (indice) {
        $(this).animate({ "opacity": "0" }, 0, "linear", null);
    });
}

function mostrarIdiomas() {
    $("#mainRow .options menu ul").show();
    $("#mainRow .options menu ul").css({ "width": "auto" });
}

function ocultarIdiomas() {
    $("#mainRow .options menu ul").hide();
}

function activarTiggers(lan) {

    $("#mostrarIdioma").off("click").on("click", function () {
        if (idiomasVisible) {
            ocultarIdiomas();
            idiomasVisible = false;
        } else {
            mostrarIdiomas();
            idiomasVisible = true;
        }
    })

    // date picker
    findDatepicker = setInterval(function () {
        CheckDatePicker(lan);
    }, 200);
	
	findTooltip = setInterval(function () {
        CheckTooltip();
    }, 200);


    $("#mostrarTutorial").off("click").on("click", function () {
        if (tutorialVisible) {
            ocultarTutorial();
            tutorialVisible = false;
        } else {
            mostrarTutorial();
            tutorialVisible = true;
        }
    });
}

function activarBotonAyuda(visible){
    if (visible) {
        if ($("#mostrarTutorial").css("display") == "none"){
            $("#mostrarTutorial").show();
        }		
    } else {
        if ($("#mostrarTutorial").css("display") == "block") {
            $("#mostrarTutorial").hide();
        }		
	}
}
