import { Grid, Typography } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { useState } from "react";
import { BarChart, Legend, Bar, Tooltip, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { UserDayConsumptionService } from "../../api/users/UserDayConsumptionService";

export function ConsumptionChart({visible}): React.JSX.Element {
    const [data, setData] = useState([])
    const handleDateSelection = async (selectedDate) => {
        let millisSinceEpoch = selectedDate.unix() * 1000
        const response = await UserDayConsumptionService(millisSinceEpoch)
        if (response.status === 200) {
            let arr = []
            response.data.map((entry) => {
                arr.push(entry)
            })
            setData(arr)
        }
    }

    return (
        <>
            <Grid item xs={12} hidden={!visible}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar onChange={handleDateSelection}/>
                </LocalizationProvider> 
            </Grid>
            <Grid item xs={12} hidden={!visible}>
                <ResponsiveContainer width={'100%'} height={300}>
                    <BarChart
                        data={data}
                    >
                        <XAxis dataKey="hour"/>
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#207C4A"/>
                    </BarChart>
                </ResponsiveContainer>
            </Grid>
        </>
    )
}