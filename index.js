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
      return res.status(409).render("error.ejs", {
        title: "Account Already Exists",
        subtitle: "This email is already registered",
        message: `The email "${email}" is already associated with an account. You can either sign in with your existing account or use a different email address to create a new account.`,
        iconClass: "fas fa-user-check",
        suggestions: [
          "Sign in with your existing credentials",
          "Use a different email address to create a new account",
          "Reset your password if you forgot it"
        ],
        actionUrl: "/login",
        actionLabel: "Go to Sign In",
        secondaryUrl: "/"
      });
    } 
    else {
      // hashing the password before storing it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Hashing error:", err);
          return res.status(500).render("error.ejs", {
            title: "Registration Failed",
            subtitle: "An error occurred during registration",
            message: "We encountered an error while processing your registration. Please try again later.",
            iconClass: "fas fa-shield-alt",
            suggestions: [
              "Check your internet connection",
              "Try again in a few moments",
              "Use a different email address"
            ],
            actionUrl: "/register",
            actionLabel: "Try Again",
            secondaryUrl: "/"
          });
        }
        else{
          try {
            const result = await db.query(
              "INSERT INTO users (email, password) VALUES ($1, $2)",
              [email, hash]
            );
            console.log(result); 
            res.render("secrets.ejs");
          } catch (dbErr) {
            console.error("Database error:", dbErr);
            return res.status(500).render("error.ejs", {
              title: "Registration Failed",
              subtitle: "Database error occurred",
              message: "We couldn't save your account due to a technical error. Please try again later.",
              iconClass: "fas fa-database",
              suggestions: [
                "Ensure your email is valid and unique",
                "Try registering again",
                "Contact support if the issue persists"
              ],
              actionUrl: "/register",
              actionLabel: "Try Again",
              secondaryUrl: "/"
            });
          }
        }
      });
    }
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).render("error.ejs", {
      title: "Oops! Something Went Wrong",
      subtitle: "Registration encountered an error",
      message: "An unexpected error occurred during registration. Our team has been notified and is working on a fix.",
      iconClass: "fas fa-exclamation-triangle",
      suggestions: [
        "Refresh the page and try again",
        "Clear your browser cache",
        "Try using a different browser"
      ],
      actionUrl: "/register",
      actionLabel: "Return to Registration",
      secondaryUrl: "/"
    });
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
          return res.status(500).render("error.ejs", {
            title: "Authentication Error",
            subtitle: "Failed to verify your credentials",
            message: "An error occurred while verifying your password. Please try signing in again.",
            iconClass: "fas fa-lock",
            suggestions: [
              "Try signing in again",
              "Make sure your password is correct",
              "Clear your browser cache and try again"
            ],
            actionUrl: "/login",
            actionLabel: "Return to Sign In",
            secondaryUrl: "/"
          });
        }
        else{
          if (isMatch) {
            res.render("secrets.ejs");
          } else {
            return res.status(401).render("error.ejs", {
              title: "Invalid Credentials",
              subtitle: "Email or password is incorrect",
              message: "The email or password you entered doesn't match our records. Please double-check and try again, or create a new account if you haven't signed up yet.",
              iconClass: "fas fa-key",
              suggestions: [
                "Verify your email address is spelled correctly",
                "Check that your password is correct (passwords are case-sensitive)",
                "Reset your password if you forgot it",
                "Create a new account if you're not registered yet"
              ],
              actionUrl: "/login",
              actionLabel: "Try Sign In Again",
              secondaryUrl: "/register"
            });
          } 
        }
      });
    } else {
      return res.status(401).render("error.ejs", {
        title: "Account Not Found",
        subtitle: "This email is not registered",
        message: `No account found for "${email}". Please verify your email address or create a new account to get started.`,
        iconClass: "fas fa-user-plus",
        suggestions: [
          "Double-check the email address you entered",
          "Create a new account if you haven't registered yet",
          "Contact support if you believe this is an error"
        ],
        actionUrl: "/register",
        actionLabel: "Create New Account",
        secondaryUrl: "/login"
      });
    }
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).render("error.ejs", {
      title: "Login Failed",
      subtitle: "An unexpected error occurred",
      message: "We encountered a technical error while processing your login. Please try again, and if the problem persists, contact support.",
      iconClass: "fas fa-exclamation-triangle",
      suggestions: [
        "Refresh the page and try again",
        "Clear your browser cookies and cache",
        "Try using a different browser or incognito mode"
      ],
      actionUrl: "/login",
      actionLabel: "Return to Sign In",
      secondaryUrl: "/"
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
