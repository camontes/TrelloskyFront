import axios from 'axios'

export default axios.create({

    //change port to Get API from Back-End
    baseURL: 'https://localhost:44381/api/Task/'
});