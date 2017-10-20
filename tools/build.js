/*eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../webpack.config.babel';
import colors from 'colors';

process.env.NODE_ENV = 'production';

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    console.log(err.bold.red);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(error.red));
  }

  if (jsonStats.hasWarnings) {
    console.log('Webpack generated the following warnings: '.bold.yellow);
    jsonStats.warnings.map(warning => console.log(warning.yellow));
  }

  console.log(`${'Webpack stats'.bold.magenta}\n${stats.toString({
      children: false,
      chunks: false,  // Makes the build much quieter
      colors: true,    // Shows colors in the console
      modules: false
    })}\n`
  );
  console.log('Your app has been compiled in production mode and written to /dist');

  return 0;
});
