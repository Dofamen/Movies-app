import React, { Component } from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import {getMoviebyId, getImageFromApi, getMovieTrailerById} from "../API/TMDBApi";
import {StatusBar} from "expo-status-bar";
import {Ionicons} from "@expo/vector-icons";
import YoutubePlayer from 'react-native-youtube-iframe';
import Flag from 'react-native-flags';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import moment from "moment";






export default class componentName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            film:undefined,
            isLoading: false,
            trailerId: "",
        }
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

    componentDidMount() {
       /* this.props.route.params.idFilm*/
        getMoviebyId(this.props.route.params.idFilm)
            .then((res) =>{
                this.setState({
                    film: res,
                    isLoading: false
                })
            })
        getMovieTrailerById(this.props.route.params.idFilm)
            .then((res) =>{
                this.setState({
                    trailerId: res["results"][0].key
                })
            })
    }

    _displayFim(){
        if (this.state.film !=undefined){
            return (
                <ScrollView>
                    <View style={styles.body}>

                        <View style={styles.header_container}>
                            <Image style={styles.image} source={{url: getImageFromApi(this.state.film.poster_path)}} ></Image>
                            <View style={styles.content_container}>
                                <View style={styles.header_container}>
                                    <Text style={styles.title_text}>{this.state.film.title}</Text>
                                </View>

                                <View style={{ marginTop: hp(1)}}>
                                    <Text style={styles.vote_text}>Rate: {this.state.film.vote_average}/10</Text>
                                </View>



                                <View style={[styles.date_container,{ marginTop: hp(1)}]}>
                                    <Text style={styles.date_text}>Duration: {this.state.film.runtime} min</Text>
                                </View>

                                <View style={[styles.date_container]}>
                                    <Text style={styles.date_text}>Country: <Flag code="US" size={32}/></Text>
                                </View>

                                <View style={[styles.date_container,{ marginTop: hp(1)}]}>
                                    <Text style={styles.date_text}>status: {this.state.film.status}</Text>
                                </View>

                                <View style={[styles.date_container,{ marginTop: hp(1)}]}>
                                    <Text style={styles.date_text}>Release date:
                                        {moment(new Date(this.state.film.release_date)).format("DD/MM/YYYY")}</Text>
                                </View>

                            </View>
                        </View>

                        <View style={styles.body}>
                            <Text style={{textAlign: 'center', fontSize:30, marginBottom:hp(2),
                                marginTop: hp(2), fontWeight:'bold'}}>Description</Text>
                            <View style={styles.description_container}>
                                <Text style={styles.description_text}>{this.state.film.overview}</Text>
                            </View>
                            <View style={styles.video}>
                                <YoutubePlayer
                                    height={500}
                                    play={false}
                                    videoId={this.state.trailerId}
                                    /*videoId=  {'84WIaK3bl_s'}*/
                                />
                            </View>

                        </View>
                    </View>
                </ScrollView>
            )
        }
    }




    render() {

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            <View style={styles.backBar}>
                <TouchableOpacity style={{flexDirection: "row", alignItems:"center"}}
                                  onPress={ () => this.props.navigation.navigate("search") }>
                    <Ionicons name="chevron-back" size={45} color="white" />
                    <Text style={{fontWeight: "bold", fontSize: 20, color:"white"}}>Search</Text>
                </TouchableOpacity>
                <Text style={styles.backBarText}>FilmDebut</Text>
            </View>

            {this._displayFim()}
            {this._displayLoading()}
        </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignSelf: "center",
        width: "100%",
        marginTop: hp('3%'),
    },
    backBar:{
        width: wp("100%"),
        backgroundColor: "#74b9ff",
        flexDirection: "row",
        height: hp(7),
    },
    backBarText:{
        alignSelf: "center",
        marginLeft: wp("19%"),
        fontWeight: "bold",
        fontSize: 20,
        color:"white"
    },
    image:{
        height: hp(30),
        width: wp(40)
    },
    body:{
        margin:10,

    },
    video:{
        marginTop: hp(5)
    },
    content_container: {
        flex: 1,
        margin: 5
    },
    header_container: {
        flexDirection: 'row'
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    description_text: {
        fontSize:20
    },
    date_container: {
        flex: 1
    },
    date_text: {
        textAlign: 'left',
        fontSize: 20
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
  });
