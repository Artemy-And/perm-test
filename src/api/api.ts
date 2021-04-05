import axios from 'axios';
import {DataType} from "../features/table-reducer/table-reducer";


export type ResponseType = {
    data: Array<DataType>
}
export const walkingApi = {
    getListOfWalkings() {
        return axios.get(`http://localhost:3000/walking`)
            .then((res) => {
                console.log(res);
                return res;
            });
    },
    getWalkingById(id: number) {
        return axios.get(`http://localhost:3000/walking/${id}`)
            .then((res) => {
                return res;
            });
    },
    addNewWalking(date: string, distance: string) {
        return axios.post(`http://localhost:3000/walking/`, {id: Math.floor(Math.random()*9999), date, distance})
            .then((res) => {
                return res;
            });
    },
    updateWalkingById(id:number,date: string, distance: string) {
        return axios.put(`http://localhost:3000/walking/${id}`, {date, distance})
            .then((res) => {
                return res;
            });
    },
    deleteWalkingById(id:number) {

        return axios.delete(`http://localhost:3000/walking/${id}`, )
            .then((res) => {
                return res;
            });
    },
};

