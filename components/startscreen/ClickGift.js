import React from 'react';
import {View,StyleSheet} from 'react-native';
import { WebView } from 'react-native-webview';

function ClickGift(){
    const URL = "https://api.flygame.io/igr?partner=com.volio.yonline&widgetId=569"
    return(
        <View style={styles.wrapper}>
        <WebView
            source={{
                uri: URL
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
export default ClickGift;