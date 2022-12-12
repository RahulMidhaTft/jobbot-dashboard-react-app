import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import {
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";

import { AuthContext } from "../../context/auth-context";
import { useAxiosMutation } from "../../hooks/use-axios-mutation";
import { useAxiosQuery } from "../../hooks/use-axios-query"; // eslint-disable-line
import { ngrokApi, ApiKeys } from "../../lib/api/ngrok-api"; // eslint-disable-line

import "./clicks-page.css";

// eslint-disable-next-line
const CHART_DATA = [
  { date: "5-Nov-22", clicks: 74, pv: 2400, amt: 2400 },
  { date: "6-Nov-22", clicks: 22, pv: 2400, amt: 2400 },
  { date: "7-Nov-22", clicks: 225, pv: 2400, amt: 2400 },
  { date: "8-Nov-22", clicks: 36, pv: 2400, amt: 2400 },
  { date: "9-Nov-22", clicks: 32, pv: 2400, amt: 2400 },
  { date: "10-Nov-22", clicks: 124, pv: 2400, amt: 2400 },
  { date: "11-Nov-22", clicks: 229, pv: 2400, amt: 2400 },
  { date: "12-Nov-22", clicks: 41, pv: 2400, amt: 2400 },
  { date: "13-Nov-22", clicks: 80, pv: 2400, amt: 2400 },
  { date: "14-Nov-22", clicks: 152, pv: 2400, amt: 2400 },
  { date: "15-Nov-22", clicks: 187, pv: 2400, amt: 2400 },
  { date: "16-Nov-22", clicks: 69, pv: 2400, amt: 2400 },
  { date: "17-Nov-22", clicks: 119, pv: 2400, amt: 2400 },
  { date: "18-Nov-22", clicks: 236, pv: 2400, amt: 2400 },
  { date: "19-Nov-22", clicks: 231, pv: 2400, amt: 2400 },
  { date: "20-Nov-22", clicks: 224, pv: 2400, amt: 2400 },
  { date: "21-Nov-22", clicks: 73, pv: 2400, amt: 2400 },
  { date: "22-Nov-22", clicks: 88, pv: 2400, amt: 2400 },
  { date: "23-Nov-22", clicks: 193, pv: 2400, amt: 2400 },
  { date: "24-Nov-22", clicks: 190, pv: 2400, amt: 2400 },
  { date: "25-Nov-22", clicks: 100, pv: 2400, amt: 2400 },
  { date: "26-Nov-22", clicks: 201, pv: 2400, amt: 2400 },
  { date: "27-Nov-22", clicks: 98, pv: 2400, amt: 2400 },
  { date: "28-Nov-22", clicks: 58, pv: 2400, amt: 2400 },
  { date: "29-Nov-22", clicks: 125, pv: 2400, amt: 2400 },
  { date: "30-Nov-22", clicks: 188, pv: 2400, amt: 2400 },
  { date: "1-Dec-22", clicks: 232, pv: 2400, amt: 2400 },
  { date: "2-Dec-22", clicks: 72, pv: 2400, amt: 2400 },
  { date: "3-Dec-22", clicks: 45, pv: 2400, amt: 2400 },
  { date: "4-Dec-22", clicks: 238, pv: 2400, amt: 2400 },
  { date: "5-Dec-22", clicks: 214, pv: 2400, amt: 2400 },
];

const getFormatttedDate = (range) => {
  let startDate = "";
  let endDate = "";

  if (range[0] && range[1]) {
    startDate = format(new Date(range[0]["$d"]), "yyyy-MM-dd");
    endDate = format(new Date(range[1]["$d"]), "yyyy-MM-dd");
  }

  return { startDate, endDate };
};

export const ClicksPage = () => {
  const { data } = useContext(AuthContext);
  const [dateRange, setDateRange] = useState([null, null]);
  // const { startDate, endDate } = getFormatttedDate(dateRange);
  const [chartData, setChartData] = useState([]); // eslint-disable-line

  // const { data: clicks, isLoading } = useAxiosQuery(
  //   ApiKeys.Clicks,
  //   ngrokApi.getClicks,
  //   {
  //     refetchOnMount: false,
  //     refetchOnReconnect: false,
  //     refetchOnWindowFocus: false,
  //   }
  // );

  const mutation = useAxiosMutation(ngrokApi.getClicks, {
    onSuccess: ({ data }) => {
      setChartData(data);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return (
    <div className="container clicks">
      <h2>{`Clicks (${data.clicks})`}</h2>
      <hr />
      <div className="datepicker">
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          localeText={{ start: "Start Date", end: "End Date" }}
        >
          <DateRangePicker
            value={dateRange}
            onChange={(newValue) => {
              setDateRange(newValue);
              mutation.mutate(getFormatttedDate(newValue));
            }}
            renderInput={(startProps, endProps) => (
              <>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> - </Box>
                <TextField {...endProps} />
              </>
            )}
          />
        </LocalizationProvider>
      </div>

      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          width={400}
          height={400}
          // data={chartData}
          data={CHART_DATA}
          margin={{ top: 16, right: 0, bottom: 16, left: 0 }}
        >
          <Line type="monotone" dataKey="clicks" stroke="#8884d8" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
