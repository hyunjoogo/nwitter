import React, {useState} from "react";
import {doc, deleteDoc, updateDoc} from "firebase/firestore";
import {dbService} from "../firebase";


const Nweet = ({nweetObj, isOwner}) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("이 nweet를 삭제할까요?");
    if (ok) {
      await deleteDoc(doc(dbService, "nweets", `${nweetObj.id}`), console.log);
    }
  }
  const toggleEditing = () => {
    setEditing(prev => !prev);
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const washingtonRef = doc(dbService, "nweets", `${nweetObj.id}`);

// Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
      text : newNweet,
    });
    setEditing(false);
  }

  const onChange = (event) => {
    const {target: {value},} = event;
    setNewNweet(value)
  }

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input type="text" placeholder="nweet를 수정하세요." value={newNweet} onChange={onChange} required/>
            <input type="submit" value="수정" onClick={onSubmit}/>
          </form>
          <button onClick={toggleEditing}>취소</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && <>
            <button onClick={onDeleteClick}>Delete Nweet</button>
            <button onClick={toggleEditing}>Edit Nweet</button>
          </>}
        </>
      )}
    </div>
  )
}

export default Nweet;
