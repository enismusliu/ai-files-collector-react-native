"use client";
import { getCurrentUser } from "@/lib/appwrite";
import { useLoadingStore } from "@/stores/Loading.store";
import { useUserStore } from "@/stores/User.store";
import { handleError } from "@/utils/handleError";
import { PropsWithChildren, useEffect } from "react";

export default function GlobalProvider({ children }: PropsWithChildren) {
  /**
   * @globals_states
   */
  const setUser = useUserStore((state) => state.setUser);
  const setLoading = useLoadingStore((state) => state.setLoading);

  /**
   * @effects
   */
  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setUser(res);
        } else {
          setUser(null);
        }
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return children;
}
