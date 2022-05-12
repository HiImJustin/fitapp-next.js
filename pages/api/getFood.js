// import handler from "./handler";
import db from "../../lib/db";

// export default handler.get(async (req, res) => {
// });
async function getFood() {
    const post = await db.query("select * from food");
    await db.end();
    res.statusCode = 200;
    res.json(post);
}
export default getFood;
