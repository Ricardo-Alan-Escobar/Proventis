<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Models\Post;
use App\Models\Comment;

class CommentController extends Controller
{
    public function store(Request $request, Post $post)
    {
        $request->validate([
            'content' => 'required|string|max:500',
        ]);

        $comment = new Comment([
            'content' => $request->input('content'),
            'user_id' => auth()->id(),
        ]);

        $post->comments()->save($comment);

        return response()->json($comment, 201);
    }

    public function index(Post $post)
    {
        $comments = $post->comments()->with('user')->get();
        return response()->json($comments);
    }

    public function update(Request $request, Comment $comment)
    {
        // Verifica si el usuario autenticado es el propietario del comentario
        if (Auth::id() !== $comment->user_id) {
            Log::error('No autorizado: el usuario ' . Auth::id() . ' intentó editar un comentario que no posee.');
            return response()->json(['error' => 'No tienes permiso para editar este comentario.'], 403);
        }

        $request->validate([
            'content' => 'required|string|max:500',
        ]);

        try {
            // Actualiza el contenido del comentario
            $comment->content = $request->input('content');
            $comment->save();

            Log::info('Comentario editado con éxito por el usuario ' . Auth::id());
            return response()->json(['message' => 'Comentario actualizado', 'comment' => $comment], 200);
        } catch (\Exception $e) {
            Log::error('Error al editar el comentario: ' . $e->getMessage());
            return response()->json(['error' => 'Error al actualizar el comentario.'], 500);
        }
    }

    public function destroy(Comment $comment)
    {
        try {
            if (Auth::id() !== $comment->user_id) {
                Log::error('No autorizado: el usuario ' . Auth::id() . ' intentó eliminar un comentario que no posee.');
                return response()->json(['error' => 'No tienes permiso para eliminar este comentario.'], 403);
            }

            $comment->delete();
            Log::info('Comentario eliminado con éxito por el usuario ' . Auth::id());
            return response()->json(['message' => 'Comentario eliminado'], 200);
        } catch (\Exception $e) {
            Log::error('Error al eliminar el comentario: ' . $e->getMessage());
            return response()->json(['error' => 'Error al eliminar el comentario.'], 500);
        }
    }
}
