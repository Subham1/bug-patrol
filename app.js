const exp = require('express');
const app = exp();
const http = require('http');
var parse = require('body-parser');
const path = require('path');
app.use(exp.static(path.join(__dirname, 'public')));
app.use(parse.urlencoded({ extended: false }));
app.use(parse.json());
app.set('view engine', 'ejs');
const { Console } = require('console');
const mysql=require('mysql2');
const session = require('express-session');
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const port = 3000;



//sql connection
var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "report",
    
});
con.connect((error) => {
    if (error) {
        console.error('faield');
        return;
    }
    console.log('connected');
});




//routersssssssssssssssssssssss
app.get('/', (req, res) => {
    var logged=false;
   
  res.render('pages/home',{logged});
});
app.get('/home',function(req,res)
{
    var logged=true;
    var name=req.session.username;
    res.render('pages/home',{logged,name});
})
app.get('/signup',function(req,res)
{
    res.render('pages/signup');
});
app.get('/login',function(req,res)
{  var error=false;
    res.render('pages/login',{error});
});
app.get('/asignup',function(req,res)
{
    res.render('pages/asignup');
});
app.get('/alogin',function(req,res)
{  var error=false;
    res.render('pages/alogin',{error});
});
app.get('/about',function(req,res)
{  //var error=false;
    var moni=req.session.autho;
    res.render('pages/about',{moni});
});
app.get('/dash',function(req,res)
{  //var error=false;
    var moni=req.session.autho;
    console.log(moni);
    res.render('pages/dash',{moni});
});
app.get('/profile',function(req,res)
{    var a=req.session.b;
    res.render('pages/profile',{b:a});
});
app.get('/report',function(req,res)
{  
    
    res.render('pages/report');
})

app.get('/community',function(req,res)
{
    var logged = true;
    var name=req.session.username;
    res.render("pages/community",{logged,name})
})
app.post('/signup',function(req,res)
{
    const username = req.body.username;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const pass = req.body.password;
    const pass2 = req.body.password2;
    const sql = "select * from user where email=?";
    con.query(sql, [email], function (err, result) {
        if (result.length > 0) {
            res.render('pages/signup', { error: "Already Exist" });
        }
    });
    if (pass == pass2) {
        const query = "INSERT INTO user(username,email,mobile,password)values('" + username + "','" + email + "','" + mobile + "','" + pass + "')";
        con.query(query, function (err, result) {
            if (err) {
                throw err;
            }
            else {
                var logged = false;
                res.render('pages/login', { error: "Registered succesfully.....Login Now", logged });
                console.log("regusterd");
                console.log(mobile);
            }
        });
    }
    else {
        res.render('pages/signup', { error: "mismatched password" });
    }

});
app.post('/login', function (req, res) {
    const mail = req.body.email;
    const pass1 = req.body.password;
    var sql = 'SELECT * FROM user WHERE email=? AND password=?';
    con.query(sql, [mail, pass1], function (err, result) {
        if (err) throw err;
        if (result.length > 0) {

            req.session.b = result[0];
            var a=result[0];
            var name = a.username;
            var logged = true;
            req.session.username = result[0].username;
            req.session.mail=result[0].email;
            req.session.autho = result[0].autho;
                           console.log(result[0].autho)
            res.render('pages/home', { logged, name});
        }

        else {
        var error = true;
            res.render("pages/login", { error: "Invalid email or Password"});

        }
    });

});

