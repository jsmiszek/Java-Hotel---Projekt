import axios from 'axios';
import authHeader from "./AuthHeader";
import SearchRoom from "../SearchEngine/SearchRoomService";

const API_URL = "/api/rooms";
const img = "/RoomOccupancy/";

class RoomService {
    getAllRooms() {
        return axios.get("/api/rooms").then(response => {
            //console.log(response.data);
            return response.data._embedded.rooms;
        })
    }

    getAllRooms3(){
        return axios.get("/api/rooms1", {headers: authHeader()});
    }

    getAllRooms2(){
        //return axios.get(API_URL, {headers: authHeader()});
        return axios.get("/api/rooms").then(response => {
            //console.log(response.data);
            return response.data;
        })
    }

    getRoomStandard(room) {
        return axios.get("/api/rooms/" + room.id + "/roomStandard", {headers: authHeader()}).then(response => {
            return response.data;
        })
    }

    getRoomOccupancyImg(room) {
        return this.getRoomStandard(room).then(res => {
            return (img + room.currentNumberOfGuests + res.max_capacity + '.png');
        });
    }

    getRoomGuests(room) {
        return axios.get("/api/rooms/" + room.id + "/guests").then(response => {
            return response.data._embedded.guests;
        })
    }

    getAllRoomsByFloor(floor) {
        return axios.get("/api/rooms/search/findByRoomNameStartsWith?str=" + floor).then(response => {
            //console.log(response.data);
            return response.data._embedded.rooms;
        })
    }
}

export default new RoomService();