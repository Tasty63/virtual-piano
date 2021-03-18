const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const loader = require('sass-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const projectName = 'virtual-piano';

module.exports = {
	experiments: {
		asset: true,
	},
	entry: `./${projectName}/src/app.js`,
	output: {
		path: path.resolve(__dirname, `${projectName}/dist`),
		publicPath: '',
		filename: 'bundle.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: `./${projectName}/src/index.html`,
		}),
		new MiniCssExtractPlugin({
			filename: 'style.css',
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, `${projectName}/assets/`),
					to: path.resolve(__dirname, `${projectName}/dist`),
					noErrorOnMissing: true,
				},
			],
		}),
	],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|jpg|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'images',
						},
					},
				],
			},
			{
				test: /\.ttf$/,
				type: 'asset/inline',
			},
		],
	},
	devServer: {
		port: 3000,
		open: true,
		overlay: true,
	},
};
