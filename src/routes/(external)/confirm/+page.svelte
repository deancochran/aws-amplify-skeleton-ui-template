<script lang="ts">

import { applyAction, enhance } from "$app/forms";
	import type { SubmitFunction } from "@sveltejs/kit";
	import { getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";
	const toastStore = getToastStore();
	const confirm: SubmitFunction = ({ action, formData, form, formElement, controller, submitter }) => {
		// do something before the form submits

		return async ({ result }) => {
			// do something after the form submits

			if (result.type === 'success') {
			// do something...
			const t: ToastSettings = {
				message: 'This message will auto-hide after 10 seconds.',
				timeout: 10000
			};
			toastStore.trigger(t);

			// use the default behavior for this result type
			await applyAction(result)
			}

			if (result.type === 'failure') { /* ... */ }

			if (result.type === 'redirect') { /* ... */ }

			if (result.type === 'error') { /* ... */ }
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
<form method="POST" action="?/resend" use:enhance>
	<label>
		Username
		<input type="text" name="username" />
	</label>
	<button type="submit">Confirm</button>
</form>
