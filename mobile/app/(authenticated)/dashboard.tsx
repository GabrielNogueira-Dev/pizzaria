import { useAuth } from "@/context/AuthContext";
import { Button, Text, View } from "react-native";

export default function Dashboard() {
  const { signOut } = useAuth();

  return (
    <View>
      <Text>Dasshboard Page</Text>
      <Text>Dasshboard Page</Text>
      <Text>Dasshboard Page</Text>
      <Text>Dasshboard Page</Text>
      <Text>Dasshboard Page</Text>
      <Text>Dasshboard Page</Text>
      <Text>Dasshboard Page</Text>
      <Text>Dasshboard Page</Text>
      <Text>Dasshboard Page</Text>
      <Text>Dasshboard Page</Text>
      <Button title="sair" onPress={signOut} />
    </View>
  );
}
