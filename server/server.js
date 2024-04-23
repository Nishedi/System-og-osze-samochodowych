const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const saltRounds = 10;
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1', 
      user : 'postgres', 
      password : '',
      database : 'komis-samochodowy'
    }
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send({"tekst":"Hello little world!"})
})

app.post('/deletecar', async (req, res) => {
    try {
      const { car_id } = req.body;
      await Promise.all([
        db('photos').where('car_id', '=', car_id).del(),
        db('samochody').where('id', '=', car_id).del()
      ]);
  
      res.json("deleted");
    } catch (err) {
      console.error(err);
      res.status(500).json("error");
    }
  });
  

app.get('/getphotos/:id', (req, res)=>{
    db.select('*').from('photos').where('car_id','=',req.params.id).then(data => {
        res.json(data)
    }).catch(err=>console.log(err));    
});

app.post('/youradds/:id', (req, res)=>{
    db.select('*').from('samochody').where('user_id','=',req.params.id).then(data => {
        res.json(data)
    }).catch(err=>console.log(err));    
});

app.post('/editcar', (req, res)=>{
    const {car_id, mark, model, production_year, price, face_photo_url, engine, engine_power, gearbox, fuel, wheel_drive} = req.body;
    db('samochody').where('id','=',car_id).update({
        mark: mark,
        model: model,
        production_year: production_year,
        price: price,
        face_photo_url: face_photo_url,
        engine : engine,
        engine_power: engine_power,
        gearbox: gearbox,
        fuel: fuel,
        wheel_drive: wheel_drive
    }).then(res.json("ok"))
    .catch(err=>console.log(err));
});

app.post('/register', (req, res)=>{
    const {email, name, surname, phone_number, city, password} = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    db.transaction(trx=>{
        trx.insert({
            hash: hash,
            email: email
        }).into('login').returning('email').then(loginEmail =>{
            return trx('users').returning("*").insert({
                name: name,
                surname: surname,
                miasto: city,
                phone_number: phone_number,
                email: loginEmail[0].email,
                joined : new Date()
            }).then(user =>{
                res.json("user[0]");
            })
        }).then(trx.commit).catch(trx.rollback);
    }).catch(err => res.status(400).json(err));
})

app.get('/api/:filename', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = __dirname + '/uploads/' + imageName;
    res.sendFile(imagePath);
});

app.post('/detailedPhoto', (req, res)=>{
    db.select('*').from('photos').where('car_id','=',req.body.id).then(data => {
        res.json(data)
    }).catch(err=>console.log(err));    
});

app.post('/browser',(req, res)=>{
    db.select('*').from('posortowane_ogloszenia').then(data => {res.json(data)}).catch(err=>console.log(err));    
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage });
  
  app.post('/uploadimage', upload.single('image'), (req, res) => {
    res.send(req.file.filename);
  });

  //Test
  app.get('/files/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename); // Podmień 'uploadedFiles' na rzeczywistą ścieżkę katalogu
  
    // Zwróć plik jako odpowiedź
    res.sendFile(filePath);
  });
  //Koniec testu



  app.post('/addcar', (req, res)=>{
    const {user_id, mark, model, production_year, price, face_photo_url, engine, engine_power, gearbox, fuel, wheel_drive, milage, photos} = req.body;
    let modifiedStr = face_photo_url.replace("uploads/", "");
    console.log(engine_power)
    db.returning("*").insert({
        user_id: user_id,
        mark: mark,
        model: model,
        production_year: production_year,
        price: price,
        face_photo_url: modifiedStr,
        engine : engine,
        engine_power: engine_power,
        gearbox: gearbox,
        fuel: fuel,
        wheel_drive: wheel_drive,
        milage: milage
    }).into('samochody')
    .then(car => {
        db.insert({
            car_id: car[0].id,
            url: modifiedStr
        }).into('photos').catch(err=>console.log(err));
        for(let photo of photos){
            db.insert({
                car_id: car[0].id,
                url: photo
            }).into('photos').catch(err=>console.log(err));
        }
    }).then(res.json("ok"))
    .catch(err=>console.log(err));
  });


app.post('/signIn',(req, res)=>{
    db.select('email', 'hash').from('login').where('email', '=', req.body.email)
    .then(data=>{
        const bool = bcrypt.compareSync(req.body.password, data[0].hash);
        console.log(bool);
        if(bool) {
            db.select('*').from('users').where('email','=',req.body.email).then(user =>{
                res.json(user[0])
            }).catch(err => res.status(400).json('unable to get user'));
        }
        else res.status(400).json({"message":"Failed logging"});
    }).catch(err=>res.status(400).json("Failed logging"));
    
})
app.listen(3000, ()=>{
    console.log("Listen on 3000");
})