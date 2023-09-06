<script>

	import { page } from "$app/stores";

</script>

  
{#if $page.data.user}
<p>Welcome {$page.data.user.name}!</p>
{:else}
<p>NO USER FOUND ERROR!</p>
{/if}
