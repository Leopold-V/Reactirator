import React, { useState } from 'react'
import { Form } from './Form';
import { Toaster } from 'react-hot-toast';

import { Modal } from './Modal';
import { useModal } from '../hooks/useModal';

export const Main = () => {

    const [loading, setLoading] = useState(false);
    const [show, toggleModal] = useModal();

    return (
        <div className="pt-8 flex justify-between items-center flex-wrap w-11/12">
            <Toaster position="top-center" />
            <div className="bg-gray-50 text-gray-800 px-8 lg:w-1/3 rounded mx-auto">
                <Form loading={loading} setLoading={setLoading} toggleModal={toggleModal} />
            </div>
            <div className={`text-7xl hidden lg:block ${loading ? 'animate-arrow-bounce' : ''}`}>&#10140;</div>
            <Modal loading={loading} show={show} toggleModal={toggleModal} />
        </div>
    )
}
