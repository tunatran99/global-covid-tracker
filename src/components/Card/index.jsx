import React, {useContext} from "react";
import {AppContext} from '../../App'

function Card() {
  const fetchedData = useContext(AppContext);

  return ( 
    <div className="card-container">
        <div className="data-collected">
          <div className="status" id="confirmed">
            Tổng số ca nhiễm
            <p>{fetchedData.confirmedTotal.toLocaleString()}</p>
            <p>Hôm nay + {fetchedData.confirmedNew.toLocaleString()}</p>
          </div>
          <div className="status" id="infected">
            Đang được chữa
            <p>{fetchedData.infectedTotal.toLocaleString()}</p>
            <p>Hôm nay + {fetchedData.infectedNew.toLocaleString()}</p>
          </div>
          <div className="status" id="recovered">
            Khỏi bệnh
            <p>{fetchedData.recoveredTotal.toLocaleString()}</p>
            <p>Hôm nay + {fetchedData.recoveredNew.toLocaleString()}</p>
          </div>
          <div className="status" id="death">
            Tử vong
            <p>{fetchedData.deathTotal.toLocaleString()}</p>
            <p>Hôm nay + {fetchedData.deathNew.toLocaleString()}</p>
          </div>
        </div>
    </div>
  );
  }
  
export default Card;