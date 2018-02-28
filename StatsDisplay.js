import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import Tabs from "react-native-tabs";
import { Button } from "react-native-elements";
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

    renderItem(item) {
        return (
            <View style={{ paddingTop: 16, paddingBottom: 16 }}>
                <Text>{item.field}</Text>
                <Text>{item.value}</Text>
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
                        justifyContent: "space-between"
                    }}
                >
                    <Button
                        onPress={() => this.pressButton("currentSeason")}
                        title="Current Season"
                        backgroundColor={
                            this.state.page == "currentSeason" ? "red" : ""
                        }
                    />
                    <Button
                        onPress={() => this.pressButton("lifetime")}
                        title="Lifetime"
                        backgroundColor={
                            this.state.page == "lifetime" ? "red" : ""
                        }
                    />
                </View>

                <GridView
                    itemDimension={110}
                    items={_.toArray(data)}
                    renderItem={this.renderItem}
                    scrollEnabled={false}
                />

                {/* {Object.keys(data).map(stat => {
                    return (
                        <Text key={stat} style={{ flex: 1 }}>
                            {data[stat].field}: {data[stat].value}
                        </Text>
                    );
                })} */}
            </View>
        );
    }
}

StatsDisplay.propTypes = {
    data: PropTypes.object
};
