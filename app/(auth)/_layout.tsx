import { Stack } from "expo-router";

const Layout = () => {
    return (
        <Stack>
        <Stack.Screen name="Onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    )
}
export default Layout;