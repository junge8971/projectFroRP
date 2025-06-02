import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';

import { BuildOptions } from './types/config';

const getMinimizers = () => {
    const jsMinimizer = new TerserPlugin({
        extractComments: false,
        terserOptions: {
            compress: {
                drop_console: true,
            },
        },
    });

    const cssMinimizer = new CssMinimizerPlugin();

    const imageMinimizer = new ImageMinimizerPlugin({
        minimizer: {
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
                plugins: [
                    ['gifsicle', { interlaced: true }],
                    ['mozjpeg', { progressive: true, quality: 75 }],
                    ['pngquant', { quality: [0.7, 0.9] }],
                    [
                        'svgo',
                        {
                            plugins: [{ name: 'removeViewBox', active: false }],
                        },
                    ],
                ],
            },
        },
    });
    return [jsMinimizer, cssMinimizer, imageMinimizer];
};

export const buildOptimizations = (
    options: BuildOptions
): webpack.Configuration['optimization'] => {
    return {
        minimizer: getMinimizers(),
    };
};
