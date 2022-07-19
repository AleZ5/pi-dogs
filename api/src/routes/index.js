const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ( "axios");
const Dog = require('../models/Dog');
const Temperament = require('../models/Temperament');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    const apiUrl = await axios.get ("https://api.TheDogAPI.com/v1/breeds?apikey=ed7fafcc-8586-4e70-ae2b-041f27d42c75");
    const apiInfo = await apiUrl.data.map(el => {
        return {
            name: el.name,
            id: el.dog_id,
            height: el.height,
            weight: el.weight,
            years: el.years
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

module.exports = router;
