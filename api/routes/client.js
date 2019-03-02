const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Client = require('../models/client');

router.get('/', (req, res, next) => {
    const _id = req.params.id;
    Client.find()
        //.select(_id name)
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                clients: docs
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        })
});

router.post('/', (req, res, next) => {
    const _client = new Client({
        _id: new mongoose.Types.ObjectId(),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        sex: req.body.sex,
        id: req.body.id,
        id_type: req.body.id_type,
        email: req.body.email,
        locality: req.body.locality,
        active: req.body.active
    });

    _client
        .save()
        .then(result => {
            res.status(201).json(result);
            console.log('post success');
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

    // res.status(200).json({
    //     message: 'POST works on classes..',
    //     createdClass: _class
    // });
});

router.delete('/:classID', (req, res, next) => {
    const _id = req.params.classID;
    
    Client.remove({_id: _id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.patch('/:clientID', (req, res, next) => {
    const _id = req.params.clientID;
    // const updateOps = {};
    // for(const ops of req.body)
    //     updateOps[ops.propName] = ops.value;  

    Client.update({_id: _id}, { 
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        sex: req.body.sex,
        id: req.body.id,
        id_type: req.body.id_type,
        email: req.body.email,
        locality: req.body.locality,
        active: req.body.active
     })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

// router.get('/:classID', (req, res, next) => {
//     const _id = req.params.classID;
//     Classes.findById(_id)
//         .exec()
//         .then(doc => {
//             if(doc)
//                 res.status(200).json(doc);
//             else
//                 res.status(404).json({message: "Invalid ID.."});
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({error: err});
//         })
// });

// router.post('/', (req, res, next) => {
//     const _class = new Classes({
//         _id: new mongoose.Types.ObjectId(),
//         name: req.body.name
//     });

//     _class
//         .save()
//         .then(result => {
//             res.status(201).json(result);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });

//     // res.status(200).json({
//     //     message: 'POST works on classes..',
//     //     createdClass: _class
//     // });
// });

// router.patch('/:classID', (req, res, next) => {
//     const _id = req.params.classID;
//     const updateOps = {};
//     for(const ops of req.body)
//         updateOps[ops.propName] = ops.value;
    
//     Classes.update({_id: id}, { $set: updateOps })
//         .exec()
//         .then(result => {
//             res.status(200).json(result);
//         })
//         .catch(err => {
//             res.status(500).json({
//                 error: err
//             });
//         })
//     // res.status(200).json({
//     //     message: 'Update try working..'
//     // });
// });

// router.delete('/:classID', (req, res, next) => {
//     const _id = req.params.classID;
    
//     Classes.remove({_id: _id})
//         .exec()
//         .then(result => {
//             res.status(200).json(result);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });
//     // res.status(200).json({
//     //     message: 'Delete try working..'
//     // });
// });

module.exports = router;