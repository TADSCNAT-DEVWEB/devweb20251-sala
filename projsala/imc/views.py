import json
from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.template.loader import render_to_string
from . import services
# Create your views here.

def index(request):
    return render(request,'index.html')

def soma(request):
    numero=2
    soma=numero+numero
    return HttpResponse(f'<h1>{numero} + {numero} = {soma}</h1>')

def calcular_imc_view(request):
    if request.method == 'GET':
        return redirect('imc:index')
    dados= json.loads(request.body) #Agora o conteúdo é JSON, o que precisa ser convertido para um dicionário
    altura = float(dados['altura'])
    peso = float(dados['peso'])
    imc_service=services.IMCService()
    contexto = imc_service.calcular_imc(altura, peso)
    html= render_to_string('resultado_imc.html', contexto) #A função render_to_string renderiza o template e retorna o HTML como string
    return HttpResponse(html)
