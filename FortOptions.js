import * as React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import Constants from 'expo-constants';
import { Header, Card, Left, Icon, Button, List, ListItem,  Title, CheckBox } from 'native-base';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

class FortOptions extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			fontisloaded: false,
		};
	}

	async componentDidMount() {
		await Font.loadAsync({
			'Roboto': require('./assets/Fonts/Roboto.ttf'),
			'Roboto_medium': require('./assets/Fonts/Roboto_medium.ttf'),
			...Ionicons.font
		});
		this.setState({ fontisloaded: true })
	}

	render(){
    if (!this.state.fontisloaded) {
			return <AppLoading />
		}
  return(
    <View style={{color:"White", ...styles.container}}>
    <Title>Options</Title>
      <List>
        <ListItem>
          <Text style={{ color: "white" }}>Discworld</Text>
          <CheckBox checked={true} />
        </ListItem>
        <ListItem>
          <Text style={{color:"white"}}>H2G2</Text>
          <CheckBox checked={true} />
        </ListItem>
      </List>
  </View>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    fontSize: 16,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#272D38',
    padding: 8,

  },
  optionslist: {
    flexDirection: 'row',
  }
});

export default FortOptions;