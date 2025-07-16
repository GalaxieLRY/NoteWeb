// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
    site: 'https://GalaxieLRY.github.io',
    base: 'NoteWeb',
	integrations: [
		starlight({
			title: '首页',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [
                {
					label: '网络安全',
                    autogenerate: { directory:'reference' },
					// items: [
					// 	{ label: '第1章 引言', slug: 'networkSecurity/第1章 引言' },
					// ],
				},
				{
					label: '指南',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: '示例指南', slug: 'guides/example' },
					],
				},
				{
					label: '参考',
					autogenerate: { directory:'reference' },
				},
			],
		}),
	],
});
