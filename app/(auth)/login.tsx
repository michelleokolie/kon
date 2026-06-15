import { supabase } from "@/src/lib/supabase";
import { useTheme } from "@/src/theme/context";
import { AuthError } from "@supabase/auth-js";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<AuthError | null>(null);
  const router = useRouter();
  const { colours } = useTheme();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setErrorMessage(error);
      return;
    }
    router.replace("/(tabs)");
  };

  const styles = makeStyles(colours);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.header}>
            <Text style={styles.wordmark}>kon</Text>
            <Text style={styles.tagline}>your people, right now</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholder="you@email.com"
                placeholderTextColor={colours.secondaryText}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={colours.secondaryText}
                secureTextEntry
              />
            </View>

            {errorMessage && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{errorMessage.message}</Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleLogin}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryButtonText}>sign in</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/(auth)/signup")}
              activeOpacity={0.7}
            >
              <Text style={styles.linkText}>no account? sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const makeStyles = (colours: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colours.background,
    },
    inner: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 32,
    },
    header: {
      marginBottom: 48,
    },
    wordmark: {
      fontSize: 48,
      fontWeight: "300",
      color: colours.primary,
      letterSpacing: 8,
    },
    tagline: {
      fontSize: 13,
      color: colours.secondaryText,
      letterSpacing: 1,
      marginTop: 4,
    },
    form: {
      gap: 16,
    },
    inputGroup: {
      gap: 6,
    },
    label: {
      fontSize: 12,
      color: colours.secondaryText,
      letterSpacing: 0.5,
    },
    input: {
      backgroundColor: colours.surface,
      borderRadius: 12,
      padding: 14,
      fontSize: 15,
      color: colours.text,
      borderWidth: 1,
      borderColor: "transparent",
    },
    errorBox: {
      backgroundColor: colours.surface,
      borderRadius: 10,
      padding: 12,
      borderLeftWidth: 3,
      borderLeftColor: colours.accent,
    },
    errorText: {
      fontSize: 13,
      color: colours.accent,
    },
    primaryButton: {
      backgroundColor: colours.primary,
      borderRadius: 12,
      padding: 16,
      alignItems: "center",
      marginTop: 8,
    },
    primaryButtonText: {
      color: "#fff",
      fontSize: 15,
      fontWeight: "500",
      letterSpacing: 0.5,
    },
    linkText: {
      color: colours.secondaryText,
      fontSize: 13,
      textAlign: "center",
      marginTop: 4,
    },
  });
