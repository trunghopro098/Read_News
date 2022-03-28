import { View,StyleSheet,TouchableOpacity,Image,Linking} from 'react-native'
import React, {useEffect, useState} from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProgressCircle from 'react-native-progress-circle'
export default function Gift(props) {
  // const URL = "https://api.flygame.io/igr?partner=com.volio.yonline&widgetId=569"
  const [Percent, setPercent] = useState(1);

      useEffect(() => {
      const timePersent = setInterval(() => {
        if(Percent>=100){ 
          console.log("dừng1")
          props.setShowGift(false)
          props.setGif(true);
          clearInterval(timePersent)
        }else{
            setPercent(Percent+(0.5))
        }
      }, 10);
     
      return () => {
        clearInterval(timePersent)
      }
    }, [Percent])
  return (
    <View>
        <TouchableOpacity 
            style={styles.btnCancel}
            onPress={()=>{
              setTimeout(() => {
              props.setShowGift(true)
              }, 30000);
              props.setShowGift(false)
            }}
        >
            <MaterialIcons name="cancel" size={24} color="white"/>
        </TouchableOpacity>
        <TouchableOpacity 
            style={styles.itemGift}
            onPress={()=>{
                // await Linking.openURL(URL)
                props.navigation.navigate("clickgift");
            }}
            >
              <ProgressCircle
                        percent={Percent}
                        radius={props.radius}
                        borderWidth={8}
                        color="red"
                        shadowColor="white"
                        bgColor="#fff"
                    >
              <Image
                  source={props.nameImage}
                  style={{
                    width: props.width,
                    height: props.height,
                  }}
                  resizeMode={'cover'}
                  // paused={false}
                />
              </ProgressCircle>
            </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    wrapper:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    btnCancel:{
      width: '100%',
      flexDirection: 'row',
      justifyContent:'flex-end',
    },
    itemGift:{
        justifyContent: 'center',
        alignItems: 'center'
    }
  })