<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
	import type { SubmitFunction } from "@sveltejs/kit";
	import { getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";
	const toastStore = getToastStore();
	const register: SubmitFunction = ({ action, formData, formElement, controller, submitter }) => {
		return async ({ result }) => {
			// if (result.type === 'success') { /* ... */ }
			// if (result.type === 'failure') { /* ... */ }
			if (result.type === 'redirect') { 
				const t: ToastSettings = {
					message: `Successfully Sent Confirmation Code to ${formData.get('email')}`,
					timeout: 10000
				};
				toastStore.trigger(t);
				await applyAction(result)
			}
			if (result.type === 'error') { 
				console.log(result)
				const t: ToastSettings = {
				message: `${result.error.message}`,
				timeout: 10000,
				classes:`bg-error-500`
				};
				toastStore.trigger(t);
			}
		}
	}
</script>

<h1>Register</h1>
<form method="POST" action="?/register" use:enhance={register}>
	<label>
		Username
		<input type="text" name="username" />
	</label>
	<label>
		Email
		<input name="email" type="email" />
	</label>
	<label>
		Password
		<input name="password" type="password" />
	</label>
	<label>
		Verify Password
		<input name="val-password" type="password" />
	</label>
	<button type="submit">Register</button>
</form>
