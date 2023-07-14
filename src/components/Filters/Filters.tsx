import React, { useEffect, useRef, useState } from 'react'
import { Button, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useKeenSliderNative } from "keen-slider/react-native"

type FiltersProps = {
    id: number;
    name: string;
    isSelected: boolean;
}

export default function Filters({ name, id, isSelected }: FiltersProps) {

    const color = isSelected ? '#33BE3D' : '#F9FAF3'
    const colorText = isSelected ? '#F9FAF3' : '#5D5F5A'
    
    return (
        <View style={{ display: 'flex', width: 130, height: 40, justifyContent: 'center', alignItems: 'center', }}>
            <TouchableOpacity style={{ display: 'flex', borderWidth: 1, minWidth: 120, height: 30, borderRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: color, maxWidth: 'auto' }}>
                <Text style={{ color: colorText }}>{name}</Text>
            </TouchableOpacity>
        </View>
    )
}
