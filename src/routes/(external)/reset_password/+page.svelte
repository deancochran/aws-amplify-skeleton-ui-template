<h1>Resend code here</h1>
<form method="POST" action="?/reset">
	
	<label>
		Username
		<input type="text" name="username" />
	</label>
    <label>
		Code
		<input type="text" name="code" />
	</label>
    <label>
		new pasword
		<input type="text" name="newPassword" />
	</label>
	<br/>
	<a href="/forgot_password/">Didn't Receive a Code </a>
	<button type="submit">send</button>
</form>