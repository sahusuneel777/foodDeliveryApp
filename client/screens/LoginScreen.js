import { View, Text, TouchableOpacity, Image, Alert, TextInput,TouchableWithoutFeedback,  KeyboardAvoidingView, Keyboard } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function LoginScreen() {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const navigation = useNavigation();

  async function handleSubmit() {
    if (email && password) {
      try {
        let f = await signInWithEmailAndPassword(auth, email, password)
        console.log(f)
      } catch (err) {
        console.log("got error", err)
      }
    } else {
      Alert('All fields are mandatory.')
    }
  }

  const DismissKeyboardView = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
  



  return (
    // <DismissKeyboardView>

    <KeyboardAwareScrollView style={{ backgroundColor: themeColors.bgColor(1) }}>
      <SafeAreaView className="flex ">
        <View className="flex-row justify-start">
          <TouchableOpacity onPress={() => navigation.goBack()}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
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
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            secureTextEntry
            placeholder="Enter Password"
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <TouchableOpacity onPress={() => {navigation.navigate('ForgetPasswrod') }} className="flex items-end">
            <Text className="text-gray-700 mb-5">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSubmit()}
            className="py-3 bg-yellow-400 rounded-xl">
            <Text
              className="text-xl font-bold text-center text-gray-700"
            >
              Login
            </Text>
          </TouchableOpacity>

        </View>
        <Text className="text-xl text-gray-700 font-bold text-center py-5">Or</Text>
        <View className="flex-row justify-center space-x-12">
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require('../assets/images/icons/google.png')} className="w-10 h-10" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require('../assets/images/icons/apple.png')} className="w-10 h-10" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require('../assets/images/icons/facebook.png')} className="w-10 h-10" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text className="font-semibold text-yellow-500"> Sign Up</Text>
          </TouchableOpacity>
        </View>

      </View>
    </KeyboardAwareScrollView>
    // </DismissKeyboardView>

  )
}