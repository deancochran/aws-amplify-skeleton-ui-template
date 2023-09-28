<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex flex-col items-center justify-center align-middle w-screen h-screen">
	<div class="card rounded-md drop-shadow-2xl shadow-2xl min-h-fit sm:w-fit md:w-2/3  max-w-screen h-fit">
		<!-- <header class="card-header">(header)</header> -->
		<section class="flex flex-col p-16 items-center justify-center align-middle">
			{#if $page.data.user}
				<p class="font-semibold font-serif text-5xl text-center">
					Welcome {$page.data.user.username}!
				</p>
			{:else}
				<p class="font-semibold font-serif text-5xl text-center">Welcome!</p>
			{/if}
			<br />
			<p>
				The Skeleton UI and AWS Amplify template, is a modern web application template
				that offers a seamless and engaging user experience while harnessing the power of AWS
				Amplify for backend Authentication, API, DataStorage, and more.
			</p>
			<br />

			<br />
			<div class="flex gap-3 text-3xl font-semibold">
				<span class="flex-auto bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone">Fast.</span>
				<span class="flex-auto bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone">Customizable.</span>
				<span class="flex-auto bg-gradient-to-br from-pink-500 to-violet-500 bg-clip-text text-transparent box-decoration-clone">Cloud Ready.</span>
			</div>
		</section>
		<!-- <footer class="card-footer">(footer)</footer> -->
	</div>
</div>
