<script lang="ts">
	import type { RenderableEvent } from '../routes/types';
	import Md from './md.svelte';

	export let day: RenderableEvent | undefined;
	export let date: Date | undefined;

	// Format date as DD-MM-YYYY
	$: title = day && date ? (() => {
		const day_num = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();
		return `${day_num}-${month}-${year}`;
	})() : '';
</script>

{#if day && day.desc}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<div
		class="overlay"
		on:click={() => ((day = undefined), (date = undefined))}
		role="dialog"
		aria-modal="true"
	>
		<aside on:click={(e) => e.stopPropagation()}>
			<div class="header">
			<h2>{title}</h2>
				<button class="close-btn" on:click={() => ((day = undefined), (date = undefined))}>×</button>
			</div>
			
			<div class="content">
			<Md content={day.desc} />
			</div>
		</aside>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1000;
		backdrop-filter: blur(2px);
	}

	aside {
		background-color: var(--color-bg);
		max-width: 640px;
		width: 90%;
		max-height: 80vh;
		padding: 1.5rem;
		border-radius: 0.5rem;
		box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
		animation: fadeIn 0.2s ease-out;
		display: flex;
		flex-direction: column;
	}
	
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.25rem;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid rgba(253, 39, 11, 0.1);
	}

	h2 {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0;
		color: var(--color-link);
	}
	
	.close-btn {
		background: none;
		border: none;
		font-size: 1.5rem;
		color: var(--color-text);
		cursor: pointer;
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		transition: background-color 0.2s;
		margin-left: 1rem;
	}

	.close-btn:hover {
		background-color: rgba(253, 39, 11, 0.1);
	}
	
	.content {
		overflow-y: auto;
		line-height: 1.6;
		padding-right: 0.5rem;
	}
	
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
