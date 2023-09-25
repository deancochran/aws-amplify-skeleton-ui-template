<script lang="ts">
	function confirmEmailModal(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement; }) {
		throw new Error("Function not implemented.");
	}
</script>
<br/>
<h1>Settings Page</h1>
<br/>

<h1>Change Password Here</h1>
<form method="POST" action="?/resetPwd">
	<label>
		old pasword
		<input type="text" name="oldPassword" />
	</label>
    <label>
		new pasword
		<input type="text" name="newPassword" />
	</label>
	<button type="submit">send</button>
</form>

<h1>Change Email Here</h1>
<form method="POST" action="?/resetEmail" on:submit={confirmEmailModal}>
    <label>
		new email
		<input type="email" name="newEmail" />
	</label>
	<button type="submit">send</button>
</form>
