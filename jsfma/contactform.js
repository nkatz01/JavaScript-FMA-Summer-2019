function checkForm() {
  var firstField = document.getElementById('name');
  firstField.focus();
  returnTitleDefault();
  placeHolderInField();
  switchToolTip();

  document.getElementById("frm1").onsubmit = function() {
    var allowsubmit = true;
    var labels = document.getElementsByTagName('LABEL');//https://stackoverflow.com/questions/285522/find-html-label-associated-with-a-given-input
    allowsubmit = handleToFields(labels);
    if (allowsubmit) {
      alert("Data OK. Submitting Form");
    }
    return allowsubmit;
  }
}

window.onload = checkForm;

function showErrors(elem, message) {//displays errors and adds error message
  if (elem.nextSibling.getAttribute('class') != 'errorVis') { //https://www.w3schools.com/jsref/prop_node_nextsibling.asp
    elem.nextSibling.setAttribute('class', "errorVis");
    if (elem.value === "") {
      elem.nextSibling.innerHTML += message;
    }
    else {
      elem.nextSibling.innerHTML = message;
    }
  }
}

function hideErrors(elem) { //hides error message
  elem.nextSibling.setAttribute('class', "error");
}

function foundEmptyFields(elem) {//checks for empty fields
  var foundEmpty = false;
  if (elem.value === "") {
    foundEmpty = true;
    showErrors(elem, "");

  }
  else
    if (elem.nextSibling.getAttribute('class') == 'errorVis') {
      hideErrors(elem);
    }
  return foundEmpty;
}

function foundEmailIssue(elem) {//checks for email errors
  var foundEmailIssue = false;
  var emlregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;// http://www.ntu.edu.sg/home/ehchua/programming/howto/Regexe.html
  if (!emlregex.test(elem.value)) {
    foundEmailIssue = true;
    showErrors(elem, "* Your email address isn't valid");
  }
}


function foundNameIssue(elem) {//checks for errors in entered name or lastname
  var foundNameIssue = false;
  if (elem.id == 'name') {
    var fnamregex = /^[A-Za-z]{2,}$/;
    if (!fnamregex.test(elem.value)) {
      foundNameIssue = true;
    }
  }
  else {//in case of lastname
    var snamregex = /^([a-z A-Z]{2,})+(-([a-z A-Z]{2,})+)?$/;//https://stackoverflow.com/questions/15827051/i-allow-only-one-hyphen-in-regex;
    if (!snamregex.test(elem.value)) {
      foundNameIssue = true;
    }
  }
  if (foundNameIssue == true) {
    showErrors(elem, "* Your " + elem.id + " must only contain alphabet and be of at least two characters");//assumption is that no-one has a double-barrelled name like this; eg: ab-c
  }
  return foundNameIssue;
}

function foundZHANIssue(elem) {//checks for issue in Zedland health authority field
  var foundZHANIssue = false;
  var zhanRegex = /^[ZHAzha]{3,3}[0-9]{6,6}$/;// http://www.ntu.edu.sg/home/ehchua/programming/howto/Regexe.html
  if (!zhanRegex.test(elem.value)) {
    foundZHANIssue = true;
    showErrors(elem, "* Your HA number should begin with ZHA followed by 6 digits");
  }
  return foundZHANIssue;
}

function foundTellssue(elem) {//checks for error in telephone number entered 
  var foundTellssue = false;
  var tellregex = /^[0-9]{11,11}$/;// http://www.ntu.edu.sg/home/ehchua/programming/howto/Regexe.html
  if (!tellregex.test(elem.value)) {
    foundTellssue = true;
    showErrors(elem, "* Your telephone number should be of 11 digits long and no spaces");
  }
  return foundTellssue;
}

function handleToFields(labels) { //picks up fields
  var noErrors = true;
  for (var i = 0; i < labels.length; i++) {
    if (labels[i].htmlFor != '') {//https://stackoverflow.com/questions/285522/find-html-label-associated-with-a-given-input
      var elem = document.getElementById(labels[i].htmlFor);
      if (foundEmptyFields(elem) == true) {
        noErrors = false;
      }
      if (elem.id == 'email') {
        if (foundEmailIssue(elem) == true) {
          noErrors = false;
        }
      }
      if ((elem.id == 'name') || (elem.id == 'lastname')) {
        if (foundNameIssue(elem) == true) {
          noErrors = false;
        }
      }
      if (elem.id == "ZHAN") {
        if (foundZHANIssue(elem) == true) {
          noErrors = false
        }
      }
      if (elem.id == "tell") {
        if (foundTellssue(elem) == true) {
          noErrors = false
        }
      }
    }
  }

  return noErrors;
}

function placeHolderInField() {
  var secondField = document.getElementById('lastname');
  secondField.placeholder = "Last Name";
  document.getElementById("lastname").onfocus = function() {
    if (secondField.placeholder == "Last Name") {
      secondField.placeholder = "";
    }
  }
  document.getElementById("lastname").onblur = function() {
    if (secondField.placeholder == "") {
      secondField.placeholder = "Last Name";
    }
  }
}

function switchToolTip() {
  document.getElementById('qmark').onmouseover = function() {
    var toolTip = document.getElementById('ttip');
    toolTip.id = 'ttipVis';

  }

  document.getElementById('qmark').onmouseout = function() {
    var toolTip = document.getElementById('ttipVis');
    toolTip.id = 'ttip';

  }
}

function returnTitleDefault() {
  document.getElementById('title').selectedIndex = 0;
}//https://stackoverflow.com/questions/9539723/javascript-to-select-first-option-of-select-list