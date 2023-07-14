import React, { useEffect, useRef, useState } from 'react'
import { Button, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import AvailableHours from '../AvailableHours'

export default function SlideOrderNearbyAreas() {

  const filters = [
    { id: 1, name: 'Jogar de tarde', description: 'Aluguel de quadras de areia e quadras Society.', numberStar: 4, numberAviations: 6 },
    { id: 2, name: 'Jogar de noite', description: 'Aluguel de quadras de areia e quadras Society.', numberStar: 4, numberAviations: 6 },
    { id: 3, name: 'Jogar de manhã', description: 'Aluguel de quadras de areia e quadras Society.', numberStar: 4, numberAviations: 6 },
    { id: 4, name: 'Jogar de', description: 'Aluguel de quadras de areia e quadras Society.', numberStar: 4, numberAviations: 6 },
    { id: 5, name: 'futevolei', description: 'Aluguel de quadras de areia e quadras Society.', numberStar: 4, numberAviations: 6 },
    { id: 6, name: 'Futebol', description: 'Aluguel de quadras de areia e quadras Society.', numberStar: 4, numberAviations: 6 },
    { id: 7, name: 'Basquete', description: 'Aluguel de quadras de areia e quadras Society.', numberStar: 4, numberAviations: 6 },
    { id: 8, name: 'Paintball', description: 'Aluguel de quadras de areia e quadras Society.', numberStar: 4, numberAviations: 6 }
  ]
  return (
    <View style={{ height: 400, display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
      <Text style={{ textAlign: 'left', marginLeft: 4, fontSize: 20, fontWeight: 'bold', color: '#F0F6E9' }}>Horários disponíveis</Text>
      <FlatList
        keyExtractor={(item) => item.name}
        data={filters}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <AvailableHours {...item} />}
      />
    </View>
  )
}
