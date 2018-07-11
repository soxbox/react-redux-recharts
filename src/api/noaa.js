

export const noaaClimateData = () =>
    fetch('https://www.ncdc.noaa.gov/cag/global/time-series/globe/land_ocean/all/1/1880-2018.json')
        .then((res) => res.json())
        .then(({ data }) => Object.keys(data).reduce((ret, key, i) => {
            return [...ret, {
                date: new Date(parseInt(key.substr(0, 4)), parseInt(key.substr(4, 2))),
                degree: data[key],
                key: `data-${key}-${i}`
            }];
        }, []));
