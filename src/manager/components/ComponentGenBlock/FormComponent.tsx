import React, { ChangeEvent, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';

import { fileExist, promisifyWriteFs } from '../../../utils/promisifyFs';
import { validateFileName } from '../../../utils/validateInput';
import createTemplateComponent from '../../../utils/createTemplateComponent';
import { formCompType } from '../../helpers/types';
import { useAppSelector } from '../../../hooks';

import { Button } from '../../../common/Button';
import { Input } from '../../../common/Input';
import { toastInstallStyle, toastValidationStyle } from '../../../creator/helpers/toast';
import { SelectComponentMode } from './ComponentMode';
import { ComponentPreview } from './ComponentPreview';

type FormComponentProps = {
  input: formCompType;
  setInput: (input: formCompType) => void;
  location: string;
};

export const FormComponent = ({ location }: FormComponentProps) => {
  const isTypescript = useAppSelector((state) => state.project.isTypescript);
  const [name, setName] = useState('');
  const [mode, setMode] = useState('rfc');
  const [componentCode, setComponentCode] = useState('');
  const [loading, setLoading] = useState(false);

  const componentExtension = isTypescript ? '.tsx' : '.jsx';

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const checkIfNameValid = async () => {
    if (!location) {
      toast.error('Please, chose a folder location!', toastValidationStyle);
      return false;
    }
    if (!name) {
      toast.error('Empty name!', toastValidationStyle);
      return false;
    }
    if (!validateFileName(name)) {
      toast.error('Invalide component name', toastValidationStyle);
      return false;
    }
    const exist = await fileExist(`${location}/${name}${componentExtension}`);
    if (exist) {
      toast.error('Component name already exist!', toastValidationStyle);
      return false;
    }
    return true;
  };

  useEffect(() => {
    const componentCode = createTemplateComponent(mode, name);
    setComponentCode(componentCode);
  }, [name, mode]);

  const generateComponent = async () => {
    const isValid = await checkIfNameValid();
    if (!isValid) return;
    setLoading(true);
    await toast.promise(
      promisifyWriteFs(`${location}/${name}${componentExtension}`, componentCode),
      {
        loading: 'Loading...',
        success: () => {
          setLoading(false);
          return `New component!`;
        },
        error: () => {
          setLoading(false);
          return `An error happened`;
        },
      },
      toastInstallStyle
    );
  };

  if (loading) return <div className="w-1/2 text-lg text-gray-700">Generating component...</div>;
  return (
    <div className="space-y-4 w-2/3">
      <div className="flex flex-col justify-center items-center">
        <Input
          name="Component name"
          placeholder="Component name"
          type="text"
          value={name}
          onChange={handleChangeName}
        />
      </div>
      <SelectComponentMode mode={mode} setMode={setMode} />
      {/* <ListComponentOptions input={input} setInput={setInput} /> */}
      <ComponentPreview componentCode={componentCode} />
      <div className="text-center">
        <Button onClick={generateComponent}>Generate!</Button>
      </div>
    </div>
  );
};
