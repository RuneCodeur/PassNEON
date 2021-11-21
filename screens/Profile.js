import * as React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux'

class Profil extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      myName: 'Harry Potter',
      myCode: null,
    }
  }
  _changeMyName(text){
      this.setState({ myName: text })
      const action = { type: "replace-name", value: text }
      this.props.dispatch(action)
    
  }
  
  
  _QRcliqued = async () =>{
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
  
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    this.setState({ myCode: pickerResult.uri })
    const action = { type: "replace-qr", value: pickerResult.uri }
    this.props.dispatch(action)
  }



  render(){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
        <Text style={style.title}> mon Profil</Text>

        <View style={style.form}>
          <View>
            <Text style={style.myname}> nom et prénom </Text>
            <TextInput style={style.mynameinput} placeholder="Harry Potter" defaultValue={this.props.myInfos.myName} onChangeText={(text) =>this._changeMyName(text)}></TextInput>
          </View>
            <TouchableOpacity onPress={this._QRcliqued} style={style.ensembleButton}>
              <Text style={style.button}>Mon QR code</Text>
            </TouchableOpacity>
            { this.props.myInfos.myCode == null && <Image source={require('../src/picture/code.png')} style={{ width: 200, height: 200 }} /> }
            { this.props.myInfos.myCode != null && <Image source={{ uri: this.props.myInfos.myCode }} style={{ width: 200, height: 200 }} /> }
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
    height: 50,
    marginTop: 40, 
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