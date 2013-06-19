#!/usr/bin/env python

import sys
sys.path.insert(0, '.')

from auth import auth
auth.User.create_table(fail_silently=True)
admin = auth.User(username='admin', admin=True, active=True)
admin.email='admin@test.com'
admin.set_password('admin')
admin.save()

import app
app.create_tables()
app.create_car_tables()
