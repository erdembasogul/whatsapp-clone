import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, View, Image, Text  } from 'react-native';
import Colors from '../constants/Colors';
import {Octicons, MaterialCommunityIcons, FontAwesome5, MaterialIcons  } from '@expo/vector-icons';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './MainTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import ChatRoomScreen from '../screens/ChatRoomScreen';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

// function LogoTitle() {
//   return (
//     <Image 
//       style={{ width: 50, height: 50 }}
//       source={{ uri: route.params.image }} 
//     />
//   )
// }


function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: Colors.light.tint,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTintColor: Colors.light.background,
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} 
      options={{title: 'WhatsApp',
      headerRight: () => (
        <View style={{flexDirection: 'row', width:60, justifyContent: 'space-between', marginRight:10}}>
          <Octicons name="search" size={22} color={'white'}/>
          <MaterialCommunityIcons name="dots-vertical" size={22} color={'white'} />
        </View>
      )
      }} />
      <Stack.Screen 
        name="ChatRoom" 
        component={ChatRoomScreen} 
        options={({ route }) => ({
          headerTitle: 
          (<View style={{flexDirection:"row"}}>
              <Image style={{ width: 40, height: 40, borderRadius: 50 }} source={{ uri: route.params.image }} />
              <View  style={{flexDirection:"column", paddingLeft: 10}}>
                <Text style={{color: 'white'}}>{route.params.name}</Text>
                <View style={{flexDirection:"row"}}>
                {route.params.users.map(user => (<Text key={user.id} style={{color: 'white'}}>{user.name} </Text>))}
                </View>
              </View>
          </View>),
          headerRight: () => (
            <View style={{flexDirection: 'row', width:100, justifyContent: 'space-between', marginRight:10}}>
              <FontAwesome5 name="video" size={22} color={'white'} />
              <MaterialIcons name="call" size={22} color={'white'} />
              <MaterialCommunityIcons name="dots-vertical" size={22} color={'white'} />            
            </View>
          )
        })} 
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
