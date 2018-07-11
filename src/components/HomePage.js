import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as types from '../constants/actionTypes';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, linearGradient, stop } from 'recharts';


class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch({ type: types.SEARCH_NOAA_REQUEST });
    }
    render() {
        return <div>
            <LineChart width={800} height={400} data={this.props.climate.month}>
                <defs>
                    <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="75%" stopColor="#e60042" stopOpacity={0.2} />
                        <stop offset="65%" stopColor="#e60042" stopOpacity={0.5} />
                        <stop offset="50%" stopColor="#e60042" stopOpacity={1} />
                    </linearGradient>
                </defs>
                <Line type="monotone" dataKey="max" stroke="url(#colorMax)" />
                <Line type="monotone" dataKey="avg" stroke="#8884d8" />
                <Line type="monotone" dataKey="min" stroke="#4f81bd" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart>
        </div>;
    }
}

HomePage.propTypes = {
    videos: PropTypes.array,
    selectedVideo: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};
const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length

const processData = (data) => ({
    month: Object.values(data.reduce((ret, item) => {
        const key = item.date.toLocaleString('en-us', { month: "long" });
        return {
            ...ret, [key]: {
                name: key,
                degrees: [...(ret[key] ? ret[key].degrees : []), parseFloat(item.degree)]
            }
        }
    }, {})).map((item) => ({
        ...item,
        min: Math.min(...item.degrees),
        max: Math.max(...item.degrees),
        avg: arrAvg(item.degrees).toFixed(2)

        // avg: Math.avg(...item.degrees)
    }))
})

/* Subscribe component to redux store and merge the state into component\s props */
const mapStateToProps = (state) => ({
    climate: processData(state.climate.climates || [])
});

/* connect method from react-router connects the component with redux store */
export default connect(mapStateToProps)(HomePage);
