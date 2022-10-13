class Movie {
    constructor(title, actor = "Not specified") {
        this.title = title;
        this.actor = actor;
    }
    async create(collection) {
        await collection.insertOne(this)
    }

    async read(collection) {
        return await collection.find({}).toArray();
    }

    async update(collection, key, filter) {
        await collection.updateOne({ [key]: filter }, {$set: this});
    }

    async delete(collection) {
        await collection.deleteOne(this);
    }
}

module.exports = Movie;