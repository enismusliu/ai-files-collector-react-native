import { SignInPayload } from "@/interfaces/SignInPayload.interface";
import { SignUpPayload } from "@/interfaces/SignUpPayload.interface";
import { handleError } from "@/utils/handleError";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.react-native-app",
  projectId: "66defb8b001a770fbd33",
  databaseId: "66defd51000b6659d55c",
  userCollectionId: "66defd70002a54cca99f",
  videoCollectionId: "66defd980024e83fa8d4",
  storageId: "66deff3900363dfc5c8f",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export async function createUser({ email, password, username }: SignUpPayload) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);
    await signIn({ email, password });
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    handleError(error);
  }
}

export async function signIn({ email, password }: SignInPayload) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    handleError(error);
  }
}
