import React from "react";
import {
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
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

export const Clicks = () => {
  return (
    <div className="container">
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          width={400}
          height={400}
          data={data}
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
