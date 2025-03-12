import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['img.spoonacular.com'], // Разрешаем изображения с этого домена
  },
};

export default nextConfig;
