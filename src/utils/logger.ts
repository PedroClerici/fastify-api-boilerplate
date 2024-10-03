export const loggerConfig = {
  development: {
    level: "DEBUG",
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "SYS:HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
  test: false,
};
