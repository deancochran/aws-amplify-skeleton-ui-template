<script lang="ts">
	import '../app.postcss';
	import PageTransition from '$lib/components/ComponentTransition.svelte';
	import { page } from '$app/stores';
	import {
		AppBar,
		AppShell,
		LightSwitch,
		Modal,
		Toast,
		initializeStores
	} from '@skeletonlabs/skeleton';

	export let data;

	initializeStores();
</script>

<Modal />
<Toast />

<AppShell>
	<svelte:fragment slot="header">
		<nav />
		<AppBar
			shadow="shadow-lg"
			gridColumns="grid-cols-5"
			slotLead="col-span-2"
			slotTrail="col-span-2 items-center justify-evenly align-middle"
		>
			<svelte:fragment slot="lead">
				<a href="/"><h1 class="font-serif text-3xl">Skeleton UI. Amplify.</h1></a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div class="w-full h-full grid grid-cols-3">
					<div class="col-span-2 flex flex-row gap-4 items-center justify-evenly align-bottom">
						{#if !$page.data.user}
							<a href="/login">Login</a>
							<a href="/register">Register</a>
						{:else}
							<a href="/settings">settings</a>
							<a data-sveltekit-preload-data="off" href="/logout">logout</a>
						{/if}
					</div>
					<div class="col-span-1 flex flex-row gap-4 items-center justify-center align-bottom">
						<div class="w-auto h-auto">
							<LightSwitch />
						</div>
					</div>
				</div>
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
		<AppBar
			gridColumns="grid-cols-5"
			slotLead="col-span-2 items-center justify-evenly align-middle"
			slotTrail="col-span-2 items-center justify-evenly align-middle"
		>
			<svelte:fragment slot="lead">(icon)</svelte:fragment>
			<svelte:fragment slot="trail">(trail)</svelte:fragment>
		</AppBar>
	</svelte:fragment>
</AppShell>
