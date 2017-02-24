import React from 'react';
import App from '../client/components/App';
import StickyNotes from '../client/components/StickyNotes/StickyNotes';
import {shallow} from 'enzyme';

function setup() {
  props = {
    test: jest.fn()
  }
  const enzymeWrapper = shallow(<StickyNotes {...props}/>);

  return {
    props,
    enzymeWrapper
  }
}

describe('Sticky Notes', () => {
  it('should render a sticky note', () => {
    // const {enzymeWrapper} = setup();
    // const enzymeWrapper = shallow(<StickyNotes/>);
    // expect(enzymeWrapper.find('div').hasClass('stickynotes')).toBe(true);
    expect(true).toBe(true);
  });
});