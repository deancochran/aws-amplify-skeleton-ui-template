<script lang="ts">
	import { onMount } from "svelte";
    import type { PageData } from "./$types";
    
</script>
<p>Settings Page</p>

<h1>Chang Password Here</h1>
<form method="POST" action="?/reset">
	<label>
		old pasword
		<input type="text" name="oldPassword" />
	</label>
    <label>
		new pasword
		<input type="text" name="newPassword" />
	</label>
	<button type="submit">send</button>
</form>

