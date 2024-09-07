// import * as SecureStore from "expo-secure-store";

// export const storePrivateKey = async (key) => {
//   await SecureStore.setItemAsync("privateKey", key);
// };

// export const getPrivateKey = async () => {
//   const key = await SecureStore.getItemAsync("privateKey");
//   return key;
// };

import * as SecureStore from "expo-secure-store";

export const saveToSecureStore = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error("Error saving to SecureStore", error);
  }
};

export const getFromSecureStore = async (key) => {
  try {
    const result = await SecureStore.getItemAsync(key);
    if (result) {
      return result;
    }
    console.log("No value stored under key:", key);
    return null;
  } catch (error) {
    console.error("Error getting from SecureStore", error);
  }
};

export const deleteFromSecureStore = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error("Error deleting from SecureStore", error);
  }
};
