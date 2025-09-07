// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import catppuccin from '@catppuccin/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
			starlight({
			title: 'Invio Docs',
			logo: {
				light: './src/assets/logo-light.svg',
				dark: './src/assets/logo-dark.svg',
				alt: 'Invio',
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [
				{ label: 'Overview', slug: 'overview' },
				{ label: 'FAQ', slug: 'faq' },
				{
					label: 'Guides',
					items: [
						{ label: 'Quick Start', slug: 'guides/quick-start' },
						{ label: 'Deployment', slug: 'guides/deployment' },
							{ label: 'UI Tour', slug: 'guides/ui-tour' },
							{ label: 'Create a Template', slug: 'guides/templates' },
					],
				},
					{
						label: 'Reference',
						items: [
							{ label: 'Configuration', slug: 'reference/configuration' },
							{ label: 'Authentication', slug: 'reference/authentication' },
							{ label: 'UI Routes', slug: 'reference/ui-routes' },
							{ label: 'Public Viewer', slug: 'reference/public-viewer' },
							{ label: 'Rendering & PDFs', slug: 'reference/rendering-and-pdfs' },
							{ label: 'Template Syntax', slug: 'reference/template-syntax' },
							{ label: 'Data Model', slug: 'reference/data-model' },
							{ label: 'Behaviors', slug: 'reference/behaviors' },
							{
								label: 'API',
								items: [
									{ label: 'Overview', slug: 'reference/api' },
									{ label: 'Invoices', slug: 'reference/api/invoices' },
									{ label: 'Customers', slug: 'reference/api/customers' },
									{ label: 'Settings', slug: 'reference/api/settings' },
									{ label: 'Templates', slug: 'reference/api/templates' },
									{ label: 'Public', slug: 'reference/api/public' },
									{ label: 'Health', slug: 'reference/api/health' },
								],
							},
						],
					},
			],
				plugins: [catppuccin()],
		}),
	],
});
