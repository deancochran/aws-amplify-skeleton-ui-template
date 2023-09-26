<script lang="ts">
	import { applyAction, enhance } from "$app/forms";
	import type { SubmitFunction } from "@sveltejs/kit";
	import { getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";

	const toastStore = getToastStore();

	const confirm: SubmitFunction = ({ action, formData, form, formElement, controller, submitter }) => {
		return async ({ result }) => {
			// if (result.type === 'success') { /* ... */ }
			// if (result.type === 'failure') { /* ... */ }
			if (result.type === 'redirect') { 
				const t: ToastSettings = {
					message: 'You have successfully confirmed your account',
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
	const resend: SubmitFunction = ({ action, formData, form, formElement, controller, submitter }) => {
		return async ({ result }) => {
			// if (result.type === 'redirect') { /* ... */ }
			// if (result.type === 'failure') { /* ... */ }
			if (result.type === 'success') { 
				const t: ToastSettings = {
					message: 'A code confirmation code was sent to email',
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
<h1>confirm</h1>
<form method="POST" action="?/confirm" use:enhance={confirm}>
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

<br/>

<h1>Didn't get the code? Resend code here</h1>
<form method="POST" action="?/resend" use:enhance={resend}>
	<label>
		Username
		<input type="text" name="username" />
	</label>
	<button type="submit">Confirm</button>
</form>
