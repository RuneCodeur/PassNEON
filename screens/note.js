import * as React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView } from "react-native";
import { connect } from 'react-redux';


class Profil extends React.Component {
  constructor(props) {
    super(props)
    
  }
  
  
  render(){
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
          <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', margin:25}}>
              <Text style={style.title}>Notes du developpeur</Text>

              <Text style={style.text}>Salut, je suis le développeur, et c'est ma première appli mobile ! </Text>
              <Text style={style.text}>Tout d'abord, un grand merci d'avoir téléchargé le Pass NEON.</Text>
              <Text style={style.text}>Je vais continuer à mettre à jour cette appli, car j'ai envie de pousser le concept un peu plus loin et de proposer d'autres visuels dans différents styles.</Text>
              <Text style={style.text}>Si tu as des suggestions, n'hésite pas à m'envoyer un message à l'adresse mail suivant :</Text>
              
              <TouchableOpacity style={style.buttonMail} onPress={() => Linking.openURL('mailto:rackhamledev@gmail.com')}>
                  <Text style={style.mail}>rackhamledev@gmail.com</Text>
              </TouchableOpacity>

              <Text style={style.text}>Au passage, j'en profite pour dire que je suis à la recherche d'une alternance dans la région Toulousaine, pour préparer le titre de CDA (Concepteur Développeur d'Applications) avec l'école AP formation.</Text>
              <Text style={style.text}>J'ai déjà plusieurs réalisations à mon actif, Je suis sérieux, motivé, et prends un grand plaisir à programmer !</Text>
              <Text style={style.text}>Si tu recherches un développeur, ne va pas plus loin et contacte-moi vite par mail à la même adresse ! je me ferais un grand plaisir d'expliquer mes motivations lors d'un entretien.</Text>
              <Text style={style.text}>Merci</Text>
            </View>
          </ScrollView>
        </View>
    );
    
  }
}

const style = StyleSheet.create({
  title:{
    marginTop: 30,
    marginBottom: 30,
    fontSize: 20,
    fontWeight: '700',
    textAlignVertical: 'center',
    justifyContent:'center',
  },
  text:{
    marginTop: 5,
    fontSize: 15,
    textAlign: 'center',
  },
  buttonMail:{
    marginTop: 10,
    marginBottom: 10,
    color: 'white',

  },
  mail:{
    textAlign:'center',
    textAlignVertical: 'center',
    backgroundColor: 'blue',
    color: 'white',
    padding: 11,
  },
})

const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps)(Profil)

/*<Drawer.Screen
              name = 'Note du Développeur'
              options = {{ headerShown: false, drawerItemStyle: { marginTop: 25 } }}
              component = { notes }
            /> */