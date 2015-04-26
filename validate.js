// create the error report div element
var validate = function(formName, errorClass) {
	var inputFields = $("."+formName+" input");
	inputFields.each(function(){
		var inputType = $(this).attr('data-type'),
		length = $(this).attr('data-length'),
		minLength = $(this).attr('data-min-length'),
		nameMatch = /^[a-zA-Z\s]+$/,
		noscharMatch = /^[0-9a-zA-Z\s]+$/,
		emailMatch = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
		phoneMatch = /^[0-9]+$/;
		var errorHtml = "<span class='nameEr'></span><span class='noscharEr'></span><span class='emailEr'></span><span class='phoneEr'></span><span class='passEr'></span>";
		$("."+errorClass).html(errorHtml);
		//on key up function to match the characters on the run
		$(this).keyup(function() {
			if(inputType == 'name') {
				//if the input element is only alphabets
				var match = $(this).val().match(nameMatch);
				if(match == null) {
					$(".nameEr").html("Only Alphabets");
				} else {
					$(".nameEr").html("");
				}				
			} else if(inputType == 'noschar') {
				//if the input element is number as well as character
				var match = $(this).val().match(noscharMatch);
				if(match == null) {
					$(".noscharEr").html("Only Alphabets and Numbers");
				} else {
					$(".noscharEr").html("");
				}
			}
		});
		//blur function to match the characters when blurred to next line
		$(this).blur(function() {
			if(inputType == 'name') {
				//if the input element is only alphabets
				var match = $(this).val().match(nameMatch);
				if(match == null) {
					$(".nameEr").html("Only alphabets");
				} else if($(this).val().length <= minLength) {
					$(".nameEr").html("Name Length is too small")
				}else {
					$(".nameEr").html("");
				}
			} else if(inputType == 'noschar') {
				//if the input element is both alphabets and numbers
				var match = $(this).val().match(noscharMatch);
				if(match == null) {
					$(".noscharEr").html("Only Alphabets and Numbers");
				} else if($(this).val().length <= minLength) {
					$(".noscharEr").html("Length is too small")
				}else {
					$(".noscharEr").html("");
				}
			} else if(inputType == 'email') {
				//if the input element is email
				var match = $(this).val().match(emailMatch);
				if(match == null) {
					$(".emailEr").html("Not a valid email address");
				} else {
					$(".emailEr").html("");
				}
			} else if(inputType == 'phone' || inputType == 'number') {
				//if the input element is number
				var match = $(this).val().match(phoneMatch);
				if(match == null || $(this).val().length > length || $(this).val().length < length ) {
					$(".phoneEr").html("Not a valid Number");
				} else {
					$(".phoneEr").html("");
				}
			} else if(inputType == 'password') {
				//if the input element is password
				if($(this).val().length >= minLength) {
					$(".passEr").html("");
				} else {
					$(".passEr").html("Password Length is too small");
				}
			} else if(inputType == 'cpassword') {
				//if input element is confirm password
				var pwdVal = $("input[data-type=password]").val();
				if($(this).val() != pwdVal) {
					$(".passEr").html("Passwords Do Not Match");
				} else if($(this).val() == pwdVal && $(this).val().length <= minLength) {
					$(".passEr").html("Password Length is too small");
				} else {
					$(".passEr").html("");
				}				
			}

		});
		return true;
	});

//data-type= name -> only characters
//data-type= noschar -> characters and numbers
//data-type = email -> valid email address
//data-type= number -> only number with data-length
//data-type= phone -> only 10 digit phone number with data-length = value
//data-type= password -> password field with data-min-length = value
//data-type = cpassword -> check password field with the previous password field
}	
