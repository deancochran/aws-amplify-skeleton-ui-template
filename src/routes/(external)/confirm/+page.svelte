<script lang="ts">
	import { Auth } from "aws-amplify";
    import { resendSignUp } from "$lib/utils/auth";

</script>
<h1>confirm</h1>
<form method="POST" action="?/confirm">
	<label>
		Username
		<input type="text" name="username" />
	</label>
	<label>
		Code
		<input type="number" name="code" />
	</label>

	<button type="submit">Confirm</button>
</form>

<h1>Didn't get the code? Resend code here</h1>
<form method="POST" action="?/resend">
	<label>
		Username
		<input type="text" name="username" />
	</label>
	<button type="submit">Confirm</button>
</form>
