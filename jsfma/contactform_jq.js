$(document).ready(function() {

  $('#name').focus();//foucusing in on the first name field
  $('#title').val($('#title option:first').val());//setting the defualt selection of Title to Mr, when user refreshes the page

  $('#lastname').attr('placeholder', 'Last Name');//setting a placeholder in the Last name field
  $('#lastname').bind({
    'focus': function() {
      $('#lastname').attr('placeholder', '');
    },
    'blur': function() {
      $('#lastname').attr('placeholder', 'Last Name');
    }
  })

  $('#qmark').bind({//flipping the visibility of tooltip provided next the the ZHA field on and off
    'mouseover': function() {
      $('#ttip').attr('id', 'ttipVis');
    },
    'mouseout': function() {
      $('#ttipVis').attr('id', 'ttip');
    }
  })


  $('#frm1').submit(function(event) {
    var allowsubmit = true;
    var labels = $('LABEL');

    labels.each(function() { //picks up fields


      if ($(this).attr('for') != '') {
        var elem = $('#' + $(this).attr('for'));
        if (foundEmptyFields(elem) == true) {//checks for empty fields
          allowsubmit = false;
        }


        if (elem.attr('id') == 'email') {
          if (foundEmailIssue(elem) == true) {
            showErrors(elem, "* Your email address isn't valid");
            allowsubmit = false;
          }
        }


        if (elem.attr('id') == 'name') {
          if (foundnameIssue(elem) == true) {
            showErrors(elem, "* Your " + elem.attr('id') + " must only contain alphabet and be of at least two characters");
            allowsubmit = false;
          }

        }

        if (elem.attr('id') == 'lastname') {
          if (foundlastnameIssue(elem) == true) {
            showErrors(elem, "* Your " + elem.attr('id') + " must only contain alphabet, may contain a middle hyphen and be (each) of at least two characters"); //assumption is that no-one has a double-barrelled name like this; eg: ab-c
            allowsubmit = false;
          }
        }

        if (elem.attr('id') == 'ZHAN') {
          if (foundZHANIssue(elem) == true) {
            showErrors(elem, "* Your HA number should begin with ZHA followed by 6 digits");
            allowsubmit = false
          }
        }

        if (elem.attr('id') == 'tell') {
          if (foundTellssue(elem) == true) {
            showErrors(elem, "* Your telephone number should be of 11 digits long and no spaces");
            allowsubmit = false
          }
        }

      }

    })
	
    if (allowsubmit) {
      alert("Data OK. Submitting Form");
    }

    else {
      event.preventDefault();
    }

  })
})

function foundEmptyFields(elem) {//checks for empty fields
  var foundEmpty = false;
  if (elem.val() === "") {

    foundEmpty = true;
    showErrors(elem, "");

  }
  else {
    if (elem.next().attr('class') == 'errorVis') {
      hideErrors(elem);
    }
  }
  return foundEmpty;

}

function showErrors(elem, message) {//displays errors and adds error message
  if (elem.next().attr('class') != 'errorVis') {
    elem.next().attr('class', 'errorVis');
    if (elem.val() === "") {
      elem.next().append(message);
    }
    else {
      elem.next().html(message);
    }
  }
}

function hideErrors(elem) { //hides error message
  elem.next().attr('class', 'error');
}

function foundEmailIssue(elem) {//checks for email errors
  var emlregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;// http://www.ntu.edu.sg/home/ehchua/programming/howto/Regexe.html
  return !emlregex.test(elem.val());
}

function foundnameIssue(elem) {//checks for errors in entered name or lastname
  var fnamregex = /^[A-Za-z]{2,}$/;
  return !fnamregex.test(elem.val());
}

function foundlastnameIssue(elem) {
  var snamregex = /^([a-z A-Z]{2,})+(-([a-z A-Z]{2,})+)?$/;//https://stackoverflow.com/questions/15827051/i-allow-only-one-hyphen-in-regex;
  return !snamregex.test(elem.val());

}

function foundZHANIssue(elem) {//checks for issue in Zedland health authority field
  var zhanRegex = /^[ZHAzha]{3,3}[0-9]{6,6}$/;// http://www.ntu.edu.sg/home/ehchua/programming/howto/Regexe.html
  return !zhanRegex.test(elem.val());
}

function foundTellssue(elem) {//checks for error in telephone number entered 
  var tellregex = /^[0-9]{11,11}$/;// http://www.ntu.edu.sg/home/ehchua/programming/howto/Regexe.html
  return !tellregex.test(elem.val());

}