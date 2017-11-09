const MongoClient = require('mongodb').MongoClient,
    config = require('../config.js')
    chatCollectionName = 'ChatCollection',
    dbUrl = config.dbUrl;

class ChatProtocol {
    getClient() {
        return MongoClient.connect(dbUrl);
    }

    createChatCollection(db) {
        return new Promise((resolve, reject) => {
            db.listCollections({ name: chatCollectionName })
                .next((err, collectionInfo) => {
                    if (collectionInfo) {
                        resolve();
                        console.log(`${chatCollectionName} already exists`)
                    } else {
                        db.createCollection(chatCollectionName,
                            function(err, results) {
                                if (err) {
                                    console.log(`Problems while creating ${chatCollectionName} created`);
                                    reject(err);
                                    return;
                                }

                                console.log(`${chatCollectionName} created`);
                                resolve();
                            }
                        );
                    }
                });
        });
    }

    insert(db, document) {
        let chatCollection = db.collection(chatCollectionName);
        // Get the documents collection 
        return new Promise((resolve, reject) => {
            chatCollection.insertOne(document, (err, result) => {
                if (err) {
                    console.log('Error while inserting document.')
                    console.log(err);
                    reject(err);
                    return;
                }

                console.log('Inserting data successfully');
                console.log(document);
                resolve(result);
            });
        });
    }

    getAll(db) {
        // Get the documents collection 
        return new Promise((resolve, reject) => {
            let chatCollection = db.collection(chatCollectionName);

            chatCollection.find({}).toArray((err, docs) => {
                if (err) {
                    console.log("Can not query chat collection.");
                    console.log(err);
                    reject(err);
                    return;
                }

                console.log("Querying database successful");
                resolve(docs);
            });
        })
    }
}

module.exports = ChatProtocol;