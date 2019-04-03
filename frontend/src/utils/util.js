import { format} from 'date-fns';

const isEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object
}

const formatDateEnglish = date => format(date , 'YYYY-MM-DD');

export { isEmpty , formatDateEnglish };