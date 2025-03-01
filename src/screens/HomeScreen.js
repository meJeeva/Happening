import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { CustomText } from '../components/Custom';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CheckBox, Dialog, useTheme } from '@rneui/themed';
import { FONTS } from '../utils/constant';
import CustomToggle from '../components/CustomToggle';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const TYPES = [
  {
    title: 'Entertainment',
    value: '1',
  },
  {
    title: 'Academic',
    value: '2',
  },
  {
    title: 'Volunteering',
    value: '3',
  },
];

const CATEGORIES = [
  {
    title: 'Plays',
    value: 1,
    image:
      'https://media.istockphoto.com/id/625222370/photo/audience-applauding-in-the-theater.jpg?s=612x612&w=0&k=20&c=4mz7j4km5-QfVTTWkdcmWYloy2Kjd8Ay2D_-Log_OCc=',
  },
  {
    title: 'Pets Show',
    value: 2,
    image:
      'https://media.istockphoto.com/id/184642127/photo/agility.jpg?s=612x612&w=0&k=20&c=2kPdNZAlya5CK1jFxDMgh_svQ9obz-2yq6v7KVUdSJU=',
  },
  {
    title: 'Concert',
    value: 3,
    image:
      'https://media.istockphoto.com/id/1806011581/photo/overjoyed-happy-young-people-dancing-jumping-and-singing-during-concert-of-favorite-group.jpg?s=612x612&w=0&k=20&c=cMFdhX403-yKneupEN-VWSfFdy6UWf1H0zqo6QBChP4=',
  },
  {
    title: 'Magicians',
    value: 4,
    image:
      'https://media.istockphoto.com/id/1353913402/vector/circus-magician-top-hat-and-magic-wand-trick.jpg?s=612x612&w=0&k=20&c=t7s79NoJC38OPNE6OHWKKKoY1tNbXz4Vw9a6vbKqoaU=',
  },
  {
    title: 'Food Fest',
    value: 5,
    image:
      'https://media.istockphoto.com/id/973974430/photo/beer-and-pretzel-beer-fest-munich-germany.jpg?s=612x612&w=0&k=20&c=U5y91ktgfP_QO3sw3O2NQcqhnEshjmE1Jmu46YElmD4=',
  },
  {
    title: 'Dance',
    value: 6,
    image:
      'https://media.istockphoto.com/id/1267332085/photo/stylish-man-and-woman-dancing-hip-hop-in-bright-clothes-on-gradient-background-at-dance-hall.jpg?s=612x612&w=0&k=20&c=1gekhO1digiwDXAJBhLZFVUvqKv_2Nsy1UX-8SlSvCM=',
  },
  {
    title: 'Plays',
    value: 7,
    image:
      'https://media.istockphoto.com/id/625222370/photo/audience-applauding-in-the-theater.jpg?s=612x612&w=0&k=20&c=4mz7j4km5-QfVTTWkdcmWYloy2Kjd8Ay2D_-Log_OCc=',
  },
  {
    title: 'Premiere',
    value: 8,
    image:
      'https://media.istockphoto.com/id/1066484598/photo/red-carpet-entrance.jpg?s=612x612&w=0&k=20&c=x6DmqtcKwo2QZWPgiyUqu-xQ12fErGNghhr2kDnRE6Q=',
  },
  {
    title: 'Sports',
    value: 9,
    image:
      'https://media.istockphoto.com/id/1502846052/photo/textured-soccer-game-field-with-neon-fog-center-midfield.jpg?s=612x612&w=0&k=20&c=LPSo6ps1NfZ_xviL0tmhnnrcLjjFXAQhsYr3qAOfviY=',
  },
  {
    title: 'Parties',
    value: 10,
    image:
      'https://media.istockphoto.com/id/486420378/photo/head-is-swimming-on-dance-floor.jpg?s=612x612&w=0&k=20&c=EiMJlGkIDN5aPdr8-QHzAIU6R8Siago92eisJZCNqts=',
  },
];

