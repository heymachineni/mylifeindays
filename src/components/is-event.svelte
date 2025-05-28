<script lang="ts">
	import type { RenderableEvent } from '../routes/types';

	export let event: RenderableEvent;
	import { createEventDispatcher } from 'svelte';
	import Md from './md.svelte';
	import { trackEvent } from '../trackEvent';
	const dispatch = createEventDispatcher<{
		select: RenderableEvent;
	}>();
	const handleSelect = () => {
		if (event.desc) {
		dispatch('select', event);
		trackEvent(`select:${event.name}`);
		}
	};
	
	// Format date as DD-MM-YYYY for tooltip
	$: formattedDate = event.start ? (() => {
		const [year, month, day] = event.start.split('-');
		return `${day}-${month}-${year}`;
	})() : '';
	
	// Sophisticated pastel color assignment based on event content
	$: eventColorIndex = (() => {
		if (!event.name) return 0;
		// Create a simple hash from the event name for consistent color assignment
		let hash = 0;
		for (let i = 0; i < event.name.length; i++) {
			const char = event.name.charCodeAt(i);
			hash = ((hash << 5) - hash) + char;
			hash = hash & hash; // Convert to 32-bit integer
		}
		return Math.abs(hash) % 6; // 6 different pastel colors
	})();
</script>

<button
	id={event.start}
	on:click={handleSelect}
	class="is-event"
	class:has-description={!!event.desc}
	class:color-0={eventColorIndex === 0}
	class:color-1={eventColorIndex === 1}
	class:color-2={eventColorIndex === 2}
	class:color-3={eventColorIndex === 3}
	class:color-4={eventColorIndex === 4}
	class:color-5={eventColorIndex === 5}
	data-tooltip={formattedDate}
><Md inline content={event.name} /></button>

<style>
	/* Sophisticated pastel color palette for events */
	:root {
		/* Soft, sophisticated pastels that work well together */
		--pastel-blue: rgba(173, 216, 230, 0.12);
		--pastel-blue-hover: rgba(173, 216, 230, 0.2);
		
		--pastel-green: rgba(144, 238, 144, 0.12);
		--pastel-green-hover: rgba(144, 238, 144, 0.2);
		
		--pastel-purple: rgba(221, 160, 221, 0.12);
		--pastel-purple-hover: rgba(221, 160, 221, 0.2);
		
		--pastel-orange: rgba(255, 218, 185, 0.12);
		--pastel-orange-hover: rgba(255, 218, 185, 0.2);
		
		--pastel-yellow: rgba(255, 255, 224, 0.15);
		--pastel-yellow-hover: rgba(255, 255, 224, 0.25);
		
		--pastel-coral: rgba(255, 182, 193, 0.12);
		--pastel-coral-hover: rgba(255, 182, 193, 0.2);
	}

	button {
		display: inline;
		appearance: none;
		font-family: inherit;
		border: none;
		color: var(--color-text);
		font-size: 0.9em;
		margin: 0;
	}

	.is-event {
		background-color: var(--pastel-blue);
		padding: 0.5em 0.75em;
		border-radius: 50px;
		line-height: 1.4;
		position: relative;
		font-size: 0.9em;
		height: auto;
		display: inline-block;
		vertical-align: baseline;
		white-space: nowrap;
		word-break: keep-all;
		overflow-wrap: normal;
		transition: background-color 0.15s ease;
	}

	/* Color variations for events */
	.is-event.color-0 {
		background-color: var(--pastel-blue);
	}
	.is-event.color-0:hover {
		background-color: var(--pastel-blue-hover);
	}

	.is-event.color-1 {
		background-color: var(--pastel-green);
	}
	.is-event.color-1:hover {
		background-color: var(--pastel-green-hover);
	}

	.is-event.color-2 {
		background-color: var(--pastel-purple);
	}
	.is-event.color-2:hover {
		background-color: var(--pastel-purple-hover);
	}

	.is-event.color-3 {
		background-color: var(--pastel-orange);
	}
	.is-event.color-3:hover {
		background-color: var(--pastel-orange-hover);
	}

	.is-event.color-4 {
		background-color: var(--pastel-yellow);
	}
	.is-event.color-4:hover {
		background-color: var(--pastel-yellow-hover);
	}

	.is-event.color-5 {
		background-color: var(--pastel-coral);
	}
	.is-event.color-5:hover {
		background-color: var(--pastel-coral-hover);
	}
	
	.is-event:hover::after {
		content: attr(data-tooltip);
		position: absolute;
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%);
		background-color: rgba(0, 0, 0, 0.85);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		color: white;
		padding: 0.5em 0.75em;
		border-radius: 50px;
		font-size: 0.85em;
		white-space: nowrap;
		margin-bottom: 8px;
		z-index: 100;
		animation: tooltipFadeIn 0.2s ease-out;
	}

	.is-event:not(.has-description) {
		pointer-events: none;
	}
	
	.is-event.has-description {
		cursor: pointer;
	}

	@keyframes tooltipFadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
