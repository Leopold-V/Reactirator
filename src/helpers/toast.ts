export const toastInstallStyle = {
    style: {
        margin: '16px',
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
    },
    loading: {
        duration: 2000
    },
    success: {
        duration: 5000,
        icon: '✅',
    },
    error: {
        duration: 5000,
        icon: '❌',
    },
}

export const toastInstallMsg = {
    loading: 'Installation start !',
    success: () => `Successfully installed !`,
    error: (err: Error) => `An error happened: ${err.toString()}`
}

export const toastValidationStyle = {
    icon: '❌',
    style: {
        margin: '16px',
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
    },
}