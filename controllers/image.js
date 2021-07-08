const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'b93a2c20608c4f58972fca2cbdc07996'
  });

const handleApiCall = (req,res)=>{
    app.models.predict('a403429f2ddf4b49b307e318f00e528b',
    req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage = (req,res,db)=>{
    const {id, currentFaceCount} = req.body;
    db('users').where('id','=',id)
    .increment('entries', currentFaceCount)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}