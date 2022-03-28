import React from 'react';
import {View,Text} from 'react-native';

export const CreateRandomAvatar = ({name,width,height,sizeText})=>(
    <View 
        style={
            { 
                width,
                height,
                backgroundColor:generateColor(),
                borderRadius:5,
                justifyContent:'center',
                alignItems:'center'
            }
        }
    >
        <Text style={{ color:'white',fontSize:sizeText }}>{name[0]}</Text>
    </View>
)

const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
};