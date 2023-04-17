const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express();

app.use(cors());
app.use(express.json())


app.get('/api/people',  async (req, res) => {


    try {

        const response = await axios.get('https://swapi.dev/api/people');
        const characters = response.data.results;


        const mappedCharacters = characters.map(character => ({


            id: character.url.split('/').filter(Boolean).pop(),
            name: character.name,
            birthdate: character.birth_year,
            gender: character.gender

        }))

        // const page = parseInt(req.query.page) || 1;

        // const startIndex = (page-1) * 10;
        // const endIndex = startIndex + 10;

        // const requestedCharacters = mappedCharacters.slice(startIndex, endIndex);

        // res.json(requestedCharacters);

        res.json(mappedCharacters);

    } catch (error) {

        console.error(error);
        res.status(500).send('Error fetching characters')
    }


})

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server started on port ${port}`));