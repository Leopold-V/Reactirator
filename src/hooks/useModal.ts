import { useState } from 'react'

export const useModal = () => {

    const [show, setShow] = useState(false);

    const toggleModal = (): void => {
        setShow(show => !show);
    }

    return [show, toggleModal] as const;
}
