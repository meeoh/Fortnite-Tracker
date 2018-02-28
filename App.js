import React from "react";
import {
    ActivityIndicator,
    StyleSheet,
    View,
    ScrollView,
    Text
} from "react-native";
import { Card, Header } from "react-native-elements"; // 1.0.0-beta2

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
                <ScrollView style={{ flex: 1 }}>
                    {!this.state.loading && playlists.map(playlist => {
                        return (
                            <Card key={playlist.text} title={playlist.text}>
                                {this.state.loading && (
                                    <ActivityIndicator
                                        size="large"
                                        color="black"
                                    />
                                )}

                                <StatsDisplay
                                    data={this.state[playlist.value]}
                                />
                            </Card>
                        );
                    })}
                </ScrollView>
                {/* <Content>

                </Content> */}
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
    }
});
