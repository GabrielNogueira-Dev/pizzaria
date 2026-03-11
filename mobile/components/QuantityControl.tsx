import { colors, fontSize, spacing } from "@/constants/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface QuantityControlProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function QuantityControl({
  quantity,
  onIncrement,
  onDecrement,
}: QuantityControlProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onDecrement}>
        <Text style={styles.buttonText}>-</Text>
      </Pressable>

      <View style={styles.quantityContainer}>
        <Text style={styles.quantityText}>{quantity}</Text>
      </View>

      <Pressable style={styles.button} onPress={onIncrement}>
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
  },
  button: {
    backgroundColor: colors.red,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.primary,
    fontSize: fontSize.xl,
    fontWeight: "bold",
  },
  quantityContainer: {
    alignSelf: "center",
  },
  quantityText: {
    color: colors.primary,
    fontSize: fontSize.xl,
  },
});
