import { TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import dayjs from "dayjs";

interface PublicArenaDayProps {
  day: Date;
  isDisabled?: boolean;
  isActive?: boolean;
  onSelect: (day: Date) => void;
}

export function PublicArenaDay({ day, isDisabled = false, isActive = false, onSelect }: PublicArenaDayProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} activeOpacity={0.5} onPress={() => onSelect(day)} disabled={isDisabled}>
      <Text style={{ textTransform: 'uppercase', color: colors.onSurface, fontSize: 10 }}>{dayjs(day).format("ddd")}</Text>
      <View style={{ backgroundColor: isActive ? colors.onTertiary : 'transparent', width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 15 }}>
        <Text style={{ fontFamily: 'Poppins_700Bold', color: colors.onTertiaryContainer, opacity: isDisabled ? 0.5 : 1 }}>{dayjs(day).format("DD")}</Text>
      </View>
    </TouchableOpacity>
  )
}
