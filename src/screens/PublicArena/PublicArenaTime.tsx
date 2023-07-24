import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { formatCurrency } from "@utils/Formatters";
import { TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { CourtModel } from "src/interfaces/home/courts";

interface PublicArenaTime {
  isSelected?: boolean;
  details: CourtModel & { date: Date; time: string };
  onSelect: (time: string) => void;
}

export function PublicArenaTime({
  isSelected = false,
  details,
  onSelect,
}: PublicArenaTime) {
  const { colors } = useTheme();

  const navigation = useNavigation<AppNavigationRoutesProps>();

  function handleSelectTime() {
    onSelect(details.time);

    navigation.navigate("scheduleArena", {
      arena: {
        ...details,
        date: details.date.toISOString(),
      },
    });
  }

  return (
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
      onPress={handleSelectTime}
    >
      <Text
        style={{
          fontFamily: "Poppins_700Bold",
          color: colors.onSurfaceVariant,
        }}
      >
        {details.time}
      </Text>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: "Poppins_700Bold",
            fontSize: 12,
            color: colors.onSurfaceVariant,
          }}
        >
          {details.name}
        </Text>
        <Text style={{ fontSize: 12, color: colors.onSurfaceVariant }}>
          {details.sport}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
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
          {/* ToDo: Não vem esse dado da API */}
          {formatCurrency(0)}
        </Text>
      </View>
      <Feather name="arrow-right" size={24} color={colors.onSurfaceVariant} />
    </TouchableOpacity>
  );
}
