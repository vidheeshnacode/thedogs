import React, {useState, useEffect} from "react";
import axios from "axios";
export const Page = () => {
    const [data, setData] = useState([]);

    useEffect(
        () => {
         const fetchData = async () => {
            axios({
                method: 'get',
                url: 'http://localhost:3011/random'
              })
                .then(function (response) {
                  setData(response.data);
                });

         };
         fetchData();

        }, []
    );

    return(
        <div>
        <a>
            <img src = {data.message} ></img>
        </a>
        </div>    
    );
}

export default Page;