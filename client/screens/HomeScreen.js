import { View, Text, SafeAreaView, StatusBar, Image, TextInput, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import Categories from '../components/categories'
import FeatureRow from '../components/featuredRow'
import { getFeaturedResturants } from '../api';
import * as Icon from "react-native-feather";
import { themeColors } from '../theme'

export default function HomeScreen() {
    const [searchedCategories, setSearchedCategories] = useState([]) //same as featuredCategories but this is used to render pnly searched categories.
    const [featuredCategories, setFeaturedCategories] = useState([])
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [])
    useEffect(() => {
        getFeaturedResturants().then(data => {
            // console.log("data",data )
            setFeaturedCategories(data);
            setSearchedCategories(data)
        })
    }, [])

    function searchRestaurants(searchedValue) {
        console.log("searchedValue",searchedValue)
        let temp = []
        if(searchedValue){
            let temp = featuredCategories.filter(obj => obj.name.toLowerCase().includes(searchedValue.toLowerCase()));
            setSearchedCategories(temp)

        }else{
            setSearchedCategories(featuredCategories)
        }

    }


    return (
        <SafeAreaView className="bg-white" >
            <StatusBar
                barStyle="dark-content"
                StatusBarStyle="default"
                backgroundColor={'#fff'}
            // hidden={true}
            />
            {/* search bar */}
            <View className="flex-row items-center space-x-2 px-4 pb-2 ">
                <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
                    <Icon.Search height="25" width="25" stroke="gray" />
                    <TextInput onChangeText={(value) => searchRestaurants(value)} placeholder='Restaurants' className="ml-2 flex-1" keyboardType='default' />
                    <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
                        <Icon.MapPin height="20" width="20" stroke="gray" />
                        <Text className="text-gray-600">Shilpa hills</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: themeColors.bgColor(1) }} className="p-3 rounded-full">
                    <Icon.Sliders height={20} width={20} strokeWidth="2.5" stroke="white" />
                </View>
            </View>



            {/* main */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 50
                }}
            >

                {/* categories */}
                <Categories />

                {/* featured */}
                <View className="mt-5">
                    {
                        searchedCategories?.map(category => {
                            return (
                                <FeatureRow
                                    key={category._id}
                                    id={category._id}
                                    title={category.name}
                                    resturants={category?.restaurants}
                                    description={category.description}
                                    featuredCategory={category._type}
                                />
                            )
                        })
                    }
                </View>




            </ScrollView>

        </SafeAreaView>
    )
}
