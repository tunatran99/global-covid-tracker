import React, { useContext } from "react";
import { AppContext } from '../../App'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function Chart(props) {
    const fetchedData = useContext(AppContext);
    
    const CustomToolTip = props => {
        const { active, payload, label } = props;
        if (!active || !payload) {
          return null;
        }
        return (
          <div
            className="custom-tooltip"
          >
            <p>
              <strong>{label}</strong>
            </p>
            {payload.map((item, i) => (
              <p key={i}>
                {item.name}: <strong>{item.value.toLocaleString()}</strong>
              </p>
            ))}
          </div>
        );
      };

    return (
        <div className="linechart">
            <h3>Biểu đồ {props.name}</h3>
            <LineChart
                className="custom"
                width={1120}
                height={500}
                data={fetchedData.casesArray}
                margin={{
                    top: 5,
                    right: 10,
                    left: 0,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={tick => {
                    return tick.toLocaleString();
                }} />
                <Tooltip content={<CustomToolTip />} />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#6666fa96"
                    name="Tổng ca nhiễm"
                />
                <Line
                    type="monotone"
                    dataKey="active"
                    stroke="#dd641396"
                    name="Đang được chữa"
                />
                <Line
                    type="monotone"
                    dataKey="recovered"
                    stroke="#36ded1"
                    name="Khỏi"
                />
                <Line
                    type="monotone"
                    dataKey="death"
                    stroke="#fa8181"
                    name="Tử vong"
                />
            </LineChart>
        </div>
    )
}

export default Chart;