import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useAuth } from "@hooks/useAuth";
import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "@routes/app.routes";
import { AuthRoutes } from "@routes/auth.routes";

export function Routes() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      <BottomSheetModalProvider>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
}
