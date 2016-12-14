module.exports = {
    entry: [
        './react/index.js'
    ],
    output: {
        path: __dirname + '/../static/bundle/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['react', 'es2015']
                }
            },
            // For less files.
            { test: /\.less$/, loaders: ['style', 'css', 'less'] },
            // For woff files provided by font-awesome and bootstrap.
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                query: {
                    limit: '10000',
                    mimetype: 'application/font-woff',
                    name: '/images/[name].bundle.[ext]'
                }
            },
            // For ttf, eot, and svg files provided by font-awesome and
            // bootstrap.
            {
                test: /\.(ttf|eot|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
                query: { name: '/images/[name].bundle.[ext]' }
            },
            // For csv files.
            { test: /\.csv$/, loader: 'dsv-loader' },
            // For json files.
            { test: /\.json$/, loader: 'json-loader' }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './'
    },
    watchOptions: {
        poll: 1000
    }
};
