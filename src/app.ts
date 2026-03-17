import express from 'express';
import type { Request, Response } from 'express';

const app = express();
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    console.log("Hello from the console!")
    res.send("Hello from the server!")
});

app.post('/', (req: Request, res: Response) => {
    console.log(req.body)
    res.status(200).json({
        message: "Post request to the homepage"
    })
})

const port = 3000

app.listen(port, () => {
    console.log(`server is runnig on port ${port}`)
})

