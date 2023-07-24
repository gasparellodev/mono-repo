import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { SignUpStack } from "@routes/sign-up-stack.routes";
import { SignIn } from "@screens/SignIn";

type AuthRoutes = {
  signIn: undefined;
  signUpStack: undefined;
};

export interface AuthNavigatorRoutesProps
  extends NativeStackNavigationProp<AuthRoutes> {}

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <BottomSheetModalProvider>
      <Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="signIn"
      >
        <Screen name="signIn" component={SignIn} />
        <Screen name="signUpStack" component={SignUpStack} />
      </Navigator>
    </BottomSheetModalProvider>
  );
}
