import React, {useState} from 'react'


export const useForm = (initialState = {}) => {
    
    const [values, setValues] = useState(initialState);

    const reset = (resetState = {}) => {
        setValues(resetState);
        console.log(values);
    }

    const handleInputChange = (e) => {
            setValues({
                ...values,
                [e.target.name]: e.target.value,
            })

    }   

    const handleDateChange = (e, name = '') => {
        setValues({
            ...values,
            [name]: e
        })
    }

    return [values, setValues, handleInputChange, handleDateChange, reset];
}
