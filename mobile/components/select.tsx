import { borderRadius, colors, fontSize, spacing } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

interface selectOptions {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string; //nome categoria por exemplo
  options: selectOptions[]; // qual categoria (dentro do select) nome e seu valor
  selectedValue: string; // qual selecionou
  onValueChange: (value: string) => void; // funcao para selecionar o valor dentro da option
  placeholder?: string;
}

export function Select({
  onValueChange,
  options,
  selectedValue,
  label,
  placeholder = "Selecione..",
}: SelectProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOptions = options.find((opt) => opt.value === selectedValue);
  const displayText = selectedOptions?.label || placeholder;

  function handleChange(value: string) {
    onValueChange(value);
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Pressable
        style={styles.selectButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectText}>{displayText}</Text>
        <Feather name="chevron-down" size={24} color={colors.primary} />
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {label || "Selecione uma opção"}
              </Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <Feather name="x" color={colors.red} size={24} />
              </Pressable>
            </View>

            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.optionItem}
                  onPress={() => handleChange(item.value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      item.value === selectedValue && styles.optionSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    color: colors.primary,
    fontSize: fontSize.md,
    marginBottom: spacing.sm,
    fontWeight: "600",
  },
  selectButton: {
    backgroundColor: colors.backgroundInput,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.borderColor,
    height: 50,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: spacing.md,
  },
  selectText: {
    color: colors.primary,
    flex: 1,
  },
  placeholderText: {
    color: colors.gray,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  modalContent: {
    backgroundColor: colors.background,
    width: "100%",
    maxHeight: "70%",
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: borderRadius.lg,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  modalTitle: {
    color: colors.primary,
  },
  optionItem: {
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 1,
  },
  optionText: {
    color: colors.primary,
  },
  optionSelected: {
    color: colors.green,
    fontWeight: "bold",
  },
});
