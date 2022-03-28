import React, { useState,useRef,useEffect } from 'react'
import { View, Text, Dimensions, StyleSheet,Image, TextInput, TouchableOpacity,ToastAndroid } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage  from '@react-native-async-storage/async-storage'
import * as yup from 'yup';
import { Formik } from 'formik';
import { LinearTextGradient } from 'react-native-text-gradient';
import * as GETAPI from '../../util/fetchApi';
import {updateUer} from '../../redux/reducer/user.reducer';
import { useDispatch } from 'react-redux';
const loginValidationSchema = yup.object().shape({
    username: yup
        .string()
        .min(3, ({ min }) => `Tên đăng nhập có ít nhất ${min} ký tự`)
        .required('Nhập tên đăng nhập !!'),
      password: yup
        .string()
        .min(3, ({ min }) => `Mật khẩu có ít nhất ${min} ký tự`)
        .required('Nhập mật khẩu để đăng nhập'),
    })

export default function Signin({navigation, route}){
    const [showPass, setshowPass] = useState(true);  
    const formRef = useRef();
    const dispath = useDispatch();

    useEffect(() => {
        if(route.params!==undefined){
            const { username, password } = route.params;
            console.log(username+",,,,,"+password)
            formRef.current.setValues({username:username,password:password})
        }
    },[])

    const handlesubmit = async(values,{setErrors})=>{
        // console.log(values)
        const res = await GETAPI.postDataAPI('/user/login',values);
        // console.log("day la log : ",res)
        if(res.msg === "Invalid account"){
            setErrors({username:'Tài khoản không tồn tại!'})
        }else if(res.msg === "Incorrect password"){
            setErrors({password:'Mật khẩu không đúng!'})
        }else{
            // console.log(res)
          
            await AsyncStorage.setItem('token',res.token);
            CheckAuth();
            // console.log('..............: ', a)
        }
        
    }
    const CheckAuth = async()=>{
        const token = await AsyncStorage.getItem('token');
        if(token === null || token === undefined){
            return false;
        }
        const data = {'token':token}
        const res = await GETAPI.postDataAPI('/user/getUser',data);
        if(res.msg){
            if(res.msg.message ==='jwt expired'){
                ToastAndroid.showWithGravity(
                    'Phiên đăng nhập đã hết!!!',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                )
                await AsyncStorage.removeItem('token');
                return false;
            }
        }else {
            if(res[0].status === 1){
                await AsyncStorage.removeItem('token');
                return false;
            }else{
                dispath(updateUer(res[0]));
                ToastAndroid.showWithGravity(
                    "Đăng nhập thành công!",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
                navigation.replace('tab')
                return true;
            }
            }
    }



  return (
    <View style={styles.container}>
        <Image 
            source={require('../../assets/logo.jpg')}
            resizeMode='contain'
            style={{ width: windowW*0.25, height: windowH*0.25, borderRadius: 20 }}
         />
        <LinearTextGradient
            style={{fontSize:25, marginTop: -20, fontWeight: 'bold'}}
            locations={[0,1]}
            colors={['#99815B','#FD8469']}
            start={{ x:0, y:0 }}
            end={{ x:1, y: 0 }}
            >
            <Text>
                THE NEWS PAPER VIP
            </Text>
        </LinearTextGradient>
        <Formik
             validationSchema={loginValidationSchema}
             initialValues={{ username: '', password: '' }}
             innerRef={formRef}
             onSubmit={handlesubmit}
        >
        {({ 
        handleChange,
         handleBlur,
        handleSubmit,                    
        values,
        errors,
        isValid,
        touched  }) => (
        <>
            <View style={styles.formlogin}>

            <LinearTextGradient
                style={{fontSize:22, marginTop: 10, fontWeight: 'bold'}}
                locations={[0,1]}
                colors={[	'#4000ff','#bf00ff']}
                start={{ x:0, y:0 }}
                end={{ x:1, y: 0 }}
                >
                <Text>
                    ĐĂNG NHẬP
                </Text>
          </LinearTextGradient>

                <View style={{...styles.wrapIcon, marginTop: 20}}>
                    <TextInput
                        name='username'
                        placeholder='Tên Đăng Nhập' 
                        style={styles.InputText}
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        placeholderTextColor="gray"
                        value={values.username}
                    />
                    <EvilIcons name='lock' size={35}/>
                </View>
                    {(errors.username && touched.username) &&
                        <Text style={styles.errorText}>{errors.username}</Text>
                    }
                <View style={{...styles.wrapIcon, marginTop: 20}}>
                    <TextInput 
                        name='password'
                        placeholder='Mật Khẩu' 
                        style={styles.InputText}
                        secureTextEntry={showPass}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        placeholderTextColor="gray"
                        value={values.password}
                    />
                    <TouchableOpacity
                        onPress={()=>{
                        setshowPass(!showPass)
                        }}
                        style={{ marginRight: 8 }}
                        >
                        {showPass ? <Feather name='eye-off' size={20}/>: <Feather name='eye' size={20}/>} 
                    </TouchableOpacity>
                </View>
                {(errors.password && touched.password) &&
                        <Text style={styles.errorText}>{errors.password}</Text>
                    }
                <TouchableOpacity 
                style={styles.btnlogin} 
                onPress={handleSubmit}
                
                >
                    <Text style={{ fontWeight: 'bold', fontSize:14, color:'white' }}>Đăng Nhập</Text>
                </TouchableOpacity>

                <View style={ styles.toRegister }>
                    <Text style={{ color: 'gray' }}>Bạn có tài khoản chưa?</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate("signup")}>
                        <Text style={{ color: '#02A8EA', fontWeight:'bold' }}> Đăng ký ngay</Text>
                    </TouchableOpacity>
                </View>
            
            </View>
        </>
        )}
        </Formik>
    </View>
  )
}

const windowW = Dimensions.get('window').width;
const windowH = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F7F7F7',
        justifyContent:'flex-start',
        paddingTop: 10,
        alignItems:'center'
    },
    formlogin:{
        backgroundColor:'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width: '100%',
        marginTop:4,
        height:windowH*0.55,
        position:'absolute',
        bottom:0,
        padding: 10,
        justifyContent: 'flex-start',
        alignItems:'center',
        shadowColor:'#000',
        shadowOffset:{
            width: 0,
            height: 2
        },
        shadowOpacity: 0.6,
        shadowRadius: 5,
        elevation: 10
        
    },
    InputText:{
        width: '80%',
        height: 40,
    },

    wrapIcon:{
        justifyContent: 'space-between',
        flexDirection:'row',
        alignItems:'center',
        borderWidth: 0.5,
        borderColor: 'blue',
        width: windowW*0.85,
        borderRadius: 10,
        paddingHorizontal: 10
    },
    btnlogin:{
        marginTop: 20,
        width: windowW*0.85,
        height: 40,
        backgroundColor: 'blue',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    toRegister:{
        marginTop: 30,
        flexDirection:'row',
    },
    errorText:{
        color:'red'
    }
    
})