import { Flex } from "@components/Flex";
import { VStack } from "@components/VStack";
import { useRoute } from "@react-navigation/native";
import { Image, View } from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from "react-native-paper";
import { UserLocation } from "@components/UserLocation";
import imageBackground from "@assets/messageNotification.png"
import { AppHeader } from "@components/AppHeader";
import { Input } from "@components/Forms/Input";
import { Controller, useForm } from "react-hook-form";
import { signUpFirstStepSchema } from "@screens/schemas/sign-up-first-step.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@components/Forms/Button";
import { SelectInput } from "@components/Forms/SelectInput";
import { useState } from "react";
import { EditProfileSchema } from "@screens/schemas/edit-profile.schema";


type FormDataProps = {
    name: string;
    surname: string;
    favorite_sport: string;
    favorite_time: string;
};


export function EditProfile() {
    const route = useRoute();
    const { colors } = useTheme();
    const [favoriteTime, setFavoriteTime] = useState("Selecione o horário favorito");
    const [favoriteSport, setFavoriteSport] = useState("Selecione o esporte");
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataProps>({
        resolver: zodResolver(EditProfileSchema),
    });

    const changePassword = ({ favorite_sport, favorite_time, name, surname }: FormDataProps) => {
        console.log(favorite_sport, favorite_time, name, surname)
    }


    return (
        <Flex flex={1} backgroundColor={colors.background}>


            <AppHeader title="Voltar" isChangePassword />
            <View style={{
                backgroundColor: colors.primary, paddingHorizontal: 24,
                paddingTop: 16,
                paddingBottom: 16,
            }} >
                <Text style={{
                    color: 'black',
                    fontWeight: 'bold'
                }}>Editar perfil </Text>
                <Text style={{
                    color: 'black'
                }}>Atualize todos seus dados</Text>
            </View>
            <VStack
                style={{
                    paddingHorizontal: 24,
                    paddingTop: 16,
                    flexDirection: 'column',
                    gap: 15
                }}
                flex={1}
            >
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            label="Nome completo"
                            placeholder="Fulano da silva junior"
                            autoCapitalize="none"
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.name?.message}
                            autoComplete="name"
                        />
                    )}
                    name="name"
                />
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            label="Apelido"
                            placeholder="Fulano"
                            secureTextEntry
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.surname?.message}
                            autoComplete="username"
                        />
                    )}
                    name="surname"
                />
                <Controller
                    control={control}
                    render={() => (
                        <SelectInput
                            label="Esporte favorito"
                            value={favoriteSport}
                            // onChange={handleSelectFavoriteSport}
                            errorMessage={errors.favorite_sport?.message}
                        />
                    )}
                    name="favorite_sport"
                />

                <Controller
                    control={control}
                    render={() => (
                        <SelectInput
                            label="Horário favorito"
                            value={favoriteTime}
                            // onChange={handleSelectFavoriteTime}
                            errorMessage={errors.favorite_time?.message}
                        />
                    )}
                    name="favorite_time"
                />
                <Button onPress={handleSubmit(changePassword)}>Salvar Alterações</Button>
            </VStack>
        </Flex>
    )
}