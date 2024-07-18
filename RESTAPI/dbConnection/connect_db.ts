import mongoose from 'mongoose';

function connect_DB() {
    if (process.env.MongoDB_URL) {
        mongoose.connect(process.env.MongoDB_URL)
            .then(_ => console.log("DB connection successful"))
            .catch((error) => console.log(`DB connection failure, ${error}`));
    } else {
        throw new Error("Absence of DB connection URL");
    }
}

export default connect_DB;