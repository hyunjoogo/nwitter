import React, {useEffect, useState} from "react";
import {collection, onSnapshot, orderBy, query, addDoc} from "firebase/firestore";
import {dbService, storageService} from "../firebase";
import {v4 as uuidv4} from 'uuid';
import {ref, uploadString, getDownloadURL} from "firebase/storage";
import Nweet from "../components/Nweet";
import NweetFactory from "../components/NweetFactory";

const Home = ({userObj}) => {
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

  return (
    <div>
      <NweetFactory userObj={userObj} />
      <div>
        {nweets.map(nweet => (
          <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
        ))}
      </div>
    </div>
  )
}


export default Home
