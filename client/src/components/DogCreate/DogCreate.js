import React from "react";
import {useState,useEffect} from "react";
import {Link,useHistory} from "react-router-dom";
import {postDog,getTemperaments} from "/Users/alezapata/Desktop/PI-Dogs-main/client/src/actions/index.js";
import { useDispatch,useSelector } from "react-redux";

export default function DogCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const temperaments = useSelector((state) => state.temperaments)

    const[input,setInput] = useState({
        name: "",
        height: "",
        weight: "",
        years:"",
        image:"",
        temperament:[]
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log(input);
    }

    function handleSelect(e){
        setInput({
            ...input,
            temperament: [...input.temperament,e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postDog(input))
        alert("Breed Added Successfully")
        setInput({
            name: "",
            height: "",
            weight: "",
            years:"",
            image:"",
            temperament:[]
        })
        history.push("/home")
    }

    useEffect(() =>{
        dispatch(getTemperaments());
    }, []);
    return(
        <div>
            <Link to= "/home">
                <button>
                    Go Back
                </button>
            </Link>
            <hi>Create Dog</hi>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <div>
                    <label>Dog Breed:</label>
                    <input
                    type= "text"
                    value= {input.name}
                    name="name"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Height min - max:</label>
                    <input
                    type="text"
                    value= {input.height}
                    name="height"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                <label>Weight min - max:</label>
                    <input
                    type="text"
                    value= {input.weight}
                    name="weight"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                <label>Years Span:</label>
                    <input
                    type="text"
                    value= {input.years}
                    name="years"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                <label>Image:</label>
                    <input
                    type="text"
                    value= {input.image}
                    name="image"
                    onChange={(e) => handleChange(e)}
                    />
                </div>  
                <select onChange={(e) => handleSelect(e)}>
                    {temperaments.map((temp) =>(
                        <option value={temp.name}>{temp.name}</option>
                    ))}
                </select>
                <ul><li>{input.temperament.map(el => el + " ,")}</li></ul>
                <button type="submit">Create Dog</button>
            </form>
        </div>
    )
}