import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { StatusBar, useColorScheme } from "react-native";
import {
  configureFonts,
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
  useTheme,
} from "react-native-paper";
import { dark } from "@theme/dark";
import { light } from "@theme/light";
import { Flex } from "@components/Flex";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";

type ThemeProviderProps = {
  setTheme?: (theme: any) => void;
};

const ThemeProviderContext = createContext<ThemeProviderProps>(
  {} as ThemeProviderProps
);

export function useThemeProviderContext() {
  const context = useContext(ThemeProviderContext);
  if (!context) {
    throw new Error("Treat Error");
  }

  return context;
}

const theme = {
  ...MD3LightTheme,
  colors: { ...light.colors },
};

export type AppTheme = typeof theme;
export const useAppTheme = () => useTheme<AppTheme>();

export function ThemeProvider({
  children,
  ...rest
}: PropsWithChildren<ThemeProviderProps>) {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const baseFont = {
    fontFamily: "Poppins_400Regular",
  } as const;

  const baseVariants = configureFonts({ config: baseFont });
  const customVariants = {
    bodyMediumBold: {
      ...baseVariants.bodyMedium,
      fontFamily: "Poppins_700Bold",
    },
  } as const;

  const fonts = configureFonts({
    config: {
      ...baseVariants,
      ...customVariants,
    },
  });

  const colorScheme = useColorScheme();

  const paperTheme = useMemo(
    () =>
      colorScheme === "dark"
        ? {
            ...MD3DarkTheme,
            colors: {
              ...dark.colors,
              surfaceContainerLowest: "rgb(255,255,255)",
            },
            fonts: fonts,
          }
        : {
            ...MD3LightTheme,
            colors: {
              ...light.colors,
            },
            fonts: fonts,
          },
    [colorScheme]
  );

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProviderContext.Provider value={{ ...rest }}>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />
      <PaperProvider theme={paperTheme}>
        <Flex
          flex={1}
          backgroundColor={paperTheme.colors.surfaceContainerLowest}
        >
          {children}
        </Flex>
      </PaperProvider>
    </ThemeProviderContext.Provider>
  );
}
