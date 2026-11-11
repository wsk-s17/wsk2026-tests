<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Notes')</title>
    <style>
        body { 
            font-family: system-ui, sans-serif; 
            max-width: 640px; 
            margin: 0 auto; 
            padding: 16px; 
            color: #222; 
        }
        
        nav { 
            display: flex; 
            gap: 12px; 
            align-items: center; 
            margin-bottom: 24px; 
        }

        nav form { 
            margin-left: auto; 
        }

        label { 
            display: block; 
            margin: 12px 0 4px; 
        }

        input, textarea { 
            width: 100%; 
            padding: 6px; 
            box-sizing: border-box; 
        }

        .error { 
            color: #b00020; 
            font-size: 14px; 
        }

        .alert { 
            padding: 8px 12px; 
            margin-bottom: 16px; 
            border-radius: 4px; 
        }

        .alert-success { 
            background: #e6f4ea; 
        }

        .alert-error { 
            background: #fdecea;
        }

        .note { 
            border: 1px solid #ddd; 
            border-radius: 4px; 
            padding: 12px; 
            margin-bottom: 12px; 
        }

        .note h2 { 
            margin: 0 0 8px; 
            font-size: 18px; 
        }
    </style>
</head>
<body>
    @auth
        <nav>
            <a href="/notes">Notes</a>
            <a href="/notes/new" data-cy="nav-new-note">New note</a>
            <form method="POST" action="/logout">
                @csrf
                <button type="submit" data-cy="nav-logout">Log out</button>
            </form>
        </nav>
    @endauth

    @if (session('success'))
        <div class="alert alert-success" data-cy="alert-success">{{ session('success') }}</div>
    @endif
    @if (session('error'))
        <div class="alert alert-error" data-cy="alert-error">{{ session('error') }}</div>
    @endif

    @yield('content')
</body>
</html>
