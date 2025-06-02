import CircularDependencyPlugin from 'circular-dependency-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';

import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { BuildOptions } from './types/config';

export const buildPlugins = (options: BuildOptions): webpack.WebpackPluginInstance[] => {
    const { isDev, paths } = options;

    const plugins: webpack.WebpackPluginInstance[] = [
        new HtmlWebpackPlugin({
            template: paths.html,
            publicPath: '/',
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
    ];

    if (isDev) {
        plugins.push(
            new webpack.ProgressPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            // new BundleAnalyzerPlugin({
            //     openAnalyzer: false,
            // }),
            new CircularDependencyPlugin({
                exclude: /a\.js|node_modules/,
                include: /dir/,
                failOnError: true,
                allowAsyncCycles: false,
                cwd: process.cwd(),
            }),
            new ForkTsCheckerWebpackPlugin({
                typescript: {
                    diagnosticOptions: {
                        semantic: true,
                        syntactic: true,
                    },
                    mode: 'write-references',
                },
            })
        );
    }

    return plugins;
};
