const path = require('path');

const dirname = __dirname.replace('build','')
module.exports = {
    mode:'production',
    entry: {
        // 'np-dialog':path.resolve(dirname, `src/lib/np-dialog/main.js`),
        // 'np-mask':path.resolve(dirname, `src/lib/np-mask/main.js`)
        np:path.resolve(dirname, `src/main.js`)
    },
    output: {
        filename: '[name]-1.0.0.min.js',
        path: path.resolve(dirname,'dist'),
        clean:true
    },
    module:{
        rules:[
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.css$/i,
                use: ['style-loader','css-loader'],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            }
        ],
    }
};