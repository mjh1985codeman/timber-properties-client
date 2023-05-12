import React, {useState, useEffect} from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Loading from '../components/Loading';

export default function PropPics({propIdForPics}) {
    const [picArray, setpicArray] = useState([]);
    const [hasPics, setHasPics] = useState(true);

    const url = `https://s3.amazonaws.com/tr-prop-bucket/${propIdForPics}.json`;

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(url);
            if(result.status === 403) {
                setHasPics(false);
            };
            result.json().then(json => {
                updateImageArray(json);
            })
            .catch(error => {
                return error;
            })
        }
        fetchData();
    }, [url]);

    function updateImageArray(obj) {
        const pictures = obj.jsonPicArrayObj.images;
        //putting this here so that state doesn't get duplicated.
        setpicArray([]);
        pictures.forEach(pic => {
            setpicArray(picArray => [...picArray, pic]);
        });
    }
        if(picArray.length > 0) {
            return (
            <>
            <Carousel>
            {picArray.map(pic => (
                <Carousel.Item  key={propIdForPics + Math.random()} className="carousel-item">
                    <img
                    className="d-block propimg w-100 img-fluid"
                    src={pic}
                    alt="One of one or more visuals of the property."
                    />
                </Carousel.Item>
            ))}    
            </Carousel> 
            </>
            )
        } else if (!hasPics) {
            return <div>No Pictures Available at this time.</div>
        } else {
        return <Loading/>
        }
};
