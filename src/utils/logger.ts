import logger from 'pino';
import dayjs from 'dayjs';

const log = logger({
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        options: { colorize: true },
        level: 'trace',
      },
    ],
  },
  prettifier: true,
  base: {
    pid: true,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
