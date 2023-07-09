import { paths } from 'src/schema';

export type LoginRequest =
  paths['/auth']['post']['requestBody']['content']['application/json'];
