import { View, Text, TouchableOpacity, SafeAreaView, Image, Alert, TextInput } from 'react-native'

import React from 'react'
import { useState } from 'react'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { themeColors } from '../theme'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useNavigation } from '@react-navigation/native'


export default function ForgetpasswordScreen() {
    const [email, setEmail] = useState(null)
    const navigation = useNavigation();

    async function handleSubmit() {
        try {
            await sendPasswordResetEmail(auth, email)
        } catch (error) {
            console.log("Eer", error)
        }
    }

    return (
        <View className="flex-1 bg-white" style={{ backgroundColor: themeColors.bgColor(1) }}>
            <SafeAreaView className="flex pt-10 ">
                <View className="flex-row justify-start align-middle">
                    <TouchableOpacity onPress={() => navigation.goBack()}
                        className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
                        <ArrowLeftIcon size="20" color="black" />
                    </TouchableOpacity>
                    {/* <Text>Forget Password</Text> */}

                </View>
                <View className="flex-row justify-center">
                    <Image source={require('../assets/images/login.png')}
                        style={{ width: 200, height: 200 }} />
                </View>


            </SafeAreaView>
            <View
                style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
                className="flex-1 px-8 pt-8 bg-white">
                <View className="form space-y-2">
                    <Text className="text-gray-700 ml-4">Email Address</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                        placeholder="Enter Email"
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => handleSubmit()}
                    className="py-3 bg-yellow-400 rounded-xl">
                    <Text
                        className="text-xl font-bold text-center text-gray-700"
                    >
                        Send password reset link
                    </Text>
                </TouchableOpacity>

            </View>
        </View>

    )
}