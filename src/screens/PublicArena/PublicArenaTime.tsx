import { Feather } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface PublicArenaTime {
  isSelected?: boolean;
  details: {
    time: string;
    name: string;
    description: string;
    price: string;
  }
  onSelect: (time: string) => void;
}

export function PublicArenaTime({ isSelected = false, details, onSelect }: PublicArenaTime) {
  const { colors } = useTheme();
  const { time, name, description, price } = details;

  return (
    <TouchableOpacity
      style={{ backgroundColor: isSelected ? colors.surfaceVariant : 'transparent', height: 64, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, gap: 16 }}
      activeOpacity={0.5}
      onPress={() => onSelect(time)}
    >
      <Text style={{ fontFamily: 'Poppins_700Bold', color: colors.onSurfaceVariant }}>{time}</Text>
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 12, color: colors.onSurfaceVariant  }}>{name}</Text>
        <Text style={{ fontSize: 12, color: colors.onSurfaceVariant }}>{description}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 12, color: colors.onSurfaceVariant  }}>Valor</Text>
        <Text style={{ fontSize: 12, color: colors.onSurfaceVariant }}>{price}</Text>
      </View>
      <Feather name="arrow-right" size={24} color={colors.onSurfaceVariant} />
    </TouchableOpacity>
  )
}