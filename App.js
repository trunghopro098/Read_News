import React from 'react';
import { StyleSheet,StatusBar,LogBox, View, Text, TouchableOpacity,Image} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './screen/BottomTab';
import Login from './screen/Login';
import TakeMoney from './screen/TakeMoney';
import Splash from './components/startscreen/Splash';
import Signin from './components/startscreen/Signin';
import Signup from './components/startscreen/Signup';
import DetailNews from './components/startscreen/DetailNews';
import TakeMoneyWebView from './components/startscreen/TakeMoneyWebView';
import ClickGift from './components/startscreen/ClickGift';
import { windowH } from './util/Dimensions';

import Search from './components/startscreen/Search';


const Stack = createStackNavigator();

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

function App(){
  return(
    <NavigationContainer>
      <StatusBar 
        backgroundColor="rgb(240, 240, 240)"
        barStyle="dark-content"
      />
      <Stack.Navigator 
        initialRouteName="splash"
        screenOptions={{ 
          headerShown:false
        }}
      >

        <Stack.Screen name="search" component={Search} />
        <Stack.Screen name="detailnews" component={DetailNews} options={{headerShown:true,title:"Trở về",headerStyle:{backgroundColor:"rgb(240, 240, 240)"} }}/>
        <Stack.Screen name="splash" component={Splash} />
        <Stack.Screen name="signin" component={Signin} />
        <Stack.Screen name="signup" component={Signup} options={{headerShown:true,title:"Trở về đăng nhập",headerStyle:{backgroundColor:"rgb(240, 240, 240)"} }}/>
        <Stack.Screen name="tab" component={BottomTab} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="takemoney" component={TakeMoneyWebView} options={{headerShown:true,title:"Rút tiền",headerStyle:{backgroundColor:"rgb(240, 240, 240)"} }}/>
        <Stack.Screen name="clickgift" component={ClickGift} options={{headerShown:true,title:"Chơi game nhận thưởng",headerStyle:{backgroundColor:"rgb(240, 240, 240)"} }}/>
      </Stack.Navigator>
      {/* <View style={styles.gift}>
          <TouchableOpacity style={styles.btnCancel}>
                <MaterialIcons name="cancel" size={28} color="white"/>
          </TouchableOpacity>
          <TouchableOpacity>
              <Image
                      source={require('./assets/gift.gif')}
                      style={{
                        width: 100,
                        height: 100,
                      }}
                      resizeMode={'cover'}
                      // paused={false}
                />
            </TouchableOpacity>
      </View> */}
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  wrapper:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  gift:{
    width: 135,
    height: 135,
    backgroundColor: 'pink',
    // backgroundColor: 'transparent',
    position: 'absolute',
    bottom: windowH*0.2,
    right: 10,

  },
  btnCancel:{
    width: '100%',
    flexDirection: 'row',
    justifyContent:'flex-end',
  }
})

export default App;