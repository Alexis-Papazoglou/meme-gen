import "./MainContent.css"
import rand from "../random.js"
import { useEffect, useState } from "react"

export const MainContent = () => {

    const[meme,setMeme] = useState({
        topText: "" , 
        bottomText: "" ,
        imgUrl: ""
    })
    const [memeData,setMemeData] = useState([])

    useEffect(() => {

        console.log("RUN")

        fetch("https://api.imgflip.com/get_memes")
            .then((res) => res.json())
            .then((data) => setMemeData(data.data.memes))
    },[])

    function handleFormChange(event){
        const {name , value} = event.target
        setMeme(prevForm => {
            return {
                ...prevForm,
                [name]: value
            }
        })
    }

    const getMemeImg = () => {
        setMeme((prevMeme) => {
            return {
                ...prevMeme ,
                imgUrl: memeData[rand(0,99)].url   
            }})
    }

    return(
        <section className="main-section">
            <div className="form">
                <div className="inputs">
                    <input type="text" name="topText" value={meme.topText} onChange={handleFormChange} placeholder="Top text"/>
                    <input type="text" name="bottomText" value={meme.bottomText} onChange={handleFormChange} placeholder="Bottom text"/>
                </div>
                <button onClick={getMemeImg} className="form-btn">Get a new meme image</button>
            </div>
            <div className="meme">
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
                <img className="meme-img" src={meme.imgUrl} alt="" />
            </div>

        </section>
    )
}