import datetime

from flask import request, redirect, url_for, render_template, flash

from flask_peewee.utils import get_object_or_404, object_list

from app import app
from auth import auth
from models import User, Message, Relationship, City, Pinche

@app.route('/')
def homepage():
    if auth.get_logged_in_user():
        return private_timeline()
    else:
        return public_timeline()

@app.route('/private/')
@auth.login_required
def private_timeline():
    user = auth.get_logged_in_user()

    messages = Message.select().where(
        user__in=user.following()
    ).order_by(('pub_date', 'desc'))

    return object_list('private_messages.html', messages, 'message_list')

@app.route('/public/')
def public_timeline():
    messages = Message.select().order_by(('pub_date', 'desc'))
    return object_list('public_messages.html', messages, 'message_list')

@app.route('/join/', methods=['GET', 'POST'])
def join():
    if request.method == 'POST' and request.form['username']:
        try:
            user = User.get(username=request.form['username'])
            flash('That username is already taken')
        except User.DoesNotExist:
            user = User(
                username=request.form['username'],
                email=request.form['email'],
                join_date=datetime.datetime.now()
            )
            user.set_password(request.form['password'])
            user.save()

            auth.login_user(user)
            return redirect(url_for('homepage'))

    return    

@app.route('/following/')
@auth.login_required
def following():
    user = auth.get_logged_in_user()
    return object_list('user_following.html', user.following(), 'user_list')

@app.route('/followers/')
@auth.login_required
def followers():
    user = auth.get_logged_in_user()
    return object_list('user_followers.html', user.followers(), 'user_list')

@app.route('/users/')
def user_list():
    users = User.select().order_by('username')
    return object_list('user_list.html', users, 'user_list')

@app.route('/users/<username>/')
def user_detail(username):
    user = get_object_or_404(User, username=username)
    messages = user.message_set.order_by(('pub_date', 'desc'))
    return object_list('user_detail.html', messages, 'message_list', person=user)

@app.route('/users/<username>/follow/', methods=['POST'])
@auth.login_required
def user_follow(username):
    user = get_object_or_404(User, username=username)
    Relationship.get_or_create(
        from_user=auth.get_logged_in_user(),
        to_user=user,
    )
    flash('You are now following %s' % user.username)
    return redirect(url_for('user_detail', username=user.username))

@app.route('/users/<username>/unfollow/', methods=['POST'])
@auth.login_required
def user_unfollow(username):
    user = get_object_or_404(User, username=username)
    Relationship.delete().where(
        from_user=auth.get_logged_in_user(),
        to_user=user,
    ).execute()
    flash('You are no longer following %s' % user.username)
    return redirect(url_for('user_detail', username=user.username))

@app.route('/create/', methods=['GET', 'POST'])
@auth.login_required
def create():
    user = auth.get_logged_in_user()
    if request.method == 'POST' and request.form['content']:
        message = Message.create(
            user=user,
            content=request.form['content'],
        )
        flash('Your message has been created')
        return redirect(url_for('user_detail', username=user.username))

    return render_template('create.html')

@app.route('/edit/<int:message_id>/', methods=['GET', 'POST'])
@auth.login_required
def edit(message_id):
    user = auth.get_logged_in_user()
    message = get_object_or_404(Message, user=user, id=message_id)
    if request.method == 'POST' and request.form['content']:
        message.content = request.form['content']
        message.save()
        flash('Your changes were saved')
        return redirect(url_for('user_detail', username=user.username))

    return render_template('edit.html', message=message)

@app.route('/city/')
def city_list():
    obj_list = City.select().order_by('name')
    return object_list('city_list.html', obj_list, "obj_list")

@app.route('/city/<int:city_id>/')
def city_detail(city_id):
    city = get_object_or_404(City, id=city_id)
    obj_list = Pinche.select().where(city=city).order_by('pub_date')
    return object_list('city_detail.html', obj_list, "obj_list")

@app.route('/pinche/')
def pinche_list():
    obj_list = Pinche.select().order_by('pub_date')
    return object_list('pinche_list.html', obj_list, "obj_list")

@app.route('/pinche/<int:pinche_id>/')
def pinche_detail(pinche_id):
    obj = get_object_or_404(Pinche, id=pinche_id)
    return render_template('pinche_detail.html', obj=obj)

@app.route('/bmw/')
def bmw():
    return render_template('bmw.html')

import gujia

@app.route('/gujia/', methods=['GET', 'POST'])
def gj():
    if request.method == 'POST':
        j = request.form['j']
        c = request.form['c']
        y = request.form['y']
        m = request.form['m']
        p = gujia.get_gujia(j, c, [y, m])
        print "=====", j, c, y, m, p
        return render_template('gujia.html', p=p)

    print "====="
    return render_template('gujia.html')

@app.route('/car/')
def car():
    return render_template('car.html')

@app.route('/used/', methods=['GET', 'POST'])
def used_car():
    if request.method == 'POST':
        j = request.form['j']
        c = request.form['c']
        y = request.form['y']
        m = request.form['m']
        p = gujia.get_gujia(j, c, [y, m])
        print "=====", j, c, y, m, p
        return render_template('used_car.html', p=p)

    print "====="
    return render_template('used_car.html')

@app.route('/type/')
def cars_type():
    return render_template('cars_type.html')

@app.route('/maintain/')
def cars_maintain():
    return render_template('cars_maintain.html')
