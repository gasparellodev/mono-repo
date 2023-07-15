import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { CreateUserContextProvider } from "@contexts/CreateUserContext";
import { SignUpFirstStep } from "@screens/SignUp/SignUpFirstStep";
import { SignUpSecondStep } from "@screens/SignUp/SignUpSecondStep";
import { SignUpThirdStep } from "@screens/SignUp/SignUpThirdStep";

type SignUpStackRoutes = {
  signUpFirstStep: undefined;
  signUpSecondStep: undefined;
  signUpThirdStep: undefined;
  homeClient: undefined;
};

export interface SignUpStackRoutesProps
  extends NativeStackNavigationProp<SignUpStackRoutes> {}

const { Navigator, Screen } = createNativeStackNavigator<SignUpStackRoutes>();

export function SignUpStack() {
  return (
    <CreateUserContextProvider>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="signUpFirstStep" component={SignUpFirstStep} />
        <Screen name="signUpSecondStep" component={SignUpSecondStep} />
        <Screen name="signUpThirdStep" component={SignUpThirdStep} />
      </Navigator>
    </CreateUserContextProvider>
  );
}
