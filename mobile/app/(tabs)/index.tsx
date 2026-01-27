import React from "react";
import { ScrollView, Text } from "react-native";

const ChatsTab = () => {
  return (
    <ScrollView
      className="bg-surface"
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text className="text-white">Chat tab</Text>
    </ScrollView>
  );
};

export default ChatsTab;
