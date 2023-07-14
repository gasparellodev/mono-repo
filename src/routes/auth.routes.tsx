import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { SignIn } from "@screens/SignIn";
import { SignUpFirstStep } from "@screens/SignUp/SignUpFirstStep";
import { SignUpSecondStep } from "@screens/SignUp/SignUpSecondStep";
import { SignUpThirdStep } from "@screens/SignUp/SignUpThirdStep";
import { SignUpStack } from "@routes/sign-up-stack.routes";

type AuthRoutes = {
  signIn: undefined;
  signUpStack: undefined;
};

export interface AuthNavigatorRoutesProps
  extends NativeStackNavigationProp<AuthRoutes> {}

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signUpStack" component={SignUpStack} />
      <Screen name="signIn" component={SignIn} />
    </Navigator>
  );
}
