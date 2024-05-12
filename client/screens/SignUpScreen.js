import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React from 'react'
import { themeColors } from '../theme/index'
import { SafeAreaView, useSafeAreaFrame } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signOut, } from 'firebase/auth';
import { auth } from '../config/firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// subscribe for more videos like this :)
export default function SignUpScreen() {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [name, setName] = useState(null)

    const navigation = useNavigation();

    async function handleSubmit() {
        if (email && password) {
            try {
                await createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // This code block is executed if the user is successfully created.
                        var user = userCredential.user;
                        console.log("User created successfully with email: ", user.email);
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;

                        if (errorCode === 'auth/email-already-in-use') {
                            Alert.alert("The email address is already in use by another account.");
                        } else {
                            // Handle other types of errors (e.g., network errors, etc.)
                            Alert.alert(typeof (errorMessage) == 'string' ? errorMessage : 'Can`\nt create account at this time.');
                        }

                    })
            } catch (err) {
                console.log("got error", err)

            }
        } else {
            Alert.alert('All fields are mandatory.')
        }
    }

    return (
        <KeyboardAwareScrollView style={{ height: hp('100%'), backgroundColor: themeColors.bgColor(1) }}>

            {/* <View className="flex-1" style={{ backgroundColor: themeColors.bgColor(1) }}> */}
            <SafeAreaView className="flex">
                <View className="flex-row justify-start">
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-5"
                    >
                        <ArrowLeftIcon size="20" color="black" />
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center">
                    <Image source={require('../assets/images/signup.png')}
                        style={{ width: 165, height: 110 }} />
                </View>
            </SafeAreaView>
            <View className="flex-1 px-8 pt-8"
                style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
            >
                <View className="form space-y-2">
                    <Text className="text-gray-700 ml-4">Full Name</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-2"
                        value={name}
                        onChangeText={(value) => setName(value)}
                        placeholder='Enter Name'
                    />
                    <Text className="text-gray-700 ml-4">Email Address</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-2"
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                        placeholder='Enter Email'
                    />
                    <Text className="text-gray-700 ml-4">Password</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-5"
                        secureTextEntry
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                        placeholder='Enter Password'
                    />
                    <TouchableOpacity
                        className="py-3 bg-yellow-400 rounded-xl"
                        onPress={() => handleSubmit()}
                    >
                        <Text className="font-xl font-bold text-center text-gray-700">
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text className="text-xl text-gray-700 font-bold text-center py-2">
                    Or
                </Text>
                <View className="flex-row justify-center space-x-12">
                    <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                        <Image source={require('../assets/images/icons/google.png')}
                            className="w-10 h-10" />
                    </TouchableOpacity>
                    <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                        <Image source={require('../assets/images/icons/apple.png')}
                            className="w-10 h-10" />
                    </TouchableOpacity>
                    <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                        <Image source={require('../assets/images/icons/facebook.png')}
                            className="w-10 h-10" />
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center mt-5 mb-5">
                    <Text className="text-gray-500 font-semibold">Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text className="font-semibold text-yellow-500"> Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}
