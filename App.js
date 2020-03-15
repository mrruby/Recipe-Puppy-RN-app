/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import List from './src/components/List/List';
import Title from './src/components/other/Title';
import {colors} from './src/constants';
import {useApi} from './src/hooks';
import {debounce} from './src/helpers';

const App: () => React$Node = () => {
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, recipesList, RESULTS_MAX_COUNT] = useApi(page, searchValue);

  const nextPage = () => {
    if (isLoading) {
      return;
    }
    const isNextPage = RESULTS_MAX_COUNT * page === recipesList.length;
    if (isNextPage) {
      setPage(prevState => prevState + 1);
    }
  };

  const onChange = val => {
    setInputValue(val);
    delayedQuery(val);
  };

  const delayedQuery = useRef(
    debounce(q => {
      setSearchValue(q);
      setPage(1);
    }, 500),
  ).current;

  return (
    <View style={styles.background}>
      <SafeAreaView />

      <SafeAreaView style={styles.content}>
        <Title />
        <TextInput
          style={styles.search}
          onChangeText={onChange}
          value={inputValue}
        />
        <View style={styles.content}>
          {isLoading && page === 1 ? (
            <ActivityIndicator />
          ) : (
            <>
              <List data={recipesList} nextPage={nextPage} />
            </>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.main,
    flex: 1,
  },
  content: {flex: 1, backgroundColor: colors.background},
  search: {height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 20},
});

export default App;
