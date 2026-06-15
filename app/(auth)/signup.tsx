import { supabase } from "@/src/lib/supabase";
import { useTheme } from "@/src/theme/context";
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
  const { colours } = useTheme();

  // This function will be called when the submit button is pressed
  // It will call a supabase defined function and pass the user's info to that func.
  const handleSignup = async () => {
    // We need to validate our inputs
    // Then we need to see if the account exists already or not (irrelevant, supabase tells us this through error)
    // Then we can pass to supabase

    const { error } = await supabase.auth.signUp({
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

  const styles = createStyles(colours);

  return (
    <View style={styles.container}>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
        placeholderTextColor={colours.secondaryText}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholder="Username"
        placeholderTextColor={colours.secondaryText}
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        placeholderTextColor={colours.secondaryText}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity onPress={handleSignup} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {errorMessage && <Text style={styles.error}>{errorMessage.message}</Text>}

      {/* Button for logging in */}
      <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
        <Text style={styles.link}>{"Already have an account? Log in"}</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const createStyles = (colours: ReturnType<typeof useTheme>["colours"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 28,
      backgroundColor: colours.background,
    },
    input: {
      width: "100%",
      borderWidth: 1,
      borderColor: colours.surface,
      backgroundColor: colours.card,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 16,
      color: colours.text,
      marginBottom: 14,
    },
    button: {
      width: "100%",
      backgroundColor: colours.primary,
      borderRadius: 12,
      paddingVertical: 15,
      alignItems: "center",
      marginTop: 4,
    },
    buttonText: {
      color: colours.card,
      fontSize: 16,
      fontWeight: "600",
    },
    error: {
      color: colours.accent,
      marginTop: 14,
      textAlign: "center",
    },
    link: {
      color: colours.primary,
      marginTop: 24,
      fontSize: 14,
    },
  });
