import React, {useState, ReactNode} from 'react';
import {TouchableHighlight, View, StyleSheet} from 'react-native';
import {Card, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';

type Props = {
  children: string;
};

/**
 * Text Component which can be expanded.
 * @param children Text to be displayed
 */
const ExpandableTextComponent: React.FC<Props> = ({children}) => {
  // Expanded State.
  const [expanded, setExpanded] = useState(false);

  return (
    <Card style={styles.mainView}>
      {expanded ? (
        <View>
          <Text>{children}</Text>
          <TouchableHighlight
            onPress={() => setExpanded(!expanded)}
            style={styles.buttonView}>
            <Icon name="chevron-up" color="white" size={30} />
          </TouchableHighlight>
        </View>
      ) : (
        <View>
          <Text>{children.substring(0, 200)}...</Text>
          <TouchableHighlight
            onPress={() => setExpanded(!expanded)}
            style={styles.buttonView}>
            <Icon name="chevron-down" color="white" size={30} />
          </TouchableHighlight>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  mainView: {
    padding: 20,
    marginTop: 20,
  },
  buttonView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default ExpandableTextComponent;
