const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }], function(err, result) {
        assert.strictEqual(err, null);
        assert.strictEqual(3, result.result.n);
        assert.strictEqual(3, result.ops.length);
        console.log('Inserted 3 documents into the collection');
        callback(result);
    });
    };