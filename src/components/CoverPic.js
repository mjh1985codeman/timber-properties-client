import React, {useState, useEffect} from 'react'
import Loading from '../components/Loading';

export default function CoverPic({propIdForCover}) {
    const [coverPic, setCoverPic] = useState("");
    const [hasCover, setHasCover] = useState(true);

    const url = `https://tr-prop-bucket.s3.amazonaws.com/cover-${propIdForCover}.json`;

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(url);
            if(result.status === 403) {
                setHasCover(false);
            };
            result.json().then(jsonData => {
                console.log('result json: ' , jsonData);
                setCoverPic(jsonData.cover.cImg);
            })
            .catch(error => {
                return error;
            })
        }
        fetchData();
    }, [url]);
        if(coverPic) {
            return (
            <>
                <div key={propIdForCover + Math.random()}>       
                    <img
                    className="d-block propimg w-100 img-fluid"
                    src={coverPic}
                    alt="One of one or more visuals of the property."
                    />
                </div>
            </>
            )
        } else if (!hasCover) {
            return null
        } else {
        return <Loading/>
        }
};
