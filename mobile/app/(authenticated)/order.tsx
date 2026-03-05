import { Select } from "@/components/select";
import { colors, fontSize, spacing } from "@/constants/theme";
import { api } from "@/services/api";
import { Category, Product } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Order() {
  const router = useRouter();
  const insets = useSafeAreaInsets(); //Da margin top sozinho, olha o return la p revisar

  // Faz a tipagem depois escreve na "{...}" - pegou o params criado no dashboard
  const { order_id, table } = useLocalSearchParams<{
    order_id: string;
    table: string;
  }>();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [products, setProducts] = useState<Product[]>([]);

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    async function LoadDataCategories() {
      await loadCategories();
    }
    LoadDataCategories();
  }, []);

  async function loadCategories() {
    try {
      const response = await api.get("/category");
      setCategories(response.data);
    } catch (err) {
      Alert.alert("Erro ao carregar categorias..");
    } finally {
      setLoadingCategories(false);
    }
  }

  useEffect(() => {
    if (selectedCategory) {
      loadProducts(selectedCategory);
    } else {
      setProducts([]);
      setSelectedCategory("");
    }
  }, [selectedCategory]);

  async function loadProducts(categoryId: string) {
    try {
      setLoadingProducts(true);
      const response = await api.get<Product[]>("/category/product", {
        params: { category_id: categoryId },
      });
      setProducts(response.data);
    } catch (err) {
      Alert.alert("Error ao buscar produtos" + err);
      console.log("ERROR: " + err);
    } finally {
      setLoadingProducts(false);
    }
  }

  if (loadingCategories) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.brand} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Mesa {table}</Text>

          <Pressable style={styles.closeButton} onPress={() => router.back()}>
            <Ionicons name="trash" size={24} color={colors.primary} />
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.scrollContent}>
        <Select
          label="Categorias"
          placeholder="Selecione a categoria.."
          options={categories?.map((cat) => ({
            label: cat.name,
            value: cat.id,
          }))}
          selectedValue={selectedCategory}
          onValueChange={setSelectedCategory}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: fontSize.lg,
    color: colors.primary,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: colors.red,
    padding: spacing.sm,
    borderRadius: 8,
  },
  scrollContent: {
    padding: spacing.md,
  },
});
