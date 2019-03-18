import 'react-native';
import React from 'react';
import LocationItem from '../LocationItem';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const item = {
    title: 'Home',
    description: 'Where we live',
    latitude: 23.89,
    longitude: 18.97
  };
  const tree = renderer.create(<LocationItem item={item} />).toJSON();

  expect(tree).toMatchSnapshot();
});
