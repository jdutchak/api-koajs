/**
 * Load environment configurations
 */

const dotenv = require('dotenv');

module.exports = {

    loadConfigs: (environment) => {

        let oldEnv = JSON.parse(JSON.stringify(process.env));

        dotenv.config({path: './environments/.' + environment});

        Object.keys(process.env).forEach((key) => {
            if (oldEnv[key] != null) {
                process.env[key] = oldEnv[key];
            }
        });

    }

};

