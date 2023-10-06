import toast from 'react-hot-toast';

const success = () => {
    toast.success('Successfully toasted!')
}

const error = () => { 
    toast.error('Err')
}

const warning = () => {
    toast.warning('War')
}

export {success, error, warning}