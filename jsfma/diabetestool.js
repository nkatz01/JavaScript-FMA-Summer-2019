function processDRAT() {
  document.getElementById('message').id = 'messageInvis'; //make message disappear when page refreshes
  var inputTags = document.getElementsByTagName('input');
  for (var i = 0; i < inputTags.length; i += 4) { //auto check every first input of every question
    inputTags[i].checked = true;
  }


  document.getElementById("drat").onsubmit = function() {
    var resutls;
    var valuesOfAllIdsInForm = CollectValuesOfAllIDs(); //collect IDs of all input elements
    var idValuesOfChecekdFields = returnIDsOfCheckedFields(valuesOfAllIdsInForm); //filter only for IDs of selected elements
    var arrayOfCheckedValues = ValuesOfCheckedIDs(idValuesOfChecekdFields);//extract the numerical values of the selected elements (i.e. radio buttons)
    var totalScore = CalcValues(arrayOfCheckedValues);//sum up the total score for all selected elements
    var lowOrMedium = (typeof totalScore == 'string');

    if (!(document.getElementById('risklevel').innerHTML == "")) {//if user didn't refresh the page but changed selection in the tool, we want to assure that the message/results on the screen, from the previous input, disappears.
      var idText = document.getElementById('risklevel').innerHTML;
      idText += 'Vis';
      var idToHide = document.getElementById(idText);
      idToHide.id = idText.substring(0, idText.length - 3);
    }


    if (lowOrMedium) { //this will be true when the user's score is low or medium risk
      results = totalScore;
      if (document.getElementById(results) != null) {
        document.getElementById('risklevel').innerHTML = results; //this deals with the change of the one word in the generic message, in the .html file. That is low or medium. 
        var addedMessage = document.getElementById(results);
        addedMessage.id = results + "Vis"; //this deals with the addedd scentance that is tailored to the level of risk
      }
    }
    else {
      results = returnNameOfFields(idValuesOfChecekdFields);
      document.getElementById('risklevel').innerHTML = "high";
      var message = "";
	  var singleFactorsHigherThan10 = 0; 
      for (var i = 0; i < results.length; i++) {
        if (arrayOfCheckedValues[i] >= 10) {
          message += results[i] + " and your "; //this deals with the part of the results, in the message to the user, that is unique to a results with the outcome of 'high'. that is listing which factors play a main role or are higher or equal to 10.
		  singleFactorsHigherThan10++;
		}
      }
      if (message.substring(message.length - 10, message.length + 1) == " and your ") {
        message = message.substring(0, message.length - 10);
      }
      if (document.getElementById('high') != null) {
        var addedMessage = document.getElementById('high');
        addedMessage.id = "high" + "Vis";
		
			if (singleFactorsHigherThan10 > 0){
		
		if (singleFactorsHigherThan10 > 1){
			document.getElementById('highRisk').innerHTML =  "Your main risk factors are your " + message +'.';
		}
			
		else {
			document.getElementById('highRisk').innerHTML =  "Your main risk factor is your " + message +'.';
		}
	}	
			
			
			
			
      }
    }

    if (document.getElementById('messageInvis') != null) {
      document.getElementById('messageInvis').id = ""; //this clears the id from the message/results paragraph, thus making it visiable to the user.
    }
    return false;
  }

}


window.onload = processDRAT;


function CollectValuesOfAllIDs() {
  var arrayOfForInLabels = [];
  var collecOfIDsInInputs = [];
  var collectOfLabels = document.getElementsByClassName("radiolabel")
  for (var i = 0; i < collectOfLabels.length; i++) {
    arrayOfForInLabels[i] = collectOfLabels[i].getAttribute("for"); // https://www.w3schools.com/jsref/met_element_getattribute.asp
    //to get the IDs of all the input elements, get first the 'for's of all the label elements
    collecOfIDsInInputs.push(document.getElementById(arrayOfForInLabels[i]));
  }
  return collecOfIDsInInputs;
}

function returnIDsOfCheckedFields(valuesOfAllIdsInForm) {
  var arrayOfCheckedIDs = [];
  for (var i = 0; i < valuesOfAllIdsInForm.length; i++) {
    if (valuesOfAllIdsInForm[i].checked == true) {
      arrayOfCheckedIDs.push(valuesOfAllIdsInForm[i].id);
    }
  }

  return arrayOfCheckedIDs;
}

function ValuesOfCheckedIDs(idValuesOfChecekdFields) {
  var arrayOfCheckedValues = [];
  var valueRef;
  for (var i = 0; i < idValuesOfChecekdFields.length; i++) {
    RefToId = document.getElementById(idValuesOfChecekdFields[i]);
    arrayOfCheckedValues.push((RefToId.value));
  }
  return arrayOfCheckedValues;
}


function CalcValues(arrayOfCheckedValues) {
  var totalForAll = 0;
  for (var i = 0; i < arrayOfCheckedValues.length; i++) {
    totalForAll += Number(arrayOfCheckedValues[i]);
  }
  if (totalForAll > 25) {
    return arrayOfCheckedValues; //returns an array of the selected values as we need to know which of the factors are of main risk to the user
  }
  else if (totalForAll >= 16) {
    return "medium";
  }
  else if (totalForAll < 16) {
    return "low";
  }
}

function returnNameOfFields(idValuesOfChecekdFields) {
  var arrayOfNameOfField = [];
  for (var i = 0; i < idValuesOfChecekdFields.length; i++) {
    arrayOfNameOfField.push(document.getElementById(idValuesOfChecekdFields[i]).getAttribute("name")); //getting the name of the fields of the selected input elements.
  }
  return arrayOfNameOfField;
}














