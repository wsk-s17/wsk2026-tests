<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function index(Request $request)
    {
        $notes = $request->user()->notes()->latest('id')->get();

        return view('notes.index', compact('notes'));
    }

    public function create()
    {
        return view('notes.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:100'],
            'body' => ['nullable', 'string', 'max:1000'],
        ]);

        $request->user()->notes()->create($data);

        return redirect('/notes')->with('success', 'Note created.');
    }

    public function destroy(Request $request, Note $note)
    {
        if ($note->user_id !== $request->user()->id) {
            return redirect('/notes')->with('error', 'You can delete only your own notes.');
        }

        $note->delete();

        return redirect('/notes')->with('success', 'Note deleted.');
    }
}
