const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ( "axios");
const { Dog, Temperament} = require ("../db");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    const apiUrl = await axios.get ("https://api.TheDogAPI.com/v1/breeds?apikey=ed7fafcc-8586-4e70-ae2b-041f27d42c75");
    const apiInfo = await apiUrl.data.map(dog => {
        return {
            name: dog.name,
            id: dog.id,
            height: dog.height.metric,
            weight: dog.weight.metric,
            life_span: dog.life_span,
            origin: dog.origin,
            temperament: dog.temperament || "no info",
            image: dog.image.url 
        };
    });
    return apiInfo;
};

const getDbInfo = async () => {
    return await Dog.findAll ({
        include:{
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        }
    })
} 

const getAllDogs = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}

router.get("/dogs", async (req,res) =>{
    const name = req.query.name
    let dogsTotal = await getAllDogs();
    if (name){
        let dogsName = await dogsTotal.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
        dogsName.length ?
        res.status(200).send(dogsName) :
        res.status(400).send("No dog found");
    } else {
        res.status(200).send(dogsTotal)
    }
})

router.get("/temperaments", async (req,res) => {
    const allDogsBreeds = await getAllDogs()
    const temperamentsSet = new Set()
    allDogsBreeds.forEach(breed => {
        breed.temperament?.split(",").forEach(temperament => {
            temperamentsSet.add(temperament.trim())
        })
    }) 
    temperamentsSet.forEach( async temperament => {
        if ( temperament ){
       await Temperament.findOrCreate({
            where: {name: temperament}
        })}
    })
    const allTemperaments = await Temperament.findAll();
    res.send(allTemperaments);
})

router.post("/dogs", async (req,res) => {
    try { let {name,
        height,
        weight,
        life_span,
        image,
        temperament,
    } = req.body

    let dogCreated = await Dog.create ({
        name,
        height,
        weight,
        life_span,
        image
    })
    let temperamentDb = await Temperament.findAll({
        where: { name: temperament}
    })
    dogCreated.addTemperament(temperamentDb)
    res.status(200).send("Dog successfully created")
        
    } catch (error) {
        console.log("Can not create this dog", error)
    } 
});

router.get("/dogs/:id", async (req,res) => {
    const id = req.params.id;
    const dogsTotal = await getAllDogs()
    if(id) {
        let dogId = await dogsTotal.filter( el => el.id == id)
        dogId.length?
        res.status(200).json(dogId) :
        res.status(400).send("No dog found")
    }
})

module.exports = router;
