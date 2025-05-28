<script lang="ts">
	import type { RenderableEvent } from '../routes/types';
	import Md from './md.svelte';

	export let day: RenderableEvent | undefined;
	export let date: Date | undefined;

	// Format date as "May 22nd, 1998"
	$: title = day && date ? (() => {
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 
						'July', 'August', 'September', 'October', 'November', 'December'];
		const day_num = date.getDate();
		const month = months[date.getMonth()];
		const year = date.getFullYear();
		
		// Add ordinal suffix (st, nd, rd, th)
		const getOrdinal = (n: number) => {
			const s = ["th", "st", "nd", "rd"];
			const v = n % 100;
			return n + (s[(v - 20) % 10] || s[v] || s[0]);
		};
		
		return `${month} ${getOrdinal(day_num)}, ${year}`;
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
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 1000;
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		padding: 20px;
	}

	aside {
		background-color: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		max-width: 600px;
		width: 100%;
		max-height: 85vh;
		border-radius: 20px;
		box-shadow: 
			0 25px 50px -12px rgba(0, 0, 0, 0.25),
			0 0 0 1px rgba(255, 255, 255, 0.1);
		animation: modalSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
		display: flex;
		flex-direction: column;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}
	
	.header {
		padding: 24px 24px 20px 24px;
		background: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
	}

	h2 {
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0;
		color: var(--color-link);
		letter-spacing: -0.02em;
		line-height: 1.3;
	}
	
	.content {
		overflow-y: auto;
		padding: 24px;
		line-height: 1.6;
		flex: 1;
	}

	.content :global(.md-content p) {
		margin: 0 0 16px 0;
		color: var(--color-text);
		font-size: 1rem;
		line-height: 1.6;
	}

	.content :global(.md-content p:last-child) {
		margin-bottom: 0;
	}

	/* Custom scrollbar for webkit browsers */
	.content::-webkit-scrollbar {
		width: 6px;
	}

	.content::-webkit-scrollbar-track {
		background: transparent;
	}

	.content::-webkit-scrollbar-thumb {
		background: rgba(0, 0, 0, 0.2);
		border-radius: 3px;
	}

	.content::-webkit-scrollbar-thumb:hover {
		background: rgba(0, 0, 0, 0.3);
	}
	
	@keyframes modalSlideIn {
		from {
			opacity: 0;
			transform: translateY(20px) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	/* Mobile responsiveness */
	@media (max-width: 640px) {
		.overlay {
			padding: 16px;
		}
		
		aside {
			border-radius: 16px;
			max-height: 90vh;
		}
		
		.header {
			padding: 20px 20px 16px 20px;
		}
		
		.content {
			padding: 20px;
		}
		
		h2 {
			font-size: 1.25rem;
		}
	}
</style>
