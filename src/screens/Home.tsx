import { Flex } from "@components/Flex";
import { VStack } from "@components/VStack";
import { UserLocation } from "@components/UserLocation";
import { useState } from "react";
import { Card, Chip, Text } from "react-native-paper";
import { FilterGroup } from "@components/FilterGroup";
import { Button } from "@components/Forms/Button";
import { HorizontalCard } from "@components/HorizontalCard";

export function Home() {
  const [groupSelected, setGroupSelected] = useState("");
  const [groups, setGroups] = useState([
    { label: "Ordenar", icon: "keyboard-arrow-down", key: "order" },
    { label: "Jogar de Noite", icon: undefined, key: "play_at_night" },
    { label: "Jogar de Tarde", icon: undefined, key: "play_at_afternoon" },
    { label: "Jogar de Dia", icon: undefined, key: "play_at_day" },
  ]);
  return (
    <Flex flex={1}>
      <VStack>
        <UserLocation />
        <FilterGroup
          data={groups}
          selected={groupSelected}
          selectChip={setGroupSelected}
          style={{
            marginTop: 16,
            paddingLeft: 24,
            paddingRight: 24,
          }}
        />
        <VStack style={{ paddingRight: 24, paddingLeft: 24 }} direction="row">
          <HorizontalCard />
          <HorizontalCard />
        </VStack>
      </VStack>
    </Flex>
  );
}
