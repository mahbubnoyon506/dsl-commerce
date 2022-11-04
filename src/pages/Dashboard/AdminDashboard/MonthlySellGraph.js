import React from 'react';
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const MonthlySellGraph = () => {
  const data =
    [
      {
        month: "Jan",
        Sell: 1200
      },{
        month: "Feb",
        Sell: 3054
      },
      {
        month: "Mar",
        Sell: 2400
      },
      {
        month: "Apr",
        Sell: 4200
      },
      {
        month: "May",
        Sell: 7200
      },
      {
        month: "Jun",
        Sell: 5290
      },
      {
        month: "Jul",
        Sell: 6010
      },
      {
        month: "Aug",
        Sell: 6700
      },
      {
        month: "Sep",
        Sell: 4300
      },
      {
        month: "Oct",
        Sell: 1507
      }
    ]


  return (
    <div style={{ height: 400 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip></Tooltip>
          <Legend />
          <Area type="monotone" dataKey="Sell" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySellGraph;