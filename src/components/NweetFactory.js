import {getDownloadURL, ref, uploadString} from "firebase/storage";
import {dbService, storageService} from "../firebase";
import {v4 as uuidv4} from "uuid";
import {addDoc, collection} from "firebase/firestore";
import {useState} from "react";

const NweetFactory = ({userObj}) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      await uploadString(attachmentRef, attachment, 'data_url');
      attachmentUrl = await getDownloadURL(attachmentRef)
    }
    const nweetObject = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    }
    await addDoc(collection(dbService, "nweets"), nweetObject);
    setNweet("");
    setAttachment("");
  }

  const onChange = (event) => {
    const {target: {value}} = event;
    setNweet(value)
  }

  const onFileChange = (event) => {
    const {target: {files}} = event;
    const theFile = files[0]
    const reader = new FileReader();
    reader.onload = (event) => {
      const {target: {result}} = event;
      setAttachment(result);
    }
    reader.readAsDataURL(theFile);
  }
  const onClearAttachment = () => setAttachment(null);


  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="무슨 생각중이야?" maxLength={120} value={nweet}
             onChange={onChange}/>
      <input type="file" accept="image/*" onChange={onFileChange}/>
      <input type="submit" value="전송" onClick={onSubmit}/>
      {attachment && <div>
        <img src={attachment} alt="user's upload" width="100px" height="100px"/>
        <button onClick={onClearAttachment}>이미지 삭제</button>
      </div>}
    </form>
  )
}

export default NweetFactory
