import { MaterialIcons } from "@expo/vector-icons";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { CommonActions } from "@react-navigation/native";
import { MyArenaRegisterStack } from "@routes/my-arena-register-stack.routes";
import { Home } from "@screens/Home";
import { MyArenaConfigs } from "@screens/MyArena/MyArenaConfigs";
import { MyArenaCourtRegister } from "@screens/MyArena/MyArenaCourtRegister";
import { MySchedule } from "@screens/MySchedule/MySchedule";
import { Notifications } from "@screens/Notifications/Notifications";
import { Profile } from "@screens/Profile/Profile";
import { PublicArena } from "@screens/PublicArena/PublicArena";
import { ScheduleArena } from "@screens/ScheduleArena/ScheduleArena";
import { Search } from "@screens/Search";
import { Platform, TouchableWithoutFeedback, View } from "react-native";
import { BottomNavigation, TouchableRipple } from "react-native-paper";

export type AppRoutes = {
  home: undefined;
  search: undefined;
  myArena: undefined;
  mySchedule: undefined;
  myArenaRegisterStack: undefined;
  myArenaCourtRegister: undefined;
  myArenaConfigs: undefined;
  profile: undefined;
  publicArena: {
    arena: {
      id: string;
      name: string;
    };
  };
  scheduleArena: {
    arena: {
      place: string;
      sport: string;
      date: string;
      price: number;
      time: string;
    };
  };
  notifications: undefined;
  settingProfile: undefined;
  changePassword: undefined;
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
        name="mySchedule"
        component={MySchedule}
        options={{
          tabBarLabel: "Agenda",
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialIcons name="calendar-today" size={size} color={color} />
            );
          },
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name="person" size={size} color={color} />;
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
      <Screen
        name="publicArena"
        component={PublicArena}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="scheduleArena"
        component={ScheduleArena}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="notifications"
        component={Notifications}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  );
}
