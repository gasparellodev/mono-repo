import { Flex } from "@components/Flex";
import { Text, useTheme } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export function UserLocation() {
  const { colors } = useTheme();
  return (
    <Flex
      direction="row"
      style={{ paddingTop: 16, paddingBottom: 16 }}
      backgroundColor={colors.surfaceVariant}
      justify="space-evenly"
      align="center"
    >
      <View style={{ marginLeft: 16, flex: 1 }}>
        <Text ellipsizeMode="tail" numberOfLines={1}>
          Rua Selecionada 32, Bairro, Cidade, Estado - País
        </Text>
      </View>

      <View style={{ marginLeft: 10 }}>
        <TouchableOpacity>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={25}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      <View style={{ marginLeft: 16, marginRight: 16 }}>
        <MaterialIcons name="notifications" size={25} color={colors.primary} />
      </View>
    </Flex>
  );
}
