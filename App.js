import React from "react";
import {
    ActivityIndicator,
    StyleSheet,
    View,
    ScrollView,
    Text
} from "react-native";
import Swiper from "react-native-swiper";

import { Button, Card, Header } from "react-native-elements"; // 1.0.0-beta2

import Tabs from "react-native-tabs";
import { StatsDisplay } from "./StatsDisplay";

var playlists = [
    { text: "Solos", value: "solo" },
    { text: "Duos", value: "duo" },
    { text: "Squads", value: "squad" }
];

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            solo: {
                lifetime: {},
                currentSeason: {}
            },
            duo: {
                lifetime: {},
                currentSeason: {}
            },
            squad: {
                lifetime: {},
                currentSeason: {}
            },
            loading: true
        };
    }

    getStats(player, platform) {
        // fetch(`https://api.fortnitetracker.com/v1/profile/${platform}/${epic-nickname}`)
    }

    componentDidMount() {
        fetch("https://api.fortnitetracker.com/v1/profile/pc/meeoh", {
            headers: {
                "TRN-Api-Key": "4e651f53-bd34-4303-98fd-b649f536c7e5"
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                var keys = Object.keys(data.stats);
                var solo = {},
                    duo = {},
                    squad = {};

                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    var period = "lifetime";
                    if (key.indexOf("curr") > -1) {
                        period = "currentSeason";
                    }

                    if (key.indexOf("p2") > -1) {
                        solo[period] = data.stats[key];
                    } else if (key.indexOf("p10") > -1) {
                        duo[period] = data.stats[key];
                    } else if (key.indexOf("p9") > -1) {
                        squad[period] = data.stats[key];
                    }
                }

                this.setState({
                    solo,
                    duo,
                    squad,
                    loading: false
                });
            });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    centerComponent={{
                        text: "MY TITLE",
                        style: { color: "#fff" }
                    }}
                    style={{ flex: 1 }}
                />
                {!this.state.loading && (
                    <Swiper
                        style={styles.wrapper}
                        showsButtons={false}
                        showsPaginator={false}
                        ref={swiper => (this.swiper = swiper)}
                    >
                        <View style={styles.slide1}>
                            <StatsDisplay
                                data={this.state[playlists[0].value]}
                            />
                        </View>
                        <View style={styles.slide2}>
                            <StatsDisplay
                                data={this.state[playlists[1].value]}
                            />
                        </View>
                        <View style={styles.slide3}>
                            <StatsDisplay
                                data={this.state[playlists[2].value]}
                            />
                        </View>
                    </Swiper>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    slide1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#9DD6EB"
    },
    slide2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#97CAE5"
    },
    slide3: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#92BBD9"
    },
    text: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold"
    }
});
