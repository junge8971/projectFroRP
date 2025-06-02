import path from 'path';
import webpack from 'webpack';

import { BuildEnv, BuildPaths } from './build/types/config';
import { buildWebPackConfig } from './build/buildWebPackConfig';
import packageJson from './package.json';

export default (env: BuildEnv) => {
    const mode = env.mode || 'development';
    const isDev = mode === 'development';

    const port = env.port || 3000;

    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'dist'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
    };

    const TREEJS_REMOTE_URL = 'http://localhost:3001';

    const config: webpack.Configuration = buildWebPackConfig({
        mode,
        paths,
        isDev,
        port,
    });

    config.plugins.push(
        new webpack.container.ModuleFederationPlugin({
            name: 'index',
            filename: 'remoteEntry.js',

            remotes: {
                treeJS: `treeJS@${TREEJS_REMOTE_URL}/remoteEntry.js`,
            },
            shared: {
                ...packageJson.dependencies,
                react: {
                    eager: true,
                },
                'react-dom': {
                    eager: true,
                },
            },
        })
    );

    return config;
};
