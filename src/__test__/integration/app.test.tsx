/**
 * @jest-environment jsdom
 */
 import React from 'react';
 import * as reactRedux from 'react-redux'
 import { Provider } from 'react-redux';
 import { cleanup, render } from '@testing-library/react';
 import { TaskSwitch } from '../../manager/components/TasksBlock/TaskSwitch'
 import { store } from '../../store';

 afterEach(cleanup);
 
 describe('button works correctly', () => {
   const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
   const useEffectMock = jest.spyOn(React, 'useEffect');

   it('renders the app', () => {
    useSelectorMock.mockReturnValue('/');
    useEffectMock.mockReturnValue();
     const tree = render(<Provider store={store}><TaskSwitch taskName='test' enabled={true} taskState="Idle" /></Provider>);
     expect(tree).toMatchSnapshot();
   });
 });
 