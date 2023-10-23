const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const So = require('../models/So.js');

router.get('/', (req, res, next) => {
    So.find().exec()
        .then(sos => {
            res.json(sos);
        })
        .catch(err => {
            next(err);
        });
});

router.get('/:id', (req, res, next) => {
    So.findById(req.params.id).exec()
        .then(sos => {
            res.json(sos);
        })
        .catch(err => {
            next(err);
        })
});

router.post('/', (req, res, next) => {
    So.create(req.body)
        .then(post => {
            res.json(post);
        })
        .catch(err => {
            next(err);
        });
});

router.put('/:id', (req, res, next) => {
    So.findByIdAndUpdate(req.params.id, req.body)
        .then(post => {
            res.json(post);
        })
        .catch(err => {
            next(err);
        });
    })

router.delete('/:id', (req, res, next) => {
    So.findByIdAndDelete(req.params.id)
        .then(post => {
            res.json(post);
        })
        .catch(err => {
            next(err);
        });
    })



module.exports = router;