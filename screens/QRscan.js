import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Camera} from 'expo-camera'
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux';

 class Scanner extends React.Component {
	constructor(props) {
	  super(props)
	}
	state = {
		hasCameraPermission: null,
	};

	_stopscanning(){
		this.props.navigation.navigate('mon profil')
	}

	async componentDidMount() {
		this.forceUpdate
		const { status } = await ImagePicker.requestCameraPermissionsAsync() 
		this.setState({ hasCameraPermission: status === 'granted' })
	}

	render(){
		const { hasCameraPermission } = this.state;

		if (hasCameraPermission === null) {
			return null 
		}

		if (hasCameraPermission === false) {
			alert('vous devez autoriser l\'accès à la camera.')
		}

		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', }}>
				<Camera style={style.camera} onBarCodeScanned={this.scan} />

				<TouchableOpacity onPress={()=>this._stopscanning()} style={style.ensembleButton}>
            		<Text style={style.button}>Retour</Text>
          		</TouchableOpacity>

				</View>
			);
		}

	scan = ({data}) => {
		const action = { type: "replace-qr", value: data }
		this.props.dispatch(action)

		this.props.navigation.navigate('mon profil')
	}
}

const style = StyleSheet.create({
	camera:{
		width: '90%',
		height: '75%',
		marginTop:50
	},
	ensembleButton:{
	  	backgroundColor: 'blue',
	  	height: 50,
	  	width: '100%',
	  	marginTop: 25,
	  	alignItems:'center',
	  	justifyContent: 'center',
	},
	button:{
		fontSize: 15,
		fontWeight: '700',
	  	color: 'white',
	}
})

const mapStateToProps = (state) => {
	return state
}
export default connect(mapStateToProps)(Scanner)