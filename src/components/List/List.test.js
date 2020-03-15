/**
 * @format
 */

import 'react-native';
import React from 'react';
import List from './List';
import ListItem from './ListItem/ListItem';
import mockedData from '../../test/mock/data.json';

import {create} from 'react-test-renderer';

describe('Component: List', () => {
  it('renders list of all recipes from mock', () => {
    const component = create(<List data={mockedData.results} />).root;
    const elementList = component.findAllByType(ListItem);
    expect(elementList.length).toBe(mockedData.results.length);
  });
});
