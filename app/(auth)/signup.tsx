import { supabase } from "@/src/lib/supabase";
import { AuthError } from "@supabase/auth-js";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// This is copy pasted from my login.tsx but added the username and sign up
export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // To deal with possible errors
  const [errorMessage, setErrorMessage] = useState<AuthError | null>(null);

  const router = useRouter();

  // This function will be called when the submit button is pressed
  // It will call a supabase defined function and pass the user's info to that func.
  const handleSignup = async () => {
    // We need to validate our inputs
    // Then we need to see if the account exists already or not (irrelevant, supabase tells us this through error)
    // Then we can pass to supabase

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    // Fail fast!
    if (error) {
      setErrorMessage(error);
      return;
    }
    router.replace("/(tabs)");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity onPress={handleSignup}>
        <Text>Sign Up</Text>
      </TouchableOpacity>

      {errorMessage && <Text>{errorMessage.message}</Text>}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
});
