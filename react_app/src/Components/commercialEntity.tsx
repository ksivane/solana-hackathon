import React, { useEffect, useState } from "react";
import { Form , Figure } from 'react-bootstrap';
import Producer_score from '../Components/images/Producer.jpg';
import Manufacturer_score from '../Components/images/Manufacturer.jpg';
import Recycler_score from '../Components/images/ReCycler.jpg';
import Refurbisher_score from '../Components/images/Refurbisher.jpg';


const CommercialEntity = () => {

  const [GenerateGreenImage, setGenerateGreenImage] = useState("");

  const GenerateGreenSubstanability = (event) => {
    setGenerateGreenImage(event.target.value);
  }

  return (
    <>
     <div className="form-group">
          <Form.Select  onChange={(event)=> GenerateGreenSubstanability(event)} aria-label="Default select example">
              <option value="Select Generate Green and Sustainability Scores">Select Generate Green and Sustainability Scores</option>
              <option value="RedStone Electronics Pte. Ltd.">RedStone Electronics Pte. Ltd.</option>
              <option value="BlueForest Phones Pte. Ltd.">BlueForest Phones Pte. Ltd.</option>
              <option value="VKB Recyclers co.">VKB Recyclers co.</option>
              <option value="SecondLife Goods Pte. Ltd.">SecondLife Goods Pte. Ltd.</option>
          </Form.Select>
      </div>
      <br />
      {
        GenerateGreenImage === "RedStone Electronics Pte. Ltd." ?
        <Figure>
        <Figure.Image
          alt="Producer_score"
          src={Producer_score}
        />
      </Figure>
      : ''
      }
      {
        GenerateGreenImage === "BlueForest Phones Pte. Ltd." ?
        <Figure>
        <Figure.Image
          alt="Manufacturer_score"
          src={Manufacturer_score}
        />
      </Figure>
      : ''
      }
      {
        GenerateGreenImage === "VKB Recyclers co." ?
        <Figure>
        <Figure.Image
          alt="Recycler_score"
          src={Recycler_score}
        />
      </Figure>
      : ''
      }
      {
        GenerateGreenImage === "SecondLife Goods Pte. Ltd." ?
        <Figure>
        <Figure.Image
          alt="Refurbisher_score"
          src={Refurbisher_score}
        />
      </Figure>
      : ''
      }
   </>
  )

}

export default CommercialEntity;