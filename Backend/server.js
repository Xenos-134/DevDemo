const express = require('express')
const app = express();
const port = 3001;
const { Pool } = require('pg');
const multer = require('multer');
const IMAGES_DIR = 'images/';

const pool = new Pool({
    user: 'devdemo',
    password: 'devdemo',
    host: 'localhost',
    port: 5432,
    database: 'devdemo'
  });

  const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
  })

  let upload = multer({ dest: IMAGES_DIR });

  

//GET
app.get('/models', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM MODEL');
        res.header("Access-Control-Allow-Origin", "*");
        res.json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
});

app.get('/brands', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM brand');
        res.header("Access-Control-Allow-Origin", "*");
        res.json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
});

app.get('/phones', async (req, res) => {
    try {
        const result = await pool.query('select p.*, b.id as brand_id from phone p, brand b, model m where p.model_id = m.id and m.brand_id = b.id');
        res.header("Access-Control-Allow-Origin", "*");
        res.json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
});

app.get('/assets', async (req, res) => {
    try {
        const result = await pool.query("select a.*, b.name ||' '||m.name||' '||p.name as phone_name, p.model_id as phone_model_id, p.image as phone_image, b.id as brand_id from asset a, phone p, model m, brand b where a.phone_id = p.id and p.model_id = m.id and m.brand_id = b.id");
        res.header("Access-Control-Allow-Origin", "*");
        res.json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
});

//POST
app.post('/asset', upload.single('file'), async (req, res, next) => {
    try {
        const file = req.file;
        console.log(file);
        let asset = JSON.parse(req.body.asset);
        if (!file) {
            const error = new Error('No File')
            error.httpStatusCode = 400
            return next(error)
        }
        console.log(`INSERT INTO ASSET(phone_id, price, description, image) values (${asset.phone.id}, ${asset.price}, ${asset.description}, '${req.file.filename})`);
        await pool.query(`INSERT INTO ASSET(phone_id, price, description, image) values (${asset.phone.id}, ${asset.price}, '${asset.description}', '${req.file.filename}')`);
        res.header("Acces`-Control-Allow-Origin", "*");
        res.send(file);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
});

app.use(express.urlencoded());
app.use(express.static('images'))
app.use(express.json()); 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})