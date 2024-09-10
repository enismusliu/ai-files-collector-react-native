import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/atoms/FormField";
import { SignInPayload } from "@/interfaces/SignInPayload.interface";
import CustomButton from "@/components/atoms/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { handleError } from "@/utils/handleError";
import { useUserStore } from "@/stores/User.store";

const SignIn = () => {
  /**
   * @global_states
   */
  const setUser = useUserStore((state) => state.setUser);

  /**
   * @states
   */
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<SignInPayload>({
    email: "",
    password: "",
  });

  /**
   * @handlers
   */
  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      await signIn({ email: form.email, password: form.password });
      const result = await getCurrentUser();
      setUser(result);
      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      handleError(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="flex justify-center w-full min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />

          <Text className="mt-10 text-2xl font-semibold text-white font-psemibold">
            Log in to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            type="password"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
          />

          <View className="flex flex-row justify-center gap-2 pt-5">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
