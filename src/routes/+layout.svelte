<script lang="ts">
	import '../app.postcss';
	import PageTransition from '$lib/components/ComponentTransition.svelte';
	export let data;
	import { page } from "$app/stores";
	import { handleLogout } from '$lib/utils/auth';
</script>


<nav>
	{#if !$page.data.user}
		<a href="/">Home</a>
		<a href="/login">Login</a>
		<a href="/confirm">confirm</a>
		<a href="/register">Register</a>
	{/if}

	{#if $page.data.user}
		<a href="/blog">blog</a>
		<button type="button" on:click={handleLogout}>Logout</button>
	{/if}
</nav>

<PageTransition bind:key={data.url_pathname}>
	<slot />
</PageTransition>
