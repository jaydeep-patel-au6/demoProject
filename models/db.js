//set connection to db





dbPassword = 'mongodb+srv://jaydeep:jaydeep123456@cluster0-sdhhy.mongodb.net/SMS?retryWrites=true&w=majority';

module.exports = {
    mongoURI: dbPassword
};

require('./song.model')