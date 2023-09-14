<script lang="ts">
	import type { PageData } from "./$types";

    export let data:PageData
</script>
{#if data.user}
    <p>Welcome {data.user.username}</p>
{:else}
    <p>Welcome Alien</p>
{/if}