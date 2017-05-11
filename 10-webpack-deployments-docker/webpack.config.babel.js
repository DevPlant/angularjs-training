import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

export default {

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    },

    entry: {
        app: [
            './app/index.js'
        ]
    },

    plugins: [new HtmlWebpackPlugin({template: './app/index.html'})],

    module: {
        loaders: [
            {
                test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: {
                presets: ['es2015']
            }
            },
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.html$/, loader: 'raw-loader', exclude: /node_modules/}
        ]
    }
};
