from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import (
    Curso,
    Curriculo,
    CurriculoDisciplina,
    Disciplina,
    Docente,
    DocenteDisciplina,
    DocumentoCurso,
    PPC,
    Unidade,
    Usuario,
)
from .serializers import (
    CursoSerializer,
    CurriculoDisciplinaSerializer,
    CurriculoSerializer,
    DisciplinaSerializer,
    DocenteDisciplinaSerializer,
    DocenteSerializer,
    DocumentoCursoSerializer,
    PPCSerializer,
    UnidadeSerializer,
    UsuarioSerializer,
)


def base(request):
    return render(request, 'base.html')


def _resolve_activity_status(disciplina: Disciplina) -> str:
    if not disciplina.ementa or not disciplina.programa:
        return 'Desatualizado'

    elapsed_seconds = (disciplina.updated_at - disciplina.created_at).total_seconds()
    if elapsed_seconds > 120:
        return 'Manual'

    return 'Sincronizado'


@api_view(['GET'])
def dashboard_overview(_request):
    total_cursos = Curso.objects.count()
    sincronizados = Curso.objects.filter(funcionamento_curso=Curso.Funcionamento.ATIVO).count()
    desatualizados = max(total_cursos - sincronizados, 0)

    latest_candidates = [
        Curso.objects.order_by('-updated_at').values_list('updated_at', flat=True).first(),
        Disciplina.objects.order_by('-updated_at').values_list('updated_at', flat=True).first(),
        Curriculo.objects.order_by('-updated_at').values_list('updated_at', flat=True).first(),
    ]
    latest_sync = max((value for value in latest_candidates if value is not None), default=None)

    recent_disciplinas = (
        Disciplina.objects.select_related('unidade').order_by('-updated_at', '-id_disciplina')[:5]
    )

    recent_activity = [
        {
            'code': disciplina.codigo_disciplina,
            'title': disciplina.nome_disciplina,
            'area': disciplina.unidade.nome_unidade if disciplina.unidade else 'Unidade nao informada',
            'status': _resolve_activity_status(disciplina),
        }
        for disciplina in recent_disciplinas
    ]

    return Response(
        {
            'last_sync': latest_sync.isoformat() if latest_sync else None,
            'metrics': {
                'total_cursos': total_cursos,
                'sincronizados': sincronizados,
                'desatualizados': desatualizados,
            },
            'recent_activity': recent_activity,
        }
    )


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all().order_by('id_usuario')
    serializer_class = UsuarioSerializer


class DocenteViewSet(viewsets.ModelViewSet):
    queryset = Docente.objects.all().order_by('id_docente')
    serializer_class = DocenteSerializer


class UnidadeViewSet(viewsets.ModelViewSet):
    queryset = Unidade.objects.all().order_by('id_unidade')
    serializer_class = UnidadeSerializer


class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.all().order_by('id_curso')
    serializer_class = CursoSerializer


class CurriculoViewSet(viewsets.ModelViewSet):
    queryset = Curriculo.objects.all().order_by('id_curriculo')
    serializer_class = CurriculoSerializer


class DisciplinaViewSet(viewsets.ModelViewSet):
    queryset = Disciplina.objects.all().order_by('id_disciplina')
    serializer_class = DisciplinaSerializer


class CurriculoDisciplinaViewSet(viewsets.ModelViewSet):
    queryset = CurriculoDisciplina.objects.all().order_by('id_curriculo_disciplina')
    serializer_class = CurriculoDisciplinaSerializer


class DocenteDisciplinaViewSet(viewsets.ModelViewSet):
    queryset = DocenteDisciplina.objects.all().order_by('id_docente_disciplina')
    serializer_class = DocenteDisciplinaSerializer


class PPCViewSet(viewsets.ModelViewSet):
    queryset = PPC.objects.all().order_by('id_ppc')
    serializer_class = PPCSerializer


class DocumentoCursoViewSet(viewsets.ModelViewSet):
    queryset = DocumentoCurso.objects.all().order_by('id_documento')
    serializer_class = DocumentoCursoSerializer
