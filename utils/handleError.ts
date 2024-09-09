import { Alert } from "react-native";

export function handleError(error: unknown): never {
  if (error instanceof Error) {
    Alert.alert("Error", error.message);
    throw new Error(error.message);
  } else {
    Alert.alert("Error", String(error));
    throw new Error(String(error));
  }
}
