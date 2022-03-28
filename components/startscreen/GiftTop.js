import { View, Text, Image, TouchableOpacity,  } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function GiftTop(props,{navigation}) {
    useEffect(() => {
        props.setShowGiftTop(true)
        setTimeout(()=>{
            console.log("hide")
            props.setShowGiftTop(false)
            setTimeout(()=>{
                props.setShowGiftTop(true)
            },30000)
        },60000)    
    }, [props.showGiftTop])
    
    
  return (
    <TouchableOpacity style={{ flex: 1 }}
        onPress={()=>{
            // props.setShowGiftTop(false)
            props.navigation.navigate('clickgift')
        }}
    >
        <Image
            source={props.image}
            style={{ 
                width : 100,
                height: 100
                }}
                resizeMode='contain'
        />
    </TouchableOpacity>
  )
}