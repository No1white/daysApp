const { override, fixBabelImports, adjustStyleLoaders } = require('customize-cra');

module.exports = override(
   fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css',
   }),
    adjustStyleLoaders(rule => {
        if (rule.test.toString().includes("scss")) {
            rule.use.push({
                loader: require.resolve("sass-resources-loader"),
                options: {
                    resources: "./src/styles/mixin.scss" //这里是你自己放公共scss变量的路径
                }
            });
        }
    })
);
