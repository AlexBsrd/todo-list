import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export', // nécessaire de générer une version statique pour github Pages
    basePath: '/todo-list', // Remplacez par le nom de votre dépôt GitHub
    images: {
        unoptimized: true, // nécessaire pour l'export statique
    },
};

export default nextConfig;
