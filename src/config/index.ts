export type CustomEnvVariable =
  | "VUE_APP_PIZZLY_HOST"
  | "VUE_APP_PIZZLY_PUBLIC_KEY";

export type Environment = { [key in CustomEnvVariable]: string };

export function ValidateEnvironment() {
  const vars: Array<CustomEnvVariable> = [
    "VUE_APP_PIZZLY_HOST",
    "VUE_APP_PIZZLY_PUBLIC_KEY"
  ];
  const env = Object.keys(process.env);
  const missingVariables = vars.filter(v => !env.includes(v));

  if (missingVariables.length > 0) {
    throw new Error(
      `Your .env is missing the values ${missingVariables.join(", ")}.`
    );
  }
}

export function environment(): Environment {
  return process.env;
}
