from django.shortcuts import render
from django.http import HttpResponse
import mimetypes
import urllib2

def index(request):
    return render(request, "index.html")

def proxy_to(request, path, target_url):
    url = '%s%s' % (target_url, path)
    if request.META.has_key('QUERY_STRING'):
        url += '?' + request.META['QUERY_STRING']
    try:
        req = urllib2.Request(url)
        req.add_header('Authorization', 'Basic YWxleCsxQHlldGlocS5jb206cGFzc3cwcmQ1')
        req.add_header('User-Agent', 'alex+1@yetihq.com (alex+1@yetihq.com)')
        req.add_header('Content-Type', 'application/json')
        proxied_request = urllib2.urlopen(req)
        status_code = proxied_request.code
        mimetype = proxied_request.headers.typeheader or mimetypes.guess_type(url)
        content = proxied_request.read()
    except urllib2.HTTPError as e:
        return HttpResponse(e.msg, status=e.code, mimetype='text/plain')
    else:
        return HttpResponse(content, status=status_code, mimetype=mimetype)