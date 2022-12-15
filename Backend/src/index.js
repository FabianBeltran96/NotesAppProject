import productsRoutes from './routes/notes.routes.js'
import { PORT } from './config.js';
import { db } from './db.js'
import app from './app.js'

async function main() {

    //cors
    
    app.use(productsRoutes)
    app.listen(PORT, () => {
        console.log(`Port ${PORT}`)
    })
}

main()
    .then(async () => {
        await db.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await db.$disconnect()
        process.exit(1)
    })