const MOST_POPULAR = [
  {
    image:
      'https://media.istockphoto.com/id/1160645050/photo/silhouette-of-woman-with-microphone-singing-on-concert-stage-in-front-of-crowd.jpg?s=612x612&w=0&k=20&c=RdUWFj7Wa76rmHqobtDm1XflUFMDQ1dbZyz4wyQATxY=',
    id: 1,
  },
  {
    image:
      'https://media.istockphoto.com/id/180868820/photo/cricket-batsman-about-to-strike-ball.jpg?s=612x612&w=0&k=20&c=xRiAIk3RA6cmm1FtI2S-YK8Pei9qSkqxhX-JUbTI2Cs=',
    id: 2,
  },
  {
    image:
      'https://media.istockphoto.com/id/173573801/photo/theater-seats-in-an-empty-auditorium.jpg?s=612x612&w=0&k=20&c=0tQCVQfpRV2lOyEAToHLF316H8vd3YOgpNZ56tZjunM=',
    id: 3,
  },
];

const RECENT_LOCATIONS = [
  {
    address: 'Sheikh Sarai, #14 JL Road, Delhi',
    id: 1,
  },
  {
    address: 'Saket, 2nd main, Saket main road',
    id: 2,
  },
];

const BOOKING = [
  {
    image:
      'https://img.freepik.com/free-photo/close-up-recording-video-with-smartphone-concert_1153-7311.jpg?t=st=1740537700~exp=1740541300~hmac=ba053795699da2154e687a5c6391800aeab3c6622721d5fb287ede14dcfc6c5a&w=1060',
    id: 1,
  },
  {
    image:
      'https://img.freepik.com/premium-photo/group-people-are-celebrating-with-confetti-air_913495-8499.jpg?ga=GA1.1.1752565644.1735871480&semt=ais_hybrid',
    id: 2,
  },
];

const chunkArray = (arr, chunkSize) => {
  if (!arr || arr.length === 0) return [];
  let result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
};

