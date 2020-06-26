//create controller localhost:3000

const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Song = mongoose.model('Song');

router.get('/', (req, res) => {
    res.render("song/addOrEdit", {
        viewTitle: "Insert song"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var song = new Song();
    song.songName = req.body.songName;
    song.singerName = req.body.singerName;
    song.gener = req.body.gener;
    song.duration = req.body.duration;
    song.ratings = req.body.ratings;
    song.save((err, doc) => {
        if (!err)
            res.redirect('song/list');
  
            else{
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Song.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('song/list'); }
       
            else{
                console.log('Error during record update : ' + err);
            }
    });
}


router.get('/list', (req, res) => {
    Song.find((err, docs) => {
        if (!err) {
            res.render("song/list", {
                list: docs,
                viewTitle: 'list Songs'
            });
        }
        else {
            console.log('Error in retrieving song list :' + err);
        }
    }).lean();
});




router.get('/:id', (req, res) => {
    Song.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("song/addOrEdit", {
                viewTitle: "Update song",
                song: doc
            });
        }
    }).lean();
});

router.get('/delete/:id', (req, res) => {
    Song.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/song/list');
        }
        else { console.log('Error in song delete :' + err); }
    }).lean();
});



module.exports = router;