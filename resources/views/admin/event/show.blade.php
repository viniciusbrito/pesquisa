@extends('app')
@section('content')
    <div style="margin-left: 10%; margin-right: 10%;">
        <div class="row">
            <div class="col-sm-12">
                <div class="row">
                    <div class="col-sm-1">
                        <h1 class="blog-post-title">
                            <span class="glyphicon glyphicon-calendar"></span>
                        </h1>
                    </div>
                    <div class="col-sm-11 text-center">
                        <h1>
                            {{ $event->title }}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
        <hr/>
        <div class="row">
            <div class="col-sm-12">
                <p class="blog-post-meta"><strong>Data Início:</strong> {{ $event->evento->start->format('d/m/Y') }}</p>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12">
                <p class="blog-post-meta"><strong>Data Final:</strong> {{ $event->evento->end->format('d/m/Y') }}</p>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12">
                <p class="blog-post-meta"><strong>Hora:</strong> {{ ($event->evento->alltime)? 'Tempo Integral' : $event->evento->hour }}</p>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12">
                {!! $event->text !!}
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12 text-right">
                <a class="btn btn-default" href="{{ route('event.index') }}"><strong>Voltar</strong></a>
            </div>
        </div>
    </div>
@endsection