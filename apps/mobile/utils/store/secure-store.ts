import * as SecureStore from "expo-secure-store";

export async function saveKey(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getKey(key: string): Promise<string | null> {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return null;
  }
}

export async function deleteKey(key: string) {
  await SecureStore.deleteItemAsync(key);
}
