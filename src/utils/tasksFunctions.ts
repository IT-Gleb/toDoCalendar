//Проверка на undefined or null
export function isValue(paramValue: unknown): boolean {
  if (typeof paramValue == "undefined" || paramValue == null) {
    return false;
  }
  return true;
}
