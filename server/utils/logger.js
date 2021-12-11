const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.prettyPrint(),
    format.colorize({ all: true }),
    format.timestamp({
      format: 'DD-MM-YYYY HH:mm:ss A',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  // transports: [
  //? Creates log record
  //   new transports.File({ filename: 'error.log', level: 'error' }),
  //   new transports.File({ filename: 'combined.log' }),
  // ],
});

// If we're not in production then **ALSO** log to the `console` with the colorized simple format.
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    })
  );
}

module.exports = logger;
