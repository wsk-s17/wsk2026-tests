<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function index(Request $request)
    {
        $notes = $request->user()->notes()->latest('id')->get();

        return response()->json($notes->map->toApi());
    }

    public function store(Request $request)
    {
        $title = $request->json('title');
        $body = $request->json('body');
        $errors = [];

        if ($title === null || (is_string($title) && trim($title) === '')) {
            $errors['title'] = 'required';
        } elseif (! is_string($title) || mb_strlen($title) > 100) {
            $errors['title'] = 'invalid';
        }

        if ($body !== null && (! is_string($body) || mb_strlen($body) > 1000)) {
            $errors['body'] = 'invalid';
        }

        if ($errors) {
            return response()->json(['message' => 'Validation failed', 'errors' => $errors], 400);
        }

        $note = $request->user()->notes()->create(['title' => $title, 'body' => $body]);

        return response()->json($note->toApi(), 201);
    }

    public function show(Request $request, string $id)
    {
        $note = $request->user()->notes()->find($id);

        if (! $note) {
            return response()->json(['message' => 'Note not found'], 404);
        }

        return response()->json($note->toApi());
    }

    public function destroy(Request $request, string $id)
    {
        $note = $request->user()->notes()->find($id);

        if (! $note) {
            return response()->json(['message' => 'Note not found'], 404);
        }

        $note->delete();

        return response()->noContent();
    }
}
