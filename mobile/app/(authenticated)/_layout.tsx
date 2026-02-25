import { Stack } from "expo-router";

export default function AuthenticatedLayout() {
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="dashboard" />
  </Stack>;
}
