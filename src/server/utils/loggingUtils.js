const chalk = require('chalk');

/**
 * Prints log message in red color
 * @param log <String>
 */
const error = log => console.log(chalk.red(log));

/**
 * Prints log message in blue color
 * @param log <String>
 */
const info = log => console.log(chalk.blue(log));

module.exports = {
    error,
    info
};
