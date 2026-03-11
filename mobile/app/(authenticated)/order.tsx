import { Button } from "@/components/button";
import { OrderItem } from "@/components/OrderItem";
import { QuantityControl } from "@/components/QuantityControl";
import { Select } from "@/components/select";
import { colors, fontSize, spacing } from "@/constants/theme";
import { api } from "@/services/api";
import { Category, Item, Product } from "@/types";
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

//LOGICA COM ORDER.tsx E SELECT.tsx

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
  const [selectedProduct, setSelectedProduct] = useState("");

  const [quantity, setQuantity] = useState(1);

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingAddItem, setLoadingAddItem] = useState(false);

  const [item, setItem] = useState<Item[]>([]);

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
      loadProducts(selectedCategory); // basicamento o id(item.value)
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
      console.log(response.data);
    } catch (err) {
      Alert.alert("Error ao buscar produtos" + err);
      console.log("ERROR: " + err);
    } finally {
      setLoadingProducts(false);
    }
  }

  async function handleAddItem() {
    try {
      setLoadingAddItem(true);

      const response = await api.post<Item>("/order/add", {
        order_id: order_id,
        product_id: selectedProduct,
        amount: quantity,
      });
      setItem([...item, response.data]);
      setSelectedCategory("");
      setQuantity(1);
    } catch (err) {
      Alert.alert("Error ao adicionar" + err);
    } finally {
      setLoadingAddItem(false);
    }
  }

  async function handleRemoveItem(item_id: string) {
    try {
      await api.delete("/order/remove", {
        params: { item_id: item_id },
      });

      const removeItem = item.filter((item) => item.id !== item_id);
      setItem(removeItem);
      Alert.alert("Item removido com sucesso!");
    } catch (err) {
      Alert.alert("Error ao deletar" + err);
    }
  }

  function handleAdvance() {
    if (item.length === 0) {
      return;
    }

    router.push({
      pathname: "/(authenticated)/finish",
      params: { order_id: order_id, table: table },
    });
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

      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
      >
        <Select
          label="Categorias"
          placeholder="Selecione a categoria.."
          options={categories?.map((categoria) => ({
            label: categoria.name,
            value: categoria.id,
          }))}
          selectedValue={selectedCategory}
          onValueChange={setSelectedCategory}
        />

        {loadingProducts ? (
          <ActivityIndicator size="small" color={colors.brand} />
        ) : (
          selectedCategory && (
            <Select
              placeholder="Selecione um produto..."
              options={products.map((product) => ({
                label: product.name,
                value: product.id,
              }))}
              selectedValue={selectedProduct}
              onValueChange={setSelectedProduct}
            />
          )
        )}

        {selectedProduct && (
          <View style={styles.quantitySection}>
            <Text style={styles.quantityLabel}>Quantidade</Text>
            <QuantityControl
              quantity={quantity}
              onIncrement={() => setQuantity((quantidade) => quantidade + 1)}
              onDecrement={() => {
                if (quantity <= 1) {
                  setQuantity(1);
                  return;
                }
                setQuantity((quantidade) => quantidade - 1);
              }}
            />
          </View>
        )}

        {selectedProduct && (
          <Button
            title="Adicionar"
            onPress={handleAddItem}
            variant="secondary"
          />
        )}

        {item.length > 0 && (
          <View style={styles.itemSection}>
            <Text style={styles.itemTitle}>Itens adicionados</Text>
            {item.map((item) => (
              <OrderItem
                item={item}
                key={item.id}
                onRemove={handleRemoveItem}
              />
            ))}
          </View>
        )}

        {item.length > 0 && (
          <View style={styles.footer}>
            <Button title="Avançar" onPress={handleAdvance} />
          </View>
        )}
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
    gap: 14,
  },
  quantitySection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
  },
  quantityLabel: {
    color: colors.primary,
    fontSize: fontSize.lg,
    fontWeight: "bold",
  },
  itemSection: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  itemTitle: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: fontSize.lg,
  },
  footer: {
    paddingTop: 24,
  },
});
