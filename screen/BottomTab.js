import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from '../components/startscreen/Home';
import Play from '../components/startscreen/Play';
import Introduce from '../components/startscreen/Introduce';
import Profile from '../components/startscreen/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

function BottomTab(){
    return(
    <Tab.Navigator
        screenOptions={{ 
            headerShown:false,
            tabBarShowLabel:false,
            tabBarStyle:{
                position:'absolute',
                backgroundColor:'white',
                borderTopLeftRadius:16,
                borderTopRightRadius:16,
                borderTopWidth:1,
                elevation:6,
                borderTopColor: 'white',
            }

         }}
    >
        <Tab.Screen name='Home' component={Home}
            options={{
                tabBarIcon: ({focused})=>(
                    <View style={{ alignItems : "center", justifyContent : "center",top:3}}>
                        {focused ? <>
                            <LinearGradient 
                                colors={['#a1def5','#7471EF','#7471EF','#9966CB']}
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                                style={ focused ? styles.focus : null }>
                                <FontAwesome name="home" size={22} color={'white'}/>
                            </LinearGradient>
                            <Text style={{ color : focused ? '#7471EF' : '#748c94', fontSize : 12, bottom:10}}>Trang Chủ</Text>
                        </>:
                        <Ionicons name="home-outline" size={22}/>
                        }
                        
                    </View>
                )
            }}
        />
        <Tab.Screen name='Play' component={Play}
             options={{
                tabBarIcon: ({focused})=>(
                    <View style={{ alignItems : "center", justifyContent : "center",top:3}}>
                        {focused ? <>
                            <LinearGradient 
                                colors={['#a1def5','#7471EF','#7471EF','#9966CB']}
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                                style={ focused ? styles.focus : null }>
                                <Ionicons name="play" size={22} color={'white'}/>
                            </LinearGradient>
                            <Text style={{ color : focused ? '#7471EF' : '#748c94', fontSize : 12, bottom:10}}>Giải trí</Text>
                        </>:
                        <Feather name="play-circle" size={22} />
                        }
                        
                    </View>
                )
            }}
        />
        <Tab.Screen name='Introduce' component={Introduce}
             options={{
                tabBarIcon: ({focused})=>(
                    <View style={{ alignItems : "center", justifyContent : "center",top:3}}>
                        {focused ? <>
                            <LinearGradient 
                                colors={['#a1def5','#7471EF','#7471EF','#9966CB']}
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                                style={ focused ? styles.focus : null }>
                                <AntDesign name="gift" size={22} color={'white'}/>
                            </LinearGradient>
                            <Text style={{ color : focused ? '#7471EF' : '#748c94', fontSize : 12, bottom:10}}>Giới thiệu</Text>
                        </>:
                        <AntDesign name="gift" size={22} />
                        }
                        
                    </View>
                )
            }}
        />
        <Tab.Screen name='Profile' component={Profile}
             options={{
                tabBarIcon: ({focused})=>(
                    <View style={{ alignItems : "center", justifyContent : "center",top:3}}>
                        {focused ? <>
                            <LinearGradient 
                                colors={['#a1def5','#7471EF','#7471EF','#9966CB']}
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                                style={ focused ? styles.focus : null }
                            >
                                <FontAwesome name="user" size={22} color={'white'}/>
                            </LinearGradient>
                            <Text style={{ color : focused ? '#7471EF' : '#748c94', fontSize : 12, bottom:10}}>Cá nhân</Text>
                        </>:
                        <FontAwesome name="user-o" size={22} />
                        }
                        
                    </View>
                )
            }}
        />

    </Tab.Navigator>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    shadow:{
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowColor:'#000',
        shadowOpacity:0.45,
        shadowRadius:5,
        elevation:3,
    },
    tabarIcon:{
        alignItems:'center',
        justifyContent:'center',
        top:3,
    },
    focus:{
        // backgroundColor:'#7471EF',
        width: 35,
        height: 35,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 50,
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:10 ,
        },
        shadowOpacity:0.6,
        shadowRadius:4,
        elevation:7,
        bottom:15,
    }
})

export default BottomTab;