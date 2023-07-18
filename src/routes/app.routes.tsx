import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { BottomNavigation, TouchableRipple } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import { Home } from "@screens/Home";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform, TouchableWithoutFeedback, View } from "react-native";
import { Search } from "@screens/Search";
import { MyArena } from "@screens/MyArena/MyArena";
import { MyArenaRegister } from "@screens/MyArena/MyArenaRegister";
import * as React from "react";
import { MyArenaCourtRegister } from "@screens/MyArena/MyArenaCourtRegister";
import { MyArenaRegisterAddress } from "@screens/MyArena/MyArenaRegisterAddress";
import { MyArenaRegisterStack } from "@routes/my-arena-register-stack.routes";
import { MyArenaConfigs } from "@screens/MyArena/MyArenaConfigs";
import { PublicArena } from "@screens/PublicArena/PublicArena";
import { Notifications } from "@screens/Notifications/Notifications";
import { ScheduleArena } from "@screens/ScheduleArena/ScheduleArena";

export type AppRoutes = {
  home: undefined;
  search: undefined;
  myArena: undefined;
  myArenaRegisterStack: undefined;
  myArenaCourtRegister: undefined;
  myArenaConfigs: undefined;
  profile: undefined;
  publicArena: {
    arena: {
      id: string;
      name: string;
    }
  };
  scheduleArena: {
    arena: {
      place: string;
      sport: string;
      date: string;
      price: number;
      time: string;
    }
  }
  notifications: undefined
};

export type AppNavigationRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          style={{
            height: Platform.OS === "android" ? "auto" : 70,
          }}
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];

            return options.tabBarLabel !== undefined
              ? options.tabBarLabel.toString()
              : options.title !== undefined
                ? options.title
                : undefined;
          }}
          renderTouchable={({
            route,
            style,
            children,
            borderless,
            centered,
            rippleColor,
            ...rest
          }) => {
            const { options } = descriptors[route.key];

            if (options.tabBarButton !== undefined) {
              return undefined;
            }

            return Platform.OS === "android" ? (
              <TouchableRipple
                {...rest}
                disabled={rest.disabled || undefined}
                borderless={borderless}
                centered={centered}
                rippleColor={rippleColor}
                style={style}
              >
                {children}
              </TouchableRipple>
            ) : (
              <TouchableWithoutFeedback {...rest}>
                <View style={style}>{children}</View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      )}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: "Início",
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name="home" size={size} color={color} />;
          },
        }}
      />
      <Screen
        name="search"
        component={Search}
        options={{
          tabBarLabel: "Busca",
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name="search" size={size} color={color} />;
          },
        }}
      />
      <Screen
        name="myArena"
        component={MyArena}
        options={{
          tabBarLabel: "Agenda",
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialIcons
                name="calendar-today"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Screen
        name="profile"
        component={MyArena}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialIcons
                name="person"
                size={size}
                color={color}
              />
            );
          },
        }}
      />

      <Screen
        name="myArenaRegisterStack"
        component={MyArenaRegisterStack}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="myArenaCourtRegister"
        component={MyArenaCourtRegister}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="myArenaConfigs"
        component={MyArenaConfigs}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen name="publicArena" component={PublicArena} options={{
        tabBarButton: () => null,
      }} />
      <Screen name="scheduleArena" component={ScheduleArena} options={{
        tabBarButton: () => null,
      }} />
      <Screen name="notifications" component={Notifications} options={{
        tabBarButton: () => null,
      }} />
    </Navigator>
  );
}
