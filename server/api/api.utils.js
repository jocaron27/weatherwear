class ApiAdapter {
    constructor(axios) {
        this.axios = axios;
        this.getLocation = this.getLocation.bind(this);
    }

    getLocation(req, res, next) {
        const address = req.query.location.replace(/\s*,\s*|\s+|\s,/g, '+');
        return this.axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_GEOLOCATION_KEY}`)
        .then(response => {
            if (!response || !response.data || !response.data.results) throw new Error('No data received for getLocation');
            else {
                const results = response.data.results;
                const lat = results && results.length && results[0].geometry.location.lat;
                const lng = results && results.length && results[0].geometry.location.lng;
                const location = results[0].formatted_address;
                res.send({
                    lat,
                    lng,
                    location
                })
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).send(error);
        })
    }
}

module.exports = {
    ApiAdapter
}