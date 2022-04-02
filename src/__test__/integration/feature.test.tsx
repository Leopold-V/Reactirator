/**
 * @jest-environment jsdom
 */
import React, { useReducer, useState } from 'react';
import { cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import * as packageService from '../../services/package.service';
import initialPackageJson from '../../creator/helpers/initialPackageJson';
import initialState from '../../creator/helpers/initialState';

import { FeaturesPage } from '../../creator/components/pages/FeaturesPage';
import jsonPackageReducer from '../../creator/reducers/jsonPackageReducer';
import { PackageJsonProvider } from '../../creator/components/Contexts/PackageJsonProvider';
import { CardPackageJson } from '../../creator/components/PackageJsonBlock';

afterEach(cleanup);

describe('Add feature to the project', () => {
  it('should render the feature page', () => {
    const tree = render(<FakeFeaturePage />);
    expect(tree).toMatchSnapshot();
  });

  it('should activate typescript feature', async () => {
    jest.spyOn(packageService, 'searchOnePackage').mockResolvedValue(({
        collected: {
            metadata: {
                version: '1.0.0'
            }
        }
    }))
    render(<FakeFeaturePage />);
    fireEvent.click(screen.getByText('Bootstrap'));
    await waitFor(() => screen.queryByText('bootstrap'));
    expect(screen.getByTestId('packagejson')).toHaveTextContent('"bootstrap": "^1.0.0"');
  });
});

const FakeFeaturePage = () => {
  const [input, setInput] = useState(initialState);
  const [packageJson, dispatchJson] = useReducer(
    jsonPackageReducer,
    JSON.parse(JSON.stringify(initialPackageJson))
  );
  return (
    <PackageJsonProvider packageJson={packageJson} dispatchJson={dispatchJson}>
      <FeaturesPage input={input} setInput={setInput} />
      <CardPackageJson />
    </PackageJsonProvider>
  );
};
