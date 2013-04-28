# pinche

This is an tools for pinche

# prepare the dev environment

setup environment

    brew install mysql-connector-c

    mkvirtualenv flask
    workon flask
    pip install flask
    pip install mysql-python

init database

    mysql -u root -e "DROP DATABASE pinche;"
    mysql -u root -e "DROP USER 'myuser'@'%';"
    mysql -u root -e "CREATE DATABASE pinche DEFAULT CHARSET utf8 COLLATE utf8_general_ci;"
    mysql -u root -e "CREATE USER 'myuser'@'%' IDENTIFIED By 'mypass'";
    mysql -u root -e "GRANT ALL PRIVILEGES ON pinche.* TO 'myuser'@'%' WITH GRANT OPTION";

    python utils/db_init.py
    
    curl -u admin:admin -d data='{"name": "chengdu"}' http://127.0.0.1:5000/api/city/
    curl -u admin:admin -d data='{"name": "shanghai"}' http://127.0.0.1:5000/api/city/

start web server

    python run_app.py
    
#api

city
    
    curl http://localhost:5000/api/city/
    curl -u admin:admin -d data='{"name": "chengdu"}' http://127.0.0.1:5000/api/city/
    curl -u admin:admin -X PUT -d data='{"name": "shanghai"}' http://127.0.0.1:5000/api/city/1/
    curl -u admin:admin -X DELETE http://127.0.0.1:5000/api/city/1/

pinche

    curl http://127.0.0.1:5000/api/pinche/?city=1
    curl -u admin:admin -d data='{"city": 1, "title": "pinche", "car": "audi", "time": "20130428 12:00", "phone": "12345", "route": "to chengdu", "publisher": "who", "content": "this is body."}' http://127.0.0.1:5000/api/pinche/
    curl -u admin:admin -X PUT -d data='{"city": 1, "title": "pinche", "car": "audi", "time": "20130428 12:00", "phone": "12345", "route": "to chengdu", "publisher": "who", "content": "this is updated body."}' http://127.0.0.1:5000/api/pinche/1/
    curl -u admin:admin -X DELETE http://127.0.0.1:5000/api/pinche/1/

# Thanks

+ [Flask](http://flask.pocoo.org)
