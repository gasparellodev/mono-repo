import { CreateArenaContextProvider } from "@contexts/CreateArenaContext";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { MyArenaRegister } from "@screens/MyArena/MyArenaRegister";
import { MyArenaRegisterAddress } from "@screens/MyArena/MyArenaRegisterAddress";
type MyArenaRegisterStackRoutes = {
  myArenaRegister: undefined;
  myArenaRegisterAddress: undefined;
};

export interface MyArenaRegisterStackRoutesProps
  extends NativeStackNavigationProp<MyArenaRegisterStackRoutes> {}

const { Navigator, Screen } =
  createNativeStackNavigator<MyArenaRegisterStackRoutes>();

export function MyArenaRegisterStack() {
  return (
    <CreateArenaContextProvider>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="myArenaRegister" component={MyArenaRegister} />
        <Screen
          name="myArenaRegisterAddress"
          component={MyArenaRegisterAddress}
        />
      </Navigator>
    </CreateArenaContextProvider>
  );
}
