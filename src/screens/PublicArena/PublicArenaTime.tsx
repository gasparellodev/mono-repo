import { VStack } from "@components/VStack";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { formatCurrency } from "@utils/Formatters";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface PublicArenaTime {
  isSelected?: boolean;
  court: {
    date: Date;
    id: string;
    name: string;
    sport: string;
    availableTimes: string[];
  };
  onSelect: (time: string) => void;
}

export function PublicArenaTime({
  isSelected = false,
  court,
  onSelect,
}: PublicArenaTime) {
  const { colors } = useTheme();

  const navigation = useNavigation<AppNavigationRoutesProps>();

  const [showTime, setShowTime] = useState(false);

  function handleSelectTime(time: string) {
    onSelect(time);

    navigation.navigate("scheduleArena", {
      arena: {
        id: court.id,
        date: court.date,
        name: court.name,
        sport: court.sport,
        time,
        status: "confirm",
      },
    });
  }

  return (
    <VStack>
      <TouchableOpacity
        style={{
          backgroundColor: isSelected ? colors.surfaceVariant : "transparent",
          height: 64,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          gap: 16,
        }}
        activeOpacity={0.5}
        onPress={() => setShowTime(!showTime)}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Poppins_700Bold",
              fontSize: 12,
              color: colors.onSurfaceVariant,
            }}
          >
            {court.name}
          </Text>
          <Text style={{ fontSize: 12, color: colors.onSurfaceVariant }}>
            {court.sport}
          </Text>
        </View>
        <Feather
          name={`${showTime ? "arrow-up" : "arrow-down"}`}
          size={24}
          color={colors.onSurfaceVariant}
        />
      </TouchableOpacity>

      {showTime &&
        court.availableTimes.map((time) => (
          <TouchableOpacity
            key={time}
            style={{
              backgroundColor: colors.surfaceVariant,
              height: 64,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 16,
              gap: 16,
            }}
            activeOpacity={0.5}
            onPress={() => handleSelectTime(time)}
          >
            <Text
              style={{
                fontFamily: "Poppins_700Bold",
                color: colors.onSurfaceVariant,
              }}
            >
              {time}
            </Text>
            <View>
              <Text
                style={{
                  fontFamily: "Poppins_700Bold",
                  fontSize: 12,
                  color: colors.onSurfaceVariant,
                }}
              >
                Valor
              </Text>
              <Text style={{ fontSize: 12, color: colors.onSurfaceVariant }}>
                {formatCurrency(10)}
              </Text>
            </View>
            <Feather
              name="arrow-right"
              size={24}
              color={colors.onSurfaceVariant}
            />
          </TouchableOpacity>
        ))}
    </VStack>
  );
}
