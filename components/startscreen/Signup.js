import { View, Text, StyleSheet, TextInput,TouchableOpacity, Image, ScrollView, ToastAndroid} from 'react-native'
import React, { useRef,useState } from 'react'
import * as yup from 'yup';
import { Formik } from 'formik';
import { LinearTextGradient } from 'react-native-text-gradient';
import { windowH, windowW } from '../../util/Dimensions';
import * as GETAPI from '../../util/fetchApi';
import Feather from 'react-native-vector-icons/Feather';
import Spinner from 'react-native-loading-spinner-overlay';

 const validationSchema = yup.object().shape({
     username: yup
        .string()
        .min(3,({min})=> `Tên đăng nhập ít nhất ${min} ký  tự`)
        .required('Nhập tên đăng nhập !')
        .test("username_async_validation", "Tài khoản đã tồn tại",async function (value) {
                // console.log(value)
                let res = await GETAPI.postDataAPI("/user/checkUsername",{'username':`${value}`});
                // console.log(res)
                if(res.msg==="The Username already in use"){
                    return false
                }else{
                    return true
                }          
        }),

    name: yup
        .string()
        .min(2,({min})=> `Tên ít nhất ${min} ký  tự`)
        .required('Nhập tên!'),

    password: yup
        .string()
        .min(6,({min})=> `Mật khẩu ít nhất ${min} ký  tự`)
        .required('Nhập mật khẩu!'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Vui lòng nhập trùng khớp mật khẩu!')
        .required('Xác nhận mật khẩu!'),
 })

export default function Signup({navigation}) {
    const [showPass, setshowPass] = useState(true)
    const [showPassConfirm, setshowPassConfirm] = useState(true)
    const formRef = useRef();
    const [loading, setloading] = useState(false);


    const handleSignUp = async (value)=>{
        // console.log(formRef.current.values.username)
        console.log(value)
        setloading(true);
        setTimeout(async()=>{
            const res = await GETAPI.postDataAPI("/user/register",value);
            if(res.msg==='Success'){
                setloading(false);
                ToastAndroid.showWithGravity(
                    "Đăng ký tài khoản thành công!",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                )
                navigation.replace('signin',{
                    username: formRef.current.values.username,
                    password: formRef.current.values.password,
                })
            }else{
                setloading(false);
            }
        },1000)
      
    }
    const SpinnerRender = ()=>(
        <Spinner
            //visibility of Overlay Loading Spinner
            visible={loading}
            //Text with the Spinner
            textContent={'Đang đăng ký...'}
            //Text style of the Spinner Text
            textStyle={styles.spinnerTextStyle}
        />
    )
  return (
    <View style={styles.container}>
        <SpinnerRender />
        <Image 
            source={require('../../assets/logo.jpg')}
            style={{ width: windowW*0.15, height: windowH*0.15,borderRadius: 20 }}
            resizeMode="contain"
            />
        <LinearTextGradient
            style={{fontSize:20, fontWeight: 'bold', marginBottom: 20}}
            locations={[0,1]}
            colors={['#99815B','#FD8469']}
            start={{ x:0, y:0 }}
            end={{ x:1, y: 0 }}
            >
            <Text>
                THE NEW PAPER VIP
            </Text>
        </LinearTextGradient>

        {/* register form */}
        <Formik
            validationSchema={validationSchema}
            innerRef={formRef}
            initialValues={{ username:'', name:'', code:'', password:'', confirmPassword:'' }}
            onSubmit={handleSignUp}
            >
            {({ 
                handleChange,
                handleBlur, 
                handleSubmit,
                values,
                errors,
                touched
             }) => (
                <View style={styles.form}>
                    
                    <LinearTextGradient
                            style={{fontSize:22, marginBottom: 10, fontWeight: 'bold'}}
                            locations={[0,1]}
                            colors={['#4000ff','#bf00ff']}
                            start={{ x:0, y:0 }}
                            end={{ x:1, y: 0 }}
                            >
                            <Text>
                                ĐĂNG KÝ
                            </Text>
                    </LinearTextGradient>
                    <ScrollView style={{ paddingHorizontal: 5 }}>
                        <TextInput
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            placeholder={'Tên Đăng Nhập'}
                            value={values.username}
                            style={(errors.username && touched.username) ? {...styles.Textinput, borderColor: 'red'}:styles.Textinput }
                        />
                        {(errors.username && touched.username)&& 
                            <Text style={styles.err}>{errors.username}</Text>
                        }
                        <TextInput
                            onChangeText={handleChange('name')}
                            placeholder={'Họ Tên'}
                            onBlur={handleBlur('name')}
                            value={values.name}
                            style={(errors.name && touched.name) ? {...styles.Textinput, borderColor: 'red'}:styles.Textinput }
                        />
                        {(errors.name && touched.name)&&
                            <Text style={styles.err}>{errors.name}</Text>
                        }
                        <View style={
                                (errors.password && touched.password)?
                                {...styles.Textinput, flexDirection:'row', justifyContent:'space-between',borderColor:'red'}:
                                {...styles.Textinput, flexDirection:'row', justifyContent:'space-between'}
                                }>
                            <TextInput
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                placeholder={'Mật khẩu'}
                                value={values.password}
                                style={styles.inputpassword} 
                                secureTextEntry={showPass}
                            />
                            <TouchableOpacity
                                onPress={()=>{
                                setshowPass(!showPass)
                                }}
                                style={{ 
                                    marginRight: 8,
                                    justifyContent:'center',
                                    alignItems:'center' }}
                                >
                                {showPass ? <Feather name='eye-off' size={20}/>: <Feather name='eye' size={20}/>} 
                            </TouchableOpacity>
                        </View>
                        {(errors.password && touched.password)&&
                                <Text style={styles.err}>{errors.password}</Text>
                        }
                        <View style={
                                (errors.confirmPassword && touched.confirmPassword)?
                                {...styles.Textinput, flexDirection:'row', justifyContent:'space-between',borderColor:'red'}:
                                {...styles.Textinput, flexDirection:'row', justifyContent:'space-between'}
                                }>
                            <TextInput
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                placeholder={'Xác Nhận Mật Khẩu'}
                                value={values.confirmPassword}
                                style={styles.inputpassword}
                                secureTextEntry={showPassConfirm}
                            />

                            <TouchableOpacity
                                onPress={()=>{
                                setshowPassConfirm(!showPassConfirm)
                                }}
                                style={{ 
                                    marginRight: 8,
                                    justifyContent:'center',
                                    alignItems:'center' }}
                                >
                                {showPassConfirm ? <Feather name='eye-off' size={20}/>: <Feather name='eye' size={20}/>} 
                            </TouchableOpacity>
                        </View>
                        {(errors.confirmPassword && touched.confirmPassword)&&
                                <Text style={styles.err}>{errors.confirmPassword}</Text>
                        }
                        <TextInput
                            onChangeText={handleChange('code')}
                            onBlur={handleBlur('code')}
                            placeholder={'Nhập Mã Giới Thiệu (nếu có)'}
                            value={values.code}
                            style={styles.Textinput }
                        />
                        <TouchableOpacity
                            style={{ 
                                    backgroundColor:'blue',
                                    justifyContent:'center',
                                    alignItems: 'center',
                                    borderRadius:8,
                                    height: 40,
                                    marginTop: 15
                                    }}
                            onPress={handleSubmit}
                            >
                            <Text style={{ fontWeight:'bold', fontSize: 14, color:'white' }}>Đăng Ký</Text>
                        </TouchableOpacity>                       
                    </ScrollView>
                </View>
            )}
        </Formik>
       
    </View>
  )
}

// const windowH = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    form:{
        flex: 1,
        width: windowW,
        justifyContent:'flex-start',
        alignItems:'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'white',
        marginTop: 10,
        padding: 10,
        shadowColor:'#000',
        shadowOffset:{
            width: 0,
            height: 2
        },
        shadowOpacity: 0.6,
        shadowRadius: 5,
        elevation: 10
    },
    Textinput: {
        width: windowW*0.8,
        height: 40,
        borderRadius: 10,
        marginTop: 10,
        borderWidth: 0.5,
        borderColor: 'blue',
        paddingLeft: 5
    },
    inputpassword:{
        width: '85%',
       
    },
    err:{
        color:'red',
        textAlign: 'center'
    },
    spinnerTextStyle: {
        color: '#FFF',
    },
})
