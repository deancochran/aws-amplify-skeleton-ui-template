<script lang="ts">
	import '../app.postcss';
	import PageTransition from '$lib/components/ComponentTransition.svelte';
	export let data;
	import { page } from "$app/stores";
</script>


<nav>
	{#if !$page.data.user}
	<a href="/">Home</a>
	<a href="/login">Login</a>
	<a href="/register">Register</a>
	{:else}
		<a href="/">Home</a>
		<a href="/settings">settings</a>
		<a data-sveltekit-preload-data="false" href="/logout">logout</a>
	{/if}
</nav>

<PageTransition bind:key={data.url_pathname}>
	<slot />
</PageTransition>
