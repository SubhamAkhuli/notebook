const express = require('express');
const router = require('express').Router();
const Note = require('../models/Notes');

router.get('/', (req, res) => {
    res.json([]);
});
module.exports = router;