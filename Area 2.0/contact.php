<?php
$field_name = $_POST['cf_name'];
$field_email = $_POST['cf_email'];
$field_message = $_POST['cf_message'];

$mail_to = 'robertominghi@msn.com';
$subject = 'Message from Area 2.0 Site'.$field_name;

$body_message = 'From: '.$field_name."\n";
$body_message .= 'E-mail: '.$field_email."\n";
$body_message .= 'Message: '.$field_message;

$headers = 'From: '.$field_email."\r\n";
$headers .= 'Reply-To: '.$field_email."\r\n";

$mail_status = mail($mail_to, $subject, $body_message, $headers);

if ($mail_status) { ?>
	<script language="javascript" type="text/javascript">
		alert('Thank you for your message. We will contact you as soon as possible.');
		window.location = 'contact_us.html';
	</script>
<?php
}
else { ?>
	<script language="javascript" type="text/javascript">
		alert('Message failed. Please, send an email to robertominghi@msn.com');
		window.location = 'contact_us.html';
	</script>
<?php
}
?>