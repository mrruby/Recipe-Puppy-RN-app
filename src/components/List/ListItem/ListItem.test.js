/**
 * @format
 */

import 'react-native';
import React from 'react';
import ListItem from './ListItem';
import mockedData from '../../../test/mock/data.json';
import {flatten} from '../../../helpers';
import {create} from 'react-test-renderer';

describe('Component: ListItem', () => {
  it('shows recipe title and ingredients', () => {
    const mockedRecipe = mockedData.results[0];
    const component = create(<ListItem {...mockedRecipe} />).root;
    const elementList = component.findAllByType('Text');
    const elementListChildren = flatten(
      elementList.map(({children}) => children),
    );
    const results = [mockedRecipe.title, mockedRecipe.ingredients];
    results.map((result, index) => {
      expect(elementListChildren[index]).toBe(result);
    });
  });
});
