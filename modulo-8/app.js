import express from 'express';
import cors from 'cors';
import usersRoutes from './routes/users.routes.js';
import { logger } from './middlewares/logger.middleware.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load('./docs/swagger.yaml');
const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/users', usersRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
