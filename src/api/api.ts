import axios from 'axios';



export const infoWalkingApi = {
    getWalking() {
        return axios.get(`http://localhost:3000/walking`)
            .then((res) => {
                console.log(res);
                return res.data;
            });
    },
};

