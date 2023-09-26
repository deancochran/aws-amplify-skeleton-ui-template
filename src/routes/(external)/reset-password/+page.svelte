<script lang="ts">
	import type { SubmitFunction } from "@sveltejs/kit";
	import { getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";
	import { applyAction, enhance } from "$app/forms";
	
	const toastStore = getToastStore();

	const reset: SubmitFunction = ({ action, formData, form, formElement, controller, submitter }) => {
		return async ({ result }) => {
			// if (result.type === 'success') { /* ... */ }
			// if (result.type === 'failure') { /* ... */ }
			if (result.type === 'redirect') { 
				const t: ToastSettings = {
					message: 'Your password was successfully reset',
					timeout: 10000
				};
				toastStore.trigger(t);
				await applyAction(result)
			}
			if (result.type === 'error') { 
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
<h1>Resend code here</h1>
<form method="POST" action="?/reset" use:enhance={reset}>
	
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
	<button type="submit">send</button>
</form>
<a href="/forgot-password">Didn't Receive a Code </a>