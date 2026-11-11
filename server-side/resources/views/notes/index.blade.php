@extends('layout')

@section('title', 'Notes')

@section('content')
    <h1>Notes (<span data-cy="notes-count">{{ $notes->count() }}</span>)</h1>

    @forelse ($notes as $note)
        <article class="note" data-cy="note-card">
            <h2 data-cy="note-title">{{ $note->title }}</h2>
            <p data-cy="note-body">{!! nl2br(e($note->body)) !!}</p>
            <form method="POST" action="/notes/{{ $note->id }}/delete">
                @csrf
                <button type="submit" data-cy="note-delete">Delete</button>
            </form>
        </article>
    @empty
        <p data-cy="notes-empty">No notes yet.</p>
    @endforelse
@endsection
