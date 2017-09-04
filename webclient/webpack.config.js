let path = require('path');

// https://offering.solutions/blog/articles/2017/02/08/angular-2-ahead-of-time-aot-compilation-lazy-loading-treeshaking-webpack/
module.exports = {
    entry: {
        'app': "./src/main.ts"
    },
    devtool: "source-map",
    output: {
        filename: 'atp.bundle.js',
        path: path.resolve(`${__dirname}/wwwroot/app`)
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".ts", ".tsx", ".js", ".webpack.js", ".web.js", ".html"]
    },
    module: {
        rules: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            {
                test: /\.tsx?$|\.ts$/,
                use: [{
                    loader: 'ts-loader'
                }, {
                    loader: 'angular-router-loader',
                    options: {
                        aot: true,
                        genDir: 'aot/'
                    }
                }, {
                    loader: 'angular2-template-loader',
                    options: {
                        keepUrl: true
                    }
                }]
            }, {
                test: /\.(html|css)$/,
                loader: 'raw-loader',
                exclude: /\.async\.(html|css)$/
            }, {
                test: /\.async\.(html|css)$/,
                loaders: ['file?name=[name].[hash].[ext]', 'extract']
            }, {
                test: /socket\.io\.js$/,
                use: ['script-loader']
            }, {
                use: "source-map-loader",
                test: /\.js$/,
            }
        ]
    }
}