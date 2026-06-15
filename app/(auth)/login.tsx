import { supabase } from "@/src/lib/supabase";
import { useTheme } from "@/src/theme/context";
import { AuthError } from "@supabase/auth-js";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // To deal with possible errors
  const [errorMessage, setErrorMessage] = useState<AuthError | null>(null);

  const router = useRouter();
  const { colours } = useTheme();

  // This function will be called when the submit button is pressed
  // It will call a supabase defined function and pass the user's info to that func.
  const handleLogin = async () => {
    setErrorMessage(null);
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Fail fast!
    if (error) {
      setErrorMessage(error);
      setIsLoading(false);
      return;
    }
    router.replace("/(tabs)");
  };

  const styles = createStyles(colours);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={styles.logoMark}>
            <Text style={styles.logoMarkText}>kon</Text>
          </View>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>
            Sign in to see what your friends are up to.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor={colours.secondaryText}
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor={colours.secondaryText}
              secureTextEntry
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          {errorMessage && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{errorMessage.message}</Text>
            </View>
          )}

          <Pressable
            onPress={handleLogin}
            disabled={isLoading}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.pressed,
              isLoading && styles.disabled,
            ]}
          >
            {isLoading ? (
              <ActivityIndicator color={colours.onPrimary} />
            ) : (
              <Text style={styles.primaryButtonText}>Sign in</Text>
            )}
          </Pressable>
        </View>

        <Pressable
          onPress={() => router.push("/(auth)/signup")}
          style={styles.footer}
          hitSlop={8}
        >
          <Text style={styles.footerText}>
            Don&apos;t have an account?{" "}
            <Text style={styles.footerLink}>Sign up</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const createStyles = (colours: ReturnType<typeof useTheme>["colours"]) =>
  StyleSheet.create({
    flex: { flex: 1, backgroundColor: colours.background },
    scroll: {
      flexGrow: 1,
      justifyContent: "center",
      paddingHorizontal: 28,
      paddingVertical: 48,
    },
    header: {
      alignItems: "center",
      marginBottom: 36,
    },
    logoMark: {
      width: 72,
      height: 72,
      borderRadius: 24,
      backgroundColor: colours.primary,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 24,
    },
    logoMarkText: {
      color: colours.onPrimary,
      fontSize: 24,
      fontWeight: "700",
      letterSpacing: 0.5,
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: colours.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 15,
      lineHeight: 22,
      color: colours.secondaryText,
      textAlign: "center",
    },
    form: { gap: 18 },
    field: { gap: 8 },
    label: {
      fontSize: 13,
      fontWeight: "600",
      color: colours.text,
      marginLeft: 4,
    },
    input: {
      backgroundColor: colours.card,
      borderWidth: 1,
      borderColor: colours.border,
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 16,
      color: colours.text,
    },
    errorBox: {
      backgroundColor: colours.errorSurface,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
    },
    errorText: {
      color: colours.error,
      fontSize: 14,
    },
    primaryButton: {
      backgroundColor: colours.primary,
      borderRadius: 14,
      paddingVertical: 16,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 4,
    },
    primaryButtonText: {
      color: colours.onPrimary,
      fontSize: 16,
      fontWeight: "700",
    },
    pressed: { opacity: 0.85 },
    disabled: { opacity: 0.6 },
    footer: {
      marginTop: 28,
      alignItems: "center",
    },
    footerText: {
      fontSize: 14,
      color: colours.secondaryText,
    },
    footerLink: {
      color: colours.accent,
      fontWeight: "700",
    },
  });
