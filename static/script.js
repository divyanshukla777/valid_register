$(function() {
    $("#name_error_message").hide();
    $("#username_error_message").hide();
	$("#password_error_message").hide();
	$("#retype_password_error_message").hide();
	$("#email_error_message").hide();
	$("AboutMe_error_message").hide();
	
	var error_name=false;
	var error_username = false;
	var error_password = false;
	var error_retype_password = false;
	var error_email = false;
	var error_AboutMe = false;

	$("#name").keyup(function() {

		check_name();

	});


	$("#username").keyup(function() {

		check_username();
		
	});

	$("#check").click(function(){
		user_avilable();
	})

	$("#password").keyup(function() {

		check_password();
		
	});

	$("#confirm_password").keyup(function() {

		check_retype_password();
		
	});

	$("#email").keyup(function() {

		check_email();
		
	});

	$("#AboutMe").keyup(function(){
		check_about();
	});

	function check_name(){
		var name=$("#name").val();
		var letters=/^[A-Za-z ]*$/;
		var name_length=$("#name").val().length;
		if(name.match(letters)&& (name_length>=3&&name_length<=50))
		{
			$('#name_error_message').hide();
		}
		else
		{
			$('#name_error_message').show();
			error_name=true;
		}
		//name.replace(/\w\S*/g,function(txt){return txt.charAt(0).toUpperCase()+txt.substr(1).toLowerCase();});
	}

	function check_username() {
		
		var username=$("#username").val();
		var username_length = $("#username").val().length;
		var user= /^[A-Za-z]\w{4,15}$/;
		if(!(username.match(user))) {
			//$("#username_error_message").html("Should be between 5-20 characters");
			$("#username_error_message").show();
			error_username = true;
		} else {
			$("#username_error_message").hide();
		}
	
	}

	function user_avilable(){
	 
		var username=$("#username").val();
		let data={};
		data.Username=username;
		//alert(username);
		$.ajax({
			url:"/check_user",
			method: "POST",
			data: JSON.stringify(data),
			contentType:'application/json',
			success: function (response) {
				if(response){
					document.getElementById('avail').innerHTML="Available";
					status=true;
					}
					else
					{
						document.getElementById('avail').innerHTML="Not Available";
						status=false;
					}
			}
		});
		return status;
	}

	function check_password() {
	
		var password = $("#password").val();
		var dec=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
		if(password.match(dec)) {
			$("#password_error_message").hide();
			$("password").css("color","green");
		} else {
			//$("#password_error_message").html("At least 8 characters");
			$("#password_error_message").show();
			error_password = true;
		}
	
	}

	function check_retype_password() {
	
		var password = $("#password").val();
		var retype_password = $("#confirm_password").val();
		
		if(password !=  retype_password) {
			//$("#retype_password_error_message").html("Passwords don't match");
			$("#retype_password_error_message").show();
			error_retype_password = true;
			$("confirm_password").css("color","red");
		} else {
			$("#retype_password_error_message").hide();
			$("confirm_password").css("color","green");
		}
	
	}

	function check_email() {

		var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
	
		if(pattern.test($("#email").val())) {
			$("#email_error_message").hide();
		} else {
			$("#email_error_message").html("Invalid email address");
			$("#email_error_message").show();
			error_email = true;
		}
	
	}

	function check_about(){
		var about_length=$("#AboutMe").val().length;
		if(about_length<1 && about_length>100)
		{
			$("AboutMe_error_message").show();
			error_AboutMe=false;
		}
		else
		{
			$("AboutMe_error_message").hide();
		}
	}

	$("#form").submit(function() {
											
		error_username = false;
		error_password = false;
		error_retype_password = false;
		error_email = false;
		error_name=false;
		error_AboutMe=false;
		
		check_name();
		check_username();
		check_password();
		check_retype_password();
		check_email();
		check_about();
		
		if(error_name=false && error_username == false && error_password == false && error_retype_password == false && error_email == false && error_AboutMe==false) {
			return true;
		} else {
			return false;	
		}

	});

});