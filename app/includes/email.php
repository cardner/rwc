<?php
session_start();
	if (isset($_POST['securityCode'])) {
					// Set incoming variables
						$fullname = strip_tags($_POST['name']);
						$em = strip_tags($_POST['email']);
						$reason = strip_tags($_POST['reason']);
						date_default_timezone_set('UTC');
						$timestamp = date('l jS \of F Y h:i:s A');

					//Set header variables
						$to_email = "sayhello@ryanwillcard.codes";
						$from_email = "Ryan the website <sayhello@ryanwillcard.codes>";

					//Process and send email
						$email_subject = "RKC General Contact";
    				//Begin compiling custom template email code
	  					$email_body = file_get_contents('contact.htm');
	  					$email_body = preg_replace("#name#", $fullname, $email_body);
							$email_body = preg_replace("#email#", $em, $email_body);
							$email_body = preg_replace("#reason#", $reason, $email_body);
							$email_body = preg_replace("#timestamp#", $timestamp, $email_body);
					//End email template
					//Set header content time
						$headers  = 'MIME-Version: 1.0' . "\r\n";
						$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
						$headers = "From: $from_email \r\n";
						$headers .= "Reply-To: $from_email \r\n";
						//Send the email!
						if(mail($to_email, $email_subject, $email_body, $headers)) {
				    	echo "E-Mail Sent \r\n";
						} else {
							echo "There was a problem \r\n";
							$errorCode = header('HTTP/1.1 500 Internal Server Booboo');
							return $errorCode;
						}

					//Begin connection to database
				} else {
					echo "Bad Security Code";
					$errorCode = header('HTTP/1.1 500 Internal Server Booboo');
					return $errorCode;
				}
session_destroy();
?>
