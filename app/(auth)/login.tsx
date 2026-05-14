import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // To deal with possible errors
  const [error, setError] = useState<string | null>(null);

  // This function will be called when the submit button is pressed
  // It will call a supabase defined function and pass the user's info to that func.
  const handleLogin = () => {
    // We need to validate our inputs
    // Then we need to see if the account exists already or not (irrelevant, supabase tells us this through error)
    // Then we can pass to supabase
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput value={email} onChangeText={(text) => setEmail(text)} />
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>

      {error && <Text>{error}</Text>}
    </View>
  );
}
