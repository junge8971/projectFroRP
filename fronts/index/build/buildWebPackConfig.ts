import webpack from 'webpack';

import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/config';
import { buildOptimizations } from './buildOptimizations';

export const buildWebPackConfig = (options: BuildOptions): webpack.Configuration => {
    const { mode, paths, isDev } = options;
    return {
        mode,
        entry: paths.entry,
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        output: {
            filename: '[name].[contenthash].bundle.js',
            path: paths.build,
            clean: true,
            publicPath: 'auto',
        },
        plugins: buildPlugins(options),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
        optimization: buildOptimizations(options),
        performance: { hints: isDev ? 'warning' : false },
        stats: 'minimal',
    };
};
