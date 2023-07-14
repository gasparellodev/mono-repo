import React, { useEffect, useRef, useState } from 'react'
import { Button, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import AvailableHours from '../AvailableHours'

export default function SlideOrderAvailableHours() {

  const filters = [
    { id: 1, name: 'Jogar de tarde', description: 'Ver agenda' },
    { id: 2, name: 'Jogar de noite', description: 'Ver agenda' },
    { id: 3, name: 'Jogar de manhã', description: 'Ver agenda' },
    { id: 4, name: 'Jogar de', description: 'Ver agenda' },
    { id: 5, name: 'futevolei', description: 'Ver agenda' },
    { id: 6, name: 'Futebol', description: 'Ver agenda' },
    { id: 7, name: 'Basquete', description: 'Ver agenda' },
    { id: 8, name: 'Paintball', description: 'Ver agenda' }
  ]
  return (
    <View style={{ height: 160, display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
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
