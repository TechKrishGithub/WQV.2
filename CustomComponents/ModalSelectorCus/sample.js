import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import ModalSelector from 'react-native-modal-selector-searchable';
import { countryList } from "./CountryList";

const SampleApp = () => {
  const [textInputValue, setTextInputValue] = useState('');

  const ListItem = ({ data }) => (
    <View key={data.number} style={{ flexDirection: "row" }}>
      <Image
        style={{ width: 26, height: 26, borderRadius: 13 }}
        resizeMode="cover"
        source={{ uri: data.flag }}
      />
      <Text> {data.number}</Text>
      <Text> {data.name}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'space-around', padding: 50 }}>
      <ModalSelector
        data={countryList}
        keyExtractor={(x) => x.name}
        labelExtractor={(x) => x.name}
        initValue="listType without FlatList"
        initValueTextStyle={{ color: "black" }}
        selectStyle={{ borderColor: "black" }}
        selectTextStyle={{ color: "blue" }}
        onChange={option => { setTextInputValue(option.name) }}
        componentExtractor={(option) => <ListItem data={option} />}
      />
    </View>
  );
};

export default SampleApp;
