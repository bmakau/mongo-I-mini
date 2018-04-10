const router = require('express').Router();
const Bear = require('./bearModel');
router
  .route('/')
  .get((req, res) => {
    Bear.find({}).then(bears => {
      res.status(200).json(bears);

    })
    .catch(err => {
      res.status(500).json(err);
    });
  })
  .post((req, res) => {
    const bear = new Bear(req.body);

    bear
    .save().then(savedBear =>{
      res.status(201).json(savedBear);
    })
    .catch(err => res.status(500).json(err));
    
  });

router
  .route('/:id')
  .get((req, res) => {
    Bear.findById(req.params.id)
    .then(bears => {
res.status(200).json(bears);
    })
    .catch(err => {
      res.status(500).json(err);
    });
  })
  .delete((req, res) => {
    const { id } = req.params;
    Bear.findByIdAndRemove(id)
    .then(response => {
      if(response === null) {
        res.status(404).json({message:'not found'});
      }else{
      res.status(200).json(response);
      }
    })
    .catch(err => {
      if(err.name === 'CastError'){
        res
        .status(400)
        .json({message:'The id is invalid' });
      }else{
        res.status(500)
        .json({errorMessage:'The friend could not be removed', err});
      }
  });
  })
  .put((req, res) => {
    Bear.findByIdAndUpdate(req.params.id, req.body)
    .then(response => {
      if(response === null){
        res.status(404).json({ message:'not found'});
      }
      else{
        res.status(200).json(response);
      }
      
    })
    .catch(err =>{
      if(err.name === 'CastError'){
        res.status(400).json({
          message:'The id provided is invalid, please check and try again'
        })
      }
      else{
        res.status(500).json({
          errorMessage:'the message has been removed',err
        })
      }
    })
  });

module.exports = router;
