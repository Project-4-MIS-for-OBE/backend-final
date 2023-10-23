const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Course = require('../models/Course.js');

router.get('/', (req, res, next) => {
    Course.find().exec()
        .then(courses => {
            res.json(courses);
        })
        .catch(err => {
            next(err);
        });
});

router.get('/:id', (req, res, next) => {
    Course.findById(req.params.id).exec()
        .then(courses => {
            res.json(courses);
        })
        .catch(err => {
            next(err);
        })
});

router.post('/', (req, res, next) => {
    Course.create(req.body)
        .then(post => {
            res.json(post);
        })
        .catch(err => {
            next(err);
        });
});

router.put('/:id', (req, res, next) => {
    Course.findByIdAndUpdate(req.params.id, req.body)
        .then(post => {
            res.json(post);
        })
        .catch(err => {
            next(err);
        });
    })

router.delete('/:id', (req, res, next) => {
    Course.findByIdAndDelete(req.params.id)
        .then(post => {
            res.json(post);
        })
        .catch(err => {
            next(err);
        });
    })



module.exports = router;