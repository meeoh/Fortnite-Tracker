import React from "react";
import {
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    View,
    ScrollView
} from "react-native";

import { Button, Card, Header, SearchBar, Text } from "react-native-elements"; // 1.0.0-beta2
import { TabViewAnimated, TabBar, SceneMap } from "react-native-tab-view";

import { StatsDisplay } from "./StatsDisplay";

var playlists = [
    { text: "Solos", value: "solo" },
    { text: "Duos", value: "duo" },
    { text: "Squads", value: "squad" }
];

const PlaylistRoute = data => {
    return (
        <View
            style={[
                styles.myContainer,
                { backgroundColor: data.backgroundColor }
            ]}
        >
            <StatsDisplay data={data.data} />
        </View>
    );
};

const initialLayout = {
    height: 0,
    width: Dimensions.get("window").width
};

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
            loading: true,
            searchValue: "",
            title: "Search for a user",
            index: 0,
            routes: [
                { key: "solo", title: "Solo" },
                { key: "duo", title: "Duo" },
                { key: "squad", title: "Squad" }
            ],
            error: ""
        };

        this.textChange = this.textChange.bind(this);
        this.searchUser = this.searchUser.bind(this);
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

    checkStatus(response) {
        if (response.ok) {
            return response;
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }

    textChange(value) {
        this.setState({
            searchValue: value
        });
    }

    searchUser(user) {
        this.setState({ loading: true });

        fetch(`https://api.fortnitetracker.com/v1/profile/pc/${user}`, {
            headers: {
                "TRN-Api-Key": "4e651f53-bd34-4303-98fd-b649f536c7e5"
            }
        })
            .then(this.checkStatus)
            .then(data => data.json())
            .then(data => {
                if (data.error) {
                    this.setState({
                        error: "Player not found",
                        loading: false
                    });
                    return;
                }
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
                    loading: false,
                    title: user
                });
            })
            .catch(response => {
                console.log(response);
            });
    }

    _handleIndexChange = index => this.setState({ index });
    _renderFooter = props => (
        <TabBar style={{ backgroundColor: "#496FC4" }} {...props} />
    );
    renderScene = ({ route }) => {
        switch (route.key) {
            case "solo":
                return (
                    <PlaylistRoute
                        data={this.state.solo}
                        backgroundColor="white"
                    />
                );
            case "duo":
                return (
                    <PlaylistRoute
                        data={this.state.duo}
                        backgroundColor="white"
                    />
                );
            case "squad":
                return (
                    <PlaylistRoute
                        data={this.state.squad}
                        backgroundColor="white"
                    />
                );
            default:
                return null;
        }
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
                <Header
                    centerComponent={{
                        text: this.state.title,
                        style: { color: "#fff", fontSize: 20 }
                    }}
                    style={{ flex: 1 }}
                />
                <SearchBar
                    onChangeText={this.textChange}
                    onSubmitEditing={() =>
                        this.searchUser(this.state.searchValue)
                    }
                    round
                    style={{ color: "black" }}
                    lightTheme
                    placeholderTextColor="black"
                    color="black"
                    placeholder="Type Here..."
                />

                {this.state.loading && (
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1,
                            backgroundColor: "#F8F8F8"
                        }}
                    >
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                )}

                {this.state.error.length > 0 && (
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1
                        }}
                    >
                        <Text h3>{this.state.error}</Text>
                    </View>
                )}

                {!this.state.loading &&
                    !this.state.error && (
                        <TabViewAnimated
                            navigationState={this.state}
                            renderScene={this.renderScene}
                            renderFooter={this._renderFooter}
                            onIndexChange={this._handleIndexChange}
                            initialLayout={initialLayout}
                        />
                    )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold"
    },
    myContainer: {
        flex: 1
    }
});
