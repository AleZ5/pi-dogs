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
            years: dog.years,
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

module.exports = router;
