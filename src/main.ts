import { web } from './app';
import { logger } from './common/utils/logger.util';

web.listen(3000, () => {
  logger.info({
    level: 'info',
    message: 'Listening on port 3000',
  });
});
