from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import requests


def index(request):
    return render(request, "index.html")

# Adding csrf_exempt else Django gives 403 Forbidden and does not hit proxy_to()
@csrf_exempt
def proxy_to(request, path, target_url):
    url = '%s%s' % (target_url, path)
    headers = {
        'Authorization': 'Basic YWxleCsxQHlldGlocS5jb206cGFzc3cwcmQ1',
        'User-Agent': 'alex+1@yetihq.com (alex+1@yetihq.com)',
        'Content-Type': 'application/json'
    }
    if request.method == 'GET':
        proxied_response = requests.get(url, headers=headers)
    elif request.method == 'POST':
        proxied_response = requests.post(url, data=request.body, headers=headers)
    elif request.method == 'PUT':
        proxied_response = requests.put(url, data=request.body, headers=headers)
    elif request.method == 'DELETE':
        proxied_response = requests.delete(url, data=request.body, headers=headers)

    return HttpResponse(proxied_response)