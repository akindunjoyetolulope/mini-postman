export const replaceEnvVariables = (
  text: string,
  envVars: Record<string, string>
) => {
  return text.replace(
    /\{\{(.*?)\}\}/g,
    (_, key) => envVars[key] || `{{${key}}}`
  );
};
