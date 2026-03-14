import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

// the more the salt rounds the more the password is encryptes but it also takes more time to hash the password
const saltRounds = process.env.SALT_ROUNDS ;

const app = express();
app.set("view engine", "ejs");
const port = process.env.PORT;
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect().catch(err => console.log("Database connection error:", err));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  try {
    const email = req.body.username;
    const password = req.body.password;
    const checkResult = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if(checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } 
    else {
      // hashing the password before storing it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Hashing error:", err);
          throw err;
        }
        else{
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [email, hash]
          );
          console.log(result); 
          res.render("secrets.ejs");
        }
      });
    }
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).send("Error registering user");
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.username;
    const password = req.body.password;
    // accessing the database to check if the user exists and the password matches
    const result = await db.query(
      "SELECT * FROM users WHERE email = $1 ",
      [email]
    );
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHash = user.password;
      // comparing the password entered by the user with the hashed password stored in the database
      bcrypt.compare(password, storedHash, (err, isMatch) => {
        if (err) {
          console.error("Comparison error:", err);
          throw err;
        }
        else{
          if (isMatch) {
            res.render("secrets.ejs");
          } else {
            res.send("Invalid email or password. Please try again.");
          } 
        }
      });
    } else {
      res.send("Invalid email or password. Please try again.");
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Error logging in");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
