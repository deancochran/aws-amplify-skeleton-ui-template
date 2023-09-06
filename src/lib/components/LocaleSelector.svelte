<script lang="ts">
    import { Locale, locale } from "$lib/stores/locale";
	import { get } from "svelte/store";
	import PageTransition from "./ComponentTransition.svelte";
	import ComponentTransition from "./ComponentTransition.svelte";
    import{ invalidate } from "$app/navigation";
    let currentLocal = get(locale)
    locale.subscribe((val:Locale)=>{
        currentLocal=val
    })
    async function onSelect(selectedLocale:Locale){
        locale.set(selectedLocale)   
        
    }

</script>



<div>
    <ComponentTransition bind:key={currentLocal} on:outroend on:introstart>
        <p>{currentLocal}</p>
    </ComponentTransition>
    <button type="button" on:click={()=>onSelect(Locale.ENGLISH)}>English</button>
    <button type="button" on:click={()=>onSelect(Locale.GERMAN)}>German</button>

</div>

