<script lang="ts">
	import type { SubmitFunction } from "@sveltejs/kit";
	import { getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";
	import { applyAction, enhance } from "$app/forms";
	
	const toastStore = getToastStore();

	const forgot: SubmitFunction = ({ action, formData, form, formElement, controller, submitter }) => {
		return async ({ result }) => {
			// if (result.type === 'success') { /* ... */ }
			// if (result.type === 'failure') { /* ... */ }
			if (result.type === 'redirect') { 
				const t: ToastSettings = {
					message: 'Information was sent to your email to reset your password',
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
<h1>forgot your password? Resend code here</h1>
<form method="POST" action="?/forgot" use:enhance={forgot}>
	<label>
		Username
		<input type="text" name="username" />
	</label>
	<button type="submit">send</button>
</form>
