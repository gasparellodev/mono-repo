import { CreateUserContextProvider } from "@contexts/CreateUserContext";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { SignUpFirstStep } from "@screens/SignUp/SignUpFirstStep";
import { SignUpSecondStep } from "@screens/SignUp/SignUpSecondStep";
import { SignUpThirdStep } from "@screens/SignUp/SignUpThirdStep";
import { SafeAreaView } from "react-native-safe-area-context";

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
      <SafeAreaView style={{ flex: 1 }}>
        <Navigator screenOptions={{ headerShown: false }}>
          <Screen name="signUpFirstStep" component={SignUpFirstStep} />
          <Screen name="signUpSecondStep" component={SignUpSecondStep} />
          <Screen name="signUpThirdStep" component={SignUpThirdStep} />
        </Navigator>
      </SafeAreaView>
    </CreateUserContextProvider>
  );
}
