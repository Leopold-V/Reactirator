/**
 * @jest-environment jsdom
 */
import React, { useReducer, useState } from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import initialPackageJson from '../../creator/helpers/initialPackageJson';
import initialState from '../../creator/helpers/initialState';

import jsonPackageReducer from '../../creator/reducers/jsonPackageReducer';
import { PackageJsonProvider } from '../../creator/components/Contexts/PackageJsonProvider';
import { CardPackageJson } from '../../creator/components/PackageJsonBlock';
import { DetailsForm } from '../../creator/components/DetailsBlock';

afterEach(cleanup);

describe('change information about the project', () => {
  it('should render the details form', () => {
    const tree = render(<FakeDetailsPage />);
    expect(tree).toMatchSnapshot();
  });

  it('should change the app name', async () => {
    render(<FakeDetailsPage />);
    const inputEle = screen.getByDisplayValue('0.1.0');
    fireEvent.change(inputEle, { target: { value: '3.0.0' } });
    expect(screen.getByTestId('packagejson')).toHaveTextContent('"version": "3.0.0"');
  });

  it('should change the version', async () => {
    render(<FakeDetailsPage />);
    const inputEle = screen.getByPlaceholderText('Description');
    fireEvent.change(inputEle, { target: { value: 'blablablabla' } });
    expect(screen.getByTestId('packagejson')).toHaveTextContent('"description": "blablablabla"');
  });

  it('should change the description', async () => {
    render(<FakeDetailsPage />);
    const inputEle = screen.getByPlaceholderText('App. name');
    fireEvent.change(inputEle, { target: { value: 'My react app' } });
    expect(screen.getByTestId('packagejson')).toHaveTextContent('"name": "My react app"');
  });
});

const FakeDetailsPage = () => {
  const [input, setInput] = useState(initialState);
  const [packageJson, dispatchJson] = useReducer(
    jsonPackageReducer,
    JSON.parse(JSON.stringify(initialPackageJson))
  );
  return (
    <PackageJsonProvider packageJson={packageJson} dispatchJson={dispatchJson}>
      <DetailsForm input={input} setInput={setInput} />
      <CardPackageJson />
    </PackageJsonProvider>
  );
};
