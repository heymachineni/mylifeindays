<script lang="ts">
	export let content: string;
	export let inline = false;
	import { marked } from 'marked';
	marked.setOptions({
		mangle: false,
		headerIds: false
	});
	marked.use({
		renderer: {
			link(href, title, text) {
				const isRemoteURL = href && href.startsWith('http');
				if (isRemoteURL) {
					return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
				}
				const maybeTitleAttr = title ? ` title="${title}"` : '';
				return `<a href="${href}"${maybeTitleAttr}>${text}</a>`;
			}
		}
	});
</script>

<div class="md-content">
	{#if inline}
		{@html marked.parseInline(content)}
	{:else}
		{@html marked.parse(content)}
	{/if}
</div>

<style>
	.md-content {
		max-width: 100%;
		word-break: break-word;
		hyphens: auto;
	}

	:global(.md-content > *) {
		max-width: 100%;
	}

	.md-content :global(hr) {
		border: none;
		border: 1px solid var(--color-text);
		margin: 1rem 0;
		opacity: 0.3;
	}

	.md-content :global(p) {
		margin: 0 0 1em 0;
	}

	.md-content :global(p:last-child) {
		margin-bottom: 0;
	}

	.md-content :global(a) {
		color: var(--color-link);
		text-decoration: none;
	}

	.md-content :global(a:hover) {
		text-decoration: underline;
	}
</style>
