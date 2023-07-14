import React, { useEffect, useRef, useState } from 'react'
import { Button, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useKeenSliderNative } from "keen-slider/react-native"
import Filters from '@components/Filters/Filters'

export default function SlideOrder() {

  const filters = [
    { id: 1, name: 'Jogar de tarde', isSelected: false },
    { id: 2, name: 'Jogar de noite', isSelected: false },
    { id: 3, name: 'Jogar de manhã', isSelected: true },
    { id: 4, name: 'Jogar de', isSelected: false },
    { id: 5, name: 'futevolei', isSelected: false },
    { id: 6, name: 'Futebol', isSelected: false },
    { id: 7, name: 'Basquete', isSelected: false },
    { id: 8, name: 'Paintball', isSelected: false }
  ]
  return (
    <View style={{ height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 2 }}>
      <FlatList
        keyExtractor={(item) => item.name}
        data={filters}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Filters {...item} />}
      />
    </View>
  )
}
