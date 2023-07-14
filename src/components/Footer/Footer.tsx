import React from 'react'
import { Image, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import home from "@assets/Home.png";
import person from "@assets/Person.png";
import calendar from "@assets/calendar.png";
import search from "@assets/Search.png";

export default function Footer() {
    return (
        <View style={{ height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }}>
            <TouchableOpacity style={{ width: 56, height: 60, margin: 16 }}>
                <Image
                    source={home}
                    alt='home'
                    style={{ width: 40, height: 40 }}
                />
                <Text>Inicio</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 56, height: 60, margin: 16 }}>
                <Image
                    source={person}
                    alt='person'
                    style={{ width: 40, height: 40 }}
                />
                <Text>Buscar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 56, height: 60, margin: 16 }}>
                <Image
                    source={calendar}
                    alt='calendar'
                    style={{ width: 40, height: 40 }}
                />
                <Text>Agenda</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 56, height: 60, margin: 16 }}>
                <Image
                    source={search}
                    alt='search'
                    style={{ width: 40, height: 40 }}
                />
                <Text>Perfil</Text>
            </TouchableOpacity>
        </View>
    )
}
