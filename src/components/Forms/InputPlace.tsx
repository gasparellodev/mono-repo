import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { Input, InputProps } from "./Input";
import axios from "axios";
import { useState } from "react";
import { useDebounce } from "@hooks/useDebounce";
import { toast } from "@backpackapp-io/react-native-toast";
import { useLocalization } from "@hooks/useLocalization";

const GOOGLE_PACES_API_BASE_URL = "https://maps.googleapis.com/maps/api/place";

type PredictionType = {
  description: string;
  place_id: string;
  reference: string;
  matched_substrings: any[];
  structured_formatting: Object;
  terms: Object[];
  types: string[];
};

type Props = InputProps & {
  onSelect: () => void;
};

export function InputPlace({ value = "", onSelect, ...rest }: Props) {
  const { getCurrentAddress } = useLocalization();

  const [predictions, setPredictions] = useState<PredictionType[]>([]);
  const [showPredictions, setShowPredictions] = useState(false);

  const onChangeText = async () => {
    if (value.trim() === "") {
      setShowPredictions(false);
      return;
    }

    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=AIzaSyDQy847YBsAoRP7a-gpUdttldqW1_14tzQ&input=${value}`;
    try {
      const result = await axios.request({
        method: "get",
        url: apiUrl,
      });

      if (result) {
        const {
          data: { predictions },
        } = result;
        setPredictions(predictions);
        setShowPredictions(true);
      }
    } catch {
      toast.error("Não foi possível obter a localização");
    }
  };

  const onPredictionTapped = async (placeId: string) => {
    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/details/json?key=AIzaSyDQy847YBsAoRP7a-gpUdttldqW1_14tzQ&place_id=${placeId}`;
    try {
      const result = await axios.request({
        method: "get",
        url: apiUrl,
      });

      if (result) {
        const {
          data: {
            result: {
              geometry: { location },
            },
          },
        } = result;
        const { lat: latitude, lng: longitude } = location;
        getCurrentAddress({ latitude, longitude });
        setShowPredictions(false);
        onSelect();
      }
    } catch {
      toast.error("Não foi possível obter a localização");
    }
  };

  useDebounce(onChangeText, 1000, [value]);

  const _renderPredictions = (predictions: PredictionType[]) => {
    if (predictions.length === 0)
      return (
        <Text
          style={{
            textAlign: "center",
            marginBottom: 32,
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          Nenhum resultado encontrado
        </Text>
      );

    return (
      <FlatList
        style={{
          marginBottom: 64,
        }}
        data={predictions}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                padding: 16,
                marginBottom: 12,
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
              }}
              onPress={() => {
                onPredictionTapped(item.place_id);
              }}
            >
              <View>
                <Text numberOfLines={1}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.place_id}
      />
    );
  };

  return (
    <>
      <Input {...rest} />
      {showPredictions && _renderPredictions(predictions)}
    </>
  );
}
