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
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/GalaxieLRY/NoteWeb' }],
            locales: {
				root: {
					label: '简体中文',
					lang: 'zh'
				}
      		},
			sidebar: [
				{ label: '简介', link: '/intro/' },
                {
					label: 'LLM',
                    autogenerate: { directory:'LLM' },
					// items: [
					// 	// Each item here is one entry in the navigation menu.
					// 	{ label: 'prompt', slug: 'llm/prompt' },
					// ],
				},
                {
					label: '网络安全',
                    autogenerate: { directory:'networkSecurity' },
					// items: [
					// 	{ label: '第1章 引言', slug: 'networkSecurity/第1章 引言' },
					// ],
				},
			],
		}),
	],
});
