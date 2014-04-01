from django.conf.urls import patterns, include, url

from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
    # This is our new URL
    url(r'^$', 'angular_baseclone.views.index', name="index"),

    # url(r'^$', 'lecture.views.presentation', name="presentation"),

    # If you want only one angular page on your Django site, you could use a url structure like this
    # url(r'^angular/', 'lecture.views.angular', name="angular"),
)
