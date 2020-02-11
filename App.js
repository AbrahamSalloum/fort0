import * as React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import Constants from 'expo-constants';
import { Header, Card,  Left, Icon, Button, Title, CheckBox } from 'native-base';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer} from 'react-navigation';
import { shuffle } from "lodash";
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import FortOptions from "./FortOptions.js"
import {getcollection} from "./FortuneLogic.js"

function FortuneCard({fortune}) {
  return(
    <Card >
    <Text style={styles.colortext}>{fortune.f}</Text>
    </Card>
  )
}

class App extends React.Component {

constructor(props) {
    super(props);
		this.state = {
      fontisloaded: false,
      forts: false, 
    };
}

  _getmorecontent = () => {
      this.setState({ forts: false },() => {
        this.setState({ 
          fortunes: getcollection(20),  
          forts: true 
        })
    })
  }

	async componentDidMount(){
		await Font.loadAsync({
			'Roboto': require('./assets/Fonts/Roboto.ttf'),
			'Roboto_medium': require('./assets/Fonts/Roboto_medium.ttf'),
			...Ionicons.font
    });
    this.setState({ fontisloaded: true })
	  this._getmorecontent()
  }

	render(){

    if (!this.state.fontisloaded || !this.state.forts) {
			return <AppLoading />;
    }

    return (
      <View style={styles.container}>
      <Header style={styles.prompt}>
      <Left style={{Width:500,flex: 3}}>
        <Button transparent onPress = {() => this.props.navigation.toggleDrawer()}>
          <Icon name='menu' />
          <Title> user@localhost~$ fortune</Title>
        </Button>
      </Left>
      </Header>
          <FlatList
          data={this.state.fortunes}
          renderItem={({ item }) => <FortuneCard fortune={item} />}
          keyExtractor={item => item.k+item.t+this.state.count}
          onEndReached={() => {this._getmorecontent(20)}}
          onEndReachedThreshold={1}
          />
      </View>
    );
  }
}


const Menu = createDrawerNavigator(
{
  "Main": App
},
{
  initialRouteName: 'Main',
  contentComponent: props => <FortOptions {...props} />
})

export default createAppContainer(Menu)

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
  },
  prompt:{
    backgroundColor: "#272D38",
    color: "white",
    fontSize: 15
  },
  colortext: {
    fontSize: 24,
    backgroundColor: '#272D38',
    color: "#bae67e"
  }
});
