import * as React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux';
import {Camera} from 'expo-camera';
import QRCode from 'react-native-qrcode-svg';


class Profil extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      myName: '',
      myCode: null,
      hasCameraPermission: null,
    }
  }

  _changeMyName(text){
      this.setState({ myName: text })
      const action = { type: "replace-name", value: text }
      this.props.dispatch(action)
  } 

  _scanMyCode(){
    this.props.navigation.navigate('scan')
  }

  render(){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
        <Text style={style.title}> mon Profil</Text>
  
        <View style={style.form}>
          <Text style={style.myname}> nom et prénom </Text>
          <TextInput style={style.mynameinput} placeholder="Rick DECKARD" defaultValue={this.props.myInfos.myName} onChangeText={(text) =>this._changeMyName(text)}></TextInput>
            
          <TouchableOpacity onPress={()=>this._scanMyCode()} style={style.ensembleButton}>
            <Text style={style.button}>Scanner mon QR-code</Text>
          </TouchableOpacity>

          <View>
            { this.props.myInfos.myCode == null && <Image source={require('../src/picture/code.png')} style={{ width: 200, height: 200 }} /> }
            { this.props.myInfos.myCode != null && <QRCode value={this.props.myInfos.myCode} size={200}/> }
          </View>

        </View>
      </View>
    );
    
  }
}

const style = StyleSheet.create({
  title:{
    marginTop: 80,
    fontSize: 20,
    fontWeight: '700',
    textAlignVertical: 'center',
    justifyContent:'center',
  },
  myname:{
    marginTop: 80,
    textAlign:'center',
  },
  mynameinput:{
    textAlign:'center',
    borderWidth: 1,
    height: 40,
    paddingLeft: 10,
    minWidth: '50%',
    maxWidth: '50%'
  },
  form:{
    alignItems:'center',
  },
  ensembleButton:{
    marginTop: 50,
    marginBottom: 5,
    color: 'white',
  },
  button:{
    marginBottom: 10,
    textAlign:'center',
    textAlignVertical: 'center',
    backgroundColor: 'blue',
    color: 'white',
    padding: 11,
  }
})

const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps)(Profil)