import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import ball from "@assets/ball.png";

type AvailableHoursProps = {
    id: number;
    name: string;
    description: string;
}

export default function AvailableHours({ name, id, description }: AvailableHoursProps) {

    return (
        <View style={{ display: 'flex', width: "auto", height: 140, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{ display: 'flex', backgroundColor: '#F0F6E9', maxWidth: 280, flexDirection: 'row', padding: 4, alignItems: 'center', marginRight: 5, marginLeft: 5, borderRadius: 12 }}>
                <Image
                    source={ball}
                    alt='return'
                    style={{ width: 140, height: 100, borderRadius: 12, marginLeft: 4 }}
                />
                <View>
                    <Text style={{ textAlign: 'center', marginLeft: 4 }}>{name}</Text>
                    <Text style={{ textAlign: 'center', marginLeft: 4, color: '#33BE3D' }}>{description}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}