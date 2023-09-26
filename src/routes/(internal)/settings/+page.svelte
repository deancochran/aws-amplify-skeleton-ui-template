<script lang="ts">
	import {getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import type {
		ModalSettings,
		ToastSettings
	} from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	const toastStore = getToastStore();
	const modalStore = getModalStore();

	async function handleDeleteUser() {
		try {
			const response = await fetch('/settings', { method: 'DELETE' });
			const t: ToastSettings = {
				message: 'Your account was successfully deleted',
				timeout: 10000
			};
			toastStore.trigger(t);
			goto('/')
		} catch (err) {
			const t: ToastSettings = { message: `${err}`, timeout: 10000, classes: `bg-error-500` };
			toastStore.trigger(t);
		}
	}
	async function showConfirmation() {
		const modal: ModalSettings = {
			type: 'confirm',
			// Data
			title: 'Please Confirm',
			body: 'Are you sure you wish to delete your account?',
			// TRUE if confirm pressed, FALSE if cancel pressed
			response: async (r: boolean) => {
				if (r == true) {
					await handleDeleteUser();
				}
			}
		};
		modalStore.trigger(modal);
	}

	function confirmEmailModal(
		event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
	) {
		throw new Error('Function not implemented.');
	}
</script>

<br />
<h1>Settings Page</h1>
<br />

<h1>Change Password Here</h1>
<form method="POST" action="?/resetPwd">
	<label>
		old password
		<input type="text" name="oldPassword" />
	</label>
	<label>
		new password
		<input type="text" name="newPassword" />
	</label>
	<button type="submit">send</button>
</form>

<br />

<h1>Change Email Here</h1>
<form method="POST" action="?/resetEmail">
	<label>
		new email
		<input type="email" name="newEmail" />
	</label>
	<button type="submit">send</button>
</form>

<br />

<button type="button" on:click={showConfirmation}>Delete Account</button>
