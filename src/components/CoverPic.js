import React, {useState, useEffect} from 'react'
import Loading from '../components/Loading';

export default function CoverPic({propIdForCover}) {
    const [coverPic, setCoverPic] = useState("");
    const [hasCover, setHasCover] = useState(true);

    const url = `https://tr-prop-bucket.s3.amazonaws.com/cover-${propIdForCover}.json`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(url);
                if (!result.ok) {
                    setHasCover(false);
                    return;
                }
                const jsonData = await result.json();
                setCoverPic(jsonData.cover.cImg);
            } catch (error) {
                setHasCover(false);
            }
        }
        fetchData();
    }, [url]);
        if(coverPic) {
            return (
            <>
                <div key={propIdForCover + Math.random()}>       
                    <img
                    className="d-block propimg w-100 img-fluid cover-pic"
                    style={{ objectFit: 'cover', height: '300px', width: '300px' }}
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


