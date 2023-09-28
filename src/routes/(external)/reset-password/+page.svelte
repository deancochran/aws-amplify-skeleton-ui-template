<script lang="ts">
	import type { SubmitFunction } from "@sveltejs/kit";
	import { getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";
	import { applyAction, enhance } from "$app/forms";
	
	let loading=false
	const toastStore = getToastStore();

	const reset: SubmitFunction = ({ action, formData, form, formElement, controller, submitter }) => {
		loading=true
		return async ({ result }) => {
			// if (result.type === 'success') { /* ... */ }
			// if (result.type === 'failure') { /* ... */ }
			if (result.type === 'redirect') { 
				const t: ToastSettings = {
					message: 'Your password was successfully reset',
					timeout: 10000
				};
				toastStore.trigger(t);
				loading=false
				await applyAction(result)
			}
			if (result.type === 'error') { 
				const t: ToastSettings = {
				message: `${result.error.message}`,
				timeout: 10000,
				classes:`bg-error-500`
				};
				toastStore.trigger(t);
				loading=false
			}
		}
	}
</script>

<div class="flex flex-col items-center justify-center align-middle w-screen h-screen">
	<div
		class="card rounded-md drop-shadow-2xl shadow-2xl min-h-fit sm:w-fit md:w-2/3 max-w-screen h-fit"
	>
		<header class="card-header">
			<h1 class="text-4xl text-center font-serif">Reset Your Password</h1>
		</header>
		<section class="relative flex flex-col p-10 w-full items-center justify-center align-middle">
			<form class="h-full w-full md:w-2/4" method="POST" action="?/reset" use:enhance={reset}>
				<!-- <label>
					Email
					<input name="email" type="email">
				</label>   -->
				<div class="grid grid-cols-1 gap-0">
					<label class="label w-full">
						<!-- <span>Username</span> -->
						<input class="input pl-2 p-1" name="username" type="text" placeholder="Username" />
					</label>

					<label class="label w-full">
						<!-- <span>Username</span> -->
						<input class="input pl-2 p-1" name="code" type="number" placeholder="Code" />
					</label>

					<label class="label w-full">
						<!-- <span>Username</span> -->
						<input class="input pl-2 p-1" name="newPassword" type="password" placeholder="New Password" />
					</label>

				</div>
				<br />
				<div class="flex flex-row gap-4 ">
					<a
					class="font-semibold text-primary-500 transition-colors duration-300 ease-in-out hover:text-primary-400"
					href="/forgot-password"
					>Didn't Receive a Code?
					</a>
				</div>
				<br />
				<button 
				disabled={loading}
				type="submit"
				class="btn w-full variant-ghost-primary transition-colors duration-300 ease-in-out" 
				class:variant-filled-primary={!loading}
				class:variant-ghost-primary={loading}
				>Resend Code</button>
			</form>
			
		</section>
		<!-- <footer class="card-footer text-center">
			
		</footer> -->
	</div>
</div>