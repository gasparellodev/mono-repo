import { SafeAreaView, useColorScheme } from "react-native";
import {
  configureFonts,
  MD3DarkTheme,
  MD3LightTheme,
} from "react-native-paper";
import { dark } from "@theme/dark";
import { light } from "@theme/light";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";

import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br';
dayjs.locale(ptBR);

import { ThemeProvider } from "./src/providers/ThemeProvider";
import { Routes } from "@routes/index";
import { Toasts } from "@backpackapp-io/react-native-toast";
import { AuthContextProvider } from "@contexts/AuthContext";
import { AppPropsProvider } from "@contexts/AppPropsContext";
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });
  const colorScheme = useColorScheme();

  const baseFont = {
    fontFamily: "Poppins_400Regular",
  } as const;

  const baseVariants = configureFonts({ config: baseFont });

  // @ts-ignore
  const paperTheme =
    colorScheme === "dark"
      ? {
          ...MD3DarkTheme,
          colors: dark.colors,
          fonts: baseVariants,
        }
      : {
          ...MD3LightTheme,
          colors: light.colors,
          fonts: baseVariants,
        };

  if (!fontsLoaded) {
    return null;
  }

  //AsyncStorage.clear();

  return (
    <ThemeProvider>
      <SafeAreaView style={{ 
        flex: 1, 
        backgroundColor: "rgb(222, 228, 216)"
      }}>

        <AuthContextProvider>
          <AppPropsProvider>
            <Routes />
          </AppPropsProvider>
        </AuthContextProvider>
        <Toasts />
      </SafeAreaView>
    </ThemeProvider>
  );
}
