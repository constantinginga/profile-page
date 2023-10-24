import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.SUPABASE_SECRET_KEY': JSON.stringify(
        env.SUPABASE_SECRET_KEY
      ),
      'process.env.SUPABASE_URL': JSON.stringify(env.SUPABASE_URL),
    },
    plugins: [react()],
  };
});
