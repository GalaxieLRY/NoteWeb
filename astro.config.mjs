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
					label: 'Astro样式指南',
                    autogenerate: { directory:'astro' },
					// items: [
					// 	// Each item here is one entry in the navigation menu.
					// 	{ label: 'prompt', slug: 'llm/prompt' },
					// ],
				},
                {
					label: 'LLM',
                    autogenerate: { directory:'LLM' },
					// items: [
					// 	// Each item here is one entry in the navigation menu.
					// 	{ label: 'prompt', slug: 'llm/prompt' },
					// ],
				},
                {
					label: '刷题题解',
                    autogenerate: { directory:'keyToAlgoExercises' },
				},
                {
					label: '前端开发',
                    autogenerate: { directory:'front' },
				},
                {
					label: '杂项',
                    autogenerate: { directory:'misc' },
				},
			],
		}),
	],
});
