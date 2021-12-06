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
            toValue: -387,
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#0d0d0d' }}>
        <ImageBackground resizeMode="cover" source={require('../src/picture/fond-space.jpg') } style={style.background}>

          <View style={style.generalInfo}>
            <View style={style.ensembleTitle}>
              <Text style={style.title}>Pass Sanitaire</Text>
              <Text style={style.title2}>Pass Sanitaire</Text>
            </View>

            <View style={style.ensembleInfo}>
              <View style={ style.blocPicture }>
                { this.props.myInfos.myCode == null && <Image source={require('../src/picture/code.png')} style={{ width: 150, height: 150 }} /> }
                { this.props.myInfos.myCode != null && <QRCode value={this.props.myInfos.myCode} size={150}/> }
              </View>
              <View style={style.ensembleName}>
                {this.props.myInfos.myName != '' && <Text style={style.myName}> {this.props.myInfos.myName} </Text>}
                {this.props.myInfos.myName != '' && <Text style={style.myName2}> {this.props.myInfos.myName} </Text>}

                {this.props.myInfos.myName == '' && <Text style={style.myName}> Rick DECKARD </Text>}
                {this.props.myInfos.myName == '' && <Text style={style.myName2}> Rick DECKARD </Text>}
              </View>
            </View>
          </View>

          <View style={style.ensembleStyle}>
            <View style={style.ensembleUnicorn}>
              <Image style={style.unicorn} source={require('../src/picture/unicornGIF.gif')}/>
            </View>
            
            <View style={[style.ground, { transform:[{ rotateX: "70deg" }]}]}>
              <Animated.View style={[style.cadrillage, {translateX: this.state.ground}]}>
                <Image source={require('../src/picture/quadrillage.png')}/>
              </Animated.View>
            </View>
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
  background:{
    flex: 1,
    alignItems: 'center',
    justifyContent: "flex-start",
    resizeMode: 'cover',
  },
  generalInfo:{
    flex: 1,
    position:'absolute',
    height:'100%',
    width: '100%',
    zIndex: 3,
    elevation: 3,
    alignItems: 'center', 
    justifyContent: 'space-between',
  },

  ensembleTitle:{
    width:'100%',
    flex: 2,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  title:{
    color:'rgb(245, 37, 158)',
    fontSize: 50,
    fontFamily: 'streamster',
    position:'absolute',
    textShadowColor: 'rgb(224, 9, 92)',
    textShadowOffset: {width: 3, height: 3},
    textAlign:'center',
    textShadowRadius: 20,
    width: '100%',
  },
  title2:{
    color:'rgb(245, 37, 158)',
    fontSize: 50,
    fontFamily: 'streamster',
    position:'absolute',
    textShadowColor: 'rgb(224, 9, 92)',
    textShadowOffset: {width: -3, height: -3},
    textAlign:'center',
    textShadowRadius: 20,
    width: '100%',
  },

  ensembleInfo:{
    flex: 4,
    justifyContent: 'center',
    alignItems:'center',
    width: '100%',
  },
  blocPicture:{
    marginTop:'5%',
    backgroundColor: 'white',
    borderRadius: 30,
    borderWidth: 10,
    borderColor: 'rgb(245, 37, 158)',
    width: 190,
    height: 190,
    alignItems:'center',
    justifyContent:'center',
  },
  ensembleName:{
    marginTop:'25%',
    justifyContent:'flex-end',
    alignItems:'center',
  },
  myName:{
    fontFamily: 'VCR',
    position:'absolute',
    marginLeft:10,
    marginRight:10,
    fontSize: 31,
    textAlign: 'center',
    textShadowColor: 'rgb(0, 236, 255)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 1,
  },
  myName2:{
    fontFamily: 'VCR',
    position:'absolute',
    marginLeft:10,
    marginRight:10,
    fontSize: 31,
    textAlign: 'center',
    textShadowColor: 'rgb(255, 64, 69)',
    textShadowOffset: {width: 0, height: -2},
    textShadowRadius: 1
  },


  ensembleStyle:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems:'center',
    width: '100%',
    height:'100%',
  },
  ensembleUnicorn:{
    flex:1,
    justifyContent: 'flex-end',
    top:'35.8%',
    elevation: 5,
  },
  unicorn:{
    resizeMode: 'contain',
    width:300,
    height:200,
  },
  ground:{
    flex:7,
    elevation: 1,
    flexDirection:'row',
  },
  cadrillage:{
    width:'150%',
  }
 
})

const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps)(pass)