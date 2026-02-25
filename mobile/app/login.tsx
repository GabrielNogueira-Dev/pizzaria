import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Button } from "@/components/button";
import Input from "@/components/input";
import { colors, fontSize, spacing } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { signIn } = useAuth();

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    try {
      setLoading(true);
      await signIn(email, password);
      router.replace("/(authenticated)/dashboard");
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Error ao fazer Login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>
            NaP<Text style={styles.logoBrand}>'izza</Text>
          </Text>
          <Text style={styles.logoSubtitle}>Garçom App</Text>
        </View>

        <View style={styles.formContainer}>
          <Input
            label="Email"
            placeholder="Digite seu email"
            placeholderTextColor={colors.gray}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Input
            label="Senha"
            placeholder="Digite sua senha"
            placeholderTextColor={colors.gray}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <Button
            title="Acessar"
            variant="primary"
            loading={loading}
            onPress={handleLogin}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  logoText: {
    fontSize: 35,
    fontWeight: "bold",
    color: colors.primary,
  },
  logoBrand: {
    fontSize: 35,
    fontWeight: "bold",
    color: colors.brand,
  },
  logoSubtitle: {
    color: colors.primary,
    fontSize: fontSize.lg,
  },
  formContainer: {
    gap: spacing.md,
  },
});
