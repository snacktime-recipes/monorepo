import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import Icons from 'unplugin-icons/vite';

const config: UserConfig = {
	plugins: [
		sveltekit(),
		Icons({
			compiler: 'svelte',
		}),
	],
	server: {
		fs: {
			allow: ["../../"]
		},
		proxy: {
			'/api': {
				target: 'http://localhost:3333',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		}
	}
};

export default config;
