import React from "react";
import {useState,useEffect} from "react";
import {Link,useHistory} from "react-router-dom";
import {postDog,getTemperaments} from "../../actions/index";
import { useDispatch,useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import styles from "../DogCreate/DogCreate.module.css";

function validate(input){
    let errors={};
    let nameValue = /^[a-zA-Z\s]*$/;
    if(!input.name || input.namemlenght > 30 || nameValue.test(input.name) === false){
        errors.name = "A Breed is Required, max 30 characters";
    }
    if (!input.heightMin || !input.heightMax ||
        input.heightMin < 0 || input.heightMin > 100 ||
        input.heightMax < 0 || input.heightMax > 100 ||
        input.heightMin >= input.heightMax){
          errors.height = "Introduce a min and a max height";
    }
    if (!input.weightMin || !input.weightMax ||
        input.weightMin < 0 || input.weightMin > 100 ||
        input.weightMax < 0 || input.weightMax > 100 ||
        input.weightMin >= input.weightMax){
          errors.weight = "Introduce a min and a max weight";
    }
     if (!input.temperament.lenght){
        errors.temperament = "Choose at least one Temperament"
    }
    /* if (errors.name === "Great" &&
        errors.height === "Good" &&
        errors.weight === "Good" &&
        errors.temperament === "Done"){
            errors.submit = "You can submit"
        } */
    return errors;
}

export default function DogCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const temperaments = useSelector((state) => state.temperaments)
    
    useEffect(() =>{
        dispatch(getTemperaments());
    }, []);
    

    const[input,setInput] = useState({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        life_spanMin:"",
        life_spanMax:"",
        image:"",
        temperament:[]
    })
    const [errors,setErrors] = useState({
       /*  name: "",
        height: "",
        weight: "",
        submit:"", */
    });
    

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function handleSelect(e){
        if(!input.temperament.includes(e.target.value)){
        setInput({
            ...input,
            temperament: [...input.temperament,e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
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
        dispatch(postDog(input))
        alert("Breed Added Successfully")
        setInput({
            name: "",
            heightMax: "",
            weightMin: "",
            weightMax: "",
            life_spanMin:"",
            life_spanMax:"",
            image:"",
            temperament:[]
        })
        history.push("/home")
    }
     
    return(
        <div className={styles.container}>
            <NavBar/>
            <h1 className={styles.title}>Let's Create a Breed</h1>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <div className={styles.cont2}>
                <div>
                    <label className={styles.lbl}>Dog Breed:</label>
                    <input
                    required
                    type= "text"
                    value= {input.name}
                    name="name"
                    onChange={handleChange}
                    className={styles.inpt}
                    />
                    {errors.name && (
                        <p className={styles.error}>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label className={styles.lbl}>Height Min:</label>
                    <input
                    required
                    placeholder="01"
                    type="number"
                    value= {input.heightMin}
                    name="heightMin"
                    onChange={(e) => handleChange(e)}
                    className={styles.inpt}
                    />
                    {errors.height && (
                        <p className={styles.error}>{errors.height}</p>
                    )}
                </div>
                <div>
                    <label className={styles.lbl}>Height Max:</label>
                    <input
                    placeholder="99"
                    type="number"
                    value= {input.heightMax}
                    name="heightMax"
                    onChange={(e) => handleChange(e)}
                    className={styles.inpt}
                    />
                </div>
                <div>
                <label className={styles.lbl}>Weight Min:</label>
                    <input
                    required
                    placeholder="01"
                    type="number"
                    value= {input.weightMin}
                    name="weightMin"
                    onChange={(e) => handleChange(e)}
                    className={styles.inpt}
                    />
                </div>
                <div>
                <label className={styles.lbl}>Weight Max:</label>
                    <input
                    placeholder="99"
                    type="number"
                    value= {input.weightMax}
                    name="weightMax"
                    onChange={(e) => handleChange(e)}
                    className={styles.inpt}
                    />
                    {errors.weight && (
                        <p className={styles.error}>{errors.weight}</p>
                    )}
                </div>
                <div>
                <label className={styles.lbl}>Life Span Min:</label>
                    <input
                    placeholder="01"
                    type="number"
                    value= {input.life_spanMin}
                    name="life_spanMin"
                    onChange={(e) => handleChange(e)}
                    className={styles.inpt}
                    />
                </div>
                <div>
                <label className={styles.lbl}>Life Span Max:</label>
                    <input
                    placeholder="99"
                    type="number"
                    value= {input.life_spanMax}
                    name="life_spanMax"
                    onChange={(e) => handleChange(e)}
                    className={styles.inpt}
                    />
                </div>
                <div>
                <label className={styles.lbl}>Image:</label>
                    <input
                    placeholder="Insert image URL"
                    type="text"
                    value= {input.image}
                    name="image"
                    onChange={(e) => handleChange(e)}
                    className={styles.inpt}
                    />
                </div>  
                <label className={styles.lbl}>Temperaments:</label>
                <select onChange={(e) => handleSelect(e)} className={styles.inpt} >
                 
                    <option value="" disabled>
                        Choose 1 - 3...
                    </option>
                    {temperaments.map((temp) =>(
                        <option value={temp.name} name="temperament">{temp.name}</option>
                    ))}
                    {errors.temperament && (
                            <p className={styles.error}>{errors.temperament}</p>
                        )}
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
                <div>
                {/* <input className={styles.btn} type="submit" value="Create Dog"/> */}
                {errors.name || errors.height || errors.weight || errors.temperament
                    ? <h3>You have missing inputs</h3> :
                      <div>
                          <button className={styles.btn} type="submit" >Create Dog</button>
                      </div>
                    }
                
            <Link to= "/home">
                <button className={styles.btn}>
                    Back to Home
                </button>
            </Link> 
            </div>
            </div>
            </form>
        </div>
    )
}