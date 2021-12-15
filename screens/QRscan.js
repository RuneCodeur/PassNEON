import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Camera} from 'expo-camera'
import { connect } from 'react-redux';

 class Scanner extends React.Component {
	constructor(props) {
	super(props)
		this.state = {
			hasCameraPermission: null,
		};
	}

	_stopScanning(){
		this.props.navigation.navigate('mon profil')
	}

	async componentDidMount() {
		const { status } = await Camera.requestCameraPermissionsAsync()
		this.setState({ hasCameraPermission: status === 'granted' })
		
	}
	

	render(){
		if (this.state.hasCameraPermission === null) {
			return null
		}
		if (this.state.hasCameraPermission === false) {
			alert('vous devez autoriser l\'accès à la camera.') 
		}

		return (
			<View key={this.state.key} style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', }}>
				<Camera style={style.camera} onBarCodeScanned={this.scan} type={'back'}/>

				<TouchableOpacity onPress={()=>this._stopScanning()} style={style.ensembleButton}>
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
		width: '90%',
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