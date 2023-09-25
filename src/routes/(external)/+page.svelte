<script lang="ts">
	import { page } from "$app/stores";
    
</script>
{#if $page.data.user}
    <p>Welcome {$page.data.user.username}</p>
{:else}
    <p>Welcome Alien</p>
{/if}