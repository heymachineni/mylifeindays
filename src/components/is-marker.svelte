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
		background-color: rgba(253, 39, 11, 0.08);
		padding: 0.5em 0.75em;
		border-radius: 12px;
		cursor: default;
		font-size: 0.9em;
		line-height: 1.4;
		height: auto;
		display: inline-block;
		white-space: nowrap;
		vertical-align: baseline;
		word-break: keep-all;
		overflow-wrap: normal;
		position: relative;
	}

	.birthday:hover {
		background-color: rgba(253, 39, 11, 0.12);
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
		border-radius: 8px;
		font-size: 0.85em;
		white-space: nowrap;
		margin-bottom: 8px;
		z-index: 100;
		animation: tooltipFadeIn 0.2s ease-out;
	}
	
	.age {
		font-style: italic;
		color: var(--color-link);
		font-weight: 500;
	}
	
	.decade-marker {
		display: block;
		font-size: 1.3em;
		font-weight: 600;
		color: var(--color-text);
		text-align: center;
		margin: 1.5em 0 0.75em;
		background: rgba(128, 128, 128, 0.1);
		padding: 0.75em 1em;
		border-radius: 16px;
		letter-spacing: -0.02em;
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
