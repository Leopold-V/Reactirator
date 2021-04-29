import React, { useState } from 'react'

export const useModal = () => {

    const [show, setShow] = useState(false);

    const toggleModal = () => {
        return setShow(show => !show);
    }

    console.log(show);

    return [show, toggleModal] as const;
}
