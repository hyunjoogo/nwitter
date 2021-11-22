import React, {useEffect, useState} from "react";
import {addDoc, collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {dbService} from "../firebase";
import Nweet from "../components/Nweet";

const Home = ({userObj}) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  const updateNweets = async () => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setNweets(nweetArr)
    });
  }

  useEffect(() => {
    updateNweets()
  }, [])


  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(dbService, "nweets"), {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setNweet("")
  }

  const onChange = (event) => {
    const {target: {value}} = event;
    setNweet(value)
  }


  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="무슨 생각중이야?" maxLength={120} value={nweet} onChange={onChange}/>
        <input type="submit" value="전송" onClick={onSubmit}/>
      </form>
      <div>
        {nweets.map(nweet => (
          <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
        ))}
      </div>
    </div>
  )
}


export default Home