app.post('/report', upload.fields([
    { name: 'img1', maxCount: 1 },
    { name: 'img2', maxCount: 1 }]), function (req, res) {
    var email = req.session.username;
    const title=req.body.title;
    const category = req.body.category;
    const description = req.body.description;
    const ministry=req.body.department;
    const webname = req.body.webname;
    const weblink = req.body.weblink;
    
    console.log(email, category,webname);
    const img1 = req.files['img1'][0];
    const img2 = req.files['img2'][0];
    
    const sql = "insert into bugs (email,title,category,ministry,descr,webname,weblink,img,img2,date)values(?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)";
    con.query(sql, [email, title, category,ministry, description,webname,weblink, img1 ? img1.buffer : null,img1 ? img2.buffer : null], function (err, result) {
        if (err) {
        
            console.log(err);
        }
        else {
            console.log("sucess");
            res.render('pages/report', { successMessage: 'Bug submmited successfuly'});
            //res.render('pages/addpro', { successMessage: 'property add succesfully', name: email });
        }
    });

});
app.post('/asignup',function(req,res)
{    const id=req.body.govid;
    const username = req.body.username;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const depart=req.body.department;
    const pass = req.body.password;
    const pass2 = req.body.password2;

    const sql = "select * from authority where email=?";
    con.query(sql, [email], function (err, result) {
        if (result.length > 0) {
            res.render('pages/signup', { error: "Already Exist" });
        }
    });
    if (pass == pass2) {
        const query = "INSERT INTO authority(id,username,email,mobile,password,department)values('" + id + "','" + username + "','" + email + "','" + mobile + "','" + pass + "','"+depart+"')";
        con.query(query, function (err, result) {
            if (err) {
                console.log("fucked");
            }
            else {
                var error= true;
                res.render('pages/alogin', { error: "Registered succesfully.....Login Now" });
                console.log("regusterd");
                console.log(mobile);
            }
        });
    }
    else {
        var error= true;
        res.render('pages/asignup', { error: "mismatched password" });
    }

});

app.post('/alogin', function (req, res) {
    const mail = req.body.email;
    const pass1 = req.body.password;
    var sql = 'SELECT * FROM authority WHERE email=? AND password=?';
    con.query(sql, [mail, pass1], function (err, result) {
        if (err) throw err;
        if (result.length > 0) {

            req.session.b = result[0];
            var a=result[0];
            var name = a.username;
            var logged = true;
            req.session.username = result[0].username;
            req.session.autho = result[0].autho;
            req.session.mail=result[0].email;
            var moni=true;
            res.render('pages/home', { logged, name,moni});
        }

        else {
            var error= true;

            res.render("pages/alogin", { error: "Invalid email or Password"});

        }
    });

});


    app.post('/show', function (req, res) {
        const depart = req.body.department;
        var name=req.session.name
        if(depart=='all')
        {
            const sql = "select * from bugs";
        con.query(sql, function (err, result) {
            if (err) {
                throw err;
    
            }
            else {
                var show = true;
                var logged = true;
                
                res.render("pages/home", {bug: result, logged, show ,name});
            }
        });
        }else{
        const sql = "select * from bugs where ministry=?";
        con.query(sql, [depart], function (err, result) {
            if (err) {
                throw err;
    
            }
            else {
                var show = true;
                var logged = true;
                
                res.render("pages/home", {bug: result,logged, show,name });
            }
        });
    }
    });


    app.get("/bugs/:bugname", function (req, res) {
        const bugname = req.params.bugname;
    //const bugname = decodeURIComponent(encodedBugname)
        const sql = "select * from bugs where title=?";
        con.query(sql, [bugname], function (err, result) {
            if (err) {
                throw err;
            }
          
                
               
                    else {
                        const ss="select * from comm2 where title=?";
                        con.query(ss,[bugname],function(err,resu){
                            if(err)
                            {
                                throw err;
                            }
                            else{
                                res.render("pages/buginfo", {bug:result[0],comms:resu});
                    }
                            });
                        }
                        
                })
            
        });

app.post('/comment',function(req,res){
    const title=req.body.title;
    const user=req.session.username;
    var descp=req.body.commet;

    const sql = "insert into comm2(title,username,comm)values(?,?,?)";
    con.query(sql, [title,user,descp], function (err, result) {
        if (err) {
            throw err;
        }
      
            
           
                else {

                    const ss = "select * from bugs where title=?";
                    con.query(ss, [title], function (err, result) {
                        if (err) {
                            throw err;
                        }
                      
                            
                           
                                else {
                                    const ss="select * from comm2 where title=?";
                                    con.query(ss,[title],function(err,resu){
                                        if(err)
                                        {
                                            throw err;
                                        }
                                        else{
                                            res.render("pages/buginfo", {bug:result[0],comms:resu});
                                }
                                        });
                                }
                            })



                    
                }
            })

})

app.get('/community', function(req, res) {
   var name=req.session.username;
   res.render('pages/community');
});








app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
