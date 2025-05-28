<script lang="ts">
	import type { RenderableMarker } from '../routes/types';

	export let marker: RenderableMarker;
	
	// Get year from the marker's start date (YYYY-MM-DD format)
	$: year = marker.start ? marker.start.substring(0, 4) : '';
	
	// Format date as DD-MM-YYYY for tooltip
	$: formattedDate = marker.start ? (() => {
		const [year, month, day] = marker.start.split('-');
		return `${day}-${month}-${year}`;
	})() : '';
	
	// Determine if this is a past or future birthday
	$: currentYear = new Date().getFullYear();
	$: birthdayYear = parseInt(year);
	$: isPast = birthdayYear <= currentYear;
	$: verb = isPast ? 'turned' : 'turns';
</script>

{#if marker.markerType === 'birthday'}
	<span class="birthday" data-tooltip="{formattedDate}">
		🎂 {verb} <span class="age">{marker.name}</span> in {year}
	</span>
{/if}

{#if marker.markerType === 'today'}
	<span class="today" id="#today" />
{/if}

{#if marker.markerType === 'decade'}
	<div class="decade-container">
		<span class="decade-marker">{marker.name}</span>
	</div>
{/if}

<style>
	/* Pastel color palette for sophisticated UI */
	:root {
		--pastel-birthday: rgba(255, 182, 193, 0.15); /* Light pink */
		--pastel-birthday-hover: rgba(255, 182, 193, 0.25);
		--pastel-birthday-text: #d63384;
	}

	span {
		display: inline;
		color: var(--color-life);
		font-family: monospace;
		letter-spacing: 0.5ch;
		user-select: none;
		word-break: break-all;
	}

	.birthday {
		letter-spacing: normal;
		font-family: inherit;
		background-color: var(--pastel-birthday);
		padding: 0.5em 0.75em;
		border-radius: 50px;
		cursor: default;
		font-size: calc(0.9em + 2px);
		line-height: 1.4;
		height: auto;
		display: inline-block;
		white-space: nowrap;
		vertical-align: baseline;
		word-break: keep-all;
		overflow-wrap: normal;
		position: relative;
		color: rgba(0, 0, 0, 0.6);
	}

	.birthday:hover {
		background-color: var(--pastel-birthday-hover);
	}
	
	.birthday:hover::after {
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
	
	.age {
		font-style: italic;
		color: var(--pastel-birthday-text);
		font-weight: 600;
	}
	
	.decade-container {
		display: block;
		margin: 3em 0 2em;
		text-align: center;
		position: relative;
	}
	
	.decade-marker {
		display: inline-block;
		font-family: inherit;
		font-size: 1.3em;
		font-weight: 500;
		font-style: italic;
		color: var(--color-text);
		background: rgba(0, 0, 0, 0.03);
		padding: 0.75rem 1.5rem;
		border-radius: 50px;
		letter-spacing: 0.05em;
		user-select: none;
		position: relative;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		transition: all 0.2s ease;
	}

	.decade-marker:hover {
		background: rgba(0, 0, 0, 0.05);
	}

	.decade-container::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		height: 1px;
		background: rgba(0, 0, 0, 0.06);
		z-index: -1;
	}

	.today {
		display: inline-block;
		line-height: 2;
		position: relative;
		top: 0.17em;
		left: -0.24rem;
		color: var(--color-link);
		position: relative;
		width: 1.2ch;
		height: 1em;
		padding: 0;
		letter-spacing: normal;
	}

	.today::after {
		content: '♥';
		position: absolute;
		left: 50%;
		top: 50%;
		translate: -50% -50%;
		display: block;
		font-size: 4em;
		animation: animateHeart 1s infinite;
	}

	@keyframes animateHeart {
		0% {
			scale: calc(3 * 0.8 / 9);
		}
		5% {
			scale: calc(3 * 0.9 / 9);
		}
		10% {
			scale: calc(3 * 0.8 / 9);
		}
		15% {
			scale: calc(3 * 1 / 9);
		}
		50% {
			scale: calc(3 * 0.8 / 9);
		}
		100% {
			scale: calc(3 * 0.8 / 9);
		}
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
