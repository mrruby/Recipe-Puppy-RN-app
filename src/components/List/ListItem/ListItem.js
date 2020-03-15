/**
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';

const ListItem: () => React$Node = ({title, ingredients, thumbnail, href}) => {
  const [isImageError, setIsImageError] = useState(false);

  return (
    <TouchableOpacity
      style={[styles.row, styles.container]}
      onPress={() => Linking.openURL(href)}>
      {!isImageError && thumbnail ? (
        <Image
          onError={() => setIsImageError(true)}
          style={styles.image}
          source={{uri: thumbnail}}
        />
      ) : null}
      <View style={styles.textContainer}>
        <Text style={[styles.item, styles.title]}>{title}</Text>
        <Text style={[styles.item, styles.wrap]}>{ingredients}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingLeft: 10,
    fontSize: 14,
    paddingHorizontal: 1,
    fontWeight: '500',
  },
  title: {fontWeight: '800'},
  textContainer: {width: 0, flexGrow: 1, flex: 1},
  wrap: {
    flex: 1,
    flexWrap: 'wrap',
  },
  image: {width: 110, height: 100, marginHorizontal: 10},
  row: {
    flexDirection: 'row',
  },
  container: {
    margin: 10,
    borderRadius: 15,
  },
});

export default ListItem;
