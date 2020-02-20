import * as React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import Constants from 'expo-constants';
import { Header, Card, Left, Icon, Button, Title, CardItem } from 'native-base';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer} from 'react-navigation';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import FortOptions from "./FortOptions.js";
import { getcollection } from "./FortuneLogic.js";

const stringToColour = (str) => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
  return colour;
}

function FortuneCard({fortune}) {
    return(
        <Card style={{borderRadius:0}}>
            <CardItem header style={styles.header}>
                <View style={{flex: 1, flexDirection: 'row', padding:0}}>
                    <View style={{ width: 25, height: 25,  backgroundColor: stringToColour(fortune.t)}}></View>
                    <View><Text style={{color:"white"}}>{fortune.t}</Text></View>
                </View>
            </CardItem>
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

_getmorecontent = async (t) => {
    f = await getcollection(t)
    await this.setState({ forts: false },() => {
        this.setState({
        fortunes: f,
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
        this._getmorecontent(10)
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
            keyExtractor={(item, i) => item.k + item.t + i.toString()} // are you feeling lucky?
            onEndReached={() => {this._getmorecontent(10)}}
            onEndReachedThreshold={.5}
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      fontSize: 16,
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#272D38',
      padding: 8
    },
    optionslist: {
      flexDirection: 'row'
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
    },
    header:{
      color: "white",
      backgroundColor: '#313846',
      borderRadius: 0
    }
});

export default createAppContainer(Menu)