import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';

function Master() {

    const weekDay = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const [newDay,setNewDay] = useState<any>("Monday");
    const [currentYear,setCurrentYear] = useState<any>("");
    const [currentMonth,setCurrentMonth] = useState<any>("");
    const [currentDate,setCurrentDate] = useState<any>("");
    const [currentHour,setCurrentHour] = useState<any>("00");
    const [currentMinutes,setCurrentMinutes] = useState<any>("00");
    const [currentSeconds,setCurrentSeconds] = useState<any>("00");
    const [amountSpent,setAmountSpent] = useState<any>("");
    const [productName,setProductName] = useState<string>("");
    const [categoryName,setCategoryName] = useState<string>("");
    const [dataList, setDataList] = useState<any[]>([]);
    const [totalSpent, setTotalSpent] = useState<number>(0);

    const updateTime = () =>{
     const time = new Date();
     const day = weekDay[time.getDay()];
         setCurrentYear(String(time.getFullYear()));
         setCurrentMonth(String(time.getMonth()+1).padStart(2,"0")); // time.getMonth() is zero-based (January = 0)
         setCurrentDate(String(time.getDate()).padStart(2, "0"));// time.getDay() returns the weekday (0–6), not the day-of-month. Use time.getDate() for the day-of-month.
         setNewDay(day);
         setCurrentHour(String(time.getHours()).padStart(2, "0"));
         setCurrentMinutes(String(time.getMinutes()).padStart(2, "0"));
         setCurrentSeconds(String(time.getSeconds()).padStart(2, "0"));
    }

  const createData = async () => {
  const finalDate = currentYear + currentMonth + currentDate + currentHour + currentMinutes + currentSeconds;

  try {
  const token = localStorage.getItem('token');
   console.log('Sending token:', token);
       await axios.post("https://fxtserver.onrender.com/api/data/send", 
      { date: finalDate, amountSpent, productName, categoryName }, 
  { headers: { Authorization: `Bearer ${token}` } });
   console.log("Successfuly sent data in the database");
  } catch (error) {
    console.log("Unable to send data",error);
  }
};
  

  // READ
  const readData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://fxtserver.onrender.com/api/data/read",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDataList(res.data);
    } catch (error) {
      console.log("Unable to fetch data", error);
    }
  };

  // SUM
  const fetchTotalSpent = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://fxtserver.onrender.com/api/data/sum",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTotalSpent(res.data.totalAmountSpent);
    } catch (error) {
      console.log("Unable to fetch total sum", error);
    }
  };

  // DELETE
  const deleteData = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://fxtserver.onrender.com/api/data/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Item deleted:", id);

      // update list after deletion
      setDataList((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log("Unable to delete data", error);
    }
  };

  useEffect(() => {
    updateTime();
  const timer =  setInterval(updateTime,1000); 
  return () => clearInterval(timer); 
  }, []);

  useEffect(() => {
    fetchTotalSpent();
    readData();
  }, [])
  
  return (
    <>
      <div>
       <div className="frame">
        <div className="panel">
          <div className="blockA">
            <div className="a1">
             <div className="pagename">FXT App</div>
            </div>
            <div className="a2">
                 <div className="calendarBlock">
                    <div className="year">{currentYear}</div>
                    <div className="month">{currentMonth}</div>
                    <div className="date">{currentDate}</div>
                </div>
                <div className="timeBlock">
                  <div className="hours">{currentHour} :</div>
                  <div className="minutes">{currentMinutes} :</div>
                  <div className="seconds">{currentSeconds}</div>
                  <div className="day">{newDay}</div>
                </div> 
            </div>
          </div>
          <div className="blockB">
            <div className="b1">
              <div className="bHeader">Enter Data</div>
              <input onChange={(e)=> setAmountSpent(e.target.value)} type="text" placeholder='Amount'/>
              <input onChange={(e)=> setProductName(e.target.value)} type="text" placeholder='Product'/>
              <input onChange={(e)=> setCategoryName(e.target.value)} type="text" placeholder='Category'/>
              <div onClick={createData} className="sendBtn">Enter Data</div>
            </div>
            <div className="b2">
              <div onClick={readData} className="readData">Show Data</div>
            </div>
          </div>
          <div className="blockC">
            <div className="c1">
              {dataList.map((item)=>(
                <div key={item._id} className="dataList">
                 <div className='data'>{item.amountSpent}</div>
                  <div className='data'>{item.productName}</div>
                   <div className='data'>{item.categoryName}</div>
                   <div onClick={()=>deleteData(item._id)} className='deleteData'>Delete</div>
                </div>
              ))}
            </div>
            <div className="c2">
              <h3>Total Amount Spent: {totalSpent}</h3>
            </div>
          </div>
        </div>
       </div>
      </div>
    </>
  )
}

export default Master;


