import * as React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, Animated, Easing } from "react-native";
import { connect } from 'react-redux';
import * as Font from 'expo-font';
import QRCode from 'react-native-qrcode-svg';

class pass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fontsLoaded: false,
      ground: new Animated.Value(-60),
    }
  }
    
  async loadFonts() {
    await Font.loadAsync({
      streamster: require('../src/font/streamster.ttf'),
      VCR: require('../src/font/VCR.ttf')
    });
    this.setState({ fontsLoaded: true });
  }
  
  componentDidMount() {
    this.loadFonts();

    /*timing d'animation du defilment du sol */
    Animated.loop(
      Animated.sequence([
        Animated.timing(
          this.state.ground, {
            toValue: -427,
            duration: 950,
            easing: Easing.linear,
            useNativeDriver: true
          }
        ),
        Animated.timing(
          this.state.ground, {
            toValue: -60,
            duration: 0,
            easing: Easing.linear,
            useNativeDriver: true
          }
        )
      ])
    ).start()
  }

  render(){

    if(this.state.fontsLoaded){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ImageBackground resizeMode="cover" source={require('../src/picture/fond-space.jpg') } style={style.background}>

          <View style={style.generalInfo}>
            <Text style={style.title}>Pass Sanitaire</Text>
            <Text style={style.title2}>Pass Sanitaire</Text>
            <View style={ style.blocPicture }>
              { this.props.myInfos.myCode == null && <Image source={require('../src/picture/code.png')} style={{ width: 200, height: 200 }} /> }
              { this.props.myInfos.myCode != null && <QRCode value={this.props.myInfos.myCode} size={200}/> }
            </View>
            <View style={style.ensembleName}>
              {this.props.myInfos.myName != '' && <Text style={style.myName}> {this.props.myInfos.myName} </Text>}
              {this.props.myInfos.myName != '' && <Text style={style.myName2}> {this.props.myInfos.myName} </Text>}

              {this.props.myInfos.myName == '' && <Text style={style.myName}> Rick DECKARD </Text>}
              {this.props.myInfos.myName == '' && <Text style={style.myName2}> Rick DECKARD </Text>}

            </View>
          </View>

          <View style={style.ensembleUnicorn}>
            <Image style={style.unicorn} source={require('../src/picture/unicornGIF.gif')}/>
          </View>
          
          <View style={[style.ground, { transform:[{ rotateX: "70deg" }]}]}>
            <Animated.View style={[style.cadrillage, {translateX: this.state.ground}]}>
              <Image source={require('../src/picture/quadrillage.png')}/>
            </Animated.View>
          </View>

        </ImageBackground>
      </View>
    );
    }else{
      return null
    }
  }
}

const style = StyleSheet.create({
  ensembleUnicorn:{
    zIndex: 3,
    top: 114,
    position:'absolute',
    elevation: 3,
  },
  unicorn:{
    resizeMode: 'contain',
    width:300,
    height: 300,
  },
  background:{
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: "flex-start"
  },
  generalInfo:{
    width:'100%',
    zIndex: 3,
    elevation: 3,
    alignItems: 'center', 
    justifyContent: 'center'
  },
  title:{
    color:'rgb(245, 37, 158)',
    fontSize: 50,
    width:'100%',
    marginTop: 100,
    fontFamily: 'streamster',
    textShadowColor: 'rgb(224, 9, 92)',
    textShadowOffset: {width: 3, height: 3},
    textAlign:'center',
    textShadowRadius: 20
  },
  title2:{
    color:'rgb(245, 37, 158)',
    textAlign:'center',
    position:'absolute',
    width:'100%',
    top:100,
    fontSize: 50,
    fontFamily: 'streamster',
    textShadowColor: 'rgb(224, 9, 92)',
    textShadowOffset: {width: -3, height: -3},
    textShadowRadius: 20
  },
  blocPicture:{
    marginTop: 190,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 30,
    borderWidth: 10,
    borderColor: 'rgb(245, 37, 158)',
  },
  picture:{
    width: 200, 
    height: 200 
  },
  ensembleName:{
    marginTop:50,
    justifyContent:'center',
    alignItems:'center',
  },
  myName:{
    fontFamily: 'VCR',
    position:'absolute',
    fontSize: 30,
    textAlign: 'center',
    textShadowColor: 'rgb(0, 236, 255)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 1
  },
  myName2:{
    fontFamily: 'VCR',
    position:'absolute',
    fontSize: 30,
    textAlign: 'center',
    textShadowColor: 'rgb(255, 64, 69)',
    textShadowOffset: {width: 0, height: -2},
    textShadowRadius: 1
  },
  ground:{
    zIndex: 1,
    elevation: 1,
    width:'100%',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
  },
  cadrillage:{
    height: 900,
    width:'150%',
  }
 
})

const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps)(pass)