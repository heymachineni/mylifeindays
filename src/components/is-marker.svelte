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
		{verb} <span class="age">{marker.name}</span> in {year}
	</span>
{/if}

{#if marker.markerType === 'today'}
	<span class="today" id="#today" />
{/if}

{#if marker.markerType === 'decade'}
	<span class="decade-marker">{marker.name}</span>
{/if}

<style>
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
		background-color: rgba(253, 39, 11, 0.05);
		padding: 0.4em 0.6em;
		border-radius: 0.25rem;
		cursor: default;
		font-size: 0.9em;
		line-height: 1.4;
		height: auto;
		display: inline-block;
		white-space: nowrap;
		vertical-align: baseline;
		/* Prevent breaking by ensuring it goes to new line if needed */
		word-break: keep-all;
		overflow-wrap: normal;
	}
	
	.birthday:hover::after {
		content: attr(data-tooltip);
		position: absolute;
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%);
		background-color: var(--color-bg);
		color: var(--color-text);
		padding: 0.4em 0.6em;
		border-radius: 0.25rem;
		font-size: 0.9em;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
		white-space: nowrap;
		margin-bottom: 5px;
		z-index: 100;
		border: 1px solid rgba(253, 39, 11, 0.2);
	}
	
	.age {
		font-style: italic;
		color: var(--color-link);
		font-weight: 500;
	}
	
	.decade-marker {
		display: block;
		font-size: 1.2em;
		font-weight: bold;
		color: var(--color-link);
		text-align: center;
		margin: 1em 0 0.5em;
		background-color: rgba(253, 39, 11, 0.05);
		padding: 0.5em;
		border-radius: 0.25rem;
		letter-spacing: normal;
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
</style>
