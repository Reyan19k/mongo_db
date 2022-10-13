const yargs = require("yargs");
const { client, connection } = require("./db/connection")
const Movie = require("./utils/index")

const app = async (yargsObject) => {
    const collection = await connection()

    try {
        if (yargsObject.create) {
            const movie = new Movie(yargsObject.title, yargsObject.actor)
            await movie.create(collection)
            // console.log(await movie.read(collection))
        } else if (yargsObject.read) {
            const movie = new Movie(yargsObject.title, yargsObject.actor)
            console.table(await movie.read(collection))

        } else if (yargsObject.update){
            const updateMovie = new Movie(yargsObject.title, yargsObject.actor)
            await updateMovie.update(collection, yargsObject.key, yargsObject.filter)
            console.table(await updateMovie.read(collection))

        } else if (yargsObject.delete){
            const deleteMovie = new Movie(yargsObject.title, yargsObject.actor)
            await deleteMovie.delete(collection)
            console.table(await deleteMovie.read(collection))
        } else {
            console.log("incorrect command")
        }
        await client.close()
    } catch (error) {
        console.log(error)
        await client.close()
    }

}

app(yargs.argv)