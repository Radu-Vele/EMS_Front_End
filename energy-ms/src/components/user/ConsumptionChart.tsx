import { Grid, Typography } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { useState } from "react";
import { BarChart, Legend, Bar, Tooltip, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function ConsumptionChart({visible}): React.JSX.Element {
    const [data, setData] = useState([])
    const handleDateSelection = (selectedDate) => {
        let millisSinceEpoch = selectedDate.unix() * 1000
    }

    return (
        <>
            <Grid item xs={12} hidden={!visible}>
                <Typography>
                    Select the desired day
                </Typography>
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
                        <Bar dataKey="consumption" fill="#207C4A"/>
                    </BarChart>
                </ResponsiveContainer>
            </Grid>
        </>
    )
}