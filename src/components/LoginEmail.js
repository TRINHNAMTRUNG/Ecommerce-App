import { View, Text,StyleSheet,Image, TextInput,TouchableOpacity } from 'react-native'
import React from 'react'

const LoginEmail = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/img/banner.jpg')} style={styles.imgBanner}/>
        <View style={styles.document}>
          <Text style={styles.txtIntro}>Xin chào,</Text>
          <Text style={styles.txtTitle}>Nhập email của bạn để tiếp t</Text>
          <TextInput
           placeholder='abc@email.com.'
           style={styles.textInput}
          />
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.txtContainer}>Tiếp tục</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
            <Text style={styles.txtFooter}>Hoặc tiếp tục bằng</Text>
            <View style={styles.itemLogo}>
              <TouchableOpacity style={styles.btnLogo}>
              <Image source={require('../../assets/img/LogoFB.png')} style={styles.logo}/>
              </TouchableOpacity>
             <TouchableOpacity style={styles.btnLogo}>
             <Image source={require('../../assets/img/LogoGoogle.png')} style={styles.logo}/>
             </TouchableOpacity>

            </View>
            <Text style={styles.txtPolicy}>
              Bằng việc tiếp tục, bạn đã đọc và đồng ý với điều khoản sử dụng, chính sách bảo
              mật thông tin cá nhân và hướng dẫn hủy/xóa tài khoản của Tiki
            </Text>
        </View>
    </View>
  )
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    width:'100%'
  },
  imgBanner:{
    width:'100%',
    height:130,
    resizeMode:'stretch'
  },
  document:{
    flex:1.2,
    paddingHorizontal:20,
    paddingTop:40,
    // backgroundColor:'red'
  },
  txtIntro:{
    fontSize:30,
    fontWeight:'bold',
    paddingBottom:12
  },
  txtTitle:{
    fontSize:16,
    marginBottom:20
  },
  textInput:{

    borderBottomWidth:0.6,
    height:50,
    color:'black',
    fontSize:20,
    marginBottom:20
  },
  btnContainer:{
    backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center',
    marginTop:10
  },
  txtContainer:{
    color:'#fff',
    fontSize:23,
    padding:6
  },
  btnEmail:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:10
  },
  txtEmail:{
    color:'blue',
    fontSize:14,
    fontWeight:'450'
  },
  footer:{
    flex:0.9,
    // backgroundColor:'red',
    justifyContent:'space-around',
    alignItems:'center',
    paddingHorizontal:20,
    marginBottom:20
  },
  txtFooter:{
  },
  itemLogo:{
  flexDirection:'row',
  justifyContent:'center',
  alignItems:'center',
  
  },
  btnLogo:{
    width:50,
    height:50,
    marginLeft:20,
    marginRight:20
  },
  logo:{
    width:50,
    height:50,
   
  },
  txtPolicy:{
    fontSize:14
  }


})

export default LoginEmail