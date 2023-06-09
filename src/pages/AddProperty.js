import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/client';
import { Container } from 'react-bootstrap';
import { ADD_PROPERTY } from '../controllers/mutations';
import Auth from '../helpers/auth';
import Loading from '../components/Loading';
import validator from '../helpers/validators';
import Modal from '../components/Modal';
const { GET_S3_BUCKET_URL, GET_S3_COVER_URL } = require('../controllers/queries');


export default function Property() {
  const navigate = useNavigate();
  const [showAPEmptyModal, setShowAPEmptyModal] = useState(false);
  const [showImageRequiredModal, setShowImageRequiredModal] = useState(false);
  const [propName, setPropName] = useState("");
  const [addressSt, setAddressSt] = useState("");
  const [propCity, setPropCity] = useState("");
  const [propState, setPropState] = useState("AL");
  const [propZip, setPropZip] = useState("");
  const [reserveCost, setReserveCost] = useState("");
  const [reserveReady, setReserveReady] = useState(false);
  const [available, setAvailable] = useState(false);
  const [coverImage, setCoverImage] = useState({cImg: ""});
  const [coverImageName, setCoverImageName] = useState("");
  const [propImages, setPropImages] = useState([]);
  const [imageNames, setImageNames] = useState([]);
  const base64 = require('../helpers/base64');

  //mutation. 
  const [addProperty, {loading, error, data}] = useMutation(ADD_PROPERTY);
  let propId;
  const {s3Loading, s3Error, s3Data, refetch: refetchS3Url} = useQuery(GET_S3_BUCKET_URL, {
    variables: {propId}
  });

  const {coverLoading, coverError, coverData, refetch: refetchCoverURL} = useQuery(GET_S3_COVER_URL, {
    variables: {propId}
  });

  function handleCloseModal() {
    setShowImageRequiredModal(false);
    setShowAPEmptyModal(false);
    window.location.reload();
  };

  function handleInputChange(e) {
      e.preventDefault();
      
      const {name, value} = e.target;

      if(name === 'propName') {
          return setPropName(value);
      } else if (name === 'addressSt') {
          return setAddressSt(value);
      } else if (name === 'propCity') {
          return setPropCity(value);
      } else if (name === 'propState') {
          return setPropState(value)
      }
      else if (name === 'propZip') {
          return setPropZip(value)
      }
      else if (name === 'reserveCost') {
          return setReserveCost(value)
      };
  }

  function handleRadioInputChange(e) {
    const {name, value} = e.target;
    if (name === 'reserveReady') {
        return setReserveReady(value)
    } else if (name === 'available') {
        return setAvailable(value)
    };
  }

  function sendPicsToS3(url, picArray, newId, coverPic, coverUrl) {
    const jsonPicArrayObj = { images: picArray};
    const jsonPicArrayStr = JSON.stringify({jsonPicArrayObj});
    const coverObj = {cover: coverPic};
    const coverString = JSON.stringify(coverObj);

    // Send a PUT request to the presigned URL with the FormData object as the body
    fetch((url), {
    method: 'PUT',
    body: jsonPicArrayStr,
    })
    .then((response) => {
      if (response.ok) {
        fetch((coverUrl), {
          method: 'PUT',
          body: coverString,
        }).then((coverResponse) => {
          if(coverResponse.ok) {
            navigate(`/properties/${newId}`);
          };
        });
      } else {
        console.error('Upload failed with status', response);
        return response;
      }
    })
    .catch((error) => {
      console.error('Error sending request to s3:', error);
      return error;
    });  
  };
  
  async function handleFileUpload (e){
    e.preventDefault();
    const b64Images = [];
    const image = e.target.files[0];
    const imageName = image.name;
    const convertedImage = await base64.convertToBase64(image);
    b64Images.push(convertedImage);
    setPropImages(b64Images => [...b64Images, convertedImage]);
    //Use this syntax to force the component to re-render immediately as it detects a change. 
    setImageNames(imageNames => [...imageNames, imageName]);
};

  async function handleCoverUpload (e){
    e.preventDefault();
    const image = e.target.files[0];
    const imageName = image.name;
    const convertedImage = await base64.convertToBase64(image);
    setCoverImageName(imageName);
    setCoverImage({cImg: convertedImage});
};
  function generatePropObj() {
    let obj; 
    if(propZip !== "" && propZip !== null && propZip !== undefined) {
      obj = {
        name: propName,
        //hardcoding reserved to false as this would be changed if/when the property is reserved. 
        reserved: false,
        reserveCost: JSON.parse(reserveCost),
        addressSt: addressSt,
        city: propCity,
        state: propState,
        zip: JSON.parse(propZip) || "",
        pictures: propImages, //THIS IS WHAT WE ARE SENDING TO S3. 
        readyToReserve: JSON.parse(reserveReady),
        available: JSON.parse(available)
      };
    } else {
      obj = {fake: ""};
    };
      return obj;
  };

  async function handleSubmit(e) {
      e.preventDefault();
      // Prevent the browser from reloading the page
      //LOGIC TO ADD THE PROPERTY. 
      const propObj = generatePropObj();

      const allFieldsComplete = validator.notEmpty(propObj);

      if(imageNames.length <= 0) {
        setShowImageRequiredModal(true);
      } else if (!allFieldsComplete) {
        setShowAPEmptyModal(true);
      }else {
          const propPicArray = propObj.pictures;
          //Mutation being called and the propObj being passed in as the variables. 
          await addProperty({
            variables: {
              name: propObj.name,
              reserved: propObj.reserved,
              reserveCost: propObj.reserveCost,
              addressSt: propObj.addressSt,
              city: propObj.city,
              state: propObj.state,
              zip: propObj.zip,
              readyToReserve: propObj.readyToReserve,
              available: propObj.available
            }
          }).then( async newPropData => {
              const newPropId = newPropData.data.addProperty._id;
              //here we can use the id of the newly added property and use that for the s3 stuff. 
              const s3BucketURL = await refetchS3Url({propId: newPropId});
              const s3CoverURL = await refetchCoverURL({propId: newPropId});
              if(coverLoading) {
                console.log(coverLoading);
              } if (coverError) {
                console.log(coverError);
              } if(coverData) {
                console.log(coverData);
              }
              if(s3BucketURL && s3CoverURL) {
                const s3PresignedURL = s3BucketURL.data.getS3URL;
                const s3PresignedCoverURL = s3CoverURL.data.getCoverS3URL;
                //call the function that sends a request to the s3 bucket with the prop pictures using the
                //presigned URL.
                sendPicsToS3(s3PresignedURL, propPicArray, newPropId, coverImage, s3PresignedCoverURL);
              } else {
                console.log('this is the data: ' , data);
                return `There was an error getting the s3 Bucket URL. ${s3Loading} // ${s3Data} // ${s3Error}`
              };
          });
  
        if(loading) return <Loading/>;
        if(error) return `Property Add Error. . .${error.message}`;
      };
      };

  return (
    <>
    <Container className='form-container'>
      {showImageRequiredModal ? (
        <Modal handleClose={handleCloseModal} className='modalstyle'>
         <h1>You must upload at least one picture to add a property.</h1>
        </Modal>
      ) : (null)}
      {showAPEmptyModal ? (
        <Modal handleClose={handleCloseModal} className='modalstyle'>
         <h1>All Fields are Required.</h1>
        </Modal>
      ) : (null)}
     {Auth.loggedIn() ? (
       <Form className='formstyle' onSubmit={handleSubmit}>
       <Form.Group className='formcontent'>
         <Form.Label className='formlabel'>
           <h3>Property Name</h3>
           <input className='calinput'type="text" name="propName" value={propName} onChange={handleInputChange}/>
         </Form.Label>
         <Form.Label className='formlabel'>
             <h3>Street Address</h3>
             <input className='calinput' type="text" name="addressSt" value={addressSt} onChange={handleInputChange}/>
         </Form.Label>
         <Form.Label className='formlabel'>
             <h3>City</h3>
             <input className='calinput' type="text" name="propCity" value={propCity} onChange={handleInputChange}/>
         </Form.Label>
         <Form.Label className='formlabel'>
             <h3>State</h3>
             <select className='calinput' type="text" name="propState" value={propState} onChange={handleInputChange}>
               <option value="AL">Alabama</option>
               <option value="AK">Alaska</option>
               <option value="AZ">Arizona</option>
               <option value="AR">Arkansas</option>
               <option value="CA">California</option>
               <option value="CO">Colorado</option>
               <option value="CT">Connecticut</option>
               <option value="DE">Delaware</option>
               <option value="DC">District Of Columbia</option>
               <option value="FL">Florida</option>
               <option value="GA">Georgia</option>
               <option value="HI">Hawaii</option>
               <option value="ID">Idaho</option>
               <option value="IL">Illinois</option>
               <option value="IN">Indiana</option>
               <option value="IA">Iowa</option>
               <option value="KS">Kansas</option>
               <option value="KY">Kentucky</option>
               <option value="LA">Louisiana</option>
               <option value="ME">Maine</option>
               <option value="MD">Maryland</option>
               <option value="MA">Massachusetts</option>
               <option value="MI">Michigan</option>
               <option value="MN">Minnesota</option>
               <option value="MS">Mississippi</option>
               <option value="MO">Missouri</option>
               <option value="MT">Montana</option>
               <option value="NE">Nebraska</option>
               <option value="NV">Nevada</option>
               <option value="NH">New Hampshire</option>
               <option value="NJ">New Jersey</option>
               <option value="NM">New Mexico</option>
               <option value="NY">New York</option>
               <option value="NC">North Carolina</option>
               <option value="ND">North Dakota</option>
               <option value="OH">Ohio</option>
               <option value="OK">Oklahoma</option>
               <option value="OR">Oregon</option>
               <option value="PA">Pennsylvania</option>
               <option value="RI">Rhode Island</option>
               <option value="SC">South Carolina</option>
               <option value="SD">South Dakota</option>
               <option value="TN">Tennessee</option>
               <option value="TX">Texas</option>
               <option value="UT">Utah</option>
               <option value="VT">Vermont</option>
               <option value="VA">Virginia</option>
               <option value="WA">Washington</option>
               <option value="WV">West Virginia</option>
               <option value="WI">Wisconsin</option>
               <option value="WY">Wyoming</option>
             </select>
         </Form.Label>
         <Form.Label className='formlabel'>
             <h3>Zip Code</h3>
             <input className='calinput' type="number" name="propZip" value={propZip} onChange={handleInputChange}/>
         </Form.Label>
         <Form.Label className='formlabel'>
           <h3>Cost to Reserve this Property</h3>
           <input className='calinput' type="number" step={0.01} name="reserveCost" value={reserveCost} onChange={handleInputChange}/>
         </Form.Label>
         <Form.Label className='formlabel'>
           <h3>Ready To Reserve?</h3>
           <div className="radioInputDiv">
           <input className='calinput' type="radio" name="reserveReady" value={true} onChange={handleRadioInputChange}/>
           <label>YES</label>
           <input className='calinput' type="radio" name="reserveReady" value={false} onChange={handleRadioInputChange}/>
           <label>NO</label>
           </div>
         </Form.Label>
         <Form.Label className='formlabel'>
           <h3>Available?</h3>
           <div className="radioInputDiv">
           <input className='calinput' type="radio" name="available" value={true} onChange={handleRadioInputChange}/>
           <label>YES</label>
           <input className='calinput' type="radio" name="available" value={false} onChange={handleRadioInputChange}/>
           <label>NO</label>
           </div>
         </Form.Label>
         <label className="upload-label-style" htmlFor="cover-upload">
           <h4 className="uploadprop-txt">Cover Picture</h4>  
         <input
           className='hide' 
           type="file"
           label="Image"
           name="coverPic"
           id='cover-upload'
           accept='.jpeg, .png, .jpg'
           onChange={(e) => handleCoverUpload(e)}
           />
         </label>
         <div>
             <h5 key={coverImageName}>{coverImageName}</h5>
         </div>  
         <label className="upload-label-style" htmlFor="pic-upload">
           <h4 className="uploadprop-txt">Upload Property Images</h4>  
         <input
           className='hide' 
           type="file"
           label="Image"
           name="propImage"
           id='pic-upload'
           accept='.jpeg, .png, .jpg'
           onChange={(e) => handleFileUpload(e)}
           />
         </label>
         <div>
           {imageNames.map((img, index) => (
             <h5 key={img + index}>{img}</h5>
           ))}
         </div>  
       <Button type="submit">Submit New Property</Button>
     </Form.Group>
     </Form> 
     ) : (
       <div className="bg-dark text-white">You Must Be Logged In to Add a Property!!! </div>
       )} 
     </Container>
  </>
  )
}