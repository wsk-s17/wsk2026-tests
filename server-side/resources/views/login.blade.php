@extends('layout')

@section('title', 'Log in')

@section('content')
    <h1>Log in</h1>

    <form method="POST" action="/login">
        @csrf

        <label for="email">Email</label>
        <input id="email" type="email" name="email" value="{{ old('email') }}" required data-cy="login-email">
        @error('email')
            <div class="error" data-cy="login-email-error">{{ $message }}</div>
        @enderror

        <label for="password">Password</label>
        <input id="password" type="password" name="password" required data-cy="login-password">
        @error('password')
            <div class="error" data-cy="login-password-error">{{ $message }}</div>
        @enderror

        <p><button type="submit" data-cy="login-submit">Log in</button></p>
    </form>
@endsection
