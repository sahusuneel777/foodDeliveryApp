import { View, Text, StatusBar, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useMemo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromBasket,addToBasket, selectBasketItems, selectBasketTotal } from '../slices/basketSlice';
import { selectResturant } from '../slices/resturantSlice';
import { useNavigation } from '@react-navigation/native';
import { urlFor } from '../sanity';
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import { Audio } from 'expo-av';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function BasketScreen() {
    const [sound, setSound] = useState();

    const resturant = useSelector(selectResturant);
    const [groupedItems, setGroupedItems] = useState([])
    const basketItems = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal);

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const deliveryFee = 2;

    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(require('../assets/zomato.mp3')
        );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
    }

    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    useMemo(() => {
        const gItems = basketItems.reduce((group, item) => {
            if (group[item.id]) {
                group[item.id].push(item);
            } else {
                group[item.id] = [item];
            }
            return group;
        }, {})
        setGroupedItems(gItems);
        // console.log('items: ',gItems);

    }, [basketItems])



    function handlePlaceOrder() {
        navigation.navigate('PreparingOrder')
        setTimeout(() => {
            playSound()
        }, 1000)

    }

    return (
        <View className=" bg-white flex-1">
            {/* top button */}
            <View className="relative py-4 shadow-sm">
                <TouchableOpacity
                    style={{ backgroundColor: themeColors.bgColor(1) }}
                    onPress={navigation.goBack}
                    className="absolute z-10 rounded-full p-1 shadow top-5 left-2">
                    <Icon.ArrowLeft strokeWidth={3} stroke="white" />
                </TouchableOpacity>
                <View>
                    <Text className="text-center font-bold text-xl">Your cart</Text>
                    <Text className="text-center text-gray-500">{resturant.title}</Text>
                </View>

            </View>

            {/* delivery time */}
            {basketTotal == 0 ? <View style={{ height: hp('50%'), display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                <Image source={require('../assets/images/addToCart.png')} className="ph-6 h-40 w-40" />
                <Text className="font-extrabold text-gray text-lg">Your Cart Is Empty</Text>
                <Text className="text-gray-700">Looks like you haven't added anything to your cart yet.</Text>
            </View> : <>
                <View style={{ backgroundColor: themeColors.bgColor(0.2) }} className="flex-row px-4 items-center">
                    <Image source={require('../assets/images/bikeGuy.png')} className="w-20 h-20 rounded-full" />
                    <Text className="flex-1 pl-4">Deliver in 20-30 minutes</Text>
                    <TouchableOpacity>
                        <Text style={{ color: themeColors.text }} className="font-bold">Change</Text>
                    </TouchableOpacity>
                </View>

                {/* dishes */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    className="bg-white pt-5"
                    contentContainerStyle={{
                        paddingBottom: 50
                    }}

                >
                    {
                        Object.entries(groupedItems).map(([key, items]) => {
                            return (
                                <View key={key}
                                    className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md">
                                    <Text style={{ color: themeColors.text }} className="font-bold">{items.length} x </Text>
                                    <Image className="h-14 w-14 rounded-full" source={{ uri: urlFor(items[0]?.image).url() }} />
                                    <Text className="flex-1 font-bold text-gray-700">{items[0]?.name}</Text>
                                    <TouchableOpacity
                                        className="p-1 rounded-full"
                                        style={{ backgroundColor: themeColors.bgColor(1) }}
                                        onPress={() => dispatch(removeFromBasket({ id: items[0]?.id }))}>
                                        <Icon.Minus strokeWidth={2} height={20} width={20} stroke="white" />
                                    </TouchableOpacity>
                                    <Text className="font-semibold text-base">${items[0]?.price}</Text>
                                    <TouchableOpacity
                                        className="p-1 rounded-full"
                                        style={{ backgroundColor: themeColors.bgColor(1) }}
                                        onPress={() => dispatch(addToBasket(items[0]))}>
                                        <Icon.Plus strokeWidth={2} height={20} width={20} stroke="white" />
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                </ScrollView>
                {/* totals */}
                <View style={{ backgroundColor: themeColors.bgColor(0.2) }} className=" p-6 px-8 rounded-t-3xl space-y-4">
                    <View className="flex-row justify-between">
                        <Text className="text-gray-700">Subtotal</Text>
                        <Text className="text-gray-700">${basketTotal}</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text className="text-gray-700">Delivery Fee</Text>
                        <Text className="text-gray-700">${deliveryFee}</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text className="font-extrabold">Order Total</Text>
                        <Text className="font-extrabold">${basketTotal + deliveryFee}</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={{ backgroundColor: themeColors.bgColor(1) }}
                            onPress={() => handlePlaceOrder()}
                            className="p-3 rounded-full">
                            <Text className="text-white text-center font-bold text-lg">Place Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </>}
        </View>
    )
}
