import React from "react";
import { StyleSheet, View } from "react-native";
import {
    Container,
    Content,
    Card,
    CardItem,
    Header,
    Text,
    Title
} from "native-base";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            solo: {},
            duo: {},
            squad: {}
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
        }).then(response => {
            return response.json();
        }).then(data => {
          this.setState({
            solo: data.stats.p2 || {},
            duo: data.stats.p10 || {},
            squad: data.stats.p9 || {}
          })
        })
    }

    render() {
        console.log(this.state);
        return (
            <Container>
                <Header style={{ display: "flex", alignItems: "center" }}>
                    <Title>Header</Title>
                </Header>
                <Content>
                    <Card>
                        <CardItem header>
                            <Text>Solos</Text>
                        </CardItem>
                        <CardItem>
                            <Text>{this.state.solo.kd ? this.state.solo.kd.value : "None"}</Text>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Text>Duos</Text>
                        </CardItem>
                        <CardItem>
                            <Text>{this.state.duo.kd ? this.state.duo.kd.value : "None"}</Text>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Text>Squads</Text>
                        </CardItem>
                        <CardItem>
                            <Text>{this.state.squad.kd ? this.state.squad.kd.value : "None"}</Text>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
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
