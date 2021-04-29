import React from 'react'
import {StyleSheet,View, TextInput, Button, Text, FlatList, ActivityIndicator , TouchableOpacity} from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import {StatusBar} from "expo-status-bar";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
export default class Search extends React.Component {

  constructor(props) {
    super(props)
    this.searchedText = ""
    this.page = 0
    this.totalPages = 0
    this.state = {
      films: [],
      isLoading: false
    }
  }

  _loadFilms() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true })
      getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
          this.page = data.page
          this.totalPages = data.total_pages
          this.setState({
            films: [ ...this.state.films, ...data.results ],
            isLoading: false
          })
      })
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text 
  }

  _searchFilms() {
    this.page = 0
    this.totalPages = 0
    this.setState({
      films: [],
    }, () => {
        this._loadFilms()
    })
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _displayDetailFilm(idFilm, navigation){
      navigation.navigate("filmDetail", { idFilm:idFilm })
  }

  render() {
    return (
      <View style={styles.main_container}>
        <StatusBar style="auto" />
        <View style={styles.searchBar}>
        <TextInput
          style={styles.textinput}
          placeholder='Titre du film'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFilms()}
        />
        <TouchableOpacity style={{alignSelf:"center", backgroundColor:"#0275d8", height: hp(6)}} onPress={() => this._searchFilms()}>
            <Text style={{fontSize: 20, marginTop:10}}>Rechercher</Text>
        </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <FilmItem film={item} displayDetailFilm = {this._displayDetailFilm} navigation={this.props.navigation} />}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
              if (this.page < this.totalPages) {
                 this._loadFilms()
              }
          }}
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 20
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
    width: wp('70%')
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchBar:{
      marginTop: 20,
      flexDirection: "row"
  }
})

