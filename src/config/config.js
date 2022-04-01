require('dotenv').config();
'use strict'

module.exports = function config () {

    const config = {
        port: process.env.PORT,
        configmysql: {
            HOST: process.env.ENV_HOST,
            USER: process.env.ENV_USER,
            PASSWORD: process.env.ENV_PASSWORD,
            DB: process.env.ENV_DB
        },
        secretEncript: '@web-es@-one-seed-prutec'
    }

    return config
}