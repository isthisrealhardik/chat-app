import { signOut } from "firebase/auth";
import { auth, getUser } from "../../firebase/config";
import { useEffect, useState } from "react";
import { collection, addDoc, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../firebase/config";
import { FaArrowRight } from 'react-icons/fa';

const Chat = () => {
    // message data that would be printed
    const [data, setData] = useState(null);
    // user data from firebase config
    const userData = getUser();
    // your user id?
    const ownId = userData.uid;
    // input data that is taken from user to send as message
    const [userMessage, setUserMessage] = useState('');

    // helps in signing out
    const signOutHandle = () => {
        signOut(auth)
            .then(() => {
                console.log('user signed out sucessfully')
            }).catch(err => {
                console.log(err);
            })
    }

    // helps in sending a message to the database
    const sendMessage = async (e) => {
        e.preventDefault();
        if (userMessage.length !== 0) {
            try {
                const timestamp = new Date().getTime();
                const docRef = await addDoc(collection(db, 'messages'), {
                    message: userMessage,
                    name: userData.displayName,
                    icon: userData.photoURL,
                    timestamp: timestamp,
                    senderID: userData.uid,
                })
                setUserMessage('');
                console.log(`document written with ${docRef.id}`)
            } catch (err) {
                console.error(err);
            }
        } else {
            console.log('empty message sent')
        }
    }

    const getData = async () => {
        const querySnapshot = await getDocs(collection(db, 'messages'), orderBy('timestamp', 'asc'));
        setData(querySnapshot)
    }
    

    useEffect(() => {
        getData();
    }, [data])
    
    return (
        <div className="flex flex-col justify-start h-screen">
            <div id="Nav" className="sticky top-0 bg-primary flex border-opacity-20 z-20 justify-between w-screen px-8 py-4 items-center border-b border-b-secondary">
                <h1 className="font-sans text-4xl font-semibold">Chat</h1>
                <button className="bg-middle font-semibold" onClick={signOutHandle}>Sign Out</button>
            </div>
            <div id="Playing-Field" className="flex flex-col px-8" >
                {data && data.docs.map(obj => {
                    const sendID = obj.data().senderID;
                    return (
                        <div style={{ flexDirection: sendID == ownId ? 'row-reverse' : 'row' }} className="py-2 flex justify-start items-center my-2">
                            <img className="w-10 h-10 rounded-sm" key={obj.data().count} src={obj.data().icon} alt={obj.data().name} />
                            <div style={{ alignItems: sendID == ownId ? 'flex-end' : 'flex-start' }} className="flex mx-3 flex-col justify-center">
                                <p className="text-[10px] font-normal tracking-widest text-secondary opacity-80 lowercase" key={obj.id} >{obj.data().name}</p>
                                <p className="text-xl text-secondary" key={obj.data().name}>{obj.data().message}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div id="Input-Field" className="fixed bottom-0 bg-primary">
                <form onSubmit={sendMessage} className="flex border-opacity-20 justify-between w-screen px-8 py-3 items-center border-t border-t-secondary" >
                    <input className="px-5 py-2 rounded-sm bg-secondary text-primary placeholder:text-primary w-96 h-12" type="text" placeholder="Send a message..." max={255} value={userMessage} onChange={e => setUserMessage(e.target.value)} />
                    <button className="bg-middle rounded-sm w-16 justify-center items-center h-12 ml-4 hover:bg-secondary transition-all hover:text-middle" type="submit" >
                        <FaArrowRight />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Chat;
