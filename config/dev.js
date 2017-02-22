module.exports = { db: 'localhost:27017/ticket3',
                     jwtSecret: 'secret',
                     smtp: {
                        service: 'Gmail',
                        auth: {
                            user: 'abedeveloper@gmail.com',
                            pass: 'painfree1'
                        },
                        logger: true, // log to console
                        debug: true // include SMTP traffic in the logs
                        }
                    
                    }