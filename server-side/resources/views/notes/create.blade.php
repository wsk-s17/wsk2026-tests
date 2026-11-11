@extends('layout')

@section('title', 'New note')

@section('content')
    <h1>New note</h1>

    <form method="POST" action="/notes/new">
        @csrf

        <label for="title">Title</label>
        <input id="title" name="title" value="{{ old('title') }}" required maxlength="100" data-cy="note-form-title">
        @error('title')
            <div class="error" data-cy="note-form-title-error">{{ $message }}</div>
        @enderror

        <label for="body">Text</label>
        <textarea id="body" name="body" rows="5" data-cy="note-form-body">{{ old('body') }}</textarea>
        @error('body')
            <div class="error" data-cy="note-form-body-error">{{ $message }}</div>
        @enderror

        <p><button type="submit" data-cy="note-form-submit">Save</button></p>
    </form>
@endsection