const HomeScreen = () => {
  const [state, setState] = useState({
    selectedType: { title: '', value: '' },
    showSelectLocationModal: false,
    selectedLocation: 0,
  });

  const { theme } = useTheme();
  const { navigate } = useNavigation();

  const translateY = useSharedValue(300);

  useEffect(() => {
    initialFunction();
  }, []);

  useEffect(() => {
    if (state.showSelectLocationModal) {
      translateY.value = withSpring(0, { damping: 15 });
    } else {
      translateY.value = withSpring(600, { damping: 15 });
    }
  }, [state.showSelectLocationModal]);

  const initialFunction = () => {
    setState(prev => ({ ...prev, selectedType: TYPES[0] }))
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const toggleDialog = () => {
    setState(prev => ({
      ...prev,
      showSelectLocationModal: !prev.showSelectLocationModal,
    }));
  };

  return (
    <View className="flex-1 p-5">
      <View className="flex-row items-center relative">
        <CustomText className="text-center">H A P P E N I N G</CustomText>
        <TouchableOpacity className="ml-auto">
          <MaterialIcons name="notifications" size={25} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={toggleDialog}
        className="mt-4 bg-violet-100 p-3 rounded-sm flex-row items-center">
        <MaterialIcons name="location-pin" size={25} />
        <View className="ml-3">
          <CustomText className="text-violet-800">Bangalore</CustomText>
          <CustomText>#2 KR Layout, Indirnagar</CustomText>
        </View>
      </TouchableOpacity>

      <View>
        <FlatList
          data={TYPES}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() =>
                setState(prev => ({
                  ...prev,
                  selectedType: item,
                }))
              }
              className={`flex-1 items-center border-gray-300 border px-3 py-1 
                            ${index === 0 ? 'border-l rounded-l-lg' : ''}
                            ${index === 2 ? 'rounded-r-lg' : ''}
                            ${index === 1 ? 'px-5' : ''}
                            ${state.selectedType.value === item.value
                  ? 'border-violet-600 bg-violet-100'
                  : ''
                }
                        `}
              key={item.value}>
              <CustomText
                className={`
                                ${state.selectedType.value === item.value
                    ? 'text-violet-600'
                    : ''
                  }
                            `}>
                {item.title}
              </CustomText>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-evenly' }}
          className="mt-4"
          horizontal
        />
      </View>

      <ScrollView>
        <View className="mt-5">
          <CustomText className="text-lg mb-2">Pick your category</CustomText>
          {CATEGORIES && CATEGORIES.length > 0 && (
            <FlatList
              data={chunkArray(CATEGORIES, 2)}
              renderItem={({ item }) => (
                <View
                  style={{
                    justifyContent: 'space-between',
                    backgroundColor: '#f0f0f0',
                    borderRadius: 8,
                  }}
                  className="p-2">
                  {item.map(subItem => (
                    <View
                      key={subItem.id}
                      className=" bg-gray-200 rounded-lg mb-5">
                      <Image
                        source={{ uri: subItem.image }}
                        className="h-16 w-20"
                        style={{
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                        }}
                      />
                      <CustomText className="text-center text-xs py-1">
                        {subItem.title}
                      </CustomText>
                    </View>
                  ))}
                </View>
              )}
              horizontal
              keyExtractor={(_, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: 10,
              }}
            />
          )}
        </View>

        <View className="mt-2">
          <CustomText className="text-lg mb-2" onPress={() => navigate('SelectSeats')}>Most Popular</CustomText>

          <FlatList
            data={MOST_POPULAR}
            renderItem={({ item, index }) => (
              <TouchableOpacity key={item.id}>
                <Image
                  source={{ uri: item.image }}
                  className="w-64 mr-5 rounded-md h-40"
                />
              </TouchableOpacity>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-3"
          />
        </View>

        <View className="mt-5">
          <CustomText className="text-lg mb-2">Resume you booking</CustomText>

          <FlatList
            data={BOOKING}
            renderItem={({ item, index }) => (
              <TouchableOpacity>
                <Image
                  source={{ uri: item.image }}
                  className="w-44 h-32 mr-5 rounded-md"
                />
                <TouchableOpacity className='bg-white absolute rounded-full right-5 m-1'>
                  <AntDesign name="close" size={16} />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>

      {/* dialog */}
      <Dialog
        isVisible={state.showSelectLocationModal}
        onBackdropPress={toggleDialog}
        overlayStyle={[
          {
            width: '100%',
            height: '50%',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          },
          animatedStyle,
        ]}>
        <CustomText
          style={{
            fontFamily: FONTS.montserratBold,
            fontSize: 18,
          }}>
          Select your location
        </CustomText>
        <View className="flex-row items-center">
          <CustomText className="my-4 mr-5">
            Phone location permission
          </CustomText>
          <CustomToggle />
        </View>
        <CustomText className="text-lg">Current Location</CustomText>

        <TouchableOpacity
          onPress={toggleDialog}
          className="mt-4 p-3 rounded-sm flex-row items-center justify-between">
          <View className="flex-row items-center">
            <MaterialIcons name="location-pin" size={30} />
            <View className="ml-3">
              <CustomText className="text-violet-800">Bangalore</CustomText>
              <CustomText>#2 KR Layout, Indirnagar</CustomText>
            </View>
          </View>
          <CheckBox
            checked={state.selectedLocation === 0}
            onPress={() => setState(prev => ({ ...prev, selectedLocation: 0 }))}
            iconType="material-community"
            checkedIcon="radiobox-marked"
            uncheckedIcon="radiobox-blank"
            checkedColor={theme.colors.violet}
          />
        </TouchableOpacity>

        <CustomText className="text-lg">Recent Location</CustomText>
        <FlatList
          data={RECENT_LOCATIONS}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={toggleDialog}
                className=" px-3 rounded-sm flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <MaterialIcons name="location-pin" size={20} />
                  <View className="ml-3">
                    <CustomText>{item.address}</CustomText>
                  </View>
                </View>
                <CheckBox
                  checked={state.selectedLocation === 0}
                  onPress={() =>
                    setState(prev => ({ ...prev, selectedLocation: 0 }))
                  }
                  iconType="material-community"
                  checkedIcon="radiobox-marked"
                  uncheckedIcon="radiobox-blank"
                  checkedColor={theme.colors.violet}
                />
              </TouchableOpacity>
            );
          }}
        />
        <TouchableOpacity className="justify-end  bg-violet-500 ml-auto  items-center p-2 rounded-full">
          <CustomText className="text-white text-base px-4">Confirm</CustomText>
        </TouchableOpacity>
      </Dialog>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
