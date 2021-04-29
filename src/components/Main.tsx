import React, { useReducer, useState } from 'react'
import { Form } from './Form';
import { Toaster } from 'react-hot-toast';

import reducerPackages from '../reducers/reducerPackages';

import { Modal } from './Modal';
import { useModal } from '../hooks/useModal';
import { SearchPackages } from './SearchPackages';

export const Main = ({packageJson, setPackageJson}: {packageJson: any, setPackageJson: any}) => {
    const [show, toggleModal] = useModal();
    const [loading, setLoading] = useState(false);
    const [listPackages, dispatch] = useReducer(reducerPackages, []);

    const propsForm = { loading: loading,
        setLoading: setLoading,
        toggleModal: toggleModal,
        listPackages: listPackages,
        setPackageJson: setPackageJson,
        packageJson: packageJson
    }

    const propsSearchPackages = {
        listPackages: listPackages,
        dispatchPackages: dispatch,
        setPackageJson: setPackageJson
    }

    return (
        <div className="pt-8 flex justify-start items-center flex-wrap w-11/12">
            <Toaster position="top-center" />
            <div className="bg-gray-50 text-gray-800 px-8 rounded mx-auto flex justify-start max-h-full lg:w-1/3">
                <Form {...propsForm} />
            </div>
            <div className={`text-7xl hidden lg:block ${loading ? 'animate-arrow-bounce' : ''}`}>&#10140;</div>
            <div className="bg-gray-50 text-gray-800 px-8 rounded mx-auto flex justify-start lg:w-1/2">
                <SearchPackages {...propsSearchPackages} />
            </div>
            <Modal loading={loading} show={show} toggleModal={toggleModal} />
        </div>
    )
}
