import React, { useContext } from "react"
import { AppContext } from '../../App'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

function CountryDropDown({setName}) {
    const fetchedData = useContext(AppContext);

    function handleChange(event, value) {
        if(value) {
            setName(value)
        }
        else {
            setName('Thế giới')
        }
    }

    return (
        <div className="dropdown">
            <h3>Ngày cập nhật: {fetchedData.latest_date}</h3>
            <Autocomplete
                autoHighlight
                className="combo-box-country"
                onChange={handleChange}
                options={fetchedData.countriesName}
                renderInput={(params) => <TextField {...params} label="Thế giới" />}
            />
        </div>
    )
}

export default CountryDropDown;