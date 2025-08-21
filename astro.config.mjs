// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
    site: 'https://GalaxieLRY.github.io',
    base: 'NoteWeb',
    integrations: [
        starlight({
            title: '首页',
            social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/GalaxieLRY/NoteWeb' }],
            customCss: ['./src/styles/katex.css'],
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
                    autogenerate: { directory: 'LLM' },
                    // items: [
                    // 	// Each item here is one entry in the navigation menu.
                    // 	{ label: 'prompt', slug: 'llm/prompt' },
                    // ],
                },
                {
                    label: '密码学',
                    autogenerate: { directory: 'cryptography' },
                },
                {
                    label: '前端开发',
                    autogenerate: { directory: 'front' },
                },
                {
                    label: '数据结构',
                    // autogenerate: { directory: 'datastructure' },
                    items: [
                        { label: '注意事项', slug: 'datastructure/注意事项' },
                        { label: '第1章 绪论', slug: 'datastructure/第1章_绪论' },
                        { label: '第2章 线性表', slug: 'datastructure/第2章_线性表' },
                        { label: '第3章 栈和队列', slug: 'datastructure/第3章_栈和队列' },
                        { label: '第6章 树和二叉树', slug: 'datastructure/第6章_树和二叉树' },
                        { label: '第7章 图', slug: 'datastructure/第7章_图' },
                        { label: '第9章 查找', slug: 'datastructure/第9章_查找' },
                        { label: '第10章 排序', slug: 'datastructure/第10章_排序' },
                    ]
                },
                {
                    label: '刷题题解',
                    autogenerate: { directory: 'keyToAlgoExercises' },
                },
                {
                    label: '杂项',
                    autogenerate: { directory: 'misc' },
                },
                {
                    label: 'Astro样式指南',
                    autogenerate: { directory: 'astro' },
                    // items: [
                    // 	// Each item here is one entry in the navigation menu.
                    // 	{ label: 'prompt', slug: 'llm/prompt' },
                    // ],
                },
            ],
        }),
    ],
    markdown: {
        syntaxHighlight: 'shiki',
        shikiConfig: {
            theme: 'css-variables',
        },
        rehypePlugins: [rehypeKatex],
        remarkPlugins: [
            remarkMath
        ]
    },
});
