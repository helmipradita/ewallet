import { PrismaClient } from '@prisma/client';
import { logger } from '../../common/utils/logger.util';

export const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
});

prisma.$on('error', (e) => {
  logger.error({
    level: 'error',
    message: e,
  });
});

prisma.$on('warn', (e) => {
  logger.warn({
    level: 'warn',
    message: e,
  });
});

prisma.$on('info', (e) => {
  logger.info({
    level: 'info',
    message: e,
  });
});

prisma.$on('query', (e) => {
  logger.info({
    level: 'info',
    message: e,
  });
});
