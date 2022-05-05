var db = connect("mongodb://root:password@127.0.0.1:27018/admin");

db = db.getSiblingDB('admin');
db.createUser(
    {
        user: "bmwau",
        pwd: "1234567890",
        roles: [ { role: "readWrite", db: "admin" } ]
    }
    )