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
</script>

<button
	id={event.start}
	on:click={handleSelect}
	class="is-event"
	class:has-description={!!event.desc}
	data-tooltip={event.start}
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
		background-color: rgba(253, 39, 11, 0.1);
		padding: 0.25em 1ch 0.4em;
		position: relative;
		top: -0.1em;
		border-radius: 0.25rem;
		line-height: 1;
		transition: background-color 0.2s;
		position: relative;
	}

	.is-event:hover {
		background-color: rgba(253, 39, 11, 0.3);
	}
	
	.is-event:hover::after {
		content: attr(data-tooltip);
		position: absolute;
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%);
		background-color: var(--color-bg);
		color: var(--color-text);
		padding: 0.25em 0.5em;
		border-radius: 0.25rem;
		font-size: 0.85em;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
		white-space: nowrap;
		margin-bottom: 5px;
		z-index: 100;
		border: 1px solid rgba(253, 39, 11, 0.2);
	}

	.is-event:not(.has-description) {
		pointer-events: none;
	}
	.is-event.has-description {
		text-decoration: underline;
		cursor: pointer;
	}
</style>
