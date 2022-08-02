import React from "react";
import {useState,useEffect} from "react";
import {Link,useHistory} from "react-router-dom";
import {postDog,getTemperaments} from "../../actions/index";
import { useDispatch,useSelector } from "react-redux";
import styles from "../DogCreate/DogCreate.module.css";

function validate(input){
    let errors={};
    if(!input.name){
        errors.name = "A Breed is Required";
    } else if (!input.height){
        errors.height = "Introduce a height range";
    }
    return errors;
}

export default function DogCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const temperaments = useSelector((state) => state.temperaments)
    const [errors,setErrors] = useState({});

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
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
        console.log(input);
    }

    function handleSelect(e){
        if(!input.temperament.includes(e.target.value)){
        setInput({
            ...input,
            temperament: [...input.temperament,e.target.value]
        })
      }
    }
    function handleDelete(e){
        setInput({
            ...input,
            temperament: input.temperament.filter(temperament => temperament!==e)
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
        <div className={styles.container}>
            <Link to= "/home">
                <button className={styles.btn}>
                    Back to Home
                </button>
            </Link>
            <h1 className={styles.title}>Let's Create a Breed</h1>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <div>
                    <label className={styles.lbl}>Dog Breed:</label>
                    <input
                    type= "text"
                    value= {input.name}
                    name="name"
                    onChange={handleChange}
                    className={styles.inpt}
                    />
                    {errors.name && (
                        <p className="error">{errors.name}</p>
                    )}
                </div>
                <div>
                    <label className={styles.lbl}>Height min - max:</label>
                    <input
                    type="text"
                    value= {input.height}
                    name="height"
                    onChange={(e) => handleChange(e)}
                    className={styles.inpt}
                    />
                </div>
                <div>
                <label className={styles.lbl}>Weight min - max:</label>
                    <input
                    type="text"
                    value= {input.weight}
                    name="weight"
                    onChange={(e) => handleChange(e)}
                    className={styles.inpt}
                    />
                </div>
                <div>
                <label className={styles.lbl}>Years Span:</label>
                    <input
                    type="text"
                    value= {input.years}
                    name="years"
                    onChange={(e) => handleChange(e)}
                    className={styles.inpt}
                    />
                </div>
                <div>
                <label className={styles.lbl}>Image:</label>
                    <input
                    type="text"
                    value= {input.image}
                    name="image"
                    onChange={(e) => handleChange(e)}
                    className={styles.inpt}
                    />
                </div>  
                <label className={styles.lbl}>Temperaments:</label>
                <select onChange={(e) => handleSelect(e)} className={styles.inpt}>
                    <option value="" disabled>
                        Choose 1 - 3...
                    </option>
                    {temperaments.map((temp) =>(
                        <option value={temp.name}>{temp.name}</option>
                    ))}
                </select>
                <ul>
                    <li>
                        {input.temperament.map(el =>
                         <div className={styles.temps}>
                            {el}
                                <button onClick={() => handleDelete(el)} type="button" className={styles.cls}>X</button>
                        </div> )}
                    </li>
                </ul>
                <button className={styles.btn} type="submit">Create Dog</button>
            </form>
        </div>
    )
}