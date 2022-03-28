import React from 'react';
import {View,StyleSheet} from 'react-native';
import { WebView } from 'react-native-webview';

function TakeMoneyWebView(){
    return(
        <View style={styles.wrapper}>
            <WebView
                source={{
                    uri: 'https://www.baovui24h.com/ruttienvenganhang'
                }}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    wrapper:{
        flex:1
    }
})
export default TakeMoneyWebView;