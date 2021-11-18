import * as React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, Animated, Easing } from "react-native";
import { connect } from 'react-redux';
import * as Font from 'expo-font';
import { withAnchorPoint } from 'react-native-anchor-point';


class pass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fontsLoaded: false,
      delay: false,
      ground: new Animated.Value(-60),
      unicornTotal: new Animated.Value(0),
      ensembleNeck: new Animated.Value(0),
      ensembleHead: new Animated.Value(0),
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
            duration: 1000,
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

    /*timing et type d'animation de la licorne */
    Animated.stagger(0,[
      Animated.parallel([

        /*total de la licorne */
        Animated.loop(
          Animated.sequence([
            Animated.timing(
            this.state.unicornTotal,{
              toValue:1,
              duration: 800,
              easing: Easing.elastic(0),
              useNativeDriver: true
            }),
            Animated.timing(
            this.state.unicornTotal,{
              toValue:0,
              duration: 200,
              easing: Easing.elastic(0),
              useNativeDriver: true
            })
          ])
        ),
        /*le cou */
        Animated.loop(
        Animated.sequence([
          Animated.timing(
          this.state.ensembleNeck,{
            toValue:1,
            duration: 500,
            easing: Easing.elastic(0),
            useNativeDriver: true
          }),
          Animated.timing(
          this.state.ensembleNeck,{
            toValue:0,
            duration: 500,
            easing: Easing.elastic(0),
            useNativeDriver: true
          })
        ]),
        ),

        /*la tête */
        Animated.loop(
          Animated.sequence([
            Animated.timing(
            this.state.ensembleHead,{
              toValue:1,
              duration: 500,
              easing: Easing.elastic(0),
              useNativeDriver: true
            }),
            Animated.timing(
            this.state.ensembleHead,{
              toValue:0,
              duration: 500,
              easing: Easing.elastic(0),
              useNativeDriver: true
            })
          ])
        ),

      ])
    ]).start()
  }

  /* degrés et position de la rotation des parties de la licorne*/
  unicornTotal(){
    const deg = this.state.unicornTotal.interpolate({
      inputRange: [0, 1],
      outputRange: ['6deg', '-6deg']
    })
    let transform={
      transform:[{rotateZ: deg}]
    }
    return withAnchorPoint(transform, { x: 1, y: 1 }, { width: 0, height: 0 });
  };

  ensembleNeck(){
    const deg = this.state.ensembleNeck.interpolate({
      inputRange: [0, 1],
      outputRange: ['5deg', '-5deg']
    })
    let transform={
      transform:[{rotateZ: deg}]
    }
    return withAnchorPoint(transform, { x: 0, y: 1 }, { width: 55, height: 40 });
  };

  ensembleHead(){
    const deg = this.state.ensembleNeck.interpolate({
      inputRange: [0, 1],
      outputRange: ['-25deg', '0deg']
    })
    let transform={
      transform:[{rotateZ: deg}]
    }
    return withAnchorPoint(transform, { x:0, y: 0.4 }, { width: 50, height: 48 });
  };


  render(){
    if(this.state.fontsLoaded){
      
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ImageBackground resizeMode="cover" source={require('../src/picture/fond-space.jpg') } style={style.background}>

          <View style={style.generalInfo}>
            <Text style={style.title}>Pass Sanitaire</Text>
            <Text style={style.title2}>Pass Sanitaire</Text>
            <View style={ style.blocPicture }>
              { this.props.myCode == null && <Image source={require('../src/picture/code.png')} style={ style.picture } /> }
              { this.props.myCode != null && <Image source={{ uri: this.props.myCode }} style={ style.picture } /> }
            </View>
            <Text style={style.myName}> {this.props.myName} </Text>
            <Text style={style.myName2}> {this.props.myName} </Text>
          </View>

          <View style={style.unicorn}>
            <Animated.View style={[style.unicornTotalAnim, this.unicornTotal()]}>
              
              <Animated.View style={style.ensembleChest}>
                <Animated.View style={[style.ensembleNeck, this.ensembleNeck()]}>

                  {/* crinière de cou */}
                  <Animated.View style={style.mane6}>
                      <Image style={style.unicornPart} source={require('../src/picture/mane6.png')}/>
                  </Animated.View>
                  <Animated.View style={style.mane4}>
                      <Image style={style.unicornPart} source={require('../src/picture/mane4.png')}/>
                  </Animated.View>
                  <Animated.View style={style.mane5}>
                      <Image style={style.unicornPart} source={require('../src/picture/mane5.png')}/>
                  </Animated.View>

                  {/* cou  */}
                  <Image style={style.unicornPart} source={require('../src/picture/neck.png')}/>
                  
                  {/*ensemble de la tête */}
                  <Animated.View style={[style.ensembleHead,this.ensembleHead()]}>
                    {/* crinière  */}
                    <Animated.View style={style.mane3}>
                      <Image style={style.unicornPart} source={require('../src/picture/mane3.png')}/>
                    </Animated.View>
                    <Animated.View style={style.mane1}>
                      <Image style={style.unicornPart} source={require('../src/picture/mane1.png')}/>
                    </Animated.View>
                    <Animated.View style={style.mane2}>
                      <Image style={style.unicornPart} source={require('../src/picture/mane2.png')}/>
                    </Animated.View>

                    {/* oreille dessous  */}
                    <Animated.View style={style.earsLeft}>
                      <Image style={style.unicornPart} source={require('../src/picture/ears-left.png')}/>
                    </Animated.View>
                    
                    {/* tête  */}
                    <Image style={style.unicornPart} source={require('../src/picture/head.png')}/>
                    
                    {/* oreille dessus  */}
                    <Animated.View style={style.earsRight}>
                      <Image style={style.unicornPart} source={require('../src/picture/ears-right.png')}/>
                    </Animated.View>

                  </Animated.View>
                </Animated.View>

                
                {/* pattes par dessous */}
                {/* patte avant */}
                <Animated.View style={style.frontLug1}>
                  <Image style={style.unicornPart} source={require('../src/picture/front-lug1.png')}/>
                  <Animated.View style={style.frontLug2}>
                    <Animated.View style={style.frontHoof}>
                      <Image style={style.unicornPart} source={require('../src/picture/hoof.png')}/>
                    </Animated.View>
                    <Image style={style.unicornPart} source={require('../src/picture/front-lug2.png')}/>
                  </Animated.View>
                </Animated.View>

                {/* patte arrière */}
                <Animated.View style={style.backLug1}>
                  <Image style={style.unicornPart} source={require('../src/picture/back-lug1.png')}/>
                  <Animated.View style={style.backLug2}>
                    <Image style={style.unicornPart} source={require('../src/picture/back-lug2.png')}/>
                    <Animated.View style={style.backLug3}>
                      <Animated.View style={style.backHoof}>
                        <Image style={style.unicornPart} source={require('../src/picture/hoof.png')}/>
                      </Animated.View>
                      <Image style={style.unicornPart} source={require('../src/picture/back-lug3.png')}/>
                    </Animated.View>
                  </Animated.View>
                </Animated.View>
                {/*queue */}
                <Animated.View style={style.ensembleTail}>
                  <Image style={style.unicornPart} source={require('../src/picture/tail1.png')}/>
                  <Animated.View style={style.tail3}>
                    <Image style={style.unicornPart} source={require('../src/picture/tail3.png')}/>
                  </Animated.View>
                  <Animated.View style={style.tail2}>
                    <Image style={style.unicornPart} source={require('../src/picture/tail2.png')}/>
                  </Animated.View>
                </Animated.View>

                {/* buste */}

                <Image style={style.unicornPart} source={require('../src/picture/chest.png')}/>

                {/* pattes par dessus */}
                {/* patte avant */}
                <Animated.View style={style.frontLug1}>
                  <Image style={style.unicornPart} source={require('../src/picture/front-lug1.png')}/>
                  <Animated.View style={style.frontLug2}>
                    <Animated.View style={style.frontHoof}>
                      <Image style={style.unicornPart} source={require('../src/picture/hoof.png')}/>
                    </Animated.View>
                    <Image style={style.unicornPart} source={require('../src/picture/front-lug2.png')}/>
                  </Animated.View>
                </Animated.View>

                {/* patte arrière */}
                <Animated.View style={style.backLug1}>
                  <Image style={style.unicornPart} source={require('../src/picture/back-lug1.png')}/>
                  <Animated.View style={style.backLug2}>
                    <Image style={style.unicornPart} source={require('../src/picture/back-lug2.png')}/>
                    <Animated.View style={style.backLug3}>
                      <Animated.View style={style.backHoof}>
                        <Image style={style.unicornPart} source={require('../src/picture/hoof.png')}/>
                      </Animated.View>
                      <Image style={style.unicornPart} source={require('../src/picture/back-lug3.png')}/>
                    </Animated.View>
                  </Animated.View>
                </Animated.View>

              </Animated.View>

            </Animated.View>
          </View>

          {/*le sol */}
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
  tail3:{
    position: 'absolute',
    width: 50,
    height: 25,
    top: 5,
    left: 5,
  },
  tail2:{
    position: 'absolute',
    width: 56,
    height: 20,
    top: 3,
    left: -3,
  },
  ensembleTail:{
    position: 'absolute',
    width: 55,
    height: 15,
    top: -4,
    left: -45,
  },
  backHoof:{
    position: 'absolute',
    width: 15,
    height: 15,
    top: 19,
    left: 1,
  },
  backLug3:{
    position: 'absolute',
    width: 13,
    height: 26,
    top: 20,
    left: -1,
  },
  backLug2:{
    position: 'absolute',
    width: 21,
    height: 28,
    top: 30,
    left: 4,
  },
  backLug1:{
    position: 'absolute',
    width: 27,
    height: 42,
    top: 4,
    left: 3,
  },
  frontHoof:{
    position: 'absolute',
    width: 15,
    height: 15,
    top: 16,
    left: 0,
  },
  frontLug2:{
    position: 'absolute',
    width: 9,
    height: 24,
    top: 45,
    left: 10,
  },
  frontLug1:{
    position: 'absolute',
    width: 22,
    height: 52,
    top: 12,
    left: 55,
  },
  mane6:{
    position: 'absolute',
    width: 34,
    height: 13,
    top: 5,
    left: -14,
  },
  mane5:{
    position: 'absolute',
    width: 40,
    height: 9,
    top: 0,
    left: -17,
  },
  mane4:{
    position: 'absolute',
    width: 45,
    height: 9,
    top: -5,
    left: -20,
  },
  mane3:{
    position: 'absolute',
    width: 60,
    height: 10,
    top: 0,
    left: -50,
  },
  mane2:{
    position: 'absolute',
    width: 53,
    height: 17,
    top: -3,
    left: -36,
  },
  mane1:{
    position: 'absolute',
    width: 69,
    height: 18,
    top: -10,
    left: -50,
  },
  earsLeft:{
    position: 'absolute',
    width: 9,
    height: 10,
    top: 1,
    left: 20,
  },
  earsRight:{
    position: 'absolute',
    width: 5,
    height: 11,
    top: -1,
    left: 21,
  },
  ensembleHead:{
    position: 'absolute',
    width: 74,
    height: 45,
    top: -12,
    left: 15,
  },
  ensembleNeck:{
    position: 'absolute',
    width: 32,
    height: 45,
    top: -12,
    left: 66,
  },
  ensembleChest:{
    position: 'absolute',
    width: 90,
    height: 45,
    top: 33,
    left: 50,
  },
  unicornPart:{
    position: 'absolute',
    width:'100%',
    height:'100%'
  },
  unicorn:{
    zIndex: 2,
    elevation: 2,
    width:150,
    height: 150,
    position: 'absolute',
    alignItems: 'center', 
    justifyContent:'center',
    top: 200,
  },
  unicornTotalAnim:{
    alignItems: 'center', 
    justifyContent:'center',
    width:200,
    height: 120,
  },
  unicornTotal:{
    width:200,
    height: 120,
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
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 30,
    borderWidth: 10,
    borderColor: 'rgb(245, 37, 158)',
  },
  picture:{
    width: 200, 
    height: 200 
  },
  myName:{
    fontFamily: 'VCR',
    marginTop: 50,
    fontSize: 30,
    textAlign: 'center',
    textShadowColor: 'rgb(0, 236, 255)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 1
  },
  myName2:{
    fontFamily: 'VCR',
    position:'relative',
    top: -27,
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
    width:'150%'
  }
 
})

const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps)(pass)