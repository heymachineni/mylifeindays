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
</script>

<button
	id={event.start}
	on:click={handleSelect}
	class="is-event"
	class:has-description={!!event.desc}
	data-tooltip={formattedDate}
><Md inline content={event.name} /></button>

<style>
	button {
		display: inline;
		appearance: none;
		font-family: inherit;
		border: none;
		color: var(--color-text);
		font-size: 1rem;
		margin: 0;
	}

	.is-event {
		background-color: rgba(253, 39, 11, 0.08);
		padding: 0.5em 0.75em;
		border-radius: 12px;
		line-height: 1.4;
		position: relative;
		font-size: 0.9em;
		height: auto;
		display: inline-block;
		vertical-align: baseline;
		white-space: nowrap;
		word-break: keep-all;
		overflow-wrap: normal;
	}

	.is-event:hover {
		background-color: rgba(253, 39, 11, 0.12);
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
		border-radius: 8px;
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
