var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    chatCollectionName = 'ChatCollection';


let readAllFromChatCollection = function(db, callback) {
    let chatCollection = db.collection(chatCollectionName);

    chatCollection.find({}).toArray((err, docs) => {
        if (err) {
            console.log("Can not query chat collection.");
            console.log(err);
            callback(err);
            return;
        }

        console.log("Querying database successful");
        callback(docs);
    });
}

let insertDocuments = function(db, callback) {
    // Get the documents collection 
    createChatCollection(db, () => {
        let chatCollection = db.collection(chatCollectionName);

        // Insert some documents 
        chatCollection.insertMany([{
                userid: 1,
                username: "SomeUser #1",
                msg: "This is a message"
            },
            {
                userid: 2,
                username: "SomeUser #2",
                msg: "This is a another message"
            },
            {
                userid: 3,
                username: "SomeUser #3",
                msg: "This is a another another message"
            }
        ], function(err, result) {
            assert.equal(err, null);
            assert.equal(3, result.result.n);
            assert.equal(3, result.ops.length);
            console.log("Inserted 3 documents into the document collection");
            callback(result);
        });
    })
}


let createChatCollection = function(db, callback) {
    db.listCollections({ name: chatCollectionName })
        .next((err, collectionInfo) => {
            if (collectionInfo) {
                callback();
                console.log(`${chatCollectionName} already exists`)
            } else {
                db.createCollection(chatCollectionName,
                    function(err, results) {
                        console.log(`${chatCollectionName} created`);
                        callback();
                    }
                );
            }
        });
};

// Connection URL 
var url = 'mongodb://192.168.99.100:27017';
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    insertDocuments(db, () => {
        readAllFromChatCollection(db, data => {
            console.log(data);
            db.close();
        })
    });
});