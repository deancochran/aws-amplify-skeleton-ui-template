<script lang="ts">
	import { fade } from 'svelte/transition';
	export let key: string;
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher()
</script>

{#key key}
	<div class="w-auto h-auto" in:fade={{ duration: 300, delay: 400 }} out:fade={{ duration: 300 }} on:introstart={()=>dispatch('introstart')} on:outroend={()=>dispatch('outroend')}>
		<slot />
	</div>
{/key}
