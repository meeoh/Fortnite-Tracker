import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import { Button, Card, Divider } from "react-native-elements";
import GridView from "react-native-super-grid";
import SegmentedControlTab from "react-native-segmented-control-tab";

var _ = require("underscore");

export class StatsDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "currentSeason",
            selectedIndex: 0
        };
        this.pressButton = this.pressButton.bind(this);
    }

    // componentDidMount() {
    //     console.log(this.props.data["lifetime"]);
    // }

    // componentWillReceiveProps(props) {
    //     console.log(props.data["lifetime"]);
    // }

    handleIndexChange = index => {
        this.setState({
            selectedIndex: index,
            page: index == 1 ? "lifetime" : "currentSeason"
        });
    };

    pressButton(page) {
        this.setState({
            page
        });
    }

    renderItem(item, indexInRow) {
        return (
            <View
                style={{
                    paddingTop: 8,
                    paddingBottom: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 0.5,
                    marginTop: 8,
                    marginBottom: 8,
                    marginLeft: 2,
                    marginRight: 2,
                    borderRadius: 4,
                    borderColor: "black"
                }}
            >
                <Text style={styles.text}>{item.field}</Text>
                <Text style={styles.textValue}>{item.value}</Text>
            </View>
        );
    }

    render() {
        var data = this.props.data[this.state.page];
        return (
            <View style={{ backgroundColor: "#F8F8F8" }}>
                <View style={{ margin: 16, backgroundColor: "#F8F8F8" }}>
                    <SegmentedControlTab
                        values={["Current Season", "Lifetime"]}
                        selectedIndex={this.state.selectedIndex}
                        onTabPress={this.handleIndexChange}
                        style={{ backgroundColor: "#F8F8F8" }}
                    />
                </View>

                <GridView
                    items={_.toArray(data)}
                    renderItem={this.renderItem}
                    itemDimension={120}
                    spacing={0}
                    style={{ marginBottom: 80, backgroundColor: "#F8F8F8" }}
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
        color: "black",
        fontSize: 16,
    },
    textValue: {
        fontWeight: "bold"
    }

});
