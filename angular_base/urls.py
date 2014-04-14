from django.conf.urls import patterns, include, url

from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
    # This is our new URL
    url(r'^example/$', 'angular_example.views.example', name="example"),
    url(r'^$', 'angular_baseclone.views.index', name="index"),
    url(r'^proxy/(?P<path>.*)$', 'angular_baseclone.views.proxy_to', {'target_url': 'https://basecamp.com/2598082/api/v1/'}),
)
