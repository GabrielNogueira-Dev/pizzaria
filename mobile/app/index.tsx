import { colors } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Index() {
  const { loading, signed } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(authenticated)";

    if (!signed && inAuthGroup) {
      //logado e dentro dos autenticados entao..
      router.replace("/login");
    } else if (signed && !inAuthGroup) {
      //loagdo e fora dos autenticados entao..
      router.replace("/(authenticated)/dashboard");
    } else if (!signed) {
      // nao logado ja vai pro login
      router.replace("/login");
    }
  }, [loading, signed, router]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.brand} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.brand} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
