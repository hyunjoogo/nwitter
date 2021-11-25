import React, {useEffect, useState} from "react";
import {collection, onSnapshot, orderBy, where, query} from "firebase/firestore";
import {authService, dbService} from "../firebase";
import {updateProfile} from "firebase/auth";
import Nweet from "../components/Nweet";

const Profile = ({userObj, refreshUser}) => {
  const [nweets, setNweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState([]);

  const getMyNweets = async () => {
    const q = query(
      collection(dbService, "nweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );
    await onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setNweets(nweetArr)
    });
  }

  useEffect(() => {
    // getMyNweets()
  }, [])

  const onChange = (event) => {
    const {target: {value}} = event
    setNewDisplayName(value);
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      })
      refreshUser()
    }
  }

  return (
    <>
      <div>Profile</div>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onChange} value={newDisplayName} placeholder="바꿀 이름을 입력하세요"/>
        <input type="submit" value="변경" onClick={onSubmit}/>
      </form>
      {nweets.map(nweet => (
        <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
      ))}
    </>


  )
}
export default Profile
