/**
 * @format
 * @flow
 */

import React from 'react';
import {FlatList} from 'react-native';
import ListItem from './ListItem/ListItem';

const List: () => React$Node = ({data, nextPage}) => {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => <ListItem {...item} />}
      keyExtractor={item => item.href}
      onEndReached={nextPage}
      onEndReachedThreshold={0.2}
    />
  );
};

export default List;
