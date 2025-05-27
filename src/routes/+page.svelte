<script lang="ts">
	import { browser } from '$app/environment';

	import Description from '../components/description.svelte';
	import EndOfContent from '../components/end-of-content.svelte';
	import Header from '../components/header.svelte';
	import IsEvent from '../components/is-event.svelte';
	import IsLife from '../components/is-life.svelte';
	import IsMarker from '../components/is-marker.svelte';
	import { calculateDays } from './calculate-days';
	import type { RenderableDay, RenderableEvent } from './types';

	// TODO: always start 2 weeks before the first entry
	const startDate = new Date('1997-01-01');
	// Use India/Mumbai timezone for today
	const today = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
	const endDate = new Date('2100-12-31');

	export let data;
	const renderableDays: RenderableDay[] = calculateDays({
		from: startDate,
		to: endDate,
		events: data.myDays,
		today
	});

	let selectedDay: RenderableEvent;
	let selectedDate: Date;

	$: {
		if (browser) {
			document.body.style.overflow = selectedDay ? 'hidden' : '';
		}
	}
	
	// Check if screen is mobile (< 1024px)
	let isMobile = false;
	
	if (browser) {
		// Initialize on mount
		isMobile = window.innerWidth < 1024;
		
		// Update on resize
		window.addEventListener('resize', () => {
			isMobile = window.innerWidth < 1024;
		});
	}
</script>

<Header />

{#if isMobile}
	<div class="mobile-message">
		<p>A full life deserves a full view.</p>
		<p>Come back on a desktop to explore your timeline in full.</p>
	</div>
{:else}
<article>
	<div class="days">
		{#each renderableDays as day (day.start)}
			{#if day.type === 'event'}
				<IsEvent
					event={day}
					on:select={(event) => {
						selectedDay = event.detail;
						selectedDate = new Date(event.detail.start);
					}}
				/>
			{:else if day.type === 'marker'}
				<IsMarker marker={day} />
			{:else}
				<IsLife {day} />
			{/if}
		{/each}
		<EndOfContent />
	</div>
</article>

<Description bind:day={selectedDay} bind:date={selectedDate} />
{/if}

<style>
	article {
		line-height: 2;
	}

	.days {
		display: block;
		flex-wrap: wrap;
		padding: 0;
		margin: 0;
		list-style: none;
		background-color: var(--color-bg-fade);
		position: relative;
	}

	.days::before {
		z-index: -1;
		pointer-events: none;
		content: '';
		height: calc(var(--fade-height) * 2);
		position: absolute;
		left: 0;
		right: 0;
		top: calc(var(--fade-height) * -2);
		background: linear-gradient(transparent, var(--color-bg-fade) var(--fade-height));
	}

	.days::after {
		pointer-events: none;
		content: '';
		height: var(--fade-height);
		position: absolute;
		left: 0;
		right: 0;
		bottom: calc(var(--fade-height) * -1);
		background: linear-gradient(var(--color-bg-fade), transparent);
	}
	
	/* Mobile message styles */
	.mobile-message {
		margin: 3rem auto;
		padding: 1.5rem;
		background-color: rgba(253, 39, 11, 0.05);
		border-radius: 0.5rem;
		text-align: center;
	}
	
	.mobile-message p {
		font-size: 1.5rem;
		margin: 0.5rem 0;
	}
</style>
