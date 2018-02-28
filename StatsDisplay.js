import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import { Button, Card, Divider } from "react-native-elements";
import GridView from "react-native-super-grid";
var _ = require("underscore");

export class StatsDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "currentSeason"
        };
        this.pressButton = this.pressButton.bind(this);
    }

    // componentDidMount() {
    //     console.log(this.props.data["lifetime"]);
    // }

    // componentWillReceiveProps(props) {
    //     console.log(props.data["lifetime"]);
    // }

    pressButton(page) {
        this.setState({
            page
        });
    }

    renderItem(item, indexInRow) {
        return (
            <Card title={item.field}>
                <Text style={{ fontSize: 20 }}>{item.value}</Text>
            </Card>
        );
        return (
            <View
                style={{
                    paddingTop: 8,
                    paddingBottom: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 0.0,
                    marginTop: 8,
                    marginBottom: 8,
                    marginLeft: 2,
                    marginRight: 2,
                    borderRadius: 4,
                    borderColor: "black"
                }}
            >
                <Text style={styles.text}>{item.field}</Text>
                <Text style={styles.text}>{item.value}</Text>
            </View>
        );
    }

    render() {
        var data = this.props.data[this.state.page];
        return (
            <View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginTop: 16,
                        marginBottom: 8
                    }}
                >
                    <Button
                        onPress={() => this.pressButton("currentSeason")}
                        title="Current Season"
                        backgroundColor={
                            this.state.page == "currentSeason"
                                ? "#37CAF8"
                                : "#9E9E9E"
                        }
                    />
                    <Button
                        onPress={() => this.pressButton("lifetime")}
                        title="Lifetime"
                        backgroundColor={
                            this.state.page == "lifetime"
                                ? "#37CAF8"
                                : "#9E9E9E"
                        }
                    />
                </View>

                <GridView
                    items={_.toArray(data)}
                    renderItem={this.renderItem}
                    itemDimension={130}
                    spacing={0}
                    style={{ marginBottom: 80 }}
                />
            </View>
        );
    }
}

StatsDisplay.propTypes = {
    data: PropTypes.object
};

const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
    }
});
