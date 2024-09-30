import 'dotenv/config';

import * as joi from 'joi';

// Definiendo la interfaz con las variables de entorno requeridas
interface EnvVars {
  /** Variables de entorno */
  PORT: number;
  STRIPE_SECRET_KEY: string;
}

// Definiendo el esquema para validar las variables de entorno
const envsSchema = joi
  .object({
    /** Validaciones */
    PORT: joi.number().required(),
    STRIPE_SECRET_KEY: joi.string().required(),
  })
  .unknown(true);

// Validar las variables de entorno contra el esquema
const { error, value } = envsSchema.validate(process.env);

// Lanzar un error si la validación falla
if (error) {
  throw new Error(`Error de validación de configuración: ${error.message}`);
}

// Definiendo el objeto que contiene las variables de entornos validadas
const envVars: EnvVars = value;

// Exportar las variables de entorno validadas
export const envs = {
  port: envVars.PORT,
  stripeSecretKey: envVars.STRIPE_SECRET_KEY,
};
