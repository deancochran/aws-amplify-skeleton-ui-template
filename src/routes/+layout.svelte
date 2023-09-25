<script lang="ts">
	import '../app.postcss';
	import PageTransition from '$lib/components/ComponentTransition.svelte';
	export let data;
	import { page } from "$app/stores";
	import { AppBar, AppShell, LightSwitch, Modal, Toast, initializeStores } from '@skeletonlabs/skeleton';

	initializeStores();

</script>

<Modal />
<Toast />

<AppShell>
	<svelte:fragment slot="header">
		<nav>
			
		</nav>
		<AppBar gridColumns="grid-cols-5" slotLead="col-span-2" slotTrail="col-span-2 items-center justify-evenly align-middle">
			<svelte:fragment slot="lead">
				<h1 class="font-serif text-3xl">Svelte. Skeleton. Amplify.</h1>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if !$page.data.user}
					<a href="/">Home</a>
					<a href="/login">Login</a>
					<a href="/register">Register</a>
				{:else}
					<a href="/">Home</a>
					<a href="/settings">settings</a>
					<a data-sveltekit-preload-data="off" href="/logout">logout</a>
				{/if}
				<LightSwitch/>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- <svelte:fragment slot="sidebarLeft">Sidebar Left</svelte:fragment> -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<PageTransition bind:key={data.url_pathname}>
		<slot />
	</PageTransition>
	<!-- ---- / ---- -->
	<!-- <svelte:fragment slot="pageFooter">
		Page Footer
	</svelte:fragment> -->
	<!-- (footer) -->
	<svelte:fragment slot="footer">
		<AppBar gridColumns="grid-cols-5" slotLead="col-span-2 items-center justify-evenly align-middle" slotTrail="col-span-2 items-center justify-evenly align-middle">
			<svelte:fragment slot="lead">
				(icon)
			</svelte:fragment>
			<svelte:fragment slot="trail">
				(trail)
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
</AppShell>





