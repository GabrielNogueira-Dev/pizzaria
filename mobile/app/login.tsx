import { Button } from "@/components/button";
import Input from "@/components/input";
import { colors, fontSize, spacing } from "@/constants/theme";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Login() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
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
          />

          <Input
            label="Senha"
            placeholder="Digite sua senha"
            placeholderTextColor={colors.gray}
            secureTextEntry={true}
          />

          <Button title="Acessar" />
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
