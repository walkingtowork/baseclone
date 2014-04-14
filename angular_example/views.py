from django.shortcuts import render

__author__ = 'baylee'

def example(request):
    return render(request, "example.html")